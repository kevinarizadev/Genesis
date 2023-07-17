'use strict';
angular.module('GenesisApp')
  .controller('datosbasicoscontroller', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication',
    function ($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication) {
      // Carga los datos de la vista principal
      // Carga los datos de la vista principal
      $(document).ready(function () {
        $('#modalvisual').modal();
        $scope.Rol_Rol = sessionStorage.getItem('cedula');
      });
      $scope.contenedor = true;
      $scope.nucleo = false;
      $scope.type = "SELECCIONAR";
      $scope.soportes = true;
      $scope.docu_anexo = "0";
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'left'

        });
      });
      $scope.hdeUserComfacor = true;
      $scope.zoom=function(){
     $("#gear").mlens({
      imgSrc2x: $("#gear").attr("data-big2x"),  // path of the hi-res @2x version of the image
      lensShape: "square",                // shape of the lens (circle/square)
      lensSize: ["20%","10%"],            // lens dimensions (in px or in % with respect to image dimensions)
      borderSize: 1,                  // size of the lens border (in px)
      borderColor: "red",            // color of the lens border (#hex)
      borderRadius: 0,                // border radius (optional, only if the shape is square)      
      overlayAdapt: true,    // true if the overlay image has to adapt to the lens size (boolean)
      zoomLevel: 1,          // zoom level multiplicator (number)
      responsive: true       // true if mlens has to be responsive (boolean)
   });

}



        $scope.VisualizarDocumento= function (ruta){
          window.open(ruta);
        }
      $scope.estadoanexo = function (ruta,ftp) {
        if (ftp == 1) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: { function: 'descargaAdjunto', ruta: ruta }
          }).then(function (response) {
            if (response.data.length == '0') {
              swal('Error', response.data, 'error');
            } else {
              $('#modalvisual').modal('open');
              $scope.MostrarArchivo = false;
              $scope.file = ('temp/' + response.data);
              var tipo = $scope.file.split(".");
              tipo = tipo[tipo.length - 1];
              if (tipo.toUpperCase() == "PDF") {
                $scope.tipoImgPdf = false;
              } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
                $scope.tipoImgPdf = true;
                setTimeout(function(){ $scope.zoom();  }, 1000);    
              } else {
                swal('Error', response.data, 'error');
              }
            }
          });
        }
        if (ftp == 2) {
          $http({
            method: 'POST',
            url: "php/getfileSFtp.php",
            data: { function: 'descargaAdjunto', ruta: ruta }
          }).then(function (response) {
            $('#modalvisual').modal('open');
            $scope.MostrarArchivo = false;
            $scope.file = ('temp/' + response.data);
            var tipo = $scope.file.split(".");
            tipo = tipo[tipo.length - 1];
            if (tipo.toUpperCase() == "PDF") {
              $scope.tipoImgPdf = false;
            } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "BMP") {
              $scope.tipoImgPdf = true;
              setTimeout(function(){ $scope.zoom();  }, 1000);    
            } else {
              swal('Error', response.data, 'error');
            }
          });
        }
        
      }


      $scope.contraAsignamiento = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/consultaAfiliados/funcnovedadacb.php",
          data: {
            function: 'contratoAsignamiento',
            v_doc: $scope.id
          }
        }).then(function (response) {
          swal.close();
          if (response.data.coderror == '0') {
            swal('Completado', response.data.mensaje, 'success')
            $scope.closeThisDialog();
          } else {
            swal('Error', response.data.mensaje, 'warning');

          }

        });
      }

      $scope.cambiarcontrasena = function () {
        ngDialog.open({
          template: 'views/consultaAfiliados/modalcambiarcontrasena.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalcambiarcontrasenacontroller',
          scope: $scope
        });
      }
      $scope.EliminarBeneficiarioDelNucleo = function (tipo_documento, documento) {
        swal({
          title: 'Confirmar Proceso',
          text: "¿Desea desvincular el beneficiario de tu nucleo familiar?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Desvincular',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/nucleofamiliar/funnovedadacb.php",
              data: {
                function: 'DevinculacionBeneficiario',
                tipo_documento: tipo_documento,
                documento: documento,
              }
            }).then(function (res) {
              if (res.data.codigo == '0') {
                swal("Completado", "Desvinculacion correctamente", "success");
                $scope.busquedaAfiliado();
              } else {
                swal("Error", res.data, "warning");
              }
            })
          }
        }, function (dismiss) {
          if (dismiss == "cancel") {
            swal("Advertencia", 'Operacion Cancelada', "info");
          }
        })
      }
      $scope.AgregarBeneficiario = function (tipo_documento_cab, documento_cab, tipo, genero) {

        afiliacionHttp.serviceFDC(tipo_documento_cab, documento_cab, 'ObtenerSisben').then(function (response) {
          var sisben = response.data;
          $scope.ubicacion_dnp_cab = sisben.CodigoMunicipio;
          $scope.fichasisben_dnp = sisben.Ficha;
        });

        $scope.tipo_documento_cab = tipo_documento_cab;
        $scope.documento_cab = documento_cab;
        $scope.tipo = tipo;
        $scope.genero = genero;
        ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/modal/modalagregarbeneficiario.html',
          className: 'ngdialog-theme-plain',
          controller: 'agregarbeneficiario',
          scope: $scope
        })
      }

      $scope.ActualizarFichaxUsuario = function (fichasisben_oasis, tipodocumento, documento, ubicacion_actual, nombreips, tipo_parentesco, zona, discapacidad, celular, grupop, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, direccion, nivel_sisben, barrio) {
        $scope.tipodocumento = tipodocumento;
        $scope.documento = documento;
        $scope.ubicacion_actual = ubicacion_actual;
        $scope.nombreips = nombreips;
        $scope.grupop = grupop;
        $scope.primer_nombre = primer_nombre;
        $scope.segundo_nombre = segundo_nombre;
        $scope.primer_apellido = primer_apellido;
        $scope.segundo_apellido = segundo_apellido;
        $scope.tipo_parentesco = tipo_parentesco;
        $scope.zona = zona;
        $scope.discapacidad = discapacidad;
        $scope.celular = celular;
        $scope.grupop = grupop;
        $scope.fichasisben_oasis = fichasisben_oasis;
        $scope.direccion = direccion;
        $scope.nivel_sisben = nivel_sisben;
        $scope.barrio = barrio;
        ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/modal/actualizarinformacion.html',
          className: 'ngdialog-theme-plain',
          controller: 'actualizarinformacion',
          scope: $scope
        })
      }
      //$scope.selectedIps = "0";  
      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        if (communication.valor == 1) {
          if ($scope.sesdata.rolcod == -1) {
            $scope.obtienenucleo();
            $timeout(function () {
              $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne);
            }, 2000);
          } else {
            $scope.busquedaAfiliado();
            $timeout(function () {
              $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne);
            }, 2000);
          }
          communication.valor = 0;
        }
        if ($scope.refestado == 1) {
          $timeout(function () {
            $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne);
          }, 1000);
          $scope.refestado = 0;
        }
        if ($scope.sesdata.rolcod == -1 && $scope.vercarne == 1) {
          $scope.obtienenucleo();
          $scope.vercarne = 0;
        } else if ($scope.sesdata.rolcod != -1 && $scope.vercarne == 1) {
          $scope.busquedaAfiliado();
          $scope.vercarne = 0;
        }
      });
      $scope.obtienenucleo = function () {
        consultaHTTP.obtenerNucleo('CAON', $scope.sesdata.tipo, $scope.sesdata.cedula).then(function (response) {
          if (response == "0") {
            //notification.getNotification('error','Error en el sistema, contactar servicio al cliente.','Notificacion');
            return;
          } else {
            $scope.afildata = response;
            return;
          }
        })
      }
      $.getJSON("php/obtenersession.php")
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
          if ($scope.sesdata.rolcod == -1) {
            $scope.busquedaFuncionario = true;
            $scope.vistacarne = true;
            $scope.panelanexos = false;
            $scope.paneltwitter = true;
          } else {
            $scope.busquedaFuncionario = false;
            $scope.vistacarne = false;
            $scope.solobusqueda = function () {
              $scope.hdeUserComfacor = true;
              $scope.nucleo = true;
              $scope.contenedor = true;
              $scope.panelanexos = true;
              $scope.limpiaipsdetalles();
              $scope.paneltwitter = false;
            }
          }
          $scope.obtienenucleo();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("Error obteniendo session variables");
        });

      $('#tablanucleo').on('click', 'tbody tr', function (event) {
        $(this).addClass('arr').siblings().removeClass('arr');
      });
      $scope.obtenerDocumento = function () {
        consultaHTTP.obtenerDocumento().then(function (response) {
          $scope.Documentos = response;
        })
      }
      $scope.obtenerAnexos = function () {
        consultaHTTP.obtenerAnexos($scope.tipo_documento, $scope.documento).then(function (response) {
          $scope.anexodata = response;
        })
      }

      //    $scope.estadoanexo = function(estado,ruta){
      //      if (estado == "Por Revisar" &&  $scope.sesdata.APRDOC == 1) {
      //       $scope.editruta = ruta;
      //       ngDialog.open({
      //        template: 'views/consultaAfiliados/modalestadoanexo.html',
      //        className: 'ngdialog-theme-plain',
      //        controller: 'estadoanexoctrl',
      //        scope: $scope
      //      });
      //     }else{
      //       $http({
      //        method: 'POST',
      //        url: "php/juridica/tutelas/functutelas.php",
      //        data: {
      //         function: 'descargaAdjunto',
      //         ruta: ruta
      //       }
      //     }).then(function (response) {
      //      window.open("temp/"+response.data);
      //    });
      //   }
      //   $scope.refestado = 1;
      // }



      $scope.busquedaAfiliado = function () {
        swal({
          title: 'Cargando información del afiliado'
        });
        swal.showLoading();
        $scope.afildata = "";
        if ($scope.type == "SELECCIONAR") {
          notification.getNotification('info', 'Seleccione tipo de documento', 'Notificación');
        } else if ($scope.id === undefined || $scope.id == "") {
          notification.getNotification('error', 'Ingrese número de identificación', 'Notificación');
        } else {
          consultaHTTP.obtenerNucleo('CABA', $scope.type, $scope.id).then(function (response) {
            if (response == "0") {
              swal('Información', 'No se encontro información', 'error')
              $scope.nucleo = true;
              $scope.contenedor = true;
              return;
            } else if (typeof response === "object") {
              $scope.afildata = response;
              $scope.nucleo = false;
              $scope.contenedor = true;
              swal.close();
            } else if (response.substring(0, 1) == "2") {
              swal('Información', response, 'info');
            }
          })
        }
      }
      /*
            $scope.busquedaAfiliado = function(){
               swal({
                  title: 'Cargando información del afiliado'
               });
               swal.showLoading();
               $scope.afildata = "";
               if ($scope.type == "SELECCIONAR") {
                  notification.getNotification('info','Seleccione tipo de documento','Notificación');
               }else if ($scope.id === undefined || $scope.id == "") {
                  notification.getNotification('error','Ingrese número de identificación','Notificación');
               }else{
                  consultaHTTP.obtenerNucleo('CABA',$scope.type,$scope.id).then(function(response){
                     $scope.respuestaNucleo = response;
                     if (response == "0") {
                        swal('Información','No se encontro información','error')
                        $scope.nucleo = true;
                        $scope.contenedor = true;
                        return;
                     }else if (typeof $scope.respuestaNucleo === "object" ) {
                      $scope.afildata = $scope.respuestaNucleo;
                        var s = 0;
                        var cont1 = 0;
      
                        //var datos = [];
                        for (var i = 0; i < $scope.respuestaNucleo.length; i++) {
                           afiliacionHttp.serviceFDC($scope.respuestaNucleo[i].TIPODOCUMENTO, $scope.respuestaNucleo[i].DOCUMENTO, 'ObtenerSisben').then(function (response) {
                              var sisben = response.data;
                              if (sisben.Respuesta == "Informacion Valida") {
                                 for (var z = 0; z < $scope.respuestaNucleo.length; z++) {
                                    if (sisben.Documento == $scope.respuestaNucleo[z].DOCUMENTO) {
                                       $scope.respuestaNucleo[z].FICHASISBEN_DNP = sisben.Ficha;
                                       cont1 = cont1 + 1;
                                       break;
                                    }
                                 }
                                 if (cont1 == $scope.respuestaNucleo.length) {
                                    $scope.afildata = $scope.respuestaNucleo;
                                    swal.close();
                                    $scope.nucleo = false;
                                 }
                              } else {
                                 $scope.afildata = $scope.respuestaNucleo;
                                 $scope.nucleo = false;
                                 swal.close();
                              }
                           });
                        }
                     }else if (response.substring(0, 1) == "2") {
                        swal('Información',response,'info');
                     }
                  })
               }
             }*/

      $scope.busquedaDetalles = function () {
        $scope.busquedaXdetalles = ngDialog.open({
          template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalBusquedaxnombres',
          closeByEscape: false,
          closeByDocument: false
        });
        $scope.busquedaXdetalles.closePromise.then(function (response) {
          if (response.value === undefined) { return; }
          if (response.value != "$closeButton") {
            $scope.type = response.value.tipo;
            $scope.id = response.value.documento;
            $scope.busquedaAfiliado();
          }
        });
      }

      $scope.mostrarAfiliado = function (type, id, carne) {
        consultaHTTP.validaDirnovedad(type, id).then(function (res) {
          if (carne == "false" && $scope.sesdata.rolcod != -1) {
            $scope.contenedor = true;
            $scope.alertacarne();
            $scope.vercarne = 1;
            return;
          } else {
            $scope.contenedor = false;
          }
          if (res == "1") {
            $scope.btnGenera = true;
            $scope.alertanovedad();
          } else {
            $scope.btnGenera = false;
          }

        })
        for (var i = 0; i <= $scope.afildata.length - 1; i++) {
          if ($scope.afildata[i].DOCUMENTO == id) {
            $scope.tipo_documento = $scope.afildata[i].TIPODOCUMENTO;
            $scope.telefono = $scope.afildata[i].TELEFONO;
            $scope.celular = $scope.afildata[i].CELULAR;
            $scope.celular2 = $scope.afildata[i].CELULAR2;
            $scope.direccion = $scope.afildata[i].DIRECCION;
            if (($scope.telefono != "" || $scope.celular != "" || $scope.celular2 != "") && ($scope.direccion != "")) {
              $scope.confirmar = true;
            } else {
              $scope.confirmar = false;
            }
            if ($scope.afildata[i].COMFACOR == "S") {
              $scope.hdeUserComfacor = false;
            }else{
              $scope.hdeUserComfacor = true;
            }
            $scope.correoelectronico = $scope.afildata[i].CORREO;
            $scope.documento = $scope.afildata[i].DOCUMENTO;;
            $scope.nombre_afiliado = $scope.afildata[i].NOMBRECOMPLETO;
            $scope.fecha_nacimiento = $scope.afildata[i].NACIMIENTO;
            $scope.genero = $scope.afildata[i].SEXO_CARNET;
            $scope.ficha = $scope.afildata[i].FICHASISBEN;
            $scope.nivel = $scope.afildata[i].NIVEL_SISBEN;
            $scope.departamento = $scope.afildata[i].UBICACIONGEOGRAFICA;
            $scope.municipio = $scope.afildata[i].NOMBRE;
            $scope.localidad = $scope.afildata[i].LOCALIDAD;
            $scope.fecha_afiliacion = $scope.afildata[i].FECHAAFILIACION;
            $scope.carne = $scope.afildata[i].CARNE;
            $scope.ipscapita = $scope.afildata[i].CAPITA;
            $scope.red = $scope.afildata[i].RED;
            $scope.estadobdua = $scope.afildata[i].ESTADOBDUA;
            $scope.color_estado = "red";
            switch ($scope.afildata[i].ESTADO) {
              case "AC":
                $scope.estado = "ACTIVO";
                $scope.color_estado = "green";
                break;
              case "IN":
                $scope.estado = "INACTIVO";
                break;
              case "RE":
                $scope.estado = "RETIRADO";
                break;
              case "SU":
                $scope.estado = "SUSPENDIDO";
                break;
              case "AF":
                $scope.estado = "FALLECIDO";
                break;
            }
            switch ($scope.afildata[i].REGIMEN) {
              case "S":
                $scope.regimen = "SUBSIDIADO";
                $scope.panelips = false;
                break;
              case "C":
                $scope.regimen = "CONTRIBUTIVO";
                if ($scope.red == 0) { $scope.panelips = true } else { $scope.panelips = false }
                break;
            }
            switch ($scope.afildata[i].PORTABILIDAD) {
              case "N":
                $scope.cert_port = false;
                break;
              case "S":
                $scope.cert_port = true;
                break;
            }
            $scope.cert_hist = $scope.afildata[i].HISTORIALAFIL;
            $scope.cert_bencont = $scope.afildata[i].CERTBENCONT;
            consultaHTTP.obtenerEscenarios('CAOE', $scope.afildata[i].TIPODOCUMENTO, $scope.afildata[i].DOCUMENTO).then(function (response) {
              if (response == "0") {
                notification.getNotification('error', 'Error al buscar IPS', 'Notificacion');
              } else {
                $scope.ipss = response;
                if ($scope.regimen == 'SUBSIDIADO') { $scope.selectedIps = $scope.ipscapita } else { $scope.selectedIps = $scope.ipss[0].NIT }
                $scope.mostrarIpsdetalle();
              }
            })
          }
        }

        $scope.obtenerAnexos();
      }
      $scope.actualizaAfiliado = function () {
        if (($scope.telefono === undefined && $scope.celular === undefined && $scope.celular2 === undefined)
          || ($scope.telefono == "" && $scope.celular == "" && $scope.celular2 == "")) {
          notification.getNotification('info', 'Ingrese al menos un número  de contacto', 'Notificacion');
        } else {
          consultaHTTP.actualizaAfidatos($scope.tipo_documento, $scope.documento, 'DIR', $scope.direccion, $scope.localidad, $scope.telefono, $scope.celular, $scope.celular2, $scope.correoelectronico).then(function (response) {
            if (response == 1) {
              notification.getNotification('success', 'Novedad realizada exitosamente', 'Notificacion');
              $scope.btnGenera = false;
            } else {
              notification.getNotification('error', 'Error creando novedad: ' + response, 'Notificacion');
            }
          })
        }
      }

      $scope.confirmainfo = function () {
        $http({
          method: 'GET',
          url: "php/consultaafiliados/confirmadatos.php",
          params: { type: $scope.tipo_documento, id: $scope.documento }
        }).then(function (res) {
          if (res.data == 1) {
            notification.getNotification('success', 'Datos confirmados exitosamente', 'Notificacion');
            $scope.btnGenera = false;
          } else {
            notification.getNotification('error', res.data, 'Notificacion');
          }
        })
      }
      $scope.generaSoportes = function () {
        if ($scope.soportes == false) {
          $scope.soportes = true
        } else {
          $scope.soportes = false
        }
      }
      $scope.mostrarIpsdetalle = function () {
        for (var a = 0; a <= $scope.ipss.length - 1; a++) {
          if ($scope.ipss[a].NIT == $scope.selectedIps) {
            $scope.muniips = $scope.ipss[a].MUNICIPIO;
            $scope.dptoips = $scope.ipss[a].DEPARTAMENTO;
            // $scope.initMap($scope.ipss[a].DIRECCION,$scope.muniips,$scope.dptoips);
            $scope.nitips = $scope.ipss[a].NIT;
            $scope.nombreips = $scope.ipss[a].NOMBRE;
            $scope.direccionips = $scope.ipss[a].DIRECCION;
            $scope.telefonoips = $scope.ipss[a].TELEFONO;
            return;
          }
        }
        if ($scope.selectedIps == "0") {
          $scope.limpiaipsdetalles();
        }
      }
      $scope.limpiaipsdetalles = function () {
        // $scope.initMap('','','');
        $scope.selectedIps = "0";
        $scope.muniips = "";
        $scope.dptoips = "";
        $scope.nitips = "";
        $scope.nombreips = "";
        $scope.direccionips = "";
        $scope.telefonoips = "";
      }
      //   $scope.initMap = function(dire,muni,dpto) {
      //      dire = dire + ' ' + muni;
      //      if ($scope.selectedIps == "0") {dire = "COLOMBIA"}
      //      $http({
      //         method:'GET',
      //         url:"https://maps.googleapis.com/maps/api/geocode/json",
      //         params: {address: dire}
      //      }).success(function(resp){
      //         if (dire == "COLOMBIA") {
      //            var lati = 0;
      //            var long = 0;
      //         }else{
      // if (resp.results["0"].address_components[3].long_name.toUpperCase() != muni && resp.results["0"].address_components[2].long_name.toUpperCase() != muni) {
      //            //if (resp.results["0"].address_components[].long_name.toUpperCase() != muni) {
      //               //notification.getNotification('error','Google Maps no pudo encontrar la dirección','Notificacion');
      //               $scope.tipo_ubicacion = '- No se pudo encontrar IPS';
      //               var lati = 0;
      //               var long = 0;
      //            }else{
      //               var lati = parseFloat(resp.results["0"].geometry.location.lat);
      //               var long = parseFloat(resp.results["0"].geometry.location.lng);
      //               if (resp.results["0"].geometry.location_type=="APPROXIMATE" || resp.results["0"].geometry.location_type=="RANGE_INTERPOLATED") 
      //                  {$scope.tipo_ubicacion="- Aproximada"}
      //               else if(resp.results["0"].geometry.location_type=="ROOFTOP" )
      //                  {$scope.tipo_ubicacion="- Exacta"}
      //            }
      //         }

      //         var myLatLng = {lat: lati , lng: long};
      //         var map = new google.maps.Map(document.getElementById('mapa'), {
      //            center: myLatLng,
      //            scrollwheel: false,
      //            zoom: 16,
      //            styles:  [  
      //                        {
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#f5f5f5"}]
      //                        },
      //                        {
      //                           "elementType": "labels.icon",
      //                           "stylers": [{"visibility": "off"}]
      //                        },
      //                        {
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#616161"}]
      //                        },
      //                        {
      //                           "elementType": "labels.text.stroke",
      //                           "stylers": [{"color": "#f5f5f5"}]
      //                        },
      //                        {
      //                           "featureType": "administrative.land_parcel",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#bdbdbd"}]
      //                        },
      //                        {
      //                           "featureType": "poi",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#eeeeee"}]
      //                        },
      //                        {
      //                           "featureType": "poi",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#757575"}]
      //                        },
      //                        {
      //                           "featureType": "poi.attraction",
      //                           "stylers": [{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "poi.medical",
      //                           "stylers": [{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "poi.medical",
      //                           "elementType": "labels.icon",
      //                           "stylers": [{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "poi.medical",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#3e3c3c"},{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "poi.park",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#e5e5e5"}]
      //                        },
      //                        {
      //                           "featureType": "poi.park",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#9e9e9e"}]
      //                        },
      //                        {
      //                           "featureType": "poi.place_of_worship",
      //                           "stylers": [{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "poi.school",
      //                           "stylers": [{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "poi.sports_complex",
      //                           "stylers": [{"visibility": "on"}]
      //                        },
      //                        {
      //                           "featureType": "road",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#ffffff"}]
      //                        },
      //                        {
      //                           "featureType": "road.arterial",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#757575"}]
      //                        },
      //                        {
      //                           "featureType": "road.highway",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#dadada"}]
      //                        },
      //                        {
      //                           "featureType": "road.highway",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#616161"}]
      //                        },
      //                        {
      //                           "featureType": "road.local",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#9e9e9e"}]
      //                        },
      //                        {
      //                           "featureType": "transit.line",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#e5e5e5"}]
      //                        },
      //                        {
      //                           "featureType": "transit.station",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#eeeeee"}]
      //                        },
      //                        {
      //                           "featureType": "water",
      //                           "stylers": [{"color": "#557be1"},{"visibility": "off"}]
      //                        },
      //                        {
      //                           "featureType": "water",
      //                           "elementType": "geometry",
      //                           "stylers": [{"color": "#c9c9c9"}]
      //                        },
      //                        {
      //                           "featureType": "water",
      //                           "elementType": "labels.text.fill",
      //                           "stylers": [{"color": "#9e9e9e"}]
      //                        }
      //                  ]
      //         });
      //         var marker = new google.maps.Marker({
      //            map: map,
      //            position: myLatLng
      //         });
      //      })
      //   }
      $scope.nuevoAdjunto = function () {
        $scope.refestado = 1;
        ngDialog.open({
          template: 'views/consultaAfiliados/modalAdjuntos.html',
          className: 'ngdialog-theme-plain',
          controller: 'adjuntocontroller',
          scope: $scope
        });
      }
      $scope.generaFormatos = function () {
        ngDialog.open({
          template: 'views/consultaAfiliados/modalformatos.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalformatoscontroller',
          scope: $scope
        });
      }
      $scope.alertanovedad = function () {
        ngDialog.open({
          template: 'views/consultaAfiliados/modaldirnovedad.html',
          className: 'ngdialog-theme-plain'
        });
      }
      $scope.alertacarne = function () {
        ngDialog.open({
          template: 'views/consultaAfiliados/modalcarnenovedad.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalformatoscontroller',
          scope: $scope
        });
      }
      $scope.editarinfo = function () {
        ngDialog.open({
          template: 'views/consultaAfiliados/modaleditardatos.html',
          className: 'ngdialog-theme-plain',
          controller: 'editardatosctrl',
          scope: $scope
        });
      }
    }
  ]);
