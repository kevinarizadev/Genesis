'use strict';
angular.module('GenesisApp').controller('gestionsiniestrosController', ['$scope', '$http', '$timeout', '$filter', '$q', function ($scope, $http, $timeout, $filter, $q) {
    console.clear();
    $(document).ready(function () {
        $('.modal').modal();
        $('.tabs').tabs();
        $scope.Tabs = 1;
        console.log($(window).width());
        if ($(window).width() < 1100) {
            document.querySelector("#pantalla").style.zoom = 0.7;
        }
        if ($(window).width() > 1100 && $(window).width() < 1300) {
            document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).width() > 1300) {
            document.querySelector("#pantalla").style.zoom = 0.8;
        }
        if ($(window).height() < 600) {
            angular.forEach(document.querySelectorAll('.Clase_AjustarHeigth_Modal_Soporte'), function (i) {
                i.style.height = '95vh';
            });
        }
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.backgroundColor = 'white';

        $scope.SysDay = new Date();
        $scope.Fecha_Comodin = new Date('1800/01/01');
        //
        $scope.Array_Patologias = [
            { CODIGO: 'AR', NOMBRE: 'ARTRITIS' },
            { CODIGO: 'CA', NOMBRE: 'CANCER' },
            { CODIGO: 'ER', NOMBRE: 'ENFERMEDAD RENAL' },
            { CODIGO: 'HF', NOMBRE: 'HEMOFILIA' },
            { CODIGO: 'HC', NOMBRE: 'HEPATITIS C' },
            { CODIGO: 'VH', NOMBRE: 'VIH' },
            { CODIGO: 'EH', NOMBRE: 'ENFERMEDADES HUERFANAS' },
            { CODIGO: 'TP', NOMBRE: 'TRASPLANTES' },
        ]
        //
        //
        $scope.Refrescar_Inicio();
        // $scope.Actualizar_Diag_Clase('A');

    });

    $scope.Refrescar_Inicio = function () {
        $scope.Tabs = 1;
        $http({ method: 'POST', url: "php/altocosto/siniestros/gestionsiniestros.php", data: { function: 'Obt_Cedula' } }).then(function (response2) {
            $scope.Rol_Cedula = response2.data;
            // $scope.Rol_Cedula = '1045745252';
            $http({ method: 'POST', url: "php/altocosto/siniestros/gestionsiniestros.php", data: { function: 'Obt_Rol', Cedula: $scope.Rol_Cedula } }).then(function (response) {
                if (response.data.ROL != undefined) {
                    $scope.Rol_Ubi = response.data.ROL;
                    $scope.Inicio();
                    setTimeout(() => { $scope.Inicio_Hoja2(); $scope.$apply(); }, 1000);
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: 'Ocurrio un error al cargar el modulo, por favor contactar con la Nacional.',
                        type: "info",
                    }).catch(swal.noop);
                }
            });
        });
    }

    $scope.Inicio = function () {
        //
        if ($scope.Rol_Ubi == 'S') {
            $scope.Var_Seccional = {
                Cont_Pendientes: '0',
                Vista: '1',
                List_Count: {
                    "Aut": 0,
                    "Rips": 0,
                    "Censo": 0,
                    "Otra": 0
                },
                Filtrar_Sol: "",
                Form: null,
                Sop_Lab: {
                    Soporte: '',
                },
                Busqueda: {
                    IpsAsig: {
                        Filtro: [],
                        Listado: null,
                        SAVE: null,
                        Seleccion: 9999
                    },
                    Diagnostico: {
                        Filtro: [],
                        Listado: null,
                        SAVE: null,
                        Cohorte: null,
                        Seleccion: 9999
                    },
                    Diagnostico_F: {
                        Filtro: [],
                        Listado: null,
                        SAVE: null,
                        Seleccion: 9999
                    },
                    Clase_F: {
                        Filtro: [],
                        Listado: null,
                        SAVE: null,
                        Seleccion: 9999
                    }
                }
            }
            //
            angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
                i.setAttribute("disabled", true);
            });
            //
            $scope.Modal_Consulta_Tipo = "";
            $scope.Modal_Consulta_Numero = "";
            $scope.Modal_Consulta_Nombre = "";
            $scope.Modal_Consulta_Fuente = "O";
            $scope.Modal_Consulta_Cod_Cohorte = "";
            $scope.Modal_Consulta_Cod_Clase = "";
            $scope.Modal_Consulta_Clase = "";
            $scope.Modal_Consulta_Diagnostico_Cod = "";
            $scope.Modal_Consulta_Diagnostico_Nom = "";
            $scope.Modal_Consulta_Diagnostico = "";
            $scope.Var_Seccional.Busqueda.Diagnostico.SAVE = "";
            setTimeout(function () { $scope.$apply() }, 1000);
            //
            document.querySelector('#Var_Seccional_Soporte').value = "";
            document.querySelector('#Var_Seccional_Sop_Lab_Soporte').value = "";
            document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
            document.querySelector(".input-file-radiu").classList.add("input-file-radius-obligatorio");
            $scope.Limpiar_Campos_Req('Var_Seccional');
            for (var i = 0; i < document.querySelectorAll('.Var_Seccional_Archivos').length; i++) {
                document.querySelectorAll('.Var_Seccional_Archivos')[i].value = '';
            }
            //

            $scope.HSEC_Obtener_Cantidades();
            setTimeout(function () { $scope.$apply() }, 1000);
        } else {
            ////////////////////NACIONAL            
            //
            angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados input'), function (i) {
                i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados select'), function (i) {
                i.setAttribute("disabled", true);
            });
            angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados textarea'), function (i) {
                i.setAttribute("disabled", true);
            });
            //
            setTimeout(() => {
                $scope.HNAC_ObtenerListado();
                angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados label'), function (i) {
                    i.classList.add("class_label");
                });
                angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados input'), function (i) {
                    i.classList.add("class_gris");
                });
                angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados textarea'), function (i) {
                    i.classList.add("class_gris");
                });
            }, 1000);
            setTimeout(() => { $scope.$apply(); }, 1000);
        }
    }
    //
    $scope.HSEC_Obtener_Cantidades = function () {
        $scope.Lista_Tabla = [];
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Cantidades_Secc',
                Cedula: $scope.Rol_Cedula,
            }
        }).then(function (response) {
            $scope.Var_Seccional.Cont_Pendientes = response.data.length;
            swal.close();
            setTimeout(() => {
                response.data.forEach(e => {
                    (e.FUENTE == 'A') ? $scope.Var_Seccional.List_Count.Aut += 1 : '';
                    (e.FUENTE == 'R') ? $scope.Var_Seccional.List_Count.Rips += 1 : '';
                    (e.FUENTE == 'C') ? $scope.Var_Seccional.List_Count.Censo += 1 : '';
                    (e.FUENTE != 'A' && e.FUENTE != 'R' && e.FUENTE != 'C') ? $scope.Var_Seccional.List_Count.Otra += 1 : '';

                    $scope.Lista_Tabla.push({
                        "NUM_RADICADO": e.RADICADO,
                        "SECCIONAL": e.SECCIONAL,
                        "TIPO_DOC_AFI": e.DOCUMENTO.toString().split("-")[0],
                        "DOC_AFI": e.DOCUMENTO.toString().split("-")[1],
                        "NOMBRE_AFI": e.NOMBRE,
                        "COHORTE": e.COHORTE,
                        "PRIORIDAD": e.PRIORIDAD,
                        "PLURIPATOLOGICO": e.PLURIPATOLOGICO,
                        "PLURIPATOLOGICO_NOMB": e.PLURIPATOLOGICO == 'S' ? 'Pluripatologico' : '',
                        "FUENTE": e.FUENTE,
                        "FUENTE_NOM": $scope.Find_Fuente(e.FUENTE),
                        "ESTADO_AFILIADO": e.ESTADO_AFILIADO,

                    });
                });
                $scope.initPaginacion($scope.Lista_Tabla);
                $scope.$apply();
                document.getElementById("Var_Seccional_Filtrar_Sol").focus();
            }, 500);
        });
    }

    $scope.HSEC_Mostar_Formulario = function (X) {
        $scope.Limpiar_Campos_Req('Var_Seccional');
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Registros_Secc',
                Cedula: $scope.Rol_Cedula,
                Gestion: 'L',
                Rad: X.NUM_RADICADO
            }
        }).then(function (response) {
            if (response.data.length != 0 && response.data.Codigo == undefined && response.data.toString().substr(0, 3) != '<br') {
                var data = response.data[0];
                // console.log(JSON.stringify(data));
                swal.close();
                ////////////////
                $scope.Color_Bg = '';
                if (data.FUENTE == 'A') { $scope.Color_Bg = "BgColor_A"; $scope.Color_Co = "Color_A"; }
                if (data.FUENTE == 'R') { $scope.Color_Bg = "BgColor_R"; $scope.Color_Co = "Color_R"; }
                if (data.FUENTE == 'C') { $scope.Color_Bg = "BgColor_C"; $scope.Color_Co = "Color_C"; }
                if (data.FUENTE == 'N') { $scope.Color_Bg = "BgColor_N"; $scope.Color_Co = "Color_N"; }
                if (data.FUENTE != 'A' && data.FUENTE != 'R' && data.FUENTE != 'C' && data.FUENTE != 'N') { $scope.Color_Bg = "BgColor_O"; $scope.Color_Co = "Color_O"; }
                ///////////////
                var FECHA_NAC = new Date(data.FECHA_NAC);
                $scope.Var_Seccional.Vista = '3';
                // var Fecha_Gestion = (X.FECHA_GESTION == '') ? $scope.SysDay : new Date(X.FECHA_GESTION);
                var x = $scope.SysDay;

                // var SYSDAY = x.getFullYear() + '-' + (((x.getMonth() + 1) < 10) ? '0' + (x.getMonth() + 1) : (x.getMonth() + 1)) + '-' + x.getDate() + 'T' + x.getHours() + ':' + x.getMinutes();
                $scope.Var_Seccional.Form = {
                    Estado: 'A',
                    Estado_Nom: '',
                    Status: data.STATUS,
                    Fuente: data.FUENTE,
                    Fuente_Nom: $scope.Find_Fuente(data.FUENTE),
                    Radicado: data.RADICADO,
                    Cod_Cohorte: data.COD_COHORTE,
                    Cod_Doc_Cohorte: data.COD_DOC_COHORTE,

                    Diagnostico_Cod: data.COD_DIAGNOSTICO,
                    Diagnostico: data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO,
                    Diagnostico_Cod_SAVE: data.COD_DIAGNOSTICO,
                    Diagnostico_SAVE: data.NOM_DIAGNOSTICO,

                    Clase_Cod: data.COD_CLASE_CONCEPTO,
                    Clase: data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO,
                    Clase_Cod_SAVE: data.COD_CLASE_CONCEPTO,
                    Clase_SAVE: data.CLASE_CONCEPTO,

                    Fecha_Gestion: $scope.SysDay,
                    Fecha_Inicio: data.FECHA_INICIO,
                    Fecha_Fin: data.FECHA_FIN,
                    Seccional_Cod: '',
                    Seccional_Nom: '',
                    Municipio_Cod: '',
                    Municipio_Nom: '',
                    Regimen: data.REGIMEN,

                    Afi_Ubicacion: data.UBICACION,
                    Afi_Tipo_Doc: data.TIPO_DOC,
                    Afi_Num_Doc: data.NUM_DOC,
                    Afi_Nombre: data.NOMBRE,
                    Afi_Pri_Nombre: data.PRI_NOMBRE,
                    Afi_Pri_Apellido: data.PRI_APELLIDO,
                    Afi_Seg_Nombre: data.SEG_NOMBRE,
                    Afi_Seg_Apellido: data.SEG_APELLIDO,
                    Afi_Fecha_Nac: FECHA_NAC,
                    Afi_Edad: data.EDAD,
                    Afi_Sexo: data.SEXO,
                    Afi_Portabilidad: data.PORTABILIDAD,
                    Afi_Ips: data.IPS,
                    Afi_Contratada: '',

                    Op_Fecha_Diag: $scope.SysDay,
                    Op_Pluripatologico: (data.PLURIPATOLOGICO == 'S') ? true : false,
                    Op_Prioridad: '',
                    Op_IpsAsig: '',
                    Op_IpsAsig_Cod: '',
                    Op_Fecha_inicio_IpsAsig: $scope.SysDay,

                    Op_Observacion: '',

                    Soportes: {
                        Soporte_URL: '',
                        Soporte_B64: '',
                        Soporte_RUTA: '',
                    }
                }
                // $scope.Var_Seccional.Busqueda.Tipo_Tratamiento.Listado = $scope[data.COD_COHORTE];
                $scope.Var_Seccional.Busqueda.IpsAsig.SAVE = null;
                $scope.Var_Seccional.Busqueda.IpsAsig.Listado = null;
                $scope.Var_Seccional.Busqueda.Diagnostico_F.SAVE = data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO;
                $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                $scope.Var_Seccional.Busqueda.Clase_F.SAVE = data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO;
                $scope.Var_Seccional.Busqueda.Clase_F.Listado = null;
                /////////////////////////////////////////////////
                $scope.Var_Seccional.Busqueda.Diagnostico_F.Filtro = null;
                $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                $scope.Var_Seccional.Busqueda.Clase_F.Filtro = null;
                $scope.Var_Seccional.Busqueda.Clase_F.Listado = null;
                /////////////////////////////////////////////////
                angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados input'), function (i) {
                    i.setAttribute("readonly", true);
                });
                angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados select'), function (i) {
                    i.setAttribute("disabled", true);
                });
                setTimeout(() => {
                    angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados input'), function (i) {
                        i.classList.add("class_gris");
                    });
                }, 1500);
                $timeout(function () {
                    $("#collapsible-header-Patologias1").removeClass(function () {
                        return "active";
                    }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
                }, 1000);
                /////////////////////////////////////////////////
                $scope.HSEC_Btn_G = false;
                $scope.HSEC_Btn_X = false;
                setTimeout(function () { $scope.$apply() }, 1000);
                if (data.PLURIPATOLOGICO == 'S') { $scope.Ver_Patologia('Var_Seccional'); }
                document.getElementById("Var_Seccional_Form_Op_Fecha_Diag").focus();
            } else if (response.data.Codigo == 1) {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data.Nombre,
                    type: "info",
                }).catch(swal.noop);
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data.Nombre,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }
    // 
    $scope.Limpiar_Campos_Req = function (HOJA) {
        angular.forEach(document.querySelectorAll('.' + HOJA + '_Clase .red-text'), function (i) {
            i.classList.remove('red-text');
        });
    }

    $scope.HSEC_Btn_Obtener = function () {
        $scope.Limpiar_Campos_Req('Var_Seccional');
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Registros_Secc',
                Cedula: $scope.Rol_Cedula,
                Gestion: 'A',
                Rad: ''
            }
        }).then(function (response) {
            if (response.data.length != 0 && response.data.Codigo == undefined && response.data[0].Codigo == undefined && response.data.toString().substr(0, 3) != '<br') {
                var data = response.data[0];
                // console.log(JSON.stringify(data));
                swal.close();
                ////////////////
                $scope.Color_Bg = '';
                if (data.FUENTE == 'A') { $scope.Color_Bg = "BgColor_A"; $scope.Color_Co = "Color_A"; }
                if (data.FUENTE == 'R') { $scope.Color_Bg = "BgColor_R"; $scope.Color_Co = "Color_R"; }
                if (data.FUENTE == 'C') { $scope.Color_Bg = "BgColor_C"; $scope.Color_Co = "Color_C"; }
                if (data.FUENTE == 'N') { $scope.Color_Bg = "BgColor_N"; $scope.Color_Co = "Color_N"; }
                if (data.FUENTE != 'A' && data.FUENTE != 'R' && data.FUENTE != 'C' && data.FUENTE != 'N') { $scope.Color_Bg = "BgColor_O"; $scope.Color_Co = "Color_O"; }
                ///////////////
                var FECHA_NAC = new Date(data.FECHA_NAC);
                $scope.Var_Seccional.Vista = '3';
                // var Fecha_Gestion = (X.FECHA_GESTION == '') ? $scope.SysDay : new Date(X.FECHA_GESTION);
                var x = $scope.SysDay;

                // var SYSDAY = x.getFullYear() + '-' + (((x.getMonth() + 1) < 10) ? '0' + (x.getMonth() + 1) : (x.getMonth() + 1)) + '-' + x.getDate() + 'T' + x.getHours() + ':' + x.getMinutes();
                $scope.Var_Seccional.Form = {
                    Estado: 'A',
                    Estado_Nom: '',
                    Status: data.STATUS,
                    Fuente: data.FUENTE,
                    Fuente_Nom: $scope.Find_Fuente(data.FUENTE),
                    Radicado: data.RADICADO,
                    Cod_Cohorte: data.COD_COHORTE,
                    Cod_Doc_Cohorte: data.COD_DOC_COHORTE,
                    Diagnostico_Cod: data.COD_DIAGNOSTICO,
                    Diagnostico: data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO,
                    Diagnostico_Cod_SAVE: data.COD_DIAGNOSTICO,
                    Diagnostico_SAVE: data.NOM_DIAGNOSTICO,
                    Clase_Cod: data.COD_CLASE_CONCEPTO,
                    Clase: data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO,
                    Clase_Cod_SAVE: data.COD_CLASE_CONCEPTO,
                    Clase_SAVE: data.CLASE_CONCEPTO,

                    Fecha_Gestion: $scope.SysDay,
                    Fecha_Inicio: data.FECHA_INICIO,
                    Fecha_Fin: data.FECHA_FIN,
                    Seccional_Cod: '',
                    Seccional_Nom: '',
                    Municipio_Cod: '',
                    Municipio_Nom: '',
                    Regimen: data.REGIMEN,

                    Afi_Ubicacion: data.UBICACION,
                    Afi_Tipo_Doc: data.TIPO_DOC,
                    Afi_Num_Doc: data.NUM_DOC,
                    Afi_Nombre: data.NOMBRE,
                    Afi_Pri_Nombre: data.PRI_NOMBRE,
                    Afi_Pri_Apellido: data.PRI_APELLIDO,
                    Afi_Seg_Nombre: data.SEG_NOMBRE,
                    Afi_Seg_Apellido: data.SEG_APELLIDO,
                    Afi_Fecha_Nac: FECHA_NAC,
                    Afi_Edad: data.EDAD,
                    Afi_Sexo: data.SEXO,
                    Afi_Portabilidad: data.PORTABILIDAD,
                    Afi_Ips: data.IPS,
                    Afi_Contratada: '',

                    Op_Fecha_Diag: $scope.SysDay,
                    Op_Pluripatologico: (data.PLURIPATOLOGICO == 'S') ? true : false,
                    Op_Prioridad: '',
                    Op_IpsAsig: '',
                    Op_IpsAsig_Cod: '',
                    Op_Fecha_inicio_IpsAsig: $scope.SysDay,

                    Op_Observacion: '',

                    Soportes: {
                        Soporte_URL: '',
                        Soporte_B64: '',
                        Soporte_RUTA: '',
                    }
                }
                // $scope.Var_Seccional.Busqueda.Tipo_Tratamiento.Listado = $scope[data.COD_COHORTE];
                $scope.Var_Seccional.Busqueda.IpsAsig.SAVE = null;
                $scope.Var_Seccional.Busqueda.IpsAsig.Listado = null;
                $scope.Var_Seccional.Busqueda.Diagnostico_F.SAVE = data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO;
                $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                $scope.Var_Seccional.Busqueda.Clase_F.SAVE = data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO;
                $scope.Var_Seccional.Busqueda.Clase_F.Listado = null;
                //
                /////////////////////////////////////////////////
                $scope.Var_Seccional.Busqueda.Diagnostico_F.Filtro = null;
                $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                $scope.Var_Seccional.Busqueda.Clase_F.Filtro = null;
                $scope.Var_Seccional.Busqueda.Clase_F.Listado = null;
                /////////////////////////////////////////////////
                angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados input'), function (i) {
                    i.setAttribute("readonly", true);
                });
                angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados select'), function (i) {
                    i.setAttribute("disabled", true);
                });
                setTimeout(() => {
                    angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados input'), function (i) {
                        i.classList.add("class_gris");
                    });
                }, 1500);
                $timeout(function () {
                    $("#collapsible-header-Patologias1").removeClass(function () {
                        return "active";
                    }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
                }, 1000);
                /////////////////////////////////////////////////
                $scope.HSEC_Btn_G = false;
                $scope.HSEC_Btn_X = false;
                setTimeout(function () { $scope.$apply() }, 1000);
                if (data.PLURIPATOLOGICO == 'S') { $scope.Ver_Patologia('Var_Seccional'); }
                document.getElementById("Var_Seccional_Form_Op_Fecha_Diag").focus();
            } else if (response.data.toString().substr(0, 3) == '<br') {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            } else if(response.data.Codigo == 1){
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data.Nombre,
                    type: "info",
                }).catch(swal.noop);
            } else if(response.data[0].Codigo == 1){
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data[0].Nombre,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.Validar_CamposVacios = function (HOJA) {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        $scope.Limpiar_Campos_Req(HOJA);
        if ($scope.Var_Seccional.Form.Afi_Tipo_Doc == undefined || $scope.Var_Seccional.Form.Afi_Tipo_Doc == null || $scope.Var_Seccional.Form.Afi_Tipo_Doc == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Afi_Tipo_Doc_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Afi_Tipo_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Afi_Num_Doc == undefined || $scope.Var_Seccional.Form.Afi_Num_Doc == null || $scope.Var_Seccional.Form.Afi_Num_Doc == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Afi_Num_Doc_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Afi_Num_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        //
        if ($scope.Var_Seccional.Form.Cod_Cohorte == undefined || $scope.Var_Seccional.Form.Cod_Cohorte == null || $scope.Var_Seccional.Form.Cod_Cohorte == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Cod_Cohorte_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Cod_Cohorte_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Diagnostico_Cod == undefined || $scope.Var_Seccional.Form.Diagnostico_Cod == null || $scope.Var_Seccional.Form.Diagnostico_Cod == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Diagnostico_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Diagnostico_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Clase_Cod == undefined || $scope.Var_Seccional.Form.Clase_Cod == null || $scope.Var_Seccional.Form.Clase_Cod == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Clase_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Clase_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Op_Prioridad == undefined || $scope.Var_Seccional.Form.Op_Prioridad == null || $scope.Var_Seccional.Form.Op_Prioridad == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Op_Prioridad_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Op_Prioridad_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Op_IpsAsig_Cod == undefined || $scope.Var_Seccional.Form.Op_IpsAsig_Cod == null || $scope.Var_Seccional.Form.Op_IpsAsig_Cod == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Op_IpsAsig_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Op_IpsAsig_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Op_Observacion == undefined || $scope.Var_Seccional.Form.Op_Observacion == null || $scope.Var_Seccional.Form.Op_Observacion == '' || $scope.Var_Seccional.Form.Op_Observacion.length < 20 || $scope.Var_Seccional.Form.Op_Observacion.length > 1000) {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Op_Observacion_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Op_Observacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Seccional.Form.Op_Fecha_Diag == undefined || $scope.Var_Seccional.Form.Op_Fecha_Diag == null || $scope.Var_Seccional.Form.Op_Fecha_Diag == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Op_Fecha_Diag_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Op_Fecha_Diag_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        if ($scope.Var_Seccional.Form.Soportes.Soporte_B64 == undefined || $scope.Var_Seccional.Form.Soportes.Soporte_B64 == null || $scope.Var_Seccional.Form.Soportes.Soporte_B64 == '') {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Soporte_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Soporte_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        var array = {
            campo: Campos_Empty
        }

        defered.resolve(array);
        return promise;
    }

    $scope.HSEC_Guardar_Solicitud = function () {
        setTimeout(() => {
            $scope.$apply();
        }, 1500);
        var Campos_Empty = false;
        var Validar_Campos = [
            $scope.Validar_CamposVacios('Var_Seccional')
        ];
        $q.all(Validar_Campos).then(function (resultado) {
            Campos_Empty = resultado[0].campo;
            if (Campos_Empty == false) {
                swal({
                    title: "¿Está seguro que desea guardar?",
                    // text: "¿Acepta registrar la gestión realizada?",
                    type: "question",
                    showCancelButton: true,
                    allowOutsideClick: false
                }).catch(swal.noop)
                    .then((willDelete) => {
                        if (willDelete) {
                            /**/
                            var Cargar_Soporte = [
                                $scope.Cargar_Soporte_FTP()
                            ];
                            $q.all(Cargar_Soporte).then(function (Result_Sop) {
                                var Archivos_Error = false;
                                for (var x = 0; x < Result_Sop.length; x++) {
                                    if (Result_Sop[x].substr(0, 3) == '<br' || Result_Sop[x].substr(0, 1) == '0' || (Result_Sop[x] == '' && $scope.Var_Seccional.Form.Soportes.Soporte1_B64 != '')) {
                                        Archivos_Error = true;
                                        swal({
                                            title: '¡Error al subir un archivo!',
                                            text: 'Nota: Si el error persiste, por favor actualizar la página (CONTROL + F5).',
                                            type: 'warning'
                                        }).catch(swal.noop);
                                    }
                                }
                                /**/
                                if (Archivos_Error == false) {

                                    var xFecha_Diag = $scope.Var_Seccional.Form.Op_Fecha_Diag;
                                    var Fecha_Diag = xFecha_Diag.getDate() + '-' + (((xFecha_Diag.getMonth() + 1) < 10) ? '0' + (xFecha_Diag.getMonth() + 1) : (xFecha_Diag.getMonth() + 1)) + '-' + xFecha_Diag.getFullYear();
                                    var xFecha_inicio_IpsAsig = $scope.Var_Seccional.Form.Op_Fecha_inicio_IpsAsig;
                                    var Fecha_inicio_IpsAsig = xFecha_inicio_IpsAsig.getDate() + '-' + (((xFecha_inicio_IpsAsig.getMonth() + 1) < 10) ? '0' + (xFecha_inicio_IpsAsig.getMonth() + 1) : (xFecha_inicio_IpsAsig.getMonth() + 1)) + '-' + xFecha_inicio_IpsAsig.getFullYear();

                                    var Datos = {
                                        Status: $scope.Var_Seccional.Form.Status,
                                        Radicado: $scope.Var_Seccional.Form.Radicado,
                                        Cod_Cohorte: $scope.Var_Seccional.Form.Cod_Cohorte,
                                        Cod_Doc_Cohorte: $scope.Var_Seccional.Form.Cod_Doc_Cohorte,
                                        Cod_Diagno: $scope.Var_Seccional.Form.Diagnostico_Cod,
                                        Fecha_Inicio: $scope.Var_Seccional.Form.Fecha_Inicio,
                                        Fecha_Fin: $scope.Var_Seccional.Form.Fecha_Fin,
                                        Tipo_Doc: $scope.Var_Seccional.Form.Afi_Tipo_Doc,
                                        Num_Doc: $scope.Var_Seccional.Form.Afi_Num_Doc,
                                        Estado_Registro: $scope.Var_Seccional.Form.Estado,
                                        // Ubicacion: $scope.Var_Seccional.Form.Municipio_Cod,
                                        Fuente: $scope.Var_Seccional.Form.Fuente,
                                        Observacion: $scope.Var_Seccional.Form.Op_Observacion.toString().toUpperCase(),
                                        Fecha_Diag: Fecha_Diag,
                                        Prioridad: $scope.Var_Seccional.Form.Op_Prioridad,
                                        Clase_Concepto: $scope.Var_Seccional.Form.Clase_Cod,
                                        Ruta: $scope.Var_Seccional.Form.Soportes.Soporte_RUTA,
                                        Responsable: $scope.Rol_Cedula,
                                        Origen_Proceso: 'S',
                                        Estado_Accion: 'P',
                                        Ips_Asig: $scope.Var_Seccional.Form.Op_IpsAsig_Cod,
                                        Fecha_inicio_Ips_Asig: Fecha_inicio_IpsAsig
                                    };
                                    $scope.HSEC_Btn_G = true;
                                    // console.log(JSON.stringify(Datos));
                                    swal({ title: 'Cargando...', allowOutsideClick: false });
                                    swal.showLoading();
                                    $http({
                                        method: 'POST',
                                        url: "php/altocosto/siniestros/gestionsiniestros.php",
                                        data: {
                                            function: 'Guardar_Seccional_Nacional',
                                            xdata: JSON.stringify(Datos)
                                        }
                                    }).then(function (response) {
                                        $scope.HSEC_Btn_G = false;
                                        if (response.data) {
                                            if (response.data.Codigo && response.data.Codigo == 0) {
                                                swal({
                                                    title: response.data.Nombre,
                                                    type: "success",
                                                }).catch(swal.noop);
                                                $scope.Var_Seccional.Vista = '1';
                                                setTimeout(function () {
                                                    $http({
                                                        method: 'POST',
                                                        url: "https://api.infobip.com/sms/1/text/single",
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'authorization': 'Basic Y2FqYWZhbWlsaWFyOkNvbG9tYmlhMjAxNw==',
                                                            'accept': 'application/json'
                                                        },
                                                        data: {
                                                            "from": "CajacopiEPS",
                                                            "to": "57" + response.data.Celular.toString(),
                                                            "text": "Sr(a). " + $scope.nombre + " Solicitud  con número " + response.data.NumAca.toString() + " fue registrado correctamente. Sera atendido por nuestra mesa de servicio. Gracias por utilizar nuestra plataforma. CajacopiEPS "
                                                        }
                                                    }).then(function (response) {
                                                    });
                                                }, 500);
                                                setTimeout(() => {
                                                    $scope.Inicio();
                                                    $scope.$apply();
                                                }, 1500);
                                            } else {
                                                if (response.data.Codigo == 1) {
                                                    swal({
                                                        title: "¡IMPORTANTE!",
                                                        text: response.data.Nombre,
                                                        type: "warning",
                                                    }).catch(swal.noop);
                                                } else {
                                                    swal({
                                                        title: "¡IMPORTANTE!",
                                                        text: response.data,
                                                        type: "warning",
                                                    }).catch(swal.noop);
                                                }
                                            }
                                        } else {
                                            swal({
                                                title: "¡IMPORTANTE!",
                                                text: response.data,
                                                type: "info",
                                            }).catch(swal.noop);
                                        }
                                    });
                                }
                            });
                        }
                    }).catch(swal.noop);

                ///////
            } else {
                Materialize.toast('¡Campos vacios o invalidos!', 3000);
            }
        });
    }

    $scope.HSEC_Anular_Solicitud = function () {
        $scope.Limpiar_Campos_Req('Var_Seccional');
        var Campos_Empty = false;
        if ($scope.Var_Seccional.Form.Op_Observacion == undefined || $scope.Var_Seccional.Form.Op_Observacion == null || $scope.Var_Seccional.Form.Op_Observacion == '' || $scope.Var_Seccional.Form.Op_Observacion.length < 20 || $scope.Var_Seccional.Form.Op_Observacion.length > 1000) {
            Campos_Empty = true; document.querySelector('#Var_Seccional_Form_Op_Observacion_Label').classList.add('red-text');
            document.getElementById('Var_Seccional_Form_Op_Observacion_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            Materialize.toast('¡Debe escribir una Observación, Minimo 20 Caracteres!', 3000);
        }
        if (Campos_Empty == false) {
            swal({
                title: "¿Está seguro que desea anular el registro?",
                type: "question",
                showCancelButton: true,
                allowOutsideClick: false
            }).catch(swal.noop)
                .then((willDelete) => {
                    if (willDelete) {
                        $scope.HSEC_Btn_X = true;
                        swal({ title: 'Cargando...', allowOutsideClick: false });
                        swal.showLoading();
                        $http({
                            method: 'POST',
                            url: "php/altocosto/siniestros/gestionsiniestros.php",
                            data: {
                                function: 'Anular_Registro_Seccional',
                                Radicado: $scope.Var_Seccional.Form.Radicado,
                                Observacion: $scope.Var_Seccional.Form.Op_Observacion.toString().toUpperCase(),
                                Responsable: $scope.Rol_Cedula,
                                Fuente: $scope.Var_Seccional.Form.Fuente,
                            }
                        }).then(function (response) {
                            $scope.HSEC_Btn_X = false;
                            if (response.data) {
                                if (response.data.Codigo && response.data.Codigo == 0) {
                                    swal({
                                        title: response.data.Nombre,
                                        type: "success",
                                    }).catch(swal.noop);
                                    $scope.Var_Seccional.Vista = '1';
                                    setTimeout(() => {
                                        $scope.Inicio();
                                        $scope.$apply();
                                    }, 1500);
                                } else {
                                    if (response.data.Codigo == 1) {
                                        swal({
                                            title: "¡IMPORTANTE!",
                                            text: response.data.Nombre,
                                            type: "warning",
                                        }).catch(swal.noop);
                                    } else {
                                        swal({
                                            title: "¡IMPORTANTE!",
                                            text: response.data,
                                            type: "warning",
                                        }).catch(swal.noop);
                                    }
                                }
                            } else {
                                swal({
                                    title: "¡IMPORTANTE!",
                                    text: response.data,
                                    type: "info",
                                }).catch(swal.noop);
                            }
                        });
                    }
                }).catch(swal.noop);
        }
    }

    $scope.Consultar_NuevaGestion = function (Accion) {
        //A Abrir Modal - //G Gestionar
        if (Accion == 'A') {
            angular.forEach(document.querySelectorAll('#Modal_NuevaGestion .red-text'), function (i) {
                i.classList.remove('red-text');
            });
            angular.forEach(document.querySelectorAll('.Form_Consulta input'), function (i) {
                i.setAttribute("readonly", true);
            });
            angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
                i.setAttribute("disabled", true);
            });
            //
            $scope.Modal_Consulta_Tipo = "";
            $scope.Modal_Consulta_Numero = "";//17807154
            $scope.Modal_Consulta_Fuente = "O";
            $scope.Modal_Consulta_Diagnostico = "";
            $scope.Var_Seccional.Busqueda.Diagnostico.Filtro = null;
            $scope.Var_Seccional.Busqueda.Diagnostico.Listado = null;
            $('#Modal_NuevaGestion').modal('open');
            setTimeout(() => { $scope.$apply(); }, 500);
            document.getElementById("Modal_Consulta_Numero").focus();
        }
        if (Accion == 'G') {
            var Campos_Empty = false;
            if ($scope.Modal_Consulta_Tipo == undefined || $scope.Modal_Consulta_Tipo == null || $scope.Modal_Consulta_Tipo == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Tipo_Label').classList.add('red-text');
            }
            if ($scope.Modal_Consulta_Nombre == undefined || $scope.Modal_Consulta_Nombre == null || $scope.Modal_Consulta_Nombre == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Nombre_Label').classList.add('red-text');
            }
            if ($scope.Modal_Consulta_Numero == undefined || $scope.Modal_Consulta_Numero == null || $scope.Modal_Consulta_Numero == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Label').classList.add('red-text');
            }
            if ($scope.Modal_Consulta_Fuente == undefined || $scope.Modal_Consulta_Fuente == null || $scope.Modal_Consulta_Fuente == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Fuente_Label').classList.add('red-text');
            }
            if ($scope.Modal_Consulta_Numero == undefined || $scope.Modal_Consulta_Numero == null || $scope.Modal_Consulta_Numero == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Label').classList.add('red-text');
            }
            if ($scope.Modal_Consulta_Diagnostico_Cod == undefined || $scope.Modal_Consulta_Diagnostico_Cod == null || $scope.Modal_Consulta_Diagnostico_Cod == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Diag_Label').classList.add('red-text');
            }
            if ($scope.Modal_Consulta_Cod_Cohorte == undefined || $scope.Modal_Consulta_Cod_Cohorte == null || $scope.Modal_Consulta_Cod_Cohorte == '') {
                Campos_Empty = true; document.querySelector('#Modal_Consulta_Cod_Cohorte_Label').classList.add('red-text');
            }

            if (Campos_Empty == false) {
                var datos = {
                    "NUM_RADICADO": "",
                    "TIPO_DOC_AFI": $scope.Modal_Consulta_Tipo,
                    "DOC_AFI": $scope.Modal_Consulta_Numero,
                    "FUENTE": $scope.Modal_Consulta_Fuente,
                    "COD_COHORTE": $scope.Modal_Consulta_Cod_Cohorte,
                    "COD_DIAG": $scope.Modal_Consulta_Diagnostico_Cod,
                    "NOM_DIAG": $scope.Modal_Consulta_Diagnostico_Nom,
                    "CLASE_CONCEPTO": $scope.Modal_Consulta_Clase,
                    "COD_CLASE_CONCEPTO": $scope.Modal_Consulta_Cod_Clase
                };
                $scope.Otra_Fuente_Datos = datos;
                $scope.Buscar_OtraFuente_Registro();
                $scope.closeModal();

            } else {
                Materialize.toast('¡Campos vacios o invalidos!', 3000);
            }
        }

    }

    $scope.Buscar_OtraFuente_Registro = function () {
        $scope.Limpiar_Campos_Req('Var_Seccional');
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Activar_Registro',
                Tipo_Doc: $scope.Modal_Consulta_Tipo,
                Num_Doc: $scope.Modal_Consulta_Numero,
                Fuente: $scope.Modal_Consulta_Fuente,
                Cod_Coh: $scope.Modal_Consulta_Cod_Cohorte,
                Diag: $scope.Modal_Consulta_Diagnostico_Cod,
                Ced: $scope.Rol_Cedula,
                Clase_Concepto: $scope.Modal_Consulta_Cod_Clase,
            }
        }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo == 0) {
                    $scope.Limpiar_Campos_Req('Var_Seccional');
                    $http({
                        method: 'POST',
                        url: "php/altocosto/siniestros/gestionsiniestros.php",
                        data: {
                            function: 'Obt_Registros_Secc',
                            Cedula: $scope.Rol_Cedula,
                            Gestion: 'E',
                            Rad: response.data.Radicado
                        }
                    }).then(function (response) {
                        $scope.HSEC_Btn_G = false;
                        $scope.HSEC_Btn_X = false;
                        if (response.data.length != 0 && response.data[0].RADICADO != undefined && response.data.toString().substr(0, 3) != '<br') {
                            var data = response.data[0];
                            // console.log(JSON.stringify(data));
                            $scope.Color_Bg = '';
                            if (data.FUENTE == 'A') { $scope.Color_Bg = "BgColor_A"; $scope.Color_Co = "Color_A"; }
                            if (data.FUENTE == 'R') { $scope.Color_Bg = "BgColor_R"; $scope.Color_Co = "Color_R"; }
                            if (data.FUENTE == 'C') { $scope.Color_Bg = "BgColor_C"; $scope.Color_Co = "Color_C"; }
                            if (data.FUENTE == 'N') { $scope.Color_Bg = "BgColor_N"; $scope.Color_Co = "Color_N"; }
                            if (data.FUENTE != 'A' && data.FUENTE != 'R' && data.FUENTE != 'C' && data.FUENTE != 'N') { $scope.Color_Bg = "BgColor_O"; $scope.Color_Co = "Color_O"; }
                            ///////////////
                            var FECHA_NAC = new Date(data.FECHA_NAC);
                            $scope.Var_Seccional.Vista = '3';
                            // var Fecha_Gestion = (X.FECHA_GESTION == '') ? $scope.SysDay : new Date(X.FECHA_GESTION);
                            $scope.Var_Seccional.Form = {
                                Estado: 'A',
                                Estado_Nom: '',
                                Status: data.STATUS,
                                Fuente: data.FUENTE,
                                Fuente_Nom: $scope.Find_Fuente(data.FUENTE),
                                Radicado: data.RADICADO,
                                Cod_Cohorte: $scope.Otra_Fuente_Datos.COD_COHORTE,
                                Cod_Doc_Cohorte: data.COD_DOC_COHORTE,
                                Diagnostico_Cod: data.COD_DIAGNOSTICO,
                                Diagnostico: data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO,
                                Diagnostico_Cod_SAVE: data.COD_DIAGNOSTICO,
                                Diagnostico_SAVE: data.NOM_DIAGNOSTICO,
                                Clase_Cod: data.COD_CLASE_CONCEPTO,
                                Clase: data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO,
                                Clase_Cod_SAVE: data.COD_CLASE_CONCEPTO,
                                Clase_SAVE: data.CLASE_CONCEPTO,

                                Fecha_Gestion: $scope.SysDay,
                                Fecha_Inicio: data.FECHA_INICIO,
                                Fecha_Fin: data.FECHA_FIN,
                                Seccional_Cod: '',
                                Seccional_Nom: '',
                                Municipio_Cod: '',
                                Municipio_Nom: '',
                                Regimen: data.REGIMEN,

                                Afi_Ubicacion: data.UBICACION + ' - ' + data.SECCIONAL,
                                Afi_Tipo_Doc: $scope.Otra_Fuente_Datos.TIPO_DOC_AFI,
                                Afi_Num_Doc: $scope.Otra_Fuente_Datos.DOC_AFI,
                                Afi_Nombre: data.NOMBRE,
                                Afi_Pri_Nombre: data.PRI_NOMBRE,
                                Afi_Pri_Apellido: data.PRI_APELLIDO,
                                Afi_Seg_Nombre: data.SEG_NOMBRE,
                                Afi_Seg_Apellido: data.SEG_APELLIDO,
                                Afi_Fecha_Nac: FECHA_NAC,
                                Afi_Edad: data.EDAD,
                                Afi_Sexo: data.SEXO,
                                Afi_Portabilidad: data.PORTABILIDAD,
                                Afi_Ips: data.IPS,
                                Afi_Contratada: '',

                                Op_Pluripatologico: (data.PLURIPATOLOGICO == 'S') ? true : false,
                                Op_Fecha_Diag: $scope.SysDay,
                                Op_Prioridad: '',
                                Op_IpsAsig: '',
                                Op_IpsAsig_Cod: '',
                                Op_Fecha_inicio_IpsAsig: $scope.SysDay,
                                Op_Observacion: '',

                                Soportes: {
                                    Soporte_URL: '',
                                    Soporte_B64: '',
                                    Soporte_RUTA: '',
                                }
                            }
                            // $scope.Var_Seccional.Busqueda.Tipo_Tratamiento.Listado = $scope[$scope.Otra_Fuente_Datos.COD_COHORTE];
                            // $('.Clase_Listar_Tipo_Tratamiento').css({ width: $('#Var_Seccional_Form_Op_Tipo_Tratamiento')[0].offsetWidth });
                            $scope.Var_Seccional.Busqueda.IpsAsig.SAVE = null;
                            $scope.Var_Seccional.Busqueda.IpsAsig.Listado = null;
                            $scope.Var_Seccional.Busqueda.Diagnostico_F.SAVE = data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO;
                            $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                            $scope.Var_Seccional.Busqueda.Clase_F.SAVE = data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO;
                            $scope.Var_Seccional.Busqueda.Clase_F.Listado = null;
                            /////////////////////////////////////////////////
                            $scope.Var_Seccional.Busqueda.Diagnostico_F.Filtro = null;
                            $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                            $scope.Var_Seccional.Busqueda.Clase_F.Filtro = null;
                            $scope.Var_Seccional.Busqueda.Clase_F.Listado = null;
                            /////////////////////////////////////////////////
                            angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados input'), function (i) {
                                i.setAttribute("readonly", true);
                            });
                            angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados select'), function (i) {
                                i.setAttribute("disabled", true);
                            });
                            setTimeout(() => {
                                angular.forEach(document.querySelectorAll('.Var_Seccional_Form_Campos_Desactivados input'), function (i) {
                                    i.classList.add("class_gris");
                                });
                            }, 1500);
                            $timeout(function () {
                                $("#collapsible-header-Patologias1").removeClass(function () {
                                    return "active";
                                }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
                            }, 1000);
                            /////////////////////////////////////////////////
                            setTimeout(function () { $scope.$apply() }, 1000);
                            if (data.PLURIPATOLOGICO == 'S') { $scope.Ver_Patologia('Var_Seccional'); }
                            swal.close();
                            document.getElementById("Var_Seccional_Form_Op_Fecha_Diag").focus();
                        } else if (response.data.toString().substr(0, 3) == '<br') {
                            swal({
                                title: "¡IMPORTANTE!",
                                text: response.data,
                                type: "info",
                            }).catch(swal.noop);
                        }
                    });
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: response.data.Nombre,
                        type: "info",
                    }).catch(swal.noop);
                }
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.KeyFind_Afiliado = function (keyEvent) {
        if (keyEvent.which === 13)
            $scope.Buscar_Afiliado();
    }
    $scope.Buscar_Afiliado = function () {
        angular.forEach(document.querySelectorAll('#Modal_ConsultarAfiliado .red-text'), function (i) {
            i.classList.remove('red-text');
        });

        var Campos_Empty = false;
        if ($scope.Modal_Consulta_Tipo == undefined || $scope.Modal_Consulta_Tipo == null || $scope.Modal_Consulta_Tipo == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Tipo_Label').classList.add('red-text');
        }
        if ($scope.Modal_Consulta_Numero == undefined || $scope.Modal_Consulta_Numero == null || $scope.Modal_Consulta_Numero == '') {
            Campos_Empty = true; document.querySelector('#Modal_Consulta_Numero_Label').classList.add('red-text');
        }
        if (Campos_Empty == false) {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: 'Buscar_Afiliado',
                    Tipo_Doc: $scope.Modal_Consulta_Tipo,
                    Num_Doc: $scope.Modal_Consulta_Numero
                }
            }).then(function (response) {
                if (response.data) {
                    if (response.data[0]) {
                        $scope.Modal_Consulta_Nombre = response.data[0].NOMBRE;
                        document.getElementById("Gestion_Diag").focus();
                    } else {
                        swal({
                            title: "¡IMPORTANTE!",
                            text: response.data.Nombre,
                            type: "warning",
                        }).catch(swal.noop);
                        document.getElementById("Modal_Consulta_Numero").focus();
                    }
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: response.data,
                        type: "info",
                    }).catch(swal.noop);
                    document.getElementById("Modal_Consulta_Numero").focus();
                }
            });
        }
    }

    //CONSULTA DIAGNOSTICO_F
    $scope.KeyFind_ObDiag_F = function (keyEvent, HOJA, CLASE) {
        if ($scope[HOJA].Busqueda.Diagnostico_F.Filtro != null && $scope[HOJA].Busqueda.Diagnostico_F.Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope[HOJA].Busqueda.Diagnostico_F.Seleccion = $scope[HOJA].Busqueda.Diagnostico_F.Seleccion >= ($scope[HOJA].Busqueda.Diagnostico_F.Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda.Diagnostico_F.Seleccion + 1;
                document.querySelector('.' + CLASE).scrollTo(0, document.querySelector('#Diagnostico_F' + $scope[HOJA].Busqueda.Diagnostico_F.Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope[HOJA].Busqueda.Diagnostico_F.Seleccion = $scope[HOJA].Busqueda.Diagnostico_F.Seleccion <= 0 || $scope[HOJA].Busqueda.Diagnostico_F.Seleccion == 9999 ? $scope[HOJA].Busqueda.Diagnostico_F.Filtro.length - 1 : $scope[HOJA].Busqueda.Diagnostico_F.Seleccion - 1;
                document.querySelector('.' + CLASE).scrollTo(0, document.querySelector('#Diagnostico_F' + $scope[HOJA].Busqueda.Diagnostico_F.Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda.Diagnostico_F.Seleccion != 9999) {
                var x = $scope[HOJA].Busqueda.Diagnostico_F.Filtro[$scope[HOJA].Busqueda.Diagnostico_F.Seleccion];
                $scope.FillTextbox_Listado_Diag_F(x.DIAGNOSTICO, x.DESCRIPCION, HOJA);
            }
        } else {
            if (keyEvent.which === 13)
                $scope.Buscar_Diag_F(HOJA);
        }
    }
    $scope.Buscar_Diag_F = function (HOJA) {
        if ($scope[HOJA].Form.Diagnostico.length > 2) {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: $scope[HOJA].Form.Cod_Cohorte == 'EH' ? 'Obtener_DiagsxCohorte' : 'Obtener_Diagnostico_F',
                    Conc: $scope[HOJA].Form.Diagnostico.toUpperCase(),
                    Coh: $scope[HOJA].Form.Cod_Cohorte,
                    Cla: $scope[HOJA].Form.Clase_Cod
                }
            }).then(function (response) {
                if (response.data.toString().substr(0, 3) != '<br') {
                    if (response.data[0] != undefined && response.data.length > 1) {
                        if ($scope[HOJA].Form.Cod_Cohorte == 'EH') {
                            var data = [];
                            response.data.forEach(e => {
                                data.push({
                                    DIAGNOSTICO: e.COD_CLASE_COHORTE,
                                    DESCRIPCION: e.NOM_CLASE_COHORTE
                                })
                            });
                            setTimeout(() => {
                                $scope[HOJA].Busqueda.Diagnostico_F.Filtro = data;
                                $scope[HOJA].Busqueda.Diagnostico_F.Listado = data;
                                $scope.$apply();
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                $scope[HOJA].Busqueda.Diagnostico_F.Filtro = response.data;
                                $scope[HOJA].Busqueda.Diagnostico_F.Listado = response.data;
                                $scope.$apply();
                            }, 1000);
                        }
                        $('.Clase_Listar_Diags_F').css({ width: $('#' + HOJA + '_Form_Diagnostico')[0].offsetWidth });
                    }
                    if (response.data.length == 1) {
                        if (response.data[0].Codigo == 1) {
                            swal({
                                title: "¡Mensaje!",
                                text: response.data[0].Nombre,
                                type: "info",
                            }).catch(swal.noop);
                            $scope.Var_Seccional.Busqueda.Diagnostico_F.Filtro = null;
                            $scope.Var_Seccional.Busqueda.Diagnostico_F.Listado = null;
                        } else {
                            if ($scope[HOJA].Form.Cod_Cohorte == 'EH') {
                                $scope.FillTextbox_Listado_Diag_F(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION, HOJA);
                            } else {
                                $scope.FillTextbox_Listado_Diag_F(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION, HOJA);
                            }
                        }
                    } else if (response.data.length == 0) {
                        swal({
                            title: "¡Importante!",
                            text: "No se encontro el diagnostico",
                            type: "info",
                        }).catch(swal.noop);
                    }
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: response.data,
                        type: "warning"
                    }).catch(swal.noop);
                }
            })
        } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
    }
    $scope.Complete_Listado_Diag_F = function (keyEvent, string, HOJA) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if ($scope[HOJA].Form.Diagnostico != undefined && string != undefined && $scope[HOJA].Busqueda.Diagnostico_F.Listado != undefined) {
                $('.Clase_Listar_Diags_F').css({ width: $('#' + HOJA + '_Form_Diagnostico')[0].offsetWidth });
                var output = [];
                angular.forEach($scope[HOJA].Busqueda.Diagnostico_F.Listado, function (x) {
                    if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DIAGNOSTICO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "DIAGNOSTICO": x.DIAGNOSTICO, "DESCRIPCION": x.DESCRIPCION.toUpperCase() });
                    }
                });
                $scope[HOJA].Busqueda.Diagnostico_F.Filtro = output;
                $scope[HOJA].Busqueda.Diagnostico_F.Seleccion = 9999;
            }
        }
    }
    $scope.FillTextbox_Listado_Diag_F = function (codigo, nombre, HOJA) {
        $scope[HOJA].Form.Diagnostico_Cod = codigo;
        $scope[HOJA].Form.Diagnostico = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Diagnostico_F.SAVE = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Diagnostico_F.Filtro = null;
        // console.log($scope[HOJA].Form.Diagnostico_Cod, $scope[HOJA].Form.Diagnostico_Cod_SAVE)
        setTimeout(() => {
            if ($scope[HOJA].Form.Cod_Cohorte == 'EH' && $scope[HOJA].Form.Diagnostico_Cod != $scope[HOJA].Form.Diagnostico_Cod_SAVE) {
                $scope.Buscar_Clase_F(HOJA);
            }
            $scope.$apply();
        }, 500);
    }
    $scope.Blur_Diag_F = function (HOJA) {
        setTimeout(() => {
            if ($scope[HOJA] != null && $scope[HOJA].Form != undefined) {
                if (($scope[HOJA].Busqueda.Diagnostico_F.Filtro == null || $scope[HOJA].Busqueda.Diagnostico_F.Filtro.length == 0)
                    && $scope[HOJA].Form.Diagnostico != $scope[HOJA].Busqueda.Diagnostico_F.SAVE) {
                    $scope[HOJA].Form.Diagnostico = $scope[HOJA].Busqueda.Diagnostico_F.SAVE;
                }
                if ($scope[HOJA].Form.Diagnostico == '') {
                    $scope[HOJA].Form.Diagnostico = $scope[HOJA].Busqueda.Diagnostico_F.SAVE;
                    $scope[HOJA].Busqueda.Diagnostico_F.Filtro = null;
                }
            }
            $scope.$apply();
        }, 300);
    }

    //CONSULTA CLASE_F ---COHORTE == HF
    $scope.Buscar_Clase_F = function (HOJA) {
        if ($scope[HOJA].Form.Diagnostico_Cod.length > 2) {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: 'Obtener_Diagnostico',
                    Conc: $scope[HOJA].Form.Diagnostico_Cod,
                }
            }).then(function (response) {
                if (response.data.toString().substr(0, 3) != '<br') {
                    if (response.data[0] != undefined && response.data.length > 1) {
                        var data = [];
                        response.data.forEach(e => {
                            data.push({
                                CLASE: e.COD_CLASE_COHORTE,
                                DESCRIPCION: e.NOM_CLASE_COHORTE
                            })
                        });
                        // console.table(data);
                        setTimeout(() => {
                            $scope[HOJA].Form.Clase_Cod = '';
                            $scope[HOJA].Form.Clase = '';
                            $scope[HOJA].Busqueda.Clase_F.SAVE = '';
                            $scope[HOJA].Busqueda.Clase_F.Filtro = data;
                            $scope[HOJA].Busqueda.Clase_F.Listado = data;
                            $('.Clase_Listar_Clase_F').css({ width: $('#' + HOJA + '_Form_Clase')[0].offsetWidth });
                            document.querySelector('#' + HOJA + '_Form_Clase').removeAttribute("readonly");
                            document.querySelector('#' + HOJA + '_Form_Clase').classList.remove("class_gris");
                            document.getElementById(HOJA + '_Form_Clase').focus();
                            $scope.$apply();
                        }, 1000);
                    }
                    if (response.data.length == 1) {
                        $scope.FillTextbox_Listado_Clase_F(response.data[0].COD_CLASE_COHORTE, response.data[0].NOM_CLASE_COHORTE, HOJA);
                        document.querySelector('#' + HOJA + '_Form_Clase').setAttribute("readonly", true);
                        document.querySelector('#' + HOJA + '_Form_Clase').classList.add("class_gris");
                    } else if (response.data.length == 0) {
                        swal({
                            title: "¡Importante!",
                            text: "No se encontro la clase",
                            type: "info",
                        }).catch(swal.noop);
                    }
                } else {
                    swal({
                        title: "¡Importante!",
                        text: response.data,
                        type: "warning"
                    }).catch(swal.noop);
                }
            })
        } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
    }
    $scope.KeyFind_ObClase_F = function (keyEvent, HOJA, CLASE) {
        if ($scope[HOJA].Busqueda.Clase_F.Filtro != null && $scope[HOJA].Busqueda.Clase_F.Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope[HOJA].Busqueda.Clase_F.Seleccion = $scope[HOJA].Busqueda.Clase_F.Seleccion >= ($scope[HOJA].Busqueda.Clase_F.Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda.Clase_F.Seleccion + 1;
                document.querySelector('.' + CLASE).scrollTo(0, document.querySelector('#Clase_F' + $scope[HOJA].Busqueda.Clase_F.Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope[HOJA].Busqueda.Clase_F.Seleccion = $scope[HOJA].Busqueda.Clase_F.Seleccion <= 0 || $scope[HOJA].Busqueda.Clase_F.Seleccion == 9999 ? $scope[HOJA].Busqueda.Clase_F.Filtro.length - 1 : $scope[HOJA].Busqueda.Clase_F.Seleccion - 1;
                document.querySelector('.' + CLASE).scrollTo(0, document.querySelector('#Clase_F' + $scope[HOJA].Busqueda.Clase_F.Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda.Clase_F.Seleccion != 9999) {
                var x = $scope[HOJA].Busqueda.Clase_F.Filtro[$scope[HOJA].Busqueda.Clase_F.Seleccion];
                $scope.FillTextbox_Listado_Clase_F(x.CLASE, x.DESCRIPCION, HOJA);
            }
        }
    }
    $scope.Complete_Listado_Clase_F = function (keyEvent, string, HOJA) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if ($scope[HOJA].Form.Clase != undefined && string != undefined && $scope[HOJA].Busqueda.Clase_F.Listado != undefined) {
                $('.Clase_Listar_Clases_F').css({ width: $('#' + HOJA + '_Form_Clase')[0].offsetWidth });
                var output = [];
                angular.forEach($scope[HOJA].Busqueda.Clase_F.Listado, function (x) {
                    if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CLASE.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "CLASE": x.CLASE, "DESCRIPCION": x.DESCRIPCION.toUpperCase() });
                    }
                });
                $scope[HOJA].Busqueda.Clase_F.Filtro = output;
                $scope[HOJA].Busqueda.Clase_F.Seleccion = 9999;
            }
        }
    }
    $scope.FillTextbox_Listado_Clase_F = function (codigo, nombre, HOJA) {
        $scope[HOJA].Form.Clase_Cod = codigo;
        $scope[HOJA].Form.Clase = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Clase_F.SAVE = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Clase_F.Filtro = null;
        if ($scope[HOJA].Form.Cod_Cohorte == 'EH' && $scope[HOJA].Form.Clase_Cod != $scope[HOJA].Form.Clase_Cod_SAVE) {
            $scope.Actualizar_Diag_Clase(HOJA);
        }
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }
    $scope.Blur_Clase_F = function (HOJA) {
        setTimeout(() => {
            if ($scope[HOJA] != null && $scope[HOJA].Form != undefined) {
                if (($scope[HOJA].Busqueda.Clase_F.Filtro == null || $scope[HOJA].Busqueda.Clase_F.Filtro.length == 0)
                    && $scope[HOJA].Form.Clase != $scope[HOJA].Busqueda.Clase_F.SAVE) {
                    $scope[HOJA].Form.Clase = $scope[HOJA].Busqueda.Clase_F.SAVE;
                }
                if ($scope[HOJA].Form.Clase == '') {
                    $scope[HOJA].Form.Clase = $scope[HOJA].Busqueda.Clase_F.SAVE;
                    $scope[HOJA].Busqueda.Clase_F.Filtro = null;
                }
            }
            $scope.$apply();
        }, 300);
    }

    $scope.Actualizar_Diag_Clase = function (HOJA) {
        swal({
            title: "¿Está seguro que actualizar el diagnóstico y la clasificación?",
            type: "question",
            showCancelButton: true,
            allowOutsideClick: false
        }).catch(swal.noop)
            .then((willDelete) => {
                // $scope.Actualizar_Diag_Clase('a');
                if (willDelete) {
                    // console.log(willDelete);
                    $http({
                        method: 'POST',
                        url: "php/altocosto/siniestros/gestionsiniestros.php",
                        data: {
                            function: 'Actualizar_Diag_Clase',
                            Rad: $scope[HOJA].Form.Radicado,
                            Conc: $scope[HOJA].Form.Diagnostico_Cod.toUpperCase(),
                            Cla: $scope[HOJA].Form.Clase_Cod
                        }
                    }).then(function (response) {
                        if (response.data.Codigo && response.data.Codigo == 0) {
                            $scope[HOJA].Form.Diagnostico_Cod_SAVE = $scope[HOJA].Form.Diagnostico_Cod;
                            $scope[HOJA].Form.Diagnostico_SAVE = $scope[HOJA].Form.Diagnostico;
                            $scope[HOJA].Form.Clase_Cod_SAVE = $scope[HOJA].Form.Clase_Cod;
                            $scope[HOJA].Form.Clase_SAVE = $scope[HOJA].Form.Clase;
                            swal({
                                title: response.data.Nombre,
                                type: "success",
                            }).catch(swal.noop);
                            setTimeout(() => {
                                $scope.$apply();
                            }, 1000);
                        } else {
                            $scope.FillTextbox_Listado_Diag_F($scope[HOJA].Form.Diagnostico_Cod_SAVE, $scope[HOJA].Form.Diagnostico_SAVE, HOJA);
                            $scope.FillTextbox_Listado_Clase_F($scope[HOJA].Form.Clase_Cod_SAVE, $scope[HOJA].Form.Clase_SAVE, HOJA);
                            document.querySelector('#Var_Seccional_Form_Clase').setAttribute("readonly", true);
                            document.querySelector('#Var_Seccional_Form_Clase').classList.add("class_gris");
                            setTimeout(() => {
                                $scope.$apply();
                            }, 1000);
                            if (response.data.Codigo == 1) {
                                swal({
                                    title: "¡IMPORTANTE!",
                                    text: response.data.Nombre,
                                    type: "warning",
                                }).catch(swal.noop);
                            } else {
                                swal({
                                    title: "¡IMPORTANTE!",
                                    text: response.data,
                                    type: "warning",
                                }).catch(swal.noop);
                            }
                        }
                    });
                } else {
                    $scope.FillTextbox_Listado_Diag_F($scope[HOJA].Form.Diagnostico_Cod_SAVE, $scope[HOJA].Form.Diagnostico_SAVE, HOJA);
                    $scope.FillTextbox_Listado_Clase_F($scope[HOJA].Form.Clase_Cod_SAVE, $scope[HOJA].Form.Clase_SAVE, HOJA);
                    document.querySelector('#Var_Seccional_Form_Clase').setAttribute("readonly", true);
                    document.querySelector('#Var_Seccional_Form_Clase').classList.add("class_gris");
                    setTimeout(() => {
                        $scope.$apply();
                    }, 1000);
                }
            })
    }
    //CONSULTA IPS ASIGNADA
    $scope.KeyFind_ObIpsAsig = function (keyEvent, HOJA) {
        if ($scope[HOJA].Busqueda.IpsAsig.Filtro != null && $scope[HOJA].Busqueda.IpsAsig.Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope[HOJA].Busqueda.IpsAsig.Seleccion = $scope[HOJA].Busqueda.IpsAsig.Seleccion >= ($scope[HOJA].Busqueda.IpsAsig.Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda.IpsAsig.Seleccion + 1;
                document.querySelector('.Clase_Listar_IpsAsig').scrollTo(0, document.querySelector('#IpsAsig' + $scope[HOJA].Busqueda.IpsAsig.Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope[HOJA].Busqueda.IpsAsig.Seleccion = $scope[HOJA].Busqueda.IpsAsig.Seleccion <= 0 || $scope[HOJA].Busqueda.IpsAsig.Seleccion == 9999 ? $scope[HOJA].Busqueda.IpsAsig.Filtro.length - 1 : $scope[HOJA].Busqueda.IpsAsig.Seleccion - 1;
                document.querySelector('.Clase_Listar_IpsAsig').scrollTo(0, document.querySelector('#IpsAsig' + $scope[HOJA].Busqueda.IpsAsig.Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda.IpsAsig.Seleccion != 9999) {
                var x = $scope[HOJA].Busqueda.IpsAsig.Filtro[$scope[HOJA].Busqueda.IpsAsig.Seleccion];
                $scope.FillTextbox_Listado_IpsAsig(x.CODIGO, x.NOMBRE, x.CONTRATADA, HOJA);
            }
        } else {
            if (keyEvent.which === 13)
                $scope.Buscar_IpsAsig(HOJA);
        }
    }
    $scope.Buscar_IpsAsig = function (HOJA) {
        if ($scope[HOJA].Form.Op_IpsAsig.length > 2) {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: 'Obt_Ips_Asignada',
                    Conc: $scope[HOJA].Form.Op_IpsAsig.toUpperCase(),
                    Regimen: $scope[HOJA].Form.Regimen,
                    Cohorte: $scope[HOJA].Form.Cod_Cohorte
                }
            }).then(function (response) {
                if (response.data.toString().substr(0, 3) != '<br') {
                    if (response.data[0] != undefined && response.data.length > 1) {
                        $scope[HOJA].Busqueda.IpsAsig.Filtro = response.data;
                        $scope[HOJA].Busqueda.IpsAsig.Listado = response.data;
                        $('.Clase_Listar_IpsAsig').css({ width: $('#' + HOJA + '_Form_Op_IpsAsig')[0].offsetWidth });
                    }
                    if (response.data.length == 1) {
                        if (response.data[0].Codigo == '1') {
                            swal({
                                title: "¡Mensaje!",
                                text: response.data[0].Nombre,
                                type: "info",
                            }).catch(swal.noop);
                            $scope[HOJA].Busqueda.IpsAsig.Filtro = null;
                            $scope[HOJA].Busqueda.IpsAsig.Listado = null;
                        } else {
                            $scope.FillTextbox_Listado_IpsAsig(response.data[0].CODIGO, response.data[0].NOMBRE, response.data[0].CONTRATADA, HOJA);
                        }
                    } else if (response.data.length == 0) {
                        swal({
                            title: "¡Importante!",
                            text: "No se encontro la Ips",
                            type: "info",
                        }).catch(swal.noop);
                    }
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: response.data,
                        type: "warning"
                    }).catch(swal.noop);
                }
            })
        } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
    }
    $scope.Complete_Listado_IpsAsig = function (keyEvent, string, HOJA) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if ($scope[HOJA].Form.Op_IpsAsig != undefined && string != undefined && $scope[HOJA].Busqueda.IpsAsig.Listado != undefined) {
                $('.Clase_Listar_IpsAsig').css({ width: $('#' + HOJA + '_Form_Op_IpsAsig')[0].offsetWidth });
                var output = [];
                angular.forEach($scope[HOJA].Busqueda.IpsAsig.Listado, function (x) {
                    if (x.NOMBRE.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.CODIGO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase(), "CONTRATADA": x.CONTRATADA });
                    }
                });
                $scope[HOJA].Busqueda.IpsAsig.Filtro = output;
                $scope[HOJA].Busqueda.IpsAsig.Seleccion = 9999;
            }
        }
    }
    $scope.FillTextbox_Listado_IpsAsig = function (codigo, nombre, contratada, HOJA) {
        $scope[HOJA].Form.Op_IpsAsig_Cod = codigo;
        $scope[HOJA].Form.Afi_Contratada = contratada;
        $scope[HOJA].Form.Op_IpsAsig = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.IpsAsig.SAVE = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.IpsAsig.Filtro = null;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }
    $scope.Blur_IpsAsig = function (HOJA) {
        setTimeout(() => {
            if ($scope[HOJA] != null && $scope[HOJA].Form != undefined) {
                if (($scope[HOJA].Busqueda.IpsAsig.Filtro == null || $scope[HOJA].Busqueda.IpsAsig.Filtro.length == 0)
                    && $scope[HOJA].Form.Op_IpsAsig != $scope[HOJA].Busqueda.IpsAsig.SAVE) {
                    $scope[HOJA].Form.Op_IpsAsig = $scope[HOJA].Busqueda.IpsAsig.SAVE;
                }
                if ($scope[HOJA].Form.Op_IpsAsig == '') {
                    $scope[HOJA].Form.Op_IpsAsig = $scope[HOJA].Busqueda.IpsAsig.SAVE;
                    $scope[HOJA].Busqueda.IpsAsig.Filtro = null;
                }
            }
            $scope.$apply();
        }, 300);
    }

    //CONSULTA DIAGNOSTICO
    $scope.KeyFind_ObDiag = function (keyEvent) {
        if ($scope.Var_Seccional.Busqueda.Diagnostico.Filtro != null && $scope.Var_Seccional.Busqueda.Diagnostico.Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion = $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion >= ($scope.Var_Seccional.Busqueda.Diagnostico.Filtro.length - 1) ? 0 : $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion + 1;
                document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion = $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion <= 0 || $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion == 9999 ? $scope.Var_Seccional.Busqueda.Diagnostico.Filtro.length - 1 : $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion - 1;
                document.querySelector('.Clase_Listar_Diags').scrollTo(0, document.querySelector('#Diagnostico' + $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion != 9999) {
                var x = $scope.Var_Seccional.Busqueda.Diagnostico.Filtro[$scope.Var_Seccional.Busqueda.Diagnostico.Seleccion];
                $scope.FillTextbox_Listado_Diag(x.DIAGNOSTICO, x.DESCRIPCION, x.COD_COHORTE, x.COD_CLASE_COHORTE, x.NOM_CLASE_COHORTE);
            }
        } else {
            if (keyEvent.which === 13)
                $scope.Buscar_Diag();
        }
    }
    $scope.Buscar_Diag = function () {
        if ($scope.Modal_Consulta_Diagnostico.length > 2) {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: 'Obtener_Diagnostico',
                    Conc: $scope.Modal_Consulta_Diagnostico.toUpperCase()
                }
            }).then(function (response) {
                if (response.data.toString().substr(0, 3) != '<br') {
                    if (response.data[0] != undefined && response.data.length > 1) {
                        $scope.Var_Seccional.Busqueda.Diagnostico.Filtro = response.data;
                        $scope.Var_Seccional.Busqueda.Diagnostico.Listado = response.data;
                        $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
                    }
                    if (response.data.length == 1) {
                        if (response.data[0].DIAGNOSTICO == '-1') {
                            swal({
                                title: "¡Mensaje!",
                                text: response.data[0].Nombre,
                                type: "info",
                            }).catch(swal.noop);
                            $scope.Var_Seccional.Busqueda.Diagnostico.Filtro = null;
                            $scope.Var_Seccional.Busqueda.Diagnostico.Listado = null;
                        } else {
                            $scope.FillTextbox_Listado_Diag(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION, response.data[0].COD_COHORTE, response.data[0].COD_CLASE_COHORTE, response.data[0].NOM_CLASE_COHORTE);
                        }
                    } else if (response.data.length == 0) {
                        swal({
                            title: "¡Importante!",
                            text: "No se encontro el diagnostico",
                            type: "info",
                        }).catch(swal.noop);
                    }
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: response.data,
                        type: "warning"
                    }).catch(swal.noop);
                }
            })
        } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
    }
    $scope.Complete_Listado_Diag = function (keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if ($scope.Modal_Consulta_Diagnostico != undefined && string != undefined && $scope.Var_Seccional.Busqueda.Diagnostico.Listado != undefined) {
                $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
                var output = [];
                angular.forEach($scope.Var_Seccional.Busqueda.Diagnostico.Listado, function (x) {
                    if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DIAGNOSTICO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "DIAGNOSTICO": x.DIAGNOSTICO, "DESCRIPCION": x.DESCRIPCION.toUpperCase(), "COD_COHORTE": x.COD_COHORTE.toUpperCase(), "NOM_COHORTE": x.NOM_COHORTE.toUpperCase(), "COD_CLASE_COHORTE": x.COD_CLASE_COHORTE.toUpperCase(), "NOM_CLASE_COHORTE": x.NOM_CLASE_COHORTE.toUpperCase() });
                    }
                });
                $scope.Var_Seccional.Busqueda.Diagnostico.Filtro = output;
                $scope.Var_Seccional.Busqueda.Diagnostico.Seleccion = 9999;
            }
        }
    }
    $scope.FillTextbox_Listado_Diag = function (codigo, nombre, cohorte, cod_clase, clase) {
        $scope.Modal_Consulta_Cod_Cohorte = cohorte;
        $scope.Modal_Consulta_Diagnostico_Cod = codigo;
        $scope.Modal_Consulta_Diagnostico_Nom = nombre;
        $scope.Modal_Consulta_Diagnostico = codigo + ' - ' + nombre;
        $scope.Var_Seccional.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
        $scope.Var_Seccional.Busqueda.Diagnostico.Filtro = null;
        $scope.Var_Seccional.Busqueda.Diagnostico.Cohorte = cohorte;
        $scope.Modal_Consulta_Cod_Clase = cod_clase;
        $scope.Modal_Consulta_Clase = clase;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }
    $scope.Blur_Diag = function () {
        setTimeout(() => {
            if ($scope.Modal_Consulta_Diagnostico != null && $scope.Modal_Consulta_Diagnostico != undefined) {
                if (($scope.Var_Seccional.Busqueda.Diagnostico.Filtro == null || $scope.Var_Seccional.Busqueda.Diagnostico.Filtro.length == 0)
                    && $scope.Modal_Consulta_Diagnostico != $scope.Var_Seccional.Busqueda.Diagnostico.SAVE) {
                    $scope.Modal_Consulta_Diagnostico = $scope.Var_Seccional.Busqueda.Diagnostico.SAVE;
                }
                if ($scope.Modal_Consulta_Diagnostico == '') {
                    $scope.Modal_Consulta_Diagnostico = $scope.Var_Seccional.Busqueda.Diagnostico.SAVE;
                    $scope.Var_Seccional.Busqueda.Diagnostico.Filtro = null;
                }
            }
            $scope.$apply();
        }, 300);
    }

    ///////////////////////////////////////////

    ///////////////////////////////////////////
    $scope.HSEC_Cerrar_Form = function () {
        document.getElementById('inicio').scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(() => {
            $scope.Var_Seccional.Vista = "2";
            $scope.$apply();
        }, 500);
    }

    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ////////////SECIONAL/////SECIONAL//////SECIONAL//////SECIONAL///////SECIONAL/////
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    $scope.HNAC_ObtenerListado = function () {
        $scope.Lista_Tabla = [];
        $scope.Var_Nacional = {
            Vista: '1',
            List_Count: {
                "Aut": 0,
                "Rips": 0,
                "Censo": 0,
                "Otra": 0
            },
            Filtrar_Sol: "",
            Form: null,
            Busqueda: {
                IpsAsig: {
                    Filtro: [],
                    Listado: null,
                    SAVE: null,
                    Seleccion: 9999
                },
                Diagnostico: {
                    Filtro: [],
                    Listado: null,
                    SAVE: null,
                    Cohorte: null,
                    Seleccion: 9999
                },
                Diagnostico_F: {
                    Filtro: [],
                    Listado: null,
                    SAVE: null,
                    Cohorte: null,
                    Seleccion: 9999
                },
                Clase_F: {
                    Filtro: [],
                    Listado: null,
                    SAVE: null,
                    Seleccion: 9999
                }
            }
        }
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Registros_Nac',
                Cedula: $scope.Rol_Cedula
            }
        }).then(function (response) {
            if (response.data && response.data.toString().substr(0, 3) != '<br') {
                if (response.data.Codigo == undefined) {

                    swal.close();
                    setTimeout(() => {
                        response.data.forEach(e => {
                            (e.FUENTE == 'A') ? $scope.Var_Nacional.List_Count.Aut += 1 : '';
                            (e.FUENTE == 'R') ? $scope.Var_Nacional.List_Count.Rips += 1 : '';
                            (e.FUENTE == 'C') ? $scope.Var_Nacional.List_Count.Censo += 1 : '';
                            (e.FUENTE != 'A' && e.FUENTE != 'R' && e.FUENTE != 'C') ? $scope.Var_Nacional.List_Count.Otra += 1 : '';

                            $scope.Lista_Tabla.push({
                                "SECCIONAL": e.UBICACION,
                                "NUM_RADICADO": e.RADICADO,
                                "TIPO_DOC_AFI": e.DOCUMENTO.toString().split("-")[0],
                                "DOC_AFI": e.DOCUMENTO.toString().split("-")[1],
                                "NOMBRE_AFI": e.NOMBRE,
                                "COHORTE": e.COHORTE,
                                "IPS": e.IPS,
                                "PRIORIDAD": e.PRIORIDAD,
                                "PLURIPATOLOGICO": e.PLURIPATOLOGICO,
                                "PLURIPATOLOGICO_NOMB": e.PLURIPATOLOGICO == 'S' ? 'Pluripatologico' : '',
                                "FUENTE": e.FUENTE,
                                "FUENTE_NOM": $scope.Find_Fuente(e.FUENTE),
                                "RESPONSABLE_SECCIONAL": e.RESPONSABLE_SECCIONAL,
                                "ESTADO_AFILIADO": e.ESTADO_AFILIADO
                            });
                        });
                        $scope.initPaginacion($scope.Lista_Tabla);
                        $scope.$apply();
                    }, 500);
                } else {
                    if (response.data.Codigo == 1) {
                        swal({
                            title: "¡IMPORTANTE!",
                            text: response.data.Nombre,
                            type: "warning"
                        }).catch(swal.noop);
                    } else {
                        swal({
                            title: "¡IMPORTANTE!",
                            text: response.data,
                            type: "warning",
                            allowOutsideClick: false
                        }).catch(swal.noop);
                    }
                }
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "warning"
                }).catch(swal.noop);
            }
        });
    }

    $scope.HNAC_Mostar_Formulario = function (X) {
        $scope.Limpiar_Campos_Req('Var_Nacional');
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Registros_Detalle_Nac',
                Radicado: X.NUM_RADICADO,
            }
        }).then(function (response) {
            if (response.data.length != 0 && response.data[0].RADICADO != undefined) {
                var data = response.data[0];
                // console.log(JSON.stringify(data));
                swal.close();
                /////////////////////////////////////////////////////////
                $scope.Color_Bg = '';
                if (data.FUENTE == 'A') { $scope.Color_Bg = "BgColor_A"; $scope.Color_Co = "Color_A"; }
                if (data.FUENTE == 'R') { $scope.Color_Bg = "BgColor_R"; $scope.Color_Co = "Color_R"; }
                if (data.FUENTE == 'C') { $scope.Color_Bg = "BgColor_C"; $scope.Color_Co = "Color_C"; }
                if (data.FUENTE == 'N') { $scope.Color_Bg = "BgColor_N"; $scope.Color_Co = "Color_N"; }
                if (data.FUENTE != 'A' && data.FUENTE != 'R' && data.FUENTE != 'C' && data.FUENTE != 'N') { $scope.Color_Bg = "BgColor_O"; $scope.Color_Co = "Color_O"; }
                /////////////////////////////////////////////////////////

                var FECHA_NAC = new Date(data.FECHA_NAC);
                var FECHA_DIAG = new Date(data.FECHA_DIAG);
                var FECHA_INICIO_IPSASIG = new Date(data.FECHA_VIGENCIA_IPS);
                // var FECHA_GESTION = new Date(data.FECHA_MODIFICACION_SECCIONAL);

                $scope.Var_Nacional.Vista = '2';
                $scope.Var_Nacional.Form = {
                    Estado: data.ESTADO,
                    Status: data.STATUS,
                    Fuente: data.FUENTE,
                    Fuente_Nom: $scope.Find_Fuente(data.FUENTE),
                    Estado_Nom: '',
                    Radicado: data.RADICADO,
                    Cod_Cohorte: data.COD_COHORTE,
                    Cod_Doc_Cohorte: data.COD_DOC_COHORTE,
                    Diagnostico_Cod: data.COD_DIAGNOSTICO,
                    Diagnostico: data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO,
                    Diagnostico_Cod_SAVE: data.COD_DIAGNOSTICO,
                    Diagnostico_SAVE: data.NOM_DIAGNOSTICO,
                    Clase_Cod: data.COD_CLASE_CONCEPTO,
                    Clase: data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO,
                    Clase_Cod_SAVE: data.COD_CLASE_CONCEPTO,
                    Clase_SAVE: data.CLASE_CONCEPTO,

                    Fecha_Gestion: data.FECHA_MODIFICACION_SECCIONAL,
                    Fecha_Inicio: data.FECHA_INICIO,
                    Fecha_Fin: data.FECHA_FIN,
                    Seccional_Nom: data.SECCIONAL,
                    Municipio_Nom: '',
                    Num_Aca: data.NUM_ACA,
                    Regimen: data.REGIMEN,

                    Afi_Ubicacion: data.UBICACION + ' - ' + data.SECCIONAL,
                    Afi_Tipo_Doc: data.TIPO_DOC,
                    Afi_Num_Doc: data.NUM_DOC,
                    Afi_Nombre: data.NOMBRE,
                    Afi_Pri_Nombre: data.PRI_NOMBRE,
                    Afi_Pri_Apellido: data.PRI_APELLIDO,
                    Afi_Seg_Nombre: data.SEG_NOMBRE,
                    Afi_Seg_Apellido: data.SEG_APELLIDO,
                    Afi_Fecha_Nac: FECHA_NAC,
                    Afi_Edad: data.EDAD,
                    Afi_Sexo: data.SEXO,
                    Afi_Portabilidad: data.PORTABILIDAD,
                    Afi_Ips: X.IPS,
                    Afi_Contratada: '',
                    Op_Fecha_Diag: FECHA_DIAG,
                    Op_Pluripatologico: (data.PLURIPATOLOGICO == 'S') ? true : false,
                    Op_Prioridad: (data.PRIORIDAD == 'Alta') ? 'A' : (data.PRIORIDAD == 'Media') ? 'M' : 'B',
                    Op_Observacion: data.OBSERVACION_SECCIONAL,
                    Ruta: data.RUTA.toString().trim(),
                    Ftp: data.FTP,
                    Op_Observacion_Nac: '',
                    Op_IpsAsig: '',
                    Op_IpsAsig_Cod: data.COD_IPS_ATENCION,
                    Op_Fecha_inicio_IpsAsig: FECHA_INICIO_IPSASIG

                }
                setTimeout(() => {
                    angular.forEach(document.querySelectorAll('.Var_Nacional_Form_Campos_Desactivados input'), function (i) {
                        i.classList.add("class_gris");
                    });
                }, 1500);
                $scope.Var_Nacional.Busqueda.IpsAsig.SAVE = (data.COD_IPS_ATENCION != '') ? data.COD_IPS_ATENCION + ' - ' + data.NOM_IPS_ATENCION : '';
                $scope.Var_Nacional.Busqueda.IpsAsig.Listado = null;
                $scope.Var_Nacional.Busqueda.Diagnostico_F.SAVE = (data.COD_DIAGNOSTICO != '') ? data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO : '';
                $scope.Var_Nacional.Busqueda.Diagnostico_F.Listado = null;
                $scope.Var_Nacional.Busqueda.Clase_F.SAVE = (data.COD_CLASE_CONCEPTO != '') ? data.COD_CLASE_CONCEPTO + ' - ' + data.CLASE_CONCEPTO : '';
                $scope.Var_Nacional.Busqueda.Clase_F.Listado = null;
                $scope.Var_Nacional.Busqueda.Diagnostico_F.Filtro = null;
                $scope.Var_Nacional.Busqueda.Diagnostico_F.Listado = null;
                $scope.Var_Nacional.Busqueda.Clase_F.Filtro = null;
                $scope.Var_Nacional.Busqueda.Clase_F.Listado = null;
                /////////////////////////////////////////////////
                $scope.HNAC_Btn_G = false;
                $timeout(function () {
                    $("#collapsible-header-Patologias2").removeClass(function () {
                        return "active";
                    }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
                }, 1000);
                setTimeout(function () { $scope.$apply() }, 1000);
                if (data.PLURIPATOLOGICO == 'S') { $scope.Ver_Patologia('Var_Nacional'); }
                document.getElementById("Var_Nacional_Form_Observacion").focus();
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HNAC_Cerrar_Form = function () {
        document.getElementById('inicio').scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(() => {
            $scope.Var_Nacional.Vista = "1";
            $scope.$apply();
        }, 500);
    }

    $scope.HNAC_Validar_CamposVacios = function (HOJA, Accion) {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        $scope.Limpiar_Campos_Req(HOJA);
        if ($scope.Var_Nacional.Form.Afi_Tipo_Doc == undefined || $scope.Var_Nacional.Form.Afi_Tipo_Doc == null || $scope.Var_Nacional.Form.Afi_Tipo_Doc == '') {
            Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Afi_Tipo_Doc_Label').classList.add('red-text');
            document.getElementById('Var_Nacional_Form_Afi_Tipo_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Nacional.Form.Afi_Num_Doc == undefined || $scope.Var_Nacional.Form.Afi_Num_Doc == null || $scope.Var_Nacional.Form.Afi_Num_Doc == '') {
            Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Afi_Num_Doc_Label').classList.add('red-text');
            document.getElementById('Var_Nacional_Form_Afi_Num_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Nacional.Form.Diagnostico_Cod == undefined || $scope.Var_Nacional.Form.Diagnostico_Cod == null || $scope.Var_Nacional.Form.Diagnostico_Cod == '') {
            Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Diagnostico_Label').classList.add('red-text');
            document.getElementById('Var_Nacional_Form_Diagnostico_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Nacional.Form.Clase_Cod == undefined || $scope.Var_Nacional.Form.Clase_Cod == null || $scope.Var_Nacional.Form.Clase_Cod == '') {
            Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Clase_Label').classList.add('red-text');
            document.getElementById('Var_Nacional_Form_Clase_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Var_Nacional.Form.Op_Fecha_Diag == undefined || $scope.Var_Nacional.Form.Op_Fecha_Diag == null || $scope.Var_Nacional.Form.Op_Fecha_Diag == '') {
            Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Op_Fecha_Diag_Label').classList.add('red-text');
            document.getElementById('Var_Nacional_Form_Op_Fecha_Diag_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if (Accion == 'P') {
            if ($scope.Var_Nacional.Form.Op_IpsAsig_Cod == undefined || $scope.Var_Nacional.Form.Op_IpsAsig_Cod == null || $scope.Var_Nacional.Form.Op_IpsAsig_Cod == '') {
                Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Op_IpsAsig_Label').classList.add('red-text');
                document.getElementById('Var_Nacional_Form_Op_IpsAsig_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
            }
        }
        if ($scope.Var_Nacional.Form.Op_Observacion_Nac == undefined || $scope.Var_Nacional.Form.Op_Observacion_Nac == null || $scope.Var_Nacional.Form.Op_Observacion_Nac == '' || $scope.Var_Nacional.Form.Op_Observacion_Nac.length < 20 || $scope.Var_Nacional.Form.Op_Observacion_Nac.length > 1000) {
            Campos_Empty = true; document.querySelector('#Var_Nacional_Form_Op_Observacion_Nac_Label').classList.add('red-text');
            document.getElementById('Var_Nacional_Form_Op_Observacion_Nac_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        var array = {
            campo: Campos_Empty
        }
        defered.resolve(array);
        return promise;
    }

    $scope.HNAC_Guardar_Solicitud = function (Accion) {
        setTimeout(() => {
            $scope.$apply();
        }, 1500);
        var Campos_Empty = false;
        var Validar_Campos = [
            $scope.HNAC_Validar_CamposVacios('Var_Nacional', Accion)
        ];
        $q.all(Validar_Campos).then(function (resultado) {
            Campos_Empty = resultado[0].campo;
            if (Campos_Empty == false) {
                var title = Accion == 'X' ? '¿Está seguro que desea anular?' : '¿Está seguro que desea procesar?';
                swal({
                    title: title,
                    // text: "¿Acepta registrar la gestión realizada?",
                    type: "question",
                    showCancelButton: true,
                    allowOutsideClick: false
                }).catch(swal.noop)
                    .then((willDelete) => {
                        if (willDelete) {
                            /**/
                            var xFecha_Diag = $scope.Var_Nacional.Form.Op_Fecha_Diag;
                            var Fecha_Diag = xFecha_Diag.getDate() + '-' + (((xFecha_Diag.getMonth() + 1) < 10) ? '0' + (xFecha_Diag.getMonth() + 1) : (xFecha_Diag.getMonth() + 1)) + '-' + xFecha_Diag.getFullYear();
                            var xFecha_inicio_IpsAsig = $scope.Var_Nacional.Form.Op_Fecha_inicio_IpsAsig;
                            var Fecha_inicio_IpsAsig = xFecha_inicio_IpsAsig.getDate() + '-' + (((xFecha_inicio_IpsAsig.getMonth() + 1) < 10) ? '0' + (xFecha_inicio_IpsAsig.getMonth() + 1) : (xFecha_inicio_IpsAsig.getMonth() + 1)) + '-' + xFecha_inicio_IpsAsig.getFullYear();

                            var Datos = {
                                Status: $scope.Var_Nacional.Form.Status,
                                Radicado: $scope.Var_Nacional.Form.Radicado,
                                Cod_Cohorte: $scope.Var_Nacional.Form.Cod_Cohorte,
                                Cod_Doc_Cohorte: $scope.Var_Nacional.Form.Cod_Doc_Cohorte,
                                Cod_Diagno: $scope.Var_Nacional.Form.Diagnostico_Cod,
                                Fecha_Inicio: $scope.Var_Nacional.Form.Fecha_Inicio,
                                Fecha_Fin: $scope.Var_Nacional.Form.Fecha_Fin,
                                Tipo_Doc: $scope.Var_Nacional.Form.Afi_Tipo_Doc,
                                Num_Doc: $scope.Var_Nacional.Form.Afi_Num_Doc,
                                Estado_Registro: $scope.Var_Nacional.Form.Estado,
                                // Ubicacion: $scope.Var_Nacional.Form.Municipio_Cod,
                                Fuente: $scope.Var_Nacional.Form.Fuente,
                                Num_Aca: $scope.Var_Nacional.Form.Num_Aca,
                                Fecha_Diag: Fecha_Diag,
                                Observacion: $scope.Var_Nacional.Form.Op_Observacion_Nac.toString().toUpperCase(),
                                Clase_Concepto: $scope.Var_Nacional.Form.Clase_Cod,
                                Accion: Accion,
                                Responsable: $scope.Rol_Cedula,
                                Origen_Proceso: 'N',
                                Estado_Accion: Accion,
                                Ips_Asig: $scope.Var_Nacional.Form.Op_IpsAsig_Cod,
                                Fecha_inicio_Ips_Asig: Fecha_inicio_IpsAsig
                            };
                            $scope.HNAC_Btn_G = true;
                            swal({ title: 'Cargando...', allowOutsideClick: false });
                            swal.showLoading();
                            $http({
                                method: 'POST',
                                url: "php/altocosto/siniestros/gestionsiniestros.php",
                                data: {
                                    function: 'Guardar_Seccional_Nacional',
                                    xdata: JSON.stringify(Datos)
                                }
                            }).then(function (response) {
                                $scope.HNAC_Btn_G = false;
                                if (response.data) {
                                    if (response.data.Codigo && response.data.Codigo == 0) {
                                        swal({
                                            title: response.data.Nombre,
                                            type: "success",
                                        }).catch(swal.noop);
                                        $scope.Var_Nacional.Vista = '1';
                                        setTimeout(() => {
                                            $scope.HNAC_ObtenerListado();
                                            $scope.$apply();
                                        }, 1500);
                                    } else {
                                        if (response.data.Codigo == 1) {
                                            swal({
                                                title: "¡IMPORTANTE!",
                                                text: response.data.Nombre,
                                                type: "warning",
                                            }).catch(swal.noop);
                                        } else {
                                            swal({
                                                title: "¡IMPORTANTE!",
                                                text: response.data,
                                                type: "warning",
                                            }).catch(swal.noop);
                                        }
                                    }
                                } else {
                                    swal({
                                        title: "¡IMPORTANTE!",
                                        text: response.data,
                                        type: "info",
                                    }).catch(swal.noop);
                                }
                            });
                        }
                    }).catch(swal.noop);

                ///////
            } else {
                Materialize.toast('¡Campos vacios o invalidos!', 3000);
            }
        });
    }

    $scope.Ver_Patologia = function (X) {
        $scope.Array_Patologias_Pluri = [];
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Ver_Patologia',
                Tipo_Doc: $scope[X].Form.Afi_Tipo_Doc,
                Num_Doc: $scope[X].Form.Afi_Num_Doc
            }
        }).then(function (response) {
            // console.log(response.data);
            $scope.Array_Patologias_Pluri = response.data;
            setTimeout(function () {
                $scope.$apply();
            }, 500);
        });
    }

    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ////////////OTROS////////OTROS/////////OTROS/////////OTROS//////////OTROS////////
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    $scope.Find_Fuente = function (F) {
        if (F == 'A') {
            return 'AUTORIZACIONES'
        }
        if (F == 'R') {
            return 'RIPS'
        }
        if (F == 'C') {
            return 'CENSO HOSPITALARIO'
        }
        if (F == 'O') {
            return 'OTRAS FUENTES'
        }
    }

    $scope.ValFecha = function (HOJA, SCOPE) {
        if ($scope[HOJA] && $scope[HOJA].Form != null) {
            if ($scope[HOJA].Form[SCOPE] == undefined) {
                $scope[HOJA].Form[SCOPE] = $scope.SysDay;
            }
            if ($scope[HOJA].Form[SCOPE] > $scope.SysDay) {
                $scope[HOJA].Form[SCOPE] = $scope.SysDay;
            }
            if ($scope.GetFecha(HOJA, SCOPE) != $scope.GetFecha2('Fecha_Comodin')) {
                if ($scope[HOJA].Form[SCOPE] < $scope[HOJA].Form.Afi_Fecha_Nac) {
                    $scope[HOJA].Form[SCOPE] = $scope.SysDay;
                }
            }
            if (SCOPE != 'Op_Fecha_Diag') {
                if ($scope.GetFecha(HOJA, SCOPE) == $scope.GetFecha2('Fecha_Comodin')) {
                    $scope[HOJA].Form[SCOPE] = $scope.SysDay;
                }
            }
        }
    }

    $scope.GetFecha = function (HOJA, SCOPE) {
        var ahora_ano = $scope[HOJA].Form[SCOPE].getFullYear();
        var ahora_mes = ((($scope[HOJA].Form[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[HOJA].Form[SCOPE].getMonth() + 1) : ($scope[HOJA].Form[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope[HOJA].Form[SCOPE].getDate()) < 10) ? '0' + ($scope[HOJA].Form[SCOPE].getDate()) : ($scope[HOJA].Form[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
    }
    $scope.GetFecha2 = function (SCOPE) {
        var ahora_ano = $scope[SCOPE].getFullYear();
        var ahora_mes = ((($scope[SCOPE].getMonth() + 1) < 10) ? '0' + ($scope[SCOPE].getMonth() + 1) : ($scope[SCOPE].getMonth() + 1));
        var ahora_dia = ((($scope[SCOPE].getDate()) < 10) ? '0' + ($scope[SCOPE].getDate()) : ($scope[SCOPE].getDate()));
        return ahora_dia + '/' + ahora_mes + '/' + ahora_ano;
    }

    $scope.closeModal = function () {
        $('.modal').modal('close');
    }
    $scope.Abrir_Modal_Soportes = function (ruta, ftp) {
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'descargaAdjunto',
                ruta: ruta,
                ftp: ftp
            }
        }).then(function (response) {
            var win = window.open("temp/" + response.data, '_blank');
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ////////////FILE/////////FILE//////////FILE//////////FILE///////////FILE/////////
    /////////////////////////////////////////////////////////////////////////////////
    $scope.loadFile = function (SOPORTE, SCOPE, B64, NID, NIDT) {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#' + NID);
        if (ValidarExistente != true) {
            if (fileInput.files.length != 0) {
                var x = fileInput.files[0].name.split('.');
                if (x[x.length - 1].toUpperCase() == 'ZIP') {
                    if (fileInput.files.length > 0) {
                        if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
                            $scope.getBase64(fileInput.files[0]).then(function (result) {
                                // $http({
                                //     method: 'POST',
                                //     url: "php/altocosto/siniestros/gestionsiniestros.php",
                                //     data: {
                                //         function: 'Base64',
                                //         Base64: result,
                                //         name: NID
                                //     }
                                // }).then(function (response) {
                                //     $scope.Var_Seccional.Form[SOPORTE][SCOPE] = response.data + "?page=hsn#toolbar=0";
                                //     setTimeout(function () {
                                //         document.querySelector('#Iframe_Sop1').style.width = (document.querySelector('#AdjustSop').offsetWidth - 6) + 'px';
                                //         $scope.$apply();
                                //     }, 200);
                                if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-obligatorio") == true) {
                                    document.querySelector(".input-file-radiu").classList.remove("input-file-radius-obligatorio");
                                    document.querySelector(".input-file-radiu").classList.add("input-file-radius-cargado");
                                }

                                // });
                                $scope.Var_Seccional.Form[SOPORTE][B64] = result;
                                setTimeout(function () { $scope.$apply(); }, 300);
                            });
                        } else {
                            swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                            fileInput.value = '';
                            document.querySelector('#' + NIDT).value = '';
                            $scope.Var_Seccional.Form[SOPORTE][SCOPE] = '';
                            $scope.Var_Seccional.Form[SOPORTE][B64] = '';
                            if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                                document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                                document.querySelector(".input-file-radiu").classList.add("input-file-radius-obligatorio");
                            }
                            setTimeout(function () { $scope.$apply(); }, 300);
                        }
                    }
                } else {
                    swal('Advertencia', '¡El archivo seleccionado deber ser formato ZIP!', 'info');
                    fileInput.value = '';
                    document.querySelector('#' + NIDT).value = '';
                    $scope.Var_Seccional.Form[SOPORTE][SCOPE] = '';
                    $scope.Var_Seccional.Form[SOPORTE][B64] = '';
                    if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                        document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                        document.querySelector(".input-file-radiu").classList.add("input-file-radius-obligatorio");
                    }
                    setTimeout(function () { $scope.$apply(); }, 300);
                }
            } else {
                $scope.Var_Seccional.Form[SOPORTE][SCOPE] = '';
                $scope.Var_Seccional.Form[SOPORTE][B64] = '';
                if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                    document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                    document.querySelector(".input-file-radiu").classList.add("input-file-radius-obligatorio");
                }
                setTimeout(function () { $scope.$apply(); }, 300);
            }
        } else {
            swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }
    }
    $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    $scope.Cargar_Soporte_FTP = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        if ($scope.Var_Seccional.Form.Soportes.Soporte_B64 != '') {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: 'Upload',
                    base: $scope.Var_Seccional.Form.Soportes.Soporte_B64,
                    name: $scope.Var_Seccional.Form.Afi_Tipo_Doc + '' + $scope.Var_Seccional.Form.Afi_Num_Doc
                }
            }).then(function (response) {
                $scope.Var_Seccional.Form.Soportes.Soporte_RUTA = response.data;
                defered.resolve(response.data);
            });
        } else {
            defered.resolve('xxx');
        }
        return promise;
    }
    $scope.openInNewTab = function (url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
    /////////////////////////////////////////////////////////////////////////////////
    ////////////TABLA////////TABLA/////////TABLA/////////TABLA//////////TABLA////////
    /////////////////////////////////////////////////////////////////////////////////
    $scope.initPaginacion = function (info) {
        $scope.Lista_Tabla_Temp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.chg_filtrar = function (SCOPE) {
        $scope.filter($scope[SCOPE].Filtrar_Sol);
    }
    $scope.filter = function (val) {
        val = ($scope.filter_save == val) ? '' : val;
        if (val == 'Otra') {
            if ($scope.filter_save != val) {
                $scope.Lista_Tabla_Temp = $scope.Lista_Tabla.filter(function (e) {
                    return e.FUENTE == 'O';
                });
            } else {
                $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, '');
            }
        } else {
            $scope.Lista_Tabla_Temp = $filter('filter')($scope.Lista_Tabla, ($scope.filter_save == val) ? '' : val);
        }
        if ($scope.Lista_Tabla_Temp.length > 0) {
            $scope.setPage(1);
        }
        $scope.configPages();
        $scope.filter_save = val;
    }
    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) > $scope.valmaxpag)
                fin = 10;
            else
                fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
        } else {
            if (ini >= Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.Lista_Tabla_Temp.length / $scope.pageSize);
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
    }
    $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
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
            if ($scope.Lista_Tabla_Temp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.Lista_Tabla_Temp.length / $scope.pageSize) + 1;
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


    /////////////////////////////////////////////////////////
    ///////////////////////TRATAMIENTO///////////////////////
    /////////////////////////////////////////////////////////

    $scope.Set_Tab = function (tab) {
        $scope.Tabs = tab;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }

    $scope.Inicio_Hoja2 = function () {
        $scope.Hoja2 = {
            Titulo: '',
            Array_Cohortes: [],
            Array_Seccionales: [],
            Array_Municipios: [],
            Array_Detalle_Municipios: [],
            Sel_Cohorte: '',
            Sel_Cohorte_Save: '',
            Sel_Seccional: '',
            Sel_Seccional_Save: '',
            Sel_Municipio: '',
            Sel_Municipio_Save: '',
            Sel_Detalle_Municipio: '',
            Filtro_Detalle_Municipio: '',


            Total_Cohorte_Total: 0,
            Total_Cohorte_Cant: 0,
            Total_Cohorte_Porc: '',
            Total_Cohorte_Color: '',

            Total_Seccional_Total: '',
            Total_Seccional_Cant: '',
            Total_Seccional_Porc: '',
            Total_Seccional_Color: '',

            Total_Municipio_Total: '',
            Total_Municipio_Cant: '',
            Total_Municipio_Porc: '',
            Total_Municipio_Color: '',

            Vista: '1',
            Form: null,
            Busqueda: {
                Tipo_Tratamiento: {
                    Filtro: null,
                    Listado: null,
                    SAVE: null,
                    Seleccion: 9999
                },
                Ips_I_Tratamiento: {
                    Filtro: [],
                    Listado: null,
                    SAVE: null,
                    Seleccion: 9999
                }
            }
        }
        $scope.HOJA2_Obtener_Cohortes();
        angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados input'), function (i) {
            i.setAttribute("readonly", true);
        });
        angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados select'), function (i) {
            i.setAttribute("disabled", true);
        });
        angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados textarea'), function (i) {
            i.setAttribute("disabled", true);
        });
        //
        setTimeout(() => {
            angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados label'), function (i) {
                i.classList.add("class_label");
            });
            angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados input'), function (i) {
                i.classList.add("class_gris");
            });
            angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados textarea'), function (i) {
                i.classList.add("class_gris");
            });
        }, 2000);
        setTimeout(() => { $scope.$apply(); }, 1000);
    }

    $scope.HOJA2_Obtener_Tipo_Tratamientos = function (Cohorte) {
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Tratamientos',
                Cohorte: Cohorte,
            }
        }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
                $scope.Hoja2.Busqueda.Tipo_Tratamiento.Listado = response.data;
                $('.Clase_Listar_Tipo_Tratamiento').css({ width: $('#Hoja2_Form_Op_Tipo_Tratamiento')[0].offsetWidth });
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HOJA2_Obtener_Cohortes = function () {
        $scope.Hoja2.Array_Cohortes = [];
        $scope.Hoja2.Total_Cohorte_Total = 0;
        $scope.Hoja2.Total_Cohorte_Cant = 0;
        $scope.Hoja2.Total_Cohorte_Porc = '';
        $scope.Hoja2.Total_Cohorte_Color = '';
        setTimeout(() => { $scope.$apply(); }, 200);
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Consolidado_Cohortes',
                Cedula: $scope.Rol_Cedula,
            }
        }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
                // $scope.Hoja2.Array_Seccionales = response.data;
                $scope.Hoja2.Sel_Cohorte = '';
                $scope.Hoja2.Titulo = 'Consolidado de Siniestros por Cohortes:';
                $scope.Hoja2.Vista = 1;
                response.data.forEach(e => {
                    // $scope.Calcular_Porcentaje(e, 'con');
                    var Porc = parseFloat(((e.PROCESADO_SIN_TTO * 100) / e.TOTAL).toFixed(2));
                    var Gestion = '';
                    if (Porc >= 0 && Porc <= 35) {
                        Gestion = 'buena';
                    } else if (Porc >= 36 && Porc <= 75) {
                        Gestion = 'poca';
                    } else {
                        Gestion = 'baja';
                    }
                    $scope.Hoja2.Array_Cohortes.push({
                        CODIGO: e.CODIGO,
                        COHORTE: e.COHORTE,

                        PROCESADO_CON_TTO: e.PROCESADO_CON_TTO,
                        PROCESADO_CON_TTO_PORC: ((e.PROCESADO_CON_TTO * 100) / e.TOTAL).toFixed(2),
                        PROCESADO_SIN_TTO: e.PROCESADO_SIN_TTO,
                        PROCESADO_SIN_TTO_PORC: ((e.PROCESADO_SIN_TTO * 100) / e.TOTAL).toFixed(2),
                        TOTAL: e.TOTAL,
                        GESTION: Gestion
                    });
                    $scope.Hoja2.Total_Cohorte_Total += parseInt(e.TOTAL);
                    $scope.Hoja2.Total_Cohorte_Cant += parseInt(e.PROCESADO_SIN_TTO);
                });
                setTimeout(() => {
                    //console.table($scope.Hoja2.Array_Cohortees);
                    $scope.Hoja2.Total_Cohorte_Porc = parseFloat((($scope.Hoja2.Total_Cohorte_Cant * 100) / $scope.Hoja2.Total_Cohorte_Total).toFixed(2));
                    if ($scope.Hoja2.Total_Cohorte_Porc >= 0 && $scope.Hoja2.Total_Cohorte_Porc <= 35) {
                        $scope.Hoja2.Total_Cohorte_Color = 'buena';
                    } else if ($scope.Hoja2.Total_Cohorte_Porc >= 36 && $scope.Hoja2.Total_Cohorte_Porc <= 75) {
                        $scope.Hoja2.Total_Cohorte_Color = 'poca';
                    } else {
                        $scope.Hoja2.Total_Cohorte_Color = 'baja';
                    }
                    $scope.$apply();
                }, 500);
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HOJA2_Obtener_Seccionales = function (Cohorte, Coh) {
        $scope.Hoja2.Array_Seccionales = [];
        $scope.Hoja2.Total_Seccional_Total = 0;
        $scope.Hoja2.Total_Seccional_Cant = 0;
        $scope.Hoja2.Total_Seccional_Porc = '';
        $scope.Hoja2.Total_Seccional_Color = '';
        setTimeout(() => { $scope.$apply(); }, 200);
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Consolidado_Seccionales',
                Cedula: $scope.Rol_Cedula,
                Coh: Coh
            }
        }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
                $scope.Hoja2.Sel_Cohorte = Cohorte;
                $scope.Hoja2.Sel_Cohorte_Save = Coh;
                // $scope.Hoja2.Array_Seccionales = response.data;
                $scope.Hoja2.Sel_Seccional = '';
                $scope.Hoja2.Titulo = 'Cohorte: ' + Cohorte + ' - Consolidado de Siniestros por Departamentos:';
                $scope.Hoja2.Vista = 2;
                response.data.forEach(e => {
                    // $scope.Calcular_Porcentaje(e, 'con');
                    var Porc = parseFloat(((e.PROCESADO_SIN_TTO * 100) / e.TOTAL).toFixed(2));
                    var Gestion = '';
                    if (Porc >= 0 && Porc <= 35) {
                        Gestion = 'buena';
                    } else if (Porc >= 36 && Porc <= 75) {
                        Gestion = 'poca';
                    } else {
                        Gestion = 'baja';
                    }
                    $scope.Hoja2.Array_Seccionales.push({
                        CODIGO: e.CODIGO,
                        SECCIONAL: e.SECCIONAL,

                        PROCESADO_CON_TTO: e.PROCESADO_CON_TTO,
                        PROCESADO_CON_TTO_PORC: ((e.PROCESADO_CON_TTO * 100) / e.TOTAL).toFixed(2),
                        PROCESADO_SIN_TTO: e.PROCESADO_SIN_TTO,
                        PROCESADO_SIN_TTO_PORC: ((e.PROCESADO_SIN_TTO * 100) / e.TOTAL).toFixed(2),
                        TOTAL: e.TOTAL,
                        GESTION: Gestion
                    });
                    $scope.Hoja2.Total_Seccional_Total += parseInt(e.TOTAL);
                    $scope.Hoja2.Total_Seccional_Cant += parseInt(e.PROCESADO_SIN_TTO);
                });
                setTimeout(() => {
                    //console.table($scope.Hoja2.Array_Seccionales);
                    $scope.Hoja2.Total_Seccional_Porc = parseFloat((($scope.Hoja2.Total_Seccional_Cant * 100) / $scope.Hoja2.Total_Seccional_Total).toFixed(2));
                    if ($scope.Hoja2.Total_Seccional_Porc >= 0 && $scope.Hoja2.Total_Seccional_Porc <= 35) {
                        $scope.Hoja2.Total_Seccional_Color = 'buena';
                    } else if ($scope.Hoja2.Total_Seccional_Porc >= 36 && $scope.Hoja2.Total_Seccional_Porc <= 75) {
                        $scope.Hoja2.Total_Seccional_Color = 'poca';
                    } else {
                        $scope.Hoja2.Total_Seccional_Color = 'baja';
                    }
                    $scope.$apply();
                }, 500);
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HOJA2_Obtener_Municipios = function (Seccional, Sec) {
        $scope.Hoja2.Array_Municipios = [];
        $scope.Hoja2.Total_Municipio_Total = 0;
        $scope.Hoja2.Total_Municipio_Cant = 0;
        $scope.Hoja2.Total_Municipio_Porc = '';
        $scope.Hoja2.Total_Municipio_Color = '';
        setTimeout(() => { $scope.$apply(); }, 200);
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Consolidado_Municipios',
                Cedula: $scope.Rol_Cedula,
                Sec: Sec,
                Coh: $scope.Hoja2.Sel_Cohorte_Save
            }
        }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
                $scope.Hoja2.Sel_Seccional = Seccional;
                $scope.Hoja2.Sel_Seccional_Save = Sec;
                // $scope.Hoja2.Array_Municipios = response.data;
                $scope.Hoja2.Sel_Municipio = '';
                // $scope.Hoja2.Titulo = 'Consolidado de Siniestros por Municipios:';
                $scope.Hoja2.Titulo = $scope.Hoja2.Sel_Seccional;
                $scope.Hoja2.Vista = 3;
                response.data.forEach(e => {
                    // $scope.Calcular_Porcentaje(e, 'con');
                    var Porc = parseFloat(((e.PROCESADO_SIN_TTO * 100) / e.TOTAL).toFixed(2));
                    var Gestion = '';
                    if (Porc >= 0 && Porc <= 35) {
                        Gestion = 'buena';
                    } else if (Porc >= 36 && Porc <= 75) {
                        Gestion = 'poca';
                    } else {
                        Gestion = 'baja';
                    }
                    $scope.Hoja2.Array_Municipios.push({
                        CODIGO: e.CODIGO,
                        SECCIONAL: e.SECCIONAL,

                        PROCESADO_CON_TTO: e.PROCESADO_CON_TTO,
                        PROCESADO_CON_TTO_PORC: ((e.PROCESADO_CON_TTO * 100) / e.TOTAL).toFixed(2),
                        PROCESADO_SIN_TTO: e.PROCESADO_SIN_TTO,
                        PROCESADO_SIN_TTO_PORC: ((e.PROCESADO_SIN_TTO * 100) / e.TOTAL).toFixed(2),
                        TOTAL: e.TOTAL,
                        GESTION: Gestion
                    });
                    $scope.Hoja2.Total_Municipio_Total += parseInt(e.TOTAL);
                    $scope.Hoja2.Total_Municipio_Cant += parseInt(e.PROCESADO_SIN_TTO);
                });
                setTimeout(() => {
                    $scope.Hoja2.Total_Municipio_Porc = parseFloat((($scope.Hoja2.Total_Municipio_Cant * 100) / $scope.Hoja2.Total_Municipio_Total).toFixed(2));
                    if ($scope.Hoja2.Total_Municipio_Porc >= 0 && $scope.Hoja2.Total_Municipio_Porc <= 35) {
                        $scope.Hoja2.Total_Municipio_Color = 'buena';
                    } else if ($scope.Hoja2.Total_Municipio_Porc >= 36 && $scope.Hoja2.Total_Municipio_Porc <= 75) {
                        $scope.Hoja2.Total_Municipio_Color = 'poca';
                    } else {
                        $scope.Hoja2.Total_Municipio_Color = 'baja';
                    }
                    $scope.$apply();
                }, 500);
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HOJA2_Obtener_Detalle_Municipios = function (Municipio, Mun) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Detalle_Municipio',
                Cedula: $scope.Rol_Cedula,
                Mun: Mun,
                Coh: $scope.Hoja2.Sel_Cohorte_Save
            }
        }).then(function (response) {
            if (response.data.toString().substr(0, 3) != '<br') {
                swal.close();
                $scope.Hoja2.Sel_Municipio = Municipio;
                $scope.Hoja2.Sel_Municipio_Save = Mun;
                $scope.Hoja2.Array_Detalle_Municipios = response.data;
                $scope.Hoja2.Sel_Detalle_Municipio = '';
                $scope.Hoja2.Filtro_Detalle_Municipio = '';
                $scope.Hoja2.Titulo = $scope.Hoja2.Sel_Seccional + ' / ' + Municipio + ' / (' + response.data.length + ') Siniestros encontrados:';
                $scope.Hoja2.Vista = 4;
                $scope.Hoja2_Lista_Tabla = response.data;
                $scope.Hoja2_initPaginacion($scope.Hoja2_Lista_Tabla);
                setTimeout(() => { $scope.$apply(); }, 500);
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HOJA2_Mostrar_Formulario = function (X) {
        swal({ title: 'Cargando...', allowOutsideClick: false });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/altocosto/siniestros/gestionsiniestros.php",
            data: {
                function: 'Obt_Registros_Detalle_Nac',
                Radicado: X.RADICADO,
            }
        }).then(function (response) {
            if (response.data.length != 0 && response.data[0].RADICADO != undefined) {
                var data = response.data[0];
                // console.log(JSON.stringify(data));
                swal.close();
                /////////////////////////////////////////////////////////
                $scope.Hoja2_Color_Bg = '';
                if (data.FUENTE == 'A') { $scope.Hoja2_Color_Bg = "BgColor_A"; $scope.Hoja2_Color_Co = "Color_A"; }
                if (data.FUENTE == 'R') { $scope.Hoja2_Color_Bg = "BgColor_R"; $scope.Hoja2_Color_Co = "Color_R"; }
                if (data.FUENTE == 'C') { $scope.Hoja2_Color_Bg = "BgColor_C"; $scope.Hoja2_Color_Co = "Color_C"; }
                if (data.FUENTE == 'N') { $scope.Hoja2_Color_Bg = "BgColor_N"; $scope.Hoja2_Color_Co = "Color_N"; }
                if (data.FUENTE != 'A' && data.FUENTE != 'R' && data.FUENTE != 'C' && data.FUENTE != 'N') { $scope.Hoja2_Color_Bg = "BgColor_O"; $scope.Hoja2_Color_Co = "Color_O"; }

                var FECHA_DIAG = new Date(data.FECHA_DIAG);

                $scope.Hoja2.Vista = 5;
                $scope.Hoja2.Form = {
                    Estado: data.ESTADO,
                    Status: data.STATUS,
                    Fuente: X.ORIGEN,
                    Radicado: data.RADICADO,
                    Cod_Cohorte: data.COD_COHORTE,
                    Cod_Doc_Cohorte: data.COD_DOC_COHORTE,
                    Cod_Diag: data.COD_DIAGNOSTICO,
                    Cod_Diag_Nom: data.NOM_DIAGNOSTICO,
                    Diagnostico: data.COD_DIAGNOSTICO + ' - ' + data.NOM_DIAGNOSTICO,
                    Clase_Concepto: data.CLASE_CONCEPTO,
                    Cod_Clase_Concepto: data.COD_CLASE_CONCEPTO,
                    Fecha_Inicio: data.FECHA_INICIO,
                    Fecha_Fin: data.FECHA_FIN,
                    Regimen: data.REGIMEN,

                    Afi_Ubicacion: data.UBICACION + ' - ' + data.SECCIONAL,
                    Afi_Tipo_Doc: data.TIPO_DOC,
                    Afi_Num_Doc: data.NUM_DOC,
                    Afi_Nombre: data.PRI_NOMBRE + ' ' + data.PRI_APELLIDO + ' ' + data.SEG_NOMBRE + ' ' + data.SEG_APELLIDO,

                    Op_Fecha_Diag: FECHA_DIAG,
                    Op_Observacion: data.OBSERVACION_SECCIONAL,
                    Ruta: data.RUTA.toString().trim(),
                    Op_Observacion_Nac: data.OBSERVACION_NACIONAL,

                    Op_Fecha_I_Tratamiento: $scope.SysDay,
                    Op_Tipo_Tratamiento: '',
                    Op_Tipo_Tratamiento_Codigo: '',
                    Op_Ips_I_Tratamiento: '',
                    Op_Ips_I_Tratamiento_Codigo: '',
                    Op_Afi_Contratada: '',

                }
                $scope.HOJA2_Obtener_Tipo_Tratamientos(data.COD_COHORTE);
                $scope.Hoja2.Busqueda.Tipo_Tratamiento.SAVE = '';
                $scope.Hoja2.Busqueda.Ips_I_Tratamiento.SAVE = '';
                setTimeout(() => {
                    angular.forEach(document.querySelectorAll('.Hoja2_Form_Campos_Desactivados input'), function (i) {
                        i.classList.add("class_gris");
                    });
                }, 1500);
                $scope.HNAC_Btn_G = false;
                $timeout(function () {
                    $("#collapsible-header-Patologias2").removeClass(function () {
                        return "active";
                    }); $(".collapsible").collapsible({ accordion: true }); $(".collapsible").collapsible({ accordion: false });
                }, 1000);
                setTimeout(function () { $scope.$apply() }, 1000);
                if (data.PLURIPATOLOGICO == 'S') { $scope.Ver_Patologia('Hoja2'); }
            } else {
                swal({
                    title: "¡IMPORTANTE!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
        });
    }

    $scope.HOJA2_Validar_CamposVacios = function (HOJA) {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        $scope.Limpiar_Campos_Req(HOJA);
        if ($scope.Hoja2.Form.Afi_Tipo_Doc == undefined || $scope.Hoja2.Form.Afi_Tipo_Doc == null || $scope.Hoja2.Form.Afi_Tipo_Doc == '') {
            Campos_Empty = true; document.querySelector('#Hoja2_Form_Afi_Tipo_Doc_Label').classList.add('red-text');
            document.getElementById('Hoja2_Form_Afi_Tipo_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Hoja2.Form.Afi_Num_Doc == undefined || $scope.Hoja2.Form.Afi_Num_Doc == null || $scope.Hoja2.Form.Afi_Num_Doc == '') {
            Campos_Empty = true; document.querySelector('#Hoja2_Form_Afi_Num_Doc_Label').classList.add('red-text');
            document.getElementById('Hoja2_Form_Afi_Num_Doc_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Hoja2.Form.Op_Fecha_I_Tratamiento == undefined || $scope.Hoja2.Form.Op_Fecha_I_Tratamiento == null || $scope.Hoja2.Form.Op_Fecha_I_Tratamiento == '') {
            Campos_Empty = true; document.querySelector('#Hoja2_Form_Op_Fecha_I_Tratamiento_Label').classList.add('red-text');
            document.getElementById('Hoja2_Form_Op_Fecha_I_Tratamiento_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Hoja2.Form.Op_Tipo_Tratamiento_Codigo == undefined || $scope.Hoja2.Form.Op_Tipo_Tratamiento_Codigo == null || $scope.Hoja2.Form.Op_Tipo_Tratamiento_Codigo == '') {
            Campos_Empty = true; document.querySelector('#Hoja2_Form_Op_Tipo_Tratamiento_Label').classList.add('red-text');
            document.getElementById('Hoja2_Form_Op_Tipo_Tratamiento_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope.Hoja2.Form.Op_Ips_I_Tratamiento_Codigo == undefined || $scope.Hoja2.Form.Op_Ips_I_Tratamiento_Codigo == null || $scope.Hoja2.Form.Op_Ips_I_Tratamiento_Codigo == '') {
            Campos_Empty = true; document.querySelector('#Hoja2_Form_Op_Ips_I_Tratamiento_Label').classList.add('red-text');
            document.getElementById('Hoja2_Form_Op_Ips_I_Tratamiento_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        var array = {
            campo: Campos_Empty
        }
        defered.resolve(array);
        return promise;
    }

    $scope.HOJA2_Guardar = function () {
        setTimeout(() => {
            $scope.$apply();
        }, 1500);
        var Campos_Empty = false;
        var Validar_Campos = [
            $scope.HOJA2_Validar_CamposVacios('Hoja2')
        ];
        $q.all(Validar_Campos).then(function (resultado) {
            Campos_Empty = resultado[0].campo;
            if (Campos_Empty == false) {
                var title = '¿Está seguro que desea guardar?';
                swal({
                    title: title,
                    // text: "¿Acepta registrar la gestión realizada?",
                    type: "question",
                    showCancelButton: true,
                    allowOutsideClick: false
                }).catch(swal.noop)
                    .then((willDelete) => {
                        if (willDelete) {
                            /**/
                            var xFecha_I_Tratamiento = $scope.Hoja2.Form.Op_Fecha_I_Tratamiento;
                            var Fecha_I_Tratamiento = xFecha_I_Tratamiento.getDate() + '-' + (((xFecha_I_Tratamiento.getMonth() + 1) < 10) ? '0' + (xFecha_I_Tratamiento.getMonth() + 1) : (xFecha_I_Tratamiento.getMonth() + 1)) + '-' + xFecha_I_Tratamiento.getFullYear();
                            var Datos = {

                                Radicado: $scope.Hoja2.Form.Radicado,
                                Tipo_Doc: $scope.Hoja2.Form.Afi_Tipo_Doc,
                                Num_Doc: $scope.Hoja2.Form.Afi_Num_Doc,
                                Cod_Doc_Cohorte: $scope.Hoja2.Form.Cod_Doc_Cohorte,
                                Cod_Cohorte: $scope.Hoja2.Form.Cod_Cohorte,
                                Clase_Concepto: $scope.Hoja2.Form.Cod_Clase_Concepto,
                                Cod_Diagno: $scope.Hoja2.Form.Cod_Diag,
                                Fecha_Inicio: $scope.Hoja2.Form.Fecha_Inicio,
                                Fecha_Fin: $scope.Hoja2.Form.Fecha_Fin,

                                Tipo_tto: $scope.Hoja2.Form.Op_Tipo_Tratamiento_Codigo,
                                Ips_tto: $scope.Hoja2.Form.Op_Ips_I_Tratamiento_Codigo,
                                fecha_inicio_tto: Fecha_I_Tratamiento,

                                Responsable: $scope.Rol_Cedula
                            };
                            $scope.HOJA2_Btn_G = true;
                            swal({ title: 'Cargando...', allowOutsideClick: false });
                            swal.showLoading();
                            $http({
                                method: 'POST',
                                url: "php/altocosto/siniestros/gestionsiniestros.php",
                                data: {
                                    function: 'Obt_Inserta_Tratamiento',
                                    datos: JSON.stringify(Datos)
                                }
                            }).then(function (response) {
                                $scope.HOJA2_Btn_G = false;
                                if (response.data) {
                                    if (response.data.Codigo && response.data.Codigo == 0) {
                                        swal({
                                            title: response.data.Nombre,
                                            type: "success",
                                        }).catch(swal.noop);
                                        setTimeout(() => {
                                            $scope.Hoja2_Volver();
                                            $scope.$apply();
                                        }, 1500);
                                    } else {
                                        if (response.data.Codigo == 1) {
                                            swal({
                                                title: "¡IMPORTANTE!",
                                                text: response.data.Nombre,
                                                type: "warning",
                                            }).catch(swal.noop);
                                        } else {
                                            swal({
                                                title: "¡IMPORTANTE!",
                                                text: response.data,
                                                type: "warning",
                                            }).catch(swal.noop);
                                        }
                                    }
                                } else {
                                    swal({
                                        title: "¡IMPORTANTE!",
                                        text: response.data,
                                        type: "info",
                                    }).catch(swal.noop);
                                }
                            });
                        }
                    }).catch(swal.noop);

                ///////
            } else {
                Materialize.toast('¡Campos vacios o invalidos!', 3000);
            }
        });
    }

    $scope.Hoja2_Volver = function () {
        if ($scope.Hoja2.Vista == 2) {
            $scope.Hoja2.Vista = 1; setTimeout(() => { $scope.$apply(); }, 500);
            $scope.HOJA2_Obtener_Cohortes();
        }
        if ($scope.Hoja2.Vista == 3) {
            $scope.Hoja2.Vista = 2; setTimeout(() => { $scope.$apply(); }, 500);
            $scope.HOJA2_Obtener_Seccionales($scope.Hoja2.Sel_Cohorte, $scope.Hoja2.Sel_Cohorte_Save);
        }
        if ($scope.Hoja2.Vista == 4) {
            $scope.Hoja2.Vista = 3; setTimeout(() => { $scope.$apply(); }, 500);
            $scope.HOJA2_Obtener_Municipios($scope.Hoja2.Sel_Seccional, $scope.Hoja2.Sel_Seccional_Save);
        }
        if ($scope.Hoja2.Vista == 5) {
            $scope.Hoja2.Vista = 4; setTimeout(() => { $scope.$apply(); }, 500);
            // console.log($scope.Hoja2.Sel_Municipio, $scope.Hoja2.Sel_Municipio_Save);
            $scope.HOJA2_Obtener_Detalle_Municipios($scope.Hoja2.Sel_Municipio, $scope.Hoja2.Sel_Municipio_Save);
        }
    }

    /////////////////////////////
    /////////////////////////////
    /////////////////////////////
    //BUSCAR TIPO TRATAMIENTO
    $scope.KeyFind_Tipo_Tratamiento = function (HOJA, keyEvent) {
        if ($scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro != null && $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion = $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion >= ($scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion + 1;
                document.querySelector('.Clase_Listar_Tipo_Tratamiento').scrollTo(0, document.querySelector('#Tipo_Tratamiento' + $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion = $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion <= 0 || $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion == 9999 ? $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro.length - 1 : $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion - 1;
                document.querySelector('.Clase_Listar_Tipo_Tratamiento').scrollTo(0, document.querySelector('#Tipo_Tratamiento' + $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion != 9999) {
                var x = $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro[$scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion];
                $scope.FillTextbox_Listado_Tipo_Tratamiento(HOJA, x.CODIGO, x.NOMBRE);
            }
        }
    }
    $scope.Complete_Listado_Tipo_Tratamiento = function (HOJA, keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if ($scope[HOJA].Form.Op_Tipo_Tratamiento != undefined && string != undefined && $scope[HOJA].Busqueda.Tipo_Tratamiento.Listado != undefined) {
                $('.Clase_Listar_Tipo_Tratamiento').css({ width: $('#' + HOJA + '_Form_Op_Tipo_Tratamiento')[0].offsetWidth });
                var output = [];
                angular.forEach($scope[HOJA].Busqueda.Tipo_Tratamiento.Listado, function (x) {
                    if (x.CODIGO.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.NOMBRE.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
                    }
                });
                $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro = output;
                $scope[HOJA].Busqueda.Tipo_Tratamiento.Seleccion = 9999;
            }
        }
    }
    $scope.FillTextbox_Listado_Tipo_Tratamiento = function (HOJA, codigo, nombre) {
        $scope[HOJA].Form.Op_Tipo_Tratamiento_Codigo = codigo;
        $scope[HOJA].Form.Op_Tipo_Tratamiento = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Tipo_Tratamiento.SAVE = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro = null;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }
    $scope.Blur_Tipo_Tratamiento = function (HOJA) {
        setTimeout(() => {
            if ($scope[HOJA] != undefined && $scope[HOJA].Form != undefined) {
                if (($scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro == null || $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro.length == 0)
                    && $scope[HOJA].Form.Op_Tipo_Tratamiento != $scope[HOJA].Busqueda.Tipo_Tratamiento.SAVE) {
                    $scope[HOJA].Form.Op_Tipo_Tratamiento = $scope[HOJA].Busqueda.Tipo_Tratamiento.SAVE;
                }
                if ($scope[HOJA].Form.Op_Tipo_Tratamiento == '') {
                    $scope[HOJA].Form.Op_Tipo_Tratamiento = $scope[HOJA].Busqueda.Tipo_Tratamiento.SAVE;
                    $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro = null;
                }
            }
            $scope.$apply();
        }, 300);
    }
    $scope.Click_Tipo_Tratamiento = function (HOJA) {
        $scope[HOJA].Busqueda.Tipo_Tratamiento.Filtro = $scope[HOJA].Busqueda.Tipo_Tratamiento.Listado;
        $('.Clase_Listar_Tipo_Tratamiento').css({ width: $('#' + HOJA + '_Form_Op_Tipo_Tratamiento')[0].offsetWidth });
        setTimeout(() => {
            $scope.$apply();
        }, 100);
    }

    $scope.KeyFind_Ips_I_Tratamiento = function (HOJA, keyEvent) {
        if ($scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro != null && $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro.length != 0) {
            if (keyEvent.which === 40) {
                $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion = $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion >= ($scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro.length - 1) ? 0 : $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion + 1;
                document.querySelector('.Clase_Listar_Ips_I_Tratamiento').scrollTo(0, document.querySelector('#Ips_I_Tratamiento' + $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion).offsetTop);
            } else if (keyEvent.which === 38) {
                $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion = $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion <= 0 || $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion == 9999 ? $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro.length - 1 : $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion - 1;
                document.querySelector('.Clase_Listar_Ips_I_Tratamiento').scrollTo(0, document.querySelector('#Ips_I_Tratamiento' + $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion).offsetTop)
            } else if (keyEvent.which === 13 && $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion != 9999) {
                var x = $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro[$scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion];
                $scope.FillTextbox_Listado_Ips_I_Tratamiento(x.CODIGO, x.NOMBRE, x.CONTRATADA);
            }
        } else {
            if (keyEvent.which === 13)
                $scope.HOJA2_Buscar_Ips_Tratamiento(HOJA);
        }
    }
    $scope.HOJA2_Buscar_Ips_Tratamiento = function (HOJA) {
        if ($scope[HOJA].Form.Op_Ips_I_Tratamiento.length > 2) {
            $http({
                method: 'POST',
                url: "php/altocosto/siniestros/gestionsiniestros.php",
                data: {
                    function: 'Obt_Ips_Tratamientos',
                    Conc: $scope[HOJA].Form.Op_Ips_I_Tratamiento.toUpperCase(),
                    Regimen: $scope[HOJA].Form.Regimen,
                    Cohorte: $scope[HOJA].Form.Cod_Cohorte
                }
            }).then(function (response) {
                if (response.data.toString().substr(0, 3) != '<br') {
                    if (response.data[0] != undefined && response.data.length > 1) {
                        $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro = response.data;
                        $scope[HOJA].Busqueda.Ips_I_Tratamiento.Listado = response.data;
                        $('.Clase_Listar_Ips_I_Tratamiento').css({ width: $('#Hoja2_Form_Op_Ips_I_Tratamiento')[0].offsetWidth });
                    }
                    if (response.data.length == 1) {
                        if (!response.data[0].CODIGO) {
                            swal({
                                title: "¡Mensaje!",
                                text: response.data[0].Nombre,
                                type: "info",
                            }).catch(swal.noop);
                            $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro = null;
                            $scope[HOJA].Busqueda.Ips_I_Tratamiento.Listado = null;
                        } else {
                            $scope.FillTextbox_Listado_Ips_I_Tratamiento(HOJA, response.data[0].CODIGO, response.data[0].NOMBRE);
                        }
                    } else if (response.data.length == 0) {
                        swal({
                            title: "¡Importante!",
                            text: "No se encontro la IPS",
                            type: "info",
                        }).catch(swal.noop);
                    }
                } else {
                    swal({
                        title: "¡IMPORTANTE!",
                        text: response.data,
                        type: "warning"
                    }).catch(swal.noop);
                }
            })
            // .then(function (response) {
            //     if (response.data.toString().substr(0, 3) != '<br') {
            //         // console.log(response.data);
            //         $scope.Hoja2.Busqueda.Ips_I_Tratamiento.Listado = response.data;
            //         $('.Clase_Listar_Ips_I_Tratamiento').css({ width: $('#Hoja2_Form_Op_Ips_I_Tratamiento')[0].offsetWidth });
            //     } else {
            //         swal({
            //             title: "¡IMPORTANTE!",
            //             text: response.data,
            //             type: "info",
            //         }).catch(swal.noop);
            //     }
            // });
        } else {
            Materialize.toast('¡Digite al menos 3 caracteres!', 1000);
        }
    }
    $scope.Complete_Listado_Ips_I_Tratamiento = function (HOJA, keyEvent, string) {
        if (keyEvent.which !== 40 && keyEvent.which !== 38 && keyEvent.which !== 13) {
            if ($scope[HOJA].Form.Op_Ips_I_Tratamiento != undefined && string != undefined && $scope[HOJA].Busqueda.Ips_I_Tratamiento.Listado != undefined) {
                $('.Clase_Listar_Ips_I_Tratamiento').css({ width: $('#' + HOJA + '_Form_Op_Ips_I_Tratamiento')[0].offsetWidth });
                var output = [];
                angular.forEach($scope[HOJA].Busqueda.Ips_I_Tratamiento.Listado, function (x) {
                    if (x.CODIGO.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.NOMBRE.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                        output.push({ "CODIGO": x.CODIGO, "NOMBRE": x.NOMBRE.toUpperCase() });
                    }
                });
                $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro = output;
                $scope[HOJA].Busqueda.Ips_I_Tratamiento.Seleccion = 9999;
            }
        }
    }
    $scope.FillTextbox_Listado_Ips_I_Tratamiento = function (HOJA, codigo, nombre, contratada) {
        $scope[HOJA].Form.Op_Ips_I_Tratamiento_Codigo = codigo;
        $scope[HOJA].Form.Op_Afi_Contratada = contratada;
        $scope[HOJA].Form.Op_Ips_I_Tratamiento = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Ips_I_Tratamiento.SAVE = codigo + ' - ' + nombre;
        $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro = null;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }
    $scope.Blur_Ips_I_Tratamiento = function (HOJA) {
        setTimeout(() => {
            if ($scope[HOJA] != undefined && $scope[HOJA].Form != undefined) {
                if (($scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro == null || $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro.length == 0)
                    && $scope[HOJA].Form.Op_Ips_I_Tratamiento != $scope[HOJA].Busqueda.Ips_I_Tratamiento.SAVE) {
                    $scope[HOJA].Form.Op_Ips_I_Tratamiento = $scope[HOJA].Busqueda.Ips_I_Tratamiento.SAVE;
                }
                if ($scope[HOJA].Form.Op_Ips_I_Tratamiento == '') {
                    $scope[HOJA].Form.Op_Ips_I_Tratamiento = $scope[HOJA].Busqueda.Ips_I_Tratamiento.SAVE;
                    $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro = null;
                }
            }
            $scope.$apply();
        }, 300);
    }
    $scope.Click_Ips_I_Tratamiento = function (HOJA) {
        $scope[HOJA].Busqueda.Ips_I_Tratamiento.Filtro = $scope[HOJA].Busqueda.Ips_I_Tratamiento.Listado;
        $('.Clase_Listar_Ips_I_Tratamiento').css({ width: $('#' + HOJA + '_Form_Op_Ips_I_Tratamiento')[0].offsetWidth });
        setTimeout(() => {
            $scope.$apply();
        }, 100);
    }
    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    $scope.Hoja2_initPaginacion = function (info) {
        $scope.Hoja2_Lista_Tabla_Temp = info;
        $scope.Hoja2_currentPage = 0;
        $scope.Hoja2_pageSize = 10;
        $scope.Hoja2_valmaxpag = 10;
        $scope.Hoja2_pages = [];
        $scope.Hoja2_configPages();
    }
    $scope.Hoja2_chg_filtrar = function () {
        $scope.Hoja2_filter($scope.Hoja2.Filtro_Detalle_Municipio);
    }
    $scope.Hoja2_filter = function (val) {
        val = ($scope.Hoja2_filter_save == val) ? '' : val;
        if (val == 'Otra') {
            if ($scope.Hoja2_filter_save != val) {
                $scope.Hoja2_Lista_Tabla_Temp = $scope.Hoja2_Lista_Tabla.filter(function (e) {
                    return e.FUENTE == 'O';
                });
            } else {
                $scope.Hoja2_Lista_Tabla_Temp = $filter('filter')($scope.Hoja2_Lista_Tabla, '');
            }
        } else {
            $scope.Hoja2_Lista_Tabla_Temp = $filter('filter')($scope.Hoja2_Lista_Tabla, ($scope.Hoja2_filter_save == val) ? '' : val);
        }
        if ($scope.Hoja2_Lista_Tabla_Temp.length > 0) {
            $scope.Hoja2_setPage(1);
        }
        $scope.Hoja2_configPages();
        $scope.Hoja2_filter_save = val;
    }
    $scope.Hoja2_configPages = function () {
        $scope.Hoja2_pages.length = 0;
        var ini = $scope.Hoja2_currentPage - 4;
        var fin = $scope.Hoja2_currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize) > $scope.Hoja2_valmaxpag)
                fin = 10;
            else
                fin = Math.ceil($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize);
        } else {
            if (ini >= Math.ceil($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize) - $scope.Hoja2_valmaxpag) {
                ini = Math.ceil($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize) - $scope.Hoja2_valmaxpag;
                fin = Math.ceil($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize);
            }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
            $scope.Hoja2_pages.push({
                no: i
            });
        }

        if ($scope.Hoja2_currentPage >= $scope.Hoja2_pages.length)
            $scope.Hoja2_currentPage = $scope.Hoja2_pages.length - 1;
    }
    $scope.Hoja2_setPage = function (index) {
        $scope.Hoja2_currentPage = index - 1;
    }
    $scope.Hoja2_paso = function (tipo) {
        if (tipo == 'next') {
            var i = $scope.Hoja2_pages[0].no + 1;
            if ($scope.Hoja2_pages.length > 9) {
                var fin = $scope.Hoja2_pages[9].no + 1;
            } else {
                var fin = $scope.Hoja2_pages.length;
            }

            $scope.Hoja2_currentPage = $scope.Hoja2_currentPage + 1;
            if ($scope.Hoja2_Lista_Tabla_Temp.length % $scope.Hoja2_pageSize == 0) {
                var tamanomax = parseInt($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize);
            } else {
                var tamanomax = parseInt($scope.Hoja2_Lista_Tabla_Temp.length / $scope.Hoja2_pageSize) + 1;
            }
            if (fin > tamanomax) {
                fin = tamanomax;
                i = tamanomax - 9;
            }
        } else {
            var i = $scope.Hoja2_pages[0].no - 1;
            if ($scope.Hoja2_pages.length > 9) {
                var fin = $scope.Hoja2_pages[9].no - 1;
            } else {
                var fin = $scope.Hoja2_pages.length;
            }

            $scope.Hoja2_currentPage = $scope.Hoja2_currentPage - 1;
            if (i <= 1) {
                i = 1;
                fin = $scope.Hoja2_pages.length;
            }
        }
        $scope.Hoja2_calcular(i, fin);
    }
    $scope.Hoja2_calcular = function (i, fin) {
        if (fin > 9) {
            i = fin - 9;
        } else {
            i = 1;
        }
        $scope.Hoja2_pages = [];
        for (i; i <= fin; i++) {
            $scope.Hoja2_pages.push({
                no: i
            });
        }
    }


    $scope.Calcular_Porcentaje = function (x, tipo) {
        var porcentaje = (tipo == 'con' ? x.PROCESADO_CON_TTO : x.PROCESADO_SIN_TTO * 100) / x.TOTAL;
    }

    $scope.Obt_Estilo = function (x) {
        if (x == 'buena') {
            return { "background-color": "rgb(3, 197, 20) !important;" }
        }
        if (x == 'poca') {
            return { "background-color": "rgb(235, 156, 5) !important" }
        }
        if (x == 'baja') {
            return { "background-color": "rgb(245, 75, 75) !important;" }
        }
    }

    $scope.FormatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        valor = valor.replace(/[\t\n]+/g,' ');
        input.value = valor.toString().toUpperCase();
    }
    $scope.FormatSoloNumero = function (NID) {
        if (NID) {
            const input = document.getElementById('' + NID + '');
            var valor = input.value;
            valor = valor.replace(/[^a-z0-9 -+,]/gi, '');
            input.value = valor;
        }
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
            return num;
        }
    }

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


}])