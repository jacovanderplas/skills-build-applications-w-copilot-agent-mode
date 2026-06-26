# OctoFit Tracker Frontend

React 19 and Vite presentation tier for the OctoFit Tracker multi-tier application.

## Environment

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` so frontend requests target the public backend URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, add it to `.env.local` in this folder. If `VITE_CODESPACE_NAME` is unset, the app safely falls back to `http://localhost:8000/api/...` instead of building an `https://undefined-8000...` URL.

## Scripts

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```
