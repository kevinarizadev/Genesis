'use strict';
angular.module('GenesisApp')
  .controller('consultasiniestrosController', ['$scope', '$http', '$filter', '$q',
    function ($scope, $http, $filter, $q) {
      $scope.Inicio = function () {
        $scope.home = sessionStorage.home;
        // console.clear();
        $scope.Ajustar_Pantalla();
        $('.modal').modal();
        $('.tabs').tabs();
        $scope.Tabs = 'HOJA1';
        $scope.Tabs_Actualizar = 1;
        console.log($(window).width());
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
        //$scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/consultasiniestros.php",
          data: {
            function: 'Obt_Cedula'
          }
        }).then(function (response) {
          $scope.Rol_Cedula = response.data;
        });

        ///////////////////////////
        $scope.SysDay = new Date();
        //////////////////////
        $scope.currentPage = 0;
        $scope.pageSize = 15;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.Listado.Lista = [];
        $scope.ClasificacionArr = [];
        $scope.Listado.ListaTemp = "";
        $scope.radicadoSoporte = "";

        ///////////////////////////////////////////////////////////////////////////////////////////////

        $scope.Vista1 = {
          Tipo_Doc: '',
          Num_Doc: '',
          Obs: '',

          Modal_Consulta_Radicado: '',
          Modal_Consulta_Cod_Cohorte: '',
          Modal_Consulta_Diagnostico: '',
          Modal_Consulta_Diagnostico_Cod: '',
          Modal_Consulta_Diagnostico_Save: '',
          Modal_Consulta_Clase: '',
          Modal_Consulta_Clasificacion: '',

          Modal_Consulta_Fecha_inicio_IpsAsig: '',
          Modal_Consulta_Fecha_inicio_IpsAsig_Save: '',
          Modal_Consulta_Fecha_Nac: '',
          Modal_Consulta_Fecha_Config_Diag: '',
          Modal_Consulta_Fecha_Config_Diag_Save: '',
          Modal_Consulta_IpsAsig: '',
          Modal_Consulta_IpsAsig_Cod: '',
          Modal_Consulta_IpsAsig_Save: '',
          Modal_Consulta_IpsIniTra: '',
          Modal_Consulta_IpsIniTra_Cod: '',
          Modal_Consulta_IpsIniTra_Save: '',
          Modal_Consulta_FechaIpsIniTra: '',
          Modal_Consulta_FechaIpsIniTra_Save: '',
          Modal_Consulta_TipoTratamiento: '',
          Modal_Consulta_Estado_Siniestro: '',
          Modal_Consulta_Regimen: '',

          Busqueda: {
            Diagnostico: {
              Filtro: [],
              Listado: null,
              SAVE: null,
              Seleccion: 9999
            },

            IpsAsig: {
              Filtro: [],
              Listado: null,
              SAVE: null,
              Seleccion: 9999
            },
            IpsIniTra: {
              Filtro: [],
              Listado: null,
              SAVE: null,
              Seleccion: 9999
            }
          },
          Listado: null,
          Datos: null
        };
        $scope.Vista2 = {
          Estado: '',
          Ubicacion: '',
          Cohorte: '',
          F_Inicio: $scope.SysDay,
          F_Fin: $scope.SysDay,
          tituloFecha: 'Fecha de Identificacion'
        };
        $scope.Soportes = {
          Soporte_URL: '',
          Soporte_B64: '',
          Soporte_RUTA: '',
        }

        $scope.listarMotivoAnulacion();
        ///////////////////////////////////////////////////////////////////////////////////////////////
        setTimeout(() => {
          $scope.$apply();
        }, 500);
        $scope.Array_Patologias = [
          { CODIGO: 'AR', NOMBRE: 'ARTRITIS' },
          { CODIGO: 'CA', NOMBRE: 'CANCER' },
          { CODIGO: 'ER', NOMBRE: 'ENFERMEDAD RENAL' },
          { CODIGO: 'HF', NOMBRE: 'HEMOFILIA' },
          { CODIGO: 'HC', NOMBRE: 'HEPATITIS C' },
          { CODIGO: 'VH', NOMBRE: 'VIH' },
          { CODIGO: 'EH', NOMBRE: 'ENFERMEDADES HUERFANAS' },
          { CODIGO: 'TP', NOMBRE: 'TRASPLANTES' },
          { CODIGO: 'LU', NOMBRE: 'LUPUS' },
          { CODIGO: 'OS', NOMBRE: 'OSTEOPOROSIS' },
          { CODIGO: 'X', NOMBRE: 'TODAS' },
        ]

        setTimeout(() => {
          $scope.Vista1.Tipo_Doc = ''
          $scope.Vista1.Num_Doc = '';
          // $scope.Vista1.Tipo_Doc = 'CC'
          // $scope.Vista1.Num_Doc = '40799601';
          $scope.$apply();
        }, 1500);

      };
      $scope.Listado = {
        Lista: [],
        ListaTemp: [],
      };

      $scope.KeyFind = function () {
        if ($scope.Tabs == 'HOJA1') {
          if ($scope.Vista1.Tipo_Doc != null && $scope.Vista1.Tipo_Doc != undefined && $scope.Vista1.Num_Doc != '' && $scope.Vista1.Num_Doc.length > 5) {
            $scope.Hoja1_Consultar_Siniestros();
          }
        }
        if ($scope.Tabs == 'HOJA2') {
          if ($scope.Vista2.Estado != null && $scope.Vista2.Estado != '' && $scope.Vista2.Ubicacion != '' && $scope.Vista2.Cohorte != '') {
            $scope.Hoja2_Consultar_Siniestros();
          }
        }
      }

      $scope.Hoja1_Consultar_Siniestros = function () {
        $scope.Listado.Lista = [];
        $scope.Listado.ListaTemp = [];
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/consultasiniestros.php",
          data: {
            function: 'Hoja1_Consultar_Siniestros',
            Tipo_Doc: $scope.Vista1.Tipo_Doc,
            Num_Doc: $scope.Vista1.Num_Doc
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if (response.data[0].Codigo == undefined) {
              // console.log('->', response.data);
              $scope.Listado.Lista = response.data;
              $scope.Listado.ListaTemp = response.data;
              $scope.configPages();
              swal.close();
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data[0].Nombre,
                type: "warning",
              }).catch(swal.noop);
              document.getElementById("Num_Doc").focus();
            }
          } else {
            swal({
              title: "¡IMPORTANTE!",
              text: response.data,
              type: "info",
            }).catch(swal.noop);
            document.getElementById("Num_Doc").focus();
          }
        });
      }

      $scope.Hoja2_Consultar_Siniestros = function () {
        var Ubicacion = $scope.Vista2.Ubicacion == 'X' ? '' : $scope.Vista2.Ubicacion;
        var Cohorte = $scope.Vista2.Cohorte == 'X' ? '' : $scope.Vista2.Cohorte;
        var Estado = $scope.Vista2.Estado == 'T' ? '' : $scope.Vista2.Estado;
        var F_Inicio = $scope.GetFecha('F_Inicio');
        var F_Fin = $scope.GetFecha('F_Fin');
        // window.open('views/altocosto/formatos/formato_consultasiniestros.php?Estado=' + Estado + '&Ubicacion=' + Ubicacion +
        //   '&Cohorte=' + Cohorte + '&F_Inicio=' + F_Inicio + '&F_Fin=' + F_Fin, '_blank', "width=900,height=1100");

        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/consultasiniestros.php",
          data: {
            function: 'Descargar_Excel',
            Estado,
            Ubicacion,
            Cohorte,
            F_Inicio,
            F_Fin,
            opcion: '2',
            tipoDoc: '',
            numDoc: ''
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              let array = [];
              data.forEach(e => {
                array.push({
                  'RADICADO': e.RADICADO,
                  'SECCIONAL': e.DEPARTAMENTO_AFILIADO,
                  'DOCUMENTO_AFILIADO': e.TIPO_DOCUMENTO,
                  'NUM_DOC_AFILIADO': e.NUM_DOCUMENTO,
                  'PRIMER_NOMBRE': e.PRIMER_NOMBRE,
                  'SEGUNDO_NOMBRE_': e.SEGUNDO_NOMBRE,
                  'PRIMER_APELLIDO': e.PRIMER_APELLIDO,
                  'SEGUNDO_APELLIDO': e.SEGUNDO_APELLIDO,
                  'EDAD': e.EDAD,
                  'SEXO': e.AFIC_SEXO,
                  'FECHA_NACIMIENTO': e.FECHA_NACIMIENTO,
                  'FECHA_AFILIACION': e.AFIF_AFILIACION,
                  'ESTADO_AFILIADO': e.AFIC_DESCRIPCION,
                  'FECHA_RETIRO_AFILIADO': e.FECHA_NOVEDAD,
                  'DIRECCION_AFILIADO': e.AFIC_DIRECCION,
                  'CODIGO_DANE_MUNICIPIO_AFILIADO': e.CODIGO_DANE,
                  'MUNICIPIO_AFILIADO': e.MUNICIPIO_AFILIADO,
                  'LOCALIDAD_AFILIADO': e.AFIC_LOCALIDAD,
                  'CELULAR_AFILIADO': e.AFIC_CELULAR,
                  'TELEFONO_AFILIADO': e.AFIC_TELEFONO,
                  'REGIMEN': e.DESC_REGIMEN,
                  'COHORTE': e.DESC_CONCEPTO,
                  'CLASIFICACION': e.CLAC_DESCRIPCION,
                  'COD_DIAGNOSTICO': e.COD_DIAGNOSTICO,
                  'NOM_DIAGNOSTICO': e.DESC_DIAGNOSTICO,
                  'FECHA_CONFIRMACION_DIAGNO': e.FECHA_CONFIRMACION_DIAGNO,
                  'FUENTE': e.EGPC_ORIGEN,
                  'FECHA_IDENTIFICACION_REGISTRO': e.FECHA_INICIO,
                  'FECHA_INICIO_GESTION': e.FECHA_INICIO_GESTION,
                  'ESTADO': e.ESTADO_GESTION,
                  'FECHA_DE_ACCION': e.FECHA_GESTION,
                  'PLURIPATOLOGICO': e.PLURIPATOLOGICO,
                  'PRIORIDAD': e.PRIORIDAD,
                  'IPS_INICIO_TRATAMIENTO': e.IPS_TTO,
                  'TIPO_TRATAMIENTO': e.TIPO_TTO,
                  'FECHA_INICIO_IPS_TRATAMIENTO': e.FECHA_IPS_TTO,
                  'IPS_ATENCION_INTEGRAL': e.IPS_ATENCION_INTEGRAL,
                  'FECHA_INICIO_IPS_ATENCION_INTEGRAL': e.FECHA_IPS_ATENCION,
                  'CODIGO_HABILITACION_DE_IPS': e.COD_IPS_HABILITACION,
                  'RESPONSABLE_SECCIONAL': e.RESPONSABLE_SECCIONAL,
                  'FECHA_GESTION_SECCIONAL': e.FECHA_GESTION_SECCIONAL,
                  'OBSERVACION_SECCIONAL': e.OBSERVACION_SECCIONAL,
                  'RESPONSABLE_NACIONAL': e.RESPONSABLE_NACIONAL,
                  'FECHA_GESTION_NACIONAL': e.FECHA_GESTION_NACIONAL,
                  'OBSERVACION_NACIONAL': e.OBSERVACION_NACIONAL,
                  'FUNCIONARIO_QUE_IDENTIFICA_EL_SINIESTRO': e.NOM_RESPONSABLE_PROCESO,
                  'PORTABILIDAD_DEL_USUARIO': e.UBICACION_PORTABILIDAD,
                  'TUTELA': e.TUTELA,
                  'FECHA_VACUNACION_1RA_DOSIS': e.FECHAAPLICACION_VACUNA,
                  'FECHA_VACUNACION_2DA_DOSIS': e.FECHASEGUNDAVAC,
                  'FECHA_VACUNACION_3RA_DOSIS': '',
                  'IPS_QUE_IDENTIFICA_O_SOLICITANTE': e.IPS_SOL,
                  'IPS_ASIGNADA': e.IPS_ASG,
                  'TIPO_AFILIACION': e.TIPO_AFILIACION,
                  'CONTRATO_PGP': e.CONTRATO_PGP,
                })
              });

              var ws = XLSX.utils.json_to_sheet(array);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
              /* write workbook and force a download */
              XLSX.writeFile(wb, "Reporte Avanzado de Siniestros.xlsx");
              const text = `Registros encontrados ${data.length}`
              swal('¡Mensaje!', text, 'success').catch(swal.noop);

              swal.close();
            } else {
              swal("¡IMPORTANTE!", "No se encontraron registros", "warning").catch(swal.noop);
              document.getElementById("Num_Doc").focus();
            }
          } else {
            swal({
              title: "¡IMPORTANTE!",
              text: data,
              type: "info",
            }).catch(swal.noop);
            document.getElementById("Num_Doc").focus();
          }
        });

      }

      $scope.Hoja2_calcularTituloFecha = function (estado) {
        if (estado == undefined) { return; }
        if (estado == "A") { $scope.Vista2.tituloFecha = 'Fecha de Inicio o Identificacion' }
        if (estado == "I") { $scope.Vista2.tituloFecha = 'Fecha de Inactivacion' }
        if (estado == "X") { $scope.Vista2.tituloFecha = 'Fecha de Anulacion' }
        if (estado == "P") { $scope.Vista2.tituloFecha = 'Fecha de Procesamiento Nacional' }
        if (estado == "T") { $scope.Vista2.tituloFecha = 'Fecha de Inicio o Identificacion' }
      }

      $scope.Get_Fecha_Retiro = function (cod) {
        var defered = $q.defer();
        var promise = defered.promise;
        var SysDay = $scope.GetFechaSys('SysDay');
        if (cod == 'R') {
          swal({
            title: "Retiro de la cohorte",
            html: `
                  <div class="col">
                  <label style="font-weight: bold;">Fecha</label>
                  <input id="datetimepicker" type="date" class="form-control" style="text-align:center"  max="`+ SysDay + `" autofocus>
                  <label style="font-weight: bold;">Motivo</label>
                  <select id="selectMotivoR" class="select-chosen-eps" style="text-align:center">
                  <option value="" disabled>SELECCIONAR</option>
                  <option value="1">Fallecimiento</option>
                  <option value="2">Retiro</option>
                  <option value="3">Diagnostico</option>
                  </select>
                  </div>
                  `,
            width: '300px',
            preConfirm: function () {
              return new Promise(function (resolve) {
                resolve(
                  {
                    fecha: $('#datetimepicker').val(),
                    motivo: $('#selectMotivoR').val()
                  }
                )
              })
            }
          }).then(function (result) {
            if (result.fecha != '') {
              //YYYY/MM/DD
              var fecha = result.fecha.toString().split('-');
              var Fecha_Inicio = fecha[0] + '/' + fecha[1] + '/' + fecha[2];
              result.fecha = Fecha_Inicio;
              if (result.motivo != '') {

                defered.resolve(result);
              } else {
                swal({
                  title: "Mensaje",
                  text: "¡Debe ingresar un motivo!",
                  type: "warning",
                }).catch(swal.noop);
              }
              //OTRO SWAL
            } else {
              swal({
                title: "Mensaje",
                text: "¡Debe ingresar una fecha!",
                type: "warning",
              }).catch(swal.noop);
            }
          }).catch(swal.noop);

        } else {
          //Codigo == X
          let opciones = '';
          $scope.listadoMotivosAnulacion.forEach(e => {
            opciones += `<option value="${e.ID_MOTIVO}">${e.DESCRIPCION}</option>`
          });

          swal({
            title: "Motivo de Anulación",
            html: `
                  <div class="col">
                  <label style="font-weight: bold;">Fecha</label>
                  <input id="datetimepicker" type="date" class="form-control" style="text-align:center"  max="`+ SysDay + `" autofocus>
                  <label style="font-weight: bold;">Motivo</label>
                  <select id="selectMotivoR" class="select-chosen-eps" style="text-align:center">
                  <option value="">SELECCIONAR</option>
                 ${opciones}
                  </select>
                  </div>
                  `,
            width: '500px',
            preConfirm: function () {
              return new Promise(function (resolve) {
                resolve(
                  {
                    fecha: $('#datetimepicker').val(),
                    motivo: $('#selectMotivoR').val()
                  }
                )
              })
            }
          }).then(function (resultx) {
            if (resultx.fecha != '' && resultx.motivo != '') {
              var fecha = resultx.fecha.toString().split('-');
              var Fecha_Inicio = fecha[2] + '/' + fecha[1] + '/' + fecha[0];
              resultx.fecha = Fecha_Inicio;
              console.log(resultx)
              // swal({
              //   title: 'Observacion de Anulación',
              //   input: 'textarea',
              //   inputPlaceholder: 'Escribe un comentario...',
              //   showCancelButton: true,
              //   allowOutsideClick: false,
              //   inputValue: $scope.Vista1.Obs,
              //   width: 'auto',
              //   inputValidator: function (value) {
              //     return new Promise(function (resolve, reject) {
              //       if (value !== '') {
              //         resolve();
              //       } else {
              //         swal({
              //           title: "Mensaje",
              //           text: "¡Debe una observacion!",
              //           type: "warning",
              //         }).catch(swal.noop);
              //       }
              //     })
              //   }
              // }).then(function (result) {
              // resolver observacion|
              defered.resolve(
                {
                  fecha: resultx.fecha,
                  motivo: resultx.motivo,
                  // observacion: result
                }
              );
              //   // resolve(result);
              // }).catch(swal.noop);

            } else {
              swal({
                title: "Mensaje",
                text: "¡Debe ingresar un motivo!",
                type: "warning",
              }).catch(swal.noop);
            }

          }).catch(swal.noop);

        }
        return promise;
      }

      $scope.Hoja1_Anular_Siniestros = function (X) {
        var xArray = [
          {
            id: 'X',
            name: 'ANULAR SINIESTRO'
          },
          {
            id: 'R',
            name: 'RETIRAR AFILIADO DE LA COHORTE'
          }
        ];
        // console.log(xArray);
        var options = {};
        $.map(xArray,
          function (o) {
            options[o.id] = o.name;
          });
        swal({
          title: 'Seleccione una opción',
          input: 'select',
          inputOptions: options,
          inputPlaceholder: 'Seleccionar',
          showCancelButton: true,
          allowOutsideClick: false,
          width: 'auto',
          inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
              if (value !== '') {
                resolve();
              } else {
                swal.close();
              }
            })
          }
        }).then(function (result) {
          var promise = $scope.Get_Fecha_Retiro(result);
          var cod = result;
          promise.then(function (result) {
            // var fecha = new Date();
            // fecha = fecha.getDate() + '-' + (((fecha.getMonth() + 1) < 10) ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1)) + '-' + fecha.getFullYear();
            const fecha = result.fecha.split('-');

            // $scope.Vista1.Obs = result.observacion;
            if (result !== '') {

              swal({
                title: "¿Está seguro de realizar la acción?",
                type: "question",
                showCancelButton: true,
                allowOutsideClick: false,
                confirmButtonText: "Si",
                cancelButtonText: "No"
              }).catch(swal.noop)
                .then((willDelete) => {
                  if (willDelete) {

                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                      method: 'POST',
                      url: "php/altocosto/siniestros/consultasiniestros.php",
                      data: {
                        function: 'Hoja1_Anular_Siniestros',
                        Rad: X.RADICADO,
                        // Obs: cod == 'X' ? result.observacion : '',
                        Ced: $scope.Rol_Cedula,
                        Tipo: cod,
                        Motivo: result.motivo,
                        Fecha_Accion: result.fecha,
                        //Fecha_Accion: [fecha[2], fecha[1], fecha[0]].join('/'),
                      }
                    }).then(function (response) {
                      if (response.data.Codigo != undefined) {
                        if (response.data.Codigo == 0) {
                          swal({
                            title: "Mensaje",
                            text: response.data.Nombre,
                            type: "success",
                          }).catch(swal.noop);
                        } else {
                          swal({
                            title: response.data.Nombre,
                            type: "warning",
                          }).catch(swal.noop);
                        }
                        setTimeout(() => {
                          $scope.Hoja1_Consultar_Siniestros();
                        }, 2000);
                      }
                    });

                  }
                });


            } else {
              Materialize.toast('¡El comentario debe contener al menos 20 caracteres!', 1000); $('.toast').addClass('default-background-dark');
              $scope.Vista1.Obs = '';
            }

          })
        }).catch(swal.noop);
      }

      $scope.UploadSoporteP = function (x) {
        $scope.radicadoSoporte = x.RADICADO;
        swal({
          title: $scope.Soportes.Soporte_RUTA != '' ? 'Actualizar Soporte' : 'Cargar Soporte',
          html: `
          <div class="col s12 m12 l12 m-b" style="margin-bottom: 1.5rem;">
            <div class="col s6 no-padding label-new m-b" id="AdjustSop">
              <div class="file-field input-field gray-input m-l input-file-radiu input-file-radius-opcional"
                style="margin: 0;width: -webkit-fill-available;">
                <div class="right">
                  <span class="black-text"><i class="icon-folder-open-1 default-color"
                    style="line-height: 2rem;"></i></span>
                    <input type="file" id="SoporteProces" ng-change="loadFile()">
                </div>
            <div class="file-path-wrapper">
              <input class="file-path Soport" type="text" placeholder="Adjunte un archivo (zip)"
                readonly style="border-radius: 0;height: 2rem;border-bottom: 0;"
                ng-change="loadFile()">
            </div>
          </div>
        </div>
      </div>
                `,

          width: '500px',

          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve(
                {
                  soporte: $('#SporteProce').val(),
                }
              )
            })
          }
        }).then(function (result) {
          $scope.loadFile();
        })
      }

      $scope.loadFile = function () {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#SoporteProces');
        if (ValidarExistente != true) {
          if (fileInput.files.length != 0) {
            var x = fileInput.files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'ZIP') {
              if (fileInput.files.length > 0) {
                if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
                  $scope.getBase64(fileInput.files[0]).then(function (result) {
                    $scope.Soportes.Soporte_URL = $scope.Listado.Lista[0].FTP;
                    $scope.Soportes.Soporte_RUTA = $scope.Listado.Lista[0].SOPORTE;
                    $scope.Soportes.Soporte_B64 = result;
                    if ($scope.Soportes.Soporte_RUTA != '') {
                      swal({
                        title: "Recuerde que al actualizar el soporte reemplazara el anterior, ¿Esta de acuerdo?",
                        type: "question",
                        showCancelButton: true,
                        allowOutsideClick: false
                      }).catch(swal.noop)
                        .then((willDelete) => {
                          if (willDelete) {
                            $scope.SubirFTP('si');
                          }
                        });
                    } else {
                      let name = $scope.Listado.Lista[0].DOCUMENTOC.split('-');
                      $scope.Soportes.Soporte_RUTA = name[0] + '_' + name[1].split(' ')[1];
                      $scope.SubirFTP('no');
                    }
                    setTimeout(function () { $scope.$apply(); }, 300);
                  });
                } else {
                  swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                  fileInput.value = '';
                  document.querySelector('#SoporteProces').value = '';
                  $scope.Soportes.Soporte_B64 = '';
                  setTimeout(function () { $scope.$apply(); }, 300);
                }
              }
            } else {
              swal('Advertencia', '¡El archivo seleccionado deber ser formato ZIP!', 'info');
              fileInput.value = '';
              document.querySelector('#SoporteProces').value = '';
              $scope.Soportes.Soporte_B64 = '';
              setTimeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            $scope.Soportes.Soporte_B64 = '';
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }
      }

      $scope.SubirFTP = function (x) {
        if ($scope.Soportes.Soporte_B64 != '') {
          if (x == 'si') { //Si existe un soporte
            $http({
              method: 'POST',
              url: "php/altocosto/siniestros/gestionsiniestros.php",
              data: {
                function: 'Upload_Nacional',
                base: $scope.Soportes.Soporte_B64,
                ruta: $scope.Soportes.Soporte_RUTA,
                Ftp: $scope.Soportes.Soporte_URL,
                accion: x
              }
            }).then(function (response) {
              if (response.data.substr(0, 1) != '0') {
                swal({
                  title: "¡IMPORTANTE!",
                  text: 'Soporte Actualizado Exitosamente',
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.KeyFind();
                }, 500);
              }
            });
          } else { //Si no existe soporte cargar uno por primera vez
            console.log($scope.Soportes.Soporte_RUTA);
            $http({
              method: 'POST',
              url: "php/altocosto/siniestros/gestionsiniestros.php",
              data: {
                function: 'Upload',
                base: $scope.Soportes.Soporte_B64,
                name: $scope.Soportes.Soporte_RUTA
              }
            }).then(function (response) {
              if (response.data.substr(0, 1) != '0') {
                $scope.ActualizaRuta(response.data);
                if (response.data != '0') {
                  swal({
                    title: "¡IMPORTANTE!",
                    text: 'Soporte Actualizado Exitosamente',
                    type: "success",
                  }).catch(swal.noop);
                  setTimeout(() => {
                    $scope.KeyFind();
                  }, 500);
                } else {
                  swal({
                    title: "¡NOTIFICACION!",
                    text: 'Ocurrio un error, Intente nuevamente',
                    type: "error",
                  }).catch(swal.noop);
                }
              } else {
                swal({
                  title: "¡NOTIFICACION!",
                  text: 'Ocurrio un error, Intente nuevamente',
                  type: "error",
                }).catch(swal.noop);
              }

            });
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

      $scope.ActualizaRuta = function (ruta) {
        if (ruta != null && ruta.substr(0, 1) != '0') {

          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/consultasiniestros.php",
            data: {
              function: 'Actualizar_Ruta_Soporte_Nac',
              radicado: $scope.radicadoSoporte,
              ruta: ruta,
              responsable: $scope.Rol_Cedula,
            }
          }).then(function (response) {
            // console.log(response.data);
            // swal({
            //   title: "¡NOTIFICACION!",
            //   text: 'Soporte Cargado Exitosamente',
            //   type: "success",
            // }).catch(swal.noop);
          })
        }
      }



      $scope.Hoja1_Abrir_Modal_Actualizar = function (X) {
        // console.log($scope.Listado.Lista[0].FECHA_NACIMIENTO);
        $('#Modal_NuevaGestion').modal('open');

        /*Diagnostico*/
        angular.forEach(document.querySelectorAll('.Form_Consulta input'), function (i) {
          i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
          i.setAttribute("disabled", true);
        });
        $scope.Vista1.Modal_Consulta_Radicado = X.RADICADO;
        $scope.Vista1.Modal_Consulta_Cod_Cohorte = X.COHORTE;
        $scope.Vista1.Modal_Consulta_Diagnostico = X.DIAGNO;
        $scope.Vista1.Modal_Consulta_Diagnostico_Cod = (X.DIAGNO.toString().split('-')[0]).toString().trim();
        $scope.Vista1.Modal_Consulta_Diagnostico_Save = (X.DIAGNO.toString().split('-')[0]).toString().trim();
        $scope.Obtener_Clasificacion();
        setTimeout(() => {
          $scope.Vista1.Modal_Consulta_Clasificacion = X.COD_CLASE_CONCEPTO;
          $scope.$apply();
        }, 1000);

        $scope.Vista1.Busqueda.Diagnostico.SAVE = X.DIAGNO;
        $scope.Vista1.Busqueda.Diagnostico.Listado = null;
        $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
        $scope.Vista1.Modal_Consulta_Clase = X.COD_CLASE_CONCEPTO;


        $scope.abrirModalCambioClasificacionyDiagnostico(X);

        var XFECHA_INIC_IPS_ASIG = X.FECHA_INICIO_TTO.toString().split('/');
        var FECHA_INIC_IPS_ASIG = new Date(XFECHA_INIC_IPS_ASIG[2], XFECHA_INIC_IPS_ASIG[1] - 1, XFECHA_INIC_IPS_ASIG[0]);
        var XFECHA_IDENT = X.FECHA_IDENTIFICACION.toString().split('/');
        var FECHA_IDENT = new Date(XFECHA_IDENT[2], XFECHA_IDENT[1] - 1, XFECHA_IDENT[0]);
        var XFECHA_MIN = X.FECHA_NACIMIENTO.toString().split('/');
        var FECHA_NAC = new Date(XFECHA_MIN[2], XFECHA_MIN[1] - 1, XFECHA_MIN[0]);
        $scope.Vista1.Modal_Consulta_Fecha_Nac = FECHA_NAC;
        $scope.Vista1.Modal_Consulta_FechaIpsIniTra = FECHA_INIC_IPS_ASIG;
        $scope.Vista1.Modal_Consulta_FechaIpsIniTra_Save = FECHA_INIC_IPS_ASIG;
        $scope.Vista1.Modal_Consulta_IpsIniTra = X.IPS_TTO.toString();
        $scope.Vista1.Modal_Consulta_IpsIniTra_Cod = (X.IPS_TTO.toString().split('-')[0]).toString().trim();
        $scope.Vista1.Modal_Consulta_IpsIniTra_Save = (X.IPS_TTO.toString().split('-')[0]).toString().trim();
        $scope.Vista1.Modal_Consulta_FechaIdent = FECHA_IDENT;
        $scope.Vista1.Modal_Consulta_TipoTratamiento = X.TIPO_TTO;
        $scope.Vista1.Modal_Consulta_Estado_Siniestro = X.ESTADO;
        $scope.Tabs_Actualizar = 1;
        setTimeout(() => {
          $("#Tab_Act1").click();
        }, 300);

        /*Ips Asignada*/
        if (X.COD_IPS_ATENCION != '') {
          var FECHA_IPS = new Date(X.FECHA_IPS_ATENCION);
          var FECHA_MIN = new Date(X.FECHA_IPS_ATENCION);
          var XFECHA_MIN = X.FECHA_NACIMIENTO.toString().split('/');
          var FECHA_NAC = new Date(XFECHA_MIN[2], XFECHA_MIN[1] - 1, XFECHA_MIN[0]);
          var XFECHA_CONFIG_DIAG = X.FECHA_CONF_DIAGNOSTICO.toString().split('/');
          var FECHA_CONFIG_DIAG = new Date(XFECHA_CONFIG_DIAG[2], XFECHA_CONFIG_DIAG[1] - 1, XFECHA_CONFIG_DIAG[0]);
          $scope.Vista1.Modal_Consulta_Fecha_Config_Diag = FECHA_CONFIG_DIAG;
          $scope.Vista1.Modal_Consulta_Fecha_Config_Diag_Save = $scope.Vista1.Modal_Consulta_Fecha_Config_Diag;
          $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig = FECHA_IPS;
          $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save = FECHA_MIN;
          $scope.Vista1.Modal_Consulta_Fecha_Nac = FECHA_NAC;
          $scope.Vista1.Modal_Consulta_IpsAsig = X.COD_IPS_ATENCION + ' - ' + X.NOM_IPS_ATENCION;
          $scope.Vista1.Modal_Consulta_IpsAsig_Cod = X.COD_IPS_ATENCION;
          $scope.Vista1.Modal_Consulta_IpsAsig_Save = X.COD_IPS_ATENCION;
          $scope.Vista1.Busqueda.IpsAsig.SAVE = X.COD_IPS_ATENCION + ' - ' + X.NOM_IPS_ATENCION;
          $scope.Vista1.Busqueda.IpsAsig.Listado = null;
          $scope.Vista1.Busqueda.IpsAsig.Filtro = null;
          $scope.Vista1.Modal_Consulta_Regimen = X.REGIMEN;
        } else {
          var XFECHA_MIN = X.FECHA_NACIMIENTO.toString().split('/');
          var FECHA_MIN = new Date(XFECHA_MIN[2], XFECHA_MIN[1] - 1, XFECHA_MIN[0]);
          $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save = FECHA_MIN;
          $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig = $scope.SysDay;
          $scope.Vista1.Modal_Consulta_IpsAsig = '';
          $scope.Vista1.Modal_Consulta_IpsAsig_Cod = '';
          $scope.Vista1.Modal_Consulta_IpsAsig_Save = '';
          $scope.Vista1.Modal_Consulta_Fecha_Nac = FECHA_MIN;
          $scope.Vista1.Busqueda.IpsAsig.SAVE = '';
          $scope.Vista1.Busqueda.IpsAsig.Listado = null;
          $scope.Vista1.Busqueda.IpsAsig.Filtro = null;
          $scope.Vista1.Modal_Consulta_Regimen = X.REGIMEN;
        }
      }

      $scope.abrirModalCambioClasificacionyDiagnostico = function (x) {
        $scope.formCambioClasyDiag = {
          radicado: '',
          cohorte: '',
          clasificacionAnt: '',
          diagnosticoAnt: '',

          listadoClasificacion: '',
          listadoDiagnostico: '',

          // cohorteNuevo : '',
          clasificacionNuevo: '',
          diagnosticoNuevo: '',
        }
        $scope.formCambioClasyDiag.radicado = x.RADICADO;
        $scope.formCambioClasyDiag.cohorte = x.COHORTE
          ;
        $scope.formCambioClasyDiag.clasificacionAnt = `${x.COD_CLASE_CONCEPTO} - ${x.CLASE_CONCEPTO}`;
        $scope.formCambioClasyDiag.diagnosticoAnt = x.DIAGNO;


        $scope.formCambioClasyDiag.listadoClasificacion = [];
        $scope.formCambioClasyDiag.listadoDiagnostico = [];

        $scope.formCambioClasyDiag.clasificacionNuevo = '';
        $scope.formCambioClasyDiag.diagnosticoNuevo = '';

        $scope.obtenerClasificacion(x.COHORTE);

      }


      $scope.obtenerClasificacion = function (cohorte) {
        $scope.formCambioClasyDiag.listadoClasificacion = [];
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/gestionsiniestros.php",
          data: {
            function: 'obtenerClasificacion',
            cohorte
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) != '<br') {
            $scope.formCambioClasyDiag.listadoClasificacion = data;
          }
        })
      }

      $scope.obtenerDiagnostico = function () {
        $scope.formCambioClasyDiag.listadoDiagnostico = [];
        if ($scope.formCambioClasyDiag.diagnosticoNuevo.length > 2)
          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
              function: 'Obtener_Diagnostico_F',
              Conc: $scope.formCambioClasyDiag.diagnosticoNuevo.toUpperCase(),
              Coh: $scope.formCambioClasyDiag.cohorte,
              Cla: $scope.formCambioClasyDiag.clasificacionNuevo.toString().split('-')[0].trim()
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data.length == 0) {
                swal("¡Importante!", "No se encontro el diagnostico", "info").catch(swal.noop);
              }
              // if (response.data.length > 0) {
              $scope.formCambioClasyDiag.listadoDiagnostico = response.data;
              // }
            } else {
              swal({
                title: "¡Importante!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
      }

      $scope.guardarCambioClasificacionyDiagnostico = function () {
        if ($scope.formCambioClasyDiag.diagnosticoNuevo.toString().split('-')[0] != '' && $scope.formCambioClasyDiag.clasificacionNuevo.toString().split('-')[0] != '')
          // debugger
          if ($scope.formCambioClasyDiag.cohorte == 'CA' || $scope.formCambioClasyDiag.cohorte == 'EH') {
            swal({
              title: "¿Está seguro que actualizar el diagnóstico y la clasificación?",
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();

                  $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/gestionsiniestros.php",
                    data: {
                      function: 'Actualizar_Diag_Clase',
                      Rad: $scope.formCambioClasyDiag.radicado,
                      Conc: $scope.formCambioClasyDiag.diagnosticoNuevo.toString().split('-')[0].trim(),
                      Cla: $scope.formCambioClasyDiag.clasificacionNuevo.toString().split('-')[0].trim()
                    }
                  }).then(function ({ data }) {
                    if (data.toString().substr(0, 3) != '<br') {
                      if (data.Codigo == 0) {
                        $scope.HNAC_ObtenerListado();
                        swal("¡Importante!", data.Nombre, "success").catch(swal.noop);
                        $scope.closeModal();
                      } else {
                        swal("¡Importante!", data.Nombre, "warning").catch(swal.noop);
                      }
                    } else {
                      swal("¡Importante!", data, "info").catch(swal.noop);
                    }

                  })

                }
              })
          } else {
            swal("¡No se permite esta acción para esta cohorte!", data, "info").catch(swal.noop);

          }

      }

      // $scope.Hoja1_Actualiza_Diag = function () {
      //   var Campos_Empty = false;
      //   // actualizar diagnostico
      //   if ($scope.Vista1.Modal_Consulta_Diagnostico_Cod != $scope.Vista1.Modal_Consulta_Diagnostico_Save) {
      //     if ($scope.Vista1.Modal_Consulta_Diagnostico_Cod == undefined || $scope.Vista1.Modal_Consulta_Diagnostico_Cod == null || $scope.Vista1.Modal_Consulta_Diagnostico_Cod == '') {
      //       Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Diag_Label').classList.add('red-text');
      //     }
      //     if ($scope.Vista1.Modal_Consulta_Clasificacion != '' && $scope.Vista1.Modal_Consulta_Clasificacion != undefined) {

      //     }
      //     if (Campos_Empty == false) {
      //       swal({
      //         title: '¿Está seguro que desea actualizar el Diagnostico?',
      //         type: "question",
      //         showCancelButton: true,
      //         allowOutsideClick: false
      //       }).catch(swal.noop)
      //         .then((willDelete) => {
      //           if (willDelete) {
      //             swal({ title: 'Cargando...', allowOutsideClick: false });
      //             swal.showLoading();
      //             $http({
      //               method: 'POST',
      //               url: "php/altocosto/siniestros/consultasiniestros.php",
      //               data: {
      //                 function: 'Hoja1_Actualiza_Diag',
      //                 Rad: $scope.Vista1.Modal_Consulta_Radicado,
      //                 Tipo_Doc: $scope.Vista1.Tipo_Doc,
      //                 Num_Doc: $scope.Vista1.Num_Doc,
      //                 Ced: $scope.Rol_Cedula,
      //                 Diag: $scope.Vista1.Modal_Consulta_Diagnostico_Cod,
      //               }
      //             }).then(function (response) {
      //               if (response.data && response.data.toString().substr(0, 3) != '<br') {
      //                 if (response.data.Codigo == 0) {
      //                   $scope.closeModal();
      //                   swal({
      //                     title: "Mensaje",
      //                     text: response.data.Nombre,
      //                     type: "success",
      //                   }).catch(swal.noop);
      //                 } else {
      //                   swal({
      //                     title: response.data.Nombre,
      //                     type: "warning",
      //                   }).catch(swal.noop);
      //                 }
      //                 setTimeout(() => {
      //                   $scope.Hoja1_Consultar_Siniestros();
      //                 }, 2000);
      //               }
      //             });
      //           }
      //         })
      //     }
      //   } else {
      //     swal({
      //       title: 'El diagnostico seleccionado es el mismo al actual.',
      //       type: "info",
      //     }).catch(swal.noop);
      //   }
      // }

      $scope.Hoja1_Actualiza_Fecha = function () {
        //actualizar fecha
        var Campos_Empty = false;
        if ($scope.Vista1.Modal_Consulta_Fecha_Config_Diag != $scope.Vista1.Modal_Consulta_Fecha_Config_Diag_Save) {
          if ($scope.Vista1.Modal_Consulta_Fecha_Config_Diag_Save == undefined || $scope.Vista1.Modal_Consulta_Fecha_Config_Diag_Save == null || $scope.Vista1.Modal_Consulta_Fecha_Config_Diag_Save == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Diag_Label').classList.add('red-text');
          }
          if (Campos_Empty == false) {
            swal({
              title: '¿Está seguro que desea actualizar fecha de diagnostico?',
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  var xFecha = $scope.Vista1.Modal_Consulta_Fecha_Config_Diag;
                  var Fecha = xFecha.getDate() + '-' + (((xFecha.getMonth() + 1) < 10) ? '0' + (xFecha.getMonth() + 1) : (xFecha.getMonth() + 1)) + '-' + xFecha.getFullYear();
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                      function: 'Hoja1_Actualiza_Fecha_Diag',
                      Ced: $scope.Rol_Cedula,
                      Rad: $scope.Vista1.Modal_Consulta_Radicado,
                      Fecha: Fecha,
                    }
                  }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                      if (response.data.Codigo == 0) {
                        $scope.closeModal();
                        swal({
                          title: "Mensaje",
                          text: response.data.Nombre,
                          type: "success",
                        }).catch(swal.noop);
                      } else {
                        swal({
                          title: response.data.Nombre,
                          type: "warning",
                        }).catch(swal.noop);
                      }
                      setTimeout(() => {
                        $scope.Hoja1_Consultar_Siniestros();
                      }, 2000);
                    }
                  });
                }
              })
          }
        } else {
          swal({
            title: 'La fecha de diagnostico seleccionado es la misma a la actual.',
            type: "info",
          }).catch(swal.noop);
        }
      }

      $scope.Hoja1_Actualiza_IpsAsig = function () {
        if ($scope.Vista1.Modal_Consulta_IpsAsig_Cod != $scope.Vista1.Modal_Consulta_IpsAsig_Save) {
          angular.forEach(document.querySelectorAll('#Modal_NuevaGestion .red-text'), function (i) {
            i.classList.remove('red-text');
          });
          var Campos_Empty = false;
          if ($scope.Vista1.Modal_Consulta_IpsAsig_Cod == undefined || $scope.Vista1.Modal_Consulta_IpsAsig_Cod == null || $scope.Vista1.Modal_Consulta_IpsAsig_Cod == '') {
            Campos_Empty = true; document.querySelector('#Vista1_Modal_Consulta_IpsAsig_Label').classList.add('red-text');
          }
          if ($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig == undefined || $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig == null || $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig == '') {
            Campos_Empty = true; document.querySelector('#Vista1_Modal_Consulta_Fecha_inicio_IpsAsig_Label').classList.add('red-text');
          }
          if (Campos_Empty == false) {
            swal({
              title: '¿Está seguro que desea actualizar la Ips Integral?',
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  if ($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save.toISOString().substring(0, 10) == $scope.SysDay.toISOString().substring(0, 10)) {
                    $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig.setDate($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig.getDate() + 1);
                  }
                  var xFecha_inicio = $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig;
                  var Fecha_inicio = xFecha_inicio.getDate() + '-' + (((xFecha_inicio.getMonth() + 1) < 10) ? '0' + (xFecha_inicio.getMonth() + 1) : (xFecha_inicio.getMonth() + 1)) + '-' + xFecha_inicio.getFullYear();
                  $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                      function: 'Hoja1_Actualiza_Ips',
                      Rad: $scope.Vista1.Modal_Consulta_Radicado,
                      Ced: $scope.Rol_Cedula,
                      Ips: $scope.Vista1.Modal_Consulta_IpsAsig_Cod,
                      Fecha_Inicio: Fecha_inicio
                    }
                  }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                      if (response.data != 0) {
                        if (response.data.Codigo == 0) {
                          $scope.closeModal();
                          swal({
                            title: "Mensaje",
                            text: response.data.Nombre,
                            type: "success",
                          }).catch(swal.noop);
                        } else {
                          swal({
                            title: response.data.Nombre,
                            type: "warning",
                          }).catch(swal.noop);
                        }
                        setTimeout(() => {
                          $scope.Hoja1_Consultar_Siniestros();
                        }, 2000);
                      } else {
                        swal({
                          title: 'Error al guardar la ips',
                          type: "warning",
                        }).catch(swal.noop);
                      }
                    }
                  });
                }
              })
          }
        } else {
          swal({
            title: 'La Ips seleccionada es la misma a la actual.',
            type: "info",
          }).catch(swal.noop);
        }
      }

      $scope.Hoja1_Actualiza_IpsIniTra = function () {
        // debugger
        var cod = $scope.Vista1.Modal_Consulta_IpsIniTra.toString().split('-')[0].toString().trim();
        if (cod != $scope.Vista1.Modal_Consulta_IpsIniTra_Save && $scope.Vista1.Modal_Consulta_FechaIpsIniTra != $scope.Vista1.Modal_Consulta_FechaIpsIniTra_Save) {
          var Campos_Empty = false;
          if ($scope.Vista1.Modal_Consulta_IpsIniTra_Cod == undefined || $scope.Vista1.Modal_Consulta_IpsIniTra_Cod == null || $scope.Vista1.Modal_Consulta_IpsIniTra_Cod == '') {
            Campos_Empty = true; document.querySelector('#Vista1_Modal_Consulta_IpsIniTra_Label').classList.add('red-text');
          }
          if ($scope.Vista1.Modal_Consulta_FechaIpsIniTra == undefined || $scope.Vista1.Modal_Consulta_FechaIpsIniTra == null || $scope.Vista1.Modal_Consulta_FechaIpsIniTra == '') {
            Campos_Empty = true; document.querySelector('#Vista1_Modal_Consulta_Fecha_inicio_IpsIniTra_Label').classList.add('red-text');
          }
          if (Campos_Empty == false) {
            swal({
              title: '¿Está seguro que desea actualizar la Ips de Inico de Tratamiento?',
              type: "question",
              showCancelButton: true,
              allowOutsideClick: false
            }).catch(swal.noop)
              .then((willDelete) => {
                if (willDelete) {
                  swal({ title: 'Cargando...', allowOutsideClick: false });
                  swal.showLoading();
                  // if ($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig_Save.toISOString().substring(0, 10) == $scope.SysDay.toISOString().substring(0, 10)) {
                  //   $scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig.setDate($scope.Vista1.Modal_Consulta_Fecha_inicio_IpsAsig.getDate() + 1);
                  // }
                  var xFecha_inicio = $scope.Vista1.Modal_Consulta_FechaIpsIniTra;
                  var Fecha_inicio = xFecha_inicio.getDate() + '-' + (((xFecha_inicio.getMonth() + 1) < 10) ? '0' + (xFecha_inicio.getMonth() + 1) : (xFecha_inicio.getMonth() + 1)) + '-' + xFecha_inicio.getFullYear();
                  var json = {
                    Radicado: $scope.Vista1.Modal_Consulta_Radicado,
                    Tipo_tto: ($scope.Vista1.Modal_Consulta_TipoTratamiento.toString().split('-')[0]).toString().trim(),
                    Ips_tto: $scope.Vista1.Modal_Consulta_IpsIniTra_Cod,
                    fecha_inicio_tto: Fecha_inicio,
                    Responsable: $scope.Rol_Cedula,
                  }
                  // console.log(json);
                  $http({
                    method: 'POST',
                    url: "php/altocosto/siniestros/consultasiniestros.php",
                    data: {
                      function: 'Hoja1_Modal_Actualizar_Ips_Primera_Aten',
                      json: JSON.stringify(json)
                    }
                  }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                      if (response.data != 0) {
                        if (response.data.Codigo == 0) {
                          $scope.closeModal();
                          swal({
                            title: "Mensaje",
                            text: response.data.Nombre,
                            type: "success",
                          }).catch(swal.noop);
                        } else {
                          swal({
                            title: response.data.Nombre,
                            type: "warning",
                          }).catch(swal.noop);
                        }
                        setTimeout(() => {
                          $scope.Hoja1_Consultar_Siniestros();
                        }, 2000);
                      } else {
                        swal({
                          title: 'Error al guardar la ips',
                          type: "warning",
                        }).catch(swal.noop);
                      }
                    }
                  });
                }
              })
          }
        } else {
          swal({
            title: 'La Ips seleccionada o la fecha es la misma a la actual.',
            type: "info",
          }).catch(swal.noop);
        }

        // $scope.Vista1.Modal_Consulta_FechaIpsIniTra = new Date(X.FECHA_INICIO_TTO);
        // $scope.Vista1.Modal_Consulta_IpsIniTra = X.IPS_TTO.toString();
        // $scope.Vista1.Modal_Consulta_IpsIniTra_Cod = (X.IPS_TTO.toString().split('-')[0]).toString().trim();
        // $scope.Modal_Consulta_IpsIniTra_Save = (X.IPS_TTO.toString().split('-')[0]).toString().trim();

      }

      $scope.Hoja1_Ver_Traza = function (X) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.Vista1.Listado = null;
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/consultasiniestros.php",
          data: {
            function: 'Hoja1_Ver_Traza',
            Rad: X.RADICADO,
            Ced: $scope.Rol_Cedula
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if (response.data.length > 0) {
              $('#Modal_Trazabilidad').modal('open');
              $scope.Vista1.Listado = response.data[0];
              $scope.Vista1.Datos = response.data[0];
              swal.close();
            } else {
              swal({
                title: response.data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            }

          }
        });
      }

      $scope.Hoja1_DescargarExcel = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/consultasiniestros.php",
          data: {
            function: 'Descargar_Excel',
            Estado: '',
            Ubicacion: '',
            Cohorte: '',
            F_Inicio: '',
            F_Fin: '',
            opcion: '1',
            tipoDoc: $scope.Vista1.Tipo_Doc,
            numDoc: $scope.Vista1.Num_Doc
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            if (data.length) {
              let array = [];
              data.forEach(e => {
                array.push({
                  'RADICADO': e.RADICADO,
                  'SECCIONAL': e.DEPARTAMENTO_AFILIADO,
                  'DOCUMENTO_AFILIADO': e.TIPO_DOCUMENTO,
                  'NUM_DOC_AFILIADO': e.NUM_DOCUMENTO,
                  'PRIMER_NOMBRE': e.PRIMER_NOMBRE,
                  'SEGUNDO_NOMBRE_': e.SEGUNDO_NOMBRE,
                  'PRIMER_APELLIDO': e.PRIMER_APELLIDO,
                  'SEGUNDO_APELLIDO': e.SEGUNDO_APELLIDO,
                  'EDAD': e.EDAD,
                  'SEXO': e.AFIC_SEXO,
                  'FECHA_NACIMIENTO': e.FECHA_NACIMIENTO,
                  'FECHA_AFILIACION': e.AFIF_AFILIACION,
                  'ESTADO_AFILIADO': e.AFIC_DESCRIPCION,
                  'FECHA_RETIRO_AFILIADO': e.FECHA_NOVEDAD,
                  'DIRECCION_AFILIADO': e.AFIC_DIRECCION,
                  'CODIGO_DANE_MUNICIPIO_AFILIADO': e.CODIGO_DANE,
                  'MUNICIPIO_AFILIADO': e.MUNICIPIO_AFILIADO,
                  'LOCALIDAD_AFILIADO': e.AFIC_LOCALIDAD,
                  'CELULAR_AFILIADO': e.AFIC_CELULAR,
                  'TELEFONO_AFILIADO': e.AFIC_TELEFONO,
                  'REGIMEN': e.DESC_REGIMEN,
                  'COHORTE': e.DESC_CONCEPTO,
                  'CLASIFICACION': e.CLAC_DESCRIPCION,
                  'COD_DIAGNOSTICO': e.COD_DIAGNOSTICO,
                  'NOM_DIAGNOSTICO': e.DESC_DIAGNOSTICO,
                  'FECHA_CONFIRMACION_DIAGNO': e.FECHA_CONFIRMACION_DIAGNO,
                  'FUENTE': e.EGPC_ORIGEN,
                  'FECHA_IDENTIFICACION_REGISTRO': e.FECHA_INICIO,
                  'FECHA_INICIO_GESTION': e.FECHA_INICIO_GESTION,
                  'ESTADO': e.ESTADO_GESTION,
                  'FECHA_DE_ACCION': e.FECHA_GESTION,
                  'PLURIPATOLOGICO': e.PLURIPATOLOGICO,
                  'PRIORIDAD': e.PRIORIDAD,
                  'IPS_INICIO_TRATAMIENTO': e.IPS_TTO,
                  'TIPO_TRATAMIENTO': e.TIPO_TTO,
                  'FECHA_INICIO_IPS_TRATAMIENTO': e.FECHA_IPS_TTO,
                  'IPS_ATENCION_INTEGRAL': e.IPS_ATENCION_INTEGRAL,
                  'FECHA_INICIO_IPS_ATENCION_INTEGRAL': e.FECHA_IPS_ATENCION,
                  'CODIGO_HABILITACION_DE_IPS': e.COD_IPS_HABILITACION,
                  'RESPONSABLE_SECCIONAL': e.RESPONSABLE_SECCIONAL,
                  'FECHA_GESTION_SECCIONAL': e.FECHA_GESTION_SECCIONAL,
                  'OBSERVACION_SECCIONAL': e.OBSERVACION_SECCIONAL,
                  'RESPONSABLE_NACIONAL': e.RESPONSABLE_NACIONAL,
                  'FECHA_GESTION_NACIONAL': e.FECHA_GESTION_NACIONAL,
                  'OBSERVACION_NACIONAL': e.OBSERVACION_NACIONAL,
                  'FUNCIONARIO_QUE_IDENTIFICA_EL_SINIESTRO': e.NOM_RESPONSABLE_PROCESO,
                  'PORTABILIDAD_DEL_USUARIO': e.UBICACION_PORTABILIDAD,
                  'TUTELA': e.TUTELA,
                  'FECHA_VACUNACION_1RA_DOSIS': e.FECHAAPLICACION_VACUNA,
                  'FECHA_VACUNACION_2DA_DOSIS': e.FECHASEGUNDAVAC,
                  'FECHA_VACUNACION_3RA_DOSIS': '',
                  'IPS_QUE_IDENTIFICA_O_SOLICITANTE': e.IPS_SOL,
                  'IPS_ASIGNADA': e.IPS_ASG,
                  'TIPO_AFILIACION': e.TIPO_AFILIACION,
                  'CONTRATO_PGP': e.CONTRATO_PGP,
                })
              });

              var ws = XLSX.utils.json_to_sheet(array);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
              /* write workbook and force a download */
              XLSX.writeFile(wb, "Reporte por Afiliado de Siniestros.xlsx");
              const text = `Registros encontrados ${data.length}`
              swal('¡Mensaje!', text, 'success').catch(swal.noop);

              swal.close();
            } else {
              swal("¡IMPORTANTE!", "No se encontraron registros", "warning").catch(swal.noop);
              document.getElementById("Num_Doc").focus();
            }
          } else {
            swal({
              title: "¡IMPORTANTE!",
              text: data,
              type: "info",
            }).catch(swal.noop);
            document.getElementById("Num_Doc").focus();
          }
        });
      }


      //CONSULTA DIAGNOSTICO
      $scope.KeyFind_ObDiag = function (keyEvent) {
        if ($scope.Vista1.Busqueda.Diagnostico.Filtro != null && $scope.Vista1.Busqueda.Diagnostico.Filtro.length != 0) {
          if (keyEvent.which === 40) {
            $scope.Vista1.Busqueda.Diagnostico.Seleccion = $scope.Vista1.Busqueda.Diagnostico.Seleccion >= ($scope.Vista1.Busqueda.Diagnostico.Filtro.length - 1) ? 0 : $scope.Vista1.Busqueda.Diagnostico.Seleccion + 1;
            document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Vista1.Busqueda.Diagnostico.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope.Vista1.Busqueda.Diagnostico.Seleccion = $scope.Vista1.Busqueda.Diagnostico.Seleccion <= 0 || $scope.Vista1.Busqueda.Diagnostico.Seleccion == 9999 ? $scope.Vista1.Busqueda.Diagnostico.Filtro.length - 1 : $scope.Vista1.Busqueda.Diagnostico.Seleccion - 1;
            document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Vista1.Busqueda.Diagnostico.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Vista1.Busqueda.Diagnostico.Seleccion != 9999) {
            var x = $scope.Vista1.Busqueda.Diagnostico.Filtro[$scope.Vista1.Busqueda.Diagnostico.Seleccion];
            $scope.FillTextbox_Listado_Diag(x.DIAGNOSTICO, x.DESCRIPCION, x.COD_COHORTE, x.COD_CLASE_COHORTE, x.NOM_CLASE_COHORTE);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_Diag();
        }
      }


      $scope.Buscar_Diag = function () {
        if ($scope.Vista1.Modal_Consulta_Diagnostico.length > 2) {
          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/consultasiniestros.php",
            data: {
              function: 'Obtener_Diagnostico_F',
              Conc: $scope.Vista1.Modal_Consulta_Diagnostico.toUpperCase(),
              Coh: $scope.Vista1.Modal_Consulta_Cod_Cohorte,
              Cla: $scope.Vista1.Modal_Consulta_Clase
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope.Vista1.Busqueda.Diagnostico.Filtro = response.data;
                $scope.Vista1.Busqueda.Diagnostico.Listado = response.data;
                $('.Clase_Listar_Diags').css({ width: $('#Modal_Consulta_Diagnostico')[0].offsetWidth });
              }
              if (response.data.length == 1) {
                if (response.data[0].DIAGNOSTICO == '-1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
                  $scope.Vista1.Busqueda.Diagnostico.Listado = null;
                } else {
                  $scope.FillTextbox_Listado_Diag(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro el diagnostico",
                  type: "info",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }

      $scope.Complete_Listado_Diag = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Vista1.Modal_Consulta_Diagnostico != undefined && string != undefined && $scope.Vista1.Busqueda.Diagnostico.Listado != undefined) {
            $('.Clase_Listar_Diags').css({ width: $('#Modal_Consulta_Diagnostico')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Vista1.Busqueda.Diagnostico.Listado, function (x) {
              if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DIAGNOSTICO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "DIAGNOSTICO": x.DIAGNOSTICO, "DESCRIPCION": x.DESCRIPCION.toUpperCase() });
              }
            });
            $scope.Vista1.Busqueda.Diagnostico.Filtro = output;
            $scope.Vista1.Busqueda.Diagnostico.Seleccion = 9999;
          }
        }
      }


      $scope.FillTextbox_Listado_Diag = function (codigo, nombre) {
        $scope.Vista1.Modal_Consulta_Diagnostico_Cod = codigo;
        $scope.Vista1.Modal_Consulta_Diagnostico = codigo + ' - ' + nombre;
        $scope.Vista1.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
        $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
        $scope.Obtener_Clasificacion();
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Obtener_Clasificacion = function () {
        if ($scope.Vista1.Modal_Consulta_Diagnostico_Cod != '' && $scope.Vista1.Modal_Consulta_Diagnostico_Cod != null) {
          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
              function: 'Obtener_Diagnostico',
              Conc: $scope.Vista1.Modal_Consulta_Diagnostico_Cod
            }
          }).then(function (response) {
            $scope.ClasificacionArr = response.data;
            // console.log($scope.ClasificacionArr);
          })
        } else {
          swal({
            title: "¡Importante!",
            text: "Ocurrio un error",
            type: "info",
          }).catch(swal.noop);
        }

      }

      $scope.Blur_Diag = function () {
        setTimeout(() => {
          if ($scope.Vista1.Modal_Consulta_Diagnostico != null && $scope.Vista1.Modal_Consulta_Diagnostico != undefined) {
            if (($scope.Vista1.Busqueda.Diagnostico.Filtro == null || $scope.Vista1.Busqueda.Diagnostico.Filtro.length == 0)
              && $scope.Vista1.Modal_Consulta_Diagnostico != $scope.Vista1.Busqueda.Diagnostico.SAVE) {
              $scope.Vista1.Modal_Consulta_Diagnostico = $scope.Vista1.Busqueda.Diagnostico.SAVE;
            }
            if ($scope.Vista1.Modal_Consulta_Diagnostico == '') {
              $scope.Vista1.Modal_Consulta_Diagnostico = $scope.Vista1.Busqueda.Diagnostico.SAVE;
              $scope.Vista1.Busqueda.Diagnostico.Filtro = null;
            }
          }
          $scope.$apply();
        }, 300);
      }

      //CONSULTA IPS ASIGNADA
      $scope.KeyFind_ObIps = function (keyEvent, HOJA, IPS) {
        if ($scope[HOJA].Busqueda[IPS].Filtro != null && $scope[HOJA].Busqueda[IPS].Filtro.length != 0) {
          if (keyEvent.which === 40) { // Moverse entre los resultados
            $scope[HOJA].Busqueda[IPS].Seleccion = $scope[HOJA].Busqueda[IPS].Seleccion >= ($scope[HOJA].Busqueda[IPS].Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda[IPS].Seleccion + 1;
            document.querySelector('.Clase_Listar_' + IPS).scrollTo(0, document.querySelector('#' + IPS + $scope[HOJA].Busqueda[IPS].Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
            $scope[HOJA].Busqueda[IPS].Seleccion = $scope[HOJA].Busqueda[IPS].Seleccion <= 0 || $scope[HOJA].Busqueda[IPS].Seleccion == 9999 ? $scope[HOJA].Busqueda[IPS].Filtro.length - 1 : $scope[HOJA].Busqueda[IPS].Seleccion - 1;
            document.querySelector('.Clase_Listar_' + IPS).scrollTo(0, document.querySelector('#' + IPS + $scope[HOJA].Busqueda[IPS].Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda[IPS].Seleccion != 9999) {
            var x = $scope[HOJA].Busqueda[IPS].Filtro[$scope[HOJA].Busqueda[IPS].Seleccion];
            $scope.FillTextbox_Listado_Ips(x.CODIGO, x.NOMBRE, HOJA, IPS);
          }
        } else {
          if (keyEvent.which === 13)
            $scope.Buscar_Ips(HOJA, IPS);
        }
      }
      $scope.Buscar_Ips = function (HOJA, IPS) {
        if ($scope[HOJA]['Modal_Consulta_' + IPS].length > 2) {
          $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
              function: IPS == 'IpsAsig' ? 'Obt_Ips_Asignada' : 'Obt_Ips_Tratamientos',
              Conc: $scope[HOJA]['Modal_Consulta_' + IPS].toUpperCase(),
              Regimen: $scope[HOJA].Modal_Consulta_Regimen,
              Cohorte: $scope[HOJA].Modal_Consulta_Cod_Cohorte
            }
          }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
              if (response.data[0] != undefined && response.data.length > 1) {
                $scope[HOJA].Busqueda[IPS].Filtro = response.data;
                $scope[HOJA].Busqueda[IPS].Listado = response.data;
                $('.Clase_Listar_' + IPS).css({ width: $('#' + HOJA + '_Modal_Consulta_' + IPS)[0].offsetWidth });
              }
              if (response.data.length == 1) {
                if (response.data[0].Codigo == '1') {
                  swal({
                    title: "¡Mensaje!",
                    text: response.data[0].Nombre,
                    type: "info",
                  }).catch(swal.noop);
                  $scope[HOJA].Busqueda[IPS].Filtro = null;
                  $scope[HOJA].Busqueda[IPS].Listado = null;
                } else {
                  $scope.FillTextbox_Listado_Ips(response.data[0].CODIGO, response.data[0].NOMBRE, HOJA, IPS);
                }
              } else if (response.data.length == 0) {
                swal({
                  title: "¡Importante!",
                  text: "No se encontro la Ips",
                  type: "info",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡IMPORTANTE!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }
      $scope.Complete_Listado_Ips = function (keyEvent, string, HOJA, IPS) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope[HOJA]['Modal_Consulta_' + IPS] != undefined && string != undefined && $scope[HOJA].Busqueda[IPS].Listado != undefined) {
            $('.Clase_Listar_' + IPS).css({ width: $('#' + HOJA + '_Modal_Consulta_' + IPS)[0].offsetWidth });
            var output = [];
            angular.forEach($scope[HOJA].Busqueda[IPS].Listado, function (x) {
              if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
              }
            });
            $scope[HOJA].Busqueda[IPS].Filtro = output;
            $scope[HOJA].Busqueda[IPS].Seleccion = 9999;
          }
        }
      }

      $scope.FillTextbox_Listado_Ips = function (codigo, nombre, HOJA, IPS) {
        $scope[HOJA]['Modal_Consulta_' + IPS + '_Cod'] = codigo;
        $scope[HOJA]['Modal_Consulta_' + IPS] = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda[IPS].SAVE = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda[IPS].Filtro = null;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Ips = function (HOJA, IPS) {
        setTimeout(() => {
          if ($scope[HOJA] != null && $scope[HOJA].Form != undefined) {
            if (
              ($scope[HOJA].Busqueda[IPS].Filtro == null || $scope[HOJA].Busqueda[IPS].Filtro.length == 0)
              && $scope[HOJA]['Modal_Consulta_' + IPS] != $scope[HOJA].Busqueda[IPS].SAVE) {
              $scope[HOJA]['Modal_Consulta_' + IPS] = $scope[HOJA].Busqueda[IPS].SAVE;
            }
            if ($scope[HOJA]['Modal_Consulta_' + IPS] == '') {
              $scope[HOJA]['Modal_Consulta_' + IPS] = $scope[HOJA].Busqueda[IPS].SAVE;
              $scope[HOJA].Busqueda[IPS].Filtro = null;
            }
          }
          $scope.$apply();
        }, 300);
      }


      $scope.listarMotivoAnulacion = function () {
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/consultasiniestros.php",
          data: {
            function: 'P_LISTAR_MOTIVO_ANULACION'
          }
        }).then(function ({ data }) {
          if (data && data.toString().substr(0, 3) != '<br') {
            console.table(data)
            $scope.listadoMotivosAnulacion = data;
          } else {
            swal("¡Ocurrio un error!", data, "warning").catch(swal.noop);
          }
        });
      }


      ////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Descargar_Soporte = function (ruta, ftp) {
        $http({
          method: 'POST',
          url: "php/altocosto/siniestros/gestionsiniestros.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta,
            ftp: ftp
          }
        }).then(function (response) {
          var win = window.open("temp/" + response.data, '_blank');
          win.focus();
        });
      }

      $scope.ValFecha = function (SCOPE) {
        if ($scope.Vista2[SCOPE] == undefined) {
          $scope.Vista2[SCOPE] = $scope.SysDay;
        }
        if ($scope.Vista2[SCOPE] > $scope.SysDay) {
          $scope.Vista2[SCOPE] = $scope.SysDay;
        }
      }
      $scope.GetFecha = function (SCOPE) {
        var ahora_ano = $scope.Vista2[SCOPE].getFullYear();
        var ahora_mes = ((($scope.Vista2[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.Vista2[SCOPE].getMonth() + 1) : ($scope.Vista2[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope.Vista2[SCOPE].getDate()) < 10) ? '0' + ($scope.Vista2[SCOPE].getDate()) : ($scope.Vista2[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
      }
      $scope.GetFechaSys = function (SCOPE) {
        var ahora_ano = $scope[SCOPE].getFullYear();
        var ahora_mes = ((($scope[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[SCOPE].getMonth() + 1) : ($scope[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope[SCOPE].getDate()) < 10) ? '0' + ($scope[SCOPE].getDate()) : ($scope[SCOPE].getDate()));
        return ahora_ano + '-' + ahora_mes + '-' + ahora_dia;
      }
      $scope.SetTab = function (x) {
        if (x != $scope.Tabs) {
          $scope.Listado.Lista = [];
          $scope.Listado.ListaTemp = '';
          $scope.Listado.Filtro = '';
        }
        $scope.Tabs = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.setTab_Actualizar = function (x) {
        $scope.Tabs_Actualizar = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }
      $scope.FormatPeso = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9,]/g, '');
        var array = null;
        var regex = new RegExp("\\,");
        if (!regex.test(valor)) {
          valor = valor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          valor = valor.split('').reverse().join('').replace(/^[\.]/, '');
        } else {
          array = valor.toString().split(',');
          if (array.length > 2) {
            input.value = 0;
          } else {
            array[0] = array[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            array[0] = array[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (array[1].length > 2) {
              array[1] = array[1].substr(0, 2);
            }
          }
        }
        if (!regex.test(valor)) {
          input.value = valor;
        } else {
          if (valor == ',') {
            input.value = 0;
          } else {
            if (valor.substr(0, 1) == ',') {
              input.value = 0 + ',' + array[1];
            } else {
              input.value = array[0] + ',' + array[1];
            }
          }
        }
      }
      $scope.FormatPesoNumero = function (num) {
        if (num) {
          var regex2 = new RegExp("\\.");
          if (regex2.test(num)) {
            num = num.toString().replace('.', ',');
            num = num.split(',');
            num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
            if (num[1].length > 1 && num[1].length > 2) {
              num[1] = num[1].toString().substr(0, 2);
            }
            if (num[1].length == 1) {
              num[1] = num[1] + '0';
            }
            return num[0] + ',' + num[1];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num + ',00';
          }
        } else {
          return "0"
        }
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      ////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado != undefined) {
          if (Estado.toString().toUpperCase() == 'A') {
            return { "background-color": "rgb(251, 93, 1) !important;" }
          }
          if (Estado.toString().toUpperCase() == 'P') {
            return { "background-color": "rgb(6, 152, 20)!important" }
          }
        }
      }
      // Paginacion
      $scope.filter = function (val) {
        $scope.Listado.ListaTemp = $filter('filter')($scope.Listado.Lista, ($scope.filter_save == val) ? '' : val);
        if ($scope.Listado.ListaTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
        $scope.filter_save = val;
      }
      $scope.closeModal = function () {
        $('.modal').modal('close');
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Listado.ListaTemp.length / $scope.pageSize);
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
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        // console.log($scope.Listado.Lista.length / $scope.pageSize - 1)
      }



      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.Listado.ListaTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Listado.ListaTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
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

      $scope.Ajustar_Pantalla = function () {
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
      }

      $(window).on('resize', function () {
        $scope.Ajustar_Pantalla();
      });

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
    }
  ]).filter('startFrom', function () {
    return function (input, start) {
      if (input != undefined) {
        start = +start;
        return input.slice(start);
      }
    }
  });

