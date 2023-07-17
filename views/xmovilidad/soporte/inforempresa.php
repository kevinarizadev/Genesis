
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html ng-app="GenesisApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Información de Empresa</title>
<link rel="icon" href="../../../assets/images/icon.ico" />
<link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
<style type="text/css">
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
}
 td {
     padding: 2px;
    text-align: left;
    height: 9px;
    font-weight: 600;
}
th{

    text-align: center;
}
.respo{
    text-align: center;
    font-weight: 300;
}
</style>
<script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
<script src="../../../bower_components/angular/angular.js"></script>
<script src="../../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../../scripts/controllers/movilidad/soporte/infoempresa.js"></script>
</head>
<body ng-controller="infoempresactrl" style="text-transform: uppercase;" >
  <table width="100%">
      <tr>
          <th rowspan="4" style="width: 15%"><img src="https://genesis.cajacopieps.com/assets/images/logo_cajacopieps.png" width= 120px;></th>
          <th rowspan="2" >FORMATO DE EMPLEADORES</th>
          <td style="width: 15%">CODIGO OP-FR-09</td>
      </tr>
          <td>Versión: 03</td>
      <tr>
          <th rowspan="2" >PROCEDIMIENTO PARA LA PROMOCIÓN DE LA AFILIACIÓN REGIMEN CONTRIBUTIVO</th>
          <td>Fecha: Julio 2022</td>
      </tr>
</table>

<table style="width: 100%; border:0px">
      <tr>
          <th colspan="4" style="width: 27%">FECHA DE INSCRIPCIÓN A LA EPS:</th>

          <td style=" border:0px"></td>
          <td style="width: 15%;  text-align: center;  ">No Formulario</td>

      </tr>
      <tr>
          <td colspan="4" class="respo" style="width: 27%">{{infoempresa.fechainscripcion}}</td>
          <td  style=" border:0px"></td>
          <td class="respo" style="width: 15%;">{{infoempresa.numeroformulario}}</td>
      </tr>
</table>

<table style="width: 100%;" >
      <tr>
          <th colspan="4" style="width: 100%">INFORMACION DEL EMPLEADOR</th>
      </tr>
      <tr>
          <td style="width: 25%">TIPO DE IDENTIFICACION </td>
          <td class="respo" style="width: 25%">{{infoempresa.tidentificacionn}}</td>
          <td style="width: 25%">TIPO DE EMPLEADOR:  </td>
          <td class="respo" style="width: 25%">{{infoempresa.templador}}</td>
      </tr>
        <tr>
          <td style="width: 25%">CLASE DE APORTANTE</td>
          <td class="respo" style="width: 25%">{{infoempresa.claseaportante}}</td>
          <td style="width: 25%">FORMA DE PAGO:  </td>
          <td class="respo" style="width: 25%">{{infoempresa.pago}}</td>
      </tr>
</table>

<table style="width: 100%;" ng-show="infoempresa.tidentificacion=='N'">

      <tr>
          <td style="width: 50%">NUMERO DE IDENTIFICACION</td>
          <td class="respo" style="width: 50%">{{infoempresa.nidentificacion}}</td>
      </tr>
       <tr>
          <td style="width: 50%">NOMBRE O RAZON SOCIAL</td>
          <td class="respo" style="width: 50%">{{infoempresa.razonsocial}}</td>
      </tr>
      <tr>
          <td style="width: 50%">SIGLA COMERCIAL</td>
          <td class="respo" style="width: 50%">{{infoempresa.siglas}}</td>
      </tr>
</table>

<table style="width: 100%;" ng-show="infoempresa.tidentificacion=='C'">

      <tr>
          <td colspan="2" style="width: 50%">NUMERO DE IDENTIFICACION</td>
          <td colspan="2" class="respo" style="width: 50%">{{infoempresa.nidentificacion}}</td>
      </tr>
       <tr>
          <td style="width: 25%">PRIMER APELLIDO</td>
          <td class="respo" style="width:25%">{{infoempresa.primerapellido}}</td>
          <td style="width: 25%">SEGUNDO APELLIDO</td>
          <td class="respo" style="width:25%">{{infoempresa.segundoapellido}}</td>
      </tr>
      <tr>
          <td style="width: 25%">PRIMER NOMBRE</td>
          <td class="respo" style="width: 25%">{{infoempresa.primernombre}}</td>
           <td style="width: 25%">SEGUNDO NOMBRE</td>
          <td class="respo" style="width: 25%">{{infoempresa.segundonombre}}</td>
      </tr>
</table>

<table style="width: 100%;" >

      <tr>
          <td style="width: 25%">TIPO DE EMPRESA: </td>
          <td class="respo" style="width: 25%">{{infoempresa.tipoempresas}}</td>
          <td style="width: 25%">CLASIFICACION DEL EMPLEADOR </td>
          <td class="respo" style="width: 25%">{{infoempresa.clasificacion}}</td>
      </tr>
       <tr>
          <td colspan="2" style="width: 50%">ACTIVIDAD ECONOMICA</td>
          <td class="respo" colspan="2" style="width: 50%">{{infoempresa.actividad}}</td>
      </tr>
       <tr>
          <td style="width: 25%">DIVISIÓN CIIU</td>
          <td  style="width: 25%; text-align:center;">CODIGO:</td>
          <td class="respo" colspan="2" style="width: 50%">{{infoempresa.codigoactividad}}</td>
      </tr>
      <tr>
          <td style="width: 25%">VIGENCIA DE LA EMPRESA: </td>
          <td class="respo" style="width: 25%">{{infoempresa.vigencia}}</td>
          <td style="width: 25%">FECHA DE VIGENCIA: </td>
          <td class="respo" style="width: 25%">{{infoempresa.fvigencia}}</td>
      </tr>
</table>
<table style="width: 100%;" >
      <tr>
          <td style="width: 25%">NUMERO DE TRABAJADORES</td>
          <td class="respo" style="width: 25%">{{infoempresa.ntrabajadores}}</td>
          <td style="width: 25%">CIUDAD DONDE SE CAUSAN LOS SALARIOS</td>
          <td class="respo" style="width: 25%"></td>
      </tr>
        <tr>
          <td style="width: 25%">DIRECCION OFICINA PRINCIPAL</td>
          <td class="respo" style="width: 25%">{{infoempresa.dirprincipal}}</td>
          <td style="width: 25%">DIRECCION OFICINA SUCURSAL  </td>
          <td class="respo" style="width: 25%"></td>
      </tr>
        <tr>
          <td style="width: 25%">BARRIO</td>
          <td class="respo" style="width: 25%">{{infoempresa.barprincipal}}</td>
          <td style="width: 25%">BARRIO</td>
          <td class="respo" style="width: 25%"></td>
      </tr>
        <tr>
          <td style="width: 25%">MUNICIPIO </td>
          <td class="respo" style="width: 25%">{{infoempresa.munprincipal}}</td>
          <td style="width: 25%">MUNICIPIO  </td>
          <td class="respo" style="width: 25%"></td>
      </tr>
        <tr>
          <td style="width: 25%">DEPARTAMENTO</td>
          <td class="respo" style="width: 25%">{{infoempresa.depaprincipal}}</td>
          <td style="width: 25%">DEPARTAMENTO</td>
          <td class="respo" style="width: 25%"></td>
      </tr>
      <tr>
          <td style="width: 25%">TELEFONO</td>
          <td class="respo" style="width: 25%">{{infoempresa.telprincipal}}</td>
          <td style="width: 25%">TELEFONO</td>
          <td class="respo" style="width: 25%"></td>
      </tr>
      <tr>
          <td colspan="2" style="width: 50%">CORREO ELECTRONICO:</td>
          <td class="respo" colspan="2" style="width: 50%">{{infoempresa.emailcargo}}</td>
      </tr>
</table>

<table style="width: 100%;" >

      <tr>
          <td colspan="3" style="width: 50%">NOMBRE COMPLETO DEL REPRESENTANTE LEGAL:</td>
          <td class="respo" colspan="3" style="width: 50%">{{infoempresa.nomrepresentante}}</td>
      </tr>
       <tr>
          <td style="width: 17%">T DOC: </td>
          <td class="respo" style="width: 16%">{{infoempresa.tdrepresentante=="C"?"CEDULA":"CEDULA extranjera"  | uppercase }}</td>
          <td style="width: 17%">DOCUMENTO: </td>
          <td class="respo" style="width: 17%">{{infoempresa.drepresentante}}</td>
          <td style="width: 16%">FECHA NACIMIENTO </td>
          <td class="respo" style="width: 17%">{{infoempresa.fnrepresentante}}</td>
      </tr>
      <tr>
          <td colspan="3" style="width: 50%">CORREO ELECTRONICO:</td>
          <td class="respo" colspan="3" style="width: 50%">{{infoempresa.correorepresentante}}</td>
      </tr>
</table>

<table style="width: 100%;" >
      <tr>
          <td colspan="3" style="width: 50%">NOMBRE DE LA PERSONA CONTACTO DE LA EMPRESA:</td>
          <td class="respo" colspan="3" style="width: 50%">{{infoempresa.nomcargo}}</td>
      </tr>
       <tr>
          <td style="width: 17%">TELEFONO: </td>
          <td class="respo" style="width: 16%">{{infoempresa.telcargo}}</td>
          <td style="width: 17%">CELULAR: </td>
          <td class="respo" style="width: 17%">{{infoempresa.celcargo}}</td>
          <td style="width: 16%">FECHA NACIMIENTO </td>
          <td class="respo" style="width: 17%">{{infoempresa.fncargo}}</td>
      </tr>
      <tr>
          <td colspan="3" style="width: 50%">CORREO ELECTRONICO:</td>
          <td class="respo" colspan="3" style="width: 50%">{{infoempresa.emailcargo}}</td>
      </tr>
</table>
<table style="width: 100%;" >
 <tr>
     <td  style="width: 50%;border:0px"></td>
     <td  style="width: 50%; text-align: center;    ">FECHA Y FIRMA DE RADICACION</td>
 </tr>
 <tr>
     <td  style="width: 50%;border: 0px;padding-top: 20px"></td>
     <td  style="width: 50%;border-bottom: 0px;padding-top: 20px"></td>
  </tr>
 <tr>
     <td  style="width: 50% ; text-align: center;    ">FIRMA DEL REPRESENTANTE LEGAL</td>
     <td  style="width: 50%; border: 0px"></td>
 </tr>

</table>
<table style="width: 100%;" >
  <tr>
    <th colspan="4" style="width: 100%">ESPACIO EXCLUSIVO PARA CAJACOPI</th>
  </tr>
 <tr>
    <td style="width: 25%">CODIGO</td>
    <td style="width: 25%"></td>
    <td style="width: 25%">NOMBRE DEL TRABAJADOR QUE DILIGENCIA</td>
    <td style="width: 25%"></td>
 </tr>
 <tr>
      <td style="width: 25%">NOMBRE DEL GERENTE REGIONAL</td>
      <td style="width: 25%"></td>
      <td style="width: 25%">VB</td>
      <td style="width: 25%"></td>
 </tr>
</table>
<table style="width: 100%;" >
  <tr>
    <th style="width: 100%">OBSERVACIONES</th>
  </tr>
 <tr>
    <th style="width: 100%; padding-top: 35px"></th>
 </tr>
</table>
<table style="width: 100%;" >
 <tr>
    <th style="width: 50%; padding-top: 35px">VALIDADO</th>
    <th style="width: 50%; padding-top: 35px">GRABADO</th>
 </tr>
</table>

</body>
</html>
