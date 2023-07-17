'use strict';
angular.module('GenesisApp')
    .controller('solicitud_autorizacionController', ['$scope', '$http', 'notification', 'acasHttp', 'ngDialog', '$filter', 'communication', '$rootScope', 'censoHttp',
        function ($scope, $http, notification, acasHttp, ngDialog, $filter, communication, $rootScope, censoHttp) {
            $(document).ready(function () {
                $('#modal1').modal();
                $('#modal12').modal();
                $("#modaldetalle").modal();
                $("#tabs").tabs();
                $('#modalhistoricochat').modal();
            });
            $scope.maxDate = new Date();
            $scope.mostrar_esoa = false;
            $scope.esoa = [];
            $scope.atras = function () {
                if ($scope.mostrar_esoa == true) {
                    $scope.mostrar_esoa = false;
                    $scope.esoa = [];
                    $scope.initPaginacion($scope.reporte);
                    $scope.$apply();
                    $scope.buscar_solicitud();
                } else {
                    $scope.mostrar_datos = false
                }

            }
            
            $scope.ocultarxrol = false;
            var dat = { prov: 'navb' }
            $.getJSON("php/obtenersession.php", dat)
                .done(function (respuesta) {
                    $scope.sesdata = respuesta;
                    $scope.rol = $scope.sesdata.rolcod;
                    if (($scope.rol == 127)||($scope.rol==108)) {
                        $scope.ocultarxrol = true;
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    console.log("navbar error obteniendo variables");
                });



            $scope.busqueda_avanzada = false;
            //imprmir 
            $scope.print = function (ubicacion, numero) {
                window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + numero + '&ubicacion=' + ubicacion, '_blank');
            }
            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        break;
                    case 3:
                        $scope.buscar_senso();
                        $(".tabII").addClass("tabactiva");
                        break;
                    default:
                        $(".tabI").addClass("tabactiva");
                        break;
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }


            //FUNCIONES TAB 3
            $scope.buscar_senso = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_obtener_censo',
                        v_pafiliado: $scope.esoa.DOCUMENTO,
                        v_pprestador: $scope.esoa.NIT
                    }
                }).then(function (response) {                        
                    if (response.data[0].Codigo == 0) {
                        // swal('Informacion', 'No hay censo relacionado con este Paciente en esta Clinica', 'error');
                        $scope.censos = [];
                        $scope.mostrar_error_censo = true;
                    } else {
                        $scope.mostrar_error_censo = false;
                        $scope.censos = response.data;
                        if ($scope.censos[0].Codigo != 0) {
                            $scope.body = false;
                            $scope.fallo = true;
                        } else {
                            $scope.body = true;
                            $scope.fallo = false;
                        }
                    }
                });
            }

            $scope.bus_avanzada = {
                nit: null,
                documento: null,
                responsable: null,
                estado: null,
                servicio: null,
                fecha_ordenini: null,
                fecha_ordenfin: null,
                fecha_confirmadoini: null,
                fecha_confirmadofin: null
            };
            function parsedia(date) {
                var yyyy = date.getFullYear();
                var dd = ('0' + date.getDate()).slice(-2);
                var mm = ('0' + (date.getMonth() + 1)).slice(-2);
                return dd + '/' + mm + '/' + yyyy ;//+' '+hh+':'+mi+':00';
            }
            $scope.buscar_avanzada_accion = function () {
                if (
                    (($scope.bus_avanzada.nit == "") || ($scope.bus_avanzada.nit == null)) &&
                    (($scope.bus_avanzada.documento == "") || ($scope.bus_avanzada.documento == null)) &&
                    (($scope.bus_avanzada.responsable == "") || ($scope.bus_avanzada.responsable == null))
                ) {
                    swal('Informacion!', 'Es necesario llenar almenos un campo de la Seccion 1.', 'warning');
                } else if (
                    (($scope.bus_avanzada.servicio == null) || ($scope.bus_avanzada.servicio == "")) &&
                    (
                        (($scope.bus_avanzada.fecha_ordenini == undefined) || ($scope.bus_avanzada.fecha_ordenini == null)) ||
                        (($scope.bus_avanzada.fecha_ordenfin == undefined) || ($scope.bus_avanzada.fecha_ordenfin == null))
                    ) &&
                    (
                        (($scope.bus_avanzada.fecha_confirmadoini == undefined) || ($scope.bus_avanzada.fecha_confirmadoini == null)) ||
                        (($scope.bus_avanzada.fecha_confirmadofin == undefined) || ($scope.bus_avanzada.fecha_confirmadofin == null))
                    )
                ) {
                    swal('Informacion!', 'Es necesario llenar almenos un campo de la Seccion 2.', 'warning');
                } else if (($scope.bus_avanzada.estado == null) || ($scope.bus_avanzada.estado == "")) {
                    swal('Informacion!', 'El estado es obligatorio.', 'warning');
                } else if (
                    ($scope.bus_avanzada.fecha_ordenini > $scope.bus_avanzada.fecha_ordenfin) ||
                    ($scope.bus_avanzada.fecha_confirmadoini > $scope.bus_avanzada.fecha_confirmadofin) 
                ) {
                    swal('Informacion!', 'La Fecha Inicial es mayor a la Fecha Final', 'warning');
                } else {
                    var v_fingreso_filtro = 'S';
                    var v_fmodificacion_filtro = 'S';
                    var fecha_ordenini=null, fecha_ordenfin=null, fecha_confirmadoini=null, fecha_confirmadofin=null;
                    if 
                        (
                            (($scope.bus_avanzada.fecha_ordenini == undefined) || ($scope.bus_avanzada.fecha_ordenini == null)) ||
                            (($scope.bus_avanzada.fecha_ordenfin == undefined) || ($scope.bus_avanzada.fecha_ordenfin == null))
                        ) 
                    {
                        v_fingreso_filtro = 'N';
                    } else {
                        fecha_ordenini = parsedia($scope.bus_avanzada.fecha_ordenini);
                        fecha_ordenfin = parsedia($scope.bus_avanzada.fecha_ordenfin);
                           
                            // document.querySelector('#fechanotificacion').setAttribute('min', moment().subtract(3, 'days').format('YYYY-MM-DD'));
                        
                    }
                    if
                        (
                        (($scope.bus_avanzada.fecha_confirmadoini == undefined) || ($scope.bus_avanzada.fecha_confirmadoini == null)) ||
                        (($scope.bus_avanzada.fecha_confirmadofin == undefined) || ($scope.bus_avanzada.fecha_confirmadofin == null))
                    ) {
                        v_fmodificacion_filtro = 'N';
                    } else {
                        fecha_confirmadoini = parsedia($scope.bus_avanzada.fecha_confirmadoini);
                        fecha_confirmadofin = parsedia($scope.bus_avanzada.fecha_confirmadofin);
                    }
                    
                    $scope.v_pautorizacion = {
                        nit: $scope.bus_avanzada.nit == null ? 0 : $scope.bus_avanzada.nit,
                        afiliado: $scope.bus_avanzada.documento == null ? 0 : $scope.bus_avanzada.documento,
                        nesoa: $scope.bus_avanzada.v_nesoa == null ? 0 : $scope.bus_avanzada.v_nesoa,
                        responsable: $scope.bus_avanzada.responsable == null ? 0 : $scope.bus_avanzada.responsable,
                        estado: $scope.bus_avanzada.estado,
                        fingreso_filtro: v_fingreso_filtro,
                        Fingreso_fecha_inicial: fecha_ordenini,
                        Fingreso_fecha_final: fecha_ordenfin,
                        fmodificacion_filtro: v_fmodificacion_filtro,
                        Fmodificacion_fecha_inicial: fecha_confirmadoini, 
                        
                        Fmodificacion_fecha_final:fecha_confirmadofin,
                        servicio: $scope.bus_avanzada.servicio == null ? 0 : $scope.bus_avanzada.servicio
                    }
                    var v_pautorizacion = JSON.stringify($scope.v_pautorizacion);
                    console.log(v_pautorizacion);
                    swal({
                        title: 'Cargando información...'
                    });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: {
                            function: 'P_LISTA_SOLICITUD_AVANZADO',
                            v_pautorizacion: v_pautorizacion
                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data == 0) {

                            $scope.reporte = [];
                            $scope.initPaginacion($scope.reporte);
                            swal('Informacion!', 'No se encontraron datos por el criterio de busqueda', 'warning');

                        } else if (response.data.length > 0) {
                            $scope.mostrar_datos = true;
                            $scope.listaresoa = response.data;
                            $scope.reporte = response.data;
                            $scope.initPaginacion($scope.reporte);
                        } else {
                            swal('Informacion!', 'No se encontraron datos por el criterio de busqueda', 'warning');

                        }

                    })
                }

            }

            $scope.mostrar_chat = function (CODIGOCENSO, UBICACION) {
                $scope.CODIGOCENSO = CODIGOCENSO;
                $scope.UBICACION = UBICACION;
                swal({
                    title: 'Cargando información...'
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/censo/censo.php",
                    data: { function: 'obtenerChat', proceso: 1, numerocenso: CODIGOCENSO, ubicacion: UBICACION }
                }).then(function (response) {
                    swal.close();
                    if (response.codigo == "-1") {                        
                        $scope.comentarios = [];
                    } else {
                        $scope.comentarios = response.data;
                        console.log(response.data);
                    }

                })
                $("#modalhistoricochat").modal("open");

            }
            $scope.descargar_excel = function () {
                var JSONData = JSON.stringify($scope.reporte),
                    ReportTitle = $scope.codigo_bus + "_ESTADO_" + ($scope.estado_bus == 'A' ? 'ACTIVO' : $scope.estado_bus == 'P' ? 'PROCESADO' : ANULADO),
                    ShowLabel = true;
                //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

                var CSV = '';
                //Set Report title in first row or line

                CSV += ReportTitle + '\r\n\n';

                //This condition will generate the Label/Header
                if (ShowLabel) {
                    var row = "";

                    //This loop will extract the label from 1st index of on array
                    for (var index in arrData[0]) {

                        //Now convert each value to string and comma-seprated
                        row += index + ',';
                    }

                    row = row.slice(0, -1);

                    //append Label row with line break
                    CSV += row + '\r\n';
                }

                //1st loop is to extract each row
                for (var i = 0; i < arrData.length; i++) {
                    var row = "";

                    //2nd loop will extract each column and convert it in string comma-seprated
                    for (var index in arrData[i]) {
                        row += '"' + arrData[i][index] + '",';
                    }

                    row.slice(0, row.length - 1);

                    //add a line break after each row
                    CSV += row + '\r\n';
                }

                if (CSV == '') {
                    alert("Invalid data");
                    return;
                }

                //Generate a file name
                var fileName = "Listado_";
                //this will remove the blank-spaces from the title and replace it with an underscore
                fileName += ReportTitle.replace(/ /g, "_");

                //Initialize file format you want csv or xls
                var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                // Now the little tricky part.
                // you can use either>> window.open(uri);
                // but this will not work in some browsers
                // or you will not get the correct file extension    

                //this trick will generate a temp <a /> tag
                var link = document.createElement("a");
                link.href = uri;

                //set the visibility hidden so it will not effect on your web-layout
                link.style = "visibility:hidden";
                link.download = fileName + ".csv";

                //this part will append the anchor tag and remove it after automatic click
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            $scope.mostrar_mensaje = function () {
                $http({
                    method: 'POST',
                    url: "php/censo/censo.php",
                    data: { function: 'obtenerChat', proceso: 1, numerocenso: $scope.CODIGOCENSO, ubicacion: $scope.UBICACION }
                }).then(function (response) {
                    $scope.comentarios = response.data;
                    console.log(response.data);
                })
            }


            $scope.send = function (observacion) {
                $scope.respuesta = observacion;
                censoHttp.insertarChat('1', $scope.CODIGOCENSO, $scope.UBICACION, $scope.respuesta).then(function (response) {
                    $scope.resp = response.data;
                    if ($scope.resp.length != 0) {
                        $scope.mensaje_chat = '';
                        $scope.mostrar_mensaje();
                    } else {
                        $scope.mensaje_chat = observacion;
                        $scope.mostrar_mensaje();
                    }
                })

            };

            $scope.detalleCenso = [];
            $scope.detail = function (censo, ubicacion) {
                $scope.detalleCenso.censo = censo;
                $scope.detalleCenso.ubicacion = ubicacion;
                ngDialog.open({
                    template: 'views/salud/modal/censodetail.html', className: 'ngdialog-theme-plain',
                    controller: 'censodetalle',
                    scope: $scope
                });
            }
            /////////////////////////////////////


            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                data: { function: 'obtenerUbicacionSolicitud' }
            }).then(function (response) {
                $scope.listUbicaciones = response.data;
            })
            $scope.setTab(1);
            $scope.buscar_solicitud = function () {
                $scope.esoa = [];
                $scope.showcenso = true;
                $scope.listaresoa = undefined;
                if ($scope.codigo_bus != undefined) {
                    $scope.codigo_bus = $scope.codigo_bus + "";
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: {
                            function: 'obtenerSolicitud',
                            codigo: $scope.codigo_bus,
                            estado: $scope.estado_bus

                        }
                    }).then(function (response) {
                        if (response.data == 0) {

                            $scope.reporte = [];
                            $scope.initPaginacion($scope.reporte);

                        } else if (response.data.length > 0) {
                            $scope.mostrar_datos = true;
                            $scope.listaresoa = response.data;
                            $scope.reporte = response.data;
                            $scope.initPaginacion($scope.reporte);
                        }
                    });
                } else {
                    $scope.reporte = [];
                    $scope.initPaginacion($scope.reporte);
                }
            }
            $scope.obtenerServiciosedit = function (contrato) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacion/funcautorizacion.php",
                    data: { function: 'obtenerServicios', contrato: contrato }
                }).then(function (response) {
                    $scope.listServiciosedit = response.data;
                    function letsWaitALittle() {
                        $("#clasificacion_select option[value=" + $scope.clas + "]").attr("selected", true);
                    }
                    setTimeout(letsWaitALittle, 10);
                })

            }

            //cambiar
            $scope.gestion = function (cod, ubicacion) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $scope.esoa = undefined;
                $scope.setTab(1);
                $scope.listaresoa = undefined;
                
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'obtenerSolicitud_unica',
                        codigo: cod,
                        ubicacion: ubicacion

                    }
                }).then(function (response) {
                    if (response.data == 0) {
                        swal.close();
                        swal('Informacion!', 'No se encontraron datos por el criterio de busqueda. Favor consulte nuevamente.', 'warning');
                    } else if (response.data) {
                        $scope.obtenerServiciosedit(response.data[0].CONTRATO);
                        $scope.clas = response.data[0].CODCLASI;
                        $scope.mostrar_detalle(cod, ubicacion);
                        //FUNCION INICIAL
                        function letsWaitALittle() {
                            swal.close();
                            $scope.cargando_datos(response);
                        }
                        setTimeout(letsWaitALittle, 0);

                    }
                });
                
            }
            $scope.cargando_datos = function (res) {

                $scope.esoa = res.data[0];
                $scope.mostrar_esoa = true;
                console.log(res.data[0].CODCLASI);
                $scope.esoa.CODCLASI = res.data[0].CODCLASI;
                var fecha_for = $scope.esoa.FECHA_INGRESO.split("-");
                $scope.esoa.FECHA_INGRESO = new Date(fecha_for[2], fecha_for[1] - 1, fecha_for[0]);
                console.log(fecha_for);
                console.log($scope.esoa.FECHA_INGRESO);
                console.log($scope.esoa);

                $scope.sw = $scope.esoa.HIJO_DE == 'true' ? true : false;

            }
            $scope.actualizar_datos = function () {
                var productos = JSON.stringify($scope.listar_detalles);
                var cantidad = $scope.listar_detalles.length;

                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'actualizar_datos_auto',
                        v_pnumero: $scope.esoa.NUMERO,
                        v_pubicacion: $scope.esoa.UBICACION,
                        v_pubicacionpaciente: $scope.esoa.UBICACIONPACIENTE,
                        v_pservicio: $scope.esoa.CODCLASI,
                        v_pjustificacion: $scope.esoa.JUSTIFICACION,
                        v_pfecha: $scope.esoa.FECHA_INGRESO,
                        v_pproductos: productos,
                        v_pcantidad: cantidad
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.atras();
                        })
                    } else if (response.data.Codigo == 3) {

                        swal({
                            title: titulo,
                            type: tipo,
                            text: response.data.Nombre,
                            timer: 5000,
                            onOpen: () => {
                                $scope.atras();
                            }
                        }).then((result) => {
                            if (result.dismiss === 'timer') {
                                window.location.href = 'php/cerrarsession.php';
                            }
                        }).catch(function (error) {
                            window.location.href = 'php/cerrarsession.php';
                        });
                    } else {
                        swal('Informacion!', response.data.Nombre, 'warning');
                    }
                });
            }
            $scope.actualizar_datos2 = function () {
                var productos = JSON.stringify($scope.listar_detalles);
                var cantidad = $scope.listar_detalles.length;

                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_guarda_esoa',
                        v_pnumero: $scope.esoa.NUMERO,
                        v_pubicacion: $scope.esoa.UBICACION,
                        v_pubicacionpaciente: $scope.esoa.UBICACIONPACIENTE,
                        v_pservicio: $scope.esoa.CODCLASI,
                        v_pjustificacion: $scope.esoa.JUSTIFICACION,
                        v_pfecha: $scope.esoa.FECHA_INGRESO,
                        v_pproductos: productos,
                        v_pcantidad: cantidad
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.atras();
                        })
                    } else if (response.data.Codigo == 3) {

                        swal({
                            title: titulo,
                            type: tipo,
                            text: response.data.Nombre,
                            timer: 5000,
                            onOpen: () => {
                                swal.showLoading()
                            }
                        }).then((result) => {
                            if (result.dismiss === 'timer') {
                                window.location.href = 'php/cerrarsession.php';
                            }
                        }).catch(function (error) {
                            window.location.href = 'php/cerrarsession.php';
                        });
                    } else {
                        swal('Informacion!', response.data.Nombre, 'warning');
                    }
                });
            }
            $scope.anular_datos = function () {

                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_anular_esoa',
                        v_pnumero: $scope.esoa.NUMERO,
                        v_pubicacion: $scope.esoa.UBICACION,
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.atras();
                        })
                    } else {
                        swal('Informacion!', response.data.Nombre, 'warning');
                    }
                });
            }
            // borrar
            $scope.filtrar_diagnosticos = function (tipo) {
                $scope.tipo = tipo;
                if (tipo == 1) {
                    $scope.nombre_tipo = "Selecciona el Diagnostico Principal"
                } else {
                    $scope.nombre_tipo = "Selecciona el Diagnostico Segundario"
                }
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/siau/modal_diagnosticos.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });

            }
            //borrar
            $scope.removeSeleccion = function () {
                if ($scope.tipo == 1) {
                    $('#DM' + $scope.diagnostico1).removeClass('eleacti');
                    $scope.esoa.COD_DX = "0";
                    $scope.esoa.NOMBRE_DX = "";
                } else {
                    $('#DM' + $scope.diagnostico2).removeClass('eleacti');
                    $scope.esoa.COD_DX1 = "0";
                    $scope.esoa.NOMBRE_DX1 = "";
                }
            }
            //borrar
            $scope.elegir_diagnostico = function (codigo, nombre) {
                $("#DM" + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
                // $scope.hovering=true;
                if ($scope.tipo == 1) {
                    $scope.esoa.COD_DX = codigo;
                    $scope.esoa.NOMBRE_DX = nombre;
                } else {
                    $scope.esoa.COD_DX1 = codigo;
                    $scope.esoa.NOMBRE_DX1 = nombre;
                }
            }
            // borrar
            $scope.cargarDiagnosticos = function (texto) {
                $scope.coincidencia1 = texto
                if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {

                    $scope.coincidencia = $scope.coincidencia1;

                    if ($scope.esoa.HIJO_DE == true) {
                        $scope.hijo = 1;
                    } else {
                        $scope.hijo = 0;
                    };


                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: { function: 'obtenerdiagnostico', coincidencia: $scope.coincidencia, sexo: $scope.esoa.SEXO, edad: $scope.esoa.EDAD, hijo: $scope.hijo }
                    }).then(function (response) {
                        if (response.data == "-1") {
                            $scope.Listardiagnosticos = "";
                            notification.getNotification('info', 'No se encontraron diagnosticos para la coincidencia ingresada', 'Notificacion');
                        } else {
                            $scope.Listardiagnosticos = response.data;
                        }
                    })
                }
                else {

                }
            }
            // borrar
            $scope.cerrar = function () {
                $scope.Listardiagnosticos = [];
                $scope.coincidencia1 = '';
            }
            // no se utiliza 
            $scope.obtenerBase = function () {
                if ($("#adjunto")[0].files[0].size > 62914560) {
                    swal('Advertencia', 'El archivo excede el peso limite (7 MB)', 'warning')
                    // notification.getNotification('warning','El archivo excede el peso limite (7 MB)','Notificación');
                    $("#adjunto")[0].value = "";
                    $scope.archivobase = "";
                    $scope.extensionarchivo = "";
                } else {
                    if ($("#adjunto")[0].files && $("#adjunto")[0].files[0]) {
                        var FR = new FileReader();
                        FR.addEventListener("load", function (e) {
                            $scope.adjunto = $("#adjunto")[0].value;
                            $scope.archivobase = e.target.result;
                            var name = $("#adjunto")[0].files[0].name;
                            $scope.extensionarchivo = name.split('.').pop();
                        });
                        FR.readAsDataURL($("#adjunto")[0].files[0]);
                    }
                }
            }
            $scope.mostrar_modal_detalle = function (numero, ubicacion) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'obtenerDetalles',
                        codigo: numero,
                        ubicacion: ubicacion

                    }
                }).then(function (response) {
                    if (response.data == 0) {
                        swal('Informacion!', 'Hubo un error en la consulta. Favor consulte nuevamente. si el error persiste, comuniquese con soporte', 'warning');
                    } else if (response.data.length > 0) {
                        $scope.numero_modal = numero;
                        $('#modal1').modal('open');
                        $scope.listar_detalles = response.data;
                    }
                });
            }
            $scope.mostrar_detalle = function (numero, ubicacion) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'obtenerDetalles',
                        codigo: numero,
                        ubicacion: ubicacion

                    }
                }).then(function (response) {
                    if (response.data == null) {
                        swal('Informacion!', 'Hubo un error en la consulta. Favor consulte nuevamente. si el error persiste, comuniquese con soporte', 'warning');
                         $scope.listar_detalles = [];
                    } else if (response.data.length > 0) {
                        $scope.listar_detalles = response.data;
                    } else{
                        $scope.listar_detalles = [];
                    }
                });
            }
            $scope.modal_filtrar = function (tipo, ind) {
                $scope.mostrar_valor = 0;
                $scope.tipo = tipo;
                if (tipo == 'P') {
                    $scope.nombre_tipo = "Selecciona el Producto"
                    $scope.mostrar_valor = 1;
                    $scope.renglon_cambiando_producto = ind;
                    $scope.cambiar_producto = $scope.listar_detalles[ind].codigo;
                    $scope.cambiar_nombre = $scope.listar_detalles[ind].nombre;
                    $scope.cambiar_valor = $scope.listar_detalles[ind].valor;
                } else {
                    $scope.nombre_tipo = "Selecciona la Clasificación"
                }
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/autorizaciones/modal_filtrar.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });

            }
            $scope.removeSeleccion = function () {

                if ($scope.tipo == 'C') {
                    $('#DM' + $scope.diagnostico1).removeClass('eleacti');
                    $scope.clasificacion = "0";
                    $scope.clasificacion_nombre = "";
                } else if ($scope.tipo == 'P') {
                    $('#DM' + $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo).removeClass('eleacti');
                    $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo = $scope.cambiar_producto;
                    $scope.listar_detalles[$scope.renglon_cambiando_producto].nombre = $scope.cambiar_nombre;
                    $scope.listar_detalles[$scope.renglon_cambiando_producto].valor = $scope.cambiar_valor;
                } else {
                    $('#DM' + $scope.diagnostico2).removeClass('eleacti');
                    $scope.producto = "0";
                    $scope.producto_nombre = "";
                }
            }
            $scope.elegir = function (codigo, nombre, ind) {
                $("#DM" + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
                // $scope.hovering=true;
                if ($scope.tipo == 'C') {
                    $scope.clasificacion = codigo;
                    $scope.clasificacion_nombre = nombre;
                } else if ($scope.tipo == 'P') {
                    $('#DM' + $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo).removeClass('eleacti');
                    $("#DM" + codigo).addClass('eleacti');
                    $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo = codigo;
                    $scope.listar_detalles[$scope.renglon_cambiando_producto].nombre = nombre;
                    $scope.listar_detalles[$scope.renglon_cambiando_producto].valor = $scope.ListarResultado[ind].VALOR;
                } else {
                    $scope.producto = codigo;
                    $scope.producto_nombre = nombre;
                }
            }
            $scope.cargarListados = function (texto) {
                $scope.coincidencia1 = texto
                if ($scope.tipo == 'C') {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                            data: {
                                function: 'obtenerClasificacion',
                                codigo: $scope.coincidencia1
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                } else {
                    if (($scope.coincidencia1 != "" && $scope.coincidencia1.length >= 3)) {
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/esoa/esoa.php",
                            data: {
                                function: 'obtenerProducto',
                                regimen: $scope.esoa.REGIMEN,
                                contrato: $scope.esoa.CONTRATO,
                                word: $scope.coincidencia1,
                                clasificacion: $scope.clas,
                                sexo: $scope.esoa.SEXO,
                                edad: $scope.esoa.EDAD,
                            }
                        }).then(function (response) {
                            if (response.data == "-1") {
                                $scope.ListarResultado = "";
                            } else {
                                $scope.ListarResultado = response.data;
                            }
                        });
                    }
                }
            }
            $scope.limpiar = function () {
                $scope.seccional = '0';
                $scope.prestador = '0';
                $scope.regimen = '0';
                $scope.contrato = '0';
                $scope.producto = '0';
                $scope.producto_nombre = '';
                $scope.clasificacion = '0';
                $scope.clasificacion_nombre = '';
                $scope.valor = 0;
                $scope.descripcion = '';
                $scope.fileName = '';
                $scope.nombreadjunto = "";

                // $("#adjunto")[0].files[0].val()="";
            }
            $scope.descargafile = function (ruta) {
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: {
                        function: 'descargaAdjunto',
                        ruta: ruta
                    }
                }).then(function (response) {
                    //window.open("https://genesis.cajacopieps.com//temp/"+response.data);
                    window.open("temp/" + response.data);
                });
            }
            $scope.subir_adjunto = function () {
                // var nombre_tipo=$('#tipo').find(option[$('#tipo').val()].text());
                // combo.options[combo.selectedIndex].text

                if ($scope.archivobase != null &&
                    $scope.seccional != '0' &&
                    $scope.prestador != '0' &&
                    $scope.regimen != '0' &&
                    $scope.contrato != '0' &&
                    $scope.producto != '0' &&
                    $scope.clasificacion != '0' &&
                    $scope.descripcion != '' &&
                    $scope.valor != 0
                ) {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                        data: {
                            function: 'subir_adjunto',
                            achivobase: $scope.archivobase,
                            ext: $scope.extensionarchivo
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        $scope.envar_datos(response.data);
                    });
                } else {
                    swal('Informacion!', 'Todos los campos deben estar lleno para solicitar el servicio', 'warning');
                }

            }
            $scope.envar_datos = function (ruta) {
                var ruta_k = ruta;
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/contratacion/solicitud_servicios.php",
                    data: {
                        function: 'enviarDatos',
                        seccional: $scope.seccional,
                        prestador: $scope.prestador,
                        regimen: $scope.regimen,
                        ruta: ruta_k,
                        contrato: $scope.contrato,
                        producto: $scope.producto,
                        clasificacion: $scope.clasificacion,
                        valor: $scope.valor,
                        descripcion: $scope.descripcion
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal('Completado', response.data.Nombre, 'success');
                        $scope.limpiar();
                    } else {
                        swal('Información', response.data.Nombre, 'error');
                    }

                });
            }
            // tabla filtrada y con paginacion
            $scope.filter = function (val) {
                $scope.listaRIPSTemp = $filter('filter')($scope.listaRIPS, val);
                $scope.configPages();
            }
            $scope.initPaginacion = function (info) {
                $scope.reporteTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.reporteTemp = $filter('filter')($scope.reporte, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.reporteTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.reporteTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.reporteTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.reporteTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.reporteTemp.length / $scope.pageSize);
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
                if ($scope.reporteTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize) + 1;
                }
                // var tamanomax= $scope.reporteTemp.length/$scope.pageSize;
                console.log(tamanomax);
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
                console.log($scope.reporte.length / $scope.pageSize - 1);
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
                    if ($scope.reporteTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.reporteTemp.length / $scope.pageSize) + 1;
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

                     $scope.showcenso = true;
            $scope.showmodalcesochat = function (param) {
                $scope.showcenso = !$scope.showcenso;
                if ($scope.showcenso == false) {
                    $scope.buscar_censo_modal(param);
                }

            }

            $scope.buscar_censo_modal = function (param) {
                console.log("Me ejeucte");
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_obtener_censo',
                        v_pafiliado: param.DOCUMENTO,
                        v_pprestador: param.NIT
                    }
                }).then(function (response) {

                    console.log(response);
                    if (response.data[0].Codigo == 0) {
                        // swal('Informacion', 'No hay censo relacionado con este Paciente en esta Clinica', 'error');
                        $scope.censos = [];
                        $scope.mostrar_error_censo = true;
                    } else {
                        $scope.mostrar_error_censo = false;
                        $scope.tempcensos = response.data;
                        // if ($scope.censos[0].Codigo != 0) {
                        //     $scope.body = false;
                        //     $scope.fallo = true;
                        // } else {
                        //     $scope.body = true;
                        //     $scope.fallo = false;
                        // }
                    }

                });
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





