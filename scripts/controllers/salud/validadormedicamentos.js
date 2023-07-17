'use strict';
angular.module('GenesisApp').controller('validadormedicamentosController', ['$scope', 'notification', '$http', '$timeout', '$filter', '$q', function ($scope, notification, $http, $timeout, $filter, $q) {
  $scope.Inicio = function () {
    $scope.idUser = sessionStorage.getItem('nit');
    $scope.tipoFuncionario = $scope.idUser == "0" ? true : false;
    // let x = true;
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

    $('.modal').modal();



    if (!$scope.tipoFuncionario) {
      $scope.InputNit = $scope.idUser;
      $scope.BuscarIPS();
    }
    $scope.getTokenGoAnyWhere();
    $scope.Tap = 1;
    $scope.InputNit = '';
    $scope.inputFile = '';
    $scope.FileName = '';
    $scope.FileType = '';
    $scope.anno = '';
    $scope.periodo = '';
    $scope.cantRegistros = '';
    $scope.Periodos = [];
    $scope.dataIPS = '';
    $scope.dataActMed = '';
    $scope.SysDay = new Date();
    $scope.Mes = ($scope.SysDay.getMonth() + 1) < 10 ? '0' + ($scope.SysDay.getMonth() + 1) : ($scope.SysDay.getMonth() + 1);
    $scope.Ano = $scope.SysDay.getFullYear();
    // let nombreArch = "Archivo (MD" + idUser + "_" + $scope.Mes + $scope.Ano + ".zip)";
    $scope.XnombreArch = "MD" + $scope.idUser + "_" + $scope.Mes + $scope.Ano;
    $scope.cargaAnnos();
    $scope.archivosRadicadosData = [];
    if (!$scope.tipoFuncionario) {
      $scope.InputNit = $scope.idUser;
      $scope.BuscarIPS();
    }

    // document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.XnombreArch);
    $scope.actualizaPlaceHolder();
    document.getElementById('MD')
      .addEventListener('change', $scope.loadFile, false);
    setTimeout(() => {
      $scope.$apply();
    }, 1000);

  }


  $scope.loadFile = function (x) {
    var ValidarExistente = false;
    if (x == 'A') {
      var y = $scope.dataActMed.ruta.split('/');
      var nombreAct = 'MD' + y[7] + '_' + y[6] + y[5];
      $scope.XnombreArch = nombreAct;
      $scope.inputFile = document.querySelector('#MD_Act');
      $scope.Ano = parseInt(y[5]);
      $scope.periodo = parseInt(y[6]);
    } else {
      $scope.inputFile = document.querySelector('#MD');
    }
    if (ValidarExistente != true) {
      if ($scope.inputFile.files.length != 0) { //Valida que exista el archivo
        if ($scope.inputFile.files[0].size > 0 && $scope.inputFile.files[0].size <= 20971520) { //Valida que el archivo no pese mas de 10 Megas
          if ($scope.inputFile.files[0].name.includes('_')) {
            if ($scope.inputFile.files[0].name.split('_')[1].split('.')[1].toUpperCase() == 'ZIP') { //Valida que la extension sea .zip
              if ($scope.inputFile.files[0].name.split('.')[0] == $scope.XnombreArch) {//Valida que el nombre del archivo Sea el correcto
                if ($scope.anno != '' && $scope.periodo != '') {
                  if ($scope.cantRegistros != '') {
                    document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.inputFile.files[0].name);
                    // console.log($scope.inputFile.files);
                    // $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
                    //   $scope.B64 = result;
                    // });
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
                    swal('Advertencia', 'Debe diligenciar cantidad de registros', 'warning');
                    document.getElementById('MD').value = '';
                    $scope.actualizaPlaceHolder();
                    $scope.B64 = '';
                  }
                } else {
                  swal('Advertencia', 'Debe Seleccionar un mes y un año', 'warning');
                  document.getElementById('MD').value = '';
                  $scope.actualizaPlaceHolder();
                  $scope.B64 = '';
                }
              } else {
                swal('Nombre de archivo incorrecto', 'Debe ingresar archivo con nombre valido', 'warning');
                document.getElementById('MD').value = '';
                $scope.actualizaPlaceHolder();
                $scope.B64 = '';
              }
            } else {
              swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .zip', 'warning');
              document.getElementById('MD').value = '';
              $scope.actualizaPlaceHolder();
              $scope.B64 = '';
            }
          } else {
            swal('Tipo de archivo incorrecto', 'Debe ingresar archivo con nombre valido', 'warning');
            document.getElementById('MD').value = '';
            $scope.actualizaPlaceHolder();
            $scope.B64 = '';
          }
        } else {
          document.getElementById('MD').value = '';
          // document.querySelector('#file-upload-wrapper').setAttribute("data-text", $scope.XnombreArch);
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



  $scope.validaEstructura = function (x) {
    $http({
      method: 'POST',
      url: "php/salud/ValidadorMedicamentosIPS/validaEstructura.php",
      data: {
        function: 'validaEstructura',
        ruta: x,
      }
    }).then(function (res) {

    });
  }

  $scope.go_any_where = function () {
    $http({
      method: 'POST',
      url: "php/salud/ValidadorMedicamentosIPS/validaEstructura.php",
      data: { function: "FTP_GoAnyWhere" }
    }).then(function (response) {
      console.log(response.data);
    });

  }

  $scope.getTokenGoAnyWhere = function () {
    $http({
      method: 'POST',
      url: "php/salud/ValidadorMedicamentosIPS/validaEstructura.php",
      data: { function: "obtener_token" }
    }).then(function (response) {
      $scope.TokenGoAnyWhere = response.data;
    });

  }



  $scope.Limpiar = function () {
    if ($scope.inputFile != null && $scope.inputFile != undefined && $scope.inputFile != '') {
      document.querySelector('#MD').value = '';
      $scope.inputFile = '';
      $scope.actualizaPlaceHolder();
      $scope.B64 = '';
    }
  }

  $scope.ValidarMD = function (x) {
    swal({ title: 'Validando...' });
    var anno = x != 'A' ? $scope.anno : $scope.anno_act;
    var periodo = x != 'A' ? $scope.periodo : $scope.periodo_act;
    swal.showLoading();
    if (x == 'A') {
      var file = new FormData($("#anexo2")[0]);
    } else if (x == 'N') {
      var file = new FormData($("#anexo")[0]);
    }
    $http.post("php/salud/ValidadorMedicamentosIPS/funcValidmedicamentos.php?ano=" + anno + "&periodo=" + periodo, file, {
      transformRequest: angular.identity,
      headers: { 'Content-Type': undefined }
    }).then(function (response) {
      if (typeof (response.data) == 'string' && response.data.substring(0, 3) == '<br') {
        // swal('IMPORTANTE', 'El archivo zip debe contener solo 1 archivo plano ' + $scope.XnombreArch + ' con extension .txt', 'info');
        swal('IMPORTANTE', 'Ocurrio un error al intentar cargar el archivo ' + $scope.XnombreArch + ' con extension .txt por favor vuelve a intentarlo', 'info');
      } else {
        if (typeof (response.data) == 'object') {
          if (response.data[0].errores.length > 0) {

            var list = "<ul class='collapsible' style='max-height: 50vh;overflow: auto;'>";
            response.data.forEach(function (archivo, i) {
              list += "<li class='left-align'><div class='collapsible-header blue-text'><i class='material-icons'>error</i>" + archivo.nombre + " <small class='float-right red-text'> Errores: " + archivo.cantError + "</small>" + "</div><div class='collapsible-body'>";
              archivo.errores.forEach(function (error, j) {
                list += "<p style='padding: 1rem;'><span><b>Fila:</b>" + error.fila + ", <b>Cantidad de Columnas:</b>" + error.columna + "</p>";
              });
              list += "</div></li>";
            });
            swal({
              title: "Advertencia",
              width: 800, html: "<b>" + "SE ENCONTRARON ERRORES" + "</b><br><small>Clic en  en nombre del archivo para obtener una vista previa</small><br>" + list + "</ul>",
              allowOutsideClick: false,
              allowEscapeKey: false,
              cancelButtonText: 'Cerrar',
              // confirmButtonText: 'Descargar Errores',
              // confirmButtonColor: '#188038',
              showCancelButton: true,
              type: "warning"
            }).then(function (result) {
              if (result) {

              }
            }).catch(swal.noop);
            $(document).ready(function () {
              $('.collapsible').collapsible();
            });
          }
        } else {
          if (response.data.split('/')[1] == 'cargue_ftp') {
            if (x == 'N') {

              setTimeout(() => {
                var rutaX = response.data.split('/');
                var ruta = '/' + rutaX[1] + '/' + rutaX[2] + '/' + rutaX[3] + '/' + rutaX[4] + '/' + rutaX[5] + '/' + rutaX[6] + '/' + rutaX[7];
                $http({
                  method: 'POST',
                  url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
                  data: {
                    function: 'radicado',
                    ano: $scope.anno,
                    periodo: $scope.periodo,
                    nit: $scope.InputNit,
                    cantRegistros: $scope.cantRegistros,
                    archivo: $scope.FileName.split('.')[0]
                  }
                }).then(function (res) {
                  setTimeout(() => {
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
                      // }
                    }
                  }, 1000);
                });
              }, 1500);
            } else {
              $scope.actualizarCargue(response.data);
            }
          } else {
            swal('IMPORTANTE', 'Ocurrio un error al intentar cargar el archivo ' + $scope.XnombreArch + ' con extension .txt por favor vuelve a intentarlo', 'info');
          }
        }
      }
    });
  }

  $scope.actualizarCargue = function (x) {
    $('.modal').modal('close');
    $http({
      method: 'POST',
      url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
      data: {
        function: 'actualizarCargue',
        ruta: x,
        ano: $scope.dataActMed.periodo.split('/')[0],
        periodo: $scope.dataActMed.periodo.split('/')[1],
        radicado: $scope.dataActMed.proceso,
        nit: $scope.InputNit != '' ? $scope.InputNit : $scope.idUser
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

  $scope.BuscarIPS = function () {

    if ($scope.InputNit != '') {
      $http({
        method: 'POST',
        url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
        data: { function: 'Obt_Ips', Coincidencia: $scope.InputNit }
        // data: { function: 'Obt_Ips', Coincidencia: 900465319 }
      }).then(function (res) {
        // console.log(res.data.length);
        if (res.data.length > 0 && res.data.length < 2) {
          $scope.tipoFuncionario = false;
          $scope.dataIPS = res.data[0];
          // $scope.InputNit = res.data[0].CODIGO;

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
    let Xperiodo = ($scope.periodo) < 10 ? '0' + ($scope.periodo) : ($scope.periodo);
    Xperiodo = Xperiodo != '0' ? Xperiodo : $scope.Mes + $scope.Ano;
    $scope.XnombreArch = "MD" + $scope.dataIPS.CODIGO + "_" + Xperiodo + $scope.anno;
    let placeholder = $scope.dataIPS.CODIGO != undefined ? $scope.dataIPS.CODIGO : $scope.idUser;
    let Xplaceholder = "Archivo (MD" + placeholder + "_" + Xperiodo + $scope.anno + ".zip)";
    setTimeout(() => {
      $scope.$apply();
    }, 1500);
    document.querySelector('#file-upload-wrapper').setAttribute("data-text", Xplaceholder);
  }


  $scope.atras = function () {
    $scope.tipoFuncionario = true;
    $scope.dataIPS = '';
  }

  $scope.verdetalle = function (x) {
    window.open('php/salud/ValidadorMedicamentosIPS/ValidadorMedicamentos_Error.php?radicado=' + x.proceso);
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
      url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
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

  $scope.ConsultaErrores = function () {
    $http({
      method: 'POST',
      url: "php/salud/ValidadorMedicamentosIPS/validador_medicamentos.php",
      data: {
        function: 'ConsultaErrores',
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

      }
    });
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

  $scope.actualizarSoporte = function (x) {
    document.getElementById('MD_Act').value = '';
    let perido = x.periodo.split('/')[1] > 9 ? x.periodo.split('/')[1] : '0' + x.periodo.split('/')[1];
    let anno = x.periodo.split('/')[0];
    var nombreAct = 'MD' + x.nit + '_' + perido + anno;
    document.querySelector('#file-upload-wrapper2').setAttribute("data-text", nombreAct);
    $scope.dataActMed = '';
    $('#Modal_Direccion').modal('open');
    $scope.dataActMed = x;
    $scope.periodo_act = x.periodo.split('/')[1];
    $scope.anno_act = x.periodo.split('/')[0];

    console.log($scope.periodo_act, $scope.anno_act)
  }

  $scope.closeModal = function () {
    $('.modal').modal('close');
  }

  $scope.KeyFind_Usuario = function (x) {
    console.log(x.value)
  }

  $scope.DescargaFile = function (x) {
    window.open('php/salud/ValidadorMedicamentosIPS/reporteExcel.php?json=' + JSON.stringify(x));
    $scope.Reporte = {
      anno: '',
      periodo: '',
      nit: ''
    };
  }

  if (document.readyState !== 'loading') {
    setTimeout(() => {
      $scope.Inicio();
    }, 500);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(() => {
        $scope.Inicio();
      }, 500);
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
