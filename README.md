# Pigment: a syntax highlighting utility

Takes an input file, applies syntax highlighting, and writes it into an HTML file so you can copy-paste the content elsewhere.

It uses Prism for formatting and supports JavaScript, TypeScript, and HTML.

## Installation

Install the module globally using the git URL for this repo:

```
npm i -g <git URL>
```

## Usage

Pigment writes the syntax-highlighted code to an HTML file and opens it your browser.

Run

```
pigment <input file> [<tab width>]
```

The default Prism theme will be applied along with this package's [custom styles](./src/scss/_custom.scss).
