'use strict';
angular.module('GenesisApp')
  .controller('adminbannergenesisController', ['$scope', '$http',
    function ($scope, $http) {
      var images = [];
      $scope.Inicio = function () {

        $scope.check_option = false;
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
        $scope.sysDate = new Date();
        //
        $scope.images = [];
        //
        $scope.listarImagenesActuales();
        $scope.limpiarInputs();

        setTimeout(() => { $scope.$apply(); }, 500);


      }

      $scope.listarImagenesActuales = function () {
        swal({ title: 'Cargando...' });
        swal.showLoading();
        $scope.images = [];
        $http({
          method: 'POST',
          url: "php/banner/adminbannergenesis.php",
          data: {
            function: 'listarImagenesActual',
          }
        }).then(function ({ data }) {
          if (data.length > 0) {
            swal.close()
            $scope.err = 0;
            $scope.images = data;
            setTimeout(() => { $scope.Iniciar_Drag(); }, 1000);
          } else {
            swal('Mensaje', 'No existen imagenes en el banner', 'info');
          }
        });
      }


      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.subirTemporalImg = function (base64) {
        return new Promise((resolve, reject) => {
          $http({
            method: 'POST',
            url: "php/banner/adminbannergenesis.php",
            data: {
              function: 'subirTemporalImg',
              base64
            }
          }).then(function ({ data }) {
            resolve(data)
          });
        });
      }

      document.querySelector('#files_images').addEventListener('change', function (e) {
        $scope.images = [];
        var files = e.target.files;
        $scope.err = 0;
        $scope.err_msg = '';
        if (files.length != 0) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          for (let i = 0; i < files.length; i++) {
            var x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'JPG' || x[x.length - 1].toUpperCase() == 'PNG') {
              if (files[i].size < 10485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (data) {
                  $scope.subirTemporalImg(data).then(function (res) {
                    $scope.images.push({ url: res })
                  });
                });
              } else {
                $scope.err += 1;
                $scope.err_msg = '¡Uno de los archivos seleccionados excede el peso máximo posible (1MB)!';
              }
            } else {
              $scope.err += 1;
              $scope.err_msg = '¡Los archivos seleccionados deben ser formato JPG o PNG!';
            }
            if (i == files.length - 1) {
              setTimeout(() => {
                setTimeout(() => { $scope.$apply(); }, 200);
                $scope.Validar_Files()
              }, 3000);
            }
          }
        }
      });

      $scope.Validar_Files = function () {

        if ($scope.err == 0) {
          setTimeout(() => {
            $scope.limpiarInputs();
            $scope.validaTamanoImagenes();
          }, 2000);
          // setTimeout(() => { swal.close(); $scope.Iniciar_Drag(); }, 3000);
        } else {
          $scope.limpiarInputs();
          swal('Advertencia', $scope.err_msg, 'info');
        }
      }


      document.querySelector('#files_images_add').addEventListener('change', function (e) {
        images = $scope.images;
        $scope.images = [];
        $scope.images_add = [];
        var files = e.target.files;
        $scope.err_add = 0;
        $scope.err_msg_add = '';
        if (files.length != 0) {
          swal({ title: 'Cargando...' });
          swal.showLoading();
          for (let i = 0; i < files.length; i++) {
            var x = files[i].name.split('.');
            if (x[x.length - 1].toUpperCase() == 'JPG' || x[x.length - 1].toUpperCase() == 'PNG') {
              if (files[i].size < 1048576 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (data) {
                  $scope.images_add.push({ url: data })
                });
              } else {
                $scope.err_add += 1;
                $scope.err_msg_add = '¡Uno de los archivos seleccionados excede el peso máximo posible (1MB)!';
              }
            } else {
              $scope.err_add += 1;
              $scope.err_msg_add = '¡Los archivos seleccionados deben ser formato JPG o PNG!';
            }
            if (i == files.length - 1) {
              setTimeout(() => {
                setTimeout(() => { $scope.$apply(); }, 200);
                $scope.Validar_Files_add()
              }, 3000);
            }
          }
        } else {
          $scope.limpiarInputs();
        }
      });

      $scope.Validar_Files_add = function () {

        if ($scope.err_add == 0) {
          $scope.images_add.forEach(e => {
            $scope.subirTemporalImg(e.url).then(function (res) {
              images.push({ url: res })
            });
            // images.push({ url: e.url })
          });
          setTimeout(() => { $scope.images = images; $scope.$apply(); }, 500);
          setTimeout(() => {
            $scope.limpiarInputs();
            $scope.validaTamanoImagenes();
          }, 2000);
          // setTimeout(() => { $scope.images_add = []; swal.close(); $scope.Iniciar_Drag(); }, 3000);
        } else {
          $scope.images = images;
          $scope.limpiarInputs();
          swal('Advertencia', $scope.err_msg_add, 'info');
        }
      }


      $scope.limpiarInputs = function () {
        document.querySelector('#files_images_add').value = '';
        // $scope.images = [];
        $scope.images_add = [];
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.Guardar_Images = function () {

        swal({
          title: '¿Desea guardar las imagenes?',
          // text: Cal_Final,
          type: 'question',
          showCancelButton: true,
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
          allowOutsideClick: false
        }).then(function (result) {
          if (result) {
            //
            $scope.Json_images = [];
            swal({ title: 'Eliminando anteriores...', allowOutsideClick: false });
            swal.showLoading();
            $http({
              method: 'POST',
              url: "php/banner/adminbannergenesis.php",
              data: {
                function: 'limpiarDir'
              }
            });
            //
            setTimeout(() => {
              swal({ title: 'Subiendo imagenes...', allowOutsideClick: false });
              swal.showLoading();
              // $scope.images.forEach(element => {
              // });
              // document.querySelector('#drag-list>div');
              var images = document.querySelectorAll('.drag-list div img');//[0].src;
              let num = $scope.getRandomArbitrary(1, 10000).toFixed(0)
              for (var i = 0; i < images.length; i++) {
                // x.split("/")[(x.split("/").length) - 1]
                //

                const xnum = parseInt(num) + parseInt(i);
                $http({
                  method: 'POST',
                  url: "php/banner/adminbannergenesis.php",
                  data: {
                    function: 'guardarFiles',
                    archivo: images[i].src.split("/")[(images[i].src.split("/").length) - 1],
                    nombre: "image_" + xnum + "." + images[i].src.split(".")[(images[i].src.split(".").length) - 1]
                  }
                }).then(function ({ data }) {
                  setTimeout(() => { $scope.$apply(); }, 100);
                });
                //
                if (i == images.length - 1) {
                  setTimeout(() => {
                    setTimeout(() => { $scope.$apply(); }, 200);
                    $scope.Inicio()
                  }, 3000);
                }
              }
            }, 1000);

          }
        }).catch(swal.noop);
      }


      $scope.eliminarImagen = function (index) {
        swal({ title: 'Eliminando...' });
        swal.showLoading();
        images = $scope.images;
        $scope.images = []
        images.splice(index, 1);
        setTimeout(() => {
          images.forEach(element => {
            $scope.images.push({ url: element })
          });
          $scope.images = images;
          $scope.$apply();
        }, 500);
        setTimeout(() => {
          $scope.Iniciar_Drag();
          swal.close();
        }, 2000);
      }

      $scope.validaTamanoImagenes = function () {
        let count = 0;
        images = $scope.images;
        $scope.images = []
        document.querySelectorAll(".drag-item>img").forEach((e, index) => {
          if (e.naturalWidth != 1920 || e.naturalHeight != 720) {
            count++;
            images.splice(index, 1);
          }
          if (document.querySelectorAll(".drag-item>img").length == index + 1) {
            setTimeout(() => {
              images.forEach(element => {
                $scope.images.push({ url: element })
              });
              $scope.images = images;
              $scope.$apply();
            }, 500);

            if (count != 0) {
              swal('Mensaje', "Se quitaron las imagenes que no concuerdan con el tamaño 1920x720", 'info');
              setTimeout(() => {
                $scope.Iniciar_Drag();
                // swal.close();
              }, 2000);
            }
          }
        });
      }



      $scope.Iniciar_Drag = function () {
        // debugger
        function DragNSort(config) {
          this.$activeItem = null;
          this.$container = config.container;
          this.$items = this.$container.querySelectorAll('.' + config.itemClass);
          this.dragStartClass = config.dragStartClass;
          this.dragEnterClass = config.dragEnterClass;
        }

        DragNSort.prototype.removeClasses = function () {
          [].forEach.call(this.$items, function ($item) {
            $item.classList.remove(this.dragStartClass, this.dragEnterClass);
          }.bind(this));
        };

        DragNSort.prototype.on = function (elements, eventType, handler) {
          [].forEach.call(elements, function (element) {
            element.addEventListener(eventType, handler.bind(element, this), false);
          }.bind(this));
        };

        DragNSort.prototype.onDragStart = function (_this, event) {
          _this.$activeItem = this;

          this.classList.add(_this.dragStartClass);
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('text/html', this.innerHTML);
        };

        DragNSort.prototype.onDragEnd = function (_this) {
          this.classList.remove(_this.dragStartClass);
        };

        DragNSort.prototype.onDragEnter = function (_this) {
          this.classList.add(_this.dragEnterClass);
        };

        DragNSort.prototype.onDragLeave = function (_this) {
          this.classList.remove(_this.dragEnterClass);
        };

        DragNSort.prototype.onDragOver = function (_this, event) {
          if (event.preventDefault) {
            event.preventDefault();
          }

          event.dataTransfer.dropEffect = 'move';

          return false;
        };

        DragNSort.prototype.onDrop = function (_this, event) {
          if (event.stopPropagation) {
            event.stopPropagation();
          }

          if (_this.$activeItem !== this) {
            _this.$activeItem.innerHTML = this.innerHTML;
            this.innerHTML = event.dataTransfer.getData('text/html');
          }

          _this.removeClasses();
          document.querySelectorAll(".btnsEliminar").forEach(element => {
            element.remove()
          });

          return false;
        };

        DragNSort.prototype.bind = function () {
          this.on(this.$items, 'dragstart', this.onDragStart);
          this.on(this.$items, 'dragend', this.onDragEnd);
          this.on(this.$items, 'dragover', this.onDragOver);
          this.on(this.$items, 'dragenter', this.onDragEnter);
          this.on(this.$items, 'dragleave', this.onDragLeave);
          this.on(this.$items, 'drop', this.onDrop);
        };

        DragNSort.prototype.init = function () {
          this.bind();
        };

        // Instantiate
        var draggable = new DragNSort({
          container: document.querySelector('.drag-list'),
          itemClass: 'drag-item',
          dragStartClass: 'drag-start',
          dragEnterClass: 'drag-enter'
        });
        draggable.init();
      }

      $scope.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
      }


      $(window).on('resize', function () {
        if ($(window).width() < 1100) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
          document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1300 && $(window).width() < 1500) {
          document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1500) {
          document.querySelector("#pantalla").style.zoom = 0.9;
        }
      });
      if (document.readyState !== 'loading') {
        setTimeout(() => {
          $scope.Inicio();
        }, 1000);
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          $scope.Inicio();
        });
      }

    }])
