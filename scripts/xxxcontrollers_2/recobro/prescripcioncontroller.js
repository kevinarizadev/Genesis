'use strict';
angular.module('GenesisApp')
.controller('prescripcioncontroller', ['$scope', '$http', 'notification', 'afiliacionHttp', 'ngDialog', 'consultaHTTP',
function ($scope, $http, notification, afiliacionHttp, ngDialog, consultaHTTP) {
  
  $scope.info_paciente = true;
  $scope.vw_prescripcion = true;
  $scope.vw_medicamento = true;
  $scope.vw_procedimiento = true;
  $scope.vw_dispositivo = true;
  $scope.vw_nutricional = true;
  $scope.vw_complementario = true;
  $scope.vw_noresponse = true;
  $scope.loadmipres = false;
  $scope.presbox = true;
  $scope.tipodoc = ' ';
  $scope.disable_direccionado = true;
  $scope.resetevw = function () {
    $scope.info_paciente = true;
    $scope.vw_prescripcion = true;
    $scope.vw_medicamento = true;
    $scope.vw_procedimiento = true;
    $scope.vw_dispositivo = true;
    $scope.vw_nutricional = true;
    $scope.vw_complementario = true;
    $scope.vw_noresponse = true;
  }
  
  // $scope.BuscarAfiliado = function (tipodoc, identificacion) {
  
  //   if ($scope.tipodoc == "0") {
  //     notification.getNotification('info', 'Seleccione tipo de documento', 'Notificación');
  //   } else if ($scope.identificacion === undefined || $scope.identificacion == "") {
  //     notification.getNotification('error', 'Ingrese número de identificación', 'Notificación');
  //   } else {
  //     swal({
  //       title: 'Cargando información del afiliado'
  //     });
  //     swal.showLoading();
  //     $scope.afildata = "";
  //     consultaHTTP.obtenerNucleo('CABA', $scope.tipodoc, $scope.identificacion).then(function (response) {
  //       $scope.presbox = false;
  //       $scope.info_paciente = true;
  //       $scope.regimen = response[0].REG_HOM;
  //       $scope.regimen_caracter = response[0].REGIMEN;
  //       console.log(response);
  //       swal.close()
  //     })
  //   }
  // }
  
  $scope.open_modal = function (opt) {
    
    switch (opt) {
      case 'direccionamiento':
      ngDialog.open({
        template: 'views/recobro/modal/modaldireccionamientos.html',
        className: 'ngdialog-theme-plain',
        controller: 'direccionamientosctrl',
        scope: $scope
      })
      break;
      default:
      break;
    }
    
    
  }

  $scope.obtenersol = function () {
    afiliacionHttp.auteMIPRES($scope.numero_prescripcion).then(function (response) {
      $scope.autValor = response;
      if ($scope.autValor.data[0].CODERR != -1) {
        ngDialog.open({
          template: 'views/recobro/autorizacionp.html',
          className: 'ngdialog-theme-default',
          width: '80%',
          controller: 'solicitudautcontroller',
          controllerAs: 'solautoctrl',
          scope: $scope
        })
      } else {
        notification.getNotification('info', 'Numero de prescripcion no tiene codigo de autorizacion, actualizar codigo en Modulo Autorizacion de Oasis', 'Notificacion');
      }
      $scope.loadmipres = false;
    }).catch(function (error) {
      notification.getNotification('error', 'Afiliado no exite con este numero de prescripcion', 'Notificacion');
      $scope.loadmipres = false;
    });
  }
  
  $scope.buscarprescripcion = function () {
    $scope.loadmipres = true;
    $scope.obtenersol()
    var tipo = "ObtenerMipres";
    $scope.resetevw();
    
    afiliacionHttp.obtener_pornumero($scope.regimen_caracter, $scope.numero_prescripcion).then(function (r) {
      $scope.api_direccionamientos = r;
      $scope.newarray = r.map(pr => {
        
        
        const EstadoDireccionamiento = {
          '0': 'Anulado',
          '1': 'Activo',
          '2': 'Procesado'
        };
        
        
        pr.EstDireccionamiento = EstadoDireccionamiento[pr.EstDireccionamiento];
        
        return pr;
      })
      console.log($scope.newarray);
      if (r.length > 0) {
        $scope.disable_direccionado = false;
      } else {
        $scope.disable_direccionado = true;
      }
    })

    afiliacionHttp.consulta_tutela($scope.numero_prescripcion, $scope.regimen_caracter).then(function (response) {
      $scope.tutela = response;
      $scope.medtutela = true;
      $scope.titulo = "Tutela No.";
      $scope.info_paciente = false;
      if ($scope.tutela.length != 0) {
        
        
        for (let index = 0; index < $scope.tutela.length; index++) {
          
          
          if ($scope.tutela[0].procedimientos.length != 0) {
            for (let index = 0; index < $scope.tutela[0].procedimientos.length; index++) {
              $http({
                method: 'get',
                url: "php/recobro/mostrarprocedimiento.php",
                params: {
                  codigo: $scope.tutela[0].procedimientos[index].CodCUPS
                }
              }).then(function (response) {
                $scope.tutela[0].procedimientos[index].codigoprocedimiento = $scope.tutela[0].procedimientos[index].CodCUPS;
                $scope.tutela[0].procedimientos[index].nombreproc = response[0].NOMBRE;
                $scope.tutela[0].procedimientos[index].descrproc = response[0].DESCRIPCION;
              });
              $scope.JustNoPBS = $scope.tutela[0].procedimientos[index].JustNoPBS;
              $scope.IndRec = $scope.tutela[0].procedimientos[index].IndRec;
              
              
            }
            $scope.arreglo_procedimientos = $scope.tutela[0].procedimientos;
            $scope.vw_procedimiento = false;
          }
          
          
          
          if ($scope.tutela[0].medicamentos.length != 0) {
            $scope.vw_medicamento = false;
            $scope.arreglo_medicamentos = $scope.tutela[0].medicamentos;
            // $scope.DescMedPrinAct = $scope.tutela[0].medicamentos[index].DescMedPrinAct;
            // $scope.JustNoPBS = $scope.tutela[0].medicamentos[index].JustNoPBS;
            // $scope.IndRec = $scope.tutela[0].medicamentos[index].IndRec;
            
          }
          
          if ($scope.tutela[0].tutela.length != 0) {
            
            // $scope.arreglo_prescripcion = $scope.tutela[0].tutela;
            $scope.NoPrescripcion = $scope.tutela[0].tutela.NoTutela;
            $scope.TipoIDPaciente = $scope.tutela[0].tutela.TipoIDPaciente;
            $scope.NroIDPaciente = $scope.tutela[0].tutela.NroIDPaciente;
            $scope.PNPaciente = $scope.tutela[0].tutela.PNPaciente;
            $scope.SNPaciente = $scope.tutela[0].tutela.SNPaciente;
            $scope.PAPaciente = $scope.tutela[0].tutela.PAPaciente;
            $scope.SAPaciente = $scope.tutela[0].tutela.SAPaciente;
            $scope.vw_prescripcion = false;
            
            
          }
          
          if ($scope.tutela[0].dispositivos.length != 0) {
            $scope.arreglo_dispositivos = $scope.tutela[0].dispositivos;
            $scope.vw_dispositivo = false;
          }
          
          if ($scope.tutela[0].productosnutricionales.length != 0) {
            
            $scope.vw_nutricional = false;
            $scope.arreglo_nutricional = $scope.tutela[0].productosnutricionales;
            // $scope.JustNoPBS = $scope.tutela[0].productosnutricionales[index].JustNoPBS;
            // $scope.IndRec = $scope.tutela[0].productosnutricionales[index].IndRec;
            
          }
          
          if ($scope.tutela[0].serviciosComplementarios.length != 0) {
            $scope.arreglo_complementario = $scope.tutela[0].serviciosComplementarios;
            $scope.vw_complementario = false;
            // $scope.JustNoPBS = $scope.tutela[0].serviciosComplementarios[index].JustNoPBS;
            // $scope.IndRec = $scope.tutela[0].serviciosComplementarios[index].IndRec;
            
          }
          
        }
        return;
      } else {
       if(true){
        afiliacionHttp.serviceMIPRES(tipo, $scope.numero_prescripcion, $scope.regimen_caracter).then(function (response) {
          $scope.prescripcion = response.data;
          $scope.medtutela = false;
          $scope.titulo = "Prescripción No.";
          $scope.info_paciente = false;
          if ($scope.prescripcion.length != 0) {
            
            
            for (let index = 0; index < $scope.prescripcion.length; index++) {
              
              
              if ($scope.prescripcion[0].procedimientos.length != 0) {
                for (let index = 0; index < $scope.prescripcion[0].procedimientos.length; index++) {
                  $http({
                    method: 'get',
                    url: "php/recobro/mostrarprocedimiento.php",
                    params: {
                      codigo: $scope.prescripcion[0].procedimientos[index].CodCUPS
                    }
                  }).then(function (response) {
                    $scope.prescripcion[0].procedimientos[index].codigoprocedimiento = $scope.prescripcion[0].procedimientos[index].CodCUPS;
                    $scope.prescripcion[0].procedimientos[index].nombreproc = response.data[0].NOMBRE;
                    $scope.prescripcion[0].procedimientos[index].descrproc = response.data[0].DESCRIPCION;
                  });
                  $scope.JustNoPBS = $scope.prescripcion[0].procedimientos[index].JustNoPBS;
                  $scope.IndRec = $scope.prescripcion[0].procedimientos[index].IndRec;
                  
                  
                }
                $scope.arreglo_procedimientos = $scope.prescripcion[0].procedimientos;
                $scope.vw_procedimiento = false;
              }
              
              
              
              if ($scope.prescripcion[0].medicamentos.length != 0) {
                $scope.vw_medicamento = false;
                $scope.arreglo_medicamentos = $scope.prescripcion[0].medicamentos;
                // $scope.DescMedPrinAct = $scope.prescripcion[0].medicamentos[index].DescMedPrinAct;
                // $scope.JustNoPBS = $scope.prescripcion[0].medicamentos[index].JustNoPBS;
                // $scope.IndRec = $scope.prescripcion[0].medicamentos[index].IndRec;
                
              }
              
              if ($scope.prescripcion[0].prescripcion.length != 0) {
                
                // $scope.arreglo_prescripcion = $scope.prescripcion[0].prescripcion;
                $scope.NoPrescripcion = $scope.prescripcion[0].prescripcion.NoPrescripcion;
                $scope.TipoIDPaciente = $scope.prescripcion[0].prescripcion.TipoIDPaciente;
                $scope.NroIDPaciente = $scope.prescripcion[0].prescripcion.NroIDPaciente;
                $scope.PNPaciente = $scope.prescripcion[0].prescripcion.PNPaciente;
                $scope.SNPaciente = $scope.prescripcion[0].prescripcion.SNPaciente;
                $scope.PAPaciente = $scope.prescripcion[0].prescripcion.PAPaciente;
                $scope.SAPaciente = $scope.prescripcion[0].prescripcion.SAPaciente;
                $scope.vw_prescripcion = false;
                
                
              }
              
              if ($scope.prescripcion[0].dispositivos.length != 0) {
                $scope.arreglo_dispositivos = $scope.prescripcion[0].dispositivos;
                $scope.vw_dispositivo = false;
              }
              
              if ($scope.prescripcion[0].productosnutricionales.length != 0) {
                
                $scope.vw_nutricional = false;
                $scope.arreglo_nutricional = $scope.prescripcion[0].productosnutricionales;
                // $scope.JustNoPBS = $scope.prescripcion[0].productosnutricionales[index].JustNoPBS;
                // $scope.IndRec = $scope.prescripcion[0].productosnutricionales[index].IndRec;
                
              }
              
              if ($scope.prescripcion[0].serviciosComplementarios.length != 0) {
                $scope.arreglo_complementario = $scope.prescripcion[0].serviciosComplementarios;
                $scope.vw_complementario = false;
                // $scope.JustNoPBS = $scope.prescripcion[0].serviciosComplementarios[index].JustNoPBS;
                // $scope.IndRec = $scope.prescripcion[0].serviciosComplementarios[index].IndRec;
                
              }
              
            }
            
          } else {
            $scope.vw_noresponse = false;
          }
          // console.log($scope.prescripcion);
        }).catch(function (error) {
          notification.getNotification('error', 'el servicio de MIPRES no se encuentra habilitado...consultar con el administrador del sistema', 'Notificacion');
          $scope.loadmipres = false;
        })
       }
      }
      // console.log($scope.prescripcion);
    }).catch(function (error) {
      notification.getNotification('error', 'el servicio de MIPRES no se encuentra habilitado...consultar con el administrador del sistema', 'Notificacion');
      $scope.loadmipres = false;
    })
    
   
    
  }
}]);