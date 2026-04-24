/**
 * Vercel Build Script
 *
 * This script runs the Vite build, then re-packages the output into
 * the Vercel Build Output API format (.vercel/output/).
 *
 * Structure produced:
 *   .vercel/output/
 *   ├── config.json           — Vercel routing config
 *   ├── static/               — client assets (JS, CSS, images)
 *   └── functions/
 *       └── ssr.func/          — Node.js serverless function
 *           ├── .vc-config.json
 *           ├── index.mjs      — thin wrapper around server.js
 *           ├── server.js       — TanStack Start SSR server
 *           └── assets/         — server-side chunks
 */

import { execSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const OUTPUT = join(ROOT, ".vercel", "output");
const STATIC = join(OUTPUT, "static");
const FUNC = join(OUTPUT, "functions", "ssr.func");

// ── 1. Clean previous output ───────────────────────────────────────────
if (existsSync(OUTPUT)) {
  rmSync(OUTPUT, { recursive: true, force: true });
}

// ── 2. Run the normal Vite build ───────────────────────────────────────
console.log("\n⚡ Running Vite build…\n");
execSync("npx vite build", { stdio: "inherit", cwd: ROOT });

// ── 3. Create the Build Output API directory structure ─────────────────
mkdirSync(STATIC, { recursive: true });
mkdirSync(FUNC, { recursive: true });

// ── 4. Copy client assets → static/ ───────────────────────────────────
console.log("\n📦 Copying client assets → .vercel/output/static/");
cpSync(join(ROOT, "dist", "client"), STATIC, { recursive: true });

// Also copy anything in public/ (favicons, images, etc.)
const publicDir = join(ROOT, "public");
if (existsSync(publicDir)) {
  cpSync(publicDir, STATIC, { recursive: true });
}

// ── 5. Copy server bundle → functions/ssr.func/ ────────────────────────
console.log("📦 Copying server bundle → .vercel/output/functions/ssr.func/");
cpSync(join(ROOT, "dist", "server"), FUNC, { recursive: true });

// ── 6. Write the serverless function entry point ───────────────────────
writeFileSync(
  join(FUNC, "index.mjs"),
  `import server from "./server.js";

export default async function handler(request) {
  return server.fetch(request);
}
`
);

// ── 7. Write .vc-config.json (Edge runtime config) ──────────────────
writeFileSync(
  join(FUNC, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "edge",
      entrypoint: "index.mjs",
    },
    null,
    2
  )
);

// ── 8. Write the top-level Build Output API config ─────────────────────
writeFileSync(
  join(OUTPUT, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // First, let Vercel serve any file that exists in static/ (JS, CSS, images)
        { handle: "filesystem" },
        // Everything else → SSR function
        { src: "/(.*)", dest: "/ssr" },
      ],
    },
    null,
    2
  )
);

console.log("\n✅ Vercel Build Output API ready at .vercel/output/\n");
