'use strict';
angular.module('GenesisApp')
    .controller('admonmovilidadlController', ['$scope', 'consultaHTTP', 'notification', '$timeout', '$rootScope', '$http', '$window', 'ngDialog',
        function ($scope, consultaHTTP, notification, $timeout, $rootScope, $http, $window, ngDialog) {

            $scope.Inicio = function () {

                $scope.A_Tipo = '';
                $scope.mostrar_asesor_solicitudes = false;
                $scope.cedulaLogin = sessionStorage.getItem('cedula');
                $scope.regional = sessionStorage.getItem('municipio');
                $scope.codRegional = $scope.regional.toString().length == 5 ? $scope.regional.substring(0, 2) : $scope.regional.substring(0, 1);
                if ($scope.regional == '1') {
                    $scope.codRegional = '';
                }
                // $scope.codRegional = '';
                const asistentesRegionales = [
                    { cedula: '22655600' }, // ATLÁNTICO - KARINA ISABEL GARRIDO - 22655600
                    { cedula: '73595481' }, // BOLIVAR - REIDOLFO DEL JESUS JIMENEZ CASTRO - 73595481
                    { cedula: '1050969001' }, // BOLIVAR - YURANIS PATRICIA BLANCO - 1050969001
                    { cedula: '40043052' }, // BOYACÁ - LUZ ALEXANDRA RODRIGUEZ - 40043052
                    { cedula: '1065631056' }, // CESAR - MILEIDIS JOSEFINA NIEVES AVILA - 1065631056
                    { cedula: '1067927228' }, // CORDOBA - JEISON GARCÍA SALAZAR - 1067927228
                    { cedula: '1082861288' }, // MAGDALENA - CLAUDIA MARGARITA HERRERA SCHONWALD - 1082861288
                    { cedula: '17859841' }, // GUAJIRA - THOMAS JOSE PABON AMAYA - 17859841
                    { cedula: '40186877' }, // META - ADRIANA ESTHER PEREZ CRUZ - 40186877
                    { cedula: '64700900' } // SUCRE - IRINA ESTHER CASTRO SALCEDO - 64700900
                ];

                $scope.permisosRegionales = asistentesRegionales.findIndex(e => e.cedula == $scope.cedulaLogin) != -1 ? true : false;
                if ($scope.regional == '1') $scope.permisosRegionales = true; // Activar si es Nacional
                console.log('permisosRegionales', $scope.permisosRegionales);

                const asistentesNacionales = [
                    // { cedula: '22655600' }, // 22655600 - GARRIDO AMAYA KARINA ISABEL
                    // { cedula: '1045723407' }, // 1045723407 - NAVARRO MARTINEZ BRAYAN ALBERTO
                    { cedula: '1045747968' }, // 1045747968 - MENDOZA BOLIVAR ANGIE DEL CARMEN
                    // { cedula: '55300012' }, // 55300012 - CASTILLO RACINE YESMY ESTHER
                    // { cedula: '63325247' }, // 63325247 - CARRILLO CARRENO LUZ AMPARO
                    // { cedula: '1001914688' }, // 1001914688 - FUENTES CORREA GISELL PAOLA
                    { cedula: '1143132399' }, // 1143132399 - SOBRINO BARROS ALVARO YUNIOR
                    // { cedula: '1065616520' }, // 1065616520 - SALINA BERMUDEZ BELKI PAOLA
                    // { cedula: '37899633' }, // 37899633 - FIGUEREDO CALDERON LUZ ELENA
                    { cedula: '1045724924' }, // 1045724924 - FONTALVO GOMEZ LIZ YOLAYNE
                    { cedula: '1140834704' }, // 1140834704 - JAINER CARO FRANCO

                    { cedula: '1042454684' }, // K A - 1042454684
                ];

                $scope.permisosNacional = asistentesNacionales.findIndex(e => e.cedula == $scope.cedulaLogin) != -1 ? true : false;

                if ($scope.permisosRegionales || $scope.permisosNacional) {
                    $scope.obtenerCantidadesEmpresa()
                    $scope.obtenerCantidadesAfili()
                }

                $scope.ocultar_icono = false;
                $scope.tipo_modulo = 'D';
                setTimeout(() => { 
                    $scope.validar_Permisos();
                 }, 1000);
                setTimeout(() => { $scope.$apply(); }, 500);
            }

            //validar icono para mostrar
            $scope.validador_De_fecha = function () {

                if (sessionStorage.getItem('cedula') == '1045740349' || sessionStorage.getItem('cedula') == '22667472' ||
                    sessionStorage.getItem('cedula') == '72215168' || sessionStorage.getItem('cedula') == '1062426915'
                    || sessionStorage.getItem('cedula') == '1140889298' || sessionStorage.getItem('cedula') == '1143457336'
                    || sessionStorage.getItem('cedula') == '1143450658' || sessionStorage.getItem('cedula') == '1042454684') {
                    $scope.ocultar_icono = true;
                } else {
                    $scope.ocultar_icono = false;
                }
            }

            $scope.confirmar_aportante = function () {

                swal({
                    title: 'Confirmar Proceso',
                    text: "Desea confirmar aportante?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Cancelar'
                }).then(function (result) {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'actualizaraportante',
                                tipo: $scope.tipo_modulo,
                                documento: $scope.nitempresa,
                                responsable: $scope.cedulaLogin

                            }
                        }).then(function (response) {
                            if (response.data.codigo == '0') {
                                swal({
                                    title: response.data.mensaje,
                                    timer: 3000,
                                    type: 'success'
                                }).catch(swal.noop);
                                //   $scope.buscarcensocodigo();
                                //   $scope.buscarcenso();
                                //   $scope.cerrarModal();
                                // $scope.verAutorizaciones = false;


                            } else {
                                swal('Advertencia', 'Error al confirmar aportante', 'warning')




                            }
                        })
                    }
                }).catch(swal.noop);


            }

            //CARGAR DEPARTAMENTO
            $(".ngdialog-close").css({ "margin-top": "-4px" });
            $http({
                method: 'POST',
                url: "php/funclistas.php",
                data: { function: 'cargaDepartamentos' }
            }).then(function (response) {
                $scope.Departamentos = response.data;
            });

            function formatDate(date) {
                try {
                    var month = date.getUTCMonth() + 1;
                    date = date.getDate() + "/" + month + "/" + date.getFullYear();
                    return date;
                }
                catch (error) {
                    // console.log("fecha");
                    //return date;
                }
            }

            // Validar Permisos
            $scope.validar_Permisos = function () {
                if ($scope.permisosNacional) {
                    $scope.editar_novedad = 'S';
                    $scope.OcultarContraAsesor = false;
                    $scope.Ocultarform = true;
                    $scope.Ocultarcontra = false;
                    $scope.setTab(1);
                } else {
                    $scope.editar_novedad = 'N';
                    if ($scope.regional != '1') {
                        // $scope.ocultar_municipio = false;
                        $scope.setTab31(2)
                    }
                    $scope.OcultarContraAsesor = true;
                    $scope.Ocultarform = false;
                    $scope.Ocultarcontra = true;
                    $scope.setTab(2);
                }
            }

            $scope.chgBusquedaListado = function (listado, keyword) {
                if ((keyword === undefined) || (keyword.length > 3)) {
                    $http({
                        method: 'POST',
                        url: "php/movilidad/funcmovilidad.php",
                        data: {
                            function: 'obtenerListados', vp_listado: listado, vp_key: keyword
                        }
                    }).then(function (response) {
                        switch (listado) {
                            case 'apoc_tipo_documento':
                                $scope.tdocuemnto = response.data;
                                break;
                            case 'apon_tipo_empleador':
                                $scope.tipoemplador = response.data;
                                break;
                            case 'apoc_clasificacion':
                                $scope.clasi = response.data;
                                break;
                            case 'apon_clase_empleador':
                                $scope.claseempleador = response.data;
                                break;
                            case 'apoc_actividad':
                                $scope.actividadempresa = response.data;
                                break;
                            case 'apon_forma_pago':
                                $scope.tipopago = response.data;
                                break;
                            case 'apon_tipo_persona':
                                $scope.tipopersona = response.data;
                                break;
                            default:
                                return;
                        }
                    });
                }
            }
            //CARGAR MUNICIPIO
            $scope.filterMunicipio = function (data) {
                var combo = document.getElementById("depaprincipal");
                var selected = data;
                // console.log(selected);
                $http({
                    method: 'POST',
                    url: "php/funclistas.php",
                    data: { function: 'cargaMunicipios', depa: selected }
                }).then(function (response) {
                    $scope.municipio = "";
                    $scope.Municipios = response.data;
                    $scope.munprincipal = "";
                });
            }
            //FUNCIONAMIENMTO DE LAS TAB
            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        $scope.Title = "Parametrización";
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        $scope.Title = "Gestión de Empresas";
                        break;
                    case 3:
                        $(".tabIII").addClass("tabactiva");
                        $scope.Title = "Gestión por Asesores";
                        $scope.setTab5(1);
                        break;
                    case 4:
                        $(".tabIV").addClass("tabactiva");
                        $scope.Title = "Gestión por Afiliaciones";
                        $scope.setTab6(1);
                        break;
                    default:
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }
            $scope.setTab(1);
            //TAB INTERNA
            $scope.setTab2 = function (newTab) {
                $scope.ta2 = newTab;
                $(".taI").removeClass("tabactiva");
                $(".taII").removeClass("tabactiva");

                switch (newTab) {
                    case 1:
                        $(".taI").addClass("tabactiva");
                        $scope.OcultarTemporal = false;
                        break;
                    case 2:
                        $(".taII").addClass("tabactiva");
                        break;
                    default:
                }
            }
            $scope.isSet2 = function (tabNum) {
                return $scope.ta2 === tabNum;
            }
            $scope.setTab2(1);
            $scope.setTab31 = function (newTab) {
                $scope.ta31 = newTab;
                $(".taI").removeClass("tabactiva");
                $(".taII").removeClass("tabactiva");

                switch (newTab) {
                    case 1:
                        $(".taI").addClass("tabactiva");
                        break;
                    case 2:
                        $(".taII").addClass("tabactiva");
                        break;
                    default:
                }
            }
            $scope.isSet31 = function (tabNum) {
                return $scope.ta31 === tabNum;
            }
            $scope.setTab31(1);
            $scope.setTab5 = function (newTab) {
                $scope.ta5 = newTab;
                $(".taI").removeClass("tabactiva");
                $(".taII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $('#resultDemandas').dataTable().fnDestroy();
                        $(".taI").addClass("tabactiva");
                        $scope.lista_cantidades_asesores('A');
                        $scope.aparecer_detalles_gestion = true;
                        $scope.Solicitud_Activas_xAsesor = false;
                        $scope.status = 'A';
                        console.log('A');
                        break;
                    case 2:
                        $('#resultDemandas').dataTable().fnDestroy();
                        console.log('B');
                        $scope.status = 'B';
                        $(".taII").addClass("tabactiva");
                        $scope.lista_cantidades_asesores('P');
                        $scope.aparecer_detalles_gestion = true;
                        $scope.Solicitud_Activas_xAsesor = false;

                        break;
                    default:
                }
            }
            $scope.isSet5 = function (tabNum) {
                return $scope.ta5 === tabNum;
            }
            $scope.setTab6 = function (newTab) {
                $scope.ta6 = newTab;
                $(".ta6I").removeClass("tabactiva");
                $(".ta6II").removeClass("tabactiva");
                $(".ta6III").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $('#resultDemandas2').dataTable().fnDestroy();
                        $scope.lista_cantidades_asesores2('A');
                        $(".ta6I").addClass("tabactiva");
                        $scope.aparecer_detalles_gestion = true;
                        $scope.Solicitud_Activas_xAsesor = false;
                        break;
                    case 2:
                        $('#resultDemandas2').dataTable().fnDestroy();
                        $scope.lista_cantidades_asesores2('P');
                        $(".ta6II").addClass("tabactiva");
                        $scope.aparecer_detalles_gestion = true;
                        $scope.Solicitud_Activas_xAsesor = false;
                        $scope.status = 'S';
                        console.log($scope.status);
                        break;
                    case 3:
                        $('#resultDemandas2').dataTable().fnDestroy();
                        $scope.lista_cantidades_asesores2('R');
                        $(".ta6II").addClass("tabactiva");
                        $scope.aparecer_detalles_gestion = true;
                        $scope.Solicitud_Activas_xAsesor = false;
                        break;
                    default:
                }
            }
            $scope.isSet6 = function (tabNum) {
                return $scope.ta6 === tabNum;
            }

            $scope.setTab3 = function (newTab) {
                $scope.ta3 = newTab;
                $(".taI").removeClass("tabactiva");
                $(".taII").removeClass("tabactiva");
                $(".taIII").removeClass("tabactiva");

                switch (newTab) {
                    case 1:
                        $(".taI").addClass("tabactiva");
                        $scope.OcultarTemporal = false;
                        break;
                    case 2:
                        $(".taII").addClass("tabactiva");
                        break;
                    case 3:
                        $(".taIII").addClass("tabactiva");
                        break;
                    default:
                }
            }
            $scope.isSet3 = function (tabNum) {
                return $scope.ta3 === tabNum;
            }
            $scope.setTab3(1);
            //FIN DE FUNCIONES TAB

            //VARIABLES INICIALES
            $scope.tipo_documento = '';
            $scope.nokeyword = true;
            $scope.OcultarTabla = true;
            $scope.B_Tipo = true;
            $scope.B_Documento = true;
            $scope.OcultarBase = true;
            $scope.estado_solicitud = "A";
            $scope.OcultarActivacion = false;
            $scope.infoempresa = {
                tidentificacion: "",
                contra: "",
                nidentificacion: "",
                razonsocial: "",
                siglas: "",
                ntrabajadores: "",
                primerapellido: "",
                segundoapellido: "",
                primernombre: "",
                segundonombre: "",
                templador: "",
                tipoempresas: "",
                claseaportante: "",
                clasificacion: "",
                actividad: "",
                pago: "",
                ciudadpagos: "",
                dirprincipal: "",
                barprincipal: "",
                munprincipal: "",
                telprincipal: "",
                depaprincipal: "",
                nomsede: "",
                sitioweb: "",
                email: "",
                nomrepresentante: "",
                tdrepresentante: "",
                drepresentante: "",
                fnrepresentante: "",
                correorepresentante: "",
                nomcargo: "",
                telcargo: "",
                celcargo: "",
                fncargo: "",
                cargo: "",
                emailcargo: ""
            };
            $scope.ListadoDeAsesores = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'listaAsesoresAdmin' }
                }).then(function (response) {
                    $scope.Asesores = response.data;
                    // console.table(response.data)
                });
            }
            $scope.ListadoDeLosMotivos = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'listaMotivosRechazo' }
                }).then(function (response) {
                    $scope.Conceptos = response.data;
                });
            }
            $scope.ListadoDeAsesores();
            $scope.ListadoDeLosMotivos();
            $scope.AgregarAsesor = function () {
                $scope.DialogAsesores = ngDialog.open({
                    template: 'views/movilidad/modal/modalagregarasesor.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
                        $scope.BuscarAsesor = function () {
                            if ($scope.keyword.length > 3) {
                                $http({
                                    method: 'POST',
                                    url: "php/movilidad/funcmovilidad.php",
                                    data: {
                                        function: 'buscar_asesor',
                                        v_coincidencia: $scope.keyword
                                    }
                                }).then(function (response) {
                                    $scope.nokeyword = false;
                                    $scope.AsesoresC = response.data;
                                    if ($scope.AsesoresC.length == 0) {
                                        $scope.zeroresults = true;
                                    } else {
                                        $scope.zeroresults = false;
                                    }
                                });
                            } else {
                                $scope.nokeyword = true;
                                $scope.zeroresults = false;
                                $scope.AsesoresC = {};
                            }
                        }
                        $scope.Asesor = function (estado) {
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'agregar_asesor',
                                    v_cod_tercero: estado.identificacion
                                }
                            }).then(function (response) {
                                if (response.data.codigo == '0') {
                                    swal({
                                        title: 'Completado',
                                        text: response.data.mensaje,
                                        type: 'success',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok',
                                    }).then(function (result) {
                                        if (result) {
                                            $scope.closeThisDialog();
                                        }
                                    })

                                } else {
                                    swal('Información', response.data.mensaje, 'error');
                                }
                            });
                        }
                        $scope.SelecionarAsesor = function (identificacion, nombre) {
                            $('#D' + identificacion).addClass('arr');
                            $('#D' + identificacion).siblings().removeClass('arr');
                            $scope.asesorescogido = {
                                identificacion: identificacion,
                                nombre: nombre
                            }
                        }
                    }],
                    scope: $scope
                })
                $scope.DialogAsesores.closePromise.then(function () {
                    $scope.ListadoDeAsesores();
                })
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
            $scope.EliminarAsesor = function (codigo) {
                swal({
                    title: 'Confirmar',
                    text: '¿Desea eliminar el asesor?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'eliminar_asesor',
                                v_cod_tercero: codigo
                            }
                        }).then(function (response) {
                            if (response.data.codigo == '0') {
                                swal('¡Completado!', response.data.mensaje, 'success');
                                $scope.ListadoDeAsesores();
                            } else {
                                swal('Informacion', response.data.mensaje, 'error');
                            }
                        });
                    }
                })
            }
            $scope.actualizaAsesor = function (codAsesor, estado) {
                swal({
                    title: 'Confirmar',
                    text: '¿Desea actualizar el estado del asesor?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Actualizar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'p_u_asesor',
                                codAsesor,
                                estado: estado == 'S' ? 'N' : 'S'
                            }
                        }).then(function (response) {
                            if (response.data.codigo == '0') {
                                swal('¡Completado!', response.data.mensaje, 'success');
                                $scope.ListadoDeAsesores();
                            } else {
                                swal('Informacion', response.data.mensaje, 'error');
                            }
                        });
                    }
                })
            }
            $scope.AgregarMotivo = function () {
                var DialogMotivo = ngDialog.open({
                    template: 'views/movilidad/modal/modalagregarmotivo.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
                        $scope.Motivo = function (motivo) {
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'agregar_motivo',
                                    v_codigo: '0',
                                    v_motivo: motivo,
                                    v_accion: 'I'
                                }
                            }).then(function (response) {
                                if (response.data.codigo == '0') {
                                    swal({
                                        title: 'Completado',
                                        text: response.data.mensaje,
                                        type: 'success',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok',
                                    }).then(function (result) {
                                        if (result) {
                                            $scope.closeThisDialog();
                                        }
                                    })

                                } else {
                                    swal('Informanción', response.data.mensaje, 'error');
                                }
                            });
                        }
                    }],
                    scope: $scope
                })
                DialogMotivo.closePromise.then(function () {
                    $scope.ListadoDeLosMotivos();
                })
            }
            $scope.EditarMotivoModal = function () {
                $scope.EdiMotivo = $scope.motivoedit;
                ngDialog.open({
                    template: 'views/movilidad/modal/modalagregarmotivo2.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', function ($scope, $http, ngDialog) {
                        $scope.MotivoParaEditar = function (motivo) {
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'editar_motivo',
                                    v_codigo: $scope.codigoedit,
                                    v_motivo: motivo,
                                    v_accion: 'A'
                                }
                            }).then(function (response) {
                                if (response.data.codigo == '0') {
                                    swal({
                                        title: 'Completado',
                                        text: response.data.mensaje,
                                        type: 'success',
                                        confirmButtonColor: '#3085d6',
                                        confirmButtonText: 'Ok',
                                    }).then(function (result) {
                                        if (result) {
                                            $scope.closeThisDialog();
                                            $scope.ListadoDeLosMotivos();
                                        }
                                    })

                                } else {
                                    swal('Informanción', response.data.mensaje, 'error');
                                }
                            });
                        }

                    }],
                    scope: $scope
                })
            }
            $scope.EliminarMotivo = function (codigo, motivo) {
                swal({
                    title: 'Confirmar',
                    text: '¿Desea eliminar el motivo?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'agregar_motivo',
                                v_codigo: codigo,
                                v_motivo: motivo,
                                v_accion: 'E'
                            }
                        }).then(function (response) {
                            if (response.data.codigo == '0') {
                                swal('Completado!', response.data.mensaje, 'success');
                                $scope.ListadoDeLosMotivos();
                            } else {
                                swal('Informanción', response.data.mensaje, 'error');
                            }
                        });
                    }
                })
            }
            $scope.EditarMotivo = function (codigo, motivo) {
                $scope.codigoedit = codigo;
                $scope.motivoedit = motivo;
                $scope.EditarMotivoModal();
            }
            //Empresa
            $scope.BuscarEmpresaxasesor = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: {
                        function: 'obtener_informacion_empresa_asesor',
                        v_estado: $scope.estado_solicitud
                    }
                }).then(function (response) {

                    if (response.data.coderror == 0) {
                        $scope.asesorEmpresa = undefined;
                    } else {
                        // console.log(response.data);
                        if (response.data.length == 0) {
                            $scope.asesorEmpresa = undefined;
                        } else {
                            $scope.asesorEmpresa = response.data;
                            $scope.mostrar_empresa_asesor = true;
                        }
                    }

                })
            }
            $scope.BuscarEmpresaxasesor();
            $scope.mostrar_empresa_asesor = false;
            $scope.BuscarEmpresa = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $scope.OcultarBase = true;
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: {
                        function: 'obtener_informacion_empresa',
                        v_nit: $scope.nitempresa, v_documento: $scope.tipo_documento
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.info_empresa.resultados == 0) {
                        swal('Información', 'No se encontraron datos de la Empresa', 'info');


                    } else {
                        if (response.data.info_empresa) {
                            $scope.EmpleadosEmpresa = response.data.lista_responsables;
                            $scope.ArchivoEmpresa = response.data.lista_archivos;
                            $scope.Sedes = response.data.lista_sucursales;

                            $scope.Novedades = response.data.lista_novedades;
                            console.log($scope.Sedes);
                            $scope.OcultarTabla = false;
                            $scope.OcultarBase = false;
                            $scope.llenarform(response.data.info_empresa);
                        } else {
                            swal('Información', 'No existen datos de esta empresa.', 'info');
                        }
                    }

                })
            }
            $scope.editarinfor = function () {

                if ($scope.editar_informacion == false) {
                    $('#razonsocial').attr('disabled', 'disabled');
                    $('#siglas').attr('disabled', 'disabled');

                    $('#primerapellido').attr('disabled', 'disabled');
                    $('#segundoapellido').attr('disabled', 'disabled');
                    $('#primernombre').attr('disabled', 'disabled');
                    $('#segundonombre').attr('disabled', 'disabled');
                    $('#actualizar').attr('disabled', 'disabled');
                    $('#formuempresa2').find('input, textarea, button,select').attr('disabled', 'disabled');
                    $("select[name='tdrepresentante']").attr('disabled', 'disabled');

                    $('#anular').removeAttr('disabled', 'disabled');
                    $('#imprimir2').removeAttr('disabled', 'disabled');

                    $scope.formuempresa3 = true;
                } else {
                    $('#anular').removeAttr('disabled', 'disabled');
                    $('#razonsocial').removeAttr('disabled', 'disabled');
                    $('#siglas').removeAttr('disabled', 'disabled');
                    $('#primerapellido').removeAttr('disabled', 'disabled');
                    $('#segundoapellido').removeAttr('disabled', 'disabled');
                    $('#primernombre').removeAttr('disabled', 'disabled');
                    $('#segundonombre').removeAttr('disabled', 'disabled');
                    $('#actualizar').removeAttr('disabled', 'disabled');
                    $('#imprimir').removeAttr('disabled', 'disabled');
                    $('#imprimir2').removeAttr('disabled', 'disabled');
                    $('#nomrepresentante').removeAttr('disabled', 'disabled');
                    $("select[name='tdrepresentante']").removeAttr('disabled', 'disabled');
                    $('#drepresentante').prop("disabled", false);
                    $('#correorepresentante').removeAttr('disabled', 'disabled');
                    $('#fnrepresentante').removeAttr('disabled', 'disabled');
                    $('#actualizar2').removeAttr('disabled', 'disabled');
                    $('#formuempresa2').find('button').removeAttr('disabled', 'disabled');
                    $scope.formuempresa3 = false;
                }
            }
            $('#formuempresa').find('input, textarea, button, select').attr('disabled', 'disabled');
            $('#formuempresa2').find('input, textarea, button,select').attr('disabled', 'disabled');
            $('#imprimir').removeAttr('disabled', 'disabled');
            $('#imprimir2').removeAttr('disabled', 'disabled');

            $scope.formuempresa3 = true;
            $scope.llenarform = function (objeto) {
                console.log(objeto);
                //Estado
                $scope.nreguistro = objeto.numero_registro;
                $scope.codigoUbicacion = objeto.codigo_ubicacion;
                if (objeto.codigo_estado_registro == 'A' && $scope.permisosNacional) {

                    $scope.OcultarActivacion = true;
                    $('#formuempresa2').find('input, textarea, button, select').removeAttr('disabled', 'disabled')
                    $('#formuempresa').find('input, textarea, button, select').removeAttr('disabled', 'disabled')
                    $('.editar').attr('disabled', 'disabled')

                } else {
                    $scope.OcultarActivacion = false;
                    $('#formuempresa').find('input, textarea, button, select').attr('disabled', 'disabled');
                    $('#formuempresa2').find('input, textarea, button,select').attr('disabled', 'disabled');
                }

                //document.getElementById('confirmar').disabled = false;


                $scope.editar_informacion = false;
                $scope.Ocultarform = true;
                $scope.OcultarArchivo = true;
                $scope.Ocultarcontra = false;
                $scope.OcultarTablaEmpleados = true;
                $scope.OcultarTablaNovedades = true;

                //formulario 1
                $scope.infoempresa.asesor = objeto.nombre_asesor;
                $scope.infoempresa.fecha = objeto.fecha;
                $scope.infoempresa.origen = objeto.origen;
                $scope.infoempresa.contra = objeto.password;
                $scope.infoempresa.codigoubicacion = objeto.codigo_ubicacion;
                $scope.infoempresa.ubicacion = objeto.ubicacion;
                $scope.infoempresa.nreguistro = objeto.numero_registro;
                $scope.infoempresa.numeroformulario = objeto.numero_formulario;
                $scope.infoempresa.tidentificacion = objeto.codigo_tipo_documento;
                $scope.infoempresa.codigo_tipo_documento = objeto.codigo_tipo_documento;
                $scope.infoempresa.tidentificacionn = objeto.tipo_documento;
                $scope.infoempresa.nidentificacion = parseInt(objeto.documento);
                $scope.infoempresa.razonsocial = objeto.razon_social;
                $scope.infoempresa.siglas = objeto.sigla;
                $scope.infoempresa.primerapellido = objeto.apoc_primer_apellido;
                $scope.infoempresa.segundoapellido = objeto.apoc_segundo_apellido;
                $scope.infoempresa.primernombre = objeto.apoc_primer_nombre;
                $scope.infoempresa.segundonombre = objeto.apoc_segundo_nombre;
                $scope.infoempresa.templador = objeto.codigo_tipo_empleador;
                $scope.infoempresa.tipoempresas = objeto.codigo_tipo_persona;
                $scope.infoempresa.claseaportante = objeto.codigo_clase_empelador;
                $scope.infoempresa.pago = objeto.codigo_forma_pago;
                $scope.infoempresa.codigo_estado_registro = objeto.codigo_estado_registro;
                $scope.infoempresa.clasificacion = objeto.codigo_clasificacion;
                $scope.infoempresa.actividad = objeto.codigo_actividad + "  " + objeto.actividad;
                $scope.infoempresa.actividad_codigo = objeto.codigo_actividad;
                var fecha_for = objeto.fecha_vigencia.split("-");
                $scope.infoempresa.fvigencia = new Date(fecha_for[0], Number(fecha_for[1]) - 1, fecha_for[2]);
                $scope.infoempresa.vigencia = objeto.vigencia == 'Indefinida' ? 'I' : 'D';
                //formulario 2
                $scope.infoempresa.nomrepresentante = objeto.representante;
                $scope.infoempresa.tdrepresentante = objeto.tipo_doc_representante;
                $scope.infoempresa.drepresentante = objeto.doc_representante;
                var fecha_for1 = objeto.f_nacimiento_representante.split("-");
                $scope.infoempresa.fnrepresentante = new Date(fecha_for1[0], Number(fecha_for1[1]) - 1, fecha_for1[2]);
                // $scope.infoempresa.fnrepresentante = new Date(objeto.f_nacimiento_representante);

                $scope.infoempresa.correorepresentante = objeto.correo_representante;
                $scope.infoempresa.cargo = objeto.cargo_resoponsable;
                $scope.infoempresa.nomcargo = objeto.nombre_responsable;
                $scope.infoempresa.celcargo = objeto.celular_responsable;
                $scope.infoempresa.emailcargo = objeto.correo_responsable;
                $scope.infoempresa.telcargo = objeto.telefono_responsable;
                var fecha_for2 = objeto.f_nacimiento_responsable.split("-");
                $scope.infoempresa.fncargo = new Date(fecha_for2[0], Number(fecha_for2[1]) - 1, fecha_for2[2]);
                // $scope.infoempresa.fncargo = new Date(objeto.f_nacimiento_responsable);
                $('#confirmar').removeAttr('disabled', 'disabled');
                $scope.infoempresa.estado_apo = objeto.estado_registro;
                if ($scope.infoempresa.codigo_estado_registro == 'A' && $scope.permisosNacional) {
                    $scope.infoempresa.anular_registro_permiso = 'S';
                } else {
                    $scope.infoempresa.anular_registro_permiso = 'N';
                }

                $('#imprimir').removeAttr('disabled', 'disabled');
                $('#imprimir2').removeAttr('disabled', 'disabled');
            }
            $scope.enviarRespuesta = function () {

                $scope.novedad = "CRS";
                swal({
                    title: 'Confirmar',
                    text: '¿Desea Aprobar el Registro?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aprobar'
                }).then((result) => {
                    $scope.TipoArchivo = "";
                    $scope.v_ruta = "";
                    $scope.estado = 'P';
                    $scope.descripcion = "";
                    $http({
                        method: 'POST',
                        url: "php/movilidad/funcmovilidad.php",
                        data: {
                            function: 'enviar_respuesta',
                            v_numero_empresa: $scope.nreguistro,
                            v_ubicacio: $scope.codigoUbicacion,
                            v_accion: $scope.estado,
                            v_comentario: $scope.descripcion,
                            v_ruta: $scope.v_ruta,
                            v_tipo_archivo: $scope.TipoArchivo
                        }
                    }).then(function (response) {
                        if (response.data.codigo == 0) {
                            swal('Completado', response.data.mensaje, 'success');
                            $scope.BuscarEmpresa();
                        } else {
                            swal('Información', response.data.mensaje, 'error');
                        }
                    })
                })

            }
            $scope.modalAprovaReguistro = function (texto) {
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/movilidad/modal/modalAprovaReguistro.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalAprovarCtrl',
                    scope: $scope
                });
            }
            $scope.modalVerAdjuntos = function (ruta) {
                $scope.tablaarchivos = ruta;
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/movilidad/modal/modalVerAdjuntos.html',
                    className: 'ngdialog-theme-plain',

                    scope: $scope
                });
            }
            $scope.AgregarSede = function (nreguistro, codigoUbicacion) {
                var DialogInfoBasEmp = ngDialog.open({
                    template: 'views/movilidad/modal/modaleditarsede.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {

                        afiliacionHttp.obtenerDocumento().then(function (response) {
                            $scope.nreguistro = nreguistro;
                            $scope.codigoUbicacion = codigoUbicacion;
                            $scope.sede = "";
                            $scope.nombre = "";
                            $scope.empleados = "";
                            $scope.direccion = "";
                            $scope.barrio = "";
                            $scope.correo = "";
                            $scope.telefono = "";

                        })
                        $scope.regDireccion = function () {
                            $("#files_afiliado").focus();
                            $scope.dialogDireccion = ngDialog.open({
                                template: 'views/movilidad/modal/modalDir.html',
                                className: 'ngdialog-theme-plain',
                                controller: 'modaldireccioncontroller',
                                scope: $scope
                            });

                            $scope.dialogDireccion.closePromise.then(function (data) {
                                if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value.direccionModal != '') {
                                    $scope.direccion = data.value.direccionModal;
                                }
                            });
                        }
                        $scope.Informacion = function () {
                            if ($scope.direccion == "" || $scope.direccion == undefined || $scope.direccion == "" || $scope.direccion == undefined ||
                                $scope.telefono == "" || $scope.telefono == undefined || $scope.correo == "" || $scope.correo == undefined ||
                                $scope.nombre == "" || $scope.nombre == undefined || $scope.empleados == "" || $scope.empleados == undefined) {
                                swal('Información', "Debe llenar todos loca campos antes de agregar", 'error');
                            } else {
                                swal({
                                    title: 'Confirmar',
                                    text: '¿Desea guardar la información?',
                                    type: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Guardar'
                                }).then((result) => {
                                    if (result) {
                                        $http({
                                            method: 'POST',
                                            url: "php/movilidad/funcmovilidad.php",
                                            data: {
                                                function: 'guardarsede',
                                                v_pnumero: $scope.nreguistro,
                                                v_pubicacion: $scope.munprincipal,
                                                v_ubicacion_apo: $scope.infoempresa.codigoubicacion,
                                                v_pdireccion: $scope.direccion,
                                                v_pbarrio: $scope.barrio,
                                                v_telefono: $scope.telefono,
                                                v_email: $scope.correo,
                                                v_nombre_sede: $scope.nombre,
                                                v_cantidad_empleados: $scope.empleados
                                            }
                                        }).then(function (response) {
                                            if (response.data.codigo == 0) {
                                                swal('Completado', response.data.mensaje, 'success');

                                            } else {
                                                swal('Información', response.data.mensaje, 'error');
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }],
                    scope: $scope
                })
                DialogInfoBasEmp.closePromise.then(function () {
                    $scope.BuscarEmpresa();
                })
            }

            $scope.anula_formulario = function () {


                swal({
                    title: 'Confirmar',
                    text: '¿Desea Anular el Registro de la Empresa?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Anular'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'p_anular_registro',
                                v_numero: $scope.nreguistro,
                                v_ubicacion: $scope.codigoUbicacion
                            }
                        }).then(function (response) {
                            if (response.data.codigo == 1) {
                                swal('Información', response.data.mensaje, 'error');

                            } else {

                                swal('Completado', response.data.mensaje, 'success');

                                function letsWaitALittle() {
                                    $scope.BuscarEmpresa();
                                } setTimeout(letsWaitALittle, 100);


                            }
                        })
                    }
                })

            }


            $scope.actualizarinfor1 = function () {
                if ($scope.infoempresa.tidentificacion == 'C') {
                    $scope.infoempresa.razonsocial = $scope.infoempresa.primerapellido + " " + $scope.infoempresa.segundoapellido + " " + $scope.infoempresa.primernombre + " " + $scope.infoempresa.segundonombre;

                }

                if ($scope.infoempresa.tidentificacion == 'N') {
                    $scope.infoempresa.primerapellido = null;
                    $scope.infoempresa.segundoapellido = null;
                    $scope.infoempresa.primernombre = null;
                    $scope.infoempresa.segundonombre = null;
                }


                $scope.novedad = "CRS";
                if (($scope.infoempresa.razonsocial == null) || ($scope.infoempresa.razonsocial == "   " || $scope.infoempresa.razonsocial == undefined)) {
                    swal('Información', 'Para hacer el cambio de la Razon social, el campo debe contener datos', 'error');
                } else {
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea Actualizar la información?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Guardar'
                    }).then((result) => {
                        if (result) {
                            console.log($scope.infoempresa);
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'generarnovedad',
                                    numero_aportante: $scope.nreguistro,
                                    ubicacion_aportante: $scope.codigoUbicacion,
                                    novedad: $scope.novedad,
                                    razon_social: $scope.infoempresa.razonsocial,
                                    v_sigla: $scope.infoempresa.siglas,
                                    nombre_representante: $scope.infoempresa.nomrepresentante,
                                    documento_representante: $scope.infoempresa.drepresentante,
                                    nacimiento_representante: $scope.infoempresa.fnrepresentante,
                                    correo_representante: $scope.infoempresa.correorepresentante,
                                    primer_name: $scope.infoempresa.primernombre,
                                    segundo_name: $scope.infoempresa.segundonombre,
                                    primer_apellido: $scope.infoempresa.primerapellido,
                                    segundo_apellido: $scope.infoempresa.segundoapellido,
                                    responsable: "",
                                    adjunto: ""
                                }
                            }).then(function (response) {
                                if (response.data.codigo == 1) {
                                    swal('Información', response.data.mensaje, 'error');

                                } else {

                                    swal('Completado', response.data.mensaje, 'success');
                                    $scope.BuscarEmpresa();

                                }
                            })
                        }
                    })
                }
            }
            $scope.guardarActualizacion = function () {
                if ($scope.infoempresa.tidentificacion == 'C') {
                    $scope.infoempresa.razonsocial = $scope.infoempresa.primerapellido + " "
                        + $scope.infoempresa.segundoapellido + " " + $scope.infoempresa.primernombre + " " + $scope.infoempresa.segundonombre;
                    console.log($scope.infoempresa.razonsocial)
                }

                if ($scope.infoempresa.razonsocial == null || $scope.infoempresa.razonsocial == undefined
                    || $scope.infoempresa.templador == null || $scope.infoempresa.templador == undefined
                    || $scope.infoempresa.nidentificacion == null || $scope.infoempresa.nidentificacion == undefined
                    || $scope.infoempresa.tidentificacion == null || $scope.infoempresa.tidentificacion == undefined
                    || $scope.infoempresa.tipoempresas == null || $scope.infoempresa.tipoempresas == undefined
                    || $scope.infoempresa.claseaportante == null || $scope.infoempresa.claseaportante == undefined
                    || $scope.infoempresa.pago == null || $scope.infoempresa.pago == undefined
                    || $scope.infoempresa.emailcargo == null || $scope.infoempresa.emailcargo == undefined
                ) {
                    swal('Información', 'Para hacer el cambio de la información de la empresa, los campo obligatorios debe contener datos', 'error');
                } else {
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea Actualizar la información de los datos de la empresa?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Guardar'
                    }).then((result) => {
                        if (result) {
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'actualiza_aportante',
                                    v_numero: $scope.nreguistro,
                                    v_ubicacion: $scope.codigoUbicacion,
                                    v_tipo_documento_aportante: $scope.infoempresa.codigo_tipo_documento,
                                    v_documento_aportante: $scope.infoempresa.nidentificacion,
                                    v_razon_social: $scope.infoempresa.razonsocial,
                                    v_sigla: $scope.infoempresa.siglas,
                                    v_tipo_empleador: $scope.infoempresa.templador,
                                    v_tipo_persona: $scope.infoempresa.tipoempresas,
                                    v_clase_empleador: $scope.infoempresa.claseaportante,
                                    v_forma_pago: $scope.infoempresa.pago,
                                    v_clasificacion: $scope.infoempresa.clasificacion,
                                    v_actividad: $scope.infoempresa.actividad_codigo,
                                    v_vigencia: $scope.infoempresa.vigencia,
                                    //v_fecha_vigencia: formatDate($scope.infoempresa.fvigencia),
                                    v_fecha_vigencia: $scope.infoempresa.fvigencia,
                                    v_representante: $scope.infoempresa.nomrepresentante,
                                    v_tipo_doc_representante: $scope.infoempresa.tdrepresentante,
                                    v_doc_representante: $scope.infoempresa.drepresentante,
                                    //v_nacimiento_representante: formatDate($scope.infoempresa.fnrepresentante),
                                    v_nacimiento_representante: $scope.infoempresa.fnrepresentante,
                                    v_correo_representante: $scope.infoempresa.correorepresentante,
                                    v_nombre_responsable: $scope.infoempresa.nomcargo,
                                    v_telefono_responsable: $scope.infoempresa.telcargo,
                                    v_celular_responsable: $scope.infoempresa.celcargo,
                                    //v_nacimiento_responsable: formatDate($scope.infoempresa.fncargo),
                                    v_nacimiento_responsable: $scope.infoempresa.fncargo,
                                    v_correo_responsable: $scope.infoempresa.emailcargo

                                }
                            }).then(function (response) {
                                if (response.data.codigo == 1) {
                                    swal('Información', response.data.mensaje, 'error');

                                } else {

                                    swal('Completado', response.data.mensaje, 'success');
                                    $scope.BuscarEmpresa();

                                }
                            })
                        }
                    })
                }
            }
            $scope.actualizarinfor2 = function () {
                if (
                    ($scope.infoempresa.nomrepresentante == null) || ($scope.infoempresa.nomrepresentante == "") || ($scope.infoempresa.nomrepresentante == undefined) ||
                    // ($scope.infoempresa.tipo_doc_representante==null)||($scope.infoempresa.tipo_doc_representante=="")||($scope.infoempresa.tipo_doc_representante==undefined)||
                    ($scope.infoempresa.drepresentante == null) || ($scope.infoempresa.drepresentante == "") || ($scope.infoempresa.drepresentante == undefined) ||
                    ($scope.infoempresa.fnrepresentante == null) || ($scope.infoempresa.fnrepresentante == "") || ($scope.infoempresa.fnrepresentante == undefined) ||
                    ($scope.infoempresa.correorepresentante == null) || ($scope.infoempresa.correorepresentante == "") || ($scope.infoempresa.correorepresentante == undefined)
                ) {
                    swal('Información', 'Para hacer el cambio de los datos del representante legal, los campo debe estar llenos', 'error');
                } else {
                    $scope.novedad = "CRL";
                    swal({
                        title: 'Confirmar',
                        text: '¿Desea Actualizar la información?',
                        type: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Actualizar'
                    }).then((result) => {
                        if (result) {
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'generarnovedad',
                                    numero_aportante: $scope.nreguistro,
                                    tdrepresentante: $scope.infoempresa.tdrepresentante,
                                    ubicacion_aportante: $scope.codigoUbicacion,
                                    novedad: $scope.novedad,
                                    razon_social: $scope.infoempresa.razonsocial,
                                    v_sigla: $scope.infoempresa.siglas,
                                    nombre_representante: $scope.infoempresa.nomrepresentante,
                                    documento_representante: $scope.infoempresa.drepresentante,
                                    nacimiento_representante: $scope.infoempresa.fnrepresentante,
                                    correo_representante: $scope.infoempresa.correorepresentante,
                                    responsable: ""
                                }
                            }).then(function (response) {
                                if (response.data.codigo == 0) {
                                    swal('Completado', response.data.mensaje, 'success');
                                    $scope.BuscarEmpresa();
                                } else {
                                    swal('Información', response.data.mensaje, 'error');


                                }
                            })
                        }
                    })
                }
            }
            $scope.EditarSede = function (sede, nombre, empleados, direccion, barrio, correo, telefono, renglon) {

                var DialogInfoBasEmp = ngDialog.open({
                    template: 'views/movilidad/modal/modaleditarsede.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {

                        afiliacionHttp.obtenerDocumento().then(function (response) {

                            $scope.sede = sede;
                            $scope.nombre = nombre;
                            $scope.empleados = parseInt(empleados);
                            $scope.direccion = direccion;
                            $scope.barrio = barrio;
                            $scope.correo = correo;
                            $scope.telefono = telefono;
                            $scope.renglon = renglon;

                        })
                        $scope.regDireccion = function () {
                            $("#files_afiliado").focus();
                            $scope.dialogDireccion = ngDialog.open({
                                template: 'views/movilidad/modal/modalDir.html',
                                className: 'ngdialog-theme-plain',
                                controller: 'modaldireccioncontroller',
                                scope: $scope
                            });

                            $scope.dialogDireccion.closePromise.then(function (data) {
                                if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document' && data.value.direccionModal != '') {
                                    $scope.direccion = data.value.direccionModal;
                                }
                            });
                        }
                        $scope.Informacion = function () {
                            if ($scope.direccion == "" || $scope.direccion == undefined || $scope.direccion == "" || $scope.direccion == undefined ||
                                $scope.telefono == "" || $scope.telefono == undefined || $scope.correo == "" || $scope.correo == undefined ||
                                $scope.munprincipal == "" || $scope.munprincipal == undefined || $scope.munprincipal == "" || $scope.munprincipal == undefined ||
                                $scope.nombre == "" || $scope.nombre == undefined || $scope.empleados == "" || $scope.empleados == undefined) {
                                swal('Información', "Debe llenar todos los campos antes de agregar", 'error');
                            } else {
                                swal({
                                    title: 'Confirmar',
                                    text: '¿Desea editar la informacion?',
                                    type: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Editar'
                                }).then((result) => {
                                    if (result) {
                                        $http({
                                            method: 'POST',
                                            url: "php/movilidad/funcmovilidad.php",
                                            data: {
                                                function: 'editar_sede_novedad',
                                                v_numero: $scope.nreguistro,
                                                v_ubicacion: $scope.codigoUbicacion,
                                                v_renglon: $scope.renglon,
                                                v_new_ubicacion: $scope.munprincipal,
                                                v_new_direccion: $scope.direccion,
                                                v_new_barrio: $scope.barrio,
                                                v_new_telefono: $scope.telefono,
                                                v_new_email: $scope.correo,
                                                v_new_nombre: $scope.nombre,
                                                v_cantidad_empleados: $scope.empleados,
                                                v_responsable: $scope.documento_empleado
                                            }
                                        }).then(function (response) {
                                            if (response.data.codigo == 0) {
                                                swal('Completado', response.data.mensaje, 'success');
                                                $scope.closeThisDialog();
                                            } else {
                                                swal('Información', response.data.mensaje, 'error');
                                            }
                                        })
                                    }
                                })

                            }
                        }
                    }],
                    scope: $scope
                })
                DialogInfoBasEmp.closePromise.then(function () {
                    $scope.BuscarEmpresa();
                })
            }
            $scope.aprobarnovedad = function (ubicacion, codigo, ac) {
                var ubic = ubicacion;
                var codi = codigo;
                var accion = ac;
                var nom_accion = (accion == 'X') ? 'Rechazar' : 'Aprobar';
                swal({
                    title: 'Confirmar',
                    text: '¿Desea ' + nom_accion + ' la Novedad?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: nom_accion
                }).then((result) => {

                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'aprobarnovedad',
                                v_numero_novedad: codi,
                                v_ubicacion: ubic,
                                v_accion: accion
                            }
                        }).then(function (response) {
                            if (response.data.codigo == 0) {
                                swal('Completado', "Novedad Registrada", 'success');
                                $scope.BuscarEmpresa();
                            } else {
                                swal('Información', response.data.mensaje, 'error');
                            }
                        })
                    }
                })
            }
            $scope.EditarInformacion = function (nit, tipo, doc, nombre, telefono, correo, estado) {

                var DialogInfoBasEmp = ngDialog.open({
                    template: 'views/movilidad/modal/modaleditarinfo.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {

                        afiliacionHttp.obtenerDocumento().then(function (response) {
                            $scope.type_d = response.Documento;
                            $scope.NitEmpresa = nit;
                            $scope.A_Tipo = tipo;
                            $scope.A_Documento = doc;
                            $scope.A_Nombre = nombre;
                            $scope.A_Telefono = telefono;
                            $scope.A_Email = correo;
                            $scope.A_Estado = estado;
                        })
                        $scope.Informacion = function () {
                            swal({
                                title: 'Confirmar',
                                text: '¿Desea editar la informacion?',
                                type: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Editar'
                            }).then((result) => {
                                if (result) {
                                    $http({
                                        method: 'POST',
                                        url: "php/movilidad/funcmovilidad.php",
                                        data: {
                                            function: 'editar_infoba_empleado_emp',
                                            v_accion: 'A',
                                            v_nit: $scope.NitEmpresa,
                                            v_tipo_doc: $scope.A_Tipo,
                                            v_num_doc: $scope.A_Documento,
                                            v_nombre: $scope.A_Nombre,
                                            v_sede: '',
                                            v_telefono: $scope.A_Telefono,
                                            v_correo: $scope.A_Email,
                                            v_estado: $scope.A_Estado
                                        }
                                    }).then(function (response) {
                                        if (response.data.codigo == 0) {
                                            swal('Completado', response.data.mensaje, 'success');
                                            $scope.closeThisDialog();
                                        } else {
                                            swal('Información', response.data.mensaje, 'error');
                                        }
                                    })
                                }
                            })

                        }
                    }],
                    scope: $scope
                })
                DialogInfoBasEmp.closePromise.then(function () {
                    $scope.BuscarEmpresa();
                })
            }
            $scope.GenerarPass = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'generar_pass' }
                }).then(function (response) {
                    $scope.generarpassword = response.data;
                })
            }
            $scope.CambiarPass = function () {
                if ($scope.generarpassword == undefined || $scope.generarpassword == "") {
                    swal('Error', 'No puede generar una Contraseña vacia', 'warning');
                } else if ($scope.generarpassword.length < 7) {
                    swal('Error', 'Debe tener una longitud minima 7 caracteres', 'warning');
                } else {
                    $http({
                        method: 'POST',
                        url: "php/movilidad/funcmovilidad.php",
                        data: {
                            function: 'actualizar_pass',
                            v_nit: $scope.nitempresa,
                            v_password: $scope.generarpassword
                        }
                    }).then(function (response) {
                        if (response.data.coderror == '0') {
                            swal('Completado', response.data.mensaje, 'success')
                            $scope.generarpassword = '';
                        } else {
                            swal('Error', response.data.mensaje, 'warning');
                            $scope.generarpassword = '';
                        }
                    })
                }
            }
            $scope.AgregarEmpleadoEmp = function (nit) {
                $scope.nitempresa = nit;
                var AgregarEmpEmp = ngDialog.open({
                    template: 'views/movilidad/modal/modaleditarinfo.html',
                    className: 'ngdialog-theme-plain',
                    controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {
                        $scope.A_Tipo = { Codigo: '' };
                        $scope.B_Tipo = false;
                        $scope.B_Documento = false;
                        $scope.B_Nombre = false;
                        $scope.B_Email = false;
                        $scope.B_Telefono = false;
                        afiliacionHttp.obtenerDocumento().then(function (response) {
                            $scope.type_d = response.Documento;
                        })
                        $scope.Informacion = function () {
                            $http({
                                method: 'POST',
                                url: "php/movilidad/funcmovilidad.php",
                                data: {
                                    function: 'editar_infoba_empleado_emp',
                                    v_accion: 'I',
                                    v_nit: $scope.nitempresa,
                                    v_tipo_doc: $scope.A_Tipo,
                                    v_num_doc: $scope.A_Documento,
                                    v_nombre: $scope.A_Nombre,
                                    v_sede: '',
                                    v_telefono: $scope.A_Telefono,
                                    v_correo: $scope.A_Email,
                                    v_estado: 'I'
                                }
                            }).then(function (response) {
                                if (response.data.coderror == 0) {
                                    swal('Completado', response.data.mensaje, 'success');
                                    $scope.closeThisDialog();
                                } else {
                                    swal('Informanción', response.data.mensaje, 'error');
                                }
                            })
                        }
                    }],
                    scope: $scope
                })
                AgregarEmpEmp.closePromise.then(function () {
                    $scope.BuscarEmpresa();
                })
            }
            $scope.EliminarEmpleado = function (tipo_doc, doc, nombre, correo, telefono, codigo) {
                $scope.td = tipo_doc;
                $scope.d = doc;
                $scope.n = nombre;
                $scope.c = correo;
                $scope.t = telefono;
                $scope.e = codigo;
                swal({
                    title: 'Confirmar',
                    text: '¿Desea eliminar el empleado?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'editar_infoba_empleado_emp',
                                v_accion: 'E',
                                v_nit: $scope.nitempresa,
                                v_tipo_doc: $scope.td,
                                v_num_doc: $scope.d,
                                v_nombre: $scope.n,
                                v_sede: '',
                                v_telefono: $scope.t,
                                v_correo: $scope.c,
                                v_estado: $scope.A_Estado
                            }
                        }).then(function (response) {
                            if (response.data.coderror == '0') {
                                swal('Completado!', response.data.mensaje, 'success');
                                $scope.BuscarEmpresa();
                            } else {
                                swal('Informanción', response.data.mensaje, 'error');
                            }
                        })
                    }
                })
            }
            $scope.gestionar_empresa = function (tipo, documento) {
                console.log(tipo);
                $scope.tipo_documento = tipo;
                $scope.nitempresa = documento;
                $scope.setTab31(2);

                function letsWaitALittle() {
                    $scope.setTab31(2);
                    $scope.tipo_documento = tipo;
                    $scope.nitempresa = documento;
                    $scope.BuscarEmpresa();
                } setTimeout(letsWaitALittle, 0);
                $scope.personanatural = false;




            }
            $scope.Imprimirinfor = function () {
                $window.open('views/movilidad/soporte/inforempresa.php?tipo=' + $scope.infoempresa.tidentificacion + '&id=' + $scope.infoempresa.nidentificacion, '_blank', "width=1080,height=1100");
            }
            // guia interactiva
            $scope.TourInit = { active: false, valide: false };
            $scope.guideTour = function (tour, id) {
                if ($scope.TourInit.active == false) {
                    $scope.TourInit.active = true;
                    $scope.Now = 0;
                    $scope.id = id;
                    switch (tour) {
                        case 'PORASESOR':
                            $scope.steps = [
                                { ir: '#buscarporasesores', posicion: 'bottom', flecha: false, style: 'margin-left: 10em!important;margin-top: 2em!important;', titulo: 'Bienvenido a la guía interactiva', descripcion: 'Te daremos un breve recorrido y explicaremos cada opción de la gestión empresas' },
                                { ir: '#divestado_solicitud', posicion: 'bottom', flecha: true, style: 'top: 410px;left: 29vw;', titulo: 'BUSCAR POR ASESOR', descripcion: 'Paso 2: Seleccione el estado de solicitud' },
                                { ir: '#divporasesor', posicion: 'bottom', flecha: true, style: 'top: 410px;left: 53vw;', titulo: 'BUSCAR POR ASESOR', descripcion: 'Paso 3: Clic al icono de la lupa para consultar' },
                                { ir: '#divtablaasesores', posicion: 'top', flecha: true, style: 'top: 300px;left: 46vw;', titulo: 'BUSCAR POR ASESOR', descripcion: 'Paso 4: tabla donde estan tus gestiones de empresa dependiendo del filtro' },
                                { ir: '#buscarporasesores', posicion: 'bottom', flecha: false, style: 'margin: 10em!important;', titulo: 'Fin de la guía interactiva', descripcion: 'Has finalizado el recorrido ahora puedes continuar con la gestion de empresas.' }
                            ];
                            break;
                    }
                    $scope.positionStep($scope.Now);
                    $scope.dataStep($scope.Now);
                    $($scope.id).removeClass("icon-help").addClass("icon-cancel");
                } else {
                    $scope.TourInit.active = false;
                    $($scope.id).removeClass("icon-cancel").addClass("icon-help");
                    $($scope.steps[$scope.Now].ir).removeClass("focusElement");
                }
            };
            $scope.nextStep = function () {
                if ($scope.Now >= 0 && $scope.Now < ($scope.steps.length - 1)) {
                    $($scope.steps[$scope.Now].ir).removeClass("focusElement");
                    $scope.Now = $scope.Now + 1;
                    if ($scope.Now != ($scope.steps.length - 1)) {
                        $($scope.steps[$scope.Now].ir).addClass("focusElement");
                    }
                    $scope.positionStep($scope.Now);
                } else {
                    $scope.guideTour();
                }
            }
            $scope.backStep = function () {
                if ($scope.Now > 0 && $scope.Now < ($scope.steps.length - 1)) {
                    $($scope.steps[$scope.Now].ir).removeClass("focusElement");
                    $scope.Now = $scope.Now - 1;
                    if ($scope.Now != 0) {
                        $($scope.steps[$scope.Now].ir).addClass("focusElement");
                    }
                    $scope.positionStep($scope.Now);
                } else if ($scope.Now > 0 && $scope.Now == ($scope.steps.length - 1)) {
                    $scope.guideTour();
                    $scope.guideTour();
                } else {
                    $scope.guideTour();
                }
            }
            $scope.dataStep = function (num) {
                $scope.tituloStep = $scope.steps[num].titulo;
                $scope.descripcionStep = $scope.steps[num].descripcion;
                if (num == 0) {
                    $scope.btnBack = "Cerrar";
                    $scope.btnNext = "Iniciar";
                } else if ($scope.steps.length == num + 1) {
                    $scope.btnBack = "Reiniciar";
                    $scope.btnNext = "Finalizar";
                } else {
                    $scope.btnBack = "Atras";
                    $scope.btnNext = "Siguiente";
                }
            };
            $scope.positionStep = function (num) {
                $scope.dataStep(num);
                setTimeout(() => {
                    var ir = $scope.steps[num].ir;
                    var posicion = $scope.steps[num].posicion;

                    var coordenadas = $(ir).position();
                    coordenadas.width = $(ir).outerWidth();
                    coordenadas.height = $(ir).outerHeight();
                    var TourCoordenadas = $("#TourStep").position();
                    TourCoordenadas.width = $("#TourStep").width();
                    TourCoordenadas.height = $("#TourStep").height();
                    var x = 0;
                    var y = 0;
                    $("#TourStep").removeAttr("style");
                    $("#TourStep").attr("style", $scope.steps[num].style);
                    switch (posicion) {
                        case "top":
                            x = (coordenadas.left);
                            y = (coordenadas.top - TourCoordenadas.height);
                            break;
                        case "right":
                            x = (coordenadas.left + coordenadas.width);
                            y = coordenadas.top;
                            break;
                        case "bottom":
                            x = (coordenadas.left);
                            y = (coordenadas.top + coordenadas.height);
                            break;
                        case "left":
                            x = (coordenadas.left - TourCoordenadas.width);
                            y = coordenadas.top;
                            break;
                        case "center":
                            x = coordenadas.left;
                            y = coordenadas.top;
                            break;
                        default:
                            x = 0;
                            y = 0;
                    }
                    $("#StepTriangle").removeAttr('class');
                    if ($scope.steps[num].flecha) {
                        $("#StepTriangle").addClass(posicion + " btnRotate");
                    }
                    setTimeout(() => {
                        window.scroll(x, (y - 30));
                    }, 600);
                });
            }
            //funciones del modal
            $scope.mostrarmodalbusqueda = function (texto) {
                $scope.dialogNewAfil = ngDialog.open({
                    template: 'views/movilidad/modal/modalactividad.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
                $scope.validarkeyword(texto);
            }
            $scope.selectDepMunicipio = function (codigo, nombre) {//Funcion para seleccionar el municipio
                $scope.codTemp = codigo;
                $scope.nomTemp = nombre;
                $('#DM' + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
                $scope.infoempresa.actividad = $scope.codTemp + " " + $scope.nomTemp
                $scope.infoempresa.actividad_codigo = $scope.codTemp
                $scope.selecteditem = true;
            }//Fin
            $scope.removeSeleccion = function () {//Funcion para remover el municipio
                $('#DM' + $scope.codTemp).removeClass('eleacti');
                $scope.infoempresa.actividad = "";
                $scope.infoempresa.actividad_codigo = "";
                $scope.codTemp = null; $scope.nomTemp = null; $scope.selecteditem = false;
            }//Fin
            $scope.$watch('results', function () {
                if ($scope.results != undefined) {
                    $scope.infoempresa.actividad_codigo = "";
                    $scope.selecteditem = false; $scope.codTemp = null; $scope.nomTemp = null;
                    $scope.stylesrowsearch = { 'margin-bottom': $scope.results.length == 0 ? '120px' : '70px' };
                } else {
                    $scope.selecteditem = false;
                }
            });
            $scope.aparecer = true;
            $scope.validarkeyword = function (keyword) {
                var key = keyword + "";
                if (key.length <= 3) {
                    $scope.aparecer = true;
                } else {
                    $scope.aparecer = false;
                    $scope.chgBusquedaListado('apoc_actividad', key);
                }
            }


            // FUNCIONES DE LAS TAB 3
            $scope.obtenerCantidadesEmpresa = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'Carga_Cantidades_Gestiones', regional: $scope.codRegional }
                }).then(function (response) {
                    console.log("Empresa", `(${$scope.codRegional})`, response.data)
                    $scope.acas_activo = response.data[response.data.findIndex(e => e.estado == 'A')].cantidad;
                    $scope.acas_procesado = response.data[response.data.findIndex(e => e.estado == 'P')].cantidad;
                });
            }

            $http({
                method: 'POST',
                url: "php/movilidad/funcmovilidad.php",
                data: { function: 'Carga_Cantidades_Gestiones_diarias' }
            }).then(function (response) {
                // console.log(response.data);
                $scope.cant_diaria = response.data;
                // $scope.renderData($scope.cant_diaria);
            });

            $scope.lista_cantidades_asesores = function (estado) {
                $scope.estado = estado == 'A' ? 'Activas' : 'Procesadas';
                var nombre = "";

                $scope.listDemandas = $('#resultDemandas').DataTable({
                    dom: 'lBsfrtip',
                    select: true,
                    buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
                    searching: true,
                    ajax: {
                        url: 'php/movilidad/listar_gestion_asesores.php' + '?estado=' + estado + '&nombre=' + nombre + '&funcion=' + 1 + '&regional=' + $scope.codRegional,
                        dataSrc: ''
                    },
                    columns: [
                        { data: "funcionario" },
                        { data: "estado" },
                        { data: "cantidad" },
                        { data: null, defaultContent: '<div class="tooltip" style="margin-left: 30px;"><i  class="Medium material-icons op">assignment</i><span></i><span class="tooltiptext">Detalles de Gestiones</span></div>' }
                    ],
                    language: {
                        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                    },
                    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                    order: [[1, "desc"]]
                });
            }

            // modalVerChat.html
            $(document).ready(function () {
                var table = $('#resultDetalles').DataTable();
                $('#resultDetalles tbody').on('click', 'tr', function () {
                    var data = $scope.listDemandas2.row(this).data();
                    $scope.Tdocumento_ver = data.tipo_documento == 'NIT' ? 'N' : 'C';
                    $scope.Ndocumento_ver = data.documento;
                    // CNVU - NOMBRE DEL APORTANTE
                    $scope.nombreApo = data.razon_social;
                    // alert(data.tipo_documento+"-"+data.documento);
                    $scope.dialogNewAfil = ngDialog.open({
                        template: 'views/movilidad/modal/modalVerChat.html',
                        className: 'ngdialog-theme-plain',
                        scope: $scope
                    });
                });
            });

            $scope.refreshConversacion2 = function () {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: {
                        function: 'listaConversacion',
                        v_tipo_documento: $scope.Tdocumento_ver,
                        v_documento: $scope.Ndocumento_ver
                    }
                }).then(function (response) {
                    console.log(response.data);
                    $scope.Conversacion = response.data;
                    $scope.Conversacion[0].cod_error == 0 ? (
                        $scope.shwConversacion = false
                    ) : (
                        $scope.shwConversacion = true,
                        setTimeout(function () { $('#mensajes').scrollTop($('#mensajes').height() + 450000000); }, 1000)
                    )
                    $scope.Conversacion[0].estado == "A" ? (
                        $('#frmMensaje').find('input, textarea, button').attr('disabled', true), $scope.divAprobado = false
                    ) : (
                        $('#frmMensaje').find('input, textarea, button').attr('disabled', false), $scope.divAprobado = true
                    )
                    swal.close();
                });
            }

            $(document).ready(function () {

                var table = $('#resultDemandas').DataTable();
                $('#resultDemandas tbody').on('click', 'tr', function () {
                    $('#resultDetalles').dataTable().fnDestroy();
                    var data = $scope.listDemandas.row(this).data();
                    var funcionario = data.funcionario;
                    var estado = data.estado == 'ACTIVO' ? 'A' : 'P';
                    // CNVU - FUNCIONALIDAD EXTRA
                    $scope.funcionarioSel = data.funcionario;
                    $scope.docFuncionarioSel = data.documento_asesor;
                    // CNVU - SCROLL TR
                    $timeout(function () {
                        document.getElementById("resultDetalles").scrollIntoView({ block: 'start', behavior: 'smooth' });
                    }, 200);


                    $scope.listDemandas2 = $('#resultDetalles').DataTable({
                        dom: 'lBsfrtip',
                        select: true,
                        buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
                        searching: true,
                        ajax: {
                            url: 'php/movilidad/listar_gestion_asesores.php' + '?estado=' + estado + '&nombre=' + funcionario + '&funcion=' + 2,
                            dataSrc: ''
                        },
                        columns: [
                            { data: "formulario" },
                            { data: "tipo_documento" },
                            { data: "documento" },
                            { data: "razon_social" },
                            { data: "fecha_registro" },
                            { data: "fecha_modificada" }
                        ],
                        language: {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                        },
                        lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
                        order: [[1, "desc"]]
                    });

                    $scope.aparecer_detalles_gestion = false;
                    $scope.cantidad_detelles = data.cantidad;
                    $scope.funcionario_detelles = funcionario;
                    $scope.$apply();

                });
            });

            $scope.gestion_diaria = function () {
                $scope.gestion = ngDialog.open({
                    template: 'views/movilidad/modal/modalVerGestionDiaria.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalgestion_graficaCtrl',
                    scope: $scope
                });

            }
            $scope.vm = this;

            // FUNCIONES DE LAS TAB 4
            $scope.obtenerCantidadesAfili = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'Carga_Cantidades_afiliaciones', regional: $scope.codRegional }
                }).then(function (response) {
                    console.log("Afili:", `(${$scope.codRegional})`, response.data);
                    $scope.solicitud_activo = response.data[response.data.findIndex(e => e.estado == 'A')].cantidad;
                    $scope.solicitud_procesado = response.data[response.data.findIndex(e => e.estado == 'P')].cantidad;
                    $scope.solicitud_rechazada = response.data[response.data.findIndex(e => e.estado == 'R')].cantidad;
                });
            }

            $scope.lista_cantidades_asesores2 = function (estado) {
                switch (estado) {
                    case 'A':
                        $scope.estado = "Activas";
                        break;
                    case 'P':
                        $scope.estado = "Procesadas"
                        break;
                    case 'R':
                        $scope.estado = "Rechazadas"
                }
                var nombre = "";

                $scope.listDemandas = $('#resultDemandas2').DataTable({
                    dom: 'lBsfrtip',
                    select: true,
                    buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
                    searching: true,
                    ajax: {
                        url: 'php/movilidad/listar_gestion_asesores.php' + '?estado=' + estado + '&nombre=' + nombre + '&funcion=' + 3 + '&regional=' + $scope.codRegional,
                        dataSrc: ''
                    },
                    columns: [
                        { data: "funcionario" },
                        { data: "estado" },
                        { data: "cantidad" },
                        { data: null, defaultContent: '<div class="tooltip" style="margin-left: 30px;"><i  class="Medium material-icons op">assignment</i><span></i><span class="tooltiptext">Detalles de Gestiones</span></div>' }
                    ],
                    language: {
                        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                    },
                    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'Todas']],
                    order: [[1, "desc"]]
                });
            }


            $(document).ready(function () {

                var table = $('#resultDemandas2').DataTable();
                $('#resultDemandas2 tbody').on('click', 'tr', function () {
                    $('#resultDetalles2').dataTable().fnDestroy();
                    var data = $scope.listDemandas.row(this).data();
                    var funcionario = data.funcionario;
                    switch ($scope.estado) {
                        case 'Activas':
                            var estado = "A";
                            break;
                        case 'Procesadas':
                            var estado = "P"
                            break;
                        case 'Rechazadas':
                            var estado = "R"
                    }
                    // CNVU - FUNCIONALIDAD EXTRA
                    $scope.funcionarioSel = data.funcionario;
                    $scope.docFuncionarioSel = data.documento_asesor;
                    //CNVU - SCROLL TR
                    $timeout(function () {
                        document.getElementById("resultDetalles2").scrollIntoView({ block: 'start', behavior: 'smooth' });
                    }, 200);


                    $scope.listDemandas2 = $('#resultDetalles2').DataTable({
                        dom: 'lBsfrtip',
                        select: true,
                        buttons: [{ extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
                        searching: true,
                        ajax: {
                            url: 'php/movilidad/listar_gestion_asesores.php' + '?estado=' + estado + '&nombre=' + funcionario + '&funcion=' + 4,
                            dataSrc: ''
                        },
                        columns: [
                            { data: "formulario" },
                            { data: "documento" },
                            { data: "razon_social" },
                            { data: "empresa" },
                            { data: "fecha_registro" },
                            { data: "fecha_modificada" }
                        ],
                        language: {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
                        },
                        lengthMenu: [[10, 30, 50, -1], [10, 30, 50, 'Todas']],
                        order: [[1, "desc"]]
                    });

                    $scope.aparecer_detalles_gestion = false;
                    $scope.cantidad_detelles = data.cantidad;
                    $scope.funcionario_detelles = funcionario;
                    $scope.$apply();

                });
            });
            $('#tblSolicitudes tbody').on('click', 'tr', function () {
                var data = $scope.listSolicitudes.row(this).data();
                $scope.gestion = {
                    adjunto_enviado: data.adjunto_enviado,
                    tipo_doc: data.tipo_doc,
                    doc: data.doc,
                    newestado: '0',
                    showrechazo: false,
                    showaprobacion: false,
                    motivo_rechazo: data.motivo_rechazo,
                    descripcion: data.comentarios,
                    codigo: data.solicitud,
                    ruta: data.ruta,
                    correo_empresa: data.correo_empresa,
                    empresa: data.empresa,
                    nombreafiliado: data.nombre_afiliado,
                    m_estado: data.estado,
                    m_fecha_solicitud: data.fecha_solicitud,
                    m_fecha_respuesta: data.fecha_respuesta,
                    m_adjunto_enviado: data.adjunto_enviado,
                    Comentarios: data.comentarios_afiliacion
                }
                if ($scope.estado == "A") {
                    $scope.panelprocesar = false;
                    if (data.pendiente_acas == "S") {
                        $scope.hdeComentarios = false;
                        if (data.estado_acas == "A") {
                            $scope.mensaje_acas = "Esta solicitud no se puede procesar ya que esta pendiente por revisar por parte del area de afiliación y registro."
                            $scope.panelPendienteAcas = false;
                            $scope.hdeComentarios = false;
                        } else {
                            $scope.panelPendienteAcas = true;
                        }
                    } else {
                        $scope.panelPendienteAcas = true;
                        $scope.hdeComentarios = false;
                    }
                } else {
                    ngDialog.open({
                        template: 'views/movilidad/modal/modalDetalles.html',
                        className: 'ngdialog-theme-plain',
                        controller: 'modalDetallesSolMovCtrl',
                        scope: $scope
                    });
                }
            });

            $scope.gestion_diaria_afiliaciones = function () {
                $scope.gestion = ngDialog.open({
                    template: 'views/movilidad/modal/modalVerGestionDiariaAfiliaciones.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalgestion_grafica_solicitudCtrl',
                    scope: $scope
                });
            }

            // modalVerDETALLES.html
            $(document).ready(function () {
                var table = $('#resultDetalles2').DataTable();
                $('#resultDetalles2 tbody').on('click', 'tr', function () {
                    var data = $scope.listDemandas2.row(this).data();
                    $scope.Tdocumento_ver = data.tipo_documento == 'NIT' ? 'N' : 'C';
                    var documento_ver = data.formulario;
                    $http({
                        method: 'POST',
                        url: "php/movilidad/funcmovilidad.php",
                        data: {
                            function: 'detalle_gestion_afiliaciones',
                            v_pdocumento: documento_ver
                        }
                    }).then(function (response) {
                        console.log(response.data);
                        $scope.gestion = response.data[0];
                        ngDialog.open({
                            template: 'views/movilidad/modal/modalDetalles.html',
                            className: 'ngdialog-theme-plain',
                            controller: 'modalDetallesSolMovCtrl',
                            scope: $scope
                        });
                    });


                });
            });


            //gestion de novedad
            $scope.gestion_novedad_ver = function (observa, id, ubicacion) {
                $scope.observacion_nov = observa;
                $scope.codigo = id;
                $scope.ubicacion = ubicacion;
                $scope.gestion = ngDialog.open({
                    template: 'views/movilidad/modal/ver_novedad_especificaciones.html',
                    className: 'ngdialog-theme-plain',
                    // controller: 'modalgestion_graficaCtrl',
                    controller: ['$scope', '$http', 'ngDialog', 'consultaHTTP', 'afiliacionHttp', function ($scope, $http, ngDialog, consultaHTTP, afiliacionHttp) {


                        swal({
                            title: 'Cargando información...',
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'detalle_novedad',
                                numero: $scope.codigo,
                                ubicacion: $scope.ubicacion
                            }
                        }).then(function (response) {
                            swal.close();
                            $scope.novedades_ver_modal = response.data;
                        })
                    }],
                    scope: $scope
                })
            }

            $scope.tipo_solicitud = "";
            // CNVU - ABRIR MODAL INTERNO
            $scope.abrirModal = function (tipo_solicitud) {
                $scope.tipo_solicitud = tipo_solicitud;
                (function () {
                    $('#modalTransferir').modal();
                }());
                $('#modalTransferir').modal('open');
            }

            $scope.cerrarModal = function () {
                $('#modalTransferir').modal('close');
            }

            // CNVU - TRANSFERIR SOLICITUDES
            $scope.transferirSolicitudes = function (nuevo_responsable) {
                console.log(nuevo_responsable);
                console.log($scope.docFuncionarioSel);
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: {
                        function: 'transferir_solicitudes',
                        responsable: $scope.docFuncionarioSel,
                        nuevo_responsable: parseInt(nuevo_responsable),
                        tipo_solicitud: $scope.status,
                        tipo_asignacion: 'T'
                    }
                }).then(function (response) {
                    swal.close();
                    if (response.data.codigo == 0) {
                        swal('Información', response.data.mensaje, 'success');
                        $timeout(function () {
                            $scope.cerrarModal();
                        }, 200);
                        $scope.listDemandas.ajax.reload();
                    } else {
                        swal('Información', response.data.mensaje, 'info');
                    }
                })
            }

            // CNVU - LISTADO ASESORES
            $scope.listadoAsesores = function () {
                $http({
                    method: 'POST',
                    url: "php/movilidad/funcmovilidad.php",
                    data: { function: 'lista_Asesores' }
                }).then(function (response) {
                    $scope.listado = response.data;
                });
            }
            //elimina un adjunto control de cambio
            $scope.elimina_soporte_empresa = function (id, nombre, dia) {
                var texto = "¿Desea Eliminar el documento " + nombre + " del dia " + dia + "? "
                swal({
                    title: 'Confirmar',
                    text: texto,
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Eliminar'
                }).then((result) => {
                    if (result) {
                        $http({
                            method: 'POST',
                            url: "php/movilidad/funcmovilidad.php",
                            data: {
                                function: 'p_elimina_soporte',
                                v_rowid: id,
                            }
                        }).then(function (response) {
                            if (response.data.codigo == 1) {
                                swal('Información', response.data.mensaje, 'error');
                            } else {
                                swal('Completado', response.data.mensaje, 'success');
                                $timeout(function () {
                                    $scope.BuscarEmpresa();
                                }, 2000);

                            }
                        })
                    }
                })
            }

            $scope.descargar_empresa_asesores_activos = function (estado) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                let xEstado = estado == 'Activas' ? 'A' : 'P';
                $http({
                    method: 'GET',
                    url: "php/movilidad/listar_gestion_asesores.php?funcion=5&estado=" + xEstado + '&regional=' + $scope.codRegional,
                }).then(function ({ data }) {
                    if (data.length > 0) {
                        var ws = XLSX.utils.json_to_sheet(data);
                        /* add to workbook */
                        var wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                        /* write workbook and force a download */
                        XLSX.writeFile(wb, "Detalles de Solicitudes Activas por Asesor.xlsx");
                        const mensaje = `Solicitudes Activas por Asesor (${data.length})`;
                        swal('Completado', mensaje, 'success');
                    } else {
                        swal('Información', 'Sin datos que mostrar', 'error');
                    }
                })
            }

            $scope.descargar_afiliaciones_asesores_activos = function (estado) {
                swal({
                    title: 'Cargando información...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                swal.showLoading();
                let xEstado = estado == 'Activas' ? 'A' : (estado == 'Procesadas' ? 'P' : 'R');
                $http({
                    method: 'GET',
                    url: "php/movilidad/listar_gestion_asesores.php?funcion=6&estado=" + xEstado + '&regional=' + $scope.codRegional,
                }).then(function ({ data }) {
                    if (data.length > 0) {
                        var ws = XLSX.utils.json_to_sheet(data);
                        /* add to workbook */
                        var wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
                        /* write workbook and force a download */
                        XLSX.writeFile(wb, "Detalles de Solicitudes de afiliaciones Activas por Asesor.xlsx");
                        const mensaje = `Solicitudes de afiliaciones Activas por Asesor (${data.length})`;
                        swal('Completado', mensaje, 'success');
                    } else {
                        swal('Información', 'Sin datos que mostrar', 'error');
                    }
                })
            }


            if (document.readyState !== 'loading') {
                $scope.Inicio();
            } else {
                document.addEventListener('DOMContentLoaded', function () {
                    $scope.Inicio();
                });
            }

        }]);


