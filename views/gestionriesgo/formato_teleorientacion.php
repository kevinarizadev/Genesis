<!DOCTYPE html>
<html lang="en" ng-app="GenesisApp">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Genesis</title>
    <link rel="icon" href="../../assets/images/icon.ico" />
    <!-- <link rel="stylesheet" href="../../bower_components/materialize/bin/materializeformat.css" /> -->
    <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
    <script src="../../bower_components/angular/angular.js"></script>
    <script src="../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../scripts/controllers/gestionriesgo/formatoteleorientacionController.js"></script>
    <script src="../../bower_components/materialize/bin/materialize.js"></script>
    <script src="../../js/jQuery.print.min.js"></script>
    <style type="text/css">
        body,
        div,
        table,
        thead,
        tbody,
        tfoot,
        tr,
        th,
        td,
        p {
            font-family: "Calibri";
            /* font-size: x-small */
        }

        @page {
            margin-left: 0.39in;
            margin-right: 0.39in;
            margin-top: 0.39in;
            margin-bottom: 0.09in
        }

        p {
            margin-bottom: 0.08in;
            direction: ltr;
            widows: 2;
            orphans: 2
        }

        @media print {
            td.background_enc {
                background-color: #002060;
                 !important;
                -webkit-print-color-adjust: exact;
            }


            footer {
                page-break-after: auto;
            }

            th {
                color: white !important;
            }

            table {
                page-break-inside: auto
            }

            tr {
                page-break-inside: avoid;
                page-break-after: auto
            }

            thead {
                display: table-header-group
            }

            tfoot {
                display: table-footer-group
            }
        }
    </style>
</head>

<body ng-controller="formatoteleorientacionController">
    <div class="container">
        <table width=718 cellpadding=7 cellspacing=0 style="page-break-before: always">
            <tr>
                <td colspan=11 width=702 height=88 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p align=center style="margin: 0in"><img src="../../assets/images/logo_cajacopieps.png" name="imagen 3"
                            align=bottom width=100 height=40 border=0>
                        <font face="arial, serif">
                            <font size=4><b>FORMATO
                                    ÚNICO DE ATENCIÓN DE TELEORIENTACIÓN
                                    <img src="../../assets/images/logo_cajacopieps.png" name="imagen 4" align=bottom width=100 height=40 border=0>
                                    </b></font>
                        </font>
                    </p>
                    <p align=center style="margin: 0in">
                        <font face="arial, serif">
                            <font size=4><b>línea
                                    de salud mental.</b></font>
                        </font>
                    </p>
                    <p align=center style="margin-top: 0;">
                        <font face="arial, serif">
                            <font size=4><b>#381</b></font>
                        </font>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p><b>1. DATOS DEL PACIENTE </b>
                </td>
            </tr>
            <tr valign=top>
                <td colspan=4 width=145 style="">
                    <p style="margin:0">Nombres y Apellidos: </p>
                </td>
                <td colspan=8 width=542
                    style="padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                    <p style="margin:0">{{dataformatoteleorient.nombre_afiliado}}
                    </p>
                </td>
            </tr>
            <tr valign=top>
                <td colspan=2 width=74
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>Edad:</p>
                </td>
                <td colspan=2 width=74 style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;"
                    align=center>
                    <p>
                        {{dataformatoteleorient.EdadDias}} años
                    </p>
                </td>
                <td width=32
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>Sexo:</p>
                </td>              
                <td width=20
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p align=center >{{dataformatoteleorient.sexo}}</p>
                </td>
                <td width=137 style="padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                    <p align=center style="margin-bottom: 0in">Régimen:
                    </p>
                    <p>
                    </p>
                </td>
                <td colspan=4 width=259
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>Contributivo ( {{dataformatoteleorient.regimen=='C'?'x':''}} ) Subsidiado (
                        {{dataformatoteleorient.regimen=='S'?'x':''}} )
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p><b>2. TIPO DE SEGUIMIENTO: </b> {{dataformatoteleorient.tipo_seguimiento}}
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                    <p><b>3. TIPO DE POBLACIÓN</b></p>
                </td>
            </tr>
            <tr valign=top>
                <td width=13
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>1</p>
                </td>
                <td colspan=10 width=675
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>DISCAPACITADO: {{dataformatoteleorient.discapacidad=='N'? 'NO':'SI'}}</p>
                </td>
            </tr>
            <tr valign=top>
                <td width=13
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>2</p>
                </td>
                <td colspan=10 width=675
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <div class="row">
                        <div class="col s6" style="width:50%;float: left;">
                            <p>EMBARAZO: {{dataformatoteleorient.embarazo =='N' ? 'NO':'SI'}} </p>
                        </div>
                        <div class="col s6" style="width:50%;float: right;">
                            <p> TRIMESTRE DE GESTACION: {{dataformatoteleorient.trimestre}} </p>
                        </div>

                    </div>

                </td>
            </tr>
            <tr valign=top>
                <td width=13
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>3</p>
                </td>
                <td colspan=10 width=675
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>PATOLOGIA:</p><div id="idpatologias"></div>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p style="text-transform: uppercase;text-align: justify;"><b>4. FACTORES DE RIESGO:</b></p>
                    <div style="text-transform: uppercase;text-align: justify;">
                          {{dataformatoteleorient.factores_riesgo}}
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p style="text-transform: uppercase;text-align: justify;"><b>5. FACTORES PROTECTORES:</b></p>
                   <div style="text-transform: uppercase;text-align: justify;">
                    {{dataformatoteleorient.factores_protectores}}
                </div>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p><b>6. CONDUCTA A SEGUIR: </b></p>
                   <div style="text-transform: uppercase;text-align: justify;">
                    {{dataformatoteleorient.conducta_remision}}   
                   </div>
                    
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p><b>7. EVOLUCIONES:</b>
                    <div style="text-transform: uppercase;text-align: justify;" id="idevoluciones"></div>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan=11 width=702 valign=top
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p><b>8. DATOS DEL TELORIENTADOR</b></p>
                </td>
            </tr>
            <tr valign=top>
                <td colspan=6 width=224
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p style="margin:0">Nombres y Apellidos:</p>
                </td>
                <td colspan=5 width=463 style="">
                    <p style="margin:0">MARLIS ISABEL CARDONA VILLA</p>
                </td>
            </tr>
            <tr valign=top>
                <td colspan=6 width=224
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>Tipo profesional de Salud/Especialidad/Subespecialidad</p>
                </td>
                <td colspan=4 width=225 style="padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                    <p>Psicologa</p>
                </td>
                <td rowspan=2 width=224
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p style="margin-bottom: 0in">Firma
                    </p>
                    <p><img src="firma.jpg" name="imagen 1" align=bottom width=180 height=86 border=0> </p>
                </td>
            </tr>
            <tr valign=top>
                <td colspan=6 width=224 height=1
                    style="padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                    <p style="margin-bottom: 0in">N° tarjeta profesional
                    </p>
                    <p style="text-indent: 0.49in"><br>
                    </p>
                </td>
                <td colspan=4 width=225
                    style="padding-bottom: 0in;padding-left: 0.08in;padding-right: 0.08in;">
                    <p>139238</p>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>