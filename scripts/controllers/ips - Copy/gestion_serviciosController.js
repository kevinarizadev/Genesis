'use strict';
angular.module('GenesisApp')
    .controller('gestion_serviciosController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope) {





            $scope.submitForm = function () {
                var filename = document.getElementById("bulkDirectFile");
                if (filename.value.length < 1) {
                    ($scope.warning = "Es necesario subir un archivo");
                } else {
                    $scope.title = "Confirm file";
                    var file = filename.files[0];
                    var fileSize = 0;
                    if (filename.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            $scope.convertir_json(e.target.result.split("\n"));
                        }

                        reader.readAsText(filename.files[0]);

                    }
                   
                }
            }

            $scope.convertir_json=function(rows){
                var result = [];
                var headers = rows[0].split(",");
                for (var i = 1; i < rows.length - 1; i++) {
                    var obj = {};
                    var currentline = rows[i].split(",");
                    for (var j = 0; j < headers.length; j++) {
                        var temp=headers[j].replace('"','');
                        headers[j]=temp.replace('"','');
                        temp= currentline[j].replace('"','');
                        obj[headers[j]] =temp.replace('"','');
                    }
                    result.push(obj); 
                }
                $scope.json_csv2 = result;
                $scope.$apply();
              
            }
            $scope.subir_masivo=function(){
                var archivosasubir = JSON.stringify($scope.json_csv2);
                var cantidad=$scope.json_csv2.length;
                $http({
                  method: 'POST',
                  url: "php/ips/gestionservicios/gestion_servicios.php",
                  data: {
                    function: 'guardarjson',
                    data: archivosasubir,
                    cantidad:cantidad
                  }
                }).then(function (response) {
        
                   console.log(response.data);
                   $scope.json_csv3=response.data;
                  
                });
            }
            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        $scope.mostrar_gestion_funcion(true);
                        $scope.Mostrar_gestion = true;
                        $scope.switch_view == true;
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        $scope.mostrar_tabla=false;
                        break;
                    case 3:
                        $(".tabIII").addClass("tabactiva");
                        $scope.coincidencia="";
                        $scope.Mostrar_gestion = false;
                        $scope.mostrar_tabla=false;
                        break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }

            function letsWaitALittle() {
                $scope.setTab(1);
            }
            setTimeout(letsWaitALittle, 0);

            $scope.mostrar_gestion_funcion = function (accion) {
                if (accion == false) {
                    $scope.Mostrar_gestion = false;
                    $scope.carga_listado_agendadas();

                } else {
                    $scope.Mostrar_gestion = true;
                    $scope.carga_listado();
                }
            }
            $scope.carga_listado = function () {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;"></p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                }).catch(swal.noop);
                $http({
                    method: 'POST',
                    url: "php/ips/gestionservicios/gestion_servicios.php",
                    data: {
                        function: 'listar_pendientes'
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0].Codigo==0){
                        // swal('Informanción','No se encontraron solicitudes', 'error');
                        $scope.mostrar_tabla=true;
                        $scope.mostrar_registros=true;
                    }else {
                        $scope.mostrar_tabla=true;
                        $scope.mesasayudas = response.data;
                        $scope.initPaginacion($scope.mesasayudas);
                        $scope.mostrar = true
                    }
                })
            }
          
            $scope.carga_listado();
            $scope.carga_listado_agendadas = function () {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;"></p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                }).catch(swal.noop);
                $http({
                    method: 'POST',
                    url: "php/ips/gestionservicios/gestion_servicios.php",
                    data: { 
                        function: 'listar_realizadas',
                        coincidencia:$scope.coincidencia
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data[0].Codigo==0){
                        // swal('Informanción','No se encontraron solicitudes', 'error');                        
                        $scope.mostrar_tabla=true;
                    }else{
                        $scope.mostrar_tabla=true;
                        $scope.mesasayudas = response.data;
                        $scope.initPaginacion($scope.mesasayudas);
                        $scope.mostrar = true
                    }
                })
            }
            $scope.gestion = function (codigo, fecha) {
                var fecha_date = fecha.split("/");
                console.log(fecha_date);
                var dia= parseInt(fecha_date[0]);
                var mes= parseInt(fecha_date[1])-1;
                var anno= parseInt(fecha_date[2]);
               
                $scope.codigo = codigo;
                $scope.modald = ngDialog.open({
                    template: 'views/ips/gestion_servicios/modal_gestion_servicios.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
                $scope.mostrar_form = true;
                setTimeout(function () {
                    $(function () {
                        $(".k-autocomplete, .k-dropdown-wrap, .k-numeric-wrap, .k-picker-wrap, .k-textbox").css({ "border-style": "none", "border-bottom-style": "dotted" });
                        var date = new Date();
                        var formattedDate = moment(date).format('YYYY-MM');
                      
                        $(".datepicker_inicio").kendoDatePicker({
                            animation: {
                                close: { effects: "zoom:out", duration: 300 },
                                open: { effects: "zoom:in", duration: 300 }
                            }
                        });

                        $(document).ready(function () {
                            $scope.modal = $("#fecha_inicial").kendoDatePicker({
                                format: "dd/MM/yyyy",
                                culture: "es-MX",
                                min: new Date(anno, mes, dia)
                            }).data("kendoDatePicker");
                        });
                    });
                }, 100); 
            }

            $scope.cancelar = function () {
                this.closeThisDialog();
                $scope.carga_listado();
            }
            $scope.openTab = function () {
                $scope.url = 'ejemplo.html';
            }
         
            $scope.guardar_agendamiento=function(noti){
                if(noti==false){
                    $scope.agendar();
                }else{
                    $scope.agendar_notificar();
                }
            }
            $scope.agendar = function () {
                var fecha2 = $("#fecha_inicial").datepicker({ dateFormat: 'dd, mm, yy' });
                $scope.fecha_agendamiento = fecha2[0].value;
                if ($scope.fecha_agendamiento == undefined || $scope.fecha_agendamiento == "" || $scope.fecha_agendamiento == null) {
                    swal('Informanción', "Es necesario llenar el campo FECHA DE GESTIÓN antes", 'error');
                }
                else {
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea agendar solamente?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Guardar'
                    }).then((result) => {
                        if (result) {
                            $http({
                                method: 'POST',
                                url: "php/ips/gestionservicios/gestion_servicios.php",
                                data: {
                                    function: 'agendar',
                                    numero: $scope.codigo,
                                    fecha: $scope.fecha_agendamiento
                                }
                            }).then(function (response) {
                                if (response.data.Codigo == 0) {
                                    // swal('Completado', response.data.Nombre, 'success')  
                                    $scope.mostrar_form = false;
                                    $scope.respuesta = response.data.Nombre;
                                } else {
                                    swal('Informanción', response.data[0].Nombre, 'error')
                                }

                            });
                        }
                    });
                }
            }
            $scope.agendar_notificar = function () {
                var fecha2 = $("#fecha_inicial").datepicker({ dateFormat: 'dd, mm, yy' });
                $scope.fecha_agendamiento = fecha2[0].value;
                if ($scope.fecha_agendamiento == undefined || $scope.fecha_agendamiento == "" || $scope.fecha_agendamiento == null) {
                    swal('Informanción', "Es necesario llenar el campo FECHA DE GESTIÓN antes", 'error');
                }
                else {
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea agendar y notificar?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Guardar'
                    }).then((result) => {
                        if (result) {
                            $http({
                                method: 'POST',
                                url: "php/ips/gestionservicios/gestion_servicios.php",
                                data: {
                                    function: 'agendar',
                                    numero: $scope.codigo,
                                    fecha: $scope.fecha_agendamiento
                                }
                            }).then(function (response) {
                                if (response.data.Codigo == 0) {
                                    $scope.mostrar_form = false;
                                    $scope.respuesta = response.data.Nombre;

                                } else {
                                    swal('Informanción', response.data[0].Nombre, 'error')
                                }
                            });
                        }
                    });
                }
            }

            $scope.detalle = function (detalle, servicio) {
                $scope.detalletempo = detalle;
                $scope.servicio = servicio;
                ngDialog.open({
                    template: 'views/ips/gestion_servicios/modal_detalle.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            }
            $scope.filtrar_autorizaciones = function (val) {
                if (val.length == 0) {
                    $scope.carga_listado();
                } else {
                    $http({
                        method: 'POST',
                        url: "php/ips/gestionservicios/gestion_servicios.php",
                        data: {
                            function: 'obtener_autorizacion',
                            numero: val
                        }
                    }).then(function (response) {
                        if (response) {
                            if (response.data[0].Codigo != 1) {
                                $scope.mostrar = true;
                                $scope.mesasayudas = response.data;
                                $scope.initPaginacion($scope.mesasayudas);
                            } else {
                                swal('Informanción', response.data[0].Nombre, 'error');
                                $scope.mesasayudasTemp = [];
                                $scope.mostrar = true;
                            }
                        } else {
                            $scope.mostrar = true;
                            $scope.mesasayudas = null;
                        }


                    })
                }
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

                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
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