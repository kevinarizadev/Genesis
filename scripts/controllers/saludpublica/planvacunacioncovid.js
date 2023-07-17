'use strict';
angular.module('GenesisApp')
  .controller('planvacunacioncovid', ['$scope', '$filter', 'consultaHTTP', 'afiliacionHttp', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
    function ($scope, $filter, consultaHTTP, afiliacionHttp, notification, $timeout, $rootScope, $http, $window, ngDialog) {
      $(document).ready(function () {
        $('#modaldatos').modal();
        $('#modalrechazo').modal();
        $scope.cantidades_para_gestiones();
        $scope.listar_motivorechazos();
        $scope.graficageneral();
        $scope.listar_viaprincipal();

      });

      $scope.viaprincipal = '';
      $scope.nprincipal = '';
      $scope.viacomplementaria = '';
      $scope.ncomplementario = '';
      $scope.complemento = '';

      $scope.limpiar_datosactualizados = function () {

        $scope.viaprincipal = '';
        $scope.nprincipal = '';
        $scope.viacomplementaria = '';
        $scope.ncomplementario = '';
        $scope.complemento = '';
        
      }
      
      $scope.cantidades_para_gestiones = function (){
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: { function: 'total_gestiones' }
        }).then(function (response) {      
            $scope.cantidad_total_gestiones = response.data;              
            $scope.cantidad_mostrar = $scope.cantidad_total_gestiones.CANTIDAD;              
        });

      }
    
      $scope.formatPeso2 = function (num) {
        if(num){
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
            return num[0];
          } else {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            return num;
          }
        }
      }

      $scope.responsable = sessionStorage.getItem('cedula')
      $scope.contar = 0;
      $scope.mostrar = 1;
      $scope.color = "orange";
      $scope.ano = 2019;
      $scope.cantidad = "100";
      $scope.cantidad_media = "100";
      $scope.cantidad_total = "100";
      $scope.clase_contenedor = true;
      $scope.menu = document.getElementById('my_menu');
      $scope.altura = 64;
      $scope.bajar_todo = function () {
        $('#myDiv').scrollTop($('#div1').height() + 64);
        jQuery('#my_menu').addClass('my_fixed');
        jQuery('#div2').addClass('bajar');
      }
      $.getJSON("php/obtenersession.php").done(function (respuesta) {
        $scope.sesdata = respuesta;
        

        
        if ($scope.sesdata.codmunicipio.length == 1) {
          $scope.filtrar = "";
        } else if ($scope.sesdata.codmunicipio.length == 4) {
          $scope.filtrar = $scope.sesdata.codmunicipio.substring(0, 1);
        } else {
          $scope.filtrar = $scope.sesdata.codmunicipio.substring(0, 2);
        }


      }).fail(function (jqXHR, textStatus, errorThrown) {
        
      });
      // $scope.menu = document.getElementById('menu');
      // $scope.altura = 64;
      // angular.element($window).bind("scroll", function () {
      //   alert("hola");
      //   if (window.pageYOffset >  $scope.altura) {
      //     $scope.menu.classList.add('fixed');
      
      //   } else {
      //     $scope.menu.classList.remove('fixed');
      
      //   }
      // });

      afiliacionHttp.obtenerViaPrincipal().then(function (response) {
        $scope.list_viaprincipal = response.Viaprincipal;
      })



      $scope.abrirModal = function (mda) {

        $scope.tipodoc = mda.TIPO_DOC;
        $scope.numerodoc = mda.NUM_DOC;
        $scope.correo = mda.CORREO;
        $scope.barrio = mda.BARRIO;

        $scope.celular = mda.CELULAR;
        $scope.celular2 = mda.CELULAR_1;
        $scope.telefono = mda.TELEFONO;
        $scope.correoelectronico = mda.CORREO;
        $scope.direccion = mda.DIRECCION;
        $scope.fechainicio = mda.FECHA_INICIO;
        $scope.fechafinal = mda.FECHA_FIN;

        $('#modaldatos').modal('open');
        $scope.limpiar_datosactualizados();


        document.querySelector('.modal-overlay').addEventListener('click', () => { });
      }

      $scope.cerrarModal = function () {
        $('#modaldatos').modal('close');
      }



      $http({
        method: 'POST',
        url: "php/saludpublica/planvacunacioncovid.php",
        data: {
          function: 'ver_motivosrechazo', responsable: $scope.responsable
        }
      }).then(function (response) {
        
        $scope.list_rechazo = response.data;

      });






      $scope.rechazar = function (mda) {
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: {
            function: 'ver_motivosrechazo', responsable: $scope.responsable
          }
        }).then(function (response) {
          $scope.proceso = response.data;
          $scope.array = {};
          for (var i = 0; i < $scope.proceso.length; i++) {
            var key = $scope.proceso[i].CODIGO;
            var val = $scope.proceso[i].DESCRIPCION;


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
              swal.close()
              $scope.motivo_rechazo = result;
              var datos = {
                "responsable": $scope.responsable,
                "tipo_doc": mda.TIPO_DOC,
                "num_doc": mda.NUM_DOC,
                "fecha_ini": mda.FECHA_INICIO,
                "fecha_fin": mda.FECHA_FIN,
                "estado": $scope.estado = 'X',
                "actualiza": $scope.actualiza = "N",
                "motivo_rechazo": $scope.motivo_rechazo

                // "status": $scope.status = "4"                
              };
              
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
                url: "php/saludpublica/planvacunacioncovid.php",
                data: {
                  function: 'actualizardatos', datos: JSON.stringify(datos)
                }
              }).then(function (res) {
                if (res.data.Codigo == 0) {
                  swal.close()
                  swal('Notificacion', res.data.Nombre, 'success');
                  $scope.cerrarModal();
                  
                  // $scope.filterdepartamento();
                  // $scope.filterMunicipio();

                  setTimeout(() => {
                    $scope.filtertabla($scope.actualizarmunicipio, $scope.actualizarnombre, $scope.actualizarcantidad);

                  }, 3000);


                  $scope.registro_validado = false;
                  $scope.limpiardatos();

                  // $('#modalsemana').modal('close');

                } else {
                  if (res.data.Codigo == 1) {
                    swal('Notificacion', res.data.Nombre, 'error')
                  }
                }
              });
            }
          })
        });
      }


      $scope.listar_motivorechazos = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: {
            function: 'ver_motivosrechazo', responsable: $scope.responsable
          }
        }).then(function (response) {
          
          $scope.list_rechazo = response.data;

        });

      }
      $scope.listar_viaprincipal = function () {
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: {
            function: 'ver_viaprincipal', 
          }
        }).then(function (response) {
          
          $scope.list_viaprincipal2 = response.data;

        });

      }

      $scope.mostrardiagnosticos = function () {
        $http({
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: {
            function: 'diagnosticos'
          }
        }).then(function (response) {
          
          $scope.lista_diag = response.data;
          $scope.dialogDireccion = ngDialog.open({
            template: 'views/nacimientos/modal_diagnostico.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
          });
        })
      }

      angular.element($window).bind("scroll", function () {

        if (this.pageYOffset >= 100) {

          // $scope.clase_contenedor = false;
          
        } else {
          //  $scope.clase_contenedor=true;

          
        }
        
        $scope.$apply();
      });

      $("#myDiv").scroll(function () {
        var scroll = $("#myDiv").scrollTop();
        $("#div1>div").css({
          transform: "translateY(" + (scroll / 1) + "px)"
        });
        if (scroll < 700) {
          
          jQuery('#my_menu').removeClass('my_fixed');
          jQuery('#div2').removeClass('bajar');
        } else {
          
          jQuery('#my_menu').addClass('my_fixed');
          jQuery('#div2').addClass('bajar');

        }

      });

      $scope.gestion = function (tipoDoc, doc, orig, nombre) {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;"></p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        }).catch(swal.noop);
        $http({
          // method: 'GET',
          // url: "json/ejemplo_1.json"
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: {
            function: 'modal_datos',
            tipoDoc: tipoDoc,
            doc: doc,
            orig: orig,
            anno: $scope.ano
          }
        }).then(function (response) {
          swal.close();
          
          $scope.ORIGEN_TEMPO = nombre;
          $scope.modal_gestion_ips = response.data;
          var gestion_modal_ips = ngDialog.open({
            template: 'views/nacimientos/modal_gestion.html',
            className: 'ngdialog-theme-plain',
            // controller: 'modalgestion_grafica_solicitudCtrl',
            scope: $scope
          });
        })
      }

      $scope.mostrar_panel = function () {
        $scope.mostrar = $scope.mostrar - 1;
        if ($scope.mostrar == 0) {
          $('#myDiv').scrollTop($('#myDiv').height() * 0);
          $scope.mostrar = 1;
        }
      }

      $('.flip').click(function () {

        $(this).find('.card').addClass('flipped').mouseleave(function () {
          var element = document.getElementById("myDIV");
          element.classList.removeClass('flipped');
          jQuery('#testID2').removeClass('flipped');
        });
        return true;
      });

      //GRAFICAS 1 ----> ESTA PARTE SE BORRO 
      $scope.graficageneral = function () {

        $http({
          // method: 'GET',
          // url: "json/ejemplo_1.json"
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: { function: 'grafica_general' }
        }).then(function (response) {

        })

      }

      $scope.tendencia2 = function (id, nombre) {


        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        if ($(".flip>." + id + ">.card_back")[0].className.indexOf("flipped_back") == -1) {
          $(".flip>." + id + ">.card_front").addClass('flipped');
          setTimeout(function () {
            $(".flip>." + id + ">.card_front").css("display", "none");
            $(".flip>." + id + ">.card_back").css("display", "block");
            $(".flip>." + id + ">.card_back").addClass('flipped_back');
          }, 250);
        } else {
          $(".flip>." + id + ">.card_back").removeClass('flipped_back');
          setTimeout(function () {
            $(".flip>." + id + ">.card_back").css("display", "none");
            $(".flip>." + id + ">.card_front").css("display", "block");
            $(".flip>." + id + ">.card_front").removeClass('flipped');
          }, 250);
        }
        $http({
          // method: 'GET',
          // url: "json/ejemplo_1.json"
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: { function: 'grafica_seccional', departamento: id }
        }).then(function (response) {
          swal.close()
          $scope.todo_juntico = response.data[0];
          $scope.grafica_activos = response.data[0].ACTIVO;
          $scope.grafica_procesado = response.data[0].PROCESADO;
          $scope.grafica_rechazado = response.data[0].RECHAZADO;
          $scope.grafica_sumatotal = (Number($scope.grafica_activos) + Number($scope.grafica_procesado) + Number($scope.grafica_rechazado)); 

          $scope.graficap_activos = ($scope.grafica_activos / $scope.grafica_sumatotal * 100);
          $scope.graficap_procesado = ($scope.grafica_procesado / $scope.grafica_sumatotal * 100);
          $scope.graficap_rechazado = ($scope.grafica_rechazado / $scope.grafica_sumatotal * 100);          
          
          $scope.graficap_activos_total = $scope.graficap_activos.toFixed(2);
          $scope.graficap_procesado_total = $scope.graficap_procesado.toFixed(2);
          $scope.graficap_rechazado_total = $scope.graficap_rechazado.toFixed(2);
          // (parseInt(reg.PENDIENTE) / (parseInt(reg.PENDIENTE) + parseInt(reg.GESTIONADOS) + parseInt(reg.RECHAZADO)) * 100)

          var mostrar_tabla1 = response.data[0].ACTIVO;
          console.log(mostrar_tabla1)

          var altura_activo =parseInt(response.data[0].ACTIVO);          
          var altura_procesado = parseInt(response.data[0].PROCESADO);
          var altura_rechazado = parseInt(response.data[0].RECHAZADO);
        
          var label=['ACTIVO','APROBADO', 'RECHAZADO'];

          // $("#" + (id * 10)).text(cantidadafi);
          //var media = parseInt(response.data[0].media);
          //$("#" + (id * 20)).text(media);
          //$("#" + (id * 30)).text(cantidadafi);
          Highcharts.chart(id, {
            chart: {
              zoomType: 'xy'
            },
            title: {
              text: ' '
            },
            credits: {
              enabled: false
            },
            xAxis: [{
              categories: label
              // crosshair: true
            }],
            plotOptions: {
              series: {
                animation: false
              }
            },
            yAxis: [{ // Primary yAxis
              labels: {
                format: '{value}',
                style: {
                  color: Highcharts.getOptions().colors[7]
                }
              },
              title: {
                text: '',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              }
            }, { // Secondary yAxis
              title: {
                text: '',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
              labels: {
                format: '{value}',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
              opposite: true
            }],

            legend: {
              itemWidth: 100,
              adjustChartSize: true,
              navigation: {
                enabled: false
              },
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
            },
            series: [{
              name: 'Vacuna',
              type: 'column',

              data: [
                {
                  y: altura_activo,
                  color: '#1a2e63'
                },
                {
                  y: altura_procesado,
                  color: '#33FFA8'
                },
                {
                  y: altura_rechazado,
                  color: '#FF9333'
                },
                // {
                //   y: altura[3],
                //   color: '#7cb5ec',
                //   dataLabels: { enabled: true, format: porcentaje[3] + "%" }
                // },
                // {
                //   y: altura[4],
                //   color: '#7cb5ec',
                //   dataLabels: { enabled: true, format: porcentaje[4] + "%" }
                // }
              ],
              tooltip: {
                valueSuffix: ''
              }

            },],
            navigation: {
              buttonOptions: {
                enabled: false
              }
            },
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
          });
        })

      }

        $scope.Calcular_Porcentajes = function (X,Valor1,Valor2,Valor3) {
          // console.log(X,Valor1,Valor2,Valor3);
          var total = (Number(Valor1) + Number(Valor2) + Number(Valor3)); 
          // console.log((X / total * 100).toFixed(2))
          return (X / total * 100).toFixed(2);
        }
      //CARGAR DEPARTAMENTO
      $scope.yearNext = function () {
        $scope.ano = $scope.ano + 1;
        $scope.tendencia();
        $scope.filterdepartamento();

      }
      $scope.yearPrev = function () {
        if ($scope.ano > 2018) {
          $scope.ano = $scope.ano - 1;
          $scope.tendencia();
          $scope.filterdepartamento();
        }
      }


      $scope.Dir = function () {
        $scope.direccion = $scope.viaprincipal + ' ' + $scope.nprincipal + ' ' + $scope.viacomplementaria + ' ' + $scope.ncomplementario + ' ' + $scope.complemento;
      }

      $scope.actualizardatos = function () {
        var Encontrar_Vacios = false;



            if ($scope.viaprincipal == null || $scope.viaprincipal == '') { Encontrar_Vacios = true; }
            if ($scope.nprincipal == null || $scope.nprincipal == '') { Encontrar_Vacios = true; }
            if ($scope.barrio == null || $scope.barrio == '') { Encontrar_Vacios = true; }
            //if ($scope.celular == null || $scope.celular == '') { Encontrar_Vacios = true; }
            
            
            if (Encontrar_Vacios == true) {
                swal('Notificación', 'Por favor digitar campos obligatorios', 'info')
                return;
            }


        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        var datos = {
          "responsable": $scope.responsable,
          "fecha_ini": $scope.fechainicio,
          "fecha_fin": $scope.fechafinal,
          "estado": $scope.estado = 'P',
          "tipo_doc": $scope.tipodoc,
          "num_doc": $scope.numerodoc,
          "direccion": $scope.direccion,
          "barrio": $scope.barrio,
          "telefono": $scope.telefono,
          "celular": $scope.celular,
          "celular2": $scope.celular2,
          "correo": $scope.correo,
          "actualiza": $scope.actualiza = "S",
          "motivo_rechazo": $scope.motivo_rechazo = '',
          // "status": $scope.status = "4"                
        };
        
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: {
            function: 'actualizardatos', datos: JSON.stringify(datos)
          }
        }).then(function (res) {
          if (res.data.Codigo == 0) {
            swal.close()
            swal('Notificacion', res.data.Nombre, 'success');
            $scope.cerrarModal();
            // $scope.filterdepartamento();
            // $scope.filterMunicipio();
            setTimeout(() => {
              $scope.filtertabla($scope.actualizarmunicipio, $scope.actualizarnombre, $scope.actualizarcantidad);

            }, 3000);




            $scope.registro_validado = false;
            $scope.limpiardatos();

            // $('#modalsemana').modal('close');

          } else {
            if (res.data.Codigo == 1) {
              swal('Notificacion', res.data.Nombre, 'error')
            }
          }
        });


      }


      $scope.filterdepartamento = function () {
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
          url: "php/saludpublica/planvacunacioncovid.php",
          data: { function: 'lista_departamentos', responsable: $scope.responsable }
        }).then(function (response) {
          if (response) {
            swal.close()
            $scope.Departamentos = response.data;
            

           

            $scope.mostrar = 1;
          }

        });
        // $http({
        //   method: 'POST',
        //   url: "php/saludpublica/planvacunacioncovid.php",
        //   data: { function: 'lista_departamentos', responsable: $scope.responsable }
        // }).then(function (response) {
        
        //   if (response) {
        //     $scope.Departamentos_origen = response.data[0];
        //   }
        // });
      }

      function formateaValor(porcentaje_total) {
        // si no es un número devuelve el valor, o lo convierte a número con 2 decimales
        return isNaN(porcentaje_total) ? porcentaje_total : parseFloat(porcentaje_total).toFixed(2);

      }



      $scope.filterdepartamento();
      $scope.filterMunicipio = function (departamento, nombre, cantidad, pendiente) {
        $scope.actualizartotal = cantidad;
        $scope.actualizarcantidad = pendiente;



        $scope.porcentaje_total =  ($scope.actualizarcantidad / $scope.actualizartotal * 100);

        //$scope.Departamentos_origen = response.data;

        $scope.porcentaje_total = $scope.porcentaje_total.toFixed(2);
        // $scope.porcentaje_total = 20;
        
        console.log($scope.porcentaje_total);
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        
        $scope.depaprincipal = departamento;
        $scope.departamento_nombre = nombre + " (ACTIVOS - " + pendiente + ") ";
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: { function: 'cantidadxmunicipio', responsable: $scope.responsable, departamento: $scope.depaprincipal }
        }).then(function (response) {
          
          if (response) {
            swal.close()
            $scope.municipio = "";
            $scope.Municipios = response.data;
            $scope.munprincipal = "";
            $scope.mostrar = 2;
          }
        });
      }

      $scope.Estado_Solicitud_Color = function (x,y) {
        if(y == undefined){
          if (x >= 0 && x <= 35) {
            return { "color": "rgb(3, 197, 20) !important;" }
          }
          if (x >= 36 && x <= 70) {
            return { "color": "rgb(235, 156, 5)!important" }
          }
          if (x >= 71  ) {
            return { "color": "rgb(245, 75,75) !important" }
          }
        }else{
          if (x >= 0 && x <= 35) {
            return { "background-color": "rgb(3, 197, 20) !important;" }
          }
          if (x >= 36 && x <= 70) {
            return { "background-color": "rgb(235, 156, 5)!important" }
          }
          if (x >= 71  ) {
            return { "background-color": "rgb(245, 75,75) !important" }
          }
        }
      }

      $scope.colorCard = function () {
        var letters = '0123456789ABCDEF';
        var color = '';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      //CARGAR TABLA
      $scope.filtertabla = function (municipio, nombre, cantidad) {
        $scope.actualizarmunicipio = municipio;
        $scope.actualizarnombre = nombre;
        $scope.actualizarcantidad = cantidad;
        

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });

        $scope.munprincipal = municipio;
        $scope.municipio_n = nombre;
        $scope.municipio_nombre = nombre;
        
        $http({
          method: 'POST',
          url: "php/saludpublica/planvacunacioncovid.php",
          data: { function: 'tabla', responsable: $scope.responsable, municipio: $scope.munprincipal }
        }).then(function (response) {
          swal.close()
          if (response) {
            $scope.mesasayudas = response.data;
            $scope.initPaginacion($scope.mesasayudas);
            $scope.mostrar = 3;



          }
        });
      }
      $scope.initPaginacion = function (info) {
        $scope.mesasayudasTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.filter = function (val) {
        $scope.mesasayudasTemp = $filter('filter')($scope.mesasayudas, val);
        $scope.configPages();
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.mesasayudasTemp.length / $scope.pageSize);
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
      };
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.mesasayudasTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize) + 1;
        }
        // var tamanomax= $scope.mesasayudasTemp.length/$scope.pageSize;
        
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 10;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
        
      };
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.mesasayudasTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.mesasayudasTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 10;
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
  });