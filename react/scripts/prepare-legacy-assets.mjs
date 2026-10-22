import { cp, mkdir, copyFile, access } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.cwd(), "..");
const target = path.resolve(process.cwd(), "public");
await mkdir(target, { recursive: true });

for (const directory of ["assets", "images", "fonts"]) {
  const source = path.join(root, directory);
  try {
    await access(source);
    await cp(source, path.join(target, directory), { recursive: true, force: true });
  } catch {
    // Some legacy repositories do not use every optional asset directory.
  }
}

for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "llm.txt", "favicon.ico", "favicon.png"]) {
  try {
    await copyFile(path.join(root, file), path.join(target, file));
  } catch {
    // Optional files remain absent when they do not exist in the legacy site.
  }
}

console.log("Prepared legacy public assets for React static export.");
