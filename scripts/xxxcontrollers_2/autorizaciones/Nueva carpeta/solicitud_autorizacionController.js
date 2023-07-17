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
                $("#modalproducto").modal();
                $("#modalresponsables").modal();
                $("#modalmotivosaut").modal();
                $("#modalevantarctrlfrecuencia").modal();


            });


            $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();
            $scope.maxDate = new Date();
            $scope.mostrar_esoa = false;
            $scope.esoa = [];
            $scope.esoaiv = [];
            $scope.censo = [];

            $scope.filterOptions = 'AFILIADO';

            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1; //hoy es 0!
            var yyyy = hoy.getFullYear();

            $scope.fechactual = hoy;

            console.log(hoy);

            if (dd < 10) {
                dd = '0' + dd
            }



            if (mm < 10) {
                mm = '0' + mm
            }



            $scope.maxDate = yyyy + '-' + mm + '-' + dd;

            $scope.atras = function () {
                if ($scope.tabRaniv.number != 0) {

                    if ($scope.tabRaniv.number == 1) {
                        $scope.tabRaniv.number = 0;
                    }

                    if ($scope.tabRaniv.number == 2) {
                        $scope.tabRaniv.number = 1;
                        $scope.buscar_solicitud();
                    }

                }

            }

            $scope.atras2 = function () {
                $scope.tabRaniv.number = 0;
            }


            //variables de control 

            $scope.tabI = true;
            $scope.tabIV = false;
            $scope.activeI = 'active final white-text';
            $scope.activeIV = 'none';
            $scope.activeIcolor = 'foot4';
            $scope.activeIVcolor = '';
            $scope.nametab = 'Autorización';

            // variables TAB I
            //secciones de ng hide
            $scope.inactiveseccion1tab1 = false;
            $scope.inactiveseccion4tab4 = false;
            $scope.activetipotabI = true;
            $scope.activetipotabIV = true;
            $scope.productosagregadostabIV = [];
            $scope.productosagregadostabIVC = [];

            $scope.nofindproductstabI = false;
            $scope.nofindproductstabIV = false;
            $scope.inactimiprestab1 = true;
            $scope.inactimiprestab4 = true;
            $scope.inactivetagmipres = true;
            $scope.inactivetagctc = true;
            $scope.inactivetagtutela = true;
            $scope.inactivetagsiniestro = true;
            $scope.nameservicio = 'de orden'
            $scope.inactivebarrapro = true;



            // wizard

            $scope.invsolicitudtabI = true;
            $scope.invproductotabI = true;
            $scope.invfinalizartabI = true;
            $scope.invfinalizartabIV = true;


            $scope.novedades = null;
            $scope.datosAfiModalNov = null;
            $scope.tutelaParam = null;
            $scope.siniestroParam = null;
            $scope.maxDate = null;
            $scope.documentosAfiliado = null;

            $scope.filterOptions = 'AFILIADO';
            $scope.vdocafiliado;
            $scope.vnumeroaut;
            $scope.vubicacionaut;
            $scope.vnitips;

            //Se valida fecha actual

            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1; //hoy es 0!
            var yyyy = hoy.getFullYear();



            if (dd < 10) {
                dd = '0' + dd
            }



            if (mm < 10) {
                mm = '0' + mm
            }



            $scope.maxDate = yyyy + '-' + mm + '-' + dd;
            $scope.dataSeccionales = null;
            $scope.inactiveseccional = true;
            $scope.botonAtras = true;
            $scope.tempSeccional = null;
            $scope.tempSeccionalips = null;
            $scope.tempSeccionalvalor = 0;
            $scope.sumtotal = 0;
            $scope.sumtotals = 0;
            $scope.gestion = { riesgo: null, justificacion: null };



            // funciones de control

            $scope.getdepartamentos = function () {
                $scope.sumtotal = 0;
                var tempseccional = sessionStorage.getItem('municipio');
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: 'p_obtener_departamentos_pro', sessional: tempseccional }
                }).then(function (response) {
                    $scope.datadep = response.data;

                    for (let index = 0; index < $scope.datadep.length; index++) {
                        $scope.sumtotal = $scope.sumtotal + Number($scope.datadep[index].cantidad);
                    }
                    swal.close();

                    if ($scope.datadep.length == 0) {
                        $scope.tabRan.number = 0;
                    }
                });

            }



            $scope.validatecallIps = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: { function: 'p_obtener_ips_cantidad_solicitudes' }
                }).then(function (response) {
                    $scope.listaIps = response.data;
                    console.log(response.data);
                    $scope.initPaginacionips($scope.listaIps);
                });


            }

            $scope.ocultaripstatus = "";
            $scope.tabRan = { number: 0 };
            $scope.tabRaniv = { number: 0 };
            $scope.viewsolpendiente = false;
            $scope.tabRan.number = 0;
            $scope.tabRaniv.number = 0;
            $scope.init = function () {
                $scope.tabI = true;
                $scope.tabIV = false;
                $scope.activeI = 'active final';
                $scope.activeIV = 'none';
                $scope.activeIcolor = '';
                $scope.activeIVcolor = '';
            }

            $http({
                method: 'POST',
                url: "php/autorizaciones/esoa/esoa.php",
                data: {
                    function: 'p_obtener_estancia'
                }
            }).then(function (response) {
                $scope.listestancias = response.data;
            });

            $scope.setTabPrincipal = function (opcion) {
                console.log('opcion_', opcion);
                $scope.init();

                switch (opcion) {
                    case '1':
                        $scope.tabI = true;
                        $scope.tabIV = false;
                        $scope.activeI = 'active final white-text';
                        $scope.activeIV = 'none';
                        $scope.activeIcolor = 'foot4';
                        $scope.nametab = 'Bolsa de Autorizaciones';
                        $scope.tipoaut = '1';
                        $scope.validatecallIps();
                        break;
                    case '4':

                        $scope.tabI = false;
                        $scope.tabIV = true;
                        $scope.activeI = 'none';
                        $scope.activeIVcolor = 'foot4';
                        $scope.activeIV = 'active final white-text';
                        $scope.nametab = 'Consulta de Autorización';
                        $scope.tipoaut = '4';
                        break;
                    default:
                }
            }
            $scope.setTabPrincipal('1');


            $scope.ocultarxrol = false;

             if ((sessionStorage.getItem('rolcod') == '127') || (sessionStorage.getItem('rolcod') == '108')) {
               $scope.ocultarxrol = false; 
              $scope.tipoaut='4';
               $scope.tabI= false;
               $scope.tabIV= true;
              $scope.tabRaniv.number = 0;
            }else{
               $scope.ocultarxrol = true;
            }
            //Filter y table ips
            $scope.initPaginacionips = function (info) {
                $scope.listaIpsprogTemp = info;
                $scope.currentPageips = 0;
                $scope.pageSizeips = 10;
                $scope.valmaxpagips = 10;
                $scope.pagesips = [];
                $scope.configPagesips();
            }
            $scope.configPagesips = function () {
                $scope.pagesips.length = 0;
                var ini = $scope.currentPageips - 4;
                var fin = $scope.currentPageips + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) > $scope.valmaxpagips)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips);
                } else {
                    if (ini >= Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) - $scope.valmaxpagips) {
                        ini = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips) - $scope.valmaxpagips;
                        fin = Math.ceil($scope.listaIpsprogTemp.length / $scope.pageSizeips);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pagesips.push({
                        no: i
                    });
                }
                if ($scope.currentPageips >= $scope.pagesips.length)
                    $scope.currentPageips = $scope.pagesips.length - 1;
                if ($scope.currentPageips < 0) { $scope.currentPageips = 0; }
            }
            $scope.setPageips = function (index) {
                $scope.currentPageips = index - 1;
                if ($scope.pagesips.length % 2 == 0) {
                    var resul = $scope.pagesips.length / 2;
                } else {
                    var resul = ($scope.pagesips.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.listaIpsprogTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips);
                } else {
                    var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips) + 1;
                }
                var fin = ($scope.pagesips.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul) {
                    $scope.calcularips(i, fin);
                }
            }
            $scope.pasoips = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pagesips[0].no + 1;
                    if ($scope.pagesips.length > 9) {
                        var fin = $scope.pagesips[9].no + 1;
                    } else {
                        var fin = $scope.pagesips.length;
                    }

                    $scope.currentPageips = $scope.currentPageips + 1;
                    if ($scope.listaIpsprogTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips);
                    } else {
                        var tamanomax = parseInt($scope.listaIpsprogTemp.length / $scope.pageSizeips) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 9;
                    }
                } else {
                    var i = $scope.pagesips[0].no - 1;
                    if ($scope.pagesips.length > 9) {
                        var fin = $scope.pagesips[9].no - 1;
                    } else {
                        var fin = $scope.pagesips.length;
                    }

                    $scope.currentPageips = $scope.currentPageips - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pagesips.length;
                    }
                }
                $scope.calcularips(i, fin);
            }
            $scope.calcularips = function (i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pagesips = [];
                for (i; i <= fin; i++) {
                    $scope.pagesips.push({
                        no: i
                    });
                }
            }

            $scope.filterIps = function (val) {
                $scope.listaIpsprogTemp = $filter('filter')($scope.listaIps, val);
                if ($scope.listaIpsprogTemp.length > 0) {
                    $scope.setPageips(1);
                }
                $scope.configPagesips();
            }



            //Random
            $scope.tempips;
            $scope.tempestadogetaut;
            $scope.getAut = function (aut, state) {
                console.log('aut: ', aut);
                $scope.tempips = aut;
                $scope.tempestadogetaut = state;
                $scope.listaSolicitudesprog = [];

                if (state == 'A' && aut.activo == 0) {
                    swal({ title: "SOLICITUDES", text: "No hay solicitudes PENDIENTES", showConfirmButton: true, type: "info" });
                } else if (state == 'P' && aut.procesado == 0) {
                    swal({ title: "SOLICITUDES", text: "No hay solicitudes GESTIONADAS", showConfirmButton: true, type: "info" });
                } else if (state == 'X' && aut.rechazado == 0) {
                    swal({ title: "SOLICITUDES", text: "No hay solicitudes ANULADAS", showConfirmButton: true, type: "info" });
                } else {
                    $scope.ocultaripstatus = state;
                    // if (state == 'P' || state == 'X') {

                    // }
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: { function: 'p_llamar_solicitud', estado: $scope.tempestadogetaut, nit: $scope.tempips.nit }
                    }).then(function (response) {
                        $scope.listaSolicitudesprog = response.data;
                        // if ($scope.listaSolicitudesprog.length > 0) {

                        swal.close();
                        if ($scope.listaSolicitudesprog.length > 0) {
                            $scope.tabRan.number = 1;
                            $scope.initPaginacionAut($scope.listaSolicitudesprog);
                        } else {
                            swal('Importante', "No hay solicitudes para mostrar.", 'info');
                        }




                        //  }
                    });
                }



                //     } else {
                //       $scope.tabRan.number = 3;
                //     }
                //   }
            }

            $scope.callramdom = function () {
                $scope.tabRan.number = 1
                swal({ title: 'Buscando...' });
                swal.showLoading();
                // $http({
                //     method: 'POST',
                //     url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                //     data: { function: 'obtener_solicitudes_pro', sessional: $scope.tempSeccionalips.codigo, estado: $scope.tempestadogetaut, nit: $scope.tempips.nit }
                // }).then(function (response) {
                //     if (response.data == 0) {
                //         $scope.validatecallIps();
                //     } else {
                $scope.listaSolicitudesprogTemp = [
                    {
                        "NUMERO": 4153,
                        "UBICACION": 70001,
                        "TIPO_DOC": "TI",
                        "DOCUMENTO": "1030240507",
                        "AFILIADO": "LIDUEÃ‘AS MEZA ISACC DAVID",
                        "NOMBRE_AFI": "LIDUEÃ‘AS MEZA ISACC DAVID",
                        "AUDITADA": "N",
                        "NIT": "900497022",
                        "IPS": "IPS COROZAL LTDA",
                        "DIRECCIONIPSSOLICITANTE": "CL 32 22  - 27 BRR SAN MIGUEL",
                        "TELEFONOIPSSOLICITANTE": "3205674604",
                        "SERVICIO": "CE NEUROPEDIATRIA",
                        "CODDX": "F818",
                        "REGIMEN": "SUBDIDIADO",
                        "FECHA_ENTREGA": "19/01/2021",
                        "FECHA_ORDEN": "14/01/2021",
                        "ESTADO": "ACTIVA",
                        "CLASE_ESTADO": "orange",
                        "ADJUNTO": "/cargue_ftp/Digitalizacion/Genesis/Autorizaciones/Pro/PRO-4153-70001.pdf",
                        "CODIGO_ADJ": 1418469,
                        "FUENTE": "PROG"
                    }
                ];

                // $scope.listaSolicitudesprogTemp = $scope.listaSolicitudesprog ;
                // if ($scope.listaSolicitudesprog.length > 0) {
                //     $scope.initPaginacion($scope.listaSolicitudesprog);
                // }
                //     }
                swal.close();
                // });
            }



            $scope.retroceder = function () {
                if ($scope.tabRan.number != 0) {

                    if ($scope.ocultaripstatus == 'A') {
                        $scope.libersolicitud();
                        $scope.validatecallIps();
                    }


                    if ($scope.tabRan.number == 2) {
                        $scope.tabRan.number = 0;
                    }
                    if ($scope.tabRan.number == 1) {
                        $scope.tabRan.number = 0;
                        $scope.validatecallIps();
                    }

                    // if ($scope.tabRan.number == 1) {                        
                    //     $scope.validatecallIps();
                    // }

                }
            }


            $scope.libersolicitud = function () {
                var tempnum = 0;
                var tempubi = 0;
                if ($scope.tipoaut == '1') {
                    if ($scope.tempAut == undefined) {
                        tempnum = $scope.listaSolicitudesprog[0].NUMERO;
                        tempubi = $scope.listaSolicitudesprog[0].UBICACION;
                    } else {
                        tempnum = $scope.tempAut.NUMERO;
                        tempubi = $scope.tempAut.UBICACION;
                    }
                }

                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: { function: 'p_liberar_solicitud', numero: tempnum, ubicacion: tempubi }
                }).then(function (response) {
                    console.log(response.data);
                })
            }


            $scope.initPaginacionAut = function (info) {
                $scope.listaSolicitudesprogTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPagesAut();
            }
            $scope.configPagesAut = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
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
            }
            $scope.setPageAut = function (index) {
                $scope.currentPage = index - 1;
                if ($scope.pages.length % 2 == 0) {
                    var resul = $scope.pages.length / 2;
                } else {
                    var resul = ($scope.pages.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.listaSolicitudesprogTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize) + 1;
                }
                var fin = ($scope.pages.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 9;
                }
                if (index > resul) {
                    $scope.calcular(i, fin);
                }
            }
            $scope.pasoAut = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pages[0].no + 1;
                    if ($scope.pages.length > 9) {
                        var fin = $scope.pages[9].no + 1;
                    } else {
                        var fin = $scope.pages.length;
                    }

                    $scope.currentPage = $scope.currentPage + 1;
                    if ($scope.listaSolicitudesprogTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.listaSolicitudesprogTemp.length / $scope.pageSize) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 9;
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
                $scope.calcularAut(i, fin);
            }
            $scope.calcularAut = function (i, fin) {
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

            $scope.filterAut = function (val) {
                $scope.listaSolicitudesprogTemp = $filter('filter')($scope.listaSolicitudesprog, val);
                if ($scope.listaSolicitudesprogTemp.length > 0) {
                    $scope.setPage(1);
                }
                $scope.configPages();
            }
            //Random



            $scope.busqueda_avanzada = false;
            //imprmir 
            $scope.print = function (ubicacion, numero) {
                window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + numero + '&ubicacion=' + ubicacion, '_blank');
            }
            $scope.titletabI = '';
            $scope.setTab = function (newTab) {
                $scope.tab = newTab;
                switch (newTab) {
                    case 1:
                        $("#btn-solicitudtabI").removeClass("grey");
                        $("#btn-productotabI").addClass("grey");
                        $("#btn-finalizartabI").addClass("grey");
                        $scope.titletabI = 'Gestión de Solicitud';
                        break;
                    case 2:
                        $("#btn-finalizartabI").addClass("grey");
                        $("#btn-productotabI").removeClass("grey");
                        $scope.titletabI = 'Detalles de Solicitud';
                        break;
                    case 3:
                        $scope.titletabI = ' Censo Hospitalario';
                        $scope.buscar_senso();
                        $("#btn-finalizartabI").removeClass("grey");

                        break;
                    default:
                        $scope.titletabI = 'Gestión de Solicitud';
                        break;
                }
            }
            $scope.titletabIV = '';
            $scope.setTabIV = function (newTab) {
                $scope.tabiv = newTab;
                switch (newTab) {
                    case 1:
                        $("#btn-solicitudtabIV").removeClass("grey");
                        $("#btn-productotabIV").addClass("grey");
                        $("#btn-finalizartabIV").addClass("grey");
                        $scope.titletabIV = 'Gestión de Solicitud';
                        break;
                    case 2:
                        $("#btn-finalizartabIV").addClass("grey");
                        $("#btn-productotabIV").removeClass("grey");
                        $scope.titletabIV = 'Detalles de Solicitud';
                        break;
                    case 3:
                        $scope.titletabIV = ' Censo Hospitalario';
                        $scope.buscar_senso();
                        $("#btn-finalizartabIV").removeClass("grey");

                        break;
                    default:
                        $scope.titletabIV = 'Gestión de Solicitud';
                        break;
                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }

            $scope.isSetIV = function (tabNum) {
                return $scope.tabiv === tabNum;
            }

            $scope.pasostab = function (op) {
                switch (op) {
                    case '1':
                        $("#btn-solicitudtabI").removeClass("grey");
                        $scope.invsolicitudtabI = false;
                        $scope.titletabI = 'Solicitud';
                        break;
                    case '-1':
                        $("#btn-productotabI").addClass("grey");
                        $scope.invsolicitudtabI = false;
                        $scope.titletabI = 'Solicitud';
                        $scope.invproductotabI = true;
                        break;
                    case '2':
                        $scope.validartab('solicitud');
                        if ($scope.pasarsolicitudaut == true) {
                            $scope.setTab(2);
                        } else {
                            swal('Importante', $scope.textvalidate, 'info');
                        }
                        break;
                    case '5':
                        $scope.validartabI('autorizacion');
                        if ($scope.pasarsolicitudaut == true) {
                            $scope.check_option_3 = true;
                            $scope.nameautedit = 'Detalle';
                        } else {
                            swal('Importante', $scopoe.textvalidate, 'info');
                        }
                        break;
                    case '-5':
                        $scope.nameautedit = 'Encabezado';
                        $scope.check_option_3 = false;
                        break;
                    case '6':
                        if ($scope.productosagregadostabIV.length == 0 || $scope.productosagregadostabIV == undefined) {
                            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
                        } else {
                            var text = 'Procesar autorización';
                        }
                        if ($scope.pasarproductoaut == true) {
                            $scope.finalizartabIV(text);
                        } else {
                            swal('Importante', 'Debe agregar un producto', 'info')
                        }
                        break;
                    case '-2':
                        $("#btn-finalizartabI").addClass("grey");
                        $scope.invproductotabI = false;
                        $scope.titletabI = 'Producto';
                        $scope.invfinalizartabI = true;
                        break;
                    case '3':
                        if ($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined) {
                            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
                        } else {
                            var text = 'Procesar autorización';
                        }
                        // if ($scope.pasarproductoaut == true) {
                        if ($scope.productosagregadostabI.length > 0) {
                            $scope.finalizartabI(text);
                            $("#btn-finalizartabI").removeClass("grey");
                        } else {
                            swal('Importante', 'Debe agregar un producto', 'info')
                        }
                        break;
                    case '4':
                        setTimeout(function () {
                            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
                            $scope.limpiar('1');
                            $scope.$apply();
                        }, 500);
                        break;
                    case 't4':
                        setTimeout(function () {
                            $scope.solicitud.ubicacion = $scope.autorizacion.documento ? 0 : $scope.solicitud.ubicacion;
                            $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion)
                            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
                            $scope.limpiar('4');
                            $scope.$apply();
                        }, 500);
                        break;
                    default:
                }
            }

            $scope.pasostabIV = function (op) {
                switch (op) {
                    case '1':
                        $("#btn-solicitudtabIV").removeClass("grey");
                        $scope.invsolicitudtabIV = false;
                        $scope.titletabIV = 'Solicitud';
                        break;
                    case '-1':
                        $("#btn-productotabIV").addClass("grey");
                        $scope.invsolicitudtabIV = false;
                        $scope.titletabIV = 'Solicitud';
                        $scope.invproductotabIV = true;
                        break;
                    case '2':
                        $scope.validartabIV('solicitud');
                        if ($scope.pasarsolicitudautiv == true) {
                            $scope.setTabIV(2);
                        } else {
                            swal('Importante', $scope.textvalidate, 'info');
                        }
                        break;
                    case '5':
                        $scope.validartabIV('autorizacion');
                        if ($scope.pasarsolicitudautiv == true) {
                            $scope.check_option_3 = true;
                            $scope.nameautedit = 'Detalle';
                        } else {
                            swal('Importante', $scopoe.textvalidate, 'info');
                        }
                        break;
                    case '-5':
                        $scope.nameautedit = 'Encabezado';
                        $scope.check_option_3 = false;
                        break;
                    case '6':
                        if ($scope.productosagregadostabIV.length == 0 || $scope.productosagregadostabIV == undefined) {
                            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
                        } else {
                            var text = 'Procesar autorización';
                        }
                        if ($scope.pasarproductoaut == true) {
                            $scope.finalizartabIV(text);
                        } else {
                            swal('Importante', 'Debe agregar un producto', 'info')
                        }
                        break;
                    case '-2':
                        $("#btn-finalizartabI").addClass("grey");
                        $scope.invproductotabI = false;
                        $scope.titletabI = 'Producto';
                        $scope.invfinalizartabI = true;
                        break;
                    case '3':
                        if ($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined) {
                            var text = 'Se creara la autorizacion en estado activa debido a que faltan los productos';
                        } else {
                            var text = 'Procesar autorización';
                        }
                        // if ($scope.pasarproductoaut == true) {
                        if ($scope.productosagregadostabI.length > 0) {
                            $scope.finalizartabI(text);
                            $("#btn-finalizartabI").removeClass("grey");
                        } else {
                            swal('Importante', 'Debe agregar un producto', 'info')
                        }
                        break;
                    case '4':
                        setTimeout(function () {
                            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
                            $scope.limpiar('1');
                            $scope.$apply();
                        }, 500);
                        break;
                    case 't4':
                        setTimeout(function () {
                            $scope.solicitud.ubicacion = $scope.autorizacion.documento ? 0 : $scope.solicitud.ubicacion;
                            $scope.buscarAutorizaciones($scope.autorizacion.documento, $scope.autorizacion.numero, $scope.solicitud.ubicacion)
                            swal({ title: "Completado", text: 'Autorización Completada', type: "success", timer: 800 });
                            $scope.limpiar('4');
                            $scope.$apply();
                        }, 500);
                        break;
                    default:
                }
            }


            $scope.textvalidate = "Complete los campos requeridos (*)";
            $scope.validartab = function (tipo) {
                $scope.pasarsolicitudaut = true;
                $scope.pasarproductoaut = true;
                switch (tipo) {
                    case 'solicitud':
                        if ($scope.mostrar_error_censo == true) {
                            if ($scope.esoa.ESTANCIA == '' || $scope.esoa.ESTANCIA == undefined) {
                                $scope.textvalidate = "Tipo de estancia no puede estar vacio!";
                                $scope.pasarsolicitudaut = false;
                            } else
                                if ($scope.esoa.RESPONSABLE == '' || $scope.esoa.RESPONSABLE == undefined) {
                                    $scope.textvalidate = "Responsable del Censo no puede estar vacio!";
                                    $scope.pasarsolicitudaut = false;
                                }
                        }
                        if ($scope.esoa.FECHA_INGRESO == undefined) {
                            $scope.textvalidate = "Fecha de ingreso no puede ser mayor a la fecha actual!";
                            $scope.pasarsolicitudaut = false;
                        } else
                            if ($scope.esoa.JUSTIFICACION.length < 30 || $scope.esoa.JUSTIFICACION.length > 1000) {
                                $scope.pasarsolicitudaut = false;
                                $scope.textvalidate = "La justificación debe tener como minimo 30  y maximo 1000 caracteres";
                            }

                        break;
                    case 'producto':
                        if ($scope.productosagregadostabI.length == 0 || $scope.productosagregadostabI == undefined) { $scope.pasarproductoaut = false; }
                        break;
                    default:
                }
            }
            $scope.validartabIV = function (tipo) {
                $scope.pasarsolicitudautiv = true;
                $scope.pasarproductoautiv = true;
                switch (tipo) {
                    case 'solicitud':
                        if ($scope.mostrar_error_censo == true) {
                            if ($scope.esoaiv.ESTANCIA == '' || $scope.esoaiv.ESTANCIA == undefined) {
                                $scope.textvalidate = "Tipo de estancia no puede estar vacio!";
                                $scope.pasarsolicitudautiv = false;
                            } else
                                if ($scope.esoaiv.RESPONSABLE == '' || $scope.esoaiv.RESPONSABLE == undefined) {
                                    $scope.textvalidate = "Responsable del Censo no puede estar vacio!";
                                    $scope.pasarsolicitudautiv = false;
                                }
                        }
                        if ($scope.esoaiv.FECHA_INGRESO == undefined) {
                            $scope.textvalidate = "Fecha de ingreso no puede ser mayor a la fecha actual!";
                            $scope.pasarsolicitudautiv = false;
                        } else
                            if ($scope.esoaiv.JUSTIFICACION.length < 30 || $scope.esoaiv.JUSTIFICACION.length > 1000) {
                                $scope.pasarsolicitudautiv = false;
                                $scope.textvalidate = "La justificación debe tener como minimo 30  y maximo 1000 caracteres";
                            }

                        break;
                    case 'producto':
                        if ($scope.productosagregadostabIV.length == 0 || $scope.productosagregadostabIV == undefined) { $scope.pasarproductoaut = false; }
                        break;
                    default:
                }
            }

            //FUNCIONES TAB 3
            $scope.buscar_senso = function () {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_obtener_censo',
                        v_pafiliado: $scope.tipoaut == '1' ? $scope.esoa.DOCUMENTO : $scope.esoaiv.DOCUMENTO,
                        v_pprestador: $scope.tipoaut == '1' ? $scope.esoa.NIT : $scope.esoaiv.NIT
                    }
                }).then(function (response) {
                    if ($scope.tipoaut == '1') {
                        if (response.data.length == 0) {
                            $scope.censos = [];
                            $scope.mostrar_error_censo = true;
                            $scope.cargardatoscenso();
                        } else {
                            $scope.mostrar_error_censo = false;
                            $scope.censos = response.data;
                            if ($scope.censos.length > 0) {
                                $scope.body = false;
                                $scope.fallo = true;
                            } else {
                                $scope.body = true;
                                $scope.fallo = false;
                            }
                        }
                    }
                    if ($scope.tipoaut == '4') {
                        if (response.data.length == 0) {
                            $scope.censos = [];
                            $scope.mostrar_error_censoiv = true;
                            $scope.cargardatoscenso();
                        } else {
                            $scope.mostrar_error_censoiv = false;
                            $scope.censosiv = response.data;
                            if ($scope.censosiv.length > 0) {
                                $scope.body = false;
                                $scope.fallo = true;
                            } else {
                                $scope.body = true;
                                $scope.fallo = false;
                            }
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
                return dd + '/' + mm + '/' + yyyy;//+' '+hh+':'+mi+':00';
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
                    var fecha_ordenini = null, fecha_ordenfin = null, fecha_confirmadoini = null, fecha_confirmadofin = null;
                    if
                        (
                        (($scope.bus_avanzada.fecha_ordenini == undefined) || ($scope.bus_avanzada.fecha_ordenini == null)) ||
                        (($scope.bus_avanzada.fecha_ordenfin == undefined) || ($scope.bus_avanzada.fecha_ordenfin == null))
                    ) {
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

                        Fmodificacion_fecha_final: fecha_confirmadofin,
                        servicio: $scope.bus_avanzada.servicio == null ? 0 : $scope.bus_avanzada.servicio
                    }
                    var v_pautorizacion = JSON.stringify($scope.v_pautorizacion);
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    $scope.reporteiv = [];
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: {
                            function: 'P_LISTA_SOLICITUD_AVANZADO',
                            v_pautorizacion: v_pautorizacion
                        }
                    }).then(function (response) {
                        swal.close();
                        console.log(response.data);
                        if (response.data.length == 0) {
                            $scope.tabRaniv.number = 0;
                            $scope.reporteiv = [];
                            $scope.initPaginacioniv($scope.reporteiv);
                            swal('Informacion!', 'No se encontraron datos por el criterio de busqueda', 'warning');

                        } else if (response.data.length > 0) {
                            $scope.mostrar_datos = true;
                            $scope.tabRaniv.number = 1;
                            $scope.reporteiv = response.data;
                            $scope.initPaginacioniv($scope.reporteiv);
                        } else {
                            $scope.tabRaniv.number = 0;
                            swal('Informacion!', 'No se encontraron datos por el criterio de busqueda', 'warning');

                        }

                    })
                }

            }

            $scope.mostrar_chat = function (CODIGOCENSO, UBICACION) {
                $scope.CODIGOCENSO = CODIGOCENSO;
                $scope.UBICACION = UBICACION;
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
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
            // $scope.setTab(1);

            // $scope.codigo_bus = null;
            $scope.documento = null;
            $scope.tipodocumento = null;
            $scope.numero = null;
            $scope.buscar_solicitud = function () {

                console.log('$scope.documento:', $scope.documento);
                console.log('$scope.tipodocumento:', $scope.tipodocumento);
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $scope.esoa = [];
                $scope.showcenso = true;
                if ($scope.filterOptions == 'AFILIADO') {
                    $scope.codigo_bus = $scope.documento;
                    $scope.tipodocumento = $scope.tipodocumento;
                }
                if ($scope.filterOptions == 'SOLICITUD') {
                    $scope.codigo_bus = $scope.numero;
                }

                if ($scope.filterOptions != 'AVANZADO') {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: {
                            function: 'obtenerSolicitud',
                            codigo: $scope.codigo_bus,
                            tipodocumento: $scope.tipodocumento,
                            filtro: $scope.filterOptions

                        }
                    }).then(function (response) {
                        swal.close();
                        if (response.data == 0) {
                            $scope.reporte = [];
                            $scope.initPaginacion($scope.reporte);


                        } else if (response.data.length > 0) {
                            $scope.mostrar_datos = true;
                            $scope.tabRaniv.number = 1;
                            $scope.reporte = response.data;
                            $scope.initPaginacioniv($scope.reporte);
                        }
                    });

                }
                if ($scope.filterOptions == 'AVANZADO') {
                    $scope.buscar_avanzada_accion();
                }
            }
            $scope.obtenerServiciosedit = function (contrato) {
                console.log(contrato);
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_obtener_servicio',
                        contrato: contrato.CONTRATO,
                        documento: contrato.DOCUMENTOCONTRATO,
                        ubicacion: contrato.UBICACIONCONTRATO
                    }
                }).then(function (response) {
                    if ($scope.tipoaut == '1') {
                        $scope.listServiciosedit = response.data;

                        function letsWaitALittle() {
                            $("#clasificacion_select option[value=" + $scope.clas + "]").attr("selected", true);
                        }
                        setTimeout(letsWaitALittle, 10);
                    }
                    if ($scope.tipoaut == '4') {
                        $scope.listServicioseditIV = response.data;

                        function letsWaitALittleiv() {
                            $("#clasificacion_selectiv option[value=" + $scope.clas + "]").attr("selected", true);
                        }
                        setTimeout(letsWaitALittleiv, 10);
                    }



                })

            }

            //cambiar
            $scope.gestion = function (cod, ubicacion) {
                console.log($scope.tipoaut);
                if ($scope.tipoaut == '1') {
                    $scope.esoa = undefined;
                    $scope.tabRan.number = 2;
                }
                if ($scope.tipoaut == '4') {
                    $scope.esoaiv = undefined;
                }
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });


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
                        $scope.titletabI = 'Gestión de Solicitud';
                        if ($scope.tipoaut == '1') {
                            $scope.setTab(1);
                            // $scope.buscarAfiliado('1', response.data.TIPO_DOCUMENTO, response.data.DOCUMENTO);
                            $scope.cargando_datosAut(response.data);
                        }
                        if ($scope.tipoaut == '4') {
                            $scope.setTabIV(1);
                            $scope.cargando_datosAut(response.data);
                            // $scope.buscarAfiliado('4', response.data.TIPO_DOCUMENTO, response.data.DOCUMENTO);
                        }
                        // $scope.obtenerServiciosedit(response.data);
                        // $scope.cargando_datos(response.data);
                        // $scope.buscar_senso();

                        // $scope.mostrar_detalle(cod, ubicacion);
                        $scope.clas = response.data.CODCLASI;


                    }
                });

            }
            function validate_fecha(fecha) {

                var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
                if (fecha.search(patron) == 0) {
                    var values = fecha.split("-");
                    if (isValidDate(values[2], values[1], values[0])) {
                        return true;
                    }
                }
                return false;
            }

            function isValidDate(day, month, year) {
                var dteDate;
                month = month - 1;
                dteDate = new Date(year, month, day);
                //Devuelva true o false...
                return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
            }

            function formatDate(date) {
                var dd = ('0' + date.getDate()).slice(-2);
                var mm = ('0' + (date.getMonth() + 1)).slice(-2);
                var yyyy = date.getFullYear();
                var hh = date.getHours();
                var mi = date.getMinutes();
                return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
            }

            $scope.calcularEdad = function (date, tipo) {
                //var fecha=document.getElementById("user_date").value;
                var fecha = date.split("/").reverse().join("-");
                if (validate_fecha(fecha) == true) {
                    // Si la fecha es correcta, calculamos la edad
                    var values = fecha.split("-");
                    var dia = values[2];
                    var mes = values[1];
                    var ano = values[0];

                    // cogemos los valores actuales
                    var fecha_hoy = new Date();
                    var ahora_ano = fecha_hoy.getYear();
                    var ahora_mes = fecha_hoy.getMonth() + 1;
                    var ahora_dia = fecha_hoy.getDate();

                    // realizamos el calculo
                    var edad = (ahora_ano + 1900) - ano;
                    if (ahora_mes < mes) {
                        edad--;
                    }

                    if ((mes == ahora_mes) && (ahora_dia < dia)) {
                        edad--;
                    }

                    if (edad > 1900) {
                        edad -= 1900;
                    }



                    // calculamos los meses
                    var meses = 0;
                    if (ahora_mes > mes)
                        meses = ahora_mes - mes;
                    if (ahora_mes < mes)
                        meses = 12 - (mes - ahora_mes);
                    if (ahora_mes == mes && dia > ahora_dia)
                        meses = 11;

                    // calculamos los dias
                    var dias = 0;
                    if (ahora_dia > dia)
                        dias = ahora_dia - dia;
                    if (ahora_dia < dia) {
                        var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
                        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
                    }

                    if (tipo == 1) {
                        if (edad > 0) {
                            $scope.cantidadanosaut = 'años'
                            if (edad == 1) {
                                $scope.cantidadanosaut = 'años'
                            }

                            $scope.edadaut = edad;

                        } else {

                            if (meses > 0) {

                                $scope.cantidadanosaut = 'meses'

                                if (meses == 1) {

                                    $scope.cantidadanosaut = 'mes'

                                }

                                $scope.edadaut = meses;

                            } else {

                                if (dias > 0) {

                                    $scope.cantidadanosaut = 'dias'

                                    if (dias == 1) {

                                        $scope.cantidadanosaut = 'dia'

                                    }

                                    $scope.edadaut = dias;

                                }

                            }

                        }

                    } else if (tipo == 4) {

                        if (edad > 0) {

                            $scope.cantidadanosautedit = 'años'

                            if (edad == 1) {

                                $scope.cantidadanosautedit = 'años'

                            }

                            $scope.edadautedit = edad;

                        } else {

                            if (meses > 0) {

                                $scope.cantidadanosautedit = 'meses'

                                if (meses == 1) {

                                    $scope.cantidadanosautedit = 'mes'

                                }

                                $scope.edadautedit = meses;

                            } else {

                                if (dias > 0) {

                                    $scope.cantidadanosautedit = 'dias'

                                    if (dias == 1) {

                                        $scope.cantidadanosautedit = 'dia'

                                    }

                                    $scope.edadautedit = dias;

                                }

                            }

                        }

                    }



                }

            }
            $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
                console.log(tipo);
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                    data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
                }).then(function (response) {
                    if (response.data.CODIGO != "0") {

                        if (tipo == '1') {

                            $scope.infoafiliadoaut = [];

                            $scope.infoafiliadoaut = response.data;



                            if ($scope.infoafiliadoaut.EMPLEADOR) {

                                $scope.infoafiliadoaut.EMPLEADOR = JSON.parse($scope.infoafiliadoaut.EMPLEADOR);

                            }
                            $scope.afirownumI = 1;

                            if ($scope.infoafiliadoaut.SINIESTRO == 'true') {

                                $scope.afirownumI = $scope.afirownumI + 1;

                            }

                            if ($scope.infoafiliadoaut.TUTELA == 'true') {

                                $scope.afirownumI = $scope.afirownumI + 1;

                            }

                            if ($scope.infoafiliadoaut.PORTABILIDAD == 'S') {

                                $scope.afirownumI = $scope.afirownumI + 1;

                            }


                            if ($scope.infoafiliadoaut.ERROR_50 == 'true') {

                                $scope.afirownumI = $scope.afirownumI + 1;

                            }

                            if ($scope.infoafiliadoaut.AFIC_T045 == 'S') {

                                $scope.afirownumI = $scope.afirownumI + 1;

                            }

                            $scope.calcularEdad($scope.infoafiliadoaut.FechaNacimiento, tipo);

                            $scope.sexoafitabI = $scope.infoafiliadoaut.SexoCodigo;

                            $scope.edadafitabI = $scope.infoafiliadoaut.EdadDias;

                            $scope.regimenafitabI = $scope.infoafiliadoaut.CodigoRegimen;

                            $scope.inactiveseccion1tab1 = true;

                            $scope.inactiveseccion2tab1 = false;

                            $scope.productosagregadostabI = [];

                            $scope.datosAfiModalNov = $scope.infoafiliadoaut;




                        }
                        if (tipo == '4') {

                            $scope.infoafiliadoautiv = [];

                            $scope.infoafiliadoautiv = response.data;



                            if ($scope.infoafiliadoautiv.EMPLEADOR) {

                                $scope.infoafiliadoautiv.EMPLEADOR = JSON.parse($scope.infoafiliadoautiv.EMPLEADOR);

                            }
                            $scope.afirownumIV = 1;

                            if ($scope.infoafiliadoautiv.SINIESTRO == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautiv.TUTELA == 'true') {

                                $scope.afirownumIV = $scope.afirownumI + 1;

                            }

                            if ($scope.infoafiliadoautiv.PORTABILIDAD == 'S') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }


                            if ($scope.infoafiliadoautiv.ERROR_50 == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautiv.AFIC_T045 == 'S') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            $scope.calcularEdad($scope.infoafiliadoautiv.FechaNacimiento, tipo);

                            $scope.sexoafitabIV = $scope.infoafiliadoautiv.SexoCodigo;

                            $scope.edadafitabIV = $scope.infoafiliadoautiv.EdadDias;

                            $scope.regimenafitabIV = $scope.infoafiliadoautiv.CodigoRegimen;

                            $scope.inactiveseccion1tab1 = true;

                            $scope.inactiveseccion2tab1 = false;

                            $scope.productosagregadostabI = [];

                            $scope.datosAfiModalNov = $scope.infoafiliadoautiv;




                        }
                        if (response.data.VALIDA_DOC > 0) {
                            swal('Importante', response.data.VALIDA_DOC, 'info');
                        }

                    } else {

                        swal('Importante', response.data.NOMBRE, 'info')

                    }

                });

            }
            $scope.cargando_datos = function (res) {
                console.log(res);
                if ($scope.tipoaut == '1') {
                    $scope.esoa = res;
                    // $scope.mostrar_esoa = true;
                    $scope.esoa.CODCLASI = res.CODCLASI;
                    var fecha_for = $scope.esoa.FECHA_INGRESO.split("-");
                    $scope.esoa.FECHA_INGRESO = new Date(fecha_for[2], fecha_for[1] - 1, fecha_for[0]);
                    $scope.sw = $scope.esoa.HIJO_DE == 'true' ? true : false;
                }
                if ($scope.tipoaut == '4') {
                    $scope.esoaiv = res;
                    $scope.mostrar_esoa = true;
                    $scope.tabRaniv.number = 2;
                    $scope.esoaiv.CODCLASI = res.CODCLASI;
                    var fecha_for = $scope.esoaiv.FECHA_INGRESO.split("-");
                    $scope.esoaiv.FECHA_INGRESO = new Date(fecha_for[2], fecha_for[1] - 1, fecha_for[0]);
                    $scope.swiv = $scope.esoaiv.HIJO_DE == 'true' ? true : false;
                }


            }
            $scope.actualizar_datos = function () {
                if ($scope.tipoaut == '1') {
                    var productos = JSON.stringify($scope.listar_detalles);
                    var cantidad = $scope.listar_detalles.length;
                }
                if ($scope.tipoaut == '4') {
                    var productos = JSON.stringify($scope.listar_detallesiv);
                    var cantidad = $scope.listar_detallesiv.length;
                }
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'actualizar_datos_auto',
                        v_pnumero: $scope.tipoaut == '1' ? $scope.esoa.NUMERO : $scope.esoaiv.NUMERO,
                        v_pubicacion: $scope.tipoaut == '1' ? $scope.esoa.UBICACION : $scope.esoaiv.UBICACION,
                        v_pubicacionpaciente: $scope.tipoaut == '1' ? $scope.esoa.UBICACIONPACIENTE : $scope.esoaiv.UBICACIONPACIENTE,
                        v_pservicio: $scope.tipoaut == '1' ? $scope.esoa.CODCLASI : $scope.esoaiv.CODCLASI,
                        v_pjustificacion: $scope.tipoaut == '1' ? $scope.esoa.JUSTIFICACION : $scope.esoaiv.JUSTIFICACION,
                        v_pfecha: $scope.tipoaut == '1' ? $scope.esoa.FECHA_INGRESO : $scope.esoaiv.FECHA_INGRESO,
                        v_pproductos: productos,
                        v_pcantidad: cantidad
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: (response.data.Numero && response.data.Ubicacion) ? response.data.Nombre + "Número " + response.data.Numero + "Ubicación " + response.data.Ubicacion : response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            if ($scope.tipoaut == '1') {
                                console.log($scope.censos);
                                if (response.data.CrearCenso == 'S' && $scope.censos.length == 0) {
                                    $scope.esoa.AutManual = response.data.AutManual;
                                    $scope.crearCenso();
                                } else {
                                    if ($scope.tipoaut == '1') {
                                        $scope.retroceder();
                                    }

                                }
                            }

                            if ($scope.tipoaut == '4') {
                                if (response.data.CrearCenso == 'S' && $scope.censosiv.length == 0) {
                                    $scope.esoaiv.AutManual = response.data.AutManual;
                                    $scope.crearCenso();
                                } else {
                                    $scope.atras();
                                }

                            }
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
                if ($scope.tipoaut == '1') {
                    var productos = JSON.stringify($scope.listar_detalles);
                    var cantidad = $scope.listar_detalles.length;

                }
                if ($scope.tipoaut == '4') {
                    var productos = JSON.stringify($scope.listar_detallesiv);
                    var cantidad = $scope.listar_detallesiv.length;

                }
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_guarda_esoa',
                        v_pnumero: $scope.tipoaut == '1' ? $scope.esoa.NUMERO : $scope.esoaiv.NUMERO,
                        v_pubicacion: $scope.tipoaut == '1' ? $scope.esoa.UBICACION : $scope.esoaiv.UBICACION,
                        v_pubicacionpaciente: $scope.tipoaut == '1' ? $scope.esoa.UBICACIONPACIENTE : $scope.esoaiv.UBICACIONPACIENTE,
                        v_pservicio: $scope.tipoaut == '1' ? $scope.esoa.CODCLASI : $scope.esoaiv.CODCLASI,
                        v_pjustificacion: $scope.tipoaut == '1' ? $scope.esoa.JUSTIFICACION : $scope.esoaiv.JUSTIFICACION,
                        v_pfecha: $scope.tipoaut == '1' ? $scope.esoa.FECHA_INGRESO : $scope.esoaiv.FECHA_INGRESO,
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

                            if ($scope.tipoaut == '1') {
                                $scope.retroceder();
                            }
                            if ($scope.tipoaut == '4') {
                                $scope.atras();
                            }

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

            $scope.tempsolicitud = null;
            $scope.checkanulacion = function () {
                console.log($scope.listar_detalles);
                if ($scope.tipoaut == '1') {
                    if ($scope.listar_detalles.length == 0) {
                        $scope.openmodals("modalmotivosaut");
                    } else {
                        $scope.anular_datos();
                    }
                }
                if ($scope.tipoaut == '4') {
                    if ($scope.listar_detallesiv.length == 0) {
                        $scope.openmodals("modalmotivosaut");
                    } else {
                        $scope.anular_datos();
                    }
                }
            }

            $scope.jutificacionanulacion = "";

            $scope.anular_datos = function () {
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_anular_esoa',
                        v_pnumero: $scope.tipoaut == '1' ? $scope.esoa.NUMERO : $scope.esoaiv.NUMERO,
                        v_pubicacion: $scope.tipoaut == '1' ? $scope.esoa.UBICACION : $scope.esoaiv.UBICACION,
                        v_pmotivo_anulacion: $scope.jutificacionanulacion
                    }
                }).then(function (response) {
                    if (response.data.Codigo == 0) {
                        swal({
                            title: "Completado!",
                            text: response.data.Nombre,
                            type: "success"
                        }).then(function () {
                            $scope.closemodals("modalmotivosaut");
                            if ($scope.tipoaut == '1') {
                                $scope.retroceder();
                            }

                            if ($scope.tipoaut == '4') {
                                $scope.atras();
                            }

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

                        if ($scope.tipoaut == '1') {
                            $scope.listar_detalles = [];
                        }
                        if ($scope.tipoaut == '4') {
                            $scope.listar_detallesiv = [];
                        }
                    } else if (response.data.length > 0) {
                        if ($scope.tipoaut == '1') {
                            $scope.listar_detalles = response.data;
                        }
                        if ($scope.tipoaut == '4') {
                            $scope.listar_detallesiv = response.data;
                        }

                    } else {
                        if ($scope.tipoaut == '1') {
                            $scope.listar_detalles = [];
                        }
                        if ($scope.tipoaut == '4') {
                            $scope.listar_detallesiv = [];
                        }
                    }
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

            $scope.funcgetElementById = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                input.value = valor.replace(/\D|\-/, '');
            }

            $scope.seleccionarproducto = function (pro) {
                $scope.tempProd = pro;
                if (pro.SUBCLAS == 'S') {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: {
                            function: 'p_mostrar_hijos_epro_valor',
                            cups: pro.CODIGO,
                            regimen: $scope.tipoaut == '1' ? $scope.esoa.DOCUMENTOCONTRATO : $scope.esoaiv.DOCUMENTOCONTRATO,
                            contrato: $scope.tipoaut == '1' ? $scope.esoa.CONTRATO : $scope.esoaiv.CONTRATO,
                            ubicacion: $scope.tipoaut == '1' ? $scope.esoa.UBICACIONCONTRATO : $scope.esoaiv.UBICACIONCONTRATO
                        }
                    }).then(function (res) {
                        $scope.listMotivos = res.data;
                        $scope.templistMotivos = res.data;
                        $scope.array = { 99999: "NO APLICA SUBCATEGORIA" };
                        for (var i = 0; i < $scope.listMotivos.length; i++) {
                            var val = $scope.listMotivos[i].NUMERO_H + ' - ' + $scope.listMotivos[i].NOMBRE_H + ' - ' + $scope.listMotivos[i].VALOR;
                            $scope.array[val] = val;
                        }

                        swal({
                            title: 'Seleccionar Subcategoria',
                            input: 'select',
                            inputOptions: $scope.array,
                            inputPlaceholder: 'Seleccionar',
                            showCancelButton: true,
                            inputValidator: function (value) {
                                return new Promise(function (resolve, reject) {
                                    if (value !== '') {
                                        resolve();
                                    } else {
                                        reject('Debes Selecionar una Subcategoria');
                                    }
                                });
                            }
                        }).then(function (result) {
                            console.log(result);

                            $scope.tempsubcla = result.split('-');
                            if (result) {

                                if ($scope.tipoaut == '1') {
                                    const filteredItems = $scope.listar_detalles.findIndex(item => item == $scope.tempProd);
                                    console.log('filteredItems_', filteredItems);
                                }

                                if ($scope.tipoaut == '4') {
                                    const filteredItems = $scope.listar_detallesiv.findIndex(item => item == $scope.tempProd);
                                    console.log('filteredItems_', filteredItems);
                                }
                                if ($scope.tempsubcla[0] == '99999') {
                                    if ($scope.tipoaut == '1') {
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].subclasn = 'N';
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo = pro.CODIGO;
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].nombre = pro.NOMBRE;
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].valor = pro.VALOR;
                                    }
                                    if ($scope.tipoaut == '4') {
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].subclasn = 'N';
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].codigo = pro.CODIGO;
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].nombre = pro.NOMBRE;
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].valor = pro.VALOR;
                                    }
                                    $scope.$apply();
                                    $scope.closemodals('producto');
                                } else {
                                    if ($scope.tipoaut == '1') {
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].subclasn = 'S';
                                        const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].subclascod = filteredMotivos.NUMERO_H;
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].subclasnom = filteredMotivos.NOMBRE_H;
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo = pro.CODIGO;
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].nombre = pro.NOMBRE;
                                        $scope.listar_detalles[$scope.renglon_cambiando_producto].valor = pro.VALOR;

                                    }

                                    if ($scope.tipoaut == '4') {
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].subclasn = 'S';
                                        const filteredMotivos = $scope.templistMotivos.find(item => item.NUMERO_H == ($scope.tempsubcla[0]));
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].subclascod = filteredMotivos.NUMERO_H;
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].subclasnom = filteredMotivos.NOMBRE_H;
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].codigo = pro.CODIGO;
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].nombre = pro.NOMBRE;
                                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].valor = pro.VALOR;

                                    }

                                    console.log($scope.listar_detalles);
                                    console.log($scope.listar_detallesiv);
                                    $scope.$apply();
                                    $scope.closemodals('producto');
                                }
                                swal({
                                    title: "Completado",
                                    html: 'Producto  y Subcategoria Seleccionados',
                                    type: 'success',
                                });

                            }
                        });
                    })

                } else {
                    if ($scope.tipoaut == '1') {
                        $scope.listar_detalles[$scope.renglon_cambiando_producto].codigo = pro.CODIGO;
                        $scope.listar_detalles[$scope.renglon_cambiando_producto].nombre = pro.NOMBRE;
                        $scope.listar_detalles[$scope.renglon_cambiando_producto].valor = pro.VALOR;
                    }
                    if ($scope.tipoaut == '4') {
                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].codigo = pro.CODIGO;
                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].nombre = pro.NOMBRE;
                        $scope.listar_detallesiv[$scope.renglon_cambiando_producto].valor = pro.VALOR;
                    }
                    $scope.$apply();
                    $scope.closemodals('producto');
                }

            }
            $scope.elegir = function (codigo, nombre, ind) {
                $("#DM" + codigo).addClass('eleacti');
                $('#DM' + codigo).siblings().removeClass('eleacti');
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

            $scope.inactivebarrapro = true;
            $scope.buscarProducto = function () {
                if ($scope.buscarpro != '') {
                    swal({
                        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                        width: 200,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        animation: false
                    });
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/esoa/esoa.php",
                        data: {
                            function: 'obtenerProducto',
                            regimen: $scope.tipoaut == '1' ? $scope.esoa.REGIMEN : $scope.esoaiv.REGIMEN,
                            contrato: $scope.tipoaut == '1' ? $scope.esoa.CONTRATO : $scope.esoaiv.CONTRATO,
                            word: $scope.buscarpro,
                            clasificacion: $scope.clas,
                            sexo: $scope.tipoaut == '1' ? $scope.esoa.SEXO : $scope.esoaiv.SEXO,
                            edad: $scope.tipoaut == '1' ? $scope.esoa.EDAD : $scope.esoaiv.EDAD,
                        }
                    }).then(function (response) {
                        if (response.data.CODIGO == "1") {
                            $scope.inactivebarrapro = true;
                            $scope.listProductos = [];
                            swal('Importante', response.data.NOMBRE, 'info');
                        } else {
                            $scope.inactivebarrapro = false;
                            $scope.listProductos = response.data;

                            swal.close();
                        }
                    })
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
          $scope.descargafile = function (ruta,ftp) {
                if (ftp=='1') {
                    $http({
                        method: 'POST',
                        url: "php/juridica/tutelas/functutelas.php",
                        data: {
                            function: 'descargaAdjunto',
                            ruta: ruta
                        }
                    }).then(function (response) {                        
                        window.open("temp/" + response.data);
                    });   
                }               

                if (ftp=='3') {
                    $http({
                        method: 'POST',
                        url: "php/siau/pqr/Cpqr.php",
                        data: { function: 'descargaAdjunto', ruta: ruta }
                      }).then(function (response) {
                        window.open("temp/" + response.data);
                      });
                }
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

            // 
            $scope.initPaginacioniv = function (info) {
                $scope.reporteTempiv = info;
                $scope.currentPageiv = 0;
                $scope.pageSizeiv = 10;
                $scope.valmaxpagiv = 10;
                $scope.pagesiv = [];
                $scope.configPagesiv();
            }

            $scope.filteriv = function (val) {
                $scope.reporteTempiv = $filter('filter')($scope.reporteiv, val);
                $scope.configPagesiv();
            }
            $scope.configPagesiv = function () {
                $scope.pagesiv.length = 0;
                var ini = $scope.currentPageiv - 4;
                var fin = $scope.currentPageiv + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.reporteTempiv.length / $scope.pageSizeiv) > $scope.valmaxpagiv)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.reporteTempiv.length / $scope.pageSizeiv);
                } else {
                    if (ini >= Math.ceil($scope.reporteTempiv.length / $scope.pageSizeiv) - $scope.valmaxpagiv) {
                        ini = Math.ceil($scope.reporteTempiv.length / $scope.pageSizeiv) - $scope.valmaxpagiv;
                        fin = Math.ceil($scope.reporteTempiv.length / $scope.pageSizeiv);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pagesiv.push({
                        no: i
                    });
                }

                if ($scope.currentPageiv >= $scope.pagesiv.length)
                    $scope.currentPageiv = $scope.pagesiv.length - 1;
                if ($scope.currentPageiv < 0) { $scope.currentPageiv = 0; }
            };
            $scope.setPageiv = function (index) {
                $scope.currentPageiv = index - 1;
                if ($scope.pagesiv.length % 2 == 0) {
                    var resul = $scope.pagesiv.length / 2;
                } else {
                    var resul = ($scope.pagesiv.length + 1) / 2;
                }
                var i = index - resul;
                if ($scope.reporteTempiv.length % $scope.pageSizeiv == 0) {
                    var tamanomax = parseInt($scope.reporteTempiv.length / $scope.pageSizeiv);
                } else {
                    var tamanomax = parseInt($scope.reporteTempiv.length / $scope.pageSizeiv) + 1;
                }
                // var tamanomax= $scope.reporteTemp.length/$scope.pageSize;                
                var fin = ($scope.pagesiv.length + i) - 1;
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
                if (index > resul) {
                    $scope.calculariv(i, fin);
                }
                console.log($scope.reporteiv.length / $scope.pageSizeiv - 1);
            };
            $scope.pasoiv = function (tipo) {
                if (tipo == 'next') {
                    var i = $scope.pagesiv[0].no + 1;
                    if ($scope.pagesiv.length > 9) {
                        var fin = $scope.pagesiv[9].no + 1;
                    } else {
                        var fin = $scope.pagesiv.length;
                    }

                    $scope.currentPageiv = $scope.currentPageiv + 1;
                    if ($scope.reporteTempiv.length % $scope.pageSizeiv == 0) {
                        var tamanomax = parseInt($scope.reporteTempiv.length / $scope.pageSizeiv);
                    } else {
                        var tamanomax = parseInt($scope.reporteTempiv.length / $scope.pageSizeiv) + 1;
                    }
                    if (fin > tamanomax) {
                        fin = tamanomax;
                        i = tamanomax - 10;
                    }
                } else {
                    var i = $scope.pagesiv[0].no - 1;
                    if ($scope.pagesiv.length > 9) {
                        var fin = $scope.pagesiv[9].no - 1;
                    } else {
                        var fin = $scope.pagesiv.length;
                    }

                    $scope.currentPageiv = $scope.currentPageiv - 1;
                    if (i <= 1) {
                        i = 1;
                        fin = $scope.pagesiv.length;
                    }
                }
                $scope.calculariv(i, fin);
            }
            $scope.calculariv = function (i, fin) {
                if (fin > 9) {
                    i = fin - 9;
                } else {
                    i = 1;
                }
                $scope.pagesiv = [];
                for (i; i <= fin; i++) {
                    $scope.pagesiv.push({
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
                console.log("BUSCA EL CENSO");
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_obtener_censo',
                        v_pafiliado: param.DOCUMENTO,
                        v_pprestador: param.NIT
                    }
                }).then(function (response) {
                    console.log(response.data);

                    if (response.data.Codigo == 0) {
                        // swal('Informacion', 'No hay censo relacionado con este Paciente en esta Clinica', 'error');
                        if ($scope.tipoaut == '1') {
                            $scope.censos = [];
                            $scope.mostrar_error_censo = false;
                        }

                        if ($scope.tipoaut == '4') {
                            $scope.censosiv = [];
                            $scope.mostrar_error_censoiv = false;
                        }
                    } else {
                        // $scope.mostrar_error_censo = false;
                        // $scope.tempcensos = response.data;
                        // if ($scope.censos[0].Codigo != 0) {
                        //     $scope.body = false;
                        //     $scope.fallo = true;
                        // } else {
                        //     $scope.body = true;
                        //     $scope.fallo = false;
                        // }
                        if ($scope.tipoaut == '1') {
                            // $scope.censos = response.data;
                            $scope.tempcensos = response.data;
                            $scope.mostrar_error_censo = false;
                        }

                        if ($scope.tipoaut == '4') {
                            // $scope.censosiv = response.data;
                            $scope.tempcensosiv = response.data;
                            $scope.mostrar_error_censoiv = false;

                        }
                    }

                });
            }

            $scope.valespecialidad = false;
            $scope.openmodals = function (tipo, opcion) {
                switch (tipo) {
                    case 'producto':
                        $scope.inactivebarrapro = true;
                        $scope.listProductos = [];
                        $scope.nombre_tipo = "Selecciona el Producto"
                        $scope.mostrar_valor = 1;
                        $scope.renglon_cambiando_producto = opcion;
                        console.log(opcion);

                        if ($scope.tipoaut == '1') {
                            $scope.cambiar_producto = $scope.listar_detalles[opcion].codigo;
                            $scope.cambiar_nombre = $scope.listar_detalles[opcion].nombre;
                            $scope.cambiar_valor = $scope.listar_detalles[opcion].valor;
                        }
                        if ($scope.tipoaut == '4') {
                            $scope.cambiar_producto = $scope.listar_detallesiv[opcion].codigo;
                            $scope.cambiar_nombre = $scope.listar_detallesiv[opcion].nombre;
                            $scope.cambiar_valor = $scope.listar_detallesiv[opcion].valor;
                        }
                        $("#modalproducto").modal("open");
                        setTimeout(() => {
                            $('#modalproducto #proinput').focus();
                        }, 100);
                        break;
                    case 'modalservicio':
                        if ($scope.solicitud.contrato == '' || $scope.solicitud.contrato == null) {
                            swal('Importante', 'El contrato no puede estar vacio!', 'info');
                        } else {
                            $("#modalservicio").modal("open");
                            setTimeout(() => {
                                $('#modalservicio #servinput').focus();
                            }, 100);
                        }
                        break;
                    case 'modalespecialidad':
                        if ($scope.solicitud.codips) {
                            $scope.valespecialidad = false;
                        } else {
                            $scope.valespecialidad = true;
                        }
                        if ($scope.valespecialidad == true) {
                            swal('Importante', 'La Ips Solicitante no puede estar vacia!', 'info');
                        } else {
                            $("#modalespecialidad").modal("open");
                            setTimeout(() => {
                                $('#modalespecialidad #especialidadinput').focus();
                            }, 100);
                        }
                        break;

                    case 'responsables':
                        $("#modalresponsables").modal("open");
                        break;
                    case 'modalmotivosaut':
                        $("#modalmotivosaut").modal("open");
                        break;

                    case 'modalevantarctrlfrecuencia':
                        $scope.levantarop = opcion;
                        $http({
                            method: 'POST',
                            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                            data: { function: 'p_lista_motivosfrecuencia' }
                        }).then(function (response) {
                            $scope.listMotivosfrecuencia = response.data;
                        })
                        $("#modalevantarctrlfrecuencia").modal("open");
                        break;

                    default:
                }
            }


            $scope.closemodals = function (tipo) {
                switch (tipo) {
                    case 'diagnostico':
                        $("#modaldiagnostico").modal("close");
                        break;
                    case 'ips':
                        $("#modalips").modal("close");
                        break;
                    case 'producto':
                        $("#modalproducto").modal("close");
                        break;
                    case 'modalservicio':
                        $("#modalservicio").modal("close");
                        break;
                    case 'modalespecialidad':
                        $("#modalespecialidad").modal("close");
                        break;
                    case 'modaldetalle':
                        $("#modaldetalle").modal("close");
                        break;
                    case 'modaleditardetalle':
                        $("#modaleditardetalle").modal("close");
                        break;
                    case 'responsable':
                        $("#modalresponsables").modal("close");
                        break;

                    case 'modalmotivosaut':
                        $scope.jutificacionanulacion = "";
                        $("#modalmotivosaut").modal("close");

                        break;
                    default:
                }
            }

            $scope.cargardatoscenso = function (datos) {
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_listar_medicos',
                        ubicacion: datos.UBICACION
                    }
                }).then(function (response) {
                    $scope.listmedicos = response.data;
                });
            }




            $scope.seleccionaResponsable = function (res) {
                console.log(res);
                if ($scope.tipoaut == '1') {
                    $scope.esoa.RESPONSABLE = res.cedula;
                    $scope.esoa.NOMRESPONSABLE = res.nombre
                    $scope.closemodals('responsable');
                }
                if ($scope.tipoaut == '4') {
                    $scope.esoaiv.RESPONSABLE = res.cedula;
                    $scope.esoaiv.NOMRESPONSABLE = res.nombre
                    $scope.closemodals('responsable');
                }

            }
            $scope.crearCenso = function () {
                // console.log($scope.esoa);      
                swal({
                    html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                    width: 200,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    animation: false
                });
                var censo = {
                    ubicacion: $scope.tipoaut == '1' ? $scope.esoa.UBICACIONIPS : $scope.esoaiv.UBICACIONIPS,
                    oficina: $scope.tipoaut == '1' ? $scope.esoa.UBICACIONIPS : $scope.esoaiv.UBICACIONIPS,
                    tipo_documento: $scope.tipoaut == '1' ? $scope.esoa.TIPO_DOCUMENTO : $scope.esoaiv.TIPO_DOCUMENTO,
                    afiliado: $scope.tipoaut == '1' ? $scope.esoa.DOCUMENTO : $scope.esoaiv.DOCUMENTO,
                    regimen: $scope.tipoaut == '1' ? $scope.esoa.REGIMEN : $scope.esoaiv.REGIMEN,
                    autorizacion_manual: $scope.tipoaut == '1' ? $scope.esoa.AutManual : $scope.esoaiv.AutManual,
                    diagnostico: $scope.tipoaut == '1' ? $scope.esoa.COD_DX : $scope.esoaiv.COD_DX,
                    diagnostico1: $scope.tipoaut == '1' ? $scope.esoa.COD_DX1 : $scope.esoaiv.COD_DX1,
                    diagnostico2: '',
                    protocolo: $scope.tipoaut == '1' ? $scope.esoa.PROTOCOLO : $scope.esoaiv.PROTOCOLO,
                    ubicacion_afiliado: $scope.tipoaut == '1' ? $scope.esoa.UBICACION_AFILIADONUMERO : $scope.esoaiv.UBICACION_AFILIADONUMERO,
                    tercero: $scope.tipoaut == '1' ? $scope.esoa.NIT : $scope.esoaiv.NIT,
                    concepto: $scope.tipoaut == '1' ? $scope.esoa.ESTANCIA : $scope.esoaiv.ESTANCIA,
                    responsable: $scope.tipoaut == '1' ? $scope.esoa.RESPONSABLE : $scope.esoaiv.RESPONSABLE,
                    fecha_ingreso: parsedia($scope.tipoaut == '1' ? $scope.esoa.FECHA_INGRESO : $scope.esoaiv.FECHA_INGRESO),
                    serial_afiliado: $scope.tipoaut == '1' ? $scope.esoa.DOCUMENTO : $scope.esoaiv.DOCUMENTO,
                    hijo_de_nacido_vivo: 'N',
                    hijo_de_numero: '0',
                };


                console.log(censo);
                $http({
                    method: 'POST',
                    url: "php/autorizaciones/esoa/esoa.php",
                    data: {
                        function: 'p_insertar_censo',
                        censo: JSON.stringify(censo)
                    }
                }).then(function (response) {
                    console.log(response.data);
                    if ($scope.tipoaut == '1') {
                        if (response.data.codigo == '1') {
                            swal('Importante', response.data.mensaje, 'info', 3000);
                            setTimeout(() => {
                                $scope.retroceder();
                            }, 3000);

                        } else {
                            swal.close();
                            $scope.setTab(3);
                        }

                    }
                    if ($scope.tipoaut == '4') {
                        if (response.data.codigo == '1') {
                            swal('Importante', response.data.mensaje, 'info', 3000);

                            setTimeout(() => {
                                $scope.atras();
                            }, 3000);

                        } else {
                            swal.close();
                            $scope.setTabIV(3);
                        }

                    }


                })
            }

            $scope.formatTextoObs = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                valor = valor.replace(/[|!¡¿?°$=/()"#%{}*&''`´¨<>]/g, '');
                valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
                input.value = valor;


            }

            $scope.busquedaDetalles = function () {
                $scope.busquedaXdetalles = ngDialog.open({
                    template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalBusquedaxnombres',
                    closeByEscape: false,
                    closeByDocument: false
                });
                $scope.busquedaXdetalles.closePromise.then(function (response) {
                    if (response.value === undefined) { return; }
                    if (response.value != "$closeButton") {
                        $scope.type = response.value.tipo;
                        $scope.id = response.value.documento;
                        $scope.estado_bus = 'A';
                        $scope.documento = $scope.id;
                        $scope.codigo_bus = $scope.id;
                        $scope.buscar_solicitud();
                        // $scope.buscarAutorizaciones($scope.id, '', '');

                    }
                });
            }

            $scope.FormatSoloTextoNumero = function (NID) {
                const input = document.getElementById('' + NID + '');
                var valor = input.value;
                input.value = valor.replace(/[^\wÑñ,.-\s]/g, '');
            }


            $scope.cargando_datosAut = function (datos) {
                console.log("datos_", datos);
                return new Promise(function (resolve, reject) {
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: { function: 'obtenerafiliados', tipodocumento: datos.TIPO_DOCUMENTO, documento: datos.DOCUMENTO }
                    }).then(function (response) {
                        console.log("response datos afiliados");
                        if (response.data.Documento) {
                            if (response.data.CODIGO != "0") {

                                if ($scope.tipoaut == '1') {

                                    $scope.infoafiliadoaut = [];

                                    $scope.infoafiliadoaut = response.data;



                                    if ($scope.infoafiliadoaut.EMPLEADOR) {

                                        $scope.infoafiliadoaut.EMPLEADOR = JSON.parse($scope.infoafiliadoaut.EMPLEADOR);

                                    }
                                    $scope.afirownumI = 1;

                                    if ($scope.infoafiliadoaut.SINIESTRO == 'true') {

                                        $scope.afirownumI = $scope.afirownumI + 1;

                                    }

                                    if ($scope.infoafiliadoaut.TUTELA == 'true') {

                                        $scope.afirownumI = $scope.afirownumI + 1;

                                    }

                                    if ($scope.infoafiliadoaut.PORTABILIDAD == 'S') {

                                        $scope.afirownumI = $scope.afirownumI + 1;

                                    }


                                    if ($scope.infoafiliadoaut.ERROR_50 == 'true') {

                                        $scope.afirownumI = $scope.afirownumI + 1;

                                    }

                                    if ($scope.infoafiliadoaut.AFIC_T045 == 'S') {

                                        $scope.afirownumI = $scope.afirownumI + 1;

                                    }

                                    $scope.calcularEdad($scope.infoafiliadoaut.FechaNacimiento, '1');

                                    $scope.sexoafitabI = $scope.infoafiliadoaut.SexoCodigo;

                                    $scope.edadafitabI = $scope.infoafiliadoaut.EdadDias;

                                    $scope.regimenafitabI = $scope.infoafiliadoaut.CodigoRegimen;

                                    $scope.inactiveseccion1tab1 = true;

                                    $scope.inactiveseccion2tab1 = false;

                                    $scope.productosagregadostabI = [];

                                    $scope.datosAfiModalNov = $scope.infoafiliadoaut;




                                }
                                if ($scope.tipoaut == '4') {

                                    $scope.infoafiliadoautiv = [];

                                    $scope.infoafiliadoautiv = response.data;



                                    if ($scope.infoafiliadoautiv.EMPLEADOR) {

                                        $scope.infoafiliadoautiv.EMPLEADOR = JSON.parse($scope.infoafiliadoautiv.EMPLEADOR);

                                    }
                                    $scope.afirownumIV = 1;

                                    if ($scope.infoafiliadoautiv.SINIESTRO == 'true') {

                                        $scope.afirownumIV = $scope.afirownumIV + 1;

                                    }

                                    if ($scope.infoafiliadoautiv.TUTELA == 'true') {

                                        $scope.afirownumIV = $scope.afirownumI + 1;

                                    }

                                    if ($scope.infoafiliadoautiv.PORTABILIDAD == 'S') {

                                        $scope.afirownumIV = $scope.afirownumIV + 1;

                                    }


                                    if ($scope.infoafiliadoautiv.ERROR_50 == 'true') {

                                        $scope.afirownumIV = $scope.afirownumIV + 1;

                                    }

                                    if ($scope.infoafiliadoautiv.AFIC_T045 == 'S') {

                                        $scope.afirownumIV = $scope.afirownumIV + 1;

                                    }

                                    $scope.calcularEdad($scope.infoafiliadoautiv.FechaNacimiento, '4');

                                    $scope.sexoafitabIV = $scope.infoafiliadoautiv.SexoCodigo;

                                    $scope.edadafitabIV = $scope.infoafiliadoautiv.EdadDias;

                                    $scope.regimenafitabIV = $scope.infoafiliadoautiv.CodigoRegimen;

                                    $scope.inactiveseccion1tab1 = true;

                                    $scope.inactiveseccion2tab1 = false;

                                    $scope.productosagregadostabI = [];

                                    $scope.datosAfiModalNov = $scope.infoafiliadoautiv;




                                }
                                if (response.data.VALIDA_DOC > 0) {
                                    swal('Importante', response.data.VALIDA_DOC, 'info');
                                }

                            } else {

                                swal('Importante', response.data.NOMBRE, 'info')

                            }
                            $scope.cargando_datos(datos);
                            console.log("datos_3128", datos);
                            $http({
                                method: 'POST',
                                url: "php/autorizaciones/esoa/esoa.php",
                                data: {
                                    function: 'p_obtener_servicio',
                                    contrato: datos.CONTRATO,
                                    documento: datos.DOCUMENTOCONTRATO,
                                    ubicacion: datos.UBICACIONCONTRATO
                                }
                            }).then(function (res) {
                                console.log("response servicios");
                                if ($scope.tipoaut == '1') {
                                    $scope.listServiciosedit = res.data;
                                    function letsWaitALittle() {
                                        $("#clasificacion_select option[value=" + $scope.clas + "]").attr("selected", true);
                                    }
                                    setTimeout(letsWaitALittle, 10);
                                }
                                if ($scope.tipoaut == '4') {
                                    $scope.listServicioseditIV = res.data;

                                    function letsWaitALittleiv() {
                                        $("#clasificacion_selectiv option[value=" + $scope.clas + "]").attr("selected", true);
                                    }
                                    setTimeout(letsWaitALittleiv, 10);
                                }



                                resolve(1);
                                if (datos.CREARCENSO == 'S') {
                                    $http({
                                        method: 'POST',
                                        url: "php/autorizaciones/esoa/esoa.php",
                                        data: {
                                            function: 'p_obtener_censo',
                                            v_pafiliado: datos.DOCUMENTO,
                                            v_pprestador: datos.NIT
                                        }
                                    }).then(function (response) {
                                        console.log("response datos censo", response.data);
                                        if ($scope.tipoaut == '1') {
                                            if (response.data.length == 0) {
                                                console.log("muestra las cosas del censo tabI");
                                                $scope.censos = [];
                                                $scope.mostrar_error_censo = true;
                                                $scope.cargardatoscenso(datos);
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
                                        }
                                        if ($scope.tipoaut == '4') {
                                            if (response.data.length == 0) {
                                                console.log("muestra las cosas del censo tabIV");
                                                $scope.censosiv = [];
                                                $scope.mostrar_error_censoiv = true;
                                                $scope.cargardatoscenso(datos);
                                            } else {
                                                $scope.mostrar_error_censoiv = false;
                                                $scope.censosiv = response.data;
                                                if ($scope.censosiv[0].Codigo != 0) {
                                                    $scope.body = false;
                                                    $scope.fallo = true;
                                                } else {
                                                    $scope.body = true;
                                                    $scope.fallo = false;
                                                }
                                            }
                                        }
                                        swal.close();
                                    })
                                } else {

                                    $http({
                                        method: 'POST',
                                        url: "php/autorizaciones/esoa/esoa.php",
                                        data: {
                                            function: 'p_obtener_censo',
                                            v_pafiliado: datos.DOCUMENTO,
                                            v_pprestador: datos.NIT
                                        }
                                    }).then(function (response) {
                                        console.log("response datos censo", response.data);
                                        console.log(response.data);
                                        if ($scope.tipoaut == '1') {
                                            $scope.mostrar_error_censo = false;
                                            $scope.censos = response.data;
                                            if ($scope.censos.length > 0) {
                                                $scope.body = false;
                                                $scope.fallo = true;
                                            } else {
                                                $scope.body = true;
                                                $scope.fallo = false;
                                            }

                                        }
                                        if ($scope.tipoaut == '4') {
                                            $scope.mostrar_error_censoiv = false;
                                            $scope.censosiv = response.data;
                                            if ($scope.censosiv.length > 0) {
                                                $scope.body = false;
                                                $scope.fallo = true;
                                            } else {
                                                $scope.body = true;
                                                $scope.fallo = false;
                                            }
                                        }

                                        swal.close();
                                    })
                                }

                                $http({
                                    method: 'POST',
                                    url: "php/autorizaciones/esoa/esoa.php",
                                    data: {
                                        function: 'obtenerDetalles',
                                        codigo: datos.NUMERO,
                                        ubicacion: datos.UBICACION

                                    }
                                }).then(function (respro) {
                                    console.log(respro.data);
                                    if (respro.data == null) {
                                        swal('Informacion!', 'Hubo un error en la consulta. Favor consulte nuevamente. si el error persiste, comuniquese con soporte', 'warning');

                                        if ($scope.tipoaut == '1') {
                                            $scope.listar_detalles = [];
                                        }
                                        if ($scope.tipoaut == '4') {
                                            $scope.listar_detallesiv = [];
                                        }
                                    } else if (respro.data.length > 0) {
                                        if ($scope.tipoaut == '1') {
                                            $scope.listar_detalles = respro.data;
                                        }
                                        if ($scope.tipoaut == '4') {
                                            $scope.listar_detallesiv = respro.data;
                                        }

                                    } else {
                                        if ($scope.tipoaut == '1') {
                                            $scope.listar_detalles = [];
                                        }
                                        if ($scope.tipoaut == '4') {
                                            $scope.listar_detallesiv = [];
                                        }
                                    }

                                })
                                // if (r.data.Codigo == '0') {
                                //     swal('Exito',r.data.Mensaje,'success');
                                //     resolve(r.data.Codigo);
                                // } else {
                                //     resolve(r.data.Codigo);
                                //     swal('Error',r.data.Mensaje,'error');
                                // }
                                //objeto_window_referencia = window.open("temp/consolidado_pres.xlsx", "Descarga_Consolidado", configuracion_ventana);
                            });
                        } else {
                            resolve(response.data.Codigo);
                            swal('Error', response.data.Mensaje, 'error');
                        }
                    });


                });

            }

            $scope.limpiarAvanzado = function () {
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





