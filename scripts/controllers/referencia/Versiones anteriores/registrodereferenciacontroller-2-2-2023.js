'use strict';
angular.module('GenesisApp')
  .controller('registrodereferenciacontroller', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      // ******* FUNCTION DE INICIO *******
      $scope.Inicio = function () {
        document.querySelector("#content").style.backgroundColor = "white";
        $scope.responsable = sessionStorage.getItem('cedula');
        setTimeout(() => {
          $scope.Tabs = 5;
        }, 500);
        $scope.SysDay = new Date();
       // Inicio Codigo para contraler acceso en una fecha especifica
        $scope.fechainicialInaguracion = '31/01/2023';
        $scope.fechainicialdeApertura = $scope.formatDatefecha($scope.SysDay);
        if($scope.responsable == '1045679099'){
          $scope.inaguracion = true;
        }if($scope.fechainicialdeApertura == $scope.fechainicialInaguracion){
          swal({
            title: "Notificación",
            text: 'El modulo sera habilitado a las 12:01 a.m',
            type: "warning"
          }).catch(swal.noop);
        }else{
          $scope.inaguracion = true;
        }
        //Fin Codigo para contraler acceso en una fecha especifica
        $scope.Tabsmotivos = 1;
        $('.modal').modal();
        $scope.userAbrir = false;
        $scope.motivosAbrir = false;
        $scope.listarlistaResumen();
        $scope.ObtenerRoluser();
        $scope.limpiar('1');
        $scope.limpiar('2');
        $scope.limpiar('3');
        $scope.limpiar('4');
        $scope.limpiar('6');
        $scope.listrefrencias = [];
        $(".modal").modal();
        //TABLA
        $scope.Filtrar_Sol = 10;
        $scope.Vista1 = {
          Mostrar_Sol: 10
        };
        $scope.list_DatosTemp = [];
        //TABLA
        // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
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
      }
      $scope.limpiar = function (Tabs) {
        // console.log(Tabs);
        switch (Tabs) {
          case '1':
            $scope.form1 = {
              numeroDocumento: '',
              nombreFuncionario: '',
              nombrefunCreado: '',
              editarnumeroDocumento: '',
              editartipoUser: '',
              tipoUser: ''
            }
            $scope.modal2 = {
              nombreMotivo: '',
              pconcepto: '',
              pmotivo: '',
              estadoVisible: '',
              conceptoMotivo: '',
              motivoCentral: '',
              pestado: ''
            }
            break;
          case '2':
            $scope.form2 = {
              selecctipoDocumento: '',
              tipoSolicitud: '',
              seleccnumeroDocumento: '',
              tipoDocumento: '',
              numeroDocumento: '',
              nombrePaciente: '',
              generoPaciente: '',
              edad: '',
              edadPaciente: '',
              nivelSisben: '',
              regimenPaciente: '',
              seccionalPaciente: '',
              sexo: '',
              codigoseccional: '',
              diagnosticoPrincipal: '',
              diagnosticoSegundario: '',
              codigodiagnosticoPrincipal: '',
              codigodiagnosticoSegundario: '',
              nombreIps: '',
              nitIps: '',
              motivoRemision: '',
              SeccionalIps: '',
              UbicacionIps: '',
              nombreSolicitante: '',
              telefonoSolicitante: '',
              servicio1: '',
              servicio2: '',
              servicio3: '',
              cargoSolicitante: '',
              canalOrigen: '',
              codigoEspecialidad1: '',
              codigoEspecialidad2: '',
              codigoEspecialidad3: '',
              nombreGestor: ''
            }
            break;
          case '3':
            $scope.form3 = {
              nombreipsRecep: '',
              aceptacionPaciente: '',
              fechaAceptacion: '',
              horaAceptacion: '',
              profesional: '',
              atendidoPor: '',
              cargo: '',
              motivoRechazo: '',
              motivoCancelacion: '',
              tipoTraslado: '',
              telefono: '',
              numeroDocumento: '',
              porconsultar: '',
              extencion: '',
              observaciones: ''
            }
            $scope.modal1 = {
              numeroReferencia: '',
              numeroDocumento: '',
              nombreFuncionario: '',
              observaciones: ''
            }
            $scope.modal3 = {
              nombreipsRecep: '',
              aceptacionPaciente: '',
              fechaAceptacion: '',
              horaAceptacion: '',
              profesional: '',
              atendidoPor: '',
              cargo: '',
              motivoRechazo: '',
              tipoTraslado: '',
              telefono: '',
              numeroDocumento: '',
              porconsultar: '',
              extencion: '',
              observaciones: ''
            }
            $scope.listipsReceptora = [];
            $scope.listIps = [];
            $scope.modal4 = {
              nombreipsRecep: '',
              aceptacionPaciente: '',
              fechaAceptacion: '',
              horaAceptacion: '',
              profesional: '',
              atendidoPor: '',
              cargo: '',
              motivoRechazo: '',
              tipoTraslado: '',
              telefono: '',
              numeroDocumento: '',
              porconsultar: '',
              extencion: '',
              observaciones: ''
            }
            $scope.modal5 = {
              nombreipsRecep: '',
              aceptacionPaciente: '',
              fechaAceptacion: '',
              horaAceptacion: '',
              profesional: '',
              atendidoPor: '',
              cargo: '',
              motivoRechazo: '',
              tipoTraslado: '',
              telefono: '',
              numeroDocumento: '',
              porconsultar: '',
              extencion: '',
              observaciones: ''
            }
            break;
          case '4':
            $scope.form5 = {
              fechainicioReporte: '',
              fechafinalReporte: '',
              horainicioReporte: '',
              horafinalReporte: '',
              tipodeReporte: ''
            }
            break;
          case '6':
            $scope.form4 = {
              selecctipoDocumento: '',
              tipoSolicitud: '',
              seleccnumeroDocumento: '',
              tipoDocumento: '',
              numeroDocumento: '',
              nombrePaciente: '',
              generoPaciente: '',
              edad: '',
              edadPaciente: '',
              nivelSisben: '',
              regimenPaciente: '',
              seccionalPaciente: '',
              sexo: '',
              codigoseccional: '',
              diagnosticoPrincipal: '',
              diagnosticoSegundario: '',
              codigodiagnosticoPrincipal: '',
              codigodiagnosticoSegundario: '',
              nombreIps: '',
              nitIps: '',
              motivoRemision: '',
              SeccionalIps: '',
              UbicacionIps: '',
              nombreSolicitante: '',
              telefonoSolicitante: '',
              servicio1: '',
              servicio2: '',
              servicio3: '',
              cargoSolicitante: '',
              canalOrigen: '',
              codigoEspecialidad1: '',
              codigoEspecialidad2: '',
              codigoEspecialidad3: '',
              nombreGestor: ''
            }
            break;
          default:
        }
      }
      $scope.Estado_Solicitud_Color = function (Estado) {
        if (!Estado) return;
        if (Estado.toString().toUpperCase() == 'RED') {
          return { "background-color": "rgb(255,0,0) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'YELLOW') {
          return { "background-color": "rgb(255, 255, 0) !important;" }
        }
        if (Estado.toString().toUpperCase() == 'GREEN') {
          return { "background-color": "rgb(0,255,0)!important" }
        }
        if (Estado.toString().toUpperCase() == 'PURPLE') {
          return { "background-color": "rgb(71, 71, 165)!important" }
        }
      }
      $scope.Estado_Solicitud_Clase = function (Estado) {
        // estado con menos de 4 horas
        if (!Estado) return;
        if (Estado.toString().toUpperCase() == 'RED') {
          return "Con_pulse_X"
        }
        // estado con entre 4 y 8 horas
        if (Estado.toString().toUpperCase() == 'YELLOW') {
          return "Con_pulse_A"
        }
        // estado con menos de 4 horas
        if (Estado.toString().toUpperCase() == 'GREEN') {
          return "Con_pulse_V"
        }
        // estado cerrado
        if (Estado.toString().toUpperCase() == 'PURPLE') {
          return "Con_pulse_P"
        }
      }
      $scope.ObtenerRoluser = function () {
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerRol',
          }
        }).then(function (response) {
          console.log(response);
          if(response.data.Codigo == 1){
            swal({
              title: "Notificación",
              text: 'No tienes permisos para ingresar al modulo',
              type: "warning"
            }).catch(swal.noop);
            $scope.inaguracion = false;
            return
          }
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
    
            $scope.rolObtenido = response.data[0].Nombre;
            // console.log($scope.rolObtenido);
            if ($scope.rolObtenido == 'SUPERVISOR') {
              setTimeout(() => {
                $scope.Tabs = 1;
                $('#tabs_1').click();
              }, 1);
              $scope.rolSeleccionado = true;
              $scope.listadouserReferencia();
            } else {
              $scope.rolSeleccionado = false;
              $scope.listadouserReferencia();
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
      $scope.crearUser = function () {
        $scope.listadouserReferencia();
        $scope.userAbrir = true;
        $scope.motivosAbrir = false;
      }
      $scope.crearMotivos = function (accion) {
        $scope.listarmotivodeRemision(accion);
        $scope.motivosAbrir = true;
        $scope.userAbrir = false;
      }
      $scope.cierreuserMotivo = function () {
        $scope.userAbrir = false;
        $scope.motivosAbrir = false;
      }
      $scope.guardarmotivosReferencia = function (accion) {
        if ($scope.modal2.nombreMotivo == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el formulario',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'inserMotivos',
              pdocumento: 'RF',
              pconcepto: $scope.conceptoMotivo,
              pmotivo: $scope.motivoCentral,
              pnombre: $scope.modal2.nombreMotivo,
              pestado: $scope.modal2.estadoVisible,
              paccion: accion
            }
          }).then(function (response) {
            // console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == 0) {
                swal('Notificación', response.data.Nombre, 'success');
                $("#modalnuevoMotivo").modal("close");
                $scope.listarmotivodeRemision();
                $scope.limpiar('1');
                $scope.Tab_motivos($scope.motivoCentral, $scope.conceptoMotivo);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                $scope.listarmotivodeRemision();
                $("#modalnuevoMotivo").modal("close");
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
      }
      $scope.editarmotivosReferencia = function (motivo, tabsmotivos) {
        // console.log(motivo, tabsmotivos);
        if (motivo.COD_ESTADO == 'A') {
          var estado = 'I'
        } else {
          estado = 'A'
        }
        $scope.coceptoMotivo = motivo.CONCEPTO
        $scope.controlTabsmotivos = tabsmotivos;
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'inserMotivos',
            pdocumento: 'RF',
            pconcepto: motivo.CONCEPTO,
            pmotivo: motivo.MOTIVO,
            pnombre: motivo.NOMBRE,
            pestado: estado,
            paccion: 'U'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $("#modalnuevoMotivo").modal("close");
            if (response.data.Codigo == 0) {
              swal('Notificación', response.data.Nombre, 'success');
              $scope.Tab_motivos($scope.controlTabsmotivos, $scope.coceptoMotivo);
            } else {
              swal('Notificación', response.data.Nombre, 'warning');
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
      $scope.guardaruserReferencia = function (accion) {
        // console.log(accion);
        if (accion == 'I') {
          var accion = 'I'
        } else {
          accion = 'U'
        }
        if ($scope.form1.numeroDocumento == '' || $scope.form1.tipoUser == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el formulario',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertuserReferencia',
              pdocumento: $scope.form1.numeroDocumento,
              ptipo: $scope.form1.tipoUser,
              pestado: $scope.form1.estadoVisible,
              paccion: accion
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == 0) {
                swal('Notificación', response.data.Nombre, 'success');
                $scope.limpiar('1');
                $scope.listadouserReferencia();
                $("#modaleditarUser").modal("close");
                // $scope.ObtenerRoluse();
                // $scope.Set_Tab(1, grupos);
              }
              if (response.data.Codigo == 1) {
                swal('Notificación', response.data.Nombre, 'warning');
                $scope.listadouserReferencia();
                $scope.limpiar('1');
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
      }
      $scope.editaruserReferencia = function (opcion) {
        // console.log(opcion);
        $("#modaleditarUser").modal("open");
        $scope.form1.numeroDocumento = opcion.DOCUMENTO;
        $scope.form1.nombreFuncionario = opcion.NOMBRE;
        $scope.form1.tipoUser = opcion.TIPO;
        $scope.form1.estadoVisible = opcion.COD_ESTADO;
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
      $scope.buscarAfiliado = function () {
        if ($scope.form2.tipoSolicitud == "" || $scope.form2.selecctipoDocumento == "" || $scope.form2.seleccnumeroDocumento == "") {
          swal({
            title: "¡Alerta!",
            text: 'No se permiten campos vacios por favor seleccione el tipo de documento y digite el numero del documento ',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'obtenerAfiliados',
              tipodocumento: $scope.form2.selecctipoDocumento,
              documento: $scope.form2.seleccnumeroDocumento,
              tiposolicitud: $scope.form2.tipoSolicitud
            }
          }).then(function (response) {
            // console.log(response);
            if (response.data.CODIGO == '0') {
              swal({
                title: "¡Alerta¡",
                text: response.data.NOMBRE,
                type: "warning"
              }).catch(swal.noop);
              $scope.limpiar('1');
            } else {
              swal({
                title: "Afiliado",
                text: 'Cargado Correctamente',
                type: "success"
              }).catch(swal.noop);
              $scope.form2.tipoDocumento = response.data.TipoDocumento,
                $scope.form2.numeroDocumento = response.data.Documento,
                $scope.form2.nombrePaciente = response.data.NombreCompleto,
                $scope.form2.generoPaciente = response.data.Sexo,
                $scope.form2.edadPaciente = response.data.EdadAnhos,
                $scope.form2.nivelSisben = response.data.NIVEL,
                $scope.form2.regimenPaciente = response.data.Regimen,
                $scope.form2.codigoRegimen = response.data.CodigoRegimen,
                $scope.form2.sexo = response.data.SexoCodigo,
                $scope.form2.edad = response.data.EdadDias,
                $scope.form2.seccionalPaciente = response.data.Departamento,
                $scope.form2.codigoseccional = response.data.cod_municipio

              setTimeout(() => {
                $scope.$apply();
                swal.close();
              }, 1000);
            }
          });
        }
      }
      $scope.buscarFuncionario = function () {
        if ($scope.form1.numeroDocumento == "" || $scope.form1.numeroDocumento == "") {
          swal({
            title: "¡Alerta!",
            text: 'No se permiten campos vacios por favor seleccione el tipo de documento y digite el numero del documento ',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'obtenerFuncionario',
              ndocumento: $scope.form1.numeroDocumento
            }
          }).then(function (response) {
            // console.log(response);
            if (response.data.Codigo == '1') {
              swal({
                title: "Funcionario",
                text: response.data.Nombre,
                type: "warning"
              }).catch(swal.noop);
            } else {
              swal({
                title: "Funcionario",
                text: 'Cargado correctamente',
                type: "success"
              }).catch(swal.noop);
              $scope.form1.nombrefunCreado = response.data[0].NOMBRE,
                setTimeout(() => {
                  $scope.$apply();
                  swal.close();
                }, 1000);
              // $("#modalnuevoUser").modal("close");
            }
          });
        }
      }
      $scope.buscarIps = function () {
        // console.log(ips);
        if ($scope.buscard1 == '') {
          swal({
            title: "¡Alerta!",
            text: 'Por favor digite el nombre o nit de la Ips',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: { function: 'obtenerNombreIps', ips: $scope.buscard1 }
          }).then(function (response) {
            // console.log(response);
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'IPS no encontrada', 'info');
              $scope.inactivebarraips = true;
            } else {
              $scope.listIps = response.data;
              $scope.inactivebarraips = false;
            }
          })
        }
      }
      $scope.seleccionarips = function (data) {
        // console.log(data);
        if ($scope.tipoaut == '1') {
          $scope.form2.nombreIps = data.NOMBRE;
          $scope.form2.nitIps = data.CODIGO;
          $scope.form2.SeccionalIps = data.SECCIONAL;
          $scope.form2.UbicacionIps = data.MUNICIPIO;
          $("#modalips").modal("close");
          $scope.buscard1 = '';
        }
      }
      $scope.listarmotivodeRemision = function (motivo) {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        // console.log(motivo);
        if (motivo == 'RM') { $scope.Vista1.Filtrar_Rem = ''; } if (motivo == 'CA') {
          $scope.Vista1.Filtrar_mcancelacion = '';
        } if (motivo == 'RE') { $scope.Vista1.Filtrar_mrechazo = ''; } if (motivo == 'NA') { $scope.Vista1.Filtrar_mambulancia = ''; }
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenermotivosReferencia',
            motivoReferencia: motivo || 'RM',
          }
        }).then(function (response) {
          console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.list_DatosTemp = response.data;
            $scope.conceptoMotivo = response.data[0].CONCEPTO;
            $scope.motivoCentral = response.data[0].MOTIVO;
            $scope.nombreMotivo = response.data[0].NOMBRE;
            $scope.codigoEstado = response.data[0].COD_ESTADO;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.listarmotivoderemisionActivos = function () {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerlistamotivosreferenciaActivas',
            motivoReferencia: 'RM',
          }
        }).then(function (response) {
          console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.listmotivosderemisionActivas = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.listarmotivodecancelacionActivos = function () {
        // console.log(motivo);
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerlistamotivosreferenciaActivas',
            motivoReferencia: 'CA',
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.listmotivosdecancelacionActivos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.listarmotivoderechazoActivos = function (motivo) {
        //console.log(motivo);
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerlistamotivosreferenciaActivas',
            motivoReferencia: 'RE',
          }
        }).then(function (response) {
          //console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.listmotivosderechazoActivos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.listarmotidecancelacionambulanciaActivos = function () {
        // console.log(motivo);
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerlistamotivosreferenciaActivas',
            motivoReferencia: 'NA',
          }
        }).then(function (response) {
          // console.log(response);
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.listmotivocancelacionambulanciaActivas = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
      $scope.listarmotivodeTraslado = function () {
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenermotivoTraslado',
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.listmotivoTraslado = response.data;
          }
        });
      }
      $scope.seleccionarMotivo = function (data) {
        if ($scope.tipoaut == '1') {
          $scope.form2.nombreIps = data.NOMBRE;
          $scope.form2.nitIps = data.CODIGO;
          $scope.form2.SeccionalIps = data.SECCIONAL;
          $scope.form2.UbicacionIps = data.MUNICIPIO;
          $("#modalips").modal("close");
        }
      }
      $scope.buscarDiagnostico = function (diag, numero) {
        console.log(diag, numero);
        setTimeout(() => { $scope.apply(); }, 200);
        if (diag == "" || diag == undefined) {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
          return
        }
        if (numero == 1) {
          if ($scope.form2.edad == "" || $scope.form2.edad == undefined || $scope.form2.sexo == "" || $scope.form2.sexo == undefined) {
            swal('Importante', 'Debe diligenciar la informacion del paciente!', 'info');
            return
          } else {
            var sexo = $scope.form2.sexo;
            var edad = $scope.form2.edad;
          }
        } if (numero == 2) {
          if ($scope.form4.edad == "" || $scope.form4.edad == undefined || $scope.form4.sexo == "" || $scope.form4.sexo == undefined) {
            swal('Importante', 'Debe diligenciar la informacion del paciente!', 'info');
            return
          } else {
            var sexo = $scope.form4.sexo;
            var edad = $scope.form4.edad;
          }
        }
        setTimeout(() => {
          $scope.apply();
        }, 500);
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: {
            function: 'obtenerDiagnostico',
            codigo: diag,
            sexo: sexo,
            edad: edad
          }
        }).then(function (response) {
          $scope.listDiagnosticos = [];
          if (response.data["0"].Codigo == '-1') {
            swal('Importante', response.data["0"].Nombre, 'info');
            $scope.inactivebarradiag = true;
          } else if (response.data["0"].Codigo == '0') {
            swal('Importante', 'Diasnostico no encontrado ó favor especificar mas la busqueda del diagnostico', 'info');
            $scope.inactivebarradiag = true;
          } else {
            $scope.listDiagnosticos = response.data;
            $scope.inactivebarradiag = false;
          }
        })
      }
      $scope.seleccionardiagnostico = function (data, tipo, numero) {
        // console.log(data, tipo, numero);
        if (numero == 1) {
          var text = "";
          if ($scope.tipoaut == '1') {
            if (tipo == 'P') {
              $scope.form2.diagnosticoPrincipal = data.Nombre;
              $scope.form2.codigodiagnosticoPrincipal = data.Codigo;
              text = 'Principal';
            } else {
              $scope.form2.diagnosticoSegundario = data.Nombre;
              $scope.form2.codigodiagnosticoSegundario = data.Codigo;
              text = 'Secundario';
              $("#modaldiagnostico").modal("close");
            }
          }
          swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
        } if (numero == 2) {
          var text = "";
          if ($scope.tipoaut == '1') {
            if (tipo == 'P') {
              $scope.form4.diagnosticoPrincipal = data.Nombre;
              $scope.form4.codigodiagnosticoPrincipal = data.Codigo;
              text = 'Principal';
            } else {
              $scope.form4.diagnosticoSegundario = data.Nombre;
              $scope.form4.codigodiagnosticoSegundario = data.Codigo;
              text = 'Secundario';
              $("#modaldiagnosticocontrarreferencia").modal("close");
            }
          }
          swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
        }
      }
      $scope.guardarReferencias = function () {
        if ($scope.form2.seleccnumeroDocumento == '' || $scope.form2.seleccnumeroDocumento == null || $scope.form2.seleccnumeroDocumento == undefined ||
          $scope.form2.nombreIps == '' || $scope.form2.nombreIps == null || $scope.form2.nombreIps == undefined ||
          $scope.form2.motivoRemision == '' || $scope.form2.motivoRemision == null || $scope.form2.motivoRemision == undefined ||
          $scope.form2.diagnosticoPrincipal == '' || $scope.form2.diagnosticoPrincipal == null || $scope.form2.diagnosticoPrincipal == undefined ||
          $scope.form2.servicio1 == '' || $scope.form2.servicio1 == null || $scope.form2.servicio1 == undefined ||
          $scope.form2.nombreSolicitante == '' || $scope.form2.nombreSolicitante == null || $scope.form2.nombreSolicitante == undefined ||
          $scope.form2.telefonoSolicitante == '' || $scope.form2.telefonoSolicitante == null || $scope.form2.telefonoSolicitante == undefined ||
          $scope.form2.cargoSolicitante == '' || $scope.form2.cargoSolicitante == null || $scope.form2.cargoSolicitante == undefined ||
          $scope.form2.canalOrigen == '' || $scope.form2.canalOrigen == null || $scope.form2.canalOrigen == undefined ||
          $scope.form2.nombreGestor == '' || $scope.form2.nombreGestor == null || $scope.form2.nombreGestor == undefined) {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el formulario',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertReferencia',
              pdocumento: $scope.form2.tipoSolicitud,
              porigen: $scope.form2.canalOrigen,
              ptipodocumento: $scope.form2.tipoDocumento,
              pnumerodocumento: $scope.form2.numeroDocumento,
              codmuniipio: $scope.form2.codigoseccional,
              pregimen: $scope.form2.codigoRegimen,
              pmotivo_remision: $scope.form2.motivoRemision,
              pdiagnostico: $scope.form2.codigodiagnosticoPrincipal,
              pdiagnostico1: $scope.form2.codigodiagnosticoSegundario,
              pservicio: $scope.form2.codigoEspecialidad1,
              pservicio2: $scope.form2.codigoEspecialidad2,
              pservicio3: $scope.form2.codigoEspecialidad3,
              pfecha_recepcion: $scope.formatDatefecha($scope.SysDay),
              pips_solicitante: $scope.form2.nitIps,
              pdoc_solicitante: $scope.form2.nombreSolicitante,
              ptelefono: $scope.form2.telefonoSolicitante,
              pcargo_solicitante: $scope.form2.cargoSolicitante
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Afiliado",
                  text: response.data.Nombre,
                  type: "success"
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar('2');
                  $scope.Set_Tab('3');
                  $scope.$apply();
                }, 2500);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                setTimeout(() => {
                  $scope.limpiar('2');
                  $scope.Set_Tab('3');
                  $scope.$apply();
                }, 2500);
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
      }
      $scope.guardarContrarreferencias = function () {
        if ($scope.form4.motivoRemision == '' || $scope.form4.motivoRemision == null || $scope.form4.motivoRemision == undefined ||
          $scope.form4.diagnosticoPrincipal == '' || $scope.form4.diagnosticoPrincipal == null || $scope.form4.diagnosticoPrincipal == undefined ||
          $scope.form4.servicio1 == '' || $scope.form4.servicio1 == null || $scope.form4.servicio1 == undefined ||
          $scope.form4.nombreSolicitante == '' || $scope.form4.nombreSolicitante == null || $scope.form4.nombreSolicitante == undefined ||
          $scope.form4.telefonoSolicitante == '' || $scope.form4.telefonoSolicitante == null || $scope.form4.telefonoSolicitante == undefined ||
          $scope.form4.cargoSolicitante == '' || $scope.form4.cargoSolicitante == null || $scope.form4.cargoSolicitante == undefined ||
          $scope.form4.canalOrigen == '' || $scope.form4.canalOrigen == null || $scope.form4.canalOrigen == undefined ||
          $scope.form4.nombreGestor == '' || $scope.form4.nombreGestor == null || $scope.form4.nombreGestor == undefined) {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el formulario',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertReferencia',
              pdocumento: $scope.tipoSolicitud,
              porigen: $scope.form4.canalOrigen,
              ptipodocumento: $scope.form4.tipoDocumento,
              pnumerodocumento: $scope.form4.numeroDocumento,
              codmuniipio: $scope.form4.codigoseccional,
              pregimen: $scope.form4.codigoRegimen,
              pmotivo_remision: $scope.form4.motivoRemision,
              pdiagnostico: $scope.form4.codigodiagnosticoPrincipal,
              pdiagnostico1: $scope.form4.codigodiagnosticoSegundario,
              pservicio: $scope.form4.codigoEspecialidad1,
              pservicio2: $scope.form4.codigoEspecialidad2,
              pservicio3: $scope.form4.codigoEspecialidad3,
              pfecha_recepcion: $scope.formatDatefecha($scope.SysDay),
              pips_solicitante: $scope.form4.nitIps,
              pdoc_solicitante: $scope.form4.nombreSolicitante,
              ptelefono: $scope.form4.telefonoSolicitante,
              vnumeroreferencia: $scope.codigoContrarreferencia,
              pcargo_solicitante: $scope.form4.cargoSolicitante
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Afiliadó",
                  text: response.data.Nombre,
                  type: "success",
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar('6');
                  $scope.Set_Tab('3');
                  $scope.$apply();
                }, 2500);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                setTimeout(() => {
                  $scope.limpiar('6');
                  $scope.Set_Tab('3');
                  $scope.$apply();
                }, 2500);
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
      }
      $scope.buscaripsReceptora = function () {
        // console.log(ips);
        if ($scope.buscard2 == '' || $scope.buscard2 == null) {
          swal('Importante', 'El campo  de texto no puede estar vacio!', 'info');
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'obtenerNombreipsReceptora',
              ips: $scope.buscard2
            }
          }).then(function (response) {
            // console.log(response);
            if (response.data["0"].Codigo == '0') {
              swal('Importante', 'IPS no encontrada', 'info');

            } else {
              $scope.listipsReceptora = response.data;
            }
          })

        }
      }
      $scope.seleccionaripsReceptora = function (data) {
        // console.log(data);
        $scope.form3.nombreipsRecep = data.CODIGO;
        $scope.modal3.nombreipsRecep = data.CODIGO;
        $scope.modal4.nombreipsRecep = data.CODIGO;
        $scope.modal5.nombreipsRecep = data.CODIGO;
        $scope.listipsReceptora = [];
        $("#modallistipsGestion").modal("close");
      }
      $scope.buscarEspecialidades = function (busc) {
        if (busc == 'buscard3') {
          if ($scope.buscard3 == undefined || $scope.buscard3 == '') {
            swal({
              title: "¡Alerta!",
              text: '!Por favor digite el nombre o codigo del servicio!',
              type: "warning"
            }).catch(swal.noop);
          }
          return
        }
        if (busc == 'buscard4') {
          if ($scope.buscard4 == undefined || $scope.buscard4 == '') {
            swal({
              title: "¡Alerta!",
              text: '!Por favor digite el nombre o codigo del servicio!',
              type: "warning"
            }).catch(swal.noop);
          }
          return
        }
        if (busc == 'buscard5') {
          if ($scope.buscard5 == undefined || $scope.buscard5 == '') {
            swal({
              title: "¡Alerta!",
              text: '!Por favor digite el nombre o codigo del servicio!',
              type: "warning"
            }).catch(swal.noop);
          }
          return
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'obtenerEspecialidades',
              especialidades: $scope.buscard3 || $scope.buscard4 || $scope.buscard5
            }
          }).then(function (response) {
            console.log(response);
            if (response.data[0].Codigo == '0') {
              swal({
                title: "¡Alerta¡",
                text: 'No se encontro informacion asociada',
                type: "warning"
              }).catch(swal.noop);
            } else {
              $scope.listEspecialidades = response.data;
            }
          })
        }
      }
      $scope.seleccionarEspecialidad = function (data, x, numero) {
        // console.log(data, x, numero);
        // console.log(numero);
        if (numero == 1) {
          var service = x;
          // console.log(service);
          if (service == 'servicio1') {
            $scope.buscard3 = '',
              $scope.form2.servicio1 = data.Nombre;
            $scope.form2.codigoEspecialidad1 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio1").modal("close");
          } if (service == 'servicio2') {
            $scope.buscard4 = '',
              $scope.form2.servicio2 = data.Nombre;
            $scope.form2.codigoEspecialidad2 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio2").modal("close");
          } if (service == 'servicio3') {
            // console.log(data, x);
            $scope.buscard5 = '',
              $scope.form2.servicio3 = data.Nombre;
            $scope.form2.codigoEspecialidad3 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio3").modal("close");
          }
        } if (numero == 2) {
          var service = x;
          // console.log(service);
          if (service == 'servicio1') {
            $scope.buscard3 = '',
              $scope.form4.servicio1 = data.Nombre;
            $scope.form4.codigoEspecialidad1 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio1contrarreferencia").modal("close");
          } if (service == 'servicio2') {
            $scope.buscard4 = '',
              $scope.form4.servicio2 = data.Nombre;
            $scope.form4.codigoEspecialidad2 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio2contrarreferencia").modal("close");
          } if (service == 'servicio3') {
            // console.log(data, x);
            $scope.buscard5 = '',
              $scope.form4.servicio3 = data.Nombre;
            $scope.form4.codigoEspecialidad3 = data.Codigo;
            $scope.listEspecialidades = [];
            $("#modalservicio3contrarreferencia").modal("close");
          }
        }
      }
      $scope.guardarprocesoGestion = function (tiposGes) {
        // $scope.form3.fechaAceptacion
        console.log($scope.form3.fechaAceptacion);
        if ($scope.form3.nombreipsRecep == '' || $scope.form3.nombreipsRecep == null || $scope.form3.nombreipsRecep == undefined ||
          $scope.form3.aceptacionPaciente == '' || $scope.form3.aceptacionPaciente == null || $scope.form3.aceptacionPaciente == undefined ||
          ($scope.form3.aceptacionPaciente == "N" && ($scope.form3.motivoRechazo == '' || $scope.form3.motivoRechazo == null || $scope.form3.motivoRechazo == undefined)) ||
          $scope.form3.fechaAceptacion == '' || $scope.form3.fechaAceptacion == null || $scope.form3.fechaAceptacion == undefined ||
          $scope.form3.horaAceptacion == '' || $scope.form3.horaAceptacion == null || $scope.form3.horaAceptacion == undefined ||
          $scope.form3.profesional == '' || $scope.form3.profesional == null || $scope.form3.profesional == undefined ||
          $scope.form3.atendidoPor == '' || $scope.form3.atendidoPor == null || $scope.form3.atendidoPor == undefined ||
          $scope.form3.cargo == '' || $scope.form3.cargo == null || $scope.form3.cargo == undefined ||
          $scope.form3.telefono == '' || $scope.form3.telefono == null || $scope.form3.telefono == undefined ||
          $scope.form3.observaciones == '' || $scope.form3.observaciones == null || $scope.form3.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el proceso de gestion',
            type: "warning"
          }).catch(swal.noop);
        } else {
          console.log($scope.form2);
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertGestion',
              pnumero: $scope.form3.pnumero,
              pdocumento: $scope.form3.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.form3.nombreipsRecep,
              ptipo_traslado: $scope.form3.tipoTraslado,
              paceptacion: $scope.form3.aceptacionPaciente,
              pmotivorechazo: $scope.form3.motivoRechazo,
              pmotivocancelacion: $scope.form3.motivoCancelacion,
              pfecha_gestion: $scope.formatDatefecha($scope.form3.fechaAceptacion),
              phora_gestion: document.getElementById("form3.horaAceptacion").value,
              profesional_gestion: $scope.form3.profesional,
              patendido_por: $scope.form3.atendidoPor,
              pcargo: $scope.form3.cargo,
              ptelefono: $scope.form3.telefono,
              pextension: $scope.form3.extencion,
              pobservacion: $scope.form3.observaciones
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success"
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar('3');
                  $scope.listrefrenciasActivas();
                  $("#modalprocesoGestion").modal("close");
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                setTimeout(() => {
                  $scope.limpiar('3');
                  $("#modalprocesoGestion").modal("close");
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
          $("#modalprocesoGestion").modal("close");
        }
      }
      $scope.guardarprocesogestionTraslado = function (gestion) {
        // console.log(gestion);
        $scope.tipo_gestion = gestion;
        if ($scope.modal3.nombreipsRecep == '' || $scope.modal3.nombreipsRecep == null || $scope.modal3.nombreipsRecep == undefined ||
          $scope.modal3.aceptacionPaciente == '' || $scope.modal3.aceptacionPaciente == null || $scope.modal3.aceptacionPaciente == undefined ||
          $scope.modal3.fechaAceptacion == '' || $scope.modal3.fechaAceptacion == null || $scope.modal3.fechaAceptacion == undefined ||
          $scope.modal3.horaAceptacion == '' || $scope.modal3.horaAceptacion == null || $scope.modal3.horaAceptacion == undefined ||
          $scope.modal3.profesional == '' || $scope.modal3.profesional == null || $scope.modal3.profesional == undefined ||
          $scope.modal3.atendidoPor == '' || $scope.modal3.atendidoPor == null || $scope.modal3.atendidoPor == undefined ||
          $scope.modal3.cargo == '' || $scope.modal3.cargo == null || $scope.modal3.cargo == undefined ||
          $scope.modal3.telefono == '' || $scope.modal3.telefono == null || $scope.modal3.telefono == undefined ||
          $scope.modal3.observaciones == '' || $scope.modal3.observaciones == null || $scope.modal3.observaciones == undefined
          || ($scope.modal3.aceptacionPaciente == "S" && ($scope.modal3.tipoTraslado == '' || $scope.modal3.tipoTraslado == null || $scope.modal3.tipoTraslado == undefined))
          || ($scope.modal3.aceptacionPaciente == "N" && ($scope.modal3.motivoRechazo == '' || $scope.modal3.motivoRechazo == null || $scope.modal3.motivoRechazo == undefined))) {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en la gestion de traslado',
            type: "warning"
          }).catch(swal.noop);
          return
        } else {
          // console.log($scope.form2);
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertGestion',
              pnumero: $scope.modal3.pnumero,
              pdocumento: $scope.modal3.numeroDocumento,
              ptipo_gestion: $scope.tipo_gestion,
              pips_receptora: $scope.modal3.nombreipsRecep,
              ptipo_traslado: $scope.modal3.tipoTraslado,
              paceptacion: $scope.modal3.aceptacionPaciente,
              pmotivorechazo: $scope.modal3.motivoRechazo,
              pfecha_gestion: $scope.formatDatefecha($scope.modal3.fechaAceptacion),
              phora_gestion: document.getElementById("modal3.horaAceptacion").value,
              profesional_gestion: $scope.modal3.profesional,
              patendido_por: $scope.modal3.atendidoPor,
              pcargo: $scope.modal3.cargo,
              ptelefono: $scope.modal3.telefono,
              pextension: $scope.modal3.extencion,
              pobservacion: $scope.modal3.observaciones
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success"
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar('3');
                  $scope.listrefrenciasActivas();
                  $("#modalprocesogestionTraslado").modal("close");
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                setTimeout(() => {
                  $scope.limpiar('3');
                  $("#modalprocesogestionTraslado").modal("close");
                  $scope.$apply();
                }, 2500);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
          $("#modalprocesogestionTraslado").modal("close");
        }
      }
      $scope.guardarprocesoGestioncierre = function (tiposGes) {
        if ($scope.modal5.nombreipsRecep == '' || $scope.modal5.nombreipsRecep == null || $scope.modal5.nombreipsRecep == undefined ||
          $scope.modal5.aceptacionPaciente == '' || $scope.modal5.aceptacionPaciente == null || $scope.modal5.aceptacionPaciente == undefined ||
          ($scope.modal5.aceptacionPaciente == "N" && ($scope.modal5.motivoRechazo == '' || $scope.modal5.motivoRechazo == null || $scope.modal5.motivoRechazo == undefined)) ||
          $scope.modal5.profesional == '' || $scope.modal5.profesional == null || $scope.modal5.profesional == undefined ||
          $scope.modal5.atendidoPor == '' || $scope.modal5.atendidoPor == null || $scope.modal5.atendidoPor == undefined ||
          $scope.modal5.cargo == '' || $scope.modal5.cargo == null || $scope.modal5.cargo == undefined ||
          $scope.modal5.telefono == '' || $scope.modal5.telefono == null || $scope.modal5.telefono == undefined ||
          $scope.modal5.observaciones == '' || $scope.modal5.observaciones == null || $scope.modal5.observaciones == undefined
        ) {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el formulario',
            type: "warning"
          }).catch(swal.noop);
        } else {
          // console.log($scope.form2);
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertGestion',
              pnumero: $scope.modal5.pnumero,
              pdocumento: $scope.modal5.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.modal5.nombreipsRecep,
              ptipo_traslado: $scope.modal5.tipoTraslado,
              paceptacion: $scope.modal5.aceptacionPaciente,
              pmotivorechazo: $scope.modal5.motivoRechazo,
              pmotivocancelacion: $scope.modal5.motivoCancelacion,
              pfecha_gestion: $scope.formatDatefecha($scope.modal5.fechaAceptacion),
              phora_gestion: document.getElementById("modal5.horaAceptacion").value,
              profesional_gestion: $scope.modal5.profesional,
              patendido_por: $scope.modal5.atendidoPor,
              pcargo: $scope.modal5.cargo,
              ptelefono: $scope.modal5.telefono,
              pextension: $scope.modal5.extencion,
              pobservacion: $scope.modal5.observaciones
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              // console.log(data);
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success"
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar('3');
                  $scope.listrefrenciasActivas();
                  $("#modalprocesoGestioncierre").modal("close");
                  $scope.resumenCantidad($scope.grupos);
                  $scope.$apply();
                }, 1000);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                setTimeout(() => {
                  $scope.limpiar('3');
                  $("#modalprocesoGestioncierre").modal("close");
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
          $("#modalprocesoGestioncierre").modal("close");
        }
      }
      $scope.guardarprocesoGestioncancelacion = function (tiposGes) {
        if ($scope.modal4.nombreipsRecep == '' || $scope.modal4.nombreipsRecep == null || $scope.modal4.nombreipsRecep == undefined ||
          $scope.modal4.motivoCancelacion == '' || $scope.modal4.motivoCancelacion == null || $scope.modal4.motivoCancelacion == undefined ||
          $scope.modal4.fechaAceptacion == '' || $scope.modal4.fechaAceptacion == null || $scope.modal4.fechaAceptacion == undefined ||
          $scope.modal4.horaAceptacion == '' || $scope.modal4.horaAceptacion == null || $scope.modal4.horaAceptacion == undefined ||
          $scope.modal4.profesional == '' || $scope.modal4.profesional == null || $scope.modal4.profesional == undefined ||
          $scope.modal4.atendidoPor == '' || $scope.modal4.atendidoPor == null || $scope.modal4.atendidoPor == undefined ||
          $scope.modal4.cargo == '' || $scope.modal4.cargo == null || $scope.modal4.cargo == undefined ||
          $scope.modal4.telefono == '' || $scope.modal4.telefono == null || $scope.modal4.telefono == undefined ||
          $scope.modal4.observaciones == '' || $scope.modal4.observaciones == null || $scope.modal4.observaciones == undefined) {
          swal({
            title: "Notificación",
            text: 'No se permiten campos vacios en el formulario de cancelacion',
            type: "warning"
          }).catch(swal.noop);
        } else {
          // console.log($scope.form2);
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertGestion',
              pnumero: $scope.modal4.pnumero,
              pdocumento: $scope.modal4.numeroDocumento,
              ptipo_gestion: tiposGes,
              pips_receptora: $scope.modal4.nombreipsRecep,
              ptipo_traslado: $scope.modal4.tipoTraslado,
              paceptacion: $scope.modal4.aceptacionPaciente,
              pmotivorechazo: $scope.modal4.motivoRechazo,
              pmotivocancelacion: $scope.modal4.motivoCancelacion,
              pfecha_gestion: $scope.formatDatefecha($scope.modal4.fechaAceptacion),
              phora_gestion: document.getElementById("modal4.horaAceptacion").value,
              profesional_gestion: $scope.modal4.profesional,
              patendido_por: $scope.modal4.atendidoPor,
              pcargo: $scope.modal4.cargo,
              ptelefono: $scope.modal4.telefono,
              pextension: $scope.modal4.extencion,
              pobservacion: $scope.modal4.observaciones
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              var data = response.data;
              // console.log(data);
              if (response.data.Codigo == 0) {
                swal({
                  title: "Proceso de Gestion",
                  text: response.data.Nombre,
                  type: "success"
                }).catch(swal.noop);
                setTimeout(() => {
                  $scope.limpiar('3');
                  $scope.listrefrenciasActivas();
                  $("#modalprocesoGestioncancelacion").modal("close");
                  $scope.$apply();
                }, 1000);
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
                setTimeout(() => {
                  $scope.limpiar('3');
                  $("#modalprocesoGestioncancelacion").modal("close");
                  $scope.$apply();
                }, 1000);
              }
            } else {
              swal({
                title: "¡Ocurrio un error!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          });
          $("#modalprocesoGestioncancelacion").modal("close");
        }
      }
      $scope.guardarObservaciones = function (obser) {
        if ($scope.modal1.observaciones == '') {
          swal({
            title: "Notificación",
            text: 'No se permiten guardar sin escribir una obervación',
            type: "warning"
          }).catch(swal.noop);
        } else {
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'insertGestion',
              pnumero: $scope.modal1.numeroReferencia,
              pdocumento: $scope.modal1.numeroDocumento,
              ptipo_gestion: obser,
              pobservacion: $scope.modal1.observaciones
            }
          }).then(function (response) {
            // console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              var data = response.data;
              // console.log(data);
              if (response.data.Codigo == 0) {
                swal('Notificación', response.data.Nombre, 'success');
                $scope.listrefrenciasActivas();
                $scope.modal1.observaciones = '';
                $("#modalObservaciones").modal("close");
              } else {
                swal('Notificación', response.data.Nombre, 'warning');
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
      }
      $scope.detallesreferenciaIPS = function (opcion) {
        // console.log(opcion);
        $scope.openmodals('detallegestionIps', opcion)
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerdetalleGestion',
            codigoreferencia: $scope.form3.porconsultar,
            documentopaciente: $scope.form3.numeroDocumento
          }
        }).then(function (response) {
          // console.log(response);
          // $scope.verdetallesreferenciaIPS();
          $scope.listadetalleReferencia = response.data.ips;
          // console.log($scope.listadetalleReferencia);
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
          if (response.data.CODIGO == '0') {
            swal({
              title: "¡Alerta¡",
              text: response.data.NOMBRE,
              type: "warning"
            }).catch(swal.noop);
          } else {
            setTimeout(() => {
              $scope.$apply();
              swal.close();
            }, 1000);
          }
        });
      }
      $scope.detallesreferenciaObser = function (opcion) {
        // console.log(opcion);
        $scope.openmodals('detalleObservacion', opcion)
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerdetalleGestion',
            codigoreferencia: $scope.form3.porconsultar,
            documentopaciente: $scope.form3.numeroDocumento
          }
        }).then(function (response) {
          // console.log(response);
          // $scope.verdetallesreferenciaObser();
          $scope.listadetalleObservacion = response.data.observaciones;

          // console.log($scope.listadetalleObservacion);
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
          if (response.data.CODIGO == '0') {
            swal({
              title: "¡Alerta¡",
              text: response.data.NOMBRE,
              type: "warning"
            }).catch(swal.noop);
          } else {
            setTimeout(() => {
              $scope.$apply();
              swal.close();
            }, 1000);
          }
        });
      }
      $scope.verdetallesreferenciaIPS = function (datosentrada) {
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerdetalleGestion',
            codigoreferencia: datosentrada.CODIGO,
            documentopaciente: datosentrada.DOCUMENTO
          }
        }).then(function (response) {
          // console.log(response);
          $scope.listadetalleReferencia = response.data.ips;
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
        });
      }
      $scope.verdetallesreferenciaObser = function (datosentrada) {
        // console.log(datosentrada);
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerdetalleGestion',
            codigoreferencia: datosentrada.CODIGO,
            documentopaciente: datosentrada.DOCUMENTO
          }
        }).then(function (response) {
          // console.log(response);
          // console.log(response.data.observaciones);
          $scope.verlistadetalleObservacion = response.data.observaciones;
          // console.log($scope.verlistadetalleObservacion);
          $scope.nombrepaciente = response.data.NOMBRE_PCTE;
        });
      }
      $scope.listrefrenciasActivas = function () {
        if ($scope.grupos == '') {
          return
        } else {
          swal({
            title: 'Cargando...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $scope.Vista1_datos = [];
          $http({
            method: 'POST',
            url: "php/referencia/registroReferencia/registrodereferencia.php",
            data: {
              function: 'listadoderefrenciasActivas',
              grupo: $scope.grupos
            }
          }).then(function (response) {
            swal.close();
            console.log(response);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              $scope.Vista1_datos = response.data;
              console.log(response.data);
              setTimeout(() => {
                $scope.$apply()
              }, 500);
              $scope.initPaginacion(response.data);
            }
          });
        }
      }
      $scope.listadouserReferencia = function () {
        swal({
          title: 'Cargando...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.Vista1_datos = [];
        $scope.Vista1.Filtrar_User = '';
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'listausuariosReferencia',
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            swal.close();
            $scope.Vista1_datos = response.data;
            $scope.initPaginacion(response.data);
          }
        });
      }
      $scope.listarlistaResumen = function () {
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerlistaResumen',
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            // console.log(response);
            $scope.listadoresumen = response.data;
            // console.log($scope.listadoresumen);
            $scope.listresumenAtlantico = response.data[0];
            $scope.listresumenMagcordoba = response.data[1];
            $scope.listresumenMeta = response.data[2];
            $scope.listresumenCesarguajira = response.data[3];
            $scope.listresumenBolsuc = response.data[4];
            $scope.listresumenBogotros = response.data[5];

            if ($scope.listresumenAtlantico.codigo == 1) {
              $scope.nombreCodigoatl = 'ATLANTICO';
              //console.log($scope.listresumenAtlantico);
            }
            if ($scope.listresumenMagcordoba.codigo == 2) {
              $scope.nombreCodigomagcord = 'MAG - CORDOBA';
              // console.log($scope.listresumenMagcordoba);
            }
            if ($scope.listresumenMeta.codigo == 3) {
              $scope.nombreCodigomet = 'META';
              // console.log($scope.listresumenMeta);
            }

            if ($scope.listresumenCesarguajira.codigo == 4) {
              $scope.nombreCodigocesguaj = 'CESAR - GUAJIRA';
              // console.log($scope.listresumenCesarguajira);
            }
            if ($scope.listresumenBolsuc.codigo == 5) {
              $scope.nombreCodigoBolsucj = 'BOLIVAR - SUCRE';
              // console.log($scope.listresumenBolsuc);
            }
            if ($scope.listresumenBogotros.codigo == 6) {
              $scope.nombreCodigobogotros = 'BOGOTA - OTRAS';
              // console.log($scope.listresumenBogotros);
            }
          }
        });
      }
      $scope.apply = function () {
        setTimeout(() => { $scope.$apply(); }, 500);
      }
      // este codigo sirve para tener un input tipo fecha que solo permita escoger el dia actual
      $scope.formatDatefecha = function (date) {
        var d = new Date(date);
        var dd = ("0" + d.getDate()).slice(-2);
        var mm = ("0" + (d.getMonth() + 1)).slice(-2);
        var yyyy = d.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
      };
      $scope.formatDatehora = function (date) {
        console.log(date);
        var x = document.getElementById("myTime").value;
        console.log(x);

      };
      $scope.openmodals = function (tipo, opcion) {
        // console.log(tipo, opcion);
        $scope.buscard1 = "";
        $scope.buscard2 = "";
        $scope.buscard3 = "";
        $scope.buscard4 = "";
        $scope.buscard5 = "";
        $scope.buscard6 = "";
        $scope.buscard7 = "";
        $scope.busquedaInfo = "";
        $scope.tipoaut = opcion;
        switch (tipo) {
          case 'nuevoMotivo':
            // console.log(tipo, opcion);
            $("#modalnuevoMotivo").modal("open");
            setTimeout(() => {
              $('#modalnuevoMotivo').focus();
            }, 100);
            break;
          case 'nuevoUsuario':
            // console.log(tipo, opcion);
            $("#modalnuevoUser").modal("open");
            setTimeout(() => {
              $('#modalnuevoUser').focus();
            }, 100);
            break;
          case 'editarMotivo':
            $("#modaleditarMotivo").modal("open");
            setTimeout(() => {
              $('#modaleditarMotivo').focus();
            }, 100);
            break;
          case 'editarUsuario':
            $("#modaleditarUser").modal("open");
            setTimeout(() => {
              $('#modaleditarUser').focus();
            }, 100);
            break;
          case 'observaciones':
            // console.log(tipo, opcion);
            if (opcion.NOMBRE_STATUS == 'CANCELADA' || opcion.NOMBRE_STATUS == 'CERRADA') {
              setTimeout(() => {
                $("#modalObservaciones").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: 'No se puede gestionar el proceso',
                type: "warning"
              }).catch(swal.noop);
            } else {
              $scope.modal1.numeroReferencia = opcion.CODIGO;
              $scope.modal1.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal1.nombreFuncionario = opcion.NOMBRE_PCTE;
              $("#modalObservaciones").modal("open");
              setTimeout(() => {
                $('#modalObservaciones').focus();
              }, 100);
            }
            break;
          case 'ips':
            $scope.listIps = [];
            $("#modalips").modal("open");
            setTimeout(() => {
              $('#modalips #ipsinput').focus();
            }, 100);
            break;
          case 'diagnostico':
            $scope.inactivebarradiag = true;
            $("#modaldiagnostico").modal("open");
            setTimeout(() => {
              $('#modaldiagnostico #diaginput').focus();
            }, 100);
            break;
          case 'diagnosticocontrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modaldiagnosticocontrarreferencia").modal("open");
            setTimeout(() => {
              $('#modaldiagnosticocontrarreferencia #diaginput').focus();
            }, 100);
            break;
          case 'procesoGestion':
            console.log(tipo);
            console.log(opcion)
            if (opcion.DOCUMENTO == 'REFERENCIA' && opcion.NOMBRE_STATUS == 'POR LLEGAR') {
              setTimeout(() => {
                $("#modalprocesogestionTraslado").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: 'No se puede gestionar mas proceso de traslado',
                type: "warning"
              }).catch(swal.noop);
            }
            if (opcion.NOMBRE_STATUS == 'CANCELADA' || opcion.NOMBRE_STATUS == 'CERRADA') {
              setTimeout(() => {
                $("#modalprocesoGestion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: 'No se puede gestionar el proceso',
                type: "warning"
              }).catch(swal.noop);
            } else {
              if (opcion.STATUS == '3' || opcion.STATUS == '4') {
                $scope.limpiar('3');
                $scope.listarmotivodeTraslado();
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.modal3.pnumero = opcion.CODIGO;
                $scope.modal3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.modal3.porconsultar = opcion.GRUPO;
                $("#modalprocesogestionTraslado").modal("open");
                setTimeout(() => {
                  $('#modalprocesogestionTraslado #recepgestioninput').focus();
                }, 100);
              } else {
                $scope.verdetallesreferenciaIPS(opcion);
                $scope.verdetallesreferenciaObser(opcion);
                $scope.form3.pnumero = opcion.CODIGO;
                $scope.form3.numeroDocumento = opcion.COD_DOCUMENTO;
                $scope.form3.porconsultar = opcion.GRUPO;
                $("#modalprocesoGestion").modal("open");
                setTimeout(() => {
                  $('#modalprocesoGestion #recepgestioninput').focus();
                }, 100);
              }
            }
            break;
          case 'procesoGestioncierre':
            $scope.limpiar('3');
            // console.log(tipo);
            // console.log(opcion);
            if (opcion.STATUS != '4') {
              setTimeout(() => {
                $("#modalprocesoGestioncierre").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: 'No se puede gestionar el proceso',
                type: "warning"
              }).catch(swal.noop);

            } if (opcion.ESTADO == 'C') {
              setTimeout(() => {
                $("#modalprocesoGestioncierre").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: 'Ya se encuentra cerreda esta gestion',
                type: "warning"
              }).catch(swal.noop);
            } else {
              $scope.verdetallesreferenciaIPS(opcion);
              $scope.verdetallesreferenciaObser(opcion);
              $scope.modal5.pnumero = opcion.CODIGO;
              $scope.modal5.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal5.porconsultar = opcion.GRUPO;
              $("#modalprocesoGestioncierre").modal("open");
              setTimeout(() => {
                $('#modalprocesoGestioncierre #recepgestioninput').focus();
              }, 100);
            }
            break;
          case 'procesoGestioncancelacion':
            // console.log(tipo);
            // console.log(opcion);            
            if (opcion.NOMBRE_STATUS == 'CANCELADA' || opcion.NOMBRE_STATUS == 'CERRADA') {
              setTimeout(() => {
                $("#modalprocesoGestioncancelacion").modal("close");
                $scope.$apply();
              }, 50);
              swal({
                title: "¡Alerta¡",
                text: 'No se puede gestionar el proceso',
                type: "warning"
              }).catch(swal.noop);
            } else {
              $scope.listarmotivodecancelacionActivos();
              $scope.verdetallesreferenciaIPS(opcion);
              $scope.verdetallesreferenciaObser(opcion);
              $scope.modal4.pnumero = opcion.CODIGO;
              $scope.modal4.numeroDocumento = opcion.COD_DOCUMENTO;
              $scope.modal4.porconsultar = opcion.GRUPO;
              $("#modalprocesoGestioncancelacion").modal("open");
              setTimeout(() => {
                $('#modalprocesoGestioncancelacion #recepgestioninput').focus();
              }, 100);
            }
            break;
          case 'listipsGestion':
            $("#modallistipsGestion").modal("open");
            setTimeout(() => {
              $('#modallistipsGestion #recepipsinput').focus();
            }, 100);
            break;
          case 'detalleObservacion':
            $scope.form3.numeroDocumento = opcion.COD_DOCUMENTO;
            $scope.form3.porconsultar = opcion.CODIGO;
            $("#modaldetallegestionOber").modal("open");
            setTimeout(() => {
              $('#modaldetallegestionOber').focus();
            }, 100);
            break;
          case 'detallegestionIps':

            $scope.form3.numeroDocumento = opcion.COD_DOCUMENTO;
            $scope.form3.porconsultar = opcion.CODIGO;
            $("#modaldetallegestionIps").modal("open");
            setTimeout(() => {
              $('#modaldetallegestionIps').focus();
            }, 100);
            break;
          case 'servicio1':
            $scope.inactivebarradiag = true;
            $("#modalservicio1").modal("open");
            setTimeout(() => {
              $('#modalservicio1').focus();
            }, 100);
            break;
          case 'servicio2':
            $scope.inactivebarradiag = true;
            $("#modalservicio2").modal("open");
            setTimeout(() => {
              $('#modalservicio2').focus();
            }, 100);
            break;
          case 'servicio3':
            $scope.inactivebarradiag = true;
            $("#modalservicio3").modal("open");
            setTimeout(() => {
              $('#modalservicio3').focus();
            }, 100);
            break;
          case 'servicio1contrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modalservicio1contrarreferencia").modal("open");
            setTimeout(() => {
              $('#modalservicio1contrarreferencia').focus();
            }, 100);
            break;
          case 'servicio2contrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modalservicio2contrarreferencia").modal("open");
            setTimeout(() => {
              $('#modalservicio2contrarreferencia').focus();
            }, 100);
            break;
          case 'servicio3contrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modalservicio3contrarreferencia").modal("open");
            setTimeout(() => {
              $('#modalservicio3contrarreferencia').focus();
            }, 100);
            break;
          case 'paremetriciontimerespuesta':
            $scope.inactivebarradiag = true;
            $("#modaldeparemetriciontimerespuesta").modal("open");
            setTimeout(() => {
              $('#modaldeparemetriciontimerespuesta').focus();
            }, 100);
            break;
          default:
        }
      }
      $scope.closemodals = function (tipo) {
        // console.log(tipo);
        switch (tipo) {
          case 'nuevoMotivo':
            $("#modalnuevoMotivo").modal("close");
            $scope.limpiar('1');
            break;
          case 'nuevoUsuario':
            $scope.limpiar('1');
            $("#modalnuevoUser").modal("close");
            break;
          case 'editarUsuario':
            $("#modaleditarUser").modal("close");
            break;
          case 'observaciones':
            $("#modalObservaciones").modal("close");
            $scope.limpiar('3');
            break;
          case 'ips':
            $("#modalips").modal("close");
            break;
          case 'diagnostico':
            $("#modaldiagnostico").modal("close");
            break;
          case 'diagnosticocontrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modaldiagnosticocontrarreferencia").modal("close");
            break;
          case 'procesoGestion':
            $("#modalprocesoGestion").modal("close");
            $scope.limpiar('3');
            break;
          case 'procesoGestioncierre':
            $("#modalprocesoGestioncierre").modal("close");
            $scope.limpiar('3');
            break;
          case 'procesoGestioncancelacion':
            $("#modalprocesoGestioncancelacion").modal("close");
            $scope.limpiar('3');
            break;
          case 'procesogestionTraslado':
            $("#modalprocesogestionTraslado").modal("close");
            $scope.limpiar('3');
            break;
          case 'listipsGestion':
            $("#modallistipsGestion").modal("close");
            break;
          case 'detalleObservacion':
            $("#modaldetallegestionOber").modal("close");
            break;
          case 'detallegestionIps':
            $("#modaldetallegestionIps").modal("close");
            break;
          case 'servicio1':
            $("#modalservicio1").modal("close");
            break;
          case 'servicio2':
            $("#modalservicio2").modal("close");
            break;
          case 'servicio3':
            $("#modalservicio3").modal("close");
            break;
          case 'servicio1contrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modalservicio1contrarreferencia").modal("close");

            break;
          case 'servicio2contrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modalservicio2contrarreferencia").modal("close");
            break;
          case 'servicio3contrarreferencia':
            $scope.inactivebarradiag = true;
            $("#modalservicio3contrarreferencia").modal("close");
            break;
          case 'paremetriciontimerespuesta':
            $scope.inactivebarradiag = true;
            $("#modaldeparemetriciontimerespuesta").modal("close");
            break;
          default:
        }
      }
      $scope.resumenCantidad = function () {
        $http({
          method: 'POST',
          url: "php/referencia/registroReferencia/registrodereferencia.php",
          data: {
            function: 'obtenerCantidades',
            grupo: $scope.grupos
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.resumenCantidadesgeneral = response.data;
            // console.log($scope.resumenCantidadesgeneral);
          }
        });
      }
      $scope.Set_Tab = function (x, grupo) {
       console.log(grupo);
      //  console.log(x);
        $scope.grupos = grupo;
        $scope.Tabs = x;
        if (x == 1) {
          $scope.resumenCantidad(grupo);
          $scope.listarmotivoderechazoActivos();
        }
        if (x == 2) {
          $scope.listarmotivoderemisionActivos();
          $scope.limpiar('2');
        }
        if (x == 3) {
          // $scope.limpiar('6');
          $scope.listrefrenciasActivas();
          $scope.Obtener_Tipos_Documentos();
          $scope.resumenCantidad(grupo);
          $scope.listarmotivoderechazoActivos();
          // $('#tabs_3').click();
        }
        if (x == 4) {
          $scope.limpiar('4');
        }
        if (x == 5) {
          $scope.listarlistaResumen();
          // $scope.listrefrenciasActivas();
          $scope.resumenCantidad(grupo);
          $scope.listarmotivoderechazoActivos();
          $scope.userAbrir = false;
          $scope.motivosAbrir = false;
        }
        if (x == 6) {
          $scope.limpiar('6');
          $scope.validacionDocumento = grupo.DOCUMENTO;
          $scope.validacionStatus = grupo.NOMBRE_STATUS;
          if (grupo.DOCUMENTO == 'CONTRA REFERENCIA' && grupo.NOMBRE_STATUS == 'CERRADA') {
            swal({
              title: "Notificación",
              text: 'No se permiten gestionar una contrarreferencia cerrada',
              type: "warning"
            });
            setTimeout(() => {
              $scope.listrefrenciasActivas();
              $scope.filtrocheck_option.ESTADO = 'C';
            }, 1500);
          }
          if (grupo.DOCUMENTO == 'REFERENCIA' && grupo.NOMBRE_STATUS == 'CERRADA') {
            $http({
              method: 'POST',
              url: "php/referencia/registroReferencia/registrodereferencia.php",
              data: {
                function: 'validacion_contraReferencia',
                pcodigo: grupo.CODIGO
              }
            }).then(function (response) {
              if (response.data.CODIGO == '0') {
                swal({
                  title: "Notificación",
                  text: response.data.NOMBRE,
                  type: "warning",
                });
                setTimeout(() => {
                $scope.Set_Tab('3');
                  $scope.listrefrenciasActivas();
                  $scope.filtrocheck_option.ESTADO = 'C';
                }, 1500);
              } else {
                // swal({
                //   title: 'Cargando...',
                //   allowEscapeKey: false,
                //   allowOutsideClick: false
                // });
                // swal.showLoading();
                $scope.listarmotivodeRemision();
                $scope.codigoContrarreferencia = grupo.CODIGO;
                $scope.form4.tipoSolicitud = "CONTRARREFERENCIA";
                $scope.tipoSolicitud = "CF";
                $scope.epsReceptora = grupo.NIT_RECEPTORA;
                $http({
                  method: 'POST',
                  url: "php/referencia/registroReferencia/registrodereferencia.php",
                  data: {
                    function: 'obtenerAfiliados',
                    tipodocumento: grupo.TIPO_DOC,
                    documento: grupo.NUM_DOCUMENTO,
                    tiposolicitud: $scope.tipoSolicitud
                  }
                }).then(function (response) {
                  console.log(response);
                  if (response.data.CODIGO == 0) {
                    swal({
                      title: "Notificación",
                      text: response.data.NOMBRE,
                      type: "warning",
                    }).catch(swal.noop);
                    setTimeout(() => {
                      $scope.limpiar('6');
                      $scope.Set_Tab('3');
                      $scope.$apply();
                    }, 1000);
                  } else {
                    $scope.listarmotivoderemisionActivos();
                    $scope.form4.tipoDocumento = response.data.TipoDocumento,
                      $scope.form4.numeroDocumento = response.data.Documento,
                      $scope.form4.nombrePaciente = response.data.NombreCompleto,
                      $scope.form4.generoPaciente = response.data.Sexo,
                      $scope.form4.edadPaciente = response.data.EdadAnhos,
                      $scope.form4.nivelSisben = response.data.NIVEL,
                      $scope.form4.regimenPaciente = response.data.Regimen,
                      $scope.form4.codigoRegimen = response.data.CodigoRegimen,
                      $scope.form4.sexo = response.data.SexoCodigo,
                      $scope.form4.edad = response.data.EdadDias,
                      $scope.form4.seccionalPaciente = response.data.Departamento,
                      $scope.form4.codigoseccional = response.data.cod_municipio
                  }
                });
                $http({
                  method: 'POST',
                  url: "php/referencia/registroReferencia/registrodereferencia.php",
                  data: { function: 'obtenerNombreIps', ips: $scope.epsReceptora }
                }).then(function (response) {
                  // console.log(response);
                  swal.close();
                  $scope.form4.nombreIps = response.data[0].NOMBRE;
                  $scope.form4.nitIps = response.data[0].CODIGO;
                  $scope.form4.SeccionalIps = response.data[0].SECCIONAL;
                  $scope.form4.UbicacionIps = response.data[0].MUNICIPIO;
                })
              }
            })
          } else {
            setTimeout(() => {
              $scope.Set_Tab('3', grupo);
              $scope.$apply();
            }, 1200);
            swal({
              title: "Notificación",
              text: 'No se permiten gestionar una contrarreferencia',
              type: "warning"
            }).catch(swal.noop);
            return
          }
        }
      }
      $scope.formatTelefono = function (form, variable) {
        if ($scope[form][variable]) {
          const valor = $scope[form][variable].toString().replace(/[^0-9]/g, '');// (564) 564 - 4564
          $scope[form][variable] = valor;
          const input = $scope[form][variable].toString().replace(/\D/g, '').substring(0, 10); // 1234567890
          const zip = input.substring(0, 3);//123
          const middle = input.substring(3, 6);//456
          const last = input.substring(6, 10);//7890
          if (input.length > 6) { $scope[form][variable] = `(${zip}) ${middle} - ${last}`; }
          else if (input.length > 3) { $scope[form][variable] = `(${zip}) ${middle}`; }
          else if (input.length > 0) { $scope[form][variable] = `(${zip}`; }
          if (input.length >= 2 && zip.substring(0, 2).toString() != '60') {
            swal('Mensaje', 'El teléfono debe contener la siguiente estructura: (60) + el indicativo de la ciudad + el número del teléfono', 'info').catch(swal.noop);
          }
        } else { $scope[form][variable] = ''; }
      }
      $scope.Tab_motivos = function (x, motivo) {
        // console.log(x, motivo);
        $scope.listarmotivodeRemision(motivo);
        $scope.Tabsmotivos = x;
        setTimeout(() => {
          $scope.$apply();
        }, 500);
      }
      $scope.FormatSoloNumero = function (NID) {
        const input = document.getElementById("" + NID + "");
        var valor = input.value;
        valor = valor.replace(/[^0-9]/g, "");
        input.value = valor;
      }
      /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
      $scope.filtro_tabs = function () {
        var datos = []
        if ($scope.filtrocheck_option && $scope.filtrocheck_option.ESTADO) {
          // if(fil == 1){
          //   $scope.filtrocheck_option.DOCUMENTO == '';
          //   $scope.filtrocheck_option.ESTADO == 'A';

          // }
          $scope.Vista1_datos.forEach(element => {
            //estado si - documento no
            if (($scope.filtrocheck_option.ESTADO && $scope.filtrocheck_option.DOCUMENTO == '') && (element.ESTADO == $scope.filtrocheck_option.ESTADO)) {
              datos.push(element)
            }
            //estado no - documento si
            if (($scope.filtrocheck_option.ESTADO == '' && $scope.filtrocheck_option.DOCUMENTO) && (element.DOCUMENTO == $scope.filtrocheck_option.DOCUMENTO)) {
              datos.push(element)
            }
            //estado si - documento si
            if (($scope.filtrocheck_option.ESTADO && $scope.filtrocheck_option.DOCUMENTO) &&
              (element.DOCUMENTO == $scope.filtrocheck_option.DOCUMENTO && element.ESTADO == $scope.filtrocheck_option.ESTADO)) {
              datos.push(element)
            }
          });
        }
        setTimeout(() => {
          $scope.list_DatosTemp = datos
          $scope.configPages();
          $scope.$apply();
        }, 1000);
      }
      $scope.chg_filtrar = function (varFiltro) {
        // console.log(varFiltro);
        $scope.list_DatosTemp = $filter('filter')($scope.Vista1_datos, $scope.Vista1[varFiltro]);
        $scope.configPages();
      }
      $scope.initPaginacion = function (info) {
        $scope.list_DatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
        $scope.Vista1.Mostrar_Sol = 10;
      }
      $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
          $scope.pageSize = $scope.list_DatosTemp.length;
          $scope.valmaxpag = $scope.list_DatosTemp.length;
        } else {
          $scope.pageSize = valor;
          $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
            if (($scope.pageSize * 10) < $scope.list_DatosTemp.length) {
              fin = 10;
            } else {
              fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
            }
          }
          else { fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize); }
        } else {
          if (ini >= Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.list_DatosTemp.length / $scope.pageSize);
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
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
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
          if ($scope.list_DatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.list_DatosTemp.length / $scope.pageSize) + 1;
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
      // funcion para contar cada caracter de de una observacion
      $scope.handleKeyPress = function (e, form) {
        // console.log(e, form);
        if ($scope[form].observaciones == null || $scope[form].observaciones == undefined || $scope[form].observaciones == '') { $scope.count = 0; }
        if ($scope[form].observaciones.length < $scope.count) { $scope.count = $scope[form].observaciones.length }
        else ($scope[form].observaciones.length > $scope.count)
        { $scope.count = $scope[form].observaciones.length }
        if (e.keyCode == 8) {
          if ($scope.count == 0) {
            $scope.count = 0;
          }
          else {
            $scope.count = $scope.count - 1;
          }
        } else {
          $scope.count = $scope.count + 1;
        }
      }
      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }
      $(document).ready(function () {
        $('.tooltipped').tooltip({ delay: 50 });
      });
    }])
  .directive('textUpper', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ngModelCtrl) {
        function fromUser(text) {
          if (text) {
            var transformedInput = text.toString().toUpperCase();

            if (transformedInput !== text) {
              ngModelCtrl.$setViewValue(transformedInput);
              ngModelCtrl.$render();
            }
            return transformedInput;
          }
          return undefined;
        }
        ngModelCtrl.$parsers.push(fromUser);
      }
    };
  }).filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  });
