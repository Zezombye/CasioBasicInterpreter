programExamples["lines"] = [
    {
        "type": "program",
        "name": "LINES",
        "content": "-100->A\nViewWindow 1,127,0,1,63,0\nLbl 1\nProg \"RNDCOLOR\"\nProg \"RNDTHICK\"\nF-Line 127Ran# ,63Ran# ,127Ran# ,63Ran#\nIsz A\nGoto 1",
    },{
        "type": "program",
        "name": "RNDCOLOR",
        "content": "1+Int (7Ran# ) -> F\nIf F = 1\nThen Plot/Line-Color Black\nElse If F = 2\nThen Plot/Line-Color Blue\nElse If F = 3\nThenPlot/Line-Color Red\nElse If F = 4\nThenPlot/Line-Color Magenta\nElse If F = 5\nThenPlot/Line-Color Green\nElse If F = 6\nThenPlot/Line-Color Cyan\nElse If F = 7\nThen Plot/Line-Color Yellow\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd",
    },{
        "type": "program",
        "name": "RNDTHICK",
        "content": "1+Int (5Ran# ) -> F\nIf F = 1\nThen S-L-Dot\nElse If F = 2\nThen S-L-Broken\nElse If F = 3\nThen S-L-Thick\nElse If F = 4\nThen S-L-Normal\nElse If F = 5\nThen S-L-Thin\nIfEnd\nIfEnd\nIfEnd\nIfEnd\nIfEnd",
    }
]