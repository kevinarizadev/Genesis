<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato de Caratula</title>
    <!-- <link rel="icon" href="../../../../assets/images/icon.ico" /> -->
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em 2em 2em 2em;
            /* margin-left: 0.5em; */
        }

        @media print {
            #btn_imprimir{
                display: none;
            }
        }

        * {
            font-family: 'Open Sans', sans-serif;
            /* font-size: px; */
            /* border: 0.5px solid black; */
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            text-align: justify;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .bold {
            font-weight: 600;
        }

        .text7 {
            text-align: justify;
            font-size: 10px;
            font-weight: 100;
        }

        table {
            width: 100%;
        }

        #table1,
        #table1 tr th,
        #table1 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            /* font-size: 13px; */
            border-spacing: 0 0 !important;
        }

        .table2,
        .table2 tr th,
        .table2 tr td {
            font-size: 10px;
            font-weight: 600;
        }




        #table3,
        #table3 tr th,
        #table3 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 10px;
            text-align: left;
            border-bottom: 0;
        }

        #table33,
        #table33 tr th,
        #table33 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 10px;
            text-align: left;

        }

        #table4,
        #table4 tr th,
        #table4 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 10px;
            text-align: left;
        }

        #table5,
        #table5 tr th,
        #table5 tr td {
            border: .5px solid white;
            border-collapse: collapse;
            font-size: 10px;
            text-align: left;
            margin-top: 7em;
        }

        #table6,
        #table6 tr th,
        #table6 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 10px;
            text-align: left;
            margin-top: 7em;

        }

        footer {
            position: fixed;
            left: 0;
            bottom: 0;
            /* width: 100%; */
            text-align: center;
            margin: 0 2rem;
        }
    </style>

    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/contratacion/formatos/caratula.js"></script>

</head>

<body ng-controller="caratulaController">

    <table id="table1">
        <tr>
            <th>
                <img src="../../../assets/images/logo_cajacopieps.png" width=100px; height="50px">
            </th>
            <th style="text-align: center;font-weight:600;padding:0.1% 0%;">
                CONTRATO DE PRESTACIÓN DE SERVICIOS DE SALUD
                MEDIANTE LA MODALIDAD DE {{impresion.nombre_asunto.substring(4,200)}}
            </th>
        </tr>
    </table>

    <table class="table2">
        <tr>
            <th style="width: 80%;">
                <span>CONTRATO Nº {{impresion.documento=='KS'?'RS':'RC'}}-{{impresion.numero}}-{{impresion.fecha.substr(-4)}}</span>
                <br>
                <span>Fecha de suscripción: {{impresion.fecha_suscripcion}}</span>
            </th>
            <th style="width: 20%;text-align:right;font-size: 10px;">
                <span>MOD. 04 REV. 04</span>
            </th>
        </tr>
    </table>
    <table id="table3">
        <tr>
            <td colspan="4" class="bold">1. PARTES CONTRATANTES:</td>
        </tr>
        <tr>
            <td colspan="2"><b>1.1 CONTRATANTE:</b> CAJACOPI EPS SAS</td>
            <td><b>NIT:</b>901.543.211 - 6</td>
            <td>CCF-055</td>
        </tr>
        <tr>
            <td colspan="2"><b>1.2 CONTRATISTA:</b> {{impresion.prestador}}</td>
            <td><b>NIT:</b> {{impresion.nit_caratula}}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="4" class="bold">2. REPRESENTANTES LEGALES:</td>
        </tr>
    </table>
    <table id="table33">
        <tr>
            <th style="width:50%"><b>2.1 CONTRATANTE</b></th>
            <th><b>2.2 CONTRATISTA</b></th>
        </tr>
        <tr>
            <td>DANIEL ENRIQUE DE CASTRO CHAPMAN</td>
            <td>{{impresion.nom_representante}}</td>
        </tr>
        <tr>
            <td>CC No: 1.045.677.978</td>
            <td>CC No: {{impresion.cod_representante_caratula}}</td>
        </tr>
        <tr>
            <td>De: BARRANQUILLA (DISTRITO)</td>
            <td>De: {{impresion.exp_doc_representante}} </td>
        </tr>
        <tr>
            <td>Domicilio: BARRANQUILLA (DISTRITO)</td>
            <td>Domicilio: {{impresion.ubi_prestador}}</td>
        </tr>
        <tr>
            <td>Dirección: CALLE 44 No 46 – 32</td>
            <td>Dirección: {{impresion.dir_prestador}}</td>
        </tr>
        <tr>
            <td>
                Teléfono(s): 3185930 – 018000111446
                <br>
                Fax: 3850032 ext. 250
            </td>
            <td>
                Teléfono(s): {{impresion.tel_prestador}}
                <br>
                 
            </td>
        </tr>

        <tr ng-show="impresion.cod_concepto!='EV'">
            <td class="bold">3.TOTAL POBLACIÓN USUARIA CAPITADA: {{impresion.afiliados_caratula}} </td>
            <td rowspan="2" class="bold">3.1 VALOR AFILIADO DIA: {{impresion.valor_cap_afiliado_dia}} </td>
        </tr>
        <tr ng-show="impresion.cod_concepto!='EV'">
            <td class="bold">4.VALOR AFILIADO MES: {{impresion.valor_cap_afiliado_caratula}}</td>
        </tr>
        <tr ng-show="impresion.cod_concepto!='EV'">
            <td class="bold">5.VALOR TOTAL DE CONTRATO: {{impresion.valor_caratula}} </td>
            <td rowspan="2" class="bold">5.1 VALOR EN LETRAS: {{impresion.valor_en_letras}} </td>
        </tr>
        <tr ng-show="impresion.cod_concepto!='EV'">
            <td class="bold">6.MUNICIPIO DE COBERTURA: {{impresion.ubicacion}}</td>
        </tr>
        <!-- EVENTO -->
        <tr ng-show="impresion.cod_concepto=='EV'">
            <td colspan="2" class="bold">3. VALOR CONTRATO: {{impresion.valor_caratula}} </td>
        </tr>
        <tr>
            <td colspan="2" class="bold">{{impresion.cod_concepto=='EV'?'4':'7'}}. VIGENCIA DEL CONTRATO</td>

        </tr>
        <tr>
            <td class="bold">{{impresion.cod_concepto=='EV'?'4.1':'7.1'}}. FECHA INICIAL:{{impresion.inicia}} </td>
            <td class="bold">{{impresion.cod_concepto=='EV'?'4.2':'7.2'}}. FECHA FINAL:{{impresion.termina}} </td>
        </tr>
        <tr ng-show="impresion.cod_concepto=='EV'">
            <td class="bold">5. MUNICIPIOS DE COBERTURA: {{impresion.ubicacion}} {{impresion.cobertura!='N'?'Y INCLUYENDO USUARIOS EN PORTABILIDAD, MOVILIDAD Y GEORREFERENCIADA.':''}}</td>
            <td class="bold">5.1. POBLACIÓN:{{impresion.afiliados_caratula}} </td>
        </tr>
        <tr ng-show="impresion.cod_concepto=='EV'">
            <td class="bold">6. DOMICILIO CONTRACTUAL: BARRANQUILLA</td>
            <td></td>
        </tr>
    </table>
    <table class="table2">
        <tr>
            <th>
                <span>{{impresion.cod_concepto=='EV'?'7':'8'}}. OBJETO DEL CONTRATO:</span>
            </th>
        </tr>
        <tr>
            <td>
                <span class="text7">{{impresion.objeto_contrato}}</span>
            </td>
        </tr>
        <tr ng-hide="impresion.cod_concepto=='CA'">
            <td>{{impresion.cod_concepto=='EV'?'8':'9'}}. TARIFAS: las tarifas pactadas por las atenciones y procedimientos son las
                siguientes:</td>
        </tr>
    </table>
    <table id="table4" ng-hide="impresion.cod_concepto=='CA'">
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°1.</td>
            <td>SERVICIOS HABILITADOS</td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°2.</td>
            <td>PERFIL EPIDEMIOLÓGICO Y DEMOGRÁFICO</td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°3.</td>
            <td>TECNOLOGÍAS, TARIFAS Y PRECIOS </td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°4.</td>
            <td>POBLACIÓN OBJETO</td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°5.</td>
            <td>RED DE PRESTADORES</td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°6.</td>
            <td>ANEXO TÉCNICO DE CONTRATACIÓN</td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°7.</td>
            <td>TABLERO PARA REPORTE DE INDICADORES DE CALIDAD DE LA ATENCIÓN EN SALUD</td>
        </tr>
        <tr>
            <td style="width: 25%;">ANEXO TÉCNICO N°8.</td>
            <td>GUÍAS Y PROTOCOLOS DE ATENCIÓN</td>
        </tr>
    </table>
    <table class="table2">
        <tr>
            <th>
                <span>CLAUSULA 1. ANEXO:</span>
            </th>
        </tr>
        <tr>
            <td>
                <span class="text7">
                    Hacen parte integral del presente contrato el clausulado correspondiente y los anexos que se
                    adjunten.
                </span>
            </td>
        </tr>
        <tr>
            <th>
                <span>CLAUSULA 2. PERFECCIONAMIENTO:</span>
            </th>
        </tr>
        <tr>
            <td>
                <span class="text7">
                    El presente contrato se perfecciona con la suscripción del mismo por las partes.
                </span>
            </td>
        </tr>
    </table>
    <table id="table5">
        <tr>
            <td>
                <div>
                    <span> ______________________________________</span>
                    <br>
                    <b>EL CONTRATANTE</b>
                    <br>
                    <span>DANIEL ENRIQUE DE CASTRO CHAPMAN</span>
                    <br>
                    <span>CC No 1.045.677.978 de BARRANQUILLA</span>
                </div>
            </td>
            <td>
                <div>
                    <span> ______________________________________</span>
                    <br>
                    <b>EL CONTRATISTA</b>
                    <br>
                    <span> {{impresion.nom_representante}}</span>
                    <br>
                    <span>CC No {{impresion.cod_representante_caratula}} de {{impresion.exp_doc_representante}} </span>
                </div>
            </td>
        </tr>
    </table>
    <table id="table6">
        <tr>
            <td><b>ELABORO:</b> Asistente Nacional de Red de Servicios</td>
            <td><b>REVISÓ:</b> Subdirección de Salud</td>
            <td><b>REVISO Y APROBO ASPECTOS JURDICOS:</b> Coordinación Nacional Juridica</td>
            <td><b>APROBO:</b> Director Nacional de Salud</td>
        </tr>
        <tr>
            <td><br></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>

    <div style="text-align: center;" id="btn_imprimir">
        <button onclick="window.print();">Imprimir</button>
    </div>
</body>



</html>