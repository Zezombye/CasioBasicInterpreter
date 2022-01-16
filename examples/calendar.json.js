programExamples["calendar"] = [
    {
        "type": "program",
        "name": "CALUNIV",
        "content": "#lowres\n'\n'CALENDRIER UNIVERSEL\n'\n' v1.0 by Krevo_\n'\nViewWindow 1,127,0,1,63,0\nF-Line 76,8,76,55\n7->E\nLbl 4\nF-Line 10*E-4,8,10*E-4,55\nF-Line 6,8*E-1,76,8*E-1\nDsz E\nGoto 4\n7->E:0->C\nText 3,10,\"L\"\nText 3,19,\"M\"\nText 3,29,\"M\"\nText 3,40,\"J\"\nText 3,50,\"V\"\nText 3,60,\"S\"\nText 3,70,\"D\"\n\"CALENDRIER UNIVERSEL\"\nLbl 1\n\"ANNEE \"?->Y\n\"MOIS \"?->N\n1->D\nN!=Int (N)=>Goto 1\nY!=Int (Y)=>Goto 1\nD!=Int (D)=>Goto 1\nInt ((14-N)/12)->C\nY-C->A\nN+12*C-2->M\nD+A+Int (A/4)-Int (A/100)+Int (A/400)+Int ((31*M)/12)->J\nJ-Int (J/7)*7->P\nP=0=>7->P\n30->J\n(N/2)!=Int (N/2)=>N<=7=>31->J\n(N/2)=Int (N/2)=>N>=8=>31->J\nN=2=>28->J\nN=2=>Frac (Y/4)=0=>Frac (Y/100)>0=>29->J\nN=2=>Frac (Y/400)=0=>29->J\n1->N\nLbl 5\nN+P-1->O\nInt ((O-1)/7)+2->E\nO-(E-2)*7->D\n8-E->E\n(D-1)*10+8->A\nE*8+5->B\nInt (N/10)->C\nC!=0=>Text 64-B,A,C\nA+4->A\nFrac (N/10)*10->C\nText 64-B,A,C\nIsz N\nN<=J=>Goto 5",
    }
]