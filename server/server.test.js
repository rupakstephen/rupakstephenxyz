const test = require("node:test");
const assert = require("node:assert");
process.env.ADMIN_PASSWORD = "pw";
process.env.DB_PATH = ":memory:";
process.env.STATIC_DIR = __dirname;
const app = require("./server");

test("public reads, gated writes, post + review round trip", async (t) => {
  const srv = app.listen(0);
  t.after(() => srv.close());
  const base = `http://localhost:${srv.address().port}/api`;
  const call = (p, method = "GET", body, cookie) =>
    fetch(base + p, { method, headers: { "content-type": "application/json", ...(cookie && { cookie }) },
      body: body && JSON.stringify(body) });

  const r = await call("/reviews");
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("x-powered-by"), null);
  assert.match(r.headers.get("content-security-policy"), /script-src 'self'/);
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.equal((await call("/posts")).status, 200);
  assert.equal((await call("/posts", "POST", { title: "x", body: "y" })).status, 401);
  assert.equal((await call("/reviews/abc", "DELETE")).status, 401);
  assert.equal((await call("/login", "POST", { password: "nope" })).status, 401);
  assert.equal((await (await call("/me", "GET", null, "session=9999999999999.forged")).json()).admin, false);

  const login = await call("/login", "POST", { password: "pw" });
  const cookie = login.headers.get("set-cookie").split(";")[0];
  assert.equal((await (await call("/me", "GET", null, cookie)).json()).admin, true);

  const post = await (await call("/posts", "POST", { title: "Hello World!", body: "# hi" }, cookie)).json();
  assert.equal(post.slug, "hello-world");
  assert.equal((await call("/posts", "POST", { title: "Hello World!", body: "dup" }, cookie)).status, 409);
  assert.equal((await (await call("/posts/hello-world")).json()).body, "# hi");
  await call("/posts/hello-world", "PUT", { title: "Hello", body: "edited" }, cookie);
  assert.equal((await (await call("/posts/hello-world")).json()).body, "edited");

  const rev = await (await call("/reviews", "POST",
    { media_name: "Dune", rating: 9, tags: ["scifi"], completed: true }, cookie)).json();
  const list = await (await call("/reviews")).json();
  assert.deepEqual(list[0].tags, ["scifi"]);
  assert.equal(list[0].completed, true);
  assert.equal((await call("/reviews", "POST", { media_name: "Bad", rating: 11 }, cookie)).status, 400);
  assert.equal((await call(`/reviews/${rev.id}`, "DELETE", null, cookie)).status, 200);
  assert.equal((await call("/posts/hello-world", "DELETE", null, cookie)).status, 200);
});
