'use strict';
angular.module('GenesisApp')
    .controller('usuariosipsautorizarController', ['$scope', 'notification', 'cfpLoadingBar', '$http', 'ngDialog',
        function ($scope, notification, cfpLoadingBar, $http, ngDialog) {



            $(document).ready(function () {
                $scope.Obtener_Listado();
                $scope.Obtener_Listado_tercero();
                $scope.documento = sessionStorage.getItem('cedula');
                $scope.sysdate = new Date();
                console.log($(window).width());
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
                document.querySelector("#content").style.backgroundColor = "white";

                $scope.Tabs = 0;
                $('.tabs').tabs();
                $scope.Vista = 0;
                $scope.Tap = 1;
                $('.tabs').tabs();

                setTimeout(() => {
                    $scope.$apply();
                }, 500);

                $('#modallistadoipscontratada').modal();
                $('#modalterceros').modal();
            });

            $scope.setTab = function (x) {
                $scope.Tap = x;
                setTimeout(function () {
                  $scope.$apply();
                }, 500)
              }

            $scope.filterOptions = "1";
            $scope.codigoips = "";
            $scope.listadoipsblanca = "";
            $scope.vertablaconusuarios = true;
            $scope.documentousuario = "";
            $scope.valorsignar = "";
            $scope.techoasignar = "";
            $scope.estadoasignar = "";
            $scope.excepcionasignar = "";



            $scope.closemodals = function () {
                $("#modallistadoipscontratada").modal("close");
            }
            $scope.abrirmodallistadoips = function () {
                $('#modallistadoipscontratada').modal("open");
                $scope.vertablaconusuarios = true;
                $scope.listadoipsblanca = "";
                $scope.codigoips = "";
            }
            $scope.cerrarmodal = function () {
                $("#modalterceros").modal("close");
            }
            $scope.abrirmodal = function () {
                $('#modalterceros').modal("open");
                $scope.listadoipsblanca = "";
                $scope.codigoips = "";
            }

            function formatDate(date) {
                var d = new Date(date);
                var dd = ('0' + d.getDate()).slice(-2);
                var mm = ('0' + (d.getMonth() + 1)).slice(-2);
                var yyyy = d.getFullYear();
                var hh = d.getHours();
                var mi = d.getMinutes();
                return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
            }
            $scope.formatPeso = function (num) {
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
                  return num[0] + ',' + num[1];
                } else {
                  num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                  num = num.split('').reverse().join('').replace(/^[\.]/, '');
                  return num + ',00';
                }
              }

              $scope.FormatPesoColombiano = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[^0-9,]/g, '');
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
            $scope.Obtener_Listado = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/usuariosipsautorizar.php",
                    data: {
                        function: 'obtener_Listado_ips_usuario',
                        tipo: 'F',
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.listadoipsusuarios = response.data;
                        $scope.filtroipslistado = "";
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                });
            }
            $scope.Obtener_Listado_tercero = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/usuariosipsautorizar.php",
                    data: {
                        function: 'obtener_Listado_ips_usuario',
                        tipo: 'T',
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.listadotercerousuarios = response.data;
                        $scope.filtrotercerolistado = "";
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                });
            }
          

            $scope.Obtener_Listadobusqueda = function (codigobusqueda,tipo) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/usuariosipsautorizar.php",
                    data: {
                        function: 'obtener_Listado',
                        codigo: codigobusqueda,
                        tipo: tipo,
                    }
                }).then(function (response) {
                    if (response.data && response.data.toString().substr(0, 3) != '<br') {
                        $scope.listadoipsblanca = response.data;
                    } else {
                        swal({
                            title: "¡Ocurrio un error!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                });
            }

            $scope.verformulario = function(datousuario,nombre) {
                $scope.botonatras = true;
                $scope.nombrefuncionario = nombre;
                $scope.documentousuario = datousuario;
                $scope.vertablaconusuarios = false;
                $scope.valorsignar = "";
                $scope.techoasignar = "";
                $scope.estadoasignar = "A";
                $scope.excepcionasignar = "";
                $scope.deshabilitarcampo = true;
            }
            $scope.actualizarfuncionario = function(datousuario) {
                $scope.botonatras = false;
                $scope.abrirmodallistadoips();
                $scope.nombrefuncionario = datousuario.nombre;
                $scope.documentousuario = datousuario.documento;
                $scope.valorsignar = datousuario.valor;
                $scope.techoasignar = datousuario.techo;
                $scope.estadoasignar = datousuario.estado;
                $scope.excepcionasignar = datousuario.excepcion;
                $scope.vertablaconusuarios = false;
                $scope.deshabilitarcampo = false;
            }

            $scope.Guardarfuncionario = function (accionejecutar) {
                if($scope.documentousuario == "" || $scope.documentousuario == null || $scope.documentousuario == undefined ||
                $scope.valorsignar == "" || $scope.valorsignar == null || $scope.valorsignar == undefined ||
                $scope.techoasignar == "" || $scope.techoasignar == null || $scope.techoasignar == undefined ||
                $scope.excepcionasignar == "" || $scope.excepcionasignar == null || $scope.excepcionasignar == undefined) {
                    swal("Importante", "Diligenciar los campos", "info");
                } else {
                swal({
                    title: 'Confirmar',
                    text: '¿Esta seguro De Guardar ?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/usuariosipsautorizar.php",
                        data: {
                            function: 'Cambiar_estado_Usuario',
                            documentousuario:$scope.documentousuario,
                            valorsignar:$scope.valorsignar.toString().replace(/[^0-9]/g, ''),
                            techoasignar:$scope.techoasignar,
                            excepcionasignar:$scope.excepcionasignar,
                            estado:$scope.estadoasignar,
                            accion: accionejecutar,
                            estado2:""
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            $scope.documentousuario = "";
                            $scope.valorsignar = "";
                            $scope.techoasignar = "";
                            $scope.excepcionasignar = "";
                            $scope.Obtener_Listado();
                            $scope.vertablaconusuarios = true;
                            $scope.closemodals();
                            swal("Exito", "Actualizado Correctamente", "success");
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
                })
            }
            }
            $scope.cambiarestado = function (nit,estado) {
                swal({
                    title: 'Confirmar',
                    text: '¿Esta seguro De Guardar ?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/usuariosipsautorizar.php",
                        data: {
                            function: 'Cambiar_estado_Usuario',
                            documentousuario: nit,
                            valorsignar:"",
                            techoasignar:"",
                            excepcionasignar:"",
                            estado: "",
                            accion: "T",
                            estado2:estado
                        }
                    }).then(function (response) {
                        if (response.data && response.data.toString().substr(0, 3) != '<br') {
                            $scope.Obtener_Listado_tercero();
                            $scope.cerrarmodal();
                            swal("Exito", "Actualizado Correctamente", "success");
                        } else {
                            swal({
                                title: "¡Ocurrio un error!",
                                text: response.data,
                                type: "warning"
                            }).catch(swal.noop);
                        }
                    });
                })
            }



        }])

    