const Prism = require("prismjs");
const fs = require("fs");
const pug = require("pug");

const loadLanguages = require("prismjs/components/");
loadLanguages(["typescript"]);

const code = fs.readFileSync("./src/index.ts", { encoding: "utf8" });

if (!code.length) {
  console.log("No code");
  return;
}

let highlighted = Prism.highlight(
  code,
  Prism.languages.typescript,
  "typescript"
);

const locals = {
  code: highlighted,
  language: "language-typescript",
};

const html = pug.renderFile("./src/template.pug", locals);
fs.writeFileSync("./dist/formatted.html", html);
