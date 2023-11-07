<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em;
            margin-left: 0.5em;
        }

        * {
            font-family: 'Open Sans', sans-serif;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        #Tabla_Titulo,
        #Tabla_Titulo th,
        #Tabla_Titulo td {
            border: 0px solid black;
            font-size: 11px;
            border-spacing: 0 0 !important;
        }

        #table_Cuerpo,
        #table_Cuerpo tr th,
        #table_Cuerpo tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 8px;
            border-spacing: 0 0 !important;
        }

        #Table_Firmas,
        #Table_Firmas tr th,
        #Table_Firmas tr td {
            border: 0px solid black;
            border-collapse: collapse;
            font-size: 10px;
            border-spacing: 0 0 !important;
        }

        #table_Pie,
        #table_Pie tr th,
        #table_Pie tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 8px;
            border-spacing: 0 0 !important;
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/autorizaciones/anticipos/formatos.js"></script>
</head>

<body ng-controller="ControladorIMP" ng-init="Hoja='ANT'">
    <div style="padding-left:50px;padding-right:20px">
        <table id="Tabla_Titulo" width="100%" style="text-align:left;;">
            <tr>
                <th style="width: 10%;border-bottom-width: 1px"><img src="../../../assets/images/logo_cajacopieps.png" width=105px; height="50px">
                    <span>CONTRATO DE PRESTACIÓN DE SERVICIOS DE SALUD PARA LA RECUPERACIÓN DE LA SALUD MEDIANTE LA MODALIDAD DE PAGO GLOBAL PROSPECTIVO</span></th>
            </tr>
            <tr>
                <th style="text-align:right">
                    <span style="font-size: 7px;padding-top:5px;"><b> MOD. 04 REV. 04</b></span>
                </th>
            </tr>

            <tr>
                <th>
                    <span style="font-size: 9px;padding-top:5px;"><b>Contrato No: RS 2019</b></span>
                </th>
            </tr>
            <tr>
                <th>
                    <span style="font-size: 9px;padding-top:5px;"><b>Fecha de suscripción:</b></span>
                </th>
            </tr>
        </table>
    </div>
    <div style="padding:0px 20px">
        <table id="table_Cuerpo" width="100%" style="border: #FFF;">
            <tr>
                <td colspan="4">
                    <span><b>1. PARTES CONTRATANTES: </b></span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span><b>1.1 CONTRATANTE: </b>CAJACOPI EPS SAS</span>
                </td>
                <td colspan="1">
                    <span><b>NIT: </b>901.543.211 - 6</span>
                </td>
                <td colspan="1">
                    <span><b>CÓDIGO: </b>CCF-055</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span><b>1.2 CONTRATISTA: </b>ESE SAN ANDRES APOSTOL</span>
                </td>
                <td colspan="1">
                    <span><b>NIT: </b>812.001.332</span>
                </td>
                <td colspan="1">
                    <span>CCF-055</span>
                </td>
            </tr>
            <tr>
                <td colspan="4">
                    <span><b>2. REPRESENTANTES LEGALES: </b></span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span><b>2.1 CONTRATANTE</b></span>
                </td>
                <td colspan="2">
                    <span><b>2.2 CONTRATISTA</b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="2">
                    <span>MARIA MARGARITA AMARIS GUTIERREZ DE PIÑERES</span>
                </td>
                <td colspan="2">
                    <span></span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span>D.I. Nº: 32.773.828 </span>
                </td>
                <td colspan="2">
                    <span>C.C. Nº: </span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span>De: BARRANQUILLA (DISTRITO) </span>
                </td>
                <td colspan="2">
                    <span>De:</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span>Domicilio: BARRANQUILLA (DISTRITO)</span>
                </td>
                <td colspan="2">
                    <span>Domicilio:</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span>Dirección: CALLE 44 No 46 - 32</span>
                </td>
                <td colspan="2">
                    <span>Dirección:</span>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <span>Teléfono (s): 3185930 – 018000111446</span>
                </td>
                <td colspan="2">
                    <span>Teléfono (s):</span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="2">
                    <span><b>3. TOTAL POBLACIÓN USUARIA CAPITADA: </b></span>
                </td>
                <td colspan="2">
                    <span><b>3.1 VALOR AFILIADO DIA: $</b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="4">
                    <span><b>4. VALOR AFILIADO MES: $ </b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="2">
                    <span><b>5. VALOR TOTAL DEL CONTRATO: $ </b></span>
                </td>
                <td colspan="2">
                    <span><b>5.1 VALOR EN LETRAS: </b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="4">
                    <span><b>6. MUNICIPIO DE COBERTURA: </b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="4">
                    <span><b>7. VIGENCIA DEL CONTRATO: </b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="2">
                    <span><b>7.1 FECHA INICIAL: </b></span>
                </td>
                <td colspan="2">
                    <span><b>7.2 FECHA FINAL: </b></span>
                </td>
            </tr>
            <!-- // -->
            <tr>
                <td colspan="4">
                    <span><b>8. OBJETO DEL CONTRATO: </b>

                        <div>
                            <span>El presente contrato tiene por objeto la prestación de los servicios de salud de acciones para la recuperación de la salud establecidas dentro del Plan de
                                Beneficios en Salud contemplado en la resolución 5269 de 2017 del Ministerio De Salud y Protección Social y demás normas que lo adicionen,
                                modifiquen o sustituyan.</span>
                        </div>
                        <!-- // -->
                        <div style="padding-top:10px">
                            <span><b>ATENCION AMBULATORIA DE PRIMER NIVEL DE COMPLEJIDAD</b></span>
                        </div>
                        <div>
                            <span>Comprende la atención integral medica 328, atención prioritaria 359, atención por enfermería 312, atención odontológica 334, retiro de sutura,
                                curaciones y de todos los eventos y problemas de salud susceptibles de ser atendidos de forma ambulatoria intra o extramural y con tecnología de baja
                                complejidad según lo establecido en la Resolución 5269 de 2017 del Ministerio De Salud y Protección Social y las demás normas que lo adicionen o
                                modifiquen. Códigos 725-Electrodiagnostico. 729-Micronebulizacines .Se destina un valor equivalente a <b>$ </b>.</span>
                        </div>
                        <!-- // -->
                        <div>
                            <span><b>ATENCION HOSPITALARIA DE MENOR COMPLEJIDAD</b></span>
                        </div>
                        <div>
                            <span>Comprende la atención integral de los eventos que requieran una menor complejidad para su atención con internación a nivel hospitalario según lo
                                definido en la Resolución 5269 de 2017 del Ministerio De Salud y Protección Social y demás normas que adicionen o modifiquen. Incluye la atención
                                por los profesionales, técnicos y auxiliares, material médico quirúrgico, derechos de hospitalización Códigos 101-General adulto-102- General Pediátrica
                                ,112-Obstetricia. Se destina un valor equivalente a <b>$ </b>.</span>
                        </div>
                        <!-- // -->
                        <div>
                            <span><b>ATENCION INICIAL DE URGENCIAS</b></span>
                        </div>
                        <div>
                            <span>Comprende las acciones para atender una persona con patología de urgencia de acuerdo a lo determinado en la Resolución 5269 de 2017 de Ministerio
                                de salud y Protección Social y demás normas que lo adicionen o modifiquen. Código 501 Se destina un valor equivalente a <b>$ </b>.</span>
                        </div>
                        <!-- // -->
                        <div>
                            <span><b>AYUDA DIAGNOSTICA I NIVEL DE COMPLEJIDAD</b></span>
                        </div>
                        <div>
                            <span>Comprende las actividades y procedimientos radiológicos y de ultrasonografía 710- 719-724 establecidos en la resolución 5269 de 2017 del Ministerio
                                De Salud y Protección Social. Se destina un valor equivalente a <b>$ </b>.</span>
                        </div>
                        <!-- // -->
                        <div>
                            <span><b>LABORATORIO CLINICO I NIVEL DE COMPLEJIDAD</b></span>
                        </div>
                        <div>
                            <span>Comprende las pruebas establecidas en la resolución 5269 de 2017 del Ministerio De Salud y Protección Social. 706-712. Se incluye para el caso del
                                binomio materno – fetal, la realización de Toxoplasma, Hepatitis y Pruebas Elisa convencionales o pruebas rápidas para Anticuerpos VIH 1 Y 2 Se
                                destina un valor equivalente a <b>$ </b>.</span>
                        </div>
                        <!-- // -->
                        <div>
                            <span><b>REFERENCIA Y CONTRAREFERENCIA</b></span>
                        </div>
                        <div>
                            <span>Cubre el traslado Interinstitucional código 601 de los pacientes a otros niveles de atención del MUNICIPIO sede del contrato cuando la red sea
                                insuficiente y cuando medie la remisión de un profesional de la salud de la institución remitente en armonía con el sistema de referencia y contra
                                referencia del contratante. Se destina un valor equivalente a <b>$ </b>.</span>
                        </div>
                        <!-- // -->
                        <div style="padding-top:10px">
                            <span><b>CLAUSULA 1. ANEXOS:</b></span>
                        </div>
                        <div>
                            <span>Hacen parte integral del presente contrato el clausulado correspondiente y los anexos que se adjuntan en medio magnéticos,
                                debidamente recibidos por el CONTRATISTA</span>
                        </div>
                        <!-- // -->
                        <div style="padding-top:10px">
                            <span><b>CLAUSULA 2. PERFECCIONAMIENTO:</b></span>
                        </div>
                        <div>
                            <span>El presente Contrato se perfecciona con la suscripción del mismo por las partes.</span>
                        </div>

                    </span>
                </td>
            </tr>
        </table>


        <table id="Table_Firmas" style="padding:20px;margin:auto;margin-top:60px">
            <tr>
                <td>
                    <hr style="color:black">
                    <b>EL CONTRATANTE</b>
                </td>
                <td style="width:120px"></td>
                <td>
                    <hr style="color:black">
                    <b>EL CONTRATISTA</b>
                </td>
            </tr>

            <tr>
                <td>
                    <b>MARIA MARGARITA AMARIS G.</b>
                </td>
                <td style="width:120px"></td>
                <td>
                    <b>MARIA MARGARITA AMARIS G.</b>
                </td>
            </tr>
            <tr>
                <td>
                    <b>CC No 32.XXX.828 de Barranquilla</b>
                </td>
                <td style="width:120px"></td>
                <td>
                    <b>CC No 32.XXX.828 de Barranquilla</b>
                </td>
            </tr>
        </table>


        <table id="table_Pie" style="margin:auto;margin-top:30px">
            <tr>
                <td>
                    <span>
                        <b>ELABORO: </b> Asistente Nacional de Red de Servicios

                    </span>
                </td>
                <td>
                    <span>
                        <b>REVISÓ: </b>Subdirección de Salud
                    </span>
                </td>
                <td><span>
                        <b>REVISO Y APROBO ASPECTOS JURDICOS: </b>Coordinación Nacional Jurídica

                    </span></td>
                <td><span>
                        <b>APROBO: </b> Director Nacional de Salud

                    </span></td>
            </tr>
            <tr>
                <td>
                    <span>.</span>
                </td>
                <td>
                    <span>.</span>
                </td>
                <td>
                    <span>.</span>
                </td>
                <td>
                    <span>.</span>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>