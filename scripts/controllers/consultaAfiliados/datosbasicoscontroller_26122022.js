'use strict';
angular.module('GenesisApp')
  .controller('datosbasicoscontroller', ['$http', '$timeout', '$scope', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', 'notification', 'cfpLoadingBar', '$rootScope', '$controller', 'communication', 'digitalizacionHTTP',
    function ($http, $timeout, $scope, ngDialog, consultaHTTP, afiliacionHttp, notification, cfpLoadingBar, $rootScope, $controller, communication, digitalizacionHTTP) {
      // Carga los datos de la vista principal
      $(document).ready(function () {
        $('#modalvisual').modal();
        //CNVU
        $('#modalDatosNacimientos').modal();
        $scope.hdeTablaNacimientos = true;
        $scope.hdeUserComfacor = true;
        $scope.hdeDesmovilizado = true;
        $.getJSON("php/obtenersession.php").done(function (respuesta) {
          $scope.Rol_Rol = respuesta.rolcod;
        });
        setTimeout(function () { $scope.$apply(); }, 3000);
        //
        //$scope.type = 'CC';
        //$scope.id = '1064978204';
      });
      console.log(0);

      $scope.ocultar_icono = false;

      //validar icono para mostrar

      $scope.validador_De_fecha = function () {
        if (sessionStorage.getItem('cedula') == '1045740349' || sessionStorage.getItem('cedula') == '22667472' || sessionStorage.getItem('cedula') == '1062426915'
          || sessionStorage.getItem('cedula') == '1140889298' || sessionStorage.getItem('cedula') == '1143457336') {
          $scope.ocultar_icono = true;
        } else {
          $scope.ocultar_icono = false;
        }
      }
      $scope.tipo_modulo = 'I';


      $scope.confirmarindependiente = function () {
        swal({
          title: 'Confirmar Proceso',
          text: "Desea confirmar independiente?",
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar',
          cancelButtonText: 'Cancelar'
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/movilidad/funcmovilidad.php",
              data: {
                function: 'actualizaraportante',
                tipo: $scope.tipo_modulo,
                documento: $scope.id,
                responsable: $scope.sesdata.cedula

              }
            }).then(function (response) {
              if (response.data.codigo == '0') {
                swal({
                  title: response.data.mensaje,
                  timer: 3000,
                  type: 'success'
                }).catch(swal.noop);
                //   $scope.buscarcensocodigo();
                //   $scope.buscarcenso();
                //   $scope.cerrarModal();
                // $scope.verAutorizaciones = false;
              } else {
                swal('Advertencia', 'error al guardar independiente', 'warning')

              }
            })
          }
        }).catch(swal.noop);
      }


      $scope.hdeUserComfacor = true;
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

      $scope.contenedor = true;
      $scope.nucleo = false;
      $scope.type = "";
      // CNVU
      $scope.tipoIdNacimiento = "";
      // 
      $scope.soportes = true;
      $scope.docu_anexo = "0";
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
          direction: 'left'

        });
      });

      $scope.VisualizarDocumento = function (ruta) {
        window.open(ruta);
      }

      $scope.estadoanexo = function (data) {
        $scope.editruta = data.RUTA;
        $scope.ftp = data.FTP;
        $scope.inforapida = data;
        ngDialog.open({
          template: 'views/consultaAfiliados/modalestadoanexo.html',
          className: 'ngdialog-theme-plain',
          controller: 'estadoanexoctrl',
          scope: $scope
        });
      }


      /*
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
      */
      //Digitalizacion
      $scope.ProcesosDigitalizacion = function (numero) {
        $scope.paquete = numero;
        $scope.tipo_documento;
        $scope.documento;
        $scope.TipoRes = 'CA';
        ngDialog.open({
          template: 'views/digitalizacion/modal/cargaanexo.html',
          className: 'ngdialog-theme-plain',
          controller: 'DigitalizacionController',
          scope: $scope
        })
      }

      $rootScope.$on('ConsultaAfiliado', function (event, args) {
        if (args == '0') {
          $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne,'A');
        }
      });

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
              $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne,'A');
            }, 2000);
          } else {
            $scope.busquedaAfiliado();
            $timeout(function () {
              $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne,'A');
            }, 2000);
          }
          communication.valor = 0;
        }
        if ($scope.refestado == 1) {
          $timeout(function () {
            $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne,'A');
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
            $scope.ocultacolumna = false;
          } else if ($scope.sesdata.rolcod == 0 && sessionStorage.getItem('ente_territorial') == 'N') {
            $scope.busquedaFuncionario = false;
            $scope.vistacarne = false;
            $scope.nucleo = true;
            $scope.ocultacolumna = false;
            $scope.panelanexos = false;
            $scope.paneltwitter = true;
            $scope.ocultacolumna = false;

            $scope.solobusqueda = function () {
              $scope.hdeUserComfacor = true;
              $scope.nucleo = true;
              $scope.contenedor = true;
              $scope.panelanexos = false;
              $scope.paneltwitter = true;
              $scope.limpiaipsdetalles();
              $scope.ocultacolumna = false;
            }

          } else {
            $scope.nucleo = true;
            $scope.busquedaFuncionario = false;
            $scope.vistacarne = false;
            $scope.solobusqueda = function () {
              $scope.hdeUserComfacor = true;
              $scope.nucleo = true;
              $scope.contenedor = true;
              $scope.panelanexos = true;
              $scope.limpiaipsdetalles();
              $scope.paneltwitter = false;
              $scope.ocultacolumna = true;
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

      $scope.busquedaAfiliado = function () {
        $scope.nucleo = true;
        $scope.afildata = [];
        setTimeout(function () { $scope.$apply(); }, 200);
        swal({
          title: 'Cargando información del afiliado'
        });
        swal.showLoading();

        if ($scope.type == "" || $scope.type == undefined) {
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

      $scope.mostrarAfiliado = function (type, id, carne, gpoblacion,tipo_afiliado) {
        sessionStorage.setItem("tipo", type);
        sessionStorage.setItem("doc", id);
        $scope.gpoblacion = gpoblacion;
        $scope.ValidaSisben(type, id);
        consultaHTTP.validaDirnovedad(type, id).then(function (res) {
          if (carne == "false" && $scope.sesdata.rolcod != -1) {
            $scope.contenedor = true;
            $scope.alertacarne();
            $scope.vercarne = 1;
            return;
          } else {
            $scope.contenedor = false;
             if($scope.afildata[0].REGIMEN == "C" && $scope.afildata.length > 1 && tipo_afiliado == "CABEZA DE FAMILIA"){
              $scope.vercertificadocontributivo = true;
            }else{
              $scope.vercertificadocontributivo = false;
            }
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
            } else {
              $scope.hdeUserComfacor = true;
            }

            if ($scope.afildata[i].T045 == "S") {
              $scope.hdeDesmovilizado = false;
            } else {
              $scope.hdeDesmovilizado = true;
            }


            $scope.correoelectronico = $scope.afildata[i].CORREO;
            $scope.documento = $scope.afildata[i].DOCUMENTO;;
            $scope.nombre_afiliado = $scope.afildata[i].NOMBRECOMPLETO;
            $scope.fecha_nacimiento = $scope.afildata[i].NACIMIENTO;
            $scope.genero = $scope.afildata[i].SEXO_CARNET;
            // $scope.ficha = $scope.afildata[i].FICHASISBEN;
            // $scope.nivel = $scope.afildata[i].NIVEL_SISBEN;
            $scope.departamento = $scope.afildata[i].UBICACIONGEOGRAFICA;
            $scope.municipio = $scope.afildata[i].NOMBRE;
            $scope.localidad = $scope.afildata[i].LOCALIDAD;
            $scope.fecha_afiliacion = $scope.afildata[i].FECHAAFILIACION;
            $scope.carne = $scope.afildata[i].CARNE;
            $scope.ipscapita = $scope.afildata[i].CAPITA;
            $scope.red = $scope.afildata[i].RED;
            $scope.nombre_grupo_p = $scope.afildata[i].NOMBRE_GRUPO_P;
            $scope.nombre_subgrupo_p = $scope.afildata[i].NOMBRE_SUBGRUPO_P;
            $scope.estadobdua = $scope.afildata[i].ESTADOBDUA;
            $scope.color_estado = "red";
            $scope.Consultar_Siniestros(type, id); // Altocosto - Siniestro
            /* */
            $scope.ficha = $scope.afildata[i].FICHASISBEN;
            $scope.nivel = $scope.afildata[i].NIVEL_SISBEN;
            $scope.puntaje_sisben = $scope.afildata[i].PUNTAJE_SISBEN;
            $scope.metodo_grupo_poblacional = $scope.afildata[i].METODO_GRUP_POBLACIONAL;
            $scope.grupopoblacionalcodigo = $scope.afildata[i].GRUPOPOBLACIONAL;
            $scope.nombre_grupo_p = $scope.afildata[i].NOMBRE_GRUPO_P;
            $scope.grupo_sisben_iv = $scope.afildata[i].GRUPO_SISBEN_IV;
            $scope.sub_grupo_sisben_iv = $scope.afildata[i].SUB_GRUPO_SISBEN_IV;
            $scope.causal_oficio = $scope.afildata[i].CAUSAL_OFICIO;
            console.log("metodo_grupo_poblacional: " + $scope.metodo_grupo_poblacional);
            console.log("grupopoblacionalcodigo: " + $scope.grupopoblacionalcodigo);
            console.log("grupopoblacional: " + $scope.nombre_grupo_p);
            console.log("grupo_sisben_iv: " + $scope.grupo_sisben_iv);
            console.log("sub_grupo_sisben_iv: " + $scope.sub_grupo_sisben_iv);
            console.log("nivel: " + $scope.nivel);
            console.log("ficha: " + $scope.ficha);
            console.log("puntaje_sisben: " + $scope.puntaje_sisben);
            console.log("causal_oficio: " + $scope.causal_oficio);

            /* */
            switch ($scope.afildata[i].ESTADO) {
              case "AC":
                $scope.estado = $scope.afildata[i].ESTADO_HOM;
                $scope.color_estado = "green";
                break;
              case "IN":
                $scope.estado = $scope.afildata[i].ESTADO_HOM;
                break;
              case "RE":
                $scope.estado = $scope.afildata[i].ESTADO_HOM;
                break;
              case "SU":
                $scope.estado = $scope.afildata[i].ESTADO_HOM;
                break;
              case "AF":
                $scope.estado = $scope.afildata[i].ESTADO_HOM;
                break;
              case "PL":
                $scope.estado = $scope.afildata[i].ESTADO_HOM;
                $scope.color_estado = "green";
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
        if ($scope.ipss) {
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
          template: 'views/afiliados/modal/modaldatoscontacto.html',
          className: 'ngdialog-theme-plain',
          controller: 'modaldatoscontactoController',
          scope: $scope,
          closeByEscape: false,
          closeByDocument: false,
          preCloseCallback: () => {
            //$scope.busquedaAfiliado();
            $scope.btnGenera = false;
            $scope.$apply();
          }
        });

        /*ngDialog.open({
          template: 'views/consultaAfiliados/modaleditardatos.html',
          className: 'ngdialog-theme-plain',
          controller: 'editardatosctrl',
          scope: $scope
        });*/
      }

      //Sisben
      $scope.CargarSoporte = function () {
        if ($scope.gpoblacion == '5') {
          $scope.ConsultaSisben($scope.tipo_documento, $scope.documento);
        } else {
          swal('Notificacion', 'No Pertenece Al Grupo Poblacional Del Sisben', 'info');
        }
      }

      $scope.ConsultaSisben = function (TDocumento, Documento) {
        swal({ title: 'Consultado Informacion' });
        swal.showLoading();
        afiliacionHttp.serviceFDC(TDocumento, Documento, 'ObtenerSisben').then(function (response) {
          var sisben = response.data;
          $scope.infosisben = sisben;
          $scope.Nombres = sisben.Nombres;
          $scope.Apellidos = sisben.Apellidos;
          $scope.TipoDocumentoSisben = sisben.TipoDocumento;
          $scope.DocumentoSisben = sisben.Documento;
          $scope.Sisben = sisben.Nivel;
          $scope.PuntajeSisben = sisben.Puntaje;
          $scope.FichaSisben = sisben.Ficha;
          $scope.CodigoMunicipio = sisben.CodigoMunicipio;
          $scope.Area = sisben.Area;
          $scope.Municipio = sisben.Municipio;
          $scope.FechaModificacion = sisben.FechaModificacion;
          $scope.FechaModificacionPersona = sisben.FechaModificacionPersona;
          $scope.Departamento = sisben.Departamento;
          $scope.Antiguedad = sisben.Antiguedad;
          $scope.Estado = sisben.Estado;
          $scope.AdminNombre = sisben.AdminNombre;
          $scope.AdminDireccion = sisben.AdminDireccion;
          $scope.AdminCorreo = sisben.AdminCorreo;
          $scope.AdminTelefonos = sisben.AdminTelefonos;
          $scope.IdRespuesta_Sisben = sisben.IdRespuesta;
          if ($scope.IdRespuesta_Sisben == 0) {
            $http({
              method: 'POST',
              url: "php/nucleofamiliar/funnovedadacb.php",
              data: { function: 'p_guardar_info_sisben_agrupacion', data: $scope.infosisben }
            }).then(function (res) {
              $scope.res = res.data;
              swal.close();
              if ($scope.res.codigo == '1') {
                $scope.AbrirSisben();
              } else {
                swal('Error', $scope.res.mensaje, 'error');
              }
            })
          } else {
            swal('Error', 'El Usuario No Se Encuentra En El Sisben', 'error');
          }
        });
      }

      $scope.AbrirSisben = function () {
        $scope.Nombres;
        $scope.Apellidos;
        $scope.TipoDocumentoSisben;
        $scope.DocumentoSisben;
        $scope.Sisben;
        $scope.PuntajeSisben;
        $scope.FichaSisben;
        $scope.CodigoMunicipio;
        $scope.Area;
        $scope.FechaModificacion;
        $scope.FechaModificacionPersona;
        $scope.Municipio;
        $scope.Departamento;
        $scope.Antiguedad;
        $scope.Estado;
        $scope.AdminNombre;
        $scope.AdminDireccion;
        $scope.AdminCorreo;
        $scope.AdminTelefonos;
        ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/sisben/hojadelsisben.html',
          className: 'ngdialog-theme-plain',
          controller: 'datosbasicoscontroller',
          scope: $scope,
          closeByDocument: false
        });
      }

      $scope.GuardarSisben = function () {
        var node = document.getElementById("Impri").firstElementChild.parentNode;
        domtoimage.toPng(node)
          .then(function (dataUrl) {
            $scope.Archivo = new Image();
            $scope.Archivo = dataUrl;
            $http({
              method: 'POST',
              url: "php/insertdoc.php",
              data: {
                tipo_doc: $scope.TipoDocumentoSisben,
                id: $scope.DocumentoSisben,
                typefile: '16',
                file: $scope.Archivo,
                type: 'png',
                path: '/cargue_ftp/Digitalizacion/Genesis/Aseguramiento/'
              }
            }).then(function (response) {
              if (response.data == 1) {
                swal({
                  title: 'Completado',
                  text: 'Adjunto cargado exitosamente',
                  type: 'success',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok',
                }).then(function (result) {
                  if (result) {
                    $scope.$estado = 'A';
                    $http({
                      method: 'GET',
                      url: "php/nucleofamiliar/cambiaestado.php",
                      params: {
                        estado: $scope.$estado, documento: $scope.DocumentoSisben
                      }
                    }).then(function (res) {
                      $scope.closeThisDialog();
                      $scope.mostrarAfiliado($scope.tipo_documento, $scope.documento, $scope.carne, $scope.gpoblacion,'A');
                    })
                  }
                });
              } else {
                swal('Mensaje', 'Error subiendo adjunto', 'error')
              }
            })
          }).catch(function (error) {
            console.log('oops, something went wrong!');
          });

      }

      $scope.Imprimir = function (Impri) {
        var innerContents = document.getElementById('Impri').innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=1100,height=1100,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" href="styles/nucleofamiliar.css"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
      }

      $scope.ValidaSisben = function (type, numero) {
        $http({
          method: 'POST',
          url: "php/nucleofamiliar/funnovedadacb.php",
          data: {
            function: 'VerificarCargeDeSoporteSisben',
            v_pdocumento: numero, v_ptipodocumento: type
          }
        }).then(function (res) {
          if (res.data == '0') {
            $scope.SisbenSoporte = false;
          } else {
            $scope.SisbenSoporte = true;
          }
        })
      }

      // CNVU
      $scope.openModalNacimientos = function () {
        $('#modalDatosNacimientos').modal('open');
        if ($scope.tipoIdNacimiento == null && $scope.tipoIdNacimiento == undefined) {
          $scope.tipoIdNacimiento = "SELECCIONAR";
          $scope.idNacimiento = "";
          $scope.hdeTablaNacimientos = true;
        } else {
          $scope.tipoIdNacimiento = "SELECCIONAR";
          $scope.idNacimiento = "";
          $scope.hdeTablaNacimientos = true;
        }
      }

      $scope.close = function () {
        $('#modalDatosNacimientos').modal('close');
      }

      $scope.busquedaInfoNacimiento = function () {
        swal({
          title: 'Cargando Información'
        });
        swal.showLoading();
        if ($scope.tipoIdNacimiento == "SELECCIONAR") {
          notification.getNotification('info', 'Seleccione un Tipo de Documento', 'Notificación');
          setTimeout(function () {
            swal.close();
          }, 1000);
        } else if ($scope.idNacimiento === undefined || $scope.idNacimiento == "" || $scope.idNacimiento == null) {
          notification.getNotification('error', 'Ingrese un Número de Identificación', 'Notificación');
          setTimeout(function () {
            swal.close();
          }, 1000);
        } else {
          $http({
            method: 'POST',
            url: "php/ips/func3047.php",
            data: {
              function: 'ConsultarInfoNacimiento',
              v_pdocumento: $scope.idNacimiento,
              v_ptipodocumento: $scope.tipoIdNacimiento
            }
          }).then(function (response) {
            if (response.data == '') {
              swal('Información', 'No se encontró información', 'error');
              $scope.hdeTablaNacimientos = true;
            } else {
              swal.close();
              $scope.hdeTablaNacimientos = false;
              $scope.infoNacimientos = response.data;
            }
          })
        }
      }

      $scope.verSoporte = function (rutaNacimiento) {
        $http({
          method: 'POST',
          url: "php/ips/func3047.php",
          data: {
            function: 'verSoporte',
            ruta: rutaNacimiento
          }
        }).then(function (response) {
          // $scope.file = ('Genesis/temp/' + response.data);
          $scope.file = ('temp/' + response.data);
          // window.open('https://www.cajacopieps.com/' + $scope.file);
          window.open($scope.file);
        });
      }
      // 
      // Altocosto - Siniestro
      $scope.Consultar_Siniestros = function (tipo, num) {
        $scope.Siniestros = null;
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/gestionsiniestros.php",
          data: {
            function: 'Consultar_Siniestros_Datos_Basicos',
            Tipo_Doc: tipo,
            Num_Doc: num
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br' && !response.data[0].Codigo) {
            console.log(JSON.stringify(response.data));
            $scope.Siniestros = response.data;
          }
        });
      }
      // Altocosto - Siniestro

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


    }]);
