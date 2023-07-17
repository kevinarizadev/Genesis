'use strict';
angular.module('GenesisApp')
.controller('RevisionDigitalizacionController', ['$scope', 'notification', '$rootScope', '$http', 'ngDialog', 'digitalizacionHTTP', 'afiliacionHttp',
   function ($scope, notification, $rootScope, $http, ngDialog, digitalizacionHTTP, afiliacionHttp) {
      $.getJSON("php/obtenersession.php")
      .done(function (respuesta) {
         $scope.ubicacion = respuesta.codmunicipio;
               //$scope.ValidoFuncionario(); 
            })
      .fail(function (jqXHR, textStatus, errorThrown) {
         console.log("Error obteniendo session variables");
      });

      $scope.init = function () {
         $scope.tabI = false;
         $scope.tabII = false;
         $scope.activeI = 'none';
         $scope.activeII = 'none';
      }
      $scope.setTab = function (opcion) {
         $scope.init();
         switch (opcion) {
            case 1:
            $scope.tabI = true;
            $scope.tabII = false;
            $scope.activeI = 'active final';
            $scope.activeII = 'none';
            break;
            case 2:
            $scope.tabI = false;
            $scope.tabII = true;
            $scope.activeI = 'none';
            $scope.activeII = 'active final';
                  //$scope.ciudad = '8001';
                  $scope.DocumentoTipo();
                  break;
                  default:
               }
            }

            $scope.setTab(1);

            $scope.InformacionSinDeclaracion = true;
            $scope.ActivarDeclaracionDeSalud = false;

            $scope.MostrarArchivo = true;

            $scope.InformacionDeBolsa = true;
            $scope.ConsultarInformacion = false;
            $scope.Habilitar = true;
         //Departamento y Municipio
         $scope.DeptMunCantidad = true;  //Div
         $scope.VisualizacionDepartamento = true;
         $scope.VisualizacionMunicipio = true;
         $scope.VisualizacionGrupoTipo = true;
         //Div Nuevo o Antiguo 
         $scope.ProcesoNuevo = false;
         $scope.ProcesoAntiguo = true;
         //Div Grupo o Tipo
         $scope.Grupo = true;
         $scope.TipoDoc = true;
         //Swich Antiguo o Nuevo
         // CNVU DECLARO VARIABLES
         $scope.TablaDeInformacion = false;
         $scope.EditarDeInformacion = true;
         $scope.Ocultar = true;

         $scope.CargarPregunta = function () {
            $http({
               method: 'POST',
               url: "php/consultaAfiliados/funcdeclaracion.php",
               data: { function: 'cargapreguntas' }
            }).then(function (response) {
               $scope.Preguntas = response.data;
            });
         }

         $scope.Obtener_Tipos_Documentos = function () {
            $http({
              method: 'POST',
              url: "php/genesis/funcgenesis.php",
              data: {
                function: 'Obtener_Tipos_Documentos',
                Tipo: 'S'
              }
            }).then(function (response) {
              if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.Tipos_Documentos = response.data;
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data,
                  type: "warning"
                }).catch(swal.noop);
              }
            });
            }
         $scope.Obtener_Tipos_Documentos();

         $scope.ValidaDeclaracion = function (data) {
            $http({
               method: 'POST',
               url: "php/digitalizacion/funcdigitalizacion.php",
               data: { function: 'ValidaDeclaracion', tipo: data.tipo_documento, documento: data.documento }
            }).then(function (response) {
               $scope.res = response.data;
               if ($scope.res.codigo == '1') {
                  $scope.OcultarDS = false;
               } else {
                  $scope.palabra = $scope.res.mensaje;
                  $scope.OcultarDS = true;

               }

            });
         }


         $scope.Cambiar = function () {
            if ($scope.InformacionSinDeclaracion == true) {
               $scope.CargarPregunta();
               $scope.InformacionSinDeclaracion = false;
            } else {
               $scope.InformacionSinDeclaracion = true;
            }
         }



         $scope.zoom = function () {
            $("#gear").mlens({
               imgSrc2x: $("#gear").attr("data-big2x"),  // path of the hi-res @2x version of the image
               lensShape: "square",                // shape of the lens (circle/square)
               lensSize: ["20%", "10%"],            // lens dimensions (in px or in % with respect to image dimensions)
               borderSize: 1,                  // size of the lens border (in px)
               borderColor: "red",            // color of the lens border (#hex)
               borderRadius: 0,                // border radius (optional, only if the shape is square)      
               overlayAdapt: true,    // true if the overlay image has to adapt to the lens size (boolean)
               zoomLevel: 1,          // zoom level multiplicator (number)
               responsive: true       // true if mlens has to be responsive (boolean)
            });

         }

         $scope.NegarDocumento = function (name, ruta) {
            digitalizacionHTTP.listado_rechazo().then(function (response) {
               $scope.proceso = response;
               $scope.array = {};
               for (var i = 0; i < $scope.proceso.length; i++) {
                  var key = $scope.proceso[i].codigo;
                  var val = $scope.proceso[i].nombre;
                  $scope.array[key] = val;
               }
               swal({
                  title: 'Seleccionar Proceso',
                  input: 'select',
                  inputOptions: $scope.array,
                  inputPlaceholder: 'Seleccionar',
                  showCancelButton: true,
               }).then((result) => {
                  if (result) {
                     var estado = 'R';
                     digitalizacionHTTP.actualizaanexos(ruta, estado, result).then(function (response) {
                        $scope.res = response;
                        for (var i = 0; i < $scope.AnexosDocumentos.length; i++) {
                           if (name == $scope.AnexosDocumentos[i].nombre) {
                              $scope.pos = i;
                              break;
                           }
                        }
                        $scope.AnexosDocumentos.splice($scope.pos, 1);
                        $scope.MostrarArchivo = true;
                        if ($scope.AnexosDocumentos.length == '0') {
                           swal('Correctamente', $scope.res.mensaje, 'success').then((result) => {
                              if (result) {
                                 $scope.munxcantidad = [];
                                 if ($scope.tipo == '' || $scope.tipo == undefined) {
                                    digitalizacionHTTP.munXgrupo($scope.ubicacion, $scope.grupo).then(function (response) {
                                       $scope.munxcantidad = response;
                                       if ($scope.munxcantidad.length == '0') {
                                          if ($scope.tipo_busqueda == 'A') {
                                             swal({
                                                title: 'Confirmar',
                                                text: '¿Desea seguir consultado?',
                                                type: 'info',
                                                showCancelButton: true,
                                                allowEscapeKey: false,
                                                allowOutsideClick: false,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Consultar',
                                                cancelButtonText: 'Regresar'
                                             }).then(function () {
                                                if ($scope.tipo_busqueda == 'A') {
                                                   $scope.ConsultarBolsaAntigua('A');
                                                } else {
                                                   $scope.ConsultarBolsa();
                                                }
                                             }, function (dismiss) {
                                                if (dismiss === 'cancel') {
                                                   if ($scope.tipo_busqueda == 'A') {
                                                      $scope.HabilitarInformacion();
                                                      $scope.InformacionDeBolsa = true;
                                                      $scope.ConsultarInformacion = false;
                                                      $scope.$apply();
                                                   } else {
                                                      $scope.Atras();
                                                   }
                                                }
                                             })
                                          } else if ($scope.tipo_busqueda == 'S') {
                                             swal({
                                                title: 'Confirmar',
                                                text: '¿Desea seguir consultado?',
                                                type: 'info',
                                                showCancelButton: true,
                                                allowEscapeKey: false,
                                                allowOutsideClick: false,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Consultar',
                                                cancelButtonText: 'Regresar'
                                             }).then(function () {
                                                $scope.ConsultarBolsa();
                                             }, function (dismiss) {
                                                if (dismiss === 'cancel') {
                                                   $scope.ConsultarInformacion = true;
                                                   digitalizacionHTTP.cantidadXmun($scope.ubicacion).then(function (response) {
                                                      $scope.munxcantidad = response;
                                                      $scope.DeptMunCantidad = false;
                                                      $scope.VisualizacionDepartamento = false;
                                                      $scope.VisualizacionMunicipio = false;
                                                      $scope.grupo = '';
                                                      $scope.InformacionDeBolsa = true;
                                                      $scope.tipo_busqueda = 'S';
                                                      $scope.title = 'Municipio';
                                                   })
                                                }
                                             })
                                          } else {
                                             $scope.VisualizacionDepartamento = true;
                                             $scope.VisualizacionMunicipio = true;
                                             $scope.DeptMunCantidad = true;
                                             $scope.ConsultarInformacion = false;
                                             $scope.InformacionDeBolsa = true;
                                             //$scope.Grupo=true;
                                             $scope.HabilitarInformacion();
                                             $scope.GrupoPe = '';
                                          }
                                       } else {
                                          swal({
                                             title: 'Confirmar',
                                             text: '¿Desea seguir consultado?',
                                             type: 'info',
                                             showCancelButton: true,
                                             allowEscapeKey: false,
                                             allowOutsideClick: false,
                                             confirmButtonColor: '#3085d6',
                                             cancelButtonColor: '#d33',
                                             confirmButtonText: 'Consultar',
                                             cancelButtonText: 'Regresar'
                                          }).then(function () {
                                             if ($scope.tipo_busqueda == 'A') {
                                                $scope.ConsultarBolsaAntigua();
                                             } else {
                                                $scope.ConsultarBolsa();
                                             }
                                          }, function (dismiss) {
                                             if (dismiss === 'cancel') {
                                                if ($scope.tipo_busqueda == 'A') {
                                                   $scope.HabilitarInformacion();
                                                   $scope.InformacionDeBolsa = true;
                                                   $scope.ConsultarInformacion = false;
                                                   $scope.$apply();
                                                } else {
                                                   $scope.Atras();
                                                }
                                             }
                                          })
                                       }
                                    })

} else {
   digitalizacionHTTP.munXtipo($scope.ubicacion, $scope.tipo).then(function (response) {
      $scope.munxcantidad = response;
      if ($scope.munxcantidad.length == '0') {
         $scope.VisualizacionDepartamento = true;
         $scope.VisualizacionMunicipio = true;
         $scope.DeptMunCantidad = true;
         $scope.ConsultarInformacion = false;
         $scope.InformacionDeBolsa = true;
                                          //$scope.TipoDoc=true;
                                          $scope.HabilitarInformacion();
                                          $scope.Documental = '';
                                       } else {
                                          swal({
                                             title: 'Confirmar',
                                             text: '¿Desea seguir consultado?',
                                             type: 'info',
                                             showCancelButton: true,
                                             allowEscapeKey: false,
                                             allowOutsideClick: false,
                                             confirmButtonColor: '#3085d6',
                                             cancelButtonColor: '#d33',
                                             confirmButtonText: 'Consultar',
                                             cancelButtonText: 'Regresar'
                                          }).then(function () {
                                             $scope.ConsultarBolsa();
                                          }, function (dismiss) {
                                             if (dismiss === 'cancel') {
                                                if ($scope.tipo_busqueda == 'A') {
                                                   $scope.HabilitarInformacion();
                                                   $scope.InformacionDeBolsa = true;
                                                   $scope.ConsultarInformacion = false;
                                                   $scope.$apply();
                                                } else {
                                                   $scope.Atras();
                                                }
                                             }
                                          })
                                       }
                                    })
}
}
})
} else {
   swal('Correctamente', $scope.res.mensaje, 'success');
}
})
}
})
})
}

$scope.HabilitarInformacion = function () {
   if ($scope.Habilitar == true) {
      $scope.Habilitar = true;
      $scope.ProcesoNuevo = false;
      $scope.ProcesoAntiguo = true;
               // Los Select De Las Consulta De Los Tipo  o Grupo
               $scope.TipoDoc = true;
               $scope.Grupo = true;
               //Marco Que Los Checbok Esten Desmarcado
               $scope.CheGrupo = false;
               $scope.CheTipo = false;
               $scope.Documental = '';
            } else {
               $scope.Habilitar = false;
               $scope.ProcesoNuevo = true;
               $scope.ProcesoAntiguo = false;
               //Oculto Div 
               $scope.DeptMunCantidad = true;
               $scope.DocumentalAntiguo = "SELECCIONAR";
               $scope.ConsultarTipoDocumentoAntiguo();
            }
         }
         //Chebox Grupo y Tipo
         $scope.Consultar = function (id, estado) {
            $scope.tipo_busqueda = id;
            //Para Marcar Checbox De Grupo
            if (id == 'G' && estado == true) {
               $scope.CheGrupo = true;
               $scope.CheTipo = false;
               $scope.GrupoCheckbox = false;
               $scope.Grupo = false;
               $scope.TipoDoc = true;
               $scope.DeptMunCantidad = true;
               //$scope.Documental = '';
               $scope.GrupoPe = '';
               //Tipo Documental
               swal({ title: 'Cargando Grupo', allowEscapeKey: false, allowOutsideClick: false });
               swal.showLoading();
               digitalizacionHTTP.obtenergrupopendiente().then(function (response) {
                  $scope.grupopediente = response;
                  swal.close();
               })
            }
            //Para Marcar Checbox De Tipo
            else if (id == 'T' && estado == true) {
               //Tipo Documental
               swal({ title: 'Cargando Tipo Documentos', allowEscapeKey: false, allowOutsideClick: false });
               swal.showLoading();
               digitalizacionHTTP.obtenertipodocumentalpendiente().then(function (response) {
                  $scope.tipodocumental = response;
                  swal.close();
               })
               $scope.CheGrupo = false;
               $scope.CheTipo = true;
               $scope.TipoCheckbox = false;
               $scope.Grupo = true;
               $scope.TipoDoc = false;
               $scope.DeptMunCantidad = true;
               $scope.Documental = '';

            }
            //Para Desmarcar Checbox De Grupo
            else if (id == 'G' && estado == false) {
               $scope.CheGrupo = false;
               $scope.CheTipo = false;
               $scope.GrupoCheckbox = true;
               $scope.Grupo = true;
               $scope.TipoDoc = true;
               $scope.GrupoPe = '';
            }
            //Para Desmarcar Checbox De Tipo
            else if (id == 'T' && estado == false) {
               $scope.CheGrupo = false;
               $scope.CheTipo = false;
               $scope.TipoCheckbox = true;
               $scope.Grupo = true;
               $scope.TipoDoc = true;
               $scope.DeptMunCantidad = true;
               $scope.Documental = '';

            }
         }
         //Consulta Para Busca Los Depto X Tipo
         $scope.BuscarXDepto = function (tipo) {
            if (tipo == undefined) {
               tipo = $scope.tipo;
            } else {
               $scope.tipo = tipo;
            }
            swal({ title: 'Cargando información De Los Departamentos', allowEscapeKey: false, allowOutsideClick: false });
            swal.showLoading();
            setTimeout(function () {
               digitalizacionHTTP.deptoXtipo($scope.tipo).then(function (response) {
                  $scope.dptxcantidad = response;
                  if ($scope.dptxcantidad.length == '0') {
                     $scope.DeptMunCantidad = true;
                     swal.close();
                     swal('Informacion', 'No Hay Datos', 'info');
                  } else {
                     $scope.title = 'Departamento';
                     $scope.VisualizacionDepartamento = false;
                     $scope.VisualizacionMunicipio = true;
                     $scope.VisualizacionGrupoTipo = true;
                     $scope.DeptMunCantidad = false;
                     swal.close();
                  }

               })
            }, 1000);
         }
         //Consulta Para Busca Los Depto X Grupo
         $scope.BuscarXDeptoGrupo = function (grupo) {
            if (grupo == undefined) {
               grupo = $scope.grupo;
            } else {
               $scope.grupo = grupo;
            }
            swal({ title: 'Cargando información De Los Departamentos', allowEscapeKey: false, allowOutsideClick: false });
            swal.showLoading();
            setTimeout(function () {
               digitalizacionHTTP.obtenerdptoXGrupo($scope.grupo).then(function (response) {
                  $scope.dptxcantidad = response;
                  if ($scope.dptxcantidad.length == '0') {
                     $scope.DeptMunCantidad = true;
                     swal.close();
                     swal('Informacion', 'No Hay Datos', 'info');
                  } else {
                     $scope.title = 'Departamento';
                     $scope.VisualizacionDepartamento = false;
                     $scope.VisualizacionMunicipio = true;
                     $scope.VisualizacionGrupoTipo = true;
                     $scope.DeptMunCantidad = false;
                     swal.close();
                  }

               })
            }, 1000);
         }
         $scope.VerMunicipio = function (ubicacion) {
            if (ubicacion == undefined) {
               ubicacion = $scope.ubicacion;
            } else {
               $scope.ubicacion = ubicacion;
            }
            swal({ title: 'Cargando información De Los Municipio', allowEscapeKey: false, allowOutsideClick: false });
            swal.showLoading();

            if ($scope.tipo == '' || $scope.tipo == undefined) {
               digitalizacionHTTP.munXgrupo($scope.ubicacion, $scope.grupo).then(function (response) {
                  $scope.munxcantidad = response;
                  $scope.VisualizacionDepartamento = true;
                  $scope.VisualizacionMunicipio = false;
                  $scope.VisualizacionGrupoTipo = true;
                  $scope.title = 'Municipio';
                  swal.close();
               });
            } else {
               digitalizacionHTTP.munXtipo($scope.ubicacion, $scope.tipo).then(function (response) {
                  $scope.munxcantidad = response;
                  $scope.VisualizacionDepartamento = true;
                  $scope.VisualizacionMunicipio = false;
                  $scope.VisualizacionGrupoTipo = true;
                  $scope.title = 'Municipio';
                  swal.close();
               });
            }
         }

         //Consultar Me Trae Informacion Del Afiliado A Revisar
         $scope.ConsultarBolsa = function (dpto) {
            if (dpto == undefined) {
               dpto = $scope.dpto;
            } else {
               $scope.dpto = dpto;
            }
            swal({ title: 'Cargando Información Del Afiliado', allowEscapeKey: false, allowOutsideClick: false });
            swal.showLoading();
            if ($scope.tipo == undefined) {
               digitalizacionHTTP.obtenerinforevision($scope.tipo_busqueda, $scope.dpto, $scope.grupo).then(function (response) {
                  $scope.mensaje = response.mensaje;
                  if ($scope.mensaje.codigo == '1') {
                     swal.close();
                     swal('Correctamente', $scope.mensaje.mensaje, 'error').then((result) => {
                        if (result) { $scope.Atras(); }
                     })
                  } else {
                     $scope.informacion = response.info_afiliado;
                     if (response.archivos.length == '1') {
                        $scope.AnexosDocumentos = response.archivos;
                        $scope.RutaDoc = response.archivos['0'].ruta;
                        $scope.FTP = response.archivos['0'].ftp;
                        $scope.VisualizacionAnexos($scope.RutaDoc, $scope.FTP);
                        if ($scope.tipo == '21') {
                           $scope.ActivarDeclaracionDeSalud = true;
                           $scope.ValidaDeclaracion($scope.informacion);
                        }
                     } else {
                        $scope.AnexosDocumentos = response.archivos;
                     }
                     $scope.InformacionDeBolsa = false;
                     $scope.ConsultarInformacion = true;
                     $scope.DeptMunCantidad = true;
                     swal.close();
                  }
               })
            } else {
               digitalizacionHTTP.obtenerinforevision($scope.tipo_busqueda, $scope.dpto, $scope.tipo).then(function (response) {
                  $scope.mensaje = response.mensaje;
                  if ($scope.mensaje.codigo == '1') {
                     swal.close();
                     swal('Correctamente', $scope.mensaje.mensaje, 'error').then((result) => {
                        if (result) {
                           $scope.Atras();
                        }
                     })
                  } else {
                     $scope.informacion = response.info_afiliado;
                     $scope.type_doc_decl = response.info_afiliado.tipo_documento;
                     $scope.doc_decl = response.info_afiliado.documento;
                     if (response.archivos.length == '1') {
                        $scope.AnexosDocumentos = response.archivos;
                        $scope.RutaDoc = response.archivos['0'].ruta;
                        $scope.FTP = response.archivos['0'].ftp;
                        $scope.VisualizacionAnexos($scope.RutaDoc, $scope.FTP);
                        if (response.archivos['0'].tipo_documental == '21') {
                           $scope.ActivarDeclaracionDeSalud = true;
                           $scope.ValidaDeclaracion($scope.informacion);
                        }
                     } else {
                        $scope.AnexosDocumentos = response.archivos;
                     }
                     $scope.InformacionDeBolsa = false;
                     $scope.ConsultarInformacion = true;
                     $scope.DeptMunCantidad = true;
                     swal.close();
                  }
               })
            }
         }
         $scope.tipoImgPdf = false;


         $scope.VisualizacionAnexos = function (ruta, ftp = 1) {
            if (ftp == 1) {
               $http({
                  method: 'POST',
                  url: "php/juridica/tutelas/functutelas.php",
                  data: { function: 'descargaAdjunto', ruta: ruta }
               }).then(function (response) {
                  $scope.MostrarArchivo = false;

                  $scope.file = ('temp/' + response.data);

                  var tipo = $scope.file.split(".");
                  tipo = tipo[tipo.length - 1];
                  if (tipo.toUpperCase() == "PDF") {
                     $scope.tipoImgPdf = false;
                  } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
                     setTimeout(function () { $scope.zoom(); }, 1000);
                     $scope.tipoImgPdf = true;
                  } else {
                     swal('Error', response.data, 'error');
                  }
               });
            }
            if (ftp == 2) {
               $http({
                  method: 'POST',
                  url: "php/getfileSFtp.php",
                  data: { function: 'descargaAdjunto', ruta: ruta }
               }).then(function (response) {
                  $scope.MostrarArchivo = false;

                  $scope.file = ('temp/' + response.data);

                  var tipo = $scope.file.split(".");
                  tipo = tipo[tipo.length - 1];
                  if (tipo.toUpperCase() == "PDF") {
                     $scope.tipoImgPdf = false;
                  } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
                     setTimeout(function () { $scope.zoom(); }, 1000);
                     $scope.tipoImgPdf = true;
                reset  } else {
                     swal('Error', response.data, 'error');
                  }
               });
            }
            if (ftp == 3) {
               $http({
                  method: 'POST',
                  url: "php/juridica/tutelas/functutelas.php",
                  data: { function: 'descargaAdjuntoftp3', ruta: ruta }
               }).then(function (response) {
                  $scope.MostrarArchivo = false;
                  $scope.file = ('temp/' + response.data);
                  var tipo = $scope.file.split(".");
                  tipo = tipo[tipo.length - 1];
                  if (tipo.toUpperCase() == "PDF") {
                     $scope.tipoImgPdf = false;
                  } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
                     setTimeout(function () { $scope.zoom(); }, 1000);
                     $scope.tipoImgPdf = true;
                  } else {
                     swal('Error', response.data, 'error');
                  }
               });
            }

         }
         $scope.AprobarDocumento = function (nombre, ruta) {
            swal({
               title: 'Confirmar',
               text: 'Seguro Desea Aprobar El Documento?',
               type: 'question',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Aprobar'
            }).then((result) => {
               if (result) {
                  var estado = 'A';
                  var comentario = '';
                  digitalizacionHTTP.actualizaanexos(ruta, estado, comentario).then(function (response) {
                     $scope.res = response;
                     for (var i = 0; i < $scope.AnexosDocumentos.length; i++) {
                        if (nombre == $scope.AnexosDocumentos[i].nombre) {
                           $scope.pos = i;
                           break;
                        }
                     }
                     $scope.AnexosDocumentos.splice($scope.pos, 1);
                     $scope.MostrarArchivo = true;
                     if ($scope.AnexosDocumentos.length == '0') {
                        swal('Correctamente', $scope.res.mensaje, 'success').then((result) => {
                           if (result) {
                              $scope.munxcantidad = [];
                              if ($scope.tipo == '' || $scope.tipo == undefined) {
                                 digitalizacionHTTP.munXgrupo($scope.ubicacion, $scope.grupo).then(function (response) {
                                    $scope.munxcantidad = response;
                                    if ($scope.munxcantidad.length == '0') {
                                       if ($scope.tipo_busqueda == 'A') {
                                          swal({
                                             title: 'Confirmar',
                                             text: '¿Desea seguir consultado?',
                                             type: 'info',
                                             showCancelButton: true,
                                             allowEscapeKey: false,
                                             allowOutsideClick: false,
                                             confirmButtonColor: '#3085d6',
                                             cancelButtonColor: '#d33',
                                             confirmButtonText: 'Consultar',
                                             cancelButtonText: 'Regresar'
                                          }).then(function () {
                                             if ($scope.tipo_busqueda == 'A') {
                                                $scope.ConsultarBolsaAntigua('A');
                                             } else {
                                                $scope.ConsultarBolsa();
                                             }
                                          }, function (dismiss) {
                                             if (dismiss === 'cancel') {
                                                if ($scope.tipo_busqueda == 'A') {
                                                   $scope.HabilitarInformacion();
                                                   $scope.InformacionDeBolsa = true;
                                                   $scope.ConsultarInformacion = false;
                                                   $scope.$apply();
                                                } else {
                                                   $scope.Atras();
                                                }
                                             }
                                          })
                                       } else if ($scope.tipo_busqueda == 'S') {
                                          swal({
                                             title: 'Confirmar',
                                             text: '¿Desea seguir consultado?',
                                             type: 'info',
                                             showCancelButton: true,
                                             allowEscapeKey: false,
                                             allowOutsideClick: false,
                                             confirmButtonColor: '#3085d6',
                                             cancelButtonColor: '#d33',
                                             confirmButtonText: 'Consultar',
                                             cancelButtonText: 'Regresar'
                                          }).then(function () {
                                             $scope.ConsultarBolsa();
                                          }, function (dismiss) {
                                             if (dismiss === 'cancel') {
                                                $scope.ConsultarInformacion = true;
                                                digitalizacionHTTP.cantidadXmun($scope.ubicacion).then(function (response) {
                                                   $scope.munxcantidad = response;
                                                   $scope.DeptMunCantidad = false;
                                                   $scope.VisualizacionDepartamento = false;
                                                   $scope.VisualizacionMunicipio = false;
                                                   $scope.grupo = '';
                                                   $scope.InformacionDeBolsa = true;
                                                   $scope.tipo_busqueda = 'S';
                                                   $scope.title = 'Municipio';
                                                })
                                             }
                                          })
                                       } else {
                                          $scope.VisualizacionDepartamento = true;
                                          $scope.VisualizacionMunicipio = true;
                                          $scope.DeptMunCantidad = true;
                                          $scope.ConsultarInformacion = false;
                                          $scope.InformacionDeBolsa = true;
                                          $scope.HabilitarInformacion();
                                          $scope.GrupoPe = '';
                                       }
                                    } else {
                                       swal({
                                          title: 'Confirmar',
                                          text: '¿Desea seguir consultado?',
                                          type: 'info',
                                          showCancelButton: true,
                                          allowEscapeKey: false,
                                          allowOutsideClick: false,
                                          confirmButtonColor: '#3085d6',
                                          cancelButtonColor: '#d33',
                                          confirmButtonText: 'Consultar',
                                          cancelButtonText: 'Regresar'
                                       }).then(function () {
                                          if ($scope.tipo_busqueda == 'A') {
                                             $scope.ConsultarBolsaAntigua('A');
                                          } else {
                                             $scope.ConsultarBolsa();
                                          }
                                       }, function (dismiss) {
                                          if (dismiss === 'cancel') {
                                             if ($scope.tipo_busqueda == 'A') {
                                                $scope.HabilitarInformacion();
                                                $scope.InformacionDeBolsa = true;
                                                $scope.ConsultarInformacion = false;
                                                $scope.$apply();
                                             } else {
                                                $scope.Atras();
                                             }
                                          }
                                       })
                                    }
                                 })

} else {
   digitalizacionHTTP.munXtipo($scope.ubicacion, $scope.tipo).then(function (response) {
      $scope.munxcantidad = response;
      if ($scope.munxcantidad.length == '0') {
         if ($scope.tipo_busqueda == 'A') {
            swal({
               title: 'Confirmar',
               text: '¿Desea seguir consultado?',
               type: 'info',
               showCancelButton: true,
               allowEscapeKey: false,
               allowOutsideClick: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Consultar',
               cancelButtonText: 'Regresar'
            }).then(function () {
               if ($scope.tipo_busqueda == 'A') {
                  $scope.ConsultarBolsaAntigua('A');
               } else {
                  $scope.ConsultarBolsa();
               }
            }, function (dismiss) {
               if (dismiss === 'cancel') {
                  if ($scope.tipo_busqueda == 'A') {
                     $scope.HabilitarInformacion();
                     $scope.InformacionDeBolsa = true;
                     $scope.ConsultarInformacion = false;
                     $scope.$apply();
                  } else {
                     $scope.Atras();
                  }
               }
            })
         }
         if ($scope.tipo_busqueda == 'S') {
            swal({
               title: 'Confirmar',
               text: '¿Desea seguir consultado?',
               type: 'info',
               showCancelButton: true,
               allowEscapeKey: false,
               allowOutsideClick: false,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Consultar',
               cancelButtonText: 'Regresar'
            }).then(function () {
               $scope.ConsultarBolsa();
            }, function (dismiss) {
               if (dismiss === 'cancel') {
                  $scope.ConsultarInformacion = true;
                  digitalizacionHTTP.cantidadXmun($scope.ubicacion).then(function (response) {
                     $scope.munxcantidad = response;
                     $scope.DeptMunCantidad = false;
                     $scope.VisualizacionDepartamento = false;
                     $scope.VisualizacionMunicipio = false;
                     $scope.grupo = '';
                     $scope.InformacionDeBolsa = true;
                     $scope.tipo_busqueda = 'S';
                     $scope.title = 'Municipio';
                  })
               }
            })
         }
         else {
            $scope.VisualizacionDepartamento = true;
            $scope.VisualizacionMunicipio = true;
            $scope.DeptMunCantidad = true;
            $scope.ConsultarInformacion = false;
            $scope.InformacionDeBolsa = true;
                                          //$scope.TipoDoc=true;
                                          $scope.HabilitarInformacion();
                                          $scope.Documental = '';
                                       }
                                    } else {
                                       swal({
                                          title: 'Confirmar',
                                          text: '¿Desea seguir consultado?',
                                          type: 'info',
                                          showCancelButton: true,
                                          allowEscapeKey: false,
                                          allowOutsideClick: false,
                                          confirmButtonColor: '#3085d6',
                                          cancelButtonColor: '#d33',
                                          confirmButtonText: 'Consultar',
                                          cancelButtonText: 'Regresar'
                                       }).then(function () {
                                          if ($scope.tipo_busqueda == 'A') {
                                             $scope.ConsultarBolsaAntigua('A');
                                          } else {
                                             $scope.ConsultarBolsa();
                                          }
                                       }, function (dismiss) {
                                          if (dismiss === 'cancel') {
                                             if ($scope.tipo_busqueda == 'A') {
                                                $scope.HabilitarInformacion();
                                                $scope.InformacionDeBolsa = true;
                                                $scope.ConsultarInformacion = false;
                                                $scope.$apply();
                                             } else {
                                                $scope.Atras();
                                             }
                                          }
                                       })
                                    }
                                 })
}
}
})
} else {
   swal('Correctamente', $scope.res.mensaje, 'success');
}

})

}
})
}

$scope.ValidoFuncionario = function () {
   swal({ title: 'Cargando información' });
   swal.showLoading();
   if ($scope.ubicacion == '1') {

      $scope.MostrarArchivo = true;

      $scope.InformacionDeBolsa = true;
      $scope.ConsultarInformacion = false;
      $scope.Habilitar = true;
               //Departamento y Municipio
               $scope.DeptMunCantidad = true;  //Div
               $scope.VisualizacionDepartamento = true;
               $scope.VisualizacionMunicipio = true;
               $scope.VisualizacionGrupoTipo = true;
               //Div Nuevo o Antiguo 
               $scope.ProcesoNuevo = false;
               $scope.ProcesoAntiguo = true;
               //Div Grupo o Tipo
               $scope.Grupo = true;
               $scope.TipoDoc = true;

               swal.close();
            } else {
               $scope.ConsultarInformacion = true;
               digitalizacionHTTP.cantidadXmun($scope.ubicacion).then(function (response) {
                  $scope.munxcantidad = response;
                  $scope.DeptMunCantidad = false;
                  $scope.VisualizacionDepartamento = false;
                  $scope.VisualizacionMunicipio = false;
                  $scope.grupo = '';
                  $scope.tipo_busqueda = 'S';
                  $scope.title = 'Municipio';
                  swal.close();
               })
            }
         }

         $scope.VerGrupoTipo = function () {
            alert('fas');
         }
         $scope.Atras = function () {
            if ($scope.DeptMunCantidad == true) {
               $scope.VisualizacionDepartamento = true;
               $scope.VisualizacionMunicipio = false;
               $scope.DeptMunCantidad = false;
               $scope.ConsultarInformacion = false;
               $scope.title = 'Municipio';
               $scope.InformacionDeBolsa = true;
               $scope.VerMunicipio();
            } else {
               if ($scope.tipo == undefined) {
                  $scope.VisualizacionDepartamento = false;
                  $scope.VisualizacionMunicipio = true;
                  $scope.DeptMunCantidad = false;
                  $scope.ConsultarInformacion = false;
                  $scope.title = 'Departamento';
                  $scope.InformacionDeBolsa = true;
                  $scope.BuscarXDeptoGrupo();
               } else {
                  $scope.VisualizacionDepartamento = false;
                  $scope.VisualizacionMunicipio = true;
                  $scope.DeptMunCantidad = false;
                  $scope.ConsultarInformacion = false;
                  $scope.title = 'Departamento';
                  $scope.InformacionDeBolsa = true;
                  $scope.BuscarXDepto();
               }
            }
         }

         $scope.ConsultarBolsaAntigua = function (TipoBusqueda) {
            if ($scope.DocumentalAntiguo == 'SELECCIONAR' || $scope.DocumentalAntiguo == '') {
               swal('Notificacion', 'Debe Seleccionar El Tipo Documental', 'info');
            } else {
               $scope.tipo_busqueda = TipoBusqueda;
               swal({ title: 'Cargando Información Del Afiliado', allowEscapeKey: false, allowOutsideClick: false });
               swal.showLoading();
               digitalizacionHTTP.obtenerinforevision_antiguo($scope.tipo_busqueda, $scope.DocumentalAntiguo).then(function (response) {
                  $scope.mensaje = response.mensaje;
                  if ($scope.mensaje.codigo == '1') {
                     swal.close();
                     swal('Correctamente', $scope.mensaje.mensaje, 'error').then((result) => {
                        if (result) {
                           $scope.Atras();
                        }
                     })
                  } else {
                     $scope.informacion = response.info_afiliado;
                     $scope.type_doc_decl = response.info_afiliado.tipo_documento;
                     $scope.doc_decl = response.info_afiliado.documento;
                     if (response.archivos.length == '1') {
                        $scope.AnexosDocumentos = response.archivos;
                        $scope.RutaDoc = response.archivos['0'].ruta;
                        $scope.FTP = response.archivos['0'].ftp;
                        $scope.VisualizacionAnexos($scope.RutaDoc, $scope.FTP);
                        if (response.archivos['0'].tipo_documental == '21') {
                           $scope.ActivarDeclaracionDeSalud = true;
                           $scope.ValidaDeclaracion($scope.informacion);
                        }
                     } else {
                        $scope.AnexosDocumentos = response.archivos;
                     }
                     $scope.InformacionDeBolsa = false;
                     $scope.ConsultarInformacion = true;
                     $scope.DeptMunCantidad = true;
                     swal.close();
                  }
               })
            }
         }

         $scope.enviarEncuesta = function () {
            var valres;
            swal({
               title: 'Confirmar',
               text: "Se guardara encuesta en la base de datos",
               type: 'question',
               showCancelButton: true,
               confirmButtonColor: '#3ADF00',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Confirmar',
               cancelButtonText: 'Cancelar'
            }).then(function () {
               var frm = document.getElementById("preguntasdeclaracion");
               var cant = 0;
               for (var i = 1; i <= frm.length; i++) {
                  var e = document.getElementById("resp" + i).checked;
                  if (e === true) { e = 'S' } else { e = 'N' }
                     $http({
                        method: 'POST',
                        url: "php/consultaAfiliados/funcdeclaracion.php",
                        data: {
                           function: 'enviarenglon', tipo_doc: $scope.type_doc_decl,
                           documento: $scope.doc_decl,
                           renglon: i,
                           respuesta: e,
                        }
                     }).then(function (response) {
                        if (response.data == "1") {
                           if (valres != "NA") {
                              swal('Notificacion', 'Información registrada exitosamente!', 'success');
                              valres = "NA";
                              document.getElementById("preguntasdeclaracion").reset();
                              $scope.InformacionSinDeclaracion = true;
                              $scope.ActivarDeclaracionDeSalud = false;
                           }
                        } else {
                           if (valres != "NA") {
                              swal('Notificacion', 'Declaración de salud ya fue generada', 'error');
                              valres = "NA";
                              $scope.InformacionSinDeclaracion = true;
                              $scope.ActivarDeclaracionDeSalud = false;
                           }
                        }

                     });
                  }
               })


         }
         $scope.ConsultarTipoDocumentoAntiguo = function () {
            swal({ title: 'Cargando Tipo Documento', allowEscapeKey: false, allowOutsideClick: false });
            swal.showLoading();
            digitalizacionHTTP.obtenertipodocumentalpendienteantiguo().then(function (response) {
               $scope.documentoantiguo = response;
               swal.close();
            })
         }

         // Tab II


         $scope.OcultarInformacion = true;

         $scope.DocumentoTipo = function () {
            if ($scope.informacion == undefined || $scope.informacion.documento == undefined || $scope.informacion.documento == null || $scope.informacion.documento == '') {
               $scope.tipoDocu = '0';
               $scope.documento = '';
            } else {
               $scope.documento = $scope.informacion.documento;
               $scope.tipoDocu = $scope.informacion.tipo_documento;
            }

         }

         $scope.info = {
            pnombre: '',
            snombre: '',
            papellido: '',
            sapellido: '',
            typedoc: '',
            cedula: '',
            celular: '',
            barrio: '',
            direccion: '',
            ciudad: '',
            grupopoblacional: '',
            ficha: '',
            nivel: '',
            puntaje: '',
            fecha_nacimiento: '',
            genero: ''
         }

         $http({
            method: 'POST',
            url: "php/nucleofamiliar/funnovedadacb.php",
            data: { function: 'obteneragrupoPoblacional' }
         }).then(function (response) {
            $scope.GPoblacionales = response.data;
         });

         // Json Municipio
         $http({
            method: 'POST',
            url: "php/nucleofamiliar/funnovedadacb.php",
            data: { function: 'obtenermunicipio' }
         }).then(function (response) {
            $scope.Municipios = response.data;
         });

         $scope.ChangeConsulta = function () {
            $scope.OcultarInformacion = true;
            $scope.info = {};
            $scope.escenario = '';
         }

         $scope.ConsultarAfiliado = function () {
            if ($scope.tipoDocu == "0") {
               swal('Notificacion', 'Seleccione tipo de documento', 'info');
            } else if ($scope.documento === undefined || $scope.documento == "") {
               swal('Notificacion', 'Ingrese número de identificación', 'info');
            } else {
               swal({ title: 'Cargando Información Del Afiliado', allowEscapeKey: false, allowOutsideClick: false });
               swal.showLoading();
               $scope.escenario = '';
               $scope.info = {};
               $http({
                  method: 'POST',
                  url: "php/digitalizacion/funcdigitalizacion.php",
                  data: { function: 'busquedaafiliado', type: $scope.tipoDocu, id: $scope.documento }
               }).then(function (res) {
                  if (res.data.MENSAJE == 1) {
                     $scope.OcultarInformacion = false;
                     $scope.info.pnombre = res.data.PRIMERNOMBRE;
                     $scope.info.snombre = res.data.SEGUNDONOMBRE;
                     $scope.info.papellido = res.data.PRIMERAPELLIDO;
                     $scope.info.sapellido = res.data.SEGUNDOAPELLIDO;
                     $scope.info.typedoc = res.data.TIPODOCUMENTO;
                     $scope.info.cedula = res.data.DOCUMENTO;
                     $scope.info.direccion = res.data.DIRECCION;
                     $scope.info.portabilidad = res.data.PORTABILIDAD;
                     $scope.info.regimen_hom = res.data.REGIMEN_HOM;
                     $scope.info.ubicacion_act = res.data.UBICACION_ACT;
                     $scope.info.ciudad = res.data.MUNICIPIO;
                     $scope.info.celular = res.data.CELULAR;
                     $scope.info.barrio = res.data.BARRIO;
                     $scope.info.escenario = res.data.ESCENARIO;
                     $scope.info.grupopoblacional = res.data.GPOBLACIONAL;
                     $scope.info.nivel = res.data.NIVELSISBEN;
                     $scope.info.ficha = res.data.FICHASISBEN;
                     $scope.info.puntaje = res.data.PUNTAJESISBEN;
                     $scope.info.genero = res.data.GENERO;
                     var date_formato = res.data.FECHA_NACIMIENTO.split("/");
                     $scope.info.fecha_nacimiento = new Date(date_formato[2], date_formato[1] - 1, date_formato[0]);
                     $scope.ObtenerEscenarios($scope.info.ciudad);
                  } else {
                     swal('Notificación', res.data.MENSAJE, 'info');
                  }
                  swal.close();
               })
            }
         }

         $scope.ObtenerEscenarios = function (mun) {
            $http({
               method: 'POST',
               url: "php/nucleofamiliar/funnovedadacb.php",
               data: { function: 'obtenerescenarios', municipio: mun }
            }).then(function (res) {
               $scope.Escenarios = res.data;
               $scope.escenario = $scope.Escenarios[0].CODIGO;
            });
         }

         afiliacionHttp.obtenerViaPrincipal().then(function (response) {
            $scope.viaprincipal = response;
         })
         afiliacionHttp.obtenerLetra().then(function (response) {
            $scope.letras = response;
         })
         afiliacionHttp.obtenerNumero().then(function (response) {
            $scope.Numeros = response;
         })
         afiliacionHttp.obtenerCuadrante().then(function (response) {
            $scope.Cuadrantes = response;
         })
         afiliacionHttp.obtenerZona().then(function (response) { //Consulto Json De La ZONAS
            $scope.Zonas = response.Zona;
         })

         $scope.GuardarNovedad = function (data) {
            $http({
               method: 'POST',
               url: "php/digitalizacion/funcdigitalizacion.php",
               data: {
                  function: 'generarnovedaddigital',
                  type: $scope.tipoDocu,
                  id: $scope.documento,
                  nombrep: data.pnombre,
                  nombres: data.snombre,
                  apellidop: data.papellido,
                  apellidos: data.sapellido,
                  tipo_d: data.typedoc,
                  doc_i: data.cedula,
                  cel: data.celular,
                  bar: data.barrio,
                  dir: data.direccion,
                  mun: data.ciudad,
                  esc: $scope.escenario,
                  gpobla: data.grupopoblacional,
                  fic_s: data.ficha,
                  niv_s: data.nivel,
                  punt_s: data.puntaje,
                  genero: data.genero,
                  fecha_nacimiento: data.fecha_nacimiento
               }
            }).then(function (res) {
               swal('Notificación', res.data.MENSAJE, 'info');
            })
         }

         $scope.Act_Zona = { Codigo: '' };
         $scope.ViaPrincipal = { Codigo: '' };
         $scope.Letra = { Codigo: '' };
         $scope.Cuadrante = { Codigo: '' };
         $scope.CuadranteVG = { Codigo: '' };
         $scope.SelectLetraVG = { Codigo: '' };
         $scope.Bis = false;

         $scope.AbrirModalDireccion = function () {
            $scope.dialogDiagreg = ngDialog.open({
               template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
               className: 'ngdialog-theme-plain',
               controller: 'RevisionDigitalizacionController',
               closeByDocument: false,
               closeByEscape: false,
               scope: $scope
            });
            $scope.dialogDiagreg.closePromise.then(function (data) {
               if (data.value != "$closeButton") {
                  $scope.info.direccion = data.value;
                  $scope.info.barrio = $('#barrio').val();
                  $scope.infotemp.direccion = data.value;
                  $scope.infotemp.barrio = $('#barrio').val();
               }
            });
         }

         $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
            $scope.closeThisDialog($('#direcciond').val());
            $scope.closeThisDialog($('#barrio').val());
            $scope.infotemp.barrio = $('#barrio').val();
         }

         // CNVU MEJORA 27/03/2020
         $scope.EditarInformacion = function (i) {
            if (i.tipo_documento == "" || i.documento == "") {
               swal('Notificacion', 'El afiliado no registra en nuestra Base de Datos', 'info');
            } else {
               swal({ title: 'Cargando Información Del Afiliado', allowEscapeKey: false, allowOutsideClick: false });
               swal.showLoading();
               $scope.tipo_doc_log = i.tipo_documento;
               $scope.doc_log = i.documento;
               $http({
                  method: 'POST',
                  url: "php/digitalizacion/funcdigitalizacion.php",
                  data: { function: 'busquedaafiliado', type: i.tipo_documento, id: i.documento }
               }).then(function (res) {
                  if (res.data.MENSAJE == 1) {
                     $scope.infotemp = {}
                     $scope.infotemp.primer_nombre = res.data.PRIMERNOMBRE;
                     $scope.infotemp.segundo_nombre = res.data.SEGUNDONOMBRE;
                     $scope.infotemp.primer_apellido = res.data.PRIMERAPELLIDO;
                     $scope.infotemp.segundo_apellido = res.data.SEGUNDOAPELLIDO;
                     $scope.infotemp.tipo_documento = res.data.TIPODOCUMENTO;
                     $scope.infotemp.documento = res.data.DOCUMENTO;
                     $scope.infotemp.telefono_contacto = res.data.CELULAR;
                     $scope.infotemp.barrio = res.data.LOCALIDAD;
                     $scope.infotemp.direccion = res.data.DIRECCION;
                     $scope.infotemp.portabilidad = res.data.PORTABILIDAD;
                     $scope.infotemp.regimen_hom = res.data.REGIMEN_HOM;
                     $scope.infotemp.ubicacion_act = res.data.UBICACION_ACT;
                     $scope.infotemp.mun = res.data.MUNICIPIO;
                     $scope.ObtenerEscenarios(res.data.MUNICIPIO);
                     $scope.infotemp.escenario = res.data.ESCENARIO;
                     $scope.infotemp.gpobla = res.data.GPOBLACIONAL;
                     $("#gpoblacional").val($scope.infotemp.gpobla);
                     $scope.infotemp.ficha_sisben = res.data.FICHASISBEN;
                     $scope.infotemp.nivel_sisben = res.data.NIVELSISBEN;
                     $scope.infotemp.puntaje_sisben = res.data.PUNTAJESISBEN;
                     var date_formatonacimiento = res.data.FECHA_NACIMIENTO.split("/");
                     $scope.infotemp.fecha_nacimiento = new Date(date_formatonacimiento[2], date_formatonacimiento[1] - 1, date_formatonacimiento[0]);
                     $scope.infotemp.genero = res.data.GENERO;
                     $scope.TablaDeInformacion = true;
                     $scope.EditarDeInformacion = false;
                     $scope.Ocultar = false;
                  } else {
                     swal('Notificación', res.data.MENSAJE, 'info');
                  }
                  setTimeout(function () {
                     swal.close();
                  }, 300);
               });
            }
         }

         $scope.AtrasInfo = function () {
            $scope.TablaDeInformacion = false;
            $scope.EditarDeInformacion = true;
            $scope.Ocultar = true;
         }

         $scope.ActualizarNovedad = function (data) {
            // console.log(data.gpobla);
            // console.log($("#gpobla").val());
            $http({
               method: 'POST',
               url: "php/digitalizacion/funcdigitalizacion.php",
               data: {
                  function: 'generarnovedaddigital',
                  type: $scope.tipo_doc_log,
                  id: $scope.doc_log,
                  nombrep: data.primer_nombre,
                  nombres: data.segundo_nombre,
                  apellidop: data.primer_apellido,
                  apellidos: data.segundo_apellido,
                  tipo_d: data.tipo_documento,
                  doc_i: data.documento,
                  cel: data.telefono_contacto,
                  bar: data.barrio,
                  dir: data.direccion,
                  mun: data.municipio,
                  esc: data.escenario,
                  gpobla: data.gpobla,
                  fic_s: data.ficha_sisben,
                  niv_s: data.nivel_sisben,
                  punt_s: data.puntaje_sisben,
                  fecha_nacimiento: data.fecha_nacimiento,
                  genero: data.genero
               }
            }).then(function (res) {
               swal('Notificación', res.data.MENSAJE, 'info');
            })
         }
      }]);