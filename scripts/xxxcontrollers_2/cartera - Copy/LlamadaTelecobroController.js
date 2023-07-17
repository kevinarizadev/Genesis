'use strict';
angular.module('GenesisApp')
.controller('LlamadaTelecobroController', ['$scope', '$rootScope', '$http', 'consultaHTTP', 'afiliacionHttp', 'ngDialog',
    function ($scope, $rootScope, $http, consultaHTTP, afiliacionHttp, ngDialog) {

        $scope.reloj = false;
        $scope.BotonRegistroLlamada = true;
        $scope.FormularioDeLlamada = false;
        $scope.OcultarFecha = false;


        $scope.ListarMotivos = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'ListarMotivos'
                }
            }).then(function (respose) {
                $scope.lmotivos = respose.data;
            })
        }

        $scope.datos = {
            fecha: null,
            fechatemporal: null,
            hora: null,
            duracion: '00:00:00',
            documento: null,
            razonsocial: null,
            tipodocumento: 'S',
            departamento: null,
            municipio: null,
            celular: null,
            telefono:null,
            direccion: null,
            correo: null,
            motivo: '0',
            submotivo: '0',
            fechamotivo: '',
            personacontacto: null,
            observacion: null
        }

        $scope.ValidoFechaMinima = function() {
            var hoy = new Date();
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1; 
            var yyyy = hoy.getFullYear();
            if (dd < 10) { 
                dd = '0' + dd 
            }
            if (mm < 10) { 
                mm = '0' + mm 
            }
            $scope.maxDate = yyyy + '-' + mm + '-' + dd;
        }

        $scope.Consultar = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'ObtenerInfoTelecobro'
                }
            }).then(function (response) {
                console.log(response.data);
                $scope.datos.tipodocumento = response.data.tipo;
                $scope.datos.documento = response.data.documento;
                $scope.datos.departamento = response.data.cod_departamento;
                $scope.datos.municipio = response.data.cod_municipio;
                $scope.datos.celular = response.data.telefono;
                $scope.datos.direccion = response.data.direccion;
                $scope.datos.correo = response.data.correo;
                $scope.datos.razonsocial = response.data.razon_social;
                $("#deptos option[value='?']").remove();
                $scope.reloj = true;
                $scope.BotonRegistroLlamada = false;
                $scope.FormularioDeLlamada = true;
                $scope.OcultarFecha = false;
                $scope.CapturaFechaActual();
                $scope.CapturaHoraActual();
                $scope.Cronometro();
                $scope.ListarMotivos();
                $scope.ValidoFechaMinima();
                $scope.BuscoMunicipio();
            })
        }

        $scope.CapturaFechaActual = function () {
            var date = new Date();
            var day = date.getDate()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            if (month < 10) {
                if (day < 10) {
                    $scope.datos.fecha = 0 + day + '/' + 0 + month + '/' + year;
                } else {
                    $scope.datos.fecha = day + '/' + 0 + month + '/' + year;
                }
            } else {
                $scope.datos.fecha = day + '/' + month + '/' + year;
            }
        }

        $scope.CapturaHoraActual = function () {
            function formatTime(n) {
                return (n < 10) ? "0" + n : n;
            };
            var today = new Date(),
            month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            h = formatTime(today.getHours()),
            min = formatTime(today.getMinutes()),
            seg = formatTime(today.getSeconds()),
            hour = h,
            w = "A.M";
            if (hour >= 12) { hour = formatTime(hour - 12); w = "P.M"; };
            if (hour == 0) { hour = 12; };
            $scope.datos.fechatemporal = today.getDate() + ' / ' + month[today.getMonth()] + ' / ' + today.getFullYear();
            $scope.datos.hora = hour + ":" + min + ":" + seg + ' ' + w
        }

        $scope.Cronometro = function () {
            $(document).ready(function () {
                if (document.querySelector("#duracion") != undefined && document.querySelector("#duracion") != null) {
                    $scope.cronometro = document.querySelector("#duracion");
                    document.querySelector("[for=duracion]").classList.add("active");
                    $scope.emp = new Date();
                    $scope.elcrono = setInterval(tiempo, 10);
                    function tiempo() {
                        var actual = new Date();
                        var cro = actual - $scope.emp;
                        var cr = new Date();
                        cr.setTime(cro);
                        var cs = cr.getMilliseconds();
                        cs = cs / 10;
                        cs = Math.round(cs);
                        var sg = cr.getSeconds();
                        var mn = cr.getMinutes();
                        var ho = cr.getHours() - 1;
                        if (cs < 10) { cs = "0" + cs; }
                        if (sg < 10) { sg = "0" + sg; }
                        if (mn < 10) { mn = "0" + mn; }
                        if (ho < 10) { ho = "0" + ho; }
                        $scope.cronometro.innerHTML = '00' + ":" + mn + ":" + sg;
                    }
                }
            });
        }

        $scope.BuscarSubMotivos = function (codigo) {
            $scope.datos.submotivo = '0';
            if (codigo == '0') { $scope.OcultarFecha = false; }
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'ListarSubMotivos',
                    codigo: codigo
                }
            }).then(function (respose) {
                $scope.lsubmotivos = respose.data;
            })
        }

        $scope.MostrarFecha = function (codigo) {
            if (codigo != '0') {
                $scope.OcultarFecha = true;
            } else {
                $scope.OcultarFecha = false;
            }
        }

        $scope.FinalizarLlamadas = function () {
            $scope.datos.duracion = $scope.cronometro.innerText;
            clearInterval($scope.elcrono);
            if ($scope.datos.fechamotivo != '') {
                var formattedDate = moment($scope.datos.fechamotivo).format('DD/MM/YYYY');
            } else {
                var formattedDate = moment(new Date).format('DD/MM/YYYY');
            }

            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: {
                    function: 'InsertarGestionTeleCobro',
                    tipo_documento: $scope.datos.tipodocumento,
                    documento: $scope.datos.documento,
                    razon_social: $scope.datos.razonsocial,
                    fecha_registro: $scope.datos.fecha,
                    hora_registro: $scope.datos.hora,
                    duracion_llamada: $scope.datos.duracion,
                    cod_ciudad: $scope.datos.municipio,
                    telefono: $scope.datos.telefono,
                    celular: $scope.datos.celular,
                    direccion: $scope.datos.direccion,
                    correo: $scope.datos.correo,
                    motivo: $scope.datos.motivo,
                    submotivo: $scope.datos.submotivo,
                    fecha_submotivo: formattedDate,
                    persona_contacto: $scope.datos.personacontacto,
                    observacion: $scope.datos.observacion,
                    responsable: sessionStorage.getItem('cedula')
                }
            }).then(function (res) {
                if (res.data.codigo == '0') {
                    swal('Notificacion', res.data.mensaje, 'success').then((result) => {
                        if (result) {
                            swal({
                                title: 'Confirmar',
                                text: '¿Desea registrar otra llamada?',
                                type: 'info',
                                showCancelButton: true,
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Registrar',
                                cancelButtonText: 'Cancelar'
                            }).then(function () {
                                $scope.Limpiar();
                                $scope.Consultar();     
                                $scope.$apply();                               
                            }, function (dismiss) {
                                if (dismiss === 'cancel') {
                                    $scope.reloj = false;
                                    $scope.BotonRegistroLlamada = true;
                                    $scope.FormularioDeLlamada = false;
                                    $scope.OcultarFecha = false;
                                    $scope.$apply();
                                }
                            })
                        }
                    })
                } else {
                    swal('Notificacion', res.data.mensaje, 'error');
                }
            })
        }

        $scope.Limpiar = function () {
            $scope.reloj = false;
            $scope.BotonRegistroLlamada = true;
            $scope.FormularioDeLlamada = false;
            $scope.OcultarFecha = false;
            $scope.datos = {
                fecha: null,
                fechatemporal: null,
                hora: null,
                duracion: '00:00:00',
                documento: null,
                razonsocial: null,
                tipodocumento: 'S',
                departamento: null,
                municipio: null,
                celular: null,
                telefono:null,
                direccion: null,
                correo: null,
                motivo: '0',
                submotivo: '0',
                fechamotivo: '',
                personacontacto: null,
                observacion: null
            }
        }

        $scope.ListarNomenclatura = function () {
            afiliacionHttp.obtenerViaPrincipal().then(function (response) {
                $scope.viaprincipal = response;
            })
            afiliacionHttp.obtenerLetra().then(function (response) {
                $scope.letras = response;
            })
            afiliacionHttp.obtenerNumero().then(function (response) {
                $scope.Numeros = response;
            })
            afiliacionHttp.obtenerCuadrante().then(function (response) {
                $scope.Cuadrantes = response;
            })
            afiliacionHttp.obtenerZona().then(function (response) { 
                $scope.Zonas = response.Zona;
            })

        }

        $scope.AbrirModalDireccion = function () {
            $scope.Act_Zona = { Codigo: '' };
            $scope.ViaPrincipal = { Codigo: '' };
            $scope.Letra = { Codigo: '' };
            $scope.Cuadrante = { Codigo: '' };
            $scope.CuadranteVG = { Codigo: '' };
            $scope.SelectLetraVG = { Codigo: '' };
            $scope.Bis = false;
            $scope.ListarNomenclatura();
            $scope.dialogDiagreg = ngDialog.open({
                template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
                className: 'ngdialog-theme-plain',
                controller: 'LlamadaTelecobroController',
                closeByDocument: false,
                closeByEscape: false,
                scope: $scope
            });
            $scope.dialogDiagreg.closePromise.then(function (data) {
                if (data.value != "$closeButton") {
                    $scope.datos.direccion = data.value;
                }
            });
        }

        $scope.GuardarDireccion = function (ViaPrincipal, NumViaPrincipal, Letra, Numero, Bis, Cuadrante, NumeroVG, SelectLetraVG, NumeroPlaca, CuadranteVG, Complemento) {
            $scope.closeThisDialog($('#direcciond').val());
        }


        $scope.ListarDepartamento = function () {
            $http({
                method: 'POST',
                url: "php/cartera/funcartera.php",
                data: { function: 'ListarDepartamento' }
            }).then(function (response) {
                $scope.depto = response.data;
            });
        }


        $scope.BuscoMunicipio = function (cod) {
            $http({
                method: 'PSOT',
                url: "php/consultaafiliados/funcnovedadacb.php",
                data: { function: 'cargaMunicipios', depa: $scope.datos.departamento }
            }).then(function (response) {
                $scope.muni = response.data;
                setTimeout(function() {
                    $("#municipio option[value='?']").remove();
                }, 200);
            });

        }








    }]);
