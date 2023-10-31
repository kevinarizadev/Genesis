'use strict';
angular.module('GenesisApp')
  .controller('modalProcesSalud', ['$scope', '$timeout', 'pqrHttp', '$http', function ($scope, $timeout, pqrHttp, $http) {

    $(document).ready(function () {
      $('#modalips').modal();
      $scope.tabs = 1;
      $scope.perfilFunc = sessionStorage.getItem('home') == 'inicio' ? true : false;
      setTimeout(() => {
        $('.tabs').tabs();
      }, 700);
      $scope.SysDay = new Date();
    });

    $scope.listIps = [];
    $scope.listMedicamentos = [];
    $scope.configTabs = { tab: 'G' };
    $scope.configTimeLime = {
      step1: false, step2: false, step3: false, step4: false
    }
    $scope.dataProcesSalud = {
      gesComment: null, adjuntarFile: null, adjuntarExt: null, adjComment: null, respuestaFile: null, respuestaExt: null,
      respuestaFinal: null, negacion: null, motivoNegacion: null, resNegacion: null, soporteFile: null, soportExt: null, fase: null, nitips: null,
      medicamentos: [], motivosRespuesta: null, motivoAltoCosto: null, motivoPatologia: null
    }
    $scope.tempips = '';
    $scope.procesopqr = null;
    $scope.rqGestionar = false;
    $scope.rqAjComment = false;
    $scope.rqRjComment = false;
    $scope.showAnswer = false;
    $scope.sendG = false;
    $scope.sendA = false;
    $scope.sendR = false;
    $scope.sendS = false;
    $scope.dataProcesSalud.negacion = "N";
    $scope.responsableNegacion = [
      { CODIGO: "CS", NOMBRE: "COORDINACIÓN SECCIONAL" },
      { CODIGO: "CC", NOMBRE: "COMITÉ TÉCNICO CIENTÍFICO SECCIONAL" }
    ];
    $scope.recordPhase = false;
    $scope.showDataPQR = false;
    $scope.serachips = true;
    $scope.inactivebarraips = true;
    $scope.inactiveipssearch = false;
    $scope.ipsmedicamento = '';
    $scope.selectips = '';
    $scope.inactivepro = true;
    $scope.getProcesoSaludPQR = function () {
      if ($scope.dataPqr) {
        pqrHttp.getProcesoSaludPQR($scope.dataPqr.CODIGO).then(function (res) {
          $scope.procesopqr = res.data;
          console.table(res.data);
          $scope.mostrarComentarioNuevoIps = false;
          let cont = 0;
          res.data.forEach(e => {
            if (e.comentarioIPS == 'S') {
              cont++
            }0
          });
          if (cont > 1 && cont < 5){
            $scope.mostrarComentarioNuevoIps = true;
          }

          $scope.opcionIps = {
            comentarioNuevoIps : ''
          }
          setTimeout(() => { $scope.$apply(); }, 500);
          if ($scope.procesopqr.length > 0) {
            $scope.showDataPQR = true;
          } else {
            $scope.showDataPQR = false;
          }
          pqrHttp.postViewNotification($scope.dataPqr.CODIGO).then(function (res) {
            // console.log(res);
          })
        })
      }
    }
    pqrHttp.getInfoAseguramientoPQR($scope.dataPqr.CODIGO).then(function (response) {
      console.log("asdasd")
      $scope.dpqr = response.data[0];

    })
    pqrHttp.getNegacionPQR($scope.dataPqr.CODIGO).then(function (response) {
      $scope.stateNegacion = response.data;
    })
    pqrHttp.getMotivosNegacion().then(function (response) {
      $scope.motivosNegacion = response;
    })
    pqrHttp.getSession().then(function (response) {
      $scope.responsable = response.cedula;
    })

    $scope.getProcesoSaludPQR();

    pqrHttp.getGestionFaseActualSaludPQR($scope.dataPqr.CODIGO, $scope.configTabs.tab).then(function (res) {
      // console.log(res.data);
      if (res.data) {
        $timeout(function () {
          // $scope.getActiveTab('A');
          $scope.getActiveTab(res.data.Nombre);
        })
        $scope.recordPhase = true;
      } else {
        $scope.recordPhase = false;
        $scope.getActiveTab(null);
      }
    })


    pqrHttp.p_obtener_pqr_motivo_res().then(result => {
      // console.log(result);
      $scope.motivosRespuesta = result;
    })

    pqrHttp.p_obtener_pqr_tecno_altocosto().then(result => {
      // console.log(result);
      $scope.motivosAltoCosto = result;
    })

    pqrHttp.p_obtener_pqr_patologia().then(result => {
      // console.log(result);
      $scope.motivosPatologias = result;
    })

    $scope.sAnswer = function (item) {
      $scope.textAnswer = '@' + item.nombre.replace(/\s/g, '') + ',';
      $scope.showAnswer = true;
    }
    $scope.sendAnswer = function () {
      $scope.showAnswer = false;
    }
    $scope.updateConfigTabs = function (config, event) {
      // console.log("config", config);
      // console.log("event", event);
      switch (config) {
        case 'Gestionar':
          $scope.configTabs.tab = 'G';
          $scope.configTimeLime.step1 = false;//Inactiva step1
          if (event == 'A') {
            $scope.recordPhase ? $scope.getActiveTab($scope.configTabs.tab) : null;
          }
          break;
        case 'Adjuntar':
          if (event == 'S') {
            if (($scope.dataProcesSalud.gesComment == null || $scope.dataProcesSalud.gesComment == '')) {
              $scope.rqGestionar = true;
            } else {
              $scope.configTabs.tab = 'A';
              $scope.configTimeLime.step1 = true;//Activa step1
              $scope.configTimeLime.step2 = false;//Inactiva step2
              $scope.rqGestionar = false;
              $timeout(function () {
                $scope.sendG == true ? $scope.saveSalud($scope.dataProcesSalud.gesComment, null, null, 'G') : null;
              });
            }
          } else {
            if ($scope.dataProcesSalud.negacion == 'S') {
              $timeout(function () {
                $scope.dataProcesSalud.negacion = "N";
              }, 100);
            } else {
              $scope.configTabs.tab = 'A';
              $scope.recordPhase ? $scope.getActiveTab($scope.configTabs.tab) : null;
              $scope.configTimeLime.step2 = false;
            }
          }
          break;
        case 'Respuesta':
          if (event == 'S') {
            if (!$scope.requireAdjuntar) {
              if (($scope.dataProcesSalud.adjComment == null || $scope.dataProcesSalud.adjComment == '')) {
                $scope.rqAjComment = true;
              } else {
                $scope.configTabs.tab = 'R';
                $scope.configTimeLime.step2 = true;//Activa step2
                $scope.configTimeLime.step3 = false;
                $scope.configTimeLime.step4 = false;
                $scope.rqAjComment = false;
                $timeout(function () {
                  $scope.sendA == true ? $scope.saveSalud($scope.dataProcesSalud.adjComment, $scope.dataProcesSalud.adjuntarFile, $scope.dataProcesSalud.adjuntarExt, 'A') : null;
                })
              }

            } else {
              swal('No completado', 'Para avanzar verifique la extensión o peso del archivo!', 'error').catch(swal.noop);
            }
          } else {
            $scope.configTabs.tab = 'R';
            $scope.recordPhase ? $scope.getActiveTab($scope.configTabs.tab) : null;
            $scope.configTimeLime.step3 = false;
          }
          break;
        case 'Soporte':
          if (event == 'S') {
            if (!$scope.requireRespuesta) {
              $timeout(function () {
                if ($scope.dataProcesSalud.negacion == 'S') {
                  if ($scope.dataProcesSalud.motivoNegacion && $scope.dataProcesSalud.resNegacion) {
                    $scope.sendR == true ? $scope.saveSalud($scope.dataProcesSalud.respuestaFinal, $scope.dataProcesSalud.respuestaFile, $scope.dataProcesSalud.respuestaExt, 'R', $scope.dataProcesSalud.motivoNegacion, $scope.dataProcesSalud.resNegacion, $scope.dataProcesSalud.negacion) : null;
                    swal('Completado', 'Gestion del PQR N° ' + $scope.dataPqr.CODIGO + ' FINALIZADA! ', 'success').then(function (response) {
                      $scope.dataProcesSalud = {
                        gesComment: null, adjuntarFile: null, adjuntarExt: null, adjComment: null, respuestaFile: null, respuestaExt: null,
                        respuestaFinal: null, negacion: null, motivoNegacion: null, resNegacion: null, soporteFile: null, soportExt: null, fase: null, nitips: null,
                        medicamentos: []
                      }
                      $scope.serachips = true;
                      $scope.inactivebarraips = true;
                      $scope.inactiveipssearch = false;
                      $scope.ipsmedicamento = '';
                      $scope.selectips = '';
                      $scope.inactivepro = true;
                      document.getElementById('pqrStepAdjuntarfile').value = '';
                      document.getElementById('ppqrStepRespuestafile').value = '';
                      document.getElementById('ppqrStepSoportefile').value = '';
                      $scope.formatearSoporte = '';
                      $scope.formatearRespuesta = '';
                      $scope.formateaar = '';
                      $scope.closeThisDialog({ data: 0 });
                    }).catch(swal.noop);
                  } else {
                    swal('No completado', 'Para avanzar verifique el motivo de negacion y el responsable de la negacion', 'error').catch(swal.noop);
                    return;
                  }
                } else {


                  if (($scope.dataProcesSalud.respuestaFinal == null || $scope.dataProcesSalud.respuestaFinal == '')) {
                    $scope.rqRjComment = true;
                  } else if (!$scope.dataProcesSalud.respuestaFile) {
                    swal('No completado', 'Para avanzar debe adjuntar la respuesta final!', 'error').catch(swal.noop);
                    return;
                  } else if (($scope.dataProcesSalud.motivosRespuesta == null || $scope.dataProcesSalud.motivosRespuesta == '')) {
                    swal('No completado', 'Para avanzar debe seleccionar un motivo de respuesta!', 'error').catch(swal.noop);
                    return;
                  }

                  if ($scope.dataProcesSalud.respuestaFile && $scope.dataProcesSalud.respuestaFinal && $scope.dataProcesSalud.motivosRespuesta) {
                    $scope.rqRjComment = false;
                    $scope.sendR == true ? $scope.saveSalud($scope.dataProcesSalud.respuestaFinal, $scope.dataProcesSalud.respuestaFile, $scope.dataProcesSalud.respuestaExt, 'R', $scope.dataProcesSalud.motivoNegacion, $scope.dataProcesSalud.resNegacion, $scope.dataProcesSalud.negacion) : null;
                    $scope.configTabs.tab = 'S';
                    $scope.configTimeLime.step3 = true;//Activa step3


                    pqrHttp.get_chequear_ips_medicamento($scope.dataPqr.CODIGO).then(function (res) {
                      // console.log(res);
                      console.log(228);
                      if (res.EstadoIps == 'S' || res.EstadoMedicamentos == 'S') {
                        $scope.inactiveipssearch = false;
                      }

                      // if ($scope.inactiveipssearch == true) {
                      // console.log(res);
                      //     $scope.ipsmedicamento = res;
                      //     $scope.inactiveipssearch = false;
                      // } else {
                      //     if ($scope.ipsmedicamento.Estado == 'N' && $scope.selectips == '' && $scope.inactivebarraips == true) {
                      //         $scope.serachips = true;
                      //         $scope.configTabs.tab = 'G';
                      //         $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = $scope.configTimeLime.step3 = $scope.configTimeLime.step4 = false;
                      //     } else {
                      //         swal('No completado', 'Por favor seleccione la IPS asociada con la PQR!', 'error').catch(swal.noop);
                      //     }
                      // }

                    })

                  }

                }
              })
            } else {
              swal('No completado', 'Para avanzar verifique la extensión o peso del archivo!', 'error').catch(swal.noop);
            }
          }
          break;
        case 'Finish':

          if (!$scope.requireSoporte) {
            if ($scope.dataProcesSalud.soporteFile) {
              $scope.configTimeLime.step4 = true;//Activa step4

              if ($scope.dataProcesSalud.motivoAltoCosto == null || $scope.dataProcesSalud.motivoAltoCosto == '') {
                swal('No completado', 'Por favor seleccione Motivo alto costo!', 'error').catch(swal.noop);
                return;
              } else if ($scope.dataProcesSalud.motivoPatologia == null || $scope.dataProcesSalud.motivoPatologia == '') {
                swal('No completado', 'Por favor seleccione Motivo patologia!', 'error').catch(swal.noop);
                return;
              }
              // if ($scope.listadoAutsAfilContador == 0 && $scope.listadoAutsAfil.length > 0) {
              //   swal('No completado', 'Debe vincular al menos una autorización!', 'error').catch(swal.noop);
              //   return;
              // }

              // $scope.listadoAutsAfilSeleccionados = []
              // $scope.listadoAutsAfil.forEach(e => {
              //   if (e.seleccionado) {
              //     $scope.listadoAutsAfilSeleccionados.push({
              //       numero: e.numero,
              //       ubicacion: e.ubicacion
              //     })
              //   }
              // });
              // console.table($scope.listadoAutsAfilSeleccionados);
              // debugger
              $timeout(function () {
                if ($scope.selectips == '') {
                  $scope.saveSalud(null, $scope.dataProcesSalud.soporteFile, $scope.dataProcesSalud.soportExt, 'S', '', '', '', $scope.dataProcesSalud.nitips, $scope.dataProcesSalud.medicamentos, $scope.dataProcesSalud.medicamentos.length);
                } else {
                  if ($scope.ipsmedicamento.Estado == 'S' && $scope.dataProcesSalud.medicamentos.length == 0) {
                    swal('No completado', 'Por favor seleccione los productos asociados con la PQR!', 'error').catch(swal.noop);
                    return;
                  } else {
                    $scope.serachips = true;
                    $scope.configTabs.tab = 'G';
                    $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = $scope.configTimeLime.step3 = $scope.configTimeLime.step4 = false;
                    $scope.dataProcesSalud.medicamentos = $scope.removePositionNull($scope.dataProcesSalud.medicamentos);
                    $scope.saveSalud(null, $scope.dataProcesSalud.soporteFile, $scope.dataProcesSalud.soportExt, 'S', '', '', '', $scope.dataProcesSalud.nitips, $scope.dataProcesSalud.medicamentos);
                  }

                }
              }, 100);


            } else {
              swal('No completado', 'Para avanzar debe adjuntar el soporte de envio!', 'error').catch(swal.noop);
            }
          } else {
            swal('No completado', 'Para avanzar verifique la extesion o peso del archivo!', 'error').catch(swal.noop);
          }

          break;
        case 'Second':
          if (event == 'S') {
            if (!$scope.requireSoporte) {
              $scope.configTimeLime.step2 = true;//Activa step2
              $timeout(function () {
                $scope.saveSalud($scope.dataProcesSalud.adjComment, $scope.dataProcesSalud.adjuntarFile, $scope.dataProcesSalud.adjuntarExt, 'A');
                $scope.configTabs.tab = 'G';
                $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = $scope.configTimeLime.step3 = $scope.configTimeLime.step4 = false;
              }, 100);
            } else {
              swal('No completado', 'Para avanzar verifique la extensión o peso del archivo!', 'error').catch(swal.noop);
            }
          }
          break;
      }
    }
    $scope.getActiveTab = function (tab) {
      pqrHttp.getGestionxFaseSaludPQR($scope.dataPqr.CODIGO, tab).then(function (res) {
        // console.log("res", res.data);
        // if (res.data[0]) {
        $scope.configTabs.tab = tab;
        if (res.data[0]) {
          var comentario = res.data[0].comentario;
          var adjunto = res.data[0].adjunto;
        }


        if ($scope.configTabs.tab == 'G') {
          $scope.dataProcesSalud.gesComment = comentario;
        }
        if ($scope.configTabs.tab == 'A') {
          $scope.configTimeLime.step1 = true;
          $scope.dataProcesSalud.adjComment = comentario;
          $scope.dataProcesSalud.adjuntarFile = adjunto;
        }
        if ($scope.configTabs.tab == 'R') {
          $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = true;
          $scope.dataProcesSalud.respuestaFinal = comentario;
          $scope.dataProcesSalud.respuestaFile = adjunto;
        }
        if ($scope.dataPqr.ESTADO == 'Activo') {
          if ($scope.configTabs.tab == 'S') {
            $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = $scope.configTimeLime.step3 = true;
            $scope.dataProcesSalud.soporteFile = adjunto;
          }
        }
        // }
        if ($scope.dataPqr.ESTADO == 'Procesado') {
          $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = $scope.configTimeLime.step3 = $scope.configTimeLime.step4 = true;
          $scope.configTabs.tab = null;
        }
      })
      pqrHttp.get_chequear_ips_medicamento($scope.dataPqr.CODIGO).then(function (res) {
        // console.clear();
        console.log(res);
        $timeout(function () {
          // console.log(res.EstadoMedicamentos);
          // console.log(res.EstadoIps);
          if (res.EstadoIps == 'S' || res.EstadoMedicamentos == 'S') {
            $scope.inactiveipssearch = false;
          }
          if (res.EstadoIps == 'N' && res.EstadoMedicamentos == 'N') {
            $scope.inactiveipssearch = true;
          }

          // if (($scope.dpqr.SOLICITUD == 'RECLAMO' || $scope.dpqr.SOLICITUD == 'QUEJA') && $scope.dpqr.DOCUMENTO != '' && res.RequiereAut == 'S') {
          //   $scope.mostrarRequiereAut = true;
          //   pqrHttp.p_consulta_aut($scope.dpqr.DOCUMENTO).then(function (res) {
          //     if (res.length > 0) {
          //       $('#modalautsafiliado').modal();
          //       console.log(res);
          //       $scope.listadoAutsAfil = res;
          //       $scope.listadoAutsAfilContador = 0;
          //       $scope.listadoAutsAfilFiltro = '';
          //     } else {
          //       $scope.listadoAutsAfil = [];
          //       swal('Mensaje', 'Afiliado sin autorizaciones procesadas para vincular.', 'error').catch(swal.noop);
          //     }
          //     setTimeout(() => { $scope.$apply(); }, 500);
          //   });
          // } else {
          //   $scope.mostrarRequiereAut = false;
          // }
        }, 100)

      })
    }

    $scope.abrirModalAutAfi = function () {
      if ($scope.listadoAutsAfil.length == 0) {
        swal('Mensaje', 'Afiliado sin autorizaciones procesadas para vincular.', 'error').catch(swal.noop);
        return;
      }
      $("#modalautsafiliado").modal("open");
    }
    $scope.closeModalAutAfi = function () {
      $("#modalautsafiliado").modal('close');
    }

    // $scope.seleccionarAut = function (x) {
    //   x.seleccionado == false ? $scope.listadoAutsAfilContador += 1 : $scope.listadoAutsAfilContador -= 1;
    //   x.seleccionado = !x.seleccionado;
    //   setTimeout(() => { $scope.$apply(); }, 500);
    // }

    $scope.clearListIps = function () {
      $timeout(function () {
        $scope.inactivebarraips = true;
        $scope.searchips = '';
        $scope.listIps = [];
        $scope.dataProcesSalud.nitips = null;
        $scope.dataProcesSalud.medicamentos = [];
      }, 100)
    }
    $scope.saveSalud = function (coment, adjunto, ext, fase, motivoNegacion, resNegacion, negacion, nitips, medicamentos) {
      // console.log(medicamentos);
      if (medicamentos == undefined) {
        medicamentos = "";
      }
      $timeout(function () {
        $scope.json = JSON.stringify({
          'pqr': $scope.dataPqr.CODIGO,
          'documento': null,
          'documento_rem': sessionStorage.getItem('cedula'),
          'comentario': coment,
          'estado': "A",
          'fase': fase,
          'extension': ext,
          'motivo_negacion': motivoNegacion,
          'area_delegada_neg': resNegacion,
          'negacion': negacion,
          'ips': nitips,
          'medicamentos': medicamentos == "" ? [] : medicamentos,
          'cantidad': medicamentos == "" ? 0 : medicamentos.length,
          'motivo_respuesta': $scope.dataProcesSalud.motivosRespuesta,
          'motivo_altocosto': $scope.dataProcesSalud.motivoAltoCosto,
          'motivo_patologia': $scope.dataProcesSalud.motivoPatologia,
          'ftp': '3',
          // 'json_auts': $scope.listadoAutsAfil.length == 0 ? [] : $scope.listadoAutsAfilSeleccionados,
          // 'json_auts_cant': $scope.listadoAutsAfil.length == 0 ? '0' : $scope.listadoAutsAfilSeleccionados.length
        });
        pqrHttp.postCrudSalud($scope.json, adjunto).then(function (res) {
          // console.log(res);
          if (res.Codigo == '0') {
            swal('No completado', res.Nombre, 'error').catch(swal.noop);
          } else {
            $scope.getProcesoSaludPQR();
            $timeout(function () {
              if (fase == 'S') {
                swal('Completado', 'Gestion del PQR N° ' + $scope.dataPqr.CODIGO + ' FINALIZADA! ', 'success').then(function (response) {
                  $scope.dataProcesSalud = {
                    gesComment: null, adjuntarFile: null, adjuntarExt: null, adjComment: null, respuestaFile: null, respuestaExt: null,
                    respuestaFinal: null, negacion: null, motivoNegacion: null, resNegacion: null, soporteFile: null, soportExt: null, fase: null, nitips: null,
                    medicamentos: [], motivosRespuesta: null, motivoAltoCosto: null, motivoPatologia: null
                  }
                  $scope.serachips = true;
                  $scope.inactivebarraips = true;
                  $scope.inactiveipssearch = false;
                  $scope.ipsmedicamento = '';
                  $scope.selectips = '';
                  $scope.inactivepro = true;
                  document.getElementById('pqrStepAdjuntarfile').value = '';
                  document.getElementById('ppqrStepRespuestafile').value = '';
                  document.getElementById('ppqrStepSoportefile').value = '';
                  $scope.formatearSoporte = '';
                  $scope.formatearRespuesta = '';
                  $scope.formateaar = '';
                  $scope.closeThisDialog({ data: 0 });
                }).catch(swal.noop);
              }
            }, 100);

          }

        })
        // pqrHttp.postCrudSalud($scope.dataPqr.CODIGO, null, coment, 'A', adjunto, ext, fase, motivoNegacion, resNegacion, negacion, nitips, JSON.stringify(medicamentos), medicamentos.length).then(function (res) {

        //     if (res.Codigo == '0') {
        //         swal('No completado', res.Nombre, 'error').catch(swal.noop);
        //     } else {
        //         $timeout(function () {
        //             if (fase == 'S') {
        //                 $scope.getProcesoSaludPQR();
        //                 swal('Completado', 'Gestion del PQR N° ' + $scope.dataPqr.CODIGO + ' FINALIZADA! ', 'success').then(function (response) {
        //                     $scope.dataProcesSalud = {
        //                         gesComment: null, adjuntarFile: null, adjuntarExt: null, adjComment: null, respuestaFile: null, respuestaExt: null,
        //                         respuestaFinal: null, negacion: null, motivoNegacion: null, resNegacion: null, soporteFile: null, soportExt: null, fase: null, nitips: null,
        //                         medicamentos: []
        //                     }
        //                     $scope.serachips = true;
        //                     $scope.inactivebarraips = true;
        //                     $scope.inactiveipssearch = false;
        //                     $scope.ipsmedicamento = '';
        //                     $scope.selectips = '';
        //                     $scope.inactivepro = true;
        //                     document.getElementById('pqrStepAdjuntarfile').value = '';
        //                     document.getElementById('ppqrStepRespuestafile').value = '';
        //                     document.getElementById('ppqrStepSoportefile').value = '';
        //                     $scope.formatearSoporte = '';
        //                     $scope.formatearRespuesta = '';
        //                     $scope.formateaar = '';
        //                     $scope.closeThisDialog({ data: 0 });
        //                 }).catch(swal.noop);
        //             }
        //         }, 100);

        //     }

        // })
      }, 100)
      // console.log($scope.dataProcesSalud);



    }
    $scope.descargafile = function (ruta, ftp) {
      pqrHttp.dowloadfile(ruta, ftp).then(function (response) {
        window.open("temp/" + response.data);
      });
    }

    $scope.approve = function () {
      swal({
        title: 'Confirmar Proceso',
        text: '¿Deseas negar la PQR N°' + $scope.dataPqr.CODIGO + '?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then(function () {
        $timeout(function () {
          $scope.dataProcesSalud.negacion = "S";
        }, 100);
      }).catch(function () {
        $timeout(function () {
          $scope.dataProcesSalud.negacion = "N";
        }, 100);
      });
    }

    $scope.pasteG = function (e) {
      const input = document.getElementById('textareaG');
      var valor = input.value;
      valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
      valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
      input.value = valor.toString().toUpperCase();
    }
    $scope.pasteA = function (e) {
      const input = document.getElementById('textareaD');
      var valor = input.value;
      valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
      valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
      input.value = valor.toString().toUpperCase();
    }
    $scope.pasteR = function (e) {
      const input = document.getElementById('textareaR');
      var valor = input.value;
      valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
      valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
      input.value = valor.toString().toUpperCase();
    }
    /*$scope.pasteG = function (e) {
        swal({
            type: 'error',
            title: 'No completado',
            text: 'No puedes pegar en este campo!',
            timer: 1000
        }).catch(swal.noop);
        e.preventDefault();
        return false
    }
    $scope.pasteA = function (e) {
        swal({
            type: 'error',
            title: 'No completado',
            text: 'No puedes pegar en este campo!',
            timer: 1000
        }).catch(swal.noop);
        e.preventDefault();
        return false
    }
    $scope.pasteR = function (e) {
        swal({
            type: 'error',
            title: 'No completado',
            text: 'No puedes pegar en este campo!',
            timer: 1000
        }).catch(swal.noop);
        e.preventDefault();
        return false
    }*/

    $scope.buscarIps = function (params) {
      $scope.inactivebarraips = false;

      pqrHttp.get_Ips(params).then(function (response) {
        // console.log(response);
        $scope.listIps = response;
      });
    }

    $scope.seleccionarips = function (params) {
      $scope.selectips = params;
      $scope.dataProcesSalud.nitips = params.Codigo;
      $scope.inactiveipssearch = true;
      $scope.inactivebarraips = true;
      pqrHttp.get_chequear_ips_medicamento($scope.dataPqr.CODIGO).then(function (res) {
        // console.log(res);
        console.log(569);
        if ($scope.inactiveipssearch == true) {
          // console.log(res);

          $timeout(function () {
            $scope.ipsmedicamento = res;
            $scope.inactiveipssearch = true;
            // console.log($scope.ipsmedicamento.EstadoMedicamentos);
          }, 100);
        } else {
          if ($scope.ipsmedicamento.EstadoMedicamentos == 'N' && $scope.selectips == '' && $scope.inactivebarraips == true) {
            $scope.serachips = true;
            $scope.configTabs.tab = 'G';
            $scope.configTimeLime.step1 = $scope.configTimeLime.step2 = $scope.configTimeLime.step3 = $scope.configTimeLime.step4 = false;
          } else {
            swal('No completado', 'Por favor seleccione la IPS asociada con la PQR!', 'error').catch(swal.noop);
          }
        }

      })

    }
    $scope.checkMedicamento = function (index, checked) {
      if (checked == false) {
        var tempIndex = $scope.getPosition($scope.dataProcesSalud.medicamentos, $scope.listMedicamentos[index]);
        $scope.dataProcesSalud.medicamentos[tempIndex] = null;


      } else if (checked == true) {
        $scope.dataProcesSalud.medicamentos.push($scope.listMedicamentos[index]);
      }
      $scope.dataProcesSalud.medicamentos = $scope.removePositionNull($scope.dataProcesSalud.medicamentos);
    }
    $scope.removeMedicamento = function (index) {
      $scope.dataProcesSalud.medicamentos.splice(index, 1);
    }
    $scope.removePositionNull = function (array) {
      var filtered = array.filter(function (el) {
        return el != null;
      });
      return filtered;
    }

    $scope.getPosition = function (array, param) {
      for (let index = 0; index < array.length; index++) {
        if (array[index] == param) {
          return index;
        }
      }
    }
    $scope.findProducto = function (find) {
      if (find != undefined) {
        if (find.length > 4) {
          pqrHttp.get_Productos(find).then(function (response) {
            // console.log(response);

            if (response["0"].CODIGO != "0" && response["0"].CODIGO != "-1") {
              $scope.listMedicamentos = response;
              $scope.inactivepro = false;
            } else {
              if (find.length == undefined) {
                $scope.inactivepro = true;
                $scope.listProductos = [];
              } else {
                $scope.inactivepro = true;
                $scope.listMedicamentos = [];
              }
            }
          })
        } else {
          $scope.listMedicamentos = [];
        }
      } else {
        $scope.inactivepro = true;
      }
    }

    $scope.disabledmotpatologia = false;
    $scope.changeAltoCosto = function (params) {
      // console.log(params);
      if (params == '999') {
        $scope.dataProcesSalud.motivoPatologia = '16';
        $scope.disabledmotpatologia = true;
      } else {
        $scope.dataProcesSalud.motivoPatologia = '';
        $scope.disabledmotpatologia = false;
      }
    }


    $scope.setTab = function (x) {
      $scope.tabs = x;
      setTimeout(() => {
        $scope.$apply();
      }, 500);
    }

    $scope.cargarComentarioPQR = function () {
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: { function: 'obtenerComentariosPQR', pqr: $scope.dataPqr.CODIGO }
      }).then(function ({ data }) {
        $scope.comentariosPQR = data;
        // $scope.tabs = 1;
        // setTimeout(() => {
        //   $('.tabs').tabs();
        // }, 700);
      })
    }
    $scope.cargarComentarioPQR();

    $scope.cargarServiciosPQR = function (x) {
      $scope.limpiarProductosPQR();
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: { function: 'p_lista_productos_pqr', pqr: $scope.dataPqr.CODIGO }
      }).then(function ({ data }) {
        $scope.listServiciosModal = data;

        $scope.pqrServiciosModal.status = 0;
        if (x) {
          setTimeout(() => {
            $('#Sol').click();
          }, 500);
        }
      })
    }
    $scope.limpiarProductosPQR = function () {
      $scope.pqrServiciosModal = {
        status: 0,
        producto: '',
        subclase: '',
        productoNombre: '',
        subclaseNombre: '',

        numeroAut: '',
        numeroUbi: '',

        marcaPGP: '',

        requiereAut: '',

      }
      $scope.listServiciosModal = [];
    }
    $scope.cargarServiciosPQR(1);

    $scope.editarProductosPQR = function (x) {
      $scope.SysDay = new Date();
      console.log(x);
      // if (x.REQ_AUTORIZACION_RAD == 'S') {
      //   swal("Mensaje", 'No es posible modificar', "warning").catch(swal.noop);
      //   return
      // }
      $scope.pqrServiciosModal.status = '1';

      $scope.pqrServiciosModal.producto = x.PROD_CODIGO;
      $scope.pqrServiciosModal.subclase = x.COD_SUBCLASIFICACION;
      $scope.pqrServiciosModal.productoNombre = x.PROC_NOMBRE;
      $scope.pqrServiciosModal.subclaseNombre = x.SUBCLASIFICACION;

      $scope.pqrServiciosModal.numeroAut = x.AUTN_NUMERO == null ? '' : x.AUTN_NUMERO;
      $scope.pqrServiciosModal.numeroUbi = x.AUTN_UBICACION == null ? '' : x.AUTN_UBICACION;

      $scope.pqrServiciosModal.marcaPGP = x.SERV_PGP;

      $scope.pqrServiciosModal.requiereAut = x.REQ_AUTORIZACION_GEST != null ? x.REQ_AUTORIZACION_GEST : x.REQ_AUTORIZACION_RAD;
    }
    $scope.cancelarServicioModal = function () {
      $scope.pqrServiciosModal.status = 0;
      setTimeout(() => { $scope.$apply(); }, 500);
    }
    $scope.changeRequiereAut = function () {
      if ($scope.pqrServiciosModal.requiereAut == 'S') {
        $scope.pqrServiciosModal.marcaPGP = 'N';
      }
      if ($scope.pqrServiciosModal.requiereAut == 'N') {
        $scope.pqrServiciosModal.numeroAut = '';
        $scope.pqrServiciosModal.numeroUbi = '';
      }
    }

    $scope.guardarServicioModal = function () {
      if ($scope.pqrServiciosModal.requiereAut == 'S' && ($scope.pqrServiciosModal.numeroAut == '' || $scope.pqrServiciosModal.numeroUbi == '')) {
        swal("Mensaje", 'Debe diligenciar los campos autorización', "info").catch(swal.noop);
        return
      }

      var data = [{
        CODIGO: $scope.pqrServiciosModal.producto,
        CODIGO_SUBCLASE: $scope.pqrServiciosModal.subclase,

        REQ_AUT_GEST: $scope.pqrServiciosModal.requiereAut,
        NUM_AUT: ($scope.pqrServiciosModal.requiereAut == 'N' || $scope.pqrServiciosModal.marcaPGP == 'S') ? '' : $scope.pqrServiciosModal.numeroAut,
        UBI_AUT: ($scope.pqrServiciosModal.requiereAut == 'N' || $scope.pqrServiciosModal.marcaPGP == 'S') ? '' : $scope.pqrServiciosModal.numeroUbi,
        SERV_PGP: $scope.pqrServiciosModal.marcaPGP,
      }]
      console.log(data);

      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: {
          function: "p_insertar_productos_pqr",
          productos: JSON.stringify(data),
          cantidad: data.length,
          numeroPQR: $scope.dataPqr.CODIGO,
          responsable: $scope.cedulausuario,
          gestion: 'U'
        }
      }).then(function ({ data }) {
        console.log(data)
        if (data && data.toString().substr(0, 3) != '<br') {
          if (data.Codigo == 0) {
            swal("Mensaje", data.Nombre, "success").catch(swal.noop);
            // $scope.pqrServiciosModal.status = 0;
            $scope.cargarServiciosPQR();
            setTimeout(() => { $scope.$apply(); }, 500);
          } else {
            swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
          }
        } else {
          swal("Mensaje", data, "warning").catch(swal.noop);
        }
      })
    }

    $scope.getTextSiNo = function (text) {
      return text == 'S' ? 'SI' : 'NO'
    }

    $scope.bajarArchivo = function (ruta) {
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/siau/pqr/Rpqr.php",
        data: { function: 'bajarArchivo', ruta: ruta }
      }).then(function (response) {
        swal.close();
        window.open("temp/" + response.data);
      });
    }

    $scope.guardarGestionNuevaIps = function () {
      if ($scope.opcionIps.comentarioNuevoIps == '') {
        swal("Mensaje", "Debe digitar un comentario", "warning").catch(swal.noop);
        return
      }

      $scope.saveSalud($scope.opcionIps.comentarioNuevoIps, null, null, 'A')
    }


    $scope.$watch('showDataPQR', function () {
      if ($scope.showDataPQR == false) {
        $scope.tabs = 1;
        setTimeout(() => {
          $('.tabs').tabs();
        }, 700);
      }
    });

    $scope.tabs = 1;
    setTimeout(() => {
      $('.tabs').tabs();
    }, 700);


  }])
  .directive("selectFilesSalud", function ($timeout) {
    return {
      require: "ngModel",
      link: function postLink($scope, elem, attrs, ngModel) {
        elem.on("change", function (e) {
          var files = elem[0].files;
          $scope.somefunction = function (files) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
              $scope.fileBase64 = event.target.result; //Asigna el file al ng-model pqrFile
              $scope.fileBasExt = files[0].name.split('.').pop().toLowerCase();//Asigna la extension del pqrFile
            };
            reader.onerror = function (error) {
              // console.log('Error: ', error);
            };
          }
          switch (attrs.id) {
            case 'pqrStepAdjuntarfile':
              if (files.length > 0) {
                // if (files[0].name.split('.').pop().toLowerCase() in { 'docx': 'docx', 'doc': 'doc' }) {
                if (files[0].size > 7340032) {
                  $timeout(function () {
                    $scope.formateaar = 'El archivo excede el peso limite (7MB)';
                    $scope.requireAdjuntar = true;
                  }, 100)
                } else {
                  $scope.somefunction(files);
                  setTimeout(() => {
                    $scope.dataProcesSalud.adjuntarFile = $scope.fileBase64;
                    $scope.dataProcesSalud.adjuntarExt = $scope.fileBasExt;
                  }, 100);
                  $timeout(function () {
                    $scope.formateaar = 'Dentro Del Peso Limite y Formato Validado';
                    $scope.requireAdjuntar = false;
                  }, 100)
                }
                // } else {
                //     $timeout(function () {
                //         $scope.formateaar = 'Formato Invalido solo puedes adjuntar archivos con extensión .doc(x)';
                //         $scope.dataProcesSalud.adjuntarFile = null;
                //         $scope.requireAdjuntar = true;
                //     }, 100)
                // }
              } else {
                $timeout(function () {
                  $scope.fileBase64 = null; $scope.fileBasExt = null; $scope.requireAdjuntar = false;
                  $scope.dataProcesSalud.adjuntarFile = $scope.dataProcesSalud.adjuntarExt = null;
                  $scope.rqAjComment = false; $scope.formateaar = null;
                }, 100)
              }
              break;
            case 'pqrStepRespuestafile':

              if (files.length > 0) {
                if (files[0].name.split('.').pop().toLowerCase() == 'pdf') {
                  if (files[0].size > 7340032) {
                    $timeout(function () {
                      $scope.formatearRespuesta = 'El archivo excede el peso limite (7MB)';
                      $scope.requireRespuesta = true;
                      $scope.dataProcesSalud.respuestaFile == null;
                    }, 100)
                  } else {
                    $scope.somefunction(files);
                    $timeout(function () {
                      $scope.dataProcesSalud.respuestaFile = $scope.fileBase64;
                      $scope.dataProcesSalud.respuestaExt = $scope.fileBasExt;
                    }, 100);
                    $timeout(function () {
                      $scope.formatearRespuesta = 'Dentro Del Peso Limite y Formato Validado';
                      $scope.requireRespuesta = false;
                    }, 100)
                  }
                } else {
                  $timeout(function () {
                    $scope.formatearRespuesta = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
                    $scope.requireRespuesta = true;
                    $scope.dataProcesSalud.respuestaFile == null;
                  }, 100)
                }
              } else {
                $timeout(function () {
                  $scope.fileBase64 = null; $scope.fileBasExt = null; $scope.requireAdjuntar = false;
                  $scope.dataProcesSalud.respuestaFile = $scope.dataProcesSalud.respuestaExt = null;
                  $scope.formatearRespuesta = null; $scope.requireRespuesta = false;
                }, 100)
              }
              break;
            case 'pqrStepSoportefile':
              if (files.length > 0) {
                if (files[0].name.split('.').pop().toLowerCase() == 'pdf') {
                  if (files[0].size > 7340032) {
                    $timeout(function () {
                      $scope.formatearSoporte = 'El archivo excede el peso limite (7MB)';
                      $scope.requireSoporte = true;
                      $scope.dataProcesSalud.soporteFile = null;
                      $scope.dataProcesSalud.soportExt = null;
                    }, 100)
                  } else {
                    $scope.somefunction(files);
                    setTimeout(() => {
                      $scope.dataProcesSalud.soporteFile = $scope.fileBase64;
                      $scope.dataProcesSalud.soportExt = $scope.fileBasExt;
                    }, 100);
                    $timeout(function () {
                      $scope.formatearSoporte = 'Dentro Del Peso Limite y Formato Validado';
                      $scope.requireSoporte = false;
                    }, 100)
                  }
                } else {
                  $timeout(function () {
                    $scope.formatearSoporte = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
                    $scope.requireSoporte = true;
                    $scope.dataProcesSalud.soporteFile = null;
                    $scope.dataProcesSalud.soportExt = null;
                  }, 100)
                }
              } else {
                $timeout(function () {
                  $scope.fileBase64 = null; $scope.fileBasExt = null;
                  $scope.dataProcesSalud.soporteFile = $scope.dataProcesSalud.soportExt = null;
                  $scope.formatearSoporte = null; $scope.requireSoporte = false;
                }, 100)
              }
              break;
            case 'answerFile':
              if (files.length > 0) {
                $scope.somefunction(files);
                $timeout(function () {
                  $scope.tempFileAnswer = files[0].name;
                  $scope.fileAnswer = $scope.fileBase64;
                  $scope.fileAnswerExt = $scope.fileBasExt;
                }, 100);
              } else {
                $scope.fileAnswer = null;
                $scope.tempFileAnswer = null;
                $scope.fileAnswerExt = null;
              }
              break;
          }
        })

      }
    }
  });

