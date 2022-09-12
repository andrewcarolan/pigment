const Prism = require("prismjs");
const fs = require("fs");
const pug = require("pug");

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

const html = pug.renderFile("./src/template.pug", locals);
fs.writeFileSync("./dist/formatted.html", html);
