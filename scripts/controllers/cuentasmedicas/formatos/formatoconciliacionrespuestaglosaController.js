angular.module('GenesisApp', []).config(function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}).controller('formatoconciliacionrespuestaglosaController', ['$scope', '$http', '$location', function ($scope, $http, $location) {


  $scope.nombre = $location.search().nombre;

  $scope.Datos = new Array();
  $scope.total = 0;

  var f = new Date();
  var hours = f.getHours();
  var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
  var seg = (f.getSeconds() <= 9) ? '0' + f.getSeconds() : f.getSeconds();
  var min = (f.getMinutes() <= 9) ? '0' + f.getMinutes() : f.getMinutes();
  var hora = (f.getHours() <= 9) ? '0' + f.getHours() : f.getHours();
  var dia = (f.getDate() <= 9) ? '0' + f.getDate() : f.getDate();
  var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
  $scope.FechayHora = dia + '/' + mes + '/' + f.getFullYear() + '  ' + hora + ':' + min + ':' + seg + ' ' + ampm;
  $scope.fecha = [dia, mes, f.getFullYear()].join('/');

  $scope.totalFactura = 0;
  $scope.totalGlosa = 0;

  $scope.Total_Glosa_IPS = 0;
  $scope.Total_Glosa_EPS = 0;
  $scope.Total_Glosa_MANT = 0;

  $scope.datosDetalle = [{}]
  swal({ title: 'Cargando...', allowOutsideClick: false });
  swal.showLoading();

  $http({
    method: 'POST',
    url: "../../../php/cuentasmedicas/consultagesnotglosa.php",
    data: {
      function: 'p_certificado_respuesta_glosa',
      // numero: 1,
      // ubicacion: 8001
      documento: 'NG',
      numero: $location.search().numero,
      ubicacion: $location.search().ubicacion
    }
  }).then(function ({ data }) {
    swal.close()
    $scope.datosDetalle = data.json;
    $scope.ips = data.json[0].RAZON_SOCIAL;
    $scope.ipsNit = data.json[0].NIT;
    // $scope.lugar = data.json[0].UBICACION;
    $scope.lugar = 'BARRANQUILLA';
    $scope.responsableIPS = data.json[0].NOMBRE_USU_IPS;
    $scope.responsableEPS = data.json[0].RESPONSABLE_EPS;

    data.json.forEach(e => {
      e.VALOR_FS = e.VALOR_FS || "0";
      e.VALOR_GLOSA = e.VALOR_GLOSA || "0";
      e.NTDV_VALOR_GI_IPS = e.NTDV_VALOR_GI_IPS || "0";
      e.NTDV_VALOR_GL_EPS = e.NTDV_VALOR_GL_EPS || "0";
      e.NTDV_VALOR_RATIFICADO = e.NTDV_VALOR_RATIFICADO || "0";

      $scope.totalFactura = parseFloat(e.VALOR_FS) + $scope.totalFactura;
      $scope.totalGlosa = parseFloat(e.VALOR_GLOSA) + $scope.totalGlosa;
      $scope.Total_Glosa_IPS = parseFloat(e.NTDV_VALOR_GI_IPS) + $scope.Total_Glosa_IPS;
      $scope.Total_Glosa_EPS = parseFloat(e.NTDV_VALOR_GL_EPS) + $scope.Total_Glosa_EPS;
      $scope.Total_Glosa_MANT = parseFloat(e.NTDV_VALOR_RATIFICADO) + $scope.Total_Glosa_MANT;

    });

    $scope.Total_Glosa_IPS = $scope.Total_Glosa_IPS || "0"
    $scope.Total_Glosa_EPS = $scope.Total_Glosa_EPS || "0"
    $scope.Total_Glosa_MANT = $scope.Total_Glosa_MANT || "0"



  })

  console.log(1);

  $scope.formatPeso2 = function (num) {
    if (num != undefined && num != null && num != "") {
      var regex2 = new RegExp("\\.");
      if (regex2.test(num)) {
        num = num.toString().replace('.', ',');
        num = num.split(',');
        num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num[0] = num[0].split('').reverse().join('').replace(/^[\.]/, '');
        if (num[1].length > 1 && num[1].length > 2) {
          num[1] = num[1].toString().substr(0, 2);
        }
        if (num[1].length == 1) {
          num[1] = num[1] + '0';
        }
        return num[0] + ',' + num[1];
      } else {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        return num + ',00';
      }
    }
  }
}]);
