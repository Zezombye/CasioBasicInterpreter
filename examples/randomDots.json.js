programExamples["randomDots"] = [
    {
        "type": "program",
        "name": "RANDDOTS",
        "content": "-500->A\nViewWindow 1,127,0,1,63,0\nLbl 1\nProg \"RNDCOLOR\"\nPlot Ran#*127, Ran#*63\nIsz A\nGoto 1"
    },{
        "type": "program",
        "name": "RNDCOLOR",
        "content": "1+Int (7Ran# ) -> F\nIf F = 1\nThen Plot/Line-Color Black\nElse If F = 2\nThen Plot/Line-Color Blue\nElse If F = 3\nThen Plot/Line-Color Red\nElse If F = 4\nThen Plot/Line-Color Magenta\nElse If F = 5\nThen Plot/Line-Color Green\nElse If F = 6\nThen Plot/Line-Color Cyan\nElse If F = 7\nThen Plot/Line-Color Yellow\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd"
    }
]