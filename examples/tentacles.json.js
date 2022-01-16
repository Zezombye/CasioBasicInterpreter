programExamples["tentacles"] = [
    {
        "type": "program",
        "name": "TENTAC",
        "content": "# Tentacules\n# adapted from Alexot (https://www.planet-casio.com/Fr/compte/voir_profil.php?membre=alexot)\n# see https://www.planet-casio.com/Fr/programmes/programme3871-1-Tentacules-alexot-.html\nViewWindow -63, 63, 0, -31, 31, 0\nS-L-Thin\nBG-None\nRad\nFor 1 -> H To 15\n	cos (H / 5) / 2 + 0.2 -> G\n	Cls\n	{-4 -> List 1\n	{-4 -> List 2\n	{8 -> List 3\n	{0 -> List 4\n	Prog \"TENTAC1\"\n	StoPict H\nNext\nProg \"TENTANIM\"",
    },{
        "type": "program",
        "name": "TENTAC1",
        "content": "For 0 -> r To 10\n	1 -> θ\n	List 1[θ] + List 3[θ] * cos List 4[θ] -> A\n	List 2[θ] + List 3[θ] * sin List 4[θ] -> B\n	List 1[θ] + List 3[θ] * cos (List 4[θ] + π / 2) -> C\n	List 2[θ] + List 3[θ] * sin (List 4[θ] + π / 2) -> D\n	C + List 3[θ] * cos List 4[θ] -> E\n	D + List 3[θ] * sin List 4[θ] -> F\n	F-Line List 1[θ], List 2[θ], A, B\n	F-Line List 1[θ], List 2[θ], C, D\n	F-Line A, B, E, F\n	F-Line C, D, E, F\n	F-Line List 2[θ], -List 1[θ], B, -A\n	F-Line List 2[θ], -List 1[θ], D, -C\n	F-Line B, -A, F, -E\n	F-Line D, -C, F, -E\n	F-Line -List 2[θ], List 1[θ], -B, A\n	F-Line -List 2[θ], List 1[θ], -D, C\n	F-Line -B, A, -F, E\n	F-Line -D, C, -F, E\n	F-Line -List 1[θ], -List 2[θ], -A, -B\n	F-Line -List 1[θ], -List 2[θ], -C, -D\n	F-Line -A, -B, -E, -F\n	F-Line -C, -D, -E, -F\n	C -> List 1[θ]\n	D -> List 2[θ]\n	List 3[θ] * 0.8 -> List 3[θ\n	List 4[θ] + G -> List 4[θ\nNext",
    },{
        "type": "program",
        "name": "TENTANIM",
        "content": "1 -> θ\n1 -> A\nCls\nDo\n	θ + A -> θ\n	θ = 1 Or θ = 15 => A * -1 -> A\n	BG-Pict θ\n	For 0 -> B To 20\n	Next\nLpWhile 1",
    }
]