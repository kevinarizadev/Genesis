'use strict';

// const { CONSOLE_APPENDER } = require("karma/lib/constants");

angular.module('GenesisApp')
  .controller('pagoincapacidadesController', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter',
    function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {

// alert("FDFDSSFD");
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
              $scope.validarEstructura($(this)["0"].files["0"], 9, $(this), nombre);
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
        
        if ($scope.json_csv2.length == 0) {
          swal('IMPORTANTE', 'Archivo No Se Encuentra Adjuntado', 'info')
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
          // var tempo=JSON.stringify($scope.json_csv2);
          var x=[]
          for (let index = 0; index < $scope.json_csv2.length; index++) {
            x.push({
              "TIPO_DOC":$scope.json_csv2[index].TIPO_DOC.toString().trim(),
              "DOCUMENTO":$scope.json_csv2[index].DOCUMENTO.toString().trim(),
              "FECHA_INICIO":$scope.json_csv2[index].FECHA_INICIO.toString().trim(),
              "FECHA_FIN":$scope.json_csv2[index].FECHA_FIN.toString().trim(),
              "VALOR":$scope.json_csv2[index].VALOR.toString(),
              "FECHA_PAGO":$scope.json_csv2[index].FECHA_PAGO.toString(),
              "TIPO_DOC_APO":$scope.json_csv2[index].TIPO_DOC_APO.toString(),
              "DOCUMENTO_APO":$scope.json_csv2[index].DOCUMENTO_APO.toString(),
              "DOCUMENTO_INC":$scope.json_csv2[index].DOCUMENTO_INC.toString(),
              "UBICACION_INC":$scope.json_csv2[index].NUMERO_INC.toString(),
              "NUMERO_INC":parseInt($scope.json_csv2[index].UBICACION_INC.toString())
            })
          }
          var tempo=JSON.stringify(x);
          console.log(tempo);
          $http({
            method: 'POST',
            url: "php/financiera/pago_incapacidades.php",
            data: {
              v_pcantidad_pre: $scope.json_csv2.length,
              v_pjson_detalle:tempo
            }
          }).then(function (response) {
            swal.close();
            var anchor = document.createElement('a');
            anchor.href = response.data;
            anchor.target = '_blank';
            anchor.download = 'Pago';
            anchor.click();
            $scope.limpiar();
            // window.open('php/financiera/pago_incapacidades_archivo.txt');
            
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
        var headers = ['TIPO_DOC','DOCUMENTO','FECHA_INICIO','FECHA_FIN','VALOR','FECHA_PAGO','TIPO_DOC_APO','DOCUMENTO_APO','NO_DE_AUTORIZACION' ];
        for (var i = 0; i < rows.length; i++) {
            var obj = {};
            var currentline = rows[i].split("|");
            for (var j = 0; j < headers.length; j++) {
                var temp = headers[j].replace('"', '');
                headers[j] = temp.replace('"', '');
                temp = currentline[j].replace('"', '');
                obj[headers[j]] = temp.replace('"', '');
            }
            obj.DOCUMENTO_INC='';
            obj.NUMERO_INC='';
            obj.UBICACION_INC='';
            result.push(obj);
        }
        $scope.json_csv2 = result;
        console.log( $scope.json_csv2 );
        

        $scope.$apply();
    }

    $scope.partir_autorizacion=function(x,palabra){
      var array_palabra = palabra.split('-');
      $scope.json_csv2[x].DOCUMENTO_INC=array_palabra[0];
      $scope.json_csv2[x].NUMERO_INC=array_palabra[1];
      $scope.json_csv2[x].UBICACION_INC=array_palabra[2];
    }

   

      $scope.Eliminar_Kmov = function (consecutivo) {
        $http({
          method: 'POST',
          url: "php/financiera/carga_interface.php",
          data: { function: 'eliminar_kmov', numero: consecutivo }
        });
      }

      $scope.Procesar_Kmov = function (consecutivo) {
        $http({
          method: 'POST',
          url: "php/financiera/carga_interface.php",
          data: { function: 'procesa_kmov', numero: consecutivo }
        }).then(function (response) {
          if (response.data.codigo == "0") {
            if ($scope.reversar == true) {
              $scope.Reversa_Kmov(consecutivo);
            } else {
          
              swal({ title: "Completado", text: "Documento Cargado y Confirmado con Exito. NK-"+response.data.consecutivo, type: "success" });
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
              swal({ title: "Completado", text: "Documento Cargado, Confirmado y Reversado con Exito. NK-"+response.data.consecutivo, type: "success" });
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
        $scope.thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
        setTimeout(() => {
          $scope.$apply();
        }, 300);
      }

    }]);
