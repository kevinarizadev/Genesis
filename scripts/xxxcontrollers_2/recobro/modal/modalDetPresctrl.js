'use strict';
angular.module('GenesisApp')
.controller('modalDetPresctrl', ['$scope', '$http', 'ngDialog','mipresHTTP',
function ($scope, $http, ngDialog,mipresHTTP) {
    

    $(document).ready(function () {
        var dat = { prov: 'navb' }
        $.getJSON("php/obtenersession.php", dat)
          .done(function (respuesta) {
            $scope.sesdata = respuesta;
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("navbar error obteniendo variables");
          });
      });
  

      $scope.insertar_bd_dir_aut = function (arreglo,tipo){
		$http({
			method: 'POST',
			url: "php/recobro/mipres.php",
			// url :"json/recobro/direccionamientos.json",
			data: {
			  function: 'insertar_dir',
			  'v_responsable': $scope.sesdata.cedula,
			  'v_pjson_row_adj': arreglo,
			  'v_estado': 'I',
			  'v_len': arreglo.length
			}
		  }).then(function (r) {
			swal(r.Titulo,r.Mensaje, 'warning')

			if (r.data.Codigo == 1 ) {
                swal(r.data.Titulo, 'Direccionamientos registrados exitosamente', 'success');
                $scope.obtener_detalles();
                
            for (let index = 0; index < $scope.direccionamientos.length; index++) {
                if($scope.direccionamientos[index].EstDireccionamiento == 1 || $scope.direccionamientos[index].EstDireccionamiento == 2){
                    $http({
                        method: 'POST',
                        url: "php/recobro/mipres.php",
                        data: {
                            function: 'procesa_dir_prestador',
                            'v_responsable': $scope.sesdata.cedula,
                            'v_no_pres':$scope.info.noprescripcion,
                            'v_no_entrega':$scope.direccionamientos[index].NoEntrega,
                            'v_iddireccionamiento':$scope.direccionamientos[index].IDDireccionamiento,
                            'v_id':$scope.direccionamientos[index].ID,
                            'v_tipotec':$scope.direccionamientos[index].TipoTec,
                            'prestador': $scope.direccionamientos[index].NoIDProv,
                            'fecha_dir': $scope.direccionamientos[index].FecDireccionamiento
                        }
                    }).then(function (r) {      
                        if (index == $scope.direccionamientos.length - 1) {                          
                            $scope.obtener_detalles();
                            swal.close();
                            swal('Exito', 'Registros Actualizados Correctamente','success')

                        }
                    });
                }            
            }
                //$scope.actualiza_direccionamiento();
			} else {
				swal(r.data.Titulo, r.data.Mensaje, 'error')
			}
			
		  })
	}

      	
	$scope.direccionamientos_posibles = function (no_pres,con_tec,tipo_tec) {
		$scope.Sum_CantTotAEntregar = 0;
		$http({
			method: 'POST',
			url: "php/recobro/mipres.php",
			data: {
				function: 'get_direccionamientos_posibles',
				'NoPrescripcion':no_pres,
				'v_tipo_tec': tipo_tec ,
				'con_tec':con_tec
			}
		}).then(function (r) {
            $scope.insertar_bd_dir_aut(r.data,'A');
		});
    }

    
    
  $scope.obtener_detalles = function(){
    $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
            function: 'consulta_mipres_afi_detalle',
            tipo_doc: $scope.info.tipodoc,
            doc: $scope.info.documento_afi,
            no_pres: $scope.info.noprescripcion
        }
    }).then(function (response) {
        $scope.detalles = response.data;
    
        //objeto_window_referencia = window.open("temp/consolidado_pres.xlsx", "Descarga_Consolidado", configuracion_ventana);
    });
  }

  //consulta_regimen
  $http({
    method: 'POST',
    url: "php/recobro/mipres.php",
    data: {
        function: 'consulta_regimen',
        tipo_doc: $scope.info.tipodoc,
        doc: $scope.info.documento_afi
    }
    }).then(function (response) {
        $scope.regimen_afiliado = response.data[0].regimen;
    });

     $scope.obtener_tecnologias = function(data){   
    $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
            function: 'obtener_tecnologias',
            no_pres: data
        }
        }).then(function (response) {
            $scope.tecnologias = response.data;
            for (let a = 0; a < $scope.tecnologias.length; a++) {
                $scope.direccionamientos_posibles($scope.info.noprescripcion,$scope.tecnologias[a].renglon,$scope.tecnologias[a].tecnologia);                                    
            }
        });
    
    }






   $scope.actualizafechadir = function(data){   
    $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        data: {
            function: 'actualizafechas',
            no_pres:data.noprescripcion,
            no_entrega:data.noentrega,
            tecnologia:data.cod_tecnologia,
            responsable:$scope.sesdata.cedula

        }
        }).then(function (response) {
             if ( response.data.Codigo == '99') {
                swal('Exito', response.data.Mensaje,'success');
                    $scope.obtener_detalles();
             } else {
                swal('Error', response.data.Mensaje,'error')
             }
        });
    
    }



  $scope.obtener_detalles();
    //45457053
    $scope.actualiza_direccionamiento = function(){
        
            
        
            
        swal({
            title: 'Cargando información API SISPRO'
        });
        swal.showLoading();
        mipresHTTP.obtener_pornumero( $scope.regimen_afiliado, $scope.info.noprescripcion, true).then(data => {
            $scope.direccionamientos = data;
          if ($scope.detalles.length != $scope.direccionamientos.length) {
              $scope.obtener_tecnologias($scope.info.noprescripcion);            
                //$scope.direccionamientos_posibles($scope.info.noprescripcion,$scope.direccionamientos[0].ConTec,$scope.direccionamientos[0].TipoTec);                
            }else{

            for (let index = 0; index < $scope.direccionamientos.length; index++) {
                if($scope.direccionamientos[index].EstDireccionamiento == 1 || $scope.direccionamientos[index].EstDireccionamiento == 2){
                    $http({
                        method: 'POST',
                        url: "php/recobro/mipres.php",
                        data: {
                            function: 'procesa_dir_prestador',
                            'v_responsable': $scope.sesdata.cedula,
                            'v_no_pres':$scope.info.noprescripcion,
                            'v_no_entrega':$scope.direccionamientos[index].NoEntrega,
                            'v_iddireccionamiento':$scope.direccionamientos[index].IDDireccionamiento,
                            'v_id':$scope.direccionamientos[index].ID,
                            'v_tipotec':$scope.direccionamientos[index].TipoTec	,
                            'prestador': $scope.direccionamientos[index].NoIDProv,
                            'fecha_dir': $scope.direccionamientos[index].FecDireccionamiento
                        }
                    }).then(function (r) {      
                        if (index == $scope.direccionamientos.length - 1) {                          
                            $scope.obtener_detalles();
                            swal.close();
                            swal('Exito', 'Registros Actualizados Correctamente','success')

                        }
                    });
                }            
            }
            }
        });
        
    }
    
    
    $scope.procesar_direccionamiento = function () {
       
    }  
    $scope.archivar_direccionamiento = function (data,respuestas) {
        $http({
            method: 'POST',
            url: "php/recobro/mipres.php",
            data: {
                function: 'RECHAZA_DIR',
                'v_responsable': $scope.sesdata.cedula,
                'v_no_pres':data.NoPrescripcion,
                'v_no_entrega':data.NoEntrega,
                'v_error': respuestas.Errors[0]
            }
        }).then(function (r) {
            
        });
    }  
    
    $scope.nombreafi = $scope.info.PNPaciente + ' '+   $scope.info.SNPaciente +' '+$scope.info.PAPaciente + ' '+   $scope.info.SAPaciente;
    $scope.idafi = $scope.info.TipoIDPaciente + ' '+ $scope.info.NroIDPaciente;
    $scope.nombremed = $scope.info.PNProfS + ' '+   $scope.info.SNProfS +' '+$scope.info.PAProfS + ' '+   $scope.info.SAProfS;
    $scope.idmed = $scope.info.TipoIDProf + ' '+ $scope.info.NumIDProf;
    
    
}]);