programExamples["footballPitch"] = [
    {
        "type": "program",
        "name": "IMG'FOOT",
        "content": "#hires\n#multicolor\n'Inspired from \"Fifaa 19\" by Manolo\nRad\nPlot/Line-Color Black\nS-L-Normal\nViewWindow 1, 379, 0, 187, 1, 0\nFor 1 -> U To 187 Step 5\n	Green SketchThick Horizontal U\nNext\nF-Line 6, 72, 1, 67\nF-Line 6, 116, 1, 121\nF-Line 374, 72, 379, 67\nF-Line 374, 116, 379, 121\nF-Line 1, 67, 1, 121\nF-Line 379, 67, 379, 121\nCircle 190, 94, 50\nCircle 190, 94, 2\nVertical 190\nF-Line 1, 62, 26, 62\nF-Line 1, 126, 26, 126\nF-Line 26, 62, 26, 126\nF-Line 379, 62, 354, 62\nF-Line 379, 126, 354, 126\nF-Line 354, 62, 354, 126\nF-Line 1, 34, 51, 34\nF-Line 1, 154, 51, 154\nF-Line 51, 34, 51, 154\nF-Line 379, 34, 329, 34\nF-Line 379, 154, 329, 154\nF-Line 329, 34, 329, 154\nπ -> Z\nPlotOn 51,54\nDo\n	51 + 40*sin (Z) -> A\n	94 + 40*cos (Z) -> B\n	PlotOn A, B\n        Line\n	Z - π/10 -> Z\nLpWhile Z > -.1\nπ -> Z\nPlotOn 329,54\nDo\n	329 + 40*sin (Z) -> A\n	94 + 40*cos (Z) -> B\n	PlotOn A, B\n        Line\n	Z + π/10 -> Z\nLpWhile Z < 2π + .1",
    }
]