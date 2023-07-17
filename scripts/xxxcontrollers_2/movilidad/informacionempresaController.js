'use strict';
angular.module('GenesisApp')
  .controller('informacionempresaController', ['$scope', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
    function ($scope, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {

      $scope.actualizar = function () {
        if ($scope.updapersonal == false) {
          $('#razonsocial').removeAttr('disabled', 'disabled');
          $('#siglas').removeAttr('disabled', 'disabled');
          $('#primerapellido').removeAttr('disabled', 'disabled');
          $('#segundoapellido').removeAttr('disabled', 'disabled');
          $('#primernombre').removeAttr('disabled', 'disabled');
          $('#segundonombre').removeAttr('disabled', 'disabled');
          $('#actualizar').removeAttr('disabled', 'disabled');
          $('#nomrepresentante').removeAttr('disabled', 'disabled');
          $('#tdrepresentante').removeAttr('disabled', 'disabled');
          $('#drepresentante').removeAttr('disabled', 'disabled');
          $('#correorepresentante').removeAttr('disabled', 'disabled');
          $('#fnrepresentante').removeAttr('disabled', 'disabled');
          $('#actualizar2').removeAttr('disabled', 'disabled');
          $scope.formuempresa3 = false;
        } else {
          $('#formuempresa').find('input, textarea, select').attr('disabled', 'disabled');
          $('#formuempresa2').find('input, textarea, select').attr('disabled', 'disabled');
          $scope.formuempresa3 = true;
          $('#actualizar2').attr('disabled', 'disabled');
          $('#actualizar').attr('disabled', 'disabled');


        }
      }

      //CARGAR DEPARTAMENTO
      $http({
        method: 'POST',
        url: "php/funclistas.php",
        data: { function: 'cargaDepartamentos' }
      }).then(function (response) {
        $scope.Departamentos = response.data;
      });
      //CARGAR MUNICIPIO
      $scope.filterMunicipio = function (data) {
        var combo = document.getElementById("depaprincipal");
        var selected = data;
        // console.log(selected);
        $http({
          method: 'POST',
          url: "php/funclistas.php",
          data: { function: 'cargaMunicipios', depa: selected }
        }).then(function (response) {
          $scope.municipio = "";
          $scope.Municipios = response.data;
          $scope.munprincipal = "";
        });
      }
      $scope.inserpersonal = true;
      $scope.updapersonal = true;
      $scope.actualizar();
      $scope.solafiliado = true;
      $scope.documento_empleado = "";
      $scope.tipo_documento_empleado = '0';
      $http({
        method: 'POST',
        url: "php/movilidad/funcmovilidad.php",
        data: {
          function: 'actulizarfecha90'
        }
      }).then(function (response) {
        if (response.data.coderror == 1) {
          ngDialog.open({
            template: 'views/movilidad/actualizarinfoempresa.html',
            closeByDocument: false,
            closeByEscape: false,
            showClose: false,
            className: 'ngdialog-theme-default',
            width: '80%',
            scope: $scope
          });
        }
        $scope.fechamod = response.data.mensaje;
      });

      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'actulizarfecha90'
          }
        }).then(function (response) {
          if (response.data.coderror == 1) {
            ngDialog.open({
              template: 'views/movilidad/actualizarinfoempresa.html',
              closeByDocument: false,
              closeByEscape: false,
              showClose: false,
              className: 'ngdialog-theme-plain',
              width: '80%',
              scope: $scope
            });
          }
          $scope.fechamod = response.data.mensaje;
        });
      });

      $scope.solicitud = {
        tipotramite: '0',
        tipo_documento: '0',
        asesor: '0',
        lugar: '0',
        tipousuario: '0'
      }


      $.getJSON("php/obtenersession.php")
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("Error obteniendo session variables");
        });
      $http({
        method: 'POST',
        url: "php/movilidad/funcmovilidad.php",
        data: {
          function: 'listaAsesores'
        }
      }).then(function (response) {
        $scope.asesores = response.data;
      });
      $http({
        method: 'POST',
        url: "php/movilidad/funcmovilidad.php",
        data: {
          function: 'listarSedes'
        }
      }).then(function (response) {
        $scope.lugares = response.data;
      });

      $scope.actualizarinformacionemp = function () {
        ngDialog.open({
          template: 'views/movilidad/actualizarinfoempresa.html',
          closeByDocument: false,
          closeByEscape: false,
          showClose: false,
          className: 'ngdialog-theme-plain',
          width: '80%',
          scope: $scope
        });
      }
      $scope.busquedaEmpleado = function () {
        $scope.panelinfoafiliado = false;
        swal({
          title: 'Guardando información'
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'consultaEmpleado',
            tipodocumento: $scope.tipo_documento_empleado,
            documento: $scope.documento_empleado,
          }
        }).then(function (response) {
          swal.close();
          if (response.data.coderror == 0) {
            $scope.inserpersonal = false;
            $scope.updapersonal = true;
            $scope.actualizar();
            $scope.registrarmensaje = response.data.mensaje;
          } else {
            $scope.nombre = response.data[0].nombre;
            $scope.direccion_emp = response.data[0].direccion;
            $scope.sede_emp = response.data[0].sede;
            $scope.contacto = response.data[0].contacto;
            $scope.updapersonal = false;
            $scope.actualizar();
            $scope.inserpersonal = true;
          }
        });
      }

      $scope.registraEmpleado = function () {
        if ($scope.solicitud.lugar == "0" || $scope.nombre_empleado == "" || $scope.nombre_empleado === undefined) {
          swal('Información', 'Ingrese la información completa para finalizar el registro', 'info')
        } else {
          $http({
            method: 'POST',
            url: "php/movilidad/funcmovilidad.php",
            data: {
              function: 'registraEmpleado',
              tipodocumento: $scope.tipo_documento_empleado,
              documento: $scope.documento_empleado,
              sede: $scope.solicitud.lugar,
              nombre: $scope.nombre_empleado,
              correo: $scope.correo_empleado,
              tipo: 'I'
            }
          }).then(function (response) {
            if (response.data.coderror == "1") {
              swal('Completado', response.data.mensaje, 'success')
              $scope.busquedaEmpleado();
            } else {
              swal('Información', response.data.mensaje, 'error')
            }
          });
        }
      }
      // 
      $scope.archivos = [{ codigo: "59", nombre: "CARTA DE LA SOLICITUD" },
      { codigo: "45", nombre: "CÁMARA DE COMERCIO (NO MAYOR A 90 DÍAS" },
      { codigo: "41", nombre: "RUT" },
      { codigo: "57", nombre: "FOTOCOPIA DEL DOCUMENTO DEL REPRESENTANTE LEGAL" },
      { codigo: "40", nombre: "FORMULARIO DE INSCRIPCIÓN - EMPRESAS" }
      ];
      console.log($scope.archivos);
      //TAB I
      $scope.setTab3 = function (newTab) {
        $scope.ta3 = newTab;
        $(".taI").removeClass("tabactiva");
        $(".taII").removeClass("tabactiva");
        $(".taIII").removeClass("tabactiva");

        switch (newTab) {
          case 1:
            $(".taI").addClass("tabactiva");
            break;
          case 2:
            $(".taII").addClass("tabactiva");
            break;
          case 3:
            $(".taIII").addClass("tabactiva");
            break;
          default:
        }
      }
      $scope.Imprimirinfor = function () {
        $window.open('views/movilidad/soporte/inforempresa.php?tipo=' + $scope.infoempresa.tidentificacion +
          '&id=' + $scope.infoempresa.nidentificacion, '_blank', "width=1080,height=1100");
      }
      $scope.isSet3 = function (tabNum) {
        return $scope.ta3 === tabNum;
      }
      $scope.setTab3(1);
      //TAB F
      //VARIABLES INICIALES
      $scope.tablaarchivos = [];
      $scope.infoempresa = {
        tidentificacion: "",
        nidentificacion: "",
        razonsocial: "",
        siglas: "",
        ntrabajadores: "",
        primerapellido: "",
        segundoapellido: "",
        primernombre: "",
        segundonombre: "",
        templador: "",
        tipoempresas: "",
        claseaportante: "",
        clasificacion: "",
        actividad: "",
        pago: "",
        ciudadpagos: "",
        dirprincipal: "",
        barprincipal: "",
        munprincipal: "",
        telprincipal: "",
        depaprincipal: "",
        nomsede: "",
        sitioweb: "",
        email: "",
        nomrepresentante: "",
        tdrepresentante: "",
        drepresentante: "",
        fnrepresentante: "",
        correorepresentante: "",
        nomcargo: "",
        telcargo: "",
        celcargo: "",
        fncargo: "",
        cargo: "",
        emailcargo: ""
      };
      //funciones inicicilaes

      function letsWaitALittle() {
        $scope.BuscarEmpresa();
        $('#formuempresa').find('input, textarea, select').attr('disabled', 'disabled');
        $('#formuempresa2').find('input, textarea, select').attr('disabled', 'disabled');

      }
      setTimeout(letsWaitALittle, 0);
      $scope.chgBusquedaListado = function () {
        var keyword = '';
        var listado = 'apoc_tipo_documento';
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: { function: 'obtenerListados', vp_listado: listado, vp_key: keyword }
        }).then(function (response) {
          console.log(response.data);
          $scope.tdocuemnto = response.data;
        });
      }
      $scope.BuscarEmpresa = function () {
        swal({
          title: 'Cargando información..'
        });
        swal.showLoading();
        $scope.OcultarBase = true;
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'obtener_informacion_empresa_empresas'
          }
        }).then(function (response) {
          swal.close();
          if (response.data.coderror == 0) {
            swal('Informancion', response.data.mensaje, 'info');
          } else {
            $scope.Sedes = response.data.lista_sucursales;
            $scope.llenarform(response.data.info_empresa);
          }
        })
      }
      $scope.llenarform = function (objeto) {
        console.log(objeto);
        //Estado
        $scope.nreguistro = objeto.numero_registro;
        $scope.codigoUbicacion = objeto.codigo_ubicacion;
        if (objeto.codigo_estado_registro == 'A') {
          $scope.OcultarActivacion = true;
        } else {
          $scope.OcultarActivacion = false;
        }

        $scope.Ocultarform = false;
        $scope.OcultarArchivo = true;
        $scope.Ocultarcontra = true;
        $scope.OcultarTablaEmpleados = true;
        $scope.OcultarTablaNovedades = true;


        //formulario 1
        $scope.infoempresa.codigoubicacion = objeto.codigo_ubicacion;
        $scope.infoempresa.nreguistro = objeto.numero_registro;
        $scope.infoempresa.numeroformulario = objeto.numero_formulario;
        $scope.infoempresa.tidentificacion = objeto.codigo_tipo_documento;
        $scope.infoempresa.tidentificacionn = objeto.tipo_documento;
        $scope.infoempresa.nidentificacion = parseInt(objeto.documento),
        $scope.infoempresa.razonsocial = objeto.razon_social;
        $scope.infoempresa.siglas = objeto.sigla;
        $scope.infoempresa.primerapellido = objeto.apoc_primer_apellido;
        $scope.infoempresa.segundoapellido = objeto.apoc_segundo_apellido;
        $scope.infoempresa.primernombre = objeto.apoc_primer_nombre;
        $scope.infoempresa.segundonombre = objeto.apoc_segundo_nombre;
        $scope.infoempresa.templador = objeto.tipo_empleador;
        $scope.infoempresa.tipoempresas = objeto.tipo_persona;
        $scope.infoempresa.claseaportante = objeto.clase_empleador;
        $scope.infoempresa.pago = objeto.forma_pago;
        $scope.infoempresa.clasificacion = objeto.clasificacion;
        $scope.infoempresa.actividad = objeto.actividad;

        $scope.infoempresa.fvigencia = objeto.fecha_vigencia;
        $scope.infoempresa.vigencia = objeto.vigencia;
        //formulario 2
        $scope.infoempresa.nomrepresentante = objeto.representante;
        $scope.infoempresa.tdrepresentante = objeto.tipo_doc_representante;
        $scope.infoempresa.drepresentante = objeto.doc_representante;
        $scope.infoempresa.fnrepresentante = objeto.f_nacimiento_representante;
        $scope.infoempresa.correorepresentante = objeto.correo_representante;
        $scope.infoempresa.cargo = objeto.cargo_resoponsable;
        $scope.infoempresa.nomcargo = objeto.nombre_responsable;
        $scope.infoempresa.celcargo = objeto.celular_responsable;
        $scope.infoempresa.emailcargo = objeto.correo_responsable;
        $scope.infoempresa.telcargo = objeto.telefono_responsable;
        $scope.infoempresa.fncargo = objeto.f_nacimiento_responsable;
      }
      $scope.actualizarinfor1 = function () {
        if ($scope.infoempresa.tidentificacion == 'C') {
                    $scope.infoempresa.razonsocial = $scope.infoempresa.primerapellido + " "
                        + $scope.infoempresa.segundoapellido + " " + $scope.infoempresa.primernombre + " " + $scope.infoempresa.segundonombre;
                    console.log($scope.infoempresa.razonsocial)
        }
        $scope.novedad = "CRS";
        if (($scope.infoempresa.razonsocial == null) || ($scope.infoempresa.razonsocial == "   " || $scope.infoempresa.razonsocial == undefined)) {
              swal('Información', 'Para hacer el cambio de la Razon social, el campo debe contener datos', 'error');
          } else {
              $scope.openmodal = ngDialog.open({
              template: 'views/movilidad/modal/modalSubirArchivo.html',
              className: 'ngdialog-theme-plain',
              scope: $scope,
              closeByEscape: false,
              closeByDocument: false
            });
          }
      }
      $scope.actualizarinfor2 = function () {
        //$("#tdrepresentante")[0].value;
        $scope.infoempresa.tdrepresentante = document.querySelector("#tdrepresentante").value;
        //document.getElementById('tdrepresentante').value;
        if (
            ($scope.infoempresa.nomrepresentante == null) || ($scope.infoempresa.nomrepresentante == "") || ($scope.infoempresa.nomrepresentante == undefined) ||
            // ($scope.infoempresa.tipo_doc_representante==null)||($scope.infoempresa.tipo_doc_representante=="")||($scope.infoempresa.tipo_doc_representante==undefined)||
            ($scope.infoempresa.drepresentante == null) || ($scope.infoempresa.drepresentante == "") || ($scope.infoempresa.drepresentante == undefined) ||
            ($scope.infoempresa.fnrepresentante == null) || ($scope.infoempresa.fnrepresentante == "") || ($scope.infoempresa.fnrepresentante == undefined) ||
            ($scope.infoempresa.correorepresentante == null) || ($scope.infoempresa.correorepresentante == "") || ($scope.infoempresa.correorepresentante == undefined)
        ) {
            swal('Información', 'Para hacer el cambio de los datos del representante legal, los campo debe estar llenos', 'error');
        } else {
          $scope.novedad = "CRL";
          $scope.actualizarinfor = ngDialog.open({
            template: 'views/movilidad/modal/modalSubirArchivo.html',
            className: 'ngdialog-theme-plain',
            scope: $scope,
            closeByEscape: false,
            closeByDocument: false
          });
        }
      }
      $scope.obtenerBase = function () {
        if ($("#adjunto")[0].files[0].size > 7340032) {
          //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
          notification.getNotification('warning', 'El archivo excede el peso limite (7 MB)', 'Notificación');
          $("#adjunto")[0].value = "";
          $scope.archivobase = "";
          $scope.extensionarchivo = "";
        } else {
          if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
            var FR = new FileReader();
            FR.addEventListener("load", function (e) {
              $scope.adjunto = $("#adjunto")[0].value;
              $scope.archivobase = e.target.result;
              var name = $("#adjunto")[0].files[0].name;
              $scope.extensionarchivo = name.split('.').pop();
            });
            FR.readAsDataURL($("#adjunto")[0].files[0]);
          }
        }
      }
      $scope.subirdoc = function (nanexo, anexo, nombreadjunto) {
        var nanexo = nanexo;
        var anexo = anexo;
        var nombreadjunto = nombreadjunto;
        var error = false;
        if ( (nombreadjunto == "") || (nombreadjunto == null) ||  (nombreadjunto == undefined) || ($scope.adjunto == null) || (anexo == undefined)) {
          swal('Mensaje', 'Seleccione primero el Tipo y sube el Archivo correspondiente ', 'error')
        } else {
          console.log($scope.tablaarchivos);
          $scope.datosComp = $scope.tablaarchivos
          var length = $scope.datosComp.length;
          for (var i = 0; i < length; i++) {
            if ($scope.datosComp[i].codigo == anexo) {
              error = true;
              swal('Mensaje', 'El tipo de archivo ya se encuentra subidos  ', 'error')
            }
          }
          if (error == false) {
            $scope.tablaarchivos.push({
              tipodoc: $scope.infoempresa.tidentificacion,
              numero: $scope.infoempresa.nidentificacion,
              codigo: anexo,
              achivobase: $scope.archivobase,
              ext: $scope.extensionarchivo,
              nombre: nombreadjunto,
              nanexo: nanexo
            });
            console.log($scope.tablaarchivos);
            $scope.cantidad();
            // $scope.anexo=undefined;
            // $scope.nombreadjunto=undefi;
            // $scopeadjunto=null;
            $("#tipoanexo").val('');
            $("#nombreadjunto").val('');
            $("#adjunto").val('');
          }
        }
      }
      $scope.removeItem = function (x) {
        $scope.tablaarchivos.splice(x, 1);
        $scope.documentossubidos = $scope.documentossubidos - 1;
        $scope.cantidad();

      }

      $scope.cantidad = function () {
        if ($scope.tablaarchivos.length == $scope.archivos.length) {
          $scope.enviar = true;
        } else {
          $scope.enviar = false;
        }
      }
      $scope.enviradjuntosactualizacion = function () {

        var archivosasubir = JSON.stringify($scope.tablaarchivos);
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'guardaradjuntosempresasnuevas',
            data: archivosasubir
          }
        }).then(function (response) {

          if (response.data.codigo == 0) {
            console.log("subio perfectamente")
            $scope.validarproceso = true;
          } else {
            console.log("Archivos no subidos")
            $scope.validarproceso = false;

          }
        });
      }
      $scope.enviradjuntos = function () {
        var archivosasubir = JSON.stringify($scope.tablaarchivos);
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'guardaradjuntosempresasnuevas1',
            data: archivosasubir
          }
        }).then(function (response) {
          console.log(response);
          if (response.data) {
            // console.log(response.data)
            var ruta = response.data;
            // var ruta="";
            var responsable = 'E';
            console.log("subio perfectamente")
            $scope.validarproceso = true;
            $http({
              method: 'POST',
              url: "php/movilidad/funcmovilidad.php",
              data: {
                function: 'generarnovedad',
                numero_aportante: $scope.nreguistro,
                ubicacion_aportante: $scope.codigoUbicacion,
                novedad: $scope.novedad,
                razon_social: $scope.infoempresa.razonsocial,
                v_sigla : $scope.infoempresa.siglas,
                nombre_representante: $scope.infoempresa.nomrepresentante,
                documento_representante: $scope.infoempresa.drepresentante,
                nacimiento_representante: $scope.infoempresa.fnrepresentante,
                tdrepresentante: $scope.infoempresa.tdrepresentante== '' ? document.querySelector("#tdrepresentante").value : $scope.infoempresa.tdrepresentante ,
                correo_representante: $scope.infoempresa.correorepresentante,
                correo_representante: $scope.infoempresa.correorepresentante,
                responsable: responsable,
                adjunto: ruta
              }
            }).then(function (response) {
              if (response.data.codigo == 0) {

                $scope.openmodal.close();
                swal('Completado', response.data.mensaje, 'success');

              } else {
                swal('Información', response.data.mensaje, 'error');
              }
            })

          } else {
            console.log("Archivos no subidos")
            $scope.validarproceso = false;

          }
        });
      }
      $scope.enviartablaadjuntos = function () {

        var archivosasubir = JSON.stringify($scope.tablaarchivos);
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'guardaradjuntosempresasnuevas3',
            data: archivosasubir
          }
        }).then(function (response) {

          $scope.resultado = response.data;

          if ($scope.resultado.length == '0') {
            swal('Información', 'Archivos no subidos', 'error');
          } else {
            console.log("subio perfectamente")
            var responsable = 'E';
            var cantidadAdjuntos = $scope.tablaarchivos.length;
            $scope.validarproceso = true;
            $http({
              method: 'POST',
              url: "php/movilidad/funcmovilidad.php",
              data: {
                function: 'generarnovedad',
                numero_aportante: $scope.nreguistro,
                ubicacion_aportante: $scope.codigoUbicacion,
                novedad: $scope.novedad,
                razon_social: $scope.infoempresa.razonsocial,
                v_sigla : $scope.infoempresa.siglas,
                nombre_representante: $scope.infoempresa.nomrepresentante,
                documento_representante: $scope.infoempresa.drepresentante,
                nacimiento_representante: $scope.infoempresa.fnrepresentante,
                tdrepresentante: $scope.infoempresa.tdrepresentante== '' ? document.querySelector("#tdrepresentante").value : $scope.infoempresa.tdrepresentante ,
                correo_representante: $scope.infoempresa.correorepresentante,
                correo_representante: $scope.infoempresa.correorepresentante,
                responsable: responsable,
                responsable_cedula: $scope.documento_empleado,
                adjunto: JSON.stringify($scope.resultado),
                cantidad_adjnto: cantidadAdjuntos

              }
            }).then(function (response) {
              console.log(response);
              if (response.data.codigo == 1) {

                swal('Información', response.data.mensaje, 'error');


              } else {

                swal('Completado', response.data.mensaje, 'success');
                $scope.enviar = false;
                $scope.tablaarchivos = [];
                $scope.openmodal.close();
              }

            });
          }

        });

      }
      $scope.modalAprovaReguistro = function () {

        var modalAprovaReguistro = ngDialog.open({
          template: 'views/movilidad/modal/modalAprovaReguistro.html',
          className: 'ngdialog-theme-plain',
          scope: $scope
        });
        $scope.refreshConversacion();
      }
      $scope.fileaprob = {}
      $scope.existFile = false;
      $scope.hdePanelConver = true;
      $scope.hdePanelInfo = false;
      $scope.isRolAprob = true;
      $scope.TipoArchivo = "";
      $scope.mostrarsDoc = true;
      $http({
        method: 'GET',
        url: "php/obtenersession.php",
      }).then(function (resp) {
        if (resp.data.rolcod == "90" || resp.data.rolcod == "0") {
          $scope.isRolAprob = false
        } else {
          $scope.isRolAprob = true
        }
      });
      //refrescar la conversacion ya
      $scope.refreshConversacion = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'listaConversacion',
            v_tipo_documento: $scope.infoempresa.tidentificacion,
            v_documento: $scope.infoempresa.nidentificacion
          }
        }).then(function (response) {
          console.log(response.data);
          $scope.Conversacion = response.data;
          if ($scope.Conversacion.length == 0) {
            $scope.shwConversacion = false
          } else {
            $scope.shwConversacion = true,
              setTimeout(function () { $('#mensajes').scrollTop($('#mensajes').height() + 450000000); }, 1000)
            $scope.Conversacion[0].estado == "A" ? (
              $('#frmMensaje').find('input, textarea, button').attr('disabled', true), $scope.divAprobado = false
            ) : (
                $('#frmMensaje').find('textarea').attr('disabled', false), $scope.divAprobado = true
              )
          }

          swal.close();
        });
      }
      //descargar archivo ya
      $scope.descargafile = function (ruta) {
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
          window.open("temp/" + response.data);
        });
      }
      // Seleciona Archivo para descargar
      $scope.seleccionaFile = function () {
        $('#archivoVb').trigger('click');
      }
      //enviar mensaje ya
      $scope.mensajechat = function (ruta) {
        var v_ruta = ruta;
        $scope.estado = 'R';
        $scope.descripcion = $scope.fileaprob.mensaje;
        $http({
          method: 'POST',
          url: "php/movilidad/funcmovilidad.php",
          data: {
            function: 'enviar_respuesta',
            v_numero_empresa: $scope.nreguistro,
            v_ubicacio: $scope.codigoUbicacion,
            v_accion: $scope.estado,
            v_comentario: $scope.descripcion,
            v_ruta: v_ruta,
            v_tipo_archivo: $scope.tablaarchivos.anexo
          }
        }).then(function (response) {
          if (response.data.codigo == 0) {
            swal('Completado', response.data.mensaje, 'success');
            $scope.fileaprob.mensaje = "";
            $scope.refreshConversacion();
            $scope.tablaarchivos = [];
            $scope.adjunto = "";
            $scope.nombreadjunto = "";
            var inputImage = document.getElementById("adjunto");
            inputImage.value = '';
            var inputImage = document.getElementById("nombreadjunto");
            inputImage.value = '';
          } else {
            swal('Información', response.data.mensaje, 'error');
            $scope.refreshConversacion();
          }
        })
      }
      $scope.enviaMensaje = function () {
        var ruta = "";
        $scope.tablaarchivos.push({
          tipodoc: $scope.infoempresa.tidentificacion,
          numero: $scope.infoempresa.nidentificacion,
          codigo: $scope.tablaarchivos.anexo,
          achivobase: $scope.archivobase,
          ext: $scope.extensionarchivo,
          nombre: $scope.nombreadjunto
        });
        console.log($scope.tablaarchivos);

        if ($scope.tablaarchivos.anexo == "" || $scope.tablaarchivos.achivobase == "" || $scope.tablaarchivos == undefined) {
          $scope.tablaarchivos.anexo = "";
          $scope.tablaarchivos.achivobase = "";
          $scope.tablaarchivos = [];
          $scope.archivobase = "";
          ruta = "";
          $scope.mensajechat(ruta);
        } else {
          var archivosasubir = JSON.stringify($scope.tablaarchivos);
          $http({
            method: 'POST',
            url: "php/movilidad/funcmovilidad.php",
            data: {
              function: 'guardaradjuntosempresasnuevas1',
              data: archivosasubir
            }
          }).then(function (response) {
            if (response.data == undefined) {
              swal('Completado', "Archivo No Subido", 'success');
              ruta = "";
              $scope.tablaarchivos = [];
              $scope.tablaarchivos.anexo = "";
              $scope.tablaarchivos.achivobase = "";
              $scope.mensajechat(ruta);

            } else {
              ruta = response.data;
              $scope.mensajechat(ruta);
              $scope.tablaarchivos.anexo = "";
              $scope.tablaarchivos.achivobase = "";
              $scope.tablaarchivos = [];
             
            }
          })
        }
      }
      $scope.EditarSede = function (sede, nombre, empleados, direccion, barrio, correo, telefono, renglon) {

        var DialogInfoBasEmp = ngDialog.open({
          template: 'views/movilidad/modal/modaleditarsede.html',
          className: 'ngdialog-theme-plain',
          controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {

            afiliacionHttp.obtenerDocumento().then(function (response) {

              $scope.sede = sede;
              $scope.nombre = nombre;
              $scope.empleados = parseInt(empleados);
              $scope.direccion = direccion;
              $scope.barrio = barrio;
              $scope.correo = correo;
              $scope.telefono = telefono;
              $scope.renglon = renglon;

            })
            $scope.regDireccion = function () {
              $("#files_afiliado").focus();
              $scope.dialogDireccion = ngDialog.open({
                template: 'views/movilidad/modal/modalDireccion.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalDireccionCtrl',
                scope: $scope
              });
              $scope.dialogDireccion.closePromise.then(function (data) {
                if (data.value != "$document" && data.value != "$escape") {
                  $scope.direccion = data.value;
                }
              });
            }
            $scope.Informacion = function () {
              if ($scope.direccion == "" || $scope.direccion == undefined || $scope.direccion == "" || $scope.direccion == undefined ||
                $scope.telefono == "" || $scope.telefono == undefined || $scope.correo == "" || $scope.correo == undefined ||
                $scope.munprincipal == "" || $scope.munprincipal == undefined || $scope.munprincipal == "" || $scope.munprincipal == undefined ||
                $scope.nombre == "" || $scope.nombre == undefined || $scope.empleados == "" || $scope.empleados == undefined) {
                swal('Información', "Debe llenar todos los campos antes de agregar", 'error');
              } else {
                swal({
                  title: 'Confirmar',
                  text: '¿Desea editar la informacion?',
                  type: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Editar'
                }).then((result) => {
                  if (result) {
                    $http({
                      method: 'POST',
                      url: "php/movilidad/funcmovilidad.php",
                      data: {
                        function: 'editar_sede_novedad',
                        v_numero: $scope.nreguistro,
                        v_ubicacion: $scope.codigoUbicacion,
                        v_renglon: $scope.renglon,
                        v_new_ubicacion: $scope.munprincipal,
                        v_new_direccion: $scope.direccion,
                        v_new_barrio: $scope.barrio,
                        v_new_telefono: $scope.telefono,
                        v_new_email: $scope.correo,
                        v_new_nombre: $scope.nombre,
                        v_cantidad_empleados: $scope.empleados,
                        v_responsable: $scope.documento_empleado
                      }
                    }).then(function (response) {
                      if (response.data.codigo == 0) {
                        swal('Completado', response.data.mensaje, 'success');
                        $scope.closeThisDialog();
                      } else {
                        swal('Información', response.data.mensaje, 'error');
                      }
                    })
                  }
                })

              }
            }
          }],
          scope: $scope
        })
        DialogInfoBasEmp.closePromise.then(function () {
          $scope.BuscarEmpresa();
        })
      }
      $scope.AgregarSede = function (nreguistro, codigoUbicacion) {
        var DialogInfoBasEmp = ngDialog.open({
          template: 'views/movilidad/modal/modaleditarsede.html',
          className: 'ngdialog-theme-plain',
          controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {

            $scope.nreguistro = nreguistro;
            $scope.codigoUbicacion = codigoUbicacion;
            $scope.sede = "";
            $scope.nombre = "";
            $scope.empleados = "";
            $scope.direccion = "";
            $scope.barrio = "";
            $scope.correo = "";
            $scope.telefono = "";

            $scope.regDireccion = function () {
              $("#files_afiliado").focus();
              $scope.dialogDireccion = ngDialog.open({
                template: 'views/movilidad/modal/modalDireccion.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalDireccionCtrl',
                scope: $scope
              });
              $scope.dialogDireccion.closePromise.then(function (data) {
                if (data.value != "$document" && data.value != "$escape") {
                  $scope.direccion = data.value;
                }
              });
            }
            $scope.Informacion = function () {
              if ($scope.direccion == "" || $scope.direccion == undefined || $scope.direccion == "" || $scope.direccion == undefined ||
                $scope.telefono == "" || $scope.telefono == undefined || $scope.correo == "" || $scope.correo == undefined ||
                $scope.munprincipal == "" || $scope.munprincipal == undefined || $scope.munprincipal == "" || $scope.munprincipal == undefined ||
                $scope.nombre == "" || $scope.nombre == undefined || $scope.empleados == "" || $scope.empleados == undefined) {
                swal('Información', "Debe llenar todos los campos antes de agregar", 'error');
              } else {
                swal({
                  title: 'Confirmar',
                  text: '¿Desea guardar la información?',
                  type: 'question',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Guardar'
                }).then((result) => {
                  if (result) {
                    $http({
                      method: 'POST',
                      url: "php/movilidad/funcmovilidad.php",
                      data: {
                        function: 'guardarsede',
                        v_pnumero: $scope.nreguistro,
                        v_pubicacion: $scope.munprincipal,
                        v_ubicacion_apo : $scope.infoempresa.codigoubicacion,
                        v_pdireccion: $scope.direccion,
                        v_pbarrio: $scope.barrio,
                        v_telefono: $scope.telefono,
                        v_email: $scope.correo,
                        v_nombre_sede: $scope.nombre,
                        v_cantidad_empleados: $scope.empleados
                      }
                    }).then(function (response) {
                      if (response.data.codigo == 0) {
                        swal('Completado', response.data.mensaje, 'success');
                        $scope.BuscarEmpresa();
                        $scope.closeThisDialog();
                      } else {
                        swal('Información', response.data.mensaje, 'error');
                      }
                    })
                  }
                })
              }

            }
          }],
          scope: $scope
        })
        DialogInfoBasEmp.closePromise.then(function () {
          $scope.BuscarEmpresa();
        })
      }

    }
  ]);
