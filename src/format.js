const Prism = require("prismjs");
const fs = require("fs");
const pug = require("pug");
const open = require("open");
const sass = require("sass");

const INPUT_DIR = "./src";
const OUTPUT_DIR = "./output";

const [inputFile] = process.argv.slice(2);
const extension = inputFile.split(".").pop();

let language;

switch (extension) {
  case "ts":
    language = "typescript";
    break;
  case "html":
    language = extension;
    break;
  case "js":
  default:
    language = "javascript";
    break;
}

if (language === "typescript") {
  const loadLanguages = require("prismjs/components/");
  loadLanguages(["typescript"]);
}

const code = fs.readFileSync(inputFile, { encoding: "utf8" });

if (!code.length) {
  console.log("No code");
  return;
}

const highlighted = Prism.highlight(code, Prism.languages[language], language);

const locals = {
  code: highlighted,
  language: `language-${language}`,
};

const html = pug.renderFile(`${INPUT_DIR}/template.pug`, locals);

const { css } = sass.compile(`${INPUT_DIR}/scss/theme.scss`);
fs.writeFileSync(`${OUTPUT_DIR}/theme.css`, css);

const outputFile = `${OUTPUT_DIR}/formatted.html`;
fs.writeFileSync(outputFile, html);
console.log(`Wrote file: ${outputFile}`);

open(outputFile);
