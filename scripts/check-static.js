const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const required = ["index.html", "styles.css", "script.js"];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error(`Missing required files: ${missing.join(", ")}`);
  process.exit(1);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

const checks = [
  [html.includes("<main"), "index.html has a main landmark"],
  [html.includes("https://images.unsplash.com/"), "index.html uses real remote imagery"],
  [(html.match(/<section/g) || []).length >= 5, "index.html includes the expected landing sections"],
  [css.includes("@media"), "styles.css includes responsive rules"],
  [js.includes("addEventListener"), "script.js wires interactive controls"]
];

const failed = checks.filter(([ok]) => !ok);

for (const [, label] of checks) {
  console.log(`ok - ${label}`);
}

if (failed.length) {
  process.exit(1);
}
