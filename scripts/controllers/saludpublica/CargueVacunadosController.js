'use strict';
angular.module('GenesisApp')
  .controller('CargueVacunadosController', ['$scope', '$timeout','ngDialog', '$controller', '$http', '$window', function ($scope,$timeout, ngDialog,  $controller, $http, Messages, $window,FileProcessor) {
    
    $scope.detalle_error = true;
    
    $scope.dataSearch = { selectedDocumento: null, documento: null, tipo: null };
    $scope.data = {
        inactiveSolicitud: true, inactiveRv: true, inactiveNurc: true, inactiveSuperSalud: true, inactiveOtrosEntes: true, inactiveAcudiente: true,
        inactiveSearch: true, inactiveSearchAcudiente: true, inactiveSave: true, inactiveAfiliado: true, inactivePqr: true, inactiveIps: true,
        inactiveStrongIps: false, inactiveStrongAfiliado: false, inactiveStrongAcudiente: false, inactiveSearchIps: true, carga: true,
        cargAcudiente: true, collapsePqrComplement: true, inactiveTitleRv: true, collapseRv: true, stateRv: true, collapseIps: true,
        requiredFile: false, inactiveRegistered: true, inactiveOptionsAfiliado: true, inactiveOptionsAcudiente: true, inactiveTwoOption: true, inactiveObjetivos: true,
        inactiveTitleComplement: true, sujeto: true
    }
    $scope.pqrData = {
        selectedtipoSolicitud: null, selectedRv: null, selectedCriteriObjetivo: null, selectedCriterioSubjetivo: null,
        selectedCriteriComplementario: null, selectedSujetosProteccionEspecial: null, selectedServicios: null, selectedMedicamentos: null,
        selectedmediosRecepcion: null, selectedOtrosEntesDeControl: null, sede: null, enteCodigo: null, selectedEntidad: null, textCodNurc: null, textCodPqrSuperSalud: null, selectedtipoRadicacion: null,
        User: {
            selectedDocumento: null, documento: null, nombre: null, fecha_nacimiento: null, selectedGenero: null, codmunicipio: null, municipio: null,
            ubicgeo: null, direccion: null, telefono: null, email: null, estado: null, regimen: null, selectedAcudiente: null,
            Acudiente: {
                selectedDocumento: null, documento: null, nombre: null, codmunicipio: null, municipio: null, direccion: null, telefono: null,
                email: null
            }
        }, Ips: { nit: null, ips: null, codmunicipio: null, municipio: null, direccion: null, ubicacion: null, email: null, telefono: null },
        selectedMotivoEspecifico: null, pqrFile: null, ext: null, observaciones: null, selectedDias: null, selectedRespuesta: null, fecha_recibido: null
    }
    $scope.enviaradj = function () {

        //Usado para validar el file en tiempo real
        var file = document.getElementById('adjunto').files[0];//Obtiene el file del input para validarlo
        
        if (file) {//Valida si existe el archivo en el input file           
                        
                if (file.name.split('.').pop().toLowerCase() == 'csv') {//Obtiene la extension del file y valida que sea un pdf                      
                    const data = new FormData();
                    data.append('soporte', file);                            
                    $scope.data.formato = 'Dentro Del Peso Limite y Formato Validado';
                    $scope.data.requiredFile = false;
                    
                    axios({
                        method: 'POST',
                        url: "php/saludpublica/carguevacunados.php",                        
                        data
                      }).then(function (r) { 
                        if (r.data.data.code === 200) {
                            swal('Exito',r.data.data.message,'success');
                           $scope.valida_archivo();
                        } else {
                            swal('Advertencia',r.data.data.message,'error');
                        }                        
                    });                   
                } else {
                    $scope.data.formato = 'Formato Invalido solo puedes adjuntar archivos con extensión .csv';
                    $scope.pqrData.adjunto = null;//Asigna null al ng-model adjunto  
                    $scope.pqrData.ext = null;//Asigna null a la extension adjunto 
                    $scope.data.requiredFile = true;
                }
            
        } else {
            $scope.data.formato = '';
            $scope.pqrData.adjunto = null;//Asigna null al ng-model adjunto   
            $scope.pqrData.ext = null;//Asigna null a la extension adjunto 
            $scope.data.requiredFile = false;
        }
   

      }

    $scope.valida_archivo = function(){
    $http({
        method: 'POST',
        url: "php/saludpublica/paiweb.php",
        // url :"json/recobro/direccionamientos.json",
        data: {
            function: 'valida_archivo'
        }
        }).then(function (r) {
            
        });
      }


    $scope.get_consecutivos = function(){
        $http({
            method: 'POST',
            url: "php/saludpublica/paiweb.php",
            data: {
                function: 'get_consecutivos'
                
            }
            }).then(function (r) {
                $scope.consecutivos = r.data;
            });
      }

    $scope.get_consecutivos();

    $scope.get_detalle = function(){
        swal({
            title: 'Espere un momento',
            text: 'Obteniendo Detalle Cargue',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            onOpen: () => {
              swal.showLoading()
            }
            });
        $http({
            method: 'POST',
            url: "php/saludpublica/paiweb.php",
            data: {
                function: 'detalle_cargue_vacunacion',
                'v_pid_cargue': $scope.consecutivo,
            }
            }).then(function (r) {
                $scope.errores_cargue = r.data;
                $scope.total_registros = r.data[0].total_registros;
                $scope.total_registros_validado = r.data[0].total_registros_validado;
                $scope.total_registros_no_validado = r.data[0].total_registros_no_validado;
          
            swal.close();
            $scope.detalle_error = false;
            if ($scope.estadoincumplimiento == 'I') {
              $scope.tablecenso.destroy();
            }
            $scope.estadoincumplimiento ='I';
            setTimeout(function() {
            $scope.tablecenso = $('#result_censo').DataTable({
                dom: 'lBsfrtip',
                deferRender:    true,
                scroller:       true,
                buttons: [ { extend: 'copy', text: 'Copiar' }, 'csv', 'excel'],
              language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
              lengthMenu: [[10, 30, -1], [10, 30, 'Todas']],
              "order": [[0, "asc" ]]
            });
        }, 500);
            
          
          setTimeout(function() {
            swal.close();
          }, 1000);
        
                
            });
      }
      

  }]);
