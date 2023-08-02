<?php
session_start();
if (!isset($_SESSION['nombre'])) {
  header("Location: ../../../index.html");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Acta de Entrega</title>
  <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
  <link rel="icon" href="../../../assets/images/icon.ico" />
  <style type="text/css">
    @page {
      size: auto;
      margin: 1em 3em -3em 2em;
    }

    * {
      font-size: 16px;
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    }

    .form {
      position: absolute;
      margin-top: 5vh;
      width: 90%;
      padding: 3vh;
    }

    img {
      position: absolute;
    }

    .tcenter {
      text-align: center;
    }

    .tright {
      text-align: right;
    }

    .tleft {
      text-align: left;
    }

    .table-bordered,
    .table-bordered th,
    .table-bordered td {
      border: 1px solid black;
      border-collapse: collapse;
      padding: 4px;
    }

    .tableFirmas,
    .tableFirmas th,
    .tableFirmas td {
      text-align: left !important;
    }
  </style>
  <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
  <script src="../../../bower_components/angular/angular.js"></script>
  <script src="../../../bower_components/jquery/dist/jquery.js"></script>
  <!-- <script type="text/javascript" src="../../../js/qr-code-styling@1.5.0.js"></script> -->
  <script src="../../../scripts/controllers/administrativa/formatos/formato_celularesylineasmovilesController.js"></script>
</head>

<body ng-controller="formato_celularesylineasmovilesController">
  <img src="./marcaAgua_acta_entrega_equipo.png" style="width: 100%;" />


  <div class="form">


    <h2 style="text-align: right;">Barranquilla D.E.I.P {{FECHA}}</h2>

    <br><br>
    <h2 class="tcenter">ACTA DE ENTREGA DE EQUIPO</h2>

    <div>
      <table class="table-bordered" style="width: 100%;">
        <tr>
          <td style="width:50%">NOMBRES Y APELLIDOS</td>
          <td style="width:50%">{{DATA.NOMBRE_FUNC}}</td>
        </tr>
        <tr>
          <td>IDENTIFICACIÓN</td>
          <td>{{DATA.NUMDOC_FUNC}}</td>
        </tr>
        <tr>
          <td>AREA</td>
          <td>{{DATA.AREA_FUNC}}</td>
        </tr>
        <tr>
          <td>CARGO</td>
          <td>{{DATA.CARGO_FUNC}}</td>
        </tr>
        <tr>
          <td>REGIONAL</td>
          <td>{{DATA.REGIONAL_FUNC}}</td>
        </tr>
      </table>
    </div>


    <br><br>
    <h2 class="tcenter">DATOS DEL EQUIPO</h2>

    <div>
      <table class="table-bordered" style="width: 100%;">
        <tr>
          <td style="width:50%">LINEA DE TELÉFONO</td>
          <td style="width:50%">{{DATA.LINEA}}</td>
        </tr>
        <tr>
          <td>OPERADOR</td>
          <td>{{DATA.OPERADOR}}</td>
        </tr>
        <tr>
          <td>IMEI DE EQUIPO</td>
          <td>{{DATA.IMEI}}</td>
        </tr>
        <tr>
          <td>REFERENCIA DE EQUIPO</td>
          <td>{{DATA.REFERENCIA}}</td>
        </tr>
        <tr>
          <td>COLOR EQUIPO</td>
          <td>{{DATA.COLOR}}</td>
        </tr>
      </table>
    </div>

    <br><br>
    <h2 class="tleft">OBSERVACIONES:</h2>
    <span>
      {{DATA.OBSERVACION}}.
      <br><br>
      Favor firmar documento y remitirlo al correo electrónico: <u>{{DATA.CORREO}}</u>
    </span>

    <br><br><br>
    <div>
      <table class="tableFirmas" style="width: 100%;">
        <tr>
          <th style="width:60%">QUIEN ENTREGA</th>
          <th style="width:40%">QUIEN RECIBE</th>
        </tr>
        <tr>
          <th><br><br></th>
        </tr>
        <tr>
          <th>{{DATA.NOMBRE_ENTREGA}}</th>
          <th>{{DATA.NOMBRE_FUNC}}</th>
        </tr>
      </table>
    </div>

  </div>

  <!-- ----------------------------------------------------------- -->



</body>

</html>
