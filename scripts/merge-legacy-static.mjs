import { access, copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "react-app", "out");

const excludedDirectories = new Set([
  ".git",
  ".github",
  ".next",
  ".vercel",
  "node_modules",
  "react-app",
  "scripts",
  "coverage",
  "dist",
  "build",
  "out",
]);

const excludedFiles = new Set([
  "package.json",
  "package-lock.json",
  "vercel.json",
  "netlify.toml",
  "tsconfig.json",
  "README.md",
  "LICENSE",
]);

const excludedExtensions = new Set([
  ".ts",
  ".tsx",
  ".map",
  ".log",
  ".yaml",
  ".yml",
  ".lock",
]);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function mergeDirectory(sourceDir, destinationDir, isRoot = false) {
  await mkdir(destinationDir, { recursive: true });
  const entries = await readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const name = entry.name;

    if (isRoot && (excludedDirectories.has(name) || excludedFiles.has(name))) {
      continue;
    }
    if (name === ".DS_Store" || name === "Thumbs.db") continue;

    const sourcePath = path.join(sourceDir, name);
    const destinationPath = path.join(destinationDir, name);

    if (entry.isDirectory()) {
      if (excludedDirectories.has(name)) continue;
      await mergeDirectory(sourcePath, destinationPath, false);
      continue;
    }

    if (!entry.isFile()) continue;
    if (excludedExtensions.has(path.extname(name).toLowerCase())) continue;

    // Preserve the newer app's generated files; add only missing legacy pages/assets.
    if (await exists(destinationPath)) continue;

    await mkdir(path.dirname(destinationPath), { recursive: true });
    await copyFile(sourcePath, destinationPath);
  }
}

const outputInfo = await stat(output).catch(() => null);
if (!outputInfo?.isDirectory()) {
  throw new Error("React static export directory react-app/out was not created.");
}

await mergeDirectory(root, output, true);
console.log("Merged legacy static pages and assets into react-app/out without overwriting generated app files.");
