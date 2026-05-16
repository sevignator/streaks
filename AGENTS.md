# AGENTS

## Lessons learned

- Never call server-only utilities (for example, `*.server.ts`) directly from route loaders or client-side code; wrap them in a server function (for example, `createServerFn`) and call that instead. This avoids runtime freezes and other server/client boundary issues during navigation.
- Use deterministic hashing (for example, HMAC-SHA256 with a secret) for retrievable tokens so you can look up records by hash without needing to verify against non-deterministic password hashes.
- Keep token lifetimes short and explicit (for example, 30 minutes), and enforce expiry checks server-side before allowing sensitive flows like password reset.
- Guard nullable database reads before dereferencing properties (for example, check `resetTokenRecord` before using `resetTokenRecord.expiresAt`) to avoid loader-time crashes that can appear as UI freezes.
- Avoid duplicate auth/user bootstrap fetches across route guards and client context providers when possible; duplicated fetch paths can mask root causes and increase render/network churn during debugging.
- In Drizzle comparisons, pass the table column as the first argument and the concrete value as the second (for example, `eq(users.id, userId)`), otherwise TypeScript can infer the wrong expression/value types and produce invalid query semantics.
- In Zed, prefer project-level Tailwind CSS mode for `.css` files by setting CSS language servers to `tailwindcss-intellisense-css` and disabling `vscode-css-language-server`; this silences Tailwind at-rule diagnostics while keeping CSS IntelliSense. Reference: https://zed.dev/docs/languages/tailwindcss#using-tailwind-css-mode-in-css-files
- For DB-driven daily completion UI, use one deterministic date key format end-to-end (for example, local `YYYY-MM-DD`) for both mutation writes and loader reads; locale-formatted dates can mismatch across environments and make invalidation look broken. After `createCompletionOnFn`/`deleteCompletionOnFn`, call `router.invalidate()` so the loader re-fetches from the database and the done state updates from source-of-truth data instead of component state.
- `router.invalidate()` marks current route matches as stale and triggers their loaders to run again, which is the right post-mutation sync point when UI derives from loader data. In this architecture, completions are not held in local component state, so invalidation is what pulls the newly written/deleted completion rows back into `Route.useLoaderData()` and refreshes `isDone`/counts from the database.
