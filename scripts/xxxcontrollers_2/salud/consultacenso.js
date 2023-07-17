'use strict';

angular.module('GenesisApp')

    .controller('consultacenso', ['$scope', '$http', '$location', '$filter', 'ngDialog', '$timeout', 'pqrHttp', 'afiliacionHttp', function ($scope, $http, $location, $filter, ngDialog, $timeout, pqrHttp, afiliacionHttp) {

        $(document).ready(function () {
            $('#modaldiagnostico').modal();
            $('#modaldetalle').modal();
            $('#modalnovedades').modal();
            $("#modaldocumentos").modal();
            $("#modalhistoricochat").modal();
            $('#modalfecha').modal();
            $('#modal12').modal();
            

            setTimeout(() => {
                $scope.F_Inicioa=  new Date(),
                     $scope.F_Fina=  new Date(),
                $scope.sysdate = new Date();

            }, 500);

        });

        //variables de control

        // variables TAB I
        //secciones de ng hide



        $scope.ocultar_fecha = false;//validar campo de editar fecha
        $scope.activetipotabIV = true;
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
        $scope.verAutorizaciones = true;
        $scope.ips = { codigo: '0', nombre: "SELECCIONAR" };

        //validar campo de editar fecha.
        
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


        $scope.validador_De_fecha = function () {
            if (sessionStorage.getItem('cedula') == '22474479' || sessionStorage.getItem('cedula') == '1047234385' || sessionStorage.getItem('cedula') == '1143154617' || sessionStorage.getItem('cedula') == '1140902160'
                || sessionStorage.getItem('cedula') == '6818695'
                || sessionStorage.getItem('cedula') == '44192129'
                || sessionStorage.getItem('cedula') == '4242474'
                || sessionStorage.getItem('cedula') == '12542773'
                || sessionStorage.getItem('cedula') == '22569109'
                || sessionStorage.getItem('cedula') == '72152730'
                || sessionStorage.getItem('cedula') == '14242474') {
                $scope.ocultar_fecha = true;
            } else {
                $scope.ocultar_fecha = false;
            }
        }


        // wizard

        $scope.invsolicitudtabI = true;
        $scope.invproductotabI = true;
        $scope.invfinalizartabI = true;
        $scope.invfinalizartabIV = true;

        // variables TAB II
        //secciones de ng hide
        $scope.inactiveseccion1tab2 = false;
        $scope.inactiveseccion2tab2 = true;
        $scope.productosagregadostabII = [];
        $scope.nofindproductstabII = false;
        // wizard
        $scope.invsolicitudtabII = true;
        $scope.invproductotabII = true;
        $scope.invfinalizartabII = true;


        $scope.novedades = null;
        $scope.datosAfiModalNov = null;
        $scope.tutelaParam = null;
        $scope.siniestroParam = null;
        $scope.maxDate = null;
        $scope.documentosAfiliado = null;
        $scope.v_encabezado = null;
        $scope.fechactual = null;

        //Se valida fecha actual

        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();

        $scope.fechactual = hoy;

        if (dd < 10) {
            dd = '0' + dd
        }



        if (mm < 10) {
            mm = '0' + mm
        }



        $scope.maxDate = yyyy + '-' + mm + '-' + dd;




        $scope.filterOptions = 'AFILIADO';
        $scope.autdocumento = null;
        $scope.autnumero = null;
        $scope.autubicacion = null;
        $scope.autnitips = null;




        $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
            }).then(function (response) {
                if (response.data.CODIGO != "0") {
                    if (tipo == '3') {

                        $scope.infoafiliadoautedit = null;

                        $scope.infoafiliadoautedit = response.data;

                        if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {

                            $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';

                            swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

                        } else {

                            // $scope.afirownumIV = 1;

                            // if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                            //   $scope.afirownumIV = $scope.afirownumIV + 1;

                            // }

                            // if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                            //   $scope.afirownumIV = $scope.afirownumIV + 1;

                            // }

                            $scope.afirownumIV = 1;

                            if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }
                            if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }

                            if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                                $scope.afirownumIV = $scope.afirownumIV + 1;

                            }



                            $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento, tipo);

                            $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;

                            $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;

                            $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;

                            $scope.datosAfiModalNov = $scope.infoafiliadoautedit;

                            $scope.inactiveseccion1tab4 = true;

                            $scope.inactiveseccion2tab4 = false;

                            $scope.productosagregadostabIV = [];

                        }

                    }
                    // $scope.$apply();

                } else {

                    swal('Importante', response.data.NOMBRE, 'info')

                }

            });

        }

        $scope.valservicio = false;
        $scope.valespecialidad = false;
        $scope.openmodals = function (tipo, opcion) {
            $scope.buscard1 = "";
            $scope.buscard2 = "";
            $scope.buscarpro = "";
            $scope.tipoaut = opcion;
            switch (tipo) {

                case 'modaldetalle':
                    $scope.v_detallev = null;
                    $scope.v_encabezadov = null;
                    $scope.dAuto = null;
                    $scope.sumPrint = 0;
                    $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
                    $scope.consultarAutorizacion(opcion.NUMERO, opcion.UBICACION, 'C');
                    $("#modaldetalle").modal("open");
                    break;
                case 'modaldetalleprograma':
                    $scope.v_detallev = null;
                    $scope.v_encabezadov = null;
                    $scope.verPrintDetalle = true;
                    $scope.buscarAfiliado('3', opcion.TIPO_DOC, opcion.DOCUMENTO);
                    $scope.dAuto = opcion;
                    $scope.detalleAutorizacionProg(opcion.NUMERO, opcion.UBICACION);
                    $("#modaldetalle").modal("open");
                    break;
                case 'modalnovedades':
                    $scope.buscarnovedades();
                    $("#modalnovedades").modal("open");
                    break;
                case 'modaldocumentos':
                    $scope.buscardocumentos();
                    $("#modaldocumentos").modal("open");
                    break;
                case 'modalhistoricochat':
                    $scope.tempcenso = opcion;
                    $http({
                        method: 'POST',
                        url: "php/censo/censo.php",
                        data: { function: 'obtenerChat', proceso: 1, numerocenso: opcion.CODIGOCENSO, ubicacion: opcion.UBICACION }
                    }).then(function (response) {
                        $scope.comentarios = response.data;
                    })
                    $("#modalhistoricochat").modal("open");
                    break;
                default:
            }
        }

        $scope.closemodals = function (tipo) {
            switch (tipo) {

                case 'modaldocumentos':
                    $("#modaldocumentos").modal("close");
                    break;



                case 'modaldetalle':
                    $("#modaldetalle").modal("close");
                    break;
                case 'modalnovedades':
                    $("#modalnovedades").modal("close");
                    break;

                case 'limpiartabIV':
                    $scope.viewdataAut = true;
                    $scope.viewdataAutprog = true;
                    $scope.switchtable = false;
                    $scope.check_option_2 = false;
                    $scope.check_option = false;
                    $scope.nameaut = 'Ordinarias';
                    $scope.listarAutorizaciones = [];
                    $scope.listarAutorizacionesprog = [];
                    $scope.numautprocesada = null;
                    $scope.numautprocesadaIV = null;
                    $scope.ubicacionPrint = null;
                    break;
                case 'modalhistoricochat':
                    $("#modalhistoricochat").modal("close");
                    break;

                default:
            }
        }


        $scope.capita = null;
        $scope.buscarnovedades = function () {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_novedades', documento: $scope.infoafiliadoautedit.Documento,
                    tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
                }
            }).then(function (response) {
                $scope.novedades = response.data;
            })
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_capita', documento: $scope.infoafiliadoautedit.Documento,
                    tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
                }
            }).then(function (response) {
                $scope.capita = response.data;
            })
        }
        $scope.buscardocumentos = function () {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: {
                    function: 'obtener_soportes', documento: $scope.infoafiliadoautedit.Documento,
                    tipodocumento: $scope.infoafiliadoautedit.TipoDocumento
                }
            }).then(function (response) {
                $scope.documentosAfiliado = response.data;
            })

        }

        $scope.viewDocument = function (ruta, ftp) {
            if (ftp == 1) {
                $http({
                    method: 'POST',
                    url: "php/juridica/tutelas/functutelas.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    window.open("temp/" + response.data);
                });
            }
            if (ftp == 2) {
                $http({
                    method: 'POST',
                    url: "php/getfileSFtp.php",
                    data: { function: 'descargaAdjunto', ruta: ruta }
                }).then(function (response) {
                    window.open("temp/" + response.data);
                });
            }
        }






        $scope.limpiar = function () {
            $scope.filterOptions = 'AFILIADO';
            $scope.verAutorizaciones = true;
            $scope.verAutorizacionesEdit = false;
            $scope.inactiveseccion4tab4 = false;
            $scope.check_option = false;
            $scope.autdocumento = null;
            $scope.autnumero = null;
            $scope.autubicacion = null;
            $scope.filtaut = null
            $scope.showsenso = -1;
            $scope.listarAutorizacionesTemp = [];
            $scope.listarAutorizaciones = [];
            // $scope.jsonautorizacion = {
            //   documento: '',
            //   numero: '',
            //   ubicacion: '',
            //   nit: '',
            //   nitavanzado: '',
            //   documentoavanzado: '',
            //   responsableavanzado: '',
            //   estadoavanzado: '',
            //   diagnosticoavanzado: '',
            //   servicioavanzado: '',
            //   filtro_ordenavanzado: 'N',
            //   fecha_ordeniniavanzado: null,
            //   fecha_ordenfinavanzadoparseada: null,
            //   fecha_ordeniniavanzadoparseada: null,
            //   fecha_ordenfinavanzado: null,
            //   filtro_confirmadoavanzado: 'N',
            //   fecha_confirmadoiniavanzado: null,
            //   fecha_confirmadoiniavanzadoparseada: null,
            //   fecha_confirmadofinavanzadoparseada: null
            // }
            // $scope.filterOptions = 'AFILIADO';
            // $scope.filterOptions = $scope.tempfilterOptions;
        }

        // Funciones TABI










        $scope.buscarAutorizacionesDetalle = function (producto, ubicacion) {
            $http({
                method: 'POST',
                url: "php/censo/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtenerDetalleAut', producto: producto, ubicacion: ubicacion }
            }).then(function (response) {
                if (response.data.length > 0) {
                    $scope.productosagregadostabIV = response.data;
                }
            })
        }

        $scope.detalleAutorizacionProg = function (num, ubic) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_detalle_programada', numero: num, ubicacion: ubic }
            }).then(function (response) {
                // if (response.data.length > 0) {        
                $scope.v_encabezadov = response.data.cabeza;
                $scope.v_detallev = response.data.detalle;

                $scope.v_detallev.forEach(element => {
                    $scope.v_detallev = element;
                });

                // }
            })
        }


        $scope.downloadFileAut = function (pdf) {
            pqrHttp.dowloadfile(pdf).then(function (response) {
                window.open("temp/" + response.data);
            });

        }


        $scope.viewdataAut = true;
        $scope.viewdataAutprog = true;
        $scope.verAutorizaciones = true;
        $scope.verAutorizacionesEdit = false;
        $scope.inactivebarraproedit = true;
        $scope.jsonautorizacion = {
            documento: '',
            numero: '',
            ubicacion: '',
            nit: '',
            nitavanzado: '',
            documentoavanzado: '',
            responsableavanzado: '',
            estadoavanzado: '',
            diagnosticoavanzado: '',
            servicioavanzado: '',
            filtro_ordenavanzado: 'N',
            fecha_ordeniniavanzado: null,
            fecha_ordenfinavanzadoparseada: null,
            fecha_ordeniniavanzadoparseada: null,
            fecha_ordenfinavanzado: null,
            filtro_confirmadoavanzado: 'N',
            fecha_confirmadoiniavanzado: null,
            fecha_confirmadoiniavanzadoparseada: null,
            fecha_confirmadofinavanzadoparseada: null
        }


        function formatDate(date) {
            var dd = ('0' + date.getDate()).slice(-2);
            var mm = ('0' + (date.getMonth() + 1)).slice(-2);
            var yyyy = date.getFullYear();
            var hh = date.getHours();
            var mi = date.getMinutes();
            return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
        }




        // console.log($scope.Rep_Registros);

        // $scope.fechainicio = "18/11/2020";
        // $scope.fechafinal = "18/11/2020";
        /////////////////////////////////////////////////////////////////// comienza jeffer ///////////////////////////////////////////////////////////////////////////////




        // ////////////////////////////////////////////// MODAL DE CAMBIAR FECHA ////////////////////////////////////////////////

        $scope.abrirModal = function (data) {
           
            $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
            $('#modalfecha').modal('open');
            if(data.CENF_FECHA_EGRESO == null){
                $scope.ocultaegreso = true;
                $scope.F_egreso = "";
                
            }else{
                $scope.ocultaegreso = false;
                var F_egreso = data.CENF_FECHA_EGRESO.split("/");
                $scope.F_egreso = new Date(F_egreso[2], Number(F_egreso[1]) - 1, F_egreso[0]);
                
            }
            $scope.detalleCenso.censo = data.CENN_NUMERO;
            $scope.detalleCenso.ubicacion = data.CENN_UBICACION;
            var F_ingreso = data.CENF_FECHA_INGRESO.split("/");
            $scope.F_ingreso = new Date(F_ingreso[2], Number(F_ingreso[1]) - 1, F_ingreso[0]);
         
            // data.CENF_FECHA_INGRESO = new Date(F_ingreso[2], Number(F_ingreso[1]) - 1, F_ingreso[0]);
            // $scope.F_egreso = data.CENF_FECHA_EGRESO.split("/");
            // data.CENF_FECHA_EGRESO = new Date(F_egreso[2], Number(F_egreso[1]) - 1, F_egreso[0]);
            // $scope.F_ingreso = data.CENF_FECHA_INGRESO;
            // $scope.F_egreso = data.CENF_FECHA_EGRESO;

          
            document.querySelector('.modal-overlay').addEventListener('click', () => { });
        }

        $scope.cerrarModal = function () {
            $('#modalfecha').modal('close');
        }


        $scope.editarfechas = function () {
            


            if ($scope.F_ingreso != undefined && $scope.F_egreso != undefined) {
                if ($scope.F_ingreso <= $scope.F_egreso) {
                    var xFecha_Inicio = $scope.F_ingreso;
                    var Fecha_Inicio = xFecha_Inicio.getUTCDate() + '/' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '/' + xFecha_Inicio.getFullYear();
                    var xFecha_Fin = $scope.F_egreso;
                    var Fecha_Fin = xFecha_Fin.getUTCDate() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getFullYear();

                    console.log($scope.detalleCenso.censo, $scope.detalleCenso.ubicacion, Fecha_Inicio, Fecha_Fin,);

                    swal({
                        title: 'Confirmar Proceso',
                        text: "Actualizó correctamente las fechas?",
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
                                url: "php/censo/censo.php",
                                data: {
                                    function: 'actualizarfechas',
                                    numerof: $scope.detalleCenso.censo,
                                    ubicacionf: $scope.detalleCenso.ubicacion,
                                    fechaif: Fecha_Inicio,
                                    fechaef: Fecha_Fin
                                }
                            }).then(function (response) {
                                if (response.data.codigo == '1') {
                                    swal({
                                        title: response.data.mensaje,
                                        timer: 3000,
                                        type: 'success'
                                    }).catch(swal.noop);
                                    $scope.buscarcensocodigo();
                                    $scope.buscarcenso();
                                    $scope.cerrarModal();
                                    // $scope.verAutorizaciones = false;


                                } else {
                                    swal('Advertencia', 'Por política de calidad del dato, únicamente se permite la actualización una sola vez', 'warning')




                                }
                            })
                        }
                    }).catch(swal.noop);


                } else {
                    Materialize.toast('¡La fecha de ingreso debe ser menor a la fecha de egreso!', 2500); $('.toast').addClass('default-background-dark');
                }

            }

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

        $scope.actualiza_prestador = function (d) {
            $scope.datos_censo = d;
            $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalActualizaIps.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalIpsctrl',
            scope: $scope
          });
     
        }

        $scope.FormatSoloNumero = function (NID) {
            // const input = document.getElementById('' + NID + '');
             var valor = NID;
             //valor = valor.replace(/[^0-9]/g, '');
             valor = valor.replace(/[^A-Za-z0-9]/g, '');
             
             $scope.codigocenso = valor;
        }
        $scope.FormatSoloNumero2 = function (NID) {
            // const input = document.getElementById('' + NID + '');
             var valor = NID;
             //valor = valor.replace(/[^0-9]/g, '');
             valor = valor.replace(/[^A-Za-z0-9]/g, '');
             
             $scope.documento = valor;
        }

        $scope.descargar_censo = function () {
            if ($scope.F_Inicio != undefined && $scope.F_Fin != undefined) {
                if ($scope.F_Inicio <= $scope.F_Fin) {
                    var xFecha_Inicio = $scope.F_Inicio;
                    var Fecha_Inicio = xFecha_Inicio.getUTCDate() + '/' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '/' + xFecha_Inicio.getFullYear();
                    var xFecha_Fin = $scope.F_Fin;
                    var Fecha_Fin = xFecha_Fin.getUTCDate() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getFullYear();
                    // $http({
                    //     method: 'POST',
                    //     url: "php/censo/censo.php",
                    //     data: { function: 'descargarcenso', fechainicio: Fecha_Inicio, fechafinal: Fecha_Fin }
                    // }).then(function (response) {
                    //     if (response.data[0].Codigo == '0') {

                    //         $scope.verAutorizaciones = false;

                    //     } else {
                    //         $scope.verAutorizaciones = true;
                    //         $scope.historico_censos = response.data;
                    //         $scope.initPaginacion($scope.historico_censos);

                    //     }
                    // })
                    window.open('views/salud/formato/formato_consultarcenso_excel.php?&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin);
                } else {
                    Materialize.toast('¡La fecha de inicio debe ser menor a la fecha final!', 3000); $('.toast').addClass('default-background-dark');
                }
            }

        }


        $scope.buscarcensocodigo = function () {
            
            var Encontrar_Vacios = false;
           // if ($scope.codigocenso == null || $scope.codigocenso == '') { Encontrar_Vacios = true; }
           /*// if ($scope.censo_ubicacion == null || $scope.censo_ubicacion == '') { Encontrar_Vacios = true; }
            if (Encontrar_Vacios == true) {
                swal('Advertencia', '¡Por favor digitar el numero del censo y ubicación!', 'warning')
                return;
            }*/

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
                data: { function: 'buscarcodigocenso', numero: $scope.codigocenso, ubicacion:'' }
            }).then(function (response) {
                if (response.data.length > 0) {
                    swal.close()
                    if (response.data.length == 1) {
                        $scope.numerocensob = response.data[0].CENN_NUMERO;
                        $scope.ubicacioncensob = response.data[0].CENN_UBICACION;
                        $scope.F_ingreso = response.data[0].CENF_FECHA_INGRESO;
                        $scope.F_egreso = response.data[0].CENF_FECHA_EGRESO;
                        $scope.verAutorizaciones = true;
                        $scope.vercodigocenso = false;
                        $scope.historico_censos = response.data;
                        $scope.initPaginacion($scope.historico_censos);
                        $scope.verAutorizaciones = false;    
                        $scope.infoafiliadoautedit = response.data.info;
                        $scope.listarAutorizaciones = response.data.aut;
                    } else {
                        $('#modal12').modal('open');
                        $scope.informaciondata = response.data;
                    }
                } else {
                    swal.close();
                    swal('Advertencia', '¡Por favor validar el numero del censo o ubicación!', 'warning')
                    $scope.vercodigocenso = false;  
                }
            })


        }


        $scope.SeleccionarData = function (qinfo) {
            $('#modal12').modal('close');
            $http({
                method: 'POST',
                url: "php/censo/censo.php",
                data: { function: 'buscarcodigocensoubi', numero: qinfo.CENN_NUMERO, ubicacion:qinfo.CENN_UBICACION }
            }).then(function (response) {
                if (response.data.length > 0) {
                    swal.close();
                    $scope.verAutorizaciones = true;
                    $scope.vercodigocenso = false;
                    $scope.historico_censos = response.data;
                    $scope.historico_censos2 = response.data;
                    $scope.initPaginacion($scope.historico_censos);
                    $scope.verAutorizaciones = false;
                    $scope.infoafiliadoautedit = response.data.info;
                    $scope.listarAutorizaciones = response.data.aut;
                    //   $scope.initPaginacion($scope.listarAutorizaciones);


                } else {
                    $scope.verAutorizaciones = true;
                    swal.close();
                    swal('Genesis', 'Datos del Afiliado no encontrado, por favor validar nuevamente!', 'warning');



                    $scope.verAutorizaciones = true;


                    $scope.infoafiliadoautedit = [];
                    // swal('Importante', response.data.info.NOMBRE, 'info');
                    $scope.listarAutorizaciones = [];


                }


            })












        }

        // $scope.F_ingreso = "sadas";

        $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
        $scope.detail = function (censo, ubicacion) {

            $scope.detalleCenso.censo = censo;
            $scope.detalleCenso.ubicacion = ubicacion;
            ngDialog.open({
                template: 'views/salud/modal/censodetail.html', className: 'ngdialog-theme-plain',
                controller: 'censodetalle',
                scope: $scope
            });//.closePromise.then(function (data) {});
        }

        $scope.historial_glosa = function (censo, ubicacion) {

            $scope.detalleCenso.censo = censo;
            $scope.detalleCenso.ubicacion = ubicacion;
            ngDialog.open({
                template: 'views/salud/modal/modalHglosa.html',
                className: 'ngdialog-theme-plain',
                controller: 'modalHglosactrl',
                scope: $scope
            });
        }



        // $scope.detalleCenso = { 'censo': null, 'ubicacion': null };
        $scope.detail_censo = function (censo, ubicacion) {
            $scope.detalleCenso.censo = censo;
            $scope.detalleCenso.ubicacion = ubicacion;
            ngDialog.open({
                template: 'views/salud/modal/censodetail.html', className: 'ngdialog-theme-plain',
                controller: 'censodetalle',
                scope: $scope
            });//.closePromise.then(function (data) {});

        }

        $scope.tblResultadoAfiliados = true;
        $scope.departamento = "";
        $scope.municipio = "";
        $http({
            method: 'PSOT',
            url: "php/consultaafiliados/funcnovedadacb.php",
            data: { function: 'cargaDepartamentos' }
        }).then(function (response) {
            $scope.Departamentos = response.data;
        });
        $scope.filterMunicipio = function () {
            swal({
                title: 'Buscando afiliados...',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            $http({
                method: 'PSOT',
                url: "php/consultaafiliados/funcnovedadacb.php",
                data: { function: 'cargaMunicipios', depa: $scope.departamento }
            }).then(function (response) {
                $scope.municipio = "";
                $scope.Municipios = response.data;
                swal.close();
            });
        }


        // $scope.ubicaciona ="8001";
        $scope.nita = "";
        $scope.responsablea = "";
        $scope.estadoa = "";
        $scope.regimena = "";
        $scope.consulta_avanzada = function () {

            // var Encontrar_Vacios = false;
            // if ($scope.ubicaciona == null  && $scope.nita == null  && $scope.responsablea == null ) { Encontrar_Vacios = true; }
            // if ($scope.nita == null || $scope.nita == '' ||$scope.nita == undefined) { Encontrar_Vacios = true; }
            // if ($scope.responsablea == null || $scope.responsablea == '' ||$scope.responsablea == undefined) { Encontrar_Vacios = true; }       
            // if (Encontrar_Vacios == true) {
            //     swal('Advertencia', '¡Por favor ingresar alguno de los 3 campos', 'warning')
            //     return;
            // }

            if ($scope.F_Inicioa != undefined && $scope.F_Fina != undefined) {
                if ($scope.F_Inicioa <= $scope.F_Fina) {
                    var xFecha_Inicio = $scope.F_Inicioa;
                    var Fecha_Inicio = xFecha_Inicio.getDate() + '/' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '/' + xFecha_Inicio.getFullYear();
                    var xFecha_Fin = $scope.F_Fina;
                    var Fecha_Fin = xFecha_Fin.getDate() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getFullYear();


                    window.open('views/salud/formato/formato_consulavanzada_excel.php?&ubicacion=' + $scope.municipio + '&nit=' + $scope.nita + '&responsable=' + $scope.responsablea
                        + '&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin + '&estado=' + $scope.estadoa + '&regimen=' + $scope.regimena);


                    // console.log($scope.municipio, $scope.nita, $scope.responsablea, Fecha_Inicio, Fecha_Fin, $scope.estadoa, $scope.regimena)

                } else {
                    Materialize.toast('¡La fecha de inicio debe ser menor a la fecha final!', 3000); $('.toast').addClass('default-background-dark');
                }
            }


        }
         console.log($scope.consulta_avanzada);


        $scope.tempjsonaut = {};

        $scope.ubicacion_censo = '';
        $scope.buscarcenso = function () {
            var Encontrar_Vacios = false;
            if ($scope.documento == null || $scope.documento == '') { Encontrar_Vacios = true; }
            if ($scope.tipodocumento == null || $scope.tipodocumento == '') { Encontrar_Vacios = true; }
            if (Encontrar_Vacios == true) {
                swal('Advertencia', '¡Por favor ingresar tipo y documento del afiliado!', 'warning')
                return;
            }
            $scope.historico_censos = [];
            $scope.initPaginacion($scope.historico_censos);
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
                data: { function: 'buscarcenso', tipodocumento: $scope.tipodocumento, documento: $scope.documento }
            }).then(function (response) {
                if (response.data.length > 0) {
                    swal.close();

                    $scope.verAutorizaciones = true;
                    $scope.vercodigocenso = false;
                    $scope.historico_censos = response.data;
                    $scope.historico_censos2 = response.data;
                    


                    $scope.initPaginacion($scope.historico_censos);

                    $scope.verAutorizaciones = false;
                    $scope.infoafiliadoautedit = response.data.info;
                    $scope.listarAutorizaciones = response.data.aut;
                    //   $scope.initPaginacion($scope.listarAutorizaciones);

                    if (response.data.tipo != 'IPS') {
                        $scope.afirownumIV = 1;

                        if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }

                        if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }

                        if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }
                        if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }

                        if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                            $scope.afirownumIV = $scope.afirownumIV + 1;

                        }
                        $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
                    }
                    // $scope.verAutorizaciones = true;
                    // $scope.infoafiliadoautedit = [];
                    // swal('Importante', response.data.info.NOMBRE, 'info');
                    // $scope.listarAutorizaciones = [];

                } else {
                    $scope.verAutorizaciones = true;
                    swal.close();
                    swal('Genesis', 'Datos del Afiliado no encontrado, por favor validar nuevamente!', 'warning');



                    $scope.verAutorizaciones = true;


                    $scope.infoafiliadoautedit = [];
                    // swal('Importante', response.data.info.NOMBRE, 'info');
                    $scope.listarAutorizaciones = [];

                    // $scope.infoafiliadoautedit = response.data.info;
                    // $scope.listarAutorizaciones = response.data.aut;

                }


            })
        }

        $scope.buscarAutorizaciones = function () {
            $scope.nameaut = 'Censo';
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
            });
            $scope.tempfilterOptions = $scope.filterOptions;
            if ($scope.filterOptions == 'AFILIADO') {
                // Avanzado
                if ($scope.documento == '' || $scope.documento == 0 || $scope.documento == null) {
                    $scope.validatefiltros = true;
                } else {
                    $scope.validatefiltros = false;
                }
            }
            if ($scope.filterOptions == 'AVANZADO') {
                // Avanzado
                if ($scope.numero == '' || $scope.numero == 0 || $scope.numero == null) {
                    $scope.validatefiltros = true;
                }
                if ($scope.ubicacion == '' || $scope.ubicacion == 0 || $scope.ubicacion == '') {
                    $scope.validatefiltros = true;
                }

                if ($scope.numero && $scope.ubicacion) {
                    $scope.validatefiltros = false;
                }
            }



            if ($scope.filterOptions == 'IPS') {
                // Avanzado
                if ($scope.nit == '' || $scope.nit == 0 || $scope.nit == null) {
                    $scope.validatefiltros = true;
                } else {
                    $scope.validatefiltros = false;
                }
            }

            if ($scope.filterOptions == 'AVANZADO') {

                $scope.tempjsonaut = Object.assign({}, $scope.jsonautorizacion);
                $scope.sumavanzado = '';
                if ($scope.tempjsonaut.nitavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                } else {
                    $scope.tempjsonaut.nitavanzado = 0;
                }
                if ($scope.tempjsonaut.documentoavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                } else {
                    $scope.tempjsonaut.documentoavanzado = 0;
                }
                if ($scope.tempjsonaut.responsableavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                } else {
                    $scope.tempjsonaut.responsableavanzado = 0;
                }
                if ($scope.tempjsonaut.estadoavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                } else {
                    $scope.tempjsonaut.estadoavanzado = 0;
                }


                if ($scope.tempjsonaut.servicioavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                } else {
                    $scope.tempjsonaut.servicioavanzado = 0;
                }

                if ($scope.tempjsonaut.fecha_ordeniniavanzado && $scope.tempjsonaut.fecha_ordenfinavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                    $scope.tempjsonaut.filtro_ordenavanzado = 'S';
                    $scope.tempjsonaut.fecha_ordeniniavanzadoparseada = formatDate($scope.tempjsonaut.fecha_ordeniniavanzado);
                    $scope.tempjsonaut.fecha_ordenfinavanzadoparseada = formatDate($scope.tempjsonaut.fecha_ordenfinavanzado);

                } else {
                    $scope.tempjsonaut.filtro_ordenavanzado = 'N';
                }

                if ($scope.tempjsonaut.fecha_confirmadoiniavanzado && $scope.tempjsonaut.fecha_confirmadofinavanzado) {
                    $scope.sumavanzado = $scope.sumavanzado + 1;
                    $scope.tempjsonaut.filtro_confirmadoavanzado = 'S';
                    $scope.tempjsonaut.fecha_confirmadoiniavanzadoparseada = formatDate($scope.tempjsonaut.fecha_confirmadoiniavanzado);
                    $scope.tempjsonaut.fecha_confirmadofinavanzadoparseada = formatDate($scope.tempjsonaut.fecha_confirmadofinavanzado);
                } else {
                    $scope.tempjsonaut.filtro_confirmadoavanzado = 'N';
                }


                if ($scope.sumavanzado >= 3) {
                    $scope.validatefiltros = false;
                }


            }


            if ($scope.validatefiltros == false) {


                if ($scope.filterOptions == 'AVANZADO') {
                    // $scope.tempjsonaut = $scope.jsonautorizacion;
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: { function: 'p_consulta_autorizaciones_avanzado', autorizacion: JSON.stringify($scope.tempjsonaut) }
                    }).then(function (response) {
                        if (response.data.info.CODIGO == '0') {
                            $scope.verAutorizaciones = true;
                            $scope.infoafiliadoautedit = [];
                            // $scope.jsonautorizacion = {
                            //   documento: '',
                            //   numero: '',
                            //   ubicacion: '',
                            //   nit: '',
                            //   nitavanzado: '',
                            //   documentoavanzado: '',
                            //   responsableavanzado: '',
                            //   estadoavanzado: '',
                            //   diagnosticoavanzado: '',
                            //   servicioavanzado: '',
                            //   filtro_ordenavanzado: 'N',
                            //   fecha_ordeniniavanzado: null,
                            //   fecha_ordenfinavanzadoparseada: null,
                            //   fecha_ordeniniavanzadoparseada: null,
                            //   fecha_ordenfinavanzado: null,
                            //   filtro_confirmadoavanzado: 'N',
                            //   fecha_confirmadoiniavanzado: null,
                            //   fecha_confirmadoiniavanzadoparseada: null,
                            //   fecha_confirmadofinavanzadoparseada: null
                            // }

                            $scope.validatefiltros = true;
                            swal('Importante', response.data.info.NOMBRE, 'info');
                            $scope.listarAutorizaciones = [];

                        } else {


                            $scope.verAutorizaciones = false;
                            swal.close();

                            $scope.infoafiliadoautedit = response.data.info;
                            $scope.listarAutorizaciones = response.data.aut;
                            $scope.initPaginacion($scope.listarAutorizaciones);
                            if (response.data.tipo == 'IPS') {
                                $scope.filterOptions = 'IPS';
                            }

                            if (response.data.tipo == 'RESPONSABLE') {
                                $scope.filterOptions = 'RESPONSABLE';
                            }

                            if (response.data.tipo == 'AFILIADO') {
                                $scope.filterOptions = 'AFILIADO';
                                $scope.afirownumIV = 1;

                                if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }

                                if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }

                                if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }
                                if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }

                                if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }
                                $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
                            }
                            // $scope.jsonautorizacion = {
                            //   documento: '',
                            //   numero: '',
                            //   ubicacion: '',
                            //   nit: '',
                            //   nitavanzado: '',
                            //   documentoavanzado: '',
                            //   responsableavanzado: '',
                            //   estadoavanzado: '',
                            //   diagnosticoavanzado: '',
                            //   servicioavanzado: '',
                            //   filtro_ordenavanzado: 'N',
                            //   fecha_ordeniniavanzado: null,
                            //   fecha_ordenfinavanzadoparseada: null,
                            //   fecha_ordeniniavanzadoparseada: null,
                            //   fecha_ordenfinavanzado: null,
                            //   filtro_confirmadoavanzado: 'N',
                            //   fecha_confirmadoiniavanzado: null,
                            //   fecha_confirmadoiniavanzadoparseada: null,
                            //   fecha_confirmadofinavanzadoparseada: null
                            // }

                            $scope.validatefiltros = true;

                        }
                    })
                } else {
                    var tempdocumento = 0;
                    var tempnumero = 0;
                    var tempubicacion = 0;
                    if ($scope.filterOptions == 'AFILIADO') {
                        tempdocumento = $scope.documento;
                        tempnumero = 0;
                        tempubicacion = 0;
                    }
                    if ($scope.filterOptions == 'AUTORIZACION') {
                        tempdocumento = 0;
                        tempnumero = $scope.numero;
                        tempubicacion = $scope.ubicacion;
                    }
                    $http({
                        method: 'POST',
                        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                        data: { function: 'p_consulta_autorizaciones', documento: tempdocumento, numero: tempnumero, ubicacion: tempubicacion, ips: $scope.nit }
                    }).then(function (response) {
                        if (response.data.info.CODIGO == '0') {
                            $scope.verAutorizaciones = true;
                            $scope.infoafiliadoautedit = [];
                            swal('Importante', response.data.info.NOMBRE, 'info');
                            $scope.listarAutorizaciones = [];

                        } else {


                            $scope.verAutorizaciones = false;
                            swal.close();

                            $scope.infoafiliadoautedit = response.data.info;
                            $scope.listarAutorizaciones = response.data.aut;
                            $scope.initPaginacion($scope.listarAutorizaciones);

                            if (response.data.tipo != 'IPS') {
                                $scope.afirownumIV = 1;

                                if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }

                                if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }

                                if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }
                                if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }

                                if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                                    $scope.afirownumIV = $scope.afirownumIV + 1;

                                }
                                $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
                            }


                            // $scope.jsonautorizacion = {
                            //   documento: '',
                            //   numero: '',
                            //   ubicacion: '',
                            //   nit: '',
                            //   nitavanzado: '',
                            //   documentoavanzado: '',
                            //   responsableavanzado: '',
                            //   estadoavanzado: '',
                            //   diagnosticoavanzado: '',
                            //   servicioavanzado: '',
                            //   filtro_ordenavanzado: 'N',
                            //   fecha_ordeniniavanzado: null,
                            //   fecha_ordenfinavanzadoparseada: null,
                            //   fecha_ordeniniavanzadoparseada: null,
                            //   fecha_ordenfinavanzado: null,
                            //   filtro_confirmadoavanzado: 'N',
                            //   fecha_confirmadoiniavanzado: null,
                            //   fecha_confirmadoiniavanzadoparseada: null,
                            //   fecha_confirmadofinavanzadoparseada: null
                            // }

                            $scope.validatefiltros = true;

                        }
                    })
                }


            } else {
                if ($scope.filterOptions == 'AFILIADO') {
                    $scope.textvalidate = "Datos del AFILIADO no pueden estar vacios!"
                }
                if ($scope.filterOptions == 'AUTORIZACION') {
                    $scope.textvalidate = "Datos de la AUTORIZACION no pueden estar vacios!"
                }

                if ($scope.filterOptions == 'IPS') {
                    $scope.textvalidate = "Datos de la IPS no pueden estar vacios!"
                }

                if ($scope.filterOptions == 'AVANZADO') {
                    if ($scope.sumavanzado < 3) {
                        $scope.textvalidate = "Datos de la busqueda AVANZADA no pueden estar vacios!"
                    }

                }


                swal('Importante', $scope.textvalidate, 'info');

            }
        }

       $scope.ValFecha = function (SCOPE) {
            if ($scope[SCOPE] == undefined) {
                $scope[SCOPE] = $scope.sysdate;
            }
            if ($scope[SCOPE] > $scope.sysdate) {
                $scope[SCOPE] = $scope.sysdate;
            }
        }     

        $scope.initPaginacion = function (info) {
            $scope.listarAutorizacionesTemp = info;
            $scope.currentPage = 0;
            $scope.pageSize = 10;
            $scope.valmaxpag = 10;
            $scope.pages = [];
            $scope.configPages();
        }
        $scope.configPages = function () {
            $scope.pages.length = 0;
            var ini = $scope.currentPage - 4;
            var fin = $scope.currentPage + 5;
            if (ini < 1) {
                ini = 1;
                if (Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) > $scope.valmaxpag)
                    fin = 10;
                else
                    fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
            } else {
                if (ini >= Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                    ini = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag;
                    fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
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
        $scope.setPage = function (index) {
            $scope.currentPage = index - 1;
            if ($scope.pages.length % 2 == 0) {
                var resul = $scope.pages.length / 2;
            } else {
                var resul = ($scope.pages.length + 1) / 2;
            }
            var i = index - resul;
            if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
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
        $scope.paso = function (tipo) {
            if (tipo == 'next') {
                var i = $scope.pages[0].no + 1;
                if ($scope.pages.length > 9) {
                    var fin = $scope.pages[9].no + 1;
                } else {
                    var fin = $scope.pages.length;
                }

                $scope.currentPage = $scope.currentPage + 1;
                if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
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

        $scope.filter = function (val) {
            $scope.listarAutorizacionesTemp = $filter('filter')($scope.historico_censos, val);
            if ($scope.listarAutorizacionesTemp.length > 0) {
                $scope.setPage(1);
            }
            $scope.configPages();
        }



        $scope.calcularEdad = function (date) {
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

        $scope.v_encabezado = null;
        $scope.v_detalle = null;
        $scope.v_encabezadov = null;
        $scope.v_detallev = null;
        $scope.showcenso = -1;
        $scope.censos = null;
        $scope.tempaut = null;

        $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
            swal({ title: 'Buscando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
            }).then(function (response) {
                if (accion == 'C') {
                    $scope.v_encabezadov = response.data.cabeza;
                    $scope.v_detallev = response.data.detalle;

                    if ($scope.v_encabezadov.ESTADO == 'A') {
                        $scope.verPrintDetalle = true;
                    } else {
                        $scope.verAutorizaciones = false;
                        $scope.numautprocesada = $scope.v_encabezadov.NUM_OASIS;
                        $scope.ubicacionPrint = $scope.v_encabezadov.UBI_OASIS;
                        if ($scope.v_encabezadov.IMPRESION == 'false') {
                            $scope.verPrintDetalle = true;
                        }
                        if ($scope.v_encabezadov.IMPRESION == 'true') {
                            $scope.verPrintDetalle = false;
                        }
                    }
                }
                swal.close();
            })
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
                    $scope.autdocumento = $scope.id;
                    $scope.buscarAutorizaciones($scope.id, '', '');

                }
            });
        }



        $scope.obtenercenso = function (aut, index) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
                data: { function: 'p_obtener_censo', documento: aut.DOCUMENTO, prestador: aut.NIT }
            }).then(function (response) {
                if (response.data.Codigo == '0') {
                    swal('Importante', 'No hay Censos Hospitalarios!', 'info');
                } else {
                    $scope.showcenso = index;
                    $scope.tempaut = aut;
                    $scope.censos = response.data;
                }

            });

        }



        $scope.backAut = function () {
            $scope.showcenso = -1;
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
        $scope.getTotal = function (aut) {
            $scope.autjulio = $scope.listarAutorizacionesTemp.find(x => x.NUMERO === aut.NUMERO);
            var tempdetalle = $scope.autjulio.DETALLES;
            var sumtemp = 0;
            for (var i = 0; i < tempdetalle.length; i++) {

                if (tempdetalle[i].total != null) {
                    sumtemp += parseFloat(tempdetalle[i].total);
                }

            }

            return $scope.formatPeso(sumtemp);
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