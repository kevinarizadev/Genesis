'use strict';
angular.module('GenesisApp')
  .controller('seggrupospriorizadosController', ['$scope', '$http', '$filter', '$q', 'afiliacionHttp',
    function ($scope, $http, $filter, $q, afiliacionHttp) {
      console.clear();
      $(document).ready(function () {
        $('.modal').modal();
        console.log($(window).width());
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1300) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
        if ($(window).height() < 600) {
          angular.forEach(document.querySelectorAll('.Clase_AjustarHeigth_Modal_Soporte'), function (i) {
            i.style.height = '95vh';
          });
        }
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Rol_Ubicacion = sessionStorage.getItem('codmunicipio');
        // $scope.Rol_Ubicacion = "8001";
        console.log($scope.Rol_Cedula);
        console.log($scope.Rol_Ubicacion);
        $scope.Color_Bg = '';
        // $scope.Ver_Glosas();
        $scope.Vista = 0;
        // $('input.currency').currencyInput();

        $scope.ObtenerListado();
        $scope.SysDay = new Date();
        $scope.Cargar_Selects();



        /////////////////////////////////////////////////////
        afiliacionHttp.obtenerViaPrincipal().then(function (response) {
          $scope.viaprincipal = response;
        })
        afiliacionHttp.obtenerLetra().then(function (response) {
          $scope.letras = response;
        })
        afiliacionHttp.obtenerCuadrante().then(function (response) {
          $scope.Cuadrantes = response;
        })
        setTimeout(() => {
          $scope.$apply();
        }, 1000);
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        ///////////P-PENDIENTE---G-GESTIONADO---X-ANULADO/////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////
        // $scope.Abrir_Modal_Direccion();

      });




      $scope.ObtenerListado = function () {
        $scope.Lista_Tabla = [];
        $scope.Modal_Consulta_Tipo = "";
        $scope.Modal_Consulta_Numero = "";
        $scope.Modal_Consulta_Fuente = "";
        $scope.Reg_Proc_Count = 0;
        $scope.Otra_Fuente_Datos = null;
        $scope.List_Count = {
          "Aut": 0,
          "Rips": 0,
          "Censo": 0,
          "Consusalud": 0,
          "Otra": 0
        };
        $scope.Vista = {
          Form: false
        };
        $scope.Busqueda = {
          Diagnostico: {
            Filtro: null,
            Listado: null,
            SAVE: null,
            Cohorte: null,
            Seleccion: 9999
          }
        }

        // var Rol_Ubicacion = 0;

        // if ($scope.Rol_Ubicacion == 1) {
        //   Rol_Ubicacion = 1;
        // }
        // if ($scope.Rol_Ubicacion.substr(0, 2) == 80 || $scope.Rol_Ubicacion.substr(0, 1) == 8) {
        //   Rol_Ubicacion = '8';
        // }
        // if ($scope.Rol_Ubicacion.substr(0, 2) != 80 && $scope.Rol_Ubicacion.substr(0, 1) != 8 && $scope.Rol_Ubicacion != 1) {
        //   Rol_Ubicacion = $scope.Rol_Ubicacion.substr(0, 2);
        // }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'ObtenerListado',
            // Ubicacion: Rol_Ubicacion,
            Ced: $scope.Rol_Cedula
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            if (response.data.Codigo == undefined) {

              swal.close();
              setTimeout(() => {
                response.data.forEach(e => {
                  (e.STATUS == '2' || e.STATUS == '3') ? $scope.Reg_Proc_Count += 1 : '';
                  (e.FUENTE == 'A') ? $scope.List_Count.Aut += 1 : '';
                  (e.FUENTE == 'R') ? $scope.List_Count.Rips += 1 : '';
                  (e.FUENTE == 'C') ? $scope.List_Count.Censo += 1 : '';
                  (e.FUENTE == 'N') ? $scope.List_Count.Consusalud += 1 : '';
                  (e.FUENTE != 'A' && e.FUENTE != 'R' && e.FUENTE != 'C' && e.FUENTE != 'N') ? $scope.List_Count.Otra += 1 : '';

                  $scope.Lista_Tabla.push({
                    "DOC_AFI": e.DOC_AFI,
                    "ESTADO": e.STATUS,
                    "STATUS": e.STATUS,
                    "ESTADO_NOM": $scope.Estado_Solicitud_Tooltip(e.STATUS),
                    "FUENTE": e.FUENTE,
                    "FUENTE_NOM": $scope.Find_Fuente(e.FUENTE),
                    "NOMBRE_AFI": e.NOMBRE_AFI,
                    "NUM_RADICADO": e.NUM_RADICADO,
                    "PRIORIDAD": e.PRIORIDAD,
                    "TIPO_DOC_AFI": e.TIPO_DOC_AFI
                  });
                });
                $scope.initPaginacion($scope.Lista_Tabla);
                $scope.$apply();
              }, 500);
            } else {
              if (response.data.Codigo == 1) {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data.Nombre,
                  type: "warning"
                }).catch(swal.noop);
              } else {
                document.querySelector("#pantalla").style.pointerEvents = "none";
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data.Nombre,
                  type: "warning",
                  allowOutsideClick: false
                }).catch(swal.noop);
              }
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        })
      }


      $scope.Cargar_Selects = function () {
        $scope.Array_Necesidad = [];
        $scope.Array_Seguimiento = [];
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'ObtenerOpciones'
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br') {
            response.data.forEach(e => {
              if (e.CONCEPTO == 'NEC') {
                $scope.Array_Necesidad.push({ "CODIGO": e.CODIGO, "TEXTO": e.NOMBRE });
              }
              if (e.CONCEPTO == 'SEG') {
                $scope.Array_Seguimiento.push({ "CODIGO": e.CODIGO, "TEXTO": e.NOMBRE });
              }
            });
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
        ////////////
        $scope.Array_Aceptacion = [
          { CODIGO: 1, TEXTO: 'El usuario cuenta con Historia Clinica' },
          { CODIGO: 2, TEXTO: 'El usuario acepta diagnostico' },
        ];
        $scope.Array_NoContesta = [
          { CODIGO: 1, TEXTO: 'El usuario no contesta llamada' },
        ];
        $scope.Array_Anulacion = [
          { CODIGO: 1, TEXTO: 'El usuario no acepta tener patologia' },
          { CODIGO: 2, TEXTO: 'El usuario no tiene Historia Clinica' }
        ];


        // $scope.Array_Necesidad = [
        //   { CODIGO: 1, TEXTO: 'Ayudas Diagnósticas' },
        //   { CODIGO: 2, TEXTO: 'Consulta Médico de Programa' },
        //   { CODIGO: 3, TEXTO: 'Consulta por Especialista' },
        //   { CODIGO: 4, TEXTO: 'Formula Médica' },
        //   { CODIGO: 5, TEXTO: 'Laboratorios' },
        //   { CODIGO: 6, TEXTO: 'Procedimiento' }
        // ];
        // $scope.Array_Seguimiento = [
        //   { CODIGO: 1, TEXTO: 'Informar a la Farmacia - Usuario sin Medicamento' },
        //   { CODIGO: 2, TEXTO: 'Informar a Proveedor o Usuario sin Oxigeno' },
        //   { CODIGO: 3, TEXTO: 'Autorización Gestante para Parto - Cesárea' },
        //   { CODIGO: 4, TEXTO: 'Hospital Día' },
        //   { CODIGO: 5, TEXTO: 'Protocolo de Atención Violencia - Abuso' },
        //   { CODIGO: 6, TEXTO: 'PASIVI' },
        //   { CODIGO: 7, TEXTO: 'Visita Domiciliaria Toma de Muestras' },
        //   { CODIGO: 8, TEXTO: 'Visita Domiciliaria Médico' }
        // ];

      }

      $scope.Mostar_Formulario = function (X) {
        $scope.Form = null;
        ////////////////
        $scope.Color_Bg = '';
        if (X.FUENTE == 'A') { $scope.Color_Bg = "BgColor_A"; $scope.Color_Co = "Color_A"; }
        if (X.FUENTE == 'R') { $scope.Color_Bg = "BgColor_R"; $scope.Color_Co = "Color_R"; }
        if (X.FUENTE == 'C') { $scope.Color_Bg = "BgColor_C"; $scope.Color_Co = "Color_C"; }
        if (X.FUENTE == 'N') { $scope.Color_Bg = "BgColor_N"; $scope.Color_Co = "Color_N"; }
        if (X.FUENTE != 'A' && X.FUENTE != 'R' && X.FUENTE != 'C' && X.FUENTE != 'N') { $scope.Color_Bg = "BgColor_O"; $scope.Color_Co = "Color_O"; }


        /////////////////

        if (X.STATUS == '1') { // REGISTRO ACTIVO
          /***************************************** */
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados input'), function (i) {
            // i.removeAttribute("readonly");
            i.setAttribute("readonly", true);
            i.classList.add("class_gris");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados select'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
            i.setAttribute("disabled", true);
          });
          setTimeout(() => {
            angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados label'), function (i) {
              i.classList.add("class_label");
            });
            angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados input'), function (i) {
              i.classList.add("class_gris");
            });
            angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
              i.classList.add("class_gris");
            });
          }, 1500);
          $scope.Edit_Educacion = false;
          /***************************************** */
          angular.forEach(document.querySelectorAll('.Form_Campos input'), function (i) {
            i.removeAttribute("disabled");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos input'), function (i) {
            i.removeAttribute("readonly");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos select'), function (i) {
            i.removeAttribute("disabled");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos textarea'), function (i) {
            i.removeAttribute("disabled");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos textarea'), function (i) {
            i.removeAttribute("disabled");
          });
          setTimeout(() => {
            angular.forEach(document.querySelectorAll('.Form_Campos label'), function (i) {
              i.classList.remove("class_label");
            });
          }, 1500);
          /***************************************** */
          /***************************************** */
          angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente input'), function (i) {
            i.setAttribute("readonly", true);
            i.classList.add("class_gris");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente select'), function (i) {
            i.setAttribute("disabled", true);
          });
          setTimeout(() => {
            angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente input'), function (i) {
              i.classList.add("class_gris");
            });
            angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente label'), function (i) {
              i.classList.add("class_label");
            });
          }, 1500);
          /***************************************** */
          /***************************************** */
          setTimeout(() => {
            $scope.$apply();
          }, 1000);
          if (X.FUENTE != 'A' && X.FUENTE != 'R' && X.FUENTE != 'C' && X.FUENTE != 'N') {
            /***************************************** */
            /***************************************** */
            angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente input'), function (i) {
              i.removeAttribute("readonly");
            });
            angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente select'), function (i) {
              i.removeAttribute("disabled");
            });
            setTimeout(() => {
              angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente input'), function (i) {
                i.classList.remove("class_gris");
              });
            }, 1500);
            /***************************************** */
            /***************************************** */
          } else {
            $scope.Otra_Fuente_Datos = null;
          }
          setTimeout(() => {
            $scope.$apply();
          }, 3000);
        }

        if (X.STATUS == '2' || X.STATUS == '3') { // REGISTRO GESTIONADO
          $scope.Dsb_Campos = "";
          $scope.Dsb_Campos_Otras_F = "";
          /*******************************************/
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados select'), function (i) {
            i.setAttribute("disabled", true);
          });
          setTimeout(() => {
            angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados input'), function (i) {
              i.classList.remove("class_gris");
            });
            angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
              i.classList.remove("class_gris");
            });
          }, 1500);
          /*******************************************/
          angular.forEach(document.querySelectorAll('.Form_Campos input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos select'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos textarea'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente input'), function (i) {
            i.setAttribute("readonly", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente select'), function (i) {
            i.setAttribute("disabled", true);
          });
          setTimeout(() => {
            angular.forEach(document.querySelectorAll('.Form_Campos_OtraFuente input'), function (i) {
              i.classList.remove("class_gris");
            });
            $scope.$apply();
          }, 1000);
          setTimeout(() => {
            $scope.$apply();
          }, 3000);
        }

        if ($scope.Otra_Fuente_Datos != null) {
          X.FUENTE = $scope.Otra_Fuente_Datos.FUENTE;
          X.STATUS = $scope.Otra_Fuente_Datos.STATUS;
          X.COD_COHORTE = $scope.Otra_Fuente_Datos.COD_COHORTE;
          X.COD_DIAGNOSTICO = $scope.Otra_Fuente_Datos.COD_DIAG;
          X.NOM_DIAGNOSTICO = $scope.Otra_Fuente_Datos.NOM_DIAG;
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'ObtenerDetalle',
            Tipo_Doc: X.TIPO_DOC_AFI,
            Num_Doc: X.DOC_AFI,
            Num_Rad: X.NUM_RADICADO,
            Fuente: X.FUENTE,
            Cod_Coh: X.COD_COHORTE,
          }
        }).then(function (response) {
          if (response.data.toString().substr(0, 3) != '<br' && response.data[0] != undefined && response.data[0].CODIGO == 0) {
            $scope.Cargar_Formulario(response.data[0]);
            swal.close();
          } else if (response.data.toString().substr(0, 3) == '<br') {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          } else {
            if (response.data.Codigo == 1) {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data.Nombre,
                type: "warning",
              }).catch(swal.noop);
            }
          }
        });
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }

      $scope.Cargar_Formulario = function (X) {
        if ($scope.Otra_Fuente_Datos != null) {
          X.FUENTE = $scope.Otra_Fuente_Datos.FUENTE;
          X.STATUS = $scope.Otra_Fuente_Datos.STATUS;
          X.COD_COHORTE = $scope.Otra_Fuente_Datos.COD_COHORTE;
          X.COD_DIAGNOSTICO = $scope.Otra_Fuente_Datos.COD_DIAG;
          X.NOM_DIAGNOSTICO = $scope.Otra_Fuente_Datos.NOM_DIAG;
        }
        var Op_Fuente_Nom = $scope.Find_Fuente(X.FUENTE);
        var Estado_Nom = (X.STATUS == '1') ? 'PENDIENTE' : (X.STATUS == '2') ? 'GESTIONADO' : 'ANULADO';
        var Fecha_Nac = new Date(X.FECHA_NAC);
        var Fecha_Gestion = (X.FECHA_GESTION == '') ? $scope.SysDay : new Date(X.FECHA_GESTION);
        var Fecha_Nuevo_Seg = (X.FECHA_NUEVO_SEG == '') ? $scope.SysDay : new Date(X.FECHA_NUEVO_SEG);
        // var Fecha_Registro = (X.FECHA_REGISTRO == '') ? $scope.SysDay : new Date(X.FECHA_REGISTRO);
        var Fecha_Inicio = (X.FECHA_INICIO == '') ? $scope.SysDay : new Date(X.FECHA_INICIO);
        var Fecha_Fin = (X.FECHA_FIN == '') ? $scope.SysDay : new Date(X.FECHA_FIN);
        // var Fecha_Term_Embarazo = (X.FECHA_TERM_EMBARAZO == '') ? $scope.SysDay : new Date(X.FECHA_TERM_EMBARAZO);
        var Fecha_Ultima_Men = (X.FECHA_ULTIMA_MESTRUACION == '') ? $scope.SysDay : new Date(X.FECHA_ULTIMA_MESTRUACION);

        if (X.FUENTE != 'A' && X.FUENTE != 'R' && X.FUENTE != 'C' && X.FUENTE != 'N') {
          Fecha_Fin = new Date('2999/12/31');
        }
        if (X.TELEFONO_1.toString().trim().length > 7) {
          if (X.CELULAR_1.toString().trim().length == 0) {
            X.CELULAR_1 = X.TELEFONO_1;
            X.TELEFONO_1 = "";
          } else {
            X.CELULAR_2 = X.TELEFONO_1;
            X.TELEFONO_1 = "";
          }
        }
        $scope.Form = {
          Estado: X.ESTADO,
          Status: X.STATUS,
          Estado_Nom: Estado_Nom,
          Radicado: X.RADICADO,
          Cod_Cohorte: X.COD_COHORTE,
          Cod_Doc_Cohorte: (X.COD_DOC_COHORTE == '') ? 'GS' : X.COD_DOC_COHORTE,
          Cod_Diag: X.COD_DIAGNOSTICO,
          Cod_Diag_Nom: X.NOM_DIAGNOSTICO,
          Diagnostico: (X.COD_DIAGNOSTICO == '') ? '' : (X.COD_DIAGNOSTICO + ' - ' + X.NOM_DIAGNOSTICO),
          // Fecha_Registro: Fecha_Registro,
          Fecha_Inicio: Fecha_Inicio,
          Fecha_Fin: Fecha_Fin,
          Fecha_Gestion: Fecha_Gestion,
          Seccional_Cod: X.SECCIONAL_COD,
          Seccional_Nom: X.SECCIONAL_NOM,
          Municipio_Cod: X.MUNICIPIO_COD,
          Municipio_Nom: X.MUNICIPIO_NOM + ' - ' + X.SECCIONAL_NOM,

          Afi_Ubicacion: X.UBICACION,
          Afi_Tipo_Doc: X.TIPO_DOC,
          Afi_Num_Doc: X.NUM_DOC,
          Afi_Nombre: X.NOMBRE,
          Afi_Pri_Nombre: X.PRI_NOMBRE,
          Afi_Pri_Apellido: X.PRI_APELLIDO,
          Afi_Seg_Nombre: X.SEG_NOMBRE,
          Afi_Seg_Apellido: X.SEG_APELLIDO,

          Actualizar_Datos: true,
          Afi_Fecha_Nac: Fecha_Nac,
          Afi_Edad: X.EDAD,
          Afi_Sexo: X.SEXO,
          Afi_Direccion: X.DIRECCION,
          Afi_Barrio: X.BARRIO,
          Afi_Telefono_1: X.TELEFONO_1.toString().trim(),
          Afi_Celular_1: X.CELULAR_1.toString().trim(),
          Afi_Celular_2: X.CELULAR_2.toString().trim(),
          Afi_Regimen: X.REGIMEN,

          Op_Contesta_LLamada: (X.CONTESTA_LLAMADO != '') ? ((X.CONTESTA_LLAMADO == 'S') ? true : false) : true,
          Op_Fuente: X.FUENTE,
          Op_Fuente_Nom: Op_Fuente_Nom,
          Op_Portabilidad: X.PORTABILIDAD,
          Op_Curso_Vida: X.CURSO_VIDA,
          Op_Gestacion: X.GESTACION,
          // Op_Fecha_Term_Embarazo: Fecha_Term_Embarazo,
          Op_Fecha_Ultima_Men: Fecha_Ultima_Men,
          Op_Cohorte: X.COHORTE,
          Op_Necesidad: X.NECESIDAD,
          Op_Seguimiento: X.SEGUIMIENTO,
          Op_Observacion: X.OBSERVACION,
          Op_Educaciones: X.EDUCACIONES,
          Op_Fecha_Nuevo_Seg: Fecha_Nuevo_Seg,
          Autorizacion: X.AUTORIZACION,
          Motivo: X.MOTIVO,
          Ruta: X.RUTA.toString().trim(),
          Url: '',

          Soportes: {
            Soporte1_URL: '',
            Soporte1_B64: '',
            Soporte1_RUTA: '',
          }
        };
        $scope.Sop_Lab = {
          Soporte1: '',
        };
        // -- //

        $scope.Busqueda.Diagnostico.SAVE = (X.COD_DIAGNOSTICO == '') ? '' : X.COD_DIAGNOSTICO + ' - ' + X.NOM_DIAGNOSTICO;
        if ($scope.Form.Status == '1') {
          $scope.Set_Educacion();
        }
        // -- //
        $scope.Vista = {
          Form: true
        };
        setTimeout(() => {
          document.getElementById('Hoja_Form').scrollIntoView({ block: 'start', behavior: 'smooth' });
          document.querySelector("#Afi_Telefono_1").dispatchEvent(new KeyboardEvent('keyup'));
          document.querySelector("#Afi_Celular_1").dispatchEvent(new KeyboardEvent('keyup'));
          document.querySelector("#Afi_Celular_2").dispatchEvent(new KeyboardEvent('keyup'));
          $scope.H1Limpiar_Campos_Req('Form');
        }, 300);
        document.querySelector('#Form_Soporte1').value = "";
        document.querySelector('#Sop_Lab_Soporte1').value = "";
        document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
        document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
        //Limpiar Input Vacios
        for (var i = 0; i < document.querySelectorAll('.Hoja1_Archivos').length; i++) {
          document.querySelectorAll('.Hoja1_Archivos')[i].value = '';
        }
        $scope.Set_Fecha_Seg();
        setTimeout(function () { $scope.$apply() }, 1000);
        // console.log($scope.Form);
      }

      $scope.H1Limpiar_Campos_Req = function (HOJA) {
        angular.forEach(document.querySelectorAll('.' + HOJA + '_Clase .red-text'), function (i) {
          i.classList.remove('red-text');
        });
      }
      $scope.Validar_CamposVacios = function (HOJA) {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        var Vista_Empty = 0;
        $scope.H1Limpiar_Campos_Req(HOJA);
        if ($scope[HOJA].Seccional_Cod == undefined || $scope[HOJA].Seccional_Cod == null || $scope[HOJA].Seccional_Cod == ''
          && $scope[HOJA].Municipio_Cod == undefined || $scope[HOJA].Municipio_Cod == null || $scope[HOJA].Municipio_Cod == '') {
          Campos_Empty = true;
        }
        if ($scope[HOJA].Afi_Tipo_Doc == undefined || $scope[HOJA].Afi_Tipo_Doc == null || $scope[HOJA].Afi_Tipo_Doc == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Tipo_Doc_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Afi_Tipo_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Afi_Num_Doc == undefined || $scope[HOJA].Afi_Num_Doc == null || $scope[HOJA].Afi_Num_Doc == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Num_Doc_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Afi_Num_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        //
        if ($scope[HOJA].Actualizar_Datos == true && $scope[HOJA].Status == 1) {
          if ($scope[HOJA].Afi_Direccion == undefined || $scope[HOJA].Afi_Direccion == null || $scope[HOJA].Afi_Direccion == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Direccion_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Afi_Direccion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          // if ($scope[HOJA].Afi_Barrio == undefined || $scope[HOJA].Afi_Barrio == null || $scope[HOJA].Afi_Barrio == '') {
          //   Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Barrio_Label').classList.add('red-text');
          //   document.getElementById([HOJA] + '_Afi_Barrio_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          // }
          if (($scope.Form.Afi_Telefono_1.length > 0 && $scope.Form.Afi_Telefono_1.length < 10) && $scope.Form.Afi_Telefono_1.toString().replace(/[^0-9]/g, '').length != 7) {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Telefono_1_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Afi_Telefono_1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope.Form.Afi_Telefono_1.length > 0) {
            var Regex_Tel = new RegExp("^([1-9]{1})([0-9]{6})$");
            if (!Regex_Tel.test($scope.Form.Afi_Telefono_1.replace(/[^0-9]/g, ''))) {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Telefono_1_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Afi_Telefono_1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }
          if ($scope[HOJA].Afi_Celular_1 == undefined || $scope[HOJA].Afi_Celular_1 == null || $scope[HOJA].Afi_Celular_1 == '' ||
            (($scope.Form.Afi_Celular_1.length > 0 && $scope.Form.Afi_Celular_1.length < 16)) && $scope.Form.Afi_Celular_1.toString().replace(/[^0-9]/g, '').length != 10) {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Celular_1_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Afi_Celular_1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope.Form.Afi_Celular_1.length > 0) {
            var Regex_Tel = new RegExp("^([3]{1})([0-3]{1})([0-9]{1})([0-9]{7})$");
            if (!Regex_Tel.test($scope.Form.Afi_Celular_1.replace(/[^0-9]/g, ''))) {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Celular_1_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Afi_Celular_1_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }
          if (($scope.Form.Afi_Celular_2.length > 0 && $scope.Form.Afi_Celular_2.length < 16) && $scope.Form.Afi_Celular_2.toString().replace(/[^0-9]/g, '').length != 10) {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Celular_2_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Afi_Celular_2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope.Form.Afi_Celular_2.length > 0) {
            var Regex_Tel = new RegExp("^([3]{1})([0-3]{1})([0-9]{1})([0-9]{7})$");
            if (!Regex_Tel.test($scope.Form.Afi_Celular_2.replace(/[^0-9]/g, ''))) {
              Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Afi_Celular_2_Label').classList.add('red-text');
              document.getElementById([HOJA] + '_Afi_Celular_2_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
          }
        }


        //
        if ($scope[HOJA].Op_Curso_Vida == undefined || $scope[HOJA].Op_Curso_Vida == null || $scope[HOJA].Op_Curso_Vida == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Curso_Vida_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Op_Curso_Vida_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Afi_Sexo == 'F') {
          if ($scope[HOJA].Op_Gestacion == undefined || $scope[HOJA].Op_Gestacion == null || $scope[HOJA].Op_Gestacion == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Gestacion_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Op_Gestacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
          if ($scope[HOJA].Op_Fecha_Ultima_Men == undefined || $scope[HOJA].Op_Fecha_Ultima_Men == null || $scope[HOJA].Op_Fecha_Ultima_Men == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Fecha_Ultima_Men_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Op_Fecha_Ultima_Men_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
          }
        }
        if ($scope[HOJA].Cod_Cohorte == undefined || $scope[HOJA].Cod_Cohorte == null || $scope[HOJA].Cod_Cohorte == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cod_Cohorte_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cod_Cohorte_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Cod_Diag == undefined || $scope[HOJA].Cod_Diag == null || $scope[HOJA].Cod_Diag == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Cod_Diag_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Cod_Diag_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Op_Necesidad == undefined || $scope[HOJA].Op_Necesidad == null || $scope[HOJA].Op_Necesidad == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Necesidad_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Op_Necesidad_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Op_Seguimiento == undefined || $scope[HOJA].Op_Seguimiento == null || $scope[HOJA].Op_Seguimiento == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Seguimiento_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Op_Seguimiento_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Op_Educaciones == undefined || $scope[HOJA].Op_Educaciones == null || $scope[HOJA].Op_Educaciones == '' || $scope[HOJA].Op_Educaciones > 500) {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Educaciones_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Op_Educaciones_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Op_Observacion == undefined || $scope[HOJA].Op_Observacion == null || $scope[HOJA].Op_Observacion == '' || $scope[HOJA].Op_Observacion > 1000) {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Observacion_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Op_Observacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Op_Fecha_Nuevo_Seg == undefined || $scope[HOJA].Op_Fecha_Nuevo_Seg == null || $scope[HOJA].Op_Fecha_Nuevo_Seg == '') {
          Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Op_Fecha_Nuevo_Seg_Label').classList.add('red-text');
          document.getElementById([HOJA] + '_Op_Fecha_Nuevo_Seg_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        var array = {
          campo: Campos_Empty,
          vista: Vista_Empty
        }

        defered.resolve(array);
        return promise;
      }

      $scope.Seleccionar_Criterio = function (Datos, Tipo) {
        var defered = $q.defer();
        var promise = defered.promise;
        var xArray = [];
        $scope[Datos].forEach(e => {
          xArray.push({
            id: e.CODIGO,
            name: e.TEXTO
          });
        });
        var options = {};
        $.map(xArray,
          function (o) {
            options[o.id] = o.name;
          });
        swal({
          title: 'Seleccione el criterio de ' + ((Tipo == 'X') ? 'Anulación' : 'Aceptación'),
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
        }).then(function (cod) {
          $scope[Datos].forEach(e => {
            if (cod == e.CODIGO) {
              defered.resolve(e.TEXTO);
            }
          });
        }).catch(swal.noop);
        return promise;
      }

      $scope.H1Guardar_Solicitud = function () {
        // console.log($scope.Form);
        var Campos_Empty = false;
        var Validar_Campos = [
          $scope.Validar_CamposVacios('Form')
        ];
        $q.all(Validar_Campos).then(function (resultado) {
          Campos_Empty = resultado[0].campo;
          if (Campos_Empty == false) {

            var Sel_Cri = [
              $scope.Seleccionar_Criterio($scope.Form.Op_Contesta_LLamada == true ? 'Array_Aceptacion' : 'Array_NoContesta', 'A')
            ];
            $q.all(Sel_Cri).then(function (Criterio) {
              if (Criterio != '') {
                swal({
                  title: "¿Está seguro que desea guardar?",
                  text: "¿Acepta registrar la gestión realizada?",
                  type: "question",
                  showCancelButton: true,
                  allowOutsideClick: false
                }).catch(swal.noop)
                  .then((willDelete) => {
                    if (willDelete) {
                      /**/
                      var Cargar_Soporte = [
                        $scope.Cargar_Soporte_FTP('Form')
                      ];
                      $q.all(Cargar_Soporte).then(function (Result_Sop) {
                        var Archivos_Error = false;
                        for (var x = 0; x < Result_Sop.length; x++) {
                          if (Result_Sop[x].substr(0, 3) == '<br' || Result_Sop[x].substr(0, 1) == '0' || (Result_Sop[x] == '' && $scope.Form.Soportes.Soporte1_B64 != '')) {
                            Archivos_Error = true;
                            swal({
                              title: '¡Error al subir un archivo!',
                              text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                              type: 'warning'
                            }).catch(swal.noop);
                          }
                        }
                        /**/
                        if (Archivos_Error == false) {
                          if ($scope.Form.Op_Seguimiento == 1 || $scope.Form.Op_Seguimiento == 2) {
                            var xFecha_Nuevo_Seg = $scope.Form.Op_Fecha_Nuevo_Seg;
                            var Fecha_Nuevo_Seg = xFecha_Nuevo_Seg.getUTCDate() + '-' + (((xFecha_Nuevo_Seg.getMonth() + 1) < 10) ? '0' + (xFecha_Nuevo_Seg.getMonth() + 1) : (xFecha_Nuevo_Seg.getMonth() + 1)) + '-' + xFecha_Nuevo_Seg.getFullYear();
                          } else {
                            var Fecha_Nuevo_Seg = '';
                          }
                          // var xFecha_Registro = $scope.Form.Fecha_Registro;
                          // var Fecha_Registro = xFecha_Registro.getUTCDate() + '-' + (((xFecha_Registro.getMonth() + 1) < 10) ? '0' + (xFecha_Registro.getMonth() + 1) : (xFecha_Registro.getMonth() + 1)) + '-' + xFecha_Registro.getFullYear();
                          var xFecha_Inicio = $scope.Form.Fecha_Inicio;
                          var Fecha_Inicio = xFecha_Inicio.getUTCDate() + '-' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '-' + xFecha_Inicio.getFullYear();
                          var xFecha_Fin = $scope.Form.Fecha_Fin;
                          var Fecha_Fin = xFecha_Fin.getUTCDate() + '-' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '-' + xFecha_Fin.getFullYear();
                          var xFecha_Ultima_Men = $scope.Form.Op_Fecha_Ultima_Men;
                          var Fecha_Ultima_Men = xFecha_Ultima_Men.getUTCDate() + '-' + (((xFecha_Ultima_Men.getMonth() + 1) < 10) ? '0' + (xFecha_Ultima_Men.getMonth() + 1) : (xFecha_Ultima_Men.getMonth() + 1)) + '-' + xFecha_Ultima_Men.getFullYear();
                          // var xTerm_Embarazo = $scope.Form.Op_Term_Embarazo;
                          // var Term_Embarazo = xTerm_Embarazo.getUTCDate() + '-' + (((xTerm_Embarazo.getMonth() + 1) < 10) ? '0' + (xTerm_Embarazo.getMonth() + 1) : (xTerm_Embarazo.getMonth() + 1)) + '-' + xTerm_Embarazo.getFullYear();
                          if ($scope.Form.Cod_Cohorte != 'EM' && $scope.Form.Afi_Sexo != 'F' && $scope.Form.Op_Contesta_LLamada != true) { Fecha_Ultima_Men = ''; }
                          var Datos = {
                            Radicado: $scope.Form.Radicado,
                            Cod_Cohorte: $scope.Form.Cod_Cohorte,
                            Cod_Doc_Cohorte: $scope.Form.Cod_Doc_Cohorte,
                            Cod_Diagno: $scope.Form.Cod_Diag,
                            // Fecha_Registro: Fecha_Registro,
                            Fecha_Inicio: Fecha_Inicio,
                            Fecha_Fin: Fecha_Fin,
                            Tipo_Doc: $scope.Form.Afi_Tipo_Doc,
                            Num_Doc: $scope.Form.Afi_Num_Doc,
                            Estado_Registro: $scope.Form.Estado,
                            Status: '2',
                            Ubicacion: $scope.Form.Municipio_Cod,
                            Direccion: $scope.Form.Afi_Direccion.toString().toUpperCase(),
                            Barrio: $scope.Form.Afi_Barrio.toString().toUpperCase(),
                            Telefono_1: $scope.Form.Afi_Telefono_1.toString().replace(/[^0-9]/g, ''),
                            Celular_1: $scope.Form.Afi_Celular_1.toString().replace(/[^0-9]/g, ''),
                            Celular_2: $scope.Form.Afi_Celular_2.toString().replace(/[^0-9]/g, ''),
                            Fuente: $scope.Form.Op_Fuente,
                            Curso_Vida: $scope.Form.Op_Curso_Vida,
                            Gestacion: $scope.Form.Op_Gestacion,
                            // Term_Embarazo: Term_Embarazo,
                            Fecha_Ultima_Men: Fecha_Ultima_Men,
                            Necesidad: $scope.Form.Op_Necesidad,
                            Seguimiento: $scope.Form.Op_Seguimiento,
                            Observacion: $scope.Form.Op_Observacion,
                            Educaciones: $scope.Form.Op_Educaciones,
                            Fecha_Nuevo_Seg: Fecha_Nuevo_Seg,
                            Autorizacion: $scope.Form.Autorizacion,
                            Motivo: Criterio[0],
                            Ruta: $scope.Form.Soportes.Soporte1_RUTA,
                            Responsable: $scope.Rol_Cedula,
                            Estado_Accion: 'P',
                            Actualizar_Datos: ($scope.Form.Actualizar_Datos) ? 'S' : 'N',
                            Contesta_Llamado: ($scope.Form.Op_Contesta_LLamada) ? 'S' : 'N'
                          };
                          // console.log(JSON.stringify(Datos));
                          // debugger
                          swal({ title: 'Cargando...', allowOutsideClick: false });
                          swal.showLoading();
                          $http({
                            method: 'POST',
                            url: "php/gestionriesgo/seggrupospriorizados.php",
                            data: {
                              function: 'Guardar_Solicitud',
                              xdata: JSON.stringify(Datos)
                            }
                          }).then(function (response) {
                            if (response.data) {
                              if (response.data.Codigo && response.data.Codigo == 0) {
                                swal({
                                  title: response.data.Nombre,
                                  type: "success",
                                }).catch(swal.noop);
                                $scope.Cerrar_Form();
                                setTimeout(() => {
                                  $scope.ObtenerListado();
                                }, 1500);
                              } else {
                                if (response.data.Codigo) {
                                  if (response.data.Codigo == 1) {
                                    swal({
                                      title: "¡Ocurrio un error!",
                                      text: response.data.Nombre,
                                      type: "warning",
                                    }).catch(swal.noop);
                                  } else {
                                    swal({
                                      title: "¡Advertencia!",
                                      text: response.data.Nombre,
                                      type: "info",
                                    }).catch(swal.noop);
                                  }
                                } else {
                                  swal({
                                    title: "¡Ocurrio un error!",
                                    text: response.data,
                                    type: "warning",
                                  }).catch(swal.noop);
                                }
                              }
                            } else {
                              swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "info",
                              }).catch(swal.noop);
                            }
                          });
                        }
                      });
                    }
                  }).catch(swal.noop);
              }
            })
            ///////
          } else {
            Materialize.toast('¡Campos vacios o invalidos!', 3000); $('.toast').addClass('default-background-dark');
          }
        });

      }

      $scope.H1Anular_Solicitud = function () {
        var Campos_Empty = false;
        if ($scope.Form.Op_Observacion == undefined || $scope.Form.Op_Observacion == null || $scope.Form.Op_Observacion == '') {
          Campos_Empty = true; document.querySelector('#Form_Op_Observacion_Label').classList.add('red-text');
          document.getElementById('Form_Op_Observacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (Campos_Empty == false) {
          var Sel_Cri = [
            $scope.Seleccionar_Criterio('Array_Anulacion', 'X')
          ];
          $q.all(Sel_Cri).then(function (Criterio) {
            if (Criterio != '') {
              swal({
                title: "¿Está seguro que desea guardar?",
                text: "¿Acepta anular este registro?",
                type: "question",
                showCancelButton: true,
                allowOutsideClick: false
              }).catch(swal.noop)
                .then((willDelete) => {
                  if (willDelete) {
                    // var xFecha_Registro = $scope.Form.Fecha_Registro;
                    // var Fecha_Registro = xFecha_Registro.getUTCDate() + '-' + (((xFecha_Registro.getMonth() + 1) < 10) ? '0' + (xFecha_Registro.getMonth() + 1) : (xFecha_Registro.getMonth() + 1)) + '-' + xFecha_Registro.getFullYear();
                    var xFecha_Inicio = $scope.Form.Fecha_Inicio;
                    var Fecha_Inicio = xFecha_Inicio.getUTCDate() + '-' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '-' + xFecha_Inicio.getFullYear();
                    var xFecha_Fin = $scope.Form.Fecha_Fin;
                    var Fecha_Fin = xFecha_Fin.getUTCDate() + '-' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '-' + xFecha_Fin.getFullYear();
                    var Datos = {
                      Radicado: $scope.Form.Radicado,
                      Cod_Cohorte: $scope.Form.Cod_Cohorte,
                      Cod_Doc_Cohorte: $scope.Form.Cod_Doc_Cohorte,
                      Cod_Diagno: $scope.Form.Cod_Diag,
                      Ubicacion: $scope.Form.Municipio_Cod,
                      // Fecha_Registro: Fecha_Registro,
                      Fecha_Inicio: Fecha_Inicio,
                      Fecha_Fin: Fecha_Fin,
                      Tipo_Doc: $scope.Form.Afi_Tipo_Doc,
                      Num_Doc: $scope.Form.Afi_Num_Doc,
                      Estado_Registro: $scope.Form.Estado,
                      Status: '3',
                      Motivo: Criterio[0],
                      Responsable: $scope.Rol_Cedula,
                      Observacion: $scope.Form.Op_Observacion,
                      Estado_Accion: 'X',
                      Fuente: $scope.Form.Op_Fuente,
                      Contesta_Llamado: ($scope.Form.Op_Contesta_LLamada) ? 'S' : 'N'
                    };
                    // console.log(JSON.stringify(Datos));
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                      method: 'POST',
                      url: "php/gestionriesgo/seggrupospriorizados.php",
                      data: {
                        function: 'Guardar_Solicitud',
                        xdata: JSON.stringify(Datos)
                      }
                    }).then(function (response) {
                      if (response.data) {
                        if (response.data.Codigo && response.data.Codigo == 0) {
                          swal({
                            title: response.data.Nombre,
                            type: "success",
                          }).catch(swal.noop);
                          $scope.Cerrar_Form();
                          setTimeout(() => {
                            $scope.ObtenerListado();
                          }, 1500);
                        } else {
                          if (response.data.Codigo) {
                            swal({
                              title: "¡Ocurrio un error!",
                              text: response.data.Nombre,
                              type: "warning",
                            }).catch(swal.noop);
                          } else {
                            swal({
                              title: "¡Ocurrio un error!",
                              text: response.data,
                              type: "warning",
                            }).catch(swal.noop);
                          }
                        }
                      } else {
                        swal({
                          title: "¡Ocurrio un error!",
                          text: response.data,
                          type: "info",
                        }).catch(swal.noop);
                      }
                    });

                  }
                }).catch(swal.noop);
            }
          });
        } else {
          Materialize.toast('¡Campos vacios o invalidos!', 3000); $('.toast').addClass('default-background-dark');
        }
      }

      $scope.Consultar_Afiliado = function (Accion) {
        //A Abrir Modal - //G Gestionar
        if (Accion == 'A') {
          angular.forEach(document.querySelectorAll('#Modal_ConsultarAfiliado .red-text'), function (i) {
            i.classList.remove('red-text');
          });
          angular.forEach(document.querySelectorAll('.Form_Consulta input'), function (i) {
            // i.removeAttribute("readonly");
            i.setAttribute("readonly", true);
            // i.classList.add("class_gris");
          });
          angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
            i.setAttribute("disabled", true);
          });
          // $scope.Modal_Consulta_Tipo = "";
          // $scope.Modal_Consulta_Numero = "";
          // $scope.Modal_Consulta_Fuente = "";
          $scope.Modal_Consulta_Tipo = "";
          $scope.Modal_Consulta_Numero = "";
          $scope.Modal_Consulta_Nombre = "";
          $scope.Modal_Consulta_Fuente = "";
          $scope.Modal_Consulta_Cod_Cohorte = "";
          $scope.Modal_Consulta_Diagnostico = "";
          $scope.Modal_Consulta_Diagnostico_Cod = "";
          $scope.Modal_Consulta_Diagnostico_Nom = "";
          $scope.Busqueda.Diagnostico.SAVE = "";
          $('#Modal_ConsultarAfiliado').modal('open');
          document.getElementById("Modal_Consulta_Numero").focus();
        }
        if (Accion == 'G') {
          var Campos_Empty = false;
          if ($scope.Modal_Consulta_Tipo == undefined || $scope.Modal_Consulta_Tipo == null || $scope.Modal_Consulta_Tipo == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Tipo_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Nombre == undefined || $scope.Modal_Consulta_Nombre == null || $scope.Modal_Consulta_Nombre == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Nombre_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Numero == undefined || $scope.Modal_Consulta_Numero == null || $scope.Modal_Consulta_Numero == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Fuente == undefined || $scope.Modal_Consulta_Fuente == null || $scope.Modal_Consulta_Fuente == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Fuente_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Cod_Cohorte == undefined || $scope.Modal_Consulta_Cod_Cohorte == null || $scope.Modal_Consulta_Cod_Cohorte == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Cohorte_Label').classList.add('red-text');
          }
          if ($scope.Modal_Consulta_Diagnostico_Cod == undefined || $scope.Modal_Consulta_Diagnostico_Cod == null || $scope.Modal_Consulta_Diagnostico_Cod == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Diag_Label').classList.add('red-text');
          }

          if (Campos_Empty == false) {
            var datos = {
              "TIPO_DOC_AFI": $scope.Modal_Consulta_Tipo,
              "DOC_AFI": $scope.Modal_Consulta_Numero,
              "FUENTE": $scope.Modal_Consulta_Fuente,
              "COD_COHORTE": $scope.Modal_Consulta_Cod_Cohorte,
              "COD_DIAG": $scope.Modal_Consulta_Diagnostico_Cod,
              "NOM_DIAG": $scope.Modal_Consulta_Diagnostico_Nom,
              "NUM_RADICADO": "",
              "STATUS": "1"
            };
            $scope.Otra_Fuente_Datos = datos;
            $scope.Buscar_OtraFuente_Registro(datos);
            $scope.closeModal();

          } else {
            Materialize.toast('¡Campos vacios o invalidos!', 3000); $('.toast').addClass('default-background-dark');
          }
        }

      }

      $scope.KeyFind_Afiliado = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.Buscar_Afiliado();
      }

      $scope.Buscar_Afiliado = function () {
        // $scope.Modal_Consulta_Tipo = "CC";
        // $scope.Modal_Consulta_Numero = 21232191;
        // $scope.Modal_Consulta_Nombre = "";
        angular.forEach(document.querySelectorAll('#Modal_ConsultarAfiliado .red-text'), function (i) {
          i.classList.remove('red-text');
        });

        var Campos_Empty = false;
        if ($scope.Modal_Consulta_Tipo == undefined || $scope.Modal_Consulta_Tipo == null || $scope.Modal_Consulta_Tipo == '') {
          Campos_Empty = true; document.querySelector('#Modal_Consulta_Tipo_Label').classList.add('red-text');
        }
        if ($scope.Modal_Consulta_Numero == undefined || $scope.Modal_Consulta_Numero == null || $scope.Modal_Consulta_Numero == '') {
          Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Label').classList.add('red-text');
        }
        if (Campos_Empty == false) {
          $http({
            method: 'POST',
            url: "php/gestionriesgo/seggrupospriorizados.php",
            data: {
              function: 'Buscar_Afiliado',
              Tipo_Doc: $scope.Modal_Consulta_Tipo,
              Num_Doc: $scope.Modal_Consulta_Numero
            }
          }).then(function (response) {
            if (response.data) {
              if (response.data[0]) {
                $scope.Modal_Consulta_Nombre = response.data[0].NOMBRE;
              } else {
                swal({
                  title: "¡Ocurrio un error!",
                  text: response.data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "info",
              }).catch(swal.noop);
            }
          });
        }

      }

      $scope.Buscar_OtraFuente_Registro = function () {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'Activar_Registro',
            Tipo_Doc: $scope.Modal_Consulta_Tipo,
            Num_Doc: $scope.Modal_Consulta_Numero,
            Fuente: $scope.Modal_Consulta_Fuente,
            Cod_Coh: $scope.Modal_Consulta_Cod_Cohorte,
            Diag: $scope.Modal_Consulta_Diagnostico_Cod,
            Gestion: '',
            Rad: '',
            Ced: $scope.Rol_Cedula
          }
        }).then(function (response) {
          // console.log(response.data);
          if (response.data.Codigo) {
            if (response.data.Codigo == 0) {
              var datos = {
                "TIPO_DOC_AFI": $scope.Modal_Consulta_Tipo,
                "DOC_AFI": $scope.Modal_Consulta_Numero,
                "FUENTE": $scope.Modal_Consulta_Fuente,
                "COD_COHORTE": $scope.Modal_Consulta_Cod_Cohorte,
                "COD_DIAG": $scope.Modal_Consulta_Diagnostico_Cod,
                "NOM_DIAG": $scope.Modal_Consulta_Diagnostico_Nom,
                "NUM_RADICADO": "",
                "STATUS": "1"
              };
              $scope.Otra_Fuente_Datos = datos;
              $scope.Mostar_Formulario(datos);
            }
            if (response.data.Codigo == 2) {

              swal({
                title: "¡Advertencia!",
                text: response.data.Nombre,
                type: "info",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                allowOutsideClick: false

              }).then(function (result) {
                if (result) {
                  $scope.Activar_Registro(response.data.Radicado);
                }
              }).catch(swal.noop);
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        })
      }

      $scope.Activar_Registro = function (RAD) {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'Activar_Registro',
            Tipo_Doc: $scope.Modal_Consulta_Tipo,
            Num_Doc: $scope.Modal_Consulta_Numero,
            Fuente: $scope.Modal_Consulta_Fuente,
            Cod_Coh: $scope.Modal_Consulta_Cod_Cohorte,
            Gestion: 'S',
            Rad: RAD,
            Ced: $scope.Rol_Cedula
          }
        }).then(function (response) {
          // console.log(response.data);
          if (response.data.Codigo) {
            if (response.data.Codigo == 0) {
              var datos = {
                "TIPO_DOC_AFI": $scope.Modal_Consulta_Tipo,
                "DOC_AFI": $scope.Modal_Consulta_Numero,
                "FUENTE": $scope.Modal_Consulta_Fuente,
                "COD_COHORTE": $scope.Modal_Consulta_Cod_Cohorte,
                "COD_DIAG": $scope.Modal_Consulta_Diagnostico_Cod,
                "NOM_DIAG": $scope.Modal_Consulta_Diagnostico_Nom,
                "NUM_RADICADO": RAD,
                "STATUS": "1"
              };
              $scope.Otra_Fuente_Datos = datos;
              $scope.Mostar_Formulario(datos);
            }
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning",
            }).catch(swal.noop);
          }
        })
      }

      $scope.Cerrar_Form = function () {
        document.getElementById('inicio').scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(() => {
          $scope.Vista.Form = false;
          $scope.$apply();
        }, 500);
      }

      $scope.Abrir_Modal_Detalle = function (Rad) {
        // console.log($scope.Form.Radicado);
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'Mostrar_Detalle',
            Rad: Rad
          }
        }).then(function (response) {
          if (response.data) {
            $('#Modal_Detalle').modal('open');
            $scope.Detalle = response.data[0];
          }

        })


      }

      //CONSULTA DIAGNOSTICO
      $scope.KeyFind_ObDiag = function (keyEvent) {
        if ($scope.Busqueda.Diagnostico.Filtro != null && $scope.Busqueda.Diagnostico.Filtro.length != 0) {
          if (keyEvent.which === 40) {
              $scope.Busqueda.Diagnostico.Seleccion = $scope.Busqueda.Diagnostico.Seleccion >= ($scope.Busqueda.Diagnostico.Filtro.length - 1) ? 0 : $scope.Busqueda.Diagnostico.Seleccion + 1;
              document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Busqueda.Diagnostico.Seleccion).offsetTop);
          } else if (keyEvent.which === 38) {
              $scope.Busqueda.Diagnostico.Seleccion = $scope.Busqueda.Diagnostico.Seleccion <= 0 || $scope.Busqueda.Diagnostico.Seleccion == 9999 ? $scope.Busqueda.Diagnostico.Filtro.length - 1 : $scope.Busqueda.Diagnostico.Seleccion - 1;
              document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Busqueda.Diagnostico.Seleccion).offsetTop)
          } else if (keyEvent.which === 13 && $scope.Busqueda.Diagnostico.Seleccion != 9999) {
              var x = $scope.Busqueda.Diagnostico.Filtro[$scope.Busqueda.Diagnostico.Seleccion];
              $scope.FillTextbox_Listado_Diag(x.DIAGNOSTICO, x.DESCRIPCION, x.COD_COHORTE);
          }
      } else {
          if (keyEvent.which === 13)
          $scope.Buscar_Diag();
      }
      }
      $scope.Buscar_Diag = function () {
        if ($scope.Modal_Consulta_Diagnostico.length > 2) {
          $http({
            method: 'POST',
            url: "php/gestionriesgo/seggrupospriorizados.php",
            data: {
              function: 'Obtener_Diagnostico',
              Conc: $scope.Modal_Consulta_Diagnostico.toUpperCase()
            }
          }).then(function (response) {
            if (response.data[0] != undefined && response.data.length > 1) {
              $scope.Busqueda.Diagnostico.Filtro = response.data;
              $scope.Busqueda.Diagnostico.Listado = response.data;
              $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
            }
            if (response.data.length == 1) {
              if (response.data[0].DIAGNOSTICO == '-1') {
                swal({
                  title: "¡Mensaje!",
                  text: response.data[0].Nombre,
                  type: "info",
                }).catch(swal.noop);
                $scope.Busqueda.Diagnostico.Filtro = null;
                $scope.Busqueda.Diagnostico.Listado = null;
              } else {
                $scope.FillTextbox_Listado_Diag(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION, response.data[0].COD_COHORTE);
              }
            } else if (response.data.length == 0) {
              swal({
                title: "¡Importante!",
                text: "No se encontro el diagnostico",
                type: "info",
              }).catch(swal.noop);
            }
          })
        } else {
          Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
      }
      $scope.Complete_Listado_Diag = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
          if ($scope.Modal_Consulta_Diagnostico != undefined && string != undefined && $scope.Busqueda.Diagnostico.Listado != undefined) {
            $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Diagnostico.Listado, function (x) {
              if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DIAGNOSTICO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                output.push({ "DIAGNOSTICO": x.DIAGNOSTICO, "DESCRIPCION": x.DESCRIPCION.toUpperCase(), "COD_COHORTE": x.COD_COHORTE.toUpperCase(), "NOM_COHORTE": x.NOM_COHORTE.toUpperCase() });
              }
            });
            $scope.Busqueda.Diagnostico.Filtro = output;
            $scope.Busqueda.Diagnostico.Seleccion = 9999;
          }
        }
      }
      $scope.FillTextbox_Listado_Diag = function (codigo, nombre, cohorte) {
        // Form.Cod_Cohorte
        // $scope.Form.Cod_Diag = codigo;
        $scope.Modal_Consulta_Cod_Cohorte = cohorte;
        $scope.Modal_Consulta_Diagnostico_Cod = codigo;
        $scope.Modal_Consulta_Diagnostico_Nom = nombre;
        $scope.Modal_Consulta_Diagnostico = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.Filtro = null;
        $scope.Busqueda.Diagnostico.Cohorte = cohorte;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.Blur_Diag = function () {
        setTimeout(() => {
          if ($scope.Modal_Consulta_Diagnostico != null && $scope.Modal_Consulta_Diagnostico != undefined) {
            if ($scope.Modal_Consulta_Diagnostico != $scope.Busqueda.Diagnostico.SAVE && $scope.Busqueda.Diagnostico.SAVE != null) {
              $scope.Modal_Consulta_Diagnostico = $scope.Busqueda.Diagnostico.SAVE;
              $scope.Busqueda.Diagnostico.Filtro = null;
            }
            $scope.Busqueda.Diagnostico.Filtro = null;
          }
          $scope.$apply();
        }, 300);
      }

      $scope.Chg_Cohorte = function () {
        if ($scope.Busqueda.Diagnostico.Cohorte != $scope.Modal_Consulta_Cod_Cohorte) {
          $scope.Modal_Consulta_Diagnostico = "";
          $scope.Modal_Consulta_Diagnostico_Cod = "";
          $scope.Modal_Consulta_Diagnostico_Nom = "";
          $scope.Busqueda.Diagnostico.SAVE = "";
        }
      }

      $scope.Set_Educacion = function () {
        if ($scope.Form.Cod_Cohorte == 'EM') {
          $scope.Form.Op_Educaciones = "Importancias del control prenatal, manejo de dieta, signos de alarma, cuidados del recién nacido. Medidas preventivas COVID.";
        }
        if ($scope.Form.Cod_Cohorte == 'DM') {
          $scope.Form.Op_Educaciones = "Estilos de vida saludable, dieta, ejercicio adherencia al tratamiento. Signos de alarma. Medidas preventivas COVID.";
        }
        if ($scope.Form.Cod_Cohorte == 'V1') {
          $scope.Form.Op_Educaciones = "Estilos de vida saludable, denunciar ante cualquier agresión, manejo de las emociones, pautas de autocuidado.";
        }
        if ($scope.Form.Cod_Cohorte == 'DI') {
          $scope.Form.Op_Educaciones = "Estilos de vida saludable, pautas de autocuidado, adherencia al tratamiento, importancia de la rehabilitación.";
        }
        if ($scope.Form.Cod_Cohorte == 'SM') {
          $scope.Form.Op_Educaciones = "Estilos de vida saludable manejo de las emociones, pautas de autocuidado, signos y síntomas de alerta.";
        }
        if ($scope.Form.Cod_Cohorte == 'J9') {
          $scope.Form.Op_Educaciones = "Signos y síntomas de alarma, estilos de vida saludable, efectos.";
        }
        if ($scope.Form.Cod_Cohorte == 'HA') {
          $scope.Form.Op_Educaciones = "Estilos de vida saludable, dieta, ejercicio adherencia al tratamiento. Signos de alarma. Medidas preventivas COVID.";
        }
        if ($scope.Form.Cod_Cohorte == 'D1') {
          $scope.Form.Op_Educaciones = "TRASTORNOS NUTRICIONALES POR DEFICIENCIAS DE VITAMINAS.";
        }
      }

      $scope.Editar_Educacion = function () {
        if ($scope.Edit_Educacion == false) {
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
            i.removeAttribute("disabled");
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
            i.classList.remove("class_gris");
          });
          $scope.Edit_Educacion = true;
        } else {
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
            i.setAttribute("disabled", true);
          });
          angular.forEach(document.querySelectorAll('.Form_Campos_Desactivados textarea'), function (i) {
            i.classList.add("class_gris");
          });
          $scope.Edit_Educacion = false;
        }
      }

      $scope.Set_Fecha_Seg = function () {
        if ($scope.Form.Status == '1') {
          if ($scope.Form.Op_Seguimiento == 1 || $scope.Form.Op_Seguimiento == 2) {
            $http({
              method: 'POST',
              url: "php/gestionriesgo/seggrupospriorizados.php",
              data: {
                function: 'ObtenerFechaSeg'
              }
            }).then(function (response) {
              var x = response.data.split('/');
              $scope.Form.Op_Fecha_Nuevo_Seg = new Date(x[2] + '/' + x[1] + '/' + x[0]);
            })
            angular.forEach(document.querySelectorAll('.Form_Seg input'), function (i) {
              i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.Form_Seg input'), function (i) {
              i.classList.add("class_gris");
            });
          } else {
            $scope.Form.Op_Fecha_Nuevo_Seg = $scope.SysDay;
            angular.forEach(document.querySelectorAll('.Form_Seg input'), function (i) {
              i.removeAttribute("readonly");
            });
            angular.forEach(document.querySelectorAll('.Form_Seg input'), function (i) {
              i.classList.remove("class_gris");
            });
          }

        }

      }

      $scope.Set_No_Contesta = function () {
        if ($scope.Form.Op_Contesta_LLamada == false) {
          $scope.Form.Op_Necesidad = 7;
          $scope.Form.Op_Seguimiento = 9;
          if ($scope.Form.Afi_Sexo == 'F') {
            $scope.Form.Op_Gestacion = 'N';
          }
        }
      }
      //////////////////FUNCIONES///////////////


      $scope.Find_Fuente = function (F) {
        if (F == 'A') {
          return 'Autorizaciones'
        }
        if (F == 'R') {
          return 'Rips'
        }
        if (F == 'C') {
          return 'Censo Hospitalario'
        }
        if (F == 'V') {
          return 'SIVIGILA'
        }
        if (F == 'L') {
          return 'Línea de Salud Mental'
        }
        if (F == 'E') {
          return 'Ente Territorial'
        }
        if (F == 'S') {
          return 'SIAU'
        }
        if (F == 'O') {
          return 'OTRA FUENTE'
        }
        if (F == 'N') {
          return 'CONSUSALUD'
        }
      }

      $scope.Cargar_Soporte_FTP = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        if ($scope.Form.Soportes.Soporte1_B64 != '') {
          $http({
            method: 'POST',
            url: "php/gestionriesgo/seggrupospriorizados.php",
            data: {
              function: 'Upload',
              base: $scope.Form.Soportes.Soporte1_B64,
              name: $scope.Form.Afi_Tipo_Doc + '_' + $scope.Form.Afi_Num_Doc
            }
          }).then(function (response) {
            $scope.Form.Soportes.Soporte1_RUTA = response.data;
            defered.resolve(response.data);
          });
        } else {
          defered.resolve('xxx');
        }
        return promise;
      }
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.loadFile = function (SOPORTE, SCOPE, B64, NID, NIDT) {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#' + NID);
        if (ValidarExistente != true) {
          if (fileInput.files.length != 0) {
            var x = fileInput.files[0].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'PDF') {
              if (fileInput.files.length > 0) {
                if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
                  $scope.getBase64(fileInput.files[0]).then(function (result) {
                    $http({
                      method: 'POST',
                      url: "php/gestionriesgo/seggrupospriorizados.php",
                      data: {
                        function: 'Base64',
                        Base64: result,
                        name: NID
                      }
                    }).then(function (response) {
                      $scope.Form[SOPORTE][SCOPE] = response.data + "?page=hsn#toolbar=0";
                      if (SCOPE == 'Soporte1_URL') {
                        setTimeout(function () {
                          document.querySelector('#Iframe_Sop1').style.width = (document.querySelector('#AdjustSop').offsetWidth - 6) + 'px';
                          $scope.$apply();
                        }, 200);
                        if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-opcional") == true) {
                          document.querySelector(".input-file-radiu").classList.remove("input-file-radius-opcional");
                          document.querySelector(".input-file-radiu").classList.add("input-file-radius-cargado");
                        }
                      } else {
                        setTimeout(function () {
                          angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                            i.style.width = (document.querySelector('#AdjustSop2').offsetWidth - 6) + 'px';
                          });
                          $scope.$apply();
                        }, 200);
                      }
                    });
                    $scope.Form[SOPORTE][B64] = result;
                    setTimeout(function () { $scope.$apply(); }, 300);
                  });
                } else {
                  swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                  fileInput.value = '';
                  document.querySelector('#' + NIDT).value = '';
                  $scope.Form[SOPORTE][SCOPE] = '';
                  $scope.Form[SOPORTE][B64] = '';
                  if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                    document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                    document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
                  }
                  setTimeout(function () { $scope.$apply(); }, 300);
                }
              }
            } else {
              swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
              fileInput.value = '';
              document.querySelector('#' + NIDT).value = '';
              $scope.Form[SOPORTE][SCOPE] = '';
              $scope.Form[SOPORTE][B64] = '';
              if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
              }
              setTimeout(function () { $scope.$apply(); }, 300);
            }
          } else {
            $scope.Form[SOPORTE][SCOPE] = '';
            $scope.Form[SOPORTE][B64] = '';
            if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
              document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
              document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
            }
            setTimeout(function () { $scope.$apply(); }, 300);
          }
        } else {
          swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }

        // console.log($scope.Form[SOPORTE][SCOPE]);
        // if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-opcional") == true) {
        //   document.querySelector(".input-file-radiu").classList.remove("input-file-radius-opcional");
        //   document.querySelector(".input-file-radiu").classList.add("input-file-radius-cargado");
        // } else {
        //   document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
        //   document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
        // }
        // console.log(NID);
      }
      $scope.openInNewTab = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
      }


      $scope.Abrir_Modal_Direccion = function () {
        if ($scope.Form.Status == '1') {
          $('#Modal_Direccion').modal('open');
          document.querySelector('#Dir_Actual').setAttribute("readonly", true);
          $scope.Dir_Actual = $scope.Form.Afi_Direccion;
          $scope.selectViap = "";
          $scope.numeroN = "";
          $scope.selectLetra = "";
          $scope.numeroNVG = "";
          $scope.selectLetraVG = "";
          $("#direccionmodal").val('');
          setTimeout(() => {
            $scope.$apply();
          }, 500);
        }
      }
      $scope.changebis = function () {
        if ($scope.bis == true) {
          $scope.bistext = "BIS";
        } else {
          $scope.bistext = "";
        }
      }
      $scope.Chg_Direccion = function () {
        $("#direccionmodal").val($scope.selectViap + ' ' + $scope.numeroN + ' ' + $scope.selectLetra + ' ' + $scope.numeroNVG + ' ' + $scope.selectLetraVG);
      }
      $scope.Cargar_Dir = function () {
        $scope.Form.Afi_Direccion = $("#direccionmodal").val().trim();
        $scope.closeModal();
      }

      $scope.Abrir_Modal_Soportes = function () {
        $scope.DescargarArchivo($scope.Form.Ruta);
        (function () {
          $('#Modal_Soportes').modal();
        }());
        $('#Modal_Soportes').modal('open');
        setTimeout(function () {
          document.querySelector('#Modal_Soportes').style.top = 2 + '%';
          $scope.$apply();
          // console($scope.Form.Url);
        }, 500);
      }
      ///////////////////////////////////////////////////////////////////////////////

      $scope.Fuente_Color_Form = function (Fuente) {
        if (Fuente == 'A') { return '#00acc1' }
        if (Fuente == 'R') { return '#fb8c00' }
        if (Fuente == 'C') { return '#d81b60' }
        if (Fuente == 'N') { return '#25D962' }
        if (Fuente != 'A' && Fuente != 'R' && Fuente != 'C' && Fuente != 'N') { return '#6A6D71' }
      }

      $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A' || Estado.toString() == '1') {
          return "Con_pulse_A"
        }
        if (Estado.toString().toUpperCase() == 'P' || Estado.toString() == '2') {
          return "Con_pulse_P"
        }
        if (Estado.toString().toUpperCase() == 'X' || Estado.toString() == '3') {
          return "Con_pulse_X"
        }
      }

      $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A' || Estado.toString() == '1') {
          return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'P' || Estado.toString() == '2') {
          return { "background-color": "rgb(71, 71, 165)!important" }
        }
        if (Estado.toString().toUpperCase() == 'X' || Estado.toString() == '3') {
          return { "background-color": "rgb(245, 75,75) !important" }
        }
      }

      $scope.Estado_Solicitud_Tooltip = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A' || Estado.toString() == '1') {
          return "Pendiente"
        }
        if (Estado.toString().toUpperCase() == 'P' || Estado.toString() == '2') {
          return "Gestionado"
        }
        if (Estado.toString().toUpperCase() == 'X' || Estado.toString() == '3') {
          return "Anulado"
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
      $scope.FormatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|°"#$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor;
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, '');
        input.value = valor;
      }

      $scope.FormatSoloNumeroCelular = function (NID) {
        const input_2 = document.getElementById('' + NID + '');
        const valor = input_2.value.replace(/[^0-9]/g, '');
        input_2.value = valor;

        const target = input_2;
        const input = input_2.value.replace(/\D/g, '').substring(0, 10);
        const zip = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
        else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
        else if (input.length > 0) { target.value = `(${zip}`; }
      }

      $scope.FormatSoloNumeroTelefono = function (NID) {
        const input_2 = document.getElementById('' + NID + '');
        const valor = input_2.value.replace(/[^0-9]/g, '');
        input_2.value = valor;

        const target = input_2;
        const input = input_2.value.replace(/\D/g, '').substring(0, 10);
        const zip = input.substring(0, 3);
        const last = input.substring(3, 7);

        if (input.length > 3) { target.value = `${zip} - ${last}`; }
        else if (input.length > 0) { target.value = `${zip}`; }
      }

      $scope.Obtener_ClaseDias = function (x) {
        if (x == 5) {
          return 'AMARILLO'
        }
        if (x > 5) {
          return 'VERDE'
        }
        return 'ROJO'
      }

      $scope.DescargarArchivo = function (ruta) {
        $http({
          method: 'POST',
          url: "php/gestionriesgo/seggrupospriorizados.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          $scope.Form.Url = "temp/" + response.data;
        });
      }

      $scope.chg_filtrar = function () {
        $scope.filter($scope.Vista2.Filtrar_Sol);
      }
      $scope.initPaginacion = function (info) {
        $scope.Lista_Tabla_Temp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }

      $scope.filter = function (val) {
        val = ($scope.filter_save == val) ? '' : val;
        if (val == 'Otra') {
          if ($scope.filter_save != val) {
            $scope.Lista_Tabla_Temp = $scope.Lista_Tabla.filter(function (e) {
              return e.FUENTE == 'V' ||
                e.FUENTE == 'L' ||
                e.FUENTE == 'E' ||
                e.FUENTE == 'S' ||
                e.FUENTE == 'O';
            });
          } else {
            $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, '');
          }
        } else {
          $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, ($scope.filter_save == val) ? '' : val);
        }
        if ($scope.Lista_Tabla_Temp.length > 0) {
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
          if (Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
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
        // console.log($scope.Lista_Tabla.length / $scope.pageSize - 1)
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
          if ($scope.Lista_Tabla_Temp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize) + 1;
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

      //////////////////////////////////////////////////////
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
function Con() {
  const input = document.querySelectorAll('#log')[5];
  var valor = input.value;
  valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
  // console.log(document.querySelectorAll('#log')[5].value);
}