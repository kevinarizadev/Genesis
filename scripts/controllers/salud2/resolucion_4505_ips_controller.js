'use strict';
angular.module('GenesisApp').controller('resolucion_4505_ips_controller', ['$scope', '$http', function ($scope, $http) {
    $scope.prestador = 0;
    $http({
        method: 'POST',
        url: "php/salud/resolucion_4505.php",
        data: {
            function: 'obtener_cod_habilitacion',
            nit: sessionStorage.getItem("nit")
        }
    }).then(function (response) {
        $scope.prestador = response.data;
    });
    $scope.trimestre = "";
    $scope.trimestre_visual = 2;
    $scope.input_data_default = { reporte: "", validate: [{ size: 3, ext: ".txt" }] };
    $scope.CurrentDate = new Date();
    $scope.year = $scope.CurrentDate.getFullYear();
    $scope.historal_cargue = new Array();
    $scope.yearNext = function () {
        $scope.year++;
    }
    $scope.yearPrev = function () {
        $scope.year--;
    }
    $scope.select_trimestre = function (trimestre) {
        switch (trimestre) {
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;
            case 4:

                break;

            default:
                break;
        }
        if ($scope.prestador != 0 && $scope.prestador.length == 10) {
            swal({
                html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando.</p>',
                width: 200,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                animation: false
              });
            $http({
                method: 'POST',
                url: "php/salud/resolucion_4505.php",
                data: {
                    function: 'historial_cargue',
                    trimestre: trimestre.toString(),
                    ano: $scope.year.toString(),
                    prestador: $scope.prestador.toString()
                }
            }).then(function (response) {
                swal.close();
                console.log(response.data);
                $scope.historal_cargue = response.data;
            });
        }
        if (trimestre == $scope.trimestre_visual) {
            setTimeout(() => {
                $scope.limpiar_input_ng_file("reporte");
            }, 100);
        }
    }
    // file
    $scope.limpiar_input_ng_file = function (id) {
        if (id != undefined && id != null && id != "" && document.querySelector("#" + id) != undefined) {
            var input = document.querySelector("#" + id);
            $scope.input_data_default[id] = "";
            input.value = "";
            input.parentElement.dataset.file = input.dataset.name_default;
        } else {
            console.log("Error con el input file id:" + id);
        }
    }
    $scope.obtener_base_64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function () { resolve(reader.result); };
            reader.onerror = function () { reject(file[0].name); };
            reader.readAsDataURL(file[0]);
        });
    }
    $scope.obtener_url_ftp = function (base64, name, ext, location = "") {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: "php/intranet/intranet_procesos.php",
                data: {
                    function: 'get_url_ftp',
                    base64: angular.toJson(base64),
                    name: name,
                    ext: ext,
                    location: location
                }
            }).then(function (response) {
                if (response.data != "0") {
                    resolve(response.data.url);
                } else {
                    reject(element.name);
                }
            });
        });
    }
    $scope.cargar_validar = function () {
        if ($scope.input_data_default.reporte.files != undefined && $scope.input_data_default.reporte.files != null && $scope.input_data_default.reporte.files.length > 0) {
            $scope.obtener_base_64($scope.input_data_default.reporte.files).then(function (base64) {
                var extencion = $scope.input_data_default.reporte.files[0].name.split(".");
                var name_file = "";
                if ($scope.input_data_default.reporte.files[0].name.lastIndexOf(".txt") != -1) {
                    name_file = $scope.input_data_default.reporte.files[0].name.substring(0, $scope.input_data_default.reporte.files[0].name.lastIndexOf(".txt"));
                } else {
                    name_file = $scope.input_data_default.reporte.files[0].name;
                }
                $scope.obtener_url_ftp(base64, name_file, extencion[extencion.length - 1], "resolucion_4505").then(function (url_ftp) {
                    console.log(url_ftp);
                    swal("Completado", "Archivo subido al FTP exitosamente url:" + url_ftp, "success");
                }).catch(reason_ftp => {
                    swal('Mensaje', 'No se pudo subir el archivo al servidor ftp: ' + reason_ftp, 'error');
                });
            }).catch(reason_b64 => {
                swal('Mensaje', 'No se pudo obtener el base64 del archivo: ' + reason_b64, 'error');
            });
        } else {
            swal('Mensaje', 'El archivo no se ha seleccionado', 'error');
        }
    }
}]);