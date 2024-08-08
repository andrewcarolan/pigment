![pigment logo](./src/static/logotype.png)

# pigment: a syntax highlighting utility

Applies syntax highlighting to input code so you can copy-paste the content elsewhere, for instance, into Google Slides.

It uses [Prism](https://prismjs.com/) for formatting.

The default Prism theme will be applied along with this package's [custom styles](./src/scss/_custom.scss).

## Command-line usage

### Install

To use on the command line, install the module globally using the Git URL for this repo:

```
npm i -g <URL>
```

### Run

```
pigment <input file>
```

Pigment writes the syntax-highlighted code to an HTML file and opens it your browser.

## Browser usage

### Build

```
npm run build
```

Serve the `dist/` directory.
