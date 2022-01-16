programExamples["getkey"] = [
    {
        "type": "program",
        "name": "GETKEY",
        "content": "Locate 3,4,\"GetKey :\"\nLbl 0\nGetkey→Z\nIf Z≠O\nThen Locate 12,4,\"   \"\nIfEnd\nLocate 12,4,Z\nZ→O\nGoto 0",
    }
]