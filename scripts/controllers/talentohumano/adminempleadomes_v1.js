'use strict';
angular.module('GenesisApp')
  .controller('adminempleadomesController', ['$scope', '$http',
    function ($scope, $http) {

      $scope.Inicio = function () {

        $scope.check_option = false;
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';
        $scope.sysDate = new Date();
        //
        $scope.images = [];
        $scope.Validar_Check();
        //
        setTimeout(() => { $scope.$apply(); }, 500);
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
            if (x[x.length - 1].toUpperCase() == 'JPG') {
              if (files[i].size < 10485760 && files[i].size > 0) {
                $scope.getBase64(files[i]).then(function (data) {
                  $scope.images.push({ url: data })
                });
              } else {
                $scope.err += 1;
                $scope.err_msg = '¡Uno de los archivos seleccionados excede el peso máximo posible (1MB)!';
              }
            } else {
              $scope.err += 1;
              $scope.err_msg = '¡Los archivos seleccionados deben ser formato JPG!';
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
      $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      $scope.Validar_Files = function () {
        if ($scope.err == 0) {
          swal.close();
          setTimeout(() => { $scope.Iniciar_Drag(); }, 1000);
        } else {
          $scope.Atras();
          swal('Advertencia', $scope.err_msg, 'info');
        }
      }


      $scope.Atras = function () {
        document.querySelector('#files_images').value = '';
        $scope.images = [];
        setTimeout(() => { $scope.$apply(); }, 500);
      }

      $scope.Guardar_Images = function () {
        $scope.Json_images = [];
        swal({ title: 'Eliminando anteriores...', allowOutsideClick: false });
        swal.showLoading();
        $http({
          method: 'POST',
          url: "php/talentohumano/adminempleadomes.php",
          data: {
            function: 'limpiarDir'
          }
        });
        //
        setTimeout(() => {
          swal({ title: 'Subiendo imagenes...', allowOutsideClick: false });
          swal.showLoading();
          document.querySelector('#drag-list>div');
          var images = document.querySelectorAll('.drag-list div img');//[0].src;
          for (var i = 0; i < images.length; i++) {
            //
            $http({
              method: 'POST',
              url: "php/talentohumano/adminempleadomes.php",
              data: {
                function: 'guardarFiles',
                base: images[i].src,
                nombre: "image_" + ((i < 9 ? '0' + (i + 1) : (i + 1))) + ".jpg"
              }
            }).then(function ({ data }) {
              $scope.Json_images.push({ ruta: data });
              setTimeout(() => { $scope.$apply(); }, 100);
            });
            //
          }
        }, 1000);
        setTimeout(() => {
          //
          console.log($scope.Json_images)
          swal({ title: 'Guardando imagenes...', allowOutsideClick: false });
          swal.showLoading();
          $http({
            method: 'POST',
            url: "php/talentohumano/adminempleadomes.php",
            data: {
              function: 'guardarRutas',
              rutas: JSON.stringify($scope.Json_images),
              longitud: $scope.Json_images.length,
              responsable: sessionStorage.getItem('cedula')
            }
          }).then(function ({ data }) {
            if (data.codigo == 0) {
              swal('Advertencia', data.mensaje, 'success').catch(swal.noop);
              $scope.Atras();
            } else {
              swal('Advertencia', data.mensaje, 'info').catch(swal.noop);
            }
          });
        }, 4000);
      }

      $scope.Validar_Check = function () {
        $http({
          method: 'POST',
          url: "php/talentohumano/adminempleadomes.php",
          data: {
            function: 'litarEmpleadosMes',
          }
        }).then(function (response) {
          $scope.check_option = response.data[1].estado.estado != 'A' ? true : false;
          console.log($scope.check_option);
        });
      }

      $scope.Guardar_Check = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        var estado = $scope.check_option != true ? 'A' : 'I';
        var toast = estado == 'A' ? 'Habilitado' : 'inhabilitado'
        $http({
          method: 'POST',
          url: "php/talentohumano/adminempleadomes.php",
          data: {
            function: 'swEmpleadoMes',
            estado: estado,
          }
        }).then(function () {
          var text = '¡Carousel ' + toast + '!';
          swal("Mensaje", text, "success").catch(swal.noop);
          // Materialize.toast('¡Carousel ' + toast + '!', 1000);
        });
      }


      $scope.Iniciar_Drag = function () {
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
          // console.log(_this)
          if (event.stopPropagation) {
            event.stopPropagation();
          }

          if (_this.$activeItem !== this) {
            _this.$activeItem.innerHTML = this.innerHTML;
            this.innerHTML = event.dataTransfer.getData('text/html');
          }

          _this.removeClasses();

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
