'use strict';
angular.module('GenesisApp').controller('bitacoraobjetosbdController', ['$scope', '$http', '$timeout', '$filter', '$q', function ($scope, $http, $timeout, $filter, $q) {
    // Plantilla funcional
    console.clear();
    $(document).ready(function () {
        $('.modal').modal();
        $('.tabs').tabs();
        if (document.querySelector("#pantalla").offsetWidth < 1200) {
            document.querySelector("#pantalla").style.zoom = 0.8;
        }
        $scope.Pantalla = {
            Altura: 0,
            Anchura: document.querySelector("#pantalla").offsetWidth
        }
        document.getElementById("pantalla").parentElement.parentElement.parentElement.style.paddingBottom = '0px';

        $scope.SysDay = new Date();
        $scope.Vista = {
            Activa: 1
        };
        //TABLA
        $scope.Filtrar_Sol = 10;
        //
        $scope.Vista1 = {
            Mostrar_Sol: 10,
            Area: ''
        };
        $scope.Vista1_listDatosTemp = [];
        $scope.Vista1_datos_Factura = [];
        //
        // $scope.Vista1_Buscar();
        $scope.Rol_Cedula = sessionStorage.getItem('cedula');
        $scope.Reset_Variables();
        $scope.Obtener_Areas();


    });

    $scope.Reset_Variables = function () {
        $scope.Form = null;
        setTimeout(() => {
            $scope.Form = {
                Area: '',
                Tipo_Objeto: '',
                Nombre_Objeto: '',
                Detalle: '',
                Fecha_modificado: $scope.SysDay,
                Url: '',
                Soportes: {
                    Soporte1_URL: '',
                    Soporte1_B64: '',
                    Soporte1_RUTA: '',
                    Soporte1_EXT: '',
                }
            }

            $scope.Sop_Lab = {
                Soporte1: '',
            };
            
            document.querySelector('#Form_Soporte1').value = "";
            document.querySelector('#Sop_Lab_Soporte1').value = "";
            document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
            document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
            $scope.$apply();
        }, 300);
    }

    $scope.Obtener_Areas = function () {
        $scope.Array_Areas = [];
        $http({
            method: 'POST',
            url: "php/tic/bitacoraobjetosbd.php",
            data: {
                function: 'Obt_Area'
            }
        }).then(function (response) {
            // console.log(response.data)
            if (response.data.length > 1 && response.data.toString().substr(0, 3) != '<br') {
                $scope.Array_Areas = response.data;
            }
            if (response.data.toString().substr(0, 3) == '<br') {
                swal({
                    title: "¡No se encontró ningún concepto!",
                    text: response.data,
                    type: "info",
                }).catch(swal.noop);
            }
            if (response.data.length == 0) {
                swal({
                    title: "¡No se encontró ningún concepto!",
                    type: "info",
                }).catch(swal.noop);
            }
            setTimeout(() => {
                $scope.$apply();
            }, 300);
        });
    }


    $scope.Vista1_Buscar = function () {
        $scope.Vista1_datos = [];
        $scope.Vista1.Filtrar_Sol = '';
        $timeout(
            function () {
                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
                $http({
                    method: 'POST',
                    url: "php/tic/bitacoraobjetosbd.php",
                    data: {
                        function: 'Obt_Bitacoras',
                        Area: $scope.Vista1.Area,
                        Ced: $scope.Rol_Cedula
                    }
                }).then(function (response) {
                    if (response.data.length > 0 && response.data.toString().substr(0, 3) != '<br') {
                        $scope.Vista1_datos = response.data;
                        $scope.initPaginacion(response.data);
                        swal.close();
                    }
                    if (response.data.toString().substr(0, 3) == '<br') {
                        swal({
                            title: "¡No se encontró ningún concepto!",
                            text: response.data,
                            type: "info",
                        }).catch(swal.noop);
                    }
                    if (response.data.length == 0) {
                        swal({
                            title: "¡No se encontraron bitacoras!",
                            type: "info",
                        }).catch(swal.noop);
                    }
                })
            }, 500
        );


        // console.log($scope.Vista1.Num_Sol, $scope.Vista1.Nit_Prestador);
        // $scope.Vista.Activa=2;
    }


    $scope.H1Limpiar_Campos_Req = function (HOJA) {
        angular.forEach(document.querySelectorAll('.' + HOJA + '_Clase .red-text'), function (i) {
            i.classList.remove('red-text');
        });
    }
    $scope.Validar_CamposVacios = function (HOJA) {
        var defered = $q.defer();
        var promise = defered.promise;
        var Campos_Empty = false;
        var Vista_Empty = 0;
        $scope.H1Limpiar_Campos_Req(HOJA);
        if ($scope[HOJA].Area == undefined || $scope[HOJA].Area == null || $scope[HOJA].Area == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Area_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Area_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Tipo_Objeto == undefined || $scope[HOJA].Tipo_Objeto == null || $scope[HOJA].Tipo_Objeto == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Tipo_Objeto_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Tipo_Objeto_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Nombre_Objeto == undefined || $scope[HOJA].Nombre_Objeto == null || $scope[HOJA].Nombre_Objeto == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Nombre_Objeto_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Nombre_Objeto_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        //
        if ($scope[HOJA].Detalle == undefined || $scope[HOJA].Detalle == null || $scope[HOJA].Detalle == '' || $scope[HOJA].Detalle.length > 4000 || $scope[HOJA].Detalle.length < 10) {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Detalle_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Detalle_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
        if ($scope[HOJA].Fecha_modificado == undefined || $scope[HOJA].Fecha_modificado == null || $scope[HOJA].Fecha_modificado == '') {
            Campos_Empty = true; document.querySelector('#' + [HOJA] + '_Fecha_modificado_Label').classList.add('red-text');
            document.getElementById([HOJA] + '_Fecha_modificado_Label').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }

        var array = {
            campo: Campos_Empty,
            vista: Vista_Empty
        }

        defered.resolve(array);
        return promise;
    }

    $scope.Guardar_Bitacora = function () {
        var Campos_Empty = false;
        var Validar_Campos = [
            $scope.Validar_CamposVacios('Form')
        ];
        $q.all(Validar_Campos).then(function (resultado) {
            Campos_Empty = resultado[0].campo;
            if (Campos_Empty == false) {
                swal({
                    title: "¿Está seguro que desea guardar?",
                    text: "¿Acepta registrar una nueva bitácora?",
                    type: "question",
                    showCancelButton: true,
                    allowOutsideClick: false
                }).catch(swal.noop)
                    .then((willDelete) => {
                        if (willDelete) {
                            /**/
                            var Cargar_Soporte = [
                                $scope.Cargar_Soporte_FTP('Form')
                            ];
                            $q.all(Cargar_Soporte).then(function (Result_Sop) {
                                var Archivos_Error = false;
                                for (var x = 0; x < Result_Sop.length; x++) {
                                    if (Result_Sop[x].substr(0, 3) == '<br' || Result_Sop[x].substr(0, 1) == '0' || (Result_Sop[x] == '' && $scope.Form.Soportes.Soporte1_B64 != '')) {
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
                                    var Fecha_modificado = $scope.Form.Fecha_modificado;
                                    var xFecha_modificado = Fecha_modificado.getDate() + '-' + (((Fecha_modificado.getMonth() + 1) < 10) ? '0' + (Fecha_modificado.getMonth() + 1) : (Fecha_modificado.getMonth() + 1)) + '-' + Fecha_modificado.getFullYear();
                                    var Datos = {
                                        proceso: $scope.Form.Area,
                                        tipo_objeto: $scope.Form.Tipo_Objeto,
                                        nombre_objeto: $scope.Form.Nombre_Objeto,
                                        detalle: $scope.Form.Detalle,
                                        responsable: $scope.Rol_Cedula,
                                        fecha_modificado: xFecha_modificado,
                                        anexo: $scope.Form.Soportes.Soporte1_RUTA,
                                    }
                                    swal({ title: 'Cargando...', allowOutsideClick: false });
                                    swal.showLoading();
                                    $http({
                                        method: 'POST',
                                        url: "php/tic/bitacoraobjetosbd.php",
                                        data: {
                                            function: 'Guardar_Bitacora',
                                            xdata: JSON.stringify(Datos)
                                        }
                                    }).then(function (response) {
                                        if (response.data) {
                                            if (response.data.Codigo && response.data.Codigo == 0) {
                                                swal({
                                                    title: response.data.Nombre,
                                                    type: "success",
                                                }).catch(swal.noop);
                                                setTimeout(() => {
                                                    $scope.Reset_Variables();
                                                }, 1500);
                                            } else {
                                                swal({
                                                    title: "¡Ocurrio un error!",
                                                    text: response.data,
                                                    type: "warning",
                                                }).catch(swal.noop);
                                            }
                                        } else {
                                            swal({
                                                title: "¡Ocurrio un error!",
                                                text: response.data,
                                                type: "info",
                                            }).catch(swal.noop);
                                        }
                                    })
                                }
                            })
                        }
                    })

            }else{
                Materialize.toast('¡Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
            }
        })

    }

    $scope.Cargar_Soporte_FTP = function () {
        var defered = $q.defer();
        var promise = defered.promise;
        if ($scope.Form.Soportes.Soporte1_B64 != '') {
            $http({
                method: 'POST',
                url: "php/tic/bitacoraobjetosbd.php",
                data: {
                    function: 'Upload',
                    base: $scope.Form.Soportes.Soporte1_B64,
                    name: $scope.Form.Area,
                    ext: $scope.Form.Soportes.Soporte1_EXT
                }
            }).then(function (response) {
                $scope.Form.Soportes.Soporte1_RUTA = response.data;
                defered.resolve(response.data);
            });
        } else {
            defered.resolve('xxx');
        }
        return promise;
    }
    $scope.getBase64 = function (file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    $scope.loadFile = function (SOPORTE, SCOPE, B64, NID, NIDT) {
        var ValidarExistente = false;
        var fileInput = document.querySelector('#' + NID);
        if (ValidarExistente != true) {
            if (fileInput.files.length != 0) {
                var x = fileInput.files[0].name.split('.');
                if (x[x.length - 1].toUpperCase() == 'PDF' || x[x.length - 1].toUpperCase() == 'PNG' || x[x.length - 1].toUpperCase() == 'JPG') {
                    if (fileInput.files.length > 0) {
                        if (fileInput.files[0].size < 10485760 && fileInput.files[0].size > 0) {
                            $scope.getBase64(fileInput.files[0]).then(function (result) {
                                $http({
                                    method: 'POST',
                                    url: "php/tic/bitacoraobjetosbd.php",
                                    data: {
                                        function: 'Base64',
                                        Base64: result,
                                        name: NID
                                    }
                                }).then(function (response) {
                                    $scope.Form[SOPORTE][SCOPE] = response.data + "?page=hsn#toolbar=0";
                                    if (SCOPE == 'Soporte1_URL') {
                                        setTimeout(function () {
                                            $scope.Form.Soportes.Soporte1_EXT = x[1].toString().toUpperCase();
                                            document.querySelector('#Iframe_Sop1').style.width = (document.querySelector('#AdjustSop').offsetWidth - 6) + 'px';
                                            $scope.$apply();
                                        }, 200);
                                        if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-opcional") == true) {
                                            document.querySelector(".input-file-radiu").classList.remove("input-file-radius-opcional");
                                            document.querySelector(".input-file-radiu").classList.add("input-file-radius-cargado");
                                        }
                                    } else {
                                        setTimeout(function () {
                                            angular.forEach(document.querySelectorAll('.Iframe'), function (i) {
                                                i.style.width = (document.querySelector('#AdjustSop2').offsetWidth - 6) + 'px';
                                            });
                                            $scope.$apply();
                                        }, 200);
                                    }
                                });
                                $scope.Form[SOPORTE][B64] = result;
                                setTimeout(function () { $scope.$apply(); }, 300);
                            });
                        } else {
                            swal('Advertencia', '¡El archivo seleccionado excede el peso máximo posible (10MB)!', 'info');
                            fileInput.value = '';
                            document.querySelector('#' + NIDT).value = '';
                            $scope.Form[SOPORTE][SCOPE] = '';
                            $scope.Form[SOPORTE][B64] = '';
                            if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                                document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                                document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
                            }
                            setTimeout(function () { $scope.$apply(); }, 300);
                        }
                    }
                } else {
                    swal('Advertencia', '¡El archivo seleccionado deber ser formato PDF, JPG, PNG!', 'info');
                    fileInput.value = '';
                    document.querySelector('#' + NIDT).value = '';
                    $scope.Form[SOPORTE][SCOPE] = '';
                    $scope.Form[SOPORTE][B64] = '';
                    if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                        document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                        document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
                    }
                    setTimeout(function () { $scope.$apply(); }, 300);
                }
            } else {
                $scope.Form[SOPORTE][SCOPE] = '';
                $scope.Form[SOPORTE][B64] = '';
                if (document.querySelector(".input-file-radiu").classList.contains("input-file-radius-cargado") == true) {
                    document.querySelector(".input-file-radiu").classList.remove("input-file-radius-cargado");
                    document.querySelector(".input-file-radiu").classList.add("input-file-radius-opcional");
                }
                setTimeout(function () { $scope.$apply(); }, 300);
            }
        } else {
            swal('Advertencia', '¡Ya existe un archivo en el sistema!', 'info');
        }

    }

    $scope.Ver_Detalle = function (x) {
        swal({
            title: 'Detalle',
            input: 'textarea',
            inputValue: x,
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

    /////////////////////////////////////////PAGINACION/////////////////////////////////////////////////
    $scope.chg_filtrar = function () {
        $scope.filter($scope.Vista1.Filtrar_Sol);
    }
    $scope.initPaginacion = function (info) {
        $scope.Vista1_listDatosTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.initPaginacion2 = function (valor) {
        $scope.currentPage = 0;
        if (valor == 0) {
            $scope.pageSize = $scope.Vista1_listDatosTemp.length;
            $scope.valmaxpag = $scope.Vista1_listDatosTemp.length;
        } else {
            $scope.pageSize = valor;
            $scope.valmaxpag = valor;
        }
        $scope.pages = [];
        $scope.configPages();
    }
    $scope.filter = function (val) {
        if ($scope.Filter_Val != val) {
            $scope.Vista1_listDatosTemp = $filter('filter')($scope.Vista1_datos, val);
            $scope.configPages();
            $scope.Filter_Val = val;
        } else {
            $scope.Vista1_listDatosTemp = $filter('filter')($scope.Vista1_datos, '');
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
            if (Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag) {
                if (($scope.pageSize * 10) < $scope.Vista1_listDatosTemp.length) {
                    fin = 10;
                } else {
                    fin = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize);
                }
            }
            else { fin = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize); }
        } else {
            if (ini >= Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.Vista1_listDatosTemp.length / $scope.pageSize);
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
        if ($scope.Vista1_listDatosTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize);
        } else {
            var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize) + 1;
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
            if ($scope.Vista1_listDatosTemp.length % $scope.pageSize == 0) {
                var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize);
            } else {
                var tamanomax = parseInt($scope.Vista1_listDatosTemp.length / $scope.pageSize) + 1;
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

    $scope.FormatTexto = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>=,;:-]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor;
    }

    $scope.FormatTextoObs = function (NID) {
        const input = document.getElementById('' + NID + '');
        var valor = input.value;
        valor = valor.replace(/[|!¡¿?°"#%{}*&''`´¨<>]/g, '');
        valor = valor.replace(/(\r\n|\n|\r)/g, ' ');
        input.value = valor;
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

    $scope.ValFecha = function (SCOPE) {
        if ($scope.Form[SCOPE] == undefined) {
            $scope.Form[SCOPE] = $scope.SysDay;
        }
        if ($scope.Form[SCOPE] > $scope.SysDay) {
            $scope.Form[SCOPE] = $scope.SysDay;
        }
    }

    $scope.SetTab = function (x) {
        $scope.Vista.Activa = x;
        setTimeout(() => {
            $scope.$apply();
        }, 500);
    }

    $scope.Abrir_Modal_Soportes = function (ruta) {
        $scope.Form.Url = '';
        $http({
            method: 'POST',
            url: "php/tic/bitacoraobjetosbd.php",
            data: {
                function: 'descargaAdjunto',
                ruta: ruta
            }
        }).then(function (response) {
            $scope.Form.Url = "temp/" + response.data;
            (function () {
                $('#Modal_Soportes').modal();
            }());
            $('#Modal_Soportes').modal('open');
            setTimeout(function () {
                document.querySelector('#Modal_Soportes').style.top = 2 + '%';
                $scope.$apply();
                // console($scope.Form.Url);
            }, 500);
        });

    }

    $scope.closeModal = function () {
        $('.modal').modal('close');
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