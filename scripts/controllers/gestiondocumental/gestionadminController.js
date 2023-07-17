'use strict';
angular.module('GenesisApp')
  .controller('gestionadminController', ['$scope', '$http', 'notification', '$timeout', 'afiliacionHttp',
    function ($scope, $http, notification, $timeout, afiliacionHttp,) {
      $(document).ready(function () {
        console.clear();
        $scope.actualizar = true;
        $("#dteFechaAPE").kendoDatePicker({
          format: "dd/MM/yyyy",
          culture: "es-MX",
        });
        $("#dteFechaVEN").kendoDatePicker({
          format: "dd/MM/yyyy",
          culture: "es-MX",

        });
        document.getElementById('dteFechaAPE').readOnly = true;
        // $timeout(function () {
        // }, 500);//END TIMEOUT
        //
        $scope.Actualizar_Numeros();

        $scope.inicio();
        // $scope.codmuni = 1;
        $scope.cam = true;
        $scope.hojauno = true;
        $scope.hojados = false;
        $scope.actualizar = false;
        $('input.currency').currencyInput();
        $scope.selectViap = "0";
        $scope.numeroN = '';
        $scope.selectLetra = "0";
        $scope.selectnumero = '';
        $scope.bis = '';
        $scope.selectcuadrante = "0";
        $scope.numeroNVG = '';
        $scope.selectLetraVG = "0";
        $scope.numeroplaca = '';
        $scope.selectcuadranteVG = "0";
        $scope.complemento = '';
        $scope.dire = '';
        $scope.bistext = '';
        $scope.newdir = '';
        $scope.tablacantidad = true;
        $scope.activames = true;
        $scope.archivosanio = "";
        $scope.archivosanio = null;
        //
        $scope.iconacas = true;

        const arrendador = document.getElementById('arrendador');
        arrendador.onpaste = function (e) {
          e.preventDefault();
        }
        const nit = document.getElementById('nit');
        nit.onpaste = function (e) {
          e.preventDefault();
        }
        const incrementoNumber = document.getElementById('incrementoNumber');
        incrementoNumber.onpaste = function (e) {
          e.preventDefault();
        }

        $scope.blockeds = [{ user: 'elkin.guerra' }];
        $scope.blockusers = false;
      });//READY

      ////////////FORMATO PESO////////////////
      (function ($) {
        $.fn.currencyInput = function () {
          this.each(function () {
            var wrapper = $("<div class='currency-input' />");
            $(this).wrap(wrapper);
            $(this).before("<span class='currency-symbol'>$</span>");
          });
        };
      })(jQuery);
      ////////////////////////////////////////////////////
      /////////////FORMATO TELEFONO/////////////////////////
      const isNumericInput = (event) => {
        const key = event.keyCode;
        return ((key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105)
        );
      };

      const isModifierKey = (event) => {
        const key = event.keyCode;
        return (event.shiftKey === true || key === 35 || key === 36) ||
          (key === 8 || key === 9 || key === 13 || key === 46) ||
          (key > 36 && key < 41) ||
          (
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
          )
      };
      const enforceFormat = (event) => {
        if (!isNumericInput(event) && !isModifierKey(event)) {
          event.preventDefault();
        }
      };
      const formatToPhone = (event) => {
        if (isModifierKey(event)) { return; }
        const target = event.target;
        const input = event.target.value.replace(/\D/g, '').substring(0, 10);
        const zip = input.substring(0, 3);
        const middle = input.substring(3, 6);
        const last = input.substring(6, 10);

        if (input.length > 6) { target.value = `(${zip}) ${middle} - ${last}`; }
        else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
        else if (input.length > 0) { target.value = `(${zip}`; }
      };

      const inputElement = document.getElementById('phoneNumber');
      inputElement.addEventListener('keydown', enforceFormat);
      inputElement.addEventListener('keyup', formatToPhone);

      $scope.format = function () {
        $scope.reajustecanon();
        const input = document.getElementById('valorNumber');
        var num = input.value.replace(/\./g, '');
        if (!isNaN(num)) {
          num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num = num.split('').reverse().join('').replace(/^[\.]/, '');
          input.value = num;
        }
        else {
          input.value = input.value.replace(/[^\d\.]*/g, '');
        }
      }

      $scope.reajustecanon = function () {
        const inputval = document.getElementById('valorNumber');
        const inputinc = document.getElementById('incrementoNumber');
        var valor = parseFloat(inputval.value.replace(/\./g, ''));
        var incre = parseFloat(inputinc.value);
        var z = ((valor * incre) / 100) + valor;
        // $scope.canon = multi.toFixed(1);
        $scope.canon = z.toFixed(0);
        var num = $scope.canon;
        if (!isNaN(num)) {
          num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
          num = num.split('').reverse().join('').replace(/^[\.]/, '');
          $scope.canon = num;
        }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.salir = function () {
        $('#modal1').modal('close');
      }
      $scope.salir2 = function () {
        $('#modal2').modal('close');
      }
      $scope.salir3 = function () {
        $('#modal3').modal('close');
      }
      $scope.salir_venc = function () {
        $('#modal_venc').modal('close');
      }
      $scope.modaldir = function () {
        (function () {
          $('#modal1').modal();
        }());
        $('#modal1').modal('open');
      }
      $scope.modaladj = function () {
        (function () {
          $('#modal2').modal();
        }());
        $('#modal2').modal('open');
      }
      $scope.modalhistoricoadj = function () {
        (function () {
          $('#modal3').modal();
        }());
        $('#modal3').modal('open');
      }
      $scope.modalhistoricovenc = function () {
        (function () {
          $('#modal_venc').modal();
        }());
        $('#modal_venc').modal('open');
      }
      afiliacionHttp.obtenerViaPrincipal().then(function (response) {
        $scope.viaprincipal = response;
      })
      afiliacionHttp.obtenerLetra().then(function (response) {
        $scope.letras = response;
      })
      afiliacionHttp.obtenerCuadrante().then(function (response) {
        $scope.Cuadrantes = response;
      })

      $scope.changebis = function () {
        if ($scope.bis == true) {
          $scope.bistext = "BIS";
        } else {
          $scope.bistext = "";
        }
      }

      $scope.cargardir = function () {
        $scope.direccion = $("#direccionmodal").val().trim();
        $scope.salir();
      }
      /////////////////////////////////ADJUNTOS///////////////////////////////////////
      $scope.Mostraradjuntos = function (num) {
        $("#adjuntocont")[0].value = "";
        $scope.contrato = "";
        $("#adjuntoinfo")[0].value = "";
        $scope.infografia = "";
        $scope.Array_Adjuntos_Infografia_Cant = 0;
        $scope.Array_Adjuntos_Contrato = null;
        $scope.Array_Adjuntos_Contrato = {
          Sel_Anio: 'xx',
          Sel_Anio_dsb: true,
          Sel_Mes: 'xx',
          Sel_Mes_dsb: true,
          Array_Anio: [],
          Array_Mes: [],
          Array_Dia: []
        };
        $scope.Array_Adjuntos_Infografia = null;
        $scope.Array_Adjuntos_Infografia = {
          Sel_Anio: 'xx',
          Sel_Anio_dsb: true,
          Sel_Mes: 'xx',
          Sel_Mes_dsb: true,
          Array_Anio: [],
          Array_Mes: [],
          Array_Dia: []
        };
        $timeout(
          function () {
            $scope.$apply();
          }, 100);
        $scope.veralbum = false;
        if (num == 1) {
          $scope.modaladj();
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'ObtenerAdjuntosAnio',
              seccional: $scope.id,
              con: $scope.con
            }
          }).then(function (response) {
            var data = response.data;
            var cod = data[0];
            $scope.verinfocon = false;
            switch (cod) {
              case "0":
                swal({
                  title: '¡No existen registros aún!',
                  type: 'info',
                  timer: 1000,
                  showConfirmButton: false
                }).catch(swal.noop);
                break;
              default:
                $scope.verinfocon = true;
                angular.forEach(response.data, function (i) {
                  if (i.TIPO == '1') {
                    $scope.Array_Adjuntos_Contrato.Array_Anio.push(i);
                  } else {
                    $scope.Array_Adjuntos_Infografia.Array_Anio.push(i);
                  }
                });

                if ($scope.Array_Adjuntos_Contrato.Array_Anio.length > 0) {
                  $scope.Array_Adjuntos_Contrato.Sel_Anio_dsb = false;
                }
                if ($scope.Array_Adjuntos_Infografia.Array_Anio.length > 0) {
                  $scope.Array_Adjuntos_Infografia.Sel_Anio_dsb = false;
                }
                break;
            }
          });
        } else {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'ObtenerAdjuntosAnio',
              seccional: $scope.id,
              con: $scope.con
            }
          }).then(function (response) {
            var data = response.data;
            var cod = data[0];
            $scope.verinfocon = false;
            switch (cod) {
              case "0":
                swal({
                  title: '¡No existen registros aún!',
                  type: 'info',
                  timer: 1000,
                  showConfirmButton: false
                }).catch(swal.noop);
                break;
              default:
                $scope.verinfocon = true;
                // $scope.archivosanio = response.data;
                angular.forEach(response.data, function (i) {
                  if (i.TIPO == '1') {
                    $scope.Array_Adjuntos_Contrato.Array_Anio.push(i);
                  } else {
                    $scope.Array_Adjuntos_Infografia.Array_Anio.push(i);
                  }
                });

                if ($scope.Array_Adjuntos_Contrato.Array_Anio.length > 0) {
                  $scope.Array_Adjuntos_Contrato.Sel_Anio_dsb = false;
                }
                if ($scope.Array_Adjuntos_Infografia.Array_Anio.length > 0) {
                  $scope.Array_Adjuntos_Infografia.Sel_Anio_dsb = false;
                }
                break;
            }
          });
        }
        // $scope.selcontanio=2019;
        // $scope.traeradjuntosmeses(1);
      }
      //////////////////////
      $scope.traeradjuntosmeses = function (tipo) {
        var anio = (tipo == 1) ? $scope.Array_Adjuntos_Contrato.Sel_Anio : $scope.Array_Adjuntos_Infografia.Sel_Anio;
        if (!isNaN(anio) && anio != null) {
          if (tipo == 1) {
            $scope.Array_Adjuntos_Contrato.Sel_Mes = 'xx';
          } else {
            $scope.Array_Adjuntos_Infografia.Sel_Mes = 'xx';
          }
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'ObtenerAdjuntosMes',
              seccional: $scope.id,
              con: $scope.con,
              anio: anio,
              tipo: tipo
            }
          }).then(function (response) {
            if (tipo == 1) {
              $scope.Array_Adjuntos_Contrato.Sel_Mes = "xx";
              $scope.Array_Adjuntos_Contrato.Sel_Mes_dsb = false;
              $scope.Array_Adjuntos_Contrato.Array_Mes = response.data;
            } else {
              $scope.Array_Adjuntos_Infografia.Sel_Mes = "xx";
              $scope.Array_Adjuntos_Infografia.Sel_Mes_dsb = false;
              $scope.Array_Adjuntos_Infografia.Array_Mes = response.data;
            }
          });
        }

      }
      //////////////
      $scope.traeradjuntosdia = function (tipo) {
        var anio = (tipo == 1) ? $scope.Array_Adjuntos_Contrato.Sel_Anio : $scope.Array_Adjuntos_Infografia.Sel_Anio;
        var mes = (tipo == 1) ? $scope.Array_Adjuntos_Contrato.Sel_Mes : $scope.Array_Adjuntos_Infografia.Sel_Mes;
        if (!isNaN(anio) && anio != null && !isNaN(anio) && mes) {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'ObtenerAdjuntosDia',
              seccional: $scope.id,
              con: $scope.con,
              anio: anio,
              tipo: tipo,
              mes: mes
            }
          }).then(function (response) {
            if (response) {
              if (tipo == 1) {
                if (response.data[0] == "0") {
                  $scope.Array_Adjuntos_Contrato.Array_Dia = null;
                } else {
                  $scope.Array_Adjuntos_Contrato.Array_Dia = response.data;
                }
              } else {
                $timeout(function () {
                  if (response.data[0] == "0") {
                    $scope.Array_Adjuntos_Infografia.Array_Dia = null;
                  } else {
                    $scope.Array_Adjuntos_Infografia.Array_Dia = response.data;
                    if ($('#carousel-0').hasClass('carousel-img-noDisplay') == true) {
                      $('#carousel-0').removeClass('carousel-img-noDisplay');
                      $('#carousel-0').addClass('carousel-img-displayed');
                    }
                    $scope.imagenes = [];
                    var x; var s = 0;
                    //


                    for (var i = 0; i < $scope.Array_Adjuntos_Infografia.Array_Dia.length; i++) {
                      x = $scope.Array_Adjuntos_Infografia.Array_Dia[i].URL;
                      $http({
                        method: 'POST',
                        url: "php/gestiondocumental/gestionadmin.php",
                        data: {
                          function: 'descargaAdjunto',
                          ruta: x
                        }
                      }).then(function (response) {
                        if (s == 0) {
                          $scope.primeraimagen = "temp/" + response.data;
                          s = s + 1;
                        } else {
                          $scope.imagenes.push("temp/" + response.data);
                        }
                      });
                      if (i == $scope.Array_Adjuntos_Infografia.Array_Dia.length - 1) {
                        $scope.veralbum = true;
                        (function () {
                          $('#modal4').modal();
                        }());
                        $('#modal4').modal('open');
                        setTimeout(function () {
                          $scope.slideWidth = $('#modal4')[0].offsetHeight;
                          $('#modal4_dentro').css({ 'max-height': $scope.slideWidth + 'px' });
                        }, 500);
                      }
                    }


                  }
                }, 3000);//END TIMEOUT
              }
            }
          });
        }
      }


      $scope.album = function () {
        (function () {
          $('#modal4').modal();
        }());
        $('#modal4').modal('open');
      }
      const body = document.querySelector('body');
      document.getElementById('carousel-arrow-next').addEventListener('click', carouselSwipe, false);
      document.getElementById('carousel-arrow-prev').addEventListener('click', carouselSwipe, false);

      body.onkeydown = function (e) {
        if (e.keyCode === 39) {
          $scope.flecha = "r";
          carouselSwipe();
        }
        if (e.keyCode === 37) {
          $scope.flecha = "l";
          carouselSwipe();
        }
      }

      /**
       * Switch header carousel to next image (swipe right)
       */
      function carouselSwipe() {
        // console.log(this);
        // Récupère les numéros de l'ancienne et la nouvelle image
        if ($('.carousel-img-displayed')[0] != undefined) {
          var currentImg = document.getElementsByClassName('carousel-img-displayed')[0].id.substring(9);
          var newImg = parseInt(currentImg);
          // Gestion du début et de la fin de la liste d'images
          if (this != undefined) {
            if (this.id == 'carousel-arrow-next') {
              newImg++;
              if (newImg >= document.getElementsByClassName('carousel-img').length) {
                newImg = 0;
              }
            } else if (this.id == 'carousel-arrow-prev') {
              newImg--;
              if (newImg < 0) {
                newImg = document.getElementsByClassName('carousel-img').length - 1;
              }
            }
          } else {

            if ($('#carousel-arrow-next')[0].id == 'carousel-arrow-next' && $scope.flecha == 'r') {
              newImg++;
              if (newImg >= document.getElementsByClassName('carousel-img').length) {
                newImg = 0;
              }
            }
            if ($('#carousel-arrow-prev')[0].id == 'carousel-arrow-prev' && $scope.flecha == 'l') {
              newImg--;

              if (newImg < 0) {
                newImg = document.getElementsByClassName('carousel-img').length - 1;
              }
            }

          }

          // Disparition progressive de l'ancienne image
          document.getElementById('carousel-' + currentImg).className = 'carousel-img carousel-img-hidden';

          // Apparition progressive de la nouvelle image
          var displayedCarousel = document.getElementById('carousel-' + newImg);
          displayedCarousel.className = 'carousel-img carousel-img-hidden';

          setTimeout(function () {
            document.getElementById('carousel-' + currentImg).className = 'carousel-img carousel-img-noDisplay';
          }, 20);
          setTimeout(function () {
            displayedCarousel.className = 'carousel-img carousel-img-displayed';
          }, 100);

          // Disparition totale de l'ancienne image

        }
      }


      $scope.angel = 0;
      $scope.id_respaldo = '';
      $scope.RotarDer = function () {
        $('.carousel-img-displayed').removeClass('rotate90');
        $('.carousel-img-displayed').removeClass('rotate180');
        $('.carousel-img-displayed').removeClass('rotate270');
        var id = $('.carousel-img-displayed')[0].id;
        if (id != $scope.id_respaldo) {
          $scope.angel = 0;
        }
        $scope.angel = ($scope.angel + 90) % 360;
        $('#' + id).addClass('rotate' + $scope.angel);
        $('.carousel-img-displayed').removeClass('rotate0');
        $scope.id_respaldo = id;
      }
      ///////////////////////////////////////////////////////////////////////////////////
      /////////////////////////////////HISTORICO ADJUNTOS///////////////////////////////////////
      $scope.Mostrarhistorial_detalle = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'ObtenerHistorico_Detalle',
            seccional: $scope.id,
            con: $scope.con
          }
        }).then(function (response) {
          $scope.historialseccional = response.data;
          var data = response.data;
          var cod = data[0];
          switch (cod) {
            case "0":
              swal({
                title: '¡No existen registros aún!',
                type: 'info',
                timer: 1000,
                showConfirmButton: false
              }).catch(swal.noop);
              break;
            default:
              var ws = XLSX.utils.json_to_sheet(data);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
              /* write workbook and force a download */
              XLSX.writeFile(wb, "Exportado Historico Detalle.xlsx");
              // $scope.llenarexcel_detalle();
              // JSONToCSVConvertor($scope.arrayexcel_detalle, $scope.oficina, true, 1);
              break;
          }

        });
      }
      //
      $scope.Mostrarhistorial_implementos = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'ObtenerHistorico_Implementos',
            seccional: $scope.id,
            con: $scope.con
          }
        }).then(function (response) {
          $scope.historialseccional = response.data;
          var data = response.data;
          var cod = data[0];
          switch (cod) {
            case "0":
              swal({
                title: '¡No existen registros aún!',
                type: 'info',
                timer: 1000,
                showConfirmButton: false
              }).catch(swal.noop);
              break;
            default:
              var ws = XLSX.utils.json_to_sheet(data);
              /* add to workbook */
              var wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
              /* write workbook and force a download */
              XLSX.writeFile(wb, "Exportado Historico Implementos.xlsx");

              // $scope.llenarexcel_implementos();
              // JSONToCSVConvertor($scope.arrayexcel_implementos, $scope.oficina, true, 2);
              break;
          }

        });
      }
      /* //////////////////////////////CARGAR AMBOS DATATABLES//////////////////////////////// */
      $scope.inicio = function () {
        if ($scope.actualizar == false) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          }).catch(swal.noop);
        } else {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          }).catch(swal.noop);
        }
        if ($scope.actualizar == true) {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: { function: 'obtenercodigo' }
          }).then(function (response) {
            $scope.codmuni = response.data;
            if ($scope.codmuni == 1) {
              $scope.mostrarmunipios = '';
            }
            if ($scope.codmuni.substr(0, 2) == 80 || $scope.codmuni.substr(0, 1) == 8) {
              $scope.mostrarmunipios = '8';
            }
            if ($scope.codmuni.substr(0, 2) != 80 && $scope.codmuni.substr(0, 1) != 8 && $scope.codmuni != 1) {
              $scope.mostrarmunipios = $scope.codmuni.substr(0, 2);
            }
            // });
            $http({
              method: 'POST',
              url: "php/gestiondocumental/gestionadmin.php",
              data: { function: 'obtenerusu' }
            }).then(function (response) {
              var x = response.data;
              for (var k = 0; k < $scope.blockeds.length; k++) {
                if ($scope.blockeds[k].user == x) {
                  $scope.blockusers = true;
                }
                if (x == 'jorge.almario') {
                  $scope.codmuni = 0;
                }
              }
            });


            $http({
              method: 'POST',
              url: "php/gestiondocumental/gestionadmin.php",
              data: {
                function: 'obtenerseccionales',
                codigo: $scope.mostrarmunipios
              }
            }).then(function (response) {
              //$scope.seccionales = response.data;
              var array = response.data;
              var array2 = null;
              array = response.data.filter(function (e) {
                return e.NOM_SEC != 'NACIONAL'
              });
              array2 = response.data.filter(function (e) {
                return e.NOM_SEC == 'NACIONAL'
              });
              $scope.seccionales = array.concat(array2);
              console.log($scope.seccionales);
              setTimeout(function () {

                /* ///////////////////////1 DATATABLE//////////////////////////// */
                $scope.table = $('#tabla').DataTable({
                  dom: 'lBsfrtip',
                  select: true,
                  buttons: [
                    {
                      extend: 'excelHtml5',
                      messageTop: 'Inventario de implementos de oficina de cada municipio',
                      exportOptions: {
                        rows: ':visible',
                        columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]
                      },
                    }],
                  "scrollX": true,
                  //"order": [[2, "asc"]],
                  // "columnDefs": [
                  //   {
                  //     "targets": [1],
                  //     "visible": false
                  //   }
                  // ],
                  "footerCallback": function (row, data, start, end, display) {
                    var api = this.api();
                    var j = 4;
                    while (j < 38) {
                      var pageTotal = api
                        .column(j, { page: 'current' })
                        .data()
                        .reduce(function (a, b) {
                          return Number(a) + Number(b);
                        }, 0);
                      // Update footer
                      $(api.column(j).footer()).html(pageTotal);
                      j++;
                    }
                  },
                  language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                  },
                  lengthMenu: [[10, 20, -1], [10, 20, 'Todas']],
                  pagingType: "numbers",
                });
                if ($scope.actualizar == true) {
                  $scope.hojauno = true;
                }
                /* ///////////////////////2 DATATABLE//////////////////////////// */
                $scope.table2 = $('#tabla2').DataTable({
                  // dom: 'lBsfrtip',
                  // select: true,
                  // buttons: [
                  //   {
                  //     extend: 'excelHtml5',
                  //     messageTop: 'Inventario de implementos de oficina de cada municipio',
                  //     exportOptions: {
                  //       rows: ':visible',
                  //       columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
                  //     },
                  //   }],
                  "scrollX": true,
                  //"order": [[2, "asc"]],
                  // "columnDefs": [
                  //   {
                  //     "targets": [1],
                  //     "visible": false
                  //   }
                  // ],
                  language: {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                  },
                  lengthMenu: [[10, 20, -1], [10, 20, 'Todas']],
                  pagingType: "numbers",
                });
                $scope.Validar_Vencimientos_Oficinas();
              }, 1000);
              // $scope.hoja1estados = true;
              setTimeout(() => {
                swal.close();
                // $scope.hoja1estados = true;
              }, 2500);
            })
          })
        }
      }

      /* //////////////////////////////////////////////////////////////////////////////// */
      $scope.ObtenerExcel_Seccionales = function () {
        $scope.llenarexcel_seccionales();
        var f1 = new Date();
        // console.log(f1.getDate() + "/" + f1.get() + 1 + "/" + f1.getFullYear());
        // JSONToCSVConvertor_Seccionales($scope.arrayexcel_seccionales, f1.getDate() + "/" + f1.getMonth() + 1 + "/" + f1.getFullYear(), true);
        JSONToCSVConvertor_Seccionales($scope.arrayexcel_seccionales, f1.toLocaleDateString(), true);

      }
      /* ////////////////////////AL CAMBIAR ESTADO A NO DISPONIBLE ASIGNE 0////////////////////////////// */
      $scope.Cambiar_Estado = function (SCOPE, TIPO) {
        if (TIPO == 'N') {
          $scope[SCOPE] = 0;
        } else {
          $scope[SCOPE] = 1;
        }
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      /* /////////////////////////////////GUARDAR JSON STRING ////////////////////////////////////// */
      $scope.llenarjson_detalle = function () {
        $scope.json_detalle = JSON.stringify([{
          'DIR': $scope.direccion,
          'ARRENDA': $scope.arrendador,
          'NIT': $scope.nit,
          'FEC_APE': $scope.apertura,
          'DURA': $scope.duracion,
          'VENC': $scope.vencimiento,
          'NOTIF': $scope.notif,
          'VALOR': $scope.valor,
          'INCRE': $scope.incremento,
          'CANON': $scope.canon,
          'ENER': $scope.energia,
          'AAA': $scope.acuealca,
          'TELEF': $scope.telef,
          'CONTRA': $scope.contrato,
          'INFOG': $scope.infografia,
          'CANT_USU': $scope.cantidadusu,
          'CONTAC': $scope.contacto,
          'MOBILIARIO': $scope.estadomobi,
          'ARRIENDO': $scope.estadoarriendo
        }]);
      }

      $scope.llenarjson_implementos = function () {
        $scope.json_implementos = JSON.stringify([{
          'CPUESTO': $scope.cpuesto,
          'EPUESTO': $scope.epuesto,
          'CCAUNTER': $scope.ccaunter,
          'ECAUNTER': $scope.ecaunter,
          'CSILLAE': $scope.csillae,
          'ESILLAE': $scope.esillae,
          'CARCHIVADORP': $scope.carchivadorp,
          'EARCHIVADORP': $scope.earchivadorp,
          'CARCHIVADORR': $scope.carchivadorr,
          'EARCHIVADORR': $scope.earchivadorr,
          'CSILLAI': $scope.csillai,
          'ESILLAI': $scope.esillai,
          'CMESA': $scope.cmesa,
          'EMESA': $scope.emesa,
          'CTANDEM': $scope.ctandem,
          'ETANDEM': $scope.etandem,
          'CVENTILADOR': $scope.cventilador,
          'EVENTILADOR': $scope.eventilador,
          'CAIRE': $scope.caire,
          'EAIRE': $scope.eaire,
          'CCOMPUTADOR': $scope.ccomputador,
          'ECOMPUTADOR': $scope.ecomputador,
          'CIMPRESORA': $scope.cimpresora,
          'EIMPRESORA': $scope.eimpresora,
          'CCELULAR': $scope.ccelular,
          'ECELULAR': $scope.ecelular,
          'CTELEFONO': $scope.ctelefono,
          'ETELEFONO': $scope.etelefono,
          'CMODEM': $scope.cmodem,
          'EMODEM': $scope.emodem,
          'CCARTELERA': $scope.ccartelera,
          'ECARTELERA': $scope.ecartelera,
          'CBUZON': $scope.cbuzon,
          'EBUZON': $scope.ebuzon,
          'CBOTIQUIN': $scope.cbotiquin,
          'EBOTIQUIN': $scope.ebotiquin,
          'CCAMILLA': $scope.ccamilla,
          'ECAMILLA': $scope.ecamilla,
          'CEXTINTOR': $scope.cextintor,
          'EEXTINTOR': $scope.eextintor,
          'CAVISOC': $scope.cavisoc,
          'EAVISOC': $scope.eavisoc,
          'CAVISOF': $scope.cavisof,
          'EAVISOF': $scope.eavisof,
          'CSENALIZACION': $scope.csenalizacion,
          'ESENALIZACION': $scope.esenalizacion,
          'CFORMATO': $scope.cformato,
          'EFORMATO': $scope.eformato,
          'CAVISOA': $scope.cavisoa,
          'EAVISOA': $scope.eavisoa,
          'CTELEVISOR': $scope.ctelevisor,
          'ETELEVISOR': $scope.etelevisor,
          'CDISPENSADOR': $scope.cdispensador,
          'EDISPENSADOR': $scope.edispensador,
          'CAVISOS': $scope.cavisos,
          'EAVISOS': $scope.eavisos,
          'CMARCACION': $scope.cmarcacion,
          'EMARCACION': $scope.emarcacion,
          'CMISION': $scope.cmision,
          'EMISION': $scope.emision,
          'CREGLAMENTO': $scope.creglamento,
          'EREGLAMENTO': $scope.ereglamento,
          'CBANIO': $scope.cbanio,
          'EBANIO': $scope.ebanio,
          'CRAMPA': $scope.crampa,
          'ERAMPA': $scope.erampa,
          'CESTANTE': $scope.cestante,
          'EESTANTE': $scope.eestante,
          'CSENATICA': $scope.csenatica,
          'ESENATICA': $scope.esenatica
        }]);
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      /* /////////////////////////////////GUARDAR JSON EXCEL ////////////////////////////////////// */
      function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, pantalla) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = ',' + '\r\n\n';
        if (ShowLabel) {
          var row = "";
          for (var index in arrData[0]) {
            row += index + ',';
          }
          row = row.slice(0, -1);
          CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
          var row = "";
          for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
          }
          row.slice(0, row.length - 1);
          CSV += row + '\r\n';
        }
        if (CSV == '') {
          return;
        }
        if (pantalla == 1) {
          var fileName = "Historial de cambios de informacion de la oficina ";
        } else {
          var fileName = "Historial de cambios de implementos de la oficina ";
        }
        // var fileName = "Historial de cambios de implementos de oficina del municipio ";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      $scope.llenarexcel_detalle = function () {
        $scope.arrayexcel_detalle = [];
        var i;
        for (var i = 0; i < $scope.historialseccional.length; i++) {
          $scope.arrayexcel_detalle.push({
            'Fecha': $scope.historialseccional[i].FECHA,
            'Persona que realizo el ultimo cambio': $scope.historialseccional[i].RESPONSABLE,
            'Dirección': $scope.historialseccional[i].DIRECCION,
            'Arrendador': $scope.historialseccional[i].ARRENDADOR,
            'Nit': $scope.historialseccional[i].NIT,
            'Fecha de apertura': $scope.historialseccional[i].FECHA_APERTURA,
            'Duración (Meses)': $scope.historialseccional[i].DURACION,
            'Próximo vencimiento': $scope.historialseccional[i].VENCIMIENTO,
            'Tiempo de notificación': $scope.historialseccional[i].NOTIF,
            'Valor': $scope.historialseccional[i].VALOR,
            'Incremento': $scope.historialseccional[i].INCREMENTO,
            'Reajuste Canon': $scope.historialseccional[i].CANON,
            'Energia electrica': $scope.historialseccional[i].ENERGIA,
            'Acueducto y alcantarillado': $scope.historialseccional[i].AAA,
            'Servicio telefonía': $scope.historialseccional[i].TELEF,
            'Cantidad de usuario': $scope.historialseccional[i].CANT_USUARIO,
            'Contacto agente educativo': $scope.historialseccional[i].CONTACTO_AGENTE,
            'Estado del inmobiliario': $scope.historialseccional[i].ESTMOB,
            'Estado del arriendo': $scope.historialseccional[i].ESTARR,
          });
        }
      }
      /////////////////////
      $scope.llenarexcel_implementos = function () {
        $scope.arrayexcel_implementos = [];
        var i;
        for (var i = 0; i < $scope.historialseccional.length; i++) {
          $scope.arrayexcel_implementos.push({
            'Fecha': $scope.historialseccional[i].FECHA,
            'Persona que realizo el ultimo cambio': $scope.historialseccional[i].RESPONSABLE,
            'Puesto de trabajo': $scope.historialseccional[i].CPUESTO + ' ' + $scope.estado($scope.historialseccional[i].EPUESTO),
            'Counter linea de frente': $scope.historialseccional[i].CCAUNTER + ' ' + $scope.estado($scope.historialseccional[i].ECAUNTER),
            'Silla secretaria': $scope.historialseccional[i].CSILLAE + ' ' + $scope.estado($scope.historialseccional[i].ESILLAE),
            'Archivador de piso': $scope.historialseccional[i].CARCHIVADORP + ' ' + $scope.estado($scope.historialseccional[i].EARCHIVADORP),
            'Archivador de pared': $scope.historialseccional[i].CARCHIVADORR + ' ' + $scope.estado($scope.historialseccional[i].EARCHIVADORR),
            'Silla interlocutora': $scope.historialseccional[i].CSILLAI + ' ' + $scope.estado($scope.historialseccional[i].ESILLAI),
            'Mesa': $scope.historialseccional[i].CMESA + ' ' + $scope.estado($scope.historialseccional[i].EMESA),
            'Tándem': $scope.historialseccional[i].CTANDEM + ' ' + $scope.estado($scope.historialseccional[i].ETANDEM),
            'Ventilador': $scope.historialseccional[i].CVENTILADOR + ' ' + $scope.estado($scope.historialseccional[i].EVENTILADOR),
            'Aire acondicionado': $scope.historialseccional[i].CAIRE + ' ' + $scope.estado($scope.historialseccional[i].EAIRE),
            'Computador': $scope.historialseccional[i].CCOMPUTADOR + ' ' + $scope.estado($scope.historialseccional[i].ECOMPUTADOR),
            'Impresora': $scope.historialseccional[i].CIMPRESORA + ' ' + $scope.estado($scope.historialseccional[i].EIMPRESORA),
            'Celular red': $scope.historialseccional[i].CCELULAR + ' ' + $scope.estado($scope.historialseccional[i].ECELULAR),
            'Teléfono fijo': $scope.historialseccional[i].CTELEFONO + ' ' + $scope.estado($scope.historialseccional[i].CTELEFONO),
            'Modem/Internet': $scope.historialseccional[i].CMODEM + ' ' + $scope.estado($scope.historialseccional[i].EMODEM),
            'Cartelera informativa': $scope.historialseccional[i].CCARTELERA + ' ' + $scope.estado($scope.historialseccional[i].ECARTELERA),
            'Buzón de sugerencia': $scope.historialseccional[i].CBUZON + ' ' + $scope.estado($scope.historialseccional[i].EBUZON),
            'Botiquín': $scope.historialseccional[i].CBOTIQUIN + ' ' + $scope.estado($scope.historialseccional[i].EBOTIQUIN),
            'Camilla': $scope.historialseccional[i].CCAMILLA + ' ' + $scope.estado($scope.historialseccional[i].ECAMILLA),
            'Extintor': $scope.historialseccional[i].CEXTINTOR + ' ' + $scope.estado($scope.historialseccional[i].EEXTINTOR),
            'Aviso copagos': $scope.historialseccional[i].CAVISOC + ' ' + $scope.estado($scope.historialseccional[i].EAVISOC),
            'Aviso fachada': $scope.historialseccional[i].CAVISOF + ' ' + $scope.estado($scope.historialseccional[i].EAVISOF),
            'Señalización SST': $scope.historialseccional[i].CSENALIZACION + ' ' + $scope.estado($scope.historialseccional[i].ESENALIZACION),
            'Formato de negación': $scope.historialseccional[i].CFORMATO + ' ' + $scope.estado($scope.historialseccional[i].EFORMATO),
            'Aviso # de atención y preferencial': $scope.historialseccional[i].CAVISOA + ' ' + $scope.estado($scope.historialseccional[i].EAVISOA),
            'Televisor': $scope.historialseccional[i].CTELEVISOR + ' ' + $scope.estado($scope.historialseccional[i].CTELEVISOR),
            'Dispensador de agua': $scope.historialseccional[i].CDISPENSADOR + ' ' + $scope.estado($scope.historialseccional[i].EDISPENSADOR),
            'Aviso silla preferencial': $scope.historialseccional[i].CAVISOS + ' ' + $scope.estado($scope.historialseccional[i].EAVISOS),
            'Marcación silla preferencial': $scope.historialseccional[i].CMARCACION + ' ' + $scope.estado($scope.historialseccional[i].EMARCACION),
            'Misión y visión': $scope.historialseccional[i].CMISION + ' ' + $scope.estado($scope.historialseccional[i].EMISION),
            'Reglamento interno e higiene': $scope.historialseccional[i].CREGLAMENTO + ' ' + $scope.estado($scope.historialseccional[i].EREGLAMENTO),
            'Baño persona en situación de discapacidad': $scope.historialseccional[i].CBANIO + ' ' + $scope.estado($scope.historialseccional[i].EBANIO),
            'Rampa de acceso': $scope.historialseccional[i].CRAMPA + ' ' + $scope.estado($scope.historialseccional[i].ERAMPA),
            'Estante metálico': $scope.historialseccional[i].CESTANTE + ' ' + $scope.estado($scope.historialseccional[i].EESTANTE),
            'Señaleticas Sistema Brailer': $scope.historialseccional[i].CSENATICA + ' ' + $scope.estado($scope.historialseccional[i].ESENATICA)
          });
        }
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      function JSONToCSVConvertor_Seccionales(JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = ',' + '\r\n\n';
        if (ShowLabel) {
          var row = "";
          for (var index in arrData[0]) {
            row += index + ',';
          }
          row = row.slice(0, -1);
          CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
          var row = "";
          for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
          }
          row.slice(0, row.length - 1);
          CSV += row + '\r\n';
        }
        if (CSV == '') {
          return;
        }
        var fileName = "Estado de las oficinas en todos los municipios actualmente - ";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      $scope.llenarexcel_seccionales = function () {
        $scope.arrayexcel_seccionales = [];
        var i;
        for (var i = 0; i < $scope.seccionales.length; i++) {
          $scope.arrayexcel_seccionales.push({
            'Seccional': $scope.seccionales[i].NOM_SEC,
            'Municipio': $scope.seccionales[i].NOM_MUN,
            'Oficina': $scope.seccionales[i].OFICINA,

            'Direccion': ($scope.seccionales[i].DIR == 0) ? 'VACIO' : $scope.seccionales[i].DIR,
            'Arrendador': ($scope.seccionales[i].ARRENDA == null) ? 'VACIO' : $scope.seccionales[i].ARRENDA,
            'NIT': $scope.seccionales[i].NIT,
            'Fecha de apertura': $scope.seccionales[i].FEC_APE,
            'Duracion (Meses)': $scope.seccionales[i].DURA,
            'Proximo vencimiento': $scope.seccionales[i].VENC,
            'Tiempo de notificacion': $scope.seccionales[i].NOTIF,
            'Valor': $scope.seccionales[i].VALOR,
            'Incremento': $scope.seccionales[i].INCRE,
            'Reajuste canon': $scope.seccionales[i].CANON,
            'Energia Electrica': $scope.seccionales[i].ENER,
            'Acueducto y alcantarillado': $scope.seccionales[i].AAA,
            'Servicio telefonia': $scope.seccionales[i].TELEF,
            'Cantidad de usuarios': $scope.seccionales[i].CANT_USU,
            'Contacto agente educativo': $scope.seccionales[i].CONTAC,
            'Estado del inmobiliario': $scope.seccionales[i].MOBIL,
            'Estado del contrato': $scope.seccionales[i].ARRIENDO,

            'Puesto de trabajo': $scope.seccionales[i].CPUESTO + ' ' + $scope.estado($scope.seccionales[i].EPUESTO),
            'Counter linea de frente': $scope.seccionales[i].CCAUNTER + ' ' + $scope.estado($scope.seccionales[i].ECAUNTER),
            'Silla secretaria': $scope.seccionales[i].CSILLAE + ' ' + $scope.estado($scope.seccionales[i].ESILLAE),
            'Archivador de piso': $scope.seccionales[i].CARCHIVADORP + ' ' + $scope.estado($scope.seccionales[i].EARCHIVADORP),
            'Archivador de pared': $scope.seccionales[i].CARCHIVADORR + ' ' + $scope.estado($scope.seccionales[i].EARCHIVADORR),
            'Silla interlocutora': $scope.seccionales[i].CSILLAI + ' ' + $scope.estado($scope.seccionales[i].ESILLAI),
            'Mesa': $scope.seccionales[i].CMESA + ' ' + $scope.estado($scope.seccionales[i].EMESA),
            'Tándem': $scope.seccionales[i].CTANDEM + ' ' + $scope.estado($scope.seccionales[i].ETANDEM),
            'Ventilador': $scope.seccionales[i].CVENTILADOR + ' ' + $scope.estado($scope.seccionales[i].EVENTILADOR),
            'Aire acondicionado': $scope.seccionales[i].CAIRE + ' ' + $scope.estado($scope.seccionales[i].EAIRE),
            'Computador': $scope.seccionales[i].CCOMPUTADOR + ' ' + $scope.estado($scope.seccionales[i].ECOMPUTADOR),
            'Impresora': $scope.seccionales[i].CIMPRESORA + ' ' + $scope.estado($scope.seccionales[i].EIMPRESORA),
            'Celular red': $scope.seccionales[i].CCELULAR + ' ' + $scope.estado($scope.seccionales[i].ECELULAR),
            'Teléfono fijo': $scope.seccionales[i].CTELEFONO + ' ' + $scope.estado($scope.seccionales[i].CTELEFONO),
            'Modem/Internet': $scope.seccionales[i].CMODEM + ' ' + $scope.estado($scope.seccionales[i].EMODEM),
            'Cartelera informativa': $scope.seccionales[i].CCARTELERA + ' ' + $scope.estado($scope.seccionales[i].ECARTELERA),
            'Buzón de sugerencia': $scope.seccionales[i].CBUZON + ' ' + $scope.estado($scope.seccionales[i].EBUZON),
            'Botiquín': $scope.seccionales[i].CBOTIQUIN + ' ' + $scope.estado($scope.seccionales[i].EBOTIQUIN),
            'Camilla': $scope.seccionales[i].CCAMILLA + ' ' + $scope.estado($scope.seccionales[i].ECAMILLA),
            'Extintor': $scope.seccionales[i].CEXTINTOR + ' ' + $scope.estado($scope.seccionales[i].EEXTINTOR),
            'Aviso copagos': $scope.seccionales[i].CAVISOC + ' ' + $scope.estado($scope.seccionales[i].EAVISOC),
            'Aviso fachada': $scope.seccionales[i].CAVISOF + ' ' + $scope.estado($scope.seccionales[i].EAVISOF),
            'Señalización SST': $scope.seccionales[i].CSENALIZACION + ' ' + $scope.estado($scope.seccionales[i].ESENALIZACION),
            'Formato de negación': $scope.seccionales[i].CFORMATO + ' ' + $scope.estado($scope.seccionales[i].EFORMATO),
            'Aviso # de atención y preferencial': $scope.seccionales[i].CAVISOA + ' ' + $scope.estado($scope.seccionales[i].EAVISOA),
            'Televisor': $scope.seccionales[i].CTELEVISOR + ' ' + $scope.estado($scope.seccionales[i].CTELEVISOR),
            'Dispensador de agua': $scope.seccionales[i].CDISPENSADOR + ' ' + $scope.estado($scope.seccionales[i].EDISPENSADOR),
            'Aviso silla preferencial': $scope.seccionales[i].CAVISOS + ' ' + $scope.estado($scope.seccionales[i].EAVISOS),
            'Marcación silla preferencial': $scope.seccionales[i].CMARCACION + ' ' + $scope.estado($scope.seccionales[i].EMARCACION),
            'Misión y visión': $scope.seccionales[i].CMISION + ' ' + $scope.estado($scope.seccionales[i].EMISION),
            'Reglamento interno e higiene': $scope.seccionales[i].CREGLAMENTO + ' ' + $scope.estado($scope.seccionales[i].EREGLAMENTO),
            'Baño persona en situación de discapacidad': $scope.seccionales[i].CBANIO + ' ' + $scope.estado($scope.seccionales[i].EBANIO),
            'Rampa de acceso': $scope.seccionales[i].CRAMPA + ' ' + $scope.estado($scope.seccionales[i].ERAMPA),
            'Estante metálico': $scope.seccionales[i].CESTANTE + ' ' + $scope.estado($scope.seccionales[i].EESTANTE),
            'Señaleticas Sistema Brailer': $scope.seccionales[i].CSENATICA + ' ' + $scope.estado($scope.seccionales[i].ESENATICA)
          });
        }
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      $scope.estado = function (n) {
        if (n == 0) {
          return "- No Dispone"
        }
        if (n == 1) {
          return "- Dispone"
        }
        if (n == 2) {
          return "- En espera"
        }
      }
      /* /////////////////////////////////////COLORES A LOS ICONOS/////////////////////////////////////// */
      $scope.colores = function (n) {
        if (n == 1) {
          return { "filter": "hue-rotate(140deg) contrast(3)", "width": "30px" }
        }
        if (n == 2) {
          return { "filter": "hue-rotate(60deg) contrast(3)", "width": "30px" }
        }
        return {
          "filter": "contrast(3)", "width": "30px"
        }
      }
      $scope.colores2 = function (n) {
        if (n == 1) {
          return { "background": "rgb(6, 153, 6)", "border-radius": "25px" }
        }
        if (n == 2) {
          return { "background": "orange", "border-radius": "25px" }
        }
        return {
          "background": "#FF0000", "border-radius": "25px"
        }
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      $scope.animacion = function () {
        return {
          "animation": "slide 0.7s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0s 1 normal both running"
        }
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */

      /////////////Descargar archivo/////////////////
      $scope.descargafile = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          window.open("temp/" + response.data);
        });
      }

      $scope.descargaimg = function (ruta) {
        // alert(ruta);
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'descargaAdjunto',
            ruta: ruta
          }
        }).then(function (response) {
          $scope.mostrarimagenmodal = "temp/" + response.data;
          (function () {
            $('#modal3').modal();
          }());
          $('#modal3').modal('open');
          // window.open("temp/" + response.data);
        });
      }
      /* //////////////////////////////////////CARGAR INFO DESDE DATATABLE////////////////////////////////////////////// */
      $scope.cargarinfo = function (id, con) {
        if ($scope.codmuni != 1) {
          $('#tabledetalle').css('pointer-events', 'none');
        }
        document.getElementById('tablaoficina').disabled = true;
        $scope.iconacas = false;
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        }).catch(swal.noop);
        setTimeout(function () { $('#tablaoficina').scrollTop($('#tablaoficina').height() - 1000); }, 1000);///Regresa el scroll arriba
        setTimeout(function () { $('#tablaoficina2').scrollTop($('#tablaoficina2').height() - 1000); }, 1000);///Regresa el scroll arriba
        $scope.id = id; $scope.con = con;
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: { function: 'obteneroficina', id: id, con: con }
        }).then(function (response) {
          $scope.actuseccional = response.data;
          $scope.municipio = $scope.actuseccional[0].NOM_MUN;
          $scope.consecutivo = $scope.actuseccional[0].CON_MUN;
          $scope.oficina = $scope.actuseccional[0].OFICINA;
          $scope.munydpto = $scope.actuseccional[0].NOM_MUN + ' - ' + $scope.actuseccional[0].NOM_SEC;
          $scope.seccional = $scope.actuseccional[0].SECC;
          $scope.cpuesto = parseInt($scope.actuseccional[0].CPUESTO);
          $scope.epuesto = $scope.actuseccional[0].EPUESTO;
          $scope.ccaunter = parseInt($scope.actuseccional[0].CCAUNTER);
          $scope.ecaunter = $scope.actuseccional[0].ECAUNTER;
          $scope.csillae = parseInt($scope.actuseccional[0].CSILLAE);
          $scope.esillae = $scope.actuseccional[0].ESILLAE;
          $scope.carchivadorp = parseInt($scope.actuseccional[0].CARCHIVADORP);
          $scope.earchivadorp = $scope.actuseccional[0].EARCHIVADORP;
          $scope.carchivadorr = parseInt($scope.actuseccional[0].CARCHIVADORR);
          $scope.earchivadorr = $scope.actuseccional[0].EARCHIVADORR;
          $scope.csillai = parseInt($scope.actuseccional[0].CSILLAI);
          $scope.esillai = $scope.actuseccional[0].ESILLAI;
          $scope.cmesa = parseInt($scope.actuseccional[0].CMESA);
          $scope.emesa = $scope.actuseccional[0].EMESA;
          $scope.ctandem = parseInt($scope.actuseccional[0].CTANDEM);
          $scope.etandem = $scope.actuseccional[0].ETANDEM;
          $scope.cventilador = parseInt($scope.actuseccional[0].CVENTILADOR);
          $scope.eventilador = $scope.actuseccional[0].EVENTILADOR;
          $scope.caire = parseInt($scope.actuseccional[0].CAIRE);
          $scope.eaire = $scope.actuseccional[0].EAIRE;
          $scope.ccomputador = parseInt($scope.actuseccional[0].CCOMPUTADOR);
          $scope.ecomputador = $scope.actuseccional[0].ECOMPUTADOR;
          $scope.cimpresora = parseInt($scope.actuseccional[0].CIMPRESORA);
          $scope.eimpresora = $scope.actuseccional[0].EIMPRESORA;
          $scope.ccelular = parseInt($scope.actuseccional[0].CCELULAR);
          $scope.ecelular = $scope.actuseccional[0].ECELULAR;
          $scope.ctelefono = parseInt($scope.actuseccional[0].CTELEFONO);
          $scope.etelefono = $scope.actuseccional[0].ETELEFONO;
          $scope.cmodem = parseInt($scope.actuseccional[0].CMODEM);
          $scope.emodem = $scope.actuseccional[0].EMODEM;
          $scope.ccartelera = parseInt($scope.actuseccional[0].CCARTELERA);
          $scope.ecartelera = $scope.actuseccional[0].ECARTELERA;
          $scope.cbuzon = parseInt($scope.actuseccional[0].CBUZON);
          $scope.ebuzon = $scope.actuseccional[0].EBUZON;
          $scope.cbotiquin = parseInt($scope.actuseccional[0].CBOTIQUIN);
          $scope.ebotiquin = $scope.actuseccional[0].EBOTIQUIN;
          $scope.ccamilla = parseInt($scope.actuseccional[0].CCAMILLA);
          $scope.ecamilla = $scope.actuseccional[0].ECAMILLA;
          $scope.cextintor = parseInt($scope.actuseccional[0].CEXTINTOR);
          $scope.eextintor = $scope.actuseccional[0].EEXTINTOR;
          $scope.cavisoc = parseInt($scope.actuseccional[0].CAVISOC);
          $scope.eavisoc = $scope.actuseccional[0].EAVISOC;
          $scope.cavisof = parseInt($scope.actuseccional[0].CAVISOF);
          $scope.eavisof = $scope.actuseccional[0].EAVISOF;
          $scope.csenalizacion = parseInt($scope.actuseccional[0].CSENALIZACION);
          $scope.esenalizacion = $scope.actuseccional[0].ESENALIZACION;
          $scope.cformato = parseInt($scope.actuseccional[0].CFORMATO);
          $scope.eformato = $scope.actuseccional[0].EFORMATO;
          $scope.cavisoa = parseInt($scope.actuseccional[0].CAVISOA);
          $scope.eavisoa = $scope.actuseccional[0].EAVISOA;
          $scope.ctelevisor = parseInt($scope.actuseccional[0].CTELEVISOR);
          $scope.etelevisor = $scope.actuseccional[0].ETELEVISOR;
          $scope.cdispensador = parseInt($scope.actuseccional[0].CDISPENSADOR);
          $scope.edispensador = $scope.actuseccional[0].EDISPENSADOR;
          $scope.cavisos = parseInt($scope.actuseccional[0].CAVISOS);
          $scope.eavisos = $scope.actuseccional[0].EAVISOS;
          //
          $scope.cmarcacion = parseInt($scope.actuseccional[0].CMARCACION);
          $scope.emarcacion = $scope.actuseccional[0].EMARCACION;
          $scope.cmision = parseInt($scope.actuseccional[0].CMISION);
          $scope.emision = $scope.actuseccional[0].EMISION;
          $scope.creglamento = parseInt($scope.actuseccional[0].CREGLAMENTO);
          $scope.ereglamento = $scope.actuseccional[0].EREGLAMENTO;
          $scope.cbanio = parseInt($scope.actuseccional[0].CBANIO);
          $scope.ebanio = $scope.actuseccional[0].EBANIO;
          $scope.crampa = parseInt($scope.actuseccional[0].CRAMPA);
          $scope.erampa = $scope.actuseccional[0].ERAMPA;
          $scope.cestante = parseInt($scope.actuseccional[0].CESTANTE);
          $scope.eestante = $scope.actuseccional[0].EESTANTE;
          $scope.csenatica = parseInt($scope.actuseccional[0].CSENATICA);
          $scope.esenatica = $scope.actuseccional[0].ESENATICA;
          //
          $scope.direccion = $scope.actuseccional[0].DIR;
          $scope.arrendador = $scope.actuseccional[0].ARRENDA;
          $scope.nit = $scope.actuseccional[0].NIT;
          $scope.apertura = $scope.actuseccional[0].FEC_APE;
          $scope.duracion = parseInt($scope.actuseccional[0].DURA);
          $scope.vencimiento = $scope.actuseccional[0].VENC;
          $scope.vencimiento_Bk = $scope.actuseccional[0].VENC;
          $scope.notif = parseInt($scope.actuseccional[0].NOTIF);
          $scope.valor = $scope.actuseccional[0].VALOR;
          $scope.incremento = $scope.actuseccional[0].INCRE;
          $scope.canon = $scope.actuseccional[0].CANON;
          $scope.energia = $scope.actuseccional[0].ENER;
          $scope.acuealca = $scope.actuseccional[0].AAA;
          $scope.telef = $scope.actuseccional[0].TELEF;
          $scope.cantidadusu = parseInt($scope.actuseccional[0].CANT_USU);
          $scope.contacto = $scope.actuseccional[0].CONTAC;
          $scope.estadomobi = $scope.actuseccional[0].MOBIL;
          $scope.estadoarriendo = $scope.actuseccional[0].ARRIENDO;
          setTimeout(() => {
            swal.close();
          }, 500);
        })
        $scope.actualizar = false;
        $scope.hojauno = false;
        $timeout(function () {
          $scope.hojados = true;
        }, 400);

        $timeout(function () {
          //
          var dur = $scope.duracion;


          if (isNaN(dur)) {
          } else {
            $scope.dovencimiento();
            //
            var f1 = new Date();
            var mes = f1.getMonth() + 1;
            f1 = f1.getDate() + "/" + mes + "/" + f1.getFullYear();
            // console.log(f1);
            var f2 = $scope.vencimiento;
            if (f2 == null) {
            } else {
              var aFecha1 = f1.split('/');
              var aFecha2 = f2.split('/');
              var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
              var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
              var dif = fFecha2 - fFecha1;
              var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
              $scope.notif = ($scope.notif == '') ? 0 : $scope.notif;
              var noti = 90 + $scope.notif;

              // console.log("Noti - " + $scope.notif);
              // console.log("Notif - " + noti);
              // console.log("Dias - " + dias);
              if (dias == noti) {
                swal({
                  title: '!La fecha de vencimiento está próxima a vencer, restan:',
                  text: dias + ' Dias!',
                  type: 'info'
                }).catch(swal.noop);
              }
              if (dias <= 0) {
                swal({
                  title: '!Culminó la fecha de contrato, por favor renueve la fecha!',
                  type: 'info'
                }).catch(swal.noop);
              }
            }
          }
        }, 3000);
      }
      /* //////////////////////////////////////////////////////////////////////////////////////////////// */
      ////////////////Boton Volver//////////////
      $scope.Volver = function () {
        $scope.iconacas = true;
        $scope.salida = 'salidaefe';
        $scope.vencimiento_Bk = '';
        $timeout(function () {
          $scope.hojados = false;
        }, 500);
        $scope.cam = true;
        if ($scope.actualizar == true) {
          $scope.table.destroy();
          $scope.table2.destroy();
          $scope.hojados = false;
          $timeout(function () {
            $scope.inicio();
            $scope.salida = '';
          }, 1500);
        } else {
          $timeout(function () {
            $scope.hojauno = true;
            $scope.salida = '';
          }, 1000);
          $timeout(function () {
            $('#tabla').DataTable().order([2, 'asc']).draw();
          }, 1000);
        }
      }
      //////////para convertirlo en base 64//////////////////////
      $scope.basecontrato = function () {
        $scope.arrayfilescontrato = [];
        $scope.limitesubircontrato = false;
        $scope.limiteporsubidacontrato = false;
        $scope.limiteextensioncontrato = false;
        $scope.minimosubircontrato = false;
        var fileInput = document.getElementById('adjuntocont');
        // $scope.fileInput = fileInput;
        for (var i = 0; i < fileInput.files.length; i++) {
          if (fileInput.files[i].size > 7340032) {
            $scope.limitesubircontrato = true;
          }
          $scope.getBase64(fileInput.files[i]).then(
            data => $scope.arrayfilescontrato.push({ archivo: data })
          );
          if (fileInput.files[i].size == 0) {
            $scope.minimosubircontrato = true;
          }
          if (i >= 10) {
            $scope.limiteporsubidacontrato = true;
          }
          var name = fileInput.files[i].name;
          var x = name.split('.').pop();
          if (x.toUpperCase() != "PDF" && x.toUpperCase() != "DOC" && x.toUpperCase() != "DOCX" && x.toUpperCase() != "XLSX" && x.toUpperCase() != "PPTX" && x.toUpperCase() != "CSV") {
            $scope.limiteextensioncontrato = true;
          }
        }

        if ($scope.minimosubircontrato == true) {
          swal('Advertencia', '¡Alguno(s) de los archivos seleccionados está vacio!', 'info');
          $scope.limpiarmodaladjuntos(1);
        }

        if ($scope.limiteextensioncontrato == true) {
          swal('Advertencia', '¡Alguno(s) de los archivos seleccionados no es un documento o archivo!', 'info');
          $scope.limpiarmodaladjuntos(1);
        }

        if ($scope.limitesubircontrato == true) {
          swal('Advertencia', 'Alguno(s) de los archivos seleccionados excede el peso máximo posible (7MB)', 'info');
          $scope.limpiarmodaladjuntos(1);
        }

        if ($scope.limiteporsubidacontrato == true) {
          swal('Advertencia', '¡Solo se permiten como máximo 10 archivos por subida!', 'info');
          $scope.limpiarmodaladjuntos(1);
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
      $scope.baseinfografia = function () {
        $scope.arrayfilesinfografia = [];
        $scope.limitesubirinfografia = false;
        $scope.limiteporsubidainfografia = false;
        $scope.limiteextensioninfografia = false;
        $scope.minimosubirinfografia = false;
        var fileInput = document.getElementById('adjuntoinfo');
        for (var i = 0; i < fileInput.files.length; i++) {
          if (fileInput.files[i].size > 7340032) {
            $scope.limitesubirinfografia = true;
          }
          $scope.getBase64(fileInput.files[i]).then(
            data => $scope.arrayfilesinfografia.push({ archivo: data })
          );
          if (i >= 10) {
            $scope.limiteporsubidainfografia = true;
          }
          if (fileInput.files[i].size == 0) {
            $scope.minimosubirinfografia = true;
          }
          var name = fileInput.files[i].name;
          var x = name.split('.').pop();
          if (x.toUpperCase() != "JPG" && x.toUpperCase() != "PNG" && x.toUpperCase() != "JPEG" && x.toUpperCase() != "GIF") {
            $scope.limiteextensioninfografia = true;
          }
        }
        if ($scope.minimosubirinfografia == true) {
          swal('Advertencia', '¡Alguno(s) de los archivos seleccionados está vacio!', 'info');
          $scope.limpiarmodaladjuntos(2);
        }

        if ($scope.limiteextensioninfografia == true) {
          swal('Advertencia', '¡Alguno(s) de los archivos seleccionados no es una imagen!', 'info');
          $scope.limpiarmodaladjuntos(2);
        }

        if ($scope.limitesubirinfografia == true) {
          swal('Advertencia', '¡Alguno(s) de los archivos seleccionados excede el peso máximo posible (7MB)!', 'info');
          $scope.limpiarmodaladjuntos(2);
        }

        if ($scope.limiteporsubidainfografia == true) {
          swal('Advertencia', '¡Solo se permiten como máximo 10 archivos por subida!', 'info');
          $scope.limpiarmodaladjuntos(2);
        }
      }
      /////////////////////////////////////////////////////////////////////////////////////////////
      $scope.enviarcontrato = function () {
        var fin = new Date();
        var fileInput = document.getElementById('adjuntocont');
        /////////////////////////////////////////////////////////
        if (0 == fileInput.files.length) {
          swal({
            title: '!Adjunte primero el archivo!',
            type: 'warning',
            timer: 1000,
            showConfirmButton: false
          }).catch(swal.noop);
        }
        /////////////////////////////////////////////////////////
        if ($scope.limitesubircontrato == false) {
          if ($("#adjuntocont")[0].files && $("#adjuntocont")[0].files[0]) {
            for (var i = 0; i < fileInput.files.length; i++) {
              var name = fileInput.files[i].name;
              $scope.extensionarchivocont = name.split('.').pop();
              $scope.fechaactual = fin.getFullYear() + '' + (fin.getMonth() + 1) + '' + fin.getDate() + '_' + fin.getHours() + '' + fin.getMinutes() + '' + fin.getSeconds() + '' + i;
              // $scope.contratoarchivos = '/cargue_ftp/Digitalizacion/Genesis/Administrativa/Contratos/' + $scope.municipio + '_' + $scope.fechaactual + '.' + $scope.extensionarchivocont;

              $http({
                method: 'POST',
                url: "php/gestiondocumental/gestionadmin.php",
                data: {
                  function: 'subir',
                  seccional: $scope.oficina + '_' + $scope.fechaactual,
                  archivobase: $scope.arrayfilescontrato[i].archivo,
                  ext: $scope.extensionarchivocont,
                  path: 'Administrativa/Contratos'
                }
              }).then(function (response) {
                $scope.contratoarchivos = response.data;

                $http({
                  method: 'POST',
                  url: "php/gestiondocumental/gestionadmin.php",
                  data: {
                    function: 'adjuntararchivos',
                    seccional: $scope.id,
                    con: $scope.con,
                    tipoarchivo: '1',
                    url: $scope.contratoarchivos.trim()
                  }
                }).then(function (response) {
                });
              });
            }
            setTimeout(() => {
              swal({
                title: '!Archivo(s) Subido Correctamente!',
                type: 'success',
                timer: 1500,
                showConfirmButton: false
              }).catch(swal.noop);
            }, 1500);
            ///
            $timeout(function () {
              $scope.limpiarmodaladjuntos(1);
            }, 1000);
          }
        }
        $scope.limitesubircontrato = false;
      }
      /////////////////////////////////////////////////////////////////////////////////////////
      $scope.enviarinfografia = function () {
        var fin = new Date();
        var fileInput = document.getElementById('adjuntoinfo');
        /////////////////////////////////////////////////////////
        if (0 == fileInput.files.length) {
          swal({
            title: '!Adjunte primero el archivo!',
            type: 'warning',
            timer: 1000,
            showConfirmButton: false
          }).catch(swal.noop);
        }
        /////////////////////////////////////////////////////////
        if ($scope.limitesubirinfografia == false) {
          if ($("#adjuntoinfo")[0].files && $("#adjuntoinfo")[0].files[0]) {
            for (var i = 0; i < fileInput.files.length; i++) {
              var name = fileInput.files[i].name;
              $scope.extensionarchivoinfo = name.split('.').pop();
              var fechaactual = fin.getFullYear() + '' + (fin.getMonth() + 1) + '' + fin.getDate() + '_' + fin.getHours() + '' + fin.getMinutes() + '' + fin.getSeconds() + '' + i;
              // $scope.infografiaarchivos = '/cargue_ftp/Digitalizacion/Genesis/Administrativa/Infografia/' + $scope.municipio + '_' + fechaactual + '.' + $scope.extensionarchivoinfo;

              $http({
                method: 'POST',
                url: "php/gestiondocumental/gestionadmin.php",
                data: {
                  function: 'subir',
                  seccional: $scope.oficina + '_' + fechaactual,
                  archivobase: $scope.arrayfilesinfografia[i].archivo,
                  ext: $scope.extensionarchivoinfo,
                  path: 'Administrativa/Infografia'
                }
              }).then(function (response) {
                $scope.infografiaarchivos = response.data;
                console.log($scope.infografiaarchivos.trim());
                $http({
                  method: 'POST',
                  url: "php/gestiondocumental/gestionadmin.php",
                  data: {
                    function: 'adjuntararchivos',
                    seccional: $scope.id,
                    con: $scope.con,
                    tipoarchivo: '2',
                    url: $scope.infografiaarchivos.trim()
                  }
                }).then(function (response) {
                });
                // console.log(response.data);
              });
            }
            setTimeout(() => {
              swal({
                title: '!Archivo(s) Subido Correctamente!',
                type: 'success',
                timer: 1500,
                showConfirmButton: false
              }).catch(swal.noop);
            }, 1500);

            $timeout(function () {
              $scope.limpiarmodaladjuntos(2);
            }, 1000);
          }
        }
        $scope.limitesubirinfografia = false;
      }

      $scope.limpiarmodaladjuntos = function (n) {
        if (n == 1) {
          document.getElementById('adjuntocont').value = '';
          $("#adjuntocont")[0].value = "";
          $scope.contrato = "";
          $scope.arrayfilescontrato = [];
          $scope.Mostraradjuntos(2);
        } else {
          document.getElementById('adjuntoinfo').value = '';
          $("#adjuntoinfo")[0].value = "";
          $scope.infografia = "";
          $scope.arrayfilesinfografia = [];
          $scope.Mostraradjuntos(2);
        }

      }

      // $timeout(function () {
      // }, 500);//END TIMEOUT
      //
      ////////////////////////////////////////////////////
      ////////////////Hallar los dias restantes//////////////////////
      // $scope.restaFechas = function (f1, f2) {
      // $scope.restaFechas = function (f1, f2) {
      //   // var f1 = "01/01/2019";
      //   // var f2 = "01/04/2019";
      //   var aFecha1 = f1.split('/');
      //   var aFecha2 = f2.split('/');
      //   var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
      //   var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
      //   var dif = fFecha2 - fFecha1;
      //   var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
      //   return dias;
      //   // console.log(dias);
      //   // if (dias <= 90) {
      //   //   return
      //   //   console.log("vencido");
      //   // } else {
      //   //   console.log("nada");
      //   // }
      // }

      $scope.dovencimiento = function () {
        var p = 1;
        if ($scope.duracion == null || $scope.duracion == 0 || $scope.duracion == undefined || isNaN($scope.duracion)) {
          $scope.vencimiento = $scope.apertura;
        } else {
          // var fin; var inicio;


          ////
          var aFecha1 = $scope.apertura.split('/');
          var jan312009 = new Date(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
          // console.log("1 - " + jan312009);
          jan312009.setDate(jan312009.getDate() - 1);
          // console.log("2 - " + jan312009.toLocaleDateString());
          var xx = jan312009.toLocaleDateString();
          // console.log("3 - " + xx);
          var aFecha2 = xx.split('/');
          // console.log("4 - " + aFecha2);
          $scope.iteracion = true;
          $scope.i = 1;
          var a = '"' + aFecha2[2] + "/" + aFecha2[1] + "/" + aFecha2[0] + '"';
          // console.log("a - " + a);
          $scope.apertura2 = new Date(a);
          $scope.hoy = new Date();
          $scope.temp = $scope.apertura2;
          $scope.historico = [];
          $scope.array = {
            fechainicio: '',
            fechafin: '',
            iteracion: ''
          };
          while ($scope.iteracion == true) {
            $scope.array.fechafin = new Date($scope.temp.setMonth($scope.temp.getMonth() + $scope.duracion)).toLocaleDateString();
            $scope.array.fechainicio = new Date($scope.temp.setMonth($scope.temp.getMonth() - $scope.duracion)).toLocaleDateString();
            if ($scope.i == 1) {
              $scope.array.fechainicio = $scope.apertura;
              // console.log($scope.apertura);
            }
            $scope.array.iteracion = $scope.i;
            $scope.historico.push($scope.array);
            $scope.array = {
              fechainicio: '',
              fechafin: '',
              iteracion: ''
            };
            $scope.temp = new Date($scope.temp.setMonth($scope.temp.getMonth() + $scope.duracion));
            if ($scope.temp > $scope.hoy) {
              $scope.iteracion = false;
            }
            $scope.i = $scope.i + 1;
          }
          $scope.vencimiento = $scope.historico[$scope.historico.length - 1].fechafin;
        }
      }

      $scope.Validar_Vencimientos_Oficinas = function () {
        var Array_Todos = [];
        var hoy = new Date();
        // $scope.seccionales
        $scope.seccionales.forEach(element => {
          Array_Todos.push({
            secc: element.COD_MUN,
            con: element.CON_MUN,
            f_aper: element.FEC_APE,
            dura: parseInt(element.DURA),
            f_venc: element.VENC,
            act_f_venc: ''
          })
        });
        // for (var index = 0; index < 10; index++) {
        for (var index = 0; index < Array_Todos.length; index++) {
          if (Array_Todos[index].dura != 0) {
            var aFechaVen = Array_Todos[index].f_venc.split('/');
            var xFechaVen = new Date(aFechaVen[2], aFechaVen[1] - 1, aFechaVen[0]);
            if (xFechaVen <= hoy) {
              var aFecha1 = Array_Todos[index].f_aper.split('/');
              var jan312009 = new Date(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
              jan312009.setDate(jan312009.getDate() - 1);
              var apertura2 = new Date(jan312009.getFullYear(), jan312009.getMonth(), jan312009.getDate());
              var iteracion = true;
              var i = 1;
              var temp = apertura2;
              var historico = [];
              var array = {
                fechainicio: '',
                fechafin: '',
                iteracion: ''
              };
              //
              while (iteracion == true) {
                var xfechafin = new Date(temp.setMonth(temp.getMonth() + Array_Todos[index].dura));
                array.fechafin = xfechafin.getDate() + "/" + (xfechafin.getMonth() + 1) + "/" + xfechafin.getFullYear();
                var xfechainicio = new Date(temp.setMonth(temp.getMonth() - Array_Todos[index].dura));
                array.fechainicio = xfechainicio.getDate() + "/" + (xfechainicio.getMonth() + 1) + "/" + xfechainicio.getFullYear();
                if (i == 1) {
                  array.fechainicio = Array_Todos[index].f_aper;
                }
                array.iteracion = i;
                historico.push(array);
                array = {
                  fechainicio: '',
                  fechafin: '',
                  iteracion: ''
                };
                // console.log(temp);
                temp = new Date(temp.setMonth(temp.getMonth() + Array_Todos[index].dura));
                if (temp > hoy) {
                  iteracion = false;
                }
                i = i + 1;
              }
              // $scope.vencimiento = $scope.historico[$scope.historico.length - 1].fechafin;
              if (Array_Todos[index].f_venc != historico[historico.length - 1].fechafin) {
                Array_Todos[index].act_f_venc = historico[historico.length - 1].fechafin;
              }
            }
          }
        }
        // console.table(Array_Todos);
        var xArray_Todos = [];
        Array_Todos.forEach(element => {
          if (element.act_f_venc != '') {
            xArray_Todos.push({
              secc: element.secc,
              con: element.con,
              f_aper: element.f_aper,
              dura: parseInt(element.dura),
              f_venc: element.act_f_venc
            });
          }
        });
        console.log(xArray_Todos);
        // // debugger
        if (xArray_Todos.length > 0) {
          // console.log(xArray_Todos);
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'actualizarfvencimiento',
              FECHAS: JSON.stringify(xArray_Todos),
              cantidad: xArray_Todos.length
            }
          }).then(function (response) {
            if (response.data) {
              console.log(response.data);
            }
          });
        }
      }

      /*$scope.Validar_Vencimientos_Oficinas = function () {
        var Array_Todos = [];
        var hoy = new Date();
        $scope.seccionales
        $scope.seccionales.forEach(element => {
          Array_Todos.push({
            secc: element.COD_MUN,
            con: element.CON_MUN,
            f_aper: element.FEC_APE,
            dura: parseInt(element.DURA),
            f_venc: element.VENC,
            act_f_venc: ''
          })
        });
        for (var index = 0; index < Array_Todos.length; index++) {
          if (Array_Todos[index].dura != 0) {
            var aFechaVen = Array_Todos[index].f_venc.split('/');
            var xFechaVen = new Date(aFechaVen[2], aFechaVen[1] - 1, aFechaVen[0]);
            if (xFechaVen <= hoy) {
              var aFecha1 = Array_Todos[index].f_aper.split('/');
              var jan312009 = new Date(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
              jan312009.setDate(jan312009.getDate() - 1);
              var xx = jan312009.toLocaleDateString();
              var aFecha2 = xx.split('/');
              var iteracion = true;
              var i = 1;
              var a = '"' + aFecha2[2] + "/" + aFecha2[1] + "/" + aFecha2[0] + '"';
              var apertura2 = new Date(a);
              var temp = apertura2;
              var historico = [];
              var array = {
                fechainicio: '',
                fechafin: '',
                iteracion: ''
              };
              //
              while (iteracion == true) {
                array.fechafin = new Date(temp.setMonth(temp.getMonth() + Array_Todos[index].dura)).toLocaleDateString();
                array.fechainicio = new Date(temp.setMonth(temp.getMonth() - Array_Todos[index].dura)).toLocaleDateString();
                if (i == 1) {
                  array.fechainicio = Array_Todos[index].f_aper;
                }
                array.iteracion = i;
                historico.push(array);
                array = {
                  fechainicio: '',
                  fechafin: '',
                  iteracion: ''
                };
                temp = new Date(temp.setMonth(temp.getMonth() + Array_Todos[index].dura));
                if (temp > hoy) {
                  iteracion = false;
                }
                i = i + 1;
              }
              // $scope.vencimiento = $scope.historico[$scope.historico.length - 1].fechafin;
              if (Array_Todos[index].f_venc != historico[historico.length - 1].fechafin) {
                Array_Todos[index].act_f_venc = historico[historico.length - 1].fechafin;
              }
            }
          }
        }
        // console.table(Array_Todos);
        var xArray_Todos = [];
        Array_Todos.forEach(element => {
          if (element.act_f_venc != '') {
            xArray_Todos.push({
              secc: element.secc,
              con: element.con,
              f_aper: element.f_aper,
              dura: parseInt(element.dura),
              f_venc: element.act_f_venc
            });
          }
        });
        // xArray_Todos.push({
        //   secc: element.secc,
        //   con: element.con,
        //   f_aper: element.f_aper,
        //   dura: parseInt(element.dura),
        //   f_venc: element.act_f_venc
        // });
        // console.table(xArray_Todos);

        if (xArray_Todos.length > 0) {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'actualizarfvencimiento',
              FECHAS: JSON.stringify(xArray_Todos),
              cantidad: xArray_Todos.length
            }
          }).then(function (response) {
            if (response.data) {
              console.log(response.data);
            }
          });
        }
      }*/

      ////////////////////////////////////////////////////}
      $scope.chg_arrendador = function () {
        $scope.regex = '^([\\w--.,]+(\\s){0,1})+$';
      }

      /////////////////Actualizar////////////////////
      $scope.Actualizar_Detalle = function () {
        var validor = true;
        /* ////////////////////////////////////VALIDAR DETALLES OFICINA////////////////////////////////////////////////// */
        if ($scope.direccion == "" || $scope.direccion == null || $scope.arrendador == "" || $scope.arrendador == null || $scope.arrendador == undefined || $scope.nit == "" || $scope.apertura == "" ||
          $scope.apertura == null || isNaN($scope.duracion) || $scope.vencimiento == "" || $scope.vencimiento == null || $scope.notif == null || $scope.valor == null ||
          $scope.valor == "" || $scope.incremento == null || $scope.canon == null || $scope.energia == "" || $scope.energia == null || $scope.acuealca == "" || $scope.acuealca == null ||
          $scope.cantidadusu == null || $scope.contacto == "" || $scope.contacto == null) {
          validor = false;
        }
        if (validor == false) {
          swal({
            title: '!Faltan campos por completar!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false
          }).catch(swal.noop);
        }
        if (validor == true) {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'guardarhistorico_detalle', id: $scope.id, con: $scope.con, json: $scope.actuseccional
            }
          }).then(function (response) {

            $scope.llenarjson_detalle();///LLenado del json
            // console.log($scope.json);
            $http({
              method: 'POST',
              url: "php/gestiondocumental/gestionadmin.php",
              data: {
                function: 'actualizarseccional_detalle', id: $scope.id, con: $scope.con, json: $scope.json_detalle
              }
            }).then(function (response) {
              var data = response.data.split("-");
              var cod = data[0];
              var mgs = data[1];
              switch (cod) {
                case "0":
                  notification.getNotification('error', mgs, 'Notificacion');
                  break;
                case "1":
                  swal({
                    title: 'Información Actualizada con exito!',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false
                  }).catch(swal.noop);
                  ////////////////////////////////////
                  $scope.actuseccional[0].DIR = $scope.direccion;
                  $scope.actuseccional[0].ARRENDA = $scope.arrendador;
                  $scope.actuseccional[0].NIT = $scope.nit;
                  $scope.actuseccional[0].FEC_APE = $scope.apertura;
                  $scope.actuseccional[0].DURA = $scope.duracion;
                  $scope.actuseccional[0].VENC = $scope.vencimiento;
                  $scope.actuseccional[0].NOTIF = $scope.notif;
                  $scope.actuseccional[0].VALOR = $scope.valor;
                  $scope.actuseccional[0].INCRE = $scope.incremento;
                  $scope.actuseccional[0].CANON = $scope.canon;
                  $scope.actuseccional[0].ENER = $scope.energia;
                  $scope.actuseccional[0].AAA = $scope.acuealca;
                  $scope.actuseccional[0].TELEF = $scope.telef;
                  $scope.actuseccional[0].CANT_USU = $scope.cantidadusu;
                  $scope.actuseccional[0].CONTAC = $scope.contacto;
                  $scope.actuseccional[0].MOBIL = $scope.estadomobi;
                  $scope.actuseccional[0].ARRIENDO = $scope.estadoarriendo;
                  ///////////////
                  break;
                default:
              }
            })
          })
          $scope.actualizar = true;///Activa la destruccion de la tabla
        }
      }
      ///////////////////////////////////
      $scope.Actualizar_Implementos = function () {
        var validor = true;
        /* ////////////////////////////////////VALIDAR IMPLEMENTOS OFICINA////////////////////////////////////////////////// */
        if ($scope.cpuesto == null || $scope.ccaunter == null || $scope.csillae == null || $scope.carchivadorp == null || $scope.carchivadorr == null || $scope.csillai == null ||
          $scope.cmesa == null || $scope.ctandem == null || $scope.cventilador == null || $scope.caire == null || $scope.ccomputador == null || $scope.cimpresora == null ||
          $scope.ccelular == null || $scope.ctelefono == null || $scope.cmodem == null || $scope.ccartelera == null || $scope.cbuzon == null || $scope.cbotiquin == null ||
          $scope.ccamilla == null || $scope.cextintor == null || $scope.cavisoc == null || $scope.cavisof == null || $scope.csenalizacion == null || $scope.cformato == null ||
          $scope.cavisoa == null || $scope.ctelevisor == null || $scope.cdispensador == null || $scope.cavisos == null || $scope.cmarcacion == null || $scope.cmision == null
          || $scope.creglamento == null || $scope.cbanio == null || $scope.crampa == null || $scope.cestante == null || $scope.csenatica == null) {
          validor = false;
        }
        if (validor == false) {
          swal({
            title: '!Faltan campos por completar!',
            type: 'error',
            timer: 1000,
            showConfirmButton: false
          }).catch(swal.noop);
        }
        if (validor == true) {
          $http({
            method: 'POST',
            url: "php/gestiondocumental/gestionadmin.php",
            data: {
              function: 'guardarhistorico_implementos', id: $scope.id, con: $scope.con, json: $scope.actuseccional
            }
          }).then(function (response) {

            $scope.llenarjson_implementos();///LLenado del json
            // console.log($scope.json);
            $http({
              method: 'POST',
              url: "php/gestiondocumental/gestionadmin.php",
              data: {
                function: 'actualizarseccional_implementos', id: $scope.id, con: $scope.con, json: $scope.json_implementos
              }
            }).then(function (response) {
              var data = response.data.split("-");
              var cod = data[0];
              var mgs = data[1];
              switch (cod) {
                case "0":
                  notification.getNotification('error', mgs, 'Notificacion');
                  break;
                case "1":
                  swal({
                    title: 'Información Actualizada con exito!',
                    type: 'success',
                    timer: 1000,
                    showConfirmButton: false
                  }).catch(swal.noop);
                  ////////////////////////////////////

                  $scope.actuseccional[0].CPUESTO = $scope.cpuesto;
                  $scope.actuseccional[0].EPUESTO = $scope.epuesto;
                  $scope.actuseccional[0].CCAUNTER = $scope.ccaunter;
                  $scope.actuseccional[0].ECAUNTER = $scope.ecaunter;
                  $scope.actuseccional[0].CSILLAE = $scope.csillae;
                  $scope.actuseccional[0].ESILLAE = $scope.esillae;
                  $scope.actuseccional[0].CARCHIVADORP = $scope.carchivadorp;
                  $scope.actuseccional[0].EARCHIVADORP = $scope.earchivadorp;
                  $scope.actuseccional[0].CARCHIVADORR = $scope.carchivadorr;
                  $scope.actuseccional[0].EARCHIVADORR = $scope.earchivadorr;
                  $scope.actuseccional[0].CSILLAI = $scope.csillai;
                  $scope.actuseccional[0].ESILLAI = $scope.esillai;
                  $scope.actuseccional[0].CMESA = $scope.cmesa;
                  $scope.actuseccional[0].EMESA = $scope.emesa;
                  $scope.actuseccional[0].CTANDEM = $scope.ctandem;
                  $scope.actuseccional[0].ETANDEM = $scope.etandem;
                  $scope.actuseccional[0].CVENTILADOR = $scope.cventilador;
                  $scope.actuseccional[0].EVENTILADOR = $scope.eventilador;

                  $scope.actuseccional[0].CAIRE = $scope.caire;
                  $scope.actuseccional[0].EAIRE = $scope.eaire;
                  $scope.actuseccional[0].CCOMPUTADOR = $scope.ccomputador;
                  $scope.actuseccional[0].ECOMPUTADOR = $scope.ecomputador;
                  $scope.actuseccional[0].CIMPRESORA = $scope.cimpresora;
                  $scope.actuseccional[0].EIMPRESORA = $scope.eimpresora;
                  $scope.actuseccional[0].CCELULAR = $scope.ccelular;
                  $scope.actuseccional[0].ECELULAR = $scope.ecelular;
                  $scope.actuseccional[0].CTELEFONO = $scope.ctelefono;
                  $scope.actuseccional[0].ETELEFONO = $scope.etelefono;
                  $scope.actuseccional[0].CMODEM = $scope.cmodem;
                  $scope.actuseccional[0].EMODEM = $scope.emodem;
                  $scope.actuseccional[0].CCARTELERA = $scope.ccartelera;
                  $scope.actuseccional[0].ECARTELERA = $scope.ecartelera;
                  $scope.actuseccional[0].CBUZON = $scope.cbuzon;
                  $scope.actuseccional[0].EBUZON = $scope.ebuzon;
                  $scope.actuseccional[0].CBOTIQUIN = $scope.cbotiquin;
                  $scope.actuseccional[0].EBOTIQUIN = $scope.ebotiquin;
                  $scope.actuseccional[0].CCAMILLA = $scope.ccamilla;
                  $scope.actuseccional[0].ECAMILLA = $scope.ecamilla;

                  $scope.actuseccional[0].CEXTINTOR = $scope.cextintor;
                  $scope.actuseccional[0].EEXTINTOR = $scope.eextintor;
                  $scope.actuseccional[0].CAVISOC = $scope.cavisoc;
                  $scope.actuseccional[0].EAVISOC = $scope.eavisoc;
                  $scope.actuseccional[0].CAVISOF = $scope.cavisof;
                  $scope.actuseccional[0].EAVISOF = $scope.eavisof;
                  $scope.actuseccional[0].CSENALIZACION = $scope.csenalizacion;
                  $scope.actuseccional[0].ESENALIZACION = $scope.esenalizacion;
                  $scope.actuseccional[0].CFORMATO = $scope.cformato;
                  $scope.actuseccional[0].EFORMATO = $scope.eformato;
                  $scope.actuseccional[0].CAVISOA = $scope.cavisoa;
                  $scope.actuseccional[0].EAVISOA = $scope.eavisoa;
                  $scope.actuseccional[0].CTELEVISOR = $scope.ctelevisor;
                  $scope.actuseccional[0].ETELEVISOR = $scope.etelevisor;
                  $scope.actuseccional[0].CDISPENSADOR = $scope.cdispensador;
                  $scope.actuseccional[0].EDISPENSADOR = $scope.edispensador;
                  $scope.actuseccional[0].CAVISOS = $scope.cavisos;
                  $scope.actuseccional[0].EAVISOS = $scope.eavisos;
                  $scope.actuseccional[0].CMARCACION = $scope.cmarcacion;
                  $scope.actuseccional[0].EMARCACION = $scope.emarcacion;
                  $scope.actuseccional[0].CMISION = $scope.cmision;
                  $scope.actuseccional[0].EMISION = $scope.emision;
                  $scope.actuseccional[0].CREGLAMENTO = $scope.creglamento;
                  $scope.actuseccional[0].EREGLAMENTO = $scope.ereglamento;
                  $scope.actuseccional[0].CBANIO = $scope.cbanio;
                  $scope.actuseccional[0].EBANIO = $scope.ebanio;
                  $scope.actuseccional[0].CRAMPA = $scope.crampa;
                  $scope.actuseccional[0].ERAMPA = $scope.erampa;
                  $scope.actuseccional[0].CESTANTE = $scope.cestante;
                  $scope.actuseccional[0].EESTANTE = $scope.eestante;
                  $scope.actuseccional[0].CSENATICA = $scope.csenatica;
                  $scope.actuseccional[0].ESENATICA = $scope.esenatica;
                  ///////////////

                  break;
                default:
              }
            })
          })
          $scope.actualizar = true;///Activa la destruccion de la tabla
        }
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////
      $scope.Crear_Oficina_Ob_Dptos = function () {
        var xArray = [];
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'Obtener_Dptos_Mncpos',
            Coinc: 'x',
            Tipo: 1,
          }
        }).then(function (response) {
          if (response) {
            xArray = response.data;
            if (xArray) {
              var options = {};
              $.map(xArray,
                function (o) {
                  options[o.CODIGO] = o.NOMBRE;
                });
              swal({
                title: 'Seleccione el Departamento',
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
                if (result) {
                  $scope.Crear_Oficina_Ob_Mcps(result)
                }
              }).catch(swal.noop);
            }
          }
        });

      }

      $scope.Crear_Oficina_Ob_Mcps = function (DPTO) {
        var xArray = [];
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'Obtener_Dptos_Mncpos',
            Coinc: DPTO,
            Tipo: 2,
          }
        }).then(function (response) {
          if (response) {
            xArray = response.data;
            if (xArray) {
              var options = {};
              $.map(xArray,
                function (o) {
                  options[o.CODIGO] = o.NOMBRE;
                });
              swal({
                title: 'Seleccione el Municipio',
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
                if (result) {
                  console.log(result);
                  $scope.Crear_Oficina_Nombre(result);
                }
              }).catch(swal.noop);
            }
          }
        });
      }

      $scope.Crear_Oficina_Nombre = function (CODIGO) {
        swal({
          title: 'Nombre de la oficina',
          text: 'Escriba el nombre de la oficina a crear',
          input: 'text',
          inputPlaceholder: 'Ingrese el nombre...',
          confirmButtonText: "Enviar",
          showCancelButton: true,
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            if (result.length > 5) {
              swal({
                title: 'Seleccione el tipo de inmueble',
                input: 'select',
                inputOptions: {
                  PA: 'Punto de Atención',
                  OA: 'Oficina Administrativa',
                  BO: 'Bodega'
                },
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
              }).then(function (result2) {
                if (result2) {

                  $http({
                    method: 'POST',
                    url: "php/gestiondocumental/gestionadmin.php",
                    data: {
                      function: 'Registrar_Oficina',
                      Ubicacion: CODIGO,
                      Nombre: result,
                      Tipo: result2
                    }
                  }).then(function (response) {
                    if (response) {
                      if (response.data.codigo == '0') {
                        swal({
                          title: "!" + response.data.mensaje + "!",
                          type: "success",
                        }).catch(swal.noop);
                        $scope.actualizar = true;
                        if ($scope.actualizar == true) {
                          $scope.table.destroy();
                          $scope.table2.destroy();
                          $timeout(function () {
                            $scope.Actualizar_Numeros();
                            $scope.inicio();
                          }, 1500);
                        }
                      } else {
                        swal({
                          title: "¡Ocurrio un error!",
                          text: "!" + response.data.mensaje + "!",
                          type: "info",
                        }).catch(swal.noop);
                      }
                    }
                  });
                }

              }).catch(swal.noop);

            } else {
              swal({
                title: "¡Error!",
                text: "!El nombre debe contener mas de 5 caracteres!",
                type: "warning",
              }).catch(swal.noop);
            }
            return false;
          }
        }).catch(swal.noop);
      }

      $scope.Actualizar_Numeros = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: { function: 'obtenernumeros' }
        }).then(function (response) {
          $scope.conteo = response.data;
        })
      }

      $scope.Abrir_Modal_Oficinas = function () {
        $scope.Array_Oficinas_Activas = null;
        $scope.Array_Oficinas_Inactivas = null;
        (function () {
          $('#modal_Oficinas').modal();
        }());
        $('#modal_Oficinas').modal('open');
        $scope.Consultar_Oficinas_Ac();
        $scope.Consultar_Oficinas_In();
      }

      $scope.Cerrar_Modal_Oficinas = function () {
        $('#modal_Oficinas').modal('close');
      }



      $scope.Consultar_Oficinas_Ac = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'Consultar_Oficina',
            Estado: 'A',
          }
        }).then(function (response) {
          if (response) {
            $scope.Array_Oficinas_Activas = response.data;
            if ($scope.Array_Oficinas_Activas) {
              console.log($scope.Array_Oficinas_Activas);
            }
          }
        });
      }

      $scope.Consultar_Oficinas_In = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'Consultar_Oficina',
            Estado: 'I',
          }
        }).then(function (response) {
          if (response) {
            $scope.Array_Oficinas_Inactivas = response.data;
            if ($scope.Array_Oficinas_Inactivas) {
              console.log($scope.Array_Oficinas_Inactivas);
            }
          }
        });
      }

      $scope.Activar_Inactivar_Of = function (X, ACCION) {
        var Texto = '¿Desea ' + ((ACCION == '3') ? 'Activar' : 'Inactivar') + ' Esta Oficina?';
        swal({
          title: '¿Está Seguro?',
          text: Texto,
          type: 'info',
          confirmButtonText: (ACCION == '3') ? 'Activar' : 'Inactivar',
          showCancelButton: true,
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            $http({
              method: 'POST',
              url: "php/gestiondocumental/gestionadmin.php",
              data: {
                function: 'Activar_Inactivar_Of',
                Ubicacion: X.COD_OFI,
                Coinc: X.CON_OFI,
                Accion: ACCION,
              }
            }).then(function (response) {
              if (response) {
                if (response.data.codigo == '0') {
                  swal({
                    title: "!" + response.data.mensaje + "!",
                    type: "success",
                  }).catch(swal.noop);
                  $scope.actualizar = true;
                  if ($scope.actualizar == true) {
                    $scope.Array_Oficinas_Activas = null;
                    $scope.Array_Oficinas_Inactivas = null;
                    $scope.Consultar_Oficinas_Ac();
                    $scope.Consultar_Oficinas_In();
                    $scope.table.destroy();
                    $scope.table2.destroy();
                    $timeout(function () {
                      $scope.Actualizar_Numeros();
                      $scope.inicio();
                    }, 1500);
                  }
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: "!" + response.data.mensaje + "!",
                    type: "info",
                  }).catch(swal.noop);
                }
              }
            });

          }
        }).catch(swal.noop);


        // $http({
        //   method: 'POST',
        //   url: "php/gestiondocumental/gestionadmin.php",
        //   data: {
        //     function: 'Activar_Inactivar_Of',
        //     Ubicacion: X.COD_OFI,
        //     Coinc: X.CON_OFI,
        //     Accion: ACCION,
        //   }
        // }).then(function (response) {
        //   if (response) {
        //     // $scope.Array_Oficinas_Inactivas = response.data;
        //     // if ($scope.Array_Oficinas_Inactivas) {
        //     $scope.Array_Oficinas_Activas = null;
        //     $scope.Array_Oficinas_Inactivas = null;
        //     $scope.Consultar_Oficinas_Ac();
        //     $scope.Consultar_Oficinas_In();
        //     console.log(response.data);
        //     // }
        //   }
        // });
      }

      $scope.Des_Act_Imagen = function (index) {
        var Cant_I = 0;
        $scope.Array_Adjuntos_Infografia.Array_Dia[index].ESTADO = ($scope.Array_Adjuntos_Infografia.Array_Dia[index].ESTADO == 'A') ? 'I' : 'A';
        angular.forEach($scope.Array_Adjuntos_Infografia.Array_Dia, function (i) {
          if (i.ESTADO == 'I') {
            Cant_I++;
          }
        });
        $scope.Array_Adjuntos_Infografia_Cant = Cant_I;
      }



      $scope.Guardar_Desactivar_Im = function () {
        var xArray = [];
        angular.forEach($scope.Array_Adjuntos_Infografia.Array_Dia, function (i) {
          if (i.ESTADO == 'I') {
            xArray.push({ ID: i.ID });
          }
        });
        console.log(xArray);
        var texto = '¿Desea desactivar (' + $scope.Array_Adjuntos_Infografia_Cant + ') Imágenes?';
        swal({
          title: '¿Está Seguro?',
          text: texto,
          type: 'info',
          confirmButtonText: 'Guardar',
          showCancelButton: true,
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            swal({ title: 'Cargando...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/gestiondocumental/gestionadmin.php",
              data: {
                function: 'Desactivar_Imagenes',
                xdata: JSON.stringify(xArray),
                Cantidad: $scope.Array_Adjuntos_Infografia_Cant,
                Secc: $scope.id,
                Cons: $scope.con,
              }
            }).then(function (response) {
              if (response) {
                if (response.data.codigo == '0') {
                  swal({
                    title: "!" + response.data.mensaje + "!",
                    type: "success",
                  }).catch(swal.noop);
                  $scope.Mostraradjuntos(1);
                } else {
                  swal({
                    title: "¡Ocurrio un error!",
                    text: "!" + response.data.mensaje + "!",
                    type: "info",
                  }).catch(swal.noop);
                }
              }
            });

          }
        }).catch(swal.noop);

      }

      //////
      $scope.Abrir_Modal_Correo_Seccionales = function () {
        $scope.Array_Correos_Seccionales = null;
        (function () {
          $('#modal_Seccional_Correo').modal();
        }());
        $('#modal_Seccional_Correo').modal('open');
        $scope.Consultar_Correos_Seccionales();
      }



      $scope.Cerrar_Correos_Seccionales = function () {
        $('#modal_Seccional_Correo').modal('close');
      }

      $scope.Consultar_Correos_Seccionales = function () {
        $http({
          method: 'POST',
          url: "php/gestiondocumental/gestionadmin.php",
          data: {
            function: 'Obtener_Correos',
          }
        }).then(function (response) {
          if (response) {
            $scope.Array_Correos_Seccionales = response.data;
            if ($scope.Array_Correos_Seccionales) {
              console.log($scope.Array_Correos_Seccionales);
            }
          }
        });
      }

      $scope.Guardar_Correos_Seccionales = function () {
        var xArray = $scope.Array_Correos_Seccionales;
        var count = 0;
        angular.forEach($scope.Array_Correos_Seccionales, function (i) {
          if ((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(i.CORREO)) {
            console.log(i);
          } else {
            count++;
          }
          // console.log(i);
        });
        if (count == 0) {
          // console.log(xArray);
          var texto = '¿Desea guardar los cambios realizados?';
          swal({
            title: '¿Está Seguro?',
            text: texto,
            type: 'info',
            confirmButtonText: 'Guardar',
            showCancelButton: true,
            allowOutsideClick: false
          }).then(function (result) {
            if (result) {
              swal({ title: 'Cargando...', allowOutsideClick: false });
              swal.showLoading();
              $http({
                method: 'POST',
                url: "php/gestiondocumental/gestionadmin.php",
                data: {
                  function: 'Actualizar_Correos',
                  xdata: JSON.stringify(xArray),
                  Cantidad: $scope.Array_Correos_Seccionales.length,
                }
              }).then(function (response) {
                if (response) {
                  if (response.data.codigo == '0') {
                    swal({
                      title: "!" + response.data.mensaje + "!",
                      type: "success",
                    }).catch(swal.noop);
                  } else {
                    swal({
                      title: "¡Ocurrio un error!",
                      text: "!" + response.data.mensaje + "!",
                      type: "info",
                    }).catch(swal.noop);
                  }
                }
              });

            }
          }).catch(swal.noop);
        } else {
          swal({
            title: "¡Ocurrio un error!",
            text: "!Todos los correos ingresados deben ser validos!",
            type: "info",
          }).catch(swal.noop);
        }
      }



      $scope.prrrr = function () {
        // var Regex = '^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$';

        var Regex = new RegExp("/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/");
        var count = 0;
        angular.forEach($scope.Array_Correos_Seccionales, function (i) {
          if (!Regex.test(i.CORREO)) {
            console.log(i);
          } else {
            count++;
          }
          // console.log(i);
        });

        console.log(count);
        // console.log($scope.Array_Correos_Seccionales);
      }


    }])
