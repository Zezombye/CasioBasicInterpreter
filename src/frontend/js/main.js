
var tabToModelMap = {};
var tabEditorStates = {};
var currentSelectedTab = null;

function loadFromUrl() {
    var urlToLoad = document.getElementById("urlLoader").value;

    var request = new XMLHttpRequest();
    request.open('GET', urlToLoad, true);

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                var srcCode = this.responseText;
                document.getElementById("srcCode").value = srcCode;
                executeCode();
            } else {
                document.getElementById("status").innerHTML = 'Unable to load content from Url !';
            }
        }
    };

    request.send();
    request = null;
}

//Create calculator keys
for (var row of calcKeys) {
    calcKeyDiv = document.getElementById("calculator-keys");
    //<button class="buttonVert" onmousedown="calcKeyDown(79)" onmouseup="calcKeyUp()" >F1</button>
    for (var key of row) {
        keyElem = document.createElement("button");
        keyElem.className = "buttonVert";
        keyElem.innerText = key.displayName;
        let calcCode = key.calcCode;
        keyElem.onmousedown = function () {
            calcKeyDown(calcCode);
        }
        keyElem.onmouseup = function () {
            calcKeyUp();
        }
        calcKeyDiv.appendChild(keyElem);
    }
    calcKeyDiv.appendChild(document.createElement("br"));
}

//Create special chars buttons
var specialCharsDiv = document.getElementById("specialChars");
for (let char of specialChars) {
    var button = document.createElement("button");
    button.onclick = function () {
        insertSpecialChar(char);
    }
    button.innerText = char;
    specialCharsDiv.appendChild(button);
}

//Create example programs buttons
var exampleProgramsDiv = document.getElementById("examplePrograms");
for (let program in programExamples) {
    let text = program.split(/(?=[A-Z])/).map(x => x[0].toUpperCase() + x.substring(1).toLowerCase()).join(' ');
    var button = document.createElement("button");
    button.onclick = function () {
        loadProg(program);
    }
    button.innerText = text;
    exampleProgramsDiv.appendChild(button);
}

function insertSpecialChar(specialChar) {
    window.editor.trigger('keyboard', 'type', { text: specialChar });
}

function addTab(tabName, content) {
    tabToModelMap[tabName] = monaco.editor.createModel(content, "basic-casio");
    tab = document.createElement("span");
    tab.className = "tab";
    tab.innerText = tabName;
    tab.onclick = function () {
        selectTab(tabName);
    }
    document.getElementById("editorTabs").appendChild(tab);
}

function selectTab(tabName) {
    if (currentSelectedTab !== null) {
        tabEditorStates[currentSelectedTab] = editor.saveViewState();
    }
    currentSelectedTab = tabName;
    for (var tab of document.getElementsByClassName("tab")) {
        if (tab.innerText === tabName) {
            tab.classList.add("active");
        } else {
            tab.classList.remove("active");
        }
    }

    editor.setModel(tabToModelMap[tabName]);
    if (tabName in tabEditorStates) {
        editor.restoreViewState(tabEditorStates[tabName]);
    }
    editor.focus();
}

async function loadProg(sourceName) {
    stopCodeExecution();
    monaco.editor.getModels().forEach(model => model.dispose());
    document.querySelectorAll('.tab').forEach(e => e.remove());
    tabEditorStates = {};
    tabToModelMap = {};
    currentSelectedTab = null;
    var srcCode = programExamples[sourceName];
    if (typeof srcCode === "string") {
        srcCode = g1mToJson(srcCode);
    }
    for (var part of srcCode) {
        if (part.type === "program") {
            if (!part.content.startsWith("#Program name: ")) {
                part.content = "#Program name: " + part.name + "\n#Password: <no password>\n\n" + part.content;
            }
            addTab(part.name, part.content);
        }
    }
    selectTab(srcCode[0].name);
    // document.getElementById("srcCode").value = srcCode;
    //window.editor.setValue(JSON.stringify(srcCode));
    //window.editor.setScrollPosition({scrollTop: 0})
    executeCode();
}

function loadProgFromSrc(srcCode) {
    stopCodeExecution();
    window.editor.setValue(srcCode);
    window.editor.setScrollPosition({ scrollTop: 0 })
    executeCode();
}

function displayStatusMsg(statusMsg, detailLong) {
    document.getElementById("status").innerHTML = statusMsg + (detailLong ? (' <span title="' + detailLong + '"><i class="fa fa-question-circle" aria-hidden="true"></i></span>') : '');
}

function removeErrorLines() {
    /*var lineCount = myCodeMirror.getDoc().lineCount();
    for (var i = 0; i< lineCount; i++) {
        myCodeMirror.getDoc().removeLineClass(i, "background", "error");
    }*/
    //TODO, useful?
}

function executeCode() {
    removeErrorLines();
    var srcCode = []
    for (var model of monaco.editor.getModels()) {
        tabContent = model.getValue().trim();
        if (tabContent.startsWith("#Program name: ")) {
            programName = tabContent.substring(0, tabContent.indexOf("\n")).substring("#Program name: ".length);
            srcCode.push({ "type": "program", "name": programName, "content": tabContent });
        }
    }
    $("#code").val(srcCode);
    $("#codesize").text(srcCode.length);
    document.getElementById("calc-screen-text").focus();
    document.getElementById("srcCode").className = 'readOnly';
    //myCodeMirror.setOption("readOnly", "nocursor");
    //myCodeMirror.setOption("className", "readOnly");
    document.getElementById("status").innerHTML = '';
    $("#statusbar").hide();
    if (idTimerMain == 0) {
        jsccRun(srcCode, function (errorCode, msg, programs, detail, lineNumber) {
            if (errorCode > 0) {
                if (detail && detail.indexOf("\n") != -1) {
                    displayStatusMsg(msg, detail);
                } else {
                    displayStatusMsg(msg + (detail ? detail : ""));
                }
                if (lineNumber) {
                    //myCodeMirror.getDoc().addLineClass(lineNumber - 1, "background", "error");
                    jumpToLine(lineNumber);
                }
            }
            //document.getElementById("srcCode").disabled = false;
            document.getElementById("srcCode").className = '';
            //myCodeMirror.setOption("readOnly", false);
        });
    }
}

function stopCodeExecution() {
    finish(EXIT_STOPPED, "Stopped on user request.");
}

function jumpToLine(i) {
    /*var t = myCodeMirror.charCoords({line: i, ch: 0}, "local").top;
    var middleHeight = myCodeMirror.getScrollerElement().offsetHeight / 2;
    myCodeMirror.scrollTo(null, t - middleHeight - 5);*/
    //TODO, redo with marks on sidebar
}

window.onload = function () {
    var url_string = window.location.href
    var url = new URL(url_string);
    var compressedSrcCode = url.searchParams.get("src");
    if (compressedSrcCode) {
        var decompressedSrcCode = LZString.decompressFromEncodedURIComponent(compressedSrcCode);
        loadProgFromSrc(decompressedSrcCode);
    } else {
        loadProg("helloWorld");
    }
}