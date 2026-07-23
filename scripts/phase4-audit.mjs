import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "index.html",
  "story-of-samt.html",
  "story-of-samt-ar.html",
  "styles.v4.css",
  "app.v4.js",
  "robots.txt",
  "sitemap.xml"
];

const failures = [];
const notes = [];
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const fail = message => failures.push(message);
const assert = (condition, message) => { if (!condition) fail(message); };

for (const file of required) assert(fs.existsSync(path.join(root, file)), `Missing required file: ${file}`);

for (const file of ["index.html", "story-of-samt.html", "story-of-samt-ar.html"]) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const html = read(file);
  assert(/<!doctype html>/i.test(html), `${file}: missing HTML doctype`);
  assert(/<meta charset="utf-8"/i.test(html), `${file}: missing UTF-8 charset`);
  assert(/<meta name="viewport"/i.test(html), `${file}: missing responsive viewport`);
  assert(/Content-Security-Policy/i.test(html), `${file}: missing Content Security Policy`);
  assert(/class="skip-link"/i.test(html), `${file}: missing skip link`);
  assert(/<main\b/i.test(html), `${file}: missing main landmark`);
  assert(/<h1\b/i.test(html), `${file}: missing H1`);
  assert(!/<script[^>]+src="https?:\/\//i.test(html), `${file}: contains third-party executable script`);
  assert(!/javascript:/i.test(html), `${file}: contains javascript: URL`);
  assert(!/\son[a-z]+\s*=/i.test(html), `${file}: contains inline event handler`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert(duplicates.length === 0, `${file}: duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);

  const references = [...html.matchAll(/\s(?:src|href)="([^"]+)"/g)].map(match => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|#|mailto:|tel:|data:)/.test(reference)) continue;
    const clean = reference.split(/[?#]/)[0];
    if (!clean || clean.endsWith("/")) continue;
    assert(fs.existsSync(path.join(root, clean)), `${file}: broken local reference ${reference}`);
  }
}

const index = read("index.html");
assert(/data-build="phase4-v4\.0"/.test(index), "index.html: Phase 4 build marker missing");
assert(/class="story-transition"/.test(index), "index.html: Story transition missing");
assert((index.match(/class="journey-card/g) || []).length === 6, "index.html: journey must contain six stages");
assert(/object-fit:contain/.test(read("styles.v4.css").replace(/\s+/g, "")), "styles.v4.css: station artwork contain rule missing");
assert(/prefers-reduced-motion/.test(read("styles.v4.css")), "styles.v4.css: reduced-motion handling missing");

const storyEn = read("story-of-samt.html");
const storyAr = read("story-of-samt-ar.html");
assert(/<html lang="en" dir="ltr"/.test(storyEn), "English Story: incorrect lang/dir");
assert(/<html lang="ar" dir="rtl"/.test(storyAr), "Arabic Story: incorrect lang/dir");
assert((storyEn.match(/class="story-section"/g) || []).length === 6, "English Story: expected six chapters");
assert((storyAr.match(/class="story-section"/g) || []).length === 6, "Arabic Story: expected six chapters");
assert(storyEn.includes("story-of-samt-ar.html") && storyAr.includes("story-of-samt.html"), "Story pages: reciprocal language links missing");
assert(/hreflang="ar"/.test(storyEn) && /hreflang="en"/.test(storyAr), "Story pages: hreflang missing");

const app = read("app.v4.js");
assert(/prefers-reduced-motion/.test(app), "app.v4.js: reduced-motion logic missing");
assert(/sessionStorage/.test(app), "app.v4.js: first-session transition control missing");
assert(/inert/.test(app), "app.v4.js: focus isolation missing");
assert(/ArrowLeft/.test(app) && /ArrowRight/.test(app), "app.v4.js: keyboard tab navigation missing");

notes.push(`Checked ${required.length} required release files.`);
notes.push("Validated HTML landmarks, metadata, local references, duplicate IDs, bilingual Story architecture, reduced motion and key interaction controls.");

if (failures.length) {
  console.error("\nPhase 4 static audit FAILED\n");
  failures.forEach((message, index) => console.error(`${index + 1}. ${message}`));
  process.exit(1);
}

console.log("\nPhase 4 static audit PASSED\n");
notes.forEach(note => console.log(`- ${note}`));