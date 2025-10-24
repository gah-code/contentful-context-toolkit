
# 🧩 Contentful Context Toolkit

# 🧩 Contentful Context Toolkit

![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Build Status](https://github.com/gilbertharo/contentful-context-toolkit/actions/workflows/ci.yml/badge.svg)
![Last Commit](https://img.shields.io/github/last-commit/gilbertharo/contentful-context-toolkit.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Made with](https://img.shields.io/badge/made%20with-Contentful-orange)

A lightweight Node.js utility for introspecting your Contentful GraphQL API, extracting the content type map, fetching live content snapshots, and generating field-aware Markdown schema documentation.

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
npm run introspect      # Fetch full schema from Contentful (with field types)
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

## 💻 CLI Command Aliases

You can now use the built-in CLI for simpler, friendlier commands:

```bash
npm run context <command>
```

Available commands:

| Command      | Description                         |
| ------------ | ----------------------------------- |
| `introspect` | Fetch schema from Contentful        |
| `map`        | Generate content type map           |
| `fetch`      | Fetch sample content entries        |
| `docs`       | Build Markdown schema documentation |
| `all`        | Run full `context-docs` pipeline    |

Examples:

```bash
npm run context introspect
npm run context fetch
npm run context all
```

If you run `npm run context` with no arguments, it will display a help menu.

---

### 🧾 Outputs

All generated files appear in `src/data/` and `docs/`:

| File                             | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `src/data/schema.json`           | Full GraphQL schema (includes field types)              |
| `src/data/content_map.json`      | Simplified type → field map                             |
| `src/data/content_snapshot.json` | Sample content data from your space                     |
| `docs/schema_docs.md`            | Markdown schema documentation with accurate field types |

---

### ✅ Example Output

```markdown
## BlogPost
**Entries fetched:** 3

**Fields:**
- _id: ID  
- title: String  
- slug: String  
- excerpt: String  
- body: JSON  
- author: Entry  
- image: Asset  
- seoTitle: String  
- seoDescription: String  
- date: DateTime  
```

---

## 🧠 Project Overview

| Folder        | Purpose                                                    |
| ------------- | ---------------------------------------------------------- |
| `src/config`  | Stores API endpoints and environment configuration         |
| `src/schema`  | Handles schema introspection and content type extraction   |
| `src/queries` | Builds and runs auto-generated GraphQL queries             |
| `src/utils`   | Shared helpers like GraphQL client and logging             |
| `src/docs`    | Generates Markdown schema documentation                    |
| `src/cli`     | Provides CLI command aliases (`npm run context <command>`) |
| `src/data`    | Stores generated outputs (schema, map, snapshot)           |
| `tests/`      | (optional) Add unit or integration tests later             |

---

## 🧭 Update Tracker

| Date       | Update                | Notes                                                       |
| ---------- | --------------------- | ----------------------------------------------------------- |
| 2025-10-16 | Initial scaffold      | Schema → map → snapshot workflow                            |
| 2025-10-17 | Enriched fetch        | Added filtered content queries and folder auto-creation     |
| 2025-10-17 | Docs generator        | Added Markdown documentation generator (`npm run docs`)     |
| 2025-10-17 | Unified pipeline      | Added `context-docs` full sync command                      |
| 2025-10-18 | Field types resolved  | Updated introspection query to capture accurate field types |
| 2025-10-19 | CLI aliases added     | Introduced `npm run context <command>` subcommands          |
| *TBD*      | Relationship mapping  | Map cross-type links and references                         |
| *TBD*      | Visualization support | Export schema for GraphQL Voyager                           |
| *TBD*      | Type generation       | Add GraphQL Codegen for TypeScript models                   |

---

## 🧱 Task Backlog

* [x] Add GraphQL schema documentation generator
* [x] Combine full pipeline (`context-docs`)
* [x] Fix field type resolution in documentation
* [x] Add CLI command aliases (`context introspect`, `context fetch`)
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
* Run `npm run context all` before each commit to ensure your docs stay up-to-date.
* Generated files in `src/data/` are reproducible — do not version them.

---

## 🧩 License

MIT © 2025
Maintained by **Contentful Context Toolkit contributors**

---

This version:

* ✅ Documents the new CLI commands clearly.  
* ✅ Keeps global install instructions (Step 4) out for now.  
* ✅ Updates the tracker to mark CLI aliases as complete.  
* ✅ Keeps everything else current and consistent with your codebase.
