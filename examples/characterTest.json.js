programExamples["characterTest"] = [
    {
        "type": "program",
        "name": "Character test",
        "content": `All characters that could be unicode

This is to check if the font you want has all the characters.
If there is an entity (&...;) ignore it.
Check for unknown characters (white rectangle or exclamation mark)
then get to the bottom to check for similarities.

Ascii chars:

ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
!"#$%&'()+,-.0123456789:;<=>?@[\\]^_\`{|}~

--00XX--
0003 - 
0004 - µ
0007 - 
0008 - 
0009 - 
000A - 
000B - 
000C - ◢
000E - ->
000F - 
0010 - <=
0011 - !=
0012 - >=
0013 - =>
001A - 
001B - 
001D - 
001E - 
001F - 
0086 - √
0087 - ﹣
0088 - 
008B - ²
008C - 
(Prizm) 0090 - &x;
0096 - &cbrt;
0098 - 
009B - 
009C - °
00A9 - *
00AC - 
00B5 - 
00B9 - /
00BB - ⌟
00BC - 
00C2 - 
00C3 - 
00CB - 
00CC - 
00CD - 
00CE - θ
00D0 - π
00D8 - ▯

--7FXX--
7F50 - 
7F53 - ∞
7F54 - ∠
7FC7 - 
7FF0 - 
7FF1 - 
7FF4 - 

--E5XX--
E501 - À
E502 - Á
E503 - Â
E504 - Ã
E505 - Ä
E506 - Å
E507 - Æ
E508 - Ç
E509 - È
E50A - É
E50B - Ê
E50C - Ë
E50D - Ì
E50E - Í
E50F - Î
E510 - Ï
E511 - Ð
E512 - Ñ
E513 - Ò
E514 - Ó
E515 - Ô
E516 - Õ
E517 - Ö
E518 - Ø
E519 - Ù
E51A - Ú
E51B - Û
E51C - Ü
E51D - Ý
E51E - Þ
E520 - Ÿ
E521 - Ă
E522 - Ą
E523 - Ć
E524 - Č
E525 - Œ
E526 - Ď
E527 - Ę
E528 - Ě
E529 - Ł
E52A - Ń
E52B - Ň
E52C - Ő
E52D - Ř
E52E - Ś
E52F - Š
E530 - Ť
E531 - Ů
E532 - Ű
E533 - Ź
E534 - Ż
E535 - Ž
E540 - &Alpha;
E541 - &Beta;
E542 - Γ
E543 - Δ
E544 - &Epsilon;
E545 - &Zeta;
E546 - &Eta;
E547 - Θ
E548 - &Iota;
E549 - &Kappa;
E54A - Λ
E54B - &Mu;
E54C - &Nu;
E54D - Ξ
E54E - &Omicron;
E54F - Π
E550 - &Rho;
E551 - Σ
E553 - &Tau;
E554 - &Upsilon;
E555 - Φ
E556 - &Chi;
E557 - Ψ
E558 - Ω
E560 - &Acy;
E561 - Б
E562 - &Vcy;
E563 - &Gcy;
E564 - Д
E565 - &IEcy;
E566 - &IOcy;
E567 - Ж
E568 - З
E569 - И
E56A - Й
E56B - &Kcy;
E56C - Л
E56D - &Mcy;
E56E - &Ncy;
E56F - &Ocy;
E570 - П
E571 - &Rcy;
E572 - &Scy;
E573 - &Tcy;
E574 - У
E575 - Ф
E576 - &KHcy;
E577 - Ц
E578 - Ч
E579 - Ш
E57A - Щ
E57B - Ъ
E57C - Ы
E57D - Ь
E57E - Э
E580 - Ю
E581 - Я
E582 - Є
E590 - ¡
E591 - ¿
E592 - €
E593 - ₣
E594 - …
E595 - ‘
E596 - &right_';
E597 - “
E598 - ”
E599 - ¢
E59A - £
E59B - ¤
E59C - ¥
E59D - §
E59E - ©
E59F - 
E5A0 - ¬
E5A1 - ®
E5A2 - 
E5A3 - «
E5A4 - »
E5A5 - ▫
E5A6 - ⨯
E5A7 - ·
(Prizm) E5AB - ⁉
(Prizm) E5AC - ‼
(Prizm) E5AD - ☆
(Prizm) E5AE - &2_rectangles;
(Prizm) E5AF - &cross;
E5B0 - 
E5B5 - 
E5B6 - 
E5B7 - 
E5B8 - 
E5B9 - 
E5BA - 
E5BB - 
E5BC - 
E5BD - ‚
E5BE - ±
E5BF - ∓
E5C0 - ⁰
E5C1 - ¹
E5C2 - &^2_char;
E5C3 - ³
E5C4 - ⁴
E5C5 - ⁵
E5C6 - ⁶
E5C7 - ⁷
E5C8 - ⁸
E5C9 - ⁹
E5CA - &^-1_char;
E5CB - ⁺
E5CC - ⁻
E5CD - 
E5CE - 
E5CF - 
E5D0 - ₀
E5D1 - ₁
E5D2 - ₂
E5D3 - ₃
E5D4 - ₄
E5D5 - ₅
E5D6 - ₆
E5D7 - ₇
E5D8 - ₈
E5D9 - ₉
E5DA - 
E5DB - ₊
E5DC - ₋
E5DD - 
E5DE - 
E5DF - 

'Prizm chars
E5E0 - ♠
E5E1 - ♣
E5E2 - ♥
E5E3 - ♦
E5E8 - ⇦
E5E9 - ⇨
E5EA - ⇧
E5EB - ⇩
E5EC - ☜
E5ED - ☞
E5EE - ☝
E5EF - ☟
E5F0 - ①
E5F1 - ②
E5F2 - ③
E5F3 - ④
E5F4 - ⑤
E5F5 - ⑥
E5FB - ⑦
E5FC - ⑧
E5FD - ⑨

--E6XX--
E601 - à
E602 - á
E603 - â
E604 - ã
E605 - ä
E606 - å
E607 - æ
E608 - ç
E609 - è
E60A - é
E60B - ê
E60C - ë
E60D - ì
E60E - í
E60F - î
E610 - ï
E611 - ð
E612 - ñ
E613 - ò
E614 - ó
E615 - ô
E616 - õ
E617 - ö
E618 - ø
E619 - ù
E61A - ú
E61B - û
E61C - ü
E61D - ý
E61E - þ
E61F - ß
E620 - ÿ
E621 - ă
E622 - ą
E623 - ć
E624 - č
E625 - œ
E626 - ď
E627 - ę
E628 - ě
E629 - ł
E62A - ń
E62B - ň
E62C - ő
E62D - ř
E62E - ś
E62F - š
E630 - ť
E631 - ů
E632 - ű
E633 - ź
E634 - ż
E635 - ž
E640 - α
E641 - β
E642 - γ
E643 - δ
E644 - ε
E645 - ζ
E646 - η
E647 - &theta_char;
E648 - ι
E649 - κ
E64A - λ
E64B - &mu;
E64C - ν
E64D - ξ
E64E - &omicron;
E64F - &pi_char;
E650 - ρ
E651 - σ
E652 - ς
E653 - τ
E654 - υ
E655 - φ
E656 - χ
E657 - ψ
E658 - ω
E660 - &acy;
E661 - б
E662 - в
E663 - г
E664 - д
E665 - &iecy;
E666 - &iocy;
E667 - ж
E668 - з
E669 - и
E66A - й
E66B - &kcy;
E66C - л
E66D - м
E66E - н
E66F - &ocy;
E670 - п
E671 - &rcy;
E672 - &scy;
E673 - т
E674 - у
E675 - ф
E676 - &khcy;
E677 - ц
E678 - ч
E679 - ш
E67A - щ
E67B - ъ
E67C - ы
E67D - ь
E67E - э
E680 - ю
E681 - я
E682 - є
E690 - ←
E691 - →
E692 - ↑
E693 - ↓
E694 - ↔
E695 - ↕
E696 - ↖
E697 - ↗
E698 - ↘
E699 - ↙
E69A - ◀
E69B - ▶
E69C - ▲
E69D - ▼
E69E - ▸
E69F - ▷
E6A0 - ⋇
E6A1 - 【
E6A2 - 】
E6A3 - ○
E6A4 - ●
E6A5 - □
E6A6 - ■
E6A7 - ◇
E6A8 - ◆
E6A9 - ⊠
E6AA - ▪
(Prizm) E6AC - △
(Prizm) E6AD - ▽
(Prizm) E6AE - ✖
(Prizm) E6AF - ◁
E6B0 - ≒
E6B1 - ≈
E6B2 - ≡
E6B3 - ≢
E6B4 - ≅
E6B5 - ∽
E6B6 - ∝
E6B7 - ∬
E6B8 - ∮
E6B9 - ∂
E6BB - ∫
E6BC - ∡
E6BD - ∈
E6BE - ∋
E6BF - ⊆
E6C0 - ⊇
E6C1 - ⊂
E6C2 - ⊃
E6C3 - ∪
E6C4 - ∩
E6C5 - ∉
E6C6 - ∌
E6C7 - ⊈
E6C8 - ⊉
E6C9 - ⊄
E6CA - ⊅
E6CB - ∅
E6CC - ∃
E6CD - ∟
E6CE - ∨
E6CF - ∧
E6D0 - ∀
E6D1 - ⊕
E6D2 - ⊖
E6D3 - ⊗
E6D4 - ⊘
E6D5 - ⊥
E6D6 - ⇔
E6D7 - ∥
E6D8 - ∦
E6D9 - ⫽
E6DA - ∇
E6DB - ∴
E6DC - ∵
E6DD - ′
E6DE - ″

--E7XX--
E741 - 
E742 - 
E743 - 
E744 - 
E745 - 
E746 - 
E747 - 
E748 - 
E749 - 
E74A - 
E74B - 
E74C - 
E74D - 
E74E - 
E74F - 
E750 - 
E751 - 
E752 - 
E753 - 
E754 - 
E755 - 
E756 - 
E757 - 
E758 - 
E759 - 
E75A - 
E761 - 
E762 - 
E763 - 
E764 - 
E765 - 
E766 - 
E767 - 
E768 - 
E769 - 
E76A - 
E76B - 
E76C - 
E76D - 
E76E - 
E76F - 
E770 - 
E771 - 
E772 - 
E773 - 
E774 - 
E775 - 
E776 - 
E777 - 
E778 - 
E779 - 
E77A - 

Similarities:
1 and l and I and |
 and n (0003)
 and M (0007)
﹣ and - (0087)
 and ° (008C)
 and r (00CD)
Ø and ø and ∅ and ⊘ (E518, E618, E6CB, E6D4)
Π and Л and П (E54F, E56C, E570)
Φ and Ф (E555, E575)
З and 3 (E568)
Ч and 4 (E578)
¡ and i (E590)
У and Y (E574)
Þ and þ and P (E51E, E61E)
‚ and , (E5BD)
 and ³ (E5DF, E5C3)
 and  (E5DE, E76E)
ď and d' (E626)
ť and t' (E630)
π and л and п (00D0, E66C, E670)
б and 6 (E661)
χ and * and ⨯ and  and x (E656, 00A9, E5A6, E5DD)
ν and v (E64C)
φ and ф (E655, E675)
ь and b (E67D)
○ and o (E6A3)
▪ and · and ▫ (E6AA, E5A7, E5A5)
∪ and u (E6C3)
⊂ and c (E6C1)
∨ and v and V (E6CE)
∧ and Λ (E6CF, E54A)
′ and ' (E6DD)`,
    }
]