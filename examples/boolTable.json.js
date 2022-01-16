programExamples["boolTable"] = [
    {
        "type": "program",
        "name": "BOOLTABL",
        "content": "#lowres\nText 10,15,\"A\"\nText 10,25,\"B\"\nText 10,35,\"And\"\nText 10,49,\"Or\"\nText 10,60,\"Xor\"\nText 10,75,\"Not A\"\nText 10,98,\"Not B\"\n0->A\n20->I\nDo\n0->B\nDo\nText I,15,A\nText I,25,B\nText I,40,A And B\nText I,51,A Or B\nText I,63,A Xor B\nText I,82,Not A\nText I,105,Not B\nI+7->I\nB+1->B\nLpWhile B<2\nA+1->A\nLpWhile A<2",
    }
]