'use strict';
angular.module('GenesisApp')
    .controller('seguimientodegestante', ['$scope', 'ngDialog', 'consultaHTTP', 'notification', 'cfpLoadingBar', '$http', '$window', '$filter', '$timeout',
        function ($scope, ngDialog, consultaHTTP, notification, cfpLoadingBar, $http, $window, $filter, $timeout) {

            window.ips = null
            // window.VALIDADO = false


            $(document).ready(function () {
                $('.modal').modal();
                $scope.visualizardatosExcel();
                $scope.visualiza_detalles();
                $scope.responsable = sessionStorage.getItem('cedula')
                $('input.currency').currencyInput();
                // scope.responsable = 
                $scope.tipoDoc = '';
                $scope.documento = '';
                $scope.esta_embarazo = '';
                $scope.trimestre = '';
                $scope.asiste_cp = '';
                $scope.ips = '';
                $scope.p_hipertension = 'N';
                $scope.p_diabetes = 'N';
                $scope.p_epoc_asma = 'N';
                $scope.p_artritis_otras_autoinmunes = 'N';
                $scope.p_vih_otras_inmunodeficiencias = 'N';
                $scope.p_tuberculosis_hepatitis_c = 'N';
                $scope.p_consumo_de_spa = 'N';
                $scope.p_patologia_salud_mental = 'N';
                $scope.p_otro = 'N';
                $scope.p_ninguna = 'N';
                $scope.educacionlm = '';
                // $scope.demandainducida = '';
                // $scope.n_embarazo = '';
                $scope.p_embarazo = '';
                $scope.nacimiento_exitoso = '';
                // $scope.fecha_nacimiento = '';
                $scope.observacion = '';
                $scope.visualizardatos();
                $scope.limpiardatos();

                document.getElementById("checkbox_saludoral").checked = false;
                // document.getElementById("checkbox_ginecologia").checked = false;
                // document.getElementById("checkbox_tamizaje").checked = false;
                // document.getElementById("checkbox_otro").checked = false;
                $scope.Rep_Registros = {
                    F_Inicio: new Date(),
                    F_Fin: new Date()
                }


                // $scope.data.ips = {}
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


            $scope.busquedaDetalles = function () {
                $scope.segundaparte = false;
                $scope.mostrarexamenfisico = false;
                $scope.vistas = false;
                $scope.busquedaXdetalles = ngDialog.open({
                    template: 'views/saludpublica/modal/modalbusquedaafiliado.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalbusquedaafiliado',
                    closeByEscape: false,
                    closeByDocument: false

                });
                $scope.busquedaXdetalles.closePromise.then(function (response) {
                    if (response.value === undefined) { return; }
                    if (response.value != "$closeButton") {
                        $scope.tipoDoc = response.value.tipo;
                        $scope.documento = response.value.documento;
                        // $scope.busquedaAfiliado();
                    }
                });
            }

            $scope.registro_nacimiento = function () {

            }

            // MODAL DE BUSQUEDAD DE AFILIADO///////////////////////

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
            $scope.buscar_afi = function () {
                var val = 0;
                $scope.Resultados = {};
                $scope.srch_pri_nombre === undefined || $scope.srch_pri_nombre == "" ? val = val : val = val + 1
                $scope.srch_seg_nombre === undefined || $scope.srch_seg_nombre == "" ? val = val : val = val + 1
                $scope.srch_pri_apellido === undefined || $scope.srch_pri_apellido == "" ? val = val : val = val + 1
                $scope.srch_seg_apellido === undefined || $scope.srch_seg_apellido == "" ? val = val : val = val + 1
                $scope.srch_seg_apellido === undefined || $scope.srch_seg_apellido == "" ? val = val : val = val + 1
                $scope.municipio == "" ? val = val : val = val + 1
                $("#dteFechaNacimiento").val() == "" || $("#dteFechaNacimiento").val() == undefined ? val = val : val = val + 1
                if (val < 2) {
                    swal('Información', 'Debe ingresar al menos dos criterios de búsqueda', 'info')
                    return;
                } else {
                    swal({
                        title: 'Buscando afiliados...',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    });
                    swal.showLoading();
                    $http({
                        method: 'GET',
                        url: "php/consultaAfiliados/obtenernucleo_nombres.php",
                        params: {
                            p_nombre: $scope.srch_pri_nombre,
                            s_nombre: $scope.srch_seg_nombre,
                            p_apellido: $scope.srch_pri_apellido,
                            s_apellido: $scope.srch_seg_apellido,
                            ubicacion: $scope.municipio,
                            f_nacimiento: $("#dteFechaNacimiento").val()
                        }
                    }).then(function (response) {
                        // $scope.validar_buscar = 1;
                        if (response.data.length == 0) {
                            swal('Información', 'No se encontraron resultados con los criterios ingresados', 'info');
                            $scope.tblResultadoAfiliados = true;
                            $scope.registro_validado = false;
                        } else {
                            $scope.registro_validado = true;
                            $scope.Resultados = response.data;
                            $scope.tblResultadoAfiliados = false;
                            swal.close();
                        }
                    });
                }
            }
            $scope.selectAfiliado = function (tipo, documento) {
                $('#a' + documento).addClass('arr');
                $('#a' + documento).siblings().removeClass('arr');

                $scope.afiliado_seleccionado = function () {
                    // $scope.dato.tipo = tipo;
                    //    $scope.dato.numeroid = documento;

                    $scope.tipoDoc = tipo;
                    $scope.documento = documento;


                }


                //  $scope.afiliado_seleccionado = {
                //     tipo:tipo,
                //     documento:documento
                //  }
            }

            $scope.limpiardatos = function () {

                // $scope.tipoDoc = '';
                // $scope.documento = '';
                $scope.area_responsable = '';
                // $scope.validar_buscar = 0;

                $scope.registro_validado = false;
                document.getElementById("checkbox_aceptarNG").checked = false;
                document.getElementById("checkbox_aceptar").checked = false;

                document.getElementById("checkbox1").checked = false;
                document.getElementById("checkbox2").checked = false;
                document.getElementById("checkbox3").checked = false;
                document.getElementById("checkbox4").checked = false;
                document.getElementById("checkbox5").checked = false;
                document.getElementById("checkbox6").checked = false;
                document.getElementById("checkbox7").checked = false;
                document.getElementById("checkbox8").checked = false;
                document.getElementById("checkbox9").checked = false;
                document.getElementById("checkbox10").checked = false;


                document.getElementById("checkbox_vacunacion").checked = false;
                document.getElementById("checkbox_crecimiento").checked = false;
                document.getElementById("checkbox_saludoral").checked = false;
                document.getElementById("checkbox_medicion").checked = false;
                document.getElementById("checkbox_control").checked = false;
                document.getElementById("checkbox_gestionriesgo").checked = false;
                document.getElementById("checkbox_adultojoven").checked = false;
                document.getElementById("checkbox_planificacion").checked = false;
                document.getElementById("checkbox_citologia").checked = false;
                document.getElementById("checkbox_tdemama").checked = false;
                document.getElementById("checkbox_tcardiovascular").checked = false;
                document.getElementById("checkbox_consultapuerperio").checked = false;
                document.getElementById("checkbox_consultaexterna").checked = false;

                // document.getElementById("checkbox_vacunacionNG").checked = false;
                // document.getElementById("checkbox_crecimientoNG").checked = false;
                // document.getElementById("checkbox_saludoralNG").checked = false;
                // document.getElementById("checkbox_medicionNG").checked = false;
                // document.getElementById("checkbox_adultojovenNG").checked = false;
                // document.getElementById("checkbox_planificacionNG").checked = false;
                // document.getElementById("checkbox_citologiaNG").checked = false;
                // document.getElementById("checkbox_tdemamaNG").checked = false;
                // document.getElementById("checkbox_tcardiovascularNG").checked = false;




                document.getElementById("checkbox_consultapuerperioNG").checked = false;
                document.getElementById("checkbox_tsifilisNG").checked = false;
                document.getElementById("checkbox_tvihNG").checked = false;
                document.getElementById("checkbox_thepatitisNG").checked = false;

                $scope.documentoModal = '';
                $scope.tipoDocModal = '';
                $scope.tblResultadoAfiliados = true;


                $scope.mostrar_parteModal = false;
                $scope.mostrar_guardar = false;
                $scope.esta_embarazo = '';
                $scope.trimestre = '';
                $scope.asiste_cp = '';
                $scope.ips = '';
                $scope.p_hipertension = 'N';
                $scope.p_diabetes = 'N';
                $scope.p_epoc_asma = 'N';
                $scope.p_artritis_otras_autoinmunes = 'N';
                $scope.p_vih_otras_inmunodeficiencias = 'N';
                $scope.p_tuberculosis_hepatitis_c = 'N';
                $scope.p_consumo_de_spa = 'N';
                $scope.p_patologia_salud_mental = 'N';
                $scope.p_otro = 'N';
                $scope.p_ninguna = 'N';
                $scope.educacionlm = '';
                // $scope.demandainducida = '';
                // $scope.n_embarazo = '';
                $scope.p_embarazo = '';
                $scope.nacimiento_exitoso = '';
                $scope.fecha_nacimiento = '';
                $scope.observacion = '';
                $scope.observacion2 = '';
                $scope.texto_educacion = 'Recuerde que la clave para proteger su vida y la de su bebé, es asistiendo a controles prenatales de manera regular. Esto acompañado de la lactancia materna exclusiva, desde el nacimiento hasta los 6 meses de vida, permite que crecimiento y desarrollo sano de su bebé. Es importante que asista al curso de preparación del embarazo en el centro de atención más cercano a usted, que siga las indicaciones medicas y ante cualquier signo de alarma, acuda a urgencias de inmediato. '
                $scope.texto_educacionNG = 'Un buen y adecuado estilo de vida, depende de la promoción de hábitos saludables que como personas mantenemos. Para usted como mujer, es importante que estas conductas positivas se mantengan y perduren para el bienestar físico y mental; es por esto que la invitamos a que adopte medidas sanas de alimentación y ejercicio. Así mismo que asista de manera gratuita a los programas de promoción y mantenimiento de la salud y demás servicios que le brindan en el centro de atención más cercano.'
                $scope.chck_educacion = true;
                $scope.chck_educacionNG = true;


            }

            // ABRIR MODAL DE IPS
            $scope.mostrarModalcenso = function (type, renglon) {
                $scope.renglon = renglon;
                $scope.dialogDiag = ngDialog.open({
                    template: 'views/salud/modal/modalUbi.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'modalUbi',
                    scope: $scope
                });
                $scope.dialogDiag.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                        $scope.ips = {
                            codigo: data.value.codigo,
                            nombre: data.value.nombre,
                            ubicacion: data.value.ubicacion
                        }
                        // $scope.data.ips = {
                        //     codigo: data.value.codigo,
                        //     nombre: data.value.nombre,
                        //     ubicacion: data.value.ubicacion
                        // }
                        window.ips = $scope.ips.codigo;
                        console.log(window.ips)
                        if (typeof $scope.ips.codigo === "undefined" || typeof $scope.ips.nombre === "undefined") {
                            $scope.ips = "";
                            $scope.ipsvalue = null;
                        } else {
                            $scope.ips = $scope.ips.codigo + ' - ' + $scope.ips.nombre;
                            $scope.ipsvalue = $scope.ips.codigo;

                        }
                    }
                });
            }



            $scope.KeyFind_Afiliado = function (keyEvent) {
                if (keyEvent.which === 13)
                  $scope.Buscar_Afiliado();
              }
        
              $scope.Buscar_Afiliado = function () {
                // $scope.Modal_Consulta_Tipo = "CC";
                // $scope.Modal_Consulta_Numero = 21232191;
                // $scope.Modal_Consulta_Nombre = "";
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
                    url: "php/afiliacionlinea/seguimientodegestante.php",                    
                    data: {
                      function: 'Buscar_Afiliado',
                      Tipo_Doc: $scope.Modal_Consulta_Tipo,
                      Num_Doc: $scope.Modal_Consulta_Numero
                    }
                  }).then(function (response) {
                    if (response.data) {
                      if (response.data[0]) {
                        $scope.Modal_Consulta_Nombre = response.data[0].NOMBRE;
                      } else {
                        swal({
                          title: "¡Ocurrio un error!",
                          text: response.data.Nombre,
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
                  });
                }
        
              }

        $scope.modal_fuente = "CONSUSALUD"; 
        $scope.moda_cohorte = "EMBARAZO"; 
        
        $scope.notificar_afiliado = function (){
            var Encontrar_Vacios_afi = false;
                if ($scope.Modal_Consulta_Diagnostico == null || $scope.Modal_Consulta_Diagnostico == '') { Encontrar_Vacios_afi = true; }
                // if ($scope.observacion == null || $scope.observacion == '') { Encontrar_Vacios_afi = true; }

                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();

                if (Encontrar_Vacios_afi == true) {
                    swal('Advertencia', 'El formulario no está diligenciado completamente, Por favor completar', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }

            $scope.conceptog = "EM"; 
            $scope.fuenteg = "N";
            $scope.gestiong = null;
            $scope.radicadog = null;
            $scope.responsableg = null;
            // $scope.diagnosticog = "z320";


            
            $http({
                method: 'POST',
                url: "php/afiliacionlinea/seguimientodegestante.php",
                data: {
                    function: 'notificar_Afiliado', 
                    tipog: $scope.Modal_Consulta_Tipo,
                    numerodg: $scope.Modal_Consulta_Numero,
                    conceptog: $scope.conceptog,
                    fuenteg: $scope.fuenteg,
                    gestiong: $scope.gestiong,
                    radicadog: $scope.radicadog,
                    responsableg: $scope.responsableg,
                    diagnosticog: $scope.Modal_Consulta_Diagnostico_Cod
                }
            }).then(function (response) {
                if (response.data.Codigo == 0) {
                    swal.close();
                    swal('Notificacion', response.data.Nombre, 'success');
                    $scope.Modal_Consulta_Tipo = "";
                    $scope.Modal_Consulta_Numero ="";
                    $scope.Modal_Consulta_Diagnostico ="";
                    $scope.Modal_Consulta_Nombre ="";

                    
                                    
                    $scope.embarazo1 = false;
                    $scope.embarazo2 = false;
                    $scope.mostrar_parte = false;
                    $scope.per_embarazo1 = false;
                    $scope.per_embarazo2 = false;
                    $scope.mos_embarazo1 = false;
                    $scope.mos_embarazo2 = false;
                    $scope.nacio1 = false;
                    $scope.nacio2 = false;


                } else {
                   
                        swal('importante', response.data.Nombre, 'error');
                    
                }
            });


        }



    $scope.crear_nuevo = function(){
    $scope.Busqueda = {
        Diagnostico: {
          Filtro: null,
          Listado: null,
          SAVE: null,
          Cohorte: null
        }
      }
      
      angular.forEach(document.querySelectorAll('#Modal_ConsultarAfiliado .red-text'), function (i) {
                  i.classList.remove('red-text');
                });
                angular.forEach(document.querySelectorAll('.Form_Consulta input'), function (i) {
                  // i.removeAttribute("readonly");
                  i.setAttribute("readonly", true);
                  // i.classList.add("class_gris");
                });
                angular.forEach(document.querySelectorAll('.Form_Consulta select'), function (i) {
                  i.setAttribute("disabled", true);
                });
                // $scope.Modal_Consulta_Tipo = "";
                // $scope.Modal_Consulta_Numero = "";
                // $scope.Modal_Consulta_Fuente = "";
                $scope.Modal_Consulta_Tipo = "";
                $scope.Modal_Consulta_Numero = "";
                $scope.Modal_Consulta_Nombre = "";
                $scope.Modal_Consulta_Fuente = "";
                $scope.Modal_Consulta_Cod_Cohorte = "";
                $scope.Modal_Consulta_Diagnostico = "";
                $scope.Modal_Consulta_Diagnostico_Cod = "";
                $scope.Modal_Consulta_Diagnostico_Nom = "";
                $scope.Busqueda.Diagnostico.SAVE = "";
                $('#Modal_ConsultarAfiliado').modal('open');
        }




        $scope.KeyFind_ObDiag = function (keyEvent) {
                if (keyEvent.which === 13)
                  $scope.Buscar_Diag();
              }
              $scope.Buscar_Diag = function () {
                if ($scope.Modal_Consulta_Diagnostico.length > 2) {
                  $http({
                    method: 'POST',
                    url: "php/afiliacionlinea/seguimientodegestante.php",                    
                    data: {
                      function: 'Obtener_Diagnostico',
                      Conc: $scope.Modal_Consulta_Diagnostico.toUpperCase()
                    }
                  }).then(function (response) {
                    if (response.data[0] != undefined && response.data.length > 1) {
                      $scope.Busqueda.Diagnostico.Filtro = response.data;
                      $scope.Busqueda.Diagnostico.Listado = response.data;
                      $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
                    }
                    if (response.data.length == 1) {
                      if (response.data[0].DIAGNOSTICO == '-1') {
                        swal({
                          title: "¡Mensaje!",
                          text: response.data[0].Nombre,
                          type: "info",
                        }).catch(swal.noop);
                        $scope.Busqueda.Diagnostico.Filtro = null;
                        $scope.Busqueda.Diagnostico.Listado = null;
                      } else {
                        $scope.FillTextbox_Listado_Diag(response.data[0].DIAGNOSTICO, response.data[0].DESCRIPCION, response.data[0].COD_COHORTE);
                      }
                    } else if (response.data.length == 0) {
                      swal({
                        title: "¡Importante!",
                        text: "No se encontro el diagnostico",
                        type: "info",
                      }).catch(swal.noop);
                    }
                  })
                } else {
                  Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
                }
              }
              $scope.Complete_Listado_Diag = function (string) {
                if ($scope.Modal_Consulta_Diagnostico != undefined && string != undefined && $scope.Busqueda.Diagnostico.Listado != undefined) {
                  $('.Clase_Listar_Diags').css({ width: $('#Gestion_Diag')[0].offsetWidth });
                  var output = [];
                  angular.forEach($scope.Busqueda.Diagnostico.Listado, function (x) {
                    if (x.DESCRIPCION.toUpperCase().indexOf(string.toUpperCase()) >= 0 || x.DIAGNOSTICO.toString().toUpperCase().indexOf(string.toUpperCase()) >= 0) {
                      output.push({ "DIAGNOSTICO": x.DIAGNOSTICO, "DESCRIPCION": x.DESCRIPCION.toUpperCase(), "COD_COHORTE": x.COD_COHORTE.toUpperCase() });
                    }
                  });
                  $scope.Busqueda.Diagnostico.Filtro = output;
                }
              }
              $scope.FillTextbox_Listado_Diag = function (codigo, nombre, cohorte) {
                // Form.Cod_Cohorte
                // $scope.Form.Cod_Diag = codigo;
                $scope.Modal_Consulta_Cod_Cohorte = cohorte;
                $scope.Modal_Consulta_Diagnostico_Cod = codigo;
                $scope.Modal_Consulta_Diagnostico_Nom = nombre;
                $scope.Modal_Consulta_Diagnostico = codigo + ' - ' + nombre;
                $scope.Busqueda.Diagnostico.SAVE = codigo + ' - ' + nombre;
                $scope.Busqueda.Diagnostico.Filtro = null;
                $scope.Busqueda.Diagnostico.Cohorte = cohorte;
                setTimeout(() => {
                  $scope.$apply();
                }, 500);
              }
              $scope.Blur_Diag = function () {
                setTimeout(() => {
                  if ($scope.Modal_Consulta_Diagnostico != null && $scope.Modal_Consulta_Diagnostico != undefined) {
                    if ($scope.Modal_Consulta_Diagnostico != $scope.Busqueda.Diagnostico.SAVE && $scope.Busqueda.Diagnostico.SAVE != null) {
                      $scope.Modal_Consulta_Diagnostico = $scope.Busqueda.Diagnostico.SAVE;
                      $scope.Busqueda.Diagnostico.Filtro = null;
                    }
                    $scope.Busqueda.Diagnostico.Filtro = null;
                  }
                  $scope.$apply();
                }, 300);
              }




            $scope.ver_guardar = function () {
                $scope.mostrar_guardar = true;

            }

            $scope.ver_guardarNG = function () {
                $scope.mostrar_guardar = true;
                if ($scope.nacimiento_exitoso == 1) {
                    // $('#Modal_Usuario').modal('open');
                    $('#Modal_Usuario').modal('open');
                    // $scope.AbrirModal_Usuario();
                }



            }
            $scope.noredirigir = false;
            $scope.registrado = function () {
                $scope.noredirigir = true;
                $('.modal').modal('close');

            }

$scope.enviar_formulario = function () {
                var Encontrar_Vacios = false;
                if ($scope.area_responsable == null || $scope.area_responsable == '') { Encontrar_Vacios = true; }
                if ($scope.observacion == null || $scope.observacion == '') { Encontrar_Vacios = true; }

                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();

                if (Encontrar_Vacios == true) {
                    swal('Advertencia', '¡El formulario no está diligenciado completamente, Por favor completar!', 'warning')
                    // Materialize.toast('¡Complete los campos', 2000);

                    return;
                }

                var Encontrar_Vaciosc = false;
                if ($scope.telefono == null || $scope.telefono == '') { Encontrar_Vaciosc = true; }
                if ($scope.celular == null || $scope.celular == '') { Encontrar_Vaciosc = true; }


                swal({ title: 'Cargando...', allowOutsideClick: false });
                swal.showLoading();

                if (Encontrar_Vaciosc == true) {
                    swal('Advertencia', '¡Debe ingresar numero de telefono y celular, Por favor completar!', 'warning')


                    return;
                }

                var datos = {
                    "responsable": $scope.responsable,
                    "tipoDoc": $scope.tipoDoc,
                    "documento": $scope.documento,
                    "documento_gs": $scope.documento_gs = "GS",
                    "concepto": $scope.concepto,
                    "fechainicio": $scope.fechainiciogs,
                    "fechafin": $scope.fechafings,

                    "esta_embarazo": $scope.area_responsable,
                    "trimestre": $scope.trimestre,
                    "asiste_cp": $scope.asiste_cp,
                    "ips": window.ips,
                    "p_hipertension": $scope.p_hipertension,
                    "p_diabetes": $scope.p_diabetes,
                    "p_epoc_asma": $scope.p_epoc_asma,
                    "p_artritis_otras_autoinmunes": $scope.p_artritis_otras_autoinmunes,
                    "p_vih_otras_inmunodeficiencias": $scope.p_vih_otras_inmunodeficiencias,
                    "p_tuberculosis_hepatitis_c": $scope.p_tuberculosis_hepatitis_c,
                    "p_consumo_de_spa": $scope.p_consumo_de_spa,
                    "p_patologia_salud_mental": $scope.p_patologia_salud_mental,
                    "p_otro": $scope.p_otro,
                    "p_ninguna": $scope.p_ninguna,
                    "educacionlm": $scope.educacionlm,
                    "celular": $scope.celular,
                    "telefono": $scope.telefono,
                    "direccion": $scope.direccion,


                    "n_checkbox_vacunacion": (document.getElementById("checkbox_vacunacion").checked == true) ? 'S' : 'N',
                    "n_checkbox_crecimiento": (document.getElementById("checkbox_crecimiento").checked == true) ? 'S' : 'N',
                    "n_checkbox_saludoral": (document.getElementById("checkbox_saludoral").checked == true) ? 'S' : 'N',
                    "n_checkbox_medicion": (document.getElementById("checkbox_medicion").checked == true) ? 'S' : 'N',
                    "n_checkbox_control": (document.getElementById("checkbox_control").checked == true) ? 'S' : 'N',
                    "n_checkbox_gestionriesgo": (document.getElementById("checkbox_gestionriesgo").checked == true) ? 'S' : 'N',
                    "n_checkbox_adultojoven": (document.getElementById("checkbox_adultojoven").checked == true) ? 'S' : 'N',
                    "n_checkbox_planificacion": (document.getElementById("checkbox_planificacion").checked == true) ? 'S' : 'N',
                    "n_checkbox_citologia": (document.getElementById("checkbox_citologia").checked == true) ? 'S' : 'N',
                    "n_checkbox_tdemama": (document.getElementById("checkbox_tdemama").checked == true) ? 'S' : 'N',
                    "n_checkbox_tcardiovascular": (document.getElementById("checkbox_tcardiovascular").checked == true) ? 'S' : 'N',
                    "n_checkbox_consultapuerperio": (document.getElementById("checkbox_consultapuerperio").checked == true) ? 'S' : 'N',
                    "n_checkbox_consultaexterna": (document.getElementById("checkbox_consultaexterna").checked == true) ? 'S' : 'N',


                    "n_checkbox_consultapuerperioNG": (document.getElementById("checkbox_consultapuerperioNG").checked == true) ? 'S' : 'N',
                    "n_checkbox_tsifilisNG": (document.getElementById("checkbox_tsifilisNG").checked == true) ? 'S' : 'N',
                    "n_checkbox_tvihNG": (document.getElementById("checkbox_tvihNG").checked == true) ? 'S' : 'N',
                    "n_checkbox_thepatitisNG": (document.getElementById("checkbox_thepatitisNG").checked == true) ? 'S' : 'N',

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    // "n_checkbox_vacunacionNG": (document.getElementById("checkbox_vacunacionNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_crecimientoNG": (document.getElementById("checkbox_crecimientoNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_saludoralNG": (document.getElementById("checkbox_saludoralNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_medicionNG": (document.getElementById("checkbox_medicionNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_adultojovenNG": (document.getElementById("checkbox_adultojovenNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_planificacionNG": (document.getElementById("checkbox_planificacionNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_citologiaNG": (document.getElementById("checkbox_citologiaNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_tdemamaNG": (document.getElementById("checkbox_tdemamaNG").checked == true) ? 'S' : 'N',
                    // "n_checkbox_tcardiovascularNG": (document.getElementById("checkbox_tcardiovascularNG").checked == true) ? 'S' : 'N',
                    


                    // "n_embarazo": $scope.n_embarazo,
                    "p_embarazo": $scope.p_embarazo,
                    "nacimiento_exitoso": $scope.nacimiento_exitoso,
                    // "fecha_nacimiento": $scope.fecha_nacimiento,
                    "observacion": $scope.observacion,

                    "observacion2": $scope.observacion2

                };


                console.log(JSON.stringify(datos))
                $http({
                    method: 'POST',
                    url: "php/afiliacionlinea/seguimientodegestante.php",
                    data: {
                        function: 'enviar_formulario', datos: JSON.stringify(datos)
                    }
                }).then(function (res) {
                    if (res.data.Codigo == 0) {
                        swal('Notificacion', res.data.Nombre, 'success');

                        $scope.visualizardatos();
                        $scope.embarazo1 = false;
                        $scope.embarazo2 = false;
                        $scope.mostrar_parte = false;
                        $scope.per_embarazo1 = false;
                        $scope.per_embarazo2 = false;
                        $scope.mos_embarazo1 = false;
                        $scope.mos_embarazo2 = false;
                        $scope.nacio1 = false;
                        $scope.nacio2 = false;
                        // debugger                           
                        if ($scope.nacimiento_exitoso == 1 && $scope.registro_validado == false) {
                            swal({
                                title: 'Confirmar Proceso',
                                text: "Desea realizar el registro de nacimiento?",
                                type: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Continuar',
                                cancelButtonText: 'Cancelar'
                            }).then(function (result) {
                                if (result) {
                                    sessionStorage.setItem("tipodoc_nac", $scope.tipoDoc)
                                    sessionStorage.setItem("documento_nac", $scope.documento)
                                    document.location.href = "http://www.localhost/genesis/app.php#/registrarafiliados";
                                }
                            }

                            )
                        }
                        $scope.registro_validado = false;
                        $scope.limpiardatos();

                        // $('#modalsemana').modal('close');

                    } else {
                        if (res.data.Codigo == 1) {
                            swal('Notificacion', res.data.Nombre, 'error')
                        }
                    }
                });
            }


            $scope.probar_redireccion = function () {

                sessionStorage.setItem("documento_nac", $scope.documento)
                sessionStorage.setItem("tipodoc_nac", $scope.tipoDoc)
                document.location.href = "http://www.localhost/genesis/app.php#/registrarafiliados";

            }

            $scope.titulo = "SEGUIMIENTO DE MUJER EN EDAD FERTIL"

            $scope.seleccionarubiscacion = function () {
                if ($scope.Ubicacion == 50000) {
                    $scope.seleubicacion = "DEPARTAMENTO DEL META"

                } else {
                    $scope.seleubicacion = "MONTERIA"
                }
            }

            $scope.seleccionarubiscacion = function () {
                if ($scope.Ubicacion == 50000) {
                    $scope.Poblacion_total = "155.177";
                    $scope.Poblacion_0_9 = "21.759";
                    $scope.Poblacion_10_59 = "114.527";
                    $scope.Poblacion_60 = "18.891";
                    $scope.Valor_contencion = "2.173.138.559";

                } else {
                    $scope.Poblacion_total = "31.374";
                    $scope.Poblacion_0_9 = "5.745";
                    $scope.Poblacion_10_59 = "22.777";
                    $scope.Poblacion_60 = "2.852";
                    $scope.Valor_contencion = "425.916.162";
                }
            }


            // ABRIR MODAL DE DIRECCION SEGUIMIENTO DE GESTANTE
            $scope.AbrirModalDireccion = function () {
                $scope.dialogDiagreg = ngDialog.open({
                    template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
                    className: 'ngdialog-theme-plain',
                    controller: 'actualizarinformacion',
                    closeByDocument: false,
                    closeByEscape: false,
                    scope: $scope
                });
                $scope.dialogDiagreg.closePromise.then(function (data) {
                    if (data.value != "$closeButton") {
                        $scope.direccion = data.value;
                        // $scope.dato.direccion = $scope.Act_Direccion2;
                        // $scope.Localaidad2 = $('#barrio').val();
                        // $scope.Act_Barrio = $scope.Localaidad2
                        $scope.$apply();
                    } else {
                        $scope.Act_Direccion;
                        $scope.Act_Barrio = $scope.barrio;
                    }
                });
            }
            // --------------------------------------------------------------------------------------------------
            $scope.seleccionarubiscacionv = function () {
                if ($scope.Ubicacionv == 50000) {
                    $scope.seleubicacionv = "DEPARTAMENTO DEL META"

                } else {
                    $scope.seleubicacionv = "MONTERIA"
                }
            }

            // ---------------------------------------------------------------------------------------------------
            $scope.seleccionar_responsable = function () {
                if ($scope.area_responsable == 'S') {
                    $scope.embarazo1 = true;
                    $scope.embarazo2 = false;


                    $scope.p_embarazo = '';
                    $scope.nacimiento_exitoso = '';
                    setTimeout(() => {
                        $scope.$apply();

                    }, 300);

                } else {
                    $scope.embarazo2 = true;
                    $scope.embarazo1 = false;
                    $scope.asiste_cp1 = false;
                    

                    $scope.trimestre = '';
                    $scope.asiste_cp = '';
                    $scope.ips = '';
                    setTimeout(() => {
                        $scope.$apply();

                    }, 300);

                }
            }

            $scope.asistecp = function () {
                if ($scope.asiste_cp == 1) {
                    $scope.asiste_cp1 = true;
                } else {

                    $scope.asiste_cp1 = false;
                }
            }
            $scope.embarazo_sn = function () {
                if ($scope.n_embarazo == 1) {
                    $scope.mos_embarazo1 = true;
                    $scope.mos_embarazo2 = false;

                } else {

                    $scope.mos_embarazo1 = false;
                    $scope.mos_embarazo2 = true;
                }
            }

            $scope.perdida_sn = function () {
                if ($scope.p_embarazo == 1) {
                    $scope.per_embarazo1 = true;
                    $scope.per_embarazo2 = false;

                } else {

                    $scope.per_embarazo1 = false;
                    $scope.per_embarazo2 = true;
                }
            }

            $scope.nacimiento_sn = function () {
                if ($scope.nacimiento_exitoso == 1) {
                    $scope.nacio1 = true;
                    $scope.nacio2 = false;

                } else {

                    $scope.nacio1 = false;
                    $scope.nacio2 = true;
                }
            }
            // ------------------------------------------------------------------------------------------
            $scope.visualiza_detalles = function () {
                $scope.consecutivo = 1;
                $http({
                    method: 'POST',
                    url: "php/afiliacionlinea/seguimientodegestante.php",
                    data: {
                        function: 'visualizar_detalles',
                        consecutivo: $scope.consecutivo
                    }

                }).then(function (response) {
                    $scope.listDatos = response.data;
                    $scope.initPaginacion($scope.listDatos);
                });

            }

            $scope.visualizardatos = function (ESTADO) {
                $scope.ESTADO_SAVE = ESTADO;
                $scope.buscar = "";
                $http({
                    method: 'POST',
                    url: "php/afiliacionlinea/seguimientodegestante.php",
                    data: { function: 'visualizardatos' }

                }).then(function (response) {
                    // $scope.limpiardatos();
                    // $scope.regimenr = response.data[0].Cod_Regimen;
                    // $scope.clasecontrator = response.data[0].Cod_Clase_Contrato;
                    // $scope.nivelatencionr = response.data[0].Nivel_Atencion;
                    // $scope.clasificacionr = response.data[0].Cod_Servicio;
                    // $scope.publicor = response.data[0].Cod_Clase;
                    // $scope.ambitor = response.data[0].Cod_Ambito;
                    // $scope.cubrimientor = response.data[0].Cod_Cubrimiento;
                    // $scope.motivor = response.data[0].Cod_Motivo;
                    // $scope.estado = response.data[0].Estado;

                    // $scope.numerodocumentov = response.data[0].Cod_Cuenta;
                    // $scope.recobroctcv = response.data[0].Cod_Cuenta_CTC;
                    // $scope.recobrotutelav = response.data[0].Cod_Cuenta_TUTELA;

                    $scope.listDatos = response.data;
                    $scope.initPaginacion($scope.listDatos);
                });
            }

            $scope.fechaInicio = "08/10/2020";
            $scope.fechaFinal = "20/10/2020";

            $scope.visualizardatosExcel = function (ESTADO) {
                $scope.ESTADO_SAVE = ESTADO;
                $scope.buscar = "";
                $http({
                    method: 'POST',
                    url: "php/afiliacionlinea/seguimientodegestante.php",
                    data: { function: 'visualizardatosExcel', fecha_inicio: $scope.fechaInicio, fecha_final: $scope.fechaFinal  }

                }).then(function (response) {
                    // $scope.limpiardatos();
                    // $scope.regimenr = response.data[0].Cod_Regimen;
                    // $scope.clasecontrator = response.data[0].Cod_Clase_Contrato;
                    // $scope.nivelatencionr = response.data[0].Nivel_Atencion;
                    // $scope.clasificacionr = response.data[0].Cod_Servicio;
                    // $scope.publicor = response.data[0].Cod_Clase;
                    // $scope.ambitor = response.data[0].Cod_Ambito;
                    // $scope.cubrimientor = response.data[0].Cod_Cubrimiento;
                    // $scope.motivor = response.data[0].Cod_Motivo;
                    // $scope.estado = response.data[0].Estado;

                    // $scope.numerodocumentov = response.data[0].Cod_Cuenta;
                    // $scope.recobroctcv = response.data[0].Cod_Cuenta_CTC;
                    // $scope.recobrotutelav = response.data[0].Cod_Cuenta_TUTELA;

                    $scope.listDatos = response.data;
                    $scope.initPaginacion($scope.listDatos);
                });
            }

           
             $scope.buscarAfiliado = function () {
                $scope.accionview('I');
                $scope.inactive2 = true;
                $scope.Data = [];
                if ($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null) {
                    $scope.inactive2 = false;
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
                        url: "php/afiliacionlinea/seguimientodegestante.php",
                        data: { function: 'obtenerafiliados',responsable:$scope.responsable, tipodocumento: $scope.tipoDoc, documento: $scope.documento }
                    }).then(function (response) {
                        if (response.data[0].codigo  == undefined) {
                            $scope.limpiardatos();
                            swal.close();
                            
                            $http({
                                method: 'POST',
                                url: "php/genesis/inicio.php",
                                data: { function: 'actualizable',tipo: $scope.tipoDoc, documento: $scope.documento }
                            }).then(function (response) {
                                $scope.respues_actualizar = response.data.mensaje;
            
                                console.log($scope.respues_actualizar)
                                if($scope.respues_actualizar == "S"){
                                    sessionStorage.setItem("tipo", $scope.tipoDoc);
                                    sessionStorage.setItem("doc", $scope.documento);
                                    ngDialog.open({
                                        template: 'views/afiliados/modal/modaldatoscontacto.html',
                                        className: 'ngdialog-theme-plain',
                                        controller: 'modaldatoscontactoController',
                                        scope: $scope,
                                        closeByEscape: false,
                                        closeByDocument: false
                                    });
            
                                }else{
            
                                }            
                
                            });




                            $scope.inactive2 = true;
                            $scope.inactive1 = false;
                            $scope.Data = response.data[0];
                            $scope.ips_primaria = response.data[0].IPSC;
                            $scope.ips_pyp = response.data[0].IPSP;
                            $scope.ips_medicamento = response.data[0].IPSM;
                            $scope.fechainiciogs = response.data[0].FECHAINICIO;
                            $scope.fechafings = response.data[0].FECHAFIN;
                            $scope.concepto = response.data[0].CONCEPTO;
                   


                            $scope.inactive2 = true;
                            $scope.accionview('R');
                            $scope.Data = response.data[0];
                            $scope.infoafiliadotele = response.data[0];
                            $scope.genero = response.data[0].SexoCodigo;
                            $scope.celular = response.data[0].CELULAR;
                            $scope.telefono = response.data[0].TELEFONO;
                            $scope.direccion = response.data[0].DIRECCION;
                            $scope.edad = response.data[0].EDAD_DIAS;

                            if ($scope.genero == 'M') {
                                $scope.mostrar_parte = false;
                                swal('Genesis', 'Para realizar el seguimiento la persona debe ser de genero femenino', 'warning');
                            } else {
                                if ($scope.edad < 10 || $scope.edad > 59) {
                                    $scope.mostrar_parte = false;
                                    swal('Genesis', 'El afiliado debe estar en el rango de edad permitido!', 'warning');

                                    // notification.getNotification('info', 'el afiliado debe estar en el rango de edad permitido!', 'Notificacion');
                                } else {
                                    $scope.mostrar_parte = true;
                                }
                            }
                            

                        }else{
                            $scope.limpiardatos();
                            swal('Importante', response.data[0].mensaje, 'info');
                           
                        }


                        
                    });
                 
                }
                else {
                    notification.getNotification('info', 'Datos del afiliado incompletos!', 'Notificacion');

                    // swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }



            $scope.buscarAfiliadoModal = function () {
                $scope.accionview('I');
                $scope.inactive2 = true;
                $scope.Data = [];
                if ($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null) {
                    $scope.inactive2 = false;
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
                        url: "php/gestionriesgo/gestionriesgo.php",
                        data: { function: 'p_obtener_datos_afiliado', tipodocumento: $scope.tipoDocModal, documento: $scope.documentoModal }
                    }).then(function (response) {
                        // $scope.validar_buscar = 1;
                        swal.close();
                        if (response.data != "0" && response.data.DOCUMENTO != "") {
                            $scope.inactive2 = true;
                            $scope.accionview('R');
                            $scope.Data = response.data;
                            $scope.infoafiliadotele = response.data;
                            $scope.genero = response.data.SexoCodigo;
                            $scope.celular = response.data.AFIC_CELULAR;
                            $scope.telefono = response.data.AFIC_TELEFONO;
                            $scope.direccion = response.data.DIRECCION;
                            $scope.edad = response.data.EdadAnos;
                            $scope.mostrar_parteModal = true;
                            $scope.registro_validado = true;

                            //   $scope.changeEmbarazo($scope.infoafiliadotele.SexoCodigo);
                            //   $scope.calcularEdad($scope.infoafiliadotele.FechaNacimiento);

                        } else {
                            swal('Genesis', 'Afiliado no registra en nuestra base de datos!', 'info');
                            $scope.registro_validado = false;
                            setTimeout(function () {
                                $scope.inactive2 = true;
                            }, 200);
                        }
                    });
                }
                else {
                    swal('Genesis', 'Datos del afiliado incompletos', 'warning');
                }
            }

            $scope.accionview = function (params, item) {
                if (params == 'U') {
                    $scope.vtab = 'U';
                    $scope.tituloview = 'Editar Información';
                    $scope.iconview = 'icon-edit';
                    $scope.infobasica.correo = $scope.infoafiliadotele.email;
                    $scope.infobasica.direccion = $scope.infoafiliadotele.DIRECCION;
                    $scope.infobasica.telefono = $scope.infoafiliadotele.AFIC_TELEFONO;
                    $scope.infobasica.celular = $scope.infoafiliadotele.AFIC_CELULAR;
                    $scope.infobasica.departamento = $scope.infoafiliadotele.Departamento;

                }
                if (params == 'A') {
                    $scope.vtab = 'A';
                    $scope.tituloview = 'Crear Teleorientacion';
                    $scope.iconview = 'icon-person';
                    for (let index = 0; index < $scope.patologias.length; index++) {
                        $scope.patologias[index].CHECK = false;
                    }

                    var f = new Date();
                    $scope.teleorientacion.fecha_input = new Date($filter('date')((f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()), "yyyy-MM-dd"));

                }
                if (params == 'E') {
                    $scope.vtab = 'E';
                    $scope.tituloview = 'Crear Evolucion';
                    $scope.iconview = 'icon-person';
                    var f = new Date();
                    $scope.evolucion.fecha_input = new Date($filter('date')((f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()), "yyyy-MM-dd"));
                    $scope.tempteleorientacion = item;

                }
                if (params == 'C') {
                    $scope.vtab = 'C';
                    $scope.tituloview = 'Ver TeleOrientaciones';
                    $scope.iconview = 'icon-eye';

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
                        url: "php/gestionriesgo/gestionriesgo.php",
                        data: { function: 'p_obtener_teleorientacion', tipodocumento: $scope.tipoDoc, documento: $scope.documento }
                    }).then(function (response) {
                        swal.close();
                        $scope.teleorientaciones = response.data;

                    });
                }
                if (params == 'V') {
                    $scope.tempteleorientacion = item;
                    $scope.tituloview = 'Ver Evoluciones';
                    $scope.iconview = 'icon-eye';
                    $scope.vtab = 'V';
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
                        url: "php/gestionriesgo/gestionriesgo.php",
                        data: { function: 'p_obtener_evolucion', numero: item.codigo }
                    }).then(function (response) {
                        swal.close();
                        $scope.evoluciones = response.data;
                    });
                }
                if (params == 'R') {
                    $scope.vtab = 'R';
                    $scope.tituloview = '';
                }
                if (params == 'I') {
                    $scope.vtab = 'I';
                    $scope.tituloview = '';
                    $scope.iconview = '';
                }
            }

            $scope.patologias = [
                {
                    "CODIGO": "1",
                    "NOMBRE": "HIPERTENSION ARTERIAL",
                    "CHECK": false
                },
                {
                    "CODIGO": "2",
                    "NOMBRE": "DIABETES MELLITUS",
                    "CHECK": false
                },
                {
                    "CODIGO": "3",
                    "NOMBRE": "EPOC / ASMA",
                    "CHECK": false
                },
                {
                    "CODIGO": "4",
                    "NOMBRE": "ARTRITIS Y OTRAS AUTOINMUNES",
                    "CHECK": false
                },
                {
                    "CODIGO": "5",
                    "NOMBRE": "VIH Y OTRAS INMUNODEFICIENCIAS",
                    "CHECK": false
                },
                {
                    "CODIGO": "6",
                    "NOMBRE": "TUBERCULOSIS O HEPATITIS C",
                    "CHECK": false
                },
                {
                    "CODIGO": "7",
                    "NOMBRE": "CONSUMO DE SPA",
                    "CHECK": false
                },
                {
                    "CODIGO": "8",
                    "NOMBRE": "PATOLOGIA DE SALUD MENTAL",
                    "CHECK": false
                },
                {
                    "CODIGO": "9",
                    "NOMBRE": "OTRO",
                    "CHECK": false
                },
                {
                    "CODIGO": "10",
                    "NOMBRE": "NINGUNA",
                    "CHECK": false
                }
            ];

            $scope.select_item_patologia = function (index, checked) {

                $scope.patologias[index].CHECK = !checked;
                // element.CHECK = !checked;
                if ($scope.patologias[index].NOMBRE == "HIPERTENSION ARTERIAL") {
                    $scope.p_hipertension = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "DIABETES MELLITUS") {
                    $scope.p_diabetes = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "EPOC / ASMA") {
                    $scope.p_epoc_asma = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "ARTRITIS Y OTRAS AUTOINMUNES") {
                    $scope.p_artritis_otras_autoinmunes = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "VIH Y OTRAS INMUNODEFICIENCIAS") {
                    $scope.p_vih_otras_inmunodeficiencias = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "TUBERCULOSIS O HEPATITIS C") {
                    $scope.p_tuberculosis_hepatitis_c = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "CONSUMO DE SPA") {
                    $scope.p_consumo_de_spa = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "PATOLOGIA DE SALUD MENTAL") {
                    $scope.p_patologia_salud_mental = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "OTRO") {
                    $scope.p_otro = (checked) ? 'N' : 'S';
                } else if ($scope.patologias[index].NOMBRE == "NINGUNA") {
                    $scope.p_ninguna = (checked) ? 'N' : 'S';
                }

            }


            $scope.accionsave = function () {
                if ($scope.vtab == 'A') {
                    if (($scope.teleorientacion.tipo_seguimiento == null || $scope.teleorientacion.tipo_seguimiento == "") ||
                        ($scope.teleorientacion.trimestre == null || $scope.teleorientacion.trimestre == "") ||
                        ($scope.teleorientacion.embarazo == null || $scope.teleorientacion.embarazo == "") ||
                        ($scope.teleorientacion.discapacidad == null || $scope.teleorientacion.discapacidad == "")) {
                        swal({ title: "No Completado", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
                    } else {
                        $scope.teleorientacion.tipo_documento = $scope.infoafiliadotele.TipoDocumento
                        $scope.teleorientacion.documento = $scope.infoafiliadotele.Documento;
                        $scope.teleorientacion.p_sexo = $scope.infoafiliadotele.SexoCodigo;

                        $scope.teleorientacion.fecha = formatDate($scope.teleorientacion.fecha_input);
                        $scope.removePositionNull($scope.tempatologias);
                        $scope.getjsonfiels($scope.tempatologias);
                        setTimeout(() => {
                            console.log(JSON.stringify($scope.teleorientacion));
                        }, 100);

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
                            url: "php/gestionriesgo/gestionriesgo.php",
                            data: { function: 'p_ui_teleorientacion', datos: JSON.stringify($scope.teleorientacion) }
                        }).then(function (response) {
                            swal.close();

                            if (response.data.Codigo == '0') {
                                swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {

                                    $scope.teleorientacion = {
                                        fecha: null,
                                        tipo_seguimiento: null,
                                        discapacidad: null,
                                        embarazo: null,
                                        trimestre: null,
                                        p_hipertension: 'N',
                                        p_diabetes: 'N',
                                        p_epoc_asma: 'N',
                                        p_artritis_otras_autoinmunes: 'N',
                                        p_vih_otras_inmunodeficiencias: 'N',
                                        p_tuberculosis_hepatitis_c: 'N',
                                        p_consumo_de_spa: 'N',
                                        p_patologia_salud_mental: 'N',
                                        p_otro: 'N',
                                        p_ninguna: 'N',

                                        factores_riesgo: null,
                                        factores_protectores: null,
                                        conducta_remision: null,
                                        p_sexo: null
                                    }

                                    document.getElementById("checkbox_saludoral").checked = false;
                                    // document.getElementById("checkbox_ginecologia").checked = false;
                                    // document.getElementById("checkbox_tamizaje").checked = false;
                                    // document.getElementById("checkbox_otro").checked = false;

                                    $scope.accionview('C');
                                })


                            } else {
                                // console.log(response.data.Nombre);
                                swal('Genesis', response.data.Nombre, 'error');
                            }


                        });
                    }
                }

                if ($scope.vtab == 'E') {

                    if ($scope.evolucion.observacion == null || $scope.evolucion.observacion == "") {
                        swal({ title: "No Completado", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
                    } else {
                        if ($scope.evolucion.observacion.length < 30) {
                            swal({ title: "No Completado", text: "La cantidad minima de caracteres es 30!", showConfirmButton: true, type: "info" });
                        } else {
                            //console.log("crea la evolucion");
                            //console.log($scope.evolucion);
                            // $scope.accionview('V', $scope.tempteleorientacion);
                            $scope.evolucion.fecha = formatDate($scope.evolucion.fecha_input);
                            console.log($scope.evolucion);
                            $http({
                                method: 'POST',
                                url: "php/gestionriesgo/gestionriesgo.php",
                                data: {
                                    function: 'p_ui_evolucion', numero: $scope.tempteleorientacion.codigo,
                                    fecha: $scope.evolucion.fecha, observacion: $scope.evolucion.observacion
                                }
                            }).then(function (response) {

                                if (response.data.Codigo == '0') {
                                    console.log(response.data.Nombre);
                                    swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {
                                        $scope.evolucion = {
                                            codigo: null,
                                            fecha: null,
                                            observacion: null
                                        }

                                        $scope.accionview('V', $scope.tempteleorientacion);
                                    })


                                } else {
                                    console.log(response.data.Nombre);
                                    swal('Genesis', response.data.Nombre, 'error');
                                }
                                console.log(response.data);


                            });
                        }
                    }
                }

                if ($scope.vtab == 'U') {
                    if (($scope.infobasica.direccion == null || $scope.infobasica.direccion == null) ||
                        ($scope.infobasica.telefono == null || $scope.infobasica.telefono == "")) {
                        swal({ title: "No Completado", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
                    } else {
                        $http({
                            method: 'POST',
                            url: "php/gestionriesgo/gestionriesgo.php",
                            data: {
                                function: 'p_gen_nov', tipo_documento: $scope.infoafiliadotele.TipoDocumento,
                                documento: $scope.infoafiliadotele.Documento,
                                direccion: $scope.infobasica.direccion,
                                telefono: $scope.infobasica.telefono,
                                celular: $scope.infobasica.cedular,
                                correo: $scope.infobasica.correo
                            }
                        }).then(function (response) {
                            console.log(response.data);
                            if (response.data.codigo == '0') {
                                console.log(response.data.mensaje);
                                swal({ title: "Completado", text: response.data.mensaje, showConfirmButton: true, type: "success" }).then(() => {
                                    $scope.infobasica = {
                                        correo: null,
                                        direccion: null,
                                        telefono: null,
                                        celular: null,
                                        barrio: null
                                    }

                                    $scope.accionview('R');
                                    $scope.buscarAfiliado();
                                })


                            } else {
                                console.log(response.data.mensaje);
                                swal('Genesis', response.data.mensaje, 'error');
                            }
                            console.log(response.data);


                        });




                    }


                }
            }


            $scope.Fechav = new Date();



            $scope.AbrirModal_Usuario = function () {
                $('#Modal_Usuario').modal('open');

            }
            $scope.closeModal = function () {
                $('.modal').modal('close');
            }

            $scope.cerrarModald = function () {
                $('#AbrirModalDireccion').modal('close');

            }

            //TABLA

            $scope.initPaginacion = function (info) {
                $scope.listDatosTemp = info;
                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 10;
                $scope.pages = [];
                $scope.configPages();
            }
            $scope.filter = function (val) {
                $scope.listDatosTemp = $filter('filter')($scope.listDatos, val);
                $scope.configPages();
            }
            $scope.configPages = function () {
                $scope.pages.length = 0;
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.listDatosTemp.length / $scope.pageSize) > $scope.valmaxpag)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                        ini = Math.ceil($scope.listDatosTemp.length / $scope.pageSize) - $scope.valmaxpag;
                        fin = Math.ceil($scope.listDatosTemp.length / $scope.pageSize);
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
                if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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
                    if ($scope.listDatosTemp.length % $scope.pageSize == 0) {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize);
                    } else {
                        var tamanomax = parseInt($scope.listDatosTemp.length / $scope.pageSize) + 1;
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



            $scope.F_Hideinformacion = function () {
                console.log($scope.hideinformacion);
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }

            $scope.F_HideinformacionModal = function () {
                console.log($scope.hideinformacionmodal);
                setTimeout(() => {
                    $scope.$apply();
                }, 500);
            }

            $scope.F_chck_educacion = function () {
                $scope.chck_educacion = document.querySelector("#checkbox_aceptar").checked;
            }

            $scope.F_chck_educacionNG = function () {
                $scope.chck_educacionNG = document.querySelector("#checkbox_aceptarNG").checked;
            }


            $scope.Generar_Registro = function () {
                if ($scope.Rep_Registros.F_Inicio != undefined && $scope.Rep_Registros.F_Fin != undefined) {
                    if ($scope.Rep_Registros.F_Inicio <= $scope.Rep_Registros.F_Fin) {
                        var xFecha_Inicio = $scope.Rep_Registros.F_Inicio;
                        var Fecha_Inicio = xFecha_Inicio.getUTCDate() + '/' + (((xFecha_Inicio.getMonth() + 1) < 10) ? '0' + (xFecha_Inicio.getMonth() + 1) : (xFecha_Inicio.getMonth() + 1)) + '/' + xFecha_Inicio.getFullYear();
                        var xFecha_Fin = $scope.Rep_Registros.F_Fin;
                        var Fecha_Fin = xFecha_Fin.getUTCDate() + '/' + (((xFecha_Fin.getMonth() + 1) < 10) ? '0' + (xFecha_Fin.getMonth() + 1) : (xFecha_Fin.getMonth() + 1)) + '/' + xFecha_Fin.getFullYear();
                        $window.open('views/afiliacionLinea/formatos/formato_seguimientogestante_excel.php?&fecha_i=' + Fecha_Inicio + '&fecha_f=' + Fecha_Fin);
                    } else {
                        Materialize.toast('¡La fecha de inicio debe ser menor a la fecha final!', 1000); $('.toast').addClass('default-background-dark');
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
