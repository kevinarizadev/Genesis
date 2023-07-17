'use strict';
angular.module('GenesisApp')
.controller('periodorenalController', ['$scope', '$http', 'altocostoHttp','ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller','$rootScope','$window',
function ($scope, $http, altocostoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
  $scope.resolucion = "0";
  $scope.inactive1 = true;
  $scope.inactive2 = true;
  $scope.inactive3 = true;
    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input ){
      var label	 = input.nextElementSibling,
        labelVal = label.innerHTML;

      input.addEventListener( 'change', function( e ){
        var fileName = '';
        if( this.files && this.files.length > 1 )
          fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else
          fileName = e.target.value.split( '\\' ).pop();

        if( fileName )
          label.querySelector( 'span' ).innerHTML = fileName;
        else
          label.innerHTML = labelVal;
      });

      // Firefox bug fix
      input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
      input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
    });
  // FUNCION PARA CARGAR EL EXCEL Y CREAR EL JSON
    var oFileIn;
    $(function() {
        oFileIn = document.getElementById('file-6');
        if(oFileIn.addEventListener) {
            oFileIn.addEventListener('change', filePicked, false);
        }
    });
    function filePicked(oEvent) {
        $scope.optioninputfile = false;
        // Get The File From The Input
        var oFile = oEvent.target.files[0];
        if(oFile != undefined){
          var sFilename = oFile.name;
          var res = sFilename.split('.').pop();
          if(res.toUpperCase() == 'XLS'){$scope.optioninputfile = true;}
          else{notification.getNotification('warning', 'El archivo excel debe tener extencion .xls!', 'Notificacion'); $scope.jsoncac = undefined; $scope.optioninputfile = false;}
        }else{$scope.jsoncac = undefined; $scope.optioninputfile = false;}
        if($scope.optioninputfile == true){
          // Create A File Reader HTML5
          var reader = new FileReader();

          // Ready The Event For When A File Gets Selected
          reader.onload = function(e) {
              var data = e.target.result;
              var cfb = XLS.CFB.read(data, {type: 'binary'});
              var wb = XLS.parse_xlscfb(cfb);
              // Loop Over Each Sheet
              wb.SheetNames.forEach(function(sheetName) {
                  var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                  $scope.jsoncac = undefined;
                  $scope.jsoncac = JSON.stringify(oJS);
                  console.log($scope.jsoncac);
              });
          };

          // Tell JS To Start Reading The File.. You could delay this if desired
          reader.readAsBinaryString(oFile);
        }
    }
  // FUNCION QUE CONVIERTE JSON TO CSV
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "Reporte";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g,"_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  // FUNCION PARA CARGAR EL SELECT CON LAS CUENTAS DE ALTO COSTO
    altocostoHttp.cargarcuentas().then(function (response) {
      $scope.resoluciones = response.data;
    })
  // FUNCION CARGA EL ULTIMO PERIODO VIGENTE PARA ESA RESOLUCION ESCOGIDA
    $scope.cargarperiodo = function () {
      if($scope.resolucion == "0"){
        notification.getNotification('warning', 'Debe elegir una resolucion!', 'Notificacion')
        $scope.inactive3 = true;
        $scope.inactive1 = true;
        $scope.inactive2 = true;
      }else{
        $scope.inactive3 = false;
        altocostoHttp.cargarperiodo(Number($scope.resolucion)).then(function (response) {
          if(response.data == "0"){
            $scope.NombreCAC = $("#resolucion_cac option:selected").text();
            $scope.inactive1 = true;
            $scope.inactive2 = false;
          }else{
            $scope.periodo = response.data;

            $scope.CodigoCAC  = $scope.periodo["0"].Codigo;
            $scope.NombreCAC = $scope.periodo["0"].Nombre;

            var finicial = $scope.periodo["0"].FechaInicial.split('/');
            $scope.fechainicial = new Date(finicial[2],finicial[1]-1,finicial[0]); //$scope.periodo["0"].FechaInicial;

            var ffinal = $scope.periodo["0"].FechaFinal.split('/');
            $scope.fechafinal = new Date(ffinal[2],ffinal[1]-1,ffinal[0]);

            var flimite = $scope.periodo["0"].FechaLimite.split('/');
            $scope.fechalimite = new Date(flimite[2],flimite[1]-1,flimite[0]);

            $scope.inactive1 = false;
            $scope.inactive2 = true;

          }
         })
      }
     }
  // FUNCION ENVIAR EL EXCEL A COMPARAR A BASE DE DATOS
    $scope.compararexcel = function(){
     if($scope.jsoncac != undefined && $scope.resolucion != "0"){
         altocostoHttp.compararexcel($scope.resolucion,$scope.jsoncac).then(function (response) {
           if(response.data == "0"){
              notification.getNotification('success', 'No hay novedades!', 'Notificacion')
           }else{
             notification.getNotification('info', 'Hay novedades favor revisar el excel para validar con el area TIC!', 'Notificacion')
             $scope.excelrespuestas = response.data;
             //JSONToCSVConvertor(JSON.stringify($scope.excelrespuestas), "", true);
             downloadCSV({ filename: "ReporteCAC_"+$scope.resolucion+".csv" });
           }
         })
     }else{
       notification.getNotification('warning', 'Debe Cargar un archivo.xls y escoger una resolucion', 'Notificacion')
     }
    }

    function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV(param) {
    var data, filename, link;

    var csv = convertArrayOfObjectsToCSV({
        data: $scope.excelrespuestas
    });
    if (csv == null) return;

    filename = param.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}
  // FUNCION QUE ACTUALIZA E INSERTA UN PERIODO SEGUN SU VIGENCIA SE MUESTRA LA OPCION DEL CRUD
    $scope.CrudPeriodo = function(type){
      $scope.validarfechas();
      if($scope.optioninputdate == true){
        if(type=='U'){
          altocostoHttp.CrudPeriodo($scope.resolucion,$scope.CodigoCAC,$scope.fechainicial.toLocaleDateString(),$scope.fechafinal.toLocaleDateString(),$scope.fechalimite.toLocaleDateString(),type).then(function (response) {
             if(response.data == '1'){
               notification.getNotification('success', 'Actualización Exitosa', 'Notificacion')
             }else{
               notification.getNotification('error', 'Actualización Fallo', 'Notificacion')
             }
          })
        }
        else{
          altocostoHttp.CrudPeriodo($scope.resolucion,1,$scope.fechainicial.toLocaleDateString(),$scope.fechafinal.toLocaleDateString(),$scope.fechalimite.toLocaleDateString(),type).then(function (response) {
            if(response.data == '1'){
              notification.getNotification('success', 'Periodo abierto!', 'Notificacion')
            }else{
              notification.getNotification('error', 'No se pudo abrir el periodo!', 'Notificacion')
            }
          })
        }
      }
      else{
        notification.getNotification('warning', 'Fecha de periodo incorrectas', 'Notificacion')
      }
    }
  // FUNCION QUE VALIDA LAS FECHAS PARA LA FUNCION CRUD PERIODO
    $scope.validarfechas = function(){
    if($scope.fechainicial != undefined && $scope.fechafinal != undefined && $scope.fechalimite != undefined){
      $scope.optioninputdate = true;
      var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
      if ((RegExPattern.test($scope.fechainicial.toLocaleDateString())) && (RegExPattern.test($scope.fechafinal.toLocaleDateString())) && (RegExPattern.test($scope.fechalimite.toLocaleDateString()))){
           //alert("entro en pater etsan ");
           $scope.optioninputdate = true;
      }
      if(($scope.fechafinal >= $scope.fechainicial) && (($scope.fechalimite >= $scope.fechainicial) && ($scope.fechalimite <= $scope.fechafinal))){}
      else{
          $scope.optioninputdate = false;
      }
    }
    else{
      $scope.optioninputdate = false;
    }
  }
}])
