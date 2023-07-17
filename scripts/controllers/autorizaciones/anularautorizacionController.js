'use strict';
angular.module('GenesisApp')
.controller('anularAutorizacionController', ['$scope', '$http', 'ngDialog', '$filter', function ($scope, $http, ngDialog, $filter) {


    $(document).ready(function () {
        $('#modalmotivosaut').modal();           
        $('#modaldetalle').modal();     
    });
    $scope.dAutorizacion = null;
    $scope.showAutorizacion = false;
    $scope.showAutorizaciones = false;
    $scope.numAutorizacion = null;
    $scope.ubicacion = null;
    $scope.documento = null;
    $scope.check_option = false;
    $scope.listMotivos = null;
    $scope.dAutorizacionTemp = [];
    $scope.jutificacion=null;
    $scope.motivo = null;
    $scope.hideProcesar= true;
    $scope.cargologueado = sessionStorage.getItem('cargo'); //yordis

    if (sessionStorage.getItem('rolcod')=='0' || sessionStorage.getItem('rolcod')=='23' ) {
        $scope.hideProcesar= false;      
    }else{
        $scope.hideProcesar= true;
    }

    $scope.searchAutorizaciones = function () {
        if ($scope.check_option == false) {
            $scope.documento = 0;
        } else {
            $scope.ubicacion = 0;
            $scope.numAutorizacion = 0;
        }
        swal({ title: 'Buscando...' });
        swal.showLoading();
        $http({
            method: 'POST',
            url: "php/autorizaciones/print/Rautorizaciones.php",
            data: {
                function: 'getAutorizacionesXanular',
                numero: $scope.numAutorizacion,
                ubicacion: $scope.ubicacion,
                documento: $scope.documento
            }
        }).then(function (res) {
            if (res.data.length == 0) {
                swal("Autorización", "No encontrada", "info");
                $scope.showAutorizacion = false;
            } else {
                swal.close();
                if (res.data.length > 0) {
                    $scope.dAutorizacion = [];
                    $scope.dAutorizacion = res.data[0];
                    console.log(res.data[0]);
                    $scope.dAutorizacionTemp = $scope.dAutorizacion;
                    $scope.currentPage = 0;
                    $scope.pageSize = 10;
                    $scope.valmaxpag = 10;
                    $scope.pages = [];
                    $scope.configPages();
                    $scope.showAutorizaciones = true;
                    swal.close();
                } else {
                    swal('Genesis informa', 'No hay Informacion para Mostrar', 'warning');
                }

            }
            if ($scope.check_option == false) {
                $scope.documento = null;
            } else {
                $scope.ubicacion = null;
                $scope.numAutorizacion = null;
            }
        })
    }

    $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.dAutorizacionTemp.length / $scope.pageSize) > $scope.valmaxpag)
                fin = 10;
            else
                fin = Math.ceil($scope.dAutorizacionTemp.length / $scope.pageSize);
        } else {
            if (ini >= Math.ceil($scope.dAutorizacionTemp.length / $scope.pageSize) - $scope.valmaxpag) {
                ini = Math.ceil($scope.dAutorizacionTemp.length / $scope.pageSize) - $scope.valmaxpag;
                fin = Math.ceil($scope.dAutorizacionTemp.length / $scope.pageSize);
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
    }


    $scope.openmodals = function (tipo) {
     if (tipo!='ACTIVAR') {
        $("#modalmotivosaut").modal("open");
     }
     
     
     switch (tipo) {
        case 'ANULAR':

        $http({
            method: 'POST',
            url: "php/autorizaciones/print/Rautorizaciones.php",
            data: {
                function: 'getListaMotivosAnulacion'
            }
        }).then(function (res) {
            $scope.listMotivos = res.data[0];

        })
        break;

        case 'PROCESAR':
        $http({
            method: 'POST',
            url: "php/autorizaciones/print/Rautorizaciones.php",
            data: {
                function: 'p_lista_motivosprocesamiento'
            }
        }).then(function (res) {
            console.log(res);
            $scope.listMotivos = res.data;


        })

        break;
        case 'ACTIVAR':
    
        // $http({
        //     method: 'POST',
        //     url: "php/autorizaciones/print/Rautorizaciones.php",
        //     data: {
        //         function: 'p_lista_motivosprocesamiento'
        //     }
        // }).then(function (res) {
        //     $scope.listMotivos = res.data[0];


        // })

            $http({
                method: 'POST',
                url: "php/autorizaciones/print/Uautorizaciones.php",
                data: { function: 'ProcesaActivarAutorizacion', numero: $scope.tempAut.NUMERO, ubicacion: $scope.tempAut.UBICACION, accion: 'A' }
            }).then(function (response) {
                swal.close();
                if (response.data != "0") {
                    swal({ title: "No Completado", text: 'Autorizacion no Activada!', showConfirmButton: false, type: "warning", timer: 5000 });
                } else {
                    $scope.limpiar();
                    swal({ title: "Completado", text: 'Autorizacion Activada Correctamente!', showConfirmButton: false, type: "success", timer: 5000 });
                }           
            })

        break;
        default:


    }
}






$scope.closemodals = function (option) {
    switch(option){
        case 'modalmotivosaut':
         $("#modalmotivosaut").modal("close");
           break;

           case 'modaldetalle':
                $("#modaldetalle").modal("close");
           break;
        default:  
    }
   
}


$scope.tempAut = null;
$scope.accionesAutorizacion = function (aut,accion) {
    $scope.tempAut = aut;
    $scope.tempAccion =accion;
    swal({
        title: 'Confirmar',
        text: "¿Esta seguro que desea "  +accion +" la autorización?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result) {
            console.log(accion);
            $scope.openmodals(accion);
        }
    })
}


$scope.saveAccionAut = function () {
        console.log('tempAccion_',$scope.tempAccion);
        
    if ($scope.motivo == null || $scope.motivo == '') {
        swal({ title: "Motivo", text: 'No puede estar vacio!', showConfirmButton: false, type: "warning", timer: 3000 });
    } else {
        if ($scope.tempAccion=='ANULAR') {
            $http({
            method: 'POST',
            url: "php/autorizaciones/print/Uautorizaciones.php",
            data: { function: 'ProcesaAnulaAutorizacion', numero: $scope.tempAut.NUMERO, ubicacion: $scope.tempAut.UBICACION, observacion: $scope.motivo, justificacion: $scope.jutificacion }
        }).then(function (response) {
            swal.close();
            if (response.data.Codigo == "1") {
                swal({ title: "No Completado", text: response.data.Nombre, showConfirmButton: false, type: "warning", timer: 5000 });

            } else {
                $scope.limpiar();
                swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: false, type: "success", timer: 5000 });
                $scope.jutificacion = null;
                $scope.motivo = null;
            }                    

            $scope.closemodals();  

        })
        }

        if($scope.tempAccion=='PROCESAR'){

            $http({
            method: 'POST',
            url: "php/autorizaciones/print/Uautorizaciones.php",
            data: { function: 'p_u_estado_autorizacion_x', numero: $scope.tempAut.NUMERO, ubicacion: $scope.tempAut.UBICACION, motivo: $scope.motivo, justificacion: $scope.jutificacion,accion:'P' }
        }).then(function (response) {
            console.log(response.data);
            swal.close();
            if (response.data[0].Codigo == "1") {
                swal({ title: "No Completado", text: response.data[0].Nombre, showConfirmButton: false, type: "warning", timer: 5000 });

            } else {
                $scope.limpiar();
                swal({ title: "Completado", text: response.data[0].Nombre, showConfirmButton: false, type: "success", timer: 5000 });
                $scope.jutificacion = null;
                $scope.motivo = null;
            }                    

            $scope.closemodals();  

        })
        }
        

    }
}


$scope.limpiar = function () {
    $scope.dAutorizacion = [];
    $scope.dAutorizacionTemp = [];
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.valmaxpag = 10;
    $scope.pages = [];
    $scope.showAutorizaciones = false;
    $scope.ubicacion = null;
    $scope.documento = null;
    $scope.numAutorizacion = null;
    $scope.motivo = null;
    $scope.filtroAut = null;
    $scope.jutificacion = null;
}
$scope.funcShowAutorizacion = function (aut) {
            console.log(aut);
    // $scope.dAuto = aut;
    // $scope.showAutorizacion = true;
    // ngDialog.open({
    //     template: 'views/autorizaciones/show_autorizacion.html', className: 'ngdialog-theme-plain',
    //     controller: 'showAutorizacionController', scope: $scope
    // }).closePromise.then(function (data) {

    // });
       $scope.v_detallev = null;
    $scope.v_encabezadov = null;
    $scope.dAuto = null;
    $scope.sumPrint = 0;
    $scope.buscarAfiliado('3', aut.TIPO_DOC, aut.DOCUMENTO);
    $scope.consultarAutorizacion(aut.NUMERO, aut.UBICACION, 'C');
    
}


 $scope.v_encabezado = null;
    $scope.v_detalle = null;
    $scope.v_encabezadov = null;
    $scope.v_detallev = null;

    $scope.consultarAutorizacion = function (numero, ubicacion, accion) {
      swal({ title: 'Buscando...' });
      swal.showLoading();
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtener_Uautorizaciones', numero: numero, ubicacion: ubicacion }
      }).then(function (response) {
          console.log(response.data);
        if (accion == 'C') {
          $scope.v_encabezadov = response.data.cabeza;
          $scope.v_detallev = response.data.detalle;
          if ($scope.v_detallev.length==0) {
            $scope.v_detallev = [];
          }

          $("#modaldetalle").modal("open");
        }
      
swal.close();
})
}

    $scope.buscarAfiliado = function (tipo, tipodocumento, documento) {
      $http({
        method: 'POST',
        url: "php/autorizaciones/autorizacionprog/funcautorizacion.php",
        data: { function: 'obtenerafiliados', tipodocumento: tipodocumento, documento: documento }
      }).then(function (response) {
        if (response.data.CODIGO != "0") {

         if (tipo == '3') {

            $scope.infoafiliadoautedit = null;

            $scope.infoafiliadoautedit = response.data;

            if ($scope.infoafiliadoautedit.Estado != 'ACTIVO') {

              $scope.informacionmodaledit = 'Afiliado no se encuentra activo en base de datos';

              swal('Importante', 'Afiliado no se encuentra activo en la base de datos.', 'info');

            } else {

              // $scope.afirownumIV = 1;

              // if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

              //   $scope.afirownumIV = $scope.afirownumIV + 1;

              // }

              // if ($scope.infoafiliadoautedit.TUTELA == 'true') {

              //   $scope.afirownumIV = $scope.afirownumIV + 1;

              // }

              $scope.afirownumIV = 1;

              if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.TUTELA == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }
              if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

                $scope.afirownumIV = $scope.afirownumIV + 1;

              }

              if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

                $scope.afirownumIV = $scope.afirownumIV + 1;
  
              }

             

              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento, tipo);

              $scope.sexoafitabIV = $scope.infoafiliadoautedit.SexoCodigo;

              $scope.edadafitabIV = $scope.infoafiliadoautedit.EdadDias;

              $scope.regimenafitabIV = $scope.infoafiliadoautedit.CodigoRegimen;

              $scope.datosAfiModalNov = $scope.infoafiliadoautedit;

              $scope.inactiveseccion1tab4 = true;

              $scope.inactiveseccion2tab4 = false;

             // $scope.productosagregadostabIV = [];

            }

          } 

          // $scope.$apply();

        } else {

          swal('Importante', response.data.NOMBRE, 'info')

        }

      });

}


  function validate_fecha(fecha) {

      var patron = new RegExp("^(19|20)+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})$");
      if (fecha.search(patron) == 0) {
        var values = fecha.split("-");
        if (isValidDate(values[2], values[1], values[0])) {
          return true;
        }
      }
      return false;
    }

    function isValidDate(day, month, year) {
      var dteDate;
      month = month - 1;
      dteDate = new Date(year, month, day);
      //Devuelva true o false...
      return ((day == dteDate.getDate()) && (month == dteDate.getMonth()) && (year == dteDate.getFullYear()));
    }

    function formatDate(date) {
      var dd = ('0' + date.getDate()).slice(-2);
      var mm = ('0' + (date.getMonth() + 1)).slice(-2);
      var yyyy = date.getFullYear();
      var hh = date.getHours();
      var mi = date.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.calcularEdad = function (date, tipo) {
      //var fecha=document.getElementById("user_date").value;
      var fecha = date.split("/").reverse().join("-");
      if (validate_fecha(fecha) == true) {
        // Si la fecha es correcta, calculamos la edad
        var values = fecha.split("-");
        var dia = values[2];
        var mes = values[1];
        var ano = values[0];

        // cogemos los valores actuales
        var fecha_hoy = new Date();
        var ahora_ano = fecha_hoy.getYear();
        var ahora_mes = fecha_hoy.getMonth() + 1;
        var ahora_dia = fecha_hoy.getDate();

        // realizamos el calculo
        var edad = (ahora_ano + 1900) - ano;
        if (ahora_mes < mes) {
          edad--;
        }

        if ((mes == ahora_mes) && (ahora_dia < dia)) {
          edad--;
        }

        if (edad > 1900) {
          edad -= 1900;
        }



        // calculamos los meses
        var meses = 0;
        if (ahora_mes > mes)
          meses = ahora_mes - mes;
        if (ahora_mes < mes)
          meses = 12 - (mes - ahora_mes);
        if (ahora_mes == mes && dia > ahora_dia)
          meses = 11;

        // calculamos los dias
        var dias = 0;
        if (ahora_dia > dia)
          dias = ahora_dia - dia;
        if (ahora_dia < dia) {
          var ultimoDiaMes = new Date(ahora_ano, ahora_mes, 0);
          dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
        }

       if (tipo == 3) {

          if (edad > 0) {

            $scope.cantidadanosautedit = 'años'

            if (edad == 1) {

              $scope.cantidadanosautedit = 'años'

            }

            $scope.edadautedit = edad;

          } else {

            if (meses > 0) {

              $scope.cantidadanosautedit = 'meses'

              if (meses == 1) {

                $scope.cantidadanosautedit = 'mes'

              }

              $scope.edadautedit = meses;

            } else {

              if (dias > 0) {

                $scope.cantidadanosautedit = 'dias'

                if (dias == 1) {

                  $scope.cantidadanosautedit = 'dia'

                }

                $scope.edadautedit = dias;

              }

            }

          }

        } 



      }

    }


$scope.actAutorizacion = function (aut) {
    $scope.tempAut = aut;
    swal({
        title: 'Confirmar',
        text: "¿Esta seguro que desea ACTIVAR la autorización?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result) {
            $http({
                method: 'POST',
                url: "php/autorizaciones/print/Uautorizaciones.php",
                data: { function: 'ProcesaActivarAutorizacion', numero: $scope.tempAut.NUMERO, ubicacion: $scope.tempAut.UBICACION, accion: 'A' }
            }).then(function (response) {
                swal.close();
                if (response.data != "0") {
                    swal({ title: "No Completado", text: 'Autorizacion no Activada!', showConfirmButton: false, type: "warning", timer: 5000 });
                } else {
                    $scope.limpiar();
                    swal({ title: "Completado", text: 'Autorizacion Activada Correctamente!', showConfirmButton: false, type: "success", timer: 5000 });
                }
                $scope.closemodal();
            })
        }
    })
}

$scope.procesarAutorizacion = function (aut) {
    $scope.tempAut = aut;
    swal({
        title: 'Confirmar',
        text: "¿Esta seguro que desea PROCESAR la autorización?",
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result) {
            console.log(result);
                    // $http({
                    //     method: 'POST',
                    //     url: "php/autorizaciones/print/Uautorizaciones.php",
                    //     data: { function: 'p_lista_motivosprocesamiento', numero: $scope.tempAut.NUMERO, ubicacion: $scope.tempAut.UBICACION, accion: 'A' }
                    // }).then(function (response) {
                    //     swal.close();
                    //     if (response.data != "0") {
                    //         swal({ title: "No Completado", text: 'Autorizacion no Activada!', showConfirmButton: false, type: "warning", timer: 5000 });
                    //     } else {
                    //         $scope.limpiar();
                    //         swal({ title: "Completado", text: 'Autorizacion Activada Correctamente!', showConfirmButton: false, type: "success", timer: 5000 });
                    //     }
                    //     $scope.closemodal();
                    // })
                }
            })
}



$scope.setPage = function (index) {
    $scope.currentPage = index - 1;
    console.log($scope.dAutorizacion.length / $scope.pageSize - 1)
}

$scope.filterAut = function (val) {            
            // setTimeout(() => {            
                $scope.dAutorizacionTemp = $filter('filter')($scope.dAutorizacion, val);            
                if ($scope.dAutorizacionTemp.length > 0) {
                    $scope.setPage(1);
                }
                $scope.configPages();
            // }, 100);
        }
        $scope.paso = function (tipo) {
            if (tipo == 'next') {
                var i = $scope.pages[0].no + 1;
                var fin = $scope.pages[9].no + 1;
                $scope.currentPage = $scope.currentPage + 1;
                if ($scope.dAutorizacionTemp.length % $scope.pageSize == 0) {
                    var tamanomax = parseInt($scope.dAutorizacionTemp.length / $scope.pageSize);
                } else {
                    var tamanomax = parseInt($scope.dAutorizacionTemp.length / $scope.pageSize) + 1;
                }
                if (fin > tamanomax) {
                    fin = tamanomax;
                    i = tamanomax - 10;
                }
            } else {
                var i = $scope.pages[0].no - 1;
                var fin = $scope.pages[9].no - 1;
                $scope.currentPage = $scope.currentPage - 1;
                if (i <= 1) {
                    i = 1;
                    fin = 10;
                }
            }
            $scope.calcular(i, fin);
        }
        $scope.calcular = function (i, fin) {
            $scope.pages = [];
            for (i; i <= fin; i++) {
                $scope.pages.push({
                    no: i
                });
            }
        }

    }])
.filter('inicio', function () {
    return function (input, start) {
        if (input != undefined && start != NaN) {
            start = +start;
            return input.slice(start);
        } else {
            return null;
        }
    }
});