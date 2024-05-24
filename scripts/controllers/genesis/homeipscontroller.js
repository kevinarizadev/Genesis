'use strict';
angular.module('GenesisApp').controller('inicioipsController', ['$scope', 'notification', '$http', function ($scope, notification, $http) {
  $scope.event = 'Play';


  $scope.ente_territorial = sessionStorage.getItem('ente_territorial')
  console.log($scope.ente_territorial);

  if ($scope.ente_territorial == "S") {
    $scope.mostrar_ente = true;
    $scope.mostrar_ips = false;


  } else {
    $scope.mostrar_ente = false;
    $scope.mostrar_ips = true;
  }




  $scope.playVideo = function (event) {
    var vid = document.getElementById("myVideo");
    if (event == 'Play') {
      vid.play();
      $scope.event = 'Pause';
    } else {
      vid.pause();
      $scope.event = 'Play';
    }
  }





  $scope.plusSlides = function (n) {
    $scope.showSlides(slideIndex += n);
  }

  $scope.currentSlide = function (n) {
    $scope.showSlides(slideIndex = n);
  }

  $scope.imgs = {
    url: "assets/images/video-img.jpeg",
    url: "assets/images/sarlaft.png",
    url: "assets/images/ips-slides.png"
  }

  $scope.showSlides = function (n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }

  var slideIndex = 1;
  $scope.showSlides(slideIndex);


  // if (sessionStorage.getItem('nit') == '900465319') {
  $http({
    method: 'POST',
    url: "php/genesis/funcgenesis.php",
    data: {
      function: 'Carga_Not_Glosa',
      nit: sessionStorage.getItem('nit')
    }
  }).then(function (res) {
    var x = res.toString();
    notification.getNotification('info', res.data, 'Notificación');
  })


  $http({
    method: 'POST',
    url: "php/contratacion/funccontratacion.php",
    data: {
      function: 'P_VALIDA_PENDIENTE_SOPORTE',
      nit: sessionStorage.getItem('nit')
    }
  }).then(function ({ data }) {
    if (data.codigo == '0') {

      swal({
        title: 'Mensaje',
        text: data.nombre,
        type: 'info',
        // showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result) {
        }
      })
      // notification.getNotification('info', data.nombre, 'Notificación');
    }

  })

  // swal({
  //   title: 'Mensaje',
  //   text: 'Tienes documentos pendientes por firmar: 1',
  //   type: 'info',
  //   // showCancelButton: true,
  //   allowOutsideClick: false,
  //   allowEscapeKey: false,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Continuar'
  // }).then((result) => {
  //   if (result) {
  //   }
  // })


  // }

}])
