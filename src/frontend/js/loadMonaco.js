
require.config({ paths: { 'vs': 'lib/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {

	monaco.languages.register({id: "basic-casio"});
	monaco.languages.setMonarchTokensProvider("basic-casio", {

		variables: [
			"Mat", "List", "Str", "Vct", "Ans",
			"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
			"a0", "a1", "a2", "a\uE027", "a\uE028", "a\uE029", "anStart",
			"b0", "b1", "b2", "b\uE027", "b\uE028", "b\uE029", "bnStart",
			"c0", "c1", "c2", "c\uE027", "c\uE028", "c\uE029", "cnStart",
			"\uE015", "\u03B8", //r, theta
		],
		keywords: [
			"If", "Else", "Then", "IfEnd", "For", "To", "Step", "Next", "Do", "LpWhile", "While", "WhileEnd", "Prog", "Return", "Stop", "Break", "Goto", "Lbl", "\u25E2",
		],
		operatorWords: [
			"And", "Or", "Xor", "Not", "Rmdr",
		],
		keywordOperators: ["=>", ":"],
		operators: [
			"~", "+", "-", "*", "/", "^", "<", ">", "=", "!=", "?", "->", "<=", ">=", "%",
			"\uE064", "\uE00D", "\uE00F", "\uE000", "\uE001", "\uE002", "\uE003", "\uE004", "\uE005", "\u00B2", "\uFE63", "\u221A", "\u2220", "\uE02D", "\uE008", "\uE01B", "\u231F", "\uE02B", "\u00B5",
		],

		entities: /&.*?;/,

		keywordEntities: [
			"&disp;",
		],
		operatorEntities: [
			"&neg;", "&E;", "&_10;", "&sqrt;", "&cbrt;", "&nth_root;", "&nCr;", "&nPr;", "&femto;", "&pico;", "&nano;", "&micro;", "&milli;", "&kilo;", "&mega;", "&giga;", "&tera;", "&peta;", "&exa;", "&frac;", "&^-1;", "&^2;", "&angle;"
		],
		variableEntities: [
			"&r;", "&theta;",
		],


		tokenizer: {
			root: [

				[/'[^:\n]*/, 'comment' ],
				[/^#.*/, "preprocessor"],
				[/@entities/, {cases: {
					"@variableEntities": "variable",
					"@operatorEntities": "operator",
					"@keywordEntities": "keyword",
					"@default": "entity",
				}}],
				
				[/\b(S-L-Normal|S-L-Thick|S-L-Broken|S-L-Dot|S-Gph1|S-Gph2|S-Gph3|S-WindAuto|S-WindMan|G-Connect|G-Plot|F-Line|S-L-Thin|1-Variable|2-Variable|S-Gph1|S-Gph2|S-Gph3|BG-None|BG-Pict|StoV-Win|RclV-Win)\b|List-\>Mat\(|Mat-\>List\(|Exp-\>Str/, "function"],

				[/"[^"\\]*(\\.[^"\\]*)*("|$)/, "string"],

				[/[\w\uE027-\uE029\uE015\u03B8\u25E2&;$]+/, {cases: {
					"@variables": "variable",
					"@keywords": "keyword",
					"@operatorWords": "operator",
				}}],

				[/[-=<>!:*+\/?\^~%]+/, {cases: {
					"@keywordOperators": "keyword",
					"@operators": "operator",
				}}],

				[/\uE064|\uE00D|\uE00F|\uE000|\uE001|\uE002|\uE003|\uE004|\uE005|\u00B2|\uFE63|\u221A|\u2220|\uE02D|\uE008|\uE01B|\u231F|\uE02B|\u00B5/, "operator"],
                
			],
		},
	});

	monaco.editor.defineTheme("basic-casio-theme", {
		base: "vs",
		inherit: true,
		rules: [
			{
				token: "comment",
				foreground: "008000",
                fontStyle: 'italic',
			},{
				token: "preprocessor",
				foreground: "804000",
			},{
				token: "entity",
				foreground: "FF8000",
			},{
				token: "string",
				foreground: "808080",
			},{
				token: "operator",
				foreground: "0080FF",
			},{
				token: "variable",
				foreground: "8000FF",
			},{
				token: "keyword",
				foreground: "0000FF",
			},{
				token: "function",
				foreground: "000000",
			}
		],
        colors: {
            'editor.foreground': '#000000'
        }
	})

	window.editor = monaco.editor.create(document.getElementById('srcCode'), {
		language: 'basic-casio',
		theme: "basic-casio-theme",
		wordWrap: true,
		wrappingStrategy: "advanced",
		automaticLayout: true,
        fontFamily: 'DejaVuAvecCasio',
        renderWhitespace: "none",
		model: null,
	});
});
window.onresize = function (){
	editor.layout();
};
