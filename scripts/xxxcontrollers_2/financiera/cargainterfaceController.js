'use strict';

// const { CONSOLE_APPENDER } = require("karma/lib/constants");

angular.module('GenesisApp')
  .controller('cargainterfaceController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter',
    function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {

      $(document).ready(function () {
        $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({ "border-style": "none", "border-bottom-style": "dotted" });
      })

      $("form").on("change", ".file-upload-field", function () {
        $scope.json_csv2 =[];
        var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
        var nombre = archivo[0];
        var ext = archivo[1];
        if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
          if ($(this)["0"].files["0"].size <= 3000000) { // se valida el tamaño del archivo
            if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
              $scope.validarEstructura($(this)["0"].files["0"], 5, $(this), nombre);
            } else {
              swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning')
              $(this).val("");
              $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
              if ($(this)["0"].id == 'CT') {
                $scope.switcharchivos = true;
                $scope.ctlleno = false;
              }

            }
          } else {
            swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 3 megabytes', 'error')
            $(this).val().replace(/.*(\/|\\)/, '');
            if ($(this)["0"].id == 'CT') {
              $scope.switcharchivos = true;
              $scope.ctlleno = false;
            }

          }
        } else {
          $(this).val("");
          $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
          if ($(this)["0"].id == 'CT') {
            $scope.switcharchivos = true;
            $scope.ctlleno = false;
          }

        }
        $scope.$apply();;
      });

      $scope.validarEstructura = function (progressEvent, tamaño, thisfile, nombre) {
        $scope.thisfile = thisfile;
        var file = progressEvent;
        var reader = new FileReader();
        reader.onload = function (progressEvent) {
          $scope.estado = false;
          var lines = this.result.split('\n');
          var array = [];
          var sigla;
          var datos;
          for (var line = 0; line < lines.length; line++) {
            datos = lines[line].split('|');
            if (datos != '' && datos != undefined && datos != null) {
              if (datos.length == tamaño) {
                $scope.estado = true;
              } else {
                $scope.estado = false;
                break;
              }
            }
          }
          if ($scope.estado == true) {
            thisfile.parent(".file-upload-wrapper").attr("data-text", nombre + '.txt');
             $scope.convierte(thisfile["0"].files,);
          } else {
            swal('IMPORTANTE', 'el archivo ' + nombre + ' presenta error de estructura tiene diferente columnas de las ' + tamaño + ' esperadas.', 'info')
            thisfile.val("");
            thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
          }
        };
        reader.readAsText(file);
      }

      $(function () {
        $scope.reversar = false;
        $scope.btncarga = false;
        $scope.btnreload = true;
        $scope.var = 0;
        //datos de sesion como cedula y ubicacion
        var dat = { prov: 'navb' }
        $.getJSON("php/obtenersession.php", dat)
          .done(function (respuesta) {
            $scope.cedula = $scope.sesdata.cedula;
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("navbar error obteniendo variables");
          });
        //Fin datos de sesion como cedula y ubicacion

        $http({
          method: 'POST',
          url: "php/financiera/carga_interface.php",
          data: { function: 'obtenerconcepto' }
        }).then(function (response) {
          $scope.conceptos = response.data;
        })

        $(".datepicker").kendoDatePicker({
          animation: {
            close: {
              effects: "fadeOut zoom:out",
              duration: 300
            },
            open: {
              effects: "fadeIn zoom:in",
              duration: 300
            }
          }
        });
        $("#fecha").kendoDatePicker({
          format: "dd/MM/yyyy",
          culture: "es-MX",
          disableDates: ["su", "sa"]
        });

      });

      $scope.valida = function () {
        if ($scope.concepto == '' || $scope.concepto == undefined) {
          swal('IMPORTANTE', 'Concepto no diligenciado', 'info')
          $scope.var = $scope.var + 1;
        }
        if ($scope.fecha == undefined) {
          swal('IMPORTANTE', 'Fecha no diligenciada', 'info')
          $scope.var = $scope.var + 1;
        }
        if ($scope.observacion == undefined) {
          swal('IMPORTANTE', 'Observacion no diligenciada', 'info')
          $scope.var = $scope.var + 1;
        }
        if ($scope.json_csv2.length == 0) {
          swal('IMPORTANTE', 'Archivo No Se Encuentra Adjunto', 'info')
          $scope.var = $scope.var + 1;
        }
      }

      $scope.Operacion_Kmov = function () {

        $scope.valida();
        if ($scope.var == 0) {
          swal({
            title: 'Cargando información...'
        });
        swal.showLoading();
          $scope.btncarga = true;
          $scope.btnreload = false;
          var x=[]
          for (let index = 0; index < $scope.json_csv2.length; index++) {
            x.push({
              "RENGLON":parseInt($scope.json_csv2[index].RENGLON.toString().trim()),
              "CUENTA":parseInt($scope.json_csv2[index].CUENTA.toString().trim()),
              "NATURALEZA":$scope.json_csv2[index].NATURALEZA.toString().trim().charAt(0),
              "VALOR":parseFloat($scope.json_csv2[index].VALOR.toString().trim()),
              "NIT":parseInt($scope.json_csv2[index].NIT).toString()
            })
            // x[index].RENGLON = $scope.json_csv2[index].$haskey; 
            // x[index].CUENTA = $scope.json_csv2[index].CUENTA; 
            // x[index].NATURALEZA = $scope.json_csv2[index].NATURALEZA; 
            // x[index].VALOR = parseFloat($scope.json_csv2[index].VALOR); 
            // x[index].NIT = parseInt($scope.json_csv2[index].NIT); 
          }
          var tempo=JSON.stringify(x);
          console.log(tempo);
          $http({
            method: 'POST',
            url: "php/financiera/carga_interface.php",
            data: {
              function: 'p_ins_kmov',
              concepto: $scope.concepto,
              fecha: $scope.fecha,
              observacion: $scope.observacion,
              cedula: parseInt($scope.cedula),
              v_pcantidad_json: x.length,
              v_pjson_detalle:tempo
            }
          }).then(function (response) {
            swal.close();
            if(response.data.codigo_err==0){
              $scope.Procesar_Kmov(response.data.Consecutivo,response.data.Ubicacion);
            }else{
              var mensaje=response.data.observacion_err;
              swal('Hubo un error al cargar el archivo', mensaje, 'info')
            }
          });//}).then(function(response){
        }
      }//$scope.Crear_Maestro = function(){

      // convierte en json
      $scope.convierte = function () {
        var filename = document.getElementById("AM");
        if (filename.value.length < 1) {
          ($scope.warning = "Es necesario subir un archivo");
        } else {
          $scope.title = "Confirm file";
          var file = filename.files[0];
          var fileSize = 0;
          if (filename.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              $scope.convertir_json(e.target.result.split("\n"));
            }
            reader.readAsText(filename.files[0]);
          }
        }
      }
      $scope.json_csv2=[];
      $scope.convertir_json = function(rows) {
        var result = [];
        var headers = ["RENGLON", "CUENTA", "NATURALEZA","VALOR","NIT"];
        for (var i = 0; i < rows.length; i++) {
            var obj = {};
            var currentline = rows[i].split("|");
            for (var j = 0; j < headers.length; j++) {
                var temp = headers[j].replace('"', '');
                headers[j] = temp.replace('"', '');
                temp = currentline[j].replace('"', '');
                obj[headers[j]] = temp.replace('"', '');
            }
            result.push(obj);
        }
        $scope.json_csv2 = result;
           $scope.total_credito=0;
        $scope.total_debito=0;
       
        for (let index = 0; index < $scope.json_csv2.length; index++) {
          if($scope.json_csv2[index].NATURALEZA=='D'){
             $scope.total_debito=$scope.total_debito+parseFloat($scope.json_csv2[index].VALOR);
          }else{
           $scope.total_credito=$scope.total_credito+parseFloat($scope.json_csv2[index].VALOR);
         }
        }
       // console.log( $scope.json_csv2 );
        // $scope.guardar_articulos($scope.json_csv2);
        $scope.$apply();
    }

      $scope.Cargar_Detalle = function (consecutivo) {
        var result = [];
        var headers = ["DESCRIPCION", "CANTIDAD", "COSTO"];
        for (var i = 0; i < rows.length - 1; i++) {
          var obj = {};
          var currentline = rows[i].split(",");
          for (var j = 0; j < headers.length; j++) {
            var temp = headers[j].replace('"', '');
            headers[j] = temp.replace('"', '');
            temp = currentline[j].replace('"', '');
            obj[headers[j]] = temp.replace('"', '');
          }
          result.push(obj);
        }
        $scope.json_csv2 = result;

        // $scope.guardar_articulos($scope.json_csv2);
        $scope.$apply();

        // var excel = new FormData($("#fromarchivo")[0]);
        // $.ajax({
        //   url: "php/financiera/carga_kmvd.php",
        //   type: "POST",
        //   data: excel,
        //   contentType: false,
        //   processData: false,
        //   dataType: 'json'
        // }).done(function (response) {
        //   if (response.codigo == "0") {
        //     $scope.Procesar_Kmov(consecutivo);
        //     //notification.getNotification('success', response.error, 'info')
        //   } else {
        //     $scope.Eliminar_Kmov(consecutivo);
        //     $scope.limpiar();
        //     swal('IMPORTANTE',  response.error, 'info')
        //   }
        // }).fail(function (response) {
        //   $scope.Eliminar_Kmov(consecutivo);
        //   $scope.limpiar();
        //   swal('IMPORTANTE', 'Inconvenientes al leer el archivo de excel ' + response.error, 'info')
        // });
      }

      $scope.Eliminar_Kmov = function (consecutivo) {
        $http({
          method: 'POST',
          url: "php/financiera/carga_interface.php",
          data: { function: 'eliminar_kmov', numero: consecutivo }
        });
      }

      $scope.Procesar_Kmov = function (consecutivo) {
         swal({
            title: 'Cargando información...'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/financiera/carga_interface.php",
          data: { function: 'procesa_kmov', numero: consecutivo }
        }).then(function (response) {
            swal.close();
          if (response.data.codigo == "0") {
            if ($scope.reversar == true) {
              $scope.Reversa_Kmov(consecutivo);
            } else {
          
              swal({ title: "Completado", text: "Documento Cargado y Confirmado con Exito. NK-"+consecutivo, type: "success" });
               $scope.limpiar();
            }

          } else {
            $scope.Eliminar_Kmov(consecutivo);
      
            swal('IMPORTANTE',  'Inconvenientes de Confirmacion, ' + response.data.observacion_err,'info')
          }
        })
      }
      $scope.Reversa_Kmov = function (consecutivo) {

        $http({
          method: 'POST',
          url: "php/financiera/carga_interface.php",
          data: { function: 'reversa_kmov', numero: consecutivo }
        }).then(function (response) {
          if (response.data.codigo == '0') {
              swal({ title: "Completado", text: "Documento Cargado, Confirmado y Reversado con Exito. NK-"+consecutivo, type: "success" });
            } else {
            swal('IMPORTANTE', 'Inconvenientes al Reversar el documento' + response.data.observacion_err, 'info')
          }
          $scope.limpiar();
        })
      }

      $scope.limpiar = function (consecutivo) {
        consecutivo = 0;
        $scope.reversar = false;
        $scope.btncarga = false;
        $scope.btnreload = true;
        $scope.concepto = '';
        $scope.fecha = null;
        $scope.observacion = null;
        $scope.excel = null;
        $scope.json_csv2.length = 0; 
        $scope.thisfile.val("");
        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

    }]);
