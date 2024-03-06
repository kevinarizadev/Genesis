'use strict';
angular.module('GenesisApp')
    .controller('administracionripsController', ['$scope', 'notification', 'consultaHTTP', 'upload', 'afiliacionHttp', '$http',
        function ($scope, notification, consultaHTTP, upload, afiliacionHttp, $http) {
            $(document).ready(function () {
                $('#modalarchivos').modal();
                $('#detalle_rips').modal();
                $scope.Rol_Cedula = sessionStorage.getItem('cedula');
            });

 $scope.test = function() {
                let array = [
                    { "Nit": "900665934", "IdEntrega": 309097, "TipoDocumento": "CC", "Documento": "8680238", "CodMedicamento": "7709459540695", "NomMedicamento": "LANCETAS M&H CARE    CJ* 50", "CantSolicitada": 50, "CantEntregada": 50, "FechaEntrega": "08-04-2020", "CelAfiliado": "3045211017", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309097, "TipoDocumento": "CC", "Documento": "8680238", "CodMedicamento": "7703153032319", "NomMedicamento": "AGUJAS PARA INSULINA (GLUCOQUICK)", "CantSolicitada": 30, "CantEntregada": 30, "FechaEntrega": "08-04-2020", "CelAfiliado": "3045211017", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309097, "TipoDocumento": "CC", "Documento": "8680238", "CodMedicamento": "AV02IN38047", "NomMedicamento": "INSULINA GLARGINA(LANTUS SOLOSTAR)100UI/3ML AMP", "CantSolicitada": 2, "CantEntregada": 2, "FechaEntrega": "08-04-2020", "CelAfiliado": "3045211017", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309098, "TipoDocumento": "CC", "Documento": "22312187", "CodMedicamento": "AS02KO01045", "NomMedicamento": "KOMBIGLYZE XR(SAXAGLIP+METFOR)2.5/1000MG", "CantSolicitada": 56, "CantEntregada": 56, "FechaEntrega": "08-04-2020", "CelAfiliado": "3125091696", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309099, "TipoDocumento": "CC", "Documento": "22625962", "CodMedicamento": "8710428012784", "NomMedicamento": "GLUCERNA ISOTONIC  250ML LIQUIDO ", "CantSolicitada": 60, "CantEntregada": 60, "FechaEntrega": "08-04-2020", "CelAfiliado": "3207993131", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309101, "TipoDocumento": "CC", "Documento": "32873997", "CodMedicamento": "768455108800", "NomMedicamento": "BARRERA PROTECTORA DE COLOSTOMIA  70MM  ", "CantSolicitada": 10, "CantEntregada": 10, "FechaEntrega": "08-04-2020", "CelAfiliado": "310640205", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309101, "TipoDocumento": "CC", "Documento": "32873997", "CodMedicamento": "768455049851", "NomMedicamento": "BOLSA DE COLOSTOMIA (SURFIT PLUS) 70MM  ", "CantSolicitada": 10, "CantEntregada": 10, "FechaEntrega": "08-04-2020", "CelAfiliado": "310640205", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309102, "TipoDocumento": "CC", "Documento": "3959410", "CodMedicamento": "GOT01ON01001", "NomMedicamento": "ONDAX(ONDANSETRON)8MG TABLETAS", "CantSolicitada": 30, "CantEntregada": 30, "FechaEntrega": "08-04-2020", "CelAfiliado": "3015225481", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309103, "TipoDocumento": "CC", "Documento": "22309041", "CodMedicamento": "BO02LI01079", "NomMedicamento": "TRAYENTA(LINAGLIPTINA)5MG TABLETAS", "CantSolicitada": 30, "CantEntregada": 30, "FechaEntrega": "08-04-2020", "CelAfiliado": "3014274874", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309104, "TipoDocumento": "RC", "Documento": "1043483752", "CodMedicamento": "LF01DE10244", "NomMedicamento": "DESLORATADINA 50 MG/100 ML JBE FR *60 ML", "CantSolicitada": 3, "CantEntregada": 3, "FechaEntrega": "08-04-2020", "CelAfiliado": "3153487536", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309105, "TipoDocumento": "CC", "Documento": "7443458", "CodMedicamento": "7730979097758", "NomMedicamento": "TAMSULON(DUTASTERIDE/TAMSULOSINA)0.5/0.4", "CantSolicitada": 30, "CantEntregada": 30, "FechaEntrega": "08-04-2020", "CelAfiliado": "3003704531", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309106, "TipoDocumento": "CC", "Documento": "8731387", "CodMedicamento": "7702057710903", "NomMedicamento": "GLIMEPIRIDA  4MG TABLETAS CJ* 15", "CantSolicitada": 30, "CantEntregada": 30, "FechaEntrega": "08-04-2020", "CelAfiliado": "3012271471", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309106, "TipoDocumento": "CC", "Documento": "8731387", "CodMedicamento": "7897337714600", "NomMedicamento": "JANUVIA (SITAGLIPTINA) 100 MG X 14 TABLE", "CantSolicitada": 28, "CantEntregada": 28, "FechaEntrega": "08-04-2020", "CelAfiliado": "3012271471", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309107, "TipoDocumento": "CC", "Documento": "22446085", "CodMedicamento": "7703363007046", "NomMedicamento": "MEPOLIZUMAB (NUCALA) 100MG SOLUCION INYECTABLE ", "CantSolicitada": 1, "CantEntregada": 1, "FechaEntrega": "08-04-2020", "CelAfiliado": "3017000694", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309109, "TipoDocumento": "CC", "Documento": "5591612", "CodMedicamento": "7702207700549", "NomMedicamento": "TRIALON(DORZO/BRIMO/TIMOLOL)20/2/5/MG/ML", "CantSolicitada": 1, "CantEntregada": 0, "FechaEntrega": "08-04-2020", "CelAfiliado": "3177290716", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309111, "TipoDocumento": "CC", "Documento": "32815128", "CodMedicamento": "7897337714624", "NomMedicamento": "JANUVIA(SITAGLIPTINA)50MG TABLETAS", "CantSolicitada": 84, "CantEntregada": 84, "FechaEntrega": "08-04-2020", "CelAfiliado": "3756968", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309112, "TipoDocumento": "CC", "Documento": "22369224", "CodMedicamento": "7707355053943", "NomMedicamento": "IBANDROMET(ACIDO IBANDRONICO)150MG TABLE", "CantSolicitada": 3, "CantEntregada": 3, "FechaEntrega": "08-04-2020", "CelAfiliado": "3147134766", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309113, "TipoDocumento": "CC", "Documento": "26909328", "CodMedicamento": "7702026174637", "NomMedicamento": "TENA SLIP  TALLA M 0 CJ* 30", "CantSolicitada": 90, "CantEntregada": 90, "FechaEntrega": "08-04-2020", "CelAfiliado": "3006777988", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309117, "TipoDocumento": "CC", "Documento": "32877735", "CodMedicamento": "7709979366935", "NomMedicamento": "PROWHEY ONCARE  400G POLVO ", "CantSolicitada": 4, "CantEntregada": 4, "FechaEntrega": "08-04-2020", "CelAfiliado": "3791286", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309118, "TipoDocumento": "CC", "Documento": "8754950", "CodMedicamento": "7709323347573", "NomMedicamento": "XULTOPHY(DEGLUDEC+LIRAGLUTIDA)0.036MG AM", "CantSolicitada": 4, "CantEntregada": 4, "FechaEntrega": "08-04-2020", "CelAfiliado": "3145954605", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309118, "TipoDocumento": "CC", "Documento": "8754950", "CodMedicamento": "SA02IN38044", "NomMedicamento": "APIDRA SOLOSTAR(INSULINA GLULISINA)100UI", "CantSolicitada": 3, "CantEntregada": 3, "FechaEntrega": "08-04-2020", "CelAfiliado": "3145954605", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309120, "TipoDocumento": "CC", "Documento": "22363960", "CodMedicamento": "7702026174644", "NomMedicamento": "PAÑAL TENA   SLIP L UNIDAD ", "CantSolicitada": 180, "CantEntregada": 180, "FechaEntrega": "08-04-2020", "CelAfiliado": "3172316440", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309121, "TipoDocumento": "CC", "Documento": "22406379", "CodMedicamento": "7730969302558", "NomMedicamento": "TIAMAX (QUETIAPINA) 100MG COMPRIMIDOS", "CantSolicitada": 60, "CantEntregada": 60, "FechaEntrega": "08-04-2020", "CelAfiliado": "3106768093", "Modalidad": "E" },
                    { "Nit": "900665934", "IdEntrega": 309123, "TipoDocumento": "CC", "Documento": "32816452", "CodMedicamento": "VC02LE01017", "NomMedicamento": "LEFLUNOMIDA(LEFLAVA)20MG TABLETAS", "CantSolicitada": 30, "CantEntregada": 0, "FechaEntrega": "08-04-2020", "CelAfiliado": "3007025078", "Modalidad": "E" }

                ]
                for (let i = 0; i < array.length; i++) {
                    var settings = {
                        "async": true,
                        "crossDomain": false,
                        "url": "https://genesis.cajacopieps.com//php/ServiceMedicamentos.php",
                        "method": "POST",
                        "headers": {
                            "content-type": "application/json",
                            "authorization": "Bearer UGxsZGtkaU1ETURKU0ZEb3NkYWo4MzczNzM9PWRkOQ==",
                            "cache-control": "no-cache"
                        },
                        "processData": false,
                        "data": JSON.stringify(array[i])
                    }

                    $.ajax(settings).done(function(response) {
                        console.log(response);
                    });

                }

            }
            
            $scope.inactiveipstable = true;
            $scope.funcbuscarips = function (data) {
                if (data != '') {
                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/rips/funcRips.php",
                        data: { function: 'obtenerIPS', info: data }
                    }).then(function (response) {
                        if (response.data.hasOwnProperty("Codigo")) {
                            swal("Mensaje",response.data.Nombre,"info");
                        } else {
                            if (response.data[0].CODIGO != "0") {
                                $scope.listarIPS = [];
                                $scope.listarIPS = response.data;
                                $scope.inactiveipstable = false;
                            } else {
                                $scope.inactiveipstable = true;
                            }
                        }
                    })

                } else {
                    $scope.inactiveipstable = true;
                }
            }
            $scope.agregarValor = function (ips, tipo) {
                swal({
                    title: 'Ingrese el monto sin puntos .',
                    input: 'number',
                    inputValue: ips.MONTO,
                    inputAttributes: {
                        min: 1,
                        max: 9999999999
                    },
                    showCancelButton: true
                }).then(function (result) {
                    if (result > 0) {
                        $scope.monto = result;
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/rips/funcRips.php",
                            data: { function: 'actualizarMonto', nit: ips.CODIGO, tipo: tipo, monto: $scope.monto }
                        }).then(function (response) {
                            if (response.data[0].CODIGO != "0") {
                                swal({ title: "Completado", text: "Valor actualizado.", showConfirmButton: false, type: "success", timer: 800 });
                                $scope.funcbuscarips($scope.buscarips);
                            } else {
                                swal({ title: "Completado", text: "Valor no actualizado.", showConfirmButton: false, type: "warning", timer: 800 });
                            }

                        })

                    } else {
                        swal('Importante', 'Cantidad Incorrecta', 'info')
                    }
                })
            }
            $scope.actualizarEstado = function (ips, tipo) {
                swal({
                    title: 'Confirmar',
                    text: "Esta seguro que desea cambiar el estado?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/rips/funcRips.php",
                            data: { function: 'actualizarMonto', nit: ips.CODIGO, tipo: tipo, monto: 0 }
                        }).then(function (response) {
                            if (response.data[0].CODIGO != "0") {
                                swal({ title: "Completado", text: "Estado actualizado.", showConfirmButton: false, type: "success", timer: 800 });
                                $scope.funcbuscarips($scope.buscarips);
                            } else {
                                swal({ title: "Completado", text: "Estado no actualizado.", showConfirmButton: false, type: "warning", timer: 800 });
                            }
                        })
                    }
                })
            }
            $scope.actualizarEstado_nocontratada = function (ips) {
                swal({
                    title: 'Confirmar',
                    text: "Esta seguro que desea cambiar el estado?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirmar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/rips/funcRips.php",
                            data: { function: 'actualizarestado_nocontratada', nit: ips.CODIGO, responsable: $scope.Rol_Cedula }
                        }).then(function (response) {
                            if (response.data.Codigo == "0") {
                                swal({ title: "Completado", text: "Habilitación actualizado.", showConfirmButton: false, type: "success", timer: 2000 });
                                $scope.funcbuscarips($scope.buscarips);
                            } else {
                                swal({ title: "Importante", text: response.data.Nombre, showConfirmButton: false, type: "warning" });
                            }
                        })
                    }
                })
            }

            $scope.openEditArchivos = function (nit, estado) {
                $scope.archivos = [];
                $scope.ips = nit;
                $scope.switchbtnactualizar = true;
                if (estado != 'NO ASIGNADO') {
                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/rips/funcRips.php",
                        data: { function: 'obtenerArchivos', nit: nit }
                    }).then(function (response) {
                        $scope.archivos = [];
                        $scope.archivos = response.data;
                        for (var i = 0; i < $scope.archivos.length; i++) {
                            $scope.archivos[i].ESTADO = JSON.parse($scope.archivos[i].ESTADO);
                            $scope.archivos[i].ACTIVO = JSON.parse($scope.archivos[i].ACTIVO);
                        }
                        $scope.switchbtnactualizar = true;
                        setTimeout(function () {
                            $('#modalarchivos').modal("open");
                        }, 10);

                    })
                } else {
                    $scope.archivos = [
                        {
                            NOMBRE: 'ARCHIVO CONTROL (CT)',
                            ESTADO: true,
                            ACTIVO: true,
                            SIGLA: 'CT',
                            CODIGO: '1'
                        },
                        {
                            NOMBRE: 'ARCHIVO FACTURAS (AF)',
                            ESTADO: true,
                            ACTIVO: true,
                            SIGLA: 'AF',
                            CODIGO: '2'
                        },
                        {
                            NOMBRE: 'ARCHIVO USUARIOS (US)',
                            ESTADO: true,
                            ACTIVO: true,
                            SIGLA: 'US',
                            CODIGO: '3'
                        },
                        {
                            NOMBRE: 'ARCHIVO CONSULTA (AC) ',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AC',
                            CODIGO: '4'
                        },
                        {
                            NOMBRE: 'ARCHIVO PROCEDIMIENTOS (AP)',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AP',
                            CODIGO: '5'
                        },
                        {
                            NOMBRE: 'ARCHIVO HOSPITALIZACIÓN (AH)',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AH',
                            CODIGO: '6'
                        },
                        {
                            NOMBRE: 'ARCHIVO URGENCIAS (AU)',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AU',
                            CODIGO: '7'
                        },
                        {
                            NOMBRE: 'ARCHIVO RECIÉN NACIDOS (AN)',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AN',
                            CODIGO: '8'
                        },
                        {
                            NOMBRE: 'ARCHIVO MEDICAMENTOS (AM)',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AM',
                            CODIGO: '9'
                        },
                        {
                            NOMBRE: 'ARCHIVO OTROS SERVICIOS (AT)',
                            ESTADO: false,
                            ACTIVO: false,
                            SIGLA: 'AT',
                            CODIGO: '10'
                        }
                    ];
                    $scope.switchbtnactualizar = false;
                    setTimeout(function () {
                        $('#modalarchivos').modal("open");
                    }, 10);
                }
            }
            $scope.actualizarArchivos = function (switch_) {
                if (switch_ == 2) {
                    swal({
                        title: 'ingrese el monto que desea asignale a la ips',
                        input: 'number',
                        //inputValue: 0,
                        inputAttributes: {
                            min: 1,
                            max: 9999999999
                        },
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Habilitar IPS'
                    }).then(function (result) {
                        if (result > 0) {
                            var data = JSON.stringify($scope.archivos);
                            $http({
                                method: 'POST',
                                url: "php/cuentasmedicas/rips/funcRips.php",
                                data: { function: 'ui_archivos', nit: $scope.ips, tipo: 'I', archivo: data, valor: result }
                            }).then(function (response) {
                                if (response.data[0].CODIGO != "0") {
                                    $("#modalarchivos").modal("close");
                                    swal({ title: "Completado", text: "Archivos actalizados.", showConfirmButton: false, type: "success", timer: 800 });
                                    $scope.funcbuscarips($scope.buscarips);
                                } else {
                                    swal({ title: "Completado", text: "ips no habilitada.", showConfirmButton: false, type: "warning", timer: 800 });
                                }
                            })
                        } else {
                            swal({ title: "Importante", text: "Debe ingresar una cantidad validad.", showConfirmButton: false, type: "warning", timer: 800 });
                        }
                    })
                } else {
                    swal({
                        title: 'Confirmar',
                        text: "Esta seguro que desea actualizar los archivos permitidos?",
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result) {
                            var data = JSON.stringify($scope.archivos);
                            $http({
                                method: 'POST',
                                url: "php/cuentasmedicas/rips/funcRips.php",
                                data: { function: 'ui_archivos', nit: $scope.ips, tipo: 'U', archivo: data, valor: '0' }
                            }).then(function (response) {
                                if (response.data[0].CODIGO != "0") {
                                    $("#modalarchivos").modal("close");
                                    swal({ title: "Completado", text: "Archivos actalizados.", showConfirmButton: false, type: "success", timer: 800 });
                                    $scope.funcbuscarips($scope.buscarips);
                                } else {
                                    swal({ title: "Completado", text: "archivos no actualizados.", showConfirmButton: false, type: "warning", timer: 800 });
                                }
                            })
                        }
                    })
                }
            }
            $scope.listado = { cargues: new Array(), datos_ips: { nombre: "", nit: "" } };
            $scope.detalle_rips = function (ips) {
                if (ips != undefined && ips != "" && ips != null) {
                    if (ips.hasOwnProperty('CODIGO') && ips.CODIGO != "") {
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/rips/funcRips.php",
                            data: {
                                function: 'obtenerCargues',
                                nit: ips.CODIGO
                            }
                        }).then(function (response) {
                            if (response.data[0].codigo != "0") {
                                $('#detalle_rips').modal("open");
                                $scope.listado.datos_ips.nombre = ips.RAZON;
                                $scope.listado.datos_ips.nit = ips.CODIGO;
                                $scope.listado.cargues = response.data;
                            } else {
                                $scope.listado.datos_ips.nombre = "";
                                $scope.listado.datos_ips.nit = "";
                                $scope.listado.cargues = new Array();
                                swal("Error", "Listando el cargue de los RIPS para la IPS: " + ips.CODIGO, "error");
                            }
                        })
                    } else {
                        swal("Advertencia", "El NIT seleccionado no es valido", "warning");
                    }
                } else {
                    swal("Advertencia", "Los datos de la IPS no son validos", "warning");
                }
            }
            $scope.cerrar_modal = function () {
                $("#detalle_rips").modal("close");
            }
            $scope.descargar_errores = function (proceso, texto) {
                window.open('php/cuentasmedicas/rips/error_rips.php?archivo=' + 'NA' + '&proceso=' + proceso + '&texto=' + texto);
            }
            $scope.descargar_archivos = function (ips) {
                if (ips.ruta_rips != "" && ips.codigo != "") {
                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/rips/funcRips.php",
                        data: {
                            function: 'descargar_archivos',
                            ruta: "/cargue_ftp/Digitalizacion/Genesis/Rips/" + ips.ruta_rips,
                            recibo: ips.recibo
                        }
                    }).then(function (response) {
                        window.open("https://genesis.cajacopieps.com//temp/" + response.data);
                        // if (response.data != "") {
                        //  if (response.data.length > 0) {
                        //      // window.open('php/cuentasmedicas/rips/archivos_rips.php?archivos=' + JSON.stringify(response.data) + '&recibo=' + ips.recibo);
                        //      // response.data.forEach(archivo => {
                        //      //  if (archivo != "Error") {
                        //      //      // window.open("temp/" + archivo);
                        //      //      download('Errores.txt', texto);
                        //      //  } else {
                        //      //      swal("Error", "Al descargar uno de los archivos: " + response.data.length, "error");
                        //      //  }
                        //      // });
                        //  } else {
                        //      swal("Advertencia", "No se encontraron archivos", "warning");
                        //  }
                        // } else {
                        //  swal("Error", "Al descargar los archivos: " + response.data, "error");
                        // }
                    })
                } else {
                    swal("Advertencia", "La ruta o codigo del RIPS no es valido", "warning");
                }
            }

            $scope.print = async function (data) {
                $scope.info = {
                  recibo: '',
                  nit: ''
                };
                $scope.info.recibo = data.recibo;
                $scope.info.nit = data.nit;
                $scope.info.codigo = data.codigo;
                $scope.info.verificacion = data.codigov;
                window.open('views/Cuentasmedicas/formatos/acta.php?datos=' + JSON.stringify($scope.info), '_blank', "width=900,height=1100");
              }
        }])
