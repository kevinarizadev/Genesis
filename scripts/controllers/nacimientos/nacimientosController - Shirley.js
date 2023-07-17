'use strict';
angular.module('GenesisApp')
  .controller('nacimientosController', ['$scope', '$filter', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
    function ($scope, $filter, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {
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
        console.log($scope.sesdata);

        console.log($scope.filtrar);
        if ($scope.sesdata.codmunicipio.length == 1) {
          $scope.filtrar = "";
          $scope.filtrar_municipio = "";
        } else if ($scope.sesdata.codmunicipio.length == 4) {
          $scope.filtrar = $scope.sesdata.codmunicipio.substring(0, 1);
          $scope.validar_municipio = $scope.sesdata.codmunicipio.substring(1, ($scope.sesdata.codmunicipio.length));
          if ($scope.validar_municipio != '001') {
            $scope.filtrar_municipio = $scope.validar_municipio;
          }
        } else {
          $scope.filtrar = $scope.sesdata.codmunicipio.substring(0, 2);
          $scope.validar_municipio = $scope.sesdata.codmunicipio.substring(2, ($scope.sesdata.codmunicipio.length));
          if ($scope.validar_municipio != '001') {
            $scope.filtrar_municipio= $scope.validar_municipio;
          }
        }
      })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("Error obteniendo session variables");
        });
      // $scope.menu = document.getElementById('menu');
      // $scope.altura = 64;
      // angular.element($window).bind("scroll", function () {
      //   alert("hola");
      //   if (window.pageYOffset >  $scope.altura) {
      //     $scope.menu.classList.add('fixed');
      //     console.log("1");
      //   } else {
      //     $scope.menu.classList.remove('fixed');
      //     console.log("2");
      //   }
      // });


      $scope.mostrardiagnosticos = function () {
        $http({
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: {
            function: 'diagnosticos'
          }
        }).then(function (response) {
          console.log(response.data);
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
          console.log("1");
        } else {
          //  $scope.clase_contenedor=true;

          console.log("0");
        }
        //  console.log( $scope.clase_contenedor);
        $scope.$apply();
      });

      $("#myDiv").scroll(function () {
        var scroll = $("#myDiv").scrollTop();
        $("#div1>div").css({
          transform: "translateY(" + (scroll / 1) + "px)"
        });
        if (scroll < 700) {
          console.log(1);
          jQuery('#my_menu').removeClass('my_fixed');
          jQuery('#div2').removeClass('bajar');
        } else {
          console.log(0);
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
          console.log(response.data);
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

      //GRAFICAS 1 
      $scope.tendencia = function () {
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
          data: { function: 'totales_anuales', anno: $scope.ano }
        }).then(function (response) {
          swal.close();
          console.log(response);
          $scope.cargando = true;
          var total = parseInt(response.data[0].total);
          var afiliaciones = parseInt(response.data[0].afiliaciones);
          var media = parseInt(response.data[0].media);
          var cantidad_nacional = parseInt(response.data[0].cantnacional);
          var porcentajes_nacional_grafica = parseInt(response.data[0].porcentajes);
          $scope.cantidad = parseInt(response.data[0].total);
          $scope.cantidad_media = parseInt(response.data[0].media);
          $scope.cantidad_nacional = parseInt(response.data[0].cantnacional);
          $scope.cantidad_total = parseInt(response.data[0].total);
          $scope.porcentajes_nacional_grafica = parseInt(response.data[0].porcentajes);
          $scope.afiliaciones = parseInt(response.data[0].afiliaciones);


          Highcharts.chart('container', {
            // colors: ['#14B1C6', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
            // '#FF9655', '#FFF263', '#6AF9C4'],
            chart: {
              zoomType: 'xy'
            },
            // loading: {
            //   hideDuration: 1000,
            //   showDuration: 1000
            // },
            title: {
              text: 'Gestión de Nacimientos'
            },

            // subtitle: {
            //   text:  "<p><small>Poblacion LMA corte 31 de diciembre del 2018</small> </p><br/><p><small><strong>Media Nacional = </strong> 16.14</small></p> <br/><p><small><strong>Total de Afiliado = </strong>"+cantidad_nacional+"</small></p> <br/><p><small><strong>Formula = </strong> "+cantidad_nacional+" x 16.14 / 1000</small></p><br/><br/> ",
            //   x: 120,
            //   y:45,
            //   align: 'left',
            // },
            credits: {
              enabled: false
            },
            xAxis: [{
              categories: ['Afiliaciones', 'Nacimientos']
              // crosshair: true
            }],
            yAxis: [{ // Primary yAxis
              labels: {
                format: '{value}',
                style: {
                  color: Highcharts.getOptions().colors[7]
                }
              },
              title: {
                text: ' ',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              }
            }, { // Secondary yAxis
              title: {
                text: ' ',
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
            tooltip: {
              shared: true
            },
            legend: {
              itemWidth: 100,
              adjustChartSize: true,
              navigation: {
                enabled: false
              }
            },
            series: [{

              name: 'Nacimientos',
              type: 'column',
              borderColor: 'gray',
              data: [{ y: afiliaciones, color: '#1a2e63', dataLabels: { enabled: true, format: porcentajes_nacional_grafica + "%" } }, { y: total, color: '#7cb5ec' }],

            }, {
              name: 'Media',
              type: 'spline',
              data: [media, media],
              tooltip: {
                valueSuffix: ''
              }
            }],
            navigation: {
              buttonOptions: {
                symbolStroke: 'blue'
              }
            },
            lang: {
              noData: "No se encontraron Datos"
            },
            noData: {
              style: {
                fontWeight: 'bold',
                fontSize: '15px'

              }
            },
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
          });

        })
      }
      $scope.tendencia();


      $scope.tendencia2 = function (id, nombre) {
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
          url: "php/nacimientos/nacimientos.php",
          data: { function: 'graficaseccionales', anno: $scope.ano, seccional: id }
        }).then(function (response) {
          console.log(response.data);

          var total = parseInt(response.data[0].total);
          var afiliaciones = parseInt(response.data[0].afiliaciones);
          var porcentajes_secional_grafica = parseInt(response.data[0].porcentajes);
          var cantidadafi = response.data[0].cantidadafi;
          $("#" + (id * 10)).text(cantidadafi);
          var media = parseInt(response.data[0].media);
          $("#" + (id * 20)).text(media);
          $("#" + (id * 30)).text(cantidadafi);
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
              categories: ['Afiliaciones', 'Nacimientos']
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
              name: 'Nacimientos',
              type: 'column',

              data: [{ y: afiliaciones, color: '#1a2e63', dataLabels: { enabled: true, format: porcentajes_secional_grafica + "%" } }, { y: total, color: '#7cb5ec' }],
              tooltip: {
                valueSuffix: ''
              }

            }, {
              name: 'Media',
              type: 'spline',
              data: [media, media],
              tooltip: {
                valueSuffix: ''
              }
            }],
            navigation: {
              buttonOptions: {
                enabled: false
              }
            },
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
          });
        })

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
      $scope.filterdepartamento = function () {
        $http({
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: { function: 'cantidadxseccional', anno: $scope.ano }
        }).then(function (response) {
          if (response) {
            $scope.Departamentos = response.data;
            $scope.mostrar = 1;
          }

        });
        $http({
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: { function: 'cantidadxseccional_origen', anno: $scope.ano }
        }).then(function (response) {
          console.log(response);
          if (response) {
            $scope.Departamentos_origen = response.data;
          }
        });
      }
      $scope.filterdepartamento();
      $scope.filterMunicipio = function (departamento, nombre, cantidad) {
        $scope.depaprincipal = departamento;
        $scope.departamento_nombre = nombre + " (TOTAL " + cantidad + ") ";
        $http({
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: { function: 'cantidadxmunicipio', anno: $scope.ano, depa: $scope.depaprincipal }
        }).then(function (response) {
          console.log(response);
          if (response) {
            $scope.municipio = "";
            $scope.Municipios = response.data;
            $scope.munprincipal = "";
            $scope.mostrar = 2;
          }
        });
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
        $scope.munprincipal = municipio;
        $scope.municipio_n = nombre;
        $scope.municipio_nombre = nombre + ' (TOTAL ' + cantidad + " ) ";
        // console.log(selected);
        $http({
          method: 'POST',
          url: "php/nacimientos/nacimientos.php",
          data: { function: 'tabla', anno: $scope.ano, municipio: $scope.munprincipal }
        }).then(function (response) {
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
        console.log(tamanomax);
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 10;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
        console.log($scope.mesasayudas.length / $scope.pageSize - 1);
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