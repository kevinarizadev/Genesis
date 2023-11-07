<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Formato de Solicitud de Anticipo</title>
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em;
      /* margin-left: 0.5em; */
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

    #table1,
    #table1 tr th,
    #table1 tr td {
      border: .5px solid black;
      border-collapse: collapse;
      font-size: 7px;
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
  <script src="../../../scripts/controllers/autorizaciones/anticipos/formatoanticipoController.js"></script>
</head>
<!-- deeaf6 -->

<body ng-controller="ControladorIMP" ng-init="Hoja='ANT'">
  <table id="table1" width="100%" style="border: #FFF;">

    <tr style="font-weight:600;">
      <td colspan="1" rowspan="3" style="text-align: center;width:20%">
        <img style="width: 8em;" src="../../../assets/images/logo_cajacopieps.png">
        <!-- <img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png" width=80px; height="40px"></td> -->
      <td colspan="6" rowspan="2" style="width: 60%;text-align: center;font-weight:600;padding:0.1% 0%;">FORMATO DE SOLICITUD DE ANTICIPO</td>
      <td colspan="2">
        Código: RP-FR-11
      </td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="2">Version: {{numeroVersion }}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="6" style="text-align: center;padding:1% 0%;">
        PROCEDIMIENTO DE ANTICIPOS PARA PRESTADORES DE SERVICIOS DE SALUD</td>
      <td colspan="2">Fecha: {{fechaVersion}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">
        FECHA DE SOLICITUD:</td>
      <td colspan="3" style="border-left:white;text-align: center;">{{Ant_FECHA_SOL}}</td>
      <td colspan="1" style="width:9%;text-align: center;background-color:#deeaf6;">REGIONAL:</td>
      <td colspan="2" style="text-align: center;">{{Ant_SECCIONAL}}</td>
      <td colspan="1" style="width:5%;background-color:#deeaf6;">CONSECUTIVO</td>
      <td colspan="1" style="width:14%;text-align: center;">{{Ant_CONSECUTIVO}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">PARA</td>
      <td colspan="1" style="background-color:#deeaf6;">NOMBRE</td>
      <td colspan="3">{{Ant_DIRECTOR}}</td>
      <td colspan="1" style="background-color:#deeaf6;">CARGO</td>
      <td colspan="3">{{Ant_DIRECTOR_CARGO}}</td>
    </tr>
    <!-- <tr style="font-weight:600;">
        </tr> -->
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">NOMBRE DEL USUARIO</td>
      <td colspan="8">{{Ant_USUARIO}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">IDENTIFICACIÓN</td>
      <td colspan="8">{{Ant_USUARIO_ID}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">MUNICIPIO DE RESIDENCIA</td>
      <td colspan="6">{{Ant_USUARIO_RESIDENCIA}}</td>
      <td colspan="1" style="background-color:#deeaf6;">CÓDIGO DANE</td>
      <td colspan="1" style="text-align:center;">{{Ant_USUARIO_RESIDENCIA_DANE}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">MUNICIPIO DE ATENCIÓN DEL PACIENTE</td>
      <td colspan="6">{{Ant_USUARIO_ATENCION}}</td>
      <td colspan="1" style="background-color:#deeaf6;">CÓDIGO DANE</td>
      <td colspan="1" style="text-align:center;">{{Ant_USUARIO_ATENCION_DANE}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">COBERTURA</td>
      <td colspan="1" style="width:10%;background-color:#deeaf6;">INCLUIDA EN EL PBS</td>
      <td colspan="2" style="text-align:center;width:18%;"><span ng-show="Ant_MIPRES==null">X</span></td>
      <td colspan="1" style="width:12%;background-color:#deeaf6;">NO INCLUIDA EN EL PBS</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_MIPRES!=null">X</span></td>
      <td colspan="2" style="width:17%;background-color:#deeaf6;">NÚMERO DE PRESCRIPCIÓN MIPRES</td>
      <td colspan="1" style="text-align:center;">{{Ant_MIPRES}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" rowspan="2" style="background-color:#deeaf6;padding:1% 0%;">CUMPLIMIENTO A:</td>
      <td colspan="1" style="background-color:#deeaf6;">TUTELA</td>
      <td colspan="2" style="text-align:center;"><span ng-show="Ant_CUMPLIMIENTO=='TUT'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">MEDIDA PROVISIONAL</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_CUMPLIMIENTO=='MED'">X</span></td>
      <td colspan="2" style="background-color:#deeaf6;">DEFICIT DE RED</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_DEFICIT=='S'">X</span></td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">INCIDENTE DE DESACATO</td>
      <td colspan="7" style="text-align:center;"><span ng-show="Ant_CUMPLIMIENTO=='INC'">X</span></td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">FECHA DE RADICACIÓN DEL SERVICIO SOLICITADO</td>
      <td colspan="8" style="text-align:center;">{{Ant_FECHA_RADICACION}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" rowspan="2" style="background-color:#deeaf6;">TIPO DE SERVICIO</td>
      <td colspan="1" style="background-color:#deeaf6;">PROCEDIMIENTOS</td>
      <td colspan="1" style="text-align:center;width: 16%;"><span ng-show="Ant_TIPO_SERVICIO=='PRO'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">CONSULTAS</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_TIPO_SERVICIO=='CON'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">MEDICAMENTOS</td>
      <td colspan="1" style="text-align:center;width:16%;"><span ng-show="Ant_TIPO_SERVICIO=='MED'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">TRANSPORTE</td>
      <td colspan="1" style="text-align:center;width:19%;"><span ng-show="Ant_TIPO_SERVICIO=='TRA'">X</span></td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">LABORATORIOS</td>
      <td colspan="1" style="text-align:center;width: 16%;"><span ng-show="Ant_TIPO_SERVICIO=='LAB'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">INSUMOS</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_TIPO_SERVICIO=='INS'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">REEMBOLSO</td>
      <td colspan="1" style="text-align:center;width:16%;"><span ng-show="Ant_TIPO_SERVICIO=='REE'">X</span></td>
      <td colspan="1" style="background-color:#deeaf6;">ALBERGUE</td>
      <td colspan="1" style="text-align:center;width:19%;"><span ng-show="Ant_TIPO_SERVICIO=='ALB'">X</span></td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">DESCRIPCIÓN DEL SERVICIO SOLICITADO</td>
      <td colspan="8" style="text-align:center;">{{Ant_PRODUCTO_SERVICIO}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">DIAGNÓSTICO:</td>
      <td colspan="8" style="text-align:center;">{{Ant_DIAGNOSTICO_SERVICIO}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">JUSTIFICACIÓN TÉCNICO CIENTÍFICA DEL SERVICIO SOLICITADO</td>
      <td colspan="8" style="text-align:center;">{{Ant_JUSTIFICACION}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;padding:1% 0%;">VALOR DEL ANTICIPO</td>
      <td colspan="8" style="text-align:center;">${{Ant_VALOR_SERVICIO}}</td>
    </tr>
    <tr style="font-weight:600;text-align:center;">
      <td colspan="9" style="background-color:#deeaf6;">DATOS DEL PRESTADOR</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">NIT</td>
      <td colspan="8">{{Ant_NIT_PRESTADOR}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">NOMBRE DE LA IPS A LA QUE SE LE AUTORIZA EL SERVICIO</td>
      <td colspan="8">{{Ant_NOMBRE_PRESTADOR}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">BANCO</td>
      <td colspan="8">{{Ant_BANCO_PRESTADOR}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">NOMBRE DE LA CUENTA</td>
      <td colspan="8">{{Ant_CUENTA_PRESTADOR}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">No DE CUENTA</td>
      <td colspan="8">{{Ant_NUMERO_CUENTA_PRESTADOR}}</td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">TIPO DE CUENTA</td>
      <td colspan="3" style="text-align:center;background-color:#deeaf6;">AHORRO</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_TIPO_CUENTA_PRESTADOR=='Aho'">X</span></td>
      <td colspan="3" style="text-align:center;background-color:#deeaf6;">CORRIENTE</td>
      <td colspan="3" style="text-align:center;"><span ng-show="Ant_TIPO_CUENTA_PRESTADOR=='Cor'">X</span></td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">MEDIO DE PAGO</td>
      <td colspan="3" style="text-align:center;background-color:#deeaf6;">CONSIGNACIÓN</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_MEDIO_PAGO_PRESTADOR=='Con'">X</span></td>
      <td colspan="1" style="text-align:center;background-color:#deeaf6;">TRANSFERENCIA</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_MEDIO_PAGO_PRESTADOR=='Tra'">X</span></td>
      <td colspan="1" style="text-align:center;background-color:#deeaf6;">OTRO</td>
      <td colspan="1" style="text-align:center;"><span ng-show="Ant_MEDIO_PAGO_PRESTADOR=='Otr'">X</span></td>
    </tr>
    <tr style="font-weight:600;">
      <td colspan="1" style="background-color:#deeaf6;">SE ANEXAN LOS SIGUIENTES SOPORTES</td>
      <td colspan="8">SOLICITUD DE SERVICIO, COPIA DE HISTORIA CLINICA, FORMATO MIPRES, FOTOCOPIA DE CEDULA DE CIUDADANIA, FOTOCOPIA DEL ADRES ACTUALIZADO, COTIZACIONES, COPIA DE LA TUTELA, INCIDENTE O MEDIDA PROVISIONAL (SI ES EL CASO), CERTIFICACIÓN BANCARIA, RUT, CERTIFICACIÓN DE EXISTENCIA Y REPRESENTACIÓN LEGAL, HABILITACIÓN (ESTAS DOS ULTIMAS APLICAN PARA PSS NUEVOS EN LA EPS)</td>
    </tr>
    <tr style="font-weight:600;background-color:#deeaf6;text-align:center;">
      <td colspan="9">OBSERVACIONES:</td>
    </tr>
    <tr style="font-weight:600;text-align:center;">
      <td colspan="9">{{Ant_OBSERVACIONES}}</td>
    </tr>
    <tr style="font-weight:600;background-color:#deeaf6;text-align:center;margin-top: -40px;">
      <td colspan="4">APROBACIÓN DEL AUDITOR MÉDICO REGIONAL</td>
      <td colspan="5">APROBACIÓN DEL GERENTE REGIONAL</td>
    </tr>
    <tr style="font-weight:600;text-align:center;">
      <td colspan="4" style="height: 10px;border-right:white;">
        <div class="Firma" style="background-image:url({{FirmaAnt.X1}});"></div>
      </td>
      <td colspan="5" style="height: 10px;border-left:white;">
        <div class="Firma" style="background-image:url({{FirmaAnt.X2}});"></div>
      </td>
    </tr>
    <tr style="font-weight:600;background-color:#deeaf6;text-align:center;">
      <td colspan="4">APROBACIÓN DEL ESPECIALISTA NACIONAL DE AUTORIZACIONES</td>
      <td colspan="5">APROBACIÓN DEL COORDINADOR NACIONAL DE AUTORIZACIONES</td>
    </tr>
    <tr style="font-weight:500;text-align:center;">
      <td colspan="4" style="height: 65px;border-right:white;">
        <div class="Firma" style="background-image:url({{FirmaAnt.X3}});"></div>
      </td>
      <td colspan="5" style="height: 65px;border-left:white;">
        <div class="Firma" style="background-image:url({{FirmaAnt.X4}}); width: 300px;"></div>
      </td>
    </tr>


    <tr style="font-weight:600;background-color:#deeaf6;text-align:center;">
      <td colspan="{{Ajuste_Mayo_D_S == 'Dir' ? '4' : '9' }}">{{nombreSubdirector}}</td>
      <td colspan="5" ng-if="Ajuste_Mayo_D_S == 'Dir'">APROBACIÓN DEL DIRECTOR DE SALUD</td>
    </tr>
    <tr style="font-weight:600;text-align:center;">
      <td colspan="{{Ajuste_Mayo_D_S == 'Dir' ? '4' : '9' }}" style="height: 65px;">
        <div class="Firma" style="background-image:url({{FirmaAnt.X5}});"></div>
      </td>
      <td colspan="5" style="height: 65px;border-left:white;" ng-if="Ajuste_Mayo_D_S == 'Dir'">
        <div class="Firma" style="background-image:url({{FirmaAnt.X6}});"></div>
      </td>
    </tr>
  </table>

</body>

</html>
