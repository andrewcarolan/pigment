#!/usr/bin/env node

const Prism = require("prismjs");
const fs = require("fs");
const path = require("node:path");
const pug = require("pug");
const open = require("open");
const sass = require("sass");

const OUTPUT_DIR = "output";

const [, , inputFile] = process.argv;

if (!inputFile?.length) {
  console.error("No input file specified");
  return 1;
}

let language;
const extension = inputFile.split(".").pop();

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
  console.error("Empty input file");
  return 1;
}

const highlighted = Prism.highlight(code, Prism.languages[language], language);

const locals = {
  code: highlighted,
  language: `language-${language}`,
};

const html = pug.renderFile(path.join(__dirname, "template.pug"), locals);

const { css } = sass.compile(path.join(__dirname, "scss", "theme.scss"));
fs.writeFileSync(
  path.join(__dirname, "..", OUTPUT_DIR, "css", "theme.css"),
  css
);

const outputFile = path.join(__dirname, "..", OUTPUT_DIR, "formatted.html");
fs.writeFileSync(outputFile, html);
console.log(`Wrote file: ${outputFile}`);

open(outputFile);
