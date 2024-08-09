<?php
// Establecer los encabezados para que el navegador trate el contenido como un archivo de Word
header("Content-Type: application/vnd.ms-word");
header("Content-Disposition: attachment;Filename=document.docx");

// El contenido del documento de Word
$html = '
<html>
<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">
</head>
<body>
<div>
    <div style="clear:both;">
        <p style="margin-top:0pt; margin-bottom:0pt; line-height:6%; font-size:10pt;"><span style="height:0pt; display:block; position:absolute; z-index:-65538;"><img src="data:image/png;base64,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" width="617" height="39" alt="" style="margin: 0 0 0 auto; display: block; "></span>&nbsp;</p>
    </div>
    <p style="margin-top:0pt; margin-bottom:0pt; font-size:10pt;"><span style="height:0pt; display:block; position:absolute; z-index:0;"><img src="data:image/png;base64,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" width="132" height="52" alt="" style="margin: 0 0 0 auto; display: block; "></span><span style="font-family:"Times New Roman";">&nbsp;</span></p>
    <p style="margin-top:6.7pt; margin-bottom:0pt; font-size:10pt;"><span style="font-family:"Times New Roman";">&nbsp;</span></p>
    <p style="margin-top:0pt; margin-left:7.45pt; margin-bottom:0pt; line-height:10.55pt;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwQAAAAOCAYAAACRiNsZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPTSURBVHhe7ZcBjtRADAT5/7t4Bb/gBUcmwtDXao892WwSuI5U0rirZ28DMie+/X4+jDHGGGOMMV+S/fn4/uOnMeZmxi4Gyj8V9Z3xXRjsVbx6/wze+XPveJ+7uPrv7+qf1+GJ3wk5+7s9+V2NMX/ZdnV/pDTGXMvYxUD5J7LynVffTfVXP+MM3vUz73iXO7n6fZ/45/vE7xSc/d2e/K7GmM9su7o/UhpjrmPsYewinmeeO8HMc171lAuwM+sNOh1kpR9ddQezrMOOvcowr1zHRyfLlYscHfeww+6I586Kz+5kfXSzHuboeOYu5uxmvsoY7Kh+ZJwrqm7mMVMdzNCpjFEes5mLzBhzL9s+7o+UxpjrGHsYu4hn9pjPeh3f6SgfdDpB5ZnOZw64w/diVhnOcc78rMO+mmd5ZCrnGbOYVbYyx1n5yI76rB/ZzGOOM+bKoe86Na9kCPo4Y1/5cEx2T2XsY1bZbI6z8pFlPutHprwx5h62XdwfKY0x1zH2MHYRz8pnWaeD2cxVGfKqV7xyB++pz1EZO/TVzJnyCtXr3I0O9tS9Ticjuiv3V73qH+lwHi47cz/zipU7ymNW+U4eKI9Z5bMOu25/0OmrzBhzPdse7o+UxphrGDvIe8jZWZ0jedYNXvWKlTvY5Xs8dzL21cxZnBHsBsp1+9zjedZBsI8dPquZWfWq/2qncw6UR7AboJv1BspjVvlOHiiPWeU7HfY8M52+yowx17Pt4f5IaYy5hrGDvIecrXQUeA+7nTzrBh2v8hnVZwbcq+ZOpzsrZp1w3KkylVdzlSFZv5qZVa/6qx32mYuzgu8qxx0+K5THLM4KvMP3FMpjVvkzZqbTV5kx5nq2PdwfKY0x1zB2MIM76t6so4ie6nczZOaruxnde9yr5k5nda7I+irvdqs5yxD2qzOz6lV/tcM+c3jukPUxzzqB8pgpn1F1lces8mfMTKevMmPM9Wx7uD9SGmPez9i/bAfRqV4nW505U56ZdY66gfKcrc6dTjVXnZlDVN7tVnOnszpHdtRn/cgqrzL2XbfaRcJlHsGeulfNSNXDjD3PnU41R5b5rB+Z8saYe9h2cX+kNMa8n7F/2Q6iUz2VYa48Z6qDuXLMrHfUBdFBZh2c+cx9lUWenZHIlZ85hDuz/qyLZ+6rTDn2OM86TOazO1kf3SyLOTKcI1PdFYd0Ogh21b3IlGOqXuZXs8izeXanciozxtzLto/7I6UxxhhjPjN+ZwbKG2PMv8b4z8B4pDTGGGPMZ8bvTP/eNMb8T+z/G9ieP//AGWOMMcYYY74K3z5+AQ9f7D+zfBRxAAAAAElFTkSuQmCC" width="772" height="14" alt=""></p>
    <p style="margin-top:4.8pt; margin-left:28.95pt; margin-bottom:0pt; font-size:10pt;"><img src="data:image/png;base64,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" width="772" height="14" alt=""><br><span style="width:7.05pt; font-family:"Times New Roman"; display:inline-block;">&nbsp;</span><strong><span style="font-family:Arial; font-size:8pt;">CONTACTOS DE LA ERP</span></strong></p>
    <p style="margin-top:0.35pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6.55pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">INGRID LILIANA LESSER INSIGNARES</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:2.2pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">SUBGERENTE</span><span style="width:16.28pt; font-family:Arial; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">NACIONAL</span><span style="width:15.55pt; font-family:Arial; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.3pt;">DE&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.2pt;">SALUD</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:0pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">ingrid.lesser@cajacopieps.com</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:2.05pt; margin-left:2.5pt; margin-bottom:0pt; line-height:9.1pt;"><span style="font-family:Arial; font-size:8pt;">3185930</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin:0pt 0.7pt; text-align:center; line-height:9pt;">&nbsp;</p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:11.5pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.55pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.2pt;">SIAU</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.85pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.85pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.85pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.85pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:31.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:0pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">INGRID LILIANA LESSER INSIGNARES</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:2pt; margin-right:1.65pt; margin-bottom:0pt; text-indent:7.8pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">SUBGERENTE</span><span style="width:13.98pt; text-indent:0pt; font-family:Arial; letter-spacing:-0.1pt; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">NACIONAL</span><span style="width:31.1pt; text-indent:0pt; font-family:Arial; letter-spacing:-0.1pt; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">DE SALUD</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:0pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">ingrid.lesser@cajacopieps.com</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.65pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
                    <p style="margin-top:0pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">3</span><span style="font-family:Arial;">3185930</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-bottom:0pt;">&nbsp;</p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">ADMINISTRATIVA</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:31.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.5pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
                    <p style="margin-top:0pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">EILING</span><span style="font-family:Arial; letter-spacing:0.8pt;">&nbsp;</span><span style="font-family:Arial;">GALLO</span><span style="font-family:Arial; letter-spacing:0.85pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">URUETA</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.85pt 1.65pt 0pt 2.9pt; text-align:justify; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">COORDINADOR NACIONAL DE INFRAESTRUCTURA,</span><span style="font-family:Arial; letter-spacing:-0.6pt;">&nbsp;</span><span style="font-family:Arial;">DOTACI&Oacute;N</span><span style="font-family:Arial; letter-spacing:-0.6pt;">&nbsp;</span><span style="font-family:Arial;">Y&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">LOG&Iacute;STICA</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.5pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
                    <p style="margin-top:0pt; margin-left:2.7pt; margin-bottom:0pt; font-size:11pt;"><a href="mailto:eiling.gallo@cajacopieps.com" style="text-decoration:none;"><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt; color:#000000;">eiling.gallo@cajacopieps.com</span></a></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.5pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
                    <p style="margin-top:0pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">3188217652</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:12.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.65pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.45pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.3pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">FINANCIERA</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">JOSE</span><span style="font-family:Arial; letter-spacing:0.9pt;">&nbsp;</span><span style="font-family:Arial;">MARIO</span><span style="font-family:Arial; letter-spacing:0.9pt;">&nbsp;</span><span style="font-family:Arial;">MORALES</span><span style="font-family:Arial; letter-spacing:0.9pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.2pt;">DIAZ</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.65pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">SUBGERENTE&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.2pt;">NACIONAL&nbsp;</span><span style="font-family:Arial;">ADMINISTRATIVA Y FINANCIERA</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6pt; margin-left:2.7pt; margin-bottom:0pt; font-size:11pt;"><a href="mailto:mario.morales@cajacopieps.com" style="text-decoration:none;"><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt; color:#000000;">mario.morales@cajacopieps.com</span></a></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">3202303146</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.55pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">CALIDAD</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:20.05pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:1.3pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">LINA</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial;">PATRICIA</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial;">CHARRIS</span><span style="font-family:Arial; letter-spacing:0.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ARIZA</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:1.3pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">JEFE</span><span style="font-family:Arial; letter-spacing:-0.6pt;">&nbsp;</span><span style="font-family:Arial;">DE</span><span style="font-family:Arial; letter-spacing:-0.55pt;">&nbsp;</span><span style="font-family:Arial;">OFICINA</span><span style="font-family:Arial; letter-spacing:-0.6pt;">&nbsp;</span><span style="font-family:Arial;">DE</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">CALIDAD</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:1.3pt; margin-left:2.7pt; margin-bottom:0pt; font-size:11pt;"><a href="mailto:lina.charris@cajacopieps.com" style="text-decoration:none;"><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt; color:#000000;">lina.charris@cajacopieps.com</span></a></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:middle;">
                    <p style="margin-top:1.3pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">3183546012</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:16.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">AUDITOR&Iacute;A</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">RAUL</span><span style="font-family:Arial; letter-spacing:-0.1pt;">&nbsp;</span><span style="font-family:Arial;">ANDRES</span><span style="font-family:Arial; letter-spacing:1pt;">&nbsp;</span><span style="font-family:Arial;">O&Ntilde;ORO</span><span style="font-family:Arial; letter-spacing:1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">BENAVIDES</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.25pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">COORDINADOR</span><span style="width:13.46pt; font-family:Arial; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">NACIONAL</span><span style="width:12.6pt; font-family:Arial; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.3pt;">DE&nbsp;</span><span style="font-family:Arial;">AUDITORIA</span><span style="font-family:Arial; letter-spacing:0.15pt;">&nbsp;</span><span style="font-family:Arial;">DE</span><span style="font-family:Arial; letter-spacing:0.75pt;">&nbsp;</span><span style="font-family:Arial;">CUENTAS</span><span style="font-family:Arial; letter-spacing:0.75pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">M&Eacute;DICAS</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.7pt; margin-bottom:0pt; font-size:11pt;"><a href="mailto:raul.onoro@cajacopieps.com" style="text-decoration:none;"><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt; color:#000000;">raul.onoro@cajacopieps.com</span></a></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">3008669386</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.75pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">AUTORIZACIONES</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.4pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">JOHANNA PAOLA ARIZA FABIAN</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.05pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">ESPECIALISTA</span><span style="width:17.44pt; font-family:Arial; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">NACIONAL</span><span style="width:12.6pt; font-family:Arial; display:inline-block;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.3pt;">DE&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">AUTORIZACIONES</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">autorizaciones8@cajacopieps.co</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.4pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">3176460974</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:4.8pt; margin-left:28.95pt; margin-bottom:0pt; font-size:10pt;"><span style="width:7.05pt; font-family:"Times New Roman"; display:inline-block;">&nbsp;</span></p>
    <p style="margin-top:4.8pt; margin-left:28.95pt; margin-bottom:0pt; font-size:8pt;"><img src="data:image/png;base64,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" width="774" height="16" alt=""><br><strong><span style="font-family:Arial;">CONTACTOS DEL PSS</span></strong></p>
    <p style="margin-top:0pt; margin-bottom:0pt;">&nbsp;</p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6.55pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:2.2pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6.55pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:0pt; margin-left:2.5pt; margin-bottom:0pt; line-height:9.1pt;"><span style="font-family:Arial; font-size:8pt;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-bottom:0pt;">&nbsp;</p>
    <table cellspacing="0" cellpadding="0" style="margin-left:7.35pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:11.5pt;">
                <td style="width:578.35pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.55pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.2pt;">SIAU</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-bottom:0pt;">&nbsp;</p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:2.05pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6.55pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:2.2pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6.55pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:0pt; margin-left:2.5pt; margin-bottom:0pt; line-height:9.1pt;"><span style="font-family:Arial; font-size:8pt;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br style="page-break-before:always; clear:both; mso-break-type:section-break;"></p>
<div>
    <p style="margin-top:2.5pt; margin-bottom:0pt; font-size:10pt;"><span style="height:0pt; margin-top:-2.5pt; display:block; position:absolute; z-index:1;"><img src="data:image/png;base64,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" width="132" height="52" alt="" style="margin: 0 0 0 auto; display: block; "></span><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <p style="margin-top:5.85pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <p style="margin-top:0pt; margin-bottom:0pt;">&nbsp;</p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">ADMINISTRATIVA</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.7pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:19.15pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:0pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.85pt 1.65pt 0pt 2.9pt; text-align:justify; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:0pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:0pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:12.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.65pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.45pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.3pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">FINANCIERA</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.5pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.65pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:6pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.55pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">CALIDAD</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.3pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:17.55pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.3pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.3pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.3pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:1.3pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:16.25pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">AUDITOR&Iacute;A</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:1.1pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.25pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.75pt;">
                <td style="width:577.5pt; vertical-align:middle; background-color:#c4daf1;">
                    <p style="margin-top:0pt; margin-left:0.7pt; margin-bottom:0pt; text-align:center; line-height:7.6pt;"><strong><span style="font-family:Arial; font-size:8pt;">CONTACTO</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.6pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DEL</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.4pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">&Aacute;REA</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt;">DE</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:0.25pt;">&nbsp;</span></strong><strong><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt;">AUTORIZACIONES</span></strong></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:0pt; margin-left:13.45pt; margin-bottom:0pt; font-size:8pt;"><strong><span style="font-family:Arial;">&nbsp;</span></strong></p>
    <table cellspacing="0" cellpadding="0" style="margin-left:8.2pt; border:0.75pt solid #000000; border-collapse:collapse;">
        <tbody>
            <tr style="height:13.45pt;">
                <td style="width:230.25pt; border-right-style:solid; border-right-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">NOMBRES</span><span style="font-family:Arial; letter-spacing:0.65pt;">&nbsp;</span><span style="font-family:Arial;">Y</span><span style="font-family:Arial; letter-spacing:0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">APELLIDOS:</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.9pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.2pt;">CARGO</span></p>
                </td>
                <td style="width:144pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">CORREO</span><span style="font-family:Arial; letter-spacing:1.1pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">ELECTR&Oacute;NICO</span></p>
                </td>
                <td style="width:57pt; border-left-style:solid; border-left-width:0.75pt; border-bottom-style:solid; border-bottom-width:0.75pt; vertical-align:top; background-color:#c4daf1;">
                    <p style="margin-top:0.9pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">TEL&Eacute;FONO</span></p>
                </td>
            </tr>
            <tr style="height:22.45pt;">
                <td style="width:230.25pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.4pt; margin-left:2.6pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin:1.05pt 1.65pt 0pt 2.9pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:144pt; border-top-style:solid; border-top-width:0.75pt; border-right-style:solid; border-right-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.6pt; margin-left:2.7pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
                <td style="width:57pt; border-top-style:solid; border-top-width:0.75pt; border-left-style:solid; border-left-width:0.75pt; vertical-align:top;">
                    <p style="margin-top:5.4pt; margin-left:2.5pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">&nbsp;</span></p>
                </td>
            </tr>
        </tbody>
    </table>
    <p style="margin-top:4.8pt; margin-left:28.95pt; margin-bottom:0pt; font-size:8pt;"><span style="width:7.05pt; font-family:Arial; display:inline-block;">&nbsp;</span></p>
    <p style="margin-top:0.05pt; margin-left:7.45pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">L&Iacute;NEA</span><span style="font-family:Arial; letter-spacing:0.25pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">018000111446</span></p>
    <p style="margin:8.05pt 157.4pt 0pt 7.45pt; line-height:188%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">Puntos de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">Atenci&oacute;n al Usuario para tramite con los usuarios:&nbsp;</span><a href="http://www.cajacopieps.com/oficinas-de-atencion" style="text-decoration:none;"><u><span style="font-family:Arial; letter-spacing:-0.1pt; color:#000000;">https://www.cajacopieps.com/oficinas-de-atencion</span></u></a><span style="font-family:Arial; letter-spacing:-0.1pt;">&nbsp;</span><span style="font-family:Arial;">Correo para solicitudes paciente con portabilidad:&nbsp;</span><a href="mailto:portabilidad.aut@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; color:#000000;">p</span><u><span style="font-family:Arial; color:#000000;">ortabilidad.aut@cajacopieps.co</span></u></a></p>
    <p style="margin-top:0.05pt; margin-left:7.45pt; margin-bottom:0pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">P&aacute;gina</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">WEB:</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">Cajacopi</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">EPS</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">SAS</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">cuenta</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">con</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">la</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">p&aacute;gina</span><span style="font-family:Arial; letter-spacing:-0.15pt;">&nbsp;</span><a href="http://www.cajacopieps.com/" style="text-decoration:none;"><u><span style="font-family:Arial; color:#000000;">www.cajacopieps.com</span></u><span style="font-family:Arial; color:#000000;">,</span></a><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">donde</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">las</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">IPS</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">adscritas</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">pueden</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">acceder</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">al</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">portal</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">Genesis,</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">ingresar&aacute;n</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">con</span><span style="font-family:Arial; letter-spacing:-0.2pt;">&nbsp;</span><span style="font-family:Arial;">su usuario y clave asignado por Tecnolog&iacute;a</span></p>
    <p style="margin-top:8.05pt; margin-left:7.45pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">C&oacute;digo</span><span style="font-family:Arial; letter-spacing:-0.55pt;">&nbsp;</span><span style="font-family:Arial;">de</span><span style="font-family:Arial; letter-spacing:-0.55pt;">&nbsp;</span><span style="font-family:Arial;">Urgencias:</span><span style="font-family:Arial; letter-spacing:-0.55pt;">&nbsp;</span><a href="mailto:codigo.urgencia@cajacopieps.co" style="text-decoration:none;"><u><span style="font-family:Arial; letter-spacing:-0.1pt; color:#000000;">codi</span></u><span style="font-family:Arial; letter-spacing:-0.1pt; color:#000000;">g</span><u><span style="font-family:Arial; letter-spacing:-0.1pt; color:#000000;">o.urgencia@cajacopieps.co</span></u></a></p>
    <p style="margin:8.05pt 202.15pt 0pt 7.45pt; line-height:188%; font-size:8pt;"><span style="font-family:Arial;">La</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">solicitud</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">se</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">debe</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">hacer</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">adjuntando</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">el en</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">Anexo</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;T&eacute;cnico&nbsp;</span><span style="font-family:Arial;">N&deg;</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">2</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">y</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">dentro</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">las</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">24</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">horas</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">a</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">urgencia. Es el &uacute;nico medio encargado de asignarlos.</span></p>
    <p style="margin-top:0pt; margin-left:7.45pt; margin-bottom:0pt; line-height:9.1pt;"><span style="font-family:Arial; font-size:8pt;">Solicitudes</span><span style="font-family:Arial; font-size:8pt; letter-spacing:1.3pt;">&nbsp;</span><span style="font-family:Arial; font-size:8pt;">Materiales</span><span style="font-family:Arial; font-size:8pt; letter-spacing:1.3pt;">&nbsp;</span><span style="font-family:Arial; font-size:8pt;">Osteos&iacute;ntesis:</span><span style="font-family:Arial; font-size:8pt; letter-spacing:1.3pt;">&nbsp;</span><a href="mailto:materiales@cajacopieps.co" style="text-decoration:none;"><u><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt; color:#000000;">materiales@cajacopieps.co</span></u></a></p>
    <p style="margin:8.05pt 68.5pt 0pt 7.45pt; line-height:188%; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">Solicitudes para las autorizaciones Hospitalarias: a trav&eacute;s de la p&aacute;gina Web (portal Genesis)&nbsp;</span><a href="mailto:autorizaciones8@cajacopieps.co" style="text-decoration:none;"><u><span style="font-family:Arial; letter-spacing:-0.1pt; color:#000000;">autorizaciones8@cajacopieps.co</span></u></a><span style="font-family:Arial; letter-spacing:-0.1pt;">&nbsp;</span><span style="font-family:Arial;">Autorizaciones NO PBS:&nbsp;</span><a href="mailto:autorizaciones5@cajacopieps.co" style="text-decoration:none;"><u><span style="font-family:Arial; color:#000000;">autorizaciones5@cajacopieps.co</span></u></a></p>
    <p style="margin-top:0pt; margin-left:7.45pt; margin-bottom:0pt; line-height:9.1pt;"><span style="font-family:Arial; font-size:8pt;">Apoyo</span><span style="font-family:Arial; font-size:8pt; letter-spacing:1.05pt;">&nbsp;</span><span style="font-family:Arial; font-size:8pt;">Diagn&oacute;stico:</span><span style="font-family:Arial; font-size:8pt; letter-spacing:1.05pt;">&nbsp;</span><a href="mailto:apoyo.diagnostico@cajacopieps.co" style="text-decoration:none;"><u><span style="font-family:Arial; font-size:8pt; letter-spacing:-0.1pt; color:#000000;">apoyo.diagnostico@cajacopieps.co</span></u></a></p>
    <p style="margin-top:8.2pt; margin-left:7.45pt; margin-bottom:0pt; line-height:98%; font-size:8pt;"><span style="font-family:Arial;">La</span><span style="font-family:Arial; letter-spacing:-0.6pt;">&nbsp;</span><span style="font-family:Arial;">solicitud</span><span style="font-family:Arial; letter-spacing:-0.5pt;">&nbsp;</span><span style="font-family:Arial;">de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">autorizaci&oacute;n</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">hospitalizaci&oacute;n</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">m&eacute;dica</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">correspondiente</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">a</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">las</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">IPS,</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">se</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">realiza</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">la</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">siguiente</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">manera:</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">Envi&oacute;</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">del</span><span style="font-family:Arial; letter-spacing:-0.6pt;">&nbsp;</span><span style="font-family:Arial;">Anexo</span><span style="font-family:Arial; letter-spacing:-0.55pt;">&nbsp;</span><span style="font-family:Arial;">T&eacute;cnico</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">No.</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">3</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial;">totalmente diligenciado</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial;">al</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial;">correo</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial;">electr&oacute;nicos</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial;">institucionales</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial;">previamente</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial;">establecidos:</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><a href="mailto:autorizaciones8@cajacopieps.co" style="text-decoration:none;"><u><span style="font-family:Arial; color:#000000;">autorizaciones8@cajacopieps.co</span></u></a></p>
    <p style="margin-top:8.1pt; margin-left:7.45pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial; letter-spacing:-0.1pt;">Correos</span><span style="font-family:Arial; letter-spacing:-0.05pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">de</span><span style="font-family:Arial;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">referencia</span><span style="font-family:Arial;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">y</span><span style="font-family:Arial; letter-spacing:-0.15pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">Traslados</span><span style="font-family:Arial;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">de</span><span style="font-family:Arial; letter-spacing:-0.45pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">Ambulancia</span></p>
    <p style="margin-top:8.05pt; margin-left:7.45pt; margin-bottom:0pt; font-size:8pt;"><span style="font-family:Arial;">Referencia</span><span style="font-family:Arial; letter-spacing:0.75pt;">&nbsp;</span><span style="font-family:Arial;">y</span><span style="font-family:Arial; letter-spacing:0.8pt;">&nbsp;</span><span style="font-family:Arial;">Contrarreferencia</span><span style="font-family:Arial; letter-spacing:0.75pt;">&nbsp;</span><span style="font-family:Arial;">018000111446</span><span style="font-family:Arial; letter-spacing:0.8pt;">&nbsp;</span><span style="font-family:Arial;">Opci&oacute;n</span><span style="font-family:Arial; letter-spacing:0.75pt;">&nbsp;</span><span style="font-family:Arial;">3,</span><span style="font-family:Arial; letter-spacing:0.8pt;">&nbsp;</span><span style="font-family:Arial;">correo</span><span style="font-family:Arial; letter-spacing:0.75pt;">&nbsp;</span><span style="font-family:Arial; letter-spacing:-0.1pt;">electr&oacute;nico:</span></p>
    <p style="margin:8.2pt 281.75pt 0pt 14.95pt; line-height:98%; font-size:8pt;"><span style="height:0pt; margin-top:-8.2pt; display:block; position:absolute; z-index:7;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY8AG/kMxGAAZDP8BJgED/Zm7s7IAAAAASUVORK5CYII=" width="3" height="3" alt="" style="margin: 0 0 0 auto; display: block; "></span><span style="height:0pt; margin-top:-8.2pt; display:block; position:absolute; z-index:6;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY8AG/kMxGAAZDP8BJgED/Zm7s7IAAAAASUVORK5CYII=" width="3" height="3" alt="" style="margin: 0 0 0 auto; display: block; "></span><span style="height:0pt; margin-top:-8.2pt; display:block; position:absolute; z-index:5;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY8AG/kMxGAAZDP8BJgED/Zm7s7IAAAAASUVORK5CYII=" width="3" height="3" alt="" style="margin: 0 0 0 auto; display: block; "></span><span style="height:0pt; margin-top:-8.2pt; display:block; position:absolute; z-index:4;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY8AG/kMxGAAZDP8BJgED/Zm7s7IAAAAASUVORK5CYII=" width="3" height="3" alt="" style="margin: 0 0 0 auto; display: block; "></span><span style="height:0pt; margin-top:-8.2pt; display:block; position:absolute; z-index:3;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY8AG/kMxGAAZDP8BJgED/Zm7s7IAAAAASUVORK5CYII=" width="3" height="3" alt="" style="margin: 0 0 0 auto; display: block; "></span><span style="height:0pt; margin-top:-8.2pt; display:block; position:absolute; z-index:2;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAASSURBVBhXY8AG/kMxGAAZDP8BJgED/Zm7s7IAAAAASUVORK5CYII=" width="3" height="3" alt="" style="margin: 0 0 0 auto; display: block; "></span><a href="mailto:referencia1@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; color:#000000;">referencia1@cajacopieps.co</span></a><span style="font-family:Arial;">&nbsp;- Departamento Atl&aacute;ntico.&nbsp;</span><a href="mailto:referencia2@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; color:#000000;">referencia2@cajacopieps.co</span></a><span style="font-family:Arial;">&nbsp;- Departamento C&oacute;rdoba y Magdalena.&nbsp;</span><a href="mailto:referencia3@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; color:#000000;">referencia3@cajacopieps.co</span></a><span style="font-family:Arial;">&nbsp;- Departamento Meta.&nbsp;</span><a href="mailto:referencia4@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; color:#000000;">referencia4@cajacopieps.co</span></a><span style="font-family:Arial;">&nbsp;- Departamento Cesar y Guajira.&nbsp;</span><a href="mailto:referencia5@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; letter-spacing:-0.1pt; color:#000000;">referencia5@cajacopieps.co</span></a><span style="font-family:Arial; letter-spacing:-0.1pt;">&nbsp;- Departamento Bogot&aacute;, Boyac&aacute; y resto del Pa&iacute;s.&nbsp;</span><a href="mailto:referencia6@cajacopieps.co" style="text-decoration:none;"><span style="font-family:Arial; color:#000000;">referencia6@cajacopieps.co</span></a><span style="font-family:Arial;">&nbsp;- Departamento Bol&iacute;var y Sucre.</span></p>
    <p style="margin:8.2pt 17.9pt 0pt 7.45pt; line-height:98%; font-size:8pt;">La parte CONTRATANTE podr&aacute; disponer la informaci&oacute;n aqu&iacute; descrita dentro de los espacios f&iacute;sicos y carteleras de las sedes de atenci&oacute;n del PSS/PTS, con los que contamos para la recepci&oacute;n y radicaci&oacute;n de solicitudes, peticiones, quejas y reclamos.</p>
</div>
<p style="bottom: 10px; right: 10px; position: absolute;"><a href="https://wordtohtml.net" target="_blank" style="font-size:11px; color: #d0d0d0;">Converted to HTML with WordToHTML.net</a></p>
</body>
</html>';

// Imprimir el contenido
echo $html;
?>
