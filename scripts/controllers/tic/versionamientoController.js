'use strict';
angular.module('GenesisApp')
  .controller('versionamientoController', ['$scope', '$http', 'versionamientoHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
    function ($scope, $http, versionamientoHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
      // Muestra el editar y crear del time line
      $.getJSON("php/obtenersession.php").done(function (respuesta) {
        $scope.sesdata = respuesta;
        if ($scope.sesdata.rolcod == 0) {
          $scope.role = true;
        } else {
          $scope.role = false;
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error obteniendo session variables");
      });
      $http({
        method: 'POST',
        url: "php/genesis/versionamiento/versionamiento.php",
        data: {
          function: 'listaAreas'
        }
      }).then(function (response) {
        $scope.areas = response.data;
      });
      // Traer todas las notificaiones desde la DB
      $scope.list_notifi = function () {
        $http({
          method: 'POST',
          url: "php/genesis/versionamiento/versionamiento.php",
          data: {
            function: 'obtenerNotificaciones',
            cantidad: -1
          }
        }).then(function (response) {
          $scope.notifications = response.data;
          $scope.groupBy = function (json, prop) {
            return json.reduce(function (groups, item) {
              // Filtro por fecha
              function filterItems(query) {
                return json.filter(function (el) {
                  return el.date_ori === query;
                })
              }
              var val = item[prop];
              groups[val] = { date_ori: item[prop] };
              groups[val].data = filterItems(item.date_ori);
              return groups
            }, {});
          }
          $scope.notifications = $scope.groupBy($scope.notifications, 'date_ori');
          var sortable = [];
          var temp;
          for (var i in $scope.notifications) {
            for (let j in $scope.notifications[i]) {
              temp = $scope.notifications[i][j];
            }
            sortable.push([i, temp]);
          }

          sortable.sort(function (a, b) {
            return a[1] - b[1];
          });
          $scope.notifications = sortable;
          $("html, body").scrollTop(0);
        });
      };
      $scope.list_notifi();
      // Find List to string
      $scope.IdentList = function (description) {
        var str = description;
        var newStr = "";
        var temp = "";
        var bo = true;
        for (var i = 0; i < str.length; i++) {
          if (str.charAt(i) == '-' && bo == true) {
            temp = '<li>';
            bo = false;
          } else if (str.charAt(i) == '.' && bo == false) {
            temp = '.</li>';
            bo = true;
          } else {
            temp = str.charAt(i)
          }
          newStr += temp;
        }
        return newStr;
      }
      $scope.CurrentDate = new Date();
      // Devuelve la fecha actual en un formato m/d/a
      $scope.formatDate = function (date) {
        var dia = date.getDate();
        var mes = date.getMonth() + 1;
        var año = date.getFullYear();
        return mes + '/' + dia + '/' + año;
      }
      // Convierte la fecha que trae de la BD
      $scope.convertDate = function (date) {
        var convDate = new Date(date);
        convDate = convDate.toLocaleDateString();
        return convDate;
      }
      // Funcion al hacer click en crear
      $scope.create_notifi = function () {
        $scope.case = 0;
        ngDialog.open({
          template: 'views/tic/modal/modalversionamiento.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalversionamiento',
          scope: $scope,
          preCloseCallback: function (response) {
            if (response == 0) {
              $scope.inputText = "";
              $scope.selectText = "";
              $scope.list_notifi();
            }
            return true;
          }
        })
      };
      // Funcion al hacer click en editar
      $scope.edit_notifi = function (id, title, description, date_ori, hour, area, name_area, icon, img_url, responsable) {
        $scope.case = 1;
        $scope.id = id;
        $scope.title = title;
        $scope.description = description;
        $scope.date_ori = date_ori;
        $scope.hour = hour;
        $scope.area = area;
        $scope.name_area = name_area;
        $scope.icon = icon;
        $scope.img_url = img_url;
        $scope.responsable = responsable;
        ngDialog.open({
          template: 'views/tic/modal/modalversionamiento.html',
          className: 'ngdialog-theme-plain',
          controller: 'modalversionamiento',
          scope: $scope,
          preCloseCallback: function (response) {
            if (response == 0) {
              $scope.inputText = "";
              $scope.selectText = "";
              $scope.list_notifi();
            }
            return true;
          }
        })
      };
      // Funcion al hacer click en eliminar
      $scope.delete_notifi = function (id) {
        if (id) {
          swal({
            title: 'Confirmar Proceso',
            text: "¿Desea eliminar la notificacion #" + id + "?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then(function (result) {
            if (result) {
              $scope.modal = {};
              $scope.modal.action = "D";
              $scope.modal.id = id;
              var modal = JSON.stringify($scope.modal);
              $http({
                method: 'POST',
                url: "php/genesis/versionamiento/versionamiento.php",
                data: {
                  function: 'eliminarNotificaciones',
                  data: modal
                }
              }).then(function (response) {
                $scope.inputText = "";
                $scope.selectText = "";
                $scope.list_notifi();
              });
            }
          }).catch(swal.noop);
        }
      };
      // var counter = 2;
      // $scope.loadMore = function () {
      //   counter += 1;
      //   $scope.list_notifi(counter);
      //   console.log("scroll"+counter);
      // };
      // .directive('whenScrolled', function () {
      //   return function (scope, elm, attr) {
      //     var raw = elm[0];
      //     elm.bind('scroll', function () {
      //       if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
      //         scope.$apply(attr.whenScrolled);
      //       }
      //     });
      //   };
      // });
    }])