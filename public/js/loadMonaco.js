
require.config({ paths: { 'vs': '../lib/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {

	//monaco.languages.register({id: "basic-casio"});
	//monaco.languages.setMonarchTokensProvider("basic-casio", {
	//	// Set defaultToken to invalid to see what you do not tokenize yet
	//	// defaultToken: 'invalid',
//
	//	// The main tokenizer for our languages
	//	ignoreCase: true,
	//	tokenizer: {
	//		root: [
//
    //            //TODO: add everything
	//			[/'[^:\n]*/, 'comment' ],
	//			[/#.*/, "preprocessor"],
//
	//			[/"[^"\\]*(\\.[^"\\]*)*"/, "string"],
//
	//			[/[-+]?[\d][\d.]*([eE][-+]?[\d.]+)?/, "number"],
//
	//			[/\b[A-Z]\b/, "variable"],
//
	//			[/\b(And|Or|Not|Xor)\b/, "keyword"],
	//			
	//			[/\b(If|IfEnd)\b/, "function"],
	//		],
	//	},
	//});
//
	//monaco.editor.defineTheme("basic-casio-theme", {
	//	base: "vs",
	//	inherit: false,
	//	rules: [
	//		{
	//			token: "comment",
	//			foreground: "008000",
	//		},{
	//			token: "preprocessor",
	//			foreground: "000080",
	//		},{
	//			token: "string",
	//			foreground: "808080",
	//		},{
	//			token: "number",
	//			foreground: "FF8000",
	//		},{
	//			token: "variable",
	//			foreground: "3A8762",
	//		},{
	//			token: "keyword",
	//			foreground: "0000FF",
	//		},{
	//			token: "function",
	//			foreground: "9B5656",
	//		}
	//	]
	//})

	window.editor = monaco.editor.create(document.getElementById('srcCode'), {
		//language: 'basic-casio',
		//theme: "basic-casio-theme",
		wordWrap: "on",
		automaticLayout: true,
	});
});
window.onresize = function (){
	editor.layout();
};
