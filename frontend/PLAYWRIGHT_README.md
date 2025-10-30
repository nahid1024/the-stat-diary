Playwright E2E tests
=====================

What this adds
---------------
- Playwright configuration at `playwright.config.ts`.
- Two simple tests under `tests/`:
  - `home.spec.ts` — checks that homepage renders and search works.
  - `post.spec.ts` — clicks the first post card (if any) and verifies post page loads.

How to run
----------
1. From the `frontend/` folder install dev dependencies:

```bash
cd frontend
npm install
```

2. Install Playwright browsers (required once):

```bash
npx playwright install
```

3. Start your frontend app (it must be running at http://localhost:3000 by default):

```bash
npm run dev
```

4. In another terminal run the tests:

```bash
npm run test:e2e
```

Notes
-----
- The tests assume the frontend is available at `http://localhost:3000`. You can override by setting `PLAYWRIGHT_BASE_URL` in your environment before running tests.
- If your app depends on the backend (Strapi) you should start the backend first so posts and images are available for the tests.
