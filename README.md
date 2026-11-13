# rupakstephenxyz
Personal site: portfolio, media reviews, and a markdown blog. Self-hosted; all data lives in one SQLite file.

- Anyone who can reach the site can read. Only the admin (single password) can write or delete.
- Blog posts are written in an in-browser markdown editor with live preview (log in, then Blog -> New post).

## Run
```
cp .env.example .env   # set ADMIN_PASSWORD
docker compose up -d --build
```
Site on http://localhost:5000. Data is in `./data/site.db` -- back that file up.
Put it behind HTTPS (e.g. the homelab nginx proxy) so the login cookie is marked `Secure`; the proxy must send `X-Forwarded-Proto`.

## Develop
```
cd server && ADMIN_PASSWORD=dev node server.js   # API on :5000 (needs Node 24+)
cd client && npm start                           # UI on :3000, proxies /api to :5000
cd server && npm test
```
