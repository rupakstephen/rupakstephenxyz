const express = require("express");
const path = require("node:path");
const fs = require("node:fs");
const crypto = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");

const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "data", "site.db");
const STATIC_DIR = path.resolve(process.env.STATIC_DIR || path.join(__dirname, "public"));
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.error("ADMIN_PASSWORD is required");
  process.exit(1);
}
// ponytail: random secret per boot means logins reset on restart; set SESSION_SECRET to persist them
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const SESSION_MS = 7 * 24 * 3600 * 1000;

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS reviews (
    review_id TEXT PRIMARY KEY, media_name TEXT NOT NULL, media_type TEXT,
    rating REAL, review_str TEXT, tags TEXT NOT NULL DEFAULT '[]',
    date TEXT, completed INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS posts (
    slug TEXT PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL,
    created TEXT NOT NULL, updated TEXT NOT NULL
  );
`);

// ---- auth: HMAC-signed expiry cookie, single admin ----
const sha = (s) => crypto.createHash("sha256").update(s).digest();
const sign = (v) => crypto.createHmac("sha256", SESSION_SECRET).update(v).digest("hex");
const safeEq = (a, b) => crypto.timingSafeEqual(sha(a), sha(b));

function isAdmin(req) {
  const m = /(?:^|;\s*)session=([^;]+)/.exec(req.headers.cookie || "");
  if (!m) return false;
  const [exp, sig] = m[1].split(".");
  return !!sig && Number(exp) > Date.now() && safeEq(sig, sign(exp));
}
const requireAdmin = (req, res, next) =>
  isAdmin(req) ? next() : res.status(401).json({ msg: "Login required" });

// ponytail: in-memory per-IP lockout, resets on restart; fine for one user
const fails = new Map();
const LOCK_AFTER = 5, LOCK_MS = 15 * 60 * 1000;

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "1mb" }));

app.post("/api/login", (req, res) => {
  const f = fails.get(req.ip);
  if (f && f.n >= LOCK_AFTER && Date.now() - f.t < LOCK_MS)
    return res.status(429).json({ msg: "Too many attempts, try later" });
  if (typeof req.body.password !== "string" || !safeEq(req.body.password, ADMIN_PASSWORD)) {
    fails.set(req.ip, { n: (f && Date.now() - f.t < LOCK_MS ? f.n : 0) + 1, t: Date.now() });
    return res.status(401).json({ msg: "Wrong password" });
  }
  fails.delete(req.ip);
  const exp = String(Date.now() + SESSION_MS);
  res.cookie("session", `${exp}.${sign(exp)}`, {
    httpOnly: true, sameSite: "strict", secure: req.secure, maxAge: SESSION_MS,
  });
  res.json({ admin: true });
});
app.post("/api/logout", (req, res) => { res.clearCookie("session"); res.json({ admin: false }); });
app.get("/api/me", (req, res) => res.json({ admin: isAdmin(req) }));

// ---- reviews ----
const toReview = (r) => ({ ...r, tags: JSON.parse(r.tags), completed: !!r.completed });

app.get("/api/reviews", (req, res) =>
  res.json(db.prepare("SELECT * FROM reviews ORDER BY date DESC").all().map(toReview)));

app.post("/api/reviews", requireAdmin, (req, res) => {
  const b = req.body;
  const rating = Number(b.rating);
  if (!b.media_name || !(rating >= 0 && rating <= 10))
    return res.status(400).json({ msg: "media_name and rating (0-10) required" });
  const id = crypto.randomUUID();
  db.prepare("INSERT INTO reviews VALUES (?,?,?,?,?,?,?,?)").run(
    id, String(b.media_name), String(b.media_type || ""), rating, String(b.review_str || ""),
    JSON.stringify(Array.isArray(b.tags) ? b.tags.map(String) : []),
    b.date || new Date().toISOString(), b.completed ? 1 : 0);
  res.status(201).json({ msg: `Review submitted for ${b.media_name}.`, id });
});

app.delete("/api/reviews/:id", requireAdmin, (req, res) => {
  const { changes } = db.prepare("DELETE FROM reviews WHERE review_id=?").run(req.params.id);
  res.status(changes ? 200 : 404).json({ msg: changes ? "Deleted" : "Not found" });
});

// ---- posts (markdown bodies) ----
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

app.get("/api/posts", (req, res) =>
  res.json(db.prepare("SELECT slug,title,created,updated FROM posts ORDER BY created DESC").all()));

app.get("/api/posts/:slug", (req, res) => {
  const p = db.prepare("SELECT * FROM posts WHERE slug=?").get(req.params.slug);
  p ? res.json(p) : res.status(404).json({ msg: "Not found" });
});

app.post("/api/posts", requireAdmin, (req, res) => {
  const { title, body } = req.body;
  const slug = slugify(String(title || ""));
  if (!slug || typeof body !== "string") return res.status(400).json({ msg: "title and body required" });
  if (db.prepare("SELECT 1 FROM posts WHERE slug=?").get(slug))
    return res.status(409).json({ msg: "A post with that title already exists" });
  const now = new Date().toISOString();
  db.prepare("INSERT INTO posts VALUES (?,?,?,?,?)").run(slug, title, body, now, now);
  res.status(201).json({ slug });
});

// slug is fixed at creation so links don't break when the title is edited
app.put("/api/posts/:slug", requireAdmin, (req, res) => {
  const { title, body } = req.body;
  if (!title || typeof body !== "string") return res.status(400).json({ msg: "title and body required" });
  const { changes } = db.prepare("UPDATE posts SET title=?, body=?, updated=? WHERE slug=?")
    .run(title, body, new Date().toISOString(), req.params.slug);
  res.status(changes ? 200 : 404).json({ slug: req.params.slug });
});

app.delete("/api/posts/:slug", requireAdmin, (req, res) => {
  const { changes } = db.prepare("DELETE FROM posts WHERE slug=?").run(req.params.slug);
  res.status(changes ? 200 : 404).json({ msg: changes ? "Deleted" : "Not found" });
});

// ---- built React client + SPA fallback ----
app.use(express.static(STATIC_DIR));
app.use("/api", (req, res) => res.status(404).json({ msg: "Not found" }));
app.get("*", (req, res) => res.sendFile(path.join(STATIC_DIR, "index.html")));

if (require.main === module) app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = app;
