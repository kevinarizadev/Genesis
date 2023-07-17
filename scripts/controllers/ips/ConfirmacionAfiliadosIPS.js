'use strict';
angular.module('GenesisApp')
  .controller('ConfirmacionAfiliadosIPS', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar', 'afiliacionHttp',
    function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar, afiliacionHttp) {
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat).done(function (respuesta) {
        $scope.sesdata = respuesta;
        $scope.cedula = $scope.sesdata.cedula;
        $scope.ubicacionresponsable = $scope.sesdata.codmunicipio;
        $scope.ListarInformacion();
        $('#modal12').modal();
        $('#modalFormularioAfi').modal();
      })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });
      $scope.informacion = new Array();
      $scope.historial = { filtrar: '', afiliado: '', estado: 'A', inicio: '', fin: '' };

      var hoy = new Date();
      var dd = hoy.getDate();
      var mm = hoy.getMonth() + 1; //hoy es 0!
      var yyyy = hoy.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      $scope.maxDate = yyyy + '-' + mm + '-' + dd;
      $scope.TablaSoporte = false;
      $scope.Ocultar = true;
      $scope.TablaDeInformacion = false;
      $scope.EditarDeInformacion = true;

      $scope.ListarInformacion = function () {
        // $scope.historial.inicio
        // $scope.historial.fin
        if (($scope.historial.inicio != null && $scope.historial.fin == null) || ($scope.historial.inicio == null && $scope.historial.fin != null)) {
          swal('Genesis informa', 'Debe seleccionar ambas fechas', 'warning'); return false;
        }
        if (($scope.historial.inicio != null && $scope.historial.fin != null) && ($scope.historial.inicio > $scope.historial.fin)) {
          swal('Genesis informa', 'La fecha de inicio no puede ser mayor a la fecha fin', 'warning'); return false;
        }
        if (($scope.historial.estado in { 'P': 'P', 'X': 'X', 'T': 'T' }) && ($scope.historial.inicio == "" || $scope.historial.fin == "")) {
          swal('Genesis informa', 'Por favor indicar una fecha', 'warning'); return false;
        }

        $http({
          method: 'POST',
          url: "php/ips/func3047.php",
          data: {
            function: 'ListarAfiliacionXConfirmar', usuario: $scope.cedula, filtro: $scope.historial.afiliado,
            estado: $scope.historial.estado, inicio: $scope.GetFecha('historial', 'inicio'), fin: $scope.GetFecha('historial', 'fin')
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            console.log(response.data);
            if (response.data.length > 0) {
              $scope.informacion = response.data;
              $scope.listDatosTemp = response.data;
              $scope.regimen = $scope.informacion[0].regimen_estado;
              $scope.cantidad = response.data.length;
              setTimeout(function () {
                setTimeout(() => { $scope.$apply(); }, 500);
              }, 500);
            } else {
              $scope.informacion = new Array();
              setTimeout(() => { $scope.$apply(); }, 500);
              swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });

      }

      $scope.data = {
        tipo_documento: '',
        documento: '',
        nombre_afiliado: '',
        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        departamento: '',
        municipio: '',
        cod_mun: '',
        fecha_nacimiento: '',
        sexo: '',
        genero: '',
        fecha_afiliacion: '',
        direccion: '',
        barrio: '',
        nombre_cabeza: '',
        tipo_documento_cabeza: '',
        documento_cabeza: '',
        correo: '',
        movil: '',
        fijo: '',
        fijo_estado: '',
        movil_estado: '',
        correo_estado: '',
        numero: '',
        regimen_estado: '',


        metodologia_g_poblacional: '',
        gpoblacional: '',
        fichasisben: '',
        // puntaje_sisben: '',
        nivelsisben: '',
        grupo_sisbeniv: '',
        subgrupo_sisbeniv: '',
        causal_oficio: '',

        Responsable: '',
        Responsable_aprobacion: '',
        Responsable_rechazo: '',
        Responsable_revision: '',

        tipodoc_CN:'',
        doc_CN:''

      }

      $scope.VerDetalle = function (info) {
        $scope.btns_activar = false;
        $scope.data.tipo_documento = info.tipo_doc;
        $scope.data.documento = info.doc;
        $scope.data.nombre_afiliado = info.nombre_completo;
        $scope.data.primer_nombre = info.primer_nombre;
        $scope.data.segundo_nombre = info.segundo_nombre;
        $scope.data.primer_apellido = info.primer_apellido;
        $scope.data.segundo_apellido = info.segundo_apellido;
        $scope.data.sexo = info.sexo;
        $scope.data.genero = info.genero;
        $scope.data.fecha_nacimiento = info.fecha_nacimiento;
        $scope.data.departamento = info.departamento;
        $scope.data.municipio = info.municipio;
        $scope.data.cod_municipio = info.cod_mun;
        $scope.data.direccion = info.direccion;
        $scope.data.barrio = info.barrio;
        $scope.data.fecha_afiliacion = info.fecha_registro;
        $scope.data.documento_cabeza = info.doc_cab;
        $scope.data.tipo_documento_cabeza = info.tipo_doc_cabeza
        $scope.data.nombre_cabeza = info.nombre_cabeza;
        $scope.data.correo = info.correo;
        $scope.data.fijo = info.fijo;
        $scope.data.movil = info.movil;
        $scope.data.fijo_estado = info.fijo_estado;
        $scope.data.movil_estado = info.movil_estado;
        $scope.data.correo_estado = info.correo_estado;
        $scope.data.numero = info.numero;
        $scope.data.regimen_estado = info.regimen_estado;
        $scope.data.regimen_nombre = info.regimen;
        //
        // $scope.data.puntaje_sisben = info.;
        console.log("1");
        $scope.data.metodologia_g_poblacional = info.metodo_grup_pob;
        $scope.data.gpoblacional = info.grupo_poblacional;
        $scope.data.fichasisben = info.ficha_sisben;
        $scope.data.nivelsisben = info.nivel_sisben;
        $scope.data.grupo_sisbeniv = info.grupo_sisben;
        $scope.data.subgrupo_sisbeniv = info.subgrupo_sisben;
        $scope.data.causal_oficio = info.causal_oficio;
        $scope.mostrar_Listado_Gpoblacional_31 = false;
        if ($scope.data.causal_oficio_cod == '31') { $scope.mostrar_Listado_Gpoblacional_31 = true; }

        $scope.file = [];
        //
        $scope.data.Estado_Solicitud = info.Estado_Solicitud;
        $scope.data.Motivo_rechazo = info.Motivo_rechazo;
        if (info.Estado_Solicitud == 'PENDIENTE') {
          $scope.btns_activar = true;
        }
        //

        $scope.data.Responsable = info.Responsable;
        $scope.data.Responsable_aprobacion = info.Responsable_aprobacion;
        $scope.data.Responsable_rechazo = info.Responsable_rechazo;
        $scope.data.Responsable_revision = info.Responsable_revision;

        $scope.data.tipodoc_CN = info.tipo_doc_cn;
        $scope.data.doc_CN = info.doc_cn;


        $http({
          method: 'POST',
          url: "php/ips/func3047.php",
          data: {
            function: 'ObtenerSoportes',
            tipo: $scope.data.tipo_documento,
            numero: $scope.data.documento
          }
        }).then(function (response) {
          $scope.soportes = response.data;
          $('#modal12').modal('open');
        });
        document.querySelector('#fileAfi').value = '';

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.close = function () {
        $('#modal12').modal('close');
        $scope.TablaDeInformacion = false;
        $scope.EditarDeInformacion = true;
        $scope.TablaSoporte = false;
        $scope.Ocultar = true;
        $scope.data = {
          tipo_documento: '',
          documento: '',
          nombre_afiliado: '',
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          departamento: '',
          municipio: '',
          cod_mun: '',
          fecha_nacimiento: '',
          sexo: '',
          fecha_afiliacion: '',
          direccion: '',
          barrio: '',
          nombre_cabeza: '',
          tipo_documento_cabeza: '',
          documento_cabeza: '',
          correo: '',
          movil: '',
          fijo: '',
          fijo_estado: '',
          movil_estado: '',
          correo_estado: '',

          metodologia_g_poblacional: '',
          gpoblacional: '',
          fichasisben: '',
          // puntaje_sisben: '',
          nivelsisben: '',
          grupo_sisbeniv: '',
          subgrupo_sisbeniv: '',
          causal_oficio: '',
        }
      }


      $scope.VerSoportes = function (ruta, ftp) {
        swal({ title: 'Cargando Soporte....' });
        swal.showLoading();
        if (ftp == 1) {
          $http({
            method: 'POST',
            url: "php/juridica/tutelas/functutelas.php",
            data: { function: 'descargaAdjunto', ruta: ruta }
          }).then(function (response) {
            swal.close();
            $scope.TablaSoporte = true;
            $scope.file = ('temp/' + response.data);
            console.log(response.data);
            var tipo = $scope.file.split(".");
            tipo = tipo[tipo.length - 1];
            if (tipo.toUpperCase() == "PDF") {
              if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                $scope.Ocultar = false;
              }
              $scope.tipoImgPdf = false;

            } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF" || tipo.toUpperCase() == "TIF") {
              $scope.tipoImgPdf = true;
              if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                $scope.Ocultar = false;
              }

            } else {
              $scope.Ocultar = true;
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
            swal.close();
            $scope.TablaSoporte = true;
            $scope.file = ('temp/' + response.data);
            var tipo = $scope.file.split(".");
            tipo = tipo[tipo.length - 1];
            if (tipo.toUpperCase() == "PDF") {
              if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                $scope.Ocultar = false;
              }
              $scope.tipoImgPdf = false;

            } else if (tipo.toUpperCase() == "JPG" || tipo.toUpperCase() == "JPEG" || tipo.toUpperCase() == "PNG" || tipo.toUpperCase() == "TIFF") {
              $scope.tipoImgPdf = true;
              if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                $scope.Ocultar = false;
              }

            } else {
              $scope.Ocultar = true;
              swal('Error', response.data, 'error');
            }
          });
        }

      }



      // $scope.Aprobar = function (i) {
      //   $scope.ActualizarInformacion(i);
      // }



      $scope.CargarSoportes = function () {
        if ($scope.ListadoSeleccionado.length == '0') {
          swal('Notificacion', 'No Hay Soporte Para El Cargue', 'error');
        } else {
          return new Promise(function (resolve, reject) {
            $http({
              method: 'POST',
              url: "php/ips/func3047.php",
              data: {
                function: 'CargarSoportes',
                tipodocumento: $scope.datos.tipodocumento,
                numero: $scope.datos.numero,
                archivos: JSON.stringify($scope.ListadoSeleccionado)
              }
            }).then(function (response) {
              $scope.respu = response.data;
              if ($scope.respu.length > '0') {
                $http({
                  method: 'POST',
                  url: "php/ips/func3047.php",
                  data: {
                    function: 'SubirArchivos',
                    tipodocumento: $scope.datos.tipodocumento,
                    numero: $scope.datos.numero,
                    rutas: JSON.stringify($scope.respu),
                    cantidad: $scope.respu.length
                  }
                }).then(function (res) {
                  if (res.data.codigo == '0') {
                    $scope.resulta = res.data.codigo;
                    resolve($scope.resulta);
                  } else {
                    reject;
                    swal('Notificacion', res.data.mensaje, 'error');
                  }
                });
              } else {
                swal('Notificacion', $scope.respuesta.mensaje_detalle, 'error');
              }
            });
          });
        }
      }


      $scope.EditarInformacion = function (i) {
        if ($scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
          $scope.infotemp = {}
          $scope.infotemp.primer_nombre = i.primer_nombre;
          $scope.infotemp.segundo_nombre = i.segundo_nombre;
          $scope.infotemp.primer_apellido = i.primer_apellido;
          $scope.infotemp.segundo_apellido = i.segundo_apellido;
          $scope.infotemp.tipo_documento = i.tipo_documento;
          $scope.infotemp.documento = i.documento;
          //$scope.infotemp.fecha_nacimiento = i.fecha_nacimiento;
          var date_formato = i.fecha_nacimiento.split("/");
          $scope.infotemp.fecha_nacimiento = new Date(date_formato[2], date_formato[1] - 1, date_formato[0]);
          $scope.infotemp.genero = i.genero;
          $scope.infotemp.direccion = i.direccion;
          $scope.infotemp.movil = i.movil;
          $scope.infotemp.correo = i.correo;
          $scope.infotemp.regimen_estado = i.regimen_estado;
          //
          $scope.infotemp.metodologia_g_poblacional = i.metodologia_g_poblacional != '' ? i.metodologia_g_poblacional.split('-')[0] : '';
          // $scope.Cargar_GrupoPoblacional();
          $scope.infotemp.fichasisben = i.fichasisben;
          $scope.infotemp.nivelsisben = i.nivelsisben;
          $scope.infotemp.grupo_sisbeniv = i.grupo_sisben != '' ? i.grupo_sisbeniv.split('-')[0] : '';
          // $scope.infotemp.subgrupo_sisbeniv = i.subgrupo_sisben != '' ? i.subgrupo_sisbeniv.split('-')[0] : '';
          // $scope.infotemp.causal_oficio = i.causal_oficio != '' ? i.causal_oficio.split('-')[0] : '';
          $scope.infotemp_GPOBLACIONAL = i.gpoblacional != '' ? i.gpoblacional.split('-')[0] : '';
          $scope.infotemp_SUBGRUPO_SISBENIV = i.subgrupo_sisbeniv != '' ? i.subgrupo_sisbeniv.split('-')[0] : '';
          $scope.infotemp_CAUSAL_OFICIO = i.causal_oficio != '' ? i.causal_oficio.split('-')[0] : '';
          $scope.ValidarMetodoGPob();

          $scope.TablaDeInformacion = true;
          $scope.EditarDeInformacion = false;
          if ($scope.file.length > '0' && $scope.TablaDeInformacion == true && $scope.EditarDeInformacion == false) {
            $scope.Ocultar = true;
          }
          setTimeout(() => { $scope.$apply(); }, 500);
        } else {
          $scope.validar_sisben().then(function (result) {
            if (!result) {
              //Validar campos vacios
              $scope.TablaDeInformacion = false;
              $scope.EditarDeInformacion = true;
              $scope.data.nombre_afiliado = i.primer_nombre + ' ' + i.segundo_nombre + ' ' + i.primer_apellido + ' ' + i.segundo_apellido;
              $scope.data.primer_nombre = i.primer_nombre;
              $scope.data.segundo_nombre = i.segundo_nombre;
              $scope.data.primer_apellido = i.primer_apellido;
              $scope.data.segundo_apellido = i.segundo_apellido;
              $scope.data.tipo_documento = i.tipo_documento;
              $scope.data.documento = i.documento;
              $scope.data.fecha_nacimiento = moment(i.fecha_nacimiento).format('DD/MM/YYYY');
              $scope.data.genero = i.genero;
              $scope.data.direccion = i.direccion;
              $scope.data.movil = i.movil;
              $scope.data.correo = i.correo;
              //GUARDAR CODIGO Y NOMBRE
              console.log(i);

              // $scope.data.puntaje_sisben= i.;
              var metodologia_g_poblacional_nombre = $scope.Listado_MetGPob[$scope.Listado_MetGPob.findIndex(e => e.cod == i.metodologia_g_poblacional)].nombre;
              var gpoblacional_nombre = $scope.Listado_Gpoblacional[$scope.Listado_Gpoblacional.findIndex(e => e.codigo == i.gpoblacional)].Grupo_Poblacional;

              $scope.data.metodologia_g_poblacional = i.metodologia_g_poblacional + '-' + metodologia_g_poblacional_nombre.toString().toUpperCase();
              $scope.data.gpoblacional = i.gpoblacional + '-' + gpoblacional_nombre.toString().toUpperCase();
              $scope.data.nivelsisben = i.nivelsisben;
              $scope.data.fichasisben = i.fichasisben;

              if (i.grupo_sisbeniv != '') {
                // var grupo_sisbeniv = $scope.Listado_GrupoSisben[$scope.Listado_GrupoSisben.findIndex(e => e.Grupo == i.grupo_sisbeniv)].Grupo;
                $scope.data.grupo_sisbeniv = i.grupo_sisbeniv;
              }
              if (i.subgrupo_sisbeniv != '') {
                // var subgrupo_sisbeniv = $scope.Listado_SubGrupoSisben[$scope.Listado_SubGrupoSisben.findIndex(e => e.Sub_Grupo == i.subgrupo_sisbeniv)].Sub_Grupo;
                $scope.data.subgrupo_sisbeniv = i.subgrupo_sisbeniv;
              }
              if (i.causal_oficio != '') {
                var causal_oficio = $scope.Listado_Gpoblacional_31[$scope.Listado_Gpoblacional_31.findIndex(e => e.CODIGO == i.causal_oficio)].NOMBRE;
                $scope.data.causal_oficio = i.causal_oficio + '-' + causal_oficio;
              }
              //
              if ($scope.file.length > '0' && $scope.TablaDeInformacion == false && $scope.EditarDeInformacion == true) {
                $scope.Ocultar = false;
              }

              switch (i.genero) {
                case 'F':
                  $scope.data.sexo = 'FEMENINO';
                  break;
                case 'M':
                  $scope.data.sexo = 'MASCULINO';
                  break;
                default:
              }
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          });
        }
      }


      $scope.AbrirModalDireccion = function () {
        $scope.dialogDiagreg = ngDialog.open({
          template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
          className: 'ngdialog-theme-plain',
          controller: 'actualizarinformacion',
          closeByDocument: false,
          closeByEscape: false,
          scope: $scope
        });
        $scope.dialogDiagreg.closePromise.then(function (data) {
          if (data.value != "$closeButton") {
            $scope.infotemp.direccion = data.value;
            $scope.apply();
          } else {
            $scope.infotemp.direccion = '';
          }
        });
      }


      $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
        $scope.closeThisDialog($('#direcciond').val());
        $scope.closeThisDialog($('#barrio').val());
      }

      $scope.ActualizarInformacion = function (i) {
        return new Promise(function (resolve, reject) {
          // var formattedDate = moment(i.fecha_nacimiento).format('DD/MM/YYYY');
          $http({
            method: 'POST',
            url: "php/ips/func3047.php",
            data: {
              function: 'ActualizarInformacion',
              codigo: i.numero,
              tipodocumento: i.tipo_documento,
              documento: i.documento,
              pnombre: i.primer_nombre,
              snombre: i.segundo_nombre,
              papellido: i.primer_apellido,
              sapellido: i.segundo_apellido,
              genero: i.genero,
              fecha_nacimiento: i.fecha_nacimiento, //formattedDate
              direccion: i.direccion,
              telefono: i.movil,
              correo: i.correo,
              metodologia_g_poblacional: i.metodologia_g_poblacional.split('-')[0],
              gpoblacional: i.gpoblacional.split('-')[0],
              fichasisben: i.fichasisben,
              grupo_sisbeniv: i.grupo_sisbeniv,
              subgrupo_sisbeniv: i.subgrupo_sisbeniv,
              causal_oficio: i.causal_oficio != '' ? i.causal_oficio.split('-')[0] : ''
              // nivelsisben: '',
            }
          }).then(function (res) {
            if (res.data.codigo == '0') {
              $scope.resulta = res.data.codigo;
              resolve($scope.resulta);
            } else {
              reject;
              swal('Notificacion', res.data.mensaje, 'error');
            }
          });
        });
      }

      $scope.Aprobar = function (i) {
        $scope.validar_sisben_aprobar().then(function (result) {
          if (!result) {
            var promise = $scope.ActualizarInformacion(i);
            promise.then(function (resultado) {
              if (resultado == '0') {
                console.log(resultado);

                swal({ title: 'Guardando Informacion....' });
                swal.showLoading();
                $http({
                  method: 'POST',
                  url: "php/ips/func3047.php",
                  data: {
                    function: 'AprobarAfiliacion', numero: i.numero, tipo_cab: i.tipo_documento_cabeza, doc_cabeza: i.documento_cabeza, responsable: $scope.cedula,
                    ubicacionresponsable: $scope.ubicacionresponsable
                  }
                }).then(function (response) {
                  if (response.data.codigo == '0') {
                    swal('Genesis informa', response.data.mensaje, 'success').then((result) => {
                      if (result) {
                        $scope.close();
                        swal.close();
                        $scope.ListarInformacion('destruir');
                      }
                    })
                  } else {
                    swal.close();
                    swal('Genesis informa', response.data.mensaje_detalle, 'warning');
                  }
                });
              }
            });
          }
        });
      }

      $scope.Rechazar = function (a) {
        $http({
          method: 'POST',
          url: "php/ips/func3047.php",
          data: { function: 'listar_observaciones_rechazo' }
        }).then(function (response) {
          $scope.proceso = response.data;
          $scope.array = {};
          for (var i = 0; i < $scope.proceso.length; i++) {
            var key = $scope.proceso[i].codigo;
            var val = $scope.proceso[i].nombre;
            $scope.array[key] = val;
          }
          swal({
            title: 'Seleccionar',
            input: 'select',
            inputOptions: $scope.array,
            inputPlaceholder: 'Seleccionar',
            showCancelButton: true,
          }).then((result) => {
            if (result) {
              $scope.observacion = result;
              $http({
                method: 'POST',
                url: "php/ips/func3047.php",
                data: { function: 'Rechazar', numero: a.numero, observacion: $scope.observacion, responsable: $scope.cedula }
              }).then(function (response) {
                if (response.data.codigo == '0') {
                  swal('Notificación', response.data.mensaje, 'success').then((result) => {
                    if (result) {
                      $scope.close();
                      $scope.ListarInformacion('destruir');
                    }
                  })
                } else {
                  swal('Notificación', response.data.mensaje, 'error');
                }
              });
            }
          })
        });
      }

      $scope.verFormularioAfi = function (tipo, doc) {
        document.querySelector('#fileAfi').value = '';
        $scope.archivoSubir = {};
        $('#modalFormularioAfi').modal('open');
        $scope.archivoSubir.tipo = tipo;
        $scope.archivoSubir.doc = doc;
        window.open('views/consultaAfiliados/soportes/fuar.php?&tipo=' + tipo + '&id=' + doc);
        // $('#modalFormularioAfi').modal('close');
      }

      $scope.closeModal = function () {
        $('.modal').modal('close');
      }

      $scope.guardarSoportesConf = function () {
        if ($scope.archivoSubir.base64 == undefined || $scope.archivoSubir.base64 == '') {
          swal('Mensaje', 'Debe cargar el soporte de afiliacion firmado.', 'info'); return;
        }
        swal({
          title: '¿Confirma cargar el formulario de registro?',
          type: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).catch(swal.noop)
          .then((willDelete) => {
            if (willDelete) {

              swal({ title: 'Cargando Soporte....' });
              swal.showLoading();
              $scope.cargarSoportesConf().then(function (soporte_url) {
                if (soporte_url) {
                  $http({
                    method: 'POST',
                    url: "php/ips/func3047.php",
                    data: { function: "guardarSoporteConf", tipo: $scope.archivoSubir.tipo, doc: $scope.archivoSubir.doc, ruta: soporte_url }
                  }).then(function ({ data }) {
                    if (data.toString().substr(0, 3) != '<br') {
                      if (data.codigo == 0) {
                        $scope.ListarInformacion();
                        $scope.closeModal();
                        swal("¡Mensaje!", data.mensaje, "success").catch(swal.noop);
                      } else {
                        swal("¡Mensaje!", data.mensaje, "warning").catch(swal.noop);
                      }
                    } else {
                      swal("¡Mensaje!", data, "info").catch(swal.noop);
                    }
                  })
                }
              })
            }
          });



      }
      $scope.cargarSoportesConf = function () {
        return new Promise((resolve) => {
          const nombre = $scope.archivoSubir.tipo + '_' + $scope.archivoSubir.doc;
          $http({
            method: 'POST',
            url: "php/ips/func3047.php",
            data: { function: "cargarSoporteConf", nombre, base64: $scope.archivoSubir.base64, extension: $scope.archivoSubir.extension }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.ValidarMetodoGPob = function () {
        $scope.Cargar_GrupoPoblacional(1);
        // Cargar_GrupoPoblacional
        if ($scope.infotemp.metodologia_g_poblacional == '1') {
          $scope.infotemp.grupo_sisbeniv = '';
          $scope.infotemp.subgrupo_sisbeniv = '';
          $scope.infotemp.causal_oficio = '';
        }
        if ($scope.infotemp.metodologia_g_poblacional == '2') {
          $scope.infotemp.nivelsisben = '';
          $scope.infotemp.causal_oficio = '';
          $scope.CalcularSubgrupoSisben(1);
        }
        if ($scope.infotemp.metodologia_g_poblacional == '3') {
          $scope.infotemp.fichasisben = '';
          $scope.infotemp.nivelsisben = '';
          $scope.infotemp.grupo_sisbeniv = '';
          $scope.infotemp.subgrupo_sisbeniv = '';
          $scope.infotemp.causal_oficio = '';
        }
        if ($scope.infotemp.metodologia_g_poblacional == '4') {
          $scope.infotemp.causal_oficio = '';
        }
      }

      $scope.Cargar_MetGPob = function () {
        $scope.Listado_MetGPob =
          [
            { cod: '1', nombre: 'Sisbén III' },
            { cod: '2', nombre: 'Sisbén IV' },
            { cod: '3', nombre: 'Listado Censales' },
            { cod: '4', nombre: 'Afiliacion de Oficio' }
          ];
      }
      $scope.Cargar_MetGPob();

      $scope.Cargar_GrupoPoblacional = function (x) {
        $scope.Listado_Gpoblacional = [];
        if (!x) {
          $scope.infotemp.gpoblacional = '';
          $scope.infotemp.fichasisben = '';
          $scope.infotemp.nivelsisben = '';
          $scope.infotemp.grupo_sisbeniv = '';
          $scope.infotemp.subgrupo_sisbeniv = '';
          $scope.infotemp.causal_oficio = '';
          $scope.mostrar_Listado_Gpoblacional_31 = false;
        }
        //
        $scope.infotemp.metodologia_g_poblacional == '1' ? $scope.mostrar_sisbeniii = true : $scope.mostrar_sisbeniii = false;
        $scope.infotemp.metodologia_g_poblacional == '2' ? $scope.mostrar_sisbeniv = true : $scope.mostrar_sisbeniv = false;
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obteneragrupoPoblacional', metodo: $scope.infotemp.metodologia_g_poblacional }
        }).then(function ({ data }) {
          $scope.Listado_Gpoblacional = data;
          setTimeout(function () {
            if (x) {
              $scope.infotemp.gpoblacional = $scope.infotemp_GPOBLACIONAL;
              setTimeout(function () { $scope.CalcularGpoblacional(); }, 500);
              setTimeout(function () { $scope.infotemp.causal_oficio = $scope.infotemp_CAUSAL_OFICIO; }, 1000);
              setTimeout(function () { $scope.$apply(); }, 500);
            } else {
              $scope.infotemp.gpoblacional = '';
            }
          }, 1000);
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      $scope.obtenergrupoSisben = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenergruposisbeniv' }
        }).then(function (response) {
          $scope.Listado_GrupoSisben = response.data;
        });
      }
      $scope.obtenergrupoSisben()
      $scope.CalcularSubgrupoSisben = function (x) {
        $scope.infotemp.subgrupo_sisbeniv = '';
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenersubgruposisbeniv', tipo: $scope.infotemp.grupo_sisbeniv }
        }).then(function (response) {
          $scope.Listado_SubGrupoSisben = response.data;
          if (x) {
            setTimeout(function () {
              $scope.infotemp.subgrupo_sisbeniv = $scope.infotemp_SUBGRUPO_SISBENIV;
            }, 500);
            setTimeout(function () { $scope.$apply(); }, 1000);
          } else {
            $scope.infotemp.subgrupo_sisbeniv = '';
          }
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      $scope.CalcularGpoblacional = function () {
        if ($scope.infotemp.gpoblacional == '31') {
          $scope.mostrar_Listado_Gpoblacional_31 = true;
          $scope.Listado_Gpoblacional_31 = [
            { "CODIGO": "O", "NOMBRE": 'AFILIACION DE OFICION SIN ENCUESTA NI POBLACION' },
            { "CODIGO": "A", "NOMBRE": 'AFILIACION DE OFICION CON SISBEN NIVEL 1' },
            { "CODIGO": "B", "NOMBRE": 'AFILIACION DE OFICION CON SISBEN NIVEL 2' },
            { "CODIGO": "C", "NOMBRE": 'AFILIACION DE OFICION POBLACION ESPECIAL' }
          ];
          setTimeout(function () { $scope.$apply(); }, 500);
        } else {
          $scope.mostrar_Listado_Gpoblacional_31 = false;
        }
      }
      //$scope.datos = JSON.stringify(data);

      $scope.validar_sisben = function () {
        return new Promise((resolve) => {
          if ($scope.infotemp.regimen_estado == 'S') {
            if ($scope.infotemp.metodologia_g_poblacional == '' || $scope.infotemp.metodologia_g_poblacional == null) {
              swal('Información', 'Debe seleccionar la Metodologia Grupo Poblacional.', 'info'); return;
            }
            if ($scope.infotemp.metodologia_g_poblacional == '1') { //SISBEN III
              if ($scope.infotemp.fichasisben == '' || $scope.infotemp.fichasisben == null) {
                swal('Información', 'Debe digitar la Ficha de SISBEN.', 'info'); return;
              }
              if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
                swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
              }
              // if ($scope.infotemp.nivelsisben == '' || $scope.infotemp.nivelsisben == null) {
              //   swal('Información', 'Debe digitar el Nivel del SISBEN.', 'info'); return;
              // }
            }
            if ($scope.infotemp.metodologia_g_poblacional == '2') { //SISBEN IV
              if ($scope.infotemp.fichasisben == '' || $scope.infotemp.fichasisben == null) {
                swal('Información', 'Debe digitar la Ficha de SISBENIV.', 'info'); return;
              }
              if ($scope.infotemp.fichasisben.length != 20) {
                swal('Información', 'La Ficha de SISBENIV debe contener 20 digitos.', 'info'); return;
              }
              if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
                swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
              }
              if ($scope.infotemp.grupo_sisbeniv == '' || $scope.infotemp.grupo_sisbeniv == null) {
                swal('Información', 'Debe seleccionar el Grupo de SISBEN IV.', 'info'); return;
              }
              if ($scope.infotemp.subgrupo_sisbeniv == '' || $scope.infotemp.subgrupo_sisbeniv == null) {
                swal('Información', 'Debe seleccionar el Subgrupo de SISBEN IV.', 'info'); return;
              }
            }
            if ($scope.infotemp.metodologia_g_poblacional == '3') { //Listado Censales
              if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
                swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
              }
            }
            if ($scope.infotemp.metodologia_g_poblacional == '4') { //Afiliacion Oficio
              if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
                swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
              }
              if ($scope.infotemp.gpoblacional == '31') {
                if ($scope.infotemp.causal_oficio == '' || $scope.infotemp.causal_oficio == null) {
                  swal('Información', 'Debe seleccionar causal de afiliacion de oficio.', 'info'); return;
                }
              }
            }
          }
          resolve(false);
        });
      }

      $scope.validar_sisben_aprobar = function () {

        return new Promise((resolve) => {
          if ($scope.data.regimen_estado == 'S') {
            if ($scope.data.metodologia_g_poblacional == '' || $scope.data.metodologia_g_poblacional == null) {
              swal('Información', 'Debe seleccionar la Metodologia Grupo Poblacional.', 'info'); return;
            }

            // if ($scope.data.metodologia_g_poblacional == '1') { //SISBEN III
            //   if ($scope.data.fichasisben == '' || $scope.data.fichasisben == null) {
            //     swal('Información', 'Debe digitar la Ficha de SISBEN.', 'info'); return;
            //   }
            //   if ($scope.data.gpoblacional == '' || $scope.data.gpoblacional == null) {
            //     swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            //   }
            // }
            // if ($scope.infotemp.metodologia_g_poblacional == '2') { //SISBEN IV
            //   if ($scope.infotemp.fichasisben == '' || $scope.infotemp.fichasisben == null) {
            //     swal('Información', 'Debe digitar la Ficha de SISBENIV.', 'info'); return;
            //   }
            //   if ($scope.infotemp.fichasisben.length != 20) {
            //     swal('Información', 'La Ficha de SISBENIV debe contener 20 digitos.', 'info'); return;
            //   }
            //   if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
            //     swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            //   }
            //   if ($scope.infotemp.grupo_sisbeniv == '' || $scope.infotemp.grupo_sisbeniv == null) {
            //     swal('Información', 'Debe seleccionar el Grupo de SISBEN IV.', 'info'); return;
            //   }
            //   if ($scope.infotemp.subgrupo_sisbeniv == '' || $scope.infotemp.subgrupo_sisbeniv == null) {
            //     swal('Información', 'Debe seleccionar el Subgrupo de SISBEN IV.', 'info'); return;
            //   }
            // }
            // if ($scope.infotemp.metodologia_g_poblacional == '3') { //Listado Censales
            //   if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
            //     swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            //   }
            // }
            // if ($scope.infotemp.metodologia_g_poblacional == '4') { //Afiliacion Oficio
            //   if ($scope.infotemp.gpoblacional == '' || $scope.infotemp.gpoblacional == null) {
            //     swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
            //   }
            //   if ($scope.infotemp.gpoblacional == '31') {
            //     if ($scope.infotemp.causal_oficio == '' || $scope.infotemp.causal_oficio == null) {
            //       swal('Información', 'Debe seleccionar causal de afiliacion de oficio.', 'info'); return;
            //     }
            //   }
            // }
          }
          resolve(false);
        });
      }


      $scope.Descargar_Excel = function () {
        // usuario: $scope.cedula, filtro: $scope.historial.afiliado,
        // estado: $scope.historial.estado, inicio: $scope.GetFecha('historial', 'inicio'), fin: $scope.GetFecha('historial', 'fin')

        // window.open('views/ips/registrarafiliados/formatos/formato_confirmacion_afiliacion.php?&usuario=' + $scope.cedula +
        //   '&filtro=' + $scope.historial.afiliado + '&estado=' + $scope.historial.estado + '&inicio=' + $scope.GetFecha('historial', 'inicio') +
        //   '&fin=' + $scope.GetFecha('historial', 'fin'));

        var data = [];
        $scope.informacion.forEach(e => {
          data.push({
            'N° REGISTRO': e.numero,
            'DOCUMENTO': e.tipo_doc + ' - ' + e.doc,
            'NOMBRE DEL NACIDO': e.nombre_completo,
            'MUNICIPIO Y DEPARTAMENTO': e.departamento + ' - ' + e.municipio,
            'FECHA REGISTRO': e.fecha_registro,
            'FUNCIONARIO QUE INGRESO': e.Responsable,
            'REGIONAL': e.departamento,
            'REGIMEN': e.regimen,
            'DIRECCION': e.direccion,
            'BARRIO': e.barrio,
            'TELEFONO': e.movil,
            'CORREO': e.correo,
            'NOMBRE CABEZA': e.nombre_cabeza,
            'DOCUMENTO CABEZA': e.tipo_doc_cabeza + ' - ' + e.doc_cab,
            'ESTADO': e.Estado_Solicitud,
            'RESPONSABLE REVISION': e.Responsable_revision,
            'RESPONSABLE APROBACION': e.Responsable_aprobacion,
            'FECHA APROBACION': e.fecha_aprobacion,
            'RESPONSABLE RECHAZO': e.Responsable_rechazo,
            'FECHA RECHAZO': e.fecha_rechazo,
            'MOTIVO RECHAZO': e.Motivo_rechazo,
          })
        });
        var ws = XLSX.utils.json_to_sheet(data);
        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
        /* write workbook and force a download */
        XLSX.writeFile(wb, "Reporte Confirmacion Afiliacion.xlsx");

      }

      $scope.GetFecha = function (HOJA, SCOPE) {
        if ($scope[HOJA][SCOPE]) {
          var ahora_ano = $scope[HOJA][SCOPE].getFullYear();
          var ahora_mes = ((($scope[HOJA][SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[HOJA][SCOPE].getMonth() + 1) : ($scope[HOJA][SCOPE].getMonth() + 1));
          var ahora_dia = ((($scope[HOJA][SCOPE].getDate()) < 10) ? '0' + ($scope[HOJA][SCOPE].getDate()) : ($scope[HOJA][SCOPE].getDate()));
          return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
        } else { return '' }
      }


      document.querySelector('#fileAfi').addEventListener('change', function (e) {
        // $scope.archivoSubir = {};
        setTimeout(() => { $scope.$apply(); }, 500);
        var files = e.target.files;
        if (files.length != 0) {
          const x = files[0].name.split('.');
          if (x[x.length - 1].toUpperCase() == 'PDF') {
            if (files[0].size < 5485760 && files[0].size > 0) {
              $scope.getBase64(files[0]).then(function (result) {
                $scope.archivoSubir.base64 = result;
                $scope.archivoSubir.extension = x[x.length - 1].toLowerCase();
                setTimeout(function () { $scope.$apply(); }, 300);
              });
            } else {
              document.querySelector('#fileAfi').value = '';
              swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (5MB)!', 'info');
            }
          } else {
            document.querySelector('#fileAfi').value = '';
            swal('Advertencia', '¡El archivo seleccionado debe ser formato PDF!', 'info');
          }
        }
      });
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      // Paginacion
      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.filter = function () {
        $scope.listDatosTemp = $filter('filter')($scope.informacion, $scope.historial.filtrar);
      }
      $scope.getData = function () {
        // if ($scope.medicamentos.orden != "") {
        //   return $filter('filter')($filter('orderBy')($scope.historial.listado, 'RADICADO'), $scope.q);
        // } else {
        return $filter('filter')($scope.informacion, $scope.historial.filtrar);
        // }
      }
      $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
      }
      $scope.$watch('historial.filtrar', function (newValue, oldValue) {
        if (oldValue != newValue) {
          $scope.currentPage = 0;
        }
      }, true);
      $scope.btns_paginacion = function (value) {
        $scope.currentPage = value;
        // window.scrollTo({ top: 0, behavior: 'smooth' });
      }

    }
  ]);
