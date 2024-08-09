'use strict';



angular.module('GenesisApp')
  .controller('contratacionprecontractualController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$window', '$rootScope',
    function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $window, $rootScope) {
      // modal de otro modulos
      $(document).ready(function () {
        $('#modal1').modal();
        $('#modalprestador').modal();
        $('#modalservicio').modal();
        $('#modalproducto').modal();
        $('#modaltarifa').modal();
        $('#modal_buscar').modal();
        $('#modal_new').modal();
        $('#modal_bitacora').modal();
        $('#modal_buscar_ips_para_agregar').modal();

        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        setTimeout(() => {
          $scope.busqueda.numero = 10919;
          $scope.busqueda.regimen = 'KS';
          $scope.busqueda.estado = 'P';
          $scope.buscar();
        }, 4000);
        // $scope.Ajustar_Pantalla();
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
      })
      $scope.check_option = "";
      $scope.check_option2 = "";
      $scope.alseleccionarpgp = false;

      $scope.contratacion_IPS = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_IPS_CONTRATO',
            v_pnumero: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_pdocumento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          $scope.lista_IPS_contratado = response.data;
        })
      }

      $scope.agregar_ips_contrato = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_IPS_NOCONTRATADA',
            v_pnumero: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_pdocumento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          swal.close();
          if (response.data == 0) {
            swal('Información', "No se encontro Sede de Prestacion para Agregar Al Contrato", 'info')
          } else {
            $('#modal_buscar_ips_para_agregar').modal('open');
            $scope.listadoipsparaagregar = response.data;
          }
        })
      }
      $scope.agregar_esta_ips = function (codigo_sede, nombre_sede) {
        swal({
          title: '¿Desea Agregar Sede de prestacion?',
          text: "Agregar Sede",
          type: 'info',
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d33",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'P_GUARDAR_IPS_EN_CONTRATADA',
                v_pnumero: $scope.infoContrato.numero,
                v_pubicacion: $scope.infoContrato.ubicacion_id,
                v_pdocumento: $scope.infoContrato.documento,
                v_codigo_sede: codigo_sede,
                v_nombre_sede: nombre_sede
              }
            }).then(function (response) {
              $scope.listadoipsparaagregar = response.data;
              $('#modal_buscar_ips_para_agregar').modal('close');
              $scope.contratacion_IPS();

            })
          }
        }).catch(swal.noop);
      }


      $scope.abrir_acordeon = function (x) {

        var tempo = -1;
        for (var j = 0; j < $scope.vector_padres.length; j++) {
          if ($scope.vector_padres[j].acordeon == true) {
            tempo = j;
          }
          $scope.vector_padres[j].acordeon = false
        }
        if (tempo == x) {
          $scope.vector_padres[x].acordeon = false
        } else {
          $scope.vector_padres[x].acordeon = true;
        }
      }

      $scope.caratula = function () {
        $window.open('views/contratacion/formatos/caratula.php?regimen=' + $scope.infoContrato.documento + '&ubicacion=' + $scope.infoContrato.ubicacion_id + '&numero=' + $scope.infoContrato.numero);
      }
      // $scope.anexo3 = function () {
      //   $window.open('views/contratacion/formatos/anexo3.php?regimen=' + $scope.infoContrato.documento + '&ubicacion=' + $scope.infoContrato.ubicacion_id + '&numero=' + $scope.infoContrato.numero);
      // }

      $scope.descarga = function (tipo, JSONData, ReportTitle, ShowLabel) {
        switch (tipo) {
          // excel
          case 1:
            var data = JSONData;


            / * Si el componente xlsx no se importa, entonces importe * /
            if (typeof XLSX == 'undefined') XLSX = require('xlsx');
            / * Crear hoja de trabajo * /
            var ws = XLSX.utils.json_to_sheet(data);
            / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Productos");
            / * Generar archivo xlsx * /
            XLSX.writeFile(wb, "Productos.xlsx");
            break;
          case 2:
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'P_OBTENER_ANEXO_3',
                documento: $scope.infoContrato.documento,
                numero: $scope.infoContrato.numero,
                ubicacion: $scope.infoContrato.ubicacion_id,
              }
            }).then(function (response) {
              if (response.data.Codigo == 1) {
                swal({
                  title: "Mensaje",
                  text: response.data.Nombre,
                  type: "warning",
                }).catch(swal.noop);
              } else {
                swal.close();
                var data = response.data;


                / * Si el componente xlsx no se importa, entonces importe * /
                if (typeof XLSX == 'undefined') XLSX = require('xlsx');
                / * Crear hoja de trabajo * /
                var ws = XLSX.utils.json_to_sheet(data);
                / * Cree un libro de trabajo vacío y luego agregue la hoja de trabajo * /
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Productos");
                / * Generar archivo xlsx * /
                XLSX.writeFile(wb, "Productos.xlsx");
              }
            });
            break;
          default:
            break;
        }
      }

      $scope.escoger_proceso = function (proceso, aplica, mensaje) {
        if (aplica == 'N') {
          swal('Información', mensaje, 'info')
        } else {
          $scope.camino = 2,
            $scope.codigo_proceso = proceso;
          $scope.json_servicios = [];
          swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/gestioncontrato.php",
            data: {
              function: 'P_LISTAR_PRODUC_VALIDADO',
              v_pcodigo_proceso: proceso,
            }
          }).then(function (response) {
            swal.close();
            if (response.data[0] != undefined) {
              $scope.listado_datos = response.data;
              $scope.servicios_mostrar = 4;
            } else {
              swal('Información', response.data.Nombre, 'info')
            }
          })
        }

      }
      // setTimeout(function () {
      //     $scope.mostrar_formulario_modal = true;
      //     console.log('hola')
      //     $('#modal_new').modal('open');
      //     $scope.email_noti = [];
      //     $scope.mostrar_acordeon = true;
      // }, 5);

      $scope.modal_bitacora = function (proceso, responsable, observacion) {
        $('#modal_bitacora').modal('open');
        $scope.bitacora_observacion = observacion;
        $scope.bitacora_responsable = responsable;
        $scope.bitacora_proceso = proceso;
      }
      $scope.listar_modal = function () {
        $scope.vector_padres = []
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_NOTIFICACIONES'
          }
        }).then(function (response) {
          console.log(response.data);
          $scope.json_modal = response.data;
          for (var i = 0; i < $scope.json_modal.length; i++) {
            var tempo = true;
            for (var j = 0; j < $scope.vector_padres.length; j++) {
              if ($scope.json_modal[i].padre == $scope.vector_padres[j].padre) {
                tempo = false;
              }
            }
            if (tempo == true) {
              $scope.vector_padres.push({
                nombre_padre: $scope.json_modal[i].nombre_padre,
                padre: $scope.json_modal[i].padre,
                acordeon: false
              })
            }

          }



          console.log($scope.vector_padres)

          $scope.mostrar_formulario_modal = false;
        })

      }
      $scope.guardar_infor_modal = function () {
        for (var i = 0; i < $scope.json_modal.length; i++) {
          if (($scope.json_modal[i].requerido == 'S') && (($scope.json_modal[i].email == '') && ($scope.json_modal[i].email == null) || ($scope.json_modal[i].email == undefined))) {
            swal({
              title: "Advertencia!",
              text: 'Por Los Menos Los Campos Requeridos Deben Estar Diligenciados',
              type: "info"
            }).then(function () {
            })
            break
          }
        }




      }
      // modal de otro modulos




      $scope.mostrar_busqueda_subcategoria = function () {
        $('#modal_buscar').modal('open');
        $scope.ListarResultado = [];
        $scope.buscar_producto = '';
      }

      $scope.buscar_subcategoria = function () {
        swal({
          title: 'Cargando...',
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            v_pcodigo: $scope.buscar_producto,
            function: 'P_OBTENER_SUBCATEGORIAS'
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length == 0) {
            $scope.ListarResultado = [];
          } else {
            $scope.ListarResultado = response.data;
          }

        });
      }

      $scope.borrar_busqueda_contrato = function () {
        //VARIABLES INICIALES
        $scope.busqueda = {
          numero: null,
          // numero: "8103",
          estado: "",
          regimen: "",
          prestador: "",
          prestador_nombre: ""
        };
        $scope.inactivecontratos = true;
      }

      $scope.tarifa_calcular = function () {
        if ($scope.switch_view) {
          var calcular = 0;
          if (
            $scope.gestion.TARIFA_VALOR != 0
          ) {
            calcular = (parseFloat($scope.gestion.TARIFA_VALOR) * parseFloat($scope.gestion.P_DESCUENTO)) / 100;

            if ($scope.gestion.DESCUENTO == 'S') {
              calcular = calcular + parseFloat($scope.gestion.TARIFA_VALOR);
            } else {
              calcular = parseFloat($scope.gestion.TARIFA_VALOR) - calcular;
            }
            $scope.gestion.VALOR = calcular | 0;

          }
        } else {
          var calcular = 0;
          $scope.cadena = '';
          if (
            $scope.gestion.TARIFA_VALOR != 0 && $scope.gestion.VALOR != '' &&
            $scope.gestion.VALOR != undefined
          ) {
            if ($scope.gestion.TARIFA_VALOR < $scope.gestion.VALOR) {
              $scope.gestion.DESCUENTO = 'S';
              calcular = (parseFloat($scope.gestion.VALOR) - parseFloat($scope.gestion.TARIFA_VALOR)) * 100;
              $scope.cadena = $scope.gestion.TARIFA_VALOR + "<" + $scope.gestion.VALOR + "=";
              $scope.cadena = $scope.cadena + " ( " + $scope.gestion.VALOR + " - " + $scope.gestion.TARIFA_VALOR + ")";

            } else {
              $scope.gestion.DESCUENTO = 'R'
              calcular = (parseFloat($scope.gestion.TARIFA_VALOR) - parseFloat($scope.gestion.VALOR)) * 100;
              $scope.cadena = $scope.gestion.TARIFA_VALOR + ">" + $scope.gestion.VALOR + "=";
              $scope.cadena = $scope.cadena + " ( " + $scope.gestion.TARIFA_VALOR + " - " + $scope.gestion.VALOR + ")";
            }
            calcular = calcular / parseFloat($scope.gestion.TARIFA_VALOR);
            $scope.gestion.P_DESCUENTO = calcular | 0;
            $scope.cadena = $scope.cadena + " / " + parseFloat($scope.gestion.TARIFA_VALOR);
          }

        }

      }

      $scope.abrir_modal_tarifa = function (index) {
        $scope.gestion.clasificacion = $scope.contrato_cabeza_clasificacion;
        $scope.gestion.clasificacion_nombre = $scope.contrato_cabeza_clasificacion_nombre;
        $scope.gestion.producto = $scope.contrato_cabeza_producto;
        $scope.gestion.producto_nombre = $scope.contrato_cabeza_producto_nombre;
        $scope.gestion.renglon = $scope.json_subcategoria[index].renglon;
        $scope.contrato_cabeza_subcategoria = $scope.json_subcategoria[index].codigo_alterno;
        $scope.contrato_cabeza_subcategoria_nombre = $scope.json_subcategoria[index].nombre_alterno;
        $scope.gestion.TARIFA = '';
        $scope.gestion.TARIFA_CODIGO = '';
        $scope.gestion.DESCUENTO = '';
        $scope.gestion.P_DESCUENTO = '';
        $('#modaltarifa').modal('open');
      }
      $scope.abrir_modal_producto = function (index) {
        $scope.gestion.clasificacion = $scope.contrato_cabeza_clasificacion;
        $scope.gestion.renglon = $scope.listas_productos[index].renglon;
        $scope.gestion.clasificacion_nombre = $scope.contrato_cabeza_clasificacion_nombre;
        $scope.gestion.producto = $scope.listas_productos[index].numero;
        $scope.gestion.producto_nombre = $scope.listas_productos[index].nombre;
        $scope.gestion.TARIFA = '';
        $scope.gestion.TARIFA_CODIGO = '';
        $scope.gestion.DESCUENTO = '';
        $scope.gestion.P_DESCUENTO = '';
        $('#modalproducto').modal('open');
      }

      // $scope.abrir_modal_producto();
      // abrir_modal1=function()
      $scope.abrir_modal_servicio = function (index) {

        $('#modalservicio').modal('open');
        $scope.gestion.clasificacion = $scope.listService[index].numero;
        $scope.gestion.renglon = $scope.listService[index].renglon;
        $scope.gestion.clasificacion_nombre = $scope.listService[index].nombre;
        $scope.gestion.TARIFA = '';
        $scope.gestion.TARIFA_CODIGO = '';
        $scope.gestion.DESCUENTO = '';
        $scope.gestion.P_DESCUENTO = '';

      }
      $scope.gestion = [];

      $scope.guardar_tarifa_subcategoria = function () {
        swal({
          title: 'Cargando...',
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/tarifacategoria.php",
          data: {
            v_pdocumento: $scope.infoContrato.documento,
            v_pnumero: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_prenglon: $scope.gestion.renglon,
            v_pservicio: $scope.gestion.clasificacion,
            v_pcodclasificacion: $scope.contrato_cabeza_subcategoria,
            v_pproducto: $scope.gestion.producto,
            v_pnit: $scope.infoContrato.nit,
            v_pcodtarifa: $scope.gestion.TARIFA_CODIGO,
            v_psuma: $scope.gestion.DESCUENTO,
            v_pporcentaje: $scope.gestion.P_DESCUENTO,
            v_pvalor: $scope.gestion.VALOR,
            function: 'P_INSERTA_CONTRATO_ALTERNO'
          }
        }).then(function (response) {
          swal.close();
          if (response.data.codigo == 0) {
            swal({
              title: "Completado!",
              text: response.data.Nombre,
              type: "success"
            }).then(function () {
              $scope.mostrar_subcategoria_contratos_bus($scope.gestion.producto, $scope.gestion.producto_nombre);
            })

          } else {
            swal('Información', "Favor Llenar los campos nuevamente", 'info');
          }

        });
      }


      // $scope.abrir_modal();
      $scope.hover_busqueda = false;
      //RELLENO DE BUSQUEDA CAMBIAR PROCEDIMIENTO POR LOS DEPARTAMENTO QUE TENGAS CONTRATO VIGENTE
      //CARGAR DEPARTAMENTO
      $http({
        method: 'POST',
        url: "php/funclistas.php",
        data: { function: 'cargaDepartamentos' }
      }).then(function (response) {
        $scope.json_departamentos = response.data;

      });
      //CARGAR DEPARTAMENTO
      $http({
        method: 'POST',
        url: "php/contratacion/funccontratacion.php",
        data: { function: 'P_LISTA_FORMA_PAGO' }
      }).then(function (response) {
        $scope.listformapago = response.data;
      });
      //CARGAR MUNICIPIO
      $scope.filtrar_municipio = function (departamento) {

        $http({
          method: 'PSOT',
          url: "php/funclistas.php",
          data: { function: 'cargaMunicipios', depa: departamento }
        }).then(function (response) {
          $scope.json_municipio = "";
          $scope.json_municipio = response.data;
        });
      }
      $scope.descargafile = function (ruta) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/juridica/tutelas/functutelas.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          swal.close()
          window.open("temp/" + response.data);
        });
      }
      $("form").on("change", ".file-upload-field", function () {
        var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
        var nombre = archivo[0];
        var ext = archivo[1];
        if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
          if ($(this)["0"].files["0"].size <= 15000000) { // se valida el tamaño del archivo
            if (ext.toUpperCase() == 'PDF' || ext.toUpperCase() == 'XLSX') { //se valida el tipo del archivo
              //$scope.validarEstructura($(this)["0"].files["0"], 7, $(this), nombre);
              $(this).parent(".file-upload-wrapper").attr("data-text", nombre + ext.toUpperCase());
              $scope.archivoExt = ext;
              $scope.fileToBase64($(this)["0"].files, nombre);
              $scope.thisfile = $(this);
            } else {
              swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .PDF o excel', 'warning')
              $(this).val("");
              $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
              if ($(this)["0"].id == 'CT') {
                $scope.switcharchivos = true;
                $scope.ctlleno = false;
              }

            }
          } else {
            swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 15 megabytes', 'error')
            $(this).val().replace(/.*(\/|\\)/, '');
            if ($(this)["0"].id == 'CT') {
              $scope.switcharchivos = true;
              $scope.ctlleno = false;
            }

          }
        } else {
          $(this).val("");
          $(this).parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
          if ($(this)["0"].id == 'CT') {
            $scope.switcharchivos = true;
            $scope.ctlleno = false;
          }

        }
        $scope.$apply();;
      });

      $scope.fileToBase64 = function (filesSelected, name) {
        $scope.mostrar_guardar = true;
        if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var fileReader = new FileReader();
          fileReader.onload = function (fileLoadedEvent) {
            $scope.archivo = fileLoadedEvent.target.result
          };
          fileReader.readAsDataURL(fileToLoad);

        }
        $scope.$apply();;
      }

      $scope.captura_evento_teclado = function (keyEvent, tipo, id) {
        switch (tipo) {
          case 'C':
            if (keyEvent.which === 40) {
              if ($scope.filtroCobertura.length != 0) {
                for (var s = 0; s < $scope.filtroCobertura.length; s++) {
                  $scope.filtroCobertura[s].ESTADO = false;
                }
                $scope.seleccion = $scope.seleccion >= ($scope.filtroCobertura.length - 1) ? 0 : $scope.seleccion + 1;
                $scope.filtroCobertura[$scope.seleccion].ESTADO = true;
                var id = $scope.filtroCobertura[$scope.seleccion].CODIGO;
                document.querySelector('#list-group-ubicacion').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

              }

            } else if (keyEvent.which === 38) {
              for (var s = 0; s < $scope.filtroCobertura.length; s++) {
                $scope.filtroCobertura[s].ESTADO = false;
              }
              if ($scope.seleccion <= 0) {
                $scope.seleccion = -1;
              } else {
                $scope.seleccion = $scope.seleccion - 1;
                $scope.filtroCobertura[$scope.seleccion].ESTADO = true;
                var id = $scope.filtroCobertura[$scope.seleccion].CODIGO;
                document.querySelector('#list-group-ubicacion').scrollTo(0, document.querySelector('#DM' + id).offsetTop)
              }

            } else if (keyEvent.which === 13) {
              if ($scope.seleccion != -1) {
                $scope.seleccionar_combo($scope.filtroCobertura[$scope.seleccion].CODIGO, $scope.filtroCobertura[$scope.seleccion].NOMBRE, tipo);
              }
            } else {
              $scope.buscar_listados(tipo);
              $scope.seleccion = -1;
            }
            break;
          case 'C2':
            if (keyEvent.which === 40) {
              if ($scope.filtroCobertura_fisica.length != 0) {
                for (var s = 0; s < $scope.filtroCobertura_fisica.length; s++) {
                  $scope.filtroCobertura_fisica[s].estado = false;
                }
                $scope.seleccion = $scope.seleccion >= ($scope.filtroCobertura_fisica.length - 1) ? 0 : $scope.seleccion + 1;
                $scope.filtroCobertura_fisica[$scope.seleccion].estado = true;
                var id = $scope.filtroCobertura_fisica[$scope.seleccion].codigo;
                document.querySelector('#list-group-ubicacion-fisica').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

              }

            } else if (keyEvent.which === 38) {
              for (var s = 0; s < $scope.filtroCobertura_fisica.length; s++) {
                $scope.filtroCobertura_fisica[s].ESTADO = false;
              }
              if ($scope.seleccion <= 0) {
                $scope.seleccion = -1;
              } else {
                $scope.seleccion = $scope.seleccion - 1;
                $scope.filtroCobertura_fisica[$scope.seleccion].ESTADO = true;
                var id = $scope.filtroCobertura_fisica[$scope.seleccion].codigo;
                document.querySelector('#list-group-ubicacion-fisica').scrollTo(0, document.querySelector('#DM' + id).offsetTop)
              }

            } else if (keyEvent.which === 13) {
              if ($scope.seleccion != -1) {
                $scope.seleccionar_combo($scope.filtroCobertura_fisica[$scope.seleccion].CODIGO, $scope.filtroCobertura_fisica[$scope.seleccion].NOMBRE, tipo);
              }
            } else {
              $scope.buscar_listados(tipo);
              $scope.seleccion = -1;
            }
            break;
          case 'T':
            if (keyEvent.which === 40) {
              if ($scope.filtroTarifa.length != 0) {
                for (var s = 0; s < $scope.filtroTarifa.length; s++) {
                  $scope.filtroTarifa[s].ESTADO = false;
                }
                $scope.seleccion = $scope.seleccion >= ($scope.filtroTarifa.length - 1) ? 0 : $scope.seleccion + 1;
                $scope.filtroTarifa[$scope.seleccion].ESTADO = true;
                var id = $scope.filtroTarifa[$scope.seleccion].codigo;
                document.querySelector('#list-group-tarifa').scrollTo(0, document.querySelector('#DM' + id).offsetTop);

              }

            } else if (keyEvent.which === 38) {
              for (var s = 0; s < $scope.filtroTarifa.length; s++) {
                $scope.filtroTarifa[s].ESTADO = false;
              }
              if ($scope.seleccion <= 0) {
                $scope.seleccion = -1;
              } else {
                $scope.seleccion = $scope.seleccion - 1;
                $scope.filtroTarifa[$scope.seleccion].ESTADO = true;
                var id = $scope.filtroTarifa[$scope.seleccion].codigo;
                document.querySelector('#list-group-tarifa').scrollTo(0, document.querySelector('#DM' + id).offsetTop)
              }

            } else if (keyEvent.which === 13) {
              if ($scope.seleccion != -1) {
                $scope.seleccionar_combo($scope.filtroTarifa[$scope.seleccion].codigo, $scope.filtroTarifa[$scope.seleccion].nombre, tipo);
              }
            } else {
              $scope.buscar_listados(tipo);
              $scope.seleccion = -1;
            }
            break;
          case 'T2':
            $scope.mostrar_listado_tarifa = null;
            if (keyEvent.which === 40) {
              if ($scope.filtroTarifa.length != 0) {
                for (var s = 0; s < $scope.filtroTarifa.length; s++) {
                  $scope.filtroTarifa[s].ESTADO = false;
                }
                $scope.seleccion = $scope.seleccion >= ($scope.filtroTarifa.length - 1) ? 0 : $scope.seleccion + 1;
                $scope.filtroTarifa[$scope.seleccion].ESTADO = true;
                var codigo = $scope.filtroTarifa[$scope.seleccion].codigo;
                document.querySelector('#list-group-t' + id).scrollTo(0, document.querySelector('#DM' + codigo).offsetTop);

              }

            } else if (keyEvent.which === 38) {
              for (var s = 0; s < $scope.filtroTarifa.length; s++) {
                $scope.filtroTarifa[s].ESTADO = false;
              }
              if ($scope.seleccion <= 0) {
                $scope.seleccion = -1;
              } else {
                $scope.seleccion = $scope.seleccion - 1;
                $scope.filtroTarifa[$scope.seleccion].ESTADO = true;
                var codigo = $scope.filtroTarifa[$scope.seleccion].codigo;
                document.querySelector('#list-group-t' + id).scrollTo(0, document.querySelector('#DM' + codigo).offsetTop)
              }

            } else if (keyEvent.which === 13) {
              if ($scope.seleccion != -1) {
                $scope.seleccionar_combo_tarifa_l($scope.filtroTarifa[$scope.seleccion].codigo, $scope.filtroTarifa[$scope.seleccion].nombre, id);
              }
            } else {
              $scope.buscar_listados(tipo, id);
              $scope.seleccion = -1;
            }
            break
          default:
            break;
        }



      }

      $scope.buscar_listados = function (tipo, index) {
        switch (tipo) {
          case 'C':
            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'p_obtener_cobertura',
                codigo: $scope.contrato.ubicacion
              }
            }).then(function (response) {
              if (response.data.length == 0) {
                $scope.ListarResultado = [];
                $scope.filtroCobertura = [];

              } else {
                if (response.data.length == 1) {
                  $scope.seleccionar_combo(response.data[0].CODIGO, response.data[0].NOMBRE, tipo, response.data[0].VL_UPC, response.data[0].CANTIDAD_AFILIADOS);
                } else {
                  $scope.filtroCobertura = response.data;
                  $scope.ListarResultado = response.data;
                  for (var s = 0; s < $scope.filtroCobertura.length; s++) {
                    $scope.filtroCobertura[s].ESTADO = false;
                  }
                }
              }
            });
            break;
          case 'C2':
            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'p_obtener_cobertura',
                codigo: $scope.contrato.ubicacion_fisica
              }
            }).then(function (response) {
              if (response.data.length == 0) {
                $scope.ListarResultado = [];
                $scope.filtroCobertura_fisica = [];
              } else {
                if (response.data.length == 1) {
                  $scope.seleccionar_combo(response.data[0].CODIGO, response.data[0].NOMBRE, tipo);
                } else {
                  $scope.filtroCobertura_fisica = response.data;
                  $scope.ListarResultado = response.data;
                  for (var s = 0; s < $scope.filtroCobertura_fisica.length; s++) {
                    $scope.filtroCobertura_fisica[s].ESTADO = false;
                  }
                }
              }
            });
            break;
          case 'T':
            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'p_listar_tarifa_base',
              }
            }).then(function (response) {
              if (response.data.length == 0) {
                $scope.ListarResultado = [];
                $scope.filtroTarifa = [];

              } else {
                if (response.data.length == 1) {
                  $scope.seleccionar_combo(response.data[0].codigo, response.data[0].nombre, tipo);
                } else {
                  $scope.filtroTarifa = response.data;
                  $scope.ListarResultado = response.data;
                  for (var s = 0; s < $scope.filtroTarifa.length; s++) {
                    $scope.filtroTarifa[s].ESTADO = false;
                  }
                }
              }
            });
            break;
          case 'T2':

            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'p_listar_tarifa_base',
                codigo: $scope.json_servicios[index].TARIFA_NOMBRE
              }
            }).then(function (response) {

              if (response.data.length == 0) {
                $scope.ListarResultado = [];
                $scope.filtroTarifa = [];

              } else {
                if (response.data.length == 1) {
                  $scope.seleccionar_combo_tarifa_l(response.data[0].codigo, response.data[0].nombre, index);
                } else {
                  $scope.mostrar_listado_tarifa = index;
                  $scope.filtro_tari = response.data;
                  $scope.ListarResultado = response.data;
                  for (var s = 0; s < $scope.filtroTarifa.length; s++) {
                    $scope.filtroTarifa[s].ESTADO = false;
                  }
                }
              }
            });

            break;
          default:
            break;
        }

      }

      $scope.AbjuntarDiagnosticos = function () {
        if ($scope.contrato.diagnostico == true) {
          $scope.vercargaradjunto = true;
        } else {
          $scope.vercargaradjunto = false;
        }
      }


      $scope.buscar_listados('T', '');
      $scope.seleccionar_combo_tarifa_l = function (codigo, nombre, index) {
        $scope.json_servicios[index].TARIFA_NOMBRE = nombre;
        $scope.json_servicios[index].TARIFA = codigo;
        $scope.mostrar_listado_tarifa = null;
      }
      $scope.seleccionar_combo = function (codigo, nombre, tipo, upc_sub, upc_con, afiliado) {
        switch (tipo) {
          case 'C':
            $scope.contrato.ubicacion = nombre;
            $scope.contrato.ubicacion_codigo = codigo;
            $scope.borrar_listado(tipo);


            var upc = $scope.contrato.regimen == 'KC' ? upc_sub : upc_con;
            $scope.contrato.upc_municipio = upc;
            $scope.contrato.upc_municipio_mostrar = $scope.formatPeso2(upc.toString().replace(',', '.'));
            $scope.contrato.afiliado_mostrar_evento = $scope.formatPeso2(afiliado);
            $scope.contrato.afiliado_mostrar = $scope.formatPeso2(afiliado);
            $scope.contrato.afiliado = afiliado;
            $scope.contrato.afiliado_e = afiliado;
            // $scope.FormatPesoID_valor('Afiliado', afiliado);
            // $scope.FormatPesoID_valor('Afiliado_e', afiliado);

            break;
          case 'C2':
            $scope.contrato.ubicacion_fisica = nombre;
            $scope.contrato.ubicacion_fisica_codigo = codigo;
            $scope.borrar_listado(tipo);
            break;
          case 'T':
            $scope.contrato.tarifa = nombre;
            $scope.contrato.tarifa_codigo = codigo;
            $scope.borrar_listado(tipo);
            break;

          default:
            break;
        }

      }
      $scope.borrar_listado = function (tipo) {
        switch (tipo) {
          case 'C':
            setTimeout(function () {
              $scope.ListarResultado = [];
              $scope.filtroCobertura = [];
              if ($scope.contrato.ubicacion_codigo == '') {
                $scope.contrato.ubicacion = '';
              }
            }, 5);

            break;
          case "C2":
            setTimeout(function () {
              $scope.ListarResultado = [];
              $scope.filtroCobertura_fisica = [];
              if ($scope.contrato.ubicacion_fisica_codigo == undefined) {
                $scope.contrato.ubicacion_fisica = '';
              }


            }, 5);

            break;
          case 'T':
            setTimeout(function () {
              $scope.ListarResultado = [];
              $scope.filtroTarifa = [];
            }, 5);
            break;
          // case 'T2':
          //     setTimeout(function () {
          //         $scope.mostrar_listado_tarifa = null;
          //     }, 5);
          //     break;
          default:
            break;
        }

      }



      $scope.limite = function (nombre) {
        if (nombre.length < 15) {
          return nombre;
        } else {
          return nombre.substring(0, 15) + "...  ";
        }
      }





      //VARIABLES INICIALES
      $scope.busqueda = {
        numero: null,
        // numero: "8103",
        estado: "",
        regimen: "",
        prestador: "",
        prestador_nombre: ""
      };

      //buscando servicios oncologicos
      $http({
        method: 'POST',
        url: "php/contratacion/funccontratacion.php",
        data: {
          function: 'P_LISTA_ROL_ONCOLOGICO',
        }
      }).then(function (response) {

        if (response.data.length > 0) {
          $scope.lista_rol_oncologico = response.data;
          console.log($scope.listcontratos);
        } else {
          $scope.lista_rol_oncologico = [];
        }
      })


      //PRESTADOR
      $scope.buscar_listado_select = function () {
        $scope.listar_ser_habilitacion = [];
        $scope.listar_cod_habilitacion = [];
        if ($scope.busqueda.prestador_nombre.length >= 4) {
          $http({
            method: 'POST',
            url: "php/contratacion/gestioncontrato.php",
            data: {
              function: 'p_obtener_ips_contratado',
              codigo: $scope.busqueda.prestador_nombre
            }
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.ListarResultado = "";
            } else {
              if (response.data[0].CODIGO == 1) {
                $scope.json_prestador = [];
              } else {
                if (response.data.length == 1) {
                  $scope.seleccion_opcion(response.data[0].CODIGO, response.data[0].NOMBRE);
                } else {
                  $scope.json_prestador = response.data;
                  console.log($scope.json_prestador);
                }
              }


            }
          });
        } else if ($scope.busqueda.prestador.length >= 5) {
          $http({
            method: 'POST',
            url: "php/contratacion/gestioncontrato.php",
            data: {
              function: 'p_obtener_ips_contratado',
              codigo: $scope.busqueda.prestador_nombre
            }
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.ListarResultado = "";
            } else {
              if (response.data.length == 1) {
                $scope.seleccion_opcion(response.data[0].CODIGO, response.data[0].NOMBRE);
              }

            }
          });
        }
      }

      $scope.buscar_listado_select_tarifa = function () {

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'p_listar_tarifa_base',
            codigo: $scope.gestion.TARIFA,
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            $scope.json_tarifa = [];
          } else {
            if (response.data.length == 1) {
              $scope.json_tarifa = response.data;
              $scope.seleccion_opcion_tarifa(0);
            } else {
              $scope.json_tarifa = response.data;
              // console.log($scope.json_tarifa);
            }

          }
        });

      }
      $scope.buscar_listado_select_tarifa();
      $scope.buscar_listado_select_tarifa2 = function () {

        $http({
          method: 'POST',
          url: "php/contratacion/tarifacategoria.php",
          data: {
            function: 'p_lista_tarifa',
            codigo: $scope.gestion.TARIFA,
            producto: $scope.gestion.producto
          }
        }).then(function (response) {
          if (response.data.length == 0) {
            $scope.json_tarifa = [];
          } else {
            if (response.data.length == 1) {
              $scope.json_tarifa = response.data;
              $scope.seleccion_opcion_tarifa(0);
            } else {
              $scope.json_tarifa = response.data;
              console.log($scope.json_tarifa);
            }

          }
        });

      }
      $scope.buscar_listado_select_tarifa2();
      $scope.seleccion_opcion_tarifa2 = function (x) {
        $scope.gestion.TARIFA = $scope.json_tarifa[x].NOMBRE;
        $scope.gestion.TARIFA_CODIGO = $scope.json_tarifa[x].CODIGO;
        $scope.gestion.TARIFA_VALOR = $scope.json_tarifa[x].VALOR;
        $scope.json_tarifa = [];
      }

      $scope.seleccion_opcion_tarifa = function (x) {
        $scope.gestion.TARIFA = $scope.json_tarifa[x].nombre;
        $scope.gestion.TARIFA_CODIGO = $scope.json_tarifa[x].codigo;
        $scope.gestion.TARIFA_VALOR = $scope.json_tarifa[x].valor;
        $scope.json_tarifa = [];
      }
      // (v_pempresa in number default 1,
      //     v_pdocumento in varchar2,
      //     v_pnumero in number,
      //     v_pubicacion in number,
      //     v_prenglon in number,
      //     v_pservicio in number,
      //     v_ptarifa in number,
      //     v_psuma in char,
      //     v_pporcentaje in number,
      //     v_pjson_row  out clob)
      $scope.guardar_servicio_modal = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_ACTUALIZA_SERVICIOS',
            v_pempresa: '1',
            v_pdocumento: $scope.infoContrato.documento,
            v_pnumero: $scope.infoContrato.numero,
            V_ubicacion: $scope.infoContrato.ubicacion_id,
            v_prenglon: $scope.gestion.renglon,
            v_pservicio: $scope.gestion.clasificacion,
            v_ptarifa: $scope.gestion.TARIFA_CODIGO,
            v_psuma: $scope.gestion.DESCUENTO,
            v_pporcentaje: $scope.gestion.P_DESCUENTO
          }
        }).then(function (response) {
          swal.close();
          if (response.data.CODIGO == 1) {
            swal({
              title: "Completado!",
              text: response.data.NOMBRE,
              type: "success"
            }).then(function () {
              $scope.obtenerServiciosContratados();

            })

          } else {
            swal('Información', response.data.NOMBRE, 'info');
          }
        });
      }

      $scope.guardar_producto_modal = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_ACTUALIZA_PRODUCTOS',
            v_pempresa: '1',
            v_pdocumento: $scope.infoContrato.documento,
            v_pnumero: $scope.infoContrato.numero,
            V_ubicacion: $scope.infoContrato.ubicacion_id,
            v_prenglon: $scope.gestion.renglon,
            v_pservicio: $scope.gestion.clasificacion,
            v_pproducto: $scope.gestion.producto,
            v_ptarifa: $scope.gestion.TARIFA_CODIGO,
            v_psuma: $scope.gestion.DESCUENTO,
            v_pporcentaje: $scope.gestion.P_DESCUENTO,
            v_pvalor: $scope.gestion.VALOR
          }
        }).then(function (response) {
          swal.close();
          if (response.data.CODIGO == 1) {
            swal({
              title: "Completado!",
              text: response.data.NOMBRE,
              type: "success"
            }).then(function () {
              $scope.mostrar_productos_contratos_bus();

            })

          } else {
            swal('Información', response.data.NOMBRE, 'info');
          }
        });
      }
      $scope.seleccion_opcion = function (codigo, nombre) {

        $scope.busqueda.prestador = codigo;
        $scope.busqueda.prestador_nombre = nombre;
        $scope.json_prestador = [];
      }

      $scope.viewfindcontrato = true; //VISTA DE IPS
      $scope.inactivecontratos = true;
      $scope.paso = 1;
      $scope.titulo_tab = "Resultados Encontrados";

      //variables de relleno
      $scope.estado = 'A';












      //buscar por ips, unicaicon o prestado
      $scope.buscar = function () {

        if (
          ($scope.busqueda.numero == null) &&
          ($scope.busqueda.prestador == "")
        ) {
          swal('Información', "Por lo menos digitar un campo de busqueda valido", 'info');
          $scope.ListarResultado = "";
          $scope.inactivecontratos = true;

        } else {
          if (($scope.busqueda.estado == "") || ($scope.busqueda.regimen == "")) {
            swal('Información', "El campo Estado y Regimen Debe ser Obligatorio", 'info');
            $scope.ListarResultado = "";
            $scope.inactivecontratos = true;
          } else {
            swal({
              title: 'Cargando información...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/contratacion/tarifacategoria.php",
              data: {
                function: 'P_BUSCAR_CONTRATOS',
                codigo: $scope.busqueda.numero,
                prestador: $scope.busqueda.prestador,
                regimen: $scope.busqueda.regimen,
                estado: $scope.busqueda.estado,
              }
            }).then(function (response) {
              swal.close();
              if (response.data.CODIGO == 0) {
                var mensaje = response.data.NOMBRE == null ? "No se encontrarón Resultados " : response.data.NOMBRE;
                swal('Información', mensaje, 'info');
                $scope.inactivecontratos = true;
              } else {
                $scope.json_contratos = response.data;
                $scope.inactivecontratos = false;
                $scope.paso = 1;
              }
            });
          }

        }

      }



      // PASO 2 TAB
      $scope.obtenerPolizas = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'obtenerPolizasContrato',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listPolizas = response.data;
            $scope.tab_active = 4;
          } else {
            swal('Información', "Este Contrato no Contiene Poliza", 'info');
          }
        })
      }

      $scope.obtenerPgp = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'obtenerDatosPgp',
            v_pdocumento: $scope.infoContrato.documento,
            v_pcontrato: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
          }
        }).then(function (response) {
          console.log(response);
          swal.close();
          if (response.data[0]) {
            $scope.ListaDatosPGP = response.data[0];
            $scope.datosdiagnosticos = $scope.ListaDatosPGP.dx;
            $scope.tab_active = 10;
          } else {
            swal('Información', "Este Contrato no Contiene PGP", 'info');
          }
        })
      }
      $scope.procesar_contrato = function (ind) {
        swal({
          title: 'Confirmar',
          text: '¿Seguro Que Desea Cambiar El Estado Al Contrato?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result) {
            //  alert(ind);
            swal({
              title: 'Cargando información...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            // var data = $scope.json_contratos[ind];
            $http({
              method: 'POST',
              url: "php/contratacion/funccontratacion.php",
              data: {
                function: 'P_CONFIRMA_CNC_SAL_GEN',
                numero: $scope.infoContrato.numero,
                ubicacion: $scope.infoContrato.ubicacion_id,
                documento: $scope.infoContrato.documento,
                operacion: ind
              }
            }).then(function (response) {
              swal.close();

              if (response.data.Codigo == 0) {
                $scope.paso = $scope.paso - 1;
                swal({
                  title: "Completado!",
                  text: response.data.Nombre,
                  type: "success"
                }).then(function () {
                  $scope.gestionar_contrato($scope.indicador);

                })

              } else {
                swal('Información', response.data.Nombre, 'info');
              }
            })
          }
        })

      }
      $scope.gestionar_contrato = function (ind) {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.cambiar_paso();
        // $scope.contrado_selecionado = true;
        // console.log($scope.json_contratos[ind]);
        // $scope.contrato_cabeza = $scope.json_contratos[ind];

        // $scope.buscar_clasificacion();
        var data = $scope.json_contratos[ind];
        $scope.indicador = ind;
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_OBTENER_CONTRATO',
            numero: data.numero,
            ubicacion: data.ubicacion,
            documento: data.documento_id
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.infoContrato = response.data[0];
            $scope.inactiveprocedimientos = true;
            $scope.tab_active = 0;
          } else {
            swal('Información', "Favor Intente buscar Contrato Nuevamente", 'info');
          }
        })


      }
      $scope.obtenerServiciosContratados = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_OBTENER_SERVICIOS_CONTRATO',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          $scope.obtenerServiciosSeleccionadas();
          swal.close();
          if (response.data.length > 0) {
            $scope.tab_active = 1;
            $scope.listService = response.data;
            $(".indicator").css({ "right": "406.406px", "left": "0px" });

          } else {
            swal('Información', "Este Contrato no Contiene Servicios", 'info');
          }
        })
      }
      // inicio Control de Cambio Yordis Escorcia 28/02/2023
      $scope.obtenerServiciosSeleccionadas = function () {
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_OBTENER_SERVICIOS_SELECCIONADOS_CONTRATO',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          $scope.listServiceSeleccionados = response.data;

        })
      }
      // fin Control de Cambio Yordis Escorcia 28/02/2023
      $scope.mostrar_productos_contratos_bus = function (ind) {
        $scope.cadena = '';
        $scope.contrato_cabeza_clasificacion_nombre = ind != undefined ? $scope.listService[ind].nombre : $scope.contrato_cabeza_clasificacion_nombre;
        $scope.contrato_cabeza_clasificacion = ind != undefined ? $scope.listService[ind].numero : $scope.contrato_cabeza_clasificacion;
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/tarifacategoria.php",
          data: {
            function: 'P_OBTENER_PRODUCTOS_SERVICIOS_CONTRATO',
            codigo: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_pdocumento: $scope.infoContrato.documento,
            v_pservicio: $scope.contrato_cabeza_clasificacion
          }
        }).then(function (response) {
          swal.close();
          $scope.listas_productos = response.data;
          $scope.tab_active = 110;

        });

      }

      $scope.mostrar_subcategoria_contratos_bus = function (numero, nombre) {

        $scope.contrato_cabeza_producto_nombre = nombre;
        $scope.contrato_cabeza_producto = numero;
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/tarifacategoria.php",
          data: {
            function: 'P_OBTENER_PRODUCTOS_CAT_ALTERNA_SERVICIOS_CONTRATO',
            codigo: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_pdocumento: $scope.infoContrato.documento,
            v_pservicio: $scope.contrato_cabeza_clasificacion,
            v_pproducto: $scope.contrato_cabeza_producto
          }
        }).then(function (response) {
          swal.close();

          $scope.json_subcategoria = response.data;
          $scope.tab_active = 120;
        });
      }

      $scope.obtenerModificaciones = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $scope.modificacion = {};
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'obtenerModificacionesContrato',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.total = response.data.length;
            $scope.actual = 0;
            $scope.listModificaciones = response.data;
            $scope.modificacion = $scope.listModificaciones[0];
            $scope.tab_active = 2;
          } else {
            swal('Información', "Este Contrato no Contiene Modificaciones", 'info');

          }
        })
      }
      $scope.verModificaciones = function (actual, opcion) {
        if (opcion == 'next') {
          if ($scope.total == actual + 1) {
            return;
          } else {
            $scope.actual = $scope.actual + 1;
            $scope.modificacion = $scope.listModificaciones[actual];
          }
        } else {
          if (actual == 0) {
            return;
          } else {
            $scope.actual = $scope.actual - 1;
            $scope.modificacion = $scope.listModificaciones[actual];
          }
        }

      }
      $scope.obtenerTareas = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'obtenerTareasContrato',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listTareas = response.data;
            $scope.tab_active = 3;
          } else {
            swal('Información', "Este Contrato no Tiene Tareas", 'info');

          }
        })
      }
      $scope.obtenerPolizas = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'obtenerPolizasContrato',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listPolizas = response.data;
            $scope.tab_active = 4;
          } else {
            swal('Información', "Este Contrato no Contiene Poliza", 'info');
          }
        })
      }

      $scope.obtenerAdjuntos = function () {
        $scope.tab_active = 7;
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        ////////////////////////////////////
        $scope.checkAdjuntos = false;
        $scope.checkAdjuntosGestion = false;
        $("#file-upload-field-enviados").parent(".file-upload-wrapper").attr("data-text", `Subir Archivo`);
        $scope.adjuntoEnv = {
          soporteB64: '',
          soporteExt: '',
        }
        $scope.obtenerTiposAdjuntos_Env();
        $scope.obtenerListadoEnviados();
        ////////////////////////////////////
        const v_pdocumento = $scope.infoContrato.documento
        //($scope.infoContrato.cod_concepto == 'CA' || $scope.infoContrato.cod_concepto == 'PG') ? $scope.infoContrato.documento : ''
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_OBTENER_TIPO_ADJUNTO',
            v_pdocumento
            // v_pdocumento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          if (response.data.length > 0) {
            var data = []
            response.data.forEach(e => {
              if (($scope.infoContrato.cod_concepto == 'CA' || $scope.infoContrato.cod_concepto == 'PG')) {
                data.push(e)
              } else if (!($scope.infoContrato.cod_concepto == 'CA' || $scope.infoContrato.cod_concepto == 'PG') && e.numero < 12) {
                data.push(e)
              }
            });
            $scope.tipoAdjunos = data;

          } else {
          }
        })
        $scope.tab_active = 7;
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_OBTENER_ADJUNTO_CONTRATO',
            v_pempresa: 1,
            v_pdocumento: $scope.infoContrato.documento,
            v_pnumero: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listAdjunos = response.data;
          } else {
            $scope.listAdjunos = [];
          }
        })
      }
      $scope.ngTipoAdjuntos = function () {
        // if ($scope.tipo_adjunto) {
        //   $scope.listAdjunos.forEach(e => {
        //     if ($scope.tipo_adjunto == e.cod_tipo_adjunto) {
        //       $scope.tipo_adjunto = '';
        //       swal('Información', 'Este archivo ya fue cargado', 'info');
        //     }
        //   });
        // }
      }

      $scope.p_inserta_adjunto_contrato = function () {
        if (!$scope.tipo_adjunto) { swal('Información', 'Diligencie los campos', 'info'); return }
        //console.log($scope.fecha_vencimiento_adjunto);
        //console.log(parsedia($scope.fecha_vencimiento_adjunto));
        var f_vencimiento = new Date();
        // console.log(f_vencimiento);
        // console.log(parsedia(f_vencimiento));
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_INSERTA_ADJUNTO_CONTRATO',
            v_pempresa: 1,
            v_pdocumento: $scope.infoContrato.documento,
            v_pnumero: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_presponsable: sessionStorage.getItem('cedula'),
            v_pjson_adjuntos: JSON.stringify([{
              TIPO_DOCUMENTO: $scope.tipo_adjunto,
              RUTA: '',
              FECHA_VENCIMIENTO: parsedia(f_vencimiento) //parsedia($scope.fecha_vencimiento_adjunto)
            }]),
            archivo: $scope.archivo,
            ext: $scope.archivoExt
          }
        }).then(function (response) {
          swal.close();
          if (response.data.CODIGO == 0) {
            $scope.thisfile.val("");
            $scope.obtenerAdjuntos();
            $scope.thisfile.parent(".file-upload-wrapper").attr("data-text", 'Subir Archivo');
            $scope.tipo_adjunto = null;
            $scope.fecha_vencimiento_adjunto = null;

          } else {
            swal('Información', response.data.NOMBRE, 'info');
          }
        })
      }
      $scope.obtenerDptosContrato = function () {
        $scope.contratacion_IPS();
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'obtenerDepartamentosContrato',
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id,
            documento: $scope.infoContrato.documento
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listDptos = response.data;
            $scope.tab_active = 5;
          } else {
            swal('Información', "Hubo Un Error Buscando la Cobertura, Favor Intente Nuevamente", 'info');
          }
        })
      }
      $scope.verUbicaciones = function (tipo, info) {
        if (tipo) {
          swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $scope.dptoseleccionado = info.departamento;
          $scope.dptoseleccionado_id = info.departamento_id;
          $scope.findmunicipio = '';
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'obtenerMunicipiosContratoDepartamento',
              numero: $scope.infoContrato.numero,
              ubicacion: $scope.infoContrato.ubicacion_id,
              documento: $scope.infoContrato.documento,
              departamento: info.departamento_id
            }
          }).then(function (response) {
            swal.close();
            if (response.data.length > 0) {
              $scope.listMunicipios = response.data;
              $scope.tab_active = 6;
            } else {
              swal('Información', "Hubo Un Error Buscando la Cobertura, Favor Intente Nuevamente", 'info');
              $scope.tab_active = 5;

            }
          })
          $scope.inactiveubicaciones = false;
        } else {
          $scope.tab_active = 5;
        }

      }

      $scope.cambiar_paso = function () {
        $scope.paso = $scope.paso + 1
      }


      // nuevo contrato
      $scope.openModal = function (tipo, tipo_dato) {
        switch (tipo) {
          case 'tarifa':
            $('#modaltarifa').modal('open');
            break;
          case 'prestador':
            $scope.buscard2 = '';
            $scope.listIps = [];
            $('#modalprestador').modal('open');
            $scope.var_temporal = tipo_dato;
            break;
          default:
            break;
        }
      }
      $scope.closemodals = function (tipo) {
        switch (tipo) {
          case 'tarifa':
            $('#modaltarifa').modal('close');
            break;
          case 'prestador':
            $('#modalprestador').modal('close');
            break;
          default:
            $('#' + tipo).modal('close');

            break;
        }
      }

      $scope.buscarIps = function (buscar) {
        if (buscar.length >= 6) {
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'p_lista_ips',
              codigo: buscar
            }
          }).then(function (response) {
            if (response.data.length == 0) {
              $scope.ListarResultado = "";
            } else {
              if (response.data[0].CODIGO == 1) {
                $scope.listIps = [];
              } else {
                $scope.listIps = response.data;
                // for (let i = 0; i < $scope.listIps.length; i++) {
                //     $scope.listIps[i].ESTADO = false;
                // }
                console.log($scope.listIps);
              }
            }
          });
        }
      }
      $scope.escogerips_unica = function (ind) {
        if ($scope.var_temporal == 'UNICA') {
          $scope.ips_unica = $scope.listIps[ind];
          $scope.contrato.union_temporal = $scope.ips_unica.union_temporal == 'N' ? false : true;
          $scope.contrato.representante_legal = $scope.ips_unica.cod_representante;
          $scope.contrato.nombre_representante_legal = $scope.ips_unica.nom_representante;
        } else {
          $scope.ips_multiple.push($scope.listIps[ind])
          $('#modalprestador').modal('close');
        }
        $scope.listar_sede_prestacion();
        $('#modalprestador').modal('close');
      }
      $scope.eliminar_ips = function (i) {
        $scope.ips_multiple.splice(i, 1)
      }
      $scope.listar_sede_prestacion = function () {
        $scope.listar_sed_habilitacion = [];
        $scope.listado_elegido_sed = [];
        $scope.checktodos1 = false;
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_SEDE_PRESTACION',
            ips: $scope.ips_unica.codigo
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listar_sed_habilitacion = response.data;
            // console.log($scope.listar_cod_habilitacion);
          } else {

          }
        })
      }

      $scope.eligir_sed_habilitacion = function (x) {
        if (x == -1) {
          var nuevo_estado = $scope.checktodos1 == true ? true : false;
          $scope.listado_elegido_sed = [];
          for (let index = 0; index < $scope.listar_sed_habilitacion.length; index++) {
            $scope.listar_sed_habilitacion[index].estado = nuevo_estado;
            if (nuevo_estado == true) {
              $scope.listado_elegido_sed.push($scope.listar_sed_habilitacion[index]);
            }
          }
        } else {
          var ind = $scope.listar_sed_habilitacion.findIndex(obj => obj.cod_sede == x);
          if ($scope.listar_sed_habilitacion[ind].estado == true) {
            $scope.listado_elegido_sed.push($scope.listar_sed_habilitacion[ind]);
          } else {
            $scope.listado_elegido_sed.splice(ind, 1);
          }
        }
        console.log($scope.listado_elegido_sed);

      }
      $scope.createContrato = function (opcion) {
        $scope.servicios_mostrar = 1;
        $scope.viewfindcontrato = opcion;
        $scope.viewnewcontrato = !opcion;
        $scope.stepNewContrato();
        $scope.ips_unica = [];
        $scope.ips_multiple = [];
      }
      $scope.buscar_concepto = function () {
        $scope.contrato.ubicacion = "";
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'p_lista_conceptos_mod',
            documento: $scope.contrato.regimen
          }
        }).then(function (response) {

          if (response.data.length > 0) {
            $scope.listcontratos = response.data;
            console.log($scope.listcontratos);
          } else {
            swal('Información', "Favor elegir nuevamente el Regimen", 'info');
          }
        })
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'p_lista_clase_mod',
            documento: $scope.contrato.regimen
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listclase = response.data;
            // // console.log($scope.listclase);
            // $scope.contrato.clase = {
            //     Types: response.data,
            //     selected: ''
            // }
          } else {
            swal('Información', "Favor elegir nuevamente el Regimen", 'info');
          }
        })
      }

      $scope.obtener_excepciones = function () {
        if ($scope.infoContrato.normalizado == 'S') {
          swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'P_LISTAR_ESTANDAR_CONTRATO',
              v_pdocumento: $scope.infoContrato.documento,
              v_pconcepto: $scope.infoContrato.cod_concepto,
              v_pmotivo: $scope.infoContrato.codigo_motivo,
              v_pasunto: $scope.infoContrato.codigo_asunto
            }
          }).then(function (response) {
            swal.close();
            if (response.data.length > 0) {
              $scope.excepcion_genera_autorizacion = response.data[0].genera_autorizacion;
              $scope.excepcion_genera_prefactura = response.data[0].genera_prefactura;
              $scope.excepcion_genera_bd = response.data[0].genera_bd;
              $scope.excepcion_genera_factura = response.data[0].genera_factura;
              $scope.excepcion_genera_ubicacion_capita = response.data[0].genera_ubicacion_capita;
              $scope.excepcion_genera_retroactivas = response.data[0].genera_retroactivas;
              $scope.excepcion_genera_priorizacion = response.data[0].genera_priorizacion;

            } else {
              swal('Información', "No registra Excepciones", 'info');
            }
          })
        } else {
          swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'SP_OBTENER_ESTANDAR_CONTRATO',
              numero: $scope.infoContrato.numero,
              ubicacion: $scope.infoContrato.ubicacion_id,
              documento: $scope.infoContrato.documento
            }
          }).then(function (response) {
            swal.close();
            if (response.data.length > 0) {
              $scope.excepcion_genera_autorizacion = response.data[0].genera_autorizacion;
              $scope.excepcion_genera_prefactura = response.data[0].genera_prefactura;
              $scope.excepcion_genera_bd = response.data[0].genera_bd;
              $scope.excepcion_genera_factura = response.data[0].genera_factura;
              $scope.excepcion_genera_ubicacion_capita = response.data[0].genera_ubicacion_capita;
              $scope.excepcion_genera_retroactivas = response.data[0].genera_retroactivas;
              $scope.excepcion_genera_priorizacion = response.data[0].genera_priorizacion;

            } else {
              swal('Información', "No registra Excepciones", 'info');
            }
          })
        }
        $scope.tab_active = 8;
      }
      $scope.obtenerReportes = function () {
        $scope.tab_active = 9;
      }

      $scope.obtenerProductosUnicos = function () {
        $scope.tab_active = 65;
      }
      $scope.contratacion_productos = function (palabra) {

        $scope.lista_productos_contratados = [];
        $http({
          method: 'POST',
          url: "php/contratacion/gestioncontrato.php",
          data: {
            function: 'P_LISTA_PRODUCTO_CONTRATO',
            v_pnumero: $scope.infoContrato.numero,
            v_pubicacion: $scope.infoContrato.ubicacion_id,
            v_pdocumento: $scope.infoContrato.documento,
            v_pcoincidencia: palabra
          }
        }).then(function (response) {

          $scope.allproducs = response.data;
          $scope.lista_productos_contratados = response.data;
        })
      }


      $scope.cambio_concepto = function () {
        if ($scope.contrato.concepto == 'PG') {
          $scope.alseleccionarpgp = true;
        } else {
          $scope.alseleccionarpgp = false;
        }
        $scope.listarMotivo = [];
        $scope.contrato.concepto_tipo = $scope.contrato.concepto == 'EV' ? 'E' : 'C';
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_MOTIVOS',
            v_pdocumento: $scope.contrato.regimen,
            v_pconcepto: $scope.contrato.concepto
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listarMotivo = response.data;
            console.log($scope.listcontratos);
            $scope.contrato.motivo = '';
            $scope.contrato.asunto = '';
          } else {
            swal('Información', "Favor elegir nuevamente el Concepto", 'info');
          }
        })
        if (($scope.contrato.concepto == "PM") ||
          ($scope.contrato.concepto == "MC") ||
          ($scope.contrato.concepto == "MA") ||
          ($scope.contrato.concepto == "ME") ||
          ($scope.contrato.concepto == "HM")) {
          $scope.contrato.clase = "14";
          //
          // document.getElementById("tipo").value = "14";

        }
      }
      $scope.cambio_motivo = function () {
        $scope.contrato.asunto = "";
        $scope.listarAsunto = [];
        document.getElementById("asunto").value = "";
        // setTimeout(() => {
        //     $scope.$apply();
        // }, 300);
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_ASUNTOS',
            v_pdocumento: $scope.contrato.regimen,
            v_pconcepto: $scope.contrato.concepto,
            v_pmotivo: $scope.contrato.motivo
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listarAsunto = response.data;
            console.log($scope.listarAsunto);
            if (response.data.length == 1) {
              // document.getElementById("asunto").value=$scope.listarAsunto[0].codigo;
              $scope.contrato.asunto = $scope.listarAsunto[0].codigo;
              $scope.cambio_asunto();
              // setTimeout(() => {
              //     alert($scope.contrato.asunto)
              //     $scope.$apply();
              // }, 300);
            }
          } else {
            swal('Información', "Favor elegir nuevamente el Concepto", 'info');
          }
        })
      }

      $scope.cambio_asunto = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTAR_ESTANDAR_CONTRATO',
            v_pdocumento: $scope.contrato.regimen,
            v_pconcepto: $scope.contrato.concepto,
            v_pmotivo: $scope.contrato.motivo,
            v_pasunto: $scope.contrato.asunto
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            console.log(response.data);
            $scope.contrato.genera_autorizacion = response.data[0].genera_autorizacion == 'S' ? true : false;
            $scope.contrato.genera_prefactura = response.data[0].genera_prefactura == 'S' ? true : false;
            $scope.contrato.genera_bd = response.data[0].genera_bd == 'S' ? true : false;
            $scope.contrato.genera_factura = response.data[0].genera_factura == 'S' ? true : false;
            $scope.contrato.genera_ubicacion_capita = response.data[0].genera_ubicacion_capita == 'S' ? true : false;
            $scope.contrato.genera_retroactivas = response.data[0].genera_retroactivas == 'S' ? true : false;
            $scope.contrato.genera_priorizacion = response.data[0].genera_priorizacion == 'S' ? true : false;
            // $scope.contrato.normalizacion=false;
          } else {
          }
        })
      }

      $scope.escoger_camino = function () {
        $scope.servicios_mostrar = 5;
        $scope.codigo_proceso = 0;
      }


      $scope.guardar_contrato = function () {
        $scope.servicios_mostrar = 1;
        $scope.camino = 1;

        console.log('mostrar_servicio');
        // buscar servicios y mostrarlos
        if (
          ($scope.ips_unica == undefined) || ($scope.ips_unica.codigo == undefined) ||
          ($scope.contrato.concepto == null) || ($scope.contrato.concepto == undefined) || ($scope.contrato.concepto == '')
        ) {
          swal('Información', "Todos Los Campos Son Requeridos.En especial la IPS y el Concepto del Contrato", 'info');
        } else {
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'p_lista_servicios_habilitados',
              nit: $scope.ips_unica.codigo,
              concepto: $scope.contrato.concepto,
              motivo: $scope.contrato.motivo
            }
          }).then(function (response) {
            swal.close();
            if (response.data.length > 0) {
              $scope.listservicios = [];

              $scope.servicios_mostrar = 2;
              for (let s = 0; s < response.data.length; s++) {
                // $scope.listservicios[s].estado == false;
                $scope.listservicios.push({
                  Clasificacion: response.data[s].Clasificacion,
                  Nombre: response.data[s].Nombre,
                  codigo: response.data[s].codigo,
                  estado: false
                });
              }
              console.log($scope.listservicios);
            } else {
              var mensaje = response.data.Nombre == undefined ? "Favor intente nuevamente, Los Servicios de la IPS " + $scope.ips_unica.nombre + " no se pudieron Cargar" : response.data.Nombre;
              swal('Información', mensaje, 'info');
            }
          })
        }


      }
      $scope.mostrar_formualrio = function () {
        $scope.servicios_mostrar = 5;
      }
      $scope.guardar_servicios = function () {
        console.log($scope.listservicios);
        $scope.json_servicios = [];
        for (let s = 0; s < $scope.listservicios.length; s++) {
          if ($scope.listservicios[s].estado == true) {
            var array_prueba = { SERVICIO: $scope.listservicios[s].Clasificacion, NOMBRE: $scope.listservicios[s].Nombre, TARIFA_NOMBRE: $scope.contrato.tarifa_codigo, TARIFA: $scope.contrato.tarifa_codigo, SUMA: $scope.contrato.operacion, PORCENTAJE: $scope.contrato.incremento };
            $scope.json_servicios.push(array_prueba);
          }
        }
        // console.log($scope.json_servicios);
        if ($scope.json_servicios.length == 0) {
          swal('Información', "Almenos Seleccione un Servicios", 'info');
        } else {
          // $scope.validar_campos();
          $scope.servicios_mostrar = 3;
        }
      }
      $scope.formatPeso2 = function (num) {
        var regex2 = new RegExp("\\.");
        if (regex2.test(num)) {
          num = num.toString().replace('.', ',');
          num = num.split(',');
          num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
          if (num[1].length > 1 && num[1].length > 2) {
            num[1] = num[1].toString().substr(0, 3);
          }
          if (num[1].length == 1) {
            num[1] = num[1] + '0';
          }
          return num[0] + ',' + num[1];
        } else {
          num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num = num.split('').reverse().join('').replace(/^[\.]/, '');
          return num + '';
        }
      }
      $scope.FormatPesoID_valor = function (NID, valor) {
        const input = document.getElementById('' + NID + '');
        var valor = valor;
        valor = valor.replace(/\-/g, '');
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[^0-9-,]/g, '');
        valor = valor.replace(/\./g, '');
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
      $scope.FormatPesoID = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/\-/g, '');
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[^0-9-,]/g, '');
        valor = valor.replace(/\./g, '');
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

      function parsedia(date) {
        var yyyy = date.getFullYear();
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        return dd + '/' + mm + '/' + yyyy;//+' '+hh+':'+mi+':00';
      }
      $scope.parseDecimal = function (num) {
        let num3 = parseFloat(num);
        return num3.toString().replace('.', ',');
      }

      $scope.volver_numero_afiliado_e = function () {
        $scope.contrato.afiliado_e = $scope.contrato.afiliado_mostrar_evento.replace(/\./g, '');
        $scope.contrato.afiliado_e = $scope.contrato.afiliado_e.replace(/\,/g, '.');
        $scope.contrato.afiliado_e = parseFloat($scope.contrato.afiliado_e);
      }
      $scope.volver_numero_valor_e = function () {
        $scope.contrato.valor_evento = $scope.contrato.valor_evento_mostrar.replace(/\./g, '');
        $scope.contrato.valor_evento = $scope.contrato.valor_evento.replace(/\,/g, '.');
        $scope.contrato.valor_evento = parseFloat($scope.contrato.valor_evento);
      }

      $scope.volver_numero_afiliado = function () {
        $scope.contrato.afiliado = $scope.contrato.afiliado_mostrar.replace(/\./g, '');
        $scope.contrato.afiliado = $scope.contrato.afiliado.replace(/\,/g, '.');
        $scope.contrato.afiliado = parseFloat($scope.contrato.afiliado);
        $scope.calculo_valor();
      }

      $scope.volver_numero_valor = function () {
        $scope.contrato.upc_afiliado = $scope.contrato.upc_afiliado_mostrar.replace(/\./g, '');
        $scope.contrato.upc_afiliado = $scope.contrato.upc_afiliado.replace(/\,/g, '.');
        $scope.contrato.upc_afiliado = parseFloat($scope.contrato.upc_afiliado);
        $scope.calculo_valor();
      }


      $scope.calculo_valor = function () {


        if (
          ($scope.contrato.afiliado != "") && ($scope.contrato.afiliado > 0) &&
          ($scope.contrato.upc_afiliado != "") && ($scope.contrato.upc_afiliado > 0) &&
          ($scope.contrato.dias != "") && ($scope.contrato.dias > 0)
        ) {
          // valor upc
          $scope.contrato.valor_upc = parseFloat($scope.contrato.upc_afiliado) / 30;
          $scope.contrato.valor_upc_mostrar = $scope.formatPeso2($scope.contrato.valor_upc)
          // valor capita
          $scope.contrato.valor_capita = $scope.contrato.valor_upc * $scope.contrato.afiliado * $scope.contrato.dias;
          $scope.contrato.valor_capita = $scope.contrato.valor_capita.toFixed(2);
          $scope.contrato.valor_capita_mostrar = $scope.formatPeso2($scope.contrato.valor_capita);
          //porcentaje upc
          $scope.contrato.porcentaje_upc = parseFloat($scope.contrato.valor_capita) / parseFloat($scope.contrato.upc_municipio);
          $scope.contrato.porcentaje_upc = $scope.contrato.porcentaje_upc.toFixed(2);
          $scope.contrato.porcentaje_upc_mostrar = $scope.formatPeso2($scope.contrato.porcentaje_upc);

        }


      }
      $scope.calcular_dia_mes = function () {
        if ((($scope.contrato.f_inicial == null) || ($scope.contrato.f_inicial == undefined) || ($scope.contrato.f_inicial == "")) ||
          (($scope.contrato.f_final == null) || ($scope.contrato.f_final == undefined) || ($scope.contrato.f_final == ""))
        ) {
          $scope.contrato.dias = 0;
          $scope.contrato.meses = 0;
        } else {
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'f_dias360',
              f_inicial: parsedia($scope.contrato.f_inicial),
              f_final: parsedia($scope.contrato.f_final)
            }
          }).then(function (response) {
            if (response.data.RESULTADO) {
              $scope.contrato.dias = response.data.RESULTADO;
              $scope.contrato.meses = parseInt($scope.contrato.dias / 30);
              $scope.contrato.dias_total = $scope.contrato.dias % 30;
            }
            // swal.close();
            // $scope.contrato.dias = $scope.contrato.dias+1;
            // $scope.contrato.meses=  parseInt($scope.contrato.dias/30);
            // $scope.contrato.dias_total= $scope.contrato.dias%30;
          })
        }
      }
      function lastDayOfFebruary(date) {
        var lastDay = new Date(date.getFullYear(), 2, -1);
        return date.getDate() == lastDay;
      }
      $scope.archivos_precontractual = function () {
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'p_lista_archivo_insertar',
            v_ptercero: $scope.ips_unica.codigo,
            v_pregimen: $scope.contrato.regimen == 'KS' ? 'S' : 'C',
            v_pconcepto: $scope.contrato.concepto
          }
        }).then(function (response) {
          swal.close();
          if (response.data.length > 0) {
            $scope.listar_va = response.data;
            $scope.servicios_mostrar = 6;
          } else {
            swal('Información', "No Tiene Archivos Cargados", 'info');
          }
        })
      }

      $scope.validar_campos = function () {

        if ($scope.contrato.concepto_tipo == 'C') {
          $scope.contrato.valor = $scope.contrato.valor_capita;
        } else {
          $scope.contrato.upc_afiliado = 0;
          $scope.contrato.upc_municipio = 0;
          $scope.contrato.valor_upc = 0;
          $scope.contrato.porcentaje_upc = 0;
          $scope.contrato.afiliado = $scope.contrato.afiliado_e;
          $scope.contrato.valor = $scope.contrato.valor_evento;
        }

        if ($scope.contrato.concepto == "") {
          swal('Información', 'Tiene que seleccionar un Concepto Valido', 'info');
          $scope.servicios_mostrar = 1;
        } else if ($scope.contrato.clase == "") {
          swal('Información', 'Tiene que seleccionar una Clase Valido', 'info');
          $scope.servicios_mostrar = 1;
        } else if ($scope.contrato.regimen == "") {
          swal('Información', 'Tiene que seleccionar un Regimen Valido', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.ubicacion_codigo == "") {
          swal('Información', 'Tiene que seleccionar una Cobertuta valida', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.ubicacion_fisica_codigo == "") {
          swal('Información', 'Tiene que seleccionar una Ubicación Fisica valida', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if (($scope.contrato.f_inicial == null) || ($scope.contrato.f_inicial == undefined) || ($scope.contrato.f_inicial == "")) {
          swal('Información', 'Tiene que seleccionar una Fecha Inicial Valida', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if (($scope.contrato.f_final == null) || ($scope.contrato.f_final == undefined) || ($scope.contrato.f_final == "")) {
          swal('Información', 'Tiene que seleccionar una Fecha Final Valida', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if (($scope.contrato.dias < 0) || ($scope.contrato.dias == "") || ($scope.contrato.dias == undefined) || ($scope.contrato.dias == null)) {
          swal('Información', 'La Fecha final tiene que ser mayor a la fecha Inicial ', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if (($scope.contrato.afiliado == "") || ($scope.contrato.afiliado == undefined) || ($scope.contrato.afiliado == null)) {
          swal('Información', 'Tiene que llenar el campo afiliado con valores valido', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if (($scope.contrato.valor == "") || ($scope.contrato.valor == undefined) || ($scope.contrato.valor == null)) {
          swal('Información', 'Verifique los campos de valor de contrato', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.upc_afiliado === "") {
          swal('Información', 'Verifique el campo de UPC Afiliado', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.upc_municipio === "") {
          swal('Información', 'Verifique el campo de UPC Municpio', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.forma_pago === "") {
          swal('Información', 'Tiene que seleccionar una Forma de Pago Valida', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.valor_upc === "") {
          swal('Información', 'Verifique el campo de valor UPC', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.porcentaje_upc === "") {
          swal('Información', 'Verifique el campo de Porcentaje UPC', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.tarifa_codigo == "") {
          swal('Información', 'Tiene que seleccionar una tarifa Valido', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.operacion == "") {
          swal('Información', 'Tiene que seleccionar una operacion de Contrato valida', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.incremento == "") {
          swal('Información', 'Verifique el campos de Porcentaje de Operacion', 'info');
          $scope.servicios_mostrar = 1;
        }
        else if ($scope.contrato.oncologico == "") {
          swal('Información', 'Tiene que seleccionar servicio de oncologico valido', 'info');
          $scope.servicios_mostrar = 1;
        } else if ($scope.listado_elegido_sed.length == 0) {
          swal('Información', 'Por lo menos debe digitar al menos una Sede de Prestación', 'info');
        }
        else {
          if ($scope.contrato.diagnostico == true) {
            if ($scope.archivocargar == "") {
              swal('Información', 'Si tiene Marcado Diagnostico Adjunte el Archivo con el nomnre de estos', 'info');
            } else {
              $scope.guardar_todo();
            }
          } else {
            $scope.guardar_todo();
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

      $scope.validararchivo = function () {
        $scope.inputFile = document.querySelector('#anexo2adj');
        var archivo = $scope.inputFile.files[0].name.split(".");
        var tamano = $scope.inputFile.files[0].size
        var ext = archivo[1];
        if (tamano <= 253600000) { // se valida el tamaño del archivo
          if (ext.toUpperCase() == 'TXT') { //se valida el tipo del archivo
            $scope.getBase64($scope.inputFile.files[0]).then(function (result) {
              $scope.archivocargar = result;
            });
          } else {
            swal('Tipo de archivo incorrecto', 'Extension del archivo incorrecta debe ser .txt', 'warning')
            $scope.nombrearchivo = "";

          }
        } else {
          swal('TAMAÑO EXCEDIDO', 'Archivo no debe superar los 11 megabytes', 'error')
          $scope.nombrearchivo = "";

        }
      }


      $scope.Validar_Productos = function () {
        var v_pjson_servicio = $scope.json_servicios;
        var v_pcantidad_serv = $scope.json_servicios.length
        v_pjson_servicio = JSON.stringify(v_pjson_servicio);
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_VALIDARPRODUCTOS',
            v_pconcepto: $scope.contrato.concepto,
            v_pmotivo: $scope.contrato.motivo,
            v_pasunto: $scope.contrato.asunto,
            v_pservicios: v_pjson_servicio,
            v_pservicioscantidad: v_pcantidad_serv,
          }
        }).then(function (response) {
          if (response.data.length > 0) {
            const arrayConDuplicados = [];
            for (let s = 0; s < response.data.length; s++) {
              arrayConDuplicados.push({
                Codigo: response.data[s].Codigo,
                Nombre: response.data[s].Nombre,
                estado: false
              });
            }

            const arraySinDuplicados = arrayConDuplicados.filter((obj, index, arr) => {
              return index === arr.findIndex(obj2 => obj.Codigo === obj2.Codigo);
            });
            $scope.listaproductos = arraySinDuplicados;
            $scope.servicios_mostrar = 10;
            swal.close();
          } else {
          }
        })
      }


      $scope.guardar_todo = function () {

        var v_pjson_contrato = {
          concepto: $scope.contrato.concepto,
          motivo: $scope.contrato.motivo,
          asunto: $scope.contrato.asunto,
          tipo: $scope.contrato.clase,
          regimen: $scope.contrato.regimen,
          ubicacion: $scope.contrato.ubicacion_codigo,
          ubicacion_fisica: $scope.contrato.ubicacion_fisica_codigo,
          observacion: $scope.contrato.observacion,

          f_inicial: parsedia($scope.contrato.f_inicial),
          f_final: parsedia($scope.contrato.f_final),
          meses: $scope.contrato.meses,
          dias: $scope.contrato.dias,
          prorroga: $scope.contrato.prorroga == true ? 'S' : 'N',

          afiliado: $scope.contrato.afiliado,
          valor: "" + $scope.parseDecimal($scope.contrato.valor),
          cntv_upc_afiliado: "" + $scope.parseDecimal($scope.contrato.upc_afiliado),
          cntv_upc_municipio: "" + $scope.parseDecimal($scope.contrato.upc_municipio),
          porcentaje_ejecucion: 0,
          forma_pago: "" + $scope.contrato.forma_pago,
          valor_upc_municipio: "" + $scope.parseDecimal($scope.contrato.valor_upc),
          porcentaje_upc: "" + $scope.parseDecimal($scope.contrato.porcentaje_upc),

          tarifa: $scope.contrato.tarifa_codigo,
          operacion: $scope.contrato.operacion,
          incremento: $scope.contrato.incremento,

          nit: $scope.ips_unica.codigo,
          union_temporal: $scope.contrato.union_temporal == true ? 'S' : 'N',

          interrupcion_vol_embarazo: $scope.contrato.aborto == true ? 'S' : 'N',
          eutanasia: $scope.contrato.eutanasia == true ? 'S' : 'N',
          rol_serv_oncologico: $scope.contrato.oncologico,
          cod_representante: $scope.contrato.representante_legal,
          nom_representante: $scope.contrato.nombre_representante_legal,
          url_archivo: '',
          camino: $scope.camino,
          codigo_proceso: $scope.codigo_proceso,

          genera_autorizacion: $scope.contrato.genera_autorizacion == true ? 'S' : 'N',
          genera_prefactura: $scope.contrato.genera_prefactura == true ? 'S' : 'N',
          genera_bd: $scope.contrato.genera_bd == true ? 'S' : 'N',
          genera_factura: $scope.contrato.genera_factura == true ? 'S' : 'N',
          genera_ubicacion_capita: $scope.contrato.genera_ubicacion_capita == true ? 'S' : 'N',
          genera_retroactivas: $scope.contrato.genera_retroactivas == true ? 'S' : 'N',
          genera_priorizacion: $scope.contrato.genera_priorizacion == true ? 'S' : 'N',
          normalizado: $scope.contrato.normalizacion == true ? 'N' : 'S',
          responsable_creacion: sessionStorage.getItem('cedula'),
          diagnostico_pgp: $scope.contrato.diagnostico == true ? 'S' : 'N',
          ambito_pgp: $scope.contrato.ambito,
          edad_inicial_pgp: $scope.contrato.edadinicial,
          edad_final_pgp: $scope.contrato.edadfinal,
          genero_pgp: $scope.contrato.genero,
          portabilidad: $scope.contrato.portabilidad,

        };
        var v_pjson_servicio = $scope.json_servicios;
        var v_pcantidad_serv = $scope.json_servicios.length

        v_pjson_contrato = JSON.stringify(v_pjson_contrato);
        v_pjson_servicio = JSON.stringify(v_pjson_servicio);
        console.log(v_pjson_contrato);
        console.log(v_pjson_servicio);
        console.log(v_pcantidad_serv);
        swal({
          title: 'Cargando información...',
          allowEscapeKey: false,
          allowOutsideClick: false
        });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_INSERTA_CONTRATO',
            v_pjson_contrato: v_pjson_contrato,
            v_pjson_servicio: v_pjson_servicio,
            v_pcantidad_serv: v_pcantidad_serv,
            v_pjson_sedes: JSON.stringify($scope.listado_elegido_sed),
            v_pcantidad_sedes: $scope.listado_elegido_sed.length,
            v_archivo_diagnostico: $scope.archivocargar,
          }
        }).then(function (response) {

          if (response.data.CODIGO == 0) {
            swal.close();
            $scope.Validar_Productos();
            $scope.datosdelcontrato = response.data;
            // swal({
            //     title: "Completado!",
            //     text: response.data.NOMBRE,
            //     allowEscapeKey: false,
            //     allowOutsideClick: false,
            //     type: "success"
            // }).then(function () {
            //     swal.close();
            //     $scope.Validar_Productos();
            //     $scope.datosdelcontrato = response.data;
            // })
          } else if (response.CODIGO == 1) {
            swal('Información', response.data.NOMBRE, 'info');
          } else {
            swal('Información', response.data.NOMBRE, 'info');
          }
        })

      }

      $scope.Guardar_seleccion_productos = function () {
        console.log($scope.listaproductos);
        $scope.json_serviciosseleccionados = [];
        for (let s = 0; s < $scope.listaproductos.length; s++) {
          let estado;
          if ($scope.listaproductos[s].estado == true) {
            estado = 'S';
          } else {
            estado = 'N';
          }
          var array_prueba = { CODIGO: $scope.listaproductos[s].Codigo, Estado: estado };
          $scope.json_serviciosseleccionados.push(array_prueba);
        }
        if ($scope.json_serviciosseleccionados.length == 0) {
          swal('Información', "Almenos Seleccione un Servicio", 'info');
        } else {
          swal({
            title: 'Cargando información...',
            allowEscapeKey: false,
            allowOutsideClick: false
          });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'P_UI_TIPOSERVICIOS',
              v_pdocumento: $scope.datosdelcontrato.DOCUMENTO,
              v_pnumero: $scope.datosdelcontrato.NUMERO,
              v_pubicacion: $scope.datosdelcontrato.UBICACION,
              v_pjson_servicio: JSON.stringify($scope.json_serviciosseleccionados),
              v_pcantidad_serv: $scope.json_serviciosseleccionados.length,
              v_paccion: 'I',
            }
          }).then(function (response) {
            console.log(response);
            if (response.data.CODIGO == 0) {
              swal({
                title: "Completado!",
                text: "Se ha creado el contrato " + response.data.DOCUMENTO + '-' + response.data.NUMERO + '-' + response.data.UBICACION + " con exito",
                allowEscapeKey: false,
                allowOutsideClick: false,
                type: "success"
              }).then(function () {
                swal.close();
                $scope.viewnewcontrato = null;
                $scope.limpiar_solicitud();

              })
            } else if (response.data.CODIGO == 1) {
              swal('Información', response.data.Nombre, 'info');
            } else {
              swal('Información', response.data.Nombre, 'info');
            }
          })
        }
      }



      $scope.limpiar_solicitud = function () {
        $scope.contrato = {
        };
        $scope.$apply();
      }
      $scope.servicios_mostrar = 1;
      $scope.contrato = {
        concepto: '',
        clase: '',
        regimen: '',
        ubicacion_codigo: '',
        observacion: '',
        f_inicial: '',
        f_final: '',
        meses: '',
        dias: '',
        prorroga: false,
        afiliado: '',
        valor: '',
        upc_afiliado: '',
        porcentaje_ejecucion: '',
        forma_pago: '',
        valor_upc: '',
        porcentaje_upc: '',
        tarifa_codigo: '',
        operacion: '',
        incremento: '',
        union_temporal: false
      };
      $scope.stepNewContrato = function () {
        console.log($scope.contrato);

      }
      $scope.seleccionarOpcion = function (option) {
        $("." + option).prop("checked", $("#filled-in-box-" + option).prop('checked'));

        for (let s = 0; s < $scope.listservicios.length; s++) {

          if (option) {
            $scope.listservicios[s].estado = true;
          } else {
            $scope.listservicios[s].estado = false;
          }
        }
      }
      $scope.seleccionarOpcionProductos = function (option) {
        $("." + option).prop("checked", $("#filled-in-box-" + option).prop('checked'));

        for (let s = 0; s < $scope.listaproductos.length; s++) {

          if (option) {
            $scope.listaproductos[s].estado = true;
          } else {
            $scope.listaproductos[s].estado = false;
          }
        }
      }

      $scope.obtenerBase = function () {
        if ($("#adjunto")[0].files[0]) {
          if ($("#adjunto")[0].files[0].size > 7340032) {
            //swal('Advertencia','El archivo excede el peso limite (7 MB)','warning')
            swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
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
        } else {
          swal('Advertencia', 'No ha selecionado ningun Archivo', 'warning')
          $("#adjunto" + ind)[0].value = "";
          $scope.archivobase = "";
          $scope.extensionarchivo = "";
        }
      }
      $scope.subiradjunto = function () {
        if ($scope.archivobase != null) {
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: 'subir_adjuntos',
              achivobase: $scope.archivobase,
              ext: $scope.extensionarchivo,
              nombre: 'CONTRATO_DE' + $scope.contrato.regimen + '_' + $scope.ips_unica.codigo
            }
          }).then(function (response) {
            $scope.contrato.ruta = response.data;
          });
        }
      }

      $scope.Genera_Minuta = function (v_pnumero, v_pubicacion, v_pdocumento, fecha_inicio, tipominuta = '5') {
        var v_fecha_inicio = new Date(fecha_inicio.split('/')[2] + '/' + fecha_inicio.split('/')[1] + '/' + fecha_inicio.split('/')[0]);
        var fechaNuevaMinutaPGP = new Date('2023/12/01');
        // console.log(v_fecha_inicio, fechaNuevaMinuta)
        swal({
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#1d930f',
          confirmButtonText: 'Generar Minuta Nueva',
          cancelButtonText: 'Generar Minuta Antigua'
        }).then((result) => {
          if (result) {
            switch (parseInt(tipominuta)) {
              case 1:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_evento_recuperacion.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
              case 2:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_PYM.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
              case 3:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_medicamento_capita.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
              // case 4:

              //   break;
              case 5:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_evento.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
              // case 6:

              //   break;
              case 7:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_medicamento_evento.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
              case 8:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_evento_bolsa.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
              case 9:
                if (v_fecha_inicio >= fechaNuevaMinutaPGP) {
                  $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_pgp_general_nueva.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                } else {
                  $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_pgp_general.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                }
                break;

              default:
                $window.open('views/contratacion/formatos/minutas/formatominutacontrato_nuevo_evento.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento);
                break;
            }
          }
        }, function (dismiss) {
          if (dismiss == 'cancel') {
            $window.open('views/contratacion/formatos/minutas/formatominutacontrato.php?v_pnumero=' + v_pnumero + '&v_pubicacion=' + v_pubicacion + '&v_pdocumento=' + v_pdocumento + '&v_ptipominuta=EVENTO&v_minuta=' + tipominuta);
          }
        })
      }

      $scope.generaMinutaContrato = function (infoContrato, tipominuta = '5') {
        switch (parseInt(tipominuta)) {
          case 1:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_evento_recuperacion.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          case 2:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_PYM.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          case 3:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_medicamento_capita.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          case 5:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_evento.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          case 7:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_medicamento_evento.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          case 8:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_evento_bolsa.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          case 9:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_pgp_general_nueva.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
          default:
            $window.open('views/contratacion/formatos/minutas_sin_firmas/formatominutacontrato_nuevo_evento.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento);
            break;
        }
      }

      $scope.generaAnexo1 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo1.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo2 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo2.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo3 = function () {
        $window.open('views/contratacion/formatos/anexo_soportes/anexo3.pdf');
      }
      $scope.generaAnexo4 = function (infoContrato) {
        var v_fecha_inicio = new Date(infoContrato.inicia.split('/')[2] + '/' + infoContrato.inicia.split('/')[1] + '/' + infoContrato.inicia.split('/')[0]);
        var fechaNuevoFeb = new Date('2024/02/01');

        if (v_fecha_inicio >= fechaNuevoFeb) {
          if (infoContrato.ubicacion == 'LA GUAJIRA') {
            $window.open('views/contratacion/formatos/anexo4/01022024/anexo4_GUAJIRA.pdf');
            return
          }
          $window.open(`views/contratacion/formatos/anexo4/01022024/anexo4_${infoContrato.ubicacion}.pdf`);
        } else {
          if (infoContrato.ubicacion == 'LA GUAJIRA') {
            $window.open('views/contratacion/formatos/anexo4/viejos/anexo4_GUAJIRA.pdf');
            return
          }
          $window.open(`views/contratacion/formatos/anexo4/viejos/anexo4_${infoContrato.ubicacion}.pdf`);
        }

      }
      $scope.generaAnexo8 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo8.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo9 = function (infoContrato, tipominuta = '5') {
        // $window.open('views/contratacion/formatos/anexo9.xlsx');
        $window.open('views/contratacion/formatos/anexo9.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo11 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo11.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo12 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo12.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo13 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo13.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.anexo15 = function (infoContrato, tipominuta = '5') {
        if (tipominuta == '2') {  //2 PYM
          $window.open('views/contratacion/formatos/anexo15_PYM.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
            '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
        } else {
          $window.open('views/contratacion/formatos/anexo15.php?regimen=' + $scope.infoContrato.documento + '&ubicacion=' + $scope.infoContrato.ubicacion_id + '&numero=' + $scope.infoContrato.numero);
        }
      }
      $scope.anexo14 = function () {
        $window.open('views/contratacion/formatos/anexo14.php?regimen=' + $scope.infoContrato.documento + '&ubicacion=' + $scope.infoContrato.ubicacion_id + '&numero=' + $scope.infoContrato.numero);
      }

      $scope.generaAnexo17 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo17.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo18 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo18.php?v_pnumero=' + infoContrato.numero + '&v_pubicacion=' + infoContrato.ubicacion_id + '&v_pdocumento=' + infoContrato.documento +
          '&v_pfecha_inicio=' + infoContrato.inicia + '&v_ptipominuta=' + tipominuta);
      }
      $scope.generaAnexo22 = function (infoContrato, tipominuta = '5') {
        $window.open('views/contratacion/formatos/anexo22.xlsx');
      }


      $scope.obtenerTiposAdjuntos_Env = function () {
        $('.tabs').tabs();
        $scope.Tabs_Adjuntos = 1;
        setTimeout(() => {
          $('#Tabs_Adjuntos_1').click();
        }, 1000);

        $scope.formAdjuntoEnv = {
          tipc_numero: '',
          tipc_nombre: '',
          tipc_firmas: '',
          tipc_ips_entrega: '',
          tipc_eps_entrega: '',
          soporteB64: '',
          soporteExt: ''
        };

        if ($scope.tiposAdjuntoEnv) { return }
        $scope.tiposAdjuntoEnv = [];

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_TIPOS_ADJUNTOS',
          }
        }).then(function ({ data }) {
          $scope.tiposAdjuntoEnv = data;
          // console.table(data)
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.ngChgTiposAdjuntoEnv = function () {
        const data = $scope.tiposAdjuntoEnv.find(e => e.TIPC_NUMERO == $scope.formAdjuntoEnv.tipc_numero)
        $scope.formAdjuntoEnv.tipc_numero = data.TIPC_NUMERO;
        // $scope.formAdjuntoEnv.tipc_nombre = data.TIPC_NOMBRE;
        // $scope.formAdjuntoEnv.tipc_firmas = data.TIPC_FIRMAS;
        // $scope.formAdjuntoEnv.tipc_ips_entrega = data.TIPC_IPS_ENTREGA;
        // $scope.formAdjuntoEnv.tipc_eps_entrega = data.TIPC_EPS_ENTREGA;
        setTimeout(() => { $scope.$apply(); }, 500);
        console.log(data);
      }



      if (document.querySelector('#file-upload-field-enviados')) {
        document.querySelector('#file-upload-field-enviados').addEventListener('change', function (e) {
          setTimeout(() => { $scope.$apply(); }, 500);
          var files = e.target.files;
          $("#file-upload-field-enviados").parent(".file-upload-wrapper_2").attr("data-text", `Adjuntar Archivo`);
          if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
              const x = files[i].name.split('.'), ext = x[x.length - 1].toUpperCase();
              if (ext == 'PDF' || ext == 'DOCX' || ext == 'XLS' || ext == 'XLSX') {
                if (files[i].size < 5485760 && files[i].size > 0) {
                  $scope.getBase64(files[i]).then(function (result) {
                    $("#file-upload-field-enviados").parent(".file-upload-wrapper_2").attr("data-text", files[i].name);
                    $scope.formAdjuntoEnv.soporteExt = ext.toLowerCase();
                    $scope.formAdjuntoEnv.soporteB64 = result;
                    setTimeout(function () { $scope.$apply(); }, 300);
                  });
                } else {
                  document.querySelector('#file-upload-field-enviados').value = '';
                  swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (5MB)!', 'info');
                }
              } else {
                document.querySelector('#file-upload-field-enviados').value = '';
                swal('Advertencia', '¡Solo se admiten archivos (PDF, .DOCX, .XLS, .XLSX)!', 'info');
              }
            }
          }
        });
      }

      $scope.agregarSoporteLista = function () {
        if (!$scope.formAdjuntoEnv.tipc_numero || !$scope.formAdjuntoEnv.soporteExt) {
          swal('Advertencia', '¡Debe seleccionar y adjuntar un archivo!', 'info'); return;
        }

        const data = $scope.tiposAdjuntoEnv.find(e => e.TIPC_NUMERO == $scope.formAdjuntoEnv.tipc_numero)
        data.soporteB64 = $scope.formAdjuntoEnv.soporteB64;
        data.soporteExt = $scope.formAdjuntoEnv.soporteExt;
        data.ruta = '';
        $("#file-upload-field-enviados").parent(".file-upload-wrapper_2").attr("data-text", "Adjuntar Archivo");

        $scope.formAdjuntoEnv.tipc_numero = '';

        // $scope.formAdjuntoEnv.soporteExt = '';
        // $scope.formAdjuntoEnv.soporteB64 = '';

        // document.querySelector('#file-upload-field-enviados').value = '';

        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.quitarSoporteLista = function (x) {
        const data = $scope.tiposAdjuntoEnv.find(e => e.TIPC_NUMERO == x.TIPC_NUMERO)
        data.soporteB64 = '';
        data.soporteExt = '';
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.validarSoporteVacios = function () {
        return new Promise((resolve) => {
          var vacios = 0
          $scope.tiposAdjuntoEnv.forEach(element => {
            if ((element.TIPC_OBLIGATORIO == 'S' && element.TIPC_EPS_ENTREGA == 'S') && !element.soporteB64) { vacios++ }
          });
          resolve(vacios);
        });
      }

      $scope.guardarAdjuntoEnviados = function () {
        $scope.validarSoporteVacios().then((validSoportes) => { // Validar campos vacios
          if (!validSoportes) {
            swal({
              title: 'Confirmar',
              text: '¿Seguro que desea cargar los soportes?',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result) {

                swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando soportes...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
                });

                var promesas = [];
                $scope.tiposAdjuntoEnv.forEach((e, index) => {
                  if (e.soporteB64) {
                    promesas.push($scope.cargarSoporteEnv(index));
                  }
                })

                Promise.all(promesas).then(response => {
                  // Cuando todas las promesas se resuelvan, imprimimos las respuestas
                  var errors = 0
                  response.forEach(element => {
                    if (element.substr(0, 1) != '/') {
                      errors++;
                    }
                  });
                  setTimeout(() => { $scope.$apply(); }, 500);
                  if (errors == 0) {//GUARDA EN BD

                    var data = []

                    $scope.tiposAdjuntoEnv.forEach(e => {

                      if (e.soporteB64 || e.TIPC_IPS_ENTREGA == 'S')
                        data.push({
                          documento: $scope.infoContrato.documento,
                          numero: $scope.infoContrato.numero,
                          ubicacion: $scope.infoContrato.ubicacion_id,
                          tercero: $scope.infoContrato.nit,

                          tipo_soporte: e.TIPC_NUMERO,
                          ruta_soporte: e.ruta,

                          responsable: $scope.Rol_Cedula
                        })
                    });
                    console.table(data);

                    $http({
                      method: 'POST',
                      url: "php/contratacion/funccontratacion.php",
                      data: {
                        function: 'P_INSERTAR_SOPORTE_CONTRATO',
                        datos: JSON.stringify(data),
                        cantidad: data.length
                      }
                    }).then(function ({ data }) {
                      if (data.toString().substr(0, 3) == '<br' || data == 0) {
                        swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                      }
                      if (data.codigo == 0) {
                        swal('¡Mensaje!', data.nombre, 'success').catch(swal.noop);
                        $scope.obtenerListadoEnviados(1);
                        setTimeout(() => { $scope.$apply(); }, 500);
                      }
                      if (data.codigo == 1) {
                        swal("Mensaje", data.nombre, "warning").catch(swal.noop);
                      }
                    })
                    // console.log($scope.tiposAdjuntoEnv);
                  } else {
                    swal("Error", 'Ocurrio un inconveniente al cargar los archivos, intentar nuevamente', "warning").catch(swal.noop); return
                  }
                  // Aquí puedes imprimir cualquier mensaje que desees después de recibir todas las respuestas
                  console.log('Todas las peticiones completadas');
                });
                //////////////////////


              }
            })

          } else {
            swal('Información', 'Cargue los soportes requeridos', 'info');
          }
        })
      }

      $scope.cargarSoporteEnv = function (index) {
        return new Promise((resolve) => {
          if (!$scope.tiposAdjuntoEnv[index].soporteB64) { resolve(''); return }
          if ($scope.tiposAdjuntoEnv[index].ruta != '') { resolve('/'); return }

          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: "cargarSoporteAdjuntoEnv",
              carpeta: `${$scope.infoContrato.documento}_${$scope.infoContrato.numero}_${$scope.infoContrato.ubicacion_id}`,
              name: `${$scope.tiposAdjuntoEnv[index].TIPC_NUMERO}`,
              // name: `${$scope.tiposAdjuntoEnv[index].OSOV_TIPO_SOPORTE}`,
              base64: $scope.tiposAdjuntoEnv[index].soporteB64,
              ext: $scope.tiposAdjuntoEnv[index].soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              $scope.tiposAdjuntoEnv[index].ruta = data;
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }




      $scope.obtenerListadoEnviados = function () {
        $scope.listadoAdjuntoEnv = [];
        $scope.listadoAdjuntoEnv_Detalle = []
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_SOPORTES_CONTRATOS_EPS',
            nit: $scope.infoContrato.nit,
            documento: $scope.infoContrato.documento,
            numero: $scope.infoContrato.numero,
            ubicacion: $scope.infoContrato.ubicacion_id
          }
        }).then(function ({ data }) {
          $scope.listadoAdjuntoEnv = data;
          setTimeout(() => { $scope.$apply(); }, 500);
        });
      }

      $scope.seleccionarContrato = function (x) {
        // $scope.itemSeleccionado = x.OSOV_NUMERO + '_' + x.OSON_RENGLON;
        $scope.listadoAdjuntoEnv_datos = x;
        $scope.formDevuelto = {
          soporteExt: '',
          soporteB64: '',
          observacion: ''
        }
        $scope.soporteDevolucion = {}
        $scope.listadoAdjuntoEnv_Detalle = []
        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_LISTA_SOPORTES_CONTRATOS_DETALLE',
            nit: x.OSON_TERCERO,
            renglon: x.OSON_RENGLON
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.length > 0) {
            $scope.listadoAdjuntoEnv_Detalle = data;


            if (x.OSOV_ESTADO == 'D' || x.OSOV_ESTADO == 'G') {
              setTimeout(() => {
                $scope.cargarFileUnico();
                setTimeout(() => { $scope.$apply(); }, 500);
              }, 2500);
            }
            setTimeout(() => { $scope.$apply(); }, 500);
          }
        })
      }

      $scope.devolverAdjuntoEnviados = function () {
        $scope.soporteDevolucion = {
          observacion: '',
          soporteExt: '',
          soporteB64: ''
        }
        swal({
          title: 'Devolución de soportes',
          html: `
          <div class="col s12 no-padding label-new m-b m-t" style="margin-top: 2rem;margin-bottom: 5.5rem;">
            <textarea class="white input-text-new input-out-new w-100 margin m-l m-r" maxlength="4000"
              style="height: 100px;text-transform:uppercase;text-align: justify;" autocomplete="off"
              placeholder="Observación" id="observacionDevolucion"></textarea>
          </div>
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
                  <input class="file-path Soport" type="text" placeholder="Adjunte un archivo (PDF)"
                    readonly style="border-radius: 0;height: 2rem;border-bottom: 0;"
                    ng-change="loadFile()">
                </div>
              </div>
            </div>
          </div>
                `,

          width: '500px',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',

          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve(
                {
                  observacion: $('#observacionDevolucion').val(),
                  soporte: $('#SoporteProces').val(),
                }
              )
            })
          }
        }).then(function (result) {
          if (!result.observacion) {
            swal("info", '¡La observacion no puede ir vacia!', "warning").catch(swal.noop); return
          }
          console.log(result)
          $scope.soporteDevolucion.observacion = result.observacion
          $scope.soporteDevolucion.soporte = document.querySelector('#SoporteProces')

          //
          swal({
            title: 'Confirmar',
            text: '¿Seguro que desea devolver los soportes al prestador?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            if (result) {
              swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });

              $scope.loadFileDevolucion()
            }
          })
          //
        })
      }

      $scope.loadFileDevolucion = function () {
        $scope.soporteDevolucion.soporteB64 = '';
        // var fileInput = document.querySelector('#SoporteProces');
        var fileInput = $scope.soporteDevolucion.soporte;

        if (fileInput.files.length == 0) {
          $scope.subirFTPDevolucion();
          return;
        }
        var x = fileInput.files[0].name.split('.'), ext = x[x.length - 1].toUpperCase();

        if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
          if (ext == 'PDF') {
            $scope.getBase64(fileInput.files[0]).then(function (result) {
              $scope.soporteDevolucion.soporteB64 = result;
              $scope.soporteDevolucion.soporteExt = ext.toLowerCase();
              $scope.subirFTPDevolucion();
            });
          } else {
            swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF!', 'info');
            $scope.soporteDevolucion.soporteB64 = '';
          }
        } else {
          swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
          $scope.soporteDevolucion.soporteB64 = '';
        }
      }

      $scope.subirFTPDevolucion = function () {
        if ($scope.soporteDevolucion.soporteB64 == '') {
          $scope.guardarDevolucion('');
          return
        }

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: "cargarSoporteAdjuntoEnv",
            carpeta: `${$scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO}_${$scope.listadoAdjuntoEnv_datos.OSOV_NUMERO}_${$scope.listadoAdjuntoEnv_datos.OSON_UBICACION}`,
            name: 'Devolucion_EPS',
            base64: $scope.soporteDevolucion.soporteB64,
            ext: $scope.soporteDevolucion.soporteExt
          }
        }).then(function ({ data }) {
          if (data.substr(0, 1) != '0') {
            $scope.guardarDevolucion(data);
          } else {
            swal('Advertencia', '¡Ocurrio un error, Intente nuevamente!', 'info');
          }
        });
      }

      $scope.guardarDevolucion = function (ruta) {

        const datos = [
          {
            documento: $scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO,
            numero: $scope.listadoAdjuntoEnv_datos.OSOV_NUMERO,
            ubicacion: $scope.listadoAdjuntoEnv_datos.OSON_UBICACION,
            tercero: $scope.listadoAdjuntoEnv_datos.OSON_TERCERO,
            renglon: $scope.listadoAdjuntoEnv_datos.OSON_RENGLON,

            ruta_soporte: ruta,

            observacion: $scope.soporteDevolucion.observacion,
            responsable: $scope.Rol_Cedula,
            opcion: 'D',
            tipo: 'E'
          }
        ]

        $http({
          method: 'POST',
          url: "php/contratacion/funccontratacion.php",
          data: {
            function: 'P_U_SOPORTE_CONTRATO',
            datos: JSON.stringify(datos),
            cantidad: 1
          }
        }).then(function ({ data }) {
          if (data.toString().substr(0, 3) == '<br' || data == 0) {
            swal("Error", 'Sin datos', "warning").catch(swal.noop); return
          }
          if (data.codigo == 0) {
            swal("Mensaje", data.nombre, "success").catch(swal.noop);
            $scope.listadoAdjuntoEnv_Detalle = []
            setTimeout(() => {
              $scope.obtenerListadoEnviados();
            }, 2500);
            setTimeout(() => { $scope.$apply(); }, 500);
          }
          if (data.codigo == 1) {
            swal("Mensaje", data.nombre, "warning").catch(swal.noop);
          }
        })
      }



      // $scope.devolverAdjuntoEnviados = function () {
      //   swal({
      //     title: 'Observación de la devolución',
      //     input: 'textarea',
      //     inputPlaceholder: 'Escribe una observacion...',
      //     showCancelButton: true,
      //     allowOutsideClick: false,
      //     inputAttributes: {
      //       id: "textarea_swal",
      //       onkeyup: "Format_cnt()"
      //     },
      //     // inputValue: $scope.Motivo_Anulacion_Devolucion
      //   }).then(function (result) {
      //     if (result && result !== '') {
      //       const observacion = result;
      //       // $scope.HojaGlosa.OBSERVACION = result;

      //       swal({
      //         title: 'Confirmar',
      //         text: '¿Seguro que desea devolver los soportes al prestador?',
      //         type: 'question',
      //         showCancelButton: true,
      //         confirmButtonColor: '#3085d6',
      //         cancelButtonColor: '#d33',
      //         confirmButtonText: 'Confirmar'
      //       }).then((result) => {
      //         if (result) {

      //           swal({
      //             title: 'Cargando información...',
      //             allowEscapeKey: false,
      //             allowOutsideClick: false
      //           });
      //           swal.showLoading();

      //           const datos = [
      //             {
      //               documento: $scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO,
      //               numero: $scope.listadoAdjuntoEnv_datos.OSOV_NUMERO,
      //               ubicacion: $scope.listadoAdjuntoEnv_datos.OSON_UBICACION,
      //               tercero: $scope.listadoAdjuntoEnv_datos.OSON_TERCERO,
      //               renglon: $scope.listadoAdjuntoEnv_datos.OSON_RENGLON,
      //               responsable: $scope.Rol_Cedula,
      //               observacion: observacion,
      //               opcion: 'D',
      //             }
      //           ]

      //           $http({
      //             method: 'POST',
      //             url: "php/contratacion/funccontratacion.php",
      //             data: {
      //               function: 'P_U_SOPORTE_CONTRATO',
      //               datos: JSON.stringify(datos),
      //               cantidad: 1
      //             }
      //           }).then(function ({ data }) {
      //             if (data.toString().substr(0, 3) == '<br' || data == 0) {
      //               swal("Error", 'Sin datos', "warning").catch(swal.noop); return
      //             }
      //             if (data.codigo == 0) {
      //               swal("Mensaje", data.nombre, "success").catch(swal.noop);
      //               $scope.listadoAdjuntoEnv_Detalle = []
      //               setTimeout(() => {
      //                 $scope.obtenerListadoEnviados();
      //               }, 2500);
      //               setTimeout(() => { $scope.$apply(); }, 500);
      //             }
      //             if (data.codigo == 1) {
      //               swal("Mensaje", data.nombre, "warning").catch(swal.noop);
      //             }
      //           })

      //         }
      //       })

      //     } else {
      //       swal("info", '¡La observacion no puede ir vacia!', "warning").catch(swal.noop); return
      //     }
      //   })
      // }





      $scope.verObs = function (text) {
        swal({
          title: 'Observación de devolución',
          input: 'textarea',
          cancelButtonText: 'Cerrar',
          // inputPlaceholder: 'Escribe un comentario...',
          showCancelButton: true,
          showConfirmButton: false,
          inputValue: text
        }).then(function (result) {
          $(".confirm").attr('disabled', 'disabled');
        }).catch(swal.noop);
        document.querySelector('.swal2-textarea').setAttribute("readonly", true);
        document.querySelector('.swal2-textarea').style.height = '300px';
      }



      $scope.cargarFileUnico = function () {
        document.querySelectorAll('.fileSoportesUnico').forEach((filef) => filef.addEventListener('change', function (e) {
          var files = e.target.files;
          const id = e.target.id.split('_')[1];

          var index = $scope.listadoAdjuntoEnv_Detalle.findIndex(x => x.OSOV_TIPO_SOPORTE == id);
          $scope.listadoAdjuntoEnv_Detalle[index].soporteB64 = '';

          setTimeout(() => { $scope.$apply(); }, 500);
          if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
              const x = files[i].name.split('.'), ext = x[x.length - 1].toUpperCase();
              if (ext == 'PDF' || ext == 'DOCX' || ext == 'XLS' || ext == 'XLSX') {
                if (files[i].size < 5485760 && files[i].size > 0) {
                  $scope.getBase64(files[i]).then(function (result) {
                    $scope.listadoAdjuntoEnv_Detalle[index].soporteExt = ext.toLowerCase();
                    $scope.listadoAdjuntoEnv_Detalle[index].soporteB64 = result;
                    $scope.listadoAdjuntoEnv_Detalle[index].ruta = '';
                    console.log($scope.listadoAdjuntoEnv_Detalle[index])
                    setTimeout(function () { $scope.$apply(); }, 300);
                  });
                  setTimeout(() => { $scope.$apply(); }, 500);
                } else {
                  e.target.value = '';
                  swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (5MB)!', 'info');
                }
              } else {
                e.target.value = '';
                swal('Advertencia', '¡Solo se admiten archivos (PDF, .DOCX, .XLS, .XLSX)!', 'info');
              }
            }
          }
        })
        )

      }

      $scope.validarSoporteVaciosAprob = function () {
        return new Promise((resolve) => {
          var vacios = 0
          $scope.listadoAdjuntoEnv_Detalle.forEach(element => {
            if (element.TIPC_FIRMAS == 'S' && !element.soporteB64) { vacios++ }
          });
          resolve(vacios);
        });
      }

      $scope.guardarAdjuntoEnviadosAprob = function () {
        $scope.validarSoporteVaciosAprob().then((validSoportes) => { // Validar campos vacios
          if (!validSoportes) {
            swal({
              title: 'Confirmar',
              text: '¿Seguro que desea guardar los soportes?',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result) {

                swal({
                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando soportes...</p>',
                  width: 200,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showConfirmButton: false,
                  animation: false
                });

                var promesas = [];
                $scope.listadoAdjuntoEnv_Detalle.forEach((e, index) => {
                  if (e.soporteB64) {
                    promesas.push($scope.cargarSoporte(index));
                  }
                })
                Promise.all(promesas).then(response => {
                  // Cuando todas las promesas se resuelvan, imprimimos las respuestas
                  var errors = 0
                  response.forEach(element => {
                    if (element.substr(0, 1) != '/') {
                      errors++;
                    }
                  });
                  setTimeout(() => { $scope.$apply(); }, 500);
                  if (errors == 0) {//GUARDA EN BD

                    var data = []

                    $scope.listadoAdjuntoEnv_Detalle.forEach(e => {
                      if (e.soporteB64) {
                        data.push({
                          documento: $scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO,
                          numero: $scope.listadoAdjuntoEnv_datos.OSOV_NUMERO,
                          ubicacion: $scope.listadoAdjuntoEnv_datos.OSON_UBICACION,
                          tercero: $scope.listadoAdjuntoEnv_datos.OSON_TERCERO,
                          renglon: $scope.listadoAdjuntoEnv_datos.OSON_RENGLON,

                          tipo_soporte: e.OSOV_TIPO_SOPORTE,
                          ruta_soporte: e.ruta,

                          opcion: 'A',
                          tipo: 'E'
                        })
                      }
                    });
                    console.table(data);

                    $http({
                      method: 'POST',
                      url: "php/contratacion/funccontratacion.php",
                      data: {
                        function: 'P_U_SOPORTE_CONTRATO',
                        datos: JSON.stringify(data),
                        cantidad: data.length
                      }
                    }).then(function ({ data }) {
                      if (data.toString().substr(0, 3) == '<br' || data == 0) {
                        swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                      }
                      if (data.codigo == 0) {
                        swal('¡Mensaje!', data.nombre, 'success').catch(swal.noop);
                        $scope.listadoAdjuntoEnv_Detalle = []
                        setTimeout(() => {
                          $scope.obtenerListadoEnviados();
                        }, 2500);
                        setTimeout(() => { $scope.$apply(); }, 500);
                      }
                      if (data.codigo == 1) {
                        swal("Mensaje", data.nombre, "warning").catch(swal.noop);
                      }
                    })
                    // console.log($scope.tiposAdjuntoEnv);
                  } else {
                    swal("Error", 'Ocurrio un inconveniente al cargar los archivos, intentar nuevamente', "warning").catch(swal.noop); return
                  }
                  // Aquí puedes imprimir cualquier mensaje que desees después de recibir todas las respuestas
                  console.log('Todas las peticiones completadas');
                });
                //////////////////////
              }
            })


          } else {
            swal('Información', 'Cargue los soportes requeridos', 'info');
          }
        })



      }

      $scope.cargarSoporte = function (index) {
        return new Promise((resolve) => {
          if (!$scope.listadoAdjuntoEnv_Detalle[index].soporteB64) { resolve(''); return }
          if ($scope.listadoAdjuntoEnv_Detalle[index].ruta != '') { resolve('/'); return }

          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: "cargarSoporteAdjuntoEnv",
              carpeta: `${$scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO}_${$scope.listadoAdjuntoEnv_datos.OSOV_NUMERO}_${$scope.listadoAdjuntoEnv_datos.OSON_UBICACION}`,
              name: `${$scope.listadoAdjuntoEnv_Detalle[index].OSOV_TIPO_SOPORTE}`,
              base64: $scope.listadoAdjuntoEnv_Detalle[index].soporteB64,
              ext: $scope.listadoAdjuntoEnv_Detalle[index].soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              $scope.listadoAdjuntoEnv_Detalle[index].ruta = data;
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }


      if (document.querySelector('#file-upload-field-devuelto')) {

        document.querySelector('#file-upload-field-devuelto').addEventListener('change', function (e) {
          setTimeout(() => { $scope.$apply(); }, 500);
          var files = e.target.files;
          $("#file-upload-field-devuelto").parent(".file-upload-wrapper_2").attr("data-text", `Adjuntar Archivo`);
          if (files.length == 0) {
            $scope.formDevuelto.soporteExt = null;
            $scope.formDevuelto.soporteB64 = null;
            return
          }
          for (let i = 0; i < files.length; i++) {
            const x = files[i].name.split('.'), ext = x[x.length - 1].toUpperCase();
            if (ext == 'PDF' || ext == 'DOCX' || ext == 'XLS' || ext == 'XLSX' || ext == 'ZIP') {
              if (files[i].size < 5485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (result) {
                  $("#file-upload-field-devuelto").parent(".file-upload-wrapper_2").attr("data-text", files[i].name);
                  $scope.formDevuelto.soporteExt = ext.toLowerCase();
                  $scope.formDevuelto.soporteB64 = result;
                  setTimeout(function () { $scope.$apply(); }, 300);
                });
              } else {
                document.querySelector('#file-upload-field-devuelto').value = '';
                swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (5MB)!', 'info');
              }
            } else {
              document.querySelector('#file-upload-field-devuelto').value = '';
              swal('Advertencia', '¡Solo se admiten archivos (PDF, .DOCX, .XLS, .XLSX, .ZIP)!', 'info');
            }
          }
        });
      }

      $scope.guardarAdjuntosDevueltos = function () {
        if (!$scope.formDevuelto.observacion || $scope.formDevuelto.observacion.length < 5) {
          swal('Información', 'Debe ingresar una observación', 'info');
          return
        }

        swal({
          title: 'Confirmar',
          text: '¿Desea actualizar los soportes y enviar de nuevo al prestador?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result) {

            swal({
              html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando soportes...</p>',
              width: 200,
              allowOutsideClick: false,
              allowEscapeKey: false,
              showConfirmButton: false,
              animation: false
            });

            $scope.cargarSoporteDevuelto().then(soporte_resp => {
              console.log(soporte_resp)

              if ($scope.formDevuelto.soporteExt && !soporte_resp) {
                swal("Error", 'Ocurrio un inconveniente al cargar los archivos, intentar nuevamente', "warning").catch(swal.noop); return
              }

              var promesas = [];
              $scope.listadoAdjuntoEnv_Detalle.forEach((e, index) => {
                if (e.soporteB64) {
                  promesas.push($scope.actualizarSoporte(index));
                }
              })
              Promise.all(promesas).then(response => {
                // Cuando todas las promesas se resuelvan, imprimimos las respuestas
                var errors = 0
                response.forEach(element => {
                  if (element.substr(0, 1) != '/') {
                    errors++;
                  }
                });
                setTimeout(() => { $scope.$apply(); }, 500);
                if (errors == 0) {//GUARDA EN BD

                  var data = []
                  data.push({
                    documento: $scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO,
                    numero: $scope.listadoAdjuntoEnv_datos.OSOV_NUMERO,
                    ubicacion: $scope.listadoAdjuntoEnv_datos.OSON_UBICACION,
                    tercero: $scope.listadoAdjuntoEnv_datos.OSON_TERCERO,
                    renglon: $scope.listadoAdjuntoEnv_datos.OSON_RENGLON,

                    observacion: $scope.formDevuelto.observacion,
                    ruta_soporte: soporte_resp ? soporte_resp : '',
                    responsable: $scope.Rol_Cedula,

                    tipo: 'E',
                    opcion: 'E'
                  })
                  console.table(data);

                  $http({
                    method: 'POST',
                    url: "php/contratacion/funccontratacion.php",
                    data: {
                      function: 'P_U_SOPORTE_CONTRATO',
                      datos: JSON.stringify(data),
                      cantidad: data.length
                    }
                  }).then(function ({ data }) {
                    if (data.toString().substr(0, 3) == '<br' || data == 0) {
                      swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                    }
                    if (data.codigo == 0) {
                      swal('¡Mensaje!', data.nombre, 'success').catch(swal.noop);
                      $scope.listadoAdjuntoEnv_Detalle = []
                      setTimeout(() => {
                        $scope.obtenerListadoEnviados();
                      }, 2500);
                      setTimeout(() => { $scope.$apply(); }, 500);
                    }
                    if (data.codigo == 1) {
                      swal("Mensaje", data.nombre, "warning").catch(swal.noop);
                    }
                  })
                  // console.log($scope.tiposAdjuntoEnv);
                } else {
                  swal("Error", 'Ocurrio un inconveniente al cargar los archivos, intentar nuevamente', "warning").catch(swal.noop); return
                }
                // Aquí puedes imprimir cualquier mensaje que desees después de recibir todas las respuestas
                console.log('Todas las peticiones completadas');
              });

              //////////////////////
            })
            //////////////////////
          }
        })

      }

      $scope.cargarSoporteDevuelto = function () {
        return new Promise((resolve) => {
          if (!$scope.formDevuelto.soporteExt) {
            resolve(false);
            return;
          }
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: "cargarSoporteAdjuntoEnv",
              carpeta: `${$scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO}_${$scope.listadoAdjuntoEnv_datos.OSOV_NUMERO}_${$scope.listadoAdjuntoEnv_datos.OSON_UBICACION}`,
              name: 'Respuesta_EPS',
              base64: $scope.formDevuelto.soporteB64,
              ext: $scope.formDevuelto.soporteExt

            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }

      $scope.actualizarSoporte = function (index) {
        return new Promise((resolve) => {
          $http({
            method: 'POST',
            url: "php/contratacion/funccontratacion.php",
            data: {
              function: "cargarSoporteAdjuntoEnv",
              carpeta: `${$scope.listadoAdjuntoEnv_datos.OSOC_DOCUMENTO}_${$scope.listadoAdjuntoEnv_datos.OSOV_NUMERO}_${$scope.listadoAdjuntoEnv_datos.OSON_UBICACION}`,
              ruta: `${$scope.listadoAdjuntoEnv_Detalle[index].OSOV_RUTA_SOPORTE_EPS}`,
              base64: $scope.listadoAdjuntoEnv_Detalle[index].soporteB64,
              ext: $scope.listadoAdjuntoEnv_Detalle[index].soporteExt
            }
          }).then(function ({ data }) {
            if (data.toString().substr(0, 3) != '<br') {
              $scope.listadoAdjuntoEnv_Detalle[index].ruta = data;
              resolve(data);
            } else {
              resolve(false);
            }
          })
        });
      }


      $scope.SetTab_Adjuntos = function (x) {
        $scope.Tabs_Adjuntos = x;
      }

      $scope.Ajustar_Pantalla = function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
      }

    }]).filter('capitalize', function () {
      return function (input) {
        return (angular.isString(input) && input.length > 0) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : input;
      }
    });
function Format_cnt() {
  const input = document.querySelectorAll('#textarea_swal')[5];
  var valor = input.value;
  valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
  valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
  input.value = valor;
  // console.log(document.querySelectorAll('#log')[5].value);
}
