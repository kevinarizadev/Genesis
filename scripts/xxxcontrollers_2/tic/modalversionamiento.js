'use strict';
angular.module('GenesisApp').controller('modalversionamiento', ['$scope', '$http', 'versionamientoHttp', 'ngDialog', '$timeout', '$controller', '$filter',
      function ($scope, $http, versionamientoHttp, ngDialog, $timeout, $controller, $filter, ngChange) {
            $http({
                  method: 'POST',
                  url: "php/genesis/versionamiento/versionamiento.php",
                  data: {
                        function: 'obtenerNotificaciones',
                        cantidad: -1
                  }
            }).then(function (response) {
                  $scope.notifications = "";
                  $scope.notifications = response.data;
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
            $scope.listar_icono = function () {
                  versionamientoHttp.obtenerJsonIconos().then(function (response) {
                        $scope.iconos = response;
                  });
            }
            $scope.titulo = "";
            // Switch que identifica el tipo de modal
            switch ($scope.case) {
                  case 0:
                        $scope.titulo = "Crear Notificación";
                        // Modal de crear una notificacion
                        $scope.listar_icono();
                        $scope.modal = {};
                        $scope.CurrentDate = new Date();
                        $scope.modal.title = "";
                        $scope.modal.description = "";
                        $scope.modal.date = "";
                        $scope.modal.date_ori = new Date($scope.CurrentDate.toString());
                        $scope.modal.hour = new Date($scope.CurrentDate.toString());
                        $scope.modal.area = "";
                        $scope.modal.icon = "zmdi-time";
                        $scope.icon = "";
                        $scope.modal.img_url = "";
                        $scope.img_url = "";
                        $scope.modal.responsable = "";
                        break;
                  case 1:
                        $scope.titulo = "Editar Notificación";
                        // Modal de editar notificacion seleccionada
                        $scope.listar_icono();
                        $scope.modal = {};
                        $scope.modal.id = $scope.id;
                        $scope.modal.title = $scope.title;
                        $scope.modal.description = $scope.description;
                        function toDate(dateStr) {
                              var parts = dateStr.split("/")
                              return new Date(parts[2], parts[1] - 1, parts[0])
                        }
                        function toHour(dateStr) {
                              var parts = new Date();
                              parts.setHours(dateStr.substring(0, dateStr.indexOf(':')), dateStr.substring(dateStr.indexOf(':') + 1, dateStr.indexOf(':') + 3));
                              return new Date(parts.toString())
                        }
                        $scope.modal.date_ori = toDate($scope.date_ori);
                        $scope.modal.hour = toHour($scope.hour);
                        $scope.modal.area = $scope.area;
                        $scope.name_area;
                        $scope.modal.icon = "zmdi-time";
                        $scope.modal.img_url = $scope.img_url;
                        $scope.modal.responsable = $scope.responsable;
                        break;
                  case 2:
                        // Modal de ver la notificacion seleccionada
                        $scope.id;
                        function serachID(obj) {
                              return obj.id === $scope.id;
                        }
                        $scope.notification = $scope.notifications.find(serachID);
                        $scope.titulo = $scope.notification.title;
                        var str = $scope.notification.description;
                        var newStr = "";
                        var temp = "";
                        var bo = true;
                        for (var i = 0; i < str.length; i++) {
                              if (str.charAt(i) == '-') {
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
                        $scope.notification.description = newStr;
                        break;
            }
            $scope.delete == false;
            $scope.delete_img = function () {
                  var imgtag = document.getElementById("imgModal");
                  imgtag.src = "assets/images/versionamiento/null.jpg";
                  imgtag.title = "";
                  $scope.modal.img_url = "";
                  $scope.modal.img = "";
                  $scope.modal.ext = "";
                  $scope.delete = true;
            }
            // Cancelar modal
            $scope.modalClose = function () {
                  $scope.closeThisDialog();
            }
            // Funcion del form crear o editar notificaciones
            $scope.versionamiento_form = function (modal) {
                  modal.date_ori = $filter('date')($scope.modal.date_ori, 'dd/MM/yyyy');
                  modal.hour = $filter('date')($scope.modal.hour, 'h:mm a');
                  if ($scope.modal.img_url == "" && $scope.delete == false) {
                        $scope.modal.img_url = $scope.img_url;
                  } else if ($scope.delete == true) {
                        $scope.modal.img_url = "";
                  }
                  switch ($scope.case) {
                        case 0:
                              // Crear una notificacion
                              $scope.modal.action = "I";
                              if (modal.title != "" && modal.date_ori != "" && modal.hour != "" && modal.date_ori != null && modal.hour != null && modal.responsable != "" && modal.description != "" && modal.area != "" && modal.icon != "") {
                                    var modal = JSON.stringify($scope.modal);
                                    $http({
                                          method: 'POST',
                                          url: "php/genesis/versionamiento/versionamiento.php",
                                          data: {
                                                function: 'guardarNotificaciones',
                                                data: modal
                                          }
                                    }).then(function (response) {
                                          if (response.data.codigo == 0) {
                                                $scope.closeThisDialog(response.data.codigo);
                                                swal('Completado', 'Notificacion guardada exitosamente', 'success');
                                          } else {
                                                swal('Mensaje', response.data.mensaje, 'warning');
                                          };
                                    });
                              } else {
                                    swal('Mensaje', 'Por favor llene todos los campos', 'warning');
                              }
                              break;
                        case 1:
                              // Editar una notificacion
                              $scope.modal.action = "U";
                              if ($scope.modal.area == "") {
                                    $scope.modal.area = $scope.area;
                              }
                              if (modal.title != undefined && modal.title != "" && modal.date_ori != "" && modal.hour != "" && modal.date_ori != null && modal.hour != null && modal.responsable != "" && modal.description != "" && modal.area != "" && modal.icon != "") {
                                    var modal = JSON.stringify($scope.modal);
                                    $http({
                                          method: 'POST',
                                          url: "php/genesis/versionamiento/versionamiento.php",
                                          data: {
                                                function: 'guardarNotificaciones',
                                                data: modal
                                          }
                                    }).then(function (response) {
                                          if (response.data.codigo == 0) {
                                                $scope.closeThisDialog(response.data.codigo);
                                                swal('Completado', 'Notificacion editada exitosamente', 'success');
                                          } else {
                                                swal('Mensaje', response.data.mensaje, 'warning');
                                          };
                                    });
                              } else {
                                    swal('Mensaje', 'Por favor llene todos los campos', 'warning');
                              }
                              break;
                  }

            }
      }
]).directive("selectNgFiles", function () {
      return {
            require: "ngModel",
            link: function postLink($scope, elem, attrs, ngModel) {
                  $scope.modal.img_url;
                  elem.on("change", function (e) {
                        var files = elem[0].files;
                        if (files && this.files[0].type == "image/png" || this.files[0].type == "image/jpeg" || this.files[0].type == "image/jpg" || this.files[0].type == "image/gif") {
                              if (this.files[0].size > 7340032) {
                                    swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
                              } else {
                                    ngModel.$setViewValue(files);
                                    // scope.modal.img_url = "data:image/png;base64," + btoa(JSON.stringify(files));
                                    var selectedFile = e.target.files[0];
                                    var reader = new FileReader();
                                    $scope.imgtag = document.getElementById("imgModal");
                                    $scope.imgtag.title = selectedFile.name;
                                    reader.onload = function (event) {
                                          // $scope.modal.img_url = event.target.result;
                                          $scope.imgtag.src = event.target.result;
                                          $scope.modal.img = $scope.imgtag.src;
                                          $scope.modal.ext = selectedFile.name.split('.').pop();
                                          $scope.delete == false;
                                    };
                                    reader.readAsDataURL(selectedFile);
                              }
                        } else {
                              swal('Advertencia', 'El archivo no es una imagen', 'warning')
                        }
                        // console.log(files);
                  })
            }
      }
});