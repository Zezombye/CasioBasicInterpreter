**"Casio Basic Web Interpreter"**
is a software able to interpret program written with the BASIC language used on casio calculators.
Output is done on an HTML5 canvas.

The javascript parser at the heart of this project is generated with JsCC.

### Generate the parser

The parser is generated from the grammar and then concatened with other javascript source files. You just have to do (you may have to install node.js before) :

```
> bash build.sh
```

Then, just open `index.html` in your browser to test it locally.

If you just want to use the interpreter, go to https://zezombye.github.io/CasioBasicInterpreter/index.html

### Unit tests

Once you have a `public/` directory generated, you can launch unit tests by opening `test/index.html` in your browser.
