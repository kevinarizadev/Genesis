'use strict';
angular.module('GenesisApp').controller('modificarjefeController', ['$scope', '$http', 'acasHttp', 'ngDialog', function ($scope, $http, acasHttp, ngDialog) {
    $scope.vista = { panel_1: true, panel_2: false, panel_title_2: false };
    $scope.filter_datos_1 = [{ nombre: "TODOS", codigo: "T" }, { nombre: "ROL", codigo: "R" }, { nombre: "AREA", codigo: "A" }, { nombre: "CARGO", codigo: "C" }];
    $scope.filter_fun_1 = "";
    $scope.filter_fun_2 = "";
    $scope.form = {
        cedula: "",
        nombre: "",
        cedula_user: "",
        nombre_user: "",
        ccargo: "",
        ncargo: ""
    };
    $scope.filter_datos_2 = [{ nombre: "SELECCIONAR", codigo: "" }];
    $scope.lis_users = [];
    $scope.change_filter_fun_1 = function (type_filter_1) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        switch (type_filter_1) {
            case "T":
                $scope.clear_all_check();
                $http({
                    method: 'POST',
                    url: "php/tic/configuracionacceso/configuracionacceso.php",
                    data: {
                        function: 'get_funcionarios',
                        filtro: "T",
                        codigo: "0"
                    }
                }).then(function (response) {
                    if (response.data.length > 0 && Array.isArray(response.data)) {
                        $scope.lis_users = response.data;
                    } else {
                        $scope.lis_users = [];
                    }
                    swal.close();
                });
                break;
            case "R":
                $http({
                    method: 'POST',
                    url: "php/tic/configuracionacceso/configuracionacceso.php",
                    data: {
                        function: 'get_selet_rol'
                    }
                }).then(function (response) {
                    if (response.data.length > 0 && Array.isArray(response.data)) {
                        $scope.filter_datos_2 = response.data;
                    } else {
                        $scope.filter_datos_2 = [];
                    }
                    $scope.lis_users = [];
                    swal.close();
                });
                break;
            case "A":
                $http({
                    method: 'POST',
                    url: "php/tic/configuracionacceso/configuracionacceso.php",
                    data: {
                        function: 'get_selet_area'
                    }
                }).then(function (response) {
                    if (response.data.length > 0 && Array.isArray(response.data)) {
                        $scope.filter_datos_2 = response.data;
                    } else {
                        $scope.filter_datos_2 = [];
                    }
                    $scope.lis_users = [];
                    swal.close();
                });
                break;
            case "C":
                $http({
                    method: 'POST',
                    url: "php/tic/configuracionacceso/configuracionacceso.php",
                    data: {
                        function: 'get_selet_cargo'
                    }
                }).then(function (response) {
                    if (response.data.length > 0 && Array.isArray(response.data)) {
                        $scope.filter_datos_2 = response.data;
                    } else {
                        $scope.filter_datos_2 = [];
                    }
                    $scope.lis_users = [];
                    swal.close();
                });
                break;
            default:
                $scope.lis_users = [];
                $scope.filter_datos_2 = [{ nombre: "SELECCIONAR", codigo: "" }];
                swal.close();
                break;
        }
        $scope.filter_fun_2 = "";
    }

    $scope.change_filter_fun_2 = function (type_filter_1, codigo_filter_1) {
        swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
        });
        if (codigo_filter_1 != "" && type_filter_1 != "") {
            $scope.clear_all_check();
            switch (type_filter_1) {
                case "R":
                    $http({
                        method: 'POST',
                        url: "php/tic/configuracionacceso/configuracionacceso.php",
                        data: {
                            function: 'get_funcionarios',
                            filtro: "R",
                            codigo: codigo_filter_1
                        }
                    }).then(function (response) {
                        if (response.data.length > 0 && Array.isArray(response.data)) {
                            $scope.lis_users = response.data;
                        } else {
                            $scope.lis_users = [];
                        }
                        swal.close();
                    });
                    break;
                case "A":
                    $http({
                        method: 'POST',
                        url: "php/tic/configuracionacceso/configuracionacceso.php",
                        data: {
                            function: 'get_funcionarios',
                            filtro: "A",
                            codigo: codigo_filter_1
                        }
                    }).then(function (response) {
                        if (response.data.length > 0 && Array.isArray(response.data)) {
                            $scope.lis_users = response.data;
                        } else {
                            $scope.lis_users = [];
                        }
                        swal.close();
                    });
                    break;
                case "C":
                    $http({
                        method: 'POST',
                        url: "php/tic/configuracionacceso/configuracionacceso.php",
                        data: {
                            function: 'get_funcionarios',
                            filtro: "C",
                            codigo: codigo_filter_1
                        }
                    }).then(function (response) {
                        if (response.data.length > 0 && Array.isArray(response.data)) {
                            $scope.lis_users = response.data;
                        } else {
                            $scope.lis_users = [];
                        }
                        swal.close();
                    });
                    break;
                default:
                    $scope.lis_users = [];
                    $scope.filter_datos_2 = [{ nombre: "SELECCIONAR", codigo: "" }];
                    swal.close();
                    break;
            }
        }
    }
    $scope.editarUser = function (user) {
        $http({
            method: 'POST',
            url: "php/tic/modificarjefe/modificarjefe.php",
            data: {
                function: 'obtener_datos_jefe',
                cedula: user.cedula
            }
        }).then(function (response) {
            if (response.data[0].codigo == 0) {
                $scope.vista.panel_2 = true;
                $scope.vista.panel_title_2 = true;
                $scope.form.cedula = "0";
                $scope.form.nombre = "Sin asignar";
                $scope.form.cedula_user = user.cedula;
                $scope.form.nombre_user = user.nombre;
                $scope.form.ccargo = "0";
                $scope.form.ncargo = "Sin asignar";
            } else {
                $scope.vista.panel_2 = true;
                $scope.vista.panel_title_2 = true;
                $scope.form.cedula = response.data[0].cedula;
                $scope.form.nombre = response.data[0].nombre;
                $scope.form.cedula_user = user.cedula;
                $scope.form.nombre_user = user.nombre;
                $scope.form.ccargo = response.data[0].cod_cargo;
                $scope.form.ncargo = response.data[0].cargo;
            }
        });
    }
    $scope.check_user = [];
    $scope.list_users_update_boss = [];
    $scope.select_all = false;
    $scope.checkbox_select_users = function (index, check_value, user) {
        $scope.vista.panel_2 = true;
        $scope.vista.panel_title_2 = false;
        $scope.lis_users[index].checked = !$scope.lis_users[index].checked;
        if (check_value) {
            var i = $scope.list_users_update_boss.findIndex(elemt => elemt.cedula == user.cedula);
            if (i == -1) {
                $http({
                    method: 'POST',
                    url: "php/tic/modificarjefe/modificarjefe.php",
                    data: {
                        function: 'obtener_datos_jefe',
                        cedula: user.cedula
                    }
                }).then(function (response) {
                    if (response.data[0].codigo == 0) {
                        $scope.list_users_update_boss.push({ cedula: user.cedula, nombre: user.nombre, cedula_jefe: "0", jefe: "Sin asignar", cod_cargo_jefe: "0", cargo_jefe: "Sin asignar", tipo: "I" });
                    } else {
                        $scope.list_users_update_boss.push({ cedula: user.cedula, nombre: user.nombre, cedula_jefe: response.data[0].cedula, jefe: response.data[0].nombre, cod_cargo_jefe: response.data[0].cod_cargo, cargo_jefe: response.data[0].cargo, tipo: "A" });
                    }
                });
            } else {
                console.log("Usuario repetido: " + user.cedula);
            }
        } else {
            $scope.select_all = false;
            var i = $scope.list_users_update_boss.findIndex(elemt => elemt.cedula == user.cedula);
            if (i != -1) {
                $scope.list_users_update_boss.splice(i, 1);
            }
        }
    }
    $scope.checkboxAllSelect = function (check_value) {
        if ($scope.lis_users.length > 0) {
            $scope.vista.panel_2 = true;
            $scope.vista.panel_title_2 = false;
            if (check_value) {
                $scope.lis_users.forEach(function (element, index) {
                    var i = $scope.list_users_update_boss.findIndex(elemt => elemt.cedula == element.cedula);
                    if (i == -1) {
                        $http({
                            method: 'POST',
                            url: "php/tic/modificarjefe/modificarjefe.php",
                            data: {
                                function: 'obtener_datos_jefe',
                                cedula: element.cedula
                            }
                        }).then(function (response) {
                            if (response.data[0].codigo == 0) {
                                $scope.list_users_update_boss.push({ cedula: element.cedula, nombre: element.nombre, cedula_jefe: "0", jefe: "Sin asignar", cod_cargo_jefe: "0", cargo_jefe: "Sin asignar", tipo: "I" });
                            } else {
                                $scope.list_users_update_boss.push({ cedula: element.cedula, nombre: element.nombre, cedula_jefe: response.data[0].cedula, jefe: response.data[0].nombre, cod_cargo_jefe: response.data[0].cod_cargo, cargo_jefe: response.data[0].cargo, tipo: "A" });
                            }
                        });
                    } else {
                        console.log("Usuario repetido: " + element.cedula);
                    }
                    $scope.check_user[index] = check_value;
                    $scope.lis_users[index].checked = check_value;
                });
            } else {
                $scope.lis_users.forEach(function (element, index) {
                    var i = $scope.list_users_update_boss.findIndex(elemt => elemt.cedula == element.cedula);
                    if (i != -1) {
                        $scope.list_users_update_boss.splice(i, 1);
                    }
                    $scope.check_user[index] = check_value;
                    $scope.lis_users[index].checked = check_value;
                });
            }
        } else {
            swal('Advertencia', 'No hay usuarios para seleccionar', 'warning');
        }
    }
    $scope.clear_all_check = function () {
        if (document.querySelectorAll("input[type=checkbox]") != undefined && document.querySelectorAll("input[type=checkbox]").length > 0) {
            document.querySelectorAll("input[type=checkbox]").forEach(function (element, index) {
                if ((document.querySelectorAll("input[type=checkbox]").length - 1) != index) {
                    if ($scope.lis_users[index] != undefined && $scope.check_user[index] != undefined) {
                        $scope.lis_users[index].checked = false;
                        $scope.check_user[index] = false;
                    }
                }
                element.checked = false;
            });
            $scope.select_all = false;
        }
    }
    $scope.delete_list_user_all = function () {
        if ($scope.list_users_update_boss.length > 0 && Array.isArray($scope.list_users_update_boss)) {
            $scope.list_users_update_boss = [];
            $scope.clear_all_check();
        }
    }
    $scope.delete_list_user = function (user) {
        var i = $scope.list_users_update_boss.findIndex(elemt => elemt.cedula == user.cedula);
        if (i != -1) {
            $scope.list_users_update_boss.splice(i, 1);
        }
        $scope.clear_all_check();
    }
    $scope.saveJson = function () {
        if ($scope.modulos != undefined && $scope.modulos != "" && $scope.modulos != null && $scope.modulos.length > 0 && Array.isArray($scope.modulos) && validar_json(angular.toJson($scope.modulos))) {
            // $http({
            //     method: 'POST',
            //     url: "php/tic/configuracionacceso/configuracionacceso.php",
            //     data: {
            //         function: 'set_json_user',
            //         cedula: $scope.form.cedula,
            //         json: angular.toJson($scope.modulos)
            //     }
            // }).then(function (response) {
            //     if (response.data[0].codigo == "0") {
            //         swal('Registro Actulizado', 'Se guardaron los permisos de acceso para el usuario: ' + $scope.form.nombre, 'success');
            //     }
            // });
        } else {
            swal.close();
            swal('Error', 'Los modulos no deben estar vacios y debe ser un JSON valido', 'error');
        }
    }
    $scope.id_user = "";
    $scope.filtrarUser = function (usuario) {
        if (usuario != undefined && usuario != null && usuario != "") {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            $http({
                method: 'POST',
                url: "php/tic/paneladmin/paneladmin.php",
                data: {
                    function: 'getModuloUser',
                    user: usuario
                }
            }).then(function (response) {
                if (response.data[0].Codigo == 404) {
                    swal.close();
                    swal('Advertencia', 'El usuario no esta registrado', 'warning');
                    $scope.vista.panel_2 = false;
                    $scope.lis_users = [];
                } else {
                    $http({
                        method: 'POST',
                        url: "php/tic/configuracionacceso/configuracionacceso.php",
                        data: {
                            function: 'get_selet_rol'
                        }
                    }).then(function (response_2) {
                        $scope.filter_fun_1 = "R";
                        if (document.querySelector("#filter_fun_1") != null) {
                            document.querySelector("#filter_fun_1").value = "R";
                        }
                        $scope.filter_datos_2 = response_2.data;
                        $http({
                            method: 'POST',
                            url: "php/tic/configuracionacceso/configuracionacceso.php",
                            data: {
                                function: 'get_funcionarios',
                                filtro: "R",
                                codigo: response.data[0].CODIGO
                            }
                        }).then(function (response_3) {
                            /* $scope.filter_fun_2 = response.data[0].CODIGO;
                            if (document.querySelector("#filter_fun_2") != null) {
                                document.querySelector("#filter_fun_2").value = response.data[0].CODIGO;
                            } */
                            $scope.lis_users = response_3.data;
                            $scope.editarUser({ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO });
                            $scope.clear_all_check();
                            swal.close();
                        });
                    });
                }
            });
        } else {
            swal("Advertencia", "No puede ser vacio el parametro de busqueda", "warning");
        }
    }
    $scope.search_user = function (user_name) {
        if (user_name != undefined && user_name != null && user_name != "") {
            if (user_name.indexOf(".") > 0 || Number.isInteger(parseInt(user_name))) {
                $http({
                    method: 'POST',
                    url: "php/tic/paneladmin/paneladmin.php",
                    data: {
                        function: 'getModuloUser',
                        user: user_name
                    }
                }).then(function (response) {
                    if (response.data[0].Codigo == 404) {
                        swal('Advertencia', 'El usuario no esta registrado', 'warning');
                        $scope.users = [];
                    } else {
                        $scope.users = [{ cedula: response.data[0].CEDULA, nombre: response.data[0].USUARIO, cargo: "ROL(" + response.data[0].CODIGO + ")" }];
                    }
                });
            } else {
                acasHttp.mostrarUsuario(user_name).then(function (response) {
                    if (response.data != undefined && response.data != null && response.data != "" && Array.isArray(response.data) && response.data.length > 0) {
                        $scope.users = response.data;
                    } else {
                        swal("Advertencia", "No hubo coincidencias(" + user_name + ")", "warning");
                        $scope.users = [];
                    }
                })
            }
        } else {
            swal("Advertencia", "No puede ser vacio el parametro de busqueda", "warning");
        }
    }
    $scope.select_user_boss = function (boss) {
        if (Number.isInteger(parseInt(boss.cedula)) && boss.cedula != "") {
            if ($scope.vista.panel_title_2) {
                if ($scope.form.cedula_user != "") {
                    $http({
                        method: 'POST',
                        url: "php/tic/modificarjefe/modificarjefe.php",
                        data: {
                            function: 'actualizar_jefe',
                            cedula_jefe: boss.cedula,
                            cedula_funcionarios: angular.toJson([{ cedula: $scope.form.cedula_user, tipo: ($scope.form.cedula == "0") ? "I" : "A" }]),
                            cantidad: "1"
                        }
                    }).then(function (response) {
                        if (response.data[0].codigo == 1) {
                            swal('Finalizado', response.data[0].mensaje, 'success');
                            $scope.editarUser({ cedula: $scope.form.cedula_user, nombre: $scope.form.nombre_user });
                        } else {
                            swal('Error', response.data[0].mensaje, 'warning');
                        }
                    });
                } else {
                    swal("Advertencia", "Problemas con el Json de los usuarios", "warning");
                }
            } else {
                if ($scope.list_users_update_boss != undefined && $scope.list_users_update_boss != null && $scope.list_users_update_boss != "" && Array.isArray($scope.list_users_update_boss) && $scope.list_users_update_boss.length > 0) {
                    $http({
                        method: 'POST',
                        url: "php/tic/modificarjefe/modificarjefe.php",
                        data: {
                            function: 'actualizar_jefe',
                            cedula_jefe: boss.cedula,
                            cedula_funcionarios: angular.toJson($scope.list_users_update_boss),
                            cantidad: $scope.list_users_update_boss.length
                        }
                    }).then(function (response) {
                        if (response.data[0].codigo == 1) {
                            swal('Finalizado', response.data[0].mensaje, 'success');
                        } else {
                            swal('Error', response.data[0].mensaje, 'warning');
                        }
                    });
                } else {
                    swal("Advertencia", "Problemas con el Json de los usuarios", "warning");
                }
            }
        } else {
            swal("Advertencia", "El usuario " + boss.nombre + " no tiene una cedula valida:" + boss.cedula, "warning");
        }
    }
}])