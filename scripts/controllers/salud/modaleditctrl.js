'use strict';
angular.module('GenesisApp')
    .controller('editcontroller', ['$scope', '$http', 'consultaHTTP', '$filter', 'ngDialog', 'cfpLoadingBar',
        function ($scope, $http, consultaHTTP, $filter, ngDialog, cfpLoadingBar) {
            $scope.chgdx = false;
            $scope.chgdx1 = false;
            $scope.chgdx2 = false;     
            $scope.diagnostico = {
                codigo: '',
                nombre: '',
                seleccion: ''
            }

            $scope.diagnostico1 = {
                codigo: '',
                nombre: '',
                seleccion: ''
            }

            $scope.diagnostico2 = {
                codigo: '',
                nombre: '',
                seleccion: ''
            }
            $scope.ips = { codigo: '0', nombre: "SELECCIONAR", seleccion: "" }
            $http({
                method: 'POST',
                url: "php/censo/nuevas_funciones.php",
                data: {
                    function: 'obtener_censo',
                    numerocenso: $scope.info.numero,
                    ubicacion: $scope.info.ubicacion
                }
            }).then(function (response) {
                $scope.edit = response.data[0];
                $scope.edit.FECHA_INGRESO = new Date(response.data[0].FECHA_INGRESO);
                $scope.edit.FECHA_EGRESO = new Date(response.data[0].FECHA_EGRESO);
                $scope.ips.codigo = $scope.edit.COD_PRESTADOR;
                $scope.nombre = $scope.edit.PRESTADOR;
                $scope.ips.seleccion = $scope.edit.SELECTPRES;
                if ($scope.edit.DX === null || $scope.edit.DX == "") {
                    $scope.diagnostico.seleccion = "SELECCIONAR";
                } else {
                    $scope.dx = $scope.edit.DX;
                    $scope.diagnostico.seleccion = $scope.edit.DX + '-' + $scope.edit.NOMBREDX;
                }
                if ($scope.edit.DX1 === null || $scope.edit.DX1 == "") {
                    $scope.diagnostico1.seleccion = "SELECCIONAR";
                } else {
                    $scope.dx1 = $scope.edit.DX1;
                    $scope.diagnostico1.seleccion = $scope.edit.DX1 + '-' + $scope.edit.NOMBREDX1;
                }
                if ($scope.edit.DX2 === null || $scope.edit.DX2 == "") {
                    $scope.diagnostico2.seleccion = "SELECCIONAR";
                } else {
                    $scope.dx2 = $scope.edit.DX2;
                    $scope.diagnostico2.seleccion = $scope.edit.DX2 + '-' + $scope.edit.NOMBREDX2;
                }
            });
            $scope.body = true;
            $scope.zeroresults = true;
            $scope.buscar = function () {
                censoHttp.obtenercensos($scope.documento).then(function (response) {
                    $scope.censos = response;
                    $scope.body = false;
                    $scope.inicio = response[0].FECHAINGRESO;
                    $scope.fin = response[0].FECHAEGRESO;
                    $scope.estancia = response[0].DIAESTANCIA;
                    if ($scope.estancia != 1) {
                        $scope.plural = $scope.estancia + " Días  desde " + $scope.inicio + " hasta " + $scope.fin;
                    } else {
                        $scope.plural = $scope.estancia + " Activo  desde " + $scope.inicio;
                    }
                })
            }

            $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
            $scope.detail = function (censo, ubicacion) {
                $scope.detalleCenso.censo = censo;
                $scope.detalleCenso.ubicacion = ubicacion;
                ngDialog.open({
                    template: 'views/salud/modal/censodetail.html', className: 'ngdialog-theme-plain',
                    controller: 'censodetalle', scope: $scope
                });//.closePromise.then(function (data) {});
            }
            $scope.nomIps = function () {
                if ($scope.ips.codigo === undefined || $scope.ips.codigo == "") {
                    $scope.ips.seleccion = "SELECCIONAR";

                    $scope.ips.codigo = "0";
                    $scope.ips.ubicacion = "0";
                } else {
                    $scope.ips.seleccion = $scope.ips.codigo + ' - ' + $scope.ips.nombre
                }
            }

            $scope.open_modal = function (modal, censo, ubicacion) {
                switch (modal) {
                    case "D":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalDiagnosticos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDiagnosticosctrls',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.diagnostico = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre
                                }
                                $scope.nomDiagnostico();
                            }
                        });
                        break;
                    case "I":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalIps.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalIpsctrl',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.ips = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre,
                                    ubicacion: data.value.ubicacion
                                }
                                $scope.nomIps();
                            }
                        });
                        break;
                    case "D1":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalDiagnosticos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDiagnosticosctrls',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.diagnostico1 = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre
                                }
                                $scope.nomDiagnostico();
                            }
                        });
                        break;

                    case "D2":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalDiagnosticos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDiagnosticosctrls',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.diagnostico2 = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre
                                }
                                $scope.nomDiagnostico();
                            }
                        });
                        break;
                    default:
                        break;
                }
            }

               $scope.open_modal = function (modal, censo, ubicacion) {
                switch (modal) {
                    case "D":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalDiagnosticos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDxctrl',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.diagnostico = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre
                                }
                                $scope.nomDiagnostico();
                            }
                        });
                        break;
                    case "I":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalIps.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalIpsctrl',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.ips = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre,
                                    ubicacion: data.value.ubicacion
                                }
                                $scope.nomIps();
                            }
                        });
                        break;
                        case "D1":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalDiagnosticos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDxctrl',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.diagnostico1 = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre
                                }
                                $scope.nomDiagnostico1();
                            }
                        });
                        break;

                    case "D2":
                        $scope.dialogDiag = ngDialog.open({
                            template: 'views/salud/modal/modalDiagnosticos.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDiagnosticosctrls',
                            scope: $scope
                        });
                        $scope.dialogDiag.closePromise.then(function (data) {
                            if (data.value != "$document") {
                                $scope.diagnostico2 = {
                                    codigo: data.value.codigo,
                                    nombre: data.value.nombre
                                }
                                $scope.nomDiagnostico2();
                            }
                        });
                        break;
                    default:
                        break;
                }
            }          

         
            $scope.nomDiagnostico = function () {
                $scope.chgdx = true;
                if ($scope.diagnostico.codigo === null || $scope.diagnostico.codigo == "") {
                    $scope.diagnostico.seleccion = "SELECCIONAR";
                } else {
                    $scope.diagnostico.seleccion = $scope.diagnostico.codigo + ' - ' + $scope.diagnostico.nombre
                }
            }
            $scope.nomDiagnostico1 = function(){
                $scope.chgdx1 = true;
                if ($scope.diagnostico1.codigo === null || $scope.diagnostico1.codigo == "") {
                    $scope.diagnostico1.seleccion = "SELECCIONAR";
                } else {
                    // $scope.dx1 = $scope.edit.DX1;
                    $scope.diagnostico1.seleccion = $scope.diagnostico1.codigo + ' - ' + $scope.diagnostico1.nombre
                }                
            }
            $scope.nomDiagnostico2 = function () {
                $scope.chgdx2 = true;
                if ($scope.diagnostico2.codigo === null || $scope.diagnostico2.codigo == "") {
                    $scope.diagnostico2.seleccion = "SELECCIONAR";
                } else {
                    // $scope.dx2 = $scope.edit.DX2;
                    $scope.diagnostico2.seleccion = $scope.diagnostico2.codigo + ' - ' + $scope.diagnostico2.nombre
                }
            }


            $scope.actualizar_censo = function () {

                $http({
                    method: 'POST',
                    url: "php/censo/nuevas_funciones.php",
                    data: {
                        function: 'actualizar_censo',
                        numero:$scope.info.numero,
                        ubicacion:$scope.info.ubicacion,
                        dx:  (($scope.chgdx==true)?$scope.diagnostico.codigo:$scope.edit.DX) ,
                        dx1: (($scope.chgdx1==true)?$scope.diagnostico1.codigo:$scope.edit.DX1) ,
                        dx2: (($scope.chgdx2==true)?$scope.diagnostico2.codigo:$scope.edit.DX2) 
                    }
                }).then(function (response) {
                    $scope.actualizado = response.data[0];
                    if ($scope.actualizado.codigo == 1) {
                        $scope.desc = "actualizacion realizada en el dx de censo" + $scope.numero
                        $scope.ins_auditoria();
                        swal('Exito', $scope.actualizado.mensaje, 'success')
                        ngDialog.close();
                    } else {
                        swal('Advertencia', $scope.actualizado.mensaje, 'warning')
                        ngDialog.close();
                    }
                });
            }

            $scope.actualizar_prestador = function () {
                if ($scope.ips.codigo !== "0" &&  $scope.ips.codigo !== undefined) {
                    
                swal({
                    title: "Confirmar",
                    text: "Actualizar Prestador",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si, actualizar",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }).then((result) => {
                    if (result) {

                        $http({
                            method: 'POST',
                            url: "php/censo/nuevas_funciones.php",
                            data: {
                                function: 'actualizar_prestador',
                                numero: $scope.info.numero,
                                ubicacion: $scope.info.ubicacion,
                                prestador: $scope.ips.codigo
                            }
                        }).then(function (response) {

                            swal('Exito', 'Registro Actualizado Correctamente', 'success')
                            ngDialog.close();


                        });

                    } else {
                        swal('Cancelado', 'Accion Cancelada', 'error')
                    }

                });
                } else{
                    swal('Error', 'Debe seleccionar un prestador', 'error')
                }
            }
            
            $scope.actualizar_fecha = function () {
                
                    
                swal({
                    title: "Confirmar",
                    text: "Actualizar Fechas",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si, actualizar",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }).then((result) => {
                    if (result) {

                        $http({
                            method: 'POST',
                            url: "php/censo/nuevas_funciones.php",
                            data: {
                                function: 'actualizar_fecha',
                                numero: $scope.info.numero,
                                ubicacion: $scope.info.ubicacion,
                                fecha_i: $scope.edit.FECHA_INGRESO,
                                fecha_f: $scope.edit.FECHA_EGRESO
                            }
                        }).then(function (response) {

                            swal('Exito', 'Registro Actualizado Correctamente', 'success')
                            ngDialog.close();


                        });

                    } else {
                        swal('Cancelado', 'Accion Cancelada', 'error')
                    }

                });
            }

            $scope.guardar = function (tipo) {

                switch (tipo) {
                    case "A":
                        var mensaje = "¿Confirma actualizacion Fechas?"
                        break;
                    case "B":
                        var mensaje = "¿Confirma actualizacion Diagnostico?"
                        break;
                    case "C":
                        var mensaje = "¿Confirma actualizacion Prestador?"
                        break;
                }

                swal({
                    title: "Confirmar",
                    text: mensaje,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Si, actualizar",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }).then((result) => {
                    if (result) {
                        swal('Exito', 'Registro Actualizado Correctamente', 'success')
                        ngDialog.close();
                    } else {
                        swal('Cancelado', 'Accion Cancelada', 'error')
                    }

                });
            }

            $scope.ins_auditoria = function () {
                console.log($scope.sesdata);
                $http({
                    method: 'POST',
                    url: "php/censo/cuentasmed.php",
                    data: {
                        function: 'ins_auditoria',
                        usuario: $scope.sesdata.usu,
                        descripcion: $scope.desc,
                        documento: $scope.sesdata.cedula,
                        evento: "actualizacion"
                    }
                }).then(function (response) {

                    $scope.auditoria_insertada = response.data;
                });
            }
        }
    ]);