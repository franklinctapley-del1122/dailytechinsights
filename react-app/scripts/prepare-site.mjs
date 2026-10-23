import { cpSync, copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const reactDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rootDir = resolve(reactDir, "..");
const publicDir = resolve(reactDir, "public");
mkdirSync(publicDir, { recursive: true });
for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "llm.txt"]) {
  copyFileSync(resolve(rootDir, file), resolve(publicDir, file));
}
for (const dir of ["assets", "components"]) {
  const source = resolve(rootDir, dir);
  if (dir === "assets") cpSync(source, resolve(publicDir, dir), { recursive: true });
  else cpSync(source, resolve(publicDir, dir), { recursive: true });
}
const shared = {
  header: readFileSync(resolve(rootDir, "components/header.html"), "utf8"),
  footer: readFileSync(resolve(rootDir, "components/footer.html"), "utf8"),
};
writeFileSync(resolve(reactDir, "legacy/shared.json"), JSON.stringify(shared));
console.log("Prepared sitemap, robots, LLM files, public assets, and shared navigation.");
