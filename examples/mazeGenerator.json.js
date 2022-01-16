programExamples["mazeGenerator"] = [
    {
        "type": "program",
        "name": "MAZEGEN",
        "content": "ViewWindow 0,126,0,62,0,0\nFor 0->B To 13\n  For 0->A To 25\n    RanInt#(0,1)->C\n    F-line 5A,5(B+C),5(A+1),5(B+1-C)\n  Next\nNext",
    }
]