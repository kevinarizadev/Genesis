'use strict';
angular.module('GenesisApp')
.controller('soporteslegalizacion', ['$scope', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter',
function ($scope, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter) {
    // DECLARACIONES DE VARIABLES
    
        $(document).ready(function () {
            $scope.limpiardatos();
            $.getJSON( "php/obtenersession.php")
            .done(function(respuesta) {
                $scope.numerodocumento = parseInt(respuesta.nit);
                $scope.consultarRips();


                
            });        
        });
        // detalle_funcionario
        // $scope.sesdata.cedula;
        // nit de ips de prueba == 846002309
        
        $scope.tipodocumento = 'NI';
        // $scope.numerodocumento = 900465319;
        $scope.especialidad = "";
        $scope.numerodocumentoj = "NIT";
        $scope.arrayFiles = [];
        $scope.titulo = 'SOPORTES DE LEGALIZACIÓN';
        // $scope.tipodocumento = 'PE';
        // $scope.razonsocial = "8001";
        $scope.tipop = "N";
        $scope.check_option = false;
        
        // $scope.codigodane = "8001";
        // LISTAR
            $http({
                method: 'POST',
                url: "php/financiera/soporteslegalizacion.php",
                data: { function: 'obtenerdepartamento', }
            }).then(function (response) {
                
                $scope.departamentos = response.data;
            });
            
            //buscar municipio
            $scope.filterMunicipio = function () {
                swal({
                    title: 'Buscando afiliados...',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $http({
                    method: 'PSOT',
                    url: "php/financiera/soporteslegalizacion.php",
                    data: { function: 'obtenermunicipio', departamento: $scope.departamento }
                }).then(function (response) {
                    $scope.codigodane = "";
                    $scope.municipios = response.data;
                    swal.close();
                });
            }
            $scope.mostrarpersonanatural = false;
            $scope.mostrarpersonajuridica = false;
            $scope.versoportes = false;
            
            //CONSULTA
            $scope.consultarRips = function () {
                $scope.limpiardatos();
                var Encontrar_Vaciosd = false;
                if ($scope.tipodocumento == "NI") {
                    $scope.tipop = "J";
                } else {
                    $scope.tipop = "N";
                }
                
                if ($scope.tipodocumento == null || $scope.tipodocumento == '') { Encontrar_Vaciosd = true; }
                
                if (Encontrar_Vaciosd == true) {
                    swal('Advertencia', '¡Debe elegir un tipo de documento!', 'warning')
                    return;
                }
                $http({
                    method: 'POST',
                    url: "php/financiera/soporteslegalizacion.php",
                    data: { function: 'consultarRips', documento: $scope.numerodocumento, type: $scope.tipodocumento }
                }).then(function (res) {
                    $scope.pnombre = res.data[0].primer_nombre;
                    $scope.snombre = res.data[0].segundo_nombre;
                    $scope.papellido = res.data[0].primer_apellido;
                    $scope.sapellido = res.data[0].segundo_apellido;
                    $scope.razonsocial = res.data[0].razon_social;
                    $scope.direccion = res.data[0].direccion;
                    $scope.telefono = res.data[0].telefono;
                    $scope.codigodane = res.data[0].codigo_dane;
                    $scope.municipio = res.data[0].municipio;
                    $scope.genero = res.data[0].sexo;
                    $scope.email = res.data[0].correo;
                    $scope.departamento = res.data[0].departamento;
                    $scope.tipop = res.data[0].tipo;
   
                    if (res.data[0].codigo > 0) {
                        if ($scope.tipodocumento == "NI") {
                            $scope.mostrarpersonajuridica = true;
                            $scope.mostrarpersonanatural = false;

                        } else {
                            $scope.mostrarpersonanatural = true;
                            $scope.mostrarpersonajuridica = false;
                        }
                        $scope.versoportes = true;
                    } else {
                        $scope.mostrarpersonanatural = false;
                        $scope.mostrarpersonajuridica = false;
                        $scope.versoportes = false;
                        swal('Información', '¡DOCUMENTO INVALIDO!', 'error')  

                    }

                })
            }

            // $http({
            //     method: 'POST',
            //     url: "php/financiera/soporteslegalizacion.php",
            //     data: { function: 'obtenermunicipio', departamento: $scope.departamento }
            // }).then(function (response) {

            //     $scope.municipios = response.data;
            // });

            // FUNCIONES DE PROCESOS
            $scope.limpiardatos = function () {
                $scope.pnombre = '';
                $scope.snombre = '';
                $scope.papellido = '';
                $scope.sapellido = '';
                $scope.razonsocial = '';
                $scope.direccion = '';
                $scope.telefono = '';
                $scope.codigodane = '';
                $scope.genero = '';
                $scope.email = '';
                $scope.departamento = '';
                $scope.tipop = '';

                // document.getElementById("RUT").classList.remove("valid")
                $("#RUT").parent(".file-upload-wrapper").attr("data-text", "RUT");
                document.querySelector("#RUT").value='';
                // document.getElementById("RUT").value = "";
                // document.getElementById("CRL").classList.remove("valid")
                document.getElementById("CRL").value = "";
                $("#CRL").parent(".file-upload-wrapper").attr("data-text", "Cedula del Representante Legal");
                // document.getElementById("CCC").classList.remove("valid")
                document.getElementById("CCC").value = "";
                $("#CCC").parent(".file-upload-wrapper").attr("data-text", "Certificado de Cámara de Comercio");
                // document.getElementById("CCB").classList.remove("valid")
                document.getElementById("CCB").value = "";
                $("#CCB").parent(".file-upload-wrapper").attr("data-text", "Certificado de su Cuenta Bancaria");
                $scope.arrayFiles=[];
            }

            $("form").on("change", ".file-upload-field", function () {
                var archivo = $(this).val().replace(/.*(\/|\\)/, '').split(".");
                var nombre = $(this)[0].id;
                var ext = archivo[1];
                if ($(this)["0"].files.length > 0) { // se valida que exista el archivo
                    if ($(this)["0"].files["0"].size <= 3000000) { // se valida el tamaño del archivo
                        if (ext.toUpperCase() == 'PDF') { //se valida el tipo del archivo
                            $("#" + nombre).parent(".file-upload-wrapper").attr("data-text", archivo[0]+'.'+archivo[1]);
                            $scope.fileToBase64($(this)["0"].files, nombre);
                        } else {
                            $(this).val().replace(/.*(\/|\\)/, '');
                            $("#"+$(this)[0].id).val(null);
                            swal('Advertencia', '¡Tipo de archivo incorrecto', 'warning')
                            
                        }
                    } else {
                        $(this).val().replace(/.*(\/|\\)/, '');
                        $("#"+$(this)[0].id).val(null);
                        swal('Advertencia', '¡El tamaño del archivo es demasiado grande', 'warning')

                    }
                } else {
                    $(this).val().replace(/.*(\/|\\)/, '');
                    $("#"+$(this)[0].id).val(null);
                    swal('Advertencia', '¡Debe agregar algún adjunto!', 'warning')
                }
            });

            $scope.fileToBase64 = function (filesSelected, name) {
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function (fileLoadedEvent) {
                        var array = {
                            src: fileLoadedEvent.target.result,
                            name: name
                        };
                        var x = [];
                        x = $scope.arrayFiles.findIndex(x => x.name === array.name);
                        if (x == -1) {
                            $scope.arrayFiles.push(array);
                        } else {
                            $scope.arrayFiles[x].src = array.src;
                        }
                    };
                    fileReader.readAsDataURL(fileToLoad);
                }
            }



            // TRANSACIONES

            $scope.guardarsoportes = function () {
                var Encontrar_Vacios = false;
                if ($scope.direccion == null || $scope.direccion == '') { Encontrar_Vacios = true; }
                if ($scope.telefono == null || $scope.telefono == '') { Encontrar_Vacios = true; }
                if ($scope.email == null || $scope.email == '') { Encontrar_Vacios = true; }
                if ($scope.razonsocial == null || $scope.razonsocial == '') { Encontrar_Vacios = true; }

                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();
               
                // if ($scope.tipop == "N") {
                //     if ($scope.pnombre == null || $scope.pnombre == '') { Encontrar_Vacios = true; }
                //     if ($scope.papellido == null || $scope.papellido == '') { Encontrar_Vacios = true; }
                //     if ($scope.sapellido == null || $scope.sapellido == '') { Encontrar_Vacios = true; }
                //     if ($scope.genero == null || $scope.genero == '') { Encontrar_Vacios = true; }
                //     if ($scope.snombre == "" || $scope.snombre == null) { $scope.snombre = ""; }
                //     $scope.razonsocial = "";

                // } else {
                //     $scope.pnombre = "";
                //     $scope.snombre = "";
                //     $scope.papellido = "";
                //     $scope.sapellido = "";
                //     $scope.genero = "";
                // }
                // if ($scope.codigodane == null || $scope.codigodane == '') { Encontrar_Vacios = true; }
                // if ($scope.numerodocumento == null || $scope.numerodocumento == '') { Encontrar_Vacios = true; }
                // if ($scope.direccion == null || $scope.direccion == '') { Encontrar_Vacios = true; }
                // if ($scope.telefono == null || $scope.telefono == '') { Encontrar_Vacios = true; }
                // if ($scope.email == null || $scope.email == '') { Encontrar_Vacios = true; }
                // if ($scope.tipodocumento == null || $scope.tipodocumento == '') { Encontrar_Vacios = true; }


                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡El formulario no está diligenciado completamente, Por favor completar!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }
                if ($scope.arrayFiles.length != 4) {
                    swal('Advertencia', '¡Por favor subir todos los archivos requeridos', 'warning')
                    return;
                }

                var json = {
                    type: $scope.tipodocumento,
                    documento: $scope.numerodocumento,
                    pnombre: $scope.pnombre,
                    snombre: $scope.snombre,
                    papellido: $scope.papellido,
                    sapellido: $scope.sapellido,
                    razonsocial: $scope.razonsocial,
                    direccion: $scope.direccion,
                    telefono: $scope.telefono,
                    ubicacion: $scope.codigodane,
                    sexo: $scope.genero,
                    email: $scope.email,
                    tipop: $scope.tipop,
                    rut: '',
                    crl: '',
                    ccc: '',
                    ccb: ''
                };
                $http({
                    method: 'POST',
                    url: "php/financiera/test_upload.php",
                    data: {
                        function: 'SubirSoportes',
                        archivos: JSON.stringify($scope.arrayFiles),
                        documento: $scope.numerodocumento
                    }
                }).
                    then(function (res) {
                        var resp = res.data;
                        for (let i = 0; i < resp.length; i++) {
                            switch (resp[i].archivo) {
                                case 'RUT':
                                    json.rut = resp[i].ruta;
                                    break;
                                case 'CRL':
                                    json.crl = resp[i].ruta;
                                    break;
                                case 'CCC':
                                    json.ccc = resp[i].ruta;
                                    break;
                                case 'CCB':
                                    json.ccb = resp[i].ruta;
                                    break;
                                default:
                                    break;
                            }
                        } 

                        $http({
                            method: 'POST',
                            url: "php/financiera/soporteslegalizacion.php",
                            data: {
                                function: 'guardarsoportes',
                                datos: JSON.stringify(json)
                            }
                        }).then(function (res) {
                                if (res.data[0].codigo == "1") {
                                    var resp = res.data[0];
                                    swal({
                                        title: '¡mensaje!',
                                        text: resp.mensaje,
                                        type: 'success'
                                    }).catch(swal.noop);
                                    $scope.limpiardatos();
                                    $scope.mostrarpersonanatural = false;
                                    $scope.mostrarpersonajuridica = false;
                                    $scope.versoportes = false;
                                } else {
                                    swal({
                                        title: '¡mensaje!',
                                        text: res.data,
                                        type: 'error'
                                    }).catch(swal.noop);
                                }
                            });
                    });

            }
        
            // $scope.consultarRips();

        }]);