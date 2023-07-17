<!doctype html>
<html ng-app = "declaracionApp">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Declaracion de salud</title>
<link rel="icon" href="../../assets/images/icon.ico" />
<script src="../../bower_components/angular/angular.js"></script>
<script src="../../bower_components/jquery/dist/jquery.js"></script>
<script src="../../scripts/controllers/dataGrid/declaracioncontroller.js"></script>
<script src="../../scripts/const/const.js"></script>
<script type="text/javascript" src="../../js/ngStorage.js"></script>
<script src="../bower_components/sweetalert/js/sweetalert2.min.js"></script>
<link rel="stylesheet" type="text/css" href="../../bower_components/sweetalert/css/sweetalert2.css">

<style type="text/css">
    body{
        font-size: 11px;
        font-family: Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif; 
    }
    #apDiv1 {
        position: absolute;
        left: 8px;
        top: 20px;
        width: 1033px;
        height: 1418px;
        border-top-width: 2px;
        border-right-width: 2px;
        border-bottom-width: 2px;
        border-left-width: 2px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }
    #apDiv2 {
        position: absolute;
        left: 152px;
        top: 19px;
        width: 713px;
        height: 42px;
        border-top-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }
    #apDiv3 {
        position: absolute;
        left: 152px;
        top: 68px;
        width: 713px;
        height: 54px;
        border-top-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: none;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }
    #apDiv15 {
        border-top-width: 0px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: none;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        position: absolute;
        left: 152px;
        top: 20px;
        width: 713px;
        height: 48px;
        z-index: 5;
    }
    #apDiv4 {
        margin: 0 auto;
        text-align:center;
        margin-top: 20px;
    }
    #apDiv5 {
        margin: 0 auto;
        text-align:center;
        margin-top: 20px;
    }
    #apDiv6 {
        position: absolute;
        left: 866px;
        top: 68px;
        width: 177px;
        height: 78px;
        border-top-width: 1px;
        border-top-style: solid;
        border-right-style: none;
        border-bottom-style: none;
        border-left-style: none;
    }
    #version {
        position: absolute;
        left: 872px;
        top: 48px;
        width: 158px;
        height: 16px;
    }
    #apDiv7 {
        position: absolute;
        left: 872px;
        top: 29px;
        width: 170px;
        height: 18px;
    }
    #apDiv8 {
        position: absolute;
        left: 8px;
        width: 168px;
        height: 20px;
        top: 6px;
    }
    #apDiv9 {
        position: absolute;
        left: 866px;
        top: 85px;
        width: 177px;
        height: 39px;
        line-height: 1;
        border-top-width: 1px;
        border-top-style: solid;
    }
    #apDiv10 {
        padding-left: 7px;
        position: absolute;
        left: 0px;
        top: 27px;
        width: 169px;
        height: 25px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-top-style: solid;
        border-bottom-style: solid;
    }
    #apDiv11 {
        position: absolute;
        left: 64px;
        top: 164px;
        width: 198px;
        height: 20px;
    }
    #departamento {
        position: absolute;
        left: 29px;
        top: 213px;
        width: 100px;
        height: 20px;
    }
    #depa {
        position: absolute;
        left: 140px;
        top: 213px;
        width: 227px;
        height: 20px;
    }
    #municipio {
        position: absolute;
        left: 423px;
        top: 217px;
        width: 80px;
        height: 20px;
    }
    #muni {
        position: absolute;
        left: 511px;
        top: 216px;
        width: 203px;
        height: 16px;
    }
    #barrio {
        position: absolute;
        left: 422px;
        top: 253px;
        width: 80px;
        height: 20px;
    }
    #barr {
        position: absolute;
        left: 511px;
        top: 252px;
        width: 203px;
        height: 18px;
    }
    #fechadiv {
        position: absolute;
        left: 745px;
        top: 217px;
        width: 63px;
        height: 20px;
    }
    #fecha {
        position: absolute;
        left: 816px;
        top: 214px;
        width: 135px;
        height: 17px;
    }
    #formnum {
        position: absolute;
        left: 582px;
        top: 157px;
        width: 163px;
        height: 20px;
    }
    #numform {
        position: absolute;
        left: 757px;
        top: 156px;
        width: 157px;
        height: 23px;
    }
    #eventopublico {
        position: absolute;
        left: 30px;
        top: 297px;
        width: 100px;
        height: 20px;
    }
    #vistap {
        position: absolute;
        left: 271px;
        top: 297px;
        width: 130px;
        height: 20px;
    }
    #dire {
        position: absolute;
        left: 141px;
        top: 248px;
        width: 229px;
        height: 17px;
    }
    #direccion {
        position: absolute;
        left: 29px;
        top: 249px;
        width: 100px;
        height: 20px;
    }
    #telefono {
        position: absolute;
        left: 744px;
        top: 252px;
        width: 63px;
        height: 20px;
    }
    #telfijo {
        position: absolute;
        left: 816px;
        top: 249px;
        width: 136px;
        height: 18px;
    }
    #check1 {
        position: absolute;
        left: 138px;
        top: 296px;
        width: 37px;
        height: 15px;
        border-top-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }
    #check2 {
        position: absolute;
        left: 408px;
        top: 296px;
        width: 37px;
        height: 16px;
        border-top-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }
    #nucleo {
        position: absolute;
        left: 18px;
        top: 352px;
        width: 1025px;
        height: 158px;
    }
    #textafi {
        position: absolute;
        left: 31px;
        top: 332px;
        width: 48px;
        height: 17px;
        }
    #textname {
        position: absolute;
        left: 200px;
        top: 332px;
        width: 130px;
        height: 17px;
        }
    #textid {
        position: absolute;
        left: 450px;
        top: 332px;
        width: 117px;
        height: 17px;
        }
    #id {
        position: absolute;
        left: 640px;
        top: 332px;
        width: 104px;
        height: 17px;
        }
    #textedad {
        position: absolute;
        left: 810px;
        top: 332px;
        width: 38px;
        height: 17px;
        }
    #textetnia {
        position: absolute;
        left: 930px;
        top: 332px;
        width: 43px;
        height: 17px;
        }
    table {
        border-collapse: collapse;
    }

    #table td{
      text-align: center;
    }

    table, td, th {
        border-bottom: 1px solid black;
        height: 17px;
    }

    #divisor {
        position: absolute;
        left: 16px;
        top: 324px;
        width: 1018px;
        height: -2px;
        border-bottom: 2px solid black;
    }
    #preguntas {
        position: absolute;
        left: 17px;
        top: 523px;
        width: 1013px;
        height: 776px;
        z-index: 1;
    }
    #firmausu {
        position: absolute;
        left: 52px;
        top: 1291px;
        width: 218px;
        height: 18px;
        border-top-width: 1px;
        border-top-style: solid;
    }
    #firmadil {
        position: absolute;
        left: 718px;
        top: 1288px;
        width: 292px;
        height: 18px;
        border-top-width: 1px;
        border-top-style: solid;
    }
    #apDiv12 {
        position: absolute;
        left: 472px;
        top: 1216px;
        width: 97px;
        height: 80px;
        z-index: 2;
        border-top-width: 1px;
        border-right-width: 1px;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-style: solid;
        border-right-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
    }
    #apDiv13 {
        position: absolute;
        left: 470px;
        top: 1303px;
        width: 111px;
        height: 16px;
        z-index: 3;
    }
    #apDiv14 {
        position: absolute;
        left: 11px;
        top: 20px;
        width: 141px;
        height: 102px;
        z-index: 4;
        border-top-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
        border-left-width: 0px;
        border-bottom-style: solid;
    }
    #logo{
        width: 130px;
        padding-top: 30px;
    }
    #tblpreguntas td{
      text-align: center;
    }
</style>
</head>

<body ng-controller="declaracionController" id="test" ng-cloak>
<div id="apDiv1">
  <label for="departamento"></label>
</div>
<div id="apDiv3">
  <div id="apDiv5"><strong>PROCEDIMIENTO PARA EL ANALISIS SITUACION DE SALUD</strong></div>
</div>

<div id="apDiv6">
  <div id="apDiv8"><strong>Fecha</strong>: Agosto 2014</div>
    <div id="apDiv10">Aprobado por: Representante de Calidad</div>
</div>
<div id="version"><strong>Versión:</strong> 02</div>
<div id="apDiv7"><strong>Código:</strong> GPP-001-FR</div>
<div id="apDiv11">Nit 892.102.044-1</div>
<div id="departamento"><strong>DEPARTAMENTO:</strong></div>
<div id="direccion"><strong>DIRECCIÓN:</strong></div>
<div id="eventopublico">EVENTO PUBLICO</div>
<div id="municipio"><strong>MUNICIPIO:</strong></div>
<div id="barrio"><strong>BARRIO:</strong></div>
<div id="fechadiv"><strong>FECHA:</strong></div>
<div id="telefono"><strong>TELEFONO:</strong></div>
<div id="formnum">FORMULARIO DE AFILIACION Nº</div>

<div id="vistap">VISTA PERSONALIZADA</div>
<div id="depa">{{ departamento }}</div>
<div id="dire">{{ direccion }}</div>
<div id="muni">{{ municipio }}</div>
<div id="barr">{{ localidad }}</div>
<div id="fecha">{{ fecha_radicado }}</div>
<div id="telfijo">{{ tel_fijo + ' - ' + tel_celular}}</div>
<div id="check1"></div>
<div id="check2"></div>
<div id="nucleo">
<table id= "table" width="1015" height="133" border="1">
  <tr>
    <td width="65">C</td>
    <td width="322" id="c_name"></td>
    <td width="168" id="c_tipo_documento"></td>
    <td width="181" id="c_numero_documento"></td>
    <td width="97" id="c_edad"></td>
    <td width="142" id="c_etnia"></td>
  </tr>
  <tr>
    <td>B1</td>
    <td id="b1_name"></td>
    <td id="b1_tipo_documento"></td>
    <td id="b1_numero_documento"></td>
    <td id="b1_edad"></td>
    <td id="b1_etnia"></td>
  </tr>
  <tr>
    <td>B2</td>
    <td id="b2_name"></td>
    <td id="b2_tipo_documento"></td>
    <td id="b2_numero_documento"></td>
    <td id="b2_edad"></td>
    <td id="b2_etnia"></td>
  </tr>
  <tr>
    <td>B3</td>
    <td id="b3_name"></td>
    <td id="b3_tipo_documento"></td>
    <td id="b3_numero_documento"></td>
    <td id="b3_edad"></td>
    <td id="b3_etnia"></td>
  </tr>
  <tr>
    <td>B4</td>
    <td id="b4_name"></td>
    <td id="b4_tipo_documento"></td>
    <td id="b4_numero_documento"></td>
    <td id="b4_edad"></td>
    <td id="b4_etnia"></td>
  </tr>
  <tr>
    <td>B5</td>
    <td id="b5_name"></td>
    <td id="b5_tipo_documento"></td>
    <td id="b5_numero_documento"></td>
    <td id="b5_edad"></td>
    <td id="b5_etnia"></td>
  </tr>
  <tr>
    <td>B6</td>
    <td id="b6_name"></td>
    <td id="b6_tipo_documento"></td>
    <td id="b6_numero_documento"></td>
    <td id="b6_edad"></td>
    <td id="b6_etnia"></td>
  </tr>
  <tr>
    <td>B7</td>
    <td id="b7_name"></td>
    <td id="b7_tipo_documento"></td>
    <td id="b7_numero_documento"></td>
    <td id="b7_edad"></td>
    <td id="b7_etnia"></td>
  </tr>
</table>
</div>
<div id="textafi"><strong>AFILIADO</strong></div>
<div id="textname"><strong>NOMBRES Y APELLIDOS</strong></div>
<div id="textid"><strong>TIPO DE IDENTIFICACIÓN</strong></div>
<div id="id"><strong>IDENTIFICACIÓN</strong></div>
<div id="textedad"><strong>EDAD</strong></div>
<div id="textetnia"><strong>ETNIA</strong></div>
<div id="divisor">
</div>
<div id="preguntas">
<table width="1015" border="1" id="tblpreguntas">
  <tr>
    <th width="27" scope="col">ITEM</th>
    <th width="646" scope="col">PREGUNTA</th>
    <th width="33" scope="col">C</th>
    <th width="33" scope="col">B1</th>
    <th width="33" scope="col">B2</th>
    <th width="33" scope="col">B3</th>
    <th width="33" scope="col">B4</th>
    <th width="33" scope="col">B5</th>
    <th width="33" scope="col">B6</th>
    <th width="32" scope="col">B7</th>
  </tr>
  <tr>
    <td>1</td>
    <td style="text-align: left !important;">Algún familiar presenta o ha presentado Hipertensión, Diabetes, Infato o trombosis</td>
    <td id="resc1"></td>
    <td id="resb11"></td>
    <td id="resb21"></td>
    <td id="resb31"></td>
    <td id="resb41"></td>
    <td id="resb51"></td>
    <td id="resb61"></td>
    <td id="resb71"></td>
  </tr>
  <tr>
    <td>2</td>
    <td style="text-align: left !important;">Algún familiar presenta o ha presentado Cancer de seno, Cuello uterino, Cólon</td>
    <td id="resc2"></td>
    <td id="resb12"></td>
    <td id="resb22"></td>
    <td id="resb32"></td>
    <td id="resb42"></td>
    <td id="resb52"></td>
    <td id="resb62"></td>
    <td id="resb72"></td>
  </tr>
  <tr>
    <td>3</td>
    <td style="text-align: left !important;">Algún familiar presenta o ha presentado enfermedades mentales (depresión, ansiedad, esquizofrenia, etc)</td>
    <td id="resc3"></td>
    <td id="resb13"></td>
    <td id="resb23"></td>
    <td id="resb33"></td>
    <td id="resb43"></td>
    <td id="resb53"></td>
    <td id="resb63"></td>
    <td id="resb73"></td>
  </tr>
  <tr>
    <td>4</td>
    <td style="text-align: left !important;">Padece algún tipo de discapacidad  (física, mental, sordera, ceguera)</td>
    <td id="resc4"></td>
    <td id="resb14"></td>
    <td id="resb24"></td>
    <td id="resb34"></td>
    <td id="resb44"></td>
    <td id="resb54"></td>
    <td id="resb64"></td>
    <td id="resb74"></td>
  </tr>
  <tr>
    <td>5</td>
    <td style="text-align: left !important;">Ha sufrido de: Epilepsia, Perdida de conocimiento, Convulsiones</td>
    <td id="resc5"></td>
    <td id="resb15"></td>
    <td id="resb25"></td>
    <td id="resb35"></td>
    <td id="resb45"></td>
    <td id="resb55"></td>
    <td id="resb65"></td>
    <td id="resb75"></td>
  </tr>
  <tr>
    <td>6</td>
    <td style="text-align: left !important;">Presenta problemas visuales (Astigmatismo, Catarata, Hipermetropia, Miopìa, Presbicia o ha sido operado de los ojos)</td>
    <td id="resc6"></td>
    <td id="resb16"></td>
    <td id="resb26"></td>
    <td id="resb36"></td>
    <td id="resb46"></td>
    <td id="resb56"></td>
    <td id="resb66"></td>
    <td id="resb76"></td>
  </tr>
  <tr>
    <td>7</td>
    <td style="text-align: left !important;">Sufre de Hipertesión, diabetes, Infarto o Trombosis</td>
    <td id="resc7"></td>
    <td id="resb17"></td>
    <td id="resb27"></td>
    <td id="resb37"></td>
    <td id="resb47"></td>
    <td id="resb57"></td>
    <td id="resb67"></td>
    <td id="resb77"></td>
  </tr>
  <tr>
    <td>8</td>
    <td style="text-align: left !important;">Sufre de enfermedades mentales (depresión, ansiedad, esquizofrenia, etc)</td>
    <td id="resc8"></td>
    <td id="resb18"></td>
    <td id="resb28"></td>
    <td id="resb38"></td>
    <td id="resb48"></td>
    <td id="resb58"></td>
    <td id="resb68"></td>
    <td id="resb78"></td>
  </tr>
  <tr>
    <td>9</td>
    <td style="text-align: left !important;">Ha tenido o tiene cáncer  (seno, matriz, prostata, gastrico, leucemias, otros)</td>
    <td id="resc9"></td>
    <td id="resb19"></td>
    <td id="resb29"></td>
    <td id="resb39"></td>
    <td id="resb49"></td>
    <td id="resb59"></td>
    <td id="resb69"></td>
    <td id="resb79"></td>
  </tr>
  <tr>
    <td>10</td>
    <td style="text-align: left !important;">Sabe si tiene alguna infección de transmisión sexual  (sifilis, gonorrea, chancro, condilomas, verrugas genitales)</td>
    <td id="resc10"></td>
    <td id="resb110"></td>
    <td id="resb210"></td>
    <td id="resb310"></td>
    <td id="resb410"></td>
    <td id="resb510"></td>
    <td id="resb610"></td>
    <td id="resb710"></td>
  </tr>
  <tr>
    <td>11</td>
    <td style="text-align: left !important;">Sufre de problemas cardíacos: Angina, Arritmia, Infarto, Soplo, Trombosis</td>
    <td id="resc11"></td>
    <td id="resb111"></td>
    <td id="resb211"></td>
    <td id="resb311"></td>
    <td id="resb411"></td>
    <td id="resb511"></td>
    <td id="resb611"></td>
    <td id="resb711"></td>
  </tr>
  <tr>
    <td>12</td>
    <td style="text-align: left !important;">Presenta o ha presentado enfermedades respiratorias: Asma, Bronquitis, Enfisema, EPOC, Neumonia, uso de inhaladores</td>
    <td id="resc12"></td>
    <td id="resb112"></td>
    <td id="resb212"></td>
    <td id="resb312"></td>
    <td id="resb412"></td>
    <td id="resb512"></td>
    <td id="resb612"></td>
    <td id="resb712"></td>
  </tr>
  <tr>
    <td>13</td>
    <td style="text-align: left !important;">Presenta o ha presentado Insuficiencia renal, Infección Urinaria frecuente, Cálculos renales, Diálisis</td>
    <td id="resc13"></td>
    <td id="resb113"></td>
    <td id="resb213"></td>
    <td id="resb313"></td>
    <td id="resb413"></td>
    <td id="resb513"></td>
    <td id="resb613"></td>
    <td id="resb713"></td>
  </tr>
  <tr>
    <td>14</td>
    <td style="text-align: left !important;">Presenta delgadez, sobrepeso u obesidad</td>
    <td id="resc14"></td>
    <td id="resb114"></td>
    <td id="resb214"></td>
    <td id="resb314"></td>
    <td id="resb414"></td>
    <td id="resb514"></td>
    <td id="resb614"></td>
    <td id="resb714"></td>
  </tr>
  <tr>
    <td>15</td>
    <td style="text-align: left !important;">Ha sufrido de Hepatitis (A, B, O C)</td>
    <td id="resc15"></td>
    <td id="resb115"></td>
    <td id="resb215"></td>
    <td id="resb315"></td>
    <td id="resb415"></td>
    <td id="resb515"></td>
    <td id="resb615"></td>
    <td id="resb715"></td>
  </tr>
  <tr>
    <td>16</td>
    <td style="text-align: left !important;">Sufre o ha sufrido de Artristis, Gota o Fiebre Reumatoidea</td>
    <td id="resc16"></td>
    <td id="resb116"></td>
    <td id="resb216"></td>
    <td id="resb316"></td>
    <td id="resb416"></td>
    <td id="resb516"></td>
    <td id="resb616"></td>
    <td id="resb716"></td>
  </tr>
  <tr>
    <td>17</td>
    <td style="text-align: left !important;">Ha recibido o sabe si requiere reemplazo articular de cadera, rodilla u otro</td>
    <td id="resc17"></td>
    <td id="resb117"></td>
    <td id="resb217"></td>
    <td id="resb317"></td>
    <td id="resb417"></td>
    <td id="resb517"></td>
    <td id="resb617"></td>
    <td id="resb717"></td>
  </tr>
  <tr>
    <td>18</td>
    <td style="text-align: left !important;">Ha recibido o sabe si requiere transplante de organos (córmea, corazón, hígado, rinón, médula)</td>
    <td id="resc18"></td>
    <td id="resb118"></td>
    <td id="resb218"></td>
    <td id="resb318"></td>
    <td id="resb418"></td>
    <td id="resb518"></td>
    <td id="resb618"></td>
    <td id="resb718"></td>
  </tr>
  <tr>
    <td>19</td>
    <td style="text-align: left !important;">Actualmente utiliza algún método de planificación familiar (pastillas, ampolla, condon, dispositivo intrauterino, ligadura de trompas o vasectomia))</td>
    <td id="resc19"></td>
    <td id="resb119"></td>
    <td id="resb219"></td>
    <td id="resb319"></td>
    <td id="resb419"></td>
    <td id="resb519"></td>
    <td id="resb619"></td>
    <td id="resb719"></td>
  </tr>
  <tr>
    <td>20</td>
    <td style="text-align: left !important;">Si está embarazada asiste a control de embarazo</td>
    <td id="resc20"></td>
    <td id="resb120"></td>
    <td id="resb220"></td>
    <td id="resb320"></td>
    <td id="resb420"></td>
    <td id="resb520"></td>
    <td id="resb620"></td>
    <td id="resb720"></td>
  </tr>
  <tr>
    <td>21</td>
    <td style="text-align: left !important;">Dio lactancia materna exclusiva durante los primeros 6 meses de edad de su bebe</td>
    <td id="resc21"></td>
    <td id="resb121"></td>
    <td id="resb221"></td>
    <td id="resb321"></td>
    <td id="resb421"></td>
    <td id="resb521"></td>
    <td id="resb621"></td>
    <td id="resb721"></td>
  </tr>
  <tr>
    <td>22</td>
    <td style="text-align: left !important;">Se practicó la citología vaginal durante el último año</td>
    <td id="resc22"></td>
    <td id="resb122"></td>
    <td id="resb222"></td>
    <td id="resb322"></td>
    <td id="resb422"></td>
    <td id="resb522"></td>
    <td id="resb622"></td>
    <td id="resb722"></td>
  </tr>
  <tr>
    <td>23</td>
    <td style="text-align: left !important;">Se realiza mensualmente el autoexamen de seno</td>
    <td id="resc23"></td>
    <td id="resb123"></td>
    <td id="resb223"></td>
    <td id="resb323"></td>
    <td id="resb423"></td>
    <td id="resb523"></td>
    <td id="resb623"></td>
    <td id="resb723"></td>
  </tr>
  <tr>
    <td>24</td>
    <td style="text-align: left !important;">Presenta o ha presentado Tuberculosis, Lepra, Malaria, Leishmaniasis</td>
    <td id="resc24"></td>
    <td id="resb124"></td>
    <td id="resb224"></td>
    <td id="resb324"></td>
    <td id="resb424"></td>
    <td id="resb524"></td>
    <td id="resb624"></td>
    <td id="resb724"></td>
  </tr>
  <tr>
    <td>25</td>
    <td style="text-align: left !important;">Presenta o ha presentado Cólera, Dengue</td>
    <td id="resc25"></td>
    <td id="resb125"></td>
    <td id="resb225"></td>
    <td id="resb325"></td>
    <td id="resb425"></td>
    <td id="resb525"></td>
    <td id="resb625"></td>
    <td id="resb725"></td>
  </tr>
  <tr>
    <td>26</td>
    <td style="text-align: left !important;">Presenta o ha presentado Tétanos, Rubéola, Sarampión, Meningitis, Poliomielitis</td>
    <td id="resc26"></td>
    <td id="resb126"></td>
    <td id="resb226"></td>
    <td id="resb326"></td>
    <td id="resb426"></td>
    <td id="resb526"></td>
    <td id="resb626"></td>
    <td id="resb726"></td>
  </tr>
  <tr>
    <td>27</td>
    <td style="text-align: left !important;">Ha sido victima de violencia fisica, psicologica, sexual o durante el embarazo</td>
    <td id="resc27"></td>
    <td id="resb127"></td>
    <td id="resb227"></td>
    <td id="resb327"></td>
    <td id="resb427"></td>
    <td id="resb527"></td>
    <td id="resb627"></td>
    <td id="resb727"></td>
  </tr>
  <tr>
    <td>28</td>
    <td style="text-align: left !important;">Practica el cepillado dental al menos 3 veces al día</td>
    <td id="resc28"></td>
    <td id="resb128"></td>
    <td id="resb228"></td>
    <td id="resb328"></td>
    <td id="resb428"></td>
    <td id="resb528"></td>
    <td id="resb628"></td>
    <td id="resb728"></td>
  </tr>
  <tr>
    <td>29</td>
    <td style="text-align: left !important;">Realiza ejercicios 3 o mas veces por semana</td>
    <td id="resc29"></td>
    <td id="resb129"></td>
    <td id="resb229"></td>
    <td id="resb329"></td>
    <td id="resb429"></td>
    <td id="resb529"></td>
    <td id="resb629"></td>
    <td id="resb729"></td>
  </tr>
  <tr>
    <td>30</td>
    <td style="text-align: left !important;">Fuma o ha fumado durante los últimos 12 meses</td>
    <td id="resc30"></td>
    <td id="resb130"></td>
    <td id="resb230"></td>
    <td id="resb330"></td>
    <td id="resb430"></td>
    <td id="resb530"></td>
    <td id="resb630"></td>
    <td id="resb730"></td>
  </tr>
  <tr>
    <td>31</td>
    <td style="text-align: left !important;">Consume bebidas alcoholicas regularmente</td>
    <td id="resc31"></td>
    <td id="resb131"></td>
    <td id="resb231"></td>
    <td id="resb331"></td>
    <td id="resb431"></td>
    <td id="resb531"></td>
    <td id="resb631"></td>
    <td id="resb731"></td>
  </tr>
  <tr>
    <td>32</td>
    <td style="text-align: left !important;">Consume o ha consumido sustancias psicoactivas  (marihuana, cocaina, perico, extasis, anfetaminas, otras)</td>
    <td id="resc32"></td>
    <td id="resb132"></td>
    <td id="resb232"></td>
    <td id="resb332"></td>
    <td id="resb432"></td>
    <td id="resb532"></td>
    <td id="resb632"></td>
    <td id="resb732"></td>
  </tr>
  <tr>
    <td>33</td>
    <td style="text-align: left !important;">Dentro de su alimentacion diaria incorpora verduras, frutas, carbohidratos, proteinas</td>
    <td id="resc33"></td>
    <td id="resb133"></td>
    <td id="resb233"></td>
    <td id="resb333"></td>
    <td id="resb433"></td>
    <td id="resb533"></td>
    <td id="resb633"></td>
    <td id="resb733"></td>
  </tr>
</table>
</div>
<div id="firmausu"><strong>Firma y número de identificación del usuario</strong></div>
<div id="firmadil"><strong>Nombre y cargo de la persona que diligencia el cuestionario</strong></div>
<div id="apDiv12"></div>
<div id="apDiv13">huella indice derecho</div>
<div id="apDiv14"><img src="Logo-Cajacopi-OK.png" name="logo" id="logo" /></div>
<div id="numform">{{ radicado }}</div>
<div id="apDiv15"><div id="apDiv5"><strong>FORMATO DECLARACION DE SALUD PARA AFILIADOS</strong></div></div>
<h1>&nbsp;</h1>
</body>
</html>
