programExamples["city"] = [
    {
        "type": "program",
        "name": "CITY",
        "content": "\n#\n# CITY\n# 1 ou 2 Joueurs\n#\n# VOUS ETES LE PERSONNAGE DE GAUCHE SUR L' ECRAN GRAPHIQUE. VOTRE BUT : TUER\n# AVEC UN TIR DE MORTIER BIEN PLACE VOTRE ENNEMI DE TOUJOURS\n# POUR CELA, VOUS DEVEZ INDIQUER L'ANGLE (EN DEGRE), PUIS LA FORCE DE TIR (ENTRE 50 ET 100 ENVIRON).\n# --------------------\nViewWindow 4,645,0,400,4,0\nDeg\n0->A~Z\n10->Dim List 1\n10->D\nLbl 0\nInt (Ran# *230)+170->List 1[D]\nDsz D\nGoto 0\nProg \"CITY3\"\n2->S:101->T:Prog \"CITY2\"\n9->S:548->T:Prog \"CITY2\"\n0->R\nLbl 5\n\"JOUEURS 1 2 \"?->E\nE!=1=>E!=2=>Goto 5\n1->P\nPlot X,Y\nLbl 1\nP=1=>0.15->Q\nP=2=>-0.15->Q\nPlot X,Y:Line\nIsz Z\n\"ANGLE \"?->U\nP=2=>-U->U\n\"FORCE \"?->V\nV*cos U->S\nV*sin U->T\n0->C\nLbl 2\nC+Q->C\nS*C+.5*R*C*C->A\nP=1=>101+A->A\nP=2=>548+A->A\nList 1[7*P-5]+(.5*9.81*C*C)-50-T*C->B\nPlot A,B\nInt ((A-5)/64)+1->D\nP=1=>A>533=>A<563=>B<List 1[D]=>B>List 1[D]-58=>Goto 4\nP=2=>A>90=>A<111=>B<List 1[D]=>B>List 1[D]-58=>Goto 4\nD>0=>D<11=>B<List 1[D]=>Goto 2\nE=2=>3-P->P\nGoto 1\nLbl 4\n9->S:548->T\nP=2=>2->S\nP=2=>101->T\nProg \"CITY4\"\nPlot X,Y:Line\n\"GAGNE\"\nE=1=>\"PTS\"\nE=2=>\"GAGNANT:\"\nE=1=>240-40*Z◢\nE=2=>P◢\n\"\"",
    },{
        "type": "program",
        "name": "CITY2",
        "content": "\n16->D\nPlot T-D,List 1[S]\nPlot T,List 1[S]-25\nLine\nPlot T+D,List 1[S]\nLine\nPlot T-D,List 1[S]-32\nPlot T+D,List 1[S]-32\nLine\nPlot T,List 1[S]-45\nPlot T,List 1[S]-25\nLine\nPlot T,List 1[S]-45\nPlot T-(D/3),Y\nLine\nPlot X,List 1[S]-58\nLine\nPlot T+(D/3),Y\nLine\nPlot X,List 1[S]-45\nLine\nPlot T,List 1[S]-45\nLine",
    },{
        "type": "program",
        "name": "CITY3",
        "content": "\nCls\n0->D\nLbl 1\nIsz D\n64*(D-1)+5->W\nPlot W,400\nPlot W,List 1[D]\nLine\nPlot W+64,List 1[D]\nLine\nPlot W+64,400\nLine\nD<10=>Goto 1",
    },{
        "type": "program",
        "name": "CITY4",
        "content": "\nDeg\n-180->A\nLbl 1\nRec(45,A)\nList Ans[0]+T->X\nList Ans[1]+List 1[S]->Y\nPlot X,Y\nPlot T,List 1[S]\nLine\n15+A->A\nA<=0=>Goto 1",
    }
]