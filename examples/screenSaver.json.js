programExamples["screenSaver"] = [
    {
        "type": "program",
        "name": "SCRNSAVR",
        "content": "ViewWindow 1,10,0,10,1,0\nLbl 0\nCls\n1->A:1->B\nProg \"RNDCOLOR\"\nLbl 1\nF-Line 1,A,B,10\nIsz A:Isz B:A<>11=>Goto 1\n1->A:10->B\nProg \"RNDCOLOR\"\nLbl 2\nF-Line A,10,10,B\nIsz A:Dsz B:Goto 2\n10->A:10->B\nProg \"RNDCOLOR\"\nLbl 3\nF-Line A,1,10,B\nDsz A:Dsz B:Goto 3\n10->A:1->B\nProg \"RNDCOLOR\"\nLbl 4\nF-Line A,1,1,B\nIsz B:Dsz A:Goto 4\nGoto 0"
    },{
        "type": "program",
        "name": "RNDCOLOR",
        "content": "1+Int (7Ran# ) -> F\nIf F = 1\nThen Plot/Line-Color Black\nElse If F = 2\nThen Plot/Line-Color Blue\nElse If F = 3\nThen Plot/Line-Color Red\nElse If F = 4\nThen Plot/Line-Color Magenta\nElse If F = 5\nThen Plot/Line-Color Green\nElse If F = 6\nThen Plot/Line-Color Cyan\nElse If F = 7\nThen Plot/Line-Color Yellow\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd"
    }
]