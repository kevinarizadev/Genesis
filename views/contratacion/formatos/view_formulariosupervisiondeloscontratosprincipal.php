<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Formato de supervisón de los contratos</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">
        @page {
            size: auto;
            margin: 1em;
            /* margin-left: 0.5em; */
        }
        *{
            font-family: 'Open Sans', sans-serif;
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        #table1,
        #table1 tr th,
        #table1 tr td {
            border: .5px solid black;
            border-collapse: collapse;
            font-size: 71%;
            border-spacing: 0 0 !important;
        }

        .Firma {
            background-size: cover;
            width: 200px;
            height: 85px;
            margin: auto;
            background-position-y: 0;
            filter: grayscale(100%);
        }
    </style>
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/contratacion/formatos/view_formatosupervisiondecontratoController.js"></script>
</head>
<body ng-controller="ControladorIMP" ng-init="Hoja='ANT'">
    <table id="table1" width="100%" style="border: #FFF;">
        <tr style="font-weight:600;">
            <td colspan="1" rowspan="3" style="text-align: center;width:20%">
                <img src="https://genesis.cajacopieps.com//assets/images/logo_cajacopieps.png" width=80px; height="40px">
            </td>
            <td colspan="6" rowspan="2" style="width: 60%;text-align: center;font-weight:600;padding:0.1% 0%;">FORMATO DE SUPERVISIÓN DE LOS CONTRATOS</td>
            <td colspan="2">
                Código RP-FR-06
            </td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="2">Version: 02</td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="6" style="text-align: center;padding:1% 0%;">
                PROCEDIMIENTO DE OPERACIÓN,SEGUIMIENTO Y EVALUACION DE RED</td>
            <td colspan="2">Fecha: Febrero 2023</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="2" style="text-align: center;padding:0% 0%;">PRESTADOR SUPERVISADO</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">FECHA DE VISITA</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">REGIONAL</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">FECHA</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Nombre_IPS}}</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Fecha_visita}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Regional}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Fecha}}</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">SUPERVISOR CAJACOPI EPS SAS</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">REPRESENTANTE DEL PRESTADOR</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">CARGO REPRESENTANTE DEL PRESTADOR</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Nombre_IPS}}</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Representante_ips}}</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Cargo_repreentante}}</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: center;">DATOS GENERALES</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">NOMBRE DEL CONTRATISTA</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">NIT</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">CÓDIGO DE HABILITACIÓN</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Nombre_IPS}}</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Nit}}</td>
            <td colspan="3" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Cod_habilitacion}}</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">NO. CONTRATO</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">OBJETO</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">FECHA INÍCIO</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">FECHA FÍN</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">FORMA DE PAGO</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">VALOR</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">TIPO DE GARANTÍA</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">VIGENCIA DE GARANTÍA</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Contrato}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Objeto}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Fecha_inicio}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Fecha_fin}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Forma_pago}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Valor_contrato}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Garantia}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].vigencia_garantia}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Contrato}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Objeto}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Fecha_inicio}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Fecha_fin}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Forma_pago}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Valor_contrato}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].Garantia}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[1].vigencia_garantia}}</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Contrato}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Objeto}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Fecha_inicio}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Fecha_fin}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Forma_pago}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Valor_contrato}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].Garantia}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[2].vigencia_garantia}}</td>
        </tr>
        <tr style="font-weight:600;">
            <td colspan="1" style="background-color:#1a2e63;color:white;">DESCRIPCION DE LOS SERVICIOS CONTRATADOS AL PRESTADOR:</td>
            <td colspan="8" style="text-align: center">{{infoFormato.cab[0].observacion}}</td>
        </tr>
        <tr style="font-weight:800;text-align: center;padding:1% 0%;">
            <td colspan="9" style="text-align: center;">OBJETIVO: Vigilar, controlar y evaluar permanentemente las obligaciones contractuales entre las partes dentro del plazo estipulado.</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">Proceso 1. Mantenimiento de las condiciones de habilitación y soportes contractuales 15%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Criterio </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No Aplica</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">Observaciones </td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">Puntaje</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">1.Cumple en un 95% con las condiciones de habilitación, según la última auditoria realizada.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[0].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[0].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[0].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[0].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[0].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.La capacidad instalada es suficiente para la atención de la población de Cajacopi EPS SAS.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[1].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[1].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[1].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[1].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[1].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">3. El proveedor no presenta medidas especiales o cierres por parte del ente.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[2].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[2].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[2].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[2].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[2].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">4.Cuenta con todos los soportes documentales, necesarios para la contratación.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[3].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[3].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[3].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[3].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[3].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">5.Cuenta con las polizas de responsabilidad civil vigentes.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[4].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[4].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[4].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[4].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[4].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">Proceso: 2. Indicadores 20%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.1. Cumple con los indicadores de calidad:Oportunidad de asignación de citas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[5].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[5].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[5].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[5].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[5].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.2. Cumple con los indicadores de calidad: Oportunidad de referencia y contrareferencia.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[6].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[6].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[6].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[6].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[6].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.3. Cumple con los indicadores de calidad: satisfacción de los usuarios con la IPS por encima del 95%.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[7].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[7].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[7].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[7].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[7].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.4. Cumple con los indicadores de calidad: Gestión de eventos adversos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[8].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[8].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[8].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[8].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[8].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.5 Cumple con los indicadores de gestión: Para operadores logísticos de medicamentos: Porcentaje de formulas entregadas completas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[9].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[9].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[9].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[9].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[9].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.6 Cumple con los indicadores de gestión: Para operadores logísticos de medicamentos: porcentaje de formulas entregadas oprtunamente.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[10].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[10].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[10].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[10].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[10].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.7 Cumple con los indicadores de gestión: Para operadores logísticos de medicamentos: porcentaje de pendientes.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[11].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[11].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[11].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[11].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[11].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.8 Cumple con los indicadores de resultados: Resolutividad médica.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[12].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[12].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[12].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[12].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[12].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.9 Cumple con los indicadores de resultados: Implementación atención con enfoque diferencial.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[13].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[13].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[13].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[13].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[13].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.10 Cumple con los indicadores de resultados: Tutelas radicadas por ordenamientos de servicios contratados.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[14].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[14].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[14].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[14].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[14].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.11 Cumple con los indicadores de resultados: Tasa de PQRS por IPS.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[15].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[15].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[15].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[15].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[15].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.12 Cumple con los indicadores de resultados:Tasa de mortalidad en niños menores de un año (mortalidad infantil).</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[16].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[16].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[16].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[16].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[16].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.13 Cumple con los indicadores de resultados:Tasa de mortalidad en menores de 5 años por Infección Respiratoria Aguda (IRA).</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[17].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[17].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[17].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[17].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[17].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.14 Cumple con los indicadores de resultados:Tasa de mortalidad en menores de 5 años por Enfermedad Diarreica Aguda (EDA).</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[18].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[18].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[18].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[18].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[18].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.15 Cumple con los indicadores de resultados:Tasa de mortalidad en menores de 5 años por Desnutrición.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[19].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[19].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[19].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[19].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[19].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.16 Cumple con los indicadores de resultados:Proporción de tamización para Virus de Inmunodeficiencia Humana (VIH) en gestantes.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[20].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[20].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[20].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[20].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[20].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.17 Cumple con los indicadores de resultados:Tiempo promedio entre la remisión de las mujeres con diagnóstico presuntivo de cáncer de mama y la confirmación del diagnóstico de cáncer de mama de casos incidentes.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[21].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[21].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[21].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[21].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[21].Puntaje}}%</td>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.18 Envía oportunamente la información de los indicadores de la resolución 0256 de 2016 y la resolución 1552 de 2013.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[22].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[22].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[22].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[22].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[22].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">Proceso: 3. Cumplimiento financieros 5%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Criterio </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No Aplica</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">Observaciones </td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">Puntaje</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">1.Recauda las cuotas moderadoras y copagos pertinentes.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[23].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[23].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[23].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[23].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[23].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.Notifica oportunamente a la EPS si el usuario no tiene capacidad de pago de las cuotas moderadoras y copagos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[24].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[24].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[24].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[24].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[24].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">3.Radica oportunamente la facturación</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[25].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[25].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[25].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[25].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[25].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">4.Responde oportunamente las glosas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[26].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[26].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[26].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[26].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[26].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">5.El porcentaje del cumplimiento del costo ejecutado es proporcional al costo presupuestado para el período.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[27].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[27].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[27].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[27].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[27].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">Proceso: 4. Prestación efectiva de los servicios 20%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Criterio </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No Aplica</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">Observaciones </td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">Puntaje</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">1.El 95% de las ordenes generadas al prestador estan en estado atendidas antes de los 90 días de generadas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[28].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[28].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[28].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[28].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[28].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.El prestador responde oportunamente las alertas tempranas reportadas.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[29].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[29].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[29].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[29].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[29].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">3.Cumple con la prestación del 100% de  los servicios contratados.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[30].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[30].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[30].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[30].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[30].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">4.Cuenta con planes de contingencia ante la interrupción del servicio.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[31].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[31].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[31].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[31].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[31].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">Proceso: 5. Satisfacción del usuario 20%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Criterio </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No Aplica</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">Observaciones </td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">Puntaje</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">1. El proveedor tiene una calificación por encima del 95% en la encuesta de satisfacción del usuario. </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[32].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[32].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[32].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[32].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[32].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2. El proveedor no se encuentra dentro de los 10 primeros proveedores con PQR.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[33].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[33].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[33].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[33].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[33].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">3. El proveedor responde oportuna y eficientemente las PQR.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[34].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[34].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[34].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[34].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[34].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">Proceso: 6. Tutelas 5%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Criterio </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No Aplica</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">Observaciones </td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">Puntaje</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">1. El Proveedor se encuentra dentro de los 10 primeros generadores de tutelas por ordenamientos no PBS. </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[35].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[35].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[35].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[35].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[35].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: left;">proceso: 7. Planes de acción 15%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="1" style="text-align: center;padding:0% 0%;">Criterio </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">Cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No cumple</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">No Aplica</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">Observaciones </td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">Puntaje</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">1.El proveedor envia oportunamente los planes de acción solicitados. </td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[36].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[36].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[36].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[36].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[36].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">2.Las actividades que plantea en los planes de acción solicitados, eliminan las causas raices de los incumplimientos.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[37].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[37].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[37].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[37].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[37].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="1" style="text-align: left;padding:0% 0%;">3.El Proveedor cumple oportunamente con el cierre de los planes de acción generados.</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[38].Cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[38].No_cumple}}</td>
            <td colspan="1" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[38].No_aplica}}</td>
            <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[38].Observacion}}</td>
            <td colspan="2" style="text-align: center;padding:0% 0%;">{{infoFormato.detalle[38].Puntaje}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="9" style="text-align: center;">TABLA DE PUNTAJE</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="5" style="text-align: center;padding:0% 0%;">El valor de cada ítem se calcula dividiendo 100 entre el número de ítems que aplicaron a la evaluación, y luego se suman los resultados. </td>
                <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Puntaje_total}}%</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="5" style="text-align: center;padding:0% 0%;">CUMPLE: Entre 95% y 100%.</td>
                <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Cumple}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="5" style="text-align: center;padding:0% 0%;">CUMPLE CON PLAN DE MEJORAMIENTO: Entre 80 y 94%.</td>
                <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Plan_mejoramiento}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="5" style="text-align: center;padding:0% 0%;">NO CUMPLE: Menor de 79%.</td>
                <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].No_cumple}}</td>
        </tr>
        <tr style="font-weight:700; ;padding:1% 0%;">
            <td colspan="5" style="text-align: center;padding:0% 0%;">Calificación final de la supervisión del contrato:</td>
                <td colspan="4" style="text-align: center;padding:0% 0%;">{{infoFormato.cab[0].Puntaje_total}}%</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="4" style="text-align: center;padding:0% 0%;">CONCLUSIONES </td>
            <td colspan="5" style="text-align: center;padding:0% 0%;">RECOMENDACIONES</td>
        </tr>
        <tr style="font-weight:700;">
            <td colspan="4" style="text-align: left;padding:1% 0%;">{{infoFormato.cab[0].Conclusiones}}</td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">{{infoFormato.cab[0].Recomendaciones}}</td>
        </tr>
        <tr style="font-weight:700; background-color:#1a2e63;color:white;padding:1% 0%;">
            <td colspan="4" style="text-align: center;padding:0% 0%;">SUPERVISOR CAJACOPI EPS SAS </td>
            <td colspan="5" style="text-align: center;padding:0% 0%;">REPRESENTANTE IPS</td>
        </tr>
        <tr style="font-weight:900;padding:1% 0%;">
            <td colspan="4" style="text-align: left;padding:1% 0%;">FIRMA: </td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">FIRMA:</td>
        </tr>
        <tr style="font-weight:900;padding:1% 0%;">
            <td colspan="4" style="text-align: left;padding:1% 0%;">NOMBRE: {{infoFormato.cab[0].nombre_supervisor_eps}} </td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">NOMBRE: {{infoFormato.cab[0].Representante_ips}} </td>
        </tr>
        <tr style="font-weight:900;padding:1% 0%;">
            <td colspan="4" style="text-align: left;padding:1% 0%;">CC: {{infoFormato.cab[0].documento_supervisor_eps}}</td>
            <td colspan="5" style="text-align: left;padding:1% 0%;">CC: {{infoFormato.cab[0].Documento_supervisor_ips}}</td>
        </tr>
    </table>
</body>
</html>