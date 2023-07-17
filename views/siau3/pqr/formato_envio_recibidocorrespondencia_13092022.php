<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html lang="en" ng-app="GenesisApp">

<head>

   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Genesis</title>
   <link rel="icon" href="../../../assets/images/icon.ico" />
   <link rel="stylesheet" href="../../../bower_components/materialize/bin/materializeformat.css" />
   <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
   <script src="../../../bower_components/angular/angular.js"></script>
   <script src="../../../bower_components/jquery/dist/jquery.js"></script>
   <script src="../../../scripts/controllers/siau/pqr/formatoCorrespondenciaRecibidaController.js"></script>
   <script src="../../../scripts/services/http/siau/pqrHttp.js"></script>
   <script src="../../../js/jQuery.print.min.js"></script>
   <script src="../../../bower_components/materialize/bin/materialize.js"></script>
   <script src="../../../bower_components/materialize/bin/materialize.js"></script>
   <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
   <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">

   
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
         font-size: x-small
      }

      a.comment-indicator:hover+comment {
         background: #ffd;
         position: absolute;
         display: block;
         border: 1px solid black;
         padding: 0.5em;
      }

      a.comment-indicator {
         background: red;
         display: inline-block;
         border: 1px solid black;
         width: 0.5em;
         height: 0.5em;
      }

      comment {
         display: none;
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

       table { page-break-inside:auto }
    tr    { page-break-inside:avoid; page-break-after:auto }
    thead { display:table-header-group }
    tfoot { display:table-footer-group }
      }
   </style>

</head>

<body ng-controller="formatoCorrespondenciaRecibidaController">
   <table cellspacing="0" border="0">
   <colgroup width="66"></colgroup>
   <colgroup width="89"></colgroup>
   <colgroup width="164"></colgroup>
   <colgroup width="116"></colgroup>
   <colgroup width="150"></colgroup>
   <colgroup span="2" width="116"></colgroup>
   <colgroup width="234"></colgroup>
   <colgroup span="2" width="152"></colgroup>
   <colgroup width="71"></colgroup>
      <tr>
         <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000"
            colspan=4 rowspan=3 height="80" align="center" valign=middle>
            <font face="Arial" color="#000000"><br>
               <img src="../../../assets/images/cajacopi.png" width=92 height=68 hspace=107 vspace=7
                  alt="Logo CajacopiEPS" />
            </font>

         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;text-align:center" colspan=8 align="center"
            valign=middle><b>
               <font face="Arial" size=3 color="#000000">FORMATO DE RECIBO Y ENV&Iacute;O DE CORRESPONDENCIA</font>
            </b></td>
         <td style="border-top: 1px solid #000000;border-bottom: 1px solid #000000;  border-left: 1px solid #000000; border-right: 1px solid #000000;text-align: center;"
            colspan=2 align="left" valign=middle><b>
               <font face="Arial" size=3 color="#000000">C&oacute;digo: GD-FR-01</font>
            </b></td>
      </tr>
      <tr>
         <td colspan=8 rowspan=2  valign=middle style="text-align:center"><b>
               <font face="Arial" size=3 color="#000000">PROCEDIMIENTO DE RECIBO Y ENV&Iacute;O DE CORRESPONDENCIA
               </font>
            </b></td>
         <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;text-align: center;"
            colspan=2 align="left" valign=middle><b>
               <font face="Arial" size=3 color="#000000">Versi&oacute;n: 02</font>
            </b></td>
      </tr>
      <tr>
         <td style=" border-left: 1px solid #000000; border-right: 1px solid #000000;text-align: center;" colspan=2
            align="left" valign=middle><b>
               <font face="Arial" size=3 color="#000000">Fecha: julio 2019</font>
            </b></td>
      </tr>


   <!-- </table>
   <table cellspacing="0" border="0">
      <colgroup width="34"></colgroup>
      <colgroup width="25"></colgroup>
      <colgroup width="58"></colgroup>
      <colgroup span="3" width="186"></colgroup>
      <colgroup width="241"></colgroup>
      <colgroup width="132"></colgroup>
      <colgroup width="182"></colgroup>
      <colgroup width="80"></colgroup>
      <colgroup width="107"></colgroup>
      <colgroup width="109"></colgroup>
      <colgroup width="165"></colgroup>
      <colgroup width="129"></colgroup> -->
      <tr>
         <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;text-align:center"
            colspan=4 rowspan=2 height="67" align="center" valign=middle ><b>
               <font face="Arial">TIPO DE CORRESPONDENCIA <br>(marque con una X)</font>
            </b></td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;text-align:center" valign=middle colspan="4"><b>
               <font face="Arial">RECIBIDA</font>
            </b></td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;text-align:center" valign=middle  colspan="2"><b>
               <font face="Arial">X</font>
            </b></td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000"
            colspan=8 align="center" valign=middle><b>
               <font face="Arial"><br></font>
            </b></td>
      </tr>
      <tr>
     <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;text-align:center" valign=middle colspan="4"><b>
               <font face="Arial">ENVIADA</font>
            </b></td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;text-align:center" valign=middle  colspan="2"><b>
               <font face="Arial" style="color:transparent">X</font>
            </b></td>
         <td style="    border-left: 1px solid #000000;border-right: 1px solid #000000" colspan=8 align="center"
            valign=middle><b>
               <font face="Arial"><br></font>
            </b></td>
      </tr>
   <!-- </table>
   <table cellspacing="0" cellpadding="0" border="0">

      <colgroup width="34"></colgroup>
      <colgroup width="25"></colgroup>
      <colgroup width="58"></colgroup>
      <colgroup span="3" width="186"></colgroup>
      <colgroup width="241"></colgroup>
      <colgroup width="132"></colgroup>
      <colgroup width="182"></colgroup>
      <colgroup width="80"></colgroup>
      <colgroup width="107"></colgroup>
      <colgroup width="109"></colgroup>
      <colgroup width="165"></colgroup>
      <colgroup width="129"></colgroup> -->
      <tr>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;text-align:center" colspan=3
            height="52" align="center" valign=middle>
            <b style="color: #fff">FECHA DE RECIBIDO</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;" colspan=4
            align="center" valign=middle>
            <b style="color: #fff">DESCRIPCI&Oacute;N</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;text-align:center" align="center"
            valign=middle>
            <b style="color: #fff">DESTINATARIO</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;" align="center"
            valign=middle>
            <b style="color: #fff">FIRMA Y FECHA DE ENTREGA</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;" colspan=2
            align="center" valign=middle>
            <b style="color: #fff">OBSERVACIONES / #RADICADO</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;" align="center"
            valign=middle>
            <b style="color: #fff">FECHA DEVOLUCI&Oacute;N</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000;background: #002060;" align="center"
            valign=middle>
            <b style="color: #fff">MOTIVO DEVOLUCI&Oacute;N</b>
         </td>
         <td class="background_enc"
            style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000;background: #002060;"
            align="center" valign=middle>
            <b style="color: #fff">FIRMA Y FECHA DE RECIBIDO DE DEVOLUCI&Oacute;N</b>
         </td>
      </tr>
      <tr ng-repeat="item in recibidas.Items">
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;text-align:center"
            colspan=3 height="225" align="center" valign=middle><b>
               <font face="Arial" size=3 color="#A6A6A6">{{item.fecha_recibido}}<br></font>
            </b></td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;"
            colspan=4 align="center" valign=middle>
            <font face="Arial">{{item.observaciones}}<br></font>
         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;"
            align="left" valign=middle>
            <font face="Arial" inner="{{item.responsables}}"><br></font>
         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;"
            align="left" valign=middle>
            <font face="Arial"><br></font>
         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;"
            colspan=2 align="center" valign=middle>
            <font face="Arial">{{item.consecutivo_correspondencia}} / {{item.remitente}}<br></font>
         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;"
            align="left" valign=middle>
            <font color="#000000"><br></font>
         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;"
            align="left" valign=bottom>
            <font color="#000000"><br></font>
         </td>
         <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000"
            align="left" valign=bottom>
            <font color="#000000"><br></font>
         </td>
      </tr>
   </table>
</body>

</html>