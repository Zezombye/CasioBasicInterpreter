function casioToAscii(content, addSpaces) {
    var allowedCharacters = " !#$%;@_`abcdefghijklmnopqrstuvwxyz|";
    
    //Opcodes causing indentation
    var indentOpcodes = [
        0xf700, //If
        0xf702, //Else
        0xf704, //For
        0xf708, //While
        0xf70a, //Do
    ]
    //Opcodes causing unindentation
    var unindentOpcodes = [
        0xf702, //Else
        0xf703, //IfEnd
        0xf707, //Next
        0xf709, //WhileEnd
        0xf70b, //LpWhile
    ];
    
    //Opcodes with added spaces
    var opcodesSpaces = {
        0x0E: {indent: options.indentOpcodes["->"], indentResult: " -> "},
        0x10: {indent: options.indentOpcodes["<="], indentResult: " <= "},
        0x11: {indent: options.indentOpcodes["!="], indentResult: " != "},
        0x12: {indent: options.indentOpcodes[">="], indentResult: " >= "},
        0x13: {indent: options.indentOpcodes["=>"], indentResult: " => "},
        0x2C: {indent: options.indentOpcodes[","], indentResult: ", "},
        0x3A: {indent: options.indentOpcodes[":"], indentResult: " : "},
        0x3C: {indent: options.indentOpcodes["<"], indentResult: " < "},
        0x3D: {indent: options.indentOpcodes["="], indentResult: " = "},
        0x3E: {indent: options.indentOpcodes[">"], indentResult: " > "},
        0x89: {indent: options.indentOpcodes["+"], indentResult: " + "},
        0x99: {indent: options.indentOpcodes["-"], indentResult: " - "},
        0xA8: {indent: options.indentOpcodes["^"], indentResult: " ^ "},
        0xA9: {indent: options.indentOpcodes["*"], indentResult: " * "},
        0xB9: {indent: options.indentOpcodes["/"], indentResult: " / "},
    };
    
    var lines = []
    var tabs = "";
    var currentLine = "";
    var indentLevel = 0;
    var currentIndentLevel = indentLevel;
    var unindentCurrentLineAndIndentNext = false;

    var currentPosIsString = false;
    var escapeNextChar = false;
    var currentPosIsComment = false;
    
    for (var i = 0; i < content.length; i++) {
        var foundMatch = false;
        
        //Allow characters that are not in the opcodes
        if (allowedCharacters.includes(""+content[i])) {
            currentLine += content[i];
            continue;
        }
        var hex = content.charCodeAt(i);
        if (hex === 0) {
            break;
        }
        var isMultiByte = isMultibytePrefix(hex);
        if (isMultiByte) {
            hex = hex * 256 + content.charCodeAt(i+1);
        }
        
        if (content[i] == '"' && !escapeNextChar) {
            currentPosIsString = !currentPosIsString;
        }
        if (content[i] == '\\' && !escapeNextChar) {
            escapeNextChar = true;
        } else {
            escapeNextChar = false;
        }
        if (content[i] == '\'' && !currentPosIsString) {
            currentPosIsComment = true;
        }
        if ((content[i] == '\r' || content[i] == ':') && !currentPosIsString) {
            currentPosIsComment = false;
        }
        if (content[i] == '\r') {
            currentPosIsString = false;
        }
        
        if (addSpaces && !currentPosIsString && !currentPosIsComment) {
            var addedSpaces = false;
            if (hex in opcodesSpaces && opcodesSpaces[hex].indent) {
                //Check for unary operators, which are there if there is another operator (and space) before it
                if (currentLine.length > 1 && currentLine[currentLine.length-1] === ' ' && (opcodesSpaces[hex].indentResult === " + ")||opcodesSpaces[hex].indentResult === " - ") {
                    currentLine += opcodesSpaces[hex].indentResult.trim();
                } else {
                    currentLine += opcodesSpaces[hex].indentResult;
                }
                addedSpaces = true;
            }
            if (addedSpaces) {
                continue;
            }
        }
        
        //Indent
        if (indentOpcodes.includes(hex)) {
            indentLevel++;
            tabs += "\t";
        }
        
        //Unindent
        if (unindentOpcodes.includes(hex) && indentLevel > 0) {
            indentLevel--;
            try {
                tabs = tabs.substring(1);
            } catch (e) {}
        }
        
        //line feed
        if (hex === 0x0D || hex === 0x0C) {
            
            currentLine = tabs + currentLine;
            //remove tab if unindenting
            
            if (unindentCurrentLineAndIndentNext) {
                currentIndentLevel--;
            }
            
            if (currentIndentLevel < indentLevel) {
                currentLine = currentLine.substring((indentLevel-currentIndentLevel));
            }
            if (unindentCurrentLineAndIndentNext) {
                indentLevel++;
                unindentCurrentLineAndIndentNext = false;
            }
            
            //Replace "\nThen" by ":Then\n"
            if (i+3 < content.length && content.substring(i, i+3) === "\x0D\xF7\x01") {
                //System.out.println("Replacing a then");
                currentLine += " :Then";
                i += 2;
            }
            
            lines.push(currentLine + (hex === 0x0C ? "◢" : "") + "\n");
            
            currentLine = "";
            currentIndentLevel = indentLevel;
            continue;
        }
        
        //Test for ascii opcodes such as ->, =>
        if ((hex === 0x3D || hex === 0x99) && i > 0) { //'=' or '-'
            var c = content[i-1];
            if (hex === 0x3D && (c === '!' || c === '>' || c === '<')) { //!= >= <=
                currentLine += "&=;";
                continue;
            }
            if (i < content.length-1) {
                c = content.charCodeAt(i+1);
                if (hex === 0x99 && i < content.length-1 && (c === 0x3E || c === 0x12)) { //-> ->=
                    currentLine += "&-;";
                    continue;
                }
                if (hex === 0x3D && i < content.length-1 && (c == 0x3E || c == 0x12)) { //=> =>=
                    currentLine += "&=;";
                    continue;
                }
            }
        }
        
        //System.out.println("Testing for opcode " + hex);
        for (var opcode of opcodes) {
            if (hex === opcode.hex) {
                if (!opcode.unicode || !options.allowUnicode) {
                    if (!currentPosIsString || opcode.text.length == 1 || opcode.text.startsWith("&") || "->=><=>=!=".includes(opcode.text)) {
                        currentLine += opcode.text;
                    } else {
                        currentLine += "&#" + opcode.hex.toString(16) + ";";
                    }
                } else {
                    if (!currentPosIsString || opcode.unicode.length == 1) {
                        currentLine += opcode.unicode;
                    } else {
                        currentLine += "&#" + opcode.hex.toString(16) + ";";
                    }
                }
                foundMatch = true;
                //System.out.println("Matches opcode " + opcodes.get(j).ascii);
                break;
            }
        }
        
        if (hex === 0xF702) { //Else
            unindentCurrentLineAndIndentNext = true;
            currentLine += "\n" + tabs;
        }
        
        if (!foundMatch) {
            console.log("WARNING: Unknown opcode 0x" + hex.toString(16));
            currentLine += "&#"+hex.toString(16)+";";
        }

        if (isMultiByte) i++;
        //System.out.print(Integer.toHexString(prog1.charAt(i)) + " ");
    }
    
    lines.push(currentLine);
        
    return lines.join("");
}

function isMultibytePrefix(prefix) {
    return [0xF7, 0x7F, 0xF9, 0xE5, 0xE6, 0xE7].includes(prefix)
}
