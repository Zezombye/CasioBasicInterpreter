programExamples["textMenu"] = [
    {
        "type": "program",
        "name": "TEXTMENU",
        "content": "Locate 5,1,\"== MENU ==\"\nLocate 9,3,\"Prog 1\"\nLocate 9,4,\"Prog 2\"\nLocate 9,5,\"Prog 3\"\nLocate 9,6,\"Exit\"\n0->K\n1->A\nLbl 1\nGetKey->K\nA->O\nK=28=>A-1->A\nK=37=>A+1->A\nA>4=>1->A\nA<1=>4->A\nA<>O=>Locate 6,O+2,\"  \"\nLocate 6,A+2,\"=>\"\nK=31=>Goto 2\nGoto 1\nLbl 2\nClrText\nLocate 1,1,\"You choose...\"\nA=1=>Locate 2,2,\"... prog 1\"\nA=2=>Locate 2,2,\"... prog 2\"\nA=3=>Locate 2,2,\"... prog 3\"\nA=4=>Locate 2,2,\"... to exit !\"",
    }
]