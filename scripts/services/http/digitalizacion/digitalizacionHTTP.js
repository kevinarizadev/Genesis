'use strict';
/**
 * @ngdoc service
 * @name GenesisApp.service:digitalizacionHTTP
 * @description
 * # servicio http para el llamado al web services con todos los procedimientos
 * para la digitalizacion.
 */
angular.module('GenesisApp')
    .service('digitalizacionHTTP', function ($http, $q, cfpLoadingBar) {
        return ({
            cantidadXdpto: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenercantidadXdpto' }
                });
                return (request.then(handleSuccess, handleError));
            },
            cantidadXmun: function (ubi) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: {
                        function: 'obtenercantidadXmunicpio',
                        ubicacion: ubi
                    }
                });
                return (request.then(handleSuccess, handleError));
            },
            deptoXtipo: function (tipo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerdptoXtipo', tipo: tipo }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerdptoXGrupo: function (grupo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerdptoXGrupo', grupo: grupo }
                });
                return (request.then(handleSuccess, handleError));
            },

            munXtipo: function (dpto, tipo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenermunicipioXtipo', dpto: dpto, tipo: tipo }
                });
                return (request.then(handleSuccess, handleError));
            },
            munXgrupo: function (dpto, grupo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenermunicipioXGrupo', dpto: dpto, grupo: grupo }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenertipodocumental: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenertipodocumental' }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerprocesos: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerprocesos' }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerpaquetes: function (proceso) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerpaquetes', proceso: proceso }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerparametros: function (paquete, proceso) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerparametros', paquete: paquete, proceso: proceso }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerinforevision: function (tipo_busqueda, dpto, tipo_documento) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerinforevision', tipo_busqueda: tipo_busqueda, dpto: dpto, tipo_documento: tipo_documento }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerinforevision_antiguo: function (tipo_busqueda,tipo_documental) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerinforevision_antiguo', tipo_busqueda: tipo_busqueda,tipo_documental:tipo_documental }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenertipodocumentalpendiente: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenertipodocumentalpendiente' }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenertipodocumentalpendienteantiguo: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenertipodocumentalpendienteantiguo' }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenergrupopendiente: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenergrupopendiente' }
                });
                return (request.then(handleSuccess, handleError));
            },
            actualizaanexos: function (ruta, estado, comentario) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'actualizaanexos', ruta: ruta, estado: estado, comentario: comentario }
                });
                return (request.then(handleSuccess, handleError));
            },
            subirftp: function (data, tipo_documento, documento) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'subirftp_digital', data: data, tipo_documento: tipo_documento, documento: documento }
                });
                return (request.then(handleSuccess, handleError));
            },
            subirarchivos: function (tipo_documento, documento, paquete, rutas, cantidad) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: {
                        function: 'subirarchivos', tipo_documento: tipo_documento,
                        documento: documento,
                        paquete: paquete,
                        rutas: rutas,
                        cantidad: cantidad
                    }
                });
                return (request.then(handleSuccess, handleError));
            },
            subirftp_afiliacion: function (data, tipo_documento, documento) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { 
                        function: 'subirftp_afiliacion', 
                        data: data, 
                        tipo_documento: tipo_documento, 
                        documento: documento 
                    }
                });
                return (request.then(handleSuccess, handleError));
            },
            subirarchivos_afiliacion: function (tipo_documento, documento, paquete, rutas, cantidad) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: {
                        function: 'subirarchivos_afiliacion',
                        tipo_documento: tipo_documento,
                        documento: documento,
                        paquete: paquete,
                        rutas: rutas,
                        cantidad: cantidad
                    }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenerareas: function (cedula) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerareas', cedula: cedula }
                });
                return (request.then(handleSuccess, handleError));
            },
            listarrechazo: function (documento) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'listarrechazo', documento: documento }
                });
                return (request.then(handleSuccess, handleError));
            },
            obtenermodulos: function (codigo_area) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenermodulos', codigo_area: codigo_area }
                });
                return (request.then(handleSuccess, handleError));
            },
            crearprocesos: function (area, modulo, nombre, regimen) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'crearprocesos', area: area, modulo: modulo, nombre: nombre, regimen: regimen }
                });
                return (request.then(handleSuccess, handleError));
            },
            crearpaquete: function (codigo, nombre) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'crearpaquete', codigo: codigo, nombre: nombre }
                });
                return (request.then(handleSuccess, handleError));
            },
            creacionparametros: function (parametros, cantidad, responsable) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'creacionparametros', parametros: parametros, cantidad: cantidad, responsable: responsable }
                });
                return (request.then(handleSuccess, handleError));
            },
            eliminarprocesos: function (codigo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'eliminarprocesos', codigo: codigo }
                });
                return (request.then(handleSuccess, handleError));
            },
            eliminarpaquete: function (codigo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'eliminarpaquete', codigo: codigo }
                });
                return (request.then(handleSuccess, handleError));
            },
            eliminarparametro: function (codigopaquete, codigoparametro) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'eliminarparametro', codigopaquete: codigopaquete, codigoparametro: codigoparametro }
                });
                return (request.then(handleSuccess, handleError));
            },
            tipodocumentalcantidad: function (v_tipo) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'tipodocumentalcantidad', v_tipo: v_tipo }
                });
                return (request.then(handleSuccess, handleError));
            },
            tipodocumentalcantidadmun: function (v_tipo, v_dpto) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'tipodocumentalcantidadmun', v_tipo: v_tipo, v_dpto: v_dpto }
                });
                return (request.then(handleSuccess, handleError));
            },
            informe_cantidad_tipo_documental: function (fecha_inicial, fecha_final) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'informe_cantidad_tipo_documental', fecha_inicial: fecha_inicial, fecha_final: fecha_final }
                });
                return (request.then(handleSuccess, handleError));
            },
            informe_cantidad_estado_documental: function (fecha_inicial, fecha_final) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'informe_cantidad_estado_documental', fecha_inicial: fecha_inicial, fecha_final: fecha_final }
                });
                return (request.then(handleSuccess, handleError));
            },            
            informe_cantidad_funcionario: function (seccional,fecha_inicial, fecha_final,) {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'informe_cantidad_funcionario', seccional:seccional, fecha_inicial: fecha_inicial, fecha_final: fecha_final}
                });
                return (request.then(handleSuccess, handleError));
            },            
            obtener_seccionales: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtener_seccionales' }
                });
                return (request.then(handleSuccess, handleError));
            },
            cantidad_revision: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'cantidad_revision' }
                });
                return (request.then(handleSuccess, handleError));
            },
            listado_rechazo: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'obtenerlistadorechazo' }
                });
                return (request.then(handleSuccess, handleError));
            },
            tipo_documental_info: function () {
                var request = $http({
                    method: 'POST',
                    url: "php/digitalizacion/funcdigitalizacion.php",
                    data: { function: 'tipo_documental_info' }
                });
                return (request.then(handleSuccess, handleError));
            }
        });
        function handleSuccessPost(response) {
            return (response);
        }
        function handleSuccess(response) {
            return (response.data);
        }
        function handleError(error) {
            if (error == null) {
                return ($q.reject(error));
            } else if (error.errorMessage !== undefined) {
                return ($q.reject(error.errorMessage));
            } else {
                return ($q.reject(error.responseJSON.ExceptionMessage));
            }
        }
    });
