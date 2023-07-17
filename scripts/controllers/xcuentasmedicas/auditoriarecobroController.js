'use strict';
angular.module('GenesisApp').controller('auditoriarecobroController', ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    // Plantilla funcional
    console.clear();
    $(document).ready(function () {
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
            Nit_Prestador: '900272582',
            Num_Sol: '10060'
        };
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
                SAVE: null
            },
            Productos_Detalle: {
                Listado: [],
                Filtro: [],
                SAVE: null
            },
            Productos_Glosa: {
                Listado: [],
                Filtro: [],
                SAVE: null
            },
            TipoGlosas: {
                Listado: [],
                Filtro: [],
                SAVE: null
            }
        }
        //
        $scope.Listar_Ambitos();
        $scope.List_TipoFacturas();
        $scope.Limpiar_Var_Busqueda();
        $scope.List_MotivoRecobros();

        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
            data: {
                function: 'Obt_Cargo'
            }
        }).then(function (response) {
            $scope.Rol_Cargo = response.data;
            if ($scope.Rol_Cargo == 0 || $scope.Rol_Cargo == 123) {
                $scope.Rol_Cargo_Texto = 'Factura';
            } else {
                $scope.Rol_Cargo_Texto = 'Recibo';
            }
        });

        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
            data: {
                function: 'Obt_Cedula'
            }
        }).then(function (response) {
            $scope.Rol_Cedula = response.data;
            // $http({
            //     method: 'POST',
            //     url: "php/cuentasmedicas/auditoriarecobro.php",
            //     data: {
            //         function: 'Obt_Control',
            //         Cedula: response.data
            //     }
            // }).then(function (response2) {
            //     // console.log("REVERSAR Y ANULAR: " + response2.data.ACCION_R_X);
            //     // console.log("PROCESAR: " + response2.data.PROCESAR);
            //     if (response2.data.ERROR == undefined) {
            //         $scope.Rol_AccionRA = response2.data.ACCION_R_X;
            //         $scope.Rol_Procesar = response2.data.PROCESAR;
            //     } else {
            //         $scope.Rol_AccionRA = 0;
            //         $scope.Rol_Procesar = 0;
            //     }
            // });
            //////////////////////
        });

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


    $scope.Listar_Ambitos = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
            data: {
                function: 'List_Ambitos'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.Array_Ambito = response.data;
            }
        })
    }

    ////////////////TIPOS DE FACTURAS////////////////
    $scope.List_TipoFacturas = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
            data: {
                function: 'List_TipoFacturas'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.List_Select.TipoFacturas.Listado = response.data;
            }
        })
    }

    ////////////////MOTIVOS DE RECOBRO////////////////
    $scope.List_MotivoRecobros = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
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
    $scope.List_ConceptoRecobros = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
            data: {
                function: 'List_ConceptoRecobros'
            }
        }).then(function (response) {
            if (response.data) {
                $scope.Array_ConceptoRecobro = response.data;
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
                    url: "php/cuentasmedicas/auditoriarecobro.php",
                    data: {
                        function: 'Vista2_List_Facturas',
                        Nit: $scope.Vista1.Nit_Prestador,
                        Recibo: $scope.Vista1.Num_Sol
                    }
                }).then(function (response) {
                    if (response.data) {
                        if (response.data[0].Codigo != undefined) {
                            swal({
                                title: "¡No se encontraron facturas!",
                                type: "info",
                            }).catch(swal.noop);
                        } else {
                            if (response.data[0].IPS != undefined) {
                                $scope.Vista.Activa = 2;
                                $scope.Vista2_datos = response.data;
                                $scope.initPaginacion($scope.Vista2_datos);
                                $timeout(function () {
                                    console.log("height:" + document.querySelector("#pantalla").offsetHeight);
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
        console.log(X);
        document.querySelector('#Hoja_Modal').classList.add('Ani_Up');
        $timeout(function () {
            document.querySelector('#Hoja_Modal').classList.remove('Ani_Up');
        }, 1000);
        $scope.HojaGest = null;
        $scope.Limpiar_Var_Busqueda();
        $scope.Check_Detalle_Glosa = false;
        $scope.Vistas_Informativa = 0;
        $scope.Vista2.Filtrar_Sol = '';

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
                TIPO_FACTURA: (X.TIPO_FACTURA_COD != null) ? (X.TIPO_FACTURA_COD + ' - ' + X.TIPO_FACTURA) : '',
                TIPO_FACTURA_COD: (X.TIPO_FACTURA_COD != null) ? X.TIPO_FACTURA_COD : '',
                ESTADO_GLOSA: $scope.Num_Esta(X.ESTADO_GLOSA, 'E'),
                NUMERO_GLOSA: $scope.Num_Esta(X.ESTADO_GLOSA, 'N'),
                DIAS_FACTURA: X.DIAS_FACTURA,

                EDAD: X.EDAD,
                GENERO: X.GENERO,

                AMBITO: X.AMBITO,
                FECHA_INGRESO: xFecha_Ingreso,
                DOC_AFILIADO_VER: X.DOC_AFILIADO,

                DIAGNOSTICO: (X.DIAGNOSTICO_COD != null) ? (X.DIAGNOSTICO_COD + ' - ' + X.DIAGNOSTICO) : '',
                FECHA_EGRESO: xFecha_Egreso,
                REGIMEN: (X.REGIMEN_COD == 0) ? '0' : '1',
                COPAGO: (X.COPAGO == '') ? '0' : $scope.FormatPesoNumero(X.COPAGO),
                ALTOCOSTO: (X.ALTO_COSTO2 == 'true') ? true : false,
                DIAGNOSTICO_COD: (X.DIAGNOSTICO_COD != null) ? X.DIAGNOSTICO_COD : '',

                RECOBRO: (X.RECOBRO_CAPITA == 'S') ? true : false,
                VALOR_RECOBRO: (X.VALOR_RECOBRO == null) ? '0' : $scope.FormatPesoNumero(X.VALOR_RECOBRO),
                MOTIVO_RECOBRO: (X.MOTIVO_RECOBRO != null) ? X.MOTIVO_RECOBRO : '',

            };

            $scope.List_Select.TipoFacturas.SAVE = (X.TIPO_FACTURA_COD != null) ? (X.TIPO_FACTURA_COD + ' - ' + X.TIPO_FACTURA) : '';

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
            $scope.Busqueda.Diagnostico.SAVE = (X.DIAGNOSTICO_COD != null) ? (X.DIAGNOSTICO_COD + ' - ' + X.DIAGNOSTICO) : '';

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

                SUM_TOTAL: 0,

                Array: []
            }

            $scope.Valores_Factura = {
                HojaDet: 0,
                HojaGlosa: 0
            }

            $scope.buscarAfiliado($scope.HojaGest.TIPO_DOCUMENTO, $scope.HojaGest.DOC_AFILIADO);


            if (X.ESTADO == 'P') {
                document.querySelector('.Hoja_Gestion_Class #HojaGest_RECOBRO').removeAttribute("readonly");
                $scope.HojaGest_Edi_Mod = false;
                // if ($scope.HojaGest.DIAS_FACTURA <= 22) {
                //     $scope.Btn_Gestionar_Glosa = true;
                // } else {
                //     $scope.Btn_Gestionar_Glosa = false;
                // }
            }



            $timeout(function () {
                $scope.$apply();
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

    //CONSULTA DIAGNOSTICO
    $scope.KeyFind_ObDiag = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.Buscar_Diag();
    }
    $scope.Buscar_Diag = function () {
        if ($scope.HojaGest.DIAGNOSTICO.length > 2) {
            $http({
                method: 'POST',
                url: "php/cuentasmedicas/auditoriarecobro.php",
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
        // Factura_Gestion
        var Campos_Empty = false;
        angular.forEach(document.querySelectorAll('.Hoja_Gestion_Class .red-text'), function (i) { // Limpia campos en rojo antes de buscar
            i.classList.remove('red-text');
        });
        if ($scope.HojaGest.RECOBRO == true) {
            if ($scope.HojaGest.VALOR_RECOBRO == undefined || $scope.HojaGest.VALOR_RECOBRO == null || $scope.HojaGest.VALOR_RECOBRO == '') {
                Campos_Empty = true; document.querySelector('#Gestion_Recobro_Valor_Label').classList.add('red-text');
            }

            if ((parseFloat(($scope.HojaGest.VALOR_RECOBRO.toString().replace(/\./g, '')).replace(/\,/g, '.'))) >= $scope.HojaGest.VALOR) {
                Campos_Empty = true; document.querySelector('#Gestion_Recobro_Valor_Label').classList.add('red-text');
                Materialize.toast('¡El valor del recobro no puede exceder el valor de la Factura!', 2000); $('.toast').addClass('default-background-dark');
            }

            if ($scope.HojaGest.MOTIVO_RECOBRO == undefined || $scope.HojaGest.MOTIVO_RECOBRO == null || $scope.HojaGest.MOTIVO_RECOBRO == '') {
                Campos_Empty = true; document.querySelector('#Gestion_Recobro_Motivo_Label').classList.add('red-text');
            }
        } else {
            $scope.HojaGest.VALOR_RECOBRO = '0';
            $scope.HojaGest.MOTIVO_RECOBRO = "";
        }
        //
        if (Campos_Empty == false) {
            // console.log(xArray.length);
            swal({
                title: '¿Está seguro que desea Gestionar la Factura?',
                type: "info",
                showCancelButton: true,
            }).catch(swal.noop)
                .then((willDelete) => {
                    if (willDelete) {
                        swal({ title: 'Cargando...', allowOutsideClick: false });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/cuentasmedicas/auditoriarecobro.php",
                            data: {
                                function: 'Factura_Gestion',
                                Doc: $scope.HojaGest.DOCUMENTO,
                                Num: $scope.HojaGest.NUMERO_REG.toString(), Ubi: $scope.HojaGest.UBICACION.toString(),
                                Tipo_Doc_Afi: $scope.HojaGest.TIPO_DOCUMENTO, Doc_Afi: $scope.HojaGest.DOC_AFILIADO,
                                Valor_Recobro: parseFloat(($scope.HojaGest.VALOR_RECOBRO.replace(/\./g, '')).replace(/\,/g, '.')),
                                Motivo_Recobro: $scope.HojaGest.MOTIVO_RECOBRO
                            }
                        }).then(function (response) {
                            if (response.data) {
                                if (response.data.Codigo == 0) {
                                    $scope.Vista1_Buscar('A');
                                    $scope.Volver_Vistas();
                                    swal({
                                        title: "¡Acción realizada con exito!",
                                        text: response.data.Nombre,
                                        type: "success"
                                    }).catch(swal.noop);
                                    $scope.Check_Detalle_Glosa = false;
                                    $timeout(function () {
                                        $scope.$apply();
                                    }, 500);
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
            Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
        }
    }

    //////////////////////////////// CONSULTAR DETALLE //////////////////////////////////////
    $scope.Vista2_List_Facturas_Detalle = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
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
                    $scope.List_Select.Productos_Glosa.Listado = [];
                    $scope.HojaDet.SUM_TOTAL = 0;
                    $scope.Valores_Factura.HojaDet = 0;


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
                    }, 1000);


                }
            }
        });
    }
    //////////////////////////////// CONSULTAR GLOSA //////////////////////////////////////
    $scope.Vista2_List_Glosa_Factura = function () {
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
            data: {
                function: 'Vista2_List_Glosa_Factura',
                Num: $scope.HojaGest.NUMERO_REG.toString(),
                Ubi: $scope.HojaGest.UBICACION.toString()
            }
        }).then(function (response) {
            if (response.data) {
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

                        $timeout(function () {
                            $scope.HojaGlosa.Array.forEach(i => {
                                //Suma el valor de los detalle para comparar despues contra el valor de la factura
                                // console.log($scope.Valores_Factura.HojaGlosa);
                                $scope.HojaGlosa.SUM_TOTAL = i.VALOR_GLOSA + $scope.HojaGlosa.SUM_TOTAL;
                            });
                            if ($scope.HojaGlosa.SUM_TOTAL > $scope.HojaGest.VALOR) {
                                $scope.Valores_Factura.HojaGlosa = $scope.HojaGlosa.SUM_TOTAL - $scope.HojaGest.VALOR;
                            }
                            if ($scope.HojaGlosa.SUM_TOTAL < $scope.HojaGest.VALOR) {
                                $scope.Valores_Factura.HojaGlosa = $scope.HojaGest.VALOR - $scope.HojaGlosa.SUM_TOTAL;
                            }
                        }, 1000);
                    }
                }
            }
        });
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

    }

    /////////////////////////////////////////////////////Autorizaciones///////////////////////////////////////////////
    $scope.buscarAfiliado = function (tipodocumento, documento) {
        // swal({ title: 'Cargando...', allowOutsideClick: false });
        // swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
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
            url: "php/cuentasmedicas/auditoriarecobro.php",
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
            url: "php/cuentasmedicas/auditoriarecobro.php",
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
            url: "php/cuentasmedicas/auditoriarecobro.php",
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

    $scope.Consultar_Historico_Facturas = function (tipo, doc) {
        $scope.Listar_Hist_Fact = {
            Array: []
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/cuentasmedicas/auditoriarecobro.php",
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


    //////////////////////////////////////////////////////////////////////////////////////
    // MODALS/////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    /////MODAL VER FACTURAS PENDIENTES GESTIONAR/////
    $scope.Abrir_Modal_Gestion_Factura = function () {
        (function () {
            $('#modal_Gestionar_Factura').modal();
        }());
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
    /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////

    /////////////////////////////////////////SELECTS/////////////////////////////////////////////////
    // Array_TipoFacturas - HojaGest.TIPO_FACTURA
    // Array_Productos_Detalle - HojaDet.PRODUCTO
    // Array_Productos_Glosa - HojaGlosa.PRODUCTO
    // Array_TipoGlosas - HojaGlosa.TIPO_GLOSA

    $scope.KeyFind_Enter = function (keyEvent, LIST, HOJA, MODEL) {
        if (keyEvent.which === 13) {
            if ($scope.List_Select[LIST].Filtro.length == 1) {
                $scope.FillTextbox($scope.List_Select[LIST].Filtro[0].CODIGO, $scope.List_Select[LIST].Filtro[0].NOMBRE, LIST, HOJA, MODEL);
            }
        }
    }

    $scope.Complete = function (string, ID, LIST, HOJA, MODEL) {
        if (string != undefined && $scope.List_Select[LIST].Listado != undefined && $scope[HOJA][MODEL] != undefined) {
            $('.Clase_UL' + LIST).css({ width: $('#' + ID)[0].offsetWidth });
            var output = [];
            angular.forEach($scope.List_Select[LIST].Listado, function (x) {
                if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                    output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
                }
            });
            $scope.List_Select[LIST].Filtro = output;
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
        if (1 == 2) {
            $('.Clase_UL' + LIST).css({ width: $('#' + ID)[0].offsetWidth });
            $scope.List_Select[LIST].Filtro = $scope.List_Select[LIST].Listado;
        }
    }

    $scope.Ver_Glosa_Informacion = function (x) {

        swal({
            title: 'Información de la Glosa',
            input: 'textarea',
            inputValue: x.DETALLE_GLOSA,
            showCancelButton: true,
            cancelButtonText: 'Cerrar',
            showConfirmButton: false,
            customClass: 'swal-wide'
        }).then(function (result) {
            $(".confirm").attr('disabled', 'disabled');
        }).catch(swal.noop);
        document.querySelector('.swal2-textarea').setAttribute("readonly", true);
        document.querySelector('.swal2-textarea').style.height = '300px';
    }

    /////////////////////////////////////////SELECTS/////////////////////////////////////////////////
    /////////////////////////////////////////STYLOS/////////////////////////////////////////////////
    $scope.Estado_Solicitud_Color = function (Estado) {
        if (Estado != undefined) {
            if (Estado.toString().toUpperCase() == 'A') {
                return { "background-color": "rgb(6, 152, 20) !important;" }
            }
            if (Estado.toString().toUpperCase() == 'P') {
                return { "background-color": "rgb(71, 71, 165)!important" }
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