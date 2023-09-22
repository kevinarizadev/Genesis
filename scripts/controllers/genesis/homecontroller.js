'use strict';
angular.module('GenesisApp').controller('homecontroller', ['$scope', 'consultaHTTP', 'notification', '$timeout', '$rootScope', 'ngDialog', '$http', '$window', function ($scope, consultaHTTP, notification, $timeout, $rootScope, ngDialog, $http, $window) {

  // $('#modalpopUp').modal();
  // $('#modalpopUp').modal("open");

  //$('#purple-scheme').click();
  $timeout(function () {
        //$('#dark-scheme').click();
        //console.log(1);
      }, 5000);
  $scope.sofi = false;
  // Cuenta regresiva
  setTimeout(() => {
    // document.getElementById('slider_mara').scrollIntoView({ block: 'start', behavior: 'smooth' });
    document.getElementById('slider_mara_empleado') != null ? document.getElementById('slider_mara_empleado').scrollIntoView({ block: 'start', behavior: 'smooth' }) : '';
  }, 5000);
  // Traer 5 notificaiones desde la DB
  $scope.name = 'inicio';
  $http({
    method: 'POST',
    url: "php/genesis/versionamiento/versionamiento.php",
    data: {
      function: 'obtenerNotificaciones',
      cantidad: 5
    }
  }).then(function (response) {
    // $scope.now = response.data;
    $scope.now = response.data.filter(e => e.area != '16');
    // if($scope.now.length){
    //   $('#carouselCaracteristicas').gallery_carousel();
    // }
    angular.element(document).ready(function () {
      $scope.empleadoMes();
    });
  });
  $scope.result_bd = JSON.parse(sessionStorage.getItem('inicio_cumpleanos'));
  $scope.result_perfil = JSON.parse(sessionStorage.getItem('inicio_perfil'));
  // console.log(sessionStorage.getItem('inicio_cumpleanos'));
  $scope.cargaInicio = function () {
    if ($scope.result_perfil == null) {
      $http({
        method: 'POST',
        url: "php/genesis/funcgenesis.php",
        data: { function: 'cargaInicio' }
      }).then(function (response) {
        if (response.data.cumpleanos) {
          $scope.result_bd = response.data.cumpleanos;
          $scope.result_perfil = response.data.perfil;
          $scope.result_bd.hoy = response.data.cumpleanos.hoy == null ? [] : response.data.cumpleanos.hoy;
          $scope.result_bd.manana = response.data.cumpleanos.manana == null ? [] : response.data.cumpleanos.manana;
          $scope.HBD_Hoy();
          sessionStorage.setItem("inicio_cumpleanos", JSON.stringify($scope.result_bd));
          sessionStorage.setItem("inicio_perfil", JSON.stringify($scope.result_perfil));
        } else {
          $scope.result_perfil = '';
          $scope.result_bd = '';
        }
      });
    } else {
      // $scope.result_bd.hoy = $scope.result_bd.manana;
      $scope.HBD_Hoy();
    }
  }
  $scope.tarea = function (i) {
    setTimeout(function () {
      document.querySelectorAll("li.HBD_Hoy.active").forEach(e => { e.classList.remove('active') });
      (document.querySelectorAll("li.HBD_Hoy")[i]) ? document.querySelectorAll("li.HBD_Hoy")[i].classList.add('active') : '';
    }, 2000 * i);
  }
  $scope.HBD_Hoy = function () {
    if ($scope.result_bd.hoy.length > 0 && $scope.result_bd.hoy != null) {
      for (var i = 0; i < ($scope.result_bd.hoy.length); i++) {
        $scope.tarea(i);
      }
    }
  }
  $scope.cargaInicio();


  $scope.see_notification = function (id) {
    $scope.id = id;
    // Envio el case para elegir que modal mostrar
    $scope.case = 2;
    ngDialog.open({
      template: 'views/tic/modal/modalversionamiento.html',
      className: 'ngdialog-theme-plain',
      controller: 'modalversionamiento',
      scope: $scope
    })
  };
  // Modal al dar clic sobre una notificaion
  $scope.descargaVolante = function () {
    $scope.dialogJuz = ngDialog.open({
      template: 'views/talentohumano/formatos/modalSelectPeriodos.html',
      className: 'ngdialog-theme-plain',
      controller: 'modalSelectPeriodosCtrl'
    });
  }

  $(document).ready(function () {
    $('.modal').modal();
  });
  $scope.modal = { titulo: "ABECÉ de las sustancias y productos químicos, residuos peligrosos", tipo: 1, class: "blue", vista: 1, preguntas: new Array(), respuestas: new Array() };

  $scope.quiz = function () {
    $scope.modal.titulo = "Responder Preguntas";
    $scope.modal.class = "green";
    $scope.modal.vista = 2;
    $scope.modal.tipo = 2;
  }
  $scope.responder = function (cod_capacitacion, cod_pregunta, cod_respuesta) {
    var i = $scope.modal.respuestas.findIndex(elemt => elemt.pregunta == cod_pregunta);
    if (i == -1) {
      $scope.modal.respuestas.push({ capacitacion: cod_capacitacion, pregunta: cod_pregunta, respuesta: cod_respuesta });
    } else {
      $scope.modal.respuestas[i].respuesta = cod_respuesta;
    }
  }
  $scope.atras = function () {
    $scope.modal.titulo = "ABECÉ de las sustancias y productos químicos, residuos peligrosos";
    $scope.modal.class = "blue";
    $scope.modal.vista = 1;
    $scope.modal.tipo = 1;
  }
  $scope.enviar = function () {
    if ($scope.modal.respuestas.length == 3) {
      console.log($scope.modal.respuestas);
      $http({
        method: 'POST',
        url: "php/genesis/inicio.php",
        data: {
          function: 'responder_examen',
          respuestas: angular.toJson($scope.modal.respuestas),
          respuestas_len: $scope.modal.respuestas.length
        }
      }).then(function (response) {
        if (response.data.hasOwnProperty("Codigo")) {
          swal('Mensaje', response.data.Nombre, 'success');
        } else {
          swal('Mensaje', 'Error enviando respuesta', 'error');
        }
        $('#modal-quiz').modal('close');
      });
    } else {
      swal('Mensaje', 'Por favor responda todas las preguntas', 'warning');
    }
  }


  $http({
    method: 'POST',
    url: "php/genesis/funcencuesta.php",
    data: {
      function: 'obtenerEncuesta', data: {
        documento: sessionStorage.getItem('cedula')
      }
    }
  }).then(function (response) {
    if (response.data.valor === "true" && (parseInt(sessionStorage.getItem('municipio') || 0) === 1 || String(sessionStorage.getItem('municipio')).startsWith('8'))) {
      $scope.mostrarEncuesta = true
    } else {
      $scope.mostrarEncuesta = false
    }
  });

  $scope.finalizarEncuesta = () => {
    swal({
      title: '¿Desea finalizar la encuesta?',
      text: 'Verifique que haya diligenciado la encuesta antes de finalizar. No podrá diligenciarla nuevamente',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result === true) {
        $http({
          method: 'POST',
          url: "php/genesis/funcencuesta.php",
          data: {
            function: 'finalizarEncuesta', data: {
              documento: sessionStorage.getItem('cedula'),
              ubicacion: sessionStorage.getItem('municipio')
            }
          }
        }).then(function (response) {
          $scope.mostrarEncuesta = false
        });
      }
    })
  }


  //
  var Carga_Not_Glosa = [49759601, 32828955, 1140819735];
  if ((Carga_Not_Glosa.find(e => e == sessionStorage.getItem('cedula')) != undefined ? true : false)) {
    $http({
      method: 'POST',
      url: "php/genesis/funcgenesis.php",
      data: {
        function: 'Carga_Not_Glosa',
        nit: '0'
      }
    }).then(function (res) {
      notification.getNotification('info', res.data, 'Notificación');
    })
  }
  //

  $scope.empleadoMes = function () {
    $scope.rutas = [];
    $scope.swEmpleadoMes = '';
    $http({
      method: 'POST',
      url: "php/talentohumano/adminempleadomes.php",
      data: { function: 'litarEmpleadosMes' }
    }).then(function (response) {
      // console.log(response.data[0].datos)
      $scope.swEmpleadoMes = response.data[1].estado.estado;
      // $scope.sw = $scope.swEmpleadoMes == 'A' ? true : false;
      setTimeout(() => {
          $scope.$apply();
      }, 500);
      $scope.rutas = response.data[0].datos;
      setTimeout(() => {
           $('#carrusel').gallery_carousel();
        $scope.$apply();
      }, 1500);
    });
  }

  document.querySelector(".foot_p > p:nth-child(1)").classList.add('active');
  setInterval(() => {
    document.querySelectorAll(".foot_p > p").forEach(e => {
      e.classList.contains('active') ? e.classList.remove('active') : e.classList.add('active');
    });
  }, 5000);

  setTimeout(() => {
    setInterval(() => {
      $scope.HBD_Hoy();
    }, $scope.result_bd.hoy.length * 2000);
  }, 3000);

  ///////
  $scope.arraySlider = [
    // {titulo:'', url:''},
    {titulo:'',url:'Slider-reflexiondelasemana.jpg'},
    {titulo:'Capacitación a responsables del COPASST',url:'Slider-copasst2023-1.jpg'},
    {titulo:'Capacitación a responsables del COPASST',url:'Slider-copasst2023-2.jpg'},
    {titulo:'Capacitación a responsables del COPASST',url:'Slider-copasst2023-3.jpg'},
    {titulo:'Comenzaron los talleres de fogueo periodístico',url:'Slider-peridistico1.jpg'},
    {titulo:'Comenzaron los talleres de fogueo periodístico',url:'Slider-peridistico2.jpg'},
    {titulo:'',url:'Slider-reflexion-4.jpg'},
    {titulo:'',url:'Slider-reflexiondelasemana-3.jpg'},
    {titulo:'Direccionamiento estratégico 2023 para Cajacopi EPS',url:'Slider-Direccionamientoestratégico2023-2.jpg'},
    {titulo:'Direccionamiento estratégico 2023 para Cajacopi EPS',url:'Slider-Direccionamientoestratégico2023-3.jpg'},
    {titulo:'',url:'Slider-reflexiones-2.jpg'},
    {titulo:'',url:'Slider-reflexiones-de-la-semana.jpg'},
    {titulo:'',url:'Slider-reflexiones.jpg'},
    {titulo:'',url:'Slider-mensaje-año-nuevo.jpg'},
    {titulo:'',url:'Slider-SeguridadTIC.jpg'},
    /* {titulo:'',url:'Slider-navidad-21.jpg'},
    {titulo:'Novena navideña',url:'Slider-novenanavideña1.jpg'},
    {titulo:'Novena navideña',url:'Slider-novenanavideña2.jpg'},
    {titulo:'Novena navideña',url:'Slider-novenanavideña3.jpg'},
    {titulo:'Novena navideña',url:'Slider-novenanavideña4.jpg'},
    {titulo:'Simulacro de emergencia',url:'Slider-Smulacrodeemergencia1.jpg'},
    {titulo:'Simulacro de emergencia',url:'Slider-Smulacrodeemergencia2.jpg'},
    {titulo:'Simulacro de emergencia',url:'Slider-Smulacrodeemergencia3.jpg'},
    {titulo:'Simulacro de emergencia',url:'Slider-Smulacrodeemergencia4.jpg'},
    {titulo:'Simulacro de emergencia',url:'Slider-Smulacrodeemergencia5.jpg'},
   {titulo:'',url:'Slider-comunicar-nos-acerca.jpg'},
    {titulo:'',url:'Slider-SICI-Navidad.jpg'},
    {titulo:'',url:'Slider-navidad-dia.jpg'},
    {titulo:'Iniciamos ruta a la certificación de Icontec ISO 9001-2015',url:'Slider-AuditoríadeCalidadIcontec1.jpg'},
    {titulo:'Iniciamos ruta a la certificación de Icontec ISO 9001-2015',url:'Slider-AuditoríadeCalidadIcontec2.jpg'},
    {titulo:'Iniciamos ruta a la certificación de Icontec ISO 9001-2015',url:'Slider-AuditoríadeCalidadIcontec3.jpg'},
    {titulo:'',url:'Slider-navidad.jpg'},
    {titulo:'',url:'Slider-campaña-direcciondesalud.png'},
    {titulo:'',url:'Slider-campañaprincipioscalidad.jpg'},
    {titulo:'',url:'Slider-modelocoso.jpg'},
    {titulo:'El director de Salud, Roberto Solano, hace acompañamiento al equipo de trabajo en La Guajira',url:'Sliderfotodirector.jpg'},
    {titulo:'', url:'Slider-eficaciaprincipios.jpg'},
    {titulo:'Reunión directivos Cajacopi EPS y Supersalud: seguimiento PRI y a compromisos regional Meta.', url:'Slider-ReunióndirectivosCajacopiEPSySupersalud.jpg'},
    {titulo:'', url:'Slider-campaña-principios-desarrollohumano.jpg'},
    {titulo:'Mañanas de Bienestar en Cajacopi EPS', url:'Slider-mañanadebienestar1.jpg'},
    {titulo:'Mañanas de Bienestar en Cajacopi EPS', url:'Slider-mañanadebienestar2.jpg'},
    {titulo:'Mañanas de Bienestar en Cajacopi EPS', url:'Slider-mañanadebienestar3.jpg'},
    {titulo:'Mañanas de Bienestar en Cajacopi EPS', url:'Slider-mañanadebienestar4.jpg'},
    {titulo:'Mañanas de Bienestar en Cajacopi EPS', url:'Slider-mañanadebienestar5.jpg'},
    {titulo:'Mañanas de Bienestar en Cajacopi EPS', url:'Slider-mañanadebienestar6.jpg'},
    {titulo:'', url:'Slider-principioCalidad.jpg'},
    {titulo:'', url:'Slider-campaña-principios-eficacia.jpg'},
    {titulo:'', url:'Slider-lineas-de-defensa-001.png'},
    {titulo:'', url:'Slider-lineas-de-defensa-002.png'},
    {titulo:'', url:'Slider-lineas-de-defensa-003.png'},
    {titulo:'', url:'Slider_desarrollo.jpg'},*/

    /*Fecha de bajada de imagenes 11-15-2022*/
    /*{titulo:'Preauditoría ISO 9001 - 2015', url:'Slider_iso_1.jpg'},
    {titulo:'Preauditoría ISO 9001 - 2015', url:'Slider_iso_2.jpg'},
    {titulo:'Preauditoría ISO 9001 - 2015', url:'Slider_iso_3.jpg'},
    {titulo:'Preauditoría ISO 9001 - 2015', url:'Slider_iso_4.jpg'},*/

    /*{titulo:'Capacitación en identidad visual y consejos de redacción', url:'Slider_capa_1.jpg'},
    {titulo:'Capacitación en identidad visual y consejos de redacción', url:'Slider_capa_2.jpg'},
    {titulo:'Capacitación en identidad visual y consejos de redacción', url:'Slider_capa_3.jpg'},
    {titulo:'Capacitación en identidad visual y consejos de redacción', url:'Slider_capa_4.jpg'},
    {titulo:'Capacitación en identidad visual y consejos de redacción', url:'Slider_capa_5.jpg'},
    {titulo:'Capacitación en identidad visual y consejos de redacción', url:'Slider_capa_6.jpg'},*/

    /*{titulo:'Premios en la Semana de la Calidad', url:'Slider_premio_1.jpg'},
    {titulo:'Premios en la Semana de la Calidad', url:'Slider_premio_2.jpg'},
    {titulo:'Premios en la Semana de la Calidad', url:'Slider_premio_3.jpg'},
    {titulo:'Premios en la Semana de la Calidad', url:'Slider_premio_4.jpg'},*/
    //{titulo:'', url:'Slider_semana.png'},
    //{titulo:'', url:'Slider_semana_1.png'},
    /*{titulo:'', url:'Slider_semana_2.png'},
    {titulo:'', url:'Slider_calidad_1.png'},
    {titulo:'', url:'Slider_calidad_2.png'},

    {titulo:'Actividades en la Semana de la Calidad', url:'Slider_actividad_1.jpg'},
    {titulo:'Actividades en la Semana de la Calidad', url:'Slider_actividad_2.jpg'},
    {titulo:'Actividades en la Semana de la Calidad', url:'Slider_actividad_3.jpg'},
    {titulo:'Actividades en la Semana de la Calidad', url:'Slider_actividad_4.jpg'},

    {titulo:'Distintivo a líderes de la Calidad', url:'Slider_distinto_1.jpg'},
    {titulo:'Distintivo a líderes de la Calidad', url:'Slider_distinto_2.jpg'},
    {titulo:'Distintivo a líderes de la Calidad', url:'Slider_distinto_3.jpg'},
    {titulo:'Distintivo a líderes de la Calidad', url:'Slider_distinto_4.jpg'},*/

    /*{titulo:'Aumentando las competencias de Auditoría Interna', url:'Slider_competencias_1.JPG'},
    {titulo:'Aumentando las competencias de Auditoría Interna', url:'Slider_competencias_2.JPG'},
    {titulo:'Aumentando las competencias de Auditoría Interna', url:'Slider_competencias_3.JPG'},
    {titulo:'Aumentando las competencias de Auditoría Interna', url:'Slider_competencias_4.JPG'},*/
    //{titulo:'', url:'Slider_eficacia.png'},
    /*{titulo:'', url:'Slider_evolucion.png'},
    {titulo:'', url:'Slider_afi.jpg'},*/

  ];

    ///// Eventos cajacapi Eps ////
    /////
    // $scope.arraySliderEventos = [
    //     {titulo:'', url:''},
    //     {titulo:'', url:'Social1.jpg'},
    //         {titulo:'', url:'Social2.jpg'},
    //         {titulo:'', url:'Social3.jpg'},
    //         {titulo:'', url:'Social4.jpg'},
    //         {titulo:'', url:'Social5.jpg'},
    //         {titulo:'', url:'Social6.jpg'},
    //         {titulo:'', url:'Social7.jpg'},
    //         {titulo:'', url:'Social8.jpg'},
            // {titulo:'', url:'1.jpg'},
            // {titulo:'', url:'2.jpg'},
            // {titulo:'', url:'3.jpg'},
            // {titulo:'', url:'4.jpg'},
            // {titulo:'', url:'5.jpg'},
        // {titulo:'', url:'6.jpg'},
        // {titulo:'', url:'7.jpg'},
        // {titulo:'', url:'8.jpg'},
        // {titulo:'', url:'9.jpg'},
        // {titulo:'', url:'10.jpg'},
        // {titulo:'', url:'11.jpg'},
        // {titulo:'', url:'12.jpg'},
        // {titulo:'', url:'13.jpg'},
        // {titulo:'', url:'14.jpg'},
        // {titulo:'', url:'15.jpg'},
        // {titulo:'', url:'16.jpg'},
        // {titulo:'', url:'17.jpg'},
        // {titulo:'', url:'18.jpg'},
        // {titulo:'', url:'19.jpg'},
        // {titulo:'', url:'20.jpg'},
        // {titulo:'', url:'21.jpg'},
        // {titulo:'', url:'22.jpg'},
        // {titulo:'', url:'23.jpg'},
    //     {titulo:'', url:'24.jpg'},
    //     {titulo:'', url:'25.jpg'},
    //     {titulo:'', url:'26.jpg'},
    //     {titulo:'', url:'27.jpg'},
    //     {titulo:'', url:'28.jpg'},
    //     // {titulo:'', url:'CARNAVAL202313.jpg'},
    //     // {titulo:'', url:'14n.jpg'},
    //     // {titulo:'', url:'15n.jpg'},
    //     // {titulo:'', url:'16n.jpg'},
    //     // {titulo:'', url:'PORTADA.jpg'},
    //     // {titulo:'', url:'1.jpg'},
    //     // {titulo:'', url:'2.jpg'},
    //     // {titulo:'', url:'3.jpg'},
    //     // {titulo:'', url:'4.jpg'},
    //     // {titulo:'', url:'5.jpg'},
    //     // {titulo:'', url:'6.jpg'},
    //     // {titulo:'', url:'7.jpg'},
    //     // {titulo:'', url:'8.jpg'},
    //     // {titulo:'', url:'9.jpg'},
    //     // {titulo:'', url:'10.jpg'},
    //     // {titulo:'', url:'11.jpg'},
    //     // {titulo:'', url:'12.jpg'},
    //     // {titulo:'', url:'13.jpg'},
    //     // {titulo:'', url:'14.jpg'},
    //     // {titulo:'', url:'15.jpg'},
    //     // {titulo:'', url:'16.jpg'},
    //     // {titulo:'', url:'17.jpg'},
    //     // {titulo:'', url:'18.jpg'},
    //     // {titulo:'', url:'20.jpg'},
    //     // {titulo:'', url:'21.jpg'},
    //     // {titulo:'', url:'22.jpg'},
    //     // {titulo:'', url:'23.jpg'},
    //     // {titulo:'', url:'24.jpg'},
    //     // {titulo:'', url:'25.jpg'},
    //     // {titulo:'', url:'26.jpg'},
      // ];

  ///////
  // $scope.arraySliderEmpleadosdelAno = [
    // {titulo:'', url:''},
  //   {titulo:'', url:'1.jpg'},
  //   {titulo:'', url:'Diapositiva2.jpg'},
  //   {titulo:'', url:'Diapositiva3.jpg'},
  //   {titulo:'', url:'Diapositiva4.jpg'},
  //   {titulo:'', url:'Diapositiva5.jpg'},
  //   {titulo:'', url:'Diapositiva6.jpg'},
  //   {titulo:'', url:'Diapositiva7.jpg'},
  //   {titulo:'', url:'Diapositiva8.jpg'},
  //   {titulo:'', url:'Diapositiva9.jpg'},
  //   {titulo:'', url:'Diapositiva10.jpg'},
  //   {titulo:'', url:'Diapositiva11.jpg'},
  //   {titulo:'', url:'Diapositiva12.jpg'},
  //   {titulo:'', url:'Diapositiva13.jpg'},
  //   {titulo:'', url:'Diapositiva14.jpg'},
  //   {titulo:'', url:'Diapositiva15.jpg'},
  //   {titulo:'', url:'Diapositiva16.jpg'},
  //   {titulo:'', url:'Diapositiva17.jpg'},
  //   {titulo:'', url:'Diapositiva18.jpg'},
  //   {titulo:'', url:'Diapositiva19.jpg'},
  //   {titulo:'', url:'Diapositiva20.jpg'},
  //   {titulo:'', url:'Diapositiva21.jpg'},
  //   {titulo:'', url:'Diapositiva22.jpg'},
  //   {titulo:'', url:'Diapositiva23.jpg'},
  //   {titulo:'', url:'Diapositiva24.jpg'},
  //   {titulo:'', url:'Diapositiva25.jpg'},
  //   {titulo:'', url:'Diapositiva26.jpg'},
  //   {titulo:'', url:'Diapositiva27.jpg'},
  //   {titulo:'', url:'Diapositiva28.jpg'},
  //   {titulo:'', url:'Diapositiva29.jpg'},
  //   {titulo:'', url:'Diapositiva30.jpg'},
  //   {titulo:'', url:'Diapositiva31.jpg'},
  //   {titulo:'', url:'Diapositiva32.jpg'},
  //   {titulo:'', url:'Diapositiva33.jpg'},
  // ];

  $scope.listarImagenesActuales = function () {
    $scope.array = { Slider : [] };
    $http({
      method: 'POST',
      url: "php/banner/adminbannergenesis.php",
      // url: "php/publicidad/adminbannergxenesis.php",
      data: {
        function: 'listarImagenesGenesis',
      }
    }).then(function ({ data }) {
      // console.log(data)
      if (data.length > 0) {
        swal.close()
        $scope.array.Slider = data;
        setTimeout(() => {
          // console.log($scope.array.Slider)
          $scope.$apply();
        }, 1000);
      }
    });
  }



  angular.element(document).ready(function () {
    $scope.listarImagenesActuales();
    $timeout(function () {
      $('.slider').slider({ full_width: true, interval: 5000 });
    }, 1000);
  });


}]);

