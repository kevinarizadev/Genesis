'use strict';
angular.module('GenesisApp')
    .controller('adminpqrController', ['$scope', '$timeout', 'pqrHttp', 'ngDialog', function ($scope, $timeout, pqrHttp, ngDialog, $rootScope) {
        //Objects

        $scope.dataValidate = {
            inactiveRv: false, inactiveOtrosEntes: false, inactiveSede: true
        }
        $scope.pqrDataSearch = {
            medioRecepcion: null,
            enteDeControl: null,
            codEnteControl: null,
            regimen: null,
            sede: null,
            codSede: null
        }
        $scope.filter_cod_motivo = "";
        $scope.filter_motivo = "";
        $scope.showMotivosBoolean = true;
        $scope.showResponsableBoolean = true;
        $scope.showResponsableMotivosBoolean = true;
        $scope.showTableCondicion = true;
        $scope.tempResponsable = null;
        $scope.tempMotivo = null;
        $scope.tabFilter = 'Motivo';
        $scope.sw = false;
        $scope.showMotivosResponsableBoolean = true;
        $scope.dresponsableseccional = null;
        $scope.tempSeccional = null;
        $scope.check_option = false;
        //Requests to the server


        pqrHttp.getSolicitud().then(function (response) {
            $scope.tipoSolicitud = response;
        })
        pqrHttp.getRiesgo().then(function (response) {
            $scope.rv = response;
        })
        pqrHttp.getMediosRecepcion().then(function (response) {
            $scope.mediosRecepcion = response;
        })
        pqrHttp.getOtrosEntesDeControl().then(function (response) {
            $scope.otrosEntesDeControl = response;
        })
        pqrHttp.getRadicacion().then(function (response) {
            $scope.tipoRadicacion = response;
        })
        pqrHttp.getRegimen().then(function (response) {
            $scope.regimen = response.Regimen;
        })
        pqrHttp.getSede().then(function (response) {
            $scope.sede = response.Sede;
        })


        //Funtions of the Selects
        $scope.changeMediosRecepcion = function (medio) {//Funcion para validar SelectOtrosEntes y opciones                 
            if (medio == '13') {
                $scope.dataValidate.inactiveOtrosEntes = false;
            } else {
                $scope.dataValidate.inactiveOtrosEntes = true;
                $scope.pqrDataSearch.codEnteControl = null;
                $scope.pqrDataSearch.enteDeControl = null;
                $scope.pqrDataSearch.sede = null;
                $scope.pqrDataSearch.codSede = null;
            }         
        }//Fin
        $scope.getEnte = function (ente) {//Funcion para obtener el ente de control y la sede                       
            if (ente) {
                $scope.pqrDataSearch.codEnteControl = JSON.parse(ente).CODIGO;
                $scope.getSedeS(JSON.parse(ente).SEDE);
            } else {

            }
        }//Fin 

        $scope.getSedeS = function (sede) {
            console.log(sede);
            $scope.pqrDataSearch.codSede = sede;       
        }


        $scope.clearForm = function () {
            $scope.dataValidate.inactiveOtrosEntes = false;
            $scope.pqrDataSearch.codEnteControl = null;
            $scope.pqrDataSearch.enteDeControl = null;
            $scope.pqrDataSearch.sede = null;
            $scope.pqrDataSearch.codSede = null;
            $scope.showTableCondicion = true;
            $scope.pqrDataSearch.medioRecepcion = null;
            $scope.pqrDataSearch.sede = null;
            $scope.pqrDataSearch.rv = null;
            $scope.pqrDataSearch.enteDeControl = null;
            $scope.pqrDataSearch.regimen = null;
        }

        $scope.getParametro = function () {
            if ($scope.pqrDataSearch.rv == undefined || $scope.pqrDataSearch.rv == '') {
                $scope.pqrDataSearch.rv = 'N';
            }

            $scope.pqrDataSearch.codEnteControl = $scope.pqrDataSearch.codEnteControl ? $scope.pqrDataSearch.codEnteControl : '0';
            pqrHttp.postObtenerParametro($scope.pqrDataSearch.rv, $scope.pqrDataSearch.regimen, $scope.pqrDataSearch.codSede,
                $scope.pqrDataSearch.codEnteControl, $scope.pqrDataSearch.medioRecepcion).then(
                    function (response) {
                        $scope.parametro = response.data;
                        if ($scope.parametro.length == 0) {
                            $scope.showTableCondicion = true;
                            swal(
                                {
                                    type: 'error',
                                    title: 'Codición',
                                    text: 'No parametrizada!'
                                }
                            ).catch(swal.noop);
                            $scope.sw = false;

                        } else {
                            $scope.showTableCondicion = false;
                            $scope.sw = false;
                            $scope.showResponsables();
                        }

                        $scope.showMotivosBoolean = true;
                        $scope.showResponsableBoolean = true;
                        $scope.showResponsableMotivosBoolean = true;
                        $scope.showMotivosResponsableBoolean = true;
                        $scope.indexRes = null;
                        $scope.seccionales = true;
                    })
        }//Fin


        $scope.showMotivos = function (codigo) {
            pqrHttp.postObtenerMotivos(codigo).then(
                function (response) {
                    $scope.resMotivosResponsables = response.data;
                    $scope.showMotivosBoolean = false;
                    $scope.sw = true;


                })
        }//Fin


        $scope.showResponsables = function () {
            pqrHttp.postObtenerResponsablesMotivos($scope.parametro[0].CODIGO).then(function (response) {
               $scope.responsableMotivos = response.data;
                $scope.showResponsableMotivosBoolean = false;
            })
        }

        $scope.getMotivo = function (mot) {
            $scope.tempMotivo = mot;
        }
        $scope.seccionales = true;
        $scope.showResponsable = function (res, mot) {
            $scope.tempMotivo = mot;
            $('#M' + mot).addClass('arr');
            $('#M' + mot).siblings().removeClass('arr');
            pqrHttp.postObteneResponsable(res).then(function (response) {
                $scope.dresponsable = response.data;
                if (response.data[0]) {
                    $scope.tempResponsable = response.data[0].documento;
                }
                if ($scope.dresponsable.length == 0) {
                    swal('Responsable', 'Este motivo especifico esta relacionado con una seccional', 'success').catch(swal.noop);
                    $scope.showResponsableBoolean = true;
                    $scope.seccionales = false;
                    $scope.getSeccionales();
                } else {
                    $scope.showResponsableBoolean = false;
                    $scope.seccionales = true;
                }
            })
        }//Fin

        $scope.getSeccionales = function () {
            pqrHttp.postObtenerResponsablesSeccionales().then(function (response) {
                $scope.dresponsableseccional = response.data;
            })
        }
        $scope.showResponsableArea = function (res) {
            pqrHttp.postObteneResponsable(res).then(function (response) {
                $scope.dresponsable = response.data;
                if (response.data[0]) {
                    $scope.tempResponsable = response.data[0].documento;
                }

                if ($scope.dresponsable.length == 0) {
                    swal('Responsable', 'No hay reponsable para este Motivo especifico', 'error').catch(swal.noop);

                } else {

                }
                $scope.showResponsableBoolean = false;
            })
        }//Fin

        $scope.showMotivosReponsable = function (res, index) {
            $scope.tempResponsableM = res;
            if (index >= 0) {
                $scope.indexRes = index;
            }else{
                $scope.indexRes = -1;
            }
            pqrHttp.postObtenerMotivosResponsable(res, $scope.parametro[0].CODIGO).then(function (response) {
                $scope.motivosResponsables = response.data;
                if ($scope.motivosResponsables.length == 0) {
                    $scope.showMotivosResponsableBoolean = true;

                    swal('Motivos', 'No hay motivos para este responsable con este parametro', 'error').catch(swal.noop);

                } else {
                    $scope.showMotivosResponsableBoolean = false;
                }
            })

            $scope.showResponsables($scope.parametro[0].CODIGO);            
        }

        //Show modals
        $scope.indexRes = null;
        $scope.showUsers = function (origin, index, res) {//Abre el modal para seleccionar el motivo especifico                                           
            $timeout(function () {
                $scope.indexRes = index;
            }, 100)
            ngDialog.open({
                template: 'views/siau/admonpqrs/showUsersResponsable.html', className: 'ngdialog-theme-plain',
                controller: 'modalConfigResponsables', scope: $scope
            }).closePromise.then(function (data) {//Respuesta del valor seleccionado en modal de motivos especificos                
                if (data.value != '$closeButton' && data.value != '$escape' && data.value != '$document') {//Valida que el motivo especifico nunca se asigne vacio            
                    if (origin == 'responsableMotivo') {                     
                        $scope.dresponsable = data.value;
                    }
                    if (origin == 'responsableMotivos') {
                        var temp = {
                            area: data.value[0].area,
                            cargo: data.value[0].cargo,
                            documento: data.value[0].cedula,
                            nombre: data.value[0].nombre,
                            save: data.value[0].save
                        }
                        $scope.responsableMotivos[index] = temp;
                    }

                    if (origin == 'responsableSeccionales') {         
                        var temp = {
                            area: data.value[0].area,
                            cargo: data.value[0].cargo,
                            documento: data.value[0].cedula,
                            nombre: data.value[0].nombre,
                            seccional: data.value[0].seccional,
                            save: data.value[0].save
                        }
                        $scope.dresponsableseccional[index] = temp;
                    }


                }
            });

            if (origin == 'responsableSeccionales') {               
                $scope.tempSeccional = res.documento
            }

        }//Fin

        $scope.saveUser = function (r) {    
            swal({
                title: 'Confirmar Proceso',
                text: '¿Desea actualizar el responsable?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(function () {                
                pqrHttp.postUpdateResponsableMotivo(r.cedula, $scope.tempResponsable, $scope.tempMotivo, $scope.parametro[0].CODIGO).then(function (res) {                    
                    swal(
                        res.data.codigo == '0' ? 'Completado' : 'No completado', res.data.mensaje, res.data.codigo == '0' ? 'success' : 'error'

                    ).catch(swal.noop);
                    $scope.showResponsable(res.data.responsable, res.data.motivo);
                    $scope.showMotivos(res.data.parametro);                 
                })              
            }).catch(swal.noop);
        }

        $scope.saveUserMotivos = function (r) {          
            swal({
                title: 'Confirmar Proceso',
                text: '¿Desea actualizar el responsable de todos estos motivos especificos?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(function () {               
                pqrHttp.postUpdateMotivosResponsable(r.documento, $scope.tempResponsableM, $scope.parametro[0].CODIGO).then(function (res) {                  
                    swal(
                        res.data.codigo == '0' ? 'Completado' : 'No completado', res.data.mensaje, res.data.codigo == '0' ? 'success' : 'error'

                    ).catch(swal.noop);
                    $scope.showMotivosReponsable(res.data.responsable);
                    $scope.showMotivos(res.data.parametro);

                    $timeout(function () {
                        $scope.showMotivosResponsableBoolean = true;
                    }, 100)


                })
            }).catch(swal.noop);

        }
        $scope.saveUserSeccional = function (r) {    
            swal({
                title: 'Confirmar Proceso',
                text: '¿Desea actualizar el responsable?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then(function () {             
                pqrHttp.postUpdateResponsableSeccional(r.documento, $scope.tempSeccional, $scope.parametro[0].CODIGO).then(function (res) {
                swal(
                        res.data.codigo == '0' ? 'Completado' : 'No completado', res.data.mensaje, res.data.codigo == '0' ? 'success' : 'error'

                    ).catch(swal.noop);
                    $scope.getSeccionales();
                    $scope.showMotivos(res.data.parametro);
                })


            }).catch(swal.noop);
        }



        $scope.closeFilter = function () {
            $timeout(function () {
                $scope.sw = false;
                $scope.seccionales = true;
            }, 100)

        }
        $scope.filterMotPerson = function () {
            $timeout(function () {
                $scope.check_option = !$scope.check_option;
            }, 100)

        }


    }])
