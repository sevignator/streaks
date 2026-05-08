# AGENTS

## Lessons learned

- Put all server-side logic behind a server function (for example, `createServerFn`) instead of calling server-only modules directly from route loaders. This avoids client-navigation/back-button route freezes caused by server/client boundary violations.
- Use deterministic hashing (for example, HMAC-SHA256 with a secret) for retrievable tokens so you can look up records by hash without needing to verify against non-deterministic password hashes.
- Keep token lifetimes short and explicit (for example, 30 minutes), and enforce expiry checks server-side before allowing sensitive flows like password reset.
- Guard nullable database reads before dereferencing properties (for example, check `resetTokenRecord` before using `resetTokenRecord.expiresAt`) to avoid loader-time crashes that can appear as UI freezes.
- Avoid duplicate auth/user bootstrap fetches across route guards and client context providers when possible; duplicated fetch paths can mask root causes and increase render/network churn during debugging.
- In Drizzle comparisons, pass the table column as the first argument and the concrete value as the second (for example, `eq(users.id, userId)`), otherwise TypeScript can infer the wrong expression/value types and produce invalid query semantics.
