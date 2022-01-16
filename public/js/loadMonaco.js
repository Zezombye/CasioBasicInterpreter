
require.config({ paths: { 'vs': '../lib/monaco-editor/min/vs' }});
require(['vs/editor/editor.main'], function() {

	monaco.languages.register({id: "basic-casio"});
	monaco.languages.setMonarchTokensProvider("basic-casio", {
		// Set defaultToken to invalid to see what you do not tokenize yet
		// defaultToken: 'invalid',

		// The main tokenizer for our languages
		ignoreCase: false,
		tokenizer: {
			root: [

                //TODO: add everything
				[/'[^:\n]*/, 'comment' ],
				[/^#.*/, "preprocessor"],
				[/&.*?;"/, "entity"],

				[/"[^"\\]*(\\.[^"\\]*)*"/, "string"],

				[/\b(Mat|List|Str|Vct|Ans|[A-Z]|([abc](0|1|2|\uE027|\uE028|\uE029|nStart))\b)|&r;|&theta;|[\uE015\u03B8]/, "variable"],

				[/=>|:|&disp;|\u25E2|\b(|If|Else|Then|IfEnd|For|To|Step|Next|Do|LpWhile|While|WhileEnd|Prog|Return|Stop|Break|Goto|Lbl)\b/, "keyword"],

				[/\b(And|Or|Xor|Not|Rmdr)\b|&neg;|&E;|&_10;|&sqrt;|&cbrt;|&nth_root;|&nCr;|&nPr;|&femto;|&pico;|&nano;|&micro;|&milli;|&kilo;|&mega;|&giga;|&tera;|&peta;|&exa;|&frac;|&\^-1;|&\^2;|&angle;|\!|\*|\+|\-|\!\=|\/|\:|\<|\=|\>|\?|\^|\~|\%|\uE064|\uE00D|\uE00F|\uE000|\uE001|\uE002|\uE003|\uE004|\uE005|\u00B2|\uFE63|\u221A|\u2220|\uE02D|\uE008|\uE01B|\u231F|\uE02B|\u00B5/, "operator"],
                
				[/\b(S-L-Normal|S-L-Thick|S-L-Broken|S-L-Dot|S-Gph1|S-Gph2|S-Gph3|S-WindAuto|S-WindMan|G-Connect|G-Plot|F-Line|S-L-Thin|List-\>Mat\(|Mat-\>List\(|1-Variable|2-Variable|S-Gph1|S-Gph2|S-Gph3|BG-None|BG-Pict|StoV-Win|RclV-Win|Exp-\>Str)\b/, "function"],
			],
		},
	});

	monaco.editor.defineTheme("basic-casio-theme", {
		base: "vs",
		inherit: false,
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
		wordWrap: "on",
		automaticLayout: true,
        fontFamily: 'DejaVuAvecCasio',
        renderWhitespace: "none",
	});
});
window.onresize = function (){
	editor.layout();
};
