'use strict';
angular.module('GenesisApp')
  .controller('radicacioncacController', ['$scope', '$http', '$timeout','$window','pqrHttp',
    function ($scope, $http, $timeout,$window, pqrHttp) {

      $scope.columnas = 34;
      $scope.maxsize = 5242880;
      $scope.enviar_disabled = true;
      $scope.data = null;
      $scope.pqrData = { pqrFile: null, ext: null };
      $scope.hidenombre = true;
      $scope.periodo_ips = ' ';

      $.getJSON( "php/obtenersession.php")
      .done(function(respuesta) {
        // console.log(respuesta);
        $scope.ubifuncionario = respuesta.codmunicipio;
        if ($scope.ubifuncionario.substr(0, 2) == 80 || $scope.ubifuncionario.substr(0, 1) == 8) {
          $scope.ubifuncionario = '8';
        }
        if ($scope.ubifuncionario.substr(0, 2) != 80 && $scope.ubifuncionario.substr(0, 1) != 8 && $scope.ubifuncionario != 1) {
          $scope.ubifuncionario = $scope.ubifuncionario.substr(0, 2);
        }
      })

      
      $scope.Find_Solicitante_enter = function (keyEvent) {
        if (keyEvent.which === 13)
          $scope.H1_Buscar_Solicitante();
      }

      $scope.H1_Buscar_Solicitante = function () {
        if ($scope.h1solicitante == '' || $scope.h1solicitante == null || $scope.h1solicitante == undefined) {
          Materialize.toast('Digite un NIT', 1500); $('.toast').addClass('default-background-dark');
          $scope.h1solicitante = $scope.h1solicitante_SAVE;
        } else {
          if ($scope.h1solicitante != $scope.h1solicitante_SAVE) {
            if ($scope.h1solicitante.length < 3) {
              Materialize.toast('Digite al menos 3 caracteres!', 1500); $('.toast').addClass('default-background-dark');
            } else {
              $http({
                method: 'POST',
                url: "php/cacips/cacips.php",
                data: {
                  function: 'obtener_ips',
                  datos: $scope.h1solicitante,
                  ubicacion: ($scope.ubifuncionario==1)?'1':$scope.ubifuncionario
                }
              }).then(function (response) {
                if (response.data == 0) {
                  Materialize.toast('No existen registros de IPS.', 1500); $('.toast').addClass('default-background-dark');
                  $scope.h1solicitante = '';
                  $scope.h1solicitante_SAVE = '';
                  $scope.h1solicitante_COD = '';
                  $scope.Filter_H1_Solicitante = null;
                }
                if (response.data.length == 1 && response.data != 0) {
                  $scope.h1solicitante = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                  $scope.h1solicitante_SAVE = response.data[0].CODIGO + ' - ' + response.data[0].NOMBRE;
                  $scope.h1solicitante_COD = response.data[0].CODIGO;
                  $scope.Filter_H1_Solicitante = null;
                }
                if (response.data.length > 1) {
                  $scope.H1_Lista_Solicitante = response.data;
                  $scope.Complete_H1_Solicitante($scope.h1solicitante);
                }
              });
            }
          } else {
            Materialize.toast('¡La IPS a consultar es la misma seleccionada!', 1500); $('.toast').addClass('default-background-dark');
          }
        }
      }

      $scope.Blur_H1_Solicitante = function () {
        if ($scope.h1solicitante != null && $scope.h1solicitante != undefined) {
          if ($scope.H1_Lista_Solicitante != null && $scope.H1_Lista_Solicitante != 0) {
            $timeout(function () {
              if ($scope.h1solicitante != $scope.h1solicitante_SAVE) {
                $scope.Filter_H1_Solicitante = null;
                $scope.h1solicitante = null;
                $scope.h1solicitante_COD = '';
                Materialize.toast('¡Seleccione alguna de las opciones permitidas!', 1500); $('.toast').addClass('default-background-dark');
              }
            }, 300);//END TIMEOUT
          }
        } else {
          $scope.h1solicitante = $scope.h1solicitante_SAVE;
          $scope.Filter_H1_Solicitante = null;
        }
      }

      $scope.Complete_H1_Solicitante = function (string) {
        $('#list-group-solicitante').css({ width: $('#h1solicitante')[0].offsetWidth });
        if ($scope.H1_Lista_Solicitante != null && $scope.H1_Lista_Solicitante != 0) {

          var output = [];
          angular.forEach($scope.H1_Lista_Solicitante, function (H1_Lista_Solicitante) {
            if (H1_Lista_Solicitante.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || H1_Lista_Solicitante.CODIGO.toString().indexOf(string) >= 0) {
              output.push({ "Solicitante": ({ "CODIGO": H1_Lista_Solicitante.CODIGO, "NOMBRE": H1_Lista_Solicitante.NOMBRE.toUpperCase() }) });
            }
          });
          $scope.Filter_H1_Solicitante = output;

        }
      }

      $scope.FillTextbox_H1_Solicitante = function (codigo, nombre) {
        $scope.h1solicitante = codigo + ' - ' + nombre;
        $scope.h1solicitante_SAVE = codigo + ' - ' + nombre;
        $scope.h1solicitante_COD = codigo;
        $scope.Filter_H1_Solicitante = null;
      }

      $(document).ready(function () {
        $("#tabs").tabs();
      });
      $scope.setTab = function (newTab) {
        $scope.tab = newTab;
        $(".tabI").removeClass("tabactiva");
        $(".tabII").removeClass("tabactiva");

        switch (newTab) {
          case 1:
            $(".tabI").addClass("tabactiva");
            $scope.Title = "Radicación";
            break;
          case 2:
            $(".tabII").addClass("tabactiva");
            $scope.Title = "Lista";
            break;
          case 3:
            $(".tabIII").addClass("tabactiva");
            $scope.Title = "Indicadores";
            break;

          default:
        }
      }
      $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
      }

      $scope.setTab(1);

      $scope.obtener_periodos = function () {
        $http({
          method: 'POST',
          url: "php/cacips/cacips.php",
          data: { function: 'obtener_periodo' }
        }).then(function (response) {
          $scope.opciones_periodo = response.data[0];
        })
      }

      $scope.obtener_validaciones = function () {
        $http({
          method: 'POST',
          url: "php/cacips/cacips.php",
          data: { function: 'obtener_validaciones' }
        }).then(function (response) {
          $scope.validaciones = response.data;
          $scope.validacionesTemp = $scope.validaciones;
          $scope.parametros_pag();
          $scope.configPages($scope.validacionesTemp);
        })
      }

      $scope.parametros_pag = function () {
        $scope.currentPage = 0;
        $scope.pageSize = 7;
        $scope.valmaxpag = 7;
        $scope.pages = [];
      }

      $scope.configPages = function (temporal) {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil(temporal.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil(temporal.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil(temporal.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil(temporal.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil(temporal.length / $scope.pageSize);
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
      };

      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
      };

      $scope.checkpobl = false;
      $scope.poblacion = function(){
        if($scope.table!=null){
          if($scope.checkpobl){
            $scope.view_table = true;
            $scope.mensaje="Población por registrar.";
          }else{
            $scope.view_table = false;
            $scope.mensaje="Poblacion ya registrada.";
          }
        }

      }


      $scope.obtener_validaciones();
      $scope.obtener_periodos();

      $scope.download_xls = function(){
        $window.open('php/cacips/excel_resumen.php?nit='+$scope.nit_empresa, "width=1080,height=1100");
      }

      $http({
        method: 'POST',
        url: "php/cacips/errores.php",
      }).then(function (response) {
          // console.log(response.data);
      })
      
      $scope.error = true;
      $scope.enviar = function () {
        swal({
					title: 'Cargando Archivo...'
				});
				swal.showLoading();
        if ($scope.ok == true) {
          $http({
            method: 'POST',
            url: "php/cacips/cacips.php",
            data: {
              function: 'subirAdjunto',
              file: $scope.filecomp,
              ext: $scope.fileext,
              nit: $scope.h1solicitante_COD
            }
          }).then(function (response) {
            setTimeout(function() {
              
            $scope.url = response.data;
            $scope.nombrearchivo = $scope.url.split("/",$scope.url.length);

              console.log($scope.name);

            $http({
              method: 'POST',
              url: "php/cacips/cacips.php",
              data: {
                function: 'subirDirectoryCAC',
                file: $scope.filecomp,
                ext: $scope.fileext,
                nit: $scope.h1solicitante_COD,
                name: $scope.nombrearchivo[4]
              }
            }).then(function (response) {
             
            // console.log(response.data);
            $http({
              method: 'POST',
              url: "php/cacips/cacips.php",
              data: {
                function: 'INSERTA_ARCHIVOS',
                archivo: $scope.filename,
                periodo:  $scope.opciones_periodo.codigo,
                ruta: $scope.url,
                nit: $scope.h1solicitante_COD
              }
            }).then(function (response) {
              swal.close();
              swal('¡Exito!','Su archivo fue cargado correctamente, en las próximas horas le estaremos respondiendo vía correo corporativo.','success')
              $('#adjunto').val("");
              $('#inputFilePlaceHolder').val("");
              $scope.data = '';
              $scope.filecomp = null;
              $scope.ok = false;
               
              
            })
          
          })
            
          
            }, 3000);
          })
        } else {
          swal({
            position: 'top-end',
            type: 'warning',
            title: 'Favor adjuntar un archivo formato (.txt)',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }

      
      $scope.table = $('#lista_asociados_validados').DataTable( {
        dom: 'lBsfrtip',
        buttons: [ ],
        ajax: {
          url: 'php/cacips/listar_afival.php',
          dataSrc: ''
        },
        columns: [
          { data: "tipodocumento" },
              { data: "numerodocumento" },
              { data: "nombre" },
              { data: "contacto" }
              // { data: "ERC" }
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        order: [[ 1, "desc" ]],
        lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]//,
      } );

      
      $scope.table2 = $('#lista_asociados').DataTable( {
        dom: 'lBsfrtip',
        buttons: [ ],
        ajax: {
          url: 'php/cacips/listar_afi.php',
          dataSrc: ''
        },
        columns: [
          { data: "tipodocumento" },
              { data: "numerodocumento" },
              { data: "nombre" },
              { data: "contacto" }
              // { data: "ERC" }
        ],
        language: {
          "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        },
        order: [[ 1, "desc" ]],
        lengthMenu: [[10, 30, 50,-1], [10, 30, 50,'Todas']]//,
      } );

      $('#adjunto').change(function () {//Detecta los cambios que sufre el input file
        $timeout(function () {//Usado para validar el file en tiempo real
          var file = document.getElementById('adjunto').files[0];
          $scope.data = '';
          if (file) {
            $scope.file = file;
            if (file.size <= $scope.maxsize) {
              if (file.name.split('.').pop().toLowerCase() == 'txt') {
                $scope.filename = file.name;
                $scope.data = 'Dentro del peso limite y formato validado';

                var reader = new FileReader();
                reader.onload = function (progressEvent) {
                  var lines = this.result.split('\n');
                  var datos;
                  var tipoval;
                  for (var line = 0; line < lines.length; line++) {
                    datos = lines[line].split('|');
                    if (datos != '' && datos != undefined && datos != null) {
                      if (datos.length == $scope.columnas) {
                        $scope.estado = true;
                      } else {
                        $scope.estado = false;
                        tipoval = '1';
                        break;
                      }
                    }
                  }

                  if ($scope.estado == true) {
                    $timeout($scope.ok = true);
                    $scope.enviar_disabled = false;
                  } else {
                    if (tipoval == '1') {
                      swal('IMPORTANTE', 'el archivo adjunto presenta error en el numero de columnas esperadas (' + $scope.columnas + ').', 'info')
                      $scope.ok = false;
                      $scope.enviar_disabled = true;
                    }
                    else { }
                  }
                };
                reader.readAsText(file);
              } else {
                $scope.data = 'Formato Invalido solo puedes adjuntar archivos con extensión .txt';
                $scope.filecomp = null;
                $scope.ok = false;
                $scope.enviar_disabled = true;
              }
            } else {
              $scope.data = 'Limite de Peso Excedido';
              $scope.filecomp = null;
              $scope.ok = false;
              $scope.enviar_disabled = true;

            }
          } else {
            $scope.data = '';
            $scope.filecomp = null;
            $scope.ok = false;
            $scope.enviar_disabled = true;

          }
        }, 100);
      })

      document.getElementById("adjunto").addEventListener("change", readFile);
      function readFile() {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener("load", function (e) {
            $scope.filecomp = e.target.result;
            $scope.fileext = '';
            var name = document.getElementById('adjunto').files[0].name;
            $scope.fileext = name.split('.').pop();
          });
          FR.readAsDataURL(this.files[0]);
        }
      }

     
      $scope.actualizagrafica = function () {
      // setInterval(() => {  
       $scope.pietickets();
      // }, 50000);
      }

      $scope.actualizartabla = function(){
        $scope.table2.ajax.reload();
        $scope.table.ajax.reload();
      }
      var vm = this;
      $scope.pietickets = function () {
        $http({
          method: 'POST',
          url: "php/cacips/cacips.php",
          data: { function: 'OBTENER_CANT_USUARIO' }
        }).then(function (response) {
          $scope.activos = response.data[0].ACTIVOS;
          $scope.procesados = response.data[0].PROCESADOS;
          $scope.consolidado = response.data[0].TOTAL;
          $scope.pieresponse = [{ "nombre": "Registrados", "cantidad": $scope.activos }, { "nombre": "Sin registrar", "cantidad": $scope.consolidado}, { "Total": $scope.procesados  }];
          $scope.tickets = $scope.pieresponse;
          //     response.data;
          //    console.log($scope.tickets);
          var hoy = new Date();

          var pieColors = (function () {
            var colors = ["rgb(26, 46, 99)", "rgb(255,0,0)"]
            return colors;
          }());

          $scope.yyyy = hoy.getFullYear();

          vm.hc4 = angular.element('#pietickets').highcharts({
            chart: {
              type: 'pie',
              options3d: {
                enabled: true,
                alpha: 45
              }
            },

            title: {
              text: 'Total Poblacion Asignada: ' + Number($scope.tickets["2"].Total)
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: pieColors,
                depth: 45,
                dataLabels: {
                  enabled: true,
                  format: '<b style="font-size: inherit;">{point.name}: </b> <b><strong style="font-size: large;">{point.y:,.0f}</strong></b>',
                  style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  },
                  connectorColor: 'silver'
                },
                showInLegend: true
              }
            },
            series: [{
              name: 'tickets',
              data: [
                { name: $scope.tickets["0"].nombre, y: Number($scope.tickets["0"].cantidad) },
                { name: $scope.tickets["1"].nombre, y: Number($scope.tickets["1"].cantidad) }
              ]
            }]
          });


        });
      }

    }])
  .filter('inicio', function () {
    return function (input, start) {
      if (input != undefined && start != NaN) {
        start = +start;
        return input.slice(start);
      } else {
        return null;
      }
    }
  })


