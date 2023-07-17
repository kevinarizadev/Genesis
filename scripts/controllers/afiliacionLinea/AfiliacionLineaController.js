angular.module('GenesisApp')
  .controller('AfiliacionLineaController', ['$scope', '$http', 'ngDialog', 'afiliacionHttp', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', 'validationParams', '$rootScope', '$localStorage', '$window', 'consultaHTTP',
    function ($scope, $http, ngDialog, afiliacionHttp, notification, $timeout, $q, upload, communication, $controller, validationParams, $rootScope, $localStorage, $window, consultaHTTP) {
      //var $scope = this;
      $(function () {
        //$scope.Fechaprocesado = new Date();
        $("#subirl").hide();
        // El nombre de la clase del campo select en donde aplicaremos el autocompletado
        $('.chosen-eps').chosen();
        // Simple acción para deseleccionar
        $('.chosen-eps-deselect').chosen({
          allow_single_deselect: true
        });
      });

      $scope.Inicio = function () {
        $scope.SysDay = new Date();
        $('#modal12').modal();
        $("#mysexo").prop('disabled', true);
        $("#mysexo").addClass("disabled");
        $("#qrcedula").focus();
        getParametersUser();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');

        $scope.iptDigitInfoBasica = true;
        var bis = "";
        var saved = "false";
        $scope.inactive2 = true;
        $scope.saveVisibility = false;
        $scope.reporte = true;
        $scope.inactive3 = true;
        $scope.inactive4 = true;
        $scope.inactive5 = true;
        $scope.ips = true;
        $scope.ips = true;
        $scope.paneles = false;
        $scope.isAttachButton = true;
        $scope.enableBTNFOSYGA = true;
        $scope.pistola = true;
        $scope.qrcedula = "";
        $scope.codigob = false;
        $scope.validaButtonText = "Validar";
        $scope.validaButtonGuardar = "Guardar";
        $scope.validaButtonAdjuntar = "Subir";
        $scope.fosygaButtonText = "Adres";
        $scope.infoadjuntar = true;
        $scope.textupdate;
        $scope.isbeneficiario = true;
        $scope.tipo_documento = "";
        $scope.documento = "";
        $scope.documento_CN = "";
        $scope.fichasisben = "";
        // $scope.subirdocumento=true;

        $scope.filtro = {
          selecttramite: "",
          selectmetodogpoblacional: "",
          selectpoblacional: "",
          selectgruposisben: "",
          selectsubgruposisben: "",
          municipio: "0",
          selectdocumento: "",
          selectregimen: "",
          selectsexo: "",
          selectetnia: "",
          selectdiscapacidad: "",
          selectcondicion: "",
          complemento: "",
          numeroNVG: "",
          numeroplaca: "",
          numeroN: "",
          selectLetra: "x",
          selectLetraVG: "x",
          selectViap: "",
          selectnumero: "",
          selectcuadrante: "x",
          selectcuadranteVG: "x",
          selectZona: "x",
          escenario: "x",
          anexo: "",
          bis: false,
          selectlocalidad: "",
          selectdocumento_CN: "CN"
        };

        $scope.fechaprocesado = null;
        $scope.mostrar_sisbeniii = false;
        $scope.mostrar_sisbeniv = false;
        $scope.hoja2_dsb = false;


        $scope.obtenerTramite();
        // $scope.obtenerRegimen();
        $scope.obtenerSexo();
        $scope.obtenergrupoSisben();
        // $scope.obtenerEscenario();
        $scope.obtenerEtnia();
        $scope.obtenerDiscapacidad();
        $scope.obtenerMunicipio();
        $scope.obtenerZona();
        $scope.obtenerLetra();
        $scope.obtenerCuadrante();
        $scope.obtenerNumero();
        $scope.obtenerViaPrincipal();
        $scope.obtenerCondicion();

        setTimeout(function () { $scope.$apply(); }, 1500);


        document.querySelectorAll('input').forEach(function (e) {
          e.autocomplete = 'off';
        });


      }

      $scope.clear = function () {
        saved = "false";
        $scope.iptDigitInfoBasica = true;
        $scope.disSisben = false;
        $scope.disPuntaje = false;
        $scope.disFicha = false;
        $scope.saveVisibility = false;
        $scope.btnFosyga = false;
        $scope.btnValidar = false;
        $scope.isAttachButton = true;
        communication.data.estado = false;
        $scope.reporte = true;
        $scope.mostrar_sisbeniii = false;
        $scope.mostrar_sisbeniv = false;
        $("#qrcedula").focus();
        $scope.radicado = "";
        $scope.ips = false;
        $scope.saved = false;
        $scope.primer_nombre = "";
        $scope.segundo_nombre = "";
        $scope.primer_apellido = "";
        $scope.segundo_apellido = "";
        $scope.nacimiento = "";
        $scope.qrcedula = "";
        $scope.qrnumero = "";
        $scope.qrprimer_nombre = "";
        $scope.qrsegundo_nombre = "";
        $scope.qrprimer_apellido = "";
        $scope.qrsegundo_apellido = "";
        $scope.qrsexo = "";
        $scope.qrfecha = "";
        $scope.inactive2 = true;
        $scope.inactive3 = true;
        $scope.inactive4 = true;
        $scope.inactive5 = true;
        $scope.qrtipo_sangre = "";
        $scope.qrnit = "";
        $scope.numeroN = "";
        $scope.tipo_documento = "";
        $scope.documento_CN = "";
        $scope.correo = "";
        $scope.celular = "";
        $scope.telfijo = "";
        $scope.direccion = "";
        $scope.localidad = "";
        $scope.sisben = "";
        $scope.puntajesisben = "";
        $scope.fichasisben = "";
        $scope.isbeneficiario = true;
        delete $localStorage.communication;
        delete $localStorage.cabeza;
        delete $localStorage.beneficiario;
        delete $localStorage.municipio;
        delete $localStorage.docC;
        delete $localStorage.municipiof;
        delete $localStorage.entidadf;
        $scope.filtro = {
          selecttramite: "",
          selectdocumento: "",
          selectregimen: "",
          selectsexo: "",
          selectetnia: "",
          selectdiscapacidad: "",
          selectcondicion: "",
          selectpoblacional: "",
          selectgruposisben: "",
          selectsubgruposisben: "",
          municipio: "",
          complemento: "",
          numeroNVG: "",
          numeroplaca: "",
          numeroN: "",
          selectLetra: "",
          selectLetraVG: "",
          selectViap: "",
          selectnumero: "",
          selectcuadrante: "",
          selectcuadranteVG: "",
          selectZona: "",
          escenario: "",
          anexo: "",
          selecttramite: "",
          bis: false,
          selectdocumento_CN: "CN"
        };
      }

      function getParametersUser() {
        $.getJSON("php/obtenersession.php")
          .done(function (respuesta) {
            $scope.sesdata = respuesta;
            $scope.nomusu = $scope.sesdata.usu;
            $scope.pasusu = $scope.sesdata.acc;
            // if ($scope.sesdata.rolcod == "41") {
            //   $scope.dsb_fecha_afiliacion = false;
            // } else {
            //   $scope.dsb_fecha_afiliacion = true;
            // $scope.fechaprocesado = new Date();
            $scope.sysdate = new Date();
            // }
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("ERRVR555");
          });
      }

      // *** FUNCION EFECTO CARGUE ***
      function loadingButton(type) {
        switch (type) {
          case "valida":
            $scope.enable = "false";
            var $icon = $(this).find(".icon-arrows-cw"),
              animateClass = "icon-refresh-animate";
            $icon.addClass(animateClass);
            $scope.validaButtonText = "Validando";
            $timeout(function () {
              $scope.enable = "true";
              $scope.validaButtonText = "Validar";
            }, 2000);
            break;
          case "guarda":
            $scope.enable = "false";
            var $icon = $(this).find(".icon-arrows-cw"),
              animateClass = "icon-refresh-animate";
            $icon.addClass(animateClass);
            $scope.validaButtonGuardar = "Guardando...";
            $timeout(function () {
              $scope.enable = "true";
              $scope.validaButtonGuardar = "";
            }, 2000);
            break;
          case "subir":
            $scope.infoadjuntar = "false";
            var $icon = $(this).find(".icon-arrows-cw"),
              animateClass = "icon-refresh-animate";
            $icon.addClass(animateClass);
            $scope.validaButtonAdjuntar = "Subiendo";
            $("#subirl").show();
            $timeout(function () {
              $("#subirl").hide();
              $scope.infoadjuntar = "true";
              $scope.validaButtonAdjuntar = "Subir";
            }, 2000);
            break;
          case "fosyga":
            $scope.enable = "false";
            var $icon = $(this).find(".icon-arrows-cw"),
              animateClass = "icon-refresh-animate";
            $icon.addClass(animateClass);
            $scope.fosygaButtonText = "Cargando";
            $timeout(function () {
              $scope.enable = "true";
              $scope.fosygaButtonText = "Adres";
            }, 40000);
            break;
          default:

        }
      }

      // *** LLAMADA AL SERVICIO DE RENTEC ***
      $scope.rentecService = function () {
        //si hay servicio haga esto variables de rentec
        /*$scope.fosyga = {
        primer_nombre:"",
        segundo_nombre : "",
        primer_apellido : "",
        segundo_apellido : "",
        tipo_documento : "",
        numero_documento : "",
        sexo : "",
        fecha_nacimiento : ""
      };*/
        //sino haga esto

        $scope.fosyga = {
          primer_nombre: $scope.primer_nombre,
          segundo_nombre: $scope.segundo_nombre,
          primer_apellido: $scope.primer_apellido,
          segundo_apellido: $scope.segundo_apellido,
          tipo_documento: $scope.filtro.selectdocumento,
          numero_documento: $scope.documento,
          sexo: $scope.filtro.selectsexo,
          fecha_nacimiento: $scope.nacimiento
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
            $scope.Documentos = response.data;
            $scope.filtro.selectdocumento = '';
            setTimeout(function () { $scope.$apply(); }, 500);
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

      $scope.validarLongitudTipoDoc = function () {
        if ($scope.filtro.selectdocumento && $scope.documento){
          var x = $scope.Tipos_Documentos.find(e => e.CODIGO == $scope.filtro.selectdocumento);
          if (x != -1){
            if( $scope.documento.toString().length < x.VMIN || $scope.documento.toString().length > x.VMAX ){
              $scope.documento = '';
              const mensaje = "Revise la longitud del numero del documento. Min: "+x.VMIN+", Max:"+x.VMAX;
              swal("¡Mensaje!", mensaje, "info").catch(swal.noop);
              setTimeout(() => { $scope.$apply(); }, 500);
            }
          }
        }
      }

      $scope.validarLongitudTipoDoc_CN = function () {
        if (!$scope.documento_CN){return;}
        if ($scope.documento_CN.toString().length < 9 || $scope.documento_CN.toString().length > 14) {
          $scope.documento_CN = '';
          const mensaje = "Revise la longitud del numero del documento CN. Min: " + 9 + ", Max:" + 14;
          swal("¡Mensaje!", mensaje, "info").catch(swal.noop);
          setTimeout(() => { $scope.$apply(); }, 500);
        }
      }

      // *** LISTAS DE DATOS ***

      $scope.obtenerAnexo2 = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenerdocumentoanexo' }
        }).then(function (response) {
          $scope.Anexos = response.data;
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error').catch(swal.noop);
        });
      }

      $scope.obtenerTramite = function () {
        afiliacionHttp.obtenerTramite().then(function (response) {
          $scope.Tramites = response;
        })
      }

      $scope.obtenerRegimen = function () {
        afiliacionHttp.obtenerRegimen().then(function (response) {
          $scope.Regimenes = response;
        })
      }

      $scope.obtenerSexo = function () {
        afiliacionHttp.obtenerSexo().then(function (response) {
          $scope.Sexos = response;
        })
      }

      $scope.obtenerEtnia = function () {
        afiliacionHttp.obtenerEtnia().then(function (response) {
          $scope.Etnias = response;
        })
      }

      $scope.obtenerDiscapacidad = function () {
        afiliacionHttp.obtenerDiscapacidad().then(function (response) {
          $scope.Discapacidades = response;
        })
      }

      $scope.obtenerCondicion = function () {
        afiliacionHttp.obtenerCondicion().then(function (response) {
          $scope.Condiciones = response;

        })
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

      $scope.CalcularSubgrupoSisben = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenersubgruposisbeniv', tipo: $scope.filtro.selectgruposisben }
        }).then(function (response) {
          $scope.Listado_SubGrupoSisben = response.data;
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error').catch(swal.noop);
        });
      }

      $scope.obtenerGrupoPoblacional = function () {
        $scope.Listado_Gpoblacional = [];
        // $scope.filtro.selectpoblacional = '';
        $scope.filtro.selectgruposisben = '';
        $scope.filtro.selectsubgruposisben = '';
        $scope.filtro.selectcausalafi_oficio = '';
        $scope.fichasisben = '';
        $scope.puntajesisben = '';
        $scope.sisben = '';
        $scope.mostrar_Listado_Gpoblacional_31 = false;
        //
        $scope.filtro.selectmetodogpoblacional == '1' ? $scope.mostrar_sisbeniii = true : $scope.mostrar_sisbeniii = false;
        $scope.filtro.selectmetodogpoblacional == '2' ? $scope.mostrar_sisbeniv = true : $scope.mostrar_sisbeniv = false;
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obteneragrupoPoblacional', metodo: $scope.filtro.selectmetodogpoblacional }
        }).then(function (response) {
          $scope.filtro.selectpoblacional = '';
          $scope.Listado_Gpoblacional = response.data;
          setTimeout(function () { $scope.$apply(); }, 500);
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error').catch(swal.noop);
        });
        // $http({
        //   method: 'POST',
        //   url: "php/aseguramiento/Rafiliacion.php",
        //   data: { function: 'obteneragrupoPoblacional' }
        // }).then(function (response) {
        //   $scope.Gpoblacional = response.data;
        // }, function errorCallback(response) {
        //   swal('Mensaje', response.data, 'error')
        // });
      }

      $scope.CalcularGpoblacional = function () {
        if ($scope.filtro.selectpoblacional == '31') {
          $scope.mostrar_Listado_Gpoblacional_31 = true;
          $scope.Listado_Gpoblacional_31 = [
            { "CODIGO": "O", "NOMBRE": 'AFILIACION DE OFICIO SIN ENCUESTA NI POBLACION' },
            { "CODIGO": "A", "NOMBRE": 'AFILIACION DE OFICIO CON SISBEN NIVEL 1' },
            { "CODIGO": "B", "NOMBRE": 'AFILIACION DE OFICIO CON SISBEN NIVEL 2' },
            { "CODIGO": "C", "NOMBRE": 'AFILIACION DE OFICIO POBLACION ESPECIAL' }
          ]
        } else {
          $scope.mostrar_Listado_Gpoblacional_31 = false;
        }
      }

      $scope.validar_datos2 = function () {
        if (document.querySelector('#etnia').selectedIndex == 0) {
          swal('Información', 'Debe seleccionar la Etnia.', 'info'); return;
        }
        if (document.querySelector('#discapacidad').selectedIndex == 0) {
          swal('Información', 'Debe seleccionar la Discapacidad.', 'info'); return;
        }
        if (document.querySelector('#discapacidad').selectedIndex != 0 && document.querySelector('#discapacidad').selectedIndex != 1) {
          if (document.querySelector('#condicion').selectedIndex == 0) {
            swal('Información', 'Debe seleccionar la Condicion.', 'info'); return;
          }
        }
        if ($scope.filtro.selectmetodogpoblacional == '' || $scope.filtro.selectmetodogpoblacional == null) {
          swal('Información', 'Debe seleccionar la Metodologia Grupo Poblacional.', 'info'); return;
        }
        if ($scope.filtro.selectmetodogpoblacional == '1') { //SISBEN III
          if ($scope.fichasisben == '' || $scope.fichasisben == null) {
            swal('Información', 'Debe digitar la Ficha de SISBEN.', 'info'); return;
          }
          if ($scope.filtro.selectpoblacional == '' || $scope.filtro.selectpoblacional == null) {
            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
          }
          if ($scope.sisben == '' || $scope.sisben == null) {
            swal('Información', 'Debe digitar el Nivel del SISBEN.', 'info'); return;
          }
          if ($scope.puntajesisben == '' || $scope.puntajesisben == null) {
            swal('Información', 'Debe digitar el Nivel del SISBEN', 'info'); return;
          }
        }
        if ($scope.filtro.selectmetodogpoblacional == '2') { //SISBEN IV
          if ($scope.fichasisben == '' || $scope.fichasisben == null) {
            swal('Información', 'Debe digitar la Ficha de SISBENIV.', 'info'); return;
          }
          if ($scope.fichasisben.length != 20) {
            swal('Información', 'La Ficha de SISBENIV debe contener 20 digitos.', 'info'); return;
          }
          if ($scope.filtro.selectpoblacional == '' || $scope.filtro.selectpoblacional == null) {
            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
          }
          if ($scope.filtro.selectgruposisben == '' || $scope.filtro.selectgruposisben == null) {
            swal('Información', 'Debe seleccionar el Grupo de SISBEN IV.', 'info'); return;
          }
          if ($scope.filtro.selectsubgruposisben == '' || $scope.filtro.selectsubgruposisben == null) {
            swal('Información', 'Debe seleccionar el Subgrupo de SISBEN IV.', 'info'); return;
          }
        }
        if ($scope.filtro.selectmetodogpoblacional == '3') { //Listado Censales
          if ($scope.filtro.selectpoblacional == '' || $scope.filtro.selectpoblacional == null) {
            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
          }
        }
        if ($scope.filtro.selectmetodogpoblacional == '4') { //Afiliacion Oficio
          if ($scope.filtro.selectpoblacional == '' || $scope.filtro.selectpoblacional == null) {
            swal('Información', 'Debe seleccionar el Grupo Poblacional.', 'info'); return;
          }
          if ($scope.filtro.selectpoblacional == '31') {
            if ($scope.filtro.selectcausalafi_oficio == '' || $scope.filtro.selectcausalafi_oficio == null) {
              swal('Información', 'Debe seleccionar causal de afiliacion de oficio.', 'info'); return;
            }
          }
        }
        $scope.inactive3 = false;
        $scope.hoja2_dsb = true;
      }

      $scope.obtenerEscenario = function () {
        if ($scope.filtro.municipio == "0" || $scope.filtro.municipio == "" || $scope.filtro.municipio == "  " || $scope.filtro.municipio == "") { $scope.ips = true; } else { $scope.ips = false; }
        $scope.parametersMunicipo = { municipio: $scope.filtro.municipio, type: "list", value: "" }
        if ($scope.filtro.municipio != "0" && $scope.filtro.municipio != "? undefined:undefined ?" && $scope.filtro.municipio != "" && $scope.filtro.municipio != "  " && $scope.filtro.municipio != "") {
          $scope.filtro.selectZona = '';
          $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: { function: 'obtenerescenarios', municipio: $scope.filtro.municipio }
          }).then(function (response) {
            $scope.Escenarios = response.data;
            $scope.filtro.escenario = '';
            setTimeout(function () { $scope.$apply(); }, 500);
          }, function errorCallback(response) {
            swal('Mensaje', response.data, 'error')
          });
          $scope.mostrar4();
        }
      }

      $scope.obtenerMunicipio = function () {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenermunicipio' }
        }).then(function (response) {
          $scope.Municipio = response.data;
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      $scope.obtenerViaPrincipal = function () {
        afiliacionHttp.obtenerViaPrincipal().then(function (response) {
          $scope.viaprincipal = response;
        })
      }

      $scope.obtenerLetra = function () {
        afiliacionHttp.obtenerLetra().then(function (response) {
          var x = [];
          response.Letra.forEach(e => {
            x.push({ 'Codigo': e.Codigo, 'Nombre': e.Nombre })
          });
          $scope.letras = x;
        })
      }

      $scope.obtenerNumero = function () {
        afiliacionHttp.obtenerNumero().then(function (response) {
          $scope.Numeros = response;
        })
      }

      $scope.obtenerCuadrante = function () {
        afiliacionHttp.obtenerCuadrante().then(function (response) {
          var x = [];
          response.Cuadrante.forEach(e => {
            x.push({ 'Codigo': e.Codigo, 'Nombre': e.Nombre })
          });
          $scope.Cuadrantes = x;
        })
      }

      $scope.ObtenerDetalle = function () {
        $scope.subirdocumento = true;
        if (($scope.filtro.municipio != "0" && $scope.filtro.municipio != "? undefined:undefined ?" && $scope.filtro.municipio != "" && $scope.filtro.municipio != "  " && $scope.filtro.municipio != "") && ($scope.filtro.escenario != "0" && $scope.filtro.escenario != "" && $scope.filtro.escenario != "  " && $scope.filtro.escenario != "")) {
          $http({
            method: 'POST',
            url: "php/aseguramiento/Rafiliacion.php",
            data: { function: 'obtenerescenariosdetalle', municipio: $scope.filtro.municipio, escenario: $scope.filtro.escenario }
          }).then(function (response) {
            $scope.subirdocumento = false;
            $scope.reporte = false;
            $scope.modalBody = response.data["0"].DESCRIPCION;
            $scope.modalHeader = response.data["0"].NOMBRE;

          }, function errorCallback(response) {
            swal('Mensaje', response.data, 'error')
          });
        }
      }

      $scope.obtenerZona = function () {
        afiliacionHttp.obtenerZona().then(function (response) {
          $scope.Zonas = response;
          $scope.filtro.selectZona = '';
          setTimeout(function () { $scope.$apply(); }, 500);
        })
      }

      $scope.stateAttach = function () {
        if ($scope.filtro.anexo == "" || $scope.filtro.anexo == "SELECCIONAR") {
          $scope.infoadjuntar = true;
        } else {
          $scope.infoadjuntar = false;
        }
      }
      function formatDate(date) {
        if (String(date).length > 10) {
          var month = date.getMonth() + 1;
          month = (month < 10) ? '0' + month : month;
          date = date.getDate() + "/" + month + "/" + date.getFullYear();
          return date;
        } else {
          return date;
        }

      }
      function SetformatDate(year, month, day) {
        $scope.nacimiento.setDate() = day;
        $scope.nacimiento.setUTCMonth() = month;
        $scope.nacimiento.setFullYear() = year;
      }

      $scope.obtenerdatos = function () {
        $scope.filtro.selectregimen = "S";
        $scope.codigob = true;
        $scope.filtro.selectdocumento = $scope.qrcedula;
        if ($scope.qrcedula.length > 0) {
          var z = $scope.qrcedula;
          var tipodocuc = tipodocumento(z);
          $(function () {
            $("#tipo_doc").val(z);
          });
          document.getElementById("tipo_doc").selectedIndex = tipodocuc;
        }
        $scope.documento = $scope.qrnumero;
        $scope.primer_apellido = $scope.qrprimer_apellido;
        $scope.segundo_apellido = $scope.qrsegundo_apellido;
        $scope.primer_nombre = $scope.qrprimer_nombre;
        $scope.segundo_nombre = $scope.qrsegundo_nombre;
        if ($scope.qrsexo == "M") {
          var h = $scope.qrsexo;
          $(function () {
            $("#sexoCabeza").val(h);
          });
          $scope.filtro.selectsexo = "M";
          document.getElementById("sexoCabeza").selectedIndex = 1;
        } else {
          var h = $scope.qrsexo;
          $(function () {
            $("#sexoCabeza").val(h);
          });
          $scope.filtro.selectsexo = "F";
          document.getElementById("sexoCabeza").selectedIndex = 2;
        }
        $scope.nacimiento = new Date($scope.qrfecha.substring(0, 4), $scope.qrfecha.substring(4, 6) - 1, $scope.qrfecha.substring(6, 8));
      }

      $scope.form = function () {
        $scope.isAttachButton = true;
        saved = "false";
        $scope.inactive2 = true;
        $scope.inactive3 = true;
        $scope.inactive4 = true;
        $scope.inactive5 = true;
        $scope.btnValidar = false;
      }

      $scope.valorCondicion = function () {
        if ($scope.filtro.selectdiscapacidad == "") {
          $scope.filtro.selectcondicion = "";
          $scope.disDiscapacidad = true;
        } else {
          $scope.disDiscapacidad = false;
        }
      }

      // *** FUNCION VALIDA INFORMACION DEL AFILAIDO ***
      $scope.poblacionSisben = function () {
        if ($scope.filtro.selectpoblacional == "1" || $scope.filtro.selectpoblacional == "6" ||
          $scope.filtro.selectpoblacional == "8" || $scope.filtro.selectpoblacional == "9" ||
          $scope.filtro.selectpoblacional == "11" || $scope.filtro.selectpoblacional == "14" ||
          $scope.filtro.selectpoblacional == "17" || $scope.filtro.selectpoblacional == "22" ||
          $scope.filtro.selectpoblacional == "24" || $scope.filtro.selectpoblacional == "26") {
          $scope.disSisben = true;
          $scope.disPuntaje = true;
          $scope.disFicha = true;
          $scope.sisben = 0;
          $scope.puntajesisben = 0;
          $scope.fichasisben = null;
          $scope.inactive3 = false;
        } else if ($scope.filtro.selectpoblacional == "27") {
          if ($scope.filtro.selectdocumento == "CN" || $scope.filtro.selectdocumento == "RC" || $scope.filtro.selectdocumento == "TI" || $scope.filtro.selectdocumento == "MS") {
            $scope.disSisben = true;
            $scope.disPuntaje = true;
            $scope.disFicha = true;
            $scope.sisben = '0';
            $scope.puntajesisben = 0;
            $scope.fichasisben = 0;
            $scope.inactive3 = false;
          } else {
            $scope.filtro.selectpoblacional = document.getElementById("poblacion").value;
            $(function () {
              $("#poblacion").val(5);
            });
            $scope.filtro.selectpoblacional = "5";
            swal('Notificacion', 'Documento No Valido Para El Grupo Poblacional', 'info');
          }
        } else if ($scope.filtro.selectpoblacional == "31") {
          $scope.disSisben = true;
          $scope.disPuntaje = true;
          $scope.disFicha = true;
          $scope.sisben = '0';
          $scope.puntajesisben = 0;
          $scope.fichasisben = 0;
          $scope.inactive3 = false;
          document.getElementById('selectcuadranteVG').value = '';
          $scope.filtro.selectLetra = '';
          $scope.filtro.selectLetraVG = '';
          $scope.filtro.selectcuadrante = '';
          $scope.filtro.selectcuadranteVG = '';
          setTimeout(function () { $scope.$apply(); }, 500);
        }

        else {
          $scope.disSisben = false;
          $scope.disPuntaje = false;
          $scope.disFicha = false;
          $scope.sisben = "";
        }
      }


      $scope.changeTramite = function () {
        if ($scope.filtro.selecttramite == "C") {
          $scope.isbeneficiario = true;
          $scope.btnFosyga = false;
          $scope.iptDigitInfoBasica = false;
        } else {
          $scope.btnFosyga = true;
          $scope.isAttachButton = true;
          $scope.iptDigitInfoBasica = true;
        }

        $scope.inactive2 = true;
        $scope.inactive3 = true;
        $scope.inactive4 = true;
        $scope.inactive5 = true;
        $("#qrcedula").focus();
      }

      $scope.mostrar3 = function () {
        if ($scope.sisben == "" || $scope.sisben == undefined) {
          $scope.inactive3 = true;
        } else { $scope.inactive3 = false }
      }

      $scope.mostrar4 = function (z) {
        if (z != "? undefined:undefined ?" && z) {
          if (z == 'U' || z == 'R') {
            $scope.inactive5 = false;
          } else {
            $scope.inactive5 = true;
          }
        }
        // if ($scope.filtro.selectViap != "" && $scope.filtro.numeroN != "") {
        //   $scope.inactive5 = false;
        // } else { $scope.inactive5 = true }
      }

      $scope.mostrar5 = function () {
        if ($scope.filtro.selecttramite == 'C') {
          if ($scope.Escenarios && $scope.filtro.escenario != "") {
            $scope.inactive4 = false;
          } else {
            $scope.inactive4 = true;
          }
        } else {
          $scope.inactive4 = false;
        }
      }

      $scope.nextStep2Afiliacion = function () {
        var segnombre = $scope.segundo_nombre == undefined ? "" : $scope.segundo_nombre.toUpperCase();
        var segapellido = $scope.segundo_apellido == undefined ? "" : $scope.segundo_apellido.toUpperCase();

        if ($scope.filtro.selecttramite == "C") {
          $scope.parameters = {
            tipo_documento: $scope.filtro.selectdocumento,
            documento: $scope.documento,
            primer_nombre: $scope.primer_nombre.toUpperCase(),
            segundo_nombre: segnombre,
            primer_apellido: $scope.primer_apellido.toUpperCase(),
            segundo_apellido: segapellido,
            nacimiento: formatDate($scope.nacimiento),
            dia: $scope.nacimiento.getDate(),
            mes: $scope.nacimiento.getUTCMonth() + 1,
            ano: $scope.nacimiento.getFullYear()
          }
          setTimeout(function () {
            $scope.$apply();
          }, 500);
        } else {
          $scope.parameters = {
            tipo_documento: $scope.filtro.selectdocumento,
            documento: $scope.documento
          }
        }

        // setTimeout(function () {
        //   $scope.obtenerEscenario();
        // }, 500);

        // Valida que los datos del FOSYGA sean revisados
        if ($scope.can_validate == false) {
          swal('Advertencia', 'Para continuar con la afiliación debe verificar e ingresar los datos de ADRES del afiliado.', 'warning');
          //notification.getNotification('info', 'Verificar datos del FOSYGA', 'Notificacion');
        } else {
          $scope.ips = true;
          // $controller('anexoscontroller', {
          //   $scope: $scope
          // });
          // $scope.getParameterst($scope.filtro.selectdocumento, $scope.documento);
          $scope.filtro.selectdiscapacidad = "NN";
          $scope.filtro.selectcondicion = "N";
          document.getElementById("poblacion").selectedIndex = "11";
          $scope.filtro.selectpoblacional = document.getElementById("poblacion").value;
          $(function () {
            $("#poblacion").val(5);
          });
          if ($scope.filtro.selecttramite == "B") {
            $http({
              method: 'POST',
              url: "php/aseguramiento/Rafiliacion.php",
              data: {
                function: 'validarAfiliadoCabeza',
                tipodoc: $scope.parameters.tipo_documento,
                documento: $scope.parameters.documento
              }
            }).then(function (response) {
              swal.close();
              switch (response.data.codigo) {
                case 1:
                  swal('Advertencia', response.data.mensaje, 'warning');
                  break;
                case 0:
                  $scope.pistola = true;
                  $scope.mostrar5()
                  $scope.isbeneficiario = false;
                  $scope.isAttachButton = true;
                  $scope.reporte = false;
                  // $scope.btnValidar = true;
                  //$scope.AgregarBeneficiario();
                  $scope.ConsultaNucleo();
                  break;
                default:
                  swal('Advertencia', 'Se presento un error al consultar al afiliado', 'warning');
              }
            }, function errorCallback(response) {
              swal('Mensaje', response.data, 'error')
            });
          } else {
            $http({
              method: 'POST',
              url: "php/aseguramiento/Rafiliacion.php",
              data: {
                function: 'validarafiliacion',
                tipodoc: $scope.parameters.tipo_documento,
                documento: $scope.parameters.documento,
                primernombre: $scope.parameters.primer_nombre,
                segundonombre: $scope.parameters.segundo_nombre,
                primerapellido: $scope.parameters.primer_apellido,
                segundoapellido: $scope.parameters.segundo_apellido,
                fecnacimiento: $scope.parameters.nacimiento
              }
            }).then(function (response) {
              var datos = response.data.split("-");
              var rescod = datos[0];
              var resmsg = datos[1];
              swal.close();
              if (rescod == $CODE_ERROR) {
                //swal('Notificación - Multiafiliación',resmsg, 'warning');
                $scope.inactive3 = true;
                $scope.inactive4 = true;
                $scope.inactive5 = true;
                $scope.multi_afil = '';
                swal({
                  title: 'Notificación - Multiafiliación',
                  text: resmsg,
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Continuar',
                  cancelButtonText: 'Cancelar'
                }).then(function (result) {
                  if (result) {
                    $scope.inactive2 = false;
                    $scope.multi_afil = 'PV';
                  }
                }, function (dismiss) {
                  if (dismiss == "cancel") {
                    $scope.inactive2 = true;
                  }
                })
              } else {
                $scope.inactive2 = false;
                $scope.pistola = true;
                $scope.mostrar3();
                $scope.mostrar4();
                $scope.mostrar5();
                $scope.isbeneficiario = true;
              }
              // afiliacionHttp.serviceFDC($scope.filtro.selectdocumento, $scope.documento, 'ObtenerSisben').then(function (response) {
              //   var sisben = response.data;
              //   $scope.sisben = sisben.Nivel;
              //   $scope.puntajesisben = sisben.Puntaje;
              //   $scope.fichasisben = sisben.Ficha;
              //   $scope.filtro.municipio = sisben.CodigoMunicipio;
              //   $scope.validaSisben();
              // });
            }, function errorCallback(response) {
              swal('Mensaje', response.data, 'error')
            });
          }

        }
      }

      $scope.validaform = function () {
        //loadingButton("valida");
        $scope.hoja2_dsb = false;
        $scope.filtro.selectmetodogpoblacional = '';
        $scope.filtro.selectgruposisben = '';
        $scope.filtro.selectsubgruposisben = '';
        $scope.filtro.selectpoblacional = '';
        $scope.filtro.selectcausalafi_oficio = '';
        $scope.mostrar_Listado_Gpoblacional_31 = false;
        setTimeout(function () { $scope.$apply(); }, 500);

        if ($scope.fechaprocesado != null && $scope.fechaprocesado != undefined) {

          swal({
            title: 'Validando..'
          });
          if ($scope.filtro.selecttramite == "B") {
            if ($scope.filtro.selectdocumento == "" || $scope.documento == "" || $scope.documento === undefined) {
              swal('Información', 'Para agregar un beneficiario debe ingresar tipo y número de documento del cabeza de familia', 'info');
            } else {
              swal.showLoading();
              $scope.nextStep2Afiliacion();
            }
          } else {

            if ($scope.filtro.selectdocumento == "" || $scope.documento == undefined || $scope.primer_nombre == undefined ||
              $scope.primer_apellido == undefined || $scope.nacimiento == undefined || $scope.filtro.selectsexo == undefined ||
              $scope.filtro.selectsexo == '') {
              swal('Información', 'Para continuar con la afiliación debe ingresar los datos básicos del usuario', 'info');
            } else {
              if ($scope.adres_data != null && $scope.adres_data != undefined) {
                /////////////////////////
                if ($scope.filtro.selectdocumento != 'RC') {
                  swal.showLoading();
                  $scope.nextStep2Afiliacion();
                  /////////////
                  if ($scope.parameters) {
                    isAttachment($scope.parameters.tipo_documento, $scope.parameters.documento);
                  }
                } else {
                  if ($scope.documento_CN == null || $scope.documento_CN == '') {
                    swal('Información', 'Debe Digitar el Numero de Nacido Vivo', 'info');
                  } else {
                    $scope.Validar_rc_cn().then(function (result) {
                      if (result.codigo == '0') {
                        swal.showLoading();
                        $scope.nextStep2Afiliacion();
                        /////////////
                        if ($scope.parameters) {
                          isAttachment($scope.parameters.tipo_documento, $scope.parameters.documento);
                        }
                      } else {
                        swal('Notificacion', result.mensaje, 'warning');
                      }
                    });
                  }
                }

              } else {
                swal('Advertencia', 'Debe diligenciar el Adres', 'warning');
              }
            }
          }

        } else {
          swal('Advertencia', 'Debe digitar la fecha de afiliacion', 'warning');
        }
      }

      $scope.Validar_rc_cn = function () {
        return new Promise((resolve) => {
          $http({
            method: 'POST',
            url: "php/ips/func3047.php",
            data: {
              function: 'p_Validar_rc_cn',
              tipo: $scope.filtro.selectdocumento,
              numero: $scope.documento,
              tipo_CN: $scope.filtro.selectdocumento == 'RC' ? $scope.filtro.selectdocumento_CN : '',
              numero_CN: $scope.filtro.selectdocumento == 'RC' ? $scope.documento_CN : ''
            }
          }).then(function ({ data }) {
            resolve(data)//
          });
        });
      }

      $scope.active = function () {
        if ($scope.pistola == false) {
          $scope.filtro.selectregimen = "S";
          notification.getNotification('info', 'Lector de Codigo desactivado!', 'Notificacion');
          $scope.qrcedula = "";
          $scope.codigob = true;
          $("#qrcedula").focus();
          $("#mysexo").prop('disabled', false);
          $scope.enableBTNFOSYGA = true; //AQUI
          setTimeout(function () { $scope.$apply(); }, 500)
        } else {
          notification.getNotification('info', 'Lector de Codigo activado!', 'Notificacion');
          $("#qrcedula").focus();
          $scope.qrcedula = "";
          $scope.codigob = false;
          setTimeout(function () { $scope.$apply(); }, 500)
        }


        // $scope.fechaprocesado = $scope.SysDay;
        // $scope.enableBTNFOSYGA = true;
        // // $scope.filtro.selecttramite = 'C';
        // $scope.filtro.selectpoblacional = '';
        // $scope.filtro.selectdocumento = '4982832';
        // $scope.filtro.selectregimen = 'S';
        // $scope.filtro.selectsexo = '';
        // $scope.filtro.selectetnia = '';
        // $scope.filtro.selectdiscapacidad = '';
        // $scope.filtro.selectcondicion = '';
        // $scope.filtro.escenario = '';
        // $scope.filtro.anexo = '';
        // $scope.filtro.bis = '';
        // $scope.filtro.selectlocalidad = '';

        // $scope.primer_nombre = 'kevin';
        // $scope.primer_apellido = 'kevin';
        // $scope.segundo_apellido = 'kevin';
        // $scope.filtro.selectdocumento = 'CC';
        // $scope.documento = '1064978204';
        // $scope.filtro.selectsexo = 'M';
        // $scope.nacimiento = $scope.SysDay;
        // $scope.validaform();


        setTimeout(function () {
          $scope.$apply();
        }, 500);

      }


      // *** CARGUE DE SOPORTE ADJUNTOS ***

      $scope.ModalDigitalizacion = function (numero) {
        $scope.paquete = numero;
        $scope.tipo_documento = $scope.parameters.tipo_documento;
        $scope.documento = $scope.parameters.documento;
        $scope.TipoRes = 'AF';
        ngDialog.open({
          template: 'views/digitalizacion/modal/cargaanexo.html',
          className: 'ngdialog-theme-plain',
          controller: 'DigitalizacionController',
          scope: $scope
        })
      }


      $rootScope.$on('AfiliacionLinea', function (event, args) {
        if (args == '0') {
          //$scope.mostrar5();
          //$scope.subirdocumento = true;
          $scope.isbeneficiario = true;
          $scope.isAttachButton = false;
        }
      });

      $scope.submit = function () {
        swal({
          title: 'Cargando información del afiliado'
        });
        swal.showLoading();
        loadingButton('subir');
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        dd < 10 ? dd = '0' + dd : dd = dd
        mm < 10 ? mm = '0' + mm : mm = mm
        var oldname = $("#nombreadjunto")[0].value;
        var ext = oldname.substr(oldname.indexOf("."), 5);
        var Filename = $scope.filtro.anexo + "_" + $scope.parameters.tipo_documento + "_" + $scope.parameters.documento + "_" + dd + mm + yyyy;

        if ($("#adjuntoAfiliado")[0].value != "") {

          // Cargamos la imagen y la enviamos a la funcion PHP -- subiradjunto.php
          var formData = new FormData($("#formulario")[0]);
          upload.uploadFile(formData).then(function (res) {
            // Procesamos respuesta por parte del servidor y enviamos mensaje de notificacion
            if (res == "1") {
              $http({
                method: 'POST',
                url: "php/aseguramiento/Cafiliacion.php",
                data: { function: 'insertarsoporte', tipodoc: $scope.parameters.tipo_documento, documento: $scope.parameters.documento, anexo: $scope.filtro.anexo, filename: Filename + ext }
              }).then(function (response) {
                isAttachment($scope.parameters.tipo_documento, $scope.parameters.documento);
                // Res= 1 Imagen subida correctamente al servidor
                swal('Completado', 'La imagen ha sido cargada exitosamente, si desea agregar otro adjunto, seleccione el tipo y haga click en adjuntar', 'success');
                // $controller('anexoscontroller', {
                //   $scope: $scope
                // });
                // $scope.getParameterst($scope.tipo_documento, $scope.documento);
                // Cambiamos el nombre de la imagen con el formato establecido

                upload.uploadName(oldname, Filename + ext).then(function (res) { });

                document.getElementById("formulario").reset();
              }, function errorCallback(response) {
                swal('Mensaje', response.data, 'error')
              });
            } else {
              swal('Notificación', 'La imagen no pudo ser cargada', 'error');
            }
          });
        } else {
          swal('Información', 'Por favor adjuntar archivos', 'info');
        }
      }

      // *** FUNCIONES
      function isAttachment(tipo_documento, documento) {
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'validaranexo', tipodoc: tipo_documento, documento: documento }
        }).then(function (response) {
          var megs = response.data.split('-');
          if (megs[0] == "false" && saved == "false") {
            $scope.isAttachButton = false;
            saved = "true";
          } else {
            if ($scope.saveVisibility == true) {
              $scope.isAttachButton = true;
            }
          }
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      // *** INSERTAR CABEZA DE FAMILIA ***
      function savedForm() {
        $scope.saved = true;
        $scope.ips = true;
        $scope.disDiscapacidad = true;
        $scope.disSisben = true;
        $scope.disFicha = true;
        $scope.disPuntaje = true;
      }

      $scope.validaSisben = function () {
        if ($scope.sisben != '1' && $scope.sisben != '2') {
          $scope.sisben = '';
        }
        //   $scope.sisben = "";
        //   $scope.inactive3 = true;
        // }
        // if ($scope.sisben == "" || $scope.sisben == null) {
        //   $scope.inactive3 = true;
        // }
      }

      $scope.generaDeclaracion = function () {
        var fecha = new Date();
        var yyyy = fecha.getFullYear();
        var mm = fecha.getMonth() + 1;
        var dd = fecha.getDate();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenerfuardatos', tipodoc: $scope.filtro.selectdocumento, documento: $scope.documento }
        }).then(function (response) {
          var fuar = response.data["0"];
          $localStorage.fuar = fuar;
          var fuarbef = response.data["1"];
          $localStorage.fuarbef = fuarbef;
          $scope.datafuar = response.data;
          $timeout(function () {
            $window.open('views/formularios/encuesta.php?tipo=' + $scope.filtro.selectdocumento + '&id=' + $scope.documento, '_blank', "width=1080,height=1100");
          }, 1000);
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      $scope.acta = function () {
        $scope.direccion = $("#direccion")[0].value;
        $scope.estado = 'AF';
        $http({
          method: 'POST',
          url: "php/novedades/funcnovedades.php",
          data: { function: 'cargamunicipios' }
        }).then(function (response) {
          $scope.Municipios = response.data;
          for (var i = 0; i < $scope.Municipios.length; i++) {
            if ($scope.filtro.municipio == $scope.Municipios[i].CODIGO) {
              $scope.mun = $scope.Municipios[i].NOMBRE;
              if ($scope.segundo_nombre == undefined) {
                $scope.sgnom = ''
              } else {
                $scope.sgnom = $scope.segundo_nombre;
              }
              $scope.info = {

                segundo_nombre: $scope.sgnom,
                segundo_apellido: $scope.segundo_apellido,
                tipo_documento: $scope.filtro.selectdocumento.toUpperCase(),
                documento: $scope.documento,
                primer_nombre: $scope.primer_nombre.toUpperCase(),
                primer_apellido: $scope.primer_apellido.toUpperCase(),
                nacimiento: formatDate($scope.nacimiento),
                dia: $scope.nacimiento.getDate(),
                mes: $scope.nacimiento.getUTCMonth() + 1,
                ano: $scope.nacimiento.getFullYear(),
                direccion: $scope.direccion,
                localidad: $scope.localidad,
                municipio: $scope.mun,
                correo: $scope.correo,
                fijo: $scope.telfijo,
                celular: $scope.celular
              }
              // console.log($scope.info);
              // $window.open('views/consultaafiliados/soportes/acta.php?tipo=' + $scope.filtro.selectdocumento + '&id=' + $scope.documento + '&estado=' + $scope.estado + '&info=' + JSON.stringify($scope.info), '_blank', "width=1080,height=1100");
              $window.open('views/consultaafiliados/soportes/acta_antigua.php?tipo=' + $scope.filtro.selectdocumento + '&id=' + $scope.documento + '&estado=' + $scope.estado + '&info=' + JSON.stringify($scope.info), '_blank', "width=1080,height=1100");
              $scope.inactive4 = false;
              $scope.isbeneficiario = true;
              $scope.isAttachButton = true;
              $scope.reporte = true;
            }
          }
        });


      }

      $scope.encuestasalud = function () {
        var fecha = new Date();
        var yyyy = fecha.getFullYear();
        var mm = fecha.getMonth() + 1;
        var dd = fecha.getDate();
        if (dd < 10) {
          dd = '0' + dd
        }
        if (mm < 10) {
          mm = '0' + mm
        }
        $http({
          method: 'POST',
          url: "php/aseguramiento/Rafiliacion.php",
          data: { function: 'obtenerfuardatos', tipodoc: $scope.filtro.selectdocumento, documento: $scope.documento }
        }).then(function (response) {
          var fuar = response.data["0"];
          $localStorage.fuar = fuar;
          var fuarbef = response.data["1"];
          $localStorage.fuarbef = fuarbef;
          $scope.datafuar = response.data;
          $timeout(function () {
            $window.open('views/formularios/carnet.html', '_blank', "width=1080,height=1100");
          }, 1000);
        }, function errorCallback(response) {
          swal('Mensaje', response.data, 'error')
        });
      }

      $scope.declaracion = function () {
        var scopedec = $scope.$new();
        scopedec.param = new Array;
        scopedec.afiliacion = true;
        scopedec.param.type = $scope.filtro.selectdocumento;
        scopedec.param.id = $scope.documento;
        $scope.regdeclaracion = ngDialog.open({
          template: 'views/consultaAfiliados/declaracionsalud.html',
          className: 'ngdialog-theme-plain',
          controller: 'declaracionsaludctrl',
          // closeByEscape: false,
          // closeByDocument: false,
          scope: scopedec
        });
      }

      $scope.ProcesarBeneficiario = function () {
        $scope.fechaprocesado = formatDate($scope.fechaprocesado);
        if (communication.data.numero_fosyga == undefined) {
          $scope.parametersfosyga = {
            segundo_nombre: $scope.segundo_nombre,
            segundo_apellido: $scope.segundo_apellido,
            tipo_documento: $scope.filtro.selectdocumento.toUpperCase(),
            documento: $scope.documento,
            primer_nombre: $scope.primer_nombre.toUpperCase(),
            primer_apellido: $scope.primer_apellido.toUpperCase(),
            nacimiento: formatDate($scope.nacimiento),
            dia: $scope.nacimiento.getDate(),
            mes: $scope.nacimiento.getUTCMonth() + 1,
            ano: $scope.nacimiento.getFullYear()
          }
        } else {
          $scope.parametersfosyga = {
            segundo_nombre: communication.data.segundonombre_fosyga,
            segundo_apellido: communication.data.segundoapellido_fosyga,
            tipo_documentof: communication.data.tipodocumento_fosyga,
            documento: communication.data.numero_fosyga,
            primer_nombre: communication.data.primernombre_fosyga.toUpperCase(),
            primer_apellido: communication.data.primerapellido_fosyga.toUpperCase(),
            nacimiento: formatDate(communication.data.fechanacimiento_fosyga),
            dia: communication.data.fechanacimiento_fosyga.getDate(),
            mes: communication.data.fechanacimiento_fosyga.getUTCMonth() + 1,
            ano: communication.data.fechanacimiento_fosyga.getFullYear()
          }
        }
        $scope.direccion = $("#direccion")[0].value.toString().trim();
        loadingButton("guarda");
        if ($scope.filtro.selectZona === undefined || $scope.filtro.selectZona == "" || $scope.filtro.selectZona == "") {
          //notification.getNotification('error', 'Por favor ingrese al menos una zona!', 'Notificacion');
          swal('Información', 'Debe seleccionar una zona.', 'info');
        } else {
          if ($scope.multi_afil == 'PV') {
            $scope.estado_afiliado = $scope.multi_afil;
          } else {
            $scope.estado_afiliado = 'AC';
          }
          /*var xadres_data_fecnacimiento = $scope.adres_data.fecnacimiento.toString().split('/');
          var dia = (((xadres_data_fecnacimiento[0]) < 10) ? '0' + (xadres_data_fecnacimiento[0]) : (xadres_data_fecnacimiento[0]));
          var mes = (((xadres_data_fecnacimiento[1]) < 10) ? '0' + (xadres_data_fecnacimiento[1]) : (xadres_data_fecnacimiento[1]));
          var adres_data_fecnacimiento = dia + '/' + mes + '/' + xadres_data_fecnacimiento[2];
          console.log(adres_data_fecnacimiento);*/
          swal({ title: 'Consultado Informacion' });
          swal.showLoading();

          $http({
            method: 'POST',
            url: "php/aseguramiento/Cafiliacion.php",
            data: {
              function: 'insertarafiliado', estado: $scope.estado_afiliado, tipo_documento: $scope.parameters.tipo_documento, documento: $scope.parameters.documento, cbf_tipo_documento: '', cbf_documento: '', cbf_tipo: 'F',
              primer_nombre: $scope.parameters.primer_nombre, segundo_nombre: $scope.parameters.segundo_nombre, primer_apellido: $scope.parameters.primer_apellido,
              segundo_apellido: $scope.parameters.segundo_apellido, nacimiento: $scope.parameters.nacimiento, sexo: $scope.filtro.selectsexo, regimen: $scope.filtro.selectregimen, etnia: $scope.filtro.selectetnia,
              discapacidad: $scope.filtro.selectdiscapacidad, condicion: $scope.filtro.selectcondicion, nivelsisben: $scope.sisben, puntajesisben: $scope.puntajesisben, fichasisben: $scope.fichasisben, gpoblacional: $scope.filtro.selectpoblacional,
              direccion: $scope.direccion, telefono: $scope.telfijo, celular: $scope.celular, correo: $scope.correo, municipio: $scope.filtro.municipio, zona: $scope.filtro.selectZona,
              localidad: $scope.localidad, ips: $scope.filtro.escenario,
              sexo_bdua: $scope.filtro.selectsexo,
              tipo_documento_bdua: $scope.adres_data.adres_tipo_doc,
              documento_bdua: $scope.adres_data.adres_documento,
              primer_nombre_bdua: $scope.adres_data.adres_p_nombre,
              segundo_nombre_bdua: $scope.adres_data.adres_s_nombre,
              primer_apellido_bdua: $scope.adres_data.adres_p_apellido,
              segundo_apellido_bdua: $scope.adres_data.adres_s_apellido,
              //nacimiento_bdua: adres_data_fecnacimiento,
              nacimiento_bdua: $scope.adres_data.fecnacimiento,
              parentesco: '', fecha_afiliacion: $scope.fechaprocesado,

              metodogpoblacional: $scope.filtro.selectmetodogpoblacional,
              gruposisben: $scope.filtro.selectgruposisben,
              subgruposisben: $scope.filtro.selectsubgruposisben,
              causalafi_oficio: $scope.filtro.selectcausalafi_oficio,

              responsable: $scope.Rol_Cedula,
              tipo_documento_CN: ($scope.filtro.selectdocumento == 'RC') ? $scope.filtro.selectdocumento_CN : '',
              documento_CN: ($scope.filtro.selectdocumento == 'RC') ? $scope.documento_CN : '',
            }
          }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
              var Numrad = response.data.substr(response.data.indexOf(":") + 1, cant);
              if ($scope.multi_afil == "PV") {
                $scope.isbeneficiario = true;
                // $scope.reporte = true;
              } else {
                $scope.isbeneficiario = false;
                // $scope.reporte = false;
              }
              swal('Completado', response.data + '<br><br>Al ser un caso de posible de multiafiliación, el area de aseguramiento se comunicara con usted para notifcar si la afiliacion se va realizar o efectivamente es una multiafiliación', 'success');
              //notification.getNotification('success', response.data, 'Notificacion');
              swal('Completado', response.data, 'success');
              $scope.saveVisibility = true;
              $scope.radicado = Numrad;
              savedForm();
              $scope.btnValidar = true;
              $scope.btnFosyga = true;
              $scope.reporte = false;
              $scope.isAttachButton = true;
              // $controller('anexoscontroller', {
              //   $scope: $scope
              // });
              // $scope.getParameterst($scope.parameters.tipo_documento, $scope.parameters.documento);
              $scope.isbeneficiario = false;
              var cant = response.data.length - response.data.indexOf(":");
              $scope.declaracion();
            } else {
              swal({
                title: "¡Mensaje!",
                text: response.data,
                type: "warning"
              }).catch(swal.noop);
            }
          }, function errorCallback(response) {
            swal('Mensaje', response.data, 'error')
          });
        }
      }

      function setmunicipio() {
        $(function () {
          $("#municipio").val($localStorage.municipiof.value);
        });
        document.getElementById("municipio").selectedIndex = $localStorage.municipiof.position;
        $scope.filtro.municipio = $localStorage.municipiof.value;
      }

      $rootScope.$on('ngDialog.closed', function (e, $dialog) {
        // $controller('anexoscontroller', {
        //   $scope: $scope
        // });
        // $scope.getParameterst($scope.tipo_documento, $scope.documento);
        if ($scope.filtro.selecttramite == "B") {
          $scope.isAttachButton = true;
          // $scope.reporte = false;
          $scope.btnValidar = true;
        }
        // document.getElementById("municipio").selectedIndex = $localStorage.municipiof.position;
      });

      $rootScope.$on('ngDialog.opened', function (e, $dialog) {
        var x = document.getElementById("tipo_doc").value;
        var tipodocu = tipodocumento(x);
        $(function () {
          $("#tipo_doc").val(x);
        });
        document.getElementById("tipo_doc").selectedIndex = tipodocu;
      });

      function tipodocumento(type) {
        var position = 0;
        switch (type) {
          case "CC":
            position = 1;
            break;
          case "TI":
            position = 2;
            break;
          case "RC":
            position = 3;
            break;
          case "CE":
            position = 4;
            break;
          case "CN":
            position = 5;
            break;
          case "PA":
            position = 6;
            break;
          case "PE":
            position = 7;
            break;
          case "AS":
            position = 8;
            break;
          case "MS":
            position = 9;
            break;
          case "SC":
            position = 10;
            break;
          case "PT":
            position = 11;
            break;
          default:
            position = 0;
        }
        return position;
      }
      // *** VENTANAS MODALES ***
      // $scope.AgregarBeneficiario = function () {
      //   $localStorage.communication = {
      //     value: 1
      //   };
      //   ngDialog.open({
      //     template: 'views/afiliacionLinea/modalbeneficiarios.html',
      //     className: 'ngdialog-theme-plain',
      //     controller: 'agregarbeneficiariocontroller',
      //     controllerAs: 'ipctrl',
      //     scope: $scope
      //   });
      // }

      $scope.close = function () {
        $('#modal12').modal('close');
      }

      $scope.AgregarBeneficiario = function () {
        // $scope.modalconsulta.close();
        $('#modal12').modal('close');
        $localStorage.communication = {
          value: 1
        };
        ngDialog.open({
          template: 'views/afiliacionLinea/modalbeneficiarios.html',
          className: 'ngdialog-theme-plain',
          controller: 'agregarbeneficiariocontroller',
          controllerAs: 'ipctrl',
          scope: $scope
        });
      }

      $scope.ConsultaNucleo = function () {
        consultaHTTP.obtenerNucleo('CABA', $scope.parameters.tipo_documento, $scope.parameters.documento).then(function (response) {
          if (response == "0") {
            swal('Información', 'No se encontro información', 'error');
            return;
          } else if (typeof response === "object") {
            $scope.afildata = response;
          } else if (response.substring(0, 1) == "2") {
            swal('Información', response, 'info');
          }
        })
        $('#modal12').modal('open');
        // $scope.modalconsulta = ngDialog.open({
        //   template: 'views/afiliacionLinea/validaafiliado.html',
        //   closeByEscape: false,
        //   className: 'ngdialog-theme-plain',
        //   controller: 'AfiliacionLineaController',
        //   scope: $scope
        // });
      }



      $scope.MostrarBeneficiario = function () {
        ngDialog.open({
          template: 'views/afiliacionLinea/verbeneficiarios.html',
          className: 'ngdialog-theme-plain',
          controller: 'verbeneficiarioscontroller',
          controllerAs: 'ipctrl',
          scope: $scope
        });
      }

      function obtenernombre(nombres) {
        var str = nombres;
        var nn = str.indexOf("");
        var pn = str.substr(0, nn);
        var n = str.indexOf("");
        var sn = str.substr(n, str.length);

        if (nn == -1) {
          $scope.w2dprimer_nombre = str;
          $scope.w2dsegundo_nombre = "";
        }
        else {
          $scope.w2dprimer_nombre = pn;
          $scope.w2dsegundo_nombre = sn;
        }
      }

      function obtenerapellido(apellido) {
        var str = apellido;
        var nn = str.indexOf("");
        var pn = str.substr(0, nn);
        var n = str.indexOf("");
        var sn = str.substr(n, str.length);

        if (nn == -1) {
          $scope.w2dprimer_apellido = str;
          $scope.w2dsegundo_apellido = "";
        }
        else {
          $scope.w2dprimer_apellido = pn;
          $scope.w2dsegundo_apellido = sn;
        }

      }

      $scope.MostrarFosyga = function () {
        if ($scope.fechaprocesado != null && $scope.fechaprocesado != undefined) {
          if ($scope.filtro.selectdocumento == "" || $scope.documento === undefined || $scope.documento == "" || $scope.primer_nombre === undefined ||
            $scope.primer_nombre == "" || $scope.primer_apellido == undefined || $scope.primer_apellido === "" || $scope.nacimiento === "" || $scope.nacimiento === undefined) {
            //notification.getNotification('error', '', 'Notificacion');
            swal('Advertencia', 'Los campos de los datos basico de identificación son obligatorios', 'warning');
          } else {
            $scope.fosygaresul = {}
            $scope.datosBasicosAfil = {
              primer_nombre: $scope.primer_nombre,
              segundo_nombre: $scope.segundo_nombre,
              primer_apellido: $scope.primer_apellido,
              segundo_apellido: $scope.segundo_apellido,
              f_nacimiento: $scope.nacimiento,
              t_documento: $scope.filtro.selectdocumento,
              n_documento: $scope.documento
            }
            $scope.adres_dialog = ngDialog.open({
              template: 'views/afiliacionLinea/verfosyga.html',
              className: 'ngdialog-theme-plain',
              controller: 'verfosyga',
              scope: $scope
            });

            $scope.adres_dialog.closePromise.then(function (data) {
              if (data.value.adres_documento !== undefined) {
                $scope.can_validate = true;
                $scope.adres_data = data.value;
              }
            });
          }
        } else {
          swal('Advertencia', 'Debe digitar la fecha de afiliacion', 'warning');
        }
      }

      $scope.MostrarDetalle = function () {
        ngDialog.open({
          template: 'views/afiliacionLinea/verdetalles.html',
          controller: 'verdetallescontroller',
          controllerAs: 'ipctrl',
          scope: $scope
        });
      }

      //Sisben DNP

      $scope.CargarSoporte = function () {
        if ($scope.filtro.selectpoblacional == '5') {
          $scope.ConsultaSisben();
          $scope.SisbenSoporte = true;
        } else {
          swal('Notificacion', 'No Pertenece Al Grupo Poblacional Del Sisben', 'info');
        }
      }

      $scope.ConsultaSisben = function () {
        swal({ title: 'Consultado Informacion' });
        swal.showLoading();
        afiliacionHttp.serviceFDC($scope.filtro.selectdocumento, $scope.documento, 'ObtenerSisben').then(function (response) {
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
            $scope.SisbenSoporte = true;
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
          controller: 'AfiliacionLineaController',
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
        $scope.closeThisDialog();
        var innerContents = document.getElementById('Impri').innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=1100,height=1100,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" href="styles/nucleofamiliar.css"></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();

      }

      $scope.FormatTexto = function (SCOPE) {
        const input = $scope[SCOPE];
        var valor = input;
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[|!¿¡?°"#/()=$%&''´¨´¨¨¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        $scope[SCOPE] = valor.toString();
      }

      if (document.readyState !== 'loading') {
        $scope.Inicio();
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }


    }]);
