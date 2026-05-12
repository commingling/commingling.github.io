# Deploy Workflow

This document describes how to deploy the Portfolio frontend to `commingling.github.io` (GitHub Pages).

## Overview

Because `commingling.github.io` is a static hosting service, we need to build the `Portfolio` React application locally and then push the generated static files (HTML, JS, CSS) to this repository.

The backend API runs separately on Google Cloud Run (`portfolio-site-1024456695830.us-central1.run.app`).

## Deployment Steps

1.  **Prepare Build Environment**
    Create a temporary directory (e.g., `build_env`) and copy the source code from your local `Portfolio` project.

2.  **Configure for Production**
    Before building, you must ensure the frontend knows where to send API requests. By default, it might use relative paths (`/api/chat`), but on GitHub Pages, it needs the absolute URL of your Cloud Run backend.

    *   **File**: `src/components/ChatWidget.tsx` (and any other API consumers)
    *   **Change**: Replace `/api/chat` with `https://portfolio-site-1024456695830.us-central1.run.app/api/chat`.

    *Note: Ensure your Cloud Run backend has CORS enabled for `commingling.github.io`.*

3.  **Build the Project**
    Run the Vite build command in the temporary directory:
    ```bash
    npm install  # if node_modules are not linked
    npm run build
    ```
    This generates a `dist/` folder containing the production assets.

4.  **Deploy Artifacts**
    Copy the contents of the `dist/` folder to the root of the `commingling.github.io` repository.
    *   `dist/index.html` -> `./index.html`
    *   `dist/assets/*` -> `./assets/*`

5.  **Push to GitHub**
    Commit and push the changes:
    ```bash
    git add .
    git commit -m "Deploy updated portfolio"
    git push origin main
    ```

## Automated Script (Reference)

You can use a script similar to this to automate the process:

```bash
# 1. Create temp dir
mkdir build_tmp
# 2. Copy source
cp -R ../Portfolio/src ../Portfolio/*.{ts,tsx,html,json} build_tmp/
# 3. Patch API URL (Example using sed on Mac)
sed -i '' "s|/api/chat|https://portfolio-site-1024456695830.us-central1.run.app/api/chat|g" build_tmp/src/components/ChatWidget.tsx
# 4. Build
cd build_tmp
npm install
npm run build
# 5. Move artifacts
cp -R dist/* ../
# 6. Cleanup
cd ..
rm -rf build_tmp
```
