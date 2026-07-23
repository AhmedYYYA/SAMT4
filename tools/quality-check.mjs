import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const pages = ["index.html", "story-of-samt.html"];
let failed = false;

function assert(condition, message) {
  if (condition) console.log(`PASS  ${message}`);
  else { failed = true; console.error(`FAIL  ${message}`); }
}

function attributes(html, name) {
  return [...html.matchAll(new RegExp(`${name}=["']([^"']+)["']`, "g"))].map(match => match[1]);
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), "utf8");
  const ids = attributes(html, "id");
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const localRefs = [...html.matchAll(/(?:src|href)=["']([^"'#?]+)["']/g)]
    .map(match => match[1])
    .filter(ref => !/^(?:https?:|mailto:|tel:|data:)/.test(ref));
  const missing = localRefs.filter(ref => !fs.existsSync(path.resolve(root, ref)));

  assert(duplicateIds.length === 0, `${page}: no duplicate IDs`);
  assert(missing.length === 0, `${page}: all local assets resolve${missing.length ? ` (${missing.join(", ")})` : ""}`);
  assert(/class=["'][^"']*skip-link/.test(html), `${page}: skip link is present`);
  assert(/<html[^>]+lang=["'](?:en|ar)["'][^>]+dir=["'](?:ltr|rtl)["']/.test(html), `${page}: language and direction are declared`);
  assert(/aria-controls=["']mobile-menu["']/.test(html), `${page}: menu toggle controls the menu dialog`);
  assert(/aria-expanded=["']false["']/.test(html), `${page}: menu toggle exposes collapsed state`);
}

const modules = [
  "styles.v3.6.css", "styles.v3.7.css",
  "navigation.v3.6.js", "experience.v3.6.js", "experience.v3.7.js",
  "app.v3.5.js", "app.js", "story.v3.5.js", "story.core.v3.5.js"
];
for (const module of modules) assert(fs.existsSync(path.join(root, module)), `${module}: module exists`);

const appLoader = fs.readFileSync(path.join(root, "app.v3.5.js"), "utf8");
const storyLoader = fs.readFileSync(path.join(root, "story.v3.5.js"), "utf8");
for (const [name, loader] of [["app.v3.5.js", appLoader], ["story.v3.5.js", storyLoader]]) {
  assert(/styles\.v3\.6\.css/.test(loader), `${name}: loads the Phase 3.6 style layer`);
  assert(/styles\.v3\.7\.css/.test(loader), `${name}: loads the Phase 3.7 style layer`);
  assert(/navigation\.v3\.6\.js/.test(loader), `${name}: loads shared navigation`);
  assert(/experience\.v3\.6\.js/.test(loader), `${name}: loads Phase 3.6 experience`);
  assert(/experience\.v3\.7\.js/.test(loader), `${name}: loads Phase 3.7 experience`);
  assert(/3\.7\.0/.test(loader), `${name}: identifies build 3.7.0`);
}

assert(/coreModule\s*=\s*["']app\.js["']/.test(appLoader), "app.v3.5.js: loads the homepage core locally");
assert(/coreModule\s*=\s*["']story\.core\.v3\.5\.js["']/.test(storyLoader), "story.v3.5.js: loads the Story core locally");
assert(!/https?:\/\//.test(appLoader), "app.v3.5.js: has no external core dependency");
assert(!/https?:\/\//.test(storyLoader), "story.v3.5.js: has no external core dependency");

const navigation = fs.readFileSync(path.join(root, "navigation.v3.6.js"), "utf8");
const styles36 = fs.readFileSync(path.join(root, "styles.v3.6.css"), "utf8");
const styles37 = fs.readFileSync(path.join(root, "styles.v3.7.css"), "utf8");
const experience37 = fs.readFileSync(path.join(root, "experience.v3.7.js"), "utf8");
assert(/aria-modal/.test(navigation), "navigation: modal semantics are established");
assert(/trapFocus/.test(navigation), "navigation: focus is trapped while open");
assert(/\.inert = true/.test(navigation), "navigation: background content becomes inert");
assert(/safe-area-inset/.test(styles36), "styles: safe-area support is present");
assert(/prefers-reduced-motion/.test(styles36 + styles37), "styles: reduced-motion support is present");
assert(/object-fit:\s*contain/.test(styles37), "Phase 3.7: station artwork is configured to remain fully visible");
assert(/initJourneySequence/.test(experience37), "Phase 3.7: centre-stage journey sequence exists");
assert(/3800/.test(experience37), "Phase 3.7: Story transition duration is approximately 3–4 seconds");
assert(/sessionStorage/.test(experience37), "Phase 3.7: Story arrival continuity is implemented");

if (failed) process.exit(1);
console.log("\nSAMT Phase 3.7 static quality gate passed.");
