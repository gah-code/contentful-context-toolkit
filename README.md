# 🧩 Contentful Context Toolkit

A lightweight Node.js utility for introspecting your Contentful GraphQL API, extracting your content type map, and fetching a unified snapshot of your content.

---

## 🚀 Quick Start

### 1. Setup

```bash
git clone <your-repo-url>
cd contentful-context-toolkit
npm install
```

Add your credentials to `.env`:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_CDA_TOKEN=your_content_delivery_token
```

### 2. Run the Toolkit

```bash
npm run introspect
npm run generate-map
npm run fetch-content
```

Or run the full workflow:

```bash
npm run context
```

Outputs will appear in `src/data/`:

- `schema.json` → Full GraphQL schema from Contentful
- `content_map.json` → Simplified map of content types and fields
- `content_snapshot.json` → Lightweight content data sample

---

## 🧠 Project Overview

| Folder | Purpose |
|--------|----------|
| `src/config` | Stores API endpoints and environment configuration |
| `src/schema` | Handles schema introspection and content type extraction |
| `src/queries` | Builds and runs auto-generated GraphQL queries |
| `src/utils` | General helpers like GraphQL client and logging |
| `src/data` | Stores generated outputs |
| `tests/` | (optional) Add unit or integration tests later |

---

## 🧭 Update Tracker

| Date | Update | Notes |
|------|---------|-------|
| 2025-10-16 | Initial scaffold | Created base toolkit with schema → map → snapshot workflow |
| _TBD_ | Introspection filtering | Add filtering for custom content models only |
| _TBD_ | Visualization support | Export schema for GraphQL Voyager |
| _TBD_ | Type generation | Add GraphQL Codegen for TypeScript models |

---

## 🧱 Task Backlog

- [ ] Add CLI command aliases (`context introspect`, `context fetch`)
- [ ] Add GraphQL Voyager visualization output
- [ ] Implement retry + error handling for API requests
- [ ] Add watch mode to auto-update content_map.json on schema change
- [ ] Integrate TypeScript types (future expansion)

---

## 🪄 Notes

This toolkit is intentionally minimal. You can extend it easily to generate React components, sync to local cache, or integrate with Gatsby’s GraphQL layer.

Stay modular. Keep your data clear. And always know your content universe.

---
