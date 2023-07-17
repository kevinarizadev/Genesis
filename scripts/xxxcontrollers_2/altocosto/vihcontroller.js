'use strict';
angular.module('GenesisApp')
    .controller('vihcontroller', ['$scope', '$http', 'renalHttp', 'ngDialog', 'notification', '$timeout', '$q', 'upload', 'communication', '$controller', '$rootScope', '$window',
        function ($scope, $http, renalHttp, ngDialog, notification, $timeout, $q, upload, communication, $controller, $rootScope, $window) {
            $scope.infobasica = true;
            $timeout(function () { $scope.$apply(); }, 500);//END TIMEOUT
            // $scope.campos = true;
            $(document).ready(function () {
                console.clear();
                $(".fechas").kendoDatePicker({
                    culture: "es-MX",
                    format: "yyyy-MM-dd",
                    dateInput: true
                });
                $scope.infobasica = true;
                // $scope.infobasica = false;
                $scope.campos = true;
                $scope.toolsbtn = false;
                $scope.limpiarbtn = false;
                $scope.errorbtn = false;
                $scope.cargarbtn = false;

                //$scope.limpiarbtn=false;
                $('input.currency').currencyInput();

                $("#tabs").tabs();
                $scope.setTab(1);
                $scope.tab = 1;
                // $scope.tipodoc = "";
                // $scope.identificacion = "";
                $scope.tipodoc = "";
                $scope.identificacion = "";
                // $scope.tab = 1;
                $scope.find_input_empty = 0;
                $scope.find_tab_input_empty = 0;

                $scope.varstring_3 = ''; $scope.filtermed3 = '';
                $scope.varstring_4 = ''; $scope.filtermed4 = '';
                $scope.varstring_5 = ''; $scope.filtermed5 = '';
                $scope.varstring_6 = ''; $scope.filtermed6 = '';

                $scope.ids = JSON.stringify([
                    1, 2, 3, 4, 5, 6, 7, 8, 9,
                    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                    20, 21, 22, 23, 24, 241, 242, 243, 244, 245, 246, 247, 248, 249, 25, 251, 252, 26, 27, 28, 281, 29, 291,
                    30, 301, 31, 32, 33, 34, 35, 36, 361, 362, 37, 38, 39,
                    40, 401, 41, 411, 42, 421, 422, 423, 424, 425, 43, 431, 44, 441, 45, 46, 47, 48, 49,
                    50, 51, 511, 512, 513, 514, 515, 516, 517, 518, 521, 522, 523, 524, 525, 526, 527, 528, 529, 5210, 5211, 5212, 5213, 5214, 5215, 5216, 5217, 5218, 5219, 5220, 5221, 5222, 53, 531, 532, 533, 534, 54, 55, 56, 561, 57, 571, 58, 581, 59, 591,
                    60, 601, 61, 611, 62, 621, 63, 64, 65, 66, 67, 68, 681, 682, 683, 684, 685, 686, 687, 688, 689, 6810, 6811, 6812, 6813, 6814, 69,
                    70, 71, 72, 73, 74, 75, 751, 76, 761, 77, 771, 772, 773, 774, 775, 776, 777, 778, 78, 79,
                    80, 81, 82, 83, 84, 85, 86, 861, 87, 88, 89,
                    90, 91, 92, 93, 94, 95, 96, 97, 971, 972, 973, 974, 98, 99
                ]);
                $scope.ids = JSON.parse($scope.ids);
                $timeout(function () {
                    $scope.$apply();
                }, 500);//END TIMEOUT
                $timeout(function () {
                    $scope.limpiar();
                }, 3000);//END TIMEOUT
            });
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////            
            (function ($) {
                $.fn.currencyInput = function () {
                    this.each(function () {
                        var wrapper = $("<div class='currency-input' />");
                        $(this).wrap(wrapper);
                        $(this).before("<span class='currency-symbol'>$</span>");
                    });
                };
            })(jQuery);


            $scope.format = function (NID) {
                const input = document.getElementById('' + NID + '');
                var num = input.value.replace(/\./g, '');
                if (!isNaN(num)) {
                    num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
                    num = num.split('').reverse().join('').replace(/^[\.]/, '');
                    input.value = num;
                }
                else {
                    input.value = input.value.replace(/[^\d\.]*/g, '');
                }
            }


            $scope.setTab = function (newTab) {
                document.getElementById("tabscroll").scrollIntoView({ block: 'start', behavior: 'smooth' });
                $scope.tab = newTab;
                $(".tabI").removeClass("tabactiva");
                $(".tabII").removeClass("tabactiva");
                $(".tabIII").removeClass("tabactiva");
                $(".tabIV").removeClass("tabactiva");
                $(".tabV").removeClass("tabactiva");
                $(".tabVI").removeClass("tabactiva");
                $(".tabVII").removeClass("tabactiva");
                switch (newTab) {
                    case 1:
                        $(".tabI").addClass("tabactiva");
                        break;
                    case 2:
                        $(".tabII").addClass("tabactiva");
                        break;
                    case 3:
                        $(".tabIII").addClass("tabactiva");
                        break;
                    case 4:
                        $(".tabIV").addClass("tabactiva");
                        break;
                    case 5:
                        $(".tabV").addClass("tabactiva");
                        break;
                    case 6:
                        $(".tabVI").addClass("tabactiva");
                        break;
                    case 7:
                        $(".tabVII").addClass("tabactiva");
                        break;
                    default:

                }
            }
            $scope.isSet = function (tabNum) {
                return $scope.tab === tabNum;
            }


            $scope.Blur_number_0 = function (NID) {

                var m = document.getElementById("_ID" + NID + "_N").value;
                if (!document.getElementById("_ID" + NID + "_N").value) { document.getElementById("_ID" + NID + "_N").value = 0; }
            }
            $scope.Blur_number_2 = function (NID) {
                var m = document.getElementById("_ID" + NID + "_N").value;
                if (!document.getElementById("_ID" + NID + "_N").value) { document.getElementById("_ID" + NID + "_N").value = 2; }
            }

            $scope.Chg_fecha = function (NID, TAB) {
                var m = document.getElementById("_ID" + NID + "_F").value;
                var expreg = new RegExp("^([1-2]{1}[0-9]{3})-(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))-(([0]{1}[1-9]{1})|([1-2]{1}[0-9]{1})|([3]{1}[0-1]{1}))$");
                if (expreg.test(m)) {
                    var aFecha2 = m.split('-');
                    var f_corte = Date.UTC(2020, 0, 31);
                    var prueba = Date.UTC(aFecha2[0], aFecha2[1] - 1, aFecha2[2]);
                    var f_nac = $scope.DatosBasicos.FechaNacimiento.split('-');
                    var r_nac = Date.UTC(f_nac[0], f_nac[1] - 1, f_nac[2]);
                    if (r_nac <= prueba && f_corte >= prueba) {
                        $("#_ID" + NID + "_L").removeClass('requerido');
                        $("#_ID" + NID + "_L").addClass('normal');
                    } else {
                        if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                        $("#_ID" + NID + "_L").removeClass('normal');
                        $("#_ID" + NID + "_L").addClass('requerido');
                        if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                        $scope.find_input_empty += 1;
                        $scope.find_tab_input_empty += 1;
                        Materialize.toast('¡La fecha debe ser mayor a la fecha de nacimiento y menor a la fecha de corte!', 3000); $('.toast').addClass('default-background-dark');
                    }

                    //$("#_ID" + NID + "_L").removeClass('requerido');
                    //$("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && undefined != TAB) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }

            $scope.Chg_check = function (NID) {
                var n = $('#_CH' + NID).is(':checked');
                if (n == true) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
            }

            $scope.Chg_decimal = function (Variable, NID, TAB) {
                var expreg = new RegExp("^(([\\d]{1,3})|([\\d]{1,3}.[\\d]{1}))$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }

            $scope.Chg_decimal561 = function (Variable, NID, TAB) {
                var expreg = new RegExp("^[\\d]{3}$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }
            $scope.Chg_decimal571 = function (Variable, NID, TAB) {
                var expreg = new RegExp("^[\\d]{1,4}$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }
            $scope.Chg_decimal581 = function (Variable, NID, TAB) {
                var expreg = new RegExp("^[\\d]{2}\\.[\\d]{1}$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }
            $scope.Chg_decimal601 = function (Variable, NID, TAB) {
                var expreg = new RegExp("^[\\d]{1,2}\\.[\\d]{1}$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }
            $scope.Chg_decimal621 = function (Variable, NID, TAB) {
                var expreg = new RegExp("^[\\d]{1,3}\\.[\\d]{1}$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }

            $scope.Chg_dane = function (Variable, NID, TAB) {
                var expreg = new RegExp("^[\\d]{5}$");
                if (expreg.test(Variable)) {
                    $("#_ID" + NID + "_L").removeClass('requerido');
                    $("#_ID" + NID + "_L").addClass('normal');
                }
                else {
                    if ($scope.find_tab_input_empty == 0 && TAB != undefined) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal');
                    $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                    $scope.find_tab_input_empty += 1;
                }
            }



            $scope.Ver_empty = function (Variable, NID, TAB) {
                if (Variable == "" && parseInt(Variable) != 0) {
                    if ($scope.find_tab_input_empty == 0) { $scope.setTab(TAB); }
                    $("#_ID" + NID + "_L").removeClass('normal'); $("#_ID" + NID + "_L").addClass('requerido');
                    if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                    $scope.find_input_empty += 1;
                } else {
                    if (Variable == null) {
                        if ($scope.find_tab_input_empty == 0) { $scope.setTab(TAB); }
                        $("#_ID" + NID + "_L").removeClass('normal'); $("#_ID" + NID + "_L").addClass('requerido');
                        if ($scope.find_input_empty == 0) { document.getElementById("_ID" + NID + "_L").scrollIntoView({ block: 'start', behavior: 'smooth' }); }
                        $scope.find_input_empty += 1;
                    } else {
                        $("#_ID" + NID + "_L").removeClass('requerido'); $("#_ID" + NID + "_L").addClass('normal');
                    }
                }
            }



            $scope.Find_med_enter = function (keyEvent, MODEL, NID, ARRAYDATOS, FILTER) {
                if (keyEvent.which === 13)
                    $scope.Medicamento(MODEL, NID, ARRAYDATOS, FILTER);
            }

            $scope.Medicamento = function (CAMPO, NID, ARRAYDATOS, FILTER) {
                if ($scope[CAMPO].length > 2) {
                    $http({
                        method: 'POST',
                        url: "php/altocosto/vih/VIH.php",
                        data: {
                            function: 'ObtenerMedicamentos',
                            coincidencia: $scope[CAMPO]
                        }
                    }).then(function (response) {
                        $scope[ARRAYDATOS] = response.data;
                        if ($scope[ARRAYDATOS] != 0) {
                            $scope.slideWidth = $('#Medicamentos1')[0].offsetWidth;
                            $('.list-group').css({ width: $scope.slideWidth });
                            $("#_ID" + NID + "_L").removeClass('requerido'); $("#_ID" + NID + "_L").addClass('normal');
                            $scope.complete_medi($scope[CAMPO], ARRAYDATOS, FILTER);
                        } else {
                            $("#_ID" + NID + "_L").removeClass('normal'); $("#_ID" + NID + "_L").addClass('requerido');
                        }
                    });
                } else {
                    Materialize.toast('¡Digite al menos 3 caracteres!', 1000); $('.toast').addClass('default-background-dark');
                }
            }

            $scope.Blur_Med = function (CAMPO, ARRAYDATOS, FILTER, VARSTRING) {
                if ($scope[ARRAYDATOS] != null && $scope[ARRAYDATOS] != 0) {
                    $timeout(function () {
                        if ($scope[CAMPO] != $scope[VARSTRING]) { $scope[CAMPO] = null; }
                        $scope[FILTER] = null;
                    }, 300);//END TIMEOUT
                }
            }
            $scope.complete_medi = function (string, ARRAYDATOS, FILTER) {
                if ($scope[ARRAYDATOS] != null && $scope[ARRAYDATOS] != 0) {
                    var output = [];
                    angular.forEach($scope[ARRAYDATOS], function (Medicamentos) {
                        if (Medicamentos.Nombre.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                            output.push({ "MEDICAMENTO": ({ "NOMBRE": Medicamentos.Nombre, "CODIGO": Medicamentos.Codigo }) });
                        }
                    });
                    $scope[FILTER] = output;
                }
            }
            $scope.fillTextbox_2 = function (CAMPO, FILTER, VARSTRING, string, cod) {
                $scope[CAMPO] = cod;
                $scope[FILTER] = null;
                $scope[VARSTRING] = cod;
            }


            $scope.Val1 = function () {
                $scope.Ver_empty($scope.Codigogrupoetnico, 11, 1);
                $scope.Ver_empty($scope.poblacionclave, 12, 1);
                $scope.Ver_empty($scope._NGM15_S, 15, 1);
                $scope.Ver_empty($scope._NGM16_S, 16, 1);
                $scope.Ver_empty($scope._NGM17_S, 17, 1);
                $scope.Ver_empty($scope._NGM18_S, 18, 1);
                //Información de mujeres gestantes
                if ($scope._CH19 == true) { $scope.Ver_empty($scope._NGM19_S, 19, 1); } else { $scope.Chg_fecha(19, 1); }
                if ($scope._CH20 == true) { $scope.Ver_empty($scope._NGM20_S, 20, 1); } else { $scope.Chg_fecha(20, 1); }
                if ($scope._CH21 == true) { $scope.Ver_empty($scope._NGM21_S, 21, 1); } else { $scope.Chg_fecha(21, 1); }
                if ($scope._CH22 == true) { $scope.Ver_empty($scope._NGM22_S, 22, 1); } else { $scope.Chg_fecha(22, 1); }
                if ($scope._CH23 == true) { $scope.Ver_empty($scope._NGM23_S, 23, 1); } else { $scope.Chg_fecha(23, 1); }
                $scope.Ver_empty($scope._NGM24_S, 24, 1);
                if ($scope._CH241 == true) { $scope.Ver_empty($scope._NGM241_S, 241, 1); } else { $scope.Ver_empty($scope._NGM241_N, 241, 1); }
                $scope.Ver_empty($scope._NGM242_S, 242, 1);
                if ($scope._CH243 == true) { $scope.Ver_empty($scope._NGM243_S, 243, 1); } else { $scope.Ver_empty($scope._NGM243_N, 243, 1); }
                $scope.Ver_empty($scope._NGM244_S, 244, 1);
                $scope.Ver_empty($scope._NGM245_S, 245, 1);
                if ($scope._CH246 == true) { $scope.Ver_empty($scope._NGM246_S, 246, 1); } else { $scope.Chg_fecha(246, 1); }
                $scope.Ver_empty($scope._NGM247_S, 247, 1);
                $scope.Ver_empty($scope._NGM248_S, 248, 1);
                if ($scope._CH249 == true) { $scope.Ver_empty($scope._NGM249_S, 249, 1); } else { $scope.Ver_empty($scope._NGM249_N, 249, 1); }
                //Información de menores de 12 meses hijos o hijas de madres que viven con VIH:
                $scope.Ver_empty($scope._NGM25_S, 25, 1);
                if ($scope._CH251 == true) { $scope.Ver_empty($scope._NGM251_S, 251, 1); } else { $scope.Ver_empty($scope._NGM251_N, 251, 1); }
                $scope.Ver_empty($scope._NGM252_S, 252, 1);
                $scope.Ver_empty($scope._NGM26_S, 26, 1);
                $scope.Ver_empty($scope._NGM27_S, 27, 1);
                if ($scope._CH28 == true) { $scope.Ver_empty($scope._NGM28_S, 28, 1); } else { $scope.Chg_fecha(28, 1); }
                if ($scope._CH281 == true) { $scope.Ver_empty($scope._NGM281_S, 281, 1); } else { $scope.Ver_empty($scope._NGM281_N, 281, 1); }
                if ($scope._CH29 == true) { $scope.Ver_empty($scope._NGM29_S, 29, 1); } else { $scope.Chg_fecha(29, 1); }
                if ($scope._CH291 == true) { $scope.Ver_empty($scope._NGM291_S, 291, 1); } else { $scope.Ver_empty($scope._NGM291_N, 291, 1); }
                if ($scope._CH30 == true) { $scope.Ver_empty($scope._NGM30_S, 30, 1); } else { $scope.Chg_fecha(30, 1); }
                if ($scope._CH301 == true) { $scope.Ver_empty($scope._NGM301_S, 301, 1); } else { $scope.Ver_empty($scope._NGM301_N, 301, 1); }
                $scope.Ver_empty($scope._NGM31_S, 31, 1);
            }

            $scope.Val2 = function () {
                //Información de personas con tuberculosis activa
                if ($scope._CH32 == true) { $scope.Ver_empty($scope._NGM32_S, 32, 2); } else { $scope.Chg_fecha(32, 2); }
                if ($scope._CH33 == true) { $scope.Ver_empty($scope._NGM33_S, 33, 2); } else { $scope.Chg_fecha(33, 2); }
                //Información de personas que viven con VIH
                if ($scope._CH34 == true) { $scope.Ver_empty($scope._NGM34_S, 34, 2); } else { $scope.Chg_fecha(34, 2); }
                $scope.Ver_empty($scope._NGM35_S, 35, 2);
                if ($scope._CH36 == true) { $scope.Ver_empty($scope._NGM36_S, 36, 2); } else { $scope.Chg_fecha(36, 2); }
                $scope.Ver_empty($scope._NGM361_S, 361, 2);
                if ($scope._CH362 == true) { $scope.Ver_empty($scope._NGM362_S, 362, 2); } else { $scope.Ver_empty($scope._NGM362_N, 362, 2); }
                if ($scope._CH37 == true) { $scope.Ver_empty($scope._NGM37_S, 37, 2); } else { $scope.Chg_fecha(37, 2); }
                $scope.Ver_empty($scope._NGM38_S, 38, 2);
                $scope.Ver_empty($scope._NGM39_S, 39, 2);
                $scope.Ver_empty($scope._NGM40_S, 40, 2);
                if ($scope._CH401 == true) { $scope.Ver_empty($scope._NGM401_S, 401, 2); } else { $scope.Ver_empty($scope._NGM401_N, 401, 2); }
                $scope.Ver_empty($scope._NGM41_S, 41, 2);
                if ($scope._CH411 == true) { $scope.Ver_empty($scope._NGM411_S, 411, 2); } else { $scope.Ver_empty($scope._NGM411_N, 411, 2); }
            }

            $scope.Val3 = function () {
                //Terapia Antirretroviral (TAR) Inicial
                if ($scope._CH42 == true) { $scope.Ver_empty($scope._NGM42_S, 42, 3); } else { $scope.Chg_fecha(42, 3); }
                if ($scope._CH421 == true) { $scope.Ver_empty($scope._NGM421_S, 421, 3); } else { $scope.Ver_empty($scope._NGM421_N, 421, 3); }
                if ($scope._CH422 == true) { $scope.Ver_empty($scope._NGM422_S, 422, 3); } else { $scope.Ver_empty($scope._NGM422_N, 422, 3); }
                if ($scope._CH423 == true) { $scope.Ver_empty($scope._NGM423_S, 423, 3); } else { $scope.Ver_empty($scope._NGM423_N, 423, 3); }
                if ($scope._CH424 == true) { $scope.Ver_empty($scope._NGM424_S, 424, 3); } else { $scope.Ver_empty($scope._NGM424_N, 424, 3); }
                if ($scope._CH425 == true) { $scope.Ver_empty($scope._NGM425_S, 425, 3); } else { $scope.Ver_empty($scope._NGM425_N, 425, 3); }
                $scope.Ver_empty($scope._NGM43_S, 43, 3);
                if ($scope._CH431 == true) { $scope.Ver_empty($scope._NGM431_S, 431, 3); } else { $scope.Ver_empty($scope._NGM431_N, 431, 3); }
                $scope.Ver_empty($scope._NGM44_S, 44, 3);
                if ($scope._CH441 == true) { $scope.Ver_empty($scope._NGM441_S, 441, 3); } else { $scope.Ver_empty($scope._NGM441_N, 441, 3); }
                $scope.Ver_empty($scope._NGM45_S, 45, 3);
                $scope.Ver_empty($scope._NGM46_S, 46, 3);
                $scope.Ver_empty($scope._NGM47_S, 47, 3);
                $scope.Ver_empty($scope._NGM48_S, 48, 3);
                if ($scope._CH49 == true) { $scope.Ver_empty($scope._NGM49_S, 49, 3); } else { $scope.Ver_empty($scope._NGM49_N, 49, 3); }
                if ($scope._CH50 == true) { $scope.Ver_empty($scope._NGM50_S, 50, 3); } else { $scope.Ver_empty($scope._NGM50_N, 50, 3); }
                $scope.Ver_empty($scope._NGM51_S, 51, 3);
                if ($scope._CH511 == true) { $scope.Ver_empty($scope._NGM511_S, 511, 3); } else { $scope.Chg_fecha(511, 3); }
                $scope.Ver_empty($scope._NGM512_S, 512, 3);
                if ($scope._CH513 == true) { $scope.Ver_empty($scope._NGM513_S, 513, 3); } else { $scope.Ver_empty($scope._NGM513_T, 513, 3); }
                if ($scope._CH514 == true) { $scope.Ver_empty($scope._NGM514_S, 514, 3); } else { $scope.Ver_empty($scope._NGM514_T, 514, 3); }
                if ($scope._CH515 == true) { $scope.Ver_empty($scope._NGM515_S, 515, 3); } else { $scope.Ver_empty($scope._NGM515_T, 515, 3); }
                if ($scope._CH516 == true) { $scope.Ver_empty($scope._NGM516_S, 516, 3); } else { $scope.Ver_empty($scope._NGM516_T, 516, 3); }
                $scope.Ver_empty($scope._NGM517_S, 517, 3);
                if ($scope._CH518 == true) { $scope.Ver_empty($scope._NGM518_S, 518, 3); } else { $scope.Ver_empty($scope._NGM518_N, 518, 3); }
            }

            $scope.Val4 = function () {
                //Patologías definitorias de SIDA (diagnosticadas durante o después del diagnóstico de VIH)
                $scope.Ver_empty($scope._NGM521_S, 521, 4);
                $scope.Ver_empty($scope._NGM522_S, 522, 4);
                $scope.Ver_empty($scope._NGM523_S, 523, 4);
                $scope.Ver_empty($scope._NGM524_S, 524, 4);
                $scope.Ver_empty($scope._NGM525_S, 525, 4);
                $scope.Ver_empty($scope._NGM526_S, 526, 4);
                $scope.Ver_empty($scope._NGM527_S, 527, 4);
                $scope.Ver_empty($scope._NGM528_S, 528, 4);
                $scope.Ver_empty($scope._NGM529_S, 529, 4);
                $scope.Ver_empty($scope._NGM5210_S, 5210, 4);
                $scope.Ver_empty($scope._NGM5211_S, 5211, 4);
                $scope.Ver_empty($scope._NGM5212_S, 5212, 4);
                $scope.Ver_empty($scope._NGM5213_S, 5213, 4);
                $scope.Ver_empty($scope._NGM5214_S, 5214, 4);
                $scope.Ver_empty($scope._NGM5215_S, 5215, 4);
                $scope.Ver_empty($scope._NGM5216_S, 5216, 4);
                $scope.Ver_empty($scope._NGM5217_S, 5217, 4);
                $scope.Ver_empty($scope._NGM5218_S, 5218, 4);
                $scope.Ver_empty($scope._NGM5219_S, 5219, 4);
                $scope.Ver_empty($scope._NGM5220_S, 5220, 4);
                $scope.Ver_empty($scope._NGM5221_S, 5221, 4);
                $scope.Ver_empty($scope._NGM5222_S, 5222, 4);
            }

            $scope.Val5 = function () {
                //Condición actual de la persona que vive con VIH
                $scope.Ver_empty($scope._NGM53_N, 53, 5);
                if ($scope._CH531 == true) { $scope.Ver_empty($scope._NGM531_S, 531, 5); } else { $scope.Chg_fecha(531, 5); }
                $scope.Chg_dane($scope._NGM532_N, 532, 5);
                $scope.Ver_empty($scope._NGM533_S, 533, 5);
                $scope.Ver_empty($scope._NGM534_S, 534, 5);
                if ($scope._CH54 == true) { $scope.Ver_empty($scope._NGM54_S, 54, 5); } else { $scope.Chg_fecha(54, 5); }
                $scope.Ver_empty($scope._NGM55_S, 55, 5);
                if ($scope._CH56 == true) { $scope.Ver_empty($scope._NGM56_S, 56, 5); } else { $scope.Chg_fecha(56, 5); }
                if ($scope._CH561 == true) { $scope.Ver_empty($scope._NGM561_S, 561, 5); } else { $scope.Chg_decimal561($scope._NGM561_N, 561, 5); }
                if ($scope._CH57 == true) { $scope.Ver_empty($scope._NGM57_S, 57, 5); } else { $scope.Chg_fecha(57, 5); }
                if ($scope._CH571 == true) { $scope.Ver_empty($scope._NGM571_S, 571, 5); } else { $scope.Chg_decimal571($scope._NGM571_N, 571, 5); }
                if ($scope._CH58 == true) { $scope.Ver_empty($scope._NGM58_S, 58, 5); } else { $scope.Chg_fecha(58, 5); }
                if ($scope._CH581 == true) { $scope.Ver_empty($scope._NGM581_S, 581, 5); } else { $scope.Chg_decimal581($scope._NGM581_N, 581, 5); }
                if ($scope._CH59 == true) { $scope.Ver_empty($scope._NGM59_S, 59, 5); } else { $scope.Chg_fecha(59, 5); }
                if ($scope._CH591 == true) { $scope.Ver_empty($scope._NGM591_S, 591, 5); } else { $scope.Chg_decimal571($scope._NGM591_N, 591, 5); }
                if ($scope._CH60 == true) { $scope.Ver_empty($scope._NGM60_S, 60, 5); } else { $scope.Chg_fecha(60, 5); }
                if ($scope._CH601 == true) { $scope.Ver_empty($scope._NGM601_S, 601, 5); } else { $scope.Chg_decimal601($scope._NGM601_N, 601, 5); }
                if ($scope._CH61 == true) { $scope.Ver_empty($scope._NGM61_S, 61, 5); } else { $scope.Chg_fecha(61, 5); }
                if ($scope._CH611 == true) { $scope.Ver_empty($scope._NGM611_S, 611, 5); } else { $scope.Chg_decimal571($scope._NGM611_N, 611, 5); }
                if ($scope._CH62 == true) { $scope.Ver_empty($scope._NGM62_S, 62, 5); } else { $scope.Chg_fecha(62, 5); }
                if ($scope._CH621 == true) { $scope.Ver_empty($scope._NGM621_S, 621, 5); } else { $scope.Chg_decimal621($scope._NGM621_N, 621, 5); }
                if ($scope._CH63 == true) { $scope.Ver_empty($scope._NGM63_S, 63, 5); } else { $scope.Ver_empty($scope._NGM63_N, 63, 5); }
                $scope.Ver_empty($scope._NGM64_S, 64, 5);
                $scope.Ver_empty($scope._NGM65_S, 65, 5);
                $scope.Ver_empty($scope._NGM66_S, 66, 5);
                $scope.Ver_empty($scope._NGM67_S, 67, 5);
                $scope.Ver_empty($scope._NGM68_S, 68, 5);
                $scope.Ver_empty($scope._NGM681_S, 681, 5);
                $scope.Ver_empty($scope._NGM682_S, 682, 5);
                if ($scope._CH683 == true) { $scope.Ver_empty($scope._NGM683_S, 683, 5); } else { $scope.Chg_fecha(683, 5); }
                if ($scope._CH684 == true) { $scope.Ver_empty($scope._NGM684_S, 684, 5); } else { $scope.Ver_empty($scope._NGM684_N, 684, 5); }
                if ($scope._CH685 == true) { $scope.Ver_empty($scope._NGM685_S, 685, 5); } else { $scope.Ver_empty($scope._NGM685_N, 685, 5); }
                if ($scope._CH686 == true) { $scope.Ver_empty($scope._NGM686_S, 686, 5); } else { $scope.Ver_empty($scope._NGM686_N, 686, 5); }
                if ($scope._CH687 == true) { $scope.Ver_empty($scope._NGM687_S, 687, 5); } else { $scope.Ver_empty($scope._NGM687_N, 687, 5); }
                if ($scope._CH688 == true) { $scope.Ver_empty($scope._NGM688_S, 688, 5); } else { $scope.Ver_empty($scope._NGM688_N, 688, 5); }
                if ($scope._CH689 == true) { $scope.Ver_empty($scope._NGM689_S, 689, 5); } else { $scope.Ver_empty($scope._NGM689_N, 689, 5); }
                if ($scope._CH6810 == true) { $scope.Ver_empty($scope._NGM6810_S, 6810, 5); } else { $scope.Ver_empty($scope._NGM6810_N, 6810, 5); }
                if ($scope._CH6811 == true) { $scope.Ver_empty($scope._NGM6811_S, 6811, 5); } else { $scope.Ver_empty($scope._NGM6811_N, 6811, 5); }
                if ($scope._CH6812 == true) { $scope.Ver_empty($scope._NGM6812_S, 6812, 5); } else { $scope.Ver_empty($scope._NGM6812_N, 6812, 5); }
                if ($scope._CH6813 == true) { $scope.Ver_empty($scope._NGM6813_S, 6813, 5); } else { $scope.Chg_fecha(6813, 5); }
                $scope.Ver_empty($scope._NGM6814_S, 6814, 5);
                $scope.Ver_empty($scope._NGM69_S, 69, 5);
                $scope.Ver_empty($scope._NGM70_S, 70, 5);
                $scope.Ver_empty($scope._NGM71_S, 71, 5);
                $scope.Ver_empty($scope._NGM72_S, 72, 5);
                $scope.Ver_empty($scope._NGM73_S, 73, 5);
                $scope.Ver_empty($scope._NGM74_S, 74, 5);
                if ($scope._CH75 == true) { $scope.Ver_empty($scope._NGM75_S, 75, 5); } else { $scope.Chg_fecha(75, 5); }
                if ($scope._CH751 == true) { $scope.Ver_empty($scope._NGM751_S, 751, 5); } else { $scope.Ver_empty($scope._NGM751_N, 751, 5); }
                if ($scope._CH76 == true) { $scope.Ver_empty($scope._NGM76_S, 76, 5); } else { $scope.Chg_fecha(76, 5); }
                if ($scope._CH761 == true) { $scope.Ver_empty($scope._NGM761_S, 761, 5); } else { $scope.Ver_empty($scope._NGM761_N, 761, 5); }
            }

            $scope.Val6 = function () {
                //Terapia Antirretroviral (TAR) Actual
                $scope.Ver_empty($scope._NGM77_S, 77, 6);
                if ($scope._CH771 == true) { $scope.Ver_empty($scope._NGM771_S, 771, 6); } else { $scope.Chg_fecha(771, 6); }
                if ($scope._CH772 == true) { $scope.Ver_empty($scope._NGM772_S, 772, 6); } else { $scope.Ver_empty($scope._NGM772_N, 772, 6); }
                if ($scope._CH773 == true) { $scope.Ver_empty($scope._NGM773_S, 773, 6); } else { $scope.Ver_empty($scope._NGM773_N, 773, 6); }
                if ($scope._CH774 == true) { $scope.Ver_empty($scope._NGM774_S, 774, 6); } else { $scope.Ver_empty($scope._NGM774_N, 774, 6); }
                if ($scope._CH775 == true) { $scope.Ver_empty($scope._NGM775_S, 775, 6); } else { $scope.Ver_empty($scope._NGM775_N, 775, 6); }
                if ($scope._CH776 == true) { $scope.Ver_empty($scope._NGM776_S, 776, 6); } else { $scope.Ver_empty($scope._NGM776_N, 776, 6); }
                if ($scope._CH777 == true) { $scope.Ver_empty($scope._NGM777_S, 777, 6); } else { $scope.Ver_empty($scope._NGM777_N, 777, 6); }
                if ($scope._CH778 == true) { $scope.Ver_empty($scope._NGM778_S, 778, 6); } else { $scope.Ver_empty($scope._NGM778_N, 778, 6); }
                //Intervenciones de prevención en la persona que vive con VIH
                if ($scope._CH78 == true) { $scope.Ver_empty($scope._NGM78_S, 78, 6); } else { $scope.Ver_empty($scope._NGM78_N, 78, 6); }
                $scope.Ver_empty($scope._NGM79_S, 79, 6);
                $scope.Ver_empty($scope._NGM80_S, 80, 6);
                $scope.Ver_empty($scope._NGM81_S, 81, 6);
                $scope.Ver_empty($scope._NGM82_S, 82, 6);
                $scope.Ver_empty($scope._NGM83_S, 83, 6);
                $scope.Ver_empty($scope._NGM84_S, 84, 6);
                $scope.Ver_empty($scope._NGM85_S, 85, 6);
                $scope.Ver_empty($scope._NGM86_S, 86, 6);
                $scope.Ver_empty($scope._NGM861_S, 861, 6);
                $scope.Ver_empty($scope._NGM87_S, 87, 6);
                $scope.Ver_empty($scope._NGM88_S, 88, 6);
                $scope.Ver_empty($scope._NGM89_S, 89, 6);
                if ($scope._CH90 == true) { $scope.Ver_empty($scope._NGM90_S, 90, 6); } else { $scope.Ver_empty($scope._NGM90_T, 90, 6); }
            }

            $scope.Val7 = function () {
                //Profilaxis
                $scope.Ver_empty($scope._NGM91_S, 91, 7);
                $scope.Ver_empty($scope._NGM92_S, 92, 7);
                $scope.Ver_empty($scope._NGM93_S, 93, 7);
                //Situación administrativa a la fecha de corte
                $scope.Ver_empty($scope._NGM94_N, 94, 7);
                $scope.Ver_empty($scope._NGM95_N, 95, 7);
                $scope.Ver_empty($scope._NGM96_N, 96, 7);
                $scope.Ver_empty($scope._NGM97_S, 97, 7);
                if ($scope._CH971 == true) { $scope.Ver_empty($scope._NGM971_S, 971, 7); } else { $scope.Chg_fecha(971, 7); }
                if ($scope._CH972 == true) { $scope.Ver_empty($scope._NGM972_S, 972, 7); } else { $scope.Ver_empty($scope._NGM972_N, 972, 7); }
                if ($scope._CH973 == true) { $scope.Ver_empty($scope._NGM973_S, 973, 7); } else { $scope.Chg_fecha(973, 7); }
                $scope.Ver_empty($scope._NGM974_S, 974, 7);
            }

            $scope.Val = function () {
                $scope.find_input_empty = 0;
                $scope.find_tab_input_empty = 0;
                $scope.Val1(); $scope.Val2(); $scope.Val3(); $scope.Val4(); $scope.Val5(); $scope.Val6(); $scope.Val7();
                //
                if ($scope.find_input_empty == 0 && $scope.find_tab_input_empty == 0) {
                    /*var fileInput = document.getElementById('AdjuntoArchivoHistoria');
                    var fileInput2 = document.getElementById('AdjuntoArchivoMedicamento');
                    if (0 != fileInput.files.length && 0 != fileInput2.files.length && $scope.limitesubirhistoria == false && $scope.limitesubirmedicamento == false) {
                        $scope.subir();
                    }*/
                    var v13 = 0, v94 = 0, v95 = 0;
                    v13 = $scope.DatosBasicos.CodigoMunicipio
                    if ($scope.DatosBasicos.CodigoMunicipio.length < 5) {
                        v13 = '0' + $scope.DatosBasicos.CodigoMunicipio;
                    } else {
                        v13 = $scope.DatosBasicos.CodigoMunicipio;
                    }
                    var expreg94 = new RegExp("\\.");
                    if (expreg94.test($scope._NGM94_N)) {
                        v94 = $scope._NGM94_N.replace(/\./g, "");
                    }
                    else {
                        v94 = $scope._NGM94_N;
                    }
                    var expreg95 = new RegExp("\\.");
                    if (expreg95.test($scope._NGM95_N)) {
                        v95 = $scope._NGM95_N.replace(/\./g, "");
                    }
                    else {
                        v95 = $scope._NGM95_N;
                    }
                    $scope.Array = JSON.stringify([{
                        V_PV1: $scope.DatosBasicos.V10,
                        V_PV2: $scope.DatosBasicos.CodigoRegimen,
                        V_PV3: $scope.DatosBasicos.TipoDocumento,
                        V_PV4: $scope.DatosBasicos.Documento,
                        V_PV5: $scope.DatosBasicos.PrimerApellido,
                        V_PV6: ($scope.DatosBasicos.SegundoApellido == 0) ? 'NOAP' : $scope.DatosBasicos.SegundoApellido,
                        V_PV7: $scope.DatosBasicos.PrimerNombre,
                        V_PV8: ($scope.DatosBasicos.SegundoNombre == 0) ? 'NONE' : $scope.DatosBasicos.SegundoNombre,
                        V_PV9: $scope.DatosBasicos.FechaNacimiento,
                        V_PV10: $scope.SexoCodigo,
                        V_PV11: Number($scope.Codigogrupoetnico),
                        V_PV12: ($scope.poblacionclave == '') ? '9' : $scope.poblacionclave,
                        V_PV13: v13,
                        V_PV14: $scope.DatosBasicos.FechaAfiliacion,
                        V_PV15: Number($scope._NGM15_S),
                        V_PV16: Number($scope._NGM16_S),
                        V_PV17: Number($scope._NGM17_S),
                        V_PV18: Number($scope._NGM18_S),
                        V_PV19: ($scope._CH19 == true) ? $scope._NGM19_S : $scope._NGM19_F,
                        V_PV20: ($scope._CH20 == true) ? $scope._NGM20_S : $scope._NGM20_F,
                        V_PV21: ($scope._CH21 == true) ? $scope._NGM21_S : $scope._NGM21_F,
                        V_PV22: ($scope._CH22 == true) ? $scope._NGM22_S : $scope._NGM22_F,
                        V_PV23: ($scope._CH23 == true) ? $scope._NGM23_S : $scope._NGM23_F,
                        V_PV24: Number($scope._NGM24_S),
                        V_PV241: ($scope._CH241 == true) ? Number($scope._NGM241_S) : Number($scope._NGM241_N),
                        V_PV242: Number($scope._NGM242_S),
                        V_PV243: ($scope._CH243 == true) ? Number($scope._NGM243_S) : Number($scope._NGM243_N),
                        V_PV244: Number($scope._NGM244_S),
                        V_PV245: Number($scope._NGM245_S),
                        V_PV246: ($scope._CH246 == true) ? $scope._NGM246_S : $scope._NGM246_F,
                        V_PV247: Number($scope._NGM247_S),
                        V_PV248: $scope._NGM248_S,
                        V_PV249: ($scope._CH249 == true) ? Number($scope._NGM249_S) : $scope._NGM249_N,
                        V_PV25: $scope._NGM25_S,
                        V_PV251: ($scope._CH251 == true) ? Number($scope._NGM251_S) : $scope._NGM251_N,
                        V_PV252: Number($scope._NGM252_S),
                        V_PV26: Number($scope._NGM26_S),
                        V_PV27: Number($scope._NGM27_S),
                        V_PV28: ($scope._CH28 == true) ? $scope._NGM28_S : $scope._NGM28_F,
                        V_PV281: ($scope._CH281 == true) ? Number($scope._NGM281_S) : Number($scope._NGM281_N),
                        V_PV29: ($scope._CH29 == true) ? $scope._NGM29_S : $scope._NGM29_F,
                        V_PV291: ($scope._CH291 == true) ? Number($scope._NGM291_S) : Number($scope._NGM291_N),
                        V_PV30: ($scope._CH30 == true) ? $scope._NGM30_S : $scope._NGM30_F,
                        V_PV301: ($scope._CH301 == true) ? Number($scope._NGM301_S) : Number($scope._NGM301_N),
                        V_PV31: Number($scope._NGM31_S),
                        V_PV32: ($scope._CH32 == true) ? $scope._NGM32_S : $scope._NGM32_F,
                        V_PV33: ($scope._CH33 == true) ? $scope._NGM33_S : $scope._NGM33_F,
                        V_PV34: ($scope._CH34 == true) ? $scope._NGM34_S : $scope._NGM34_F,
                        V_PV35: Number($scope._NGM35_S),
                        V_PV36: ($scope._CH36 == true) ? $scope._NGM36_S : $scope._NGM36_F,
                        V_PV361: Number($scope._NGM361_S),
                        V_PV362: ($scope._CH362 == true) ? Number($scope._NGM362_S) : $scope._NGM362_N,
                        V_PV37: ($scope._CH37 == true) ? $scope._NGM37_S : $scope._NGM37_F,
                        V_PV38: Number($scope._NGM38_S),
                        V_PV39: Number($scope._NGM39_S),
                        V_PV40: Number($scope._NGM40_S),
                        V_PV401: ($scope._CH401 == true) ? Number($scope._NGM401_S) : Number($scope._NGM401_N),
                        V_PV41: Number($scope._NGM41_S),
                        V_PV411: ($scope._CH411 == true) ? Number($scope._NGM411_S) : Number($scope._NGM411_N),
                        V_PV42: ($scope._CH42 == true) ? $scope._NGM42_S : $scope._NGM42_F,
                        V_PV421: ($scope._CH421 == true) ? Number($scope._NGM421_S) : $scope._NGM421_N,
                        V_PV422: ($scope._CH422 == true) ? Number($scope._NGM422_S) : $scope._NGM422_N,
                        V_PV423: ($scope._CH423 == true) ? Number($scope._NGM423_S) : $scope._NGM423_N,
                        V_PV424: ($scope._CH424 == true) ? Number($scope._NGM424_S) : $scope._NGM424_N,
                        V_PV425: ($scope._CH425 == true) ? Number($scope._NGM425_S) : $scope._NGM425_N,
                        V_PV43: Number($scope._NGM43_S),
                        V_PV431: ($scope._CH431 == true) ? Number($scope._NGM431_S) : Number($scope._NGM431_N),
                        V_PV44: Number($scope._NGM44_S),
                        V_PV441: ($scope._CH441 == true) ? Number($scope._NGM441_S) : Number($scope._NGM441_N),
                        V_PV45: Number($scope._NGM45_S),
                        V_PV46: Number($scope._NGM46_S),
                        V_PV47: Number($scope._NGM47_S),
                        V_PV48: Number($scope._NGM48_S),
                        V_PV49: ($scope._CH49 == true) ? Number($scope._NGM49_S) : Number($scope._NGM49_N),
                        V_PV50: ($scope._CH50 == true) ? Number($scope._NGM50_S) : Number($scope._NGM50_N),
                        V_PV51: Number($scope._NGM51_S),
                        V_PV511: ($scope._CH511 == true) ? $scope._NGM511_S : $scope._NGM511_F,
                        V_PV512: Number($scope._NGM512_S),
                        V_PV513: ($scope._CH513 == true) ? Number($scope._NGM513_S) : $scope._NGM513_T,
                        V_PV514: ($scope._CH514 == true) ? Number($scope._NGM514_S) : $scope._NGM514_T,
                        V_PV515: ($scope._CH515 == true) ? Number($scope._NGM515_S) : $scope._NGM515_T,
                        V_PV516: ($scope._CH516 == true) ? Number($scope._NGM516_S) : $scope._NGM516_T,
                        V_PV517: Number($scope._NGM517_S),
                        V_PV518: ($scope._CH518 == true) ? Number($scope._NGM518_S) : Number($scope._NGM518_N),
                        V_PV521: Number($scope._NGM521_S),
                        V_PV522: Number($scope._NGM522_S),
                        V_PV523: Number($scope._NGM523_S),
                        V_PV524: Number($scope._NGM524_S),
                        V_PV525: Number($scope._NGM525_S),
                        V_PV526: Number($scope._NGM526_S),
                        V_PV527: Number($scope._NGM527_S),
                        V_PV528: Number($scope._NGM528_S),
                        V_PV529: Number($scope._NGM529_S),
                        V_PV5210: Number($scope._NGM5210_S),
                        V_PV5211: Number($scope._NGM5211_S),
                        V_PV5212: Number($scope._NGM5212_S),
                        V_PV5213: Number($scope._NGM5213_S),
                        V_PV5214: Number($scope._NGM5214_S),
                        V_PV5215: Number($scope._NGM5215_S),
                        V_PV5216: Number($scope._NGM5216_S),
                        V_PV5217: Number($scope._NGM5217_S),
                        V_PV5218: Number($scope._NGM5218_S),
                        V_PV5219: Number($scope._NGM5219_S),
                        V_PV5220: Number($scope._NGM5220_S),
                        V_PV5221: Number($scope._NGM5221_S),
                        V_PV5222: Number($scope._NGM5222_S),
                        V_PV53: $scope._NGM53_N,
                        V_PV531: ($scope._CH531 == true) ? $scope._NGM531_S : $scope._NGM531_F,
                        V_PV532: $scope._NGM532_N,
                        V_PV533: Number($scope._NGM533_S),
                        V_PV534: Number($scope._NGM534_S),
                        V_PV54: ($scope._CH54 == true) ? $scope._NGM54_S : $scope._NGM54_F,
                        V_PV55: Number($scope._NGM55_S),
                        V_PV56: ($scope._CH56 == true) ? $scope._NGM56_S : $scope._NGM56_F,
                        V_PV561: ($scope._CH561 == true) ? Number($scope._NGM561_S) : $scope._NGM561_N,
                        V_PV57: ($scope._CH57 == true) ? $scope._NGM57_S : $scope._NGM57_F,
                        V_PV571: ($scope._CH571 == true) ? Number($scope._NGM571_S) : $scope._NGM571_N,
                        V_PV58: ($scope._CH58 == true) ? $scope._NGM58_S : $scope._NGM58_F,
                        V_PV581: ($scope._CH581 == true) ? Number($scope._NGM581_S) : $scope._NGM581_N,
                        V_PV59: ($scope._CH59 == true) ? $scope._NGM59_S : $scope._NGM59_F,
                        V_PV591: ($scope._CH591 == true) ? Number($scope._NGM591_S) : $scope._NGM591_N,
                        V_PV60: ($scope._CH60 == true) ? $scope._NGM60_S : $scope._NGM60_F,
                        V_PV601: ($scope._CH601 == true) ? Number($scope._NGM601_S) : $scope._NGM601_N,
                        V_PV61: ($scope._CH61 == true) ? $scope._NGM61_S : $scope._NGM61_F,
                        V_PV611: ($scope._CH611 == true) ? Number($scope._NGM611_S) : $scope._NGM611_N,
                        V_PV62: ($scope._CH62 == true) ? $scope._NGM62_S : $scope._NGM62_F,
                        V_PV621: ($scope._CH621 == true) ? Number($scope._NGM621_S) : $scope._NGM621_N,
                        V_PV63: ($scope._CH63 == true) ? Number($scope._NGM63_S) : Number($scope._NGM63_N),
                        V_PV64: Number($scope._NGM64_S),
                        V_PV65: Number($scope._NGM65_S),
                        V_PV66: Number($scope._NGM66_S),
                        V_PV67: Number($scope._NGM67_S),
                        V_PV68: Number($scope._NGM68_S),
                        V_PV681: Number($scope._NGM681_S),
                        V_PV682: Number($scope._NGM682_S),
                        V_PV683: ($scope._CH683 == true) ? $scope._NGM683_S : $scope._NGM683_F,
                        V_PV684: ($scope._CH684 == true) ? Number($scope._NGM684_S) : Number($scope._NGM684_N),
                        V_PV685: ($scope._CH685 == true) ? Number($scope._NGM685_S) : Number($scope._NGM685_N),
                        V_PV686: ($scope._CH686 == true) ? Number($scope._NGM686_S) : Number($scope._NGM686_N),
                        V_PV687: ($scope._CH687 == true) ? Number($scope._NGM687_S) : Number($scope._NGM687_N),
                        V_PV688: ($scope._CH688 == true) ? Number($scope._NGM688_S) : Number($scope._NGM688_N),
                        V_PV689: ($scope._CH689 == true) ? Number($scope._NGM689_S) : Number($scope._NGM689_N),
                        V_PV6810: ($scope._CH6810 == true) ? Number($scope._NGM6810_S) : Number($scope._NGM6810_N),
                        V_PV6811: ($scope._CH6811 == true) ? Number($scope._NGM6811_S) : Number($scope._NGM6811_N),
                        V_PV6812: ($scope._CH6812 == true) ? Number($scope._NGM6812_S) : Number($scope._NGM6812_N),
                        V_PV6813: ($scope._CH6813 == true) ? $scope._NGM6813_S : $scope._NGM6813_F,
                        V_PV6814: Number($scope._NGM6814_S),
                        V_PV69: Number($scope._NGM69_S),
                        V_PV70: Number($scope._NGM70_S),
                        V_PV71: Number($scope._NGM71_S),
                        V_PV72: Number($scope._NGM72_S),
                        V_PV73: Number($scope._NGM73_S),
                        V_PV74: Number($scope._NGM74_S),
                        V_PV75: ($scope._CH75 == true) ? $scope._NGM75_S : $scope._NGM75_F,
                        V_PV751: ($scope._CH751 == true) ? Number($scope._NGM751_S) : Number($scope._NGM751_N),
                        V_PV76: ($scope._CH76 == true) ? $scope._NGM76_S : $scope._NGM76_F,
                        V_PV761: ($scope._CH761 == true) ? Number($scope._NGM761_S) : Number($scope._NGM761_N),
                        V_PV77: Number($scope._NGM77_S),
                        V_PV771: ($scope._CH771 == true) ? $scope._NGM771_S : $scope._NGM771_F,
                        V_PV772: ($scope._CH772 == true) ? Number($scope._NGM772_S) : Number($scope._NGM772_N),
                        V_PV773: ($scope._CH773 == true) ? Number($scope._NGM773_S) : Number($scope._NGM773_N),
                        V_PV774: ($scope._CH774 == true) ? Number($scope._NGM774_S) : Number($scope._NGM774_N),
                        V_PV775: ($scope._CH775 == true) ? Number($scope._NGM775_S) : Number($scope._NGM775_N),
                        V_PV776: ($scope._CH776 == true) ? Number($scope._NGM776_S) : Number($scope._NGM776_N),
                        V_PV777: ($scope._CH777 == true) ? Number($scope._NGM777_S) : Number($scope._NGM777_N),
                        V_PV778: ($scope._CH778 == true) ? Number($scope._NGM778_S) : Number($scope._NGM778_N),
                        V_PV78: ($scope._CH78 == true) ? Number($scope._NGM78_S) : Number($scope._NGM78_N),
                        V_PV79: Number($scope._NGM79_S),
                        V_PV80: Number($scope._NGM80_S),
                        V_PV81: Number($scope._NGM81_S),
                        V_PV82: Number($scope._NGM82_S),
                        V_PV83: Number($scope._NGM83_S),
                        V_PV84: Number($scope._NGM84_S),
                        V_PV85: Number($scope._NGM85_S),
                        V_PV86: Number($scope._NGM86_S),
                        V_PV861: Number($scope._NGM861_S),
                        V_PV87: Number($scope._NGM87_S),
                        V_PV88: Number($scope._NGM88_S),
                        V_PV89: Number($scope._NGM89_S),
                        V_PV90: ($scope._CH90 == true) ? Number($scope._NGM90_S) : $scope._NGM90_T,
                        V_PV91: Number($scope._NGM91_S),
                        V_PV92: Number($scope._NGM92_S),
                        V_PV93: Number($scope._NGM93_S),
                        V_PV94: v94,
                        V_PV95: v95,
                        V_PV96: Number($scope._NGM96_N),
                        V_PV97: Number($scope._NGM97_S),
                        V_PV971: ($scope._CH971 == true) ? $scope._NGM971_S : $scope._NGM971_F,
                        V_PV972: ($scope._CH972 == true) ? Number($scope._NGM972_S) : Number($scope._NGM972_N),
                        V_PV973: ($scope._CH973 == true) ? $scope._NGM973_S : $scope._NGM973_F,
                        V_PV974: Number($scope._NGM974_S),
                        V_PV98: "2020-01-31",
                        V_PV99: Number($scope.V99)
                    }]);

                    // $scope.Array = JSON.stringify([{"V_PV1":"CCF055","V_PV2":"S","V_PV3":"CC","V_PV4":"32871822","V_PV5":"NUÑEZ","V_PV6":"CUETO","V_PV7":"NOHEMI","V_PV8":"ESTHER","V_PV9":"1975-02-04","V_PV10":"M","V_PV11":1,"V_PV12":"2","V_PV13":"08758","V_PV14":"2016-08-02","V_PV15":1,"V_PV16":0,"V_PV17":1,"V_PV18":1,"V_PV19":"1845-01-01","V_PV20":"2020-02-01","V_PV21":"1799-01-01","V_PV22":"1800-01-01","V_PV23":"1799-01-01","V_PV24":2,"V_PV241":2,"V_PV242":1,"V_PV243":2,"V_PV244":1,"V_PV245":1,"V_PV246":"1845-01-01","V_PV247":8,"V_PV248":"CN","V_PV249":0,"V_PV25":"CE","V_PV251":0,"V_PV252":0,"V_PV26":0,"V_PV27":0,"V_PV28":"1800-01-01","V_PV281":0,"V_PV29":"1800-01-01","V_PV291":0,"V_PV30":"1800-01-01","V_PV301":0,"V_PV31":1,"V_PV32":"1845-01-01","V_PV33":"1799-01-01","V_PV34":"1811-01-01","V_PV35":1,"V_PV36":"1845-01-01","V_PV361":0,"V_PV362":0,"V_PV37":"1800-01-01","V_PV38":1,"V_PV39":2,"V_PV40":1,"V_PV401":0,"V_PV41":1,"V_PV411":0,"V_PV42":"1799-01-01","V_PV421":0,"V_PV422":0,"V_PV423":0,"V_PV424":0,"V_PV425":0,"V_PV43":2,"V_PV431":0,"V_PV44":1,"V_PV441":0,"V_PV45":15,"V_PV46":3,"V_PV47":6,"V_PV48":2,"V_PV49":0,"V_PV50":0,"V_PV51":1,"V_PV511":"1845-01-01","V_PV512":1,"V_PV513":"199303112","V_PV514":9,"V_PV515":9,"V_PV516":9,"V_PV517":5,"V_PV518":0,"V_PV521":0,"V_PV522":9,"V_PV523":1,"V_PV524":0,"V_PV525":0,"V_PV526":1,"V_PV527":1,"V_PV528":0,"V_PV529":1,"V_PV5210":0,"V_PV5211":1,"V_PV5212":0,"V_PV5213":9,"V_PV5214":1,"V_PV5215":0,"V_PV5216":0,"V_PV5217":1,"V_PV5218":1,"V_PV5219":1,"V_PV5220":1,"V_PV5221":0,"V_PV5222":1,"V_PV53":0,"V_PV531":"1800-01-01","V_PV532":"08001","V_PV533":1,"V_PV534":1,"V_PV54":"1800-01-01","V_PV55":0,"V_PV56":"1799-01-01","V_PV561":999,"V_PV57":"1845-01-01","V_PV571":0,"V_PV58":"1799-01-01","V_PV581":9998,"V_PV59":"1845-01-01","V_PV591":0,"V_PV60":"1845-01-01","V_PV601":9998,"V_PV61":"1845-01-01","V_PV611":0,"V_PV62":"1845-01-01","V_PV621":998,"V_PV63":0,"V_PV64":0,"V_PV65":9,"V_PV66":0,"V_PV67":9,"V_PV68":1,"V_PV681":1,"V_PV682":1,"V_PV683":"1800-01-01","V_PV684":0,"V_PV685":0,"V_PV686":0,"V_PV687":0,"V_PV688":0,"V_PV689":0,"V_PV6810":0,"V_PV6811":0,"V_PV6812":0,"V_PV6813":"1800-01-01","V_PV6814":3,"V_PV69":0,"V_PV70":1,"V_PV71":1,"V_PV72":1,"V_PV73":0,"V_PV74":1,"V_PV75":"1845-01-01","V_PV751":0,"V_PV76":"1799-01-01","V_PV761":0,"V_PV77":1,"V_PV771":"1788-01-01","V_PV772":0,"V_PV773":0,"V_PV774":0,"V_PV775":0,"V_PV776":0,"V_PV777":0,"V_PV778":0,"V_PV78":0,"V_PV79":3,"V_PV80":5,"V_PV81":2,"V_PV82":2,"V_PV83":3,"V_PV84":2,"V_PV85":2,"V_PV86":1,"V_PV861":3,"V_PV87":3,"V_PV88":3,"V_PV89":3,"V_PV90":97,"V_PV91":4,"V_PV92":9,"V_PV93":3,"V_PV94":0,"V_PV95":0,"V_PV96":0,"V_PV97":14,"V_PV971":"1845-01-01","V_PV972":0,"V_PV973":"1845-01-01","V_PV974":2,"V_PV98":"2019-01-31","V_PV99":null}]);
                    console.log($scope.Array);
                    $scope.errores = null;
                    swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                    $http({
                        method: 'POST',
                        url: "php/altocosto/vih/VIH.php",
                        data: {
                            function: 'InsertarDatos',
                            v_pjson: $scope.Array,
                            v_parea: ($scope.tipo == undefined) ? 'A' : $scope.tipo
                        }
                    }).then(function (response) {
                        if (response.data[0]) {
                            $scope.errores = response.data[0];
                            $scope.validacion = response.data[1].validacion;
                            if ($scope.validacion == 2 || $scope.validacion == 1) {
                                swal('Advertencia', 'Se encontraron errores en el formulario', 'error');
                                $scope.toolsbtn = true;
                                $scope.errorbtn = true;
                                $scope.limpiarbtn = false;
                                $scope.cargarbtn = false;
                                for (var i = 0; i < $scope.errores.length; i++) {
                                    $("#_ID" + $scope.errores[i].id + "_L").removeClass('normal'); $("#_ID" + $scope.errores[i].id + "_L").addClass('requerido');
                                }
                                $scope.Abrir_modal();
                            }
                            if ($scope.validacion == 3) {
                                swal('Completado', '¡Registros ya insertados satisfactoriamente!', 'success');
                                //swal('Completado', '¡Archivos subidos y campos registrados satisfactoriamente!', 'success');
                                $scope.limpiar();
                                $scope.infobasica = true;
                                $scope.campos = true;
                                $scope.toolsbtn = false;
                                $scope.limpiarbtn = false;
                                $scope.errorbtn = false;
                                $scope.cargarbtn = false;
                            }
                            if ($scope.validacion == 0) {
                                swal('Completado', '¡Registros guardados exitoxamente!', 'success');
                                //swal('Completado', '¡Archivos subidos y campos registrados satisfactoriamente!', 'success');
                                $scope.limpiar();
                                $scope.infobasica = true;
                                $scope.campos = true;
                                $scope.toolsbtn = false;
                                $scope.limpiarbtn = false;
                                $scope.errorbtn = false;
                                $scope.cargarbtn = false;
                            }
                        } else {
                            swal('Advertencia', '¡Ocurrio un error!', response.data, 'success');
                        }

                    });
                    //} else {
                    //    notification.getNotification('warning', 'Por favor adjunte los archivos a subir!', 'Mensaje:');
                    //}


                } else {
                    Materialize.toast('¡Por favor, Complete todos los campos!', 2000); $('.toast').addClass('default-background-dark');
                }

            }

            $scope.limpiar = function () {
                $scope.poblacionclave = "";
                $scope.Codigogrupoetnico = "";
                //variables tab I
                $scope._NGM15_S = "";
                $scope._CH16_S = false; $scope._NGM16_S = "";
                $scope._NGM17_S = "";
                $scope._NGM18_S = "";
                // $scope._CH19 = false; 
                $scope._CH19_S = false; $scope._CH19 = false; $scope._NGM19_F = ""; $scope._NGM19_S = ""; $("#_NGC19").removeClass('apagado');
                $scope._CH20_S = false; $scope._CH20 = false; $scope._NGM20_F = ""; $scope._NGM20_S = ""; $("#_NGC20").removeClass('apagado');
                $scope._CH21_S = false; $scope._CH21 = false; $scope._NGM21_F = ""; $scope._NGM21_S = ""; $("#_NGC21").removeClass('apagado');
                $scope._CH22_S = false; $scope._CH22 = false; $scope._NGM22_F = ""; $scope._NGM22_S = ""; $("#_NGC22").removeClass('apagado');
                $scope._CH23_S = false; $scope._CH23 = false; $scope._NGM23_F = ""; $scope._NGM23_S = ""; $("#_NGC23").removeClass('apagado');
                $scope._CH24_S = false; $scope._NGM24_S = "";
                $scope._CH241_S = false; $scope._CH241 = false; $scope._NGM241_N = 2; $scope._NGM241_S = "";
                $scope._CH242_S = false; $scope._NGM242_S = "";
                $scope._CH243_S = false; $scope._CH243 = false; $scope._NGM243_N = 2; $scope._NGM243_S = "";
                $scope._CH244_S = false; $scope._NGM244_S = "";
                $scope._CH245_S = false; $scope._NGM245_S = "";
                $scope._CH246_S = false; $scope._CH246 = false; $scope._NGM246_F = ""; $scope._NGM246_S = ""; $("#_NGC246").removeClass('apagado');
                $scope._CH247_S = false; $scope._NGM247_S = "";
                $scope._CH248_S = false; $scope._NGM248_S = "";
                $scope._CH249_S = false; $scope._CH249 = false; $scope._NGM249_N = 0; $scope._NGM249_S = "";
                // Información de menores de 12 meses hijos o hijas de madres que viven con VIH
                $scope._CH25_S = false; $scope._NGM25_S = "";
                $scope._CH251_S = false; $scope._CH251 = false; $scope._NGM251_N = 0; $scope._NGM251_S = "";
                $scope._CH252_S = false; $scope._NGM252_S = "";
                $scope._CH26_S = false; $scope._NGM26_S = "";
                $scope._CH27_S = false; $scope._NGM27_S = "";
                $scope._CH28_S = false; $scope._CH28 = false; $scope._NGM28_F = ""; $scope._NGM28_S = ""; $("#_NGC28").removeClass('apagado');
                $scope._CH281_S = false; $scope._CH281 = false; $scope._NGM281_N = 0; $scope._NGM281_S = "";
                $scope._CH29_S = false; $scope._CH29 = false; $scope._NGM29_F = ""; $scope._NGM29_S = ""; $("#_NGC29").removeClass('apagado');
                $scope._CH291_S = false; $scope._CH291 = false; $scope._NGM291_N = 0; $scope._NGM291_S = "";
                $scope._CH30_S = false; $scope._CH30 = false; $scope._NGM30_F = ""; $scope._NGM30_S = ""; $("#_NGC30").removeClass('apagado');
                $scope._CH301_S = false; $scope._CH301 = false; $scope._NGM301_N = 0; $scope._NGM301_S = "";
                $scope._CH31_S = false; $scope._NGM31_S = "";
                //HOJA 2
                //Información de personas con tuberculosis activa
                $scope._CH32_S = false; $scope._CH32 = false; $scope._NGM32_F = ""; $scope._NGM32_S = ""; $("#_NGC32").removeClass('apagado');
                $scope._CH33_S = false; $scope._CH33 = false; $scope._NGM33_F = ""; $scope._NGM33_S = ""; $("#_NGC33").removeClass('apagado');
                //Información de personas que viven con VIH
                $scope._CH34_S = false; $scope._CH34 = false; $scope._NGM34_F = ""; $scope._NGM34_S = ""; $("#_NGC34").removeClass('apagado');
                $scope._CH35_S = false; $scope._NGM35_S = "";
                $scope._CH36_S = false; $scope._CH36 = false; $scope._NGM36_F = ""; $scope._NGM36_S = ""; $("#_NGC36").removeClass('apagado');
                $scope._CH361_S = false; $scope._NGM361_S = "";
                $scope._CH362_S = false; $scope._CH362 = false; $scope._NGM362_N = 0; $scope._NGM362_S = "";
                $scope._CH37_S = false; $scope._CH37 = false; $scope._NGM37_F = ""; $scope._NGM37_S = ""; $("#_NGC37").removeClass('apagado');
                $scope._CH38_S = false; $scope._NGM38_S = "";
                $scope._CH39_S = false; $scope._NGM39_S = "";
                $scope._CH40_S = false; $scope._NGM40_S = "";
                $scope._CH401_S = false; $scope._CH401 = false; $scope._NGM401_N = 0; $scope._NGM401_S = "";
                $scope._CH41_S = false; $scope._NGM41_S = "";
                $scope._CH411_S = false; $scope._CH411 = false; $scope._NGM411_N = 0; $scope._NGM411_S = "";
                //HOJA 3
                //Terapia Antirretroviral (TAR) Inicial
                $scope._CH42_S = false; $scope._CH42 = false; $scope._NGM42_F = ""; $scope._NGM42_S = ""; $("#_NGC42").removeClass('apagado');
                $scope._CH421_S = false; $scope._CH421 = false; $scope._NGM421_N = 0; $scope._NGM421_S = "";
                $scope._CH422_S = false; $scope._CH422 = false; $scope._NGM422_N = 0; $scope._NGM422_S = "";
                $scope._CH423_S = false; $scope._CH423 = false; $scope._NGM423_N = 0; $scope._NGM423_S = "";
                $scope._CH424_S = false; $scope._CH424 = false; $scope._NGM424_N = 0; $scope._NGM424_S = "";
                $scope._CH425_S = false; $scope._CH425 = false; $scope._NGM425_N = 0; $scope._NGM425_S = "";
                $scope._CH43_S = false; $scope._NGM43_S = "";
                $scope._CH431_S = false; $scope._CH431 = false; $scope._NGM431_N = 0; $scope._NGM431_S = "";
                $scope._CH44_S = false; $scope._NGM44_S = "";
                $scope._CH441_S = false; $scope._CH441 = false; $scope._NGM441_N = 0; $scope._NGM441_S = "";
                $scope._CH45_S = false; $scope._NGM45_S = "";
                $scope._CH46_S = false; $scope._NGM46_S = "";
                $scope._CH47_S = false; $scope._NGM47_S = "";
                $scope._CH48_S = false; $scope._NGM48_S = "";
                $scope._CH49_S = false; $scope._CH49 = false; $scope._NGM49_N = 0; $scope._NGM49_S = "";
                $scope._CH50_S = false; $scope._CH50 = false; $scope._NGM50_N = 0; $scope._NGM50_S = "";
                $scope._CH51_S = false; $scope._NGM51_S = "";
                $scope._CH511_S = false; $scope._CH511 = false; $scope._NGM511_F = ""; $scope._NGM511_S = ""; $("#_NGC511").removeClass('apagado');
                $scope._CH512_S = false; $scope._NGM512_S = "";
                $scope._CH513_S = false; $scope._CH513 = false; $scope._NGM513_T = ""; $scope._NGM513_S = "";
                $scope._CH514_S = false; $scope._CH514 = false; $scope._NGM514_T = ""; $scope._NGM514_S = "";
                $scope._CH515_S = false; $scope._CH515 = false; $scope._NGM515_T = ""; $scope._NGM515_S = "";
                $scope._CH516_S = false; $scope._CH516 = false; $scope._NGM516_T = ""; $scope._NGM516_S = "";
                $scope._CH517_S = false; $scope._NGM517_S = "";
                $scope._CH518_S = false; $scope._CH518 = false; $scope._NGM518_N = 0; $scope._NGM518_S = "";
                //HOJA 4            
                //Patologías definitorias de SIDA (diagnosticadas durante o después del diagnóstico de VIH)
                $scope._CH521_S = false; $scope._NGM521_S = "";
                $scope._CH522_S = false; $scope._NGM522_S = "";
                $scope._CH523_S = false; $scope._NGM523_S = "";
                $scope._CH524_S = false; $scope._NGM524_S = "";
                $scope._CH525_S = false; $scope._NGM525_S = "";
                $scope._CH526_S = false; $scope._NGM526_S = "";
                $scope._CH527_S = false; $scope._NGM527_S = "";
                $scope._CH528_S = false; $scope._NGM528_S = "";
                $scope._CH529_S = false; $scope._NGM529_S = "";
                $scope._CH5210_S = false; $scope._NGM5210_S = "";
                $scope._CH5211_S = false; $scope._NGM5211_S = "";
                $scope._CH5212_S = false; $scope._NGM5212_S = "";
                $scope._CH5213_S = false; $scope._NGM5213_S = "";
                $scope._CH5214_S = false; $scope._NGM5214_S = "";
                $scope._CH5215_S = false; $scope._NGM5215_S = "";
                $scope._CH5216_S = false; $scope._NGM5216_S = "";
                $scope._CH5217_S = false; $scope._NGM5217_S = "";
                $scope._CH5218_S = false; $scope._NGM5218_S = "";
                $scope._CH5219_S = false; $scope._NGM5219_S = "";
                $scope._CH5220_S = false; $scope._NGM5220_S = "";
                $scope._CH5221_S = false; $scope._NGM5221_S = "";
                $scope._CH5222_S = false; $scope._NGM5222_S = "";
                //HOJA 5
                //Condición actual de la persona que vive con VIH
                $scope._CH53_S = false; $scope._NGM53_N = 0;
                $scope._CH531_S = false; $scope._CH531 = false; $scope._NGM531_F = ""; $scope._NGM531_S = ""; $("#_NGC531").removeClass('apagado');
                $scope._CH532_S = false; $scope._NGM532_N = 0;
                $scope._CH533_S = false; $scope._NGM533_S = "";
                $scope._CH534_S = false; $scope._NGM534_S = "";
                $scope._CH54_S = false; $scope._CH54 = false; $scope._NGM54_F = ""; $scope._NGM54_S = ""; $("#_NGC54").removeClass('apagado');
                $scope._CH55_S = false; $scope._NGM55_S = "";
                $scope._CH56_S = false; $scope._CH56 = false; $scope._NGM56_F = ""; $scope._NGM56_S = ""; $("#_NGC56").removeClass('apagado');
                $scope._CH561_S = false; $scope._CH561 = false; $scope._NGM561_N = 0; $scope._NGM561_S = "";
                $scope._CH57_S = false; $scope._CH57 = false; $scope._NGM57_F = ""; $scope._NGM57_S = ""; $("#_NGC57").removeClass('apagado');
                $scope._CH571_S = false; $scope._CH571 = false; $scope._NGM571_N = 0; $scope._NGM571_S = "";
                $scope._CH58_S = false; $scope._CH58 = false; $scope._NGM58_F = ""; $scope._NGM58_S = ""; $("#_NGC58").removeClass('apagado');
                $scope._CH581_S = false; $scope._CH581 = false; $scope._NGM581_N = 0; $scope._NGM581_S = "";
                $scope._CH59_S = false; $scope._CH59 = false; $scope._NGM59_F = ""; $scope._NGM59_S = ""; $("#_NGC59").removeClass('apagado');
                $scope._CH591_S = false; $scope._CH591 = false; $scope._NGM591_N = 0; $scope._NGM591_S = "";
                $scope._CH60_S = false; $scope._CH60 = false; $scope._NGM60_F = ""; $scope._NGM60_S = ""; $("#_NGC60").removeClass('apagado');
                $scope._CH601_S = false; $scope._CH601 = false; $scope._NGM601_N = 0; $scope._NGM601_S = "";
                $scope._CH61_S = false; $scope._CH61 = false; $scope._NGM61_F = ""; $scope._NGM61_S = ""; $("#_NGC61").removeClass('apagado');
                $scope._CH611_S = false; $scope._CH611 = false; $scope._NGM611_N = 0; $scope._NGM611_S = "";
                $scope._CH62_S = false; $scope._CH62 = false; $scope._NGM62_F = ""; $scope._NGM62_S = ""; $("#_NGC62").removeClass('apagado');
                $scope._CH621_S = false; $scope._CH621 = false; $scope._NGM621_N = 0; $scope._NGM621_S = "";
                $scope._CH63_S = false; $scope._CH63 = false; $scope._NGM63_N = 0; $scope._NGM63_S = "";
                $scope._CH64_S = false; $scope._NGM64_S = "";
                $scope._CH65_S = false; $scope._NGM65_S = "";
                $scope._CH66_S = false; $scope._NGM66_S = "";
                $scope._CH67_S = false; $scope._NGM67_S = "";
                $scope._CH68_S = false; $scope._NGM68_S = "";
                $scope._CH681_S = false; $scope._NGM681_S = "";
                $scope._CH682_S = false; $scope._NGM682_S = "";

                $scope._CH683_S = false; $scope._CH683 = false; $scope._NGM683_F = ""; $scope._NGM683_S = ""; $("#_NGC683").removeClass('apagado');
                $scope._CH684_S = false; $scope._CH684 = false; $scope._NGM684_N = 0; $scope._NGM684_S = "";
                $scope._CH685_S = false; $scope._CH685 = false; $scope._NGM685_N = 0; $scope._NGM685_S = "";
                $scope._CH686_S = false; $scope._CH686 = false; $scope._NGM686_N = 0; $scope._NGM686_S = "";
                $scope._CH687_S = false; $scope._CH687 = false; $scope._NGM687_N = 0; $scope._NGM687_S = "";
                $scope._CH688_S = false; $scope._CH688 = false; $scope._NGM688_N = 0; $scope._NGM688_S = "";
                $scope._CH689_S = false; $scope._CH689 = false; $scope._NGM689_N = 0; $scope._NGM689_S = "";
                $scope._CH6810_S = false; $scope._CH6810 = false; $scope._NGM6810_N = 0; $scope._NGM6810_S = "";
                $scope._CH6811_S = false; $scope._CH6811 = false; $scope._NGM6811_N = 0; $scope._NGM6811_S = "";
                $scope._CH6812_S = false; $scope._CH6812 = false; $scope._NGM6812_N = 0; $scope._NGM6812_S = "";
                $scope._CH6813_S = false; $scope._CH6813 = false; $scope._NGM6813_F = ""; $scope._NGM6813_S = ""; $("#_NGC6813").removeClass('apagado');
                $scope._CH6814_S = false; $scope._NGM6814_S = "";
                $scope._CH69_S = false; $scope._NGM69_S = "";
                $scope._CH70_S = false; $scope._NGM70_S = "";
                $scope._CH71_S = false; $scope._NGM71_S = "";
                $scope._CH72_S = false; $scope._NGM72_S = "";
                $scope._CH73_S = false; $scope._NGM73_S = "";
                $scope._CH74_S = false; $scope._NGM74_S = "";
                $scope._CH75_S = false; $scope._CH75 = false; $scope._NGM75_F = ""; $scope._NGM75_S = ""; $("#_NGC75").removeClass('apagado');
                $scope._CH751_S = false; $scope._CH751 = false; $scope._NGM751_N = 0; $scope._NGM751_S = "";
                $scope._CH76_S = false; $scope._CH76 = false; $scope._NGM76_F = ""; $scope._NGM76_S = ""; $("#_NGC76").removeClass('apagado');
                $scope._CH761_S = false; $scope._CH761 = false; $scope._NGM761_N = 0; $scope._NGM761_S = "";
                // HOJA 6
                // Terapia Antirretroviral (TAR) Actual
                $scope._CH77_S = false; $scope._NGM77_S = "";
                $scope._CH771_S = false; $scope._CH771 = false; $scope._NGM771_F = ""; $scope._NGM771_S = ""; $("#_NGC771").removeClass('apagado');
                $scope._CH772_S = false; $scope._CH772 = false; $scope._NGM772_N = 0; $scope._NGM772_S = "";
                $scope._CH773_S = false; $scope._CH773 = false; $scope._NGM773_N = 0; $scope._NGM773_S = "";
                $scope._CH774_S = false; $scope._CH774 = false; $scope._NGM774_N = 0; $scope._NGM774_S = "";
                $scope._CH775_S = false; $scope._CH775 = false; $scope._NGM775_N = 0; $scope._NGM775_S = "";
                $scope._CH776_S = false; $scope._CH776 = false; $scope._NGM776_N = 0; $scope._NGM776_S = "";
                $scope._CH777_S = false; $scope._CH777 = false; $scope._NGM777_N = 0; $scope._NGM777_S = "";
                //Intervenciones de prevención en la persona que vive con VIH
                $scope._CH778_S = false; $scope._CH778 = false; $scope._NGM778_N = 0; $scope._NGM778_S = "";
                $scope._CH78_S = false; $scope._CH78 = false; $scope._NGM78_N = 0; $scope._NGM78_S = "";
                $scope._CH79_S = false; $scope._NGM79_S = "";
                $scope._CH80_S = false; $scope._NGM80_S = "";
                $scope._CH81_S = false; $scope._NGM81_S = "";
                $scope._CH82_S = false; $scope._NGM82_S = "";
                $scope._CH83_S = false; $scope._NGM83_S = "";
                $scope._CH84_S = false; $scope._NGM84_S = "";
                $scope._CH85_S = false; $scope._NGM85_S = "";
                $scope._CH86_S = false; $scope._NGM86_S = "";
                $scope._CH861_S = false; $scope._NGM861_S = "";
                $scope._CH87_S = false; $scope._NGM87_S = "";
                $scope._CH88_S = false; $scope._NGM88_S = "";
                $scope._CH89_S = false; $scope._NGM89_S = "";
                $scope._CH90_S = false; $scope._CH90 = false; $scope._NGM90_T = ""; $scope._NGM90_S = "";
                // HOJA 7
                // Profilaxis
                $scope._CH91_S = false; $scope._NGM91_S = "";
                $scope._CH92_S = false; $scope._NGM92_S = "";
                $scope._CH93_S = false; $scope._NGM93_S = "";
                // Situación administrativa a la fecha de corte
                $scope._CH94_S = false; $scope._NGM94_N = 0;
                $scope._CH95_S = false; $scope._NGM95_N = 0;
                $scope._CH96_S = false; $scope._NGM96_N = 0;
                $scope._NGM97_S = "";
                $scope._CH971 = false; $scope._NGM971_F = ""; $scope._NGM971_S = ""; $("#_NGC971").removeClass('apagado');
                $scope._CH972_S = false; $scope._CH972 = false; $scope._NGM972_N = 0; $scope._NGM972_S = "";
                $scope._CH973 = false; $scope._NGM973_F = ""; $scope._NGM973_S = ""; $("#_NGC973").removeClass('apagado');
                $scope._NGM974_S = "";
                $scope._NGM98_F = "";
                $scope._NGM99_T = "";
                if ($scope.tipo == "S") {
                    $scope.Tipo_S_A();
                }
                ///////////////////////////////////
                for (var i = 0; i < $scope.ids.length; i++) {
                    $("#_ID" + $scope.ids[i] + "_L").removeClass('requerido');
                }
                ////////////////////////////
                $scope.limpiarmodaladjuntos(1);
                $scope.limpiarmodaladjuntos(2);
            }

            $scope.Find_afil_enter = function (keyEvent) {
                if (keyEvent.which === 13)
                    $scope.BuscarAfiliado();
            }
            $scope.BuscarAfiliado = function () {
                $scope.setTab(1);
                $scope.respuesta = 0;
                // $("#_IGC" + NID + "_L").removeClass('requerido');                
                $scope.limpiar();
                $scope.toolsbtn = false;
                $scope.limpiarbtn = false;
                $scope.errorbtn = false;
                $scope.cargarbtn = false;
                swal({ title: 'Cargando...', allowOutsideClick: false });
                    swal.showLoading();
                $timeout(function () {
                    $http({
                        method: 'POST',
                        url: "php/altocosto/vih/VIH.php",
                        data: {
                            function: 'BuscarAfiliado',
                            tipodoc: $scope.tipodoc,
                            cedula: $scope.identificacion
                        }
                    }).then(function (response) {
                        $scope.DatosBasicos = response.data;
                        if ($scope.DatosBasicos == 0) {
                            $scope.campos = true; $scope.infobasica = true; $scope.limpiarbtn = false;
                            Materialize.toast('¡Información del afiliado no encontrada!', 2000); $('.toast').addClass('default-background-dark');                            
                                swal.close();                            
                        } else {
                            $scope.Codigogrupoetnico = $scope.DatosBasicos.Codigogrupoetnico;
                            $scope.SexoCodigo = $scope.DatosBasicos.SexoCodigo;

                            $http({
                                method: 'POST',
                                url: "php/altocosto/vih/VIH.php",
                                data: {
                                    function: 'ObtenerVariables',
                                    tipodoc: $scope.tipodoc,
                                    cedula: $scope.identificacion,
                                    empresa: '1'
                                }
                            }).then(function (response) {
                                var Variables = response.data;
                                $scope.campos = false; $scope.infobasica = false;
                                if (Variables == 0) {
                                    $scope.Tipo_S_A();
                                    // $scope.campos = true; $scope.infobasica = true;
                                    $scope.toolsbtn = false;
                                    //$scope.limpiarbtn = true;
                                    $scope.cargarbtn = false;
                                    if ($scope.tipo != 'S') {
                                        //$scope.toolsbtn = true;
                                        //$scope.limpiarbtn = true;
                                    } else {
                                        $scope.limpiarbtn = false;
                                    }


                                    Materialize.toast('¡Afiliado nuevo a ingresar en CAC VIH!', 4000); $('.toast').addClass('default-background-dark');
                                    if ($scope.DatosBasicos.SexoCodigo == 'F') {
                                        $scope.SexoCodigo = 'M';
                                    }
                                    if ($scope.DatosBasicos.SexoCodigo == 'M') {
                                        $scope.SexoCodigo = 'H';
                                    }
                                        swal.close();

                                } else {
                                    swal.close();
                                    $scope.Var = response.data;
                                    if ($scope.Var == 0) {
                                        $scope.V99 = 0;
                                    } else {
                                        $scope.V99 = $scope.Var.V99;
                                    }
                                    $scope.toolsbtn = true;
                                    $scope.cargarbtn = true;
                                    $scope.limpiarbtn = false;

                                    if (Variables.V12 == '' && $scope.DatosBasicos.SexoCodigo == 'F') {
                                        $scope.SexoCodigo = 'M';
                                    }
                                    if (Variables.V12 == '' && $scope.DatosBasicos.SexoCodigo == 'M') {
                                        $scope.SexoCodigo = 'H';
                                    }
                                    if (Variables.V12 != '') {
                                        $scope.SexoCodigo = Variables.V10;
                                    }
                                    //TAB 1
                                    $scope.Codigogrupoetnico = Variables.V11 == '' ? '' : Variables.V11;
                                    $scope.poblacionclave = Variables.V12 == '' ? '' : Variables.V12;
                                    setTimeout(() => {
                                        $scope.Cargar();
                                    }, 300);

                                    setTimeout(() => {
                                        $scope.Tipo_S_A();
                                    }, 1000);

                                    $scope.campos = false; $scope.infobasica = false;

                                }
                            });
                        }
                    });
                }, 3000);//END TIMEOUT




            }
            $scope.Cargar = function () {
                $scope.Codigogrupoetnico = $scope.Var.V11 == '' ? '' : $scope.Var.V11;
                $scope.poblacionclave = $scope.Var.V12 == '' ? '' : $scope.Var.V12;
                $scope._NGM15_S = $scope.Var.V15 == 0 ? '' : $scope.Var.V15;
                $scope._NGM16_S = $scope.Var.V16 == '' ? '' : $scope.Var.V16;
                $scope._NGM17_S = $scope.Var.V17 == 0 ? '' : $scope.Var.V17;
                $scope._NGM18_S = $scope.Var.V18 == 0 ? '' : $scope.Var.V18;
                //Información de mujeres gestantes
                if ($scope.Var.V19 == '1845-01-01' || $scope.Var.V19 == '1846-01-01') {
                    $scope._NGM19_S = $scope.Var.V19; $scope._CH19 = true;
                } else { $scope._NGM19_F = $scope.Var.V19 == '' ? '' : $scope.Var.V19; }

                if ($scope.Var.V20 == '1799-01-01' || $scope.Var.V20 == '1822-02-01' || $scope.Var.V20 == '1833-03-03' || $scope.Var.V20 == '1845-01-01' || $scope.Var.V20 == '1846-01-01') {
                    $scope._NGM20_S = $scope.Var.V20; $scope._CH20 = true;
                } else { $scope._NGM20_F = $scope.Var.V20 == '' ? '' : $scope.Var.V20; }

                if ($scope.Var.V21 == '1799-01-01' || $scope.Var.V21 == '1800-01-01' || $scope.Var.V21 == '1811-01-01' || $scope.Var.V21 == '1822-02-01' || $scope.Var.V21 == '1833-03-03' || $scope.Var.V21 == '1845-01-01' || $scope.Var.V21 == '1846-01-01') {
                    $scope._NGM21_S = $scope.Var.V21; $scope._CH21 = true;
                } else { $scope._NGM21_F = $scope.Var.V21 == '' ? '' : $scope.Var.V21; }

                if ($scope.Var.V22 == '1799-01-01' || $scope.Var.V22 == '1800-01-01' || $scope.Var.V22 == '1811-01-01' || $scope.Var.V22 == '1822-02-01' || $scope.Var.V22 == '1833-03-03' || $scope.Var.V22 == '1845-01-01' || $scope.Var.V22 == '1846-01-01') {
                    $scope._NGM22_S = $scope.Var.V22; $scope._CH22 = true;
                } else { $scope._NGM22_F = $scope.Var.V22 == '' ? '' : $scope.Var.V22; }

                if ($scope.Var.V23 == '1799-01-01' || $scope.Var.V23 == '1800-01-01' || $scope.Var.V23 == '1811-01-01' || $scope.Var.V23 == '1822-02-01' || $scope.Var.V23 == '1833-03-03' || $scope.Var.V23 == '1845-01-01' || $scope.Var.V23 == '1846-01-01') {
                    $scope._NGM23_S = $scope.Var.V23; $scope._CH23 = true;
                } else { $scope._NGM23_F = $scope.Var.V23 == '' ? '' : $scope.Var.V23; }

                $scope._NGM24_S = $scope.Var.V24 == '' ? '' : $scope.Var.V24;

                if ($scope.Var.V241 == '1' || $scope.Var.V241 == '99' || $scope.Var.V241 == '55') {
                    $scope._NGM241_S = $scope.Var.V241; $scope._CH241 = true;
                } else { $scope._NGM241_N = $scope.Var.V241 == '' ? 2 : parseInt($scope.Var.V241); }

                $scope._NGM242_S = $scope.Var.V242 == '' ? '' : $scope.Var.V242;

                if ($scope.Var.V243 == '1' || $scope.Var.V243 == '97' || $scope.Var.V243 == '98' || $scope.Var.V243 == '99' || $scope.Var.V243 == '55') {
                    $scope._NGM243_S = $scope.Var.V243; $scope._CH243 = true;
                } else { $scope._NGM243_N = $scope.Var.V243 == '' ? 2 : parseInt($scope.Var.V243); }

                $scope._NGM244_S = $scope.Var.V244 == '' ? '' : $scope.Var.V244;
                $scope._NGM245_S = $scope.Var.V245 == '' ? '' : $scope.Var.V245;

                if ($scope.Var.V246 == '1811-01-01' || $scope.Var.V246 == '1800-01-01' || $scope.Var.V246 == '1845-01-01' || $scope.Var.V246 == '1846-01-01') {
                    $scope._NGM246_S = $scope.Var.V246; $scope._CH246 = true;
                } else { $scope._NGM246_F = $scope.Var.V246 == '' ? '' : $scope.Var.V246; }

                $scope._NGM247_S = $scope.Var.V247 == '' ? '' : $scope.Var.V247;
                $scope._NGM248_S = $scope.Var.V248 == '' ? '' : $scope.Var.V248;

                if ($scope.Var.V249 == '9' || $scope.Var.V249 == '55') {
                    $scope._NGM249_S = $scope.Var.V249; $scope._CH249 = true;
                } else { $scope._NGM249_N = $scope.Var.V249 == '' ? 0 : $scope.Var.V249; }


                // Información de menores de 12 meses hijos o hijas de madres que viven con VIH
                $scope._NGM25_S = $scope.Var.V25 == '' ? '' : $scope.Var.V25;

                if ($scope.Var.V251 == '9' || $scope.Var.V251 == '55') {
                    $scope._NGM251_S = $scope.Var.V251; $scope._CH251 = true;
                } else { $scope._NGM251_N = $scope.Var.V251 == '' ? 0 : $scope.Var.V251; }

                $scope._NGM252_S = $scope.Var.V252 == '' ? '' : $scope.Var.V252;
                $scope._NGM26_S = $scope.Var.V26 == '' ? '' : $scope.Var.V26;
                $scope._NGM27_S = $scope.Var.V27 == '' ? '' : $scope.Var.V27;

                if ($scope.Var.V28 == '1800-01-01' || $scope.Var.V28 == '1845-01-01' || $scope.Var.V28 == '1846-01-01') {
                    $scope._NGM28_S = $scope.Var.V28; $scope._CH28 = true;
                } else { $scope._NGM28_F = $scope.Var.V28 == '' ? '' : $scope.Var.V28; }

                if ($scope.Var.V281 == '0' || $scope.Var.V281 == '99999999' || $scope.Var.V281 == '55555555') {
                    $scope._NGM281_S = $scope.Var.V281; $scope._CH281 = true;
                } else { $scope._NGM281_N = $scope.Var.V281 == '' ? 0 : parseInt($scope.Var.V281); }

                if ($scope.Var.V29 == '1800-01-01' || $scope.Var.V29 == '1845-01-01' || $scope.Var.V29 == '1846-01-01') {
                    $scope._NGM29_S = $scope.Var.V29; $scope._CH29 = true;
                } else { $scope._NGM29_F = $scope.Var.V29 == '' ? '' : $scope.Var.V29; }

                if ($scope.Var.V291 == '0' || $scope.Var.V291 == '99999999' || $scope.Var.V291 == '55555555') {
                    $scope._NGM291_S = $scope.Var.V291; $scope._CH291 = true;
                } else { $scope._NGM291_N = $scope.Var.V291 == '' ? 0 : parseInt($scope.Var.V291); }

                if ($scope.Var.V30 == '1800-01-01' || $scope.Var.V30 == '1833-01-01' || $scope.Var.V30 == '1845-01-01' || $scope.Var.V30 == '1846-01-01') {
                    $scope._NGM30_S = $scope.Var.V30; $scope._CH30 = true;
                } else { $scope._NGM30_F = $scope.Var.V30 == '' ? '' : $scope.Var.V30; }

                if ($scope.Var.V301 == '0' || $scope.Var.V301 == '99999999' || $scope.Var.V301 == '55555555') {
                    $scope._NGM301_S = $scope.Var.V301; $scope._CH301 = true;
                } else { $scope._NGM301_N = $scope.Var.V301 == '' ? 0 : parseInt($scope.Var.V301); }

                $scope._NGM31_S = $scope.Var.V31 == '' ? '' : $scope.Var.V31;
                //HOJA 2
                //Información de personas con tuberculosis activa
                if ($scope.Var.V32 == '1845-01-01' || $scope.Var.V32 == '1846-01-01') {
                    $scope._NGM32_S = $scope.Var.V32; $scope._CH32 = true;
                } else { $scope._NGM32_F = $scope.Var.V32 == '' ? '' : $scope.Var.V32; }

                if ($scope.Var.V33 == '1799-01-01' || $scope.Var.V33 == '1822-02-01' || $scope.Var.V33 == '1833-03-03' || $scope.Var.V33 == '1845-01-01' || $scope.Var.V33 == '1846-01-01') {
                    $scope._NGM33_S = $scope.Var.V33; $scope._CH33 = true;
                } else { $scope._NGM33_F = $scope.Var.V33 == '' ? '' : $scope.Var.V33; }

                //Información de personas que viven con VIH
                if ($scope.Var.V34 == '1799-01-01' || $scope.Var.V34 == '1811-01-01' || $scope.Var.V34 == '1822-01-01' || $scope.Var.V34 == '1845-01-01' || $scope.Var.V34 == '1846-01-01') {
                    $scope._NGM34_S = $scope.Var.V34; $scope._CH34 = true;
                } else { $scope._NGM34_F = $scope.Var.V34 == '' ? '' : $scope.Var.V34; }

                $scope._NGM35_S = $scope.Var.V35 == '' ? '' : $scope.Var.V35;

                if ($scope.Var.V36 == '1845-01-01' || $scope.Var.V36 == '1846-01-01') {
                    $scope._NGM36_S = $scope.Var.V36; $scope._CH36 = true;
                } else { $scope._NGM36_F = $scope.Var.V36 == '' ? '' : $scope.Var.V36; }

                $scope._NGM361_S = $scope.Var.V361 == '' ? '' : $scope.Var.V361;

                if ($scope.Var.V362 == '00' || $scope.Var.V362 == '8' || $scope.Var.V362 == '9' || $scope.Var.V362 == '55') {
                    $scope._NGM362_S = $scope.Var.V362; $scope._CH362 = true;
                } else { $scope._NGM362_N = $scope.Var.V362 == '' ? 0 : $scope.Var.V362; }

                if ($scope.Var.V37 == '1800-01-01' || $scope.Var.V37 == '1845-01-01' || $scope.Var.V37 == '1846-01-01') {
                    $scope._NGM37_S = $scope.Var.V37; $scope._CH37 = true;
                } else { $scope._NGM37_F = $scope.Var.V37 == '' ? '' : $scope.Var.V37; }

                $scope._NGM38_S = $scope.Var.V38 == '' ? '' : $scope.Var.V38;
                $scope._NGM39_S = $scope.Var.V39 == '' ? '' : $scope.Var.V39;
                $scope._NGM40_S = $scope.Var.V40 == '' ? '' : $scope.Var.V40;

                if ($scope.Var.V401 == '9999' || $scope.Var.V401 == '9998' || $scope.Var.V401 == '9997' || $scope.Var.V401 == '5555') {
                    $scope._NGM401_S = $scope.Var.V401; $scope._CH401 = true;
                } else { $scope._NGM401_N = $scope.Var.V401 == '' ? 0 : parseInt($scope.Var.V401); }

                $scope._NGM41_S = $scope.Var.V41 == '' ? '' : $scope.Var.V41;

                if ($scope.Var.V411 == '99999999' || $scope.Var.V411 == '99999998' || $scope.Var.V411 == '99999997' || $scope.Var.V411 == '55555555') {
                    $scope._NGM411_S = $scope.Var.V411; $scope._CH411 = true;
                } else { $scope._NGM411_N = $scope.Var.V411 == '' ? 0 : parseInt($scope.Var.V411); }

                if ($scope.Var.V42 == '1788-01-01' || $scope.Var.V42 == '1799-01-01' || $scope.Var.V42 == '1845-01-01' || $scope.Var.V42 == '1846-01-01') {
                    $scope._NGM42_S = $scope.Var.V42; $scope._CH42 = true;
                } else { $scope._NGM42_F = $scope.Var.V42 == '' ? '' : $scope.Var.V42; }

                //HOJA 3
                //Terapia Antirretroviral (TAR) Inicial
                if ($scope.Var.V421 == '1' || $scope.Var.V421 == '9' || $scope.Var.V421 == '55555') {
                    $scope._NGM421_S = $scope.Var.V421; $scope._CH421 = true;
                } else { $scope._NGM421_N = $scope.Var.V421 == '' ? 0 : parseInt($scope.Var.V421); }

                if ($scope.Var.V422 == '1' || $scope.Var.V422 == '0' || $scope.Var.V422 == '9' || $scope.Var.V422 == '55555') {
                    $scope._NGM422_S = $scope.Var.V422; $scope._CH422 = true;
                } else { $scope._NGM422_N = $scope.Var.V422 == '' ? 0 : parseInt($scope.Var.V422); }

                if ($scope.Var.V423 == '1' || $scope.Var.V423 == '0' || $scope.Var.V423 == '9' || $scope.Var.V423 == '55555') {
                    $scope._NGM423_S = $scope.Var.V423; $scope._CH423 = true;
                } else { $scope._NGM423_N = $scope.Var.V423 == '' ? 0 : parseInt($scope.Var.V423); }

                if ($scope.Var.V424 == '1' || $scope.Var.V424 == '0' || $scope.Var.V424 == '9' || $scope.Var.V424 == '55555') {
                    $scope._NGM424_S = $scope.Var.V424; $scope._CH424 = true;
                } else { $scope._NGM424_N = $scope.Var.V424 == '' ? 0 : parseInt($scope.Var.V424); }

                if ($scope.Var.V425 == '1' || $scope.Var.V425 == '0' || $scope.Var.V425 == '9' || $scope.Var.V425 == '55555') {
                    $scope._NGM425_S = $scope.Var.V425; $scope._CH425 = true;
                } else { $scope._NGM425_N = $scope.Var.V425 == '' ? 0 : parseInt($scope.Var.V425); }

                $scope._NGM43_S = $scope.Var.V43 == '' ? '' : $scope.Var.V43;

                if ($scope.Var.V431 == '9999' || $scope.Var.V431 == '9998' || $scope.Var.V431 == '9997' || $scope.Var.V431 == '9996' || $scope.Var.V431 == '5555') {
                    $scope._NGM431_S = $scope.Var.V431; $scope._CH431 = true;
                } else { $scope._NGM431_N = $scope.Var.V431 == '' ? 0 : parseInt($scope.Var.V431); }

                $scope._NGM44_S = $scope.Var.V44 == '' ? '' : $scope.Var.V44;

                if ($scope.Var.V441 == '99999999' || $scope.Var.V441 == '99999998' || $scope.Var.V441 == '99999997' || $scope.Var.V441 == '99999996' || $scope.Var.V441 == '55555555') {
                    $scope._NGM441_S = $scope.Var.V441; $scope._CH441 = true;
                } else { $scope._NGM441_N = $scope.Var.V441 == '' ? 0 : parseInt($scope.Var.V441); }

                $scope._NGM45_S = $scope.Var.V45 == '' ? '' : $scope.Var.V45;
                $scope._NGM46_S = $scope.Var.V46 == '' ? '' : $scope.Var.V46;
                $scope._NGM47_S = $scope.Var.V47 == '' ? '' : $scope.Var.V47;
                $scope._NGM48_S = $scope.Var.V48 == '' ? '' : $scope.Var.V48;

                if ($scope.Var.V49 == '99' || $scope.Var.V49 == '98' || $scope.Var.V49 == '97' || $scope.Var.V49 == '0' || $scope.Var.V49 == '55') {
                    $scope._NGM49_S = $scope.Var.V49; $scope._CH49 = true;
                } else { $scope._NGM49_N = $scope.Var.V49 == '' ? 0 : parseInt($scope.Var.V49); }

                if ($scope.Var.V50 == '99' || $scope.Var.V50 == '98' || $scope.Var.V50 == '97' || $scope.Var.V50 == '96' || $scope.Var.V50 == '0' || $scope.Var.V50 == '55') {
                    $scope._NGM50_S = $scope.Var.V50; $scope._CH50 = true;
                } else { $scope._NGM50_N = $scope.Var.V50 == '' ? 0 : parseInt($scope.Var.V50); }

                $scope._NGM51_S = $scope.Var.V51 == '' ? '' : $scope.Var.V51;

                if ($scope.Var.V511 == '1845-01-01' || $scope.Var.V511 == '1800-01-01' || $scope.Var.V511 == '1777-01-01' || $scope.Var.V511 == '1788-01-01' || $scope.Var.V511 == '1846-01-01') {
                    $scope._NGM511_S = $scope.Var.V511; $scope._CH511 = true;
                } else { $scope._NGM511_F = $scope.Var.V511 == '' ? '' : $scope.Var.V511; }

                $scope._NGM512_S = $scope.Var.V512 == '' ? '' : $scope.Var.V512;

                if ($scope.Var.V513 == '9' || $scope.Var.V513 == '55') {
                    $scope._NGM513_S = $scope.Var.V513; $scope._CH513 = true;
                } else { $scope._NGM513_T = $scope.Var.V513 == '' ? '' : $scope.Var.V513; }

                if ($scope.Var.V514 == '9' || $scope.Var.V514 == '55') {
                    $scope._NGM514_S = $scope.Var.V514; $scope._CH514 = true;
                } else { $scope._NGM514_T = $scope.Var.V514 == '' ? '' : $scope.Var.V514; }

                if ($scope.Var.V515 == '9' || $scope.Var.V515 == '55') {
                    $scope._NGM515_S = $scope.Var.V515; $scope._CH515 = true;
                } else { $scope._NGM515_T = $scope.Var.V515 == '' ? '' : $scope.Var.V515; }

                if ($scope.Var.V516 == '9' || $scope.Var.V516 == '55') {
                    $scope._NGM516_S = $scope.Var.V516; $scope._CH516 = true;
                } else { $scope._NGM516_T = $scope.Var.V516 == '' ? '' : $scope.Var.V516; }

                $scope._NGM517_S = $scope.Var.V517 == '' ? '' : $scope.Var.V517;

                if ($scope.Var.V518 == '99' || $scope.Var.V518 == '55') {
                    $scope._NGM518_S = $scope.Var.V518; $scope._CH518 = true;
                } else { $scope._NGM518_N = $scope.Var.V518 == '' ? 0 : parseInt($scope.Var.V518); }

                //HOJA 4            
                //Patologías definitorias de SIDA (diagnosticadas durante o después del diagnóstico de VIH)
                $scope._NGM521_S = $scope.Var.V521 == '' ? '' : $scope.Var.V521; $scope._NGM522_S = $scope.Var.V522 == '' ? '' : $scope.Var.V522;
                $scope._NGM523_S = $scope.Var.V523 == '' ? '' : $scope.Var.V523; $scope._NGM524_S = $scope.Var.V524 == '' ? '' : $scope.Var.V524;
                $scope._NGM525_S = $scope.Var.V525 == '' ? '' : $scope.Var.V525; $scope._NGM526_S = $scope.Var.V526 == '' ? '' : $scope.Var.V526;
                $scope._NGM527_S = $scope.Var.V527 == '' ? '' : $scope.Var.V527; $scope._NGM528_S = $scope.Var.V528 == '' ? '' : $scope.Var.V528;
                $scope._NGM529_S = $scope.Var.V529 == '' ? '' : $scope.Var.V529; $scope._NGM5210_S = $scope.Var.V5210 == '' ? '' : $scope.Var.V5210;
                $scope._NGM5211_S = $scope.Var.V5211 == '' ? '' : $scope.Var.V5211; $scope._NGM5212_S = $scope.Var.V5212 == '' ? '' : $scope.Var.V5212;
                $scope._NGM5213_S = $scope.Var.V5213 == '' ? '' : $scope.Var.V5213; $scope._NGM5214_S = $scope.Var.V5214 == '' ? '' : $scope.Var.V5214;
                $scope._NGM5215_S = $scope.Var.V5215 == '' ? '' : $scope.Var.V5215; $scope._NGM5216_S = $scope.Var.V5216 == '' ? '' : $scope.Var.V5216;
                $scope._NGM5217_S = $scope.Var.V5217 == '' ? '' : $scope.Var.V5217; $scope._NGM5218_S = $scope.Var.V5218 == '' ? '' : $scope.Var.V5218;
                $scope._NGM5219_S = $scope.Var.V5219 == '' ? '' : $scope.Var.V5219; $scope._NGM5220_S = $scope.Var.V5220 == '' ? '' : $scope.Var.V5220;
                $scope._NGM5221_S = $scope.Var.V5221 == '' ? '' : $scope.Var.V5221; $scope._NGM5222_S = $scope.Var.V5222 == '' ? '' : $scope.Var.V5222;

                $scope._NGM53_N = $scope.Var.V53 == '' ? 0 : $scope.Var.V53;

                if ($scope.Var.V531 == '1845-01-01' || $scope.Var.V531 == '1800-01-01' || $scope.Var.V531 == '1846-01-01') {
                    $scope._NGM531_S = $scope.Var.V531; $scope._CH531 = true;
                } else { $scope._NGM531_F = $scope.Var.V531 == '' ? '' : $scope.Var.V531; }

                $scope._NGM532_N = $scope.Var.V532 == '' ? 0 : $scope.Var.V532;
                $scope._NGM533_S = $scope.Var.V533 == '' ? '' : $scope.Var.V533;
                $scope._NGM534_S = $scope.Var.V534 == '' ? '' : $scope.Var.V534;

                if ($scope.Var.V54 == '1799-01-01' || $scope.Var.V54 == '1800-01-01' || $scope.Var.V54 == '1845-01-01' || $scope.Var.V54 == '1846-01-01') {
                    $scope._NGM54_S = $scope.Var.V54; $scope._CH54 = true;
                } else { $scope._NGM54_F = $scope.Var.V54 == '' ? '' : $scope.Var.V54; }

                $scope._NGM55_S = $scope.Var.V55 == '' ? '' : $scope.Var.V55;

                if ($scope.Var.V56 == '1799-01-01' || $scope.Var.V56 == '1845-01-01' || $scope.Var.V56 == '1846-01-01') {
                    $scope._NGM56_S = $scope.Var.V56; $scope._CH56 = true;
                } else { $scope._NGM56_F = $scope.Var.V56 == '' ? '' : $scope.Var.V56; }

                if ($scope.Var.V561 == '999' || $scope.Var.V561 == '998' || $scope.Var.V561 == '555') {
                    $scope._NGM561_S = $scope.Var.V561; $scope._CH561 = true;
                } else { $scope._NGM561_N = $scope.Var.V561 == '' ? 0 : $scope.Var.V561; }

                if ($scope.Var.V57 == '1799-01-01' || $scope.Var.V57 == '1845-01-01' || $scope.Var.V57 == '1846-01-01') {
                    $scope._NGM57_S = $scope.Var.V57; $scope._CH57 = true;
                } else { $scope._NGM57_F = $scope.Var.V57 == '' ? '' : $scope.Var.V57; }

                if ($scope.Var.V571 == '9999' || $scope.Var.V571 == '9998' || $scope.Var.V571 == '5555') {
                    $scope._NGM571_S = $scope.Var.V571; $scope._CH571 = true;
                } else { $scope._NGM571_N = $scope.Var.V571 == '' ? 0 : $scope.Var.V571; }

                if ($scope.Var.V58 == '1799-01-01' || $scope.Var.V58 == '1845-01-01' || $scope.Var.V58 == '1846-01-01') {
                    $scope._NGM58_S = $scope.Var.V58; $scope._CH58 = true;
                } else { $scope._NGM58_F = $scope.Var.V58 == '' ? '' : $scope.Var.V58; }

                if ($scope.Var.V581 == '9999' || $scope.Var.V581 == '9998' || $scope.Var.V581 == '5555') {
                    $scope._NGM581_S = $scope.Var.V581; $scope._CH581 = true;
                } else { $scope._NGM581_N = $scope.Var.V581 == '' ? 0 : $scope.Var.V581; }

                if ($scope.Var.V59 == '1799-01-01' || $scope.Var.V59 == '1845-01-01' || $scope.Var.V59 == '1846-01-01') {
                    $scope._NGM59_S = $scope.Var.V59; $scope._CH59 = true;
                } else { $scope._NGM59_F = $scope.Var.V59 == '' ? '' : $scope.Var.V59; }

                if ($scope.Var.V591 == '9999' || $scope.Var.V591 == '9998' || $scope.Var.V591 == '5555') {
                    $scope._NGM591_S = $scope.Var.V591; $scope._CH591 = true;
                } else { $scope._NGM591_N = $scope.Var.V591 == '' ? 0 : $scope.Var.V591; }

                if ($scope.Var.V60 == '1799-01-01' || $scope.Var.V60 == '1845-01-01' || $scope.Var.V60 == '1846-01-01') {
                    $scope._NGM60_S = $scope.Var.V60; $scope._CH60 = true;
                } else { $scope._NGM60_F = $scope.Var.V60 == '' ? '' : $scope.Var.V60; }

                if ($scope.Var.V601 == '9999' || $scope.Var.V601 == '9998' || $scope.Var.V601 == '5555') {
                    $scope._NGM601_S = $scope.Var.V601; $scope._CH601 = true;
                } else { $scope._NGM601_N = $scope.Var.V601 == '' ? 0 : $scope.Var.V601; }

                if ($scope.Var.V61 == '1799-01-01' || $scope.Var.V61 == '1845-01-01' || $scope.Var.V61 == '1846-01-01') {
                    $scope._NGM61_S = $scope.Var.V61; $scope._CH61 = true;
                } else { $scope._NGM61_F = $scope.Var.V61 == '' ? '' : $scope.Var.V61; }

                if ($scope.Var.V611 == '9999' || $scope.Var.V611 == '9998' || $scope.Var.V611 == '5555') {
                    $scope._NGM611_S = $scope.Var.V611; $scope._CH611 = true;
                } else { $scope._NGM611_N = $scope.Var.V611 == '' ? 0 : $scope.Var.V611; }

                if ($scope.Var.V62 == '1799-01-01' || $scope.Var.V62 == '1845-01-01' || $scope.Var.V62 == '1846-01-01') {
                    $scope._NGM62_S = $scope.Var.V62; $scope._CH62 = true;
                } else { $scope._NGM62_F = $scope.Var.V62 == '' ? '' : $scope.Var.V62; }

                if ($scope.Var.V621 == '999' || $scope.Var.V621 == '998' || $scope.Var.V621 == '555') {
                    $scope._NGM621_S = $scope.Var.V621; $scope._CH621 = true;
                } else { $scope._NGM621_N = $scope.Var.V621 == '' ? 0 : $scope.Var.V621; }

                if ($scope.Var.V63 == '555') {
                    $scope._NGM63_S = $scope.Var.V63; $scope._CH63 = true;
                } else { $scope._NGM63_N = $scope.Var.V63 == '' ? 0 : parseInt($scope.Var.V63); }

                $scope._NGM64_S = $scope.Var.V64 == '' ? '' : $scope.Var.V64;
                $scope._NGM65_S = $scope.Var.V65 == '' ? '' : $scope.Var.V65;
                $scope._NGM66_S = $scope.Var.V66 == '' ? '' : $scope.Var.V66;
                $scope._NGM67_S = $scope.Var.V67 == '' ? '' : $scope.Var.V67;
                $scope._NGM68_S = $scope.Var.V68 == '' ? '' : $scope.Var.V68;
                $scope._NGM681_S = $scope.Var.V681 == '' ? '' : $scope.Var.V681;
                $scope._NGM682_S = $scope.Var.V682 == '' ? '' : $scope.Var.V682;

                if ($scope.Var.V683 == '1799-01-01' || $scope.Var.V683 == '1800-01-01' || $scope.Var.V683 == '1845-01-01' || $scope.Var.V683 == '1846-01-01') {
                    $scope._NGM683_S = $scope.Var.V683; $scope._CH683 = true;
                } else { $scope._NGM683_F = $scope.Var.V683 == '' ? '' : $scope.Var.V683; }

                if ($scope.Var.V684 == '9') {
                    $scope._NGM684_S = $scope.Var.V684; $scope._CH684 = true;
                } else { $scope._NGM684_N = $scope.Var.V684 == '' ? 0 : parseInt($scope.Var.V684); }

                if ($scope.Var.V685 == '9') {
                    $scope._NGM685_S = $scope.Var.V685; $scope._CH685 = true;
                } else { $scope._NGM685_N = $scope.Var.V685 == '' ? 0 : parseInt($scope.Var.V685); }

                if ($scope.Var.V686 == '9') {
                    $scope._NGM686_S = $scope.Var.V686; $scope._CH686 = true;
                } else { $scope._NGM686_N = $scope.Var.V686 == '' ? 0 : parseInt($scope.Var.V868); }

                if ($scope.Var.V687 == '9') {
                    $scope._NGM687_S = $scope.Var.V687; $scope._CH687 = true;
                } else { $scope._NGM687_N = $scope.Var.V687 == '' ? 0 : parseInt($scope.Var.V687); }

                if ($scope.Var.V688 == '9') {
                    $scope._NGM688_S = $scope.Var.V688; $scope._CH688 = true;
                } else { $scope._NGM688_N = $scope.Var.V688 == '' ? 0 : parseInt($scope.Var.V688); }

                if ($scope.Var.V689 == '9') {
                    $scope._NGM689_S = $scope.Var.V689; $scope._CH689 = true;
                } else { $scope._NGM689_N = $scope.Var.V689 == '' ? 0 : parseInt($scope.Var.V689); }

                if ($scope.Var.V6810 == '9') {
                    $scope._NGM6810_S = $scope.Var.V6810; $scope._CH6810 = true;
                } else { $scope._NGM6810_N = $scope.Var.V6810 == '' ? 0 : parseInt($scope.Var.V6810); }

                if ($scope.Var.V6811 == '9') {
                    $scope._NGM6811_S = $scope.Var.V6811; $scope._CH6811 = true;
                } else { $scope._NGM6811_N = $scope.Var.V6811 == '' ? 0 : parseInt($scope.Var.V6811); }

                if ($scope.Var.V6812 == '9') {
                    $scope._NGM6812_S = $scope.Var.V6812; $scope._CH6812 = true;
                } else { $scope._NGM6812_N = $scope.Var.V6812 == '' ? 0 : parseInt($scope.Var.V6812); }

                if ($scope.Var.V6813 == '1799-01-01' || $scope.Var.V6813 == '1800-01-01' || $scope.Var.V6813 == '1822-01-01' || $scope.Var.V6813 == '1845-01-01' || $scope.Var.V6813 == '1846-01-01') {
                    $scope._NGM6813_S = $scope.Var.V6813; $scope._CH6813 = true;
                } else { $scope._NGM6813_F = $scope.Var.V6813 == '' ? '' : $scope.Var.V6813; }

                $scope._NGM6814_S = $scope.Var.V6814 == '' ? '' : $scope.Var.V6814;
                $scope._NGM69_S = $scope.Var.V69 == '' ? '' : $scope.Var.V69;
                $scope._NGM70_S = $scope.Var.V70 == '' ? '' : $scope.Var.V70;
                $scope._NGM71_S = $scope.Var.V71 == '' ? '' : $scope.Var.V71;
                $scope._NGM72_S = $scope.Var.V72 == '' ? '' : $scope.Var.V72;
                $scope._NGM73_S = $scope.Var.V73 == '' ? '' : $scope.Var.V73;
                $scope._NGM74_S = $scope.Var.V74 == '' ? '' : $scope.Var.V74;

                if ($scope.Var.V75 == '1799-01-01' || $scope.Var.V75 == '1845-01-01' || $scope.Var.V75 == '1846-01-01') {
                    $scope._NGM75_S = $scope.Var.V75; $scope._CH75 = true;
                } else { $scope._NGM75_F = $scope.Var.V75 == '' ? '' : $scope.Var.V75; }

                if ($scope.Var.V751 == '9999' || $scope.Var.V751 == '5555') {
                    $scope._NGM751_S = $scope.Var.V751; $scope._CH751 = true;
                } else { $scope._NGM751_N = $scope.Var.V751 == '' ? 0 : parseInt($scope.Var.V751); }

                if ($scope.Var.V76 == '1799-01-01' || $scope.Var.V76 == '1845-01-01' || $scope.Var.V76 == '1846-01-01') {
                    $scope._NGM76_S = $scope.Var.V76; $scope._CH76 = true;
                } else { $scope._NGM76_F = $scope.Var.V76 == '' ? '' : $scope.Var.V76; }

                if ($scope.Var.V761 == '0' || $scope.Var.V761 == '99999999' || $scope.Var.V761 == '55555555') {
                    $scope._NGM761_S = $scope.Var.V761; $scope._CH761 = true;
                } else { $scope._NGM761_N = $scope.Var.V761 == '' ? 0 : parseInt($scope.Var.V761); }

                // HOJA 6
                // Terapia Antirretroviral (TAR) Actual
                $scope._NGM77_S = $scope.Var.V77 == '' ? '' : $scope.Var.V77;

                if ($scope.Var.V771 == '1788-01-01' || $scope.Var.V771 == '1799-01-01' || $scope.Var.V771 == '1845-01-01' || $scope.Var.V771 == '1846-01-01') {
                    $scope._NGM771_S = $scope.Var.V771; $scope._CH771 = true;
                } else { $scope._NGM771_F = $scope.Var.V771 == '' ? 0 : $scope.Var.V771; }

                if ($scope.Var.V772 == '9') {
                    $scope._NGM772_S = $scope.Var.V772; $scope._CH772 = true;
                } else { $scope._NGM772_N = $scope.Var.V772 == '' ? 0 : parseInt($scope.Var.V772); }

                if ($scope.Var.V773 == '9') {
                    $scope._NGM773_S = $scope.Var.V773; $scope._CH773 = true;
                } else { $scope._NGM773_N = $scope.Var.V773 == '' ? 0 : parseInt($scope.Var.V773); }

                if ($scope.Var.V774 == '9') {
                    $scope._NGM774_S = $scope.Var.V774; $scope._CH774 = true;
                } else { $scope._NGM774_N = $scope.Var.V774 == '' ? 0 : parseInt($scope.Var.V774); }

                if ($scope.Var.V775 == '9') {
                    $scope._NGM775_S = $scope.Var.V775; $scope._CH775 = true;
                } else { $scope._NGM775_N = $scope.Var.V775 == '' ? 0 : parseInt($scope.Var.V775); }

                if ($scope.Var.V776 == '9') {
                    $scope._NGM776_S = $scope.Var.V776; $scope._CH776 = true;
                } else { $scope._NGM776_N = $scope.Var.V776 == '' ? 0 : parseInt($scope.Var.V776); }

                if ($scope.Var.V777 == '9') {
                    $scope._NGM777_S = $scope.Var.V777; $scope._CH777 = true;
                } else { $scope._NGM777_N = $scope.Var.V777 == '' ? 0 : parseInt($scope.Var.V777); }

                if ($scope.Var.V778 == '99') {
                    $scope._NGM778_S = $scope.Var.V778; $scope._CH778 = true;
                } else { $scope._NGM778_N = $scope.Var.V778 == '' ? 0 : parseInt($scope.Var.V778); }

                //Intervenciones de prevención en la persona que vive con VIH
                if ($scope.Var.V78 == '999' || $scope.Var.V78 == '555') {
                    $scope._NGM78_S = $scope.Var.V78; $scope._CH78 = true;
                } else { $scope._NGM78_N = $scope.Var.V78 == '' ? 0 : parseInt($scope.Var.V78); }

                $scope._NGM79_S = $scope.Var.V79 == '' ? '' : $scope.Var.V79;
                $scope._NGM80_S = $scope.Var.V80 == '' ? '' : $scope.Var.V80;
                $scope._NGM81_S = $scope.Var.V81 == '' ? '' : $scope.Var.V81;
                $scope._NGM82_S = $scope.Var.V82 == '' ? '' : $scope.Var.V82;
                $scope._NGM83_S = $scope.Var.V83 == '' ? '' : $scope.Var.V83;
                $scope._NGM84_S = $scope.Var.V84 == '' ? '' : $scope.Var.V84;
                $scope._NGM85_S = $scope.Var.V85 == '' ? '' : $scope.Var.V85;
                $scope._NGM86_S = $scope.Var.V86 == '' ? '' : $scope.Var.V86;
                $scope._NGM861_S = $scope.Var.V861 == '' ? '' : $scope.Var.V861;
                $scope._NGM87_S = $scope.Var.V87 == '' ? '' : $scope.Var.V87;
                $scope._NGM88_S = $scope.Var.V88 == '' ? '' : $scope.Var.V88;
                $scope._NGM89_S = $scope.Var.V89 == '' ? '' : $scope.Var.V89;

                if ($scope.Var.V90 == '97' || $scope.Var.V90 == '98' || $scope.Var.V90 == '99' || $scope.Var.V90 == '55') {
                    $scope._NGM90_S = $scope.Var.V90; $scope._CH90 = true;
                } else { $scope._NGM90_T = $scope.Var.V90 == '' ? '' : parseInt($scope.Var.V90); }

                // HOJA 7
                // Profilaxis
                $scope._NGM91_S = $scope.Var.V91 == '' ? '' : $scope.Var.V91;
                $scope._NGM92_S = $scope.Var.V92 == '' ? '' : $scope.Var.V92;
                $scope._NGM93_S = $scope.Var.V93 == '' ? '' : $scope.Var.V93;
                // Situación administrativa a la fecha de corte
                $scope._NGM94_N = $scope.Var.V94 == '' ? 0 : $scope.Var.V94;
                $scope._NGM95_N = $scope.Var.V95 == '' ? 0 : $scope.Var.V95;
                $scope._NGM96_N = $scope.Var.V96 == '' ? 0 : parseInt($scope.Var.V96);
                $scope._NGM97_S = $scope.Var.V97 == 0 ? '' : $scope.Var.V97;

                if ($scope.Var.V971 == '1845-01-01' || $scope.Var.V971 == '1846-01-01') {
                    $scope._NGM971_S = $scope.Var.V971; $scope._CH971 = true;
                } else { $scope._NGM971_F = $scope.Var.V971 == '' ? '' : $scope.Var.V971; }

                if ($scope.Var.V972 == '999999') {
                    $scope._NGM972_S = $scope.Var.V972; $scope._CH972 = true;
                } else { $scope._NGM972_N = $scope.Var.V972 == '' ? 0 : parseInt($scope.Var.V972); }

                if ($scope.Var.V973 == '1845-01-01' || $scope.Var.V973 == '1846-01-01') {
                    $scope._NGM973_S = $scope.Var.V973; $scope._CH973 = true;
                } else { $scope._NGM973_F = $scope.Var.V973 == '' ? '' : $scope.Var.V973; }

                $scope._NGM974_S = $scope.Var.V974 == 0 ? '' : $scope.Var.V974;
                $scope._NGM98_F = $scope.Var.V98 == '' ? '' : $scope.Var.V98;
                $scope._NGM99_T = $scope.Var.V98 == '' ? '' : $scope.Var.V98;
            }

            $scope.Tipo_S_A = function () {
                if ($scope.tipo == "S") {
                    //variables tab I
                    $scope._CH16_S = true; $scope._NGM16_S = "0";
                    $scope._CH24_S = true; $scope._NGM24_S = "55";
                    $scope._CH241_S = true; $scope._CH241 = true; $scope._NGM241_N = ''; $scope._NGM241_S = "99";
                    $scope._CH242_S = true; $scope._NGM242_S = "9";
                    $scope._CH243_S = true; $scope._CH243 = true; $scope._NGM243_N = ''; $scope._NGM243_S = "99";
                    $scope._CH244_S = true; $scope._NGM244_S = "9";
                    $scope._CH245_S = true; $scope._NGM245_S = "9";
                    $scope._CH246_S = true; $scope._CH246 = true; $scope._NGM246_F = ""; $scope._NGM246_S = "1845-01-01";
                    $scope._CH247_S = true; $scope._NGM247_S = "9";
                    $scope._CH248_S = true; $scope._NGM248_S = "NA";
                    $scope._CH249_S = true; $scope._CH249 = true; $scope._NGM249_N = ''; $scope._NGM249_S = "9";
                    // Información de menores de 12 meses hijos o hijas de madres que viven con VIH
                    $scope._CH25_S = true; $scope._NGM25_S = "NA";
                    $scope._CH251_S = true; $scope._CH251 = true; $scope._NGM251_N = ''; $scope._NGM251_S = "9";
                    $scope._CH252_S = true; $scope._NGM252_S = "9";
                    $scope._CH26_S = true; $scope._NGM26_S = "9";
                    $scope._CH27_S = true; $scope._NGM27_S = "9";
                    $scope._CH28_S = true; $scope._CH28 = true; $scope._NGM28_F = ""; $scope._NGM28_S = "1845-01-01";
                    $scope._CH281_S = true; $scope._CH281 = true; $scope._NGM281_N = ''; $scope._NGM281_S = "99999999";
                    $scope._CH29_S = true; $scope._CH29 = true; $scope._NGM29_F = ""; $scope._NGM29_S = "1845-01-01";
                    $scope._CH291_S = true; $scope._CH291 = true; $scope._NGM291_N = ''; $scope._NGM291_S = "99999999";
                    $scope._CH30_S = true; $scope._CH30 = true; $scope._NGM30_F = ""; $scope._NGM30_S = "1845-01-01";
                    $scope._CH301_S = true; $scope._CH301 = true; $scope._NGM301_N = ''; $scope._NGM301_S = "99999999";
                    $scope._CH31_S = true; $scope._NGM31_S = "9";
                    //HOJA 2
                    //Información de personas que viven con VIH
                    $scope._CH34_S = true; $scope._CH34 = true; $scope._NGM34_F = ""; $scope._NGM34_S = "1845-01-01";
                    $scope._CH35_S = true; $scope._NGM35_S = "55";
                    $scope._CH36_S = true; $scope._CH36 = true; $scope._NGM36_F = ""; $scope._NGM36_S = "1845-01-01";
                    $scope._CH361_S = true; $scope._NGM361_S = "9";
                    $scope._CH362_S = true; $scope._CH362 = true; $scope._NGM362_N = ''; $scope._NGM362_S = "9";
                    $scope._CH37_S = true; $scope._CH37 = true; $scope._NGM37_F = ""; $scope._NGM37_S = "1845-01-01";
                    $scope._CH38_S = true; $scope._NGM38_S = "9";
                    $scope._CH39_S = true; $scope._NGM39_S = "9";
                    $scope._CH40_S = true; $scope._NGM40_S = "9";
                    $scope._CH401_S = true; $scope._CH401 = true; $scope._NGM401_N = ''; $scope._NGM401_S = "9999";
                    $scope._CH41_S = true; $scope._NGM41_S = "9";
                    $scope._CH411_S = true; $scope._CH411 = true; $scope._NGM411_N = ''; $scope._NGM411_S = "99999999";
                    //HOJA 3
                    //Terapia Antirretroviral (TAR) Inicial
                    $scope._CH42_S = true; $scope._CH42 = true; $scope._NGM42_F = ""; $scope._NGM42_S = "1845-01-01";
                    $scope._CH421_S = true; $scope._CH421 = true; $scope._NGM421_N = ''; $scope._NGM421_S = "9";
                    $scope._CH422_S = true; $scope._CH422 = true; $scope._NGM422_N = ''; $scope._NGM422_S = "9";
                    $scope._CH423_S = true; $scope._CH423 = true; $scope._NGM423_N = ''; $scope._NGM423_S = "9";
                    $scope._CH424_S = true; $scope._CH424 = true; $scope._NGM424_N = ''; $scope._NGM424_S = "9";
                    $scope._CH425_S = true; $scope._CH425 = true; $scope._NGM425_N = ''; $scope._NGM425_S = "9";
                    $scope._CH43_S = true; $scope._NGM43_S = "9";
                    $scope._CH431_S = true; $scope._CH431 = true; $scope._NGM431_N = ''; $scope._NGM431_S = "9999";
                    $scope._CH44_S = true; $scope._NGM44_S = "9";
                    $scope._CH441_S = true; $scope._CH441 = true; $scope._NGM441_N = ''; $scope._NGM441_S = "99999999";
                    $scope._CH45_S = true; $scope._NGM45_S = "99";
                    $scope._CH46_S = true; $scope._NGM46_S = "9";
                    $scope._CH47_S = true; $scope._NGM47_S = "9";
                    $scope._CH48_S = true; $scope._NGM48_S = "9";
                    $scope._CH49_S = true; $scope._CH49 = true; $scope._NGM49_N = ''; $scope._NGM49_S = "0";
                    $scope._CH50_S = true; $scope._CH50 = true; $scope._NGM50_N = ''; $scope._NGM50_S = "99";
                    $scope._CH51_S = true; $scope._NGM51_S = "9";
                    $scope._CH511_S = true; $scope._CH511 = true; $scope._NGM511_F = ""; $scope._NGM511_S = "1845-01-01";
                    $scope._CH512_S = true; $scope._NGM512_S = "99";
                    $scope._CH513_S = true; $scope._CH513 = true; $scope._NGM513_T = ""; $scope._NGM513_S = "9";
                    $scope._CH514_S = true; $scope._CH514 = true; $scope._NGM514_T = ""; $scope._NGM514_S = "9";
                    $scope._CH515_S = true; $scope._CH515 = true; $scope._NGM515_T = ""; $scope._NGM515_S = "9";
                    $scope._CH516_S = true; $scope._CH516 = true; $scope._NGM516_T = ""; $scope._NGM516_S = "9";
                    $scope._CH517_S = true; $scope._NGM517_S = "9";
                    $scope._CH518_S = true; $scope._CH518 = true; $scope._NGM518_N = ''; $scope._NGM518_S = "99";
                    //HOJA 4            
                    //Patologías definitorias de SIDA (diagnosticadas durante o después del diagnóstico de VIH)
                    $scope._CH521_S = true; $scope._NGM521_S = "9";
                    $scope._CH522_S = true; $scope._NGM522_S = "9";
                    $scope._CH523_S = true; $scope._NGM523_S = "9";
                    $scope._CH524_S = true; $scope._NGM524_S = "9";
                    $scope._CH525_S = true; $scope._NGM525_S = "9";
                    $scope._CH526_S = true; $scope._NGM526_S = "9";
                    $scope._CH527_S = true; $scope._NGM527_S = "9";
                    $scope._CH528_S = true; $scope._NGM528_S = "9";
                    $scope._CH529_S = true; $scope._NGM529_S = "9";
                    $scope._CH5210_S = true; $scope._NGM5210_S = "9";
                    $scope._CH5211_S = true; $scope._NGM5211_S = "9";
                    $scope._CH5212_S = true; $scope._NGM5212_S = "9";
                    $scope._CH5213_S = true; $scope._NGM5213_S = "9";
                    $scope._CH5214_S = true; $scope._NGM5214_S = "9";
                    $scope._CH5215_S = true; $scope._NGM5215_S = "9";
                    $scope._CH5216_S = true; $scope._NGM5216_S = "9";
                    $scope._CH5217_S = true; $scope._NGM5217_S = "9";
                    $scope._CH5218_S = true; $scope._NGM5218_S = "9";
                    $scope._CH5219_S = true; $scope._NGM5219_S = "9";
                    $scope._CH5220_S = true; $scope._NGM5220_S = "9";
                    $scope._CH5221_S = true; $scope._NGM5221_S = "9";
                    $scope._CH5222_S = true; $scope._NGM5222_S = "9";
                    //HOJA 5
                    //Condición actual de la persona que vive con VIH
                    $scope._CH53_S = true; $scope._NGM53_N = 55;
                    $scope._CH531_S = true; $scope._CH531 = true; $scope._NGM531_F = ""; $scope._NGM531_S = "1845-01-01";
                    $scope._CH532_S = true; $scope._NGM532_N = '08055';
                    $scope._CH533_S = true; $scope._NGM533_S = "7";
                    $scope._CH534_S = true; $scope._NGM534_S = "9";
                    $scope._CH54_S = true; $scope._CH54 = true; $scope._NGM54_F = ""; $scope._NGM54_S = "1845-01-01";
                    $scope._CH55_S = true; $scope._NGM55_S = "9";
                    $scope._CH56_S = true; $scope._CH56 = true; $scope._NGM56_F = ""; $scope._NGM56_S = "1845-01-01";
                    $scope._CH561_S = true; $scope._CH561 = true; $scope._NGM561_N = ''; $scope._NGM561_S = "999";
                    $scope._CH57_S = true; $scope._CH57 = true; $scope._NGM57_F = ""; $scope._NGM57_S = "1845-01-01";
                    $scope._CH571_S = true; $scope._CH571 = true; $scope._NGM571_N = ''; $scope._NGM571_S = "9999";
                    $scope._CH58_S = true; $scope._CH58 = true; $scope._NGM58_F = ""; $scope._NGM58_S = "1845-01-01";
                    $scope._CH581_S = true; $scope._CH581 = true; $scope._NGM581_N = ''; $scope._NGM581_S = "9999";
                    $scope._CH59_S = true; $scope._CH59 = true; $scope._NGM59_F = ""; $scope._NGM59_S = "1845-01-01";
                    $scope._CH591_S = true; $scope._CH591 = true; $scope._NGM591_N = ''; $scope._NGM591_S = "9999";
                    $scope._CH60_S = true; $scope._CH60 = true; $scope._NGM60_F = ""; $scope._NGM60_S = "1845-01-01";
                    $scope._CH601_S = true; $scope._CH601 = true; $scope._NGM601_N = ''; $scope._NGM601_S = "9999";
                    $scope._CH61_S = true; $scope._CH61 = true; $scope._NGM61_F = ""; $scope._NGM61_S = "1845-01-01";
                    $scope._CH611_S = true; $scope._CH611 = true; $scope._NGM611_N = ''; $scope._NGM611_S = "9999";
                    $scope._CH62_S = true; $scope._CH62 = true; $scope._NGM62_F = ""; $scope._NGM62_S = "1845-01-01";
                    $scope._CH621_S = true; $scope._CH621 = true; $scope._NGM621_N = ''; $scope._NGM621_S = "999";
                    $scope._CH63_S = true; $scope._CH63 = true; $scope._NGM63_N = ''; $scope._NGM63_S = "555";
                    $scope._CH64_S = true; $scope._NGM64_S = "9";
                    $scope._CH65_S = true; $scope._NGM65_S = "9";
                    $scope._CH66_S = true; $scope._NGM66_S = "9";
                    $scope._CH67_S = true; $scope._NGM67_S = "9";
                    $scope._CH68_S = true; $scope._NGM68_S = "9";
                    $scope._CH681_S = true; $scope._NGM681_S = "9";
                    $scope._CH682_S = true; $scope._NGM682_S = "9";

                    $scope._CH683_S = true; $scope._CH683 = true; $scope._NGM683_F = ""; $scope._NGM683_S = "1845-01-01";
                    $scope._CH684_S = true; $scope._CH684 = true; $scope._NGM684_N = ''; $scope._NGM684_S = "9";
                    $scope._CH685_S = true; $scope._CH685 = true; $scope._NGM685_N = ''; $scope._NGM685_S = "9";
                    $scope._CH686_S = true; $scope._CH686 = true; $scope._NGM686_N = ''; $scope._NGM686_S = "9";
                    $scope._CH687_S = true; $scope._CH687 = true; $scope._NGM687_N = ''; $scope._NGM687_S = "9";
                    $scope._CH688_S = true; $scope._CH688 = true; $scope._NGM688_N = ''; $scope._NGM688_S = "9";
                    $scope._CH689_S = true; $scope._CH689 = true; $scope._NGM689_N = ''; $scope._NGM689_S = "9";
                    $scope._CH6810_S = true; $scope._CH6810 = true; $scope._NGM6810_N = ''; $scope._NGM6810_S = "9";
                    $scope._CH6811_S = true; $scope._CH6811 = true; $scope._NGM6811_N = ''; $scope._NGM6811_S = "9";
                    $scope._CH6812_S = true; $scope._CH6812 = true; $scope._NGM6812_N = ''; $scope._NGM6812_S = "9";
                    $scope._CH6813_S = true; $scope._CH6813 = true; $scope._NGM6813_F = ""; $scope._NGM6813_S = "1845-01-01";
                    $scope._CH6814_S = true; $scope._NGM6814_S = "9";
                    $scope._CH69_S = true; $scope._NGM69_S = "9";
                    $scope._CH70_S = true; $scope._NGM70_S = "9";
                    $scope._CH71_S = true; $scope._NGM71_S = "9";
                    $scope._CH72_S = true; $scope._NGM72_S = "9";
                    $scope._CH73_S = true; $scope._NGM73_S = "9";
                    $scope._CH74_S = true; $scope._NGM74_S = "9";
                    $scope._CH75_S = true; $scope._CH75 = true; $scope._NGM75_F = ""; $scope._NGM75_S = "1845-01-01";
                    $scope._CH751_S = true; $scope._CH751 = true; $scope._NGM751_N = ''; $scope._NGM751_S = "9999";
                    $scope._CH76_S = true; $scope._CH76 = true; $scope._NGM76_F = ""; $scope._NGM76_S = "1845-01-01";
                    $scope._CH761_S = true; $scope._CH761 = true; $scope._NGM761_N = ''; $scope._NGM761_S = "99999999";
                    // HOJA 6
                    // Terapia Antirretroviral (TAR) Actual
                    $scope._CH77_S = true; $scope._NGM77_S = "9";
                    $scope._CH771_S = true; $scope._CH771 = true; $scope._NGM771_F = ""; $scope._NGM771_S = "1845-01-01";
                    $scope._CH772_S = true; $scope._CH772 = true; $scope._NGM772_N = ''; $scope._NGM772_S = "9";
                    $scope._CH773_S = true; $scope._CH773 = true; $scope._NGM773_N = ''; $scope._NGM773_S = "9";
                    $scope._CH774_S = true; $scope._CH774 = true; $scope._NGM774_N = ''; $scope._NGM774_S = "9";
                    $scope._CH775_S = true; $scope._CH775 = true; $scope._NGM775_N = ''; $scope._NGM775_S = "9";
                    $scope._CH776_S = true; $scope._CH776 = true; $scope._NGM776_N = ''; $scope._NGM776_S = "9";
                    $scope._CH777_S = true; $scope._CH777 = true; $scope._NGM777_N = ''; $scope._NGM777_S = "9";
                    //Intervenciones de prevención en la persona que vive con VIH
                    $scope._CH778_S = true; $scope._CH778 = true; $scope._NGM778_N = ''; $scope._NGM778_S = "99";
                    $scope._CH78_S = true; $scope._CH78 = true; $scope._NGM78_N = ''; $scope._NGM78_S = "999";
                    $scope._CH79_S = true; $scope._NGM79_S = "9";
                    $scope._CH80_S = true; $scope._NGM80_S = "9";
                    $scope._CH81_S = true; $scope._NGM81_S = "9";
                    $scope._CH82_S = true; $scope._NGM82_S = "9";
                    $scope._CH83_S = true; $scope._NGM83_S = "9";
                    $scope._CH84_S = true; $scope._NGM84_S = "9";
                    $scope._CH85_S = true; $scope._NGM85_S = "9";
                    $scope._CH86_S = true; $scope._NGM86_S = "9";
                    $scope._CH861_S = true; $scope._NGM861_S = "9";
                    $scope._CH87_S = true; $scope._NGM87_S = "9";
                    $scope._CH88_S = true; $scope._NGM88_S = "9";
                    $scope._CH89_S = true; $scope._NGM89_S = "9";
                    $scope._CH90_S = true; $scope._CH90 = true; $scope._NGM90_T = ""; $scope._NGM90_S = "99";
                    // HOJA 7
                    // Profilaxis
                    $scope._CH91_S = true; $scope._NGM91_S = "9";
                    $scope._CH92_S = true; $scope._NGM92_S = "9";
                    $scope._CH93_S = true; $scope._NGM93_S = "9";
                    // Situación administrativa a la fecha de corte
                    $scope._CH94_S = true; $scope._NGM94_N = 0;
                    $scope._CH95_S = true; $scope._NGM95_N = 0;
                    $scope._CH96_S = true; $scope._NGM96_N = 0;
                    $scope._CH972_S = true; $scope._CH972 = true; $scope._NGM972_N = ''; $scope._NGM972_S = "999999";

                }
            }
            $scope.subir = function () {
                var fileInput = document.getElementById('AdjuntoArchivoHistoria');
                /////////////////////////////////////////////////////////
                /*if (0 == fileInput.files.length) {
                    swal({
                        title: '!Adjunte la(s) historia(s) clinica(s)!',
                        type: 'warning',
                        timer: 1000,
                        showConfirmButton: false
                    }).catch(swal.noop);
                }*/
                if ($scope.limitesubirhistoria == false) {
                    if ($("#AdjuntoArchivoHistoria")[0].files && $("#AdjuntoArchivoHistoria")[0].files[0]) {
                        for (var i = 0; i < fileInput.files.length; i++) {
                            var name = fileInput.files[i].name;
                            $scope.extensionarchivohistoria = name.split('.').pop();
                            $scope.nombreArchivo = name.split('.')[0];

                            $http({
                                method: 'POST',
                                url: "php/altocosto/vih/VIH.php",
                                data: {
                                    function: 'subir',
                                    nomadj: $scope.nombreArchivo,
                                    BaseArchivo: $scope.arrayfileshistoria[i].archivo,
                                    ext: $scope.extensionarchivohistoria,
                                    cedula: $scope.DatosBasicos.Documento,
                                    tipo: 'Historias'
                                }
                            }).then(function (response) {
                                //console.log(response.data.trim());
                            });
                        }
                        ////////////////////////
                    }
                }
                $scope.limitesubirhistoria = false;


                var fileInput2 = document.getElementById('AdjuntoArchivoMedicamento');
                /////////////////////////////////////////////////////////
                /*if (0 == fileInput2.files.length) {
                    swal({
                        title: '!Adjunte los archivos de medicamentos!',
                        type: 'warning',
                        timer: 1000,
                        showConfirmButton: false
                    }).catch(swal.noop);
                }*/
                if ($scope.limitesubirmedicamento == false) {
                    if ($("#AdjuntoArchivoMedicamento")[0].files && $("#AdjuntoArchivoMedicamento")[0].files[0]) {
                        for (var i = 0; i < fileInput2.files.length; i++) {
                            var name = fileInput2.files[i].name;
                            $scope.extensionarchivomedicamento = name.split('.').pop();
                            $scope.nombreArchivo = name.split('.')[0];

                            $http({
                                method: 'POST',
                                url: "php/altocosto/vih/VIH.php",
                                data: {
                                    function: 'subir',
                                    nomadj: $scope.nombreArchivo,
                                    BaseArchivo: $scope.arrayfilesmedicamento[i].archivo,
                                    ext: $scope.extensionarchivomedicamento,
                                    cedula: $scope.DatosBasicos.Documento,
                                    tipo: 'Medicamentos'
                                }
                            }).then(function (response) {
                                //console.log(response.data.trim());
                            });
                        }
                        // setTimeout(() => {
                        //     swal({
                        //         title: '!Archivo(s) Subido Correctamente!',
                        //         type: 'success',
                        //         timer: 1500,
                        //         showConfirmButton: false
                        //     }).catch(swal.noop);
                        // }, 1500);

                        // $timeout(function () {
                        //     $scope.limpiarmodaladjuntos(1);
                        // }, 1000);
                    }
                }
                $scope.limitesubirmedicamento = false;


            }

            $scope.limpiarmodaladjuntos = function (n) {
                if (n == 1) {
                    document.getElementById('AdjuntoArchivoHistoria').value = '';
                    $("#AdjuntoArchivoHistoria")[0].value = "";
                    $scope.ArchivoModHistoria = "";
                    $scope.arrayfileshistoria = [];
                } else {
                    document.getElementById('AdjuntoArchivoMedicamento').value = '';
                    $("#AdjuntoArchivoMedicamento")[0].value = "";
                    $scope.ArchivoModMedicamento = "";
                    $scope.arrayfilesmedicamento = [];
                }
                // console.log($scope.arrayfileshistoria);
                // console.log($scope.ArchivoModHistoria);
            }

            $scope.Changearchivohistoria = function () {
                $scope.arrayfileshistoria = [];
                $scope.limitesubirhistoria = false;
                $scope.limiteporsubidahistoria = false;
                $scope.limiteextensionhistoria = false;
                $scope.minimosubirhistoria = false;
                var fileInput = document.getElementById('AdjuntoArchivoHistoria');

                for (var i = 0; i < fileInput.files.length; i++) {
                    if (fileInput.files[i].size > 7340032) {
                        $scope.limitesubirhistoria = true;
                    }
                    $scope.getBase64(fileInput.files[i]).then(
                        data => $scope.arrayfileshistoria.push({ archivo: data })
                    );
                    if (fileInput.files[i].size == 0) {
                        $scope.minimosubirhistoria = true;
                    }
                    if (i >= 20) {
                        $scope.limiteporsubidahistoria = true;
                    }
                    var name = fileInput.files[i].name;
                    var x = name.split('.').pop();
                    if (x.toUpperCase() != "PDF") {
                        $scope.limiteextensionhistoria = true;
                    }
                }


                if ($scope.minimosubirhistoria == true) {
                    swal('Advertencia', '¡Alguno(s) de los archivos seleccionados está vacio!', 'info');
                    $scope.limpiarmodaladjuntos(1);
                }

                if ($scope.limiteextensionhistoria == true) {
                    swal('Advertencia', '¡Alguno(s) de los archivos seleccionados no es un documento o archivo!', 'info');
                    $scope.limpiarmodaladjuntos(1);
                }

                if ($scope.limitesubirhistoria == true) {
                    swal('Advertencia', 'Alguno(s) de los archivos seleccionados excede el peso máximo posible (7MB)', 'info');
                    $scope.limpiarmodaladjuntos(1);
                }

                if ($scope.limiteporsubidahistoria == true) {
                    swal('Advertencia', '¡Solo se permiten como máximo 20 archivos por subida!', 'info');
                    $scope.limpiarmodaladjuntos(1);
                }
            }
            ////////////////////////////////////////////////////////////////////////////////
            $scope.Changearchivomedicamento = function () {
                $scope.arrayfilesmedicamento = [];
                $scope.limitesubirmedicamento = false;
                $scope.limiteporsubidamedicamento = false;
                $scope.limiteextensionmedicamento = false;
                $scope.minimosubirmedicamento = false;
                var fileInput = document.getElementById('AdjuntoArchivoMedicamento');

                for (var i = 0; i < fileInput.files.length; i++) {
                    if (fileInput.files[i].size > 7340032) {
                        $scope.limitesubirmedicamento = true;
                    }
                    $scope.getBase64(fileInput.files[i]).then(
                        data => $scope.arrayfilesmedicamento.push({ archivo: data })
                    );
                    if (fileInput.files[i].size == 0) {
                        $scope.minimosubirmedicamento = true;
                    }
                    if (i >= 20) {
                        $scope.limiteporsubidamedicamento = true;
                    }
                    var name = fileInput.files[i].name;
                    var x = name.split('.').pop();
                    if (x.toUpperCase() != "PDF") {
                        $scope.limiteextensionmedicamento = true;
                    }
                }


                if ($scope.minimosubirmedicamento == true) {
                    swal('Advertencia', '¡Alguno(s) de los archivos seleccionados está vacio!', 'info');
                    $scope.limpiarmodaladjuntos(2);
                }

                if ($scope.limiteextensionmedicamento == true) {
                    swal('Advertencia', '¡Alguno(s) de los archivos seleccionados no es un documento o archivo!', 'info');
                    $scope.limpiarmodaladjuntos(2);
                }

                if ($scope.limitesubirmedicamento == true) {
                    swal('Advertencia', 'Alguno(s) de los archivos seleccionados excede el peso máximo posible (7MB)', 'info');
                    $scope.limpiarmodaladjuntos(2);
                }

                if ($scope.limiteporsubidamedicamento == true) {
                    swal('Advertencia', '¡Solo se permiten como máximo 20 archivos por subida!', 'info');
                    $scope.limpiarmodaladjuntos(2);
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

            $scope.Abrir_modal = function () {
                (function () {
                    $('#modal_errores').modal();
                }());
                $('#modal_errores').modal('open');

            }
            $scope.Cerrar_modal = function () {
                $('#modal_errores').modal('close');
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $scope.AutoCom_V10_V15_V16_V17 = function () {
                // $scope.unset_30Vars();
                // $scope.unset_168Vars();
                // $scope.unset_20Vars();
                if ($scope.SexoCodigo == 'H' && parseInt($scope._NGM16_S) == 0 && $scope.tipo != 'S') {
                    $scope._NGM15_S = "9";
                    $scope.set_30Vars();
                }
                if ($scope.SexoCodigo == 'M' && parseInt($scope._NGM15_S) == 3 && parseInt($scope._NGM16_S) == 0 && $scope.tipo != 'S') {
                    $scope.set_30Vars();
                }
                if ($scope.SexoCodigo == 'M' && parseInt($scope._NGM15_S) == 3 && parseInt($scope._NGM16_S) == 1 && $scope.tipo != 'S') {
                    $scope.set_168Vars();
                }
                if ($scope.SexoCodigo == 'H' && parseInt($scope._NGM15_S) == 9 && parseInt($scope._NGM16_S) == 1 && $scope.tipo != 'S') {
                    $scope.set_168Vars();
                }
                if (parseInt($scope._NGM17_S) == 3 && $scope.tipo != 'S') {
                    $scope.set_20Vars();
                }
            }

            $scope.set_30Vars = function () {
                $scope._CH19 = true; $scope._NGM19_F = ""; $scope._NGM19_S = "1845-01-01";
                $scope._CH20 = true; $scope._NGM20_F = ""; $scope._NGM20_S = "1845-01-01";
                $scope._CH21 = true; $scope._NGM21_F = ""; $scope._NGM21_S = "1845-01-01";
                $scope._CH22 = true; $scope._NGM22_F = ""; $scope._NGM22_S = "1845-01-01";
                $scope._CH23 = true; $scope._NGM23_F = ""; $scope._NGM23_S = "1845-01-01";
                $scope._NGM24_S = "9";
                $scope._CH241 = true; $scope._NGM241_N = 2; $scope._NGM241_S = "99";
                $scope._NGM242_S = "9";
                $scope._CH243 = true; $scope._NGM243_N = 2; $scope._NGM243_S = "99";
                $scope._NGM244_S = "9";
                $scope._NGM245_S = "9";
                $scope._CH246 = true; $scope._NGM246_F = ""; $scope._NGM246_S = "1845-01-01";
                $scope._NGM247_S = "9";
                $scope._NGM248_S = "NA";
                $scope._CH249 = true; $scope._NGM249_N = 0; $scope._NGM249_S = "9";
                $scope._NGM25_S = "NA";
                $scope._CH251 = true; $scope._NGM251_N = 0; $scope._NGM251_S = "9";
                $scope._NGM252_S = "9";
                $scope._NGM26_S = "9";
                $scope._NGM27_S = "9";
                $scope._CH28 = true; $scope._NGM28_F = ""; $scope._NGM28_S = "1845-01-01";
                $scope._CH281 = true; $scope._NGM281_N = 0; $scope._NGM281_S = "99999999";
                $scope._CH29 = true; $scope._NGM29_F = ""; $scope._NGM29_S = "1845-01-01";
                $scope._CH291 = true; $scope._NGM291_N = 0; $scope._NGM291_S = "99999999";
                $scope._CH30 = true; $scope._NGM30_F = ""; $scope._NGM30_S = "1845-01-01";
                $scope._CH301 = true; $scope._NGM301_N = 0; $scope._NGM301_S = "99999999";
                $scope._NGM31_S = "9";
            }
            $scope.unset_30Vars = function () {
                $scope._CH19 = false; $scope._NGM19_F = ""; $scope._NGM19_S = "";
                $scope._CH20 = false; $scope._NGM20_F = ""; $scope._NGM20_S = "";
                $scope._CH21 = false; $scope._NGM21_F = ""; $scope._NGM21_S = "";
                $scope._CH22 = false; $scope._NGM22_F = ""; $scope._NGM22_S = "";
                $scope._CH23 = false; $scope._NGM23_F = ""; $scope._NGM23_S = "";
                $scope._NGM24_S = "";
                $scope._CH241 = false; $scope._NGM241_N = 2; $scope._NGM241_S = "";
                $scope._NGM242_S = "";
                $scope._CH243 = false; $scope._NGM243_N = 2; $scope._NGM243_S = "";
                $scope._NGM244_S = "";
                $scope._NGM245_S = "";
                $scope._CH246 = false; $scope._NGM246_F = ""; $scope._NGM246_S = "";
                $scope._NGM247_S = "";
                $scope._NGM248_S = "";
                $scope._CH249 = false; $scope._NGM249_N = 0; $scope._NGM249_S = "";
                $scope._NGM25_S = "";
                $scope._CH251 = false; $scope._NGM251_N = 0; $scope._NGM251_S = "";
                $scope._NGM252_S = "";
                $scope._NGM26_S = "";
                $scope._NGM27_S = "";
                $scope._CH28 = false; $scope._NGM28_F = ""; $scope._NGM28_S = "";
                $scope._CH281 = false; $scope._NGM281_N = 0; $scope._NGM281_S = "";
                $scope._CH29 = false; $scope._NGM29_F = ""; $scope._NGM29_S = "";
                $scope._CH291 = false; $scope._NGM291_N = 0; $scope._NGM291_S = "";
                $scope._CH30 = false; $scope._NGM30_F = ""; $scope._NGM30_S = "";
                $scope._CH301 = false; $scope._NGM301_N = 0; $scope._NGM301_S = "";
                $scope._NGM31_S = "";
            }

            $scope.set_168Vars = function () {
                $scope._CH19 = true; $scope._NGM19_F = ""; $scope._NGM19_S = "1845-01-01";
                $scope._CH20 = true; $scope._NGM20_F = ""; $scope._NGM20_S = "1845-01-01";
                $scope._CH21 = true; $scope._NGM21_F = ""; $scope._NGM21_S = "1845-01-01";
                $scope._CH22 = true; $scope._NGM22_F = ""; $scope._NGM22_S = "1845-01-01";
                $scope._CH23 = true; $scope._NGM23_F = ""; $scope._NGM23_S = "1845-01-01";
                $scope._NGM24_S = "9";
                $scope._CH241 = true; $scope._NGM241_N = 2; $scope._NGM241_S = "99";
                $scope._NGM242_S = "9";
                $scope._CH243 = true; $scope._NGM243_N = 2; $scope._NGM243_S = "99";
                $scope._NGM244_S = "9";
                $scope._NGM245_S = "9";
                $scope._CH246 = true; $scope._NGM246_F = ""; $scope._NGM246_S = "1845-01-01";
                $scope._NGM247_S = "9";
                $scope._NGM248_S = "NA";
                $scope._CH249 = true; $scope._NGM249_N = 0; $scope._NGM249_S = "9";
                $scope._NGM25_S = "NA";
                $scope._CH251 = true; $scope._NGM251_N = 0; $scope._NGM251_S = "9";
                $scope._NGM252_S = "9";
                $scope._NGM26_S = "9";
                $scope._NGM27_S = "9";
                $scope._CH28 = true; $scope._NGM28_F = ""; $scope._NGM28_S = "1845-01-01";
                $scope._CH281 = true; $scope._NGM281_N = 0; $scope._NGM281_S = "99999999";
                $scope._CH29 = true; $scope._NGM29_F = ""; $scope._NGM29_S = "1845-01-01";
                $scope._CH291 = true; $scope._NGM291_N = 0; $scope._NGM291_S = "99999999";
                $scope._CH30 = true; $scope._NGM30_F = ""; $scope._NGM30_S = "1845-01-01";
                $scope._CH301 = true; $scope._NGM301_N = 0; $scope._NGM301_S = "99999999";
                $scope._NGM31_S = "9";
                $scope._CH32 = true; $scope._NGM32_F = ""; $scope._NGM32_S = "1845-01-01";
                $scope._CH33 = true; $scope._NGM33_F = ""; $scope._NGM33_S = "1845-01-01";
                $scope._CH34 = true; $scope._NGM34_F = ""; $scope._NGM34_S = "1845-01-01";
                $scope._NGM35_S = "9";
                $scope._CH36 = true; $scope._NGM36_F = ""; $scope._NGM36_S = "1845-01-01";
                $scope._NGM361_S = "9";
                $scope._CH362 = true; $scope._NGM362_N = 0; $scope._NGM362_S = "9";
                $scope._CH37 = true; $scope._NGM37_F = ""; $scope._NGM37_S = "1845-01-01";
                $scope._NGM38_S = "9";
                $scope._NGM39_S = "9";
                $scope._NGM40_S = "9";
                $scope._CH401 = true; $scope._NGM401_N = 0; $scope._NGM401_S = "9999";
                $scope._NGM41_S = "9";
                $scope._CH411 = true; $scope._NGM411_N = 0; $scope._NGM411_S = "99999999";
                $scope._CH42 = true; $scope._NGM42_F = ""; $scope._NGM42_S = "1845-01-01";
                $scope._CH421 = true; $scope._NGM421_N = 0; $scope._NGM421_S = "9";
                $scope._CH422 = true; $scope._NGM422_N = 0; $scope._NGM422_S = "9";
                $scope._CH423 = true; $scope._NGM423_N = 0; $scope._NGM423_S = "9";
                $scope._CH424 = true; $scope._NGM424_N = 0; $scope._NGM424_S = "9";
                $scope._CH425 = true; $scope._NGM425_N = 0; $scope._NGM425_S = "9";
                $scope._NGM43_S = "9";
                $scope._CH431 = true; $scope._NGM431_N = 0; $scope._NGM431_S = "9999";
                $scope._NGM44_S = "9";
                $scope._CH441 = true; $scope._NGM441_N = 0; $scope._NGM441_S = "99999999";
                $scope._NGM45_S = "99";
                $scope._NGM46_S = "9";
                $scope._NGM47_S = "9";
                $scope._NGM48_S = "9";
                $scope._CH49 = true; $scope._NGM49_N = 0; $scope._NGM49_S = "0";
                $scope._CH50 = true; $scope._NGM50_N = 0; $scope._NGM50_S = "99";
                $scope._NGM51_S = "9";
                $scope._CH511 = true; $scope._NGM511_F = ""; $scope._NGM511_S = "1845-01-01";
                $scope._NGM512_S = "99";
                $scope._CH513 = true; $scope._NGM513_T = ""; $scope._NGM513_S = "9";
                $scope._CH514 = true; $scope._NGM514_T = ""; $scope._NGM514_S = "9";
                $scope._CH515 = true; $scope._NGM515_T = ""; $scope._NGM515_S = "9";
                $scope._CH516 = true; $scope._NGM516_T = ""; $scope._NGM516_S = "9";
                $scope._NGM517_S = "9";
                $scope._CH518 = true; $scope._NGM518_N = 0; $scope._NGM518_S = "99";
                $scope._NGM521_S = "9";
                $scope._NGM522_S = "9";
                $scope._NGM523_S = "9";
                $scope._NGM524_S = "9";
                $scope._NGM525_S = "9";
                $scope._NGM526_S = "9";
                $scope._NGM527_S = "9";
                $scope._NGM528_S = "9";
                $scope._NGM529_S = "9";
                $scope._NGM5210_S = "9";
                $scope._NGM5211_S = "9";
                $scope._NGM5212_S = "9";
                $scope._NGM5213_S = "9";
                $scope._NGM5214_S = "9";
                $scope._NGM5215_S = "9";
                $scope._NGM5216_S = "9";
                $scope._NGM5217_S = "9";
                $scope._NGM5218_S = "9";
                $scope._NGM5219_S = "9";
                $scope._NGM5220_S = "9";
                $scope._NGM5221_S = "9";
                $scope._NGM5222_S = "9";
                $scope._CH531 = true; $scope._NGM531_F = ""; $scope._NGM531_S = "1845-01-01";
                $scope._NGM533_S = "7";
                $scope._NGM534_S = "9";
                $scope._CH54 = true; $scope._NGM54_F = ""; $scope._NGM54_S = "1845-01-01";
                $scope._NGM55_S = "9";
                $scope._CH56 = true; $scope._NGM56_F = ""; $scope._NGM56_S = "1845-01-01";
                $scope._CH561 = true; $scope._NGM561_N = 0; $scope._NGM561_S = "999";
                $scope._CH57 = true; $scope._NGM57_F = ""; $scope._NGM57_S = "1845-01-01";
                $scope._CH571 = true; $scope._NGM571_N = 0; $scope._NGM571_S = "9999";
                $scope._CH58 = true; $scope._NGM58_F = ""; $scope._NGM58_S = "1845-01-01";
                $scope._CH581 = true; $scope._NGM581_N = 0; $scope._NGM581_S = "9999";
                $scope._CH59 = true; $scope._NGM59_F = ""; $scope._NGM59_S = "1845-01-01";
                $scope._CH591 = true; $scope._NGM591_N = 0; $scope._NGM591_S = "9999";
                $scope._CH60 = true; $scope._NGM60_F = ""; $scope._NGM60_S = "1845-01-01";
                $scope._CH601 = true; $scope._NGM601_N = 0; $scope._NGM601_S = "9999";
                $scope._CH61 = true; $scope._NGM61_F = ""; $scope._NGM61_S = "1845-01-01";
                $scope._CH611 = true; $scope._NGM611_N = 0; $scope._NGM611_S = "9999";
                $scope._CH62 = true; $scope._NGM62_F = ""; $scope._NGM62_S = "1845-01-01";
                $scope._CH621 = true; $scope._NGM621_N = 0; $scope._NGM621_S = "999";
                $scope._NGM64_S = "9";
                $scope._NGM65_S = "9";
                $scope._NGM66_S = "9";
                $scope._NGM67_S = "9";
                $scope._NGM68_S = "9";
                $scope._NGM681_S = "9";
                $scope._NGM682_S = "9";
                $scope._CH683 = true; $scope._NGM683_F = ""; $scope._NGM683_S = "1845-01-01";
                $scope._CH684 = true; $scope._NGM684_N = 0; $scope._NGM684_S = "9";
                $scope._CH685 = true; $scope._NGM685_N = 0; $scope._NGM685_S = "9";
                $scope._CH686 = true; $scope._NGM686_N = 0; $scope._NGM686_S = "9";
                $scope._CH687 = true; $scope._NGM687_N = 0; $scope._NGM687_S = "9";
                $scope._CH688 = true; $scope._NGM688_N = 0; $scope._NGM688_S = "9";
                $scope._CH689 = true; $scope._NGM689_N = 0; $scope._NGM689_S = "9";
                $scope._CH6810 = true; $scope._NGM6810_N = 0; $scope._NGM6810_S = "9";
                $scope._CH6811 = true; $scope._NGM6811_N = 0; $scope._NGM6811_S = "9";
                $scope._CH6812 = true; $scope._NGM6812_N = 0; $scope._NGM6812_S = "9";
                $scope._CH6813 = true; $scope._NGM6813_F = ""; $scope._NGM6813_S = "1845-01-01";
                $scope._NGM6814_S = "9";
                $scope._NGM69_S = "9";
                $scope._NGM70_S = "9";
                $scope._NGM71_S = "9";
                $scope._NGM72_S = "9";
                $scope._NGM73_S = "9";
                $scope._NGM74_S = "9";
                $scope._CH75 = true; $scope._NGM75_F = ""; $scope._NGM75_S = "1845-01-01";
                $scope._CH751 = true; $scope._NGM751_N = 0; $scope._NGM751_S = "9999";
                $scope._CH76 = true; $scope._NGM76_F = ""; $scope._NGM76_S = "1845-01-01";
                $scope._CH761 = true; $scope._NGM761_N = 0; $scope._NGM761_S = "99999999";
                $scope._NGM77_S = "9";
                $scope._CH771 = true; $scope._NGM771_F = ""; $scope._NGM771_S = "1845-01-01";
                $scope._CH772 = true; $scope._NGM772_N = 0; $scope._NGM772_S = "99";
                $scope._CH773 = true; $scope._NGM773_N = 0; $scope._NGM773_S = "99";
                $scope._CH774 = true; $scope._NGM774_N = 0; $scope._NGM774_S = "99";
                $scope._CH775 = true; $scope._NGM775_N = 0; $scope._NGM775_S = "99";
                $scope._CH776 = true; $scope._NGM776_N = 0; $scope._NGM776_S = "99";
                $scope._CH777 = true; $scope._NGM777_N = 0; $scope._NGM777_S = "99";
                $scope._CH778 = true; $scope._NGM778_N = 0; $scope._NGM778_S = "99";
                $scope._CH78 = true; $scope._NGM78_N = 0; $scope._NGM78_S = "999";
                $scope._NGM79_S = "9";
                $scope._NGM80_S = "9";
                $scope._NGM81_S = "9";
                $scope._NGM82_S = "9";
                $scope._NGM83_S = "9";
                $scope._NGM84_S = "9";
                $scope._NGM85_S = "9";
                $scope._NGM86_S = "9";
                $scope._NGM861_S = "9";
                $scope._NGM87_S = "9";
                $scope._NGM88_S = "9";
                $scope._NGM89_S = "9";
                $scope._CH90 = true; $scope._NGM90_T = ""; $scope._NGM90_S = "99";
                $scope._NGM91_S = "9";
                $scope._NGM92_S = "9";
                $scope._NGM93_S = "9";
                $scope._NGM94_N = 0;
                $scope._NGM95_N = 0;
                $scope._NGM96_N = 0;
            }
            $scope.unset_168Vars = function () {
                $scope._CH19 = false; $scope._NGM19_F = ""; $scope._NGM19_S = "";
                $scope._CH20 = false; $scope._NGM20_F = ""; $scope._NGM20_S = "";
                $scope._CH21 = false; $scope._NGM21_F = ""; $scope._NGM21_S = "";
                $scope._CH22 = false; $scope._NGM22_F = ""; $scope._NGM22_S = "";
                $scope._CH23 = false; $scope._NGM23_F = ""; $scope._NGM23_S = "";
                $scope._NGM24_S = "";
                $scope._CH241 = false; $scope._NGM241_N = 2; $scope._NGM241_S = "";
                $scope._NGM242_S = "";
                $scope._CH243 = false; $scope._NGM243_N = 2; $scope._NGM243_S = "";
                $scope._NGM244_S = "";
                $scope._NGM245_S = "";
                $scope._CH246 = false; $scope._NGM246_F = ""; $scope._NGM246_S = "";
                $scope._NGM247_S = "";
                $scope._NGM248_S = "";
                $scope._CH249 = false; $scope._NGM249_N = 0; $scope._NGM249_S = "";
                $scope._NGM25_S = "";
                $scope._CH251 = false; $scope._NGM251_N = 0; $scope._NGM251_S = "";
                $scope._NGM252_S = "";
                $scope._NGM26_S = "";
                $scope._NGM27_S = "";
                $scope._CH28 = false; $scope._NGM28_F = ""; $scope._NGM28_S = "";
                $scope._CH281 = false; $scope._NGM281_N = 0; $scope._NGM281_S = "";
                $scope._CH29 = false; $scope._NGM29_F = ""; $scope._NGM29_S = "";
                $scope._CH291 = false; $scope._NGM291_N = 0; $scope._NGM291_S = "";
                $scope._CH30 = false; $scope._NGM30_F = ""; $scope._NGM30_S = "";
                $scope._CH301 = false; $scope._NGM301_N = 0; $scope._NGM301_S = "";
                $scope._NGM31_S = "";
                $scope._CH32 = false; $scope._NGM32_F = ""; $scope._NGM32_S = "";
                $scope._CH33 = false; $scope._NGM33_F = ""; $scope._NGM33_S = "";
                $scope._CH34 = false; $scope._NGM34_F = ""; $scope._NGM34_S = "";
                $scope._NGM35_S = "";
                $scope._CH36 = false; $scope._NGM36_F = ""; $scope._NGM36_S = "";
                $scope._NGM361_S = "";
                $scope._CH362 = false; $scope._NGM362_N = 0; $scope._NGM362_S = "";
                $scope._CH37_S = false; $scope._CH37 = false; $scope._NGM37_F = ""; $scope._NGM37_S = "";
                $scope._CH38_S = false; $scope._NGM38_S = "";
                $scope._CH39_S = false; $scope._NGM39_S = "";
                $scope._CH40_S = false; $scope._NGM40_S = "";
                $scope._CH401 = false; $scope._NGM401_N = 0; $scope._NGM401_S = "";
                $scope._NGM41_S = "";
                $scope._CH411 = false; $scope._NGM411_N = 0; $scope._NGM411_S = "";
                $scope._CH42 = false; $scope._NGM42_F = ""; $scope._NGM42_S = "";
                $scope._CH421 = false; $scope._NGM421_N = 0; $scope._NGM421_S = "";
                $scope._CH422 = false; $scope._NGM422_N = 0; $scope._NGM422_S = "";
                $scope._CH423 = false; $scope._NGM423_N = 0; $scope._NGM423_S = "";
                $scope._CH424 = false; $scope._NGM424_N = 0; $scope._NGM424_S = "";
                $scope._CH425 = false; $scope._NGM425_N = 0; $scope._NGM425_S = "";
                $scope._NGM43_S = "";
                $scope._CH431 = false; $scope._NGM431_N = 0; $scope._NGM431_S = "";
                $scope._NGM44_S = "";
                $scope._CH441 = false; $scope._NGM441_N = 0; $scope._NGM441_S = "";
                $scope._NGM45_S = "";
                $scope._NGM46_S = "";
                $scope._NGM47_S = "";
                $scope._NGM48_S = "";
                $scope._CH49 = false; $scope._NGM49_N = 0; $scope._NGM49_S = "";
                $scope._CH50 = false; $scope._NGM50_N = 0; $scope._NGM50_S = "";
                $scope._NGM51_S = "";
                $scope._CH511 = false; $scope._NGM511_F = ""; $scope._NGM511_S = "";
                $scope._NGM512_S = "";
                $scope._CH513 = false; $scope._NGM513_T = ""; $scope._NGM513_S = "";
                $scope._CH514 = false; $scope._NGM514_T = ""; $scope._NGM514_S = "";
                $scope._CH515 = false; $scope._NGM515_T = ""; $scope._NGM515_S = "";
                $scope._CH516 = false; $scope._NGM516_T = ""; $scope._NGM516_S = "";
                $scope._NGM517_S = "";
                $scope._CH518 = false; $scope._NGM518_N = 0; $scope._NGM518_S = "";
                $scope._NGM521_S = "";
                $scope._NGM522_S = "";
                $scope._NGM523_S = "";
                $scope._NGM524_S = "";
                $scope._NGM525_S = "";
                $scope._NGM526_S = "";
                $scope._NGM527_S = "";
                $scope._NGM528_S = "";
                $scope._NGM529_S = "";
                $scope._NGM5210_S = "";
                $scope._NGM5211_S = "";
                $scope._NGM5212_S = "";
                $scope._NGM5213_S = "";
                $scope._NGM5214_S = "";
                $scope._NGM5215_S = "";
                $scope._NGM5216_S = "";
                $scope._NGM5217_S = "";
                $scope._NGM5218_S = "";
                $scope._NGM5219_S = "";
                $scope._NGM5220_S = "";
                $scope._NGM5221_S = "";
                $scope._NGM5222_S = "";
                $scope._CH531 = false; $scope._NGM531_F = ""; $scope._NGM531_S = "";
                $scope._NGM533_S = "";
                $scope._NGM534_S = "";
                $scope._CH54 = false; $scope._NGM54_F = ""; $scope._NGM54_S = "";
                $scope._NGM55_S = "";
                $scope._CH56 = false; $scope._NGM56_F = ""; $scope._NGM56_S = "";
                $scope._CH561 = false; $scope._NGM561_N = 0; $scope._NGM561_S = "";
                $scope._CH57 = false; $scope._NGM57_F = ""; $scope._NGM57_S = "";
                $scope._CH571 = false; $scope._NGM571_N = 0; $scope._NGM571_S = "";
                $scope._CH58 = false; $scope._NGM58_F = ""; $scope._NGM58_S = "";
                $scope._CH581 = false; $scope._NGM581_N = 0; $scope._NGM581_S = "";
                $scope._CH59 = false; $scope._NGM59_F = ""; $scope._NGM59_S = "";
                $scope._CH591 = false; $scope._NGM591_N = 0; $scope._NGM591_S = "";
                $scope._CH60 = false; $scope._NGM60_F = ""; $scope._NGM60_S = "";
                $scope._CH601 = false; $scope._NGM601_N = 0; $scope._NGM601_S = "";
                $scope._CH61 = false; $scope._NGM61_F = ""; $scope._NGM61_S = "";
                $scope._CH611 = false; $scope._NGM611_N = 0; $scope._NGM611_S = "";
                $scope._CH62 = false; $scope._NGM62_F = ""; $scope._NGM62_S = "";
                $scope._CH621 = false; $scope._NGM621_N = 0; $scope._NGM621_S = "";
                $scope._CH64_S = false; $scope._NGM64_S = "";
                $scope._NGM65_S = "";
                $scope._NGM66_S = "";
                $scope._NGM67_S = "";
                $scope._NGM68_S = "";
                $scope._NGM681_S = "";
                $scope._NGM682_S = "";
                $scope._CH683 = false; $scope._NGM683_F = ""; $scope._NGM683_S = "";
                $scope._CH684 = false; $scope._NGM684_N = 0; $scope._NGM684_S = "";
                $scope._CH685 = false; $scope._NGM685_N = 0; $scope._NGM685_S = "";
                $scope._CH686 = false; $scope._NGM686_N = 0; $scope._NGM686_S = "";
                $scope._CH687 = false; $scope._NGM687_N = 0; $scope._NGM687_S = "";
                $scope._CH688 = false; $scope._NGM688_N = 0; $scope._NGM688_S = "";
                $scope._CH689 = false; $scope._NGM689_N = 0; $scope._NGM689_S = "";
                $scope._CH6810_S = false; $scope._CH6810 = false; $scope._NGM6810_N = 0; $scope._NGM6810_S = "";
                $scope._CH6811_S = false; $scope._CH6811 = false; $scope._NGM6811_N = 0; $scope._NGM6811_S = "";
                $scope._CH6812_S = false; $scope._CH6812 = false; $scope._NGM6812_N = 0; $scope._NGM6812_S = "";
                $scope._CH6813 = false; $scope._NGM6813_F = ""; $scope._NGM6813_S = "";
                $scope._NGM6814_S = "";
                $scope._NGM69_S = "";
                $scope._NGM70_S = "";
                $scope._NGM71_S = "";
                $scope._NGM72_S = "";
                $scope._NGM73_S = "";
                $scope._NGM74_S = "";
                $scope._CH75 = false; $scope._NGM75_F = ""; $scope._NGM75_S = "";
                $scope._CH751 = false; $scope._NGM751_N = 0; $scope._NGM751_S = "";
                $scope._CH76 = false; $scope._NGM76_F = ""; $scope._NGM76_S = "";
                $scope._CH761 = false; $scope._NGM761_N = 0; $scope._NGM761_S = "";
                $scope._NGM77_S = "";
                $scope._CH771 = false; $scope._NGM771_F = ""; $scope._NGM771_S = "";
                $scope._CH772 = false; $scope._NGM772_N = 0; $scope._NGM772_S = "";
                $scope._CH773 = false; $scope._NGM773_N = 0; $scope._NGM773_S = "";
                $scope._CH774 = false; $scope._NGM774_N = 0; $scope._NGM774_S = "";
                $scope._CH775 = false; $scope._NGM775_N = 0; $scope._NGM775_S = "";
                $scope._CH776 = false; $scope._NGM776_N = 0; $scope._NGM776_S = "";
                $scope._CH777 = false; $scope._NGM777_N = 0; $scope._NGM777_S = "";
                $scope._CH778 = false; $scope._NGM778_N = 0; $scope._NGM778_S = "";
                $scope._CH78 = false; $scope._NGM78_N = 0; $scope._NGM78_S = "";
                $scope._NGM79_S = "";
                $scope._NGM80_S = "";
                $scope._NGM81_S = "";
                $scope._NGM82_S = "";
                $scope._NGM83_S = "";
                $scope._NGM84_S = "";
                $scope._NGM85_S = "";
                $scope._NGM86_S = "";
                $scope._NGM861_S = "";
                $scope._NGM87_S = "";
                $scope._NGM88_S = "";
                $scope._NGM89_S = "";
                $scope._CH90 = false; $scope._NGM90_T = ""; $scope._NGM90_S = "";
                $scope._NGM91_S = "";
                $scope._NGM92_S = "";
                $scope._NGM93_S = "";
                $scope._NGM94_N = 0;
                $scope._NGM95_N = 0;
                $scope._NGM96_N = 0;
            }

            $scope.set_20Vars = function () {
                $scope._CH32 = true; $scope._NGM32_F = ""; $scope._NGM32_S = "1845-01-01";
                $scope._CH33 = true; $scope._NGM33_F = ""; $scope._NGM33_S = "1845-01-01";
                $scope._NGM68_S = "0";
                $scope._NGM681_S = "5";
                $scope._NGM682_S = "8";
                $scope._CH683 = true; $scope._NGM683_F = ""; $scope._NGM683_S = "1799-01-01";
                $scope._CH684 = true; $scope._NGM684_N = 0; $scope._NGM684_S = "9";
                $scope._CH685 = true; $scope._NGM685_N = 0; $scope._NGM685_S = "9";
                $scope._CH686 = true; $scope._NGM686_N = 0; $scope._NGM686_S = "9";
                $scope._CH687 = true; $scope._NGM687_N = 0; $scope._NGM687_S = "9";
                $scope._CH688 = true; $scope._NGM688_N = 0; $scope._NGM688_S = "9";
                $scope._CH689 = true; $scope._NGM689_N = 0; $scope._NGM689_S = "9";
                $scope._CH6810_S = true; $scope._CH6810 = true; $scope._NGM6810_N = 0; $scope._NGM6810_S = "9";
                $scope._CH6811_S = true; $scope._CH6811 = true; $scope._NGM6811_N = 0; $scope._NGM6811_S = "9";
                $scope._CH6812_S = true; $scope._CH6812 = true; $scope._NGM6812_N = 0; $scope._NGM6812_S = "9";
                $scope._CH6813 = true; $scope._NGM6813_F = ""; $scope._NGM6813_S = "1799-01-01";
                $scope._NGM6814_S = "10";
            }
            $scope.unset_20Vars = function () {
                $scope._CH32 = false; $scope._NGM32_F = ""; $scope._NGM32_S = "";
                $scope._CH33 = false; $scope._NGM33_F = ""; $scope._NGM33_S = "";
                $scope._NGM68_S = "";
                $scope._NGM681_S = "";
                $scope._NGM682_S = "";
                $scope._CH683 = false; $scope._NGM683_F = ""; $scope._NGM683_S = "";
                $scope._CH684 = false; $scope._NGM684_N = 0; $scope._NGM684_S = "";
                $scope._CH685 = false; $scope._NGM685_N = 0; $scope._NGM685_S = "";
                $scope._CH686 = false; $scope._NGM686_N = 0; $scope._NGM686_S = "";
                $scope._CH687 = false; $scope._NGM687_N = 0; $scope._NGM687_S = "";
                $scope._CH688 = false; $scope._NGM688_N = 0; $scope._NGM688_S = "";
                $scope._CH689 = false; $scope._NGM689_N = 0; $scope._NGM689_S = "";
                $scope._CH6810_S = false; $scope._CH6810 = false; $scope._NGM6810_N = 0; $scope._NGM6810_S = "";
                $scope._CH6811_S = false; $scope._CH6811 = false; $scope._NGM6811_N = 0; $scope._NGM6811_S = "";
                $scope._CH6812_S = false; $scope._CH6812 = false; $scope._NGM6812_N = 0; $scope._NGM6812_S = "";
                $scope._CH6813 = false; $scope._NGM6813_F = ""; $scope._NGM6813_S = "";
                $scope._NGM6814_S = "";
            }

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            $scope.set_30Vars_2 = function () {
                $scope._CH19_S = true; $scope._CH19 = true; $scope._NGM19_F = ""; $scope._NGM19_S = "1845-01-01";
                $scope._CH20_S = true; $scope._CH20 = true; $scope._NGM20_F = ""; $scope._NGM20_S = "1845-01-01";
                $scope._CH21_S = true; $scope._CH21 = true; $scope._NGM21_F = ""; $scope._NGM21_S = "1845-01-01";
                $scope._CH22_S = true; $scope._CH22 = true; $scope._NGM22_F = ""; $scope._NGM22_S = "1845-01-01";
                $scope._CH23_S = true; $scope._CH23 = true; $scope._NGM23_F = ""; $scope._NGM23_S = "1845-01-01";
                $scope._CH24_S = true; $scope._NGM24_S = "9";
                $scope._CH241_S = true; $scope._CH241 = true; $scope._NGM241_N = 2; $scope._NGM241_S = "99";
                $scope._CH242_S = true; $scope._NGM242_S = "9";
                $scope._CH243_S = true; $scope._CH243 = true; $scope._NGM243_N = 2; $scope._NGM243_S = "99";
                $scope._CH244_S = true; $scope._NGM244_S = "9";
                $scope._CH245_S = true; $scope._NGM245_S = "9";
                $scope._CH246_S = true; $scope._CH246 = true; $scope._NGM246_F = ""; $scope._NGM246_S = "1845-01-01";
                $scope._CH247_S = true; $scope._NGM247_S = "9";
                $scope._CH248_S = true; $scope._NGM248_S = "NA";
                $scope._CH249_S = true; $scope._CH249 = true; $scope._NGM249_N = 0; $scope._NGM249_S = "9";
                $scope._CH25_S = true; $scope._NGM25_S = "NA";
                $scope._CH251_S = true; $scope._CH251 = true; $scope._NGM251_N = 0; $scope._NGM251_S = "9";
                $scope._CH252_S = true; $scope._NGM252_S = "9";
                $scope._CH26_S = true; $scope._NGM26_S = "9";
                $scope._CH27_S = true; $scope._NGM27_S = "9";
                $scope._CH28_S = true; $scope._CH28 = true; $scope._NGM28_F = ""; $scope._NGM28_S = "1845-01-01";
                $scope._CH281_S = true; $scope._CH281 = true; $scope._NGM281_N = 0; $scope._NGM281_S = "99999999";
                $scope._CH29_S = true; $scope._CH29 = true; $scope._NGM29_F = ""; $scope._NGM29_S = "1845-01-01";
                $scope._CH291_S = true; $scope._CH291 = true; $scope._NGM291_N = 0; $scope._NGM291_S = "99999999";
                $scope._CH30_S = true; $scope._CH30 = true; $scope._NGM30_F = ""; $scope._NGM30_S = "1845-01-01";
                $scope._CH301_S = true; $scope._CH301 = true; $scope._NGM301_N = 0; $scope._NGM301_S = "99999999";
                $scope._CH31_S = true; $scope._NGM31_S = "9";
            }
            $scope.unset_30Vars_2 = function () {
                $scope._CH19_S = false; $scope._CH19 = false; $scope._NGM19_F = ""; $scope._NGM19_S = "";
                $scope._CH20_S = false; $scope._CH20 = false; $scope._NGM20_F = ""; $scope._NGM20_S = "";
                $scope._CH21_S = false; $scope._CH21 = false; $scope._NGM21_F = ""; $scope._NGM21_S = "";
                $scope._CH22_S = false; $scope._CH22 = false; $scope._NGM22_F = ""; $scope._NGM22_S = "";
                $scope._CH23_S = false; $scope._CH23 = false; $scope._NGM23_F = ""; $scope._NGM23_S = "";
                $scope._CH24_S = false; $scope._NGM24_S = "";
                $scope._CH241_S = false; $scope._CH241 = false; $scope._NGM241_N = 2; $scope._NGM241_S = "";
                $scope._CH242_S = false; $scope._NGM242_S = "";
                $scope._CH243_S = false; $scope._CH243 = false; $scope._NGM243_N = 2; $scope._NGM243_S = "";
                $scope._CH244_S = false; $scope._NGM244_S = "";
                $scope._CH245_S = false; $scope._NGM245_S = "";
                $scope._CH246_S = false; $scope._CH246 = false; $scope._NGM246_F = ""; $scope._NGM246_S = "";
                $scope._CH247_S = false; $scope._NGM247_S = "";
                $scope._CH248_S = false; $scope._NGM248_S = "";
                $scope._CH249_S = false; $scope._CH249 = false; $scope._NGM249_N = 0; $scope._NGM249_S = "";
                $scope._CH25_S = false; $scope._NGM25_S = "";
                $scope._CH251_S = false; $scope._CH251 = false; $scope._NGM251_N = 0; $scope._NGM251_S = "";
                $scope._CH252_S = false; $scope._NGM252_S = "";
                $scope._CH26_S = false; $scope._NGM26_S = "";
                $scope._CH27_S = false; $scope._NGM27_S = "";
                $scope._CH28_S = false; $scope._CH28 = false; $scope._NGM28_F = ""; $scope._NGM28_S = "";
                $scope._CH281_S = false; $scope._CH281 = false; $scope._NGM281_N = 0; $scope._NGM281_S = "";
                $scope._CH29_S = false; $scope._CH29 = false; $scope._NGM29_F = ""; $scope._NGM29_S = "";
                $scope._CH291_S = false; $scope._CH291 = false; $scope._NGM291_N = 0; $scope._NGM291_S = "";
                $scope._CH30_S = false; $scope._CH30 = false; $scope._NGM30_F = ""; $scope._NGM30_S = "";
                $scope._CH301_S = false; $scope._CH301 = false; $scope._NGM301_N = 0; $scope._NGM301_S = "";
                $scope._CH31_S = false; $scope._NGM31_S = "";
            }

            $scope.set_168Vars_2 = function () {
                $scope._CH19_S = true; $scope._CH19 = true; $scope._NGM19_F = ""; $scope._NGM19_S = "1845-01-01";
                $scope._CH20_S = true; $scope._CH20 = true; $scope._NGM20_F = ""; $scope._NGM20_S = "1845-01-01";
                $scope._CH21_S = true; $scope._CH21 = true; $scope._NGM21_F = ""; $scope._NGM21_S = "1845-01-01";
                $scope._CH22_S = true; $scope._CH22 = true; $scope._NGM22_F = ""; $scope._NGM22_S = "1845-01-01";
                $scope._CH23_S = true; $scope._CH23 = true; $scope._NGM23_F = ""; $scope._NGM23_S = "1845-01-01";
                $scope._CH24_S = true; $scope._NGM24_S = "9";
                $scope._CH241_S = true; $scope._CH241 = true; $scope._NGM241_N = 2; $scope._NGM241_S = "99";
                $scope._CH242_S = true; $scope._NGM242_S = "9";
                $scope._CH243_S = true; $scope._CH243 = true; $scope._NGM243_N = 2; $scope._NGM243_S = "99";
                $scope._CH244_S = true; $scope._NGM244_S = "9";
                $scope._CH245_S = true; $scope._NGM245_S = "9";
                $scope._CH246_S = true; $scope._CH246 = true; $scope._NGM246_F = ""; $scope._NGM246_S = "1845-01-01";
                $scope._CH247_S = true; $scope._NGM247_S = "9";
                $scope._CH248_S = true; $scope._NGM248_S = "NA";
                $scope._CH249_S = true; $scope._CH249 = true; $scope._NGM249_N = 0; $scope._NGM249_S = "9";
                $scope._CH25_S = true; $scope._NGM25_S = "NA";
                $scope._CH251_S = true; $scope._CH251 = true; $scope._NGM251_N = 0; $scope._NGM251_S = "9";
                $scope._CH252_S = true; $scope._NGM252_S = "9";
                $scope._CH26_S = true; $scope._NGM26_S = "9";
                $scope._CH27_S = true; $scope._NGM27_S = "9";
                $scope._CH28_S = true; $scope._CH28 = true; $scope._NGM28_F = ""; $scope._NGM28_S = "1845-01-01";
                $scope._CH281_S = true; $scope._CH281 = true; $scope._NGM281_N = 0; $scope._NGM281_S = "99999999";
                $scope._CH29_S = true; $scope._CH29 = true; $scope._NGM29_F = ""; $scope._NGM29_S = "1845-01-01";
                $scope._CH291_S = true; $scope._CH291 = true; $scope._NGM291_N = 0; $scope._NGM291_S = "99999999";
                $scope._CH30_S = true; $scope._CH30 = true; $scope._NGM30_F = ""; $scope._NGM30_S = "1845-01-01";
                $scope._CH301_S = true; $scope._CH301 = true; $scope._NGM301_N = 0; $scope._NGM301_S = "99999999";
                $scope._CH31_S = true; $scope._NGM31_S = "9";
                //
                $scope._CH32_S = true; $scope._CH32 = true; $scope._NGM32_F = ""; $scope._NGM32_S = "1845-01-01";
                $scope._CH33_S = true; $scope._CH33 = true; $scope._NGM33_F = ""; $scope._NGM33_S = "1845-01-01";
                $scope._CH34_S = true; $scope._CH34 = true; $scope._NGM34_F = ""; $scope._NGM34_S = "1845-01-01";
                $scope._CH35_S = true; $scope._NGM35_S = "9";
                $scope._CH36_S = true; $scope._CH36 = true; $scope._NGM36_F = ""; $scope._NGM36_S = "1845-01-01";
                $scope._CH361_S = true; $scope._NGM361_S = "9";
                $scope._CH362_S = true; $scope._CH362 = true; $scope._NGM362_N = 0; $scope._NGM362_S = "9";
                $scope._CH37_S = true; $scope._CH37 = true; $scope._NGM37_F = ""; $scope._NGM37_S = "1845-01-01";
                $scope._CH38_S = true; $scope._NGM38_S = "9";
                $scope._CH39_S = true; $scope._NGM39_S = "9";
                $scope._CH40_S = true; $scope._NGM40_S = "9";
                $scope._CH401_S = true; $scope._CH401 = true; $scope._NGM401_N = 0; $scope._NGM401_S = "9999";
                $scope._CH41_S = true; $scope._NGM41_S = "9";
                $scope._CH411_S = true; $scope._CH411 = true; $scope._NGM411_N = 0; $scope._NGM411_S = "99999999";
                $scope._CH42_S = true; $scope._CH42 = true; $scope._NGM42_F = ""; $scope._NGM42_S = "1845-01-01";
                $scope._CH421_S = true; $scope._CH421 = true; $scope._NGM421_N = 0; $scope._NGM421_S = "9";
                $scope._CH422_S = true; $scope._CH422 = true; $scope._NGM422_N = 0; $scope._NGM422_S = "9";
                $scope._CH423_S = true; $scope._CH423 = true; $scope._NGM423_N = 0; $scope._NGM423_S = "9";
                $scope._CH424_S = true; $scope._CH424 = true; $scope._NGM424_N = 0; $scope._NGM424_S = "9";
                $scope._CH425_S = true; $scope._CH425 = true; $scope._NGM425_N = 0; $scope._NGM425_S = "9";
                $scope._CH43_S = true; $scope._NGM43_S = "9";
                $scope._CH431_S = true; $scope._CH431 = true; $scope._NGM431_N = 0; $scope._NGM431_S = "9999";
                $scope._CH44_S = true; $scope._NGM44_S = "9";
                $scope._CH441_S = true; $scope._CH441 = true; $scope._NGM441_N = 0; $scope._NGM441_S = "99999999";
                $scope._CH45_S = true; $scope._NGM45_S = "99";
                $scope._CH46_S = true; $scope._NGM46_S = "9";
                $scope._CH47_S = true; $scope._NGM47_S = "9";
                $scope._CH48_S = true; $scope._NGM48_S = "9";
                $scope._CH49_S = true; $scope._CH49 = true; $scope._NGM49_N = 0; $scope._NGM49_S = "0";
                $scope._CH50_S = true; $scope._CH50 = true; $scope._NGM50_N = 0; $scope._NGM50_S = "99";
                $scope._CH51_S = true; $scope._NGM51_S = "9";
                $scope._CH511_S = true; $scope._CH511 = true; $scope._NGM511_F = ""; $scope._NGM511_S = "1845-01-01";
                $scope._CH512_S = true; $scope._NGM512_S = "99";
                $scope._CH513_S = true; $scope._CH513 = true; $scope._NGM513_T = ""; $scope._NGM513_S = "9";
                $scope._CH514_S = true; $scope._CH514 = true; $scope._NGM514_T = ""; $scope._NGM514_S = "9";
                $scope._CH515_S = true; $scope._CH515 = true; $scope._NGM515_T = ""; $scope._NGM515_S = "9";
                $scope._CH516_S = true; $scope._CH516 = true; $scope._NGM516_T = ""; $scope._NGM516_S = "9";
                $scope._CH517_S = true; $scope._NGM517_S = "9";
                $scope._CH518_S = true; $scope._CH518 = true; $scope._NGM518_N = 0; $scope._NGM518_S = "99";
                $scope._CH521_S = true; $scope._NGM521_S = "9";
                $scope._CH522_S = true; $scope._NGM522_S = "9";
                $scope._CH523_S = true; $scope._NGM523_S = "9";
                $scope._CH524_S = true; $scope._NGM524_S = "9";
                $scope._CH525_S = true; $scope._NGM525_S = "9";
                $scope._CH526_S = true; $scope._NGM526_S = "9";
                $scope._CH527_S = true; $scope._NGM527_S = "9";
                $scope._CH528_S = true; $scope._NGM528_S = "9";
                $scope._CH529_S = true; $scope._NGM529_S = "9";
                $scope._CH5210_S = true; $scope._NGM5210_S = "9";
                $scope._CH5211_S = true; $scope._NGM5211_S = "9";
                $scope._CH5212_S = true; $scope._NGM5212_S = "9";
                $scope._CH5213_S = true; $scope._NGM5213_S = "9";
                $scope._CH5214_S = true; $scope._NGM5214_S = "9";
                $scope._CH5215_S = true; $scope._NGM5215_S = "9";
                $scope._CH5216_S = true; $scope._NGM5216_S = "9";
                $scope._CH5217_S = true; $scope._NGM5217_S = "9";
                $scope._CH5218_S = true; $scope._NGM5218_S = "9";
                $scope._CH5219_S = true; $scope._NGM5219_S = "9";
                $scope._CH5220_S = true; $scope._NGM5220_S = "9";
                $scope._CH5221_S = true; $scope._NGM5221_S = "9";
                $scope._CH5222_S = true; $scope._NGM5222_S = "9";
                $scope._CH531_S = true; $scope._NGM531_F = ""; $scope._NGM531_S = "1845-01-01";
                $scope._CH533_S = true; $scope._NGM533_S = "7";
                $scope._CH534_S = true; $scope._NGM534_S = "9";
                $scope._CH54_S = true; $scope._CH54 = true; $scope._NGM54_F = ""; $scope._NGM54_S = "1845-01-01";
                $scope._CH55_S = true; $scope._NGM55_S = "9";
                $scope._CH56_S = true; $scope._CH56 = true; $scope._NGM56_F = ""; $scope._NGM56_S = "1845-01-01";
                $scope._CH561_S = true; $scope._CH561 = true; $scope._NGM561_N = 0; $scope._NGM561_S = "999";
                $scope._CH57_S = true; $scope._CH57 = true; $scope._NGM57_F = ""; $scope._NGM57_S = "1845-01-01";
                $scope._CH571_S = true; $scope._CH571 = true; $scope._NGM571_N = 0; $scope._NGM571_S = "9999";
                $scope._CH58_S = true; $scope._CH58 = true; $scope._NGM58_F = ""; $scope._NGM58_S = "1845-01-01";
                $scope._CH581_S = true; $scope._CH581 = true; $scope._NGM581_N = 0; $scope._NGM581_S = "9999";
                $scope._CH59_S = true; $scope._CH59 = true; $scope._NGM59_F = ""; $scope._NGM59_S = "1845-01-01";
                $scope._CH591_S = true; $scope._CH591 = true; $scope._NGM591_N = 0; $scope._NGM591_S = "9999";
                $scope._CH60_S = true; $scope._CH60 = true; $scope._NGM60_F = ""; $scope._NGM60_S = "1845-01-01";
                $scope._CH601_S = true; $scope._CH601 = true; $scope._NGM601_N = 0; $scope._NGM601_S = "9999";
                $scope._CH61_S = true; $scope._CH61 = true; $scope._NGM61_F = ""; $scope._NGM61_S = "1845-01-01";
                $scope._CH611_S = true; $scope._CH611 = true; $scope._NGM611_N = 0; $scope._NGM611_S = "9999";
                $scope._CH62_S = true; $scope._CH62 = true; $scope._NGM62_F = ""; $scope._NGM62_S = "1845-01-01";
                $scope._CH621_S = true; $scope._CH621 = true; $scope._NGM621_N = 0; $scope._NGM621_S = "999";
                $scope._CH64_S = true; $scope._NGM64_S = "9";
                $scope._CH65_S = true; $scope._NGM65_S = "9";
                $scope._CH66_S = true; $scope._NGM66_S = "9";
                $scope._CH67_S = true; $scope._NGM67_S = "9";
                $scope._CH68_S = true; $scope._NGM68_S = "9";
                $scope._CH681_S = true; $scope._NGM681_S = "9";
                $scope._CH682_S = true; $scope._NGM682_S = "9";
                $scope._CH683_S = true; $scope._CH683 = true; $scope._NGM683_F = ""; $scope._NGM683_S = "1845-01-01";
                $scope._CH684_S = true; $scope._CH684 = true; $scope._NGM684_N = 0; $scope._NGM684_S = "9";
                $scope._CH685_S = true; $scope._CH685 = true; $scope._NGM685_N = 0; $scope._NGM685_S = "9";
                $scope._CH686_S = true; $scope._CH686 = true; $scope._NGM686_N = 0; $scope._NGM686_S = "9";
                $scope._CH687_S = true; $scope._CH687 = true; $scope._NGM687_N = 0; $scope._NGM687_S = "9";
                $scope._CH688_S = true; $scope._CH688 = true; $scope._NGM688_N = 0; $scope._NGM688_S = "9";
                $scope._CH689_S = true; $scope._CH689 = true; $scope._NGM689_N = 0; $scope._NGM689_S = "9";
                $scope._CH6810_S = true; $scope._CH6810 = true; $scope._NGM6810_N = 0; $scope._NGM6810_S = "9";
                $scope._CH6811_S = true; $scope._CH6811 = true; $scope._NGM6811_N = 0; $scope._NGM6811_S = "9";
                $scope._CH6812_S = true; $scope._CH6812 = true; $scope._NGM6812_N = 0; $scope._NGM6812_S = "9";
                $scope._CH6813_S = true; $scope._CH6813 = true; $scope._NGM6813_F = ""; $scope._NGM6813_S = "1845-01-01";
                $scope._CH6814_S = true; $scope._NGM6814_S = "9";
                $scope._CH69_S = true; $scope._NGM69_S = "9";
                $scope._CH70_S = true; $scope._NGM70_S = "9";
                $scope._CH71_S = true; $scope._NGM71_S = "9";
                $scope._CH72_S = true; $scope._NGM72_S = "9";
                $scope._CH73_S = true; $scope._NGM73_S = "9";
                $scope._CH74_S = true; $scope._NGM74_S = "9";
                $scope._CH75_S = true; $scope._CH75 = true; $scope._NGM75_F = ""; $scope._NGM75_S = "1845-01-01";
                $scope._CH751_S = true; $scope._CH751 = true; $scope._NGM751_N = 0; $scope._NGM751_S = "9999";
                $scope._CH76_S = true; $scope._CH76 = true; $scope._NGM76_F = ""; $scope._NGM76_S = "1845-01-01";
                $scope._CH761_S = true; $scope._CH761 = true; $scope._NGM761_N = 0; $scope._NGM761_S = "99999999";
                $scope._CH77_S = true; $scope._NGM77_S = "9";
                $scope._CH771_S = true; $scope._CH771 = true; $scope._NGM771_F = ""; $scope._NGM771_S = "1845-01-01";
                $scope._CH772_S = true; $scope._CH772 = true; $scope._NGM772_N = 0; $scope._NGM772_S = "99";
                $scope._CH773_S = true; $scope._CH773 = true; $scope._NGM773_N = 0; $scope._NGM773_S = "99";
                $scope._CH774_S = true; $scope._CH774 = true; $scope._NGM774_N = 0; $scope._NGM774_S = "99";
                $scope._CH775_S = true; $scope._CH775 = true; $scope._NGM775_N = 0; $scope._NGM775_S = "99";
                $scope._CH776_S = true; $scope._CH776 = true; $scope._NGM776_N = 0; $scope._NGM776_S = "99";
                $scope._CH777_S = true; $scope._CH777 = true; $scope._NGM777_N = 0; $scope._NGM777_S = "99";
                $scope._CH778_S = true; $scope._CH778 = true; $scope._NGM778_N = 0; $scope._NGM778_S = "99";
                $scope._CH78_S = true; $scope._CH78 = true; $scope._NGM78_N = 0; $scope._NGM78_S = "999";
                $scope._CH79_S = true; $scope._NGM79_S = "9";
                $scope._CH80_S = true; $scope._NGM80_S = "9";
                $scope._CH81_S = true; $scope._NGM81_S = "9";
                $scope._CH82_S = true; $scope._NGM82_S = "9";
                $scope._CH83_S = true; $scope._NGM83_S = "9";
                $scope._CH84_S = true; $scope._NGM84_S = "9";
                $scope._CH85_S = true; $scope._NGM85_S = "9";
                $scope._CH86_S = true; $scope._NGM86_S = "9";
                $scope._CH861_S = true; $scope._NGM861_S = "9";
                $scope._CH87_S = true; $scope._NGM87_S = "9";
                $scope._CH88_S = true; $scope._NGM88_S = "9";
                $scope._CH89_S = true; $scope._NGM89_S = "9";
                $scope._CH90_S = true; $scope._CH90 = true; $scope._NGM90_T = ""; $scope._NGM90_S = "99";
                $scope._CH91_S = true; $scope._NGM91_S = "9";
                $scope._CH92_S = true; $scope._NGM92_S = "9";
                $scope._CH93_S = true; $scope._NGM93_S = "9";
                $scope._CH94_S = true; $scope._NGM94_N = 0;
                $scope._CH95_S = true; $scope._NGM95_N = 0;
                $scope._CH96_S = true; $scope._NGM96_N = 0;
            }
            $scope.unset_168Vars_2 = function () {
                $scope._CH19_S = false; $scope._CH19 = false; $scope._NGM19_F = ""; $scope._NGM19_S = "";
                $scope._CH20_S = false; $scope._CH20 = false; $scope._NGM20_F = ""; $scope._NGM20_S = "";
                $scope._CH21_S = false; $scope._CH21 = false; $scope._NGM21_F = ""; $scope._NGM21_S = "";
                $scope._CH22_S = false; $scope._CH22 = false; $scope._NGM22_F = ""; $scope._NGM22_S = "";
                $scope._CH23_S = false; $scope._CH23 = false; $scope._NGM23_F = ""; $scope._NGM23_S = "";
                $scope._CH24_S = false; $scope._NGM24_S = "";
                $scope._CH241_S = false; $scope._CH241 = false; $scope._NGM241_N = 2; $scope._NGM241_S = "";
                $scope._CH242_S = false; $scope._NGM242_S = "";
                $scope._CH243_S = false; $scope._CH243 = false; $scope._NGM243_N = 2; $scope._NGM243_S = "";
                $scope._CH244_S = false; $scope._NGM244_S = "";
                $scope._CH245_S = false; $scope._NGM245_S = "";
                $scope._CH246_S = false; $scope._CH246 = false; $scope._NGM246_F = ""; $scope._NGM246_S = "";
                $scope._CH247_S = false; $scope._NGM247_S = "";
                $scope._CH248_S = false; $scope._NGM248_S = "";
                $scope._CH249_S = false; $scope._CH249 = false; $scope._NGM249_N = 0; $scope._NGM249_S = "";
                $scope._CH25_S = false; $scope._NGM25_S = "";
                $scope._CH251_S = false; $scope._CH251 = false; $scope._NGM251_N = 0; $scope._NGM251_S = "";
                $scope._CH252_S = false; $scope._NGM252_S = "";
                $scope._CH26_S = false; $scope._NGM26_S = "";
                $scope._CH27_S = false; $scope._NGM27_S = "";
                $scope._CH28_S = false; $scope._CH28 = false; $scope._NGM28_F = ""; $scope._NGM28_S = "";
                $scope._CH281_S = false; $scope._CH281 = false; $scope._NGM281_N = 0; $scope._NGM281_S = "";
                $scope._CH29_S = false; $scope._CH29 = false; $scope._NGM29_F = ""; $scope._NGM29_S = "";
                $scope._CH291_S = false; $scope._CH291 = false; $scope._NGM291_N = 0; $scope._NGM291_S = "";
                $scope._CH30_S = false; $scope._CH30 = false; $scope._NGM30_F = ""; $scope._NGM30_S = "";
                $scope._CH301_S = false; $scope._CH301 = false; $scope._NGM301_N = 0; $scope._NGM301_S = "";
                $scope._CH31_S = false; $scope._NGM31_S = "";
                //
                $scope._CH32_S = false; $scope._CH32 = false; $scope._NGM32_F = ""; $scope._NGM32_S = "";
                $scope._CH33_S = false; $scope._CH33 = false; $scope._NGM33_F = ""; $scope._NGM33_S = "";
                $scope._CH34_S = false; $scope._CH34 = false; $scope._NGM34_F = ""; $scope._NGM34_S = "";
                $scope._CH35_S = false; $scope._NGM35_S = "";
                $scope._CH36_S = false; $scope._CH36 = false; $scope._NGM36_F = ""; $scope._NGM36_S = "";
                $scope._CH361_S = false; $scope._NGM361_S = "";
                $scope._CH362_S = false; $scope._CH362 = false; $scope._NGM362_N = 0; $scope._NGM362_S = "";
                $scope._CH37_S = false; $scope._CH37_S = false; $scope._CH37 = false; $scope._NGM37_F = ""; $scope._NGM37_S = "";
                $scope._CH38_S = false; $scope._CH38_S = false; $scope._NGM38_S = "";
                $scope._CH39_S = false; $scope._NGM39_S = "";
                $scope._CH40_S = false; $scope._NGM40_S = "";
                $scope._CH401_S = false; $scope._CH401 = false; $scope._NGM401_N = 0; $scope._NGM401_S = "";
                $scope._CH41_S = false; $scope._NGM41_S = "";
                $scope._CH411_S = false; $scope._CH411 = false; $scope._NGM411_N = 0; $scope._NGM411_S = "";
                $scope._CH42_S = false; $scope._CH42 = false; $scope._NGM42_F = ""; $scope._NGM42_S = "";
                $scope._CH421_S = false; $scope._CH421 = false; $scope._NGM421_N = 0; $scope._NGM421_S = "";
                $scope._CH422_S = false; $scope._CH422 = false; $scope._NGM422_N = 0; $scope._NGM422_S = "";
                $scope._CH423_S = false; $scope._CH423 = false; $scope._NGM423_N = 0; $scope._NGM423_S = "";
                $scope._CH424_S = false; $scope._CH424 = false; $scope._NGM424_N = 0; $scope._NGM424_S = "";
                $scope._CH425_S = false; $scope._CH425 = false; $scope._NGM425_N = 0; $scope._NGM425_S = "";
                $scope._CH43_S = false; $scope._NGM43_S = "";
                $scope._CH431_S = false; $scope._CH431 = false; $scope._NGM431_N = 0; $scope._NGM431_S = "";
                $scope._CH44_S = false; $scope._NGM44_S = "";
                $scope._CH441_S = false; $scope._CH441 = false; $scope._NGM441_N = 0; $scope._NGM441_S = "";
                $scope._CH45_S = false; $scope._NGM45_S = "";
                $scope._CH46_S = false; $scope._NGM46_S = "";
                $scope._CH47_S = false; $scope._NGM47_S = "";
                $scope._CH48_S = false; $scope._NGM48_S = "";
                $scope._CH49_S = false; $scope._CH49 = false; $scope._NGM49_N = 0; $scope._NGM49_S = "";
                $scope._CH50_S = false; $scope._CH50 = false; $scope._NGM50_N = 0; $scope._NGM50_S = "";
                $scope._CH51_S = false; $scope._NGM51_S = "";
                $scope._CH511_S = false; $scope._CH511 = false; $scope._NGM511_F = ""; $scope._NGM511_S = "";
                $scope._CH512_S = false; $scope._NGM512_S = "";
                $scope._CH513_S = false; $scope._CH513 = false; $scope._NGM513_T = ""; $scope._NGM513_S = "";
                $scope._CH514_S = false; $scope._CH514 = false; $scope._NGM514_T = ""; $scope._NGM514_S = "";
                $scope._CH515_S = false; $scope._CH515 = false; $scope._NGM515_T = ""; $scope._NGM515_S = "";
                $scope._CH516_S = false; $scope._CH516 = false; $scope._NGM516_T = ""; $scope._NGM516_S = "";
                $scope._CH517_S = false; $scope._NGM517_S = "";
                $scope._CH518_S = false; $scope._CH518 = false; $scope._NGM518_N = 0; $scope._NGM518_S = "";
                $scope._CH521_S = false; $scope._NGM521_S = "";
                $scope._CH522_S = false; $scope._NGM522_S = "";
                $scope._CH523_S = false; $scope._NGM523_S = "";
                $scope._CH524_S = false; $scope._NGM524_S = "";
                $scope._CH525_S = false; $scope._NGM525_S = "";
                $scope._CH526_S = false; $scope._NGM526_S = "";
                $scope._CH527_S = false; $scope._NGM527_S = "";
                $scope._CH528_S = false; $scope._NGM528_S = "";
                $scope._CH529_S = false; $scope._NGM529_S = "";
                $scope._CH5210_S = false; $scope._NGM5210_S = "";
                $scope._CH5211_S = false; $scope._NGM5211_S = "";
                $scope._CH5212_S = false; $scope._NGM5212_S = "";
                $scope._CH5213_S = false; $scope._NGM5213_S = "";
                $scope._CH5214_S = false; $scope._NGM5214_S = "";
                $scope._CH5215_S = false; $scope._NGM5215_S = "";
                $scope._CH5216_S = false; $scope._NGM5216_S = "";
                $scope._CH5217_S = false; $scope._NGM5217_S = "";
                $scope._CH5218_S = false; $scope._NGM5218_S = "";
                $scope._CH5219_S = false; $scope._NGM5219_S = "";
                $scope._CH5220_S = false; $scope._NGM5220_S = "";
                $scope._CH5221_S = false; $scope._NGM5221_S = "";
                $scope._CH5222_S = false; $scope._NGM5222_S = "";
                $scope._CH531_S = false; $scope._CH531 = false; $scope._NGM531_F = ""; $scope._NGM531_S = "";
                $scope._CH533_S = false; $scope._NGM533_S = "";
                $scope._CH534_S = false; $scope._NGM534_S = "";
                $scope._CH54_S = false; $scope._CH54 = false; $scope._NGM54_F = ""; $scope._NGM54_S = "";
                $scope._CH55_S = false; $scope._NGM55_S = "";
                $scope._CH56_S = false; $scope._CH56 = false; $scope._NGM56_F = ""; $scope._NGM56_S = "";
                $scope._CH561_S = false; $scope._CH561 = false; $scope._NGM561_N = 0; $scope._NGM561_S = "";
                $scope._CH57_S = false; $scope._CH57 = false; $scope._NGM57_F = ""; $scope._NGM57_S = "";
                $scope._CH571_S = false; $scope._CH571 = false; $scope._NGM571_N = 0; $scope._NGM571_S = "";
                $scope._CH58_S = false; $scope._CH58 = false; $scope._NGM58_F = ""; $scope._NGM58_S = "";
                $scope._CH581_S = false; $scope._CH581 = false; $scope._NGM581_N = 0; $scope._NGM581_S = "";
                $scope._CH59_S = false; $scope._CH59 = false; $scope._NGM59_F = ""; $scope._NGM59_S = "";
                $scope._CH591_S = false; $scope._CH591 = false; $scope._NGM591_N = 0; $scope._NGM591_S = "";
                $scope._CH60_S = false; $scope._CH60 = false; $scope._NGM60_F = ""; $scope._NGM60_S = "";
                $scope._CH601_S = false; $scope._CH601 = false; $scope._NGM601_N = 0; $scope._NGM601_S = "";
                $scope._CH61_S = false; $scope._CH61 = false; $scope._NGM61_F = ""; $scope._NGM61_S = "";
                $scope._CH611_S = false; $scope._CH611 = false; $scope._NGM611_N = 0; $scope._NGM611_S = "";
                $scope._CH62_S = false; $scope._CH62 = false; $scope._NGM62_F = ""; $scope._NGM62_S = "";
                $scope._CH621_S = false; $scope._CH621 = false; $scope._NGM621_N = 0; $scope._NGM621_S = "";
                $scope._CH64_S = false; $scope._NGM64_S = "";
                $scope._CH65_S = false; $scope._NGM65_S = "";
                $scope._CH66_S = false; $scope._NGM66_S = "";
                $scope._CH67_S = false; $scope._NGM67_S = "";
                $scope._CH68_S = false; $scope._NGM68_S = "";
                $scope._CH681_S = false; $scope._NGM681_S = "";
                $scope._CH682_S = false; $scope._NGM682_S = "";
                $scope._CH683_S = false; $scope._CH683 = false; $scope._NGM683_F = ""; $scope._NGM683_S = "";
                $scope._CH684_S = false; $scope._CH684 = false; $scope._NGM684_N = 0; $scope._NGM684_S = "";
                $scope._CH685_S = false; $scope._CH685 = false; $scope._NGM685_N = 0; $scope._NGM685_S = "";
                $scope._CH686_S = false; $scope._CH686 = false; $scope._NGM686_N = 0; $scope._NGM686_S = "";
                $scope._CH687_S = false; $scope._CH687 = false; $scope._NGM687_N = 0; $scope._NGM687_S = "";
                $scope._CH688_S = false; $scope._CH688 = false; $scope._NGM688_N = 0; $scope._NGM688_S = "";
                $scope._CH689_S = false; $scope._CH689 = false; $scope._NGM689_N = 0; $scope._NGM689_S = "";
                $scope._CH6810_S = false; $scope._CH6810_S = false; $scope._CH6810 = false; $scope._NGM6810_N = 0; $scope._NGM6810_S = "";
                $scope._CH6811_S = false; $scope._CH6811_S = false; $scope._CH6811 = false; $scope._NGM6811_N = 0; $scope._NGM6811_S = "";
                $scope._CH6812_S = false; $scope._CH6812_S = false; $scope._CH6812 = false; $scope._NGM6812_N = 0; $scope._NGM6812_S = "";
                $scope._CH6813_S = false; $scope._CH6813 = false; $scope._NGM6813_F = ""; $scope._NGM6813_S = "";
                $scope._CH6814_S = false; $scope._NGM6814_S = "";
                $scope._CH69_S = false; $scope._NGM69_S = "";
                $scope._CH70_S = false; $scope._NGM70_S = "";
                $scope._CH71_S = false; $scope._NGM71_S = "";
                $scope._CH72_S = false; $scope._NGM72_S = "";
                $scope._CH73_S = false; $scope._NGM73_S = "";
                $scope._CH74_S = false; $scope._NGM74_S = "";
                $scope._CH75_S = false; $scope._CH75 = false; $scope._NGM75_F = ""; $scope._NGM75_S = "";
                $scope._CH751_S = false; $scope._CH751 = false; $scope._NGM751_N = 0; $scope._NGM751_S = "";
                $scope._CH76_S = false; $scope._CH76 = false; $scope._NGM76_F = ""; $scope._NGM76_S = "";
                $scope._CH761_S = false; $scope._CH761 = false; $scope._NGM761_N = 0; $scope._NGM761_S = "";
                $scope._CH77_S = false; $scope._NGM77_S = "";
                $scope._CH771_S = false; $scope._CH771 = false; $scope._NGM771_F = ""; $scope._NGM771_S = "";
                $scope._CH772_S = false; $scope._CH772 = false; $scope._NGM772_N = 0; $scope._NGM772_S = "";
                $scope._CH773_S = false; $scope._CH773 = false; $scope._NGM773_N = 0; $scope._NGM773_S = "";
                $scope._CH774_S = false; $scope._CH774 = false; $scope._NGM774_N = 0; $scope._NGM774_S = "";
                $scope._CH775_S = false; $scope._CH775 = false; $scope._NGM775_N = 0; $scope._NGM775_S = "";
                $scope._CH776_S = false; $scope._CH776 = false; $scope._NGM776_N = 0; $scope._NGM776_S = "";
                $scope._CH777_S = false; $scope._CH777 = false; $scope._NGM777_N = 0; $scope._NGM777_S = "";
                $scope._CH778_S = false; $scope._CH778 = false; $scope._NGM778_N = 0; $scope._NGM778_S = "";
                $scope._CH78_S = false; $scope._CH78 = false; $scope._NGM78_N = 0; $scope._NGM78_S = "";
                $scope._CH79_S = false; $scope._NGM79_S = "";
                $scope._CH80_S = false; $scope._NGM80_S = "";
                $scope._CH81_S = false; $scope._NGM81_S = "";
                $scope._CH82_S = false; $scope._NGM82_S = "";
                $scope._CH83_S = false; $scope._NGM83_S = "";
                $scope._CH84_S = false; $scope._NGM84_S = "";
                $scope._CH85_S = false; $scope._NGM85_S = "";
                $scope._CH86_S = false; $scope._NGM86_S = "";
                $scope._CH861_S = false; $scope._NGM861_S = "";
                $scope._CH87_S = false; $scope._NGM87_S = "";
                $scope._CH88_S = false; $scope._NGM88_S = "";
                $scope._CH89_S = false; $scope._NGM89_S = "";
                $scope._CH90_S = false; $scope._CH90 = false; $scope._NGM90_T = ""; $scope._NGM90_S = "";
                $scope._CH91_S = false; $scope._NGM91_S = "";
                $scope._CH92_S = false; $scope._NGM92_S = "";
                $scope._CH93_S = false; $scope._NGM93_S = "";
                $scope._CH94_S = false; $scope._NGM94_N = 0;
                $scope._CH95_S = false; $scope._NGM95_N = 0;
                $scope._CH95_S = false; $scope._NGM96_N = 0;
            }

            $scope.set_20Vars_2 = function () {
                $scope._CH32_S = true; $scope._CH32 = true; $scope._NGM32_F = ""; $scope._NGM32_S = "1845-01-01";
                $scope._CH33_S = true; $scope._CH33 = true; $scope._NGM33_F = ""; $scope._NGM33_S = "1845-01-01";
                $scope._CH68_S = true; $scope._NGM68_S = "0";
                $scope._CH681_S = true; $scope._NGM681_S = "5";
                $scope._CH682_S = true; $scope._NGM682_S = "8";
                $scope._CH683_S = true; $scope._CH683 = true; $scope._NGM683_F = ""; $scope._NGM683_S = "1799-01-01";
                $scope._CH684_S = true; $scope._CH684 = true; $scope._NGM684_N = 0; $scope._NGM684_S = "9";
                $scope._CH685_S = true; $scope._CH685 = true; $scope._NGM685_N = 0; $scope._NGM685_S = "9";
                $scope._CH686_S = true; $scope._CH686 = true; $scope._NGM686_N = 0; $scope._NGM686_S = "9";
                $scope._CH687_S = true; $scope._CH687 = true; $scope._NGM687_N = 0; $scope._NGM687_S = "9";
                $scope._CH688_S = true; $scope._CH688 = true; $scope._NGM688_N = 0; $scope._NGM688_S = "9";
                $scope._CH689_S = true; $scope._CH689 = true; $scope._NGM689_N = 0; $scope._NGM689_S = "9";
                $scope._CH6810_S = true; $scope._CH6810 = true; $scope._NGM6810_N = 0; $scope._NGM6810_S = "9";
                $scope._CH6811_S = true; $scope._CH6811 = true; $scope._NGM6811_N = 0; $scope._NGM6811_S = "9";
                $scope._CH6812_S = true; $scope._CH6812 = true; $scope._NGM6812_N = 0; $scope._NGM6812_S = "9";
                $scope._CH6813_S = true; $scope._CH6813 = true; $scope._NGM6813_F = ""; $scope._NGM6813_S = "1799-01-01";
                $scope._CH6814_S = true; $scope._NGM6814_S = "10";
            }
            $scope.unset_20Vars_2 = function () {
                $scope._CH32_S = false; $scope._CH32 = false; $scope._NGM32_F = ""; $scope._NGM32_S = "";
                $scope._CH33_S = false; $scope._CH33 = false; $scope._NGM33_F = ""; $scope._NGM33_S = "";
                $scope._CH68_S = false; $scope._NGM68_S = "";
                $scope._CH681_S = false; $scope._NGM681_S = "";
                $scope._CH682_S = false; $scope._NGM682_S = "";
                $scope._CH683_S = false; $scope._CH683 = false; $scope._NGM683_F = ""; $scope._NGM683_S = "";
                $scope._CH684_S = false; $scope._CH684 = false; $scope._NGM684_N = 0; $scope._NGM684_S = "";
                $scope._CH685_S = false; $scope._CH685 = false; $scope._NGM685_N = 0; $scope._NGM685_S = "";
                $scope._CH686_S = false; $scope._CH686 = false; $scope._NGM686_N = 0; $scope._NGM686_S = "";
                $scope._CH687_S = false; $scope._CH687 = false; $scope._NGM687_N = 0; $scope._NGM687_S = "";
                $scope._CH688_S = false; $scope._CH688 = false; $scope._NGM688_N = 0; $scope._NGM688_S = "";
                $scope._CH689_S = false; $scope._CH689 = false; $scope._NGM689_N = 0; $scope._NGM689_S = "";
                $scope._CH6810_S = false; $scope._CH6810 = false; $scope._NGM6810_N = 0; $scope._NGM6810_S = "";
                $scope._CH6811_S = false; $scope._CH6811 = false; $scope._NGM6811_N = 0; $scope._NGM6811_S = "";
                $scope._CH6812_S = false; $scope._CH6812 = false; $scope._NGM6812_N = 0; $scope._NGM6812_S = "";
                $scope._CH6813_S = false; $scope._CH6813 = false; $scope._NGM6813_F = ""; $scope._NGM6813_S = "";
                $scope._CH6814_S = false; $scope._NGM6814_S = "";
            }
        }])

