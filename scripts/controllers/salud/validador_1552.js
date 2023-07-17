'use strict';
angular.module('GenesisApp').controller('validador1552', ['$scope', 'notification', '$http', '$timeout', '$filter', '$q', function ($scope, notification, $http, $timeout, $filter, $q) {

  $scope.Inicio = function () {

    // Se estaran validadon 18 columnas
    $scope.btnAtras = sessionStorage.getItem('nit');
    console.log($scope.btnAtras);
    $('.modal').modal();
    if ($(window).width() < 1100) {
      document.querySelector("#pantalla").style.zoom = 0.7;
    }
    if ($(window).width() > 1100 && $(window).width() < 1300) {
      document.querySelector("#pantalla").style.zoom = 0.7;
    }
    if ($(window).width() > 1300 && $(window).width() < 1500) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }
    if ($(window).width() > 1500) {
      document.querySelector("#pantalla").style.zoom = 0.9;
    }

    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
    document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
    $scope.response = [];

    if (!$scope.tipoFuncionario) {
      $scope.InputNit = $scope.idUser;
      $scope.BuscarIPS();
    }
    $scope.Tap = 1;
    $scope.InputNit = '';
    //$scope.inputFile = '';
    $scope.B64 = '';
    $scope.dataIPS = '';
    $scope.SysDay = new Date();
    $scope.Mes = ($scope.SysDay.getMonth() + 1) < 10 ? '0' + ($scope.SysDay.getMonth() + 1) : ($scope.SysDay.getMonth() + 1);
    $scope.Ano = $scope.SysDay.getFullYear();
    $scope.cargaAnnos();
    $scope.archivosRadicadosData = [];
    if (document.getElementById('fileInput')) {
      document.getElementById('fileInput')
        .addEventListener('change', $scope.loadFile, false);
    }
    setTimeout(() => {
      $scope.actualizaPlaceHolder();
      $scope.$apply();
    }, 1000);

  }


  $scope.loadFile = function (x) {
    var ValidarExistente = false;
    if (x == 'A') {
      var y = $scope.dataActMed.ruta.split('/');
      var nombreAct = y[6] + '_' + y[5] + y[4];
      $scope.XnombreArch = nombreAct;
      $scope.inputFile = document.querySelector('#MD_Act');
      $scope.Ano = parseInt(y[4]);
      $scope.periodo = parseInt(y[5]);
    } else {
      $scope.inputFile = document.querySelector('#fileInput');
    }
    if (ValidarExistente != true) {
      if ($scope.inputFile.files.length != 0) { //Valida que exista el archivo
        if ($scope.inputFile.files[0].size > 0 && $scope.inputFile.files[0].size <= 20971520) { //Valida que el archivo no pese mas de 10 Megas
          if ($scope.inputFile.files[0].name.includes('_')) {
            if ($scope.inputFile.files[0].name.split('_')[1].split('.')[1].toUpperCase() == 'ZIP') { //Valida que la extension sea .zip
              if ($scope.inputFile.files[0].name.split('.')[0] == $scope.XnombreArch) {//Valida que el nombre del archivo Sea el correcto
                if ($scope.anno != '' && $scope.periodo != '') {
                  document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.inputFile.files[0].name);
                  $scope.FileName = $scope.inputFile.files[0].name;
                  $scope.FileType = $scope.inputFile.files[0].name.split('.')[1];
                  if (x == 'A') {
                    document.querySelector('#file-upload-wrapper2').setAttribute("data-text", $scope.FileName);
                    $scope.ValidarMD('A');
                  }
                  setTimeout(() => {
                    $scope.$apply();

                  }, 500);
                } else {
                  swal('Advertencia', 'Debe Seleccionar un mes y un año', 'warning');
                  document.getElementById('fileInput').value = '';
                  $scope.actualizaPlaceHolder();
                  $scope.B64 = '';
                }
              } else {
                swal('Nombre de archivo incorrecto', 'Debe ingresar archivo con nombre valido', 'warning');
                document.getElementById('fileInput').value = '';
                $scope.actualizaPlaceHolder();
                $scope.B64 = '';
              }
            } else {
              swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .zip', 'warning');
              document.getElementById('fileInput').value = '';
              $scope.actualizaPlaceHolder();
              $scope.B64 = '';
            }
          } else {
            swal('Tipo de archivo incorrecto', 'Debe ingresar archivo con nombre valido', 'warning');
            document.getElementById('fileInput').value = '';
            $scope.actualizaPlaceHolder();
            $scope.B64 = '';
          }
        } else {
          document.getElementById('fileInput').value = '';
          $scope.actualizaPlaceHolder();
          swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 15 megabytes', 'error');
          $scope.B64 = '';
        }
      } else {
        swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        $scope.actualizaPlaceHolder();
        $scope.B64 = '';
      }
    }
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
      document.querySelector('#fileInput').value = '';
      $scope.inputFile = '';
      $scope.actualizaPlaceHolder();
      $scope.B64 = '';
    }
  }

  $scope.ValidarMD = function (x) {
    swal({ title: 'Validando...' });
    swal.showLoading();
    var anno = x != 'A' ? $scope.anno : $scope.anno_act;
    var periodo = x != 'A' ? $scope.periodo : $scope.periodo_act;
    if (x == 'A') {
      var file = new FormData($("#anexo2")[0]);
    } else if (x == 'N') {
      var file = new FormData($("#anexo")[0]);
    }
    $http.post("php/salud/Validador_1552/funcValid1552.php?ano=" + anno + "&periodo=" + periodo, file, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    }).then(function (response) {
      if (response.data.substring(0, 3) == '<br' || response.data == 1) {

        swal('IMPORTANTE', 'El archivo zip debe contener solo 1 archivo plano ' + $scope.XnombreArch + ' con extension .txt', 'info');

      } else {
        if (response.data != '') {
          if (response.data == "size0") {
            return swal({
              title: '!NOTIFICACION¡',
              type: "error",
              text: "El tamaño del archivo txt no puede ser 0 bytes"
            }).catch(swal.noop);
          }
          if (x == 'N') {
            setTimeout(() => {
              $http({
                method: 'POST',
                url: "php/salud/Validador_1552/validador1552.php",
                data: {
                  function: 'ValidaEstructura',
                  ruta: response.data,
                  nombre: $scope.XnombreArch
                }
              }).then(function (res) {
                if (typeof (res.data) == 'string' && res.data.substring(0, 3) == '<br') {
                  swal({
                    title: '!NOTIFICACION¡',
                    type: "error",
                    text: "Error al cargar el archivo o se encontro una linea demasiado larga"
                  }).catch(swal.noop);

                } else {
                  if (res.data[0].Codigo == 1) {
                    console.log(res.data);
                    var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
                    // $scope.response.forEach(function (archivo, i) {
                    list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" + $scope.XnombreArch + " <small class='float-right red-text'> Errores: " + res.data[0].Codigo + "</small>" + "</div><div class='collapsible-body'>";
                    res.data.forEach(function (error, j) {
                      list += "<p style='padding: 1rem;'><span><b>Error: </b>" + error.Error.split(':')[0] + " en la linea: " + error.Error.split(':')[1] + "</p>";
                    });
                    list += "</div></li>";
                    // });
                    swal({
                      title: "Advertencia",
                      width: 800, html: "<b>" + 'Los siguientes archivos presentan errores de estructura.' + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showCloseButton: true,
                      // showCancelButton: true,
                      type: "warning"
                    }).catch(swal.noop);
                    $(document).ready(function () {
                      $('.collapsible').collapsible();
                    });
                  } else {
                    $http({
                      method: 'POST',
                      url: "php/salud/Validador_1552/validador1552.php",
                      data: {
                        function: 'radicado',
                        ano: $scope.anno,
                        periodo: $scope.periodo < 10 ? '0' + $scope.periodo : $scope.periodo,
                        nit: $scope.InputNit != '' ? $scope.InputNit : $scope.idUser,
                        archivo: $scope.XnombreArch,
                        responsable: sessionStorage.getItem('cedula')
                      }
                    }).then(function (res) {
                      // if (res.substring(0, 3) == '<br') {
                      if (res.data[1].resp[0].Codigo == 0) {
                        swal({
                          title: '!NOTIFICACION¡',
                          type: "success",
                          text: res.data[1].resp[0].Nombre + ' Numero de radicado: ' + res.data[1].resp[0].Proceso,
                        }).catch(swal.noop);
                      } else {
                        swal({
                          title: '!NOTIFICACION¡',
                          type: "error",
                          text: res.data[1].resp[0].Nombre
                        }).catch(swal.noop);
                      }
                    });
                  }
                }
              });
            }, 1500);
          } else {
            $scope.actualizarCargue(response.data);
          }
        } else {
          swal('IMPORTANTE', 'Ocurrio un error al cargar el archivo' + $scope.XnombreArch, 'info');
        }
      }
    });
  }

  $scope.actualizarCargue = function (x) {
    $('.modal').modal('close');
    $http({
      method: 'POST',
      url: "php/salud/Validador_1552/validador1552.php",
      data: {
        function: 'actualizarCargue',
        ruta: x,
        ano: $scope.dataActMed.periodo.split('/')[0],
        periodo: $scope.dataActMed.periodo.split('/')[1],
        radicado: $scope.dataActMed.proceso,
        nit: $scope.InputNit != '' ? $scope.InputNit : $scope.idUser,
      }
    }).then(function (response) {
      if (response.data.Codigo == 0) {
        $scope.SetTab(2);
        setTimeout(() => {
          swal({
            title: '!NOTIFICACION¡',
            type: "success",
            text: response.data.Archivo,
          }).catch(swal.noop);
        }, 1000);

      } else {
        swal({
          title: '!NOTIFICACION¡',
          type: "error",
          text: response.data.Archivo,
        }).catch(swal.noop);
      }

    });
  }

  $scope.readMd = function (data, nombre) {
    var file = data;
    var datos;
    $scope.estado = true;
    var lector = new FileReader();
    lector.onload = function (e) {
      var contenido = e.target.result;
      var filas = contenido.split('\n');

      for (let fila = 0; fila < filas.length; fila++) { //Recorre cada fila
        datos = filas[fila].split('|'); //separo cada dato por , para contar cuantos hay
        if (!(datos.length == 12)) {
          swal('IMPORTANTE', 'el archivo ' + nombre + ' presenta error de estructura en la fila ' + (fila + 1) + ' .', 'info');
          document.getElementById('fileInput').value = '';
          $scope.actualizaPlaceHolder();
          $scope.estado = false;
          $scope.B64 = '';
          break;
        }
      }

      if ($scope.estado == true) {
        if ($scope.inputFile.files[0].size > 0) {
          $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
            $scope.B64 = result;
            $scope.validaciones();
          });

        }
      }
    };

    lector.readAsText(file);
  }

  $scope.mostrar = function () {
    console.log($scope.response);
    if ($scope.response.errores.length > 0) {
      // if ($scope.response.hasOwnProperty('archivos')) {
      var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
      // $scope.response.forEach(function (archivo, i) {
      list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" + $scope.response.nombre + " <small class='float-right red-text'> Errores: " + $scope.response.errores.length + "</small>" + "</div><div class='collapsible-body'>";
      $scope.response.errores.forEach(function (error, j) {
        list += "<p style='padding: 1rem;'><span><b>Fila: </b>" + error.fila + ", <b>Columna: </b>" + error.columna + ", <b>Valor: </b>" + error.valor + "</span><br><b>Dato: </b>" + error.dato + ", <b>Error: </b>" + error.mensaje + "</p>";
      });
      list += "</div></li>";
      // });
      swal({
        title: "Advertencia",
        width: 800, html: "<b>" + 'Los siguientes archivos presentan errores de estructura.' + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Descargar Errores',
        confirmButtonColor: '#188038',
        showCloseButton: true,
        // showCancelButton: true,
        type: "warning"
      }).then(function (result) {
        if (result) {
          var jsonError = new Array();
          // response.data.archivos.forEach(function (archivo, i) {
          $scope.response.errores.forEach(function (error, j) {
            jsonError.push(Object.assign({ archivo: $scope.response.nombre.split('.')[0] }, error));
          });
          // });
          // window.open('php/salud/Validador_1552/errors_1552.php?archivo=' +  JSON.stringify(jsonError) + '&recibo=' + $scope.response.nombre);
          var f = document.getElementById('TheForm');
          f.archivo.value = JSON.stringify(jsonError);
          f.recibo.value = $scope.response.nombre;
          // window.open('', 'TheWindow');
          f.submit();
        }
      }).catch(swal.noop);
      $(document).ready(function () {
        $('.collapsible').collapsible();
      });
    } else {
      swal({
        title: '!NOTIFICACION¡',
        type: "success",
        text: 'ARCHIVO CARGADO EXITOSAMENTE'
      }).catch(swal.noop);
    }
  }

  $scope.BuscarIPS = function () {
    $scope.inputFile = '';
    if ($scope.InputNit != '') {
      $http({
        method: 'POST',
        url: "php/salud/Validador_1552/validador1552.php",
        data: { function: 'Obt_Ips', Coincidencia: $scope.InputNit }
        // data: { function: 'Obt_Ips', Coincidencia: 900465319 }
      }).then(function (res) {
        // console.log(res.data.length);
        if (res.data.length > 0 && res.data.length < 2) {
          $scope.tipoFuncionario = false;
          $scope.dataIPS = res.data[0];
          $scope.Tap = 2;
          $scope.archivosRadicados();
          // $scope.periodo = ($scope.periodo) < 10 ? '0' + ($scope.periodo) : ($scope.periodo);
          // $scope.XnombreArch = "MD" + $scope.dataIPS.CODIGO + "_" + $scope.periodo + $scope.anno;
          $scope.actualizaPlaceHolder();
          // document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.XnombreArch);
        } else {
          swal('Advertencia', 'No se encontraron resultados', 'error');
        }
      })
    } else {
      swal('Advertencia', 'Debe ingresar un nit', 'warning');
    }
  }

  $scope.cargaAnnos = function () {
    $http({
      method: 'POST',
      url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
      data: { function: 'cargaannos' }
    }).then(function (res) {
      $scope.Annos = res.data;
      $scope.anno = res.data;
    });
  }
  $scope.cargaPeriodos = function () {
    // setTimeout(() => {
    if ($scope.anno != "") {
      // console.log($scope.anno);
      $http({
        method: 'POST',
        url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
        data: { function: 'cargaperiodos', anno: $scope.anno }
      }).then(function (res) {
        $scope.Periodos = res.data;
        $scope.periodo = $scope.Periodos[0].IDE;
      })
    }
  }

  $scope.actualizaPlaceHolder = function () {
    if (document.getElementById('fileInput')) {
      let Xperiodo = ($scope.periodo) < 10 ? '0' + ($scope.periodo) : ($scope.periodo);
      Xperiodo = Xperiodo != '0' ? Xperiodo : $scope.Mes + $scope.Ano;
      $scope.XnombreArch = $scope.dataIPS.CODIGO + "_" + Xperiodo + $scope.anno;
      let placeholder = $scope.dataIPS.CODIGO != undefined ? $scope.dataIPS.CODIGO : $scope.idUser;
      let Xplaceholder = "Archivo ( " + placeholder + "_" + Xperiodo + $scope.anno + ".zip )";
      setTimeout(() => {
        $scope.$apply();
      }, 1000);
      document.querySelector('#file-upload-wrapper').setAttribute("data-text", Xplaceholder);
    }
  }


  $scope.atras = function () {
    $scope.tipoFuncionario = true;
    $scope.Limpiar();
  }

  $scope.SetTab = function (x) {
    $scope.Tap = x;
    if ($scope.Tap == 2) {
      $scope.archivosRadicados();
    }
    setTimeout(function () {
      $scope.$apply();
    }, 500);
  }

  $scope.archivosRadicados = function () {
    $scope.archivosRadicadosDataTemp = [];
    $scope.archivosRadicadosData = [];
    $scope.cErrores = 0;
    $scope.cPP = 0;
    $scope.cValidados = 0;
    swal.showLoading();
    $http({
      method: 'POST',
      url: "php/salud/Validador_1552/validador1552.php",
      data: {
        function: 'listarRadicados',
        nit: $scope.InputNit != '' ? $scope.InputNit : $scope.idUser,
      }
    }).then(function (res) {
      swal.close();
      if (res.data.length > 0) {
        $scope.archivosRadicadosData = res.data;
        $scope.archivosRadicadosDataTemp = $scope.archivosRadicadosData;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.cErrores = 0;
        $scope.cPP = 0;
        $scope.cValidados = 0;
        $scope.calcularCant($scope.archivosRadicadosData);
      }
    });
  }

  $scope.calcularCant = function (x) {
    for (let i = 0; i < x.length; i++) {
      if (x[i].estado_cargue == 'CON ERRORES') {
        $scope.cErrores++;
      } else if (x[i].estado_cargue == 'PENDIENTE') {
        $scope.cPP++;
      } else if (x[i].estado_cargue == 'VALIDADO') {
        $scope.cValidados++;
      }
    }
  }

  $scope.filter = function (val) {
    $scope.archivosRadicadosDataTemp = $filter('filter')($scope.archivosRadicadosData, val);
    if ($scope.archivosRadicadosDataTemp.length > 0) {
      $scope.setPage(1);
    }
    $scope.configPages();
  }

  $scope.setPage = function (index) {
    $scope.currentPage = index - 1;
    // console.log($scope.archivosRadicadosData.length / $scope.pageSize - 1)
  }

  $scope.configPages = function () {
    $scope.pages.length = 0;
    var ini = $scope.currentPage - 4;
    var fin = $scope.currentPage + 5;
    if (ini < 1) {
      ini = 1;
      if (Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize) > $scope.valmaxpag)
        fin = 10;
      else
        fin = Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize);
    } else {
      if (ini >= Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize) - $scope.valmaxpag) {
        ini = Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize) - $scope.valmaxpag;
        fin = Math.ceil($scope.archivosRadicadosDataTemp.length / $scope.pageSize);
      }
    }
    if (ini < 1) ini = 1;
    for (var i = ini; i <= fin; i++) {
      $scope.pages.push({
        no: i
      });
    }

    if ($scope.currentPage >= $scope.pages.length)
      $scope.currentPage = $scope.pages.length - 1;
  }

  $scope.verdetalle = function (x) {
    window.open('php/salud/Validador_1552/errors_1552.php?radicado=' + x.proceso);
  }

  $scope.actualizarSoporte = function (x) {
    document.getElementById('MD_Act').value = '';
    var periodo = x.periodo.split('/')[1] < 10 ? '0' + x.periodo.split('/')[1] : x.periodo.split('/')[1];
    console.log(periodo);
    var nombreAct = x.nit + '_' + periodo + x.periodo.split('/')[0];
    document.querySelector('#file-upload-wrapper2').setAttribute("data-text", nombreAct);
    $scope.dataActMed = '';
    $('#Modal_ActualizaSoporte').modal('open');
    $scope.dataActMed = x;
    $scope.periodo_act = periodo;
    $scope.anno_act = x.periodo.split('/')[0];
  }

  $scope.closeModal = function () {
    $('.modal').modal('close');
  }

  $scope.ValidaAcceso = function () {
    $http({
      method: 'POST',
      url: "php/salud/Validador_1552/validador1552.php",
      data: {
        function: 'ValidaAccesso',
      }
    }).then(function (res) {
      $scope.acceso = res.data.RESP;
      //console.log($scope.acceso);
    });
  }

  if (document.readyState !== 'loading') {
    $scope.acceso = 1;
    $scope.ValidaAcceso();
    $scope.idUser = sessionStorage.getItem('nit');
    $scope.tipoFuncionario = $scope.idUser == "0" ? true : false;
    setTimeout(() => {
      $scope.Inicio();
    }, 1500);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      $scope.acceso = 1;
      $scope.ValidaAcceso();
      $scope.idUser = sessionStorage.getItem('nit');
      $scope.tipoFuncionario = $scope.idUser == "0" ? true : false;
      setTimeout(() => {
        $scope.Inicio();
      }, 1500);
    });
  }
}]).filter('inicio', function () {
  return function (input, start) {
    if (input != undefined && start != NaN) {
      start = +start;
      return input.slice(start);
    } else {
      return null;
    }
  }
});
// $scope.anno = '';
//     $scope.periodo = '';



