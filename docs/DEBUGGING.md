# Debugging Contentful Toolkit — Introspection & Content Map Issues

This document captures a reproducible workflow for diagnosing and resolving failures that users commonly encounter when running the repository's introspection and content-map generation scripts.

Overview
--------

Problem symptoms you may see:

- `✖ Failed to fetch schema` with `ENOENT: no such file or directory, open 'src/data/schema.json'` when running `node src/schema/introspect.js`.
- `TypeError: Cannot read properties of undefined (reading '__schema')` when running `node src/schema/contentMap.js` or `npm run generate-map`.

These errors are usually caused by one of the following:

- The introspection script (`src/schema/introspect.js`) wrote a JSON file that does not have the shape `{"data": {"__schema": ... }}` (for example it may be `{"__schema": ...}` or an error response like `{"errors": [...]}` or HTML).
- A network or permissions issue (bad token/endpoint) returned an HTML error page or GraphQL errors instead of introspection JSON.

Quick contract
--------------

- Inputs: a working Contentful GraphQL endpoint and a delivery token (CDN) configured in `.env` and the `src/config/contentful.js` file.
- Outputs: `src/data/schema.json` and `src/data/content_map.json` containing a valid introspection result and the derived content map.
- Error modes: missing file, invalid JSON shape (missing `data.__schema`), network/auth failures, or unexpected HTML/error payloads.

Diagnostic checklist
--------------------

1. Confirm the `src/data` directory exists and inspect the schema JSON:

```bash
ls -la src/data
cat src/data/schema.json | head -n 40
```

2. If `schema.json` exists, check its top-level keys. It should start with a `data` property containing `__schema`. Examples you may see:

- Good (expected):

```json
{
  "data": {
    "__schema": { ... }
  }
}
```

- Common variant that still contains the schema but one level shallower:

```json
{
  "__schema": { ... }
}
```

- Error response (bad token / HTML / 404):

```json
{
  "errors": [ ... ]
}
```

or an HTML document starting with `<!doctype html>`.

3. If the file contains `errors` or HTML, test the endpoint manually with curl (replace values appropriately):

```bash
curl -X POST \
  -H "Authorization: Bearer <YOUR_CDA_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name } } }"}' \
  https://graphql.contentful.com/content/v1/spaces/<SPACE_ID>/environments/<ENV>
```

Expected output: a JSON object with `data.__schema`.

4. Verify credentials and endpoint. Confirm your `.env` or `src/config/contentful.js` is configured with the correct Space ID, environment, and a Content Delivery API token (not the Management API token).

Targeted fixes
---------------

Option A — Fix the introspection writer (recommended)

Edit `src/schema/introspect.js` so that whatever the `graphql-request` client returns is wrapped in `{ data: ... }` before writing to disk. This makes the saved file match the shape `contentMap.js` expects.

Example change (conceptual):

```js
// ...existing code...
const data = await client.request(query);

if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/schema.json', JSON.stringify({ data }, null, 2));
```

Why: `graphql-request` returns the `data` payload directly (i.e. `{ __schema: ... }`) so wrapping it keeps downstream scripts working without changes.

Option B — Defensive parsing in `contentMap.js` (safe, low-risk)

Edit `src/schema/contentMap.js` to accept either shape. This prevents the script from crashing if the file is one level off.

Example change (conceptual):

```js
const schema = JSON.parse(fs.readFileSync('src/data/schema.json', 'utf-8'));
const types = (schema.data?.__schema || schema.__schema)?.types;
if (!types) {
  console.error('Schema missing __schema.types — file contents:');
  console.error(schema);
  process.exit(1);
}
```

Suggested workflow
------------------

1. Run the introspection step and capture output:

```bash
npm run introspect
# or
node src/schema/introspect.js
```

Look for a success message such as "Schema saved → src/data/schema.json" or a clear error that indicates a network/permission problem.

2. Inspect the saved file with `head` or open it in an editor and confirm it contains `data.__schema`.

3. Run the content map generator:

```bash
npm run generate-map
# or
node src/schema/contentMap.js
```

Expected output: `Content map created → src/data/content_map.json`.

4. If the content map generator still fails, run the defensive contentMap locally (see code snippet above) or paste the first 30 lines of `src/data/schema.json` into the issue so maintainers can advise.

Verification / smoke tests
--------------------------

- `src/data/schema.json` should parse as JSON and include `data.__schema.types` or `__schema.types`.
- `src/data/content_map.json` should be a JSON array of objects with `name` and `fields` keys.

Example quick script to assert basic shapes:

```bash
node -e "const fs=require('fs');const s=JSON.parse(fs.readFileSync('src/data/schema.json','utf8'));const t=(s.data&&s.data.__schema)||(s.__schema);if(!t)console.error('bad schema',Object.keys(s));else console.log('schema ok, types:',t.types.length)"
```

Common edge cases
-----------------

- Using the Management API token instead of the Delivery token — Management tokens return HTML or errors for the CDN endpoint.
- Network proxies or corporate firewalls returning HTML pages.
- Introspection quota or permissions issues on the Contentful space.

Maintainer checklist
--------------------

- [ ] Add a CI job that validates `src/data/schema.json` shape after `npm run introspect` (optional: run the introspection from CI with provided secrets).
- [ ] Add unit tests for `contentMap.js` that accept both shapes (wrapped and unwrapped) and verify output.
- [ ] Consider changing `contentMap.js` to accept both shapes by default and log a helpful warning when the file lacks the `data` wrapper.

Appendix — example fixes
------------------------

Two minimal diffs you can apply quickly:

1) `src/schema/introspect.js` wrap save

```diff
- fs.writeFileSync('src/data/schema.json', JSON.stringify(data, null, 2));
+ if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });
+ fs.writeFileSync('src/data/schema.json', JSON.stringify({ data }, null, 2));
```

2) `src/schema/contentMap.js` defensive read

```diff
- const types = schema.data.__schema.types;
+ const types = (schema.data?.__schema || schema.__schema)?.types;
+ if (!types) { console.error('Invalid schema.json — missing __schema.types'); console.error(schema); process.exit(1); }
```
