'use strict';
angular.module('GenesisApp')
  .controller('solicitudautprogramadaController', ['$scope', '$http', '$location', 'ngDialog', '$timeout', function ($scope, $http, $location, ngDialog, $timeout) {
    $(document).ready(function () {
      $('#modaldiagnostico').modal();
      $("#modalips").modal();
      $("#modalproducto").modal();
    });
    $scope.tabI = true;
    $scope.tabII = false;
    $scope.tabIII = false;
    $scope.tabIV = false;
    $scope.activeI = 'active final';
    $scope.activeII = 'none';
    $scope.activeIII = 'none';
    $scope.activeIV = 'none';
    $scope.inactivebuscarafiliado = false;
    $scope.Consultarafiliado = false;
    $scope.MostrarInformacion = true;
    $scope.inactivedatosafiliado = true;
    $scope.inactiveautorizacion = true;
    $scope.invsolicitud = true;
    $scope.invproducto = true;
    $scope.invfinalizar = true;
    $scope.inactivebarradiag = true;
    $scope.inactivebarraips = true;
    $scope.inactivebarrapro = true;
    $scope.solicitud = {
      numero: 0,
      tipodocumento: '',
      documento: '',
      diagnom1: '',
      diagnom2: '',
      diagcod1: '',
      diagcod2: '',
      ipssolicitante: '',
      ipsasignada: '',
      ipscodsolicitante: '',
      ipscodasignada: '',
      servicio: '',
      codservicio: '',
      fecsolicitud: '',
      fecsolicitudparseada: '',
      fecprogramacion: '',
      fecprogramacionparseada: '',
      justificacion: '',
      observacion: '',
      email: '',
      celular: '',
      direccion: '',
      contrato: '',
      contratoDocumento: '',
      contratoUbicacion: '',
      ubicacion: '',
      file: null,
      ext: null,
      namefile: null,
      accion: 'I',
      origen: 'I'
    }
    $scope.init = function () {
      $scope.tabI = false;
      $scope.tabII = false;
      $scope.tabIII = false;
      $scope.tabIV = false;
      $scope.activeI = 'none';
      $scope.activeII = 'none';
      $scope.activeIII = 'none';
      $scope.activeIV = 'none';
    }
    $scope.setTab = function (opcion) {
      $scope.init();
      switch (opcion) {
        case 1:
          $scope.tabI = true;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = 'active final';
          $scope.activeII = 'none';
          $scope.activeIII = 'none';
          $scope.activeIV = 'none';
          break;
        case 2:
          $scope.tabI = false;
          $scope.tabII = true;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = 'none';
          $scope.activeII = 'active final';
          $scope.activeIII = 'none';
          $scope.activeIV = 'none';
          break;
        case 3:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = true;
          $scope.tabIV = false;
          $scope.activeI = 'none';
          $scope.activeII = 'none';
          $scope.activeIII = 'active final';
          $scope.activeIV = 'none';
          break;
        case 4:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = true;
          $scope.activeI = 'none';
          $scope.activeII = 'none';
          $scope.activeIII = 'none';
          $scope.activeIV = 'active final';
          break;
        default:

      }
    }
    $scope.buscarAfiliado = function () {
      $scope.Data = [];
      $http({
        method: 'POST',
        url: "php/siau/CodigoUrgencia/Rcodigourgencia.php",
        data: { function: 'obtenerafiliados', tipodocumento: $scope.solicitud.tipodocumento, documento: $scope.solicitud.documento }
      }).then(function (response) {
        if (response.data != "0") {
          $scope.Data = response.data;
          if ($scope.Data.Estado != 'ACTIVO') {
            $scope.informacionmodal = 'Afiliado no se encuentra activo en base de datos';
            $scope.inactivebuscarafiliado = false;
            $scope.inactivedatosafiliado = true;
            swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');
          } else {
            $scope.calcularEdad($scope.Data.FechaNacimiento);
            $scope.sexoafi = $scope.Data.SexoCodigo;
            $scope.edadafi = $scope.Data.edaddias;
            $scope.regimenafi = $scope.Data.CodigoRegimen;
            $scope.solicitud.email = $scope.Data.email;
            $scope.solicitud.celular = $scope.Data.Celular1;
            $scope.inactivebuscarafiliado = true;
            $scope.inactivedatosafiliado = false;
            $scope.inactiveautorizacion = false;
            $scope.productosagregados = [];
          }
        } else {
          swal('Genesis Informa', 'Afiliado no Encontrado', 'info')
        }
      });
    }
    $scope.ConsultarAfiliado = function () {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'ConsultarAfiliado', tipo: $scope.Tipo_Documento, numero: $scope.Numero_Documento }
      }).then(function (res) {
        $scope.Resultado = res.data;
        if ($scope.Resultado == '') {
          swal('Información', 'El Afiliado No Tiene Autorizacion', 'warning');
        } else {
          console.log($scope.Resultado);
          $scope.MostrarInformacion = false;
        }

      })
    }
    $scope.solobusqueda = function () {
      $scope.MostrarInformacion = true;
    }
    function validate_fecha(fecha) {
      var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");

      if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
          return true;
        }
      }
      return false;
    }
    function isValidDate(day, month, year) {
      var dteDate;
      month = month - 1;
      dteDate = new Date(year, month, day);

      //Devuelva true o false...
      return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
    }
    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }
    $scope.calcularEdad = function (date) {
      //var fecha=document.getElementById("user_date").value;
      var fecha = date.split("/").reverse().join("-");
      if (validate_fecha(fecha) == true) {
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }
        if (edad > 1900) {
          edad -= 1900;
        }

        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }
        if (edad > 0) {
          $scope.cantidadanos = 'años'
          if (edad == 1) {
            $scope.cantidadanos = 'años'
          }
          $scope.edad = edad;
        } else {
          if (meses > 0) {
            $scope.cantidadanos = 'meses'
            if (meses == 1) {
              $scope.cantidadanos = 'mes'
            }
            $scope.edad = meses;
          } else {
            if (dias > 0) {
              $scope.cantidadanos = 'dias'
              if (dias == 1) {
                $scope.cantidadanos = 'dia'
              }
              $scope.edad = dias;
            }
          }
        }
      }
    }
    $scope.openmodals = function (tipo) {
      $scope.buscard1 = "";
      $scope.buscard2 = "";
      $scope.buscarpro = "";
      $scope.inactivebarradiag = true;
      $scope.inactivebarraips = true;
      $scope.inactivebarrapro = true;
      switch (tipo) {
        case 'diagnostico':
          $("#modaldiagnostico").modal("open");
          break;
        case 'ips':
          $("#modalips").modal("open");
          break;
        case 'producto':
          $("#modalproducto").modal("open");
          break;
        default:

      }
    }
    $scope.buscarDiagnostico = function (diag) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'obtenerDiagnostico', codigo: diag,
          sexo: $scope.sexoafi,
          edad: $scope.edadafi
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
    $scope.seleccionardiagnostico = function (data, tipo) {
      var text = "";
      if (tipo == 'P') {
        $scope.solicitud.diagnom1 = data.Nombre;
        $scope.solicitud.diagcod1 = data.Codigo;
        text = 'Principal';
      } else {
        $scope.solicitud.diagnom2 = data.Nombre;
        $scope.solicitud.diagcod2 = data.Codigo;
        text = 'Secundario';
        $("#modaldiagnostico").modal("close");
      }
      swal({ title: "Completado", text: "Diagnostico " + text + " Registrado", showConfirmButton: false, type: "success", timer: 800 });
    }
    $scope.buscarIps = function (ips) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerNombreIps', ips: ips }
      }).then(function (response) {
        if (response.data["0"].Codigo == '0') {
          swal('Importante', 'IPS no encontrada', 'info');
          $scope.inactivebarraips = true;
        } else {
          $scope.listIps = response.data;
          $scope.inactivebarraips = false;
        }
      })
    }
    $scope.seleccionarips = function (data, tipo) {
      var text = '';
      if (tipo == 'S') {
        $scope.solicitud.ipssolicitante = data.Nombre;
        $scope.solicitud.ipscodsolicitante = data.Codigo;
        text = 'Ips Solicitante.';
      } else {
        $scope.solicitud.ipsasignada = data.Nombre;
        $scope.solicitud.ipscodasignada = data.Codigo;
        text = 'Ips Asignada.';
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerContratos', nit: $scope.solicitud.ipscodasignada, regimen: $scope.regimenafi }
        }).then(function (response) {
          if (response.data["0"].CODIGO == '1') {
            $scope.contrato = response.data["0"].NUMERO;
            $scope.solicitud.contrato = response.data["0"].NUMERO;
            $scope.solicitud.contratoDocumento = response.data["0"].DOCUMENTO;
            $scope.solicitud.contratoUbicacion = response.data["0"].UBICACION;
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'obtenerServicios', contrato: $scope.contrato, tipo: 'A' }
            }).then(function (response) {
              $scope.listServicios = response.data;
              $("#modalips").modal("close");
            })
          } else {

          }
        })
      }
      swal({ title: "Completado", text: text, showConfirmButton: false, type: "success", timer: 800 });
    }
    $scope.buscarProducto = function (pro) {
      if ($scope.buscarpro.length >= 6) {
        $http({
          method: 'POST',
          url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
          data: { function: 'obtenerProducto', regimen: $scope.regimenafi, contrato: $scope.contrato, producto: $scope.buscarpro, clasificacion: $scope.solicitud.servicio, tipo: 'S', ubicacion: 'H', edad: $scope.edadafi, sexo: $scope.sexoafi }
        }).then(function (response) {
          $scope.listProductos = [];
          if (response.data["0"].CODIGO == '-1') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else if (response.data["0"].CODIGO == '0') {
            swal('Importante', response.data["0"].NOMBRE, 'info');
            $scope.inactivebarrapro = true;
          } else {
            $scope.listProductos = response.data;
            $scope.inactivebarrapro = false;
          }
        })
      } else {

      }
    }
    $scope.productosagregados = [];
    $scope.seleccionarproducto = function (data) {
      swal({
        title: 'Ingrese la cantidad',
        input: 'number',
        inputValue: 1,
        inputAttributes: {
          min: 1,
          max: 10
        },
        showCancelButton: true
      }).then(function (result) {
        if (result > 0) {
          data.CANTIDAD = result;
          $scope.productosagregados.push(data);
          $scope.$apply();
          swal({ title: "Completado", text: "Producto Agregado.", showConfirmButton: false, type: "success", timer: 800 });
          setTimeout(function () {
            $("#modalproducto").modal("close");
          }, 100);
        } else {
          swal('Importante', 'Cantidad Incorrecta', 'info')
        }
      })
    }
    $scope.eliminarProducto = function (index) {
      $scope.productosagregados.splice(index, 1);
      swal('Importante', 'Producto Retirado', 'info')
    }

    $scope.textvalidate = "Complete los campos requeridos (*)";
    $scope.pasos = function (op) {
      switch (op) {
        case '1':
          $("#btn-solicitud").addClass("activebtn-step");
          $scope.invsolicitud = false;
          $scope.title = 'Solicitud';
          break;
        case '-1':
          $("#btn-solicitud").removeClass("donebtn-step").addClass("activebtn-step");
          $("#btn-producto").removeClass("activebtn-step");
          $scope.invsolicitud = false;
          $scope.title = 'Solicitud';
          $scope.invproducto = true;
          break;
        case '2':
          $scope.validar('solicitud');
          if ($scope.pasarsolicitud == true) {
            $("#btn-solicitud").removeClass("activebtn-step").addClass("donebtn-step");
            $("#btn-producto").addClass("activebtn-step");
            $scope.invsolicitud = true;
            $scope.invproducto = false;
            $scope.title = 'Producto';
          } else {
            swal('Importante', $scope.textvalidate, 'info');
          }
          break;
        case '-2':
          $("#btn-producto").removeClass("donebtn-step").addClass("activebtn-step");
          $("#btn-finalizar").removeClass("activebtn-step");
          $scope.invproducto = false;
          $scope.title = 'Producto';
          $scope.invfinalizar = true;
          break;
        case '3':
          $scope.validar('producto');
          if ($scope.pasarproducto == true) {
            $("#btn-producto").removeClass("activebtn-step").addClass("donebtn-step");
            $("#btn-finalizar").addClass("activebtn-step");
            $scope.invproducto = true;
            $scope.invfinalizar = false;
            $scope.title = 'Finalizar';
            break;
          } else {
            swal('Importante', 'Debe agregar un producto', 'info')
          }
        default:
      }
    }
    $scope.pasos('1');
    $scope.finalizar = function () {
      swal({
        title: 'Confirmar',
        text: "Finalizar solicitud autorizacion",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result) {
          $scope.validar('datosafiliado');
          if ($scope.pasardatosafiliadoprog == true) {
            $scope.solicitud.ubicacion = sessionStorage.getItem('municipio');
            $scope.solicitud.fecsolicitudparseada = formatDate($scope.solicitud.fecsolicitud);
            $scope.solicitud.codservicio = $scope.solicitud.servicio;
            var data = JSON.stringify($scope.solicitud);
            swal({ title: 'Procesando...' });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
              data: { function: 'insertarSolicitudaut', solicitud: data }
            }).then(function (response) {
              $scope.respuesta = response.data;
              if ($scope.respuesta.Codigo == '1') {
                $scope.numautprocesada = $scope.respuesta.Numero;
                var dataproductos = JSON.stringify($scope.productosagregados);
                $http({
                  method: 'POST',
                  url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                  data: { function: 'insertarDetalle', productos: dataproductos, cantidad: $scope.productosagregados.length, numero: $scope.respuesta.Numero, ubicacion: $scope.respuesta.Ubicacion, accion: 'I' }
                }).then(function (response) {
                  if (response.data.codigo == '1') {
                    $("#btn-finalizar").removeClass("activebtn-step").addClass("donebtn-step");
                    swal.close();

                    if ($scope.solicitud.ext) {
                      $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: {
                          function: 'subirArchivoAutPro', file: $scope.solicitud.file,
                          ext: $scope.solicitud.ext,
                          num: $scope.numautprocesada,
                          ubicacion: $scope.respuesta.Ubicacion,
                          namefile: $scope.solicitud.namefile
                        }
                      }).then(function (response) {
                        console.log({ 'ARCHIVO': response.data });
                        $scope.subirAdjunto(JSON.stringify({ 'ARCHIVO': response.data }));
                      })
                    }
                    setTimeout(function () {
                      $scope.limpiar();
                      swal({ title: "Completado", text: response.data.fecha, type: "success" });
                    }, 500);
                  } else {
                    swal({ title: "Importante", text: "Autorización no registrada", type: "info" });
                  }
                })
              }
            })
          } else {
            swal('Importante', $scope.textvalidate, 'info');
          }
        }
      })
    }
    $scope.limpiar = function () {
      $scope.inactivebuscarafiliado = false;
      $scope.inactivedatosafiliado = true;
      $scope.inactiveautorizacion = true;
      $scope.invsolicitud = true;
      $scope.invproducto = true;
      $scope.invfinalizar = true;
      $scope.solicitud = {
        numero: 0,
        tipodocumento: '',
        documento: '',
        diagnom1: '',
        diagnom2: '',
        diagcod1: '',
        diagcod2: '',
        ipssolicitante: '',
        ipsasignada: '',
        ipscodsolicitante: '',
        ipscodasignada: '',
        servicio: '',
        codservicio: '',
        fecsolicitud: '',
        fecsolicitudparseada: '',
        fecprogramacion: '',
        fecprogramacionparseada: '',
        justificacion: '',
        observacion: '',
        email: '',
        celular: '',
        direccion: '',
        contrato: '',
        contratoDocumento: '',
        contratoUbicacion: '',
        ubicacion: '',
        file: null,
        ext: null,
        namefile: null,
        accion: 'I',
        origen: 'I'
      }
      document.getElementById('inputFilePlaceHolder1').value = "";
      $("#btn-solicitud").removeClass("donebtn-step");
      $("#btn-producto").removeClass("donebtn-step");
      $("#btn-finalizar").removeClass("donebtn-step");
      $scope.pasos('1');
      $scope.$apply();
    }
    $scope.validar = function (tipo) {
      $scope.pasarsolicitud = true;
      $scope.pasarproducto = true;
      $scope.pasardatosafiliadoprog = true;
      switch (tipo) {
        case 'solicitud':
          if ($scope.solicitud.diagnom1 == '' || $scope.solicitud.diagnom1 == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.solicitud.ipssolicitante == '' || $scope.solicitud.ipssolicitante == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.solicitud.ipsasignada == '' || $scope.solicitud.ipsasignada == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.solicitud.ipscodsolicitante == '' || $scope.solicitud.ipscodsolicitante == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.solicitud.ipscodasignada == '' || $scope.solicitud.ipscodasignada == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.solicitud.servicio == '' || $scope.solicitud.servicio == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.solicitud.justificacion == '' || $scope.solicitud.justificacion == undefined) { $scope.pasarsolicitud = false; }
          else if ($scope.data.requiredFile == true) {
            $scope.textvalidate = $scope.solicitud.file == null ? $scope.textvalidate : $scope.data.formato;
            $scope.pasarsolicitud = false;
          }
          break;
        case 'producto':
          if ($scope.productosagregados.length == 0 || $scope.productosagregados == undefined) { $scope.pasarproducto = false; }
          break;

        case 'datosafiliado':
          if ($scope.solicitud.celular == '' || $scope.solicitud.celular == undefined) { $scope.pasardatosafiliadoprog = false; }
          if ($scope.solicitud.direccion == '' || $scope.solicitud.direccion == undefined) { $scope.pasardatosafiliadoprog = false; }
          break;
        default:
      }
    }

    $scope.abrirModalDireccion = function () {
      $scope.dialogDiagreg = ngDialog.open({
        template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
        className: 'ngdialog-theme-plain',
        controller: 'actualizarinformacion',
        closeByDocument: false,
        closeByEscape: false,
        scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function (data) {      
          if ($scope.solicitud.direccion) {
            if (data.value != '$closeButton') {
              $scope.solicitud.direccion = data.value + " " + $('#barrio').val();
            }else{
                  if ($scope.solicitud.direccion) {

                  }else{
                     $scope.solicitud.direccion ="";
                  }

              
            }
          } else {
            $scope.solicitud.direccion =data.value + " " + $('#barrio').val();
          }

        
      });
    }

    $scope.FormatSoloTextoNumero = function (NID) {
      const input = document.getElementById('' + NID + '');
      var valor = input.value;
      input.value = valor.replace(/[^\wÑñ,.-\s]/g, '');
    }


    $scope.data = { formato: null, requiredFile: true };
    //Functions in jquery
    $('#solpro').change(function () {//Detecta los cambios que sufre el input file            
      $timeout(function () {//Usado para validar el file en tiempo real
        var file = document.getElementById('solpro').files[0];//Obtiene el file del input para validarlo
        $scope.data.formato = '';
        if (file) {//Valida si existe el archivo en el input file
          if (file.size <= 5000000) {//valida que el size del file sea <= 5 mb                                                         
            if (file.name.split('.').pop().toLowerCase() == 'pdf') {//Obtiene la extension del file y valida que sea un pdf                      
              $scope.data.formato = 'Dentro Del Peso Limite y Formato Validado';
              $scope.data.requiredFile = false;
              var reader = new FileReader();
              reader.onload = function (event) {
                $timeout(function () {
                  $scope.solicitud.file = event.target.result; //Asigna el file al ng-model autFile
                  $scope.solicitud.ext = file.name.split('.').pop().toLowerCase();//Asigna la extension del autFile
                  $scope.solicitud.namefile = file.name.substr(0, file.name.lastIndexOf('.'));    //Asigna el nombre del autFile
                })
              };
              reader.readAsDataURL(file);
            } else {
              $scope.solicitud.requiredFile = true;
              $scope.data.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .pdf';
              $scope.solicitud.file = null;
              $scope.solicitud.namefile = null;//Asigna null al ng-model autFile  
              $scope.solicitud.ext = null;//Asigna null a la extension autFile 

            }
          } else {
            $scope.data.requiredFile = true;
            $scope.data.formato = 'Limite de Peso Excedido';
            $scope.solicitud.file = null;
            $scope.solicitud.namefile = null;//Asigna null al ng-model autFile   
            $scope.solicitud.ext = null;//Asigna null a la extension autFile   

          }
        } else {
          $scope.data.requiredFile = true;
          $scope.data.formato = null;
          $scope.solicitud.file = null;
          $scope.solicitud.namefile = null;//Asigna null al ng-model autFile   
          $scope.solicitud.ext = null;//Asigna null a la extension autFile 

        }
      }, 100);
    })

    $scope.subirAdjunto = function (vfile) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: {
          function: 'insertarAdjuntoPro',
          file: vfile,
          num: $scope.numautprocesada,
          ubicacion: $scope.respuesta.Ubicacion,
          cantidad: 1
        }
      }).then(function (response) {
        console.log(response.data);
      })
    }
  }])
