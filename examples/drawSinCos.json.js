programExamples["drawSinCos"] = [
    {
        "type": "program",
        "name": "DRAW",
        "content": "ViewWindow -2π, 2π, π/4, -1.6, 1.6, 0.5\nGridOn\nAxesOn\nRad\nCls\n.2->S\nFor Xmin->X to Xmax+S Step S\n  Red F-Line X-S, cos (X-S), X, cos X\nNext\nFor Xmin->X to Xmax+S Step S\n  Green F-Line X-S, sin (X-S), X, sin X\nNext\nGridOff\nAxesOff",
    }
]