'use strict';
angular.module('GenesisApp').controller('auditoriacuentasController', ['$scope', '$http', '$timeout', '$filter', 'ngDialog', 'notify', function ($scope, $http, $timeout, $filter, ngDialog, notify) {
    // Plantilla funcional
    console.clear();
    $(document).ready(function () {
        $('.modal').modal();
        if (document.querySelector("#pantalla").offsetWidth < 1200) {
            document.querySelector("#pantalla").style.zoom = 0.8;
        }
        // console.log("width:" + document.querySelector("#pantalla").offsetWidth);
        // console.log("height:" +document.querySelector("#pantalla").offsetHeight);
        $scope.Pantalla = {
            Altura: 0,
            Anchura: document.querySelector("#pantalla").offsetWidth
        }
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';

        $('input.currency').currencyInput();
        $scope.SysDay = new Date();
        $scope.Vistas_Informativa = 0;
        $scope.Vista = {
            Activa: 1
        };
        $scope.Vista1 = {
            Nit_Prestador: '',
            Num_Sol: '',
            // Nit_Prestador: '802009806',
            // Num_Sol: '3609',
            // Nit_Prestador: '900632220',
            // Num_Sol: '64811',
            // Nit_Prestador: '900373544',
            // Num_Sol: '478787',
            Tipo: 'F', //R,
            Ubicacion: '', //CAMPO PARA REALIZAR BUSQUEDA RAPIDA - FINANCIERA ERROR
            Documento: '', //CAMPO PARA REALIZAR BUSQUEDA RAPIDA - FINANCIERA ERROR
            Numero: '' //CAMPO PARA REALIZAR BUSQUEDA RAPIDA - FINANCIERA ERROR
        };
        // $scope.Array_ConceptoFacturas descomentar linea 71!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //TABLA
        $scope.Filtrar_Sol = 10;
        //
        $scope.Vista2 = {
            Mostrar_Sol: 10,
            Nit_Prestador: '1'
        };

        $scope.Vista2_listDatosTemp = [];
        $scope.Vista2_Datos_Factura = [];
        //
        $scope.List_Select = {
            TipoFacturas: {
                Listado: [],
                Filtro: [],
                SAVE: null,
                Seleccion: 9999
            },
            Productos_Detalle: {
                Listado: [],
                Filtro: [],
                SAVE: null,
                Seleccion: 9999
            },
            Productos_Glosa: {
                Listado: [],
                Filtro: [],
                SAVE: null,
                Seleccion: 9999
            },
            TipoGlosas: {
                Listado: [],
                Filtro: [],
                SAVE: null,
                Seleccion: 9999
            }
        }

        $scope.AbrirFormularioOnbase = async function () {
          const queryString = encodeURIComponent(`datasource=ONBASEPRD&KT114_0_0_0=${$scope.HojaGest.RECIBO}&KT115_0_0_0=${$scope.HojaGest.FACTURA}&KT116_0_0_0=${$scope.HojaGest.NIT}&clienttype=html&cqid=101`)
          notify.show('loading')
          const { data } = await axios({
            url: `php/onbase/checksum.php?url=${queryString}`
          })    
          notify.close()
          const checkSum = data.data
          console.log(`https://onbase1.cajacopieps.com/AppNet/docpop/docpop.aspx?datasource=ONBASEPRD&KT114_0_0_0=${$scope.HojaGest.RECIBO}&KT115_0_0_0=${$scope.HojaGest.FACTURA}&KT116_0_0_0=${$scope.HojaGest.NIT}&clienttype=html&cqid=101&chksum=${checkSum}`)
          window.open(`https://onbase1.cajacopieps.com/AppNet/docpop/docpop.aspx?datasource=ONBASEPRD&KT114_0_0_0=${$scope.HojaGest.RECIBO}&KT115_0_0_0=${$scope.HojaGest.FACTURA}&KT116_0_0_0=${$scope.HojaGest.NIT}&clienttype=html&cqid=101&chksum=${checkSum}`)
        }

        $scope.validarSoporteOnbase = async () => {
          $scope.onbaseExiste = false
          const { data } = await axios({
            url: `php/onbase/soap.php?factura=${$scope.HojaGest.FACTURA}&nit=${$scope.HojaGest.NIT}&recibo=${$scope.HojaGest.RECIBO}`
          })

          if (data.data) {
            $scope.onbaseExiste = true
          } else if (data.error) {
            $scope.onbaseExiste = false
          }
          $scope.$apply();
        }

        //
        $scope.Listar_Ambitos();
        $scope.List_TipoFacturas();
        $scope.Listar_TipoGlosas();
        $scope.Limpiar_Var_Busqueda();
        // $scope.List_MotivoRecobros();
        $scope.List_ConceptoFacturas(); //-------------descomentar

        console.log(sessionStorage.getItem('rolcod'));
        $scope.Rol_Cargo = sessionStorage.getItem('rolcod');

        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Obt_Cedula'
            }
        }).then(function (response) {
            $scope.Rol_Cedula = response.data;
            $http({
                method: 'POST',
                url: "php/cuentasmedicas/auditoriacuentas.php",
                data: {
                    function: 'Obt_Control',
                    Cedula: response.data
                }
            }).then(function (response2) {
                // console.log("REVERSAR Y ANULAR: " + response2.data.ACCION_R_X);
                // console.log("PROCESAR: " + response2.data.PROCESAR);
                if (response2.data.ERROR == undefined) {
                    $scope.Rol_AccionRA = response2.data.ACCION_R_X;
                    $scope.Rol_Procesar = response2.data.PROCESAR;
                } else {
                    $scope.Rol_AccionRA = 0;
                    $scope.Rol_Procesar = 0;
                }
            });
            //////////////////////
        });
        /////////////////////////////////////////////
        $scope.Vista3 = {
            Filtrar_Sol: '',
            NumeroDoc: '',
            NombreUsu: '',
            Accion: '',
            Procesa: '',
            Estado: '',
            Visualizacion: '',
        };

        $scope.Busqueda = {
            Listado: null,
            Filtro: null
        }
        /////////////////////////////////////////////
    });
    (function ($) {
        $.fn.currencyInput = function () {
            this.each(function () {
                var wrapper = $("<div class='currency-input' />");
                $(this).wrap(wrapper);
                $(this).before("<span class='currency-symbol'>$</span>");
            });
        };
    })(jQuery);

    $scope.responsable = sessionStorage.getItem('cedula');
    $scope.Listar_Ambitos = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'List_Ambitos'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.Array_Ambito = response.data;
            }
        })
    }
    $scope.Set_Tipo_Factura = function () {
        $scope.List_Select.TipoFacturas.Listado = [];
        $scope.HojaGest.TIPO_FACTURA = "";
        $scope.HojaGest.TIPO_FACTURA_COD = "";
        $scope.List_Select.TipoFacturas.SAVE = "";
        $scope.Array_TipoFacturas.forEach(e => {
            if ($scope.HojaGest.AMBITO == e.AMBITO) {
                $scope.List_Select.TipoFacturas.Listado.push(e);
            }
        });
        // console.log($scope.List_Select.TipoFacturas.Listado); $scope.Array_TipoFacturas
    }
    ////////////////TIPOS DE FACTURAS////////////////
    $scope.List_TipoFacturas = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'List_TipoFacturas'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.Array_TipoFacturas = response.data;
                // $scope.List_Select.TipoFacturas.Listado = response.data;
            }
        })
    }

    ////////////////MOTIVOS DE RECOBRO////////////////
    $scope.List_MotivoRecobros = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'List_MotivoRecobro'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.Array_MotivoRecobro = response.data;
            }
        })
    }
    ////////////////CONCEPTO DE RECOBRO//////////////// ROL 15
    // $scope.List_ConceptoRecobros = function () {
    //     $http({
    //         method: 'POST',
    //         url: "php/cuentasmedicas/auditoriacuentas.php",
    //         data: {
    //             function: 'List_ConceptoRecobros'
    //         }
    //     }).then(function (response) {
    //         if (response.data) {
    //             $scope.Array_ConceptoRecobro = response.data;
    //         }
    //     })
    // }

    $scope.List_ConceptoFacturas = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'List_ConceptoFacturas'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.Array_ConceptoFacturas = response.data;
                //console.table(response.data)
            }
        })
    }
    ////////////////TIPOS DE FACTURAS////////////////

    $scope.Limpiar_Var_Busqueda = function () {
        $scope.Busqueda = {
            Diagnostico: {
                Filtro: null,
                Listado: null,
                SAVE: null
            },
            TipoFactura: {
                Filtro: null,
                Listado: null,
                SAVE: null
            },
            ProductosDetalle: {
                Filtro: null,
                Listado: null,
                SAVE: null
            },
            ProductosGlosa: {
                Filtro: null,
                Listado: null,
                SAVE: null
            },
            TiposGlosa: {
                Filtro: null,
                Listado: null,
                SAVE: null
            }
        }
    }

    $scope.KeyFind_Vista1_Buscar = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.Vista1_Buscar();
    }

    $scope.Vista1_Buscar = function (Accion) {
        document.querySelector('#Hoja2_Principal').classList.add('Ani_Down');
        $timeout(
            function () {
                document.querySelector('#Hoja2_Principal').classList.remove('Ani_Down');
            }, 1000
        );
        document.querySelector("#Vista1_Nit_Prestador_Label").classList.remove("red-text");
        document.querySelector("#Vista1_Num_Sol_Label").classList.remove("red-text");
        $scope.Vista2_datos = [];
        $scope.Vista2.Filtrar_Sol = '';
        if ($scope.Vista1.Nit_Prestador) {
            if ($scope.Vista1.Num_Sol) {
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/auditoriacuentas.php",
                    data: {
                        function: 'Vista2_List_Facturas',
                        Nit: $scope.Vista1.Nit_Prestador,
                        Recibo: $scope.Vista1.Num_Sol,
                        Tipo: $scope.Vista1.Tipo
                    }
                }).then(function (response) {
                    if (response.data && response.data.length != 0) {
                        if (response.data[0].Codigo != undefined) {
                            swal({
                                title: "Importante",
                                text: response.data[0].Nombre,
                                type: "info",
                            }).catch(swal.noop);
                        } else {
                            if (response.data[0].IPS != undefined) {
                                $scope.Vista.Activa = 2;
                                $scope.Vista2_datos = response.data;
                                $scope.initPaginacion($scope.Vista2_datos);
                                $scope.Listar_Productos_Detalle();
                                // $scope.Ver_Gestion_Factura(response.data[0]);
                                // $scope.Ver_Glosa_Informacion(response.data[0]);
                                $timeout(function () {
                                    // console.log("height:" + document.querySelector("#pantalla").offsetHeight);
                                    $scope.Pantalla.Altura = document.querySelector("#pantalla").offsetHeight;
                                    if ($scope.Pantalla.Altura > 700) {
                                        document.querySelector("#Hoja_Modal").style.maxHeight = '110vh';
                                        document.querySelector(".Hoja_Gestion_Class").style.maxHeight = '';
                                        angular.forEach(document.querySelectorAll('.select_maxheigth ul'), function (i) {
                                            i.style.maxHeight = '25vh';
                                        });
                                        angular.forEach(document.querySelectorAll('.VistasInf_Alt'), function (i) {
                                            i.style.maxHeight = '90vh';
                                        });
                                    }
                                }, 2000);
                                if (Accion == 'A') {
                                    $timeout(function () {
                                        response.data.forEach(element => {
                                            if ($scope.HojaGest != null) {
                                                if (element.NUMERO == $scope.HojaGest.NUMERO_REG) {
                                                    $scope.Ver_Gestion_Factura(element);
                                                }
                                            }
                                        });
                                    }, 2000)
                                }
                                if ($scope.Vista1.Ubicacion != '') {
                                    // debugger
                                    // console.log($scope.Vista2_datos);
                                    $scope.Vista2_datos.forEach(e => {
                                        // console.log(e.DOCUMENTO, $scope.Vista1.Documento);
                                        // console.log(e.NUMERO, $scope.Vista1.Numero);
                                        // console.log(e.UBICACION, $scope.Vista1.Ubicacion);
                                        // console.log(e);
                                        if (e.DOCUMENTO == $scope.Vista1.Documento && e.NUMERO == $scope.Vista1.Numero && e.UBICACION == $scope.Vista1.Ubicacion) {
                                            $scope.Ver_Gestion_Factura(e);
                                            setTimeout(() => {
                                                $scope.Vista1.Ubicacion = '';
                                                $scope.Vista1.Documento = '';
                                                $scope.Vista1.Numero = '';
                                                $scope.$apply();
                                            }, 1500);
                                        }
                                    });
                                }
                            } else {
                                swal({
                                    title: 'Ocurrio un error',
                                    text: response.data,
                                    type: 'warning',
                                }).catch(swal.noop);
                            }
                        }
                    } else {
                        swal({
                            title: "¡No se encontraron facturas!",
                            text: response.data,
                            type: "warning"
                        }).catch(swal.noop);
                    }
                })

            } else {//class red-text
                document.querySelector("#Vista1_Num_Sol_Label").classList.add("red-text");
            }
        } else {//class red-text
            document.querySelector("#Vista1_Nit_Prestador_Label").classList.add("red-text");
        }
        // console.log($scope.Vista1.Num_Sol, $scope.Vista1.Nit_Prestador);
        // $scope.Vista.Activa=2;
    }

    //////////////////////////CONSULTAR FACTURA POR GESTION//////////////////////////
    $scope.Ver_Gestion_Factura = function (X) {
        // console.log(X);
        document.querySelector('#Hoja_Modal').classList.add('Ani_Up');
        $timeout(function () {
            document.querySelector('#Hoja_Modal').classList.remove('Ani_Up');
        }, 1000);
        $scope.HojaGest = null;
        $scope.Limpiar_Var_Busqueda();
        $scope.Check_Detalle_Glosa = false;
        $scope.Vistas_Informativa = 0;
        $scope.Vista2.Filtrar_Sol = '';
        $scope.List_Select.TipoFacturas.Listado = $scope.Array_TipoFacturas;
        // console.log($scope.List_Select.TipoFacturas.Listado);
        ////////////////////////////

        $timeout(function () {
            $scope.$apply();
        }, 500);
        angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class input'), function (i) {
            i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class select'), function (i) {
            i.setAttribute("disabled", true);
        });
        $scope.HojaGest_Edi_Mod = true;
        $scope.HojaGlosa_Edi_Mod = true;
        ///////////////////////////
        $timeout(function () {
            // console.log("FACTURA: ", X);
            //LLENADO DE VARIABLES A USAR PARA LA GESTION
            var xFecha_Ingreso = null, xFecha_Egreso = null;
            if (X.FECHA_INGRESO != null) {
                xFecha_Ingreso = new Date(X.FECHA_INGRESO);
            }
            if (X.FECHA_EGRESO != null) {
                xFecha_Egreso = new Date(X.FECHA_EGRESO);
            }
            if (X.FECHA_PSS != null && X.FECHA_PSS != "") {
                var xFECHA_PSS = X.FECHA_PSS.toString().split('/');
                var FECHA_PSS = new Date(xFECHA_PSS[2] + '/' + xFECHA_PSS[1] + '/' + xFECHA_PSS[0]);
                console.log(FECHA_PSS);
            }

            $scope.HojaGest = {
                ESTADO: X.ESTADO,
                NUMERO_REG: X.NUMERO,
                UBICACION: X.UBICACION,
                DOCUMENTO: X.DOCUMENTO,
                FACTURA: X.FACTURA,
                NUM_FACTURA: X.NUM_FACTURA,
                RECIBO: X.RECIBO,
                TIPO_DOCUMENTO: X.TIPO_DOCUMENTO,
                DOC_AFILIADO: X.DOC_AFILIADO,
                NOM_AFILIADO: X.AFILIADO,
                NIT: X.NIT,
                IPS: X.IPS,
                VALOR: X.VALOR,
                FECHA_FACTURA: X.FECHA_FACTURA,
                FECHA_RADICADO: X.FECHA_RADICADO,
                CONTRATO: X.CONTRATO,
                CONTRATO_ADM: X.CONTRATO_ADM,
                ESTADO_CONTRATO: X.ESTADO_CONTRATO,
                UBICACION_CONTRATO: X.UBICACION_CONTRATO,
                TUTELA: X.TUTELA,
                RADICADOR: X.RADICADOR,
                FUENTE: X.FUENTE,
                TIPO_FACTURA: (X.TIPO_FACTURA_COD != null && X.TIPO_FACTURA_COD != '') ? (X.TIPO_FACTURA_COD + ' - ' + X.TIPO_FACTURA) : '',
                TIPO_FACTURA_COD: (X.TIPO_FACTURA_COD != null && X.TIPO_FACTURA_COD != '') ? X.TIPO_FACTURA_COD : '',
                ESTADO_GLOSA: $scope.Num_Esta(X.ESTADO_GLOSA, 'E'),
                NUMERO_GLOSA: $scope.Num_Esta(X.ESTADO_GLOSA, 'N'),
                DIAS_FACTURA: X.DIAS_FACTURA,
                CONCEPTO: X.CONCEPTO_FACTURA,

                EDAD: X.EDAD,
                GENERO: X.GENERO,

                AMBITO: X.AMBITO,
                FECHA_INGRESO: xFecha_Ingreso,
                DOC_AFILIADO_VER: X.DOC_AFILIADO,

                DIAGNOSTICO: (X.DIAGNOSTICO_COD != null && X.DIAGNOSTICO_COD != '') ? (X.DIAGNOSTICO_COD + ' - ' + X.DIAGNOSTICO) : '',
                DIAGNOSTICO_COD: (X.DIAGNOSTICO_COD != null && X.DIAGNOSTICO_COD != '') ? X.DIAGNOSTICO_COD : '',
                FECHA_EGRESO: xFecha_Egreso,
                REGIMEN: (X.REGIMEN_COD == 0) ? '0' : '1',
                COPAGO: (X.COPAGO == '') ? '0' : $scope.FormatPesoNumero(X.COPAGO),
                ALTOCOSTO: (X.ALTO_COSTO2 == 'true') ? true : false,
                ERROR_FACTURA: '',
                ERROR_GLOSA: '',

                FECHA_PRESTACION: FECHA_PSS

                // RECOBRO: (X.RECOBRO_CAPITA == 'S') ? true : false,
                // VALOR_RECOBRO: (X.VALOR_RECOBRO == null) ? '0' : $scope.FormatPesoNumero(X.VALOR_RECOBRO),
                // MOTIVO_RECOBRO: (X.MOTIVO_RECOBRO != null) ? X.MOTIVO_RECOBRO : '',
            };
            /////
            var xFECHA_RADICADO = X.FECHA_RADICADO.toString().split('/');
            $scope.FECHA_RADICADO  = new Date(xFECHA_RADICADO[2] + '/' + xFECHA_RADICADO[1] + '/' + xFECHA_RADICADO[0]);
            /////

            $scope.List_Select.TipoFacturas.SAVE = (X.TIPO_FACTURA_COD != null && X.TIPO_FACTURA_COD != '') ? (X.TIPO_FACTURA_COD + ' - ' + X.TIPO_FACTURA) : '';
            $scope.Busqueda.Diagnostico.SAVE = (X.DIAGNOSTICO_COD != null && X.DIAGNOSTICO_COD != '') ? (X.DIAGNOSTICO_COD + ' - ' + X.DIAGNOSTICO) : '';

            $scope.HojaDet = {
                Hoja: 1,
                Edt_Act: 0,
                RENGLON: '',
                PRODUCTO: '',
                PRODUCTO_COD: '',
                AUT: '',
                TOTAL: '',

                SUM_TOTAL: 0,

                Array: null,
            };

            $scope.Valores_Factura = {
                HojaDet: 0,
                HojaGlosa: 0
            }

            $scope.List_Select.Productos_Glosa.Listado = null;
            $scope.HojaDet.SUM_TOTAL = 0;
            $scope.Valores_Factura.HojaDet = 0;

            $scope.Vista2_List_Facturas_Detalle();
            $scope.Vista2_List_Glosa_Factura();

            $scope.HojaGlosa = {
                Hoja: 1,
                Edt_Act: 0,
                RENGLON: '',
                PRODUCTO: '',
                PRODUCTO_COD: '',
                VALOR_GLOSA: '',
                TIPO_GLOSA: '',
                TIPO_GLOSA_COD: '',
                DESCRIPCION: '',
                OBSERVACION: X.OBSERVACION_GLOSA,

                SUM_TOTAL: 0,

                Array: []
            }

            

            $scope.buscarAfiliado($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
            $scope.Obt_Errores();

            if (X.ESTADO == 'A' && $scope.Rol_Procesar == 'S') {
                angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class input'), function (i) {
                    i.removeAttribute("readonly");
                });
                angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class select'), function (i) {
                    i.removeAttribute("disabled");
                });
                $scope.List_Select.TipoFacturas.Listado = [];
                $scope.HojaGest_Edi_Mod = false;
            }

            //if (($scope.Num_Esta(X.ESTADO_GLOSA, 'E') == 'A' || ($scope.Num_Esta(X.ESTADO_GLOSA, 'E')) == null || ($scope.Num_Esta(X.ESTADO_GLOSA, 'A')) == "") && X.DIAS_FACTURA <= 22 && $scope.Rol_Procesar == 'S') {
                $scope.HojaGlosa_Edi_Mod = X.GENERA_GLOSA == 'N' ? true : false;
            //}
             setTimeout(() => {
                document.querySelector('#Hoja_Gestion_Class').scrollTo(0, 500);
            }, 2000);

            $timeout(function () {
                $scope.$apply();
               // $scope.Btn_Gestionar_SoloGlosa();
               $scope.Btn_Gestionar_Glosa = X.GENERA_GLOSA == 'S' ? true : false;
            }, 700);
            angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
                i.classList.remove('red-text');
            });
            //////////Animacion
            $scope.Abrir_Modal_Gestion_Factura();

            document.querySelector('#Hoja_Modal').classList.add('Ani_Down');
            $timeout(function () {
                document.querySelector('#Hoja_Modal').classList.remove('Ani_Down');
            }, 1000);
            $scope.validarSoporteOnbase();
        }, 500);


    }


    $scope.Num_Esta = function (Val, Acc) {
        // if()
        var regex = new RegExp("\\-");
        if (regex.test(Val)) {
            if (Acc == 'N') {
                return Val.toString().split('-')[0]
            } else {
                return Val.toString().split('-')[1]
            }
        }
        return null
    }

    $scope.Obt_Errores = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Obt_Errores',
                Doc: $scope.HojaGest.DOCUMENTO,
                Ubi: $scope.HojaGest.UBICACION,
                Num: $scope.HojaGest.NUMERO_REG
            }
        }).then(function (response) {
            console.log(response.data);
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.HojaGest.ERROR_FACTURA = response.data.ERROR_FACTURA;
                $scope.HojaGest.ERROR_GLOSA = response.data.ERROR_GLOSA;
            }
        });
    }
    //CONSULTA DIAGNOSTICO
    $scope.KeyFind_ObDiag = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.Buscar_Diag();
    }
    $scope.Buscar_Diag = function () {
        if ($scope.HojaGest.DIAGNOSTICO.length > 2) {
            $http({
                method: 'POST',
                url: "php/cuentasmedicas/auditoriacuentas.php",
                data: {
                    function: 'Obt_Diagnostico',
                    Conc: $scope.HojaGest.DIAGNOSTICO.toUpperCase(),
                    Sexo: $scope.HojaGest.GENERO,
                    Edad: $scope.HojaGest.EDAD,
                }
            }).then(function (response) {
                if (response.data[0] != undefined && response.data.length > 1) {
                    $scope.Busqueda.Diagnostico.Filtro = response.data;
                    $scope.Busqueda.Diagnostico.Listado = response.data;
                    $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
                }
                if (response.data.length == 1) {
                    if (response.data[0].Codigo == '-1') {
                        swal({
                            title: "¡Mensaje!",
                            text: response.data[0].Nombre,
                            type: "info",
                        }).catch(swal.noop);
                        $scope.Busqueda.Diagnostico.Filtro = null;
                        $scope.Busqueda.Diagnostico.Listado = null;
                    } else {
                        $scope.FillTextbox_Listado_Diag(response.data[0].Codigo, response.data[0].Nombre);
                    }
                }
                // if (response.data == '') {
                //     swal({
                //         title: "¡Diagnóstico No Encontrado!",
                //         type: "info",
                //         timer: 1000
                //     }).catch(swal.noop);
                //     $scope.Servicio[SAVECOD] = '';
                //     //   $scope. = '';
                //     $scope.Busqueda.Diagnostico.Filtro = null;
                //     $scope.Busqueda.Diagnostico.Listado = null;
                // }
            })
        } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
        }
    }
    $scope.Complete_Listado_Diag = function (string) {
        if ($scope.HojaGest.DIAGNOSTICO != undefined && string != undefined && $scope.Busqueda.Diagnostico.Listado != undefined) {
            $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Diagnostico.Listado, function (x) {
                if (x.Nombre.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.Codigo.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                    output.push({ "Codigo": x.Codigo, "Nombre": x.Nombre.toUpperCase() });
                }
            });
            $scope.Busqueda.Diagnostico.Filtro = output;
        }
    }
    $scope.FillTextbox_Listado_Diag = function (codigo, nombre) {
        $scope.HojaGest.DIAGNOSTICO_COD = codigo;
        $scope.HojaGest.DIAGNOSTICO = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
        $scope.Busqueda.Diagnostico.Filtro = null;
    }
    $scope.Blur_Diag = function () {
        $timeout(function () {
            if ($scope.HojaGest) {
                if ($scope.HojaGest.DIAGNOSTICO != null && $scope.HojaGest.DIAGNOSTICO != undefined) {
                    if ($scope.HojaGest.DIAGNOSTICO != $scope.Busqueda.Diagnostico.SAVE && $scope.Busqueda.Diagnostico.SAVE != null) {
                        $scope.HojaGest.DIAGNOSTICO = $scope.Busqueda.Diagnostico.SAVE;
                        $scope.Busqueda.Diagnostico.Filtro = null;
                    }
                    $scope.Busqueda.Diagnostico.Filtro = null;
                }
            }
        }, 300);
    }

    // Guardar Gestionar Factura
    $scope.HojaGestion_Guardar = function () {
        if ($scope.HojaGlosa.Hoja == 1) {
            // Factura_Gestion
            var Campos_Empty = false;
            angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
                i.classList.remove('red-text');
            });
            if ($scope.HojaGest.ESTADO != 'P') {
                if ($scope.HojaGest.AMBITO == undefined || $scope.HojaGest.AMBITO == null || $scope.HojaGest.AMBITO == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_Ambito_Label').classList.add('red-text');
                }
                if ($scope.HojaGest.AMBITO == 'H') {
                    if ($scope.HojaGest.FECHA_INGRESO == undefined || $scope.HojaGest.FECHA_INGRESO == null || $scope.HojaGest.FECHA_INGRESO == '') {
                        Campos_Empty = true; document.querySelector('#Gestion_FIngreso_Label').classList.add('red-text');
                    }
                    if ($scope.HojaGest.FECHA_EGRESO == undefined || $scope.HojaGest.FECHA_EGRESO == null || $scope.HojaGest.FECHA_EGRESO == '') {
                        Campos_Empty = true; document.querySelector('#Gestion_FEgreso_Label').classList.add('red-text');
                    }
                    if ($scope.HojaGest.FECHA_INGRESO > $scope.HojaGest.FECHA_EGRESO) {
                        Campos_Empty = true; document.querySelector('#Gestion_FEgreso_Label').classList.add('red-text'); document.querySelector('#Gestion_FIngreso_Label').classList.add('red-text');
                    }
                }
                if ($scope.HojaGest.DOC_AFILIADO_VER == undefined || $scope.HojaGest.DOC_AFILIADO_VER == null || $scope.HojaGest.DOC_AFILIADO_VER == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_Doc_Label').classList.add('red-text');
                }
                if ($scope.HojaGest.COPAGO == undefined || $scope.HojaGest.COPAGO == null || $scope.HojaGest.COPAGO == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_Copago_Label').classList.add('red-text');
                }

                if ($scope.HojaGest.DIAGNOSTICO_COD == undefined || $scope.HojaGest.DIAGNOSTICO_COD == null || $scope.HojaGest.DIAGNOSTICO_COD == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_Diag_Label').classList.add('red-text');
                }

                if ($scope.HojaGest.REGIMEN == undefined || $scope.HojaGest.REGIMEN == null || $scope.HojaGest.REGIMEN == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_Regimen_Label').classList.add('red-text');
                }

                if ($scope.HojaGest.TIPO_FACTURA_COD == undefined || $scope.HojaGest.TIPO_FACTURA_COD == null || $scope.HojaGest.TIPO_FACTURA_COD == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_TipoFactura_Label').classList.add('red-text');
                }
                if ($scope.HojaGest.FECHA_PRESTACION == undefined || $scope.HojaGest.FECHA_PRESTACION == null || $scope.HojaGest.FECHA_PRESTACION == '') {
                    Campos_Empty = true; document.querySelector('#Gestion_Fecha_Prestacion_Label').classList.add('red-text');
                }

                // if ($scope.HojaGest.RECOBRO == true) {
                //     if ($scope.HojaGest.VALOR_RECOBRO == undefined || $scope.HojaGest.VALOR_RECOBRO == null || $scope.HojaGest.VALOR_RECOBRO == '') {
                //         Campos_Empty = true; document.querySelector('#Gestion_Recobro_Valor_Label').classList.add('red-text');
                //     }

                //     if ((parseFloat(($scope.HojaGest.VALOR_RECOBRO.toString().replace(/\./g, '')).replace(/\,/g, '.'))) >= $scope.HojaGest.VALOR) {
                //         Campos_Empty = true; document.querySelector('#Gestion_Recobro_Valor_Label').classList.add('red-text');
                //         Materialize.toast('¡El valor del recobro no puede exceder el valor de la Factura!', 2000); $('.toast').addClass('default-background-dark');
                //     }

                //     if ($scope.HojaGest.MOTIVO_RECOBRO == undefined || $scope.HojaGest.MOTIVO_RECOBRO == null || $scope.HojaGest.MOTIVO_RECOBRO == '') {
                //         Campos_Empty = true; document.querySelector('#Gestion_Recobro_Motivo_Label').classList.add('red-text');
                //     }
                // } else {
                //     $scope.HojaGest.VALOR_RECOBRO = '0';
                //     $scope.HojaGest.MOTIVO_RECOBRO = "";
                // }




            }
            //
            if (Campos_Empty == false) {
                if ((parseFloat(($scope.HojaGest.COPAGO.toString().replace(/\./g, '')).replace(/\,/g, '.'))) <= ($scope.HojaGest.VALOR * 0.1)) {
                    if ($scope.HojaDet.SUM_TOTAL <= $scope.HojaGest.VALOR) {
                        var xData = [], xCant = 0;
                        $scope.HojaGlosa.Array.forEach(i => {
                            xData.push({ RENGLON: i.RENGLON, PRODUCTO: i.PRODUCTO, VALOR: (i.VALOR_GLOSA.toString().replace(/\./g, '')).replace(/\,/g, '.'), TIPO: i.TIPO_GLOSA, GLOSA: i.GLOSA });
                        });
                        if (xData.length == 0) {
                            xData = null;
                        } else {
                            xCant = $scope.HojaGlosa.Array.length;
                            xData = JSON.stringify(xData);
                        }
                        // console.log(xArray.length);
                        console.log(xData, xCant);
                        // debugger
                        swal({
                            title: '¿Está seguro que desea Gestionar la Factura',
                            type: "info",
                            showCancelButton: true,
                        }).catch(swal.noop)
                            .then((willDelete) => {
                                if (willDelete) {
                                    swal({ title: 'Cargando...', allowOutsideClick: false });
                                    swal.showLoading();
                                    if ($scope.HojaGest.AMBITO == 'H') {
                                        var xFecha_Ini = $scope.HojaGest.FECHA_INGRESO;
                                        var Fecha_Ini = xFecha_Ini.getUTCDate() + '/' + (((xFecha_Ini.getMonth() + 1) < 10) ? '0' + (xFecha_Ini.getMonth() + 1) : (xFecha_Ini.getMonth() + 1)) + '/' + xFecha_Ini.getFullYear();
                                        var xFecha_Fin = $scope.HojaGest.FECHA_EGRESO;
                                        var Fecha_Fin = xFecha_Fin.getUTCDate() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getFullYear();
                                    } else {
                                        var Fecha_Ini = null, Fecha_Fin = null;
                                    }
                                    var FECHA_PRESTACION = $scope.GetFecha('FECHA_PRESTACION');
                                    $http({
                                        method: 'POST',
                                        url: "php/cuentasmedicas/auditoriacuentas.php",
                                        data: {
                                            function: 'Factura_Gestion',
                                            Num: $scope.HojaGest.NUMERO_REG.toString(), Ubi: $scope.HojaGest.UBICACION.toString(),
                                            F_Inicio: Fecha_Ini, F_Final: Fecha_Fin,
                                            Num_Doc: $scope.HojaGest.DOC_AFILIADO_VER, Ambito: $scope.HojaGest.AMBITO,
                                            Diag: $scope.HojaGest.DIAGNOSTICO_COD, Regimen: $scope.HojaGest.REGIMEN,
                                            TipoFac: $scope.HojaGest.TIPO_FACTURA_COD,
                                            Copago: parseFloat(($scope.HojaGest.COPAGO.replace(/\./g, '')).replace(/\,/g, '.')),
                                            Altocosto: ($scope.HojaGest.ALTOCOSTO == true) ? 'S' : 'N',
                                            // Valor_Recobro: parseFloat(($scope.HojaGest.VALOR_RECOBRO.replace(/\./g, '')).replace(/\,/g, '.')),
                                            // Motivo_Recobro: $scope.HojaGest.MOTIVO_RECOBRO,
                                            datos: xData, Cant_Glosa: xCant,
                                            Observacion_Glosa: $scope.HojaGlosa.OBSERVACION,
                                            Concepto: $scope.HojaGest.CONCEPTO,
                                            Fecha_Pres: FECHA_PRESTACION
                                        }
                                    }).then(function (response) {
                                        if (response.data) {
                                            if (response.data.Codigo == 0) {
                                                $scope.Vista1_Buscar('A');
                                                $scope.Volver_Vistas();
                                                swal({
                                                    title: "¡Acción realizada con exito!",
                                                    text: response.data.Nombre,
                                                    type: "success",
                                                    // timer: 1500
                                                }).catch(swal.noop);
                                                $scope.Check_Detalle_Glosa = false;
                                                $timeout(function () {
                                                    $scope.$apply();
                                                }, 500);
                                                // $scope.Vista2_List_Glosa_Factura();
                                                // Materialize.toast('Factura Actualizada!', 2000); $('.toast').addClass('default-background-dark');
                                            } else {
                                                if (response.data.Codigo != undefined) {
                                                    swal({
                                                        title: 'Ocurrio un error',
                                                        text: response.data.Nombre,
                                                        type: 'warning',
                                                    }).catch(swal.noop);
                                                } else {
                                                    swal({
                                                        title: 'Ocurrio un error',
                                                        text: response.data,
                                                        type: 'warning',
                                                    }).catch(swal.noop);
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                    } else {
                        Materialize.toast('¡La sumatoria del Detalle de la Factura no puede exceder el valor de la Factura!', 2000); $('.toast').addClass('default-background-dark');
                    }
                } else {
                    Materialize.toast('¡El valor del copago no puede exceder el 10% del valor de la Factura!', 2000); $('.toast').addClass('default-background-dark');
                }
            } else {
                Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
            }
        } else {
            Materialize.toast('¡Por favor, Termine de gestionar la glosa!', 2000); $('.toast').addClass('default-background-dark');
        }
    }

    //////////////////////////////// CONSULTAR DETALLE //////////////////////////////////////
    $scope.Vista2_List_Facturas_Detalle = function () {
        $timeout(function () {
            $scope.List_Select.Productos_Glosa.Listado = [];
            $scope.HojaDet.SUM_TOTAL = 0;
            $scope.Valores_Factura.HojaDet = 0;
            $scope.$apply();
        }, 500);
        $timeout(function () {
            $http({
                method: 'POST',
                url: "php/cuentasmedicas/auditoriacuentas.php",
                data: {
                    function: 'Vista2_List_Facturas_Detalle',
                    Num: $scope.HojaGest.NUMERO_REG.toString(),
                    Ubi: $scope.HojaGest.UBICACION.toString()
                }
            }).then(function (response) {
                if (response.data) {
                    if (response.data[0].Codigo != undefined) {
                        $scope.HojaDet.Array = null;
                    } else {
                        $scope.HojaDet.Array = response.data;
                        // console.log('Factura Detalle', response.data);
                        

                        

                        $timeout(function () {
                            $scope.HojaDet.Array.forEach(i => {
                                //Carga los productos disponibles para ese prestador
                                if ($scope.List_Select.Productos_Glosa.Listado.find(x => x.COD_PROD === i.PRODUCTO) == undefined) {
                                    $scope.List_Select.Productos_Glosa.Listado.push({ CODIGO: i.PRODUCTO, NOMBRE: i.DESCRIPCION });
                                }
                                //Suma el valor de los detalle para comparar despues contra el valor de la factura
                                // console.log($scope.Valores_Factura.HojaDet);
                                $scope.HojaDet.SUM_TOTAL = i.TOTAL + $scope.HojaDet.SUM_TOTAL;
                            });
                            if ($scope.HojaDet.SUM_TOTAL > $scope.HojaGest.VALOR) {
                                $scope.Valores_Factura.HojaDet = $scope.HojaDet.SUM_TOTAL - $scope.HojaGest.VALOR;
                            }
                            if ($scope.HojaDet.SUM_TOTAL < $scope.HojaGest.VALOR) {
                                $scope.Valores_Factura.HojaDet = $scope.HojaGest.VALOR - $scope.HojaDet.SUM_TOTAL;
                            }
                            $scope.$apply();
                        }, 1000);


                    }
                }
            });
         }, 500);
    }
    //////////////////////////////// CONSULTAR PRODUCTOS DETALLE //////////////////////////////////////
    $scope.Listar_Productos_Detalle = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'List_Productos_Detalle',
                Nit: $scope.Vista1.Nit_Prestador.toString(),
            }
        }).then(function (response) {
            if (response.data) {
                $scope.List_Select.Productos_Detalle.Listado = response.data;
            }
        })
    }
    //////////////////////////////// CONSULTAR GLOSA //////////////////////////////////////
    $scope.Vista2_List_Glosa_Factura = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Vista2_List_Glosa_Factura',
                Num: $scope.HojaGest.NUMERO_REG.toString(),
                Ubi: $scope.HojaGest.UBICACION.toString()
            }
        }).then(function (response) {
            if (response.data && response.data.length > 0) {
                if (response.data[0].Codigo != undefined) {
                    if (response.data[0].Codigo == 0) {
                        $scope.HojaGlosa.Array = [];
                    } else {
                        $scope.HojaGlosa.Array = response.data;
                    }
                } else {
                    if (response.data[0].Codigo == 0) {
                        $scope.HojaGlosa.Array = [];
                    } else {
                        $scope.HojaGlosa.Array = response.data;
                        $scope.HojaGlosa.SUM_TOTAL = 0;
                        $scope.Valores_Factura.HojaGlosa = 0;

                        // $timeout(function () {
                        $scope.HojaGlosa.Array.forEach(i => {
                            //Suma el valor de los detalle para comparar despues contra el valor de la factura
                            $scope.HojaGlosa.SUM_TOTAL = parseFloat(i.VALOR_GLOSA) + $scope.HojaGlosa.SUM_TOTAL;
                        });
                        if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
                            $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
                        }
                        if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
                            $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
                        }
                        // }, 1000);

                        $timeout(function () {
                            console.log($scope.HojaGlosa.SUM_TOTAL, $scope.HojaGest.VALOR, $scope.HojaDet.SUM_TOTAL);
                            console.log($scope.Valores_Factura.HojaGlosa);
                        }, 1000);
                    }
                }
            }
        });
    }

    //////////////////////////DETALLE//////////////////////////
    //////////////////////////DETALLE//////////////////////////
    //////////////////////////DETALLE//////////////////////////
    $scope.HojaDetalle_Cancelar = function () {
        // $scope.HojaDet.Hoja = 1;
        $timeout(function () {
            $scope.HojaDet.Hoja = 1;
            $scope.HojaDet.Edt_Act = 0;
            $scope.HojaDet.RENGLON = '';
            $scope.HojaDet.PRODUCTO = '';
            $scope.HojaDet.PRODUCTO_COD = '';
            $scope.HojaDet.TOTAL = '0';
            $scope.HojaDet.AUT = '';
            $scope.List_Select.Productos_Detalle.SAVE = '';
            $scope.$apply();
        }, 500)

    }
    $scope.HojaDetalle_Activar_Agregar = function () { // Activar Vista de detale
        $scope.HojaDet.Hoja = 2;
        $scope.HojaDet.Edt_Act = 0;
        $scope.HojaDet.RENGLON = '';
        $scope.HojaDet.PRODUCTO = '';
        $scope.HojaDet.PRODUCTO_COD = '';
        $scope.HojaDet.TOTAL = '0';
        $scope.HojaDet.AUT = '';
        $scope.List_Select.Productos_Detalle.SAVE = '';
        angular.forEach(document.querySelectorAll('.Hoja_Detalle_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
    }

    $scope.HojaDetalle_AgregarDetalle = function () { // Guardar el json pero no hacer bd
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.Hoja_Detalle_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
        if ($scope.HojaDet.PRODUCTO == undefined || $scope.HojaDet.PRODUCTO == null || $scope.HojaDet.PRODUCTO == '') {
            Campos_Empty = true; document.querySelector('#Detalle_Producto_Label').classList.add('red-text');
        }
        if ($scope.HojaDet.TOTAL == undefined || $scope.HojaDet.TOTAL == null || $scope.HojaDet.TOTAL == '' || $scope.HojaDet.TOTAL == '0') {
            Campos_Empty = true; document.querySelector('#Detalle_Valor_Label').classList.add('red-text');
        }
        if ($scope.HojaDet.AUT == undefined || $scope.HojaDet.AUT == null || $scope.HojaDet.AUT == '') {
            Campos_Empty = true; document.querySelector('#Detalle_Aut_Label').classList.add('red-text');
        }


        if (Campos_Empty == false) {
            if (($scope.HojaDet.SUM_TOTAL + parseFloat(($scope.HojaDet.TOTAL.toString().replace(/\./g, '')).replace(/\,/g, '.'))) <= $scope.HojaGest.VALOR) {
                var Renglon_Max = 0;
                $scope.HojaDet.Array.forEach(element => {
                    if (element.RENGLON > Renglon_Max) {
                        Renglon_Max = element.RENGLON;
                    }
                });
                // $scope.HojaDet.RENGLON = $scope.HojaDet.Array.length + 1;
                swal({
                    title: '¿Está seguro que desea agregar el Detalle?',
                    type: "info",
                    showCancelButton: true,
                }).catch(swal.noop)
                    .then((willDelete) => {
                        if (willDelete) {
                            swal({ title: 'Cargando...', allowOutsideClick: false });
                            swal.showLoading();
                            $http({
                                method: 'POST',
                                url: "php/cuentasmedicas/auditoriacuentas.php",
                                data: {
                                    function: 'Factura_Detalle_Ins_Upd_Del',
                                    Num: $scope.HojaGest.NUMERO_REG.toString(), Ubi: $scope.HojaGest.UBICACION.toString(),
                                    Producto: $scope.HojaDet.PRODUCTO_COD, Valor: parseFloat(($scope.HojaDet.TOTAL.toString().replace(/\./g, '')).replace(/\,/g, '.')),
                                    Aut: $scope.HojaDet.AUT, Renglon: Renglon_Max + 1, Tipo_Doc: $scope.HojaGest.TIPO_DOCUMENTO, Num_Doc: $scope.HojaGest.DOC_AFILIADO,
                                    Nit: $scope.Vista1.Nit_Prestador,
                                    Accion: 'I'
                                }
                            }).then(function (response) {
                                if (response.data) {
                                    if (response.data.Codigo == 0) {
                                        $scope.HojaDet.RENGLON = '';
                                        $scope.HojaDet.PRODUCTO = '';
                                        $scope.HojaDet.PRODUCTO_COD = '';
                                        $scope.HojaDet.TOTAL = '';
                                        $scope.HojaDet.AUT = '';
                                        $scope.HojaDet.Edt_Act = 0;
                                        $scope.HojaDet.Hoja = 1;
                                        swal({
                                            title: "¡Acción realizada con exito!",
                                            text: response.data.Nombre,
                                            type: "success",
                                            // timer: 1500
                                        }).catch(swal.noop);
                                        $scope.Vista2_List_Facturas_Detalle(); // Actualiza Lista Detalle
                                    } else {
                                        if (response.data.Codigo != undefined) {
                                            swal({
                                                title: 'Ocurrio un error',
                                                text: response.data,
                                                type: 'warning',
                                            }).catch(swal.noop);
                                        } else {
                                            swal({
                                                title: 'Ocurrio un error',
                                                text: response.data,
                                                type: 'warning',
                                            }).catch(swal.noop);
                                        }
                                    }
                                }
                            });
                        }
                    });
            } else {
                Materialize.toast('¡No es posible ingresar este detalle de factura porque la sumatoria total excede $' + $scope.FormatPesoNumero(($scope.HojaDet.SUM_TOTAL + parseFloat(($scope.HojaDet.TOTAL.toString().replace(/\./g, '')).replace(/\,/g, '.'))) - $scope.HojaGest.VALOR) + ' el valor de la Factura!', 5000); $('.toast').addClass('default-background-dark');
            }
        } else {
            Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
        }
        // HojaGlosa.Array
    }

    $scope.HojaDetalle_CargarEditarDetalle = function (row) {
        $scope.HojaDet.Hoja = 2;
        $scope.HojaDet.Edt_Act = 1;
        $timeout(function () {
            // alert("------------------------REVISAR----------------------");
            $scope.HojaDet.RENGLON = row.RENGLON;
            $scope.HojaDet.PRODUCTO = row.PRODUCTO + ' - ' + row.DESCRIPCION;
            $scope.HojaDet.PRODUCTO_COD = row.PRODUCTO;
            $scope.HojaDet.AUT = row.AUT;
            $scope.HojaDet.TOTAL = $scope.FormatPesoNumero(row.TOTAL);
            $scope.List_Select.Productos_Detalle.SAVE = row.PRODUCTO + ' - ' + row.DESCRIPCION;
        }, 500);
        angular.forEach(document.querySelectorAll('.Hoja_Detalle_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
    }

    $scope.HojaDetalle_EditarDetalle = function (renglon) {
        // HojaDet.Array
        for (var i = 0; i < $scope.HojaDet.Array.length; i++) {
            if ($scope.HojaDet.Array[i].RENGLON == renglon) {
                var Sum_Total = 0;
                var Campos_Empty = false;
                $scope.HojaDet.Array.forEach(element => {
                    if (element.RENGLON != renglon) {
                        Sum_Total = Sum_Total + element.TOTAL;
                    }
                });
                if ($scope.HojaDet.PRODUCTO == undefined || $scope.HojaDet.PRODUCTO == null || $scope.HojaDet.PRODUCTO == '') {
                    Campos_Empty = true; document.querySelector('#Detalle_Producto_Label').classList.add('red-text');
                }
                if ($scope.HojaDet.TOTAL == undefined || $scope.HojaDet.TOTAL == null || $scope.HojaDet.TOTAL == '' || $scope.HojaDet.TOTAL == '0') {
                    Campos_Empty = true; document.querySelector('#Detalle_Valor_Label').classList.add('red-text');
                }
                if ($scope.HojaDet.AUT == undefined || $scope.HojaDet.AUT == null || $scope.HojaDet.AUT == '') {
                    Campos_Empty = true; document.querySelector('#Detalle_Aut_Label').classList.add('red-text');
                }
                if (Campos_Empty == false) {
                    if ((Sum_Total + parseFloat(($scope.HojaDet.TOTAL.toString().replace(/\./g, '')).replace(/\,/g, '.'))) <= $scope.HojaGest.VALOR) {
                        $scope.HojaDet.Array[i].PRODUCTO = $scope.HojaDet.PRODUCTO_COD;
                        $scope.HojaDet.Array[i].TOTAL = parseFloat(($scope.HojaDet.TOTAL.toString().replace(/\./g, '')).replace(/\,/g, '.'));
                        $scope.HojaDet.Array[i].AUT = $scope.HojaDet.AUT;

                        // console.log($scope.HojaDet.Array[i]);
                        swal({ title: 'Cargando...', allowOutsideClick: false });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/auditoriacuentas.php",
                            data: {
                                function: 'Factura_Detalle_Ins_Upd_Del',
                                Num: $scope.HojaGest.NUMERO_REG.toString(), Ubi: $scope.HojaGest.UBICACION.toString(),
                                Producto: $scope.HojaDet.Array[i].PRODUCTO, Valor: $scope.HojaDet.Array[i].TOTAL.toString().replace(/\./g, ','),
                                Aut: $scope.HojaDet.Array[i].AUT.toString(), Renglon: $scope.HojaDet.Array[i].RENGLON,
                                Tipo_Doc: $scope.HojaGest.TIPO_DOCUMENTO, Num_Doc: $scope.HojaGest.DOC_AFILIADO,
                                Nit: $scope.Vista1.Nit_Prestador,
                                Accion: 'U'
                            }
                        }).then(function (response) {
                            if (response.data) {
                                if (response.data.Codigo == 0) {
                                    $scope.HojaDet.RENGLON = '';
                                    $scope.HojaDet.PRODUCTO = '';
                                    $scope.HojaDet.PRODUCTO_COD = '';
                                    $scope.HojaDet.TOTAL = '0';
                                    $scope.HojaDet.AUT = '';
                                    $scope.HojaDet.Edt_Act = 0;
                                    $scope.HojaDet.Hoja = 1;
                                    swal({
                                        title: "¡Acción realida con exito!",
                                        text: response.data.Nombre,
                                        type: "success",
                                        // timer: 1500
                                    }).catch(swal.noop);
                                    $scope.Vista2_List_Facturas_Detalle(); // Actualiza Lista Detalle
                                } else {
                                    if (response.data.Codigo != undefined && response.data.Codigo == 1) {
                                        swal({
                                            title: 'Ocurrio un error',
                                            text: response.data.Nombre,
                                            type: 'warning',
                                        }).catch(swal.noop);
                                    } else {
                                        swal({
                                            title: 'Ocurrio un error',
                                            text: response.data,
                                            type: 'warning',
                                        }).catch(swal.noop);
                                    }
                                }
                            }
                        });

                    } else {
                        Materialize.toast('¡No es posible ingresar este detalle de factura porque la sumatoria total excede $' + $scope.FormatPesoNumero((Sum_Total + parseFloat(($scope.HojaDet.TOTAL.toString().replace(/\./g, '')).replace(/\,/g, '.'))) - $scope.HojaGest.VALOR) + ' el valor de la Factura!', 5000); $('.toast').addClass('default-background-dark');
                    }
                } else {
                    Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
                }
            }
        }

        // console.log($scope.HojaDet.Array);
    }
    $scope.HojaDetalle_EliminarDetalle = function (row) { // Enviar peticion a bd para eliminar
        // HojaDet.Array
        if ($scope.HojaDet.Array.length > 1) {
            var Exist = 0;
            $scope.HojaGlosa.Array.forEach(i => {
                if (i.PRODUCTO == row.PRODUCTO) {
                    Exist += 1;
                }
            });
            if (Exist == 0) {
                // swal({
                //     title: '¿Está seguro que desea eliminar el Detalle?',
                //     type: "info",
                //     showCancelButton: true,
                // }).catch(swal.noop)
                //     .then((willDelete) => {
                //         if (willDelete) {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/cuentasmedicas/auditoriacuentas.php",
                    data: {
                        function: 'Factura_Detalle_Ins_Upd_Del',
                        Num: $scope.HojaGest.NUMERO_REG.toString(), Ubi: $scope.HojaGest.UBICACION.toString(),
                        Producto: row.PRODUCTO, Valor: row.TOTAL,
                        Aut: row.AUT.toString(), Renglon: row.RENGLON,
                        Tipo_Doc: $scope.HojaGest.TIPO_DOCUMENTO, Num_Doc: $scope.HojaGest.DOC_AFILIADO,
                        Nit: $scope.Vista1.Nit_Prestador,
                        Accion: 'D'
                    }
                }).then(function (response) {
                    if (response.data) {
                        if (response.data.Codigo == 0) {
                            $scope.Vista2_List_Facturas_Detalle(); // Actualiza Lista Detalle
                            $scope.HojaDet.Hoja = 1;
                            $timeout(function () {
                                $scope.$apply();
                            }, 500);
                            swal.close();
                        } else {
                            swal({
                                title: 'Ocurrio un error',
                                text: response.data,
                                type: 'warning',
                            }).catch(swal.noop);
                        }
                    }
                });
                //     }
                // });
            } else {
                swal({
                    title: 'Ocurrio un error',
                    text: '¡No es posible eliminar este detalle, debe eliminar primero la glosa asociada a este detalle!',
                    type: 'warning',
                }).catch(swal.noop);
            }
        }
    }

    //////////////////////////GLOSA//////////////////////////
    //////////////////////////GLOSA//////////////////////////
    //////////////////////////GLOSA//////////////////////////

    $scope.HojaGlosa_Cancelar = function () {
        // $scope.HojaGlosa.Hoja = 1;
        $timeout(function () {
            $scope.HojaGlosa.Hoja = 1;
            $scope.HojaGlosa.Edt_Act = 0;
            $scope.HojaGlosa.RENGLON = '';
            $scope.HojaGlosa.PRODUCTO = '';
            $scope.HojaGlosa.PRODUCTO_COD = '';
            $scope.HojaGlosa.VALOR_GLOSA = '0';
            $scope.HojaGlosa.TIPO_GLOSA = '';
            $scope.HojaGlosa.TIPO_GLOSA_COD = '';
            $scope.HojaGlosa.DESCRIPCION = '';
            $scope.List_Select.Productos_Glosa.SAVE = '';
            $scope.List_Select.TipoGlosas.SAVE = '';
            $scope.$apply();
        }, 500)

    }

    $scope.HojaGlosa_Activar_Agregar = function () { // Activar Vista de detale
        $scope.HojaGlosa.RENGLON = '';
        $scope.HojaGlosa.PRODUCTO = '';
        $scope.HojaGlosa.PRODUCTO_COD = '';
        $scope.HojaGlosa.VALOR_GLOSA = '0';
        $scope.HojaGlosa.TIPO_GLOSA = '';
        $scope.HojaGlosa.TIPO_GLOSA_COD = '';
        $scope.HojaGlosa.DESCRIPCION = '';
        $scope.HojaGlosa.Edt_Act = 0;
        $scope.HojaGlosa.Hoja = 2;
        $scope.List_Select.Productos_Glosa.SAVE = '';
        $scope.List_Select.TipoGlosas.SAVE = '';
        angular.forEach(document.querySelectorAll('.Hoja_Glosa_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
    }

    $scope.Listar_TipoGlosas = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'List_TipoGlosas'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.List_Select.TipoGlosas.Listado = response.data;
            }
        })
    }

    $scope.Contar_Car = function (x) {
        if (x > 4000) {
            swal({
                title: 'Información',
                text: '¡Se superaron los caracteres máximo a recibir (4000)!',
                type: 'info',
            }).catch(swal.noop);
        }
    }

    $scope.HojaGlosa_AgregarGlosa = function () { // Guardar el json pero no hacer bd
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.Hoja_Glosa_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
        if ($scope.HojaGlosa.PRODUCTO == undefined || $scope.HojaGlosa.PRODUCTO == null || $scope.HojaGlosa.PRODUCTO == '' || $scope.HojaGlosa.PRODUCTO == 'x') {
            Campos_Empty = true; document.querySelector('#Glosa_Producto_Label').classList.add('red-text');
        }
        if ($scope.HojaGlosa.VALOR_GLOSA == undefined || $scope.HojaGlosa.VALOR_GLOSA == null || $scope.HojaGlosa.VALOR_GLOSA == '' || $scope.HojaGlosa.VALOR_GLOSA == '0') {
            Campos_Empty = true; document.querySelector('#Glosa_Valor_Label').classList.add('red-text');
        }
        if ($scope.HojaGlosa.TIPO_GLOSA_COD == undefined || $scope.HojaGlosa.TIPO_GLOSA_COD == null || $scope.HojaGlosa.TIPO_GLOSA_COD == '') {
            Campos_Empty = true; document.querySelector('#Glosa_Tipo_Label').classList.add('red-text');
        }
        if ($scope.HojaGlosa.DESCRIPCION == undefined || $scope.HojaGlosa.DESCRIPCION == null || $scope.HojaGlosa.DESCRIPCION == '' || $scope.HojaGlosa.DESCRIPCION.length < 10) {
            Campos_Empty = true; document.querySelector('#Glosa_Descripcion_Label').classList.add('red-text');
        }


        if (Campos_Empty == false) {
            $scope.HojaGlosa.SUM_TOTAL = parseFloat(($scope.HojaGlosa.VALOR_GLOSA.toString().replace(/\./g, '')).replace(/\,/g, '.'));
            $scope.HojaGlosa.Array.forEach(i => {
                $scope.HojaGlosa.SUM_TOTAL = i.VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
            });
            if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
                $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
            }
            if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
                $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
            }
            // console.log($scope.HojaGlosa.SUM_TOTAL, $scope.HojaGest.VALOR, $scope.HojaDet.SUM_TOTAL);
            if ($scope.HojaGlosa.SUM_TOTAL <= $scope.HojaGest.VALOR) {

                var Renglon_Max = 0;
                $scope.HojaGlosa.Array.forEach(element => {
                    if (element.RENGLON > Renglon_Max) {
                        Renglon_Max = element.RENGLON;
                    }
                });
                $scope.HojaGlosa.Array.push({
                    RENGLON: Renglon_Max + 1, GLOSA: $scope.HojaGlosa.DESCRIPCION.toString().toUpperCase(), TIPO_GLOSA: $scope.HojaGlosa.TIPO_GLOSA_COD,
                    DESCRIPCION_GLOSA: $scope.List_Select.TipoGlosas.SAVE.split('-')[1], VALOR_GLOSA: parseFloat(($scope.HojaGlosa.VALOR_GLOSA.toString().replace(/\./g, '')).replace(/\,/g, '.')),
                    PRODUCTO: $scope.HojaGlosa.PRODUCTO_COD, DESCRIPCION: $scope.List_Select.Productos_Glosa.SAVE.split('-')[1]
                });

                $scope.HojaGlosa.RENGLON = '';
                $scope.HojaGlosa.PRODUCTO = '';
                $scope.HojaGlosa.PRODUCTO_COD = '';
                $scope.HojaGlosa.VALOR_GLOSA = '0';
                $scope.HojaGlosa.TIPO_GLOSA = '';
                $scope.HojaGlosa.TIPO_GLOSA_COD = '';
                $scope.HojaGlosa.DESCRIPCION = '';
                $scope.HojaGlosa.Edt_Act = 0;
                $scope.HojaGlosa.Hoja = 1;
                $scope.List_Select.Productos_Glosa.SAVE = '';
                $scope.List_Select.TipoGlosas.SAVE = '';


                // $timeout(function () {
                //     $scope.HojaGlosa.Array.forEach(i => {
                //         $scope.HojaGlosa.SUM_TOTAL = i.VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
                //     });
                //     if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
                //         $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
                //     }
                //     if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
                //         $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
                //     }
                // }, 1000);

            } else {
                Materialize.toast('¡No es posible ingresar este detalle de glosa porque la sumatoria total excede $' + $scope.FormatPesoNumero($scope.Valores_Factura.HojaGlosa) + ' el valor de la Factura!', 5000); $('.toast').addClass('default-background-dark');
            }
        } else {
            Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
        }
        // HojaGlosa.Array
    }

    $scope.HojaGlosa_CargarEditarGlosa = function (row) {
        $scope.HojaGlosa.Hoja = 2;
        $timeout(function () {
            $scope.HojaGlosa.Edt_Act = 1;
            $scope.HojaGlosa.RENGLON = row.RENGLON;
            $scope.HojaGlosa.PRODUCTO = row.PRODUCTO + ' - ' + row.DESCRIPCION;
            $scope.HojaGlosa.PRODUCTO_COD = row.PRODUCTO;
            $scope.List_Select.Productos_Glosa.SAVE = row.PRODUCTO + ' - ' + row.DESCRIPCION;
            $scope.HojaGlosa.VALOR_GLOSA = $scope.FormatPesoNumero(row.VALOR_GLOSA);
            $scope.HojaGlosa.TIPO_GLOSA = row.TIPO_GLOSA + ' - ' + row.DESCRIPCION_GLOSA;
            $scope.HojaGlosa.TIPO_GLOSA_COD = row.TIPO_GLOSA;
            $scope.List_Select.TipoGlosas.SAVE = row.TIPO_GLOSA + ' - ' + row.DESCRIPCION_GLOSA;
            $scope.HojaGlosa.DESCRIPCION = row.GLOSA;
        }, 500);
        // HojaGlosa.Array
    }

    $scope.HojaGlosa_EditarGlosa = function (renglon) {
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.Hoja_Glosa_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
        if ($scope.HojaGlosa.PRODUCTO == undefined || $scope.HojaGlosa.PRODUCTO == null || $scope.HojaGlosa.PRODUCTO == '' || $scope.HojaGlosa.PRODUCTO == 'x') {
            Campos_Empty = true; document.querySelector('#Glosa_Producto_Label').classList.add('red-text');
        }
        if ($scope.HojaGlosa.VALOR_GLOSA == undefined || $scope.HojaGlosa.VALOR_GLOSA == null || $scope.HojaGlosa.VALOR_GLOSA == '' || $scope.HojaGlosa.VALOR_GLOSA == '0') {
            Campos_Empty = true; document.querySelector('#Glosa_Valor_Label').classList.add('red-text');
        }
        if ($scope.HojaGlosa.TIPO_GLOSA_COD == undefined || $scope.HojaGlosa.TIPO_GLOSA_COD == null || $scope.HojaGlosa.TIPO_GLOSA_COD == '') {
            Campos_Empty = true; document.querySelector('#Glosa_Tipo_Label').classList.add('red-text');
        }
        if ($scope.HojaGlosa.DESCRIPCION == undefined || $scope.HojaGlosa.DESCRIPCION == null || $scope.HojaGlosa.DESCRIPCION == '' || $scope.HojaGlosa.DESCRIPCION.length < 10) {
            Campos_Empty = true; document.querySelector('#Glosa_Descripcion_Label').classList.add('red-text');
        }
        if (Campos_Empty == false) {
            $scope.HojaGlosa.SUM_TOTAL = 0;
            $scope.HojaGlosa.Array.forEach(i => {
                if ($scope.HojaGlosa.RENGLON != i.RENGLON) {
                    // console.log(i);
                    $scope.HojaGlosa.SUM_TOTAL = i.VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
                }
            });
            // if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
            //     $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
            // }
            // if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
            //     $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
            // }
            // $scope.Valores_Factura.HojaGlosa = ($scope.HojaGest.VALOR - $scope.HojaGlosa.VALOR_GLOSA) + $scope.Valores_Factura.HojaGlosa;

            if ($scope.HojaGlosa.SUM_TOTAL + parseFloat(($scope.HojaGlosa.VALOR_GLOSA.toString().replace(/\./g, '')).replace(/\,/g, '.')) <= $scope.HojaGest.VALOR) {
                $scope.HojaGlosa.SUM_TOTAL = 0;
                for (var i = 0; i < $scope.HojaGlosa.Array.length; i++) {
                    if ($scope.HojaGlosa.Array[i].RENGLON == renglon) {
                        $scope.HojaGlosa.Array[i].PRODUCTO = $scope.HojaGlosa.PRODUCTO_COD;
                        $scope.HojaGlosa.Array[i].DESCRIPCION = $scope.List_Select.Productos_Glosa.SAVE.split('-')[1].trim();
                        $scope.HojaGlosa.Array[i].VALOR_GLOSA = parseFloat(($scope.HojaGlosa.VALOR_GLOSA.toString().replace(/\./g, '')).replace(/\,/g, '.'));
                        $scope.HojaGlosa.Array[i].TIPO_GLOSA = $scope.HojaGlosa.TIPO_GLOSA_COD;
                        $scope.HojaGlosa.Array[i].DESCRIPCION_GLOSA = $scope.List_Select.TipoGlosas.SAVE.split('-')[1].trim();
                        $scope.HojaGlosa.Array[i].GLOSA = $scope.HojaGlosa.DESCRIPCION;
                        $scope.HojaGlosa.SUM_TOTAL = $scope.HojaGlosa.Array[i].VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
                    } else {
                        $scope.HojaGlosa.SUM_TOTAL = $scope.HojaGlosa.Array[i].VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
                    }
                }
                if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
                    $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
                }
                if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
                    $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
                }
                $timeout(function () {
                    $scope.HojaGlosa.RENGLON = '';
                    $scope.HojaGlosa.PRODUCTO = '';
                    $scope.HojaGlosa.PRODUCTO_COD = '';
                    $scope.List_Select.Productos_Glosa.SAVE = '';
                    $scope.HojaGlosa.VALOR_GLOSA = '0';
                    $scope.HojaGlosa.TIPO_GLOSA = '';
                    $scope.HojaGlosa.TIPO_GLOSA_COD = '';
                    $scope.HojaGlosa.DESCRIPCION = '';
                    $scope.List_Select.TipoGlosas.SAVE = '';
                    $scope.$apply();
                }, 1000)
                $scope.HojaGlosa.Hoja = 1;
                $scope.HojaGlosa.Edt_Act = 0;
                Materialize.toast('Glosa Actualizada!', 2000); $('.toast').addClass('default-background-dark');
            } else {
                Materialize.toast('¡No es posible ingresar este detalle de glosa porque la sumatoria total excede $' + $scope.FormatPesoNumero(($scope.HojaGlosa.SUM_TOTAL + parseFloat(($scope.HojaGlosa.VALOR_GLOSA.toString().replace(/\./g, '')).replace(/\,/g, '.'))) - $scope.HojaGest.VALOR) + ' el valor de la Factura!', 5000); $('.toast').addClass('default-background-dark');
            }
        } else {
            Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
        }

    }
    $scope.HojaGlosa_EliminarGlosa = function (row) {
        // HojaGlosa.Array
        swal({
            title: '¿Está seguro que desea eliminar la Glosa?',
            type: "info",
            showCancelButton: true,
        }).catch(swal.noop)
            .then((willDelete) => {
                if (willDelete) {
                    $scope.HojaGlosa.Array.splice($scope.HojaGlosa.Array.findIndex(obj => obj.RENGLON == row.RENGLON), 1);
                    $scope.HojaGlosa_Actualizar_SUM_TOTAL();
                    $scope.HojaGlosa.Hoja = 1;
                    $timeout(function () {
                        $scope.$apply();
                    }, 500);
                    Materialize.toast('Glosa Eliminada!', 2000); $('.toast').addClass('default-background-dark');
                }
            });
    }
    $scope.HojaGlosa_Atras = function () {
        $scope.HojaGlosa.Hoja = 1;
        $scope.HojaGlosa_Actualizar_SUM_TOTAL();
    }
    $scope.HojaGlosa_Actualizar_SUM_TOTAL = function () {
        $scope.HojaGlosa.SUM_TOTAL = 0;
        $scope.HojaGlosa.Array.forEach(i => {
            $scope.HojaGlosa.SUM_TOTAL = i.VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
        });
        if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
            $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
        }
        if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
            $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
        }
    }
    $scope.HojaGlosa_AgregarObservacion = function (text) {
        // console.log(text);
        if (text != null) {
            swal({
                title: 'Observación de la glosa',
                input: 'textarea',
                cancelButtonText: 'Cerrar',
                // inputPlaceholder: 'Escribe un comentario...',
                showCancelButton: true,
                showConfirmButton: false,
                inputValue: text
            }).then(function (result) {
                $(".confirm").attr('disabled', 'disabled');
            }).catch(swal.noop);
            document.querySelector('.swal2-textarea').setAttribute("readonly", true);
            document.querySelector('.swal2-textarea').style.height = '300px';
        } else {
            swal({
                title: 'Observación de la Glosa',
                input: 'textarea',
                inputPlaceholder: 'Escribe una observacion...',
                showCancelButton: true,
                allowOutsideClick: false,
                inputAttributes: {
                    id: "textarea_swal",
                    onkeyup: "Format()"
                },
                // inputValue: $scope.Motivo_Anulacion_Devolucion
            }).then(function (result) {
                if (result && result !== '') {
                    $scope.HojaGlosa.OBSERVACION = result;
                    swal({
                        title: '¡Observación agregada!',
                        type: 'success',
                    }).catch(swal.noop);
                    setTimeout(() => {
                        $scope.$apply();
                    }, 300);
                } else {
                    Materialize.toast('¡La observacion no puede ir vacia!', 1000); $('.toast').addClass('default-background-dark');
                }
            }).catch(swal.noop);
            document.querySelector('.swal2-textarea').style.height = '300px';
        }

    }

    $scope.Ver_Informacion = function (x) {
        if (x == 1) { //Informacion Afiliado
            $scope.Vistas_Informativa = 1;
            $scope.Vistas_Informativa_Titulo = 'Información del Afiliado';
            // $scope.buscarAfiliado($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
            $scope.buscarnovedades($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
        }
        if (x == 2) { //Historico de Facturas
            $scope.Vistas_Informativa = 2;
            $scope.Vistas_Informativa_Titulo = 'Histórico de Facturas del Afiliado';
            $scope.Filter_Tut = '';
            // $scope.buscarAfiliado($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
            $scope.Consultar_Historico_Facturas($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
        }
        if (x == 3) { //Anexos
            $scope.Vistas_Informativa = 3;
            $scope.Vistas_Informativa_Titulo = 'Anexos';
            $scope.buscardocumentos($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
        }
        if (x == 4) { //Juridica
            $scope.Vistas_Informativa = 4;
            $scope.Vistas_Informativa_Titulo = 'Juridica - Tutelas';
            $scope.Consultar_Tutelas($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
        }
        if (x == 5) { //Autorizaciones
            $scope.Vistas_Informativa = 5;
            $scope.Vistas_Informativa_Titulo = 'Autorizaciones';
            $scope.Consulta_Auts($scope.HojaGest.DOC_AFILIADO);
        }
        if (x == 6) { //Autorizaciones
            $scope.Vistas_Informativa = 6;
            $scope.Vistas_Informativa_Titulo = 'Censo Hospitalario';
            $scope.Consulta_Censos($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);
        }
        if (x == 7) { //Financiera
            $scope.Vistas_Informativa = 7;
            $scope.Vistas_Informativa_Titulo = 'Financiera';
            $scope.Consulta_Financiera();
        }

          if (x == 8) { //Busqueda OCR            
            $scope.Vistas_Informativa = 8;
            $scope.Vistas_Informativa_Titulo = 'Busqueda OCR  N° Factura: ' + $scope.HojaGest.FACTURA + ' IPS: ' + $scope.HojaGest.IPS;
            $scope.Consulta_Financiera();
        }
    }



    $scope.Reversar_Anular_Factura = function (Accion) {
        swal({
            title: "¿Está seguro que desea " + ((Accion == 'R') ? 'Reversar' : 'Anular') + " la glosa?",
            type: "question",
            showCancelButton: true,
            allowOutsideClick: false
        }).catch(swal.noop)
            .then((willDelete) => {
                if (willDelete) {
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/cuentasmedicas/auditoriacuentas.php",
                        data: {
                            function: 'Factura_Glosa_Reversar',
                            Num: $scope.HojaGest.NUMERO_GLOSA.toString(), Ubi: $scope.HojaGest.UBICACION.toString(), Accion: Accion
                        }
                    }).then(function (response) {
                        if (response.data) {
                            if (response.data.codigo == 0) {
                                $scope.Vista1_Buscar('A');
                                swal({
                                    title: "¡Acción realizada con exito!",
                                    text: response.data.Nombre,
                                    type: "success",
                                    // timer: 1500
                                }).catch(swal.noop);
                                $scope.Check_Detalle_Glosa = false;
                                $timeout(function () {
                                    $scope.$apply();
                                }, 500);
                                $scope.Vista2_List_Glosa_Factura();
                                // Materialize.toast('Factura Actualizada!', 2000); $('.toast').addClass('default-background-dark');
                            } else {
                                if (response.data.codigo) {
                                    swal({
                                        title: 'Ocurrio un error',
                                        text: response.data.Nombre,
                                        type: 'warning',
                                    }).catch(swal.noop);
                                } else {
                                    swal({
                                        title: 'Ocurrio un error',
                                        text: response.data,
                                        type: 'warning',
                                    }).catch(swal.noop);
                                }
                            }
                        }
                    });

                }
            });
    }

    /////////////////////////////////////////////////////FUNCIONARIOS///////////////////////////////////////////////
    $scope.Ver_HojaFunc = function () {
        if ($scope.Vista.Activa != 3) {
            $scope.Vista.Activa = 3;
            $scope.Vista3.Filtrar_Sol = "";
            $scope.ObtenerListado_Funcs();
        } else {
            $scope.Vista.Activa = 1;
        }
    }

    $scope.ObtenerListado_Funcs = function (X) {
        $scope.Lista_Tabla_Funcs = [];
        if (X != undefined) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
        }
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Obt_Listado_Funcs'
            }
        }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
                $scope.Lista_Tabla_Funcs = response.data;
                swal.close();
            } else {
                swal({
                    title: "¡Ocurrio un error!",
                    text: response.data,
                    type: "warning"
                }).catch(swal.noop);
            }
        })
    }

    $scope.Abrir_Modal_Funcs = function (X) {
        $('#modal_Gestion_Funcs').modal('open');
        angular.forEach(document.querySelectorAll('.Form_Funcsx input'), function (i) {
            i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.Form_Funcsx select'), function (i) {
            i.setAttribute("disabled", true);
        });
        $scope.Busqueda.Listado = null;
        $scope.Busqueda.Filtro = null;
        if (!X) {
            angular.forEach(document.querySelectorAll('.Form_Funcs input'), function (i) {
                i.removeAttribute("readonly");
            });
            angular.forEach(document.querySelectorAll('.Form_Funcs select'), function (i) {
                i.removeAttribute("disabled");
            });
            // $scope.
            $scope.Vista3 = {
                Nuevo: 'S',
                Filtrar_Sol: '',
                NumeroDoc: '',
                NombreUsu: '',
                Accion: '',
                Procesa: '',
                Estado: '',
                Visualizacion: '',
            };
        } else {
            angular.forEach(document.querySelectorAll('.Form_Funcs input'), function (i) {
                i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.Form_Funcs select'), function (i) {
                i.setAttribute("disabled", true);
            });
            $scope.Vista3 = {
                Nuevo: 'N',
                Filtrar_Sol: '',
                NumeroDoc: X.DOCUMENTO,
                NombreUsu: X.NOMBRE,
                Accion: X.ACCION,
                Procesa: (X.PROCESA == 'SI') ? 'S' : 'N',
                Estado: X.CODESTADO,
                Visualizacion: X.VISUALIZACION,
            };
        }
    }

    $scope.KeyFind_Funcs = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.Buscar_Funcs();
    }
    $scope.Buscar_Funcs = function () {
        if ($scope.Vista3.NombreUsu != null && $scope.Vista3.NombreUsu != '' && $scope.Vista3.NombreUsu.length > 3) {
            $http({
                method: 'POST',
                url: "php/cuentasmedicas/auditoriacuentas.php",
                data: {
                    function: 'Obt_Funcs',
                    Coincidencia: $scope.Vista3.NombreUsu.toUpperCase(),
                }
            }).then(function (response) {
                if (response.data.length == 1 && response.data.toString().substr(0, 3) != '<br') {
                    $scope.Vista3.NumeroDoc = response.data[0].DOCUMENTO;
                    $scope.FillTextbox_Listado_Funcs(response.data[0].DOCUMENTO, response.data[0].NOMBRE);
                    $scope.Busqueda.Listado = null;
                    $scope.Busqueda.Filtro = null;
                }
                if (response.data.length > 1 && response.data.toString().substr(0, 3) != '<br') {
                    $scope.Busqueda.Listado = response.data;
                    $scope.Busqueda.Filtro = response.data;
                    $('#list-group-func-nombreusu').css({ width: $('#Vista3_NombreUsu')[0].offsetWidth });
                }
                if (response.data.length == 0) {
                    swal({
                        title: "¡No se encontró ningún funcionario!",
                        type: "info",
                        timer: 1000
                    }).catch(swal.noop);
                }
            });
        } else {
            Materialize.toast('¡Digite el nombre del funcionario o coincidencia!', 1000); $('.toast').addClass('default-background-dark');
        }
    }
    $scope.Complete_Listado_Funcs = function (string) {
        if ($scope.Vista3.NombreUsu != undefined && string != undefined && $scope.Busqueda.Listado != null) {
            $('#list-group-func-nombreusu').css({ width: $('#Vista3_NombreUsu')[0].offsetWidth });
            var output = [];
            angular.forEach($scope.Busqueda.Listado, function (Listado) {
                if (Listado.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                    output.push({ "DOCUMENTO": Listado.DOCUMENTO, "NOMBRE": Listado.NOMBRE.toUpperCase() });
                }
            });
            $scope.Busqueda.Filtro = output;
        }
    }
    $scope.FillTextbox_Listado_Funcs = function (documento, nombre) {
        $scope.Vista3.NumeroDoc = documento;
        $scope.Vista3.NombreUsu = nombre;
        $scope.Busqueda.Filtro = null;
    }

    $scope.Guardar_Func = function (Accion) {
        angular.forEach(document.querySelectorAll('#modal_Gestion_Funcs .red-text'), function (i) {
            i.classList.remove('red-text');
        });
        var Campos_Empty = false;
        if ($scope.Vista3.NumeroDoc == undefined || $scope.Vista3.NumeroDoc == null || $scope.Vista3.NumeroDoc == '') {
            Campos_Empty = true; document.querySelector('#Vista3_NombreUsu_Label').classList.add('red-text');
        }
        if ($scope.Vista3.Accion == undefined || $scope.Vista3.Accion == null || $scope.Vista3.Accion == '') {
            Campos_Empty = true; document.querySelector('#Vista3_Accion_Label').classList.add('red-text');
        }
        if ($scope.Vista3.Procesa == undefined || $scope.Vista3.Procesa == null || $scope.Vista3.Procesa == '') {
            Campos_Empty = true; document.querySelector('#Vista3_Procesar_Label').classList.add('red-text');
        }
        if ($scope.Vista3.Estado == undefined || $scope.Vista3.Estado == null || $scope.Vista3.Estado == '') {
            Campos_Empty = true; document.querySelector('#Vista3_Estado_Label').classList.add('red-text');
        }
        if ($scope.Vista3.Visualizacion == undefined || $scope.Vista3.Visualizacion == null || $scope.Vista3.Visualizacion == '') {
            Campos_Empty = true; document.querySelector('#Vista3_Visualizacion_Label').classList.add('red-text');
        }
        if (Campos_Empty == false) {
            swal({ title: 'Cargando...' });
            swal.showLoading();
            $http({
                method: 'POST',
                url: "php/cuentasmedicas/auditoriacuentas.php",
                data: {
                    function: 'Guardar_Func',
                    Doc: $scope.Vista3.NumeroDoc,
                    Accion: $scope.Vista3.Accion,
                    Procesa: $scope.Vista3.Procesa,
                    Estado: $scope.Vista3.Estado,
                    Visualizacion: $scope.Vista3.Visualizacion,
                    Ced: $scope.Rol_Cedula
                }
            }).then(function (response) {
                if (response.data.Codigo != undefined && response.data.toString().substr(0, 3) != '<br') {
                    $scope.closeModal();
                    swal({
                        title: "¡Mensaje!",
                        text: response.data.Nombre,
                        type: "success",
                        timer: 1000
                    }).catch(swal.noop);
                    setTimeout(() => {
                        $scope.ObtenerListado_Funcs();
                    }, 1000);
                }
                if (response.data.length == 0) {
                    swal({
                        title: "¡Ocurrio un error!",
                        text: response.data.Nombre,
                        type: "warning",
                        timer: 1000
                    }).catch(swal.noop);
                }
            });




        }
    }
    /////////////////////////////////////////////////////Autorizaciones///////////////////////////////////////////////
    $scope.buscarAfiliado = function (tipodocumento, documento) {
        // swal({ title: 'Cargando...', allowOutsideClick: false });
        // swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
        }).then(function (response) {
            if (response.data.CODIGO != "0") {
                // swal.close();
                $scope.infoafiliadoautedit = [];
                $scope.infoafiliadoautedit = response.data;
                if ($scope.infoafiliadoautedit.EMPLEADOR) {
                    $scope.infoafiliadoautedit.EMPLEADOR = JSON.parse($scope.infoafiliadoautedit.EMPLEADOR);
                }
                $scope.afirownumI = 1;
                if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {
                    $scope.afirownumI = $scope.afirownumI + 1;
                }
                if ($scope.infoafiliadoautedit.TUTELA == 'true') {
                    $scope.afirownumI = $scope.afirownumI + 1;
                }
                if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {
                    $scope.afirownumI = $scope.afirownumI + 1;
                }
                if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {
                    $scope.afirownumI = $scope.afirownumI + 1;
                }
                if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {
                    $scope.afirownumI = $scope.afirownumI + 1;
                }
                $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
                $scope.sexoafitabI = $scope.infoafiliadoautedit.SexoCodigo;
                $scope.edadafitabI = $scope.infoafiliadoautedit.EdadDias;
                $scope.regimenafitabI = $scope.infoafiliadoautedit.CodigoRegimen;
                $scope.inactiveseccion1tab1 = true;
                $scope.inactiveseccion2tab1 = false;
                $scope.productosagregadostabI = [];
                $scope.datosAfiModalNov = $scope.infoafiliadoautedit;
                //
                var xFECHA_NACIMIENTO = $scope.infoafiliadoautedit.FechaNacimiento.toString().split('/');
                $scope.FECHA_NACIMIENTO  = new Date(xFECHA_NACIMIENTO[2] + '/' + xFECHA_NACIMIENTO[1] + '/' + xFECHA_NACIMIENTO[0]);
            } else {
                swal('Importante', response.data.NOMBRE, 'info')
            }
        });
    }

    $scope.calcularEdad = function (date) {
        var fecha = date.split("/").reverse().join("-");
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();
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
        var meses = 0;
        if (ahora_mes > mes)
            meses = ahora_mes - mes;
        if (ahora_mes < mes)
            meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
            meses = 11;
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
    /////////////////////////////////////////////////////Autorizaciones///////////////////////////////////////////////
    /////////////////////////////////////////////////////INFORMACION DEL AFILIADO///////////////////////////////////////////////
    $scope.buscarnovedades = function (tipodocumento, documento) {
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: {
                function: 'obtener_novedades', documento: documento,
                tipodocumento: tipodocumento
            }
        }).then(function (response) {
            $scope.novedades = response.data;
        })
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: {
                function: 'obtener_capita', documento: documento,
                tipodocumento: tipodocumento
            }
        }).then(function (response) {
            $scope.capita = response.data;
        })
    }


    $scope.buscardocumentos = function (tipodocumento, documento) {
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: {
                function: 'obtener_soportes', documento: documento,
                tipodocumento: tipodocumento
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
    /////////////////////////////////////////////////////INFORMACION DEL AFILIADO///////////////////////////////////////////////
    $scope.Consulta_Auts = function (documento) {
        $scope.listarAutorizaciones = [];
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
            data: {
                function: 'p_consulta_autorizaciones', documento: documento, numero: 0, ubicacion: 0
                , ips: 0
            }
        }).then(function (response) {
            if (response.data.info != undefined && response.data.info.CODIGO == '0') {
                swal('Importante', response.data.info.NOMBRE, 'info');
                $scope.listarAutorizaciones = [];
            } else {
                $scope.verAutorizaciones = false;
                swal.close();
                $scope.listarAutorizaciones = response.data.aut;

            }
        })
    }

    $scope.getTotal = function (aut) {
        $scope.autjulio = $scope.listarAutorizaciones.find(x => x.NUMERO === aut.NUMERO);
        var tempdetalle = $scope.autjulio.DETALLES;
        var sumtemp = 0;
        for (var i = 0; i < tempdetalle.length; i++) {
            if (tempdetalle[i].total != null) {
                sumtemp += parseFloat(tempdetalle[i].total);
            }
        }
        return $scope.FormatPesoNumero(sumtemp);
    }

    /////////////////////////////////////////////////////INFORMACION DE TUTELAS///////////////////////////////////////////////
    $scope.Consultar_Tutelas = function (tipo, doc) {
        $scope.Listar_Tutelas = {
            Array: [],
            Url: null
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Obtener_tutelas', tipodocumento: tipo, documento: doc
            }
        }).then(function (response) {
            if (response.data != '') {
                swal.close();
                $scope.Listar_Tutelas.Array = response.data;
            } else {
                swal.close();
            }
        });
    }

    $scope.Ver_Adjunto_Tut = function (RUTA) {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'descargaAdjunto', ruta: RUTA
            }
        }).then(function (response) {
            $scope.Listar_Tutelas.Url = "temp/" + response.data + "?page=hsn#toolbar=0";
        });
    }


    $scope.Consulta_Censos = function (tipo, doc) {
        $scope.Listar_censos = {
            Array: []
        };
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Consulta_Censos', tipodocumento: tipo, documento: doc
            }
        }).then(function (response) {
            if (response.data != '') {
                swal.close();
                $scope.Listar_censos.Array = response.data;
            } else {
                swal.close();
            }
        });
    }
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
    ///////////////////////////////////////////////////////
    $scope.Consulta_Financiera = function () {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.Listar_Financiera = {
            Todo: [],
            Pendientes: [],
            Filter_Pro: '',
            Procesados: [],
            Filter_Pen: '',
            Errores: [],
            Cant_error: 0,
            Cant_exitoso: 0,
            Cant_negado: 0,
        };
        $http({
            method: 'POST',
            url: "php/financiera/confirmacion.php",
            data: { function: 'obtenerpendientes', responsable: $scope.Rol_Cedula }
        }).then(function (response) {
            $scope.Listar_Financiera.Pendientes = response.data;
        })
        $http({
            method: 'POST',
            url: "php/financiera/confirmacion.php",
            data: { function: 'obtenerprocesados', responsable: $scope.Rol_Cedula }
        }).then(function (response) {
            $scope.Listar_Financiera.Todo = response.data;
            // $scope.Listar_Financiera.Procesados = response.data;
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].estado_documento == 'ERROR') {
                    $scope.Listar_Financiera.Cant_error++;
                    $scope.Listar_Financiera.Procesados.push(response.data[i]);
                } else if (response.data[i].estado_documento == 'PROCESADO') {
                    $scope.Listar_Financiera.Cant_exitoso++;
                } else {
                    $scope.Listar_Financiera.Cant_negado++;
                }
            }
        })
        swal.close();
    }

    $scope.Abrir_Modal_Financiera_Consulta = function (X) {
        if (X.tercero.toString().length != 0 && X.factura2.toString().length != 0 && X.ubicacion.toString().length != 0 && X.documento.toString().length != 0) {
            $('.modal').modal('close');
            $scope.Volver_Vistas();
            setTimeout(() => {
                // console.log(X);
                $scope.Vista1.Nit_Prestador = X.tercero.toString();
                $scope.Vista1.Num_Sol = X.factura2.toString();
                $scope.Vista1.Numero = (X.documento.toString() == 'FS') ? X.numero.toString() : X.numero2.toString();
                $scope.Vista1.Tipo = 'F';
                $scope.Vista1.Ubicacion = X.ubicacion.toString();
                $scope.Vista1.Documento = 'FS';
                $scope.Vista1_Buscar();
            }, 500);
        }
        // $scope.
        // $scope.Listar_Financiera.Errores = [];
        // $('#modal_Financiera_Errores').modal('open');
        // $http({
        //     method: 'POST',
        //     url: "php/financiera/confirmacion.php",
        //     data: { function: 'obtenererror', consecutivo: Cons }
        // }).then(function (response) {
        //     $scope.Listar_Financiera.Errores = response.data;
        // })
    }
    // $scope.Cerrar_Modal_Financiera_Errores = function () {
    //     $('#modal_Financiera_Errores').modal('close');
    // }

    $scope.Financiera_Filtro = function (estado) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $scope.Listar_Financiera.Procesados = [];
        setTimeout(() => {
            $scope.Listar_Financiera.Todo.forEach(e => {
                if (e.estado_documento == estado) {
                    $scope.Listar_Financiera.Procesados.push(e);
                }
            });
            swal.close();
            console.log($scope.Listar_Financiera.Procesados);
            $scope.$apply();
        }, 500);

    }

    $scope.Consultar_Historico_Facturas = function (tipo, doc) {
        $scope.Listar_Hist_Fact = {
            Array: []
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Obtener_Historico_Facturas', tipodocumento: tipo, documento: doc
            }
        }).then(function (response) {
            if (response.data != '') {
                swal.close();
                $scope.Listar_Hist_Fact.Array = response.data;
            } else {
                swal.close();
            }

        });
    }

    /////MODAL VER FACTURAS PENDIENTES GESTIONAR/////

    $scope.Btn_Gestionar_SoloGlosa = function () {
        if ($scope.HojaGest.ESTADO == 'P') {
            if ($scope.HojaGest.ESTADO_GLOSA == 'A' || $scope.HojaGest.ESTADO_GLOSA == null || $scope.HojaGest.ESTADO_GLOSA == "") { // Glosa Activa o sin Glosa
                if ($scope.HojaGest.DIAS_FACTURA <= 22 && $scope.Rol_Procesar == 'S') {
                    $scope.HojaGlosa_Edi_Mod = false;
                    $scope.Btn_Gestionar_Glosa = true;
                } else {
                    $scope.Btn_Gestionar_Glosa = false;
                }
            } else {
                $scope.Btn_Gestionar_Glosa = false;
            }
        } else {
            $scope.Btn_Gestionar_Glosa = false;
        }

        // if ($scope.HojaGest_Edi_Mod == true && ($scope.HojaGest.ESTADO_GLOSA == 'A' || $scope.HojaGest.ESTADO_GLOSA == null)) {
        //     $scope.Btn_Gestionar_Glosa = true;
        // }
    }


    //////////////////////////////////////////////////////////////////////////////////////
    // MODALS/////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    /////MODAL VER FACTURAS PENDIENTES GESTIONAR/////
    $scope.Abrir_Modal_Gestion_Factura = function () {
        $('#modal_Gestionar_Factura').modal('open');
        $timeout(function () { document.querySelector('#modal_Gestionar_Factura').style.top = 1 + '%'; }, 600);
    }
    $scope.Cerrar_Modal_Gestion_Factura = function () {
        $('#modal_Gestionar_Factura').modal('close');
    }
    /////MODAL VER FACTURAS PROCESADAS/////

    //////////////////////////////////////////////////////////////////////////////////////
    // FUNCIONES//////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    $scope.FormatSoloNumero = function (NID) {
        if (NID) {
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            valor = valor.replace(/\-/g, '');
            valor = valor.replace(/[a-zA-Z]/g, '');
            valor = valor.replace(/[^0-9]/g, '');
            valor = valor.replace(/\./g, '');
            input.value = valor;
        }
    }

    $scope.FormatPesoNumero = function (num) {
        if (num) {
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
        } else {
            return "0"
        }
    }

    $scope.FormatTextoObs = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor;
    }

    $scope.FormatPesoID = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/\-/g, '');
        valor = valor.replace(/[a-zA-Z]/g, '');
        valor = valor.replace(/[^0-9-,]/g, '');
        valor = valor.replace(/\./g, '');
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
    $scope.Volver_Vistas = function () {
        if ($scope.Vista.Activa == '2') {
            $scope.Vista.Activa = 1;
            document.querySelector('#Hoja1_Principal').classList.add('Ani_Down');
            $timeout(
                function () {
                    document.querySelector('#Hoja1_Principal').classList.remove('Ani_Down');
                }, 1000
            );
            // console.log(1);
        }
    }

    $scope.Volver_Vistas_Adm = function () {
        $scope.Vista.Activa = 1;
    }

    $scope.GetFecha = function (SCOPE) {
        var ahora_ano = $scope.HojaGest[SCOPE].getFullYear();
        var ahora_mes = ((($scope.HojaGest[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope.HojaGest[SCOPE].getMonth() + 1) : ($scope.HojaGest[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope.HojaGest[SCOPE].getDate()) < 10) ? '0' + ($scope.HojaGest[SCOPE].getDate()) : ($scope.HojaGest[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
    }
    /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
    $scope.chg_filtrar = function () {
        $scope.filter($scope.Vista2.Filtrar_Sol);
    }
    $scope.initPaginacion = function (info) {
        $scope.Vista2_listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
            $scope.pageSize = $scope.Vista2_listDatosTemp.length;
            $scope.valmaxpag = $scope.Vista2_listDatosTemp.length;
        } else {
            $scope.pageSize = valor;
            $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
            $scope.Vista2_listDatosTemp = $filter('filter')($scope.Vista2_datos, val);
            $scope.configPages();
            $scope.Filter_Val = val;
        } else {
            $scope.Vista2_listDatosTemp = $filter('filter')($scope.Vista2_datos, '');
            $scope.configPages();
            $scope.Filter_Val = '';
        }
    }
    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
                if (($scope.pageSize * 10) < $scope.Vista2_listDatosTemp.length) {
                    fin = 10;
                } else {
                    fin = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize);
                }
            }
            else { fin = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize); }
        } else {
            if (ini >= Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.Vista2_listDatosTemp.length / $scope.pageSize);
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
        if ($scope.Vista2_listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize);
        } else {
            var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize) + 1;
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
            if ($scope.Vista2_listDatosTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.Vista2_listDatosTemp.length / $scope.pageSize) + 1;
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
    $scope.propertyName = 'NUMERO';
    $scope.reverse = true;
    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
    $scope.closeModal = function () {
        $('.modal').modal('close');
    }
    /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////

    /////////////////////////////////////////SELECTS/////////////////////////////////////////////////

    $scope.KeyFind_Enter = function (keyEvent, LIST, HOJA, MODEL) {
        if ($scope.List_Select[LIST].Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope.List_Select[LIST].Seleccion = $scope.List_Select[LIST].Seleccion >= ($scope.List_Select[LIST].Filtro.length - 1) ? 0 : $scope.List_Select[LIST].Seleccion + 1;
                document.querySelector('.Clase_UL_' + LIST).scrollTo(0, document.querySelector('#' + LIST + '' + $scope.List_Select[LIST].Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope.List_Select[LIST].Seleccion = $scope.List_Select[LIST].Seleccion <= 0 || $scope.List_Select[LIST].Seleccion == 9999 ? $scope.List_Select[LIST].Filtro.length - 1 : $scope.List_Select[LIST].Seleccion - 1;
                document.querySelector('.Clase_UL_' + LIST).scrollTo(0, document.querySelector('#' + LIST + '' + $scope.List_Select[LIST].Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope.List_Select[LIST].Seleccion != 9999) {
                $scope.FillTextbox($scope.List_Select[LIST].Filtro[$scope.List_Select[LIST].Seleccion].CODIGO, $scope.List_Select[LIST].Filtro[$scope.List_Select[LIST].Seleccion].NOMBRE, LIST, HOJA, MODEL);
            }
        }
        // if (keyEvent.which === 13) {
        //     if ($scope.List_Select[LIST].Filtro.length == 1) {
        //         $scope.FillTextbox($scope.List_Select[LIST].Filtro[0].CODIGO, $scope.List_Select[LIST].Filtro[0].NOMBRE, LIST, HOJA, MODEL);
        //     }
        // }
    }

    $scope.Complete = function (keyEvent, string, ID, LIST, HOJA, MODEL) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if (string != undefined && $scope.List_Select[LIST].Listado != undefined && $scope[HOJA][MODEL] != undefined) {
                $('.Clase_UL' + LIST).css({ width: $('#' + ID)[0].offsetWidth });
                var output = [];
                angular.forEach($scope.List_Select[LIST].Listado, function (x) {
                    if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
                    }
                });
                $scope.List_Select[LIST].Filtro = output;
                $scope.List_Select[LIST].Seleccion = 9999;
            }
        }
    }
    // HOJA = Hoja a la que pertenece // MODEL = NGmodel pa guardar el Texto visual // MODAL_COD = NGmodel donde se guardara el cod que se enviara a bd
    $scope.FillTextbox = function (codigo, nombre, LIST, HOJA, MODEL) {
        $scope[HOJA][MODEL + '_COD'] = codigo;
        $scope[HOJA][MODEL] = codigo + ' - ' + nombre;
        $scope.List_Select[LIST].SAVE = codigo + ' - ' + nombre;
        $scope.List_Select[LIST].Filtro = null;
    }

    $scope.BlurText = function (LIST, HOJA, MODEL) {
        $timeout(function () {
            if ($scope[HOJA]) {
                if ($scope[HOJA][MODEL] != null && $scope[HOJA][MODEL] != undefined) {
                    if ($scope[HOJA][MODEL] != $scope.List_Select[LIST].SAVE && $scope.List_Select[LIST].SAVE != null) {
                        $scope[HOJA][MODEL] = $scope.List_Select[LIST].SAVE;
                        $scope.List_Select[LIST].Filtro = null;
                    }
                    $scope.List_Select[LIST].Filtro = null;
                }
            }
        }, 300);
    }

    $scope.ViewList = function (ID, LIST) {
        if (LIST == "TipoFacturas" && $scope.HojaGest.ESTADO == 'P') { return; }
        $('.Clase_UL' + LIST).css({ width: $('#' + ID)[0].offsetWidth });
        $scope.List_Select[LIST].Filtro = $scope.List_Select[LIST].Listado;
    }

    $scope.Ver_Glosa_Informacion = function (x) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriacuentas.php",
            data: {
                function: 'Vista2_List_Glosa_Factura',
                Num: x.NUMERO.toString(),
                Ubi: x.UBICACION.toString()
            }
        }).then(function (response) {
            if (response.data) {
                if (response.data.length == 0 || response.data[0].Codigo != undefined) {
                    if (response.data.length == 0) {
                        $scope.Array_ListadoGlosas = [];
                        swal({
                            title: "¡No se encontraron glosas!",
                            type: "info"
                        }).catch(swal.noop);
                    }else {
                        $scope.Array_ListadoGlosas = [];
                        swal({
                            title: "¡No se encontraron glosas!",
                            text: response.data.Mensaje,
                            type: "info"
                        }).catch(swal.noop);
                    }
                    } else {
                        $scope.Array_ListadoGlosas = response.data;
                        $('#modal_Listado_Glosas').modal('open');
                        swal.close();
                    }
                }
            })
        // swal({
        //     title: 'Información de la Glosa',
        //     input: 'textarea',
        //     inputValue: x.DETALLE_GLOSA,
        //     showCancelButton: true,
        //     cancelButtonText: 'Cerrar',
        //     showConfirmButton: false,
        //     customClass: 'swal-wide'
        // }).then(function (result) {
        //     $(".confirm").attr('disabled', 'disabled');
        // }).catch(swal.noop);
        // document.querySelector('.swal2-textarea').setAttribute("readonly", true);
        // document.querySelector('.swal2-textarea').style.height = '300px';
    }

    /////////////////////////////////////////SELECTS/////////////////////////////////////////////////
    /////////////////////////////////////////STYLOS/////////////////////////////////////////////////
    $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado != undefined) {
            if (Estado.toString().toUpperCase() == 'A') {
                return { "background-color": "rgb(251, 93, 1) !important;" }
                // return { "background-color": "rgb(218, 203, 19) !important;" }
                // return { "background-color": "rgb(6, 152, 20) !important;" }
            }
            if (Estado.toString().toUpperCase() == 'P') {
                return { "background-color": "rgb(6, 152, 20)!important" }
                // return { "background-color": "rgb(71, 71, 165)!important" }
            }
            if (Estado.toString().toUpperCase() == 'PP') {
                return { "background-color": "rgb(251, 93, 1)!important" }
            }
            if (Estado.toString().toUpperCase() == 'D') {
                return { "background-color": "rgb(235, 156, 5) !important;" }
            }
            if (Estado.toString().toUpperCase() == 'X') {
                return { "background-color": "rgb(245, 75,75) !important" }
            }
            if (Estado == null) {
                return { "background-color": "rgb(161, 169, 162) !important" }
            }
            return { "background-color": "rgb(161, 169, 162) !important" }
        } else {
            return { "background-color": "rgb(161, 169, 162) !important" }
        }
    }

    $scope.Estado_Solicitud_Color_Contrato = function (Estado) {
        if (Estado != undefined) {
            if (Estado.toString().toUpperCase() == 'ACTIVO') {
                return { "background-color": "rgb(6, 152, 20) !important;" }
            }
            if (Estado.toString().toUpperCase() == 'PROCESADO') {
                return { "background-color": "rgb(71, 71, 165)!important" }
            }
            if (Estado.toString().toUpperCase() == 'LIQUIDADO') {
                return { "background-color": "rgb(235, 156, 5) !important;" }
            }
            if (Estado.toString().toUpperCase() == 'ANULADO') {
                return { "background-color": "rgb(245, 75,75) !important" }
            }
            if (Estado.toString().toUpperCase() == 'TERMINADO') {
                return { "background-color": "rgb(161, 169, 162) !important" }
            }
        }
    }

    $scope.Estado_Solicitud_Clase = function (Estado) {
        if (Estado.toString().toUpperCase() == 'A' || Estado.toString() == '1') {
            return "Con_pulse_A"
        }
        if (Estado.toString().toUpperCase() == 'P' || Estado.toString() == '2') {
            return "Con_pulse_P"
        }
        if (Estado.toString().toUpperCase() == 'X' || Estado.toString() == '3') {
            return "Con_pulse_X"
        }
    }

    //Nuevo
     $scope.searcocr = null;
    $scope.busquedaOCR = function (params) {
        console.log(params);
        $scope.listocr = [];
        // $scope.listocr = {
        //     "responseHeader": {
        //         "status": 0,
        //         "QTime": 2120,
        //         "params": {
        //             "q": "lumbago no especificado",
        //             "hl": "on",
        //             "fq": ["N_Factura:F7630",
        //                 "N_ID_prestador_salud:802009806",
        //                 "N_Recibo_RIPS:2246"],
        //             "hl.fl": "contenido"
        //         }
        //     },
        //     "response": {
        //         "numFound": 30, "start": 0, "docs": [
        //             {
        //                 "id": "9962c44a-b1f1-4ed7-8e28-4bcc1ed7c97f",
        //                 "documentoId": "2693",
        //                 "pagina": "5",
        //                 "N_Factura": "F7774",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": "Administradora: CAJACOPI EPS Paciente: CC 8508310 - DARWIN ENRIQUE NIEBLES PACHECO\n\n \n\n \n\n' REGISTRO CLINICO DE URGENCIA '\n\n \n\n \n\n \n\n \n\n \n\nAbdomen: Normal\nPiel y faneras: Piel y faneras normal\nGenito - urinario: Normal\nExtremidades: Anormal LASSAGE POSITIVO BILATERAL\nSistema nervioso central: Anormal LASSAGE POSITIVO BILATERAL\nConciliacion medicamentosa: NO\n\nOBSERVACIONES Y RESULTADOS DE PARACLINICOS\n\nANALISIS\n\nFinalidad de la consulta: No Aplica\nCausa externa: Enfermedad general : :\nTipo de diagnóstico principal: Impresión diagnóstica O\nDiagnóstico principal: M545 - LUMBAGO NO ESPECIFICADO Cd\nDiagnóstico relacionado 1: M545 - LUMBAGO NO ESPECIFICADO , : :\nPlan de Tratamiento: VOM ,\nAnálisis: Normal .\nRecomendaciones:\nDestino del Paciente: Observación\n\nOu Qin ON\nEMA GUTIERREZ CERVANTEZ o\nMEDICINA GENERAL\n\n1080010726\n\n \n\n \n\nye\n\n \n\n \n\n \n\n \n",
        //                 "_version_": 1709173256937799680
        //             },
        //             {
        //                 "id": "2adfc35c-c3fa-4056-b677-5cb36e97d6d1",
        //                 "documentoId": "2643",
        //                 "pagina": "3",
        //                 "N_Factura": "F7630",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": " \n\n* Administradora: CAJACOPI EPS\n\nCráneo, cara y cuello:\nTórax:\n\nAbdomen:\n\nPiel y faneras:\nGenito - urinario:\n\nExtremidades:\n\nSistema nervioso central:\n\nConciliacion medicamentosa:\n\nX\n\nFinalidad de la consulta:\nCausa externa:\n\nTipo de diagnóstico principal:\n\nDiagnóstico principal:\nDiagnóstico relacionado 1:\nDiagnóstico relacionado 2:\n\nPaciente: CC 85260807 - CARLOS ANDRES CHARRIS MURIELES\nREGISTRO CLÍNICO DE URGENCIA\n\nNormal.\n“SIMETRICO CON BUENA EXPANSIBILIDAD CON RSCRS SIN SOPLOS,PULMONES CLAROS CON MURMULLO\n\nVESICULAR PRESENTE NO AGREGAOS\nABDOMEN BLANDO, NO SE PALPAN MASAS, NO DOLOROSO Y SIN SIGNOS DE IRRITACION PERITONEAL,\nNO SE AUSCULTAN SOPLOS, PERISTALTISMO PRESENTE. PUÑO PERCUSION RENAL DUDOSA BILATERAL\nNormal\n\nNo revisado :\n\nSIMETRICAS SIN EDEMAS CON PRESENCIA DE DOLOR A LA PALPACION A NIVEL DE L1, L2, L3,, S1, S2, S3\nCON LASEGUE POSITIVO A 90 GRADOS\nSIMETRICAS SIN EDEMAS CON PRESENCIA DE DOLOR A LA PALPACION A NIVEL DE L1, L2, L3,, S1, S2, S3\n\nCON LASEGUE POSITIVO A 90 GRADOS\n\nNO\n\nOBSERVACIONES Y RESULTADOS DE PARACLÍNICOS\n\nANALISIS\nNo Aplica. Ml\nEnfermedad general\nImpresión diagnóstica\nM545 - LUMBAGO NO ESPECIFICADO\nN390 - INFECCION DE VIAS URINARIAS, SITO NO ESPECIFICADO??\nN23X - COLICO RENAL, NO ESPECIFICADO???\n\nPlan de Tratamiento: OBSERVACION\nAnálisis: Normal\nRecomendaciones:\n\nDestino del Paciente: Observación\n\n  \n\nCENA -,\nPE E)\n\n \n\nZJ\n\n7\n\nDANIANA MENDOZA MALDONADO\n\nMEDICINA GENERAL.\n0226-05\n",
        //                 "_version_": 1709173412599955456
        //             },
        //             {
        //                 "id": "1b05199b-d448-4854-bba8-40844c00a3d3",
        //                 "documentoId": "2703",
        //                 "pagina": "3",
        //                 "N_Factura": "F7775",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": "Administradora: CAJACOPI EPS\n\n \n\npr A\n\nPaciente: CC 72052430 - MLLER DE JESUS CARRILLO CARRILLO\n\n \n\nREGISTRO CLÍNICO DE URGENCIA\n\n \n\nCráneo, cará y cuello: Normal .\nTórax: Normal o\nAbdomen: Normal Tr\nPiel y faneras: Normal\nGenito - urinario: No revisado s\nExtremidades: ! Normal\nSistema nervioso central: Normal\nConciliacion medicamentosa: NO\nOBSERVACIONES Y RESULTADOS DE PARACLINICOS\n\n \n\n \n\nANALISIS\n\n \n\nFinalidad de la consulta:\nCausa externa:\n\nTipo de diagnóstico principal:\n\nDiagnóstico principal:\nDiagnóstico relacionado 1:\n\nPlan de Tratamiento:\n\nDetección de alteraciones del Adulto\n\nEnfermedad general\n\nImpresión diagnóstica\n\nN209 - CALCULO URINARIO, NO ESPECIFICADO\n\nN390 - INFECCION DE VIAS URINARIAS, SITIO NO ESPECIFICADO\nOBSERVACION\n\nLEV 80 CC/ HORA\n\nDICLOFENACO AMP 75 MG IV\n\nDEXAMEASONA AMP 8 MG IV\n\nSE SOLICITA UROANALISIS.\n\nPACIENTE MASCULKINO QUIEN NINGRESA CON CUADRO 'CLINICO DE 24 HORAS DE EVOLUCION\nAnálisis: CARACTERIZADO POR DISURIA, CRIODIAFORESIS, DOLOR EN REGION LUMBAR, PACIETE CON PUÑO\nPERFUSION POSUTIVO AL EXAMEN FISICO. MOTIVO POR EL CUAL INGRESA. SE DECIDE INGRESA R A\nOBSERVACION PARA MANEJO ANALGESICO\n\nRecomendaciones:\n\nDestino del Paciente: Observación\n\n= ¿ue Ránen\n\nSOPHIA PELAEZ BONETT\nON MEDICINA GENERAL\nAS : 1048318282\n\n \n",
        //                 "_version_": 1709173863759216640
        //             },
        //             {
        //                 "id": "ae0cfd93-5740-481a-826d-a658f4cb1b40",
        //                 "documentoId": "2596",
        //                 "pagina": "4",
        //                 "N_Factura": "F7383",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": " \n\n \n\n \n \n\n \n\nFecha de Impresión: 03/01/2021 11:56:22 a. m:. . Fecha de Atención: 03/01/2021 07:32 ! Admisión: AD345742\nAdministradora: CAJACOPI EPS Paciente: RAFAEL ENRIQUE VALDEZ OSPINO o * \"\n\n \n\n \n\nj REGISTRO CLÍNICO DE URGENCIA o a]\n\n \n\n \n\n \n\n \n\n \n\nTórax: Normal\nAbdomen: . Normal\nPiel y faneras: Normal\nGenito.- urinario: Normal\nExtremidades: Normal\nSistema nervioso central: Normal\nConciliacion medicamentosa: NINGUNA\n\n. OBSERVACIONES Y RESULTADOS DE PARACLINICOS\nNINGUNA\n\nANALISIS\n\nFinalidad de la consulta: No Aplica\nCausa externa: Enfermedad general\nTipo de diagnóstico principal: Impresión diagnóstica\nDiagnóstico principal: N23X - COLICO RENAL, NO ESPECIFICADO\nDiagnóstico relacionado 1: Z000 - EXAMEN MEDICO GENERAL\nPlan de Tratamiento: .\nAnálisis: Normal\nRecomendaciones:\nDestino del Paciente: Observación\n\na\n\n \n\n \n\nROYSER VASQUEZ TORREGROS\nMEDICINA GENERAL\n1045709553 «\n\n \n\n \n",
        //                 "_version_": 1709173324770181120
        //             },
        //             {
        //                 "id": "383563c7-eef9-4a61-a4f9-277624edbc9e",
        //                 "documentoId": "2555",
        //                 "pagina": "3",
        //                 "N_Factura": "F6930",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": "Administradora: CAJACOPI EPS Paciente: CC 72165615 - HUGO SEGUNDO GUZMAN GUTIERREZ .\n\n \n\n \n\n \n\n \n\nREGISTRO CLINICO DE URGENCIA\n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\nCráneo, cara y cuello: Normal\n\nTórax: “2 Normal\n\nAbdomen: Normal\n\nPiel y faneras: Normal\n\nGenito - urinario: Normal\n\nExtremidades: SIMETRICAS CON EDEMA GRADO 2 EN MIEMBROS INFERIORES\n. Sistema nervioso central: SIMETRICAS CON EDEMA GRADO 2 EN MIEMBROS INFERIORES\n Conciliacion medicamentosa: NO\n\nOBSERVACIONES Y RESULTADOS DE PARACLINICOS\nANALISIS\n\nFinalidad de la consulta: No Aplica\n\nCausa externa: Enfermedad general\n\nTipo de diagnóstico principal: Impresión diagnóstica\n\nDiagnóstico principal: R609 - EDEMA, NO ESPECIFICADO\n\nDiagnóstico relacionado 1: 2000 - EXAMEN MEDICO GENERAL\n\nPlan de Tratamiento: VER\n\nPACIENTE MASCULINO QUIEJ INGRESA AL SERVICIO DE URGENCIAS REFIRIENDO CUADRO CLÍNICO DE 15 Días | .\n\nDE EVOLUCION EXACERVADO EN LAS ULTIJAS HORAS DADO POR EDEMA EM AMBOS MIEMBROS INFERIORES A\n\n     \n\nAnálisió? : SIN CAUSA APARENTE NIEGA SINTOMATOLOGIA URINARIA NIEGA DOLOR PRECORDIAL NIEGA OTRA\nSINTOMATOLOGIA MOTIVO POR EL CUAL CONSULTA AL EXAMEN FISICO EXTREMIDADES SIMETRICAS CON:\nEDEMA GRADO 2 EN MIEMBROS INFERIORES SE DECIDE INGRSAR PAAR MAEJO MEDICO\nRecomendaciones:\n_ Destino del Paciente: Observación\n\n \n\n \n\n \n\n \n\n \n\nELIZABATH PLAZA BARRAZA\nMEDICINA GENERAL\n1041897051 :\n\nE\n\n \n\n \n",
        //                 "_version_": 1709173408765313024
        //             },
        //             {
        //                 "id": "23eca211-d837-427d-acc8-284dca7b06f4",
        //                 "documentoId": "2570",
        //                 "pagina": "3",
        //                 "N_Factura": "F7183",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": "Identificación Interna: 802009806\nCód. Habilitación: 084330015101\nDirección: Calle 10 C2 AA No, 23-93 Malambo, Atlantico 0DOA Teléfono: 3162213\n\n \n\n \n\n \n\n \n\n,\nINFORMACION GENERAL .\nFecha de Impresión: 18/01/2021 01:07 b Fecha de Atención: 17/01/2021 22:02 * Impreso por: mprueba\nCentro de atención: 01 - SEDE PRINCIPAL > Admisión: AD352129\nPaciente: CC 1140844205 - WENDY PATRICIA ILLAFADE CUELLO , Sexo: F\nFecha de Nacimiento: 20/09/1991 Edad: 29 año(s), 3 mes(es) 28 dia(s) Estado Civil: Otro\nReligión: Creencia: .\nRégimen: 1 - Contributivo Nivel: 1 Carnet: 1912\nDirección: MALANBO\nTeléfono: Lugar: Malambo Atlántico\nOcupación: 9999: PERSONA QUE NO HA DECLARADO OCUPACIÓN\nAcompañante:\nTeléfono Acomp.: Parentesco Acomp.:\nDirección Acomp.:\nResponsable: '\nTeléfono Resp.: Parentesco Resp.:\nDirección Resp.: !\nMédico Tratante: DANIANA MENDOZA MALDONADO Especialidad: VEDICINA GENERAL\nL_Administradora: CAJACOPI EPS Tipo Vinculación: Cotizante\n\n \n\n \n\n \n\n \n\n \n\nNOTAS DE URGENCIA )\nDESCRIPCION DE LA NOTA ¿\n\nPACIENTE\nACTUALMENTE HIDRATADO, TOLERANADO VIA ORAMATURANDO ADECUADAMENTE A AIRE AMBIENTE, AFEBRII\nSIN SIGNOS DE SIRS O\n\nDIFICULTAD RESPIRATORIA, SIN HALLAZGOS POSITIVOS AL EXAMEN FISICO. POR CUADRO\n\nCLÍNICO Y HALLAZGOS AL EXAMEN FISICO SE CONSIDERA IMPRESIÓN DIAGNOSTICA\n\nANOTADOS POR LO QUE SE DECIDE EGRESO\n\nHOSPITALARIO PARA REALIZAR MANEJO MEDICO EN CASA CON FORMULA MEDICA\n\nRECOMENDACIONES PARA CUIDADOS DOMICILIARIOS, SIGNOS Y SINTOMAS DE ALARMA, CITA\n\nCONTROL POR CONSULTA EXTERNA. SE LE EXPLICA A FAMILIAR DE IMPRESIÓN DIAGNOSTICA\n\nY MANEJO, SE ACLARAN DUDAS, FAMILIAR ,\nREFIERE ENTEDER Y ACEPTAR CONDUCTA MEDICA.\n\nALTA\n\nMEDICA CON FORMULA Y RECOMENDACIONES.\nFecha y Hora de Ingreso: 17/01/2021 21:03 Autorización: SALIDA\nFecha y Hora de Egreso: 17/01/2021 22:01 Causa Externa: 13/13 - Enfermedad general\nEstado de Salida: OJO - Vivo Destino del Usuario a la Salida: 111 - Ata de Urgencia\nDiagnóstico Principal: R074: DOLOR EN EL PECHO, NO ESPECIFICADO\nDiagnóstico Relacionado 1: F408: OTROS TRASTORNOS FOBICOS DE ANSIEDAD\n\nObservación:\n\nSALIDA\n\n \n\nDANIANA MENDOZA MALDONADO\nMEDICINA GENERAL\n0226-05\n",
        //                 "_version_": 1709173377832321024
        //             },
        //             {
        //                 "id": "cabdbd47-5912-43d8-b93b-f61f7b187738",
        //                 "documentoId": "2631",
        //                 "pagina": "1",
        //                 "N_Factura": "F7625",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": " \n\n.*\n\nIdentificación Interna: 802009806\nCód. Habilitación: 084330015101\nDirección: Calle 10 C2 AA No. 23-93 Malambo, Atlantico ODOA Teléfono: 3162213\n\nY\n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\na INFORMACIÓN GENERAL\nFecha de Impresión: 28/01/2021 16:21 SN , Fecha de Atención: 28/01/2021 12:36 Impreso por: apadilla\nCentro de atención: 01 - SEDE PRINCIPAL Admisión: AD358953\nPaciente: CC 32583462 - PETRA TORRES FUENTES Sexo: F o\nFecha de Nacimiento: 15/04/1984 Edad: 36 año(s), 9 mes(es) 13 dia(s) Estado Civil: Separado\nReligión: Creencia:\nRégimen: 1 - Contributivo Nivel: 1 Carnet: 4059\nDirección: caracoli\nTeléfono: 3137249936 Lugar: Malambo Atlántico\nOcupación: 9999: PERSONA QUE NO HA DECLARADO OCUPACIÓN\nAcompañante: : |\nTeléfono Acomp.: Parentesco Ácomp.: , |\nDirección Acomp.: |\nResponsable: ,\nTeléfono Resp.: Parentesco Resp.:\nDirección Resp.:\nMédico Tratante: DANIANA MENDOZA MALDONADO Especialidad: MEDICINA GENERAL\nL_ Administradora: CAJACOPI EPS Tipo Vinculación: Cotizante )\n( REGISTRO CLÍNICO DE URGENCIA )\n( DATOS DE LA CONSULTA ol\nRemitido: Contra referencia: No\nTipo de Consulta: CONSULTA DE PRIMERA VEZ\nPlan / Administradora: CAJACOPI EPS / CAJACOPI COVID19 SUBSIDIADO\nGlasgow: 15 Valoración: _ Alerta Triage: 1 _\nMOTIVO DE LA CONSULTA |\nDOLRO DE CABEZA\nENFERMEDAD ACTUAL\nPACIENTE FEMENINA DE 36 AÑOS DE EDAD CON CUADRO CLINICO DE 4 DIAS DE EVOLUCION CARACTERIZADO POR PRESENTAR CEFALEA\nGLOBAL DE ALTA INTENSIDAD EN LA ESCALA DEL DOLOR Y MAREOS POR LO CUAL CONSULTA\nSistema respiratorio:\n| ANTECEDENTES\n1. Patológicos (HTA, Diabetes):\n2. Quirúrgicos:\n3. Hospitalarios:\n4. Transfusionales:\n5. Tóxico-Alérgicos:\n6. Farmacológicos:\n7. Gineco-Obstétricos:\n8. Traumáticos:\n9. Otros:\n10. Alergia-toxicidad a medicamentos:\n| FAMILIARES\nNA\nGINECOLÓGICOS ]\nMenarquia:\nUltima Menstruación:\nUltimo Parto:\nCitología:\nGestación: 0 Paridad: 0 Aborto: 0 Cesárea: 0 Vivos: 0\nEsta Embarazada: No\n| VARIABLES 4505 1\nVariables 4505\nFecha Probable de Parto 01/01/1845\nFecha Toma de Hemoglobina 01/01/1845\nHemoglobina 0\nFecha de la Toma de Glicemia Basal 01/01/1845\nTratamiento para Sífilis Congénita 0\nRiesgos\nHipertensión Inducida por la Gestación No\nSintomático Respiratorio No\nTuberculosis Multidrogoresistente No\nObesidad o Desnutrición Proteico Calórica No\nVíctima de Maltrato No\nVíctima de Violencia Sexual No\n| Cáncer de Cérvix No\n| | REVISIÓN POR SISTEMA\nSistema afectado: NA\n\n \n",
        //                 "_version_": 1709173240595742720
        //             },
        //             {
        //                 "id": "fc3849c2-f4cf-4778-9865-1de05bd42527",
        //                 "documentoId": "2669",
        //                 "pagina": "3",
        //                 "N_Factura": "F7706",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": "Identificación Interna: 802009806\nCód. Habilitación: 084330015101\nDirección: Calle 10 C2 AA No, 23-93 Malambo, Atlantico O0DOA Teléfono: 3162213\n\n \n\nINFORMACIÓN GENERAL\nFecha de Impresión: 31/01/2021 16:02 Fecha de Atención: 31/01/2021 07:44\nCentro de atención: 01 - SEDE PRINCIPAL Admisión: AD359893\nPaciente: CC 1129515691 - JOSE VUCENTE BARROZO BELTRAN\nFecha de Nacimiento: 01/05/1986 Edad: 34 año(s), 8 mes(es) 30 dia(s)\nReligión: Creencia:\nRégimen: 1 - Contributivo Nivel: 1\nDirección: NO SE SABE LA DIRRECCON\nTeléfono:\nOcupación:\nAcompañante:\nTeléfono Acomp.:\nDirección Acomp.:\nResponsable:\nTeléfono Resp.:\nDirección Resp.:\nMédico Tratante: CAROLY STEFFANY CASTILLO COLL\nAdministradora: CAJACOPI EPS\n\nimpreso por: EFPRUEBA\n\nSexo: M\nEstado Civil: Soltero\n\nCarnet:\n\nLugar: Malambo Atlántico\n\nParentesco Acomp.:\n\nParentesco Resp.:\nEspecialidad: MEDICINA GENERAL\n\n \n\nr\n\nTipo Vinculación: Cotizante\n\n \n\n \n\n \n\n( REGISTRO CLÍNICO DE URGENCIA\n| DATOS DE LA CONSULTA |\nRemitido: Contra referencia: No\n\nTipo de Consulta:\nPlan / Administradora:\nGlasgow: 15\n\nCONSULTA DE PRIMERA VEZ\nCAJACOPI EPS / CAJACOPI CONTRIBUTIVO-EVENTOS\nValoración: Alerta\n\nMOTIVO DE LA CONSULTA\n\nTriage: 1\n\n\" ME DA MUCHO DOLOR DE CABEZA ”\nENFERMEDAD ACTUAL\n\nPACIENTE MASCULINO DE 34 AÑOS DE EDAD, SIN ANTECEDENTES DE IMPORTANCIA , REFIERE CUADRO CLINICO DE APROXIMADAMENTE 2\n\nDIAS DE EVOLUCIÓN CARACTERIZADO POR CEFALEA DE PREDOMINIO PARIETAL IZQUIERDO , NIEGA MAREO , NIEGA NAUSEAS , QUE NO\nMEJORA A LA INGESTA DE ANALAGESIA ORAL , NIEGA SINTOMA ASOCIADO MOTIVO POR EL CUAL CONSULTA.\nSistema respiratorio: No\n\n \n\nANTECEDENTES\n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n1. Patológicos (HTA, Diabetes):\n2. Quirúrgicos:\n3. Hospitalarios:\n4, Transfusionales:\n5. Tóxico-Alérgicos:\n6. Farmacológicos:\n7. Gineco-Obstétricos:\n8. Traumáticos:\n9, Otros: -\n10. Alergia-toxicidad a. medicamentos: :\n| FAMILIARES\nNIEGA\n[ VARIABLES 4505 |\nVariables 4505\nFecha Probable de Parto 01/01/1845\nFecha Toma de Hemoglobina 01/01/1845\nHemoglobina : 0\nFecha de la Toma de Glicemia Basal 01/01/1845\nTratamiento para Sífilis Congénita 0\nRiesgos\nHipertensión Inducida por la Gestación No aplica\nSintomático Respiratorio No\nTuberculosis Multidrogoresistente No\nObesidad o Desnutrición Proteico Calórica No\nVíctima de Maltrato No\nVíctima de Violencia Sexual No\nCáncer de Cérvix No aplica\n\n \n\na\n\nSistema afectado:\n\nREVISIÓN POR SISTEMA\nLO REFERIDO EN LA ENFERMEDAD ACTUAL\n\nEXAMENES FISICOS\n\n \n\nF.Cardiaca: 78 xMin Temperatura: 36.8 *C F.Respiratorias: 20 xMin\nPeso: 1 kg Talla : tm Presión Sistólica: 100 minHg\nIMC: 1 Kg/m? SMC: 0.2 m2 Perímetro Cefálico:\n\nPerimetro Torácico: Presión Arterial Media: 73.33 mmHg Presión Diastólica: 60 mmHg\nApariencia: Normal\n\n \n\n \n",
        //                 "_version_": 1709173324770181121
        //             },
        //             {
        //                 "id": "68aee5e2-632a-40d2-a04d-c33256c7676a",
        //                 "documentoId": "2693",
        //                 "pagina": "3",
        //                 "N_Factura": "F7774",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": " \n\n \n\nFecha de Impresión: 05/01/2021 09:17\nCentro de atención: 01 - SEDE PRINCIPAL\n\nFecha de Nacimiento: 09/02/1980\n\n \n\nIdentificación Interna: 802009806\nCód. Habilitación: 084330015101\n\nDirección: Calle 10 C2 AA No. 23-93 Malambo, Atlantico ODOA Teléfono: 3162213\n\n4\nINFORMACION GENERAL\n\nFecha de Atención: 05/01/2021 04:57\nAdmisión: AD346618\n\nPaciente: CC 8508310 - DARWIN ENRIQUE NIEBLES PACHECO\n\nEdad: 40 año(s). 10 mes(es) 27 dia(s)\n\n  \n\nImpreso por: EFPRUEBA\n\nSexo: M\nEstado Civil: Otro\n\n \n\n \n\n \n\n \n\n \n\n \n\nReligión: Creencia:\n\nRégimen: 2 - Subsidiado Nivel: 1 Carnet: 4146.\n\nDirección: 2000000000000000X%\n\nTeléfono: Lugar:\n\nOcupación: 9999: PERSONAQUE NO HA DECLARADO OCUPACIÓN\n\nAcompañante:\n\nTeléfono Acomp.: Parentesco ÁAcomp.:\n\nDirección Acomp.:\n\nResponsable:\n\nTeléfeno Resp.: Parentesco Resp.:\n\nDirección Resp.:\n\nMédico Tratante: EMA GUTIERREZ CERVANTEZ Especialidad: MEDICINA GENERAL\n\nAdministradora: CAJACOPI EPS Tipo Vinculación:\n\n( REGISTRO CLINICO DE URGENCIA\n\n| DATOS DE LA CONSULTA\n\nRemitido: Contra referencia: No '\nTipo de Consulta: CONSULTA DE PRIMERA VEZ !\nPlan / Administradora: CAJACOPI EPS / CAJACOPI CONTRIBUTIVO-EVENTOS . . !\nGlasgow: 15 Valoración: _Aleria Triage: il : l\n\n1\n\nMOTIVO DE LA CONSULTA\n\n \n\n \n\nDOLOR_ go\n\nENFERMEDAD ACTUAL\n\n \n\n \n\nMASCULINO CUADRO CLINICO DE DOLOR EN REGION LUMBAR INTENSO REFIERE QUE HIZO UNA MALA POSICION EN EL TRABAJO E NG”: mo\nPROCESO DE DOLOR POR LO QUE CONSULTA ve\n\nSistema respiratorio: No\n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n| ANTECEDENTES\n1. Patológicos (HTA, Diabetes):\n2, Quirúrgicos:\n3. Hospitalarios:\n4. Transfusionales: e\n5. Tóxico-Alérgicos:\n6. Farmacotógicos:\n7. Gineco-Obstétricos:\n8. Traumáticos: \"\n9. Otros: :\n10. Alergia-toxicidad a medicamentos:\nFAMILIARES\nVARIABLES 4505\nVariables 4505\nFecha, Probable de Parto 01/01/1845\nFecha Toma de Hemoglobina 01/01/1845\nHemoglobina 0\nFecha de la Toma de Glicemia Basal 01/01/1845\nTratamiento para Sifilis Congénita 0\nRiesgos\nHipertensión Inducida por la Gestación No aplica\nSintomático Respiratorio No\nTuberculosis Multidrogoresistente No\nObesidad o Desnutrición Proteico Calórica No\nVíctima de Maltrato No\nVíctima de Violencia Sexual No\nCáncer de Cérvix No aplica\n\n \n\nSistema afectado:\n\nREVISION POR SISTEMA\n\nEXAMENES FISICOS\n\n \n\nF. Cardíaca: 80 xMin\nPeso: 60 kg\n\nIMC: 22.04 Kg/m?\nPerímetro Torácico:\nApariencia: Normal\nCráneo, cara y cuello: Normal\n\nTorax: Normal\n\nTemperatura: 37 *C\nTalla : 1.65 m\nSMC: 1.66 mo\n\nPresión Arterial Media: 93.33 mmHg\n\nF.Respiratorias: 20 xMin y\nPresión Sistólica: 120 mmHg ;\nPerímetro Cefálico: N :\nPresion Diastólica: 809.mmHg “\"*: :\n\n \n\n \n",
        //                 "_version_": 1709173249567358976
        //             },
        //             {
        //                 "id": "80ac3671-da4d-4336-a80c-6b1a314ed77a",
        //                 "documentoId": "2684",
        //                 "pagina": "3",
        //                 "N_Factura": "F7707",
        //                 "N_ID_prestador_salud": "802009806",
        //                 "N_Recibo_RIPS": "2246",
        //                 "contenido": " \n\n \n\n \n\n  \n \n\nQS y Identificación Interna: 802009806\norar Cód. Habilitación: 084330015101\n\n \n\n \n\n \n\n \n\n \n\n \n\nEST\no E Dirección: Calle 10 C2 AA No. 23-93 Malambo, Atlantico ODOA Teléfono: 3162213\nINFORMACIÓN GENERAL\n\nFecha de Impresión: 31/01/2021 16:00 : Fecha de Atención: 31/01/2021 10:13 Impreso por: EFPRUEBA\n\nCentro de atención: 01 - SEDE PRINCIPAL Admisión: AD359905\n\nPaciente: CC 1063969095 - JUAN DAVID MARTINEZ PADILLA Sexo: M\n\nFecha de Nacimiento: 30/01/1997 Edad: 24 año(s), 0 mes(es) 1 dia(s) Estado Civil: Otro\n\nReligión: Creencia:\n\nRégimen: 1 - Contributivo Nivel: 1 Carnet:\n\nDirección: NO SABE DIRRECION\n\nTeléfono: Lugar: Valambo Allántico\n\nOcupación:\n\nAcompañante:\n\nTeléfono Acomp.: Parentesco Acomp.:\n\nDirección Acomp.: !\n\nResponsable:\n\nTeléfono Resp.: Parentesco Resp.:\n\nDirección Resp.:\n\nMédico Tratante: JEZID DAVID PAJARO TERAN Especialidad: MEDICINA GENERAL\n\nAdministradora: CAJACOPI EPS Tipo Vinculación: Cotizante )\n\nREGISTRO CLÍNICO DE URGENCIA )\n\n| DATOS DE LA CONSULTA |\nRemitido: : Contra referencia: No\nTipo de Consulta: CONSULTA DE PRIMERA VEZ\n\nPlan / Administradora: CAJACOPI EPS / CAJACOPI CONTRIBUTIVO-EVENTOS\nGlasgow: 15 Valoración: Alerta Triage: il\n\n \n\nMOTIVO DE LA CONSULTA\nSE ME EXPLOTA LA CABEZA\nENFERMEDAD ACTUAL\nPTE PRESENTA CUADRO CLINICO DE MAS O MENOS 1 HORA DE EVOLUCION CARACTERIZADO POR CEFALEA EN CASCO ASOCIADO A\nFOTOFOBIA NAUSEAS Y.VOMITOS MOTIVO X EL CUAL CONSULTA,\nSistema respiratorio: No\n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n \n\n| ANTECEDENTES.\n1. Patológicos (HTA, Diabetes):\n2. Quirúrgicos:\n3. Hospitalarios:\n4. Transfusionales:\n5. Tóxico-Alérgicos:\n6. Farmacológicos:\n7. Gineco-Obstétricos:\n8. Traumáticos:\n9. Otros:\n10. Alergia-toxicidad a medicamentos;\nFAMILIARES\nVARIABLES 4505\nVariables 4505\nFecha Probable de Parto 01/01/1845\nFecha Toma de Hemoglobina 01/01/1845\nHemoglobina 0\nFecha de la Toma de Glicemia Basal 01/01/1845\nTratamiento para Sífilis Congénita 0\nRiesgos\nHipertensión Inducida por la Gestación No aplica\nSintomático Respiratorio No evaluado.\nTuberculosis Multidrogoresistente No evaluado\nObesidad o Desnutrición Proteico Calórica No evaluado.\nVíctima de Maltrato No evaluado\nVíctima de Violencia Sexua! No evaluado.\nCáncer de Cérvix No aplica\nREVISIÓN POR SISTEMA |\nSistema afectado: * ALERTA,\nEXAMENES FÍSICOS |\nF.Cardiaca: 77 xMin Temperatura: 36*C F.Respiratorias: 16 xMin\nPeso: 60 kg Talla : 168 m Presión Sistólica: 100 mmHg\nIMC: 0 Kgim? SMC: 47.36 mo Perímetro Cefálico:\nPerímetro Torácico: Presión Arterial Media: 80 mmHg Presión Diastólica: 70 mmHg\nApariencia: Normal\n\nCráneo, cara y cuello: Cabeza cara y órganos de los sentidos norma!\n\n \n",
        //                 "_version_": 1709173285597478912
        //             }]
        //     },
        //     "highlighting": {
        //         "9962c44a-b1f1-4ed7-8e28-4bcc1ed7c97f": {
        //             "contenido": [": Impresión diagnóstica O\nDiagnóstico principal: M545 - <em>LUMBAGO</em> <em>NO</em> <em>ESPECIFICADO</em> Cd\nDiagnóstico relacionado 1"]
        //         },
        //         "2adfc35c-c3fa-4056-b677-5cb36e97d6d1": {
        //             "contenido": [" PARACLÍNICOS\n\nANALISIS\n<em>No</em> Aplica. Ml\nEnfermedad general\nImpresión diagnóstica\nM545 - <em>LUMBAGO</em> <em>NO</em> <em>ESPECIFICADO</em>"]
        //         },
        //         "1b05199b-d448-4854-bba8-40844c00a3d3": {
        //             "contenido": ["\n\nN209 - CALCULO URINARIO, <em>NO</em> <em>ESPECIFICADO</em>\n\nN390 - INFECCION DE VIAS URINARIAS, SITIO <em>NO</em> <em>ESPECIFICADO</em>"]
        //         },
        //         "ae0cfd93-5740-481a-826d-a658f4cb1b40": {
        //             "contenido": ["\nDiagnóstico principal: N23X - COLICO RENAL, <em>NO</em> <em>ESPECIFICADO</em>\nDiagnóstico relacionado 1: Z000 - EXAMEN MEDICO"]
        //         },
        //         "383563c7-eef9-4a61-a4f9-277624edbc9e": {
        //             "contenido": [" diagnóstica\n\nDiagnóstico principal: R609 - EDEMA, <em>NO</em> <em>ESPECIFICADO</em>\n\nDiagnóstico relacionado 1: 2000 - EXAMEN"]
        //         },
        //         "23eca211-d837-427d-acc8-284dca7b06f4": {
        //             "contenido": ["Identificación Interna: 802009806\nCód. Habilitación: 084330015101\nDirección: Calle 10 C2 AA <em>No</em>, 23"]
        //         },
        //         "cabdbd47-5912-43d8-b93b-f61f7b187738": {
        //             "contenido": [" <em>No</em>. 23-93 Malambo, Atlantico ODOA Teléfono: 3162213\n\nY"]
        //         },
        //         "fc3849c2-f4cf-4778-9865-1de05bd42527": {
        //             "contenido": ["Identificación Interna: 802009806\nCód. Habilitación: 084330015101\nDirección: Calle 10 C2 AA <em>No</em>, 23"]
        //         },
        //         "68aee5e2-632a-40d2-a04d-c33256c7676a": {
        //             "contenido": [": Calle 10 C2 AA <em>No</em>. 23-93 Malambo, Atlantico ODOA Teléfono: 3162213\n\n4\nINFORMACION GENERAL\n\nFecha de"]
        //         },
        //         "80ac3671-da4d-4336-a80c-6b1a314ed77a": {
        //             "contenido": ["\n\n \n\n \n\n \n\n \n\n \n\n \n\nEST\no E Dirección: Calle 10 C2 AA <em>No</em>. 23-93 Malambo, Atlantico ODOA Teléfono: 3162213\nINFORMACIÓN"]
        //         }
        //     }
        // }
        
        console.log(JSON.stringify($scope.listocr));

        $http({
            method: 'GET',
            url: 'http://192.168.50.50:8983/solr/HistoriasClinicas/query?hl=on&q=lumbago%20no%20especificado&fq=N_Factura:F7630&fq=N_ID_prestador_salud:802009806&fq=N_Recibo_RIPS:2246&hl.fl=contenido'        
        }).then(function (response) {
            console.log(response.data);
            $scope.listocr = response.data;
            for (let key in $scope.listocr.highlighting) {
                console.log(key, $scope.listocr.highlighting[key]);
    
                for (let index = 0; index < $scope.listocr.response.docs.length; index++) {
    
                    if (key == $scope.listocr.response.docs[index].id) {
                        $scope.listocr.response.docs[index].palabraclave = $scope.listocr.highlighting[key].contenido;
                    }
    
                }
    
                console.log($scope.listocr.highlighting[key].contenido);
    
    
    
            }
        })
       
    }



}]).filter('inicio', function () {
    return function (input, start) {
        if (input != undefined && start != NaN) {
            start = +start;
            return input.slice(start);
        } else {
            return null;
        }
    }
});
function Format() {
    const input = document.querySelectorAll('#textarea_swal')[5];
    var valor = input.value;
    valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
    valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
    input.value = valor;
    // console.log(document.querySelectorAll('#log')[5].value);
}