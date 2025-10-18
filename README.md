# 🧩 Contentful Context Toolkit

A lightweight Node.js utility for introspecting your Contentful GraphQL API, extracting your content type map, fetching live content snapshots, and auto-generating Markdown schema documentation.

---

## 🚀 Quick Start

### 1. Setup

```bash
git clone <your-repo-url>
cd contentful-context-toolkit
npm install
````

Add your credentials to `.env`:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CDA_TOKEN=your_content_delivery_token
```

*(Do not commit this file — it’s already excluded via `.gitignore`.)*

---

### 2. Run the Toolkit

#### Individual commands

```bash
npm run introspect      # Fetch schema from Contentful
npm run generate-map    # Generate content type map
npm run fetch-content   # Fetch sample content entries
npm run docs            # Build Markdown schema documentation
```

#### Full workflow

```bash
npm run context
```

Runs introspection → map → snapshot.

#### Complete pipeline (with docs)

```bash
npm run context-docs
```

Runs the entire workflow plus documentation generation.

---

### 🧾 Outputs

All generated files appear in `src/data/` and `docs/`:

| File                             | Description                                                     |
| -------------------------------- | --------------------------------------------------------------- |
| `src/data/schema.json`           | Full GraphQL schema                                             |
| `src/data/content_map.json`      | Simplified type → field map                                     |
| `src/data/content_snapshot.json` | Sample content data                                             |
| `docs/schema_docs.md`            | Auto-generated Markdown schema documentation (with field types) |

---

## 🧠 Project Overview

| Folder        | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| `src/config`  | Stores API endpoints and environment configuration       |
| `src/schema`  | Handles schema introspection and content type extraction |
| `src/queries` | Builds and runs auto-generated GraphQL queries           |
| `src/utils`   | Shared helpers like GraphQL client and logging           |
| `src/docs`    | Generates Markdown schema documentation                  |
| `src/data`    | Stores generated outputs (schema, map, snapshot)         |
| `tests/`      | (optional) Add unit or integration tests later           |

---

## 🧭 Update Tracker

| Date       | Update                | Notes                                                    |
| ---------- | --------------------- | -------------------------------------------------------- |
| 2025-10-16 | Initial scaffold      | Schema → map → snapshot workflow                         |
| 2025-10-17 | Enriched fetch        | Added filtered content queries and folder auto-creation  |
| 2025-10-17 | Docs generator        | Added Markdown documentation generation (`npm run docs`) |
| 2025-10-17 | Unified pipeline      | Added `context-docs` full sync command                   |
| *TBD*      | CLI commands          | Add `context introspect`, `context fetch` aliases        |
| *TBD*      | Relationship mapping  | Map cross-type links and references                      |
| *TBD*      | Visualization support | Export schema for GraphQL Voyager                        |
| *TBD*      | Type generation       | Add GraphQL Codegen for TypeScript models                |

---

## 🧱 Task Backlog

* [x] Add GraphQL schema documentation generator
* [x] Combine full pipeline (`context-docs`)
* [ ] Add CLI command aliases (`context introspect`, `context fetch`)
* [ ] Add GraphQL Voyager visualization output
* [ ] Implement relationship mapping between content types
* [ ] Implement retry + error handling for API requests
* [ ] Add watch mode to auto-update content_map.json on schema change
* [ ] Integrate TypeScript types (future expansion)

---

## 🪄 Notes

This toolkit is intentionally minimal but fully operational.
You can extend it to:

* Generate React/Gatsby components automatically from Contentful models
* Integrate with CI/CD to track schema and documentation changes
* Visualize your model structure with GraphQL Voyager
* Export data to other formats (Markdown, JSON, HTML)

Stay modular. Keep your data clear. And always know your content universe.

---

## 🔐 Security & Best Practices

* **Never commit `.env`** — use `.env.example` for shared configs.
* **Keep your CDA token private** — treat it like a password.
* Use `npm run context-docs` before each commit to ensure your docs stay up-to-date.
* Generated files in `src/data/` are reproducible — do not version them.

---

## 🧩 License

MIT © 2025
Maintained by **Contentful Context Toolkit contributors**

```

---

