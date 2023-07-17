<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html lang="en" ng-app="GenesisApp">

<head>

<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Genesis</title>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <!--<link rel="stylesheet" href="../../../bower_components/materialize/bin/materializeformat.css" />-->
    <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
    <script src="../../../bower_components/angular/angular.js"></script>
    <script src="../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../scripts/controllers/siau/pqr/formatoStickersController.js"></script>
    <script src="../../../scripts/services/http/siau/pqrHttp.js"></script>
    <script src="../../../js/jQuery.print.min.js"></script>
    <script src="../../../js/JsBarcode.all.min.js"></script>
    <!--<script src="../../../bower_components/materialize/bin/materialize.js"></script>-->
    <script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
    <style type="text/css">

        body{
            font-family: Arial, Helvetica, sans-serif;
        }

        .row{
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
        }
        .row .col.s12 {
            width: 100%;
            margin-left: auto;
            left: auto;
            right: auto;
        }
        .row .col.s6 {
            width: 50%;
            margin-left: auto;
            left: auto;
            right: auto;
        }

        .row .col {
            float: left;
            box-sizing: border-box;
            padding: 0 0.75rem;
            min-height: 1px;
        }
 @media screen, print {
    h6 {  font-size: 10pt  }
 }
 @page {
  size: 75mm  35mm;
  margin: 0;
  padding: 0;

}
    </style>

</head>

<body ng-controller="formatoStickersController">
    
    <div class="row" style="margin-bottom:0">        
        <div class="col s12">
            <p  style="text-align:center;margin:0;"><b>CAJACOPI EPS - Rad # <span style="color:red">{{sticker.consecutivo}}</span></b></p>
        </div>
    </div>
    <div class="row" style="margin-bottom:0">
        <div class="col s12" style="display: flex;justify-content: center;align-items: center;">            
         <svg class="barcode"
            jsbarcode-format="upc"      
            jsbarcode-value="0"       
            jsbarcode-textmargin="0"
            jsbarcode-fontoptions="bold">
            </svg>                                 
        </div>
    </div>
    <div class="row" style="margin-bottom:0">
        <div class="col s6">
        <span> <b>Fecha:</b> {{sticker.fecha_radicacion}} </span> 
        </div>
        <div class="col s6">
        <span> <b> Hora:</b> {{sticker.hora_radicacion}}</span>
        </div>
    </div>
    <div class="row" style="margin-bottom:0" ng-if="sticker.tipo_correspondencia=='E'">
        <div class="col s12">
        <span>  <b>Destinatario:</b>  {{sticker.nom_destinatario}}</span>
        </div>
    </div>
    <div class="row" style="margin-bottom:0" ng-if="sticker.tipo_correspondencia=='E'">
        <div class="col s12">
        <span>  <b>Señor(a):</b>  {{sticker.senor}}</span>
        </div>
    </div>
    <div class="row" style="margin-bottom:0" ng-if="sticker.tipo_correspondencia=='E'">
        <div class="col s12">
        <span>  <b>Dir:</b>  {{sticker.dir_destinatario}}</span>
        </div>
    </div>        
    <div class="row" style="margin-bottom:0" ng-if="sticker.tipo_correspondencia=='R'">
        <div class="col s12">
        <span>  <b>Remitente:</b>  {{sticker.nom_remitente}}</span>
        </div>
    </div>
    <div class="row" style="margin-bottom:0" ng-if="sticker.tipo_correspondencia=='R'">
        <div class="col s12">
        <span> <b>Asunto:</b> {{sticker.observaciones}}</span>
        </div>        
    </div>	
 
    <div class="row" style="margin-bottom:0" ng-if="sticker.tipo_correspondencia=='E'">
        <div class="col s6">
        <span>  <b>Ciudad:</b>  {{sticker.mun_destinatario}}</span>
        </div>
        <div class="col s6">
        <span>  <b>Tel:</b>  {{sticker.tel_destinatario}}</span>
        </div>               
    </div>
       <div class="row"  style="margin:0">
    <div class="col s6" ng-if="sticker.tipo_correspondencia=='R'">
        <i><span>Para estudio no implica aceptación</span></i>
    </div>
      <div class="col s6" style="float: right;">
        <i> <b>User:</b> {{sticker.users}}</i>
        </div>
    </div>
   
  
</body>

</html>