'use strict';
	angular.module('GenesisApp',[])
	.config(function($locationProvider) {
     	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
		});
   })

 	.controller('infoempresactrl',['$scope','$http','$location','$timeout',
 	function($scope,$http,$location,$timeout) {



       $scope.fechahoy = Date.now();
      $scope.infoempresa={
                  tidentificacion:"",
                  nidentificacion:"",
                  razonsocial:"",
                  siglas:"",
                  ntrabajadores:"",
                  primerapellido:"",
                  segundoapellido:"",
                  primernombre:"",
                  segundonombre:"",
                  templador:"",
                  tipoempresas:"",
                  claseaportante:"",
                  clasificacion:"",
                  actividad:"",
                  pago:"",
                  ciudadpagos:"",
                  dirprincipal:"",
                  barprincipal:"",
                  munprincipal:"",
                  telprincipal:"",
                  depaprincipal:"",
                  nomsede:"",
                  sitioweb:"",
                  email:"",
                  nomrepresentante:"",
                  tdrepresentante:"",
                  drepresentante:"",
                  fnrepresentante:"",
                  correorepresentante:"",
                  nomcargo:"",
                  telcargo:"",
                  celcargo:"",
                  fncargo:"",
                  cargo:"",
                  emailcargo:""
        };
       $scope.Datos=function(){
                swal({
          title: 'Cargando información...'
      });
      swal.showLoading();
        		$http({
                 method:'GET',
                 url:"../../../php/movilidad/soporte/inforempresa.php",
                 params: {type: $location.search().tipo,
                          id: $location.search().id
                          }
              }).then(function(data){
                  swal.close();
                 console.log(data);
              	$scope.data = data.data;
                 $scope.llenarform(data.data.info_empresa, data.data.lista_sucursales);
                 $timeout(function () {
                    print(true);
                 }, 1000);
                })
      }
      $scope.Datos();
      $scope.llenarform=function(objeto, objeto2){

            console.log(objeto);
            console.log(objeto2);
            
              //Estado
              $scope.nreguistro=objeto.numero_registro;
              $scope.codigoUbicacion=objeto.codigo_ubicacion;
              if(objeto.codigo_estado_registro=='A'){
               $scope.OcultarActivacion=true;
              }else{
                $scope.OcultarActivacion=false;
              }

                $scope.Ocultarform=false;
                $scope.OcultarArchivo=true;
                $scope.Ocultarcontra=true;
                $scope.OcultarTablaEmpleados=true;
                $scope.OcultarTablaNovedades=true;

              //formulario 1
              $scope.infoempresa.fechainscripcion=objeto.fecha_inscripcion
             
              
              //formulario 1
              $scope.infoempresa.codigoubicacion=objeto.codigo_ubicacion;
              $scope.infoempresa.nreguistro=objeto.numero_registro;
              $scope.infoempresa.numeroformulario=objeto.numero_formulario;
              $scope.infoempresa.tidentificacion=objeto.codigo_tipo_documento;
              $scope.infoempresa.tidentificacionn=objeto.tipo_documento;
              $scope.infoempresa.nidentificacion=parseInt(objeto.documento),
              $scope.infoempresa.razonsocial=objeto.razon_social;
              $scope.infoempresa.siglas=objeto.sigla;
              $scope.infoempresa.primerapellido=objeto.apoc_primer_apellido;
              $scope.infoempresa.segundoapellido=objeto.apoc_segundo_apellido;
              $scope.infoempresa.primernombre=objeto.apoc_primer_nombre;
              $scope.infoempresa.segundonombre=objeto.apoc_segundo_nombre;
              $scope.infoempresa.templador=objeto.tipo_empleador;
              $scope.infoempresa.tipoempresas=objeto.tipo_persona;
              $scope.infoempresa.claseaportante=objeto.clase_empleador;
              $scope.infoempresa.pago=objeto.forma_pago;
              $scope.infoempresa.clasificacion=objeto.clasificacion;
              $scope.infoempresa.actividad=objeto.actividad;

              $scope.infoempresa.fvigencia=objeto.fecha_vigencia;
              $scope.infoempresa.vigencia=objeto.vigencia;
              $scope.infoempresa.codigoactividad=objeto.codigo_actividad;
              //formulario 2
              $scope.infoempresa.nomrepresentante =objeto.representante;
              $scope.infoempresa.tdrepresentante =objeto.tipo_doc_representante;
              $scope.infoempresa.drepresentante  =objeto.doc_representante;
              $scope.infoempresa.fnrepresentante =objeto.f_nacimiento_representante;
              $scope.infoempresa.correorepresentante =objeto.correo_representante;
              $scope.infoempresa.cargo =objeto.cargo_resoponsable;
              $scope.infoempresa.nomcargo =objeto.nombre_responsable;
              $scope.infoempresa.celcargo =objeto.celular_responsable;
              $scope.infoempresa.emailcargo =objeto.correo_responsable;
              $scope.infoempresa.telcargo =objeto.telefono_responsable;
              $scope.infoempresa.fncargo =objeto.f_nacimiento_responsable ;  
              //formulario 3
              $scope.infoempresa.dirprincipal=(objeto2[0].direccion);
              $scope.infoempresa.ntrabajadores=objeto.numero_empleados;
              $scope.infoempresa.email=objeto.email;
              $scope.infoempresa.barprincipal=(objeto2[0].barrio);
              $scope.infoempresa.munprincipal=objeto.municipio;
              $scope.infoempresa.telprincipal=(objeto2[0].telefono);
              $scope.infoempresa.depaprincipal=objeto.departamento;
              $scope.infoempresa.nomsede=(objeto2[0].nombre);

        }
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                console.log('se hizo antes de imprimir');
            } else {
                console.log('se hizo despues de imprimir');
                setTimeout(function () {
                  window.close();
                }, 10);
            }
        });
  }
  
]);