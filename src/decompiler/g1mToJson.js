
const TYPE_PROG = "program";
const TYPE_PICT = "picture";
const TYPE_CAPT = "capture";

var options = {
    allowUnicode: true,
    indentOpcodes: {
        "->": true,
        "<=": true,
        "!=": true,
        ">=": true,
        "=>": true,
        ",": true,
        ":": true,
        "<": true,
        "=": true,
        ">": true,
        "+": true,
        "-": true,
        "^": true,
        "*": true,
        "/": true,
    }
}

function g1mToJson(content) {
    content = atob(content);
    if (!checkG1mValidity(content)) {
        console.log("Invalid g1m: "+content.substring(0,8)+" " + "\xAA\xAC\xBD\xAF\x90\x88\x9A\x8D");
        return;
    }

    var parts = divideG1MIntoParts(content);
    var result = []

    for (var part of parts) {
			
        if (getG1mPartType(part) == TYPE_PROG) {
            
            var progName = casioToAscii(getG1mPartName(part), false);
            //Check for "base" program
            var isBaseProgram = false;
            if (part.charCodeAt(52) == 0x01) {
                if (options.allowUnicode) {
                    progName += "";
                } else {
                    progName += "&negative_B;";
                }
                isBaseProgram = true;
            }
            var progPw = casioToAscii(part.substring(44, 52), false);

            if (progPw.length === 0) {
                progPw = "<no password>";
            }
            console.log("Found program \"" + progName + "\"" + (isBaseProgram ? " (base program)" : ""));
            
            var progContent = casioToAscii(getG1mPartContent(part).substring(10), true);
            
            progContent = "#Program name: "+progName+"\n#Password: <no password>\n\n"+progContent;
                        
            result.push({
                type: TYPE_PROG,
                name: progName,
                password: progPw,
                content: progContent,
            })
        } else if (getG1mPartType(part) == TYPE_PICT || getG1mPartType(part) == TYPE_CAPT) {
            var name = casioToAscii(getG1mPartName(part), false);

            var partContent = null;
            if (getG1mPartType(part) == TYPE_PICT) {
                console.log("Found picture \""+name+"\"");
                partContent = getG1mPartContent(part);
            } else {
                console.log("Found capture \""+name+"\"");
                //Captures have a width and height attribute, skip it
                partContent = getG1mPartContent(part).substring(4, 0x404);
            }
            
            //System.out.println("byte content : "+Arrays.toString(result));
            result.push({
                type: getG1mPartType(part),
                name: name,
                size: (getG1mPartType(part) == TYPE_PICT ? partContent.length : 0x400),
                content: partContent,
            })
        }
    }

    return result;

}

function checkG1mValidity(content) {
    return content.substring(0, 8) === "\xAA\xAC\xBD\xAF\x90\x88\x9A\x8D"
}

function divideG1MIntoParts(content) {
    var fileIndex = 32;
    var parts = []
    while (fileIndex < content.length) {
        
        //Check if there are subparts
        //If so, skip them (since they are not a program, capture, or picture)
        //Note: this is very dirty
        if (content.charCodeAt(fileIndex+0x13) > 1) {
            var nbSubparts = content.charCodeAt(fileIndex+0x13);
            //System.out.println("found something with "+nbSubparts+" subparts");
            fileIndex += 0x14;
            for (var h = 0; h < nbSubparts; h++) {
                //System.out.println("parsing subpart "+fileContent.substring(8+fileIndex, 16+fileIndex));
                var partSize = 0x18;
                for (var i = 0; i < 4; i++) {
                    partSize += ((content.charCodeAt(fileIndex+0x11+i)&0xFF)<<(8*(3-i)));
                }
                //System.out.println("has part size of "+partSize);
                fileIndex += partSize;
            }
            continue;
        }
        
        //Seek the size of the part and add size of header which is 44 bytes long
        //Lots of magic numbers in there
        var partSize = 44;
        for (var i = 0; i < 4; i++) {
            partSize += ((content.charCodeAt(fileIndex+37+i)&0xFF)<<(8*(3-i)));
        }
        //System.out.println("Parsing current part "+getPartName(currentPart)+", type "+getPartType(currentPart));
        //fileContent.charAt(fileIndex+37)*16777216 + fileContent.charAt(fileIndex+38)*65536 + fileContent.charAt(fileIndex+39)*256 + fileContent.charAt(fileIndex+40) + 44;
        parts.push(content.substring(fileIndex, fileIndex+partSize));
        fileIndex += partSize;
    }
    //System.out.println(parts);
    return parts;
}

function getG1mPartContent(part) {
    return part.substring(44);
}

function getG1mPartName(part) {
    return part.substring(28, 36);
}

function getG1mPartType(part) {
    var type = part.charCodeAt(36);
    switch (type) {
        case 0x01:
            return TYPE_PROG;
        case 0x07:
            return TYPE_PICT;
        case 0x0A:
            return TYPE_CAPT;
        default:
            console.log("Unknown type 0x"+type.toString(16));
            return -1;
    }
}
