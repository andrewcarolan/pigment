#!/usr/bin/env node

const Prism = require("prismjs");
const fs = require("fs");
const path = require("node:path");
const pug = require("pug");
const open = require("open");
const sass = require("sass");

const OUTPUT_DIR = "output";
let [, , inputFile, theme] = process.argv;

const useCustomTheme = !theme;
theme = !theme ? "prism.css" : `prism-${theme}.css`;

if (!inputFile?.length) {
  console.error("No input file specified");
  return 1;
}

try {
  const outputPath = path.join(__dirname, "..", OUTPUT_DIR, "css");
  fs.mkdirSync(outputPath, { recursive: true });
  fs.accessSync(outputPath, fs.constants.W_OK);
} catch (err) {
  console.error("Can't write to output directory");
  return 1;
}

let language;
const extension = inputFile.split(".").pop();

switch (extension) {
  case "html":
    language = extension;
    break;
  case "ts":
  case "tsx":
    language = "typescript";
    break;
  case "js":
  case "jsx":
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
  console.error("Empty input file");
  return 1;
}

const highlighted = Prism.highlight(code, Prism.languages[language], language);

const locals = {
  code: highlighted,
  language: `language-${language}`,
  theme,
  useCustomTheme,
};

const themeScss = pug.renderFile(
  path.join(__dirname, "templates", "theme.scss.pug"),
  locals
);
fs.writeFileSync(path.join(__dirname, "scss", "theme.scss"), themeScss);

const { css } = sass.compile(path.join(__dirname, "scss", "theme.scss"));
fs.writeFileSync(
  path.join(__dirname, "..", OUTPUT_DIR, "css", "theme.css"),
  css
);

const html = pug.renderFile(
  path.join(__dirname, "templates", "formatted.html.pug"),
  locals
);

const outputFile = path.join(__dirname, "..", OUTPUT_DIR, "formatted.html");
fs.writeFileSync(outputFile, html);
console.log(`Wrote file: ${outputFile}`);

open(outputFile);
