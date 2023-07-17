'use strict';
angular.module('GenesisApp').controller('validadormedicamentosController', ['$scope', 'notification', '$http', '$timeout', '$filter', '$q', function ($scope, notification, $http, $timeout, $filter, $q) {
  localStorage.setItem('nit', 9004653194);
  $(document).ready(function () {
    if ($(window).width() < 1100) {
      document.querySelector("#pantalla").style.zoom = 0.7;
    }
    if ($(window).width() > 1100 && $(window).width() < 1300) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }
    if ($(window).width() > 1300) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }
    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';

    $scope.inputFile = '';
    $scope.B64 = '';

  });

  $scope.loadFile = function () {
    var ValidarExistente = false;
    $scope.inputFile = document.querySelector('#MD');
    if (ValidarExistente != true) {
      if ($scope.inputFile.files.length != 0) { //Valida que exista el archivo
        document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.inputFile.files[0].name);
        if ($scope.inputFile.files[0].size <= 209715200) { //Valida que el archivo no pese mas de 10 Megas
          if ($scope.inputFile.files[0].name.split('.')[1].toUpperCase() == 'TXT') { //Valida que la extension sea .txt
            if ($scope.inputFile.files[0].name.split('.')[0].substr(0, 2) == 'MD') { //Valida que el nombre del archivo empiece por MD
              if ($scope.inputFile.files[0].name.split('.')[0].substr(2) == localStorage.getItem('nit')) { //Valida que el nit de la ips concuerde con el de sessionStorage
                //TODO OK
                // document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.inputFile.files[0].name); //Todo OK
                $scope.readMd($scope.inputFile.files[0], 41, $scope.inputFile.files, $scope.inputFile.files[0].name.split('.')[0]);
                setTimeout(() => {
                  $scope.$apply();
                }, 500);
              } else {
                swal('Archivo incorrecto', 'Nit de IPS debe ser valido', 'warning');
                document.getElementById('MD').value = '';
                document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
                $scope.B64 = '';
              }
            } else {
              swal('Archivo incorrecto', 'Nombre de archivo no corresponde al correcto', 'warning');
              document.getElementById('MD').value = '';
              document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
              $scope.B64 = '';
            }
          } else {
            swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning');
            document.getElementById('MD').value = '';
            document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
            $scope.B64 = '';
          }
        } else {
          document.getElementById('MD').value = '';
          document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
          swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 15 megabytes', 'error');
          $scope.B64 = '';
        }
      } else {
        document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
        $scope.B64 = '';
      }
    } else {
      swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
      document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
      $scope.B64 = '';
    }
  }

  $scope.readMd = function (data, tamaño, thisfile, nombre) {
    var file = data;
    $scope.resumenmd = [];
    var datos;
    $scope.estado = true;
    var lector = new FileReader();
    lector.onload = function (e) {
      var contenido = e.target.result;
      var filas = contenido.split('\n');
      console.log(filas.length);
      for (let fila = 0; fila < filas.length; fila++) { //Recorre cada fila
        datos = filas[fila].split(','); //separo cada dato por , para contar cuantos hay
        if (!(datos.length == 32)) {
          swal('IMPORTANTE', 'el archivo ' + nombre.substr(0, 2) + ' presenta error de estructura en la fila ' + (fila + 1) + ' .', 'info');
          document.getElementById('MD').value = '';
          document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
          $scope.estado = false;
          $scope.B64 = '';
          break;
        }
      }

      if ($scope.estado == true) {
        if ($scope.inputFile.files[0].size > 0) {
          $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
            $scope.B64 = result;
          });
        }
      }
    };
    lector.readAsText(file);
  }

  $scope.getBase64 = function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  $scope.Limpiar = function () {
    if ($scope.inputFile != null && $scope.inputFile != undefined && $scope.inputFile != '') {
      var clone = $scope.inputFile.cloneNode();
      clone.value = '';
      $scope.inputFile.parentNode.replaceChild(clone, $scope.inputFile);
      document.querySelector('#file-upload-wrapper').setAttribute("data-text", 'Archivo (MD)');
      $scope.B64 = '';
    }

  }

  $scope.ValidarMD = function () {
    swal({ title: 'Validando...' });
    swal.showLoading();
    if ($scope.B64 != '') {
      $http({
        method: 'POST',
        url: "php/salud/ValidadorMedicamentosIPS/funcValidmedicamentos.php",
        data: {
          function: 'subirValidaciion',
          base: $scope.B64,
          name: $scope.inputFile.files[0].name.split('.')[0],
          ext: $scope.inputFile.files[0].name.split('.')[1],
          nit: localStorage.getItem('nit')
        }
      }).then(function (response) {
        // if (response.data.codigo == 0) {
        //   swal({
        //     title: 'Informacion',
        //     text: 'Archivo cargado exitosamente!',
        //     type: 'success'
        //   });
        // } else if (response.data.codigo < 0) {
        //   swal({ title: "Error", text: response.data.mensaje, type: "error" });
        // } else if (response.data.codigo > 0) {
        //   if (response.data.hasOwnProperty('archivos')) {
        //     var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
        //     response.data.archivos.forEach(function (archivo, i) {
        //       list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" + archivo.nombre + " <small class='float-right red-text'> Errores: " + archivo.errores.length + "</small>" + "</div><div class='collapsible-body'>";
        //       archivo.errores.forEach(function (error, j) {
        //         list += "<p style='padding: 1rem;'><span><b>Fila:</b>" + error.fila + ", <b>Columna:</b>" + error.columna + ", <b>Valor:</b>" + error.valor + "</span><br><b>Dato:</b>" + error.dato + ", <b>Error:</b>" + error.mensaje + "</p>";
        //       });
        //       list += "</div></li>";
        //     });
        //     swal({
        //       title: "Advertencia",
        //       width: 800, html: "<b>" + response.data.mensaje + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
        //       allowOutsideClick: false,
        //       allowEscapeKey: false,
        //       confirmButtonText: 'Descargar Errores',
        //       confirmButtonColor: '#188038',
        //       // showCancelButton: true,
        //       type: "warning"
        //     }).then(function (result) {
        //       if (result) {
        //         var jsonError = new Array();
        //         response.data.archivos.forEach(function (archivo, i) {
        //           archivo.errores.forEach(function (error, j) {
        //             jsonError.push(Object.assign({ archivo: archivo.nombre.substr(0, 2) }, error));
        //           });
        //         });
        //         // window.open('php/cuentasmedicas/rips/error_rips_new.php?archivo=' +  JSON.stringify(jsonError) + '&recibo=' + $scope.rip.recibo);
        //         var f = document.getElementById('TheForm');
        //         f.archivo.value = JSON.stringify(jsonError);
        //         f.recibo.value = $scope.rip.recibo;
        //         // window.open('', 'TheWindow');
        //         f.submit();
        //       }
        //     }).catch(swal.noop);
        //     $(document).ready(function () {
        //       $('.collapsible').collapsible();
        //     });
        //   }
        // }
      });
    } else {
      swal('IMPORTANTE', 'Debe cargar archivo MD para iniciar la validacion', 'info');
    }
  }
}])
