programExamples["polygon"] = [
    {
        "type": "program",
        "name": "POLYGON",
        "content": "\n#\n# POLYGONE REGULIER\n#\nDeg\nMcl\nRange 1,127,0,1,63,0\n\" -- POLYGON -- \"\n\"NB COTE \"?->N\n\"RAYON (px) \"?->r\n360/N->A\nPlot 64+r,32\n0->θ\nLbl 1\nθ+A->θ\nRec(r,θ)\nPlot List Ans[0]+64,List Ans[1]+32\nLine\nθ<360=>Goto 1",
    }
]