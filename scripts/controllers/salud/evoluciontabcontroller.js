'use strict';
angular.module('GenesisApp')
  .controller('evoluciontabcontroller', ['$scope', 'censoHttp', 'ngDialog', '$controller', 'Messages', '$window', function ($scope, censoHttp, ngDialog, $controller, Messages, $window) {
    
    
    var self = this;
    $scope.fecha_Cierre = new Date();
    $scope.hospitalizacion = ' ';
    $scope.motivoglosa = ' ';
    $scope.eventoadv = ' ';
    $scope.eventoadvdeta = ' ';
    $scope.objecionchbox = false;
    $scope.adverso = false;
    $scope.showeventoadv = true;
    $scope.showfechacierre = true;
    $scope.glosa = {
      valorobjecion: 0,
      descripcion: '',
      motivo: 0
    }
   // $scope.diagnostico.seleccion = "SELECCIONAR";
    $scope.entr = {
      numero: 0,
      ubi: '',
      nombre: '',
      descripcion: ''
    }

    $scope.array_queja = {
      numero: '',
      ubicacion: '',
      id: '',
      descripcion: '',
      codigo: ''
    }
    $scope.valoradverso;
    $scope.responsable = $scope.cedula;
    $scope.btnEvolucion = false;
    $scope.motivo_egreso = '0';
    $scope.cerrarau = false;

     $scope.form = function () {
      if($scope.motivo_egreso == "2"){
        ngDialog.open({
          template: 'views/salud/modal/modalfallecidos.html',
          className: 'ngdialog-theme-plain',
          controller: 'ctrlfallecidos',
          scope: $scope
        });
      }
    }


    $(document).ready(function () {
      $scope.notpaastenot();
     $scope.diagnostico = {codigo: "0", nombre: "Seleccionar", seleccion: "Seleccionar"};
    });

    censoHttp.obtenerHospitalizacion().then(function (response) {
      $scope.listhospitalizaicon = response.data;
    })

    censoHttp.obtenerMotivoEgreso().then(function (response) {
      $scope.listMotivo = response.data;
    })

    censoHttp.obtenerEventosadv().then(function (response) {
      $scope.listeventoadv = response.data;
    })

    function formatDate(date) {
      var month = date.getUTCMonth() + 1;
      date = date.getDate() + "/" + month + "/" + date.getFullYear();
      return date;
    }

    $scope.obtenerEvolucionPaciente = function (afiliado, ubicacion, numerocenso, estado, sexo, edad, nacido) {
      $scope.numerocenso = numerocenso;
      $scope.entr.numero = $scope.numerocenso;
      $scope.estado_procesado = estado;
      $scope.sexo = sexo;
      $scope.nacidov = nacido;
      $scope.ubicacion = ubicacion;
      $scope.entr.ubi = $scope.ubicacion;
      $scope.afiliado = afiliado;
      $scope.edades = Number(edad);
      if ($scope.estado_procesado === 'PROCESADO') { $scope.esprocesado = true; } else { $scope.esprocesado = false; }
      censoHttp.obtenerEvolucionPaciente(ubicacion, numerocenso).then(function (response) {
        $scope.listevolucionpaciente = response.data;
        if ($scope.listevolucionpaciente.length != 0) {
          $scope.Afiliadoevo = response.data[0].AFILIADO;
        } else {
          $scope.Afiliadoevo = $scope.afiliado;
        }
      })
    }

    $scope.ObtenerEvtDetalle = function () {
      censoHttp.obtenerEventosadvdeta($scope.eventoadv).then(function (response) {
        if ($scope.eventoadv != 0) {
          $scope.listeventoadvdeta = response.data;
        }
      })
    }

    $scope.showeventoadverso = function () {
      if ($scope.adverso === true) {
        $scope.showeventoadv = false;
        $scope.valoradverso = 'S';
      } else {
        $scope.showeventoadv = true;
        $scope.valoradverso = 'N';
      }
    }



    $scope.notpaastenot = function () {
      var Evoldesc = document.getElementById('bloquear');
      Evoldesc.onpaste = function (e) {
        e.preventDefault();
        swal('Notificacion', "La accion pegar no esta permitida en este campo. ", 'error');
      }

      Evoldesc.oncopy = function (e) {
        e.preventDefault();
        swal('Notificacion', "La accion copiar no esta permitida en este campo. ", 'error');
      }
    }


    $scope.clearevo = function () {
      $scope.fecha_Cierre = new Date();
      $scope.hospitalizacion = ' ';
      $scope.motivoglosa = ' ';
      $scope.eventoadv = ' ';
      $scope.eventoadvdeta = ' ';
      $scope.showeventoadv = true;
      $scope.showfechacierre = true;
      $scope.glosa = {
        valorobjecion: 0,
        descripcion: '',
        motivo: 0
      }
      $scope.valoradverso;
      $scope.responsable = $scope.cedula;
      $scope.btnEvolucion = false;
      $scope.motivo_egreso = '0';
      $scope.cerrarau = false;
      $scope.Descripcionevo = '';
      $scope.diagnostico.seleccion = "SELECCIONAR";
    }

    $scope.showfecha = function () {
      if ($scope.cerrarau === true) {
        $scope.showfechacierre = false;
        $scope.valorcerrarauditoria = 'S';

      } else {
        $scope.showfechacierre = true;
        $scope.valorcerrarauditoria = 'N';
        $scope.motivo_egreso = '0';
      }
    }

    $scope.showDescripcionobjecion = function (type) {
      if (type = 'A') {
        if ($scope.objecionchbox === true) {
          $scope.mostrarModal('G', '1');
          $scope.enblvalorobj = false;
          $scope.valorglosa = 'S';
        } else {
          $scope.valorglosa = 'N';
          $scope.glosa.descripcion = '';
          $scope.glosa.motivo = 0;
          $scope.glosa.valorobjecion = 0;
        }
      } else {
        $scope.enblvalorobj = true;
      }
    }

    $scope.showDescripcionobjecionval = function (type) {
      if (type = 'A') {
        if ($scope.objecionchbox === true) {
          $scope.enblvalorobj = false;
          $scope.valorglosa = 'S';
        } else {
          $scope.valorglosa = 'N';
        }
      } else {
        $scope.enblvalorobj = true;
      }
    }

    $scope.imprimeCertificadoGlosa = function () {
      $window.open('views/salud/formato/formatoglosa.php?censo=' + $scope.numerocenso + '&ubicacion=' + $scope.ubicacion, '_blank', "width=1080,height=1100");
    }

    $scope.nomDiagnostico = function () {
      if ($scope.diagnostico.codigo === undefined || $scope.diagnostico.codigo == "") {
        $scope.diagnostico.seleccion = "SELECCIONAR";
      } else {
        $scope.diagnostico.seleccion = $scope.diagnostico.codigo + ' - ' + $scope.diagnostico.nombre
      }
    }

    function formatDate_amd(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

    $scope.diferencia_fechas = function( fecha_fin){
        var fecha1 = moment(formatDate_amd(fecha_fin));

        var fecha2 = moment();
      
      //$scope.validacion_200dias = fecha2.diff(fecha1, 'days');
      $scope.validacion_200dias = 3;
    }

    $scope.monitor = function(){
      if (sessionStorage.getItem('cedula') != '1047234385'                 
                && sessionStorage.getItem('cedula') != '1140902160'
                && sessionStorage.getItem('cedula') != '6818695'
                && sessionStorage.getItem('cedula') != '1143154617'
                && sessionStorage.getItem('cedula') != '44192129'
                && sessionStorage.getItem('cedula') != '4242474'
                && sessionStorage.getItem('cedula') != '12542773'
                && sessionStorage.getItem('cedula') != '22569109'
                && sessionStorage.getItem('cedula') != '72152730'
                && sessionStorage.getItem('cedula') != '14242474'
                 && sessionStorage.getItem('cedula') != '1140902160') {
          $scope.no_es_monitor = true;
      } else {
        $scope.no_es_monitor = false;
      }
      

    }





    $scope.insertarEvolucion = function () {

   $scope.diferencia_fechas($scope.fecha_Cierre);
   $scope.monitor();
      if ($scope.validacion_200dias >= 4 && $scope.valorcerrarauditoria == 'S' && $scope.no_es_monitor == true ) {
          swal({
            title: 'Validar Informacion',
            text: 'Esta evolución tiene más de 4 días de antiguedad, por favor validar los datos de registro.',
            type: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'continuar',
            cancelButtonText: 'Cancelar'
          }).then(function () { }).catch(swal.noop);
      } else {
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
      $scope.showeventoadverso();
      $scope.showfecha();
      $scope.showDescripcionobjecionval('A');
      if ($scope.glosa.motivo != '0'){ $scope.motivoglo = $scope.glosa.motivo.split(' ')[0];}else{ $scope.motivoglo = '0';} 
     
      //if ( $scope.cerrarau == false && $scope.motivo_egreso == '0'){
      censoHttp.insertarEvolucion($scope.numerocenso, $scope.ubicacion, $scope.hospitalizacion,
        $scope.diagnostico.codigo, $scope.glosa.valorobjecion, $scope.Descripcionevo,
        $scope.valoradverso, $scope.eventoadv, $scope.eventoadvdeta,
        $scope.responsable, $scope.valorglosa, $scope.glosa.descripcion,
        '', $scope.motivoglo, $scope.valorcerrarauditoria, formatDate($scope.fecha_Cierre), $scope.motivo_egreso).then(function (response) {

          if (response.data.codigo != 0) {
            if ($scope.valorcerrarauditoria == 'S') {
              $scope.imprimeCertificadoGlosa();
            }

            $scope.btnEvolucion = true;
             swal.close();
            swal('Completado', response.data.mensaje, 'success');
            censoHttp.obtenerEvolucionPaciente($scope.ubicacion, $scope.numerocenso).then(function (response) {
              $scope.listevolucionpaciente = response.data;
              $scope.clearevo();
               $controller('censohospitalariocontroller', {
                $scope: $scope
              });
              $scope.eventTabs('P');
              $controller('censocontroller', {
                $scope: $scope
              });
              $scope.obtener_censos_activos();
            })

          } else {
            swal('Completado', response.data.mensaje, 'error');
          }
          if (response.data.codigo == 2) {
            $scope.btnEvolucion = true;
          } else {
            $scope.btnEvolucion = false;
          }
        })
        }
      //}else
      //{
      //swal('Notificacion','Se debe seleccionar la opcion de cerrar auditoria y el motivo del egreso.','error');
      // }                                  
    }





    $scope.mostrarModal = function (type, renglon, ubicacion) {
      $scope.renglon = renglon;
      $scope.ubicacionpac = ubicacion;

      $scope.array_queja = {
        numero: $scope.numerocenso,
        ubicacion: $scope.ubicacion,
        id: $scope.renglon,
        descripcion: '',
        codigo: ''
      }

      switch (type) {
        case "R":
          ngDialog.open({
            template: 'views/salud/reglosas.html',
            className: 'ngdialog-theme-plain',
            controller: 'reversarglosacontroller',
            controllerAs: 'revercoctrl',
            scope: $scope
          });
          break;
        case "E":
          ngDialog.open({
            template: 'views/salud/evoluciondetalle.html',
            className: 'ngdialog-theme-plain',
            controller: 'evoluciondetallecontroller',
            controllerAs: 'evodetacoctrl',
            scope: $scope
          });
          break;
        case "C":
          ngDialog.open({
            template: 'views/salud/modal/modalChat.html',
            className: 'ngdialog-theme-plain',
            controller: 'chatcontroller',
            controllerAs: 'chatcoctrl',
            scope: $scope
          });
          break;
        //edit
        case "edit":
          ngDialog.open({
            template: 'views/salud/modal/editcenso.html',
            className: 'ngdialog-theme-plain',
            controller: 'editcontroller',
            controllerAs: 'editctrl',
            scope: $scope
          });
        break;
        case "D":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalDiagnosticos.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalDxctrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$document") {
              $scope.diagnostico = {
                codigo: data.value.codigo,
                nombre: data.value.nombre
              }
              $scope.nomDiagnostico();
            }
          });
          break;
        case "K":
          $scope.entr;
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalEntrevista.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalEntrevistasctrls',
            scope: $scope
          });

          break;
        case "Q":
          $scope.array_queja
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalQuejas.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalQuejasctrls',
            scope: $scope
          });
          break;
          //solve
          case "solve":
          $scope.listevolucionpaciente[$scope.array_queja.id-1].DESQUEJAS;
          $scope.array_queja;
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalRquejas.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalQuejasctrls',
            scope: $scope
          });
          break;
        case "G":
          $scope.dialogDiag = ngDialog.open({
            template: 'views/salud/modal/modalValorglosa.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalValorglosactrl',
            scope: $scope
          });
          $scope.dialogDiag.closePromise.then(function (data) {
            if (data.value != "$closeButton") {
              $scope.glosa = {
                valorobjecion: data.value.cantidad,
                descripcion: data.value.nombre,
                motivo: data.value.motivo
              }
            } else {
              $scope.objecionchbox = false;
            }
          });
          break;
      }
    }

  }]);
