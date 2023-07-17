angular.module('GenesisApp')
  .controller('DigitalizacionControllerAF', ['$scope', '$http', 'digitalizacionHTTP', '$compile', '$rootScope', '$sce', 'afiliacionHttp', 'ngDialog',
    function ($scope, $http, digitalizacionHTTP, $compile, $rootScope, $sce, afiliacionHttp, ngDialog) {

      setTimeout(function () {
        $scope.AbrirModal();
      }, 100);
      $scope.OcultarProceso = true;
      $scope.OcultarTabla = true;
      $scope.OcultarSubirArchivos = true;
      $scope.TablaDeLosArchivos = true;
      $scope.BloquearTipoProceso = true;
      $scope.array = [];
      $scope.limpio = false;
      //Cargue
      $scope.panel = [];
      $scope.VentanaDigitalizacion = false;
      $scope.VentanaCargue = true;
      $scope.MostrarArchivoDigital = false;
      $scope.MostrarArchivoCargue = true;
      $scope.LimpiarCargue = function () {
        $scope.MostrarArchivoDigital = false;
        $scope.MostrarArchivoCargue = true;
      }

      function validar_json(str) {
        try {
          if (typeof str !== "string") {
            return false;
          } else {
            return (typeof JSON.parse(str) === 'object');
          }
        } catch (e) {
          return false;
        }
      }
      $scope.tipo_digitalizacion;
      $scope.panelDatos = [];
      $scope.show_modal = false;
      $scope.adres = false;
      $scope.adres_data = {};
      $scope.AbrirModal = function () {
        if ($scope.tipo_digitalizacion != undefined && $scope.tipo_digitalizacion == 1) {
          $scope.array = [];
          digitalizacionHTTP.obtenerparametros($scope.paquete, '').then(function (response) {
            if (response.length == '0') {
              swal('Información', 'No Hay Datos', 'info');
              $scope.OcultarTabla = true;
              $scope.procesos = '';
              $scope.array = [];
            } else {
              response.forEach(element => {
                if (element.codigo_soporte == 11) {
                  if ($scope.tipo_documento != undefined && $scope.tipo_documento != null && $scope.tipo_documento != "" && $scope.documento != undefined && $scope.documento != null && $scope.documento != "") {
                    $scope.adres = true;
                    swal({
                      html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Consultando <br> Fosyga / ADRES.</p>',
                      width: 200,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      showConfirmButton: false,
                      animation: false
                    });
                    afiliacionHttp.serviceFDC($scope.tipo_documento, $scope.documento, 'ObtenerFosyga').then(function (response) {
                      swal.close();
                      if (validar_json(angular.toJson(response.data))) {
                        $scope.adres_data = response.data;
                        if ($scope.paquete != "102"){
                          $http({
                            method: 'POST',
                            url: "php/movilidad/afiliacion_linea.php",
                            data: {
                              function: 'valida_adres',
                              tipo_doc: $scope.tipo_documento, 
                              doc: $scope.documento,
                              eps: $scope.adres_data.EPS
                            }
                          }).then(function (response) {
                            if (response.data.codigo != '0') {
                              swal('Informacion', response.data.mensaje, 'error');
                            } else {
                              $scope.show_modal = true;
                              setTimeout(() => {
                                swal({
                                  html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                                  width: 200,
                                  allowOutsideClick: false,
                                  allowEscapeKey: false,
                                  showConfirmButton: false,
                                  animation: false
                                });
                                var node = document.getElementById("adres_imprimir").firstElementChild.parentNode;
                                domtoimage.toPng(node).then(function (dataUrl) {
                                  $scope.Archivo = new Image();
                                  $scope.Archivo = dataUrl;

                                  $scope.panel = [];
                                  $scope.panelDatos = [];
                                  $scope.panelDatos.push({
                                    name: "Impresion pagina del Fosyga / ADRES (" + $scope.tipo_documento + "-" + $scope.documento + ")",
                                    base64: $scope.Archivo,
                                    ext: "png",
                                    id: $scope.documento
                                  });
                                  $scope.show_modal = false;
                                  $scope.LimpiarCargue();

                                  $scope.VentanaCargue = false;
                                  $scope.VentanaDigitalizacion = true;
                                  $scope.OcultarProceso = false;

                                  setTimeout(() => {
                                    $('#click').trigger('click');
                                    swal.close();
                                    $scope.$apply();
                                  }, 100);
                                }).catch(function (error) {
                                  swal("Error en la libreria domtoimage", "No se realizó la captura de la imagen del Fosyga / ADRES, por favor comunicarse con el área TIC","error");
                                });
                              }, 100);
                            }
                          });
                        }else{
                          $scope.show_modal = true;
                            setTimeout(() => {
                              swal({
                                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                                width: 200,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                showConfirmButton: false,
                                animation: false
                              });
                              var node = document.getElementById("adres_imprimir").firstElementChild.parentNode;
                              domtoimage.toPng(node).then(function (dataUrl) {
                                $scope.Archivo = new Image();
                                $scope.Archivo = dataUrl;

                                $scope.panel = [];
                                $scope.panelDatos = [];
                                $scope.panelDatos.push({
                                  name: "Impresion pagina del Fosyga / ADRES (" + $scope.tipo_documento + "-" + $scope.documento + ")",
                                  base64: $scope.Archivo,
                                  ext: "png",
                                  id: $scope.documento
                                });
                                $scope.show_modal = false;
                                $scope.LimpiarCargue();

                                $scope.VentanaCargue = false;
                                $scope.VentanaDigitalizacion = true;
                                $scope.OcultarProceso = false;

                                setTimeout(() => {
                                  $('#click').trigger('click');
                                  swal.close();
                                  $scope.$apply();
                                }, 100);
                              }).catch(function (error) {
                                swal("Error en la libreria domtoimage", "No se realizó la captura de la imagen del Fosyga / ADRES, por favor comunicarse con el área TIC","error");
                              });
                            }, 100);
                        }
                      } else {
                        swal('Mensaje', 'Respuesta erronea del servicio Fosyga / ADRES con el documento: ' + $scope.tipo_documento + '-' + $scope.documento + '<br>Intente hacer el proceso manual descargando el soporte desde la pagina: <br>https://www.adres.gov.co/BDUA/Consulta-Afiliados-BDUA', 'error');
                      }
                    });
                  } else {
                    swal("Mensaje", "El tipo de documento y documento del cotizante no pueden estar vacíos, por favor cerrar Digitalización e ingresar la información requerida", "warning");
                  }
                }
              });
              $scope.procesos = response;
              $scope.cantidad_obligatorio = 0;
              for (var i = 0; i < $scope.procesos.length; i++) {
                if ('S' == $scope.procesos[i].obligatorio) {
                  $scope.cantidad_obligatorio = $scope.cantidad_obligatorio + 1;
                }
              }
              $scope.OcultarTabla = false;
              for (var i = 0; i < $scope.listado.length; i++) {
                if (clasificacion == $scope.listado[i].codigo) {
                  $scope.title = $scope.listado[i].nombre;
                  break;
                }
              }
            }
          })
        } else {
          digitalizacionHTTP.obtenerpaquetes($scope.paquete).then(function (response) {
            $scope.listado = response;
            $scope.listado_tem = response;
          })
        }
        setTimeout(function () {
          $(init);

          function init() {
            $(".droppable-area, .droppable-area1, .droppable-area2, .droppable-area3, .droppable-area4 .droppable-area4").sortable({
              connectWith: ".connected-sortable",
              stack: '.connected-sortable ul'
            }).disableSelection();
          }
        }, 2000);
        var imgW;
        var y = 15;
        var CanvasH = (window.innerHeight - 27);
        $scope.heightCanvas = CanvasH;
        $scope.listaImg = [];

        $scope.drawImg = function () {
          $scope.BloquearTipoProceso = false;
          var x = document.getElementById('myCanvas');
          $scope.canvax = x.getContext('2d'); //getContext untuk mendeklarasikan dimensi canvas yang kita buat di var x
          //var canvax = x.getContext('2d');  //getContext untuk mendeklarasikan dimensi canvas yang kita buat di var x
          var imgElement = document.getElementById('imgCanvas');
          var imgObj = new Image();
          imgObj.src = imgElement.src;
          var imgW = imgObj.width;
          var imgH = imgObj.height;
          $scope.imagw = imgW;
          $scope.imagH = imgH;
          if ($scope.limpio) {
            y = 15;
          }
          $scope.listaImg.push({
            img: imgObj,
            width: imgObj.width,
            height: imgObj.height,
            x: 0,
            y: y,
            codigo: 0
          });
          y += imgH + 15;
          //ev.setData("imgWidth", canvax.imgW);
          if (CanvasH == (window.innerHeight - 27)) {
            CanvasH = (imgH - CanvasH) + CanvasH + 30;
          } else if ($scope.limpio) {
            CanvasH = imgH + 30;
            $scope.limpio = false;
            //$scope.OcultarProceso = false;
          } else {
            CanvasH = CanvasH + imgH + 15;
          }
          imgObj.onload = function () { //load image on canvas
            for (const key in $scope.listaImg) {
              if ($scope.listaImg.hasOwnProperty(key)) {
                const element = $scope.listaImg[key];
                $scope.canvax.drawImage(element.img, element.x, element.y, element.width, element.height);
              }
            }
          }
          x.width = $scope.listaImg[0].width;
          x.height = CanvasH;
        }

        $(document).ready(function () {
          $('.listImg li').draggable({
            containment: 'document',
            opacity: 0.60,
            revert: false,
            helper: 'clone',
            start: function () {
              $('.infoDrag').text('Start Drag');
            },
            drag: function () {
              $('.infoDrag').text('on Dragging');
            },
            stop: function () {
              $('.infoDrag').text('Stop Dragging');
            }
          });
          $('#myCanvas').droppable({
            hoverClass: 'borda',
            tolerance: 'pointer',
            drop: function (ev, ui) {
              var droppedItem = $(ui.draggable).clone();
              var canvasImg = $(this).find('img');
              var newSrc = droppedItem.find('img').attr('src');
              canvasImg.attr("src", newSrc);
              //$scope.BloquearTipoProceso = false;
              $scope.drawImg();
              $scope.$apply();
            }
          });

          $('#myCanvas').dblclick(function () {
            $('#myCanvas').draggable();
          });

        });

        $scope.ConfiguraImpresora = function () {
          scanner.scan(finalizaScan, {
            "use_asprise_dialog": false,
            "show_scanner_ui": true
          });

          function finalizaScan(successful, mesg, response) {
            if (!successful) {
              console.error('Failed: ' + mesg);
              return;
            }
            if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
              console.info('User cancelled');
              return;
            }
            var scannedImages = scanner.getScannedImages(response, true, false);
            var imgs = [];

            for (var i = 0;
              (scannedImages instanceof Array) && i < scannedImages.length; i++) {
              imgs.push(scannedImages[i].src);
            }
          }
        }

        $scope.SubirCarpeta = function () {

          scanner.scan(finalizaScan, {
            "use_asprise_dialog": false,
            "show_scanner_ui": false,
            "detect_blank_pages": true,
            "output_settings": [{
              "type": "return-base64",
              "format": "jpg"
            }]

          });

          function finalizaScan(successful, mesg, response) {
            swal({
              title: 'Cargando Documentos'
            });
            swal.showLoading();
            if (!successful) {
              console.error('Failed: ' + mesg);
              return;
            }
            if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
              console.info('User cancelled');
              return;
            }
            var scannedImages = scanner.getScannedImages(response, true, false);
            var imgs = [];

            for (var i = 0;
              (scannedImages instanceof Array) && i < scannedImages.length; i++) {
              imgs.push(scannedImages[i].src);
            }
            var dataImgs = JSON.stringify(imgs);
            $scope.a = dataImgs;
            $scope.panel = imgs;

            $http({
              method: 'POST',
              url: "php/digitalizacion/funcdigitalizacioncarpeta.php",
              data: {
                img: $scope.panel
              }
            }).then(function (response) {
              if (response.data.length == '0') {
                swal('Informacion', 'Error Al Cargar Los Documentos', 'error');
              } else {
                $scope.rutaimagen = response.data;
                $scope.rutaimagen_temp = response.data;
                $scope.OcultarProceso = false;
                $scope.VentanaCargue = true;
                $scope.VentanaDigitalizacion = false;
                swal.close();
              }
            });
          }
        }

        $scope.ObtenerParametros = function (clasificacion) {
          $scope.clasificacion = clasificacion;

          $scope.array = [];
          digitalizacionHTTP.obtenerparametros(clasificacion, '').then(function (response) {
            if (response.length == '0') {
              swal('Información', 'No Hay Datos', 'info');
              $scope.OcultarTabla = true;
              $scope.procesos = '';
              $scope.array = [];
            } else {
              $scope.procesos = response;

              $scope.ValidoCantidadObligatoriedad();
              $scope.OcultarTabla = false;
              for (var i = 0; i < $scope.listado.length; i++) {
                if (clasificacion == $scope.listado[i].codigo) {
                  $scope.title = $scope.listado[i].nombre;
                  break;
                }
              }
            }

          })
        }

        $scope.ValidoCantidadObligatoriedad = function () {
          $scope.cantidad_obligatorio = 0;
          for (var i = 0; i < $scope.procesos.length; i++) {
            if ('S' == $scope.procesos[i].obligatorio) {
              $scope.cantidad_obligatorio = $scope.cantidad_obligatorio + 1;
            }
          }

        }

        $scope.Convertir64 = function (Codigo) {
          if ($scope.Estado == 'C') {
            for (var i = 0; i < $scope.procesos.length; i++) {
              if (Codigo == $scope.procesos[i].codigo_soporte) {
                $scope.nombre = $scope.procesos[i].nombre;
                $scope.obligatorio = $scope.procesos[i].obligatorio;
                $scope.pos = i;
                break;
              }
            }
            $scope.array.push({
              "base": $scope.file,
              "codigo": Codigo,
              "nombre": $scope.nombre,
              "clasificacion": $scope.clasificacion,
              "paquete": $scope.paquete,
              "obligatorio": $scope.obligatorio,
              "extension": $scope.extencion
            });
            $scope.file = '';
            $scope.Estado = '';
            $scope.TablaDeLosArchivos = false;
            $scope.BloquearTipoProceso = true;
            $scope.procesos.splice($scope.pos, 1);
            $scope.ValidoArchivos();
            $scope.LimpiarCargue();
          } else {
            $scope.codigo = Codigo;
            var $canvas = document.getElementById('myCanvas');
            var foto = $canvas.toDataURL(); //Esta es la foto, en base 64
            var arr = [foto];
            var myJSON = JSON.stringify(arr);

            for (var i = 0; i < $scope.procesos.length; i++) {
              if (Codigo == $scope.procesos[i].codigo_soporte) {
                $scope.nombre = $scope.procesos[i].nombre;
                $scope.obligatorio = $scope.procesos[i].obligatorio;
                $scope.pos = i;
                break;
              }
            }

            //Valido Que Tenga Img El Canvas
            if ($scope.listaImg.length == '0') {
              swal('Información', 'Debe Seleccionar Una Imagen Para Poder Guardar', 'info');

              $scope.ValorProcesos = undefined;
            } else {
              $scope.array.push({
                "base": foto,
                "codigo": Codigo,
                "nombre": $scope.nombre,
                "clasificacion": $scope.clasificacion,
                "paquete": $scope.paquete,
                "obligatorio": $scope.obligatorio
              });
              $scope.TablaDeLosArchivos = false;
              $scope.BloquearTipoProceso = true;
              $scope.procesos.splice($scope.pos, 1);
              $scope.ValidoArchivos();
              $scope.Limpiar();
            }
          }

        }

        $scope.ValidoArchivos = function () {
          $scope.cantidad = 0;
          for (var i = 0; i < $scope.array.length; i++) {
            if ('S' == $scope.array[i].obligatorio) {
              $scope.cantidad = $scope.cantidad + 1;
            }
          }
          if ($scope.cantidad_obligatorio == $scope.cantidad) {
            $scope.OcultarSubirArchivos = false;
            if ($scope.procesos.length == '0') {
              $scope.OcultarTabla = true;
            } else {
              $scope.OcultarTabla = false;
            }
          }
        }

        $scope.SubirPaquete = function () {
          if (true) {
            swal({
              title: 'Subiendo Soportes...',
              //allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            digitalizacionHTTP.subirftp_afiliacion($scope.array, $scope.tipo_documento, $scope.documento).then(function (response) {
              swal.close();
              if (response.codigo == 0 && response.hasOwnProperty('rutas') && response.hasOwnProperty('id')) {
                // response.rutas = JSON.parse(response.rutas);
                $scope.closeThisDialog(response);
              } else if (response.codigo > 0) {
                swal('Información', response.mensaje, 'error');
              } else {
                swal('Información', 'Error Al Subir Archivos Al FTP', 'error');
              }
            })
          } else {
            swal({
              title: 'Subiendo Soportes...',
              allowEscapeKey: false,
              allowOutsideClick: false
            });
            swal.showLoading();
            digitalizacionHTTP.subirftp($scope.array, $scope.tipo_documento, $scope.documento).then(function (response) {
              $scope.resultado = response;
              if ($scope.resultado.length == '0') {
                swal.close();
                swal('Información', 'Error Al Subir Archivos Al FTP', 'info');
              } else {
                digitalizacionHTTP.subirarchivos($scope.tipo_documento, $scope.documento, $scope.clasificacion, JSON.stringify($scope.resultado), $scope.resultado.length).then(function (response) {
                  $scope.res = response;
                  if ($scope.res.coderror == '0') {
                    swal.close();
                    swal('Correctamente', $scope.res.mensaje, 'success');
                    $scope.sendEvent($scope.res.coderror);
                    $scope.closeThisDialog();
                  } else {
                    swal.close();
                    swal('Notificacion', $scope.res.mensaje, 'error');
                  }
                })
              }
            })
          }
        }


        $scope.sendEvent = function (cod) {
          switch ($scope.TipoRes) {
            //Novedad
            case 'NO':
              $rootScope.$emit('Novedades', cod);
              break;
              //Novedad Al Afiliar
            case 'NA':
              $rootScope.$emit('NovedadesActivar', cod);
              break;
              //Consulta Afiliado
            case 'CA':
              $rootScope.$emit('ConsultaAfiliado', cod);
              break;
            case 'AF':
              $rootScope.$emit('AfiliacionLinea', cod);
              break;
              //Gestion De Rechazo
            case 'GR':
              $rootScope.$emit('GestionRechazo', cod);
              break;
            default:
          }
        }


        $scope.LimpiarCanvas = function (inde) {
          if (inde == 'D') {
            if ($scope.rutaimagen == undefined || $scope.rutaimagen.length == '0') {
              swal('Información', 'No se ha digitado ningun tipo de image', 'info');
            } else {
              $("#myCanvas").find('li').remove();
              $("#imgCanvas").removeAttr("src");
              $("#parent").remove();
              $scope.limpio = true;
              $scope.listaImg = [];
              $scope.rutaimagen = [];
              $scope.w = 0;
              $scope.h = 0;
              angular.element(document.getElementById('contiene-canvas')).append($compile("<div id='parent'><canvas id='myCanvas' class='connected-sortable droppable-area2 canvas' width='920' height='" + $scope.heightCanvas + "' style='zoom: 0.9;margin: auto;'><img id='imgCanvas' alt='No Se Puede Vizualiar El Documento'></img></canvas></div>")($scope));
              setTimeout(function () {
                $(init);

                function init() {
                  $(".droppable-area, .droppable-area1, .droppable-area2, .droppable-area3, .droppable-area4 .droppable-area4").sortable({
                    connectWith: ".connected-sortable",
                    stack: '.connected-sortable ul'
                  }).disableSelection();
                }
                $(document).ready(function () {
                  $('.listImg li').draggable({
                    containment: 'document',
                    opacity: 0.60,
                    revert: false,
                    helper: 'clone',
                    start: function () {
                      $('.infoDrag').text('Start Drag');
                    },
                    drag: function () {
                      $('.infoDrag').text('on Dragging');
                    },
                    stop: function () {
                      $('.infoDrag').text('Stop Dragging');
                    }
                  });
                  $('#myCanvas').droppable({
                    hoverClass: 'borda',
                    tolerance: 'pointer',
                    drop: function (ev, ui) {
                      var droppedItem = $(ui.draggable).clone();
                      var canvasImg = $(this).find('img');
                      var newSrc = droppedItem.find('img').attr('src');
                      canvasImg.attr("src", newSrc);
                      $scope.drawImg();
                      $scope.OcultarProceso = false;
                      //$scope.BloquearTipoProceso = false;
                      $scope.$apply();
                    }
                  });

                  $('#myCanvas').dblclick(function () {
                    $('#myCanvas').draggable();
                  });
                }, 2000);


              });
              for (var i = 0; i < $scope.listaImg.length; i++) {
                if ($scope.listaImg[i] == $scope.listaImg[i]) {
                  $scope.w += $scope.listaImg[i].width;
                  $scope.h += $scope.listaImg[i].height;
                }
              }
              $scope.canvax.clearRect(0, 0, $scope.w, ($scope.h + 10));
              $http({
                method: 'POST',
                url: "php/digitalizacion/funcdigitalizacioncarpeta.php",
                data: {
                  img: $scope.panel
                }
              }).then(function (response) {
                if (response.data.length == '0') {
                  swal('Informacion', 'Error Al Cargar Los Documentos', 'error');
                } else {
                  $scope.rutaimagen = response.data;
                  $scope.OcultarProceso = true;
                  $scope.BloquearTipoProceso = true;
                }
              });
            }
          } else {
            $scope.OcultarProceso = true;
            $scope.BloquearTipoProceso = true;
            $scope.LimpiarCargue();
          }


        }

        $scope.Limpiar = function () {
          // $scope.OcultarProceso = true;
          // $scope.OcultarTabla = true;
          // $scope.OcultarSubirArchivos = true;
          // $scope.TablaDeLosArchivos = true;
          // $scope.BloquearTipoProceso = true;
          $scope.listaImg = [];
          $("#myCanvas").find('li').remove();
          $("#imgCanvas").removeAttr("src");
          $("#parent").remove();
          $scope.w = 0;
          $scope.h = 0;
          $scope.limpio = true;
          angular.element(document.getElementById('contiene-canvas')).append($compile("<div id='parent'><canvas id='myCanvas' class='connected-sortable droppable-area2 canvas' width='920' height='" + $scope.heightCanvas + "' style='zoom: 0.9;margin: auto;'><img id='imgCanvas' alt='No Se Puede Vizualiar El Documento'></img></canvas></div>")($scope));
          setTimeout(function () {
            $(init);

            function init() {
              $(".droppable-area, .droppable-area1, .droppable-area2, .droppable-area3, .droppable-area4 .droppable-area4").sortable({
                connectWith: ".connected-sortable",
                stack: '.connected-sortable ul'
              }).disableSelection();
            }
            $(document).ready(function () {
              $('.listImg li').draggable({
                containment: 'document',
                opacity: 0.60,
                revert: false,
                helper: 'clone',
                start: function () {
                  $('.infoDrag').text('Start Drag');
                },
                drag: function () {
                  $('.infoDrag').text('on Dragging');
                },
                stop: function () {
                  $('.infoDrag').text('Stop Dragging');
                }
              });
              $('#myCanvas').droppable({
                hoverClass: 'borda',
                tolerance: 'pointer',
                drop: function (ev, ui) {
                  var droppedItem = $(ui.draggable).clone();
                  var canvasImg = $(this).find('img');
                  var newSrc = droppedItem.find('img').attr('src');
                  canvasImg.attr("src", newSrc);
                  $scope.drawImg();
                  //$scope.BloquearTipoProceso = false;
                  $scope.$apply();
                }
              });

              $('#myCanvas').dblclick(function () {
                $('#myCanvas').draggable();
              });

            });
          }, 2000);


          for (var i = 0; i < $scope.listaImg.length; i++) {
            if ($scope.listaImg[i] == $scope.listaImg[i]) {
              $scope.w += $scope.listaImg[i].width;
              $scope.h += $scope.listaImg[i].height;
            }
          }
          $scope.canvax.clearRect(0, 0, $scope.w, ($scope.h + 10));
        }

      }

      $scope.subirFile = function (value) {
        $scope.panel = [];
        $scope.panelDatos = [];
        var longitud = value.length;
        if (longitud != '0') {
          for (let i = 0; i < longitud; i++) {
            var extencion = value[i].name.split(".");
            $scope.fileToBase64(value[i], value[i].name, extencion[extencion.length - 1], i);
          }
          $scope.VentanaCargue = false;
          $scope.VentanaDigitalizacion = true;
          $scope.OcultarProceso = false;

          setTimeout(() => {
            $('#click').trigger('click');
            $scope.$apply();
          }, 100);
        } else {
          swal('Notificacion', 'Debe Cargar Los Documentos', 'info');
          $scope.OcultarProceso = true;
        }
      }

      $scope.fileToBase64 = function (filesSelected, name, ext, id) {
        var fileToLoad = filesSelected;
        var reader = new FileReader();
        reader.onload = function (e) {
          $scope.panelDatos.push({
            base64: e.target.result,
            name: name,
            ext: ext,
            id: id
          });
          $scope.LimpiarCargue();
        };
        reader.readAsDataURL(fileToLoad);
      }

      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      }

      $scope.VisualizarDocumentos = function (base64, ext) {
        $scope.extencion = '';
        if (ext.toUpperCase() == "PDF") {
          $scope.tipoImgPdf = false;
          $scope.MostrarArchivoDigital = true;
          $scope.MostrarArchivoCargue = false;
          $scope.BloquearTipoProceso = false;
          $scope.file = base64;
          $scope.extencion = ext;
          $scope.Estado = 'C';
          $scope.movie = {
            src: $scope.file
          };

        } else if (ext.toUpperCase() == "JPG" || ext.toUpperCase() == "JPEG" || ext.toUpperCase() == "PNG" || ext.toUpperCase() == "TIFF") {
          $scope.tipoImgPdf = true;
          $scope.MostrarArchivoDigital = true;
          $scope.MostrarArchivoCargue = false;
          $scope.BloquearTipoProceso = false;
          $scope.file = base64;
          $scope.Estado = 'C';
        } else {
          swal('Error', 'Error Al Cargar El Soporte', 'error');
        }

      }



    }
  ]).directive("selectNgFilesm", function () {
    return {
      require: "ngModel",
      link: function postLink($scope, elem, attrs, ngModel) {
        elem.on("change", function (e) {
          var files = elem[0].files;
          var clear = false;
          ngModel.$setViewValue(files);
          $scope.$apply();
        })
      }
    }
  });
