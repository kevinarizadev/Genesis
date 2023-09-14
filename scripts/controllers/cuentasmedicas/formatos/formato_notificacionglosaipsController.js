angular.module('GenesisApp', []).config(function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}).controller('formato_notificacionglosaipsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  // $scope.Cargo = JSON.parse($location.search().datos).cargo;
  // $scope.Nombre = JSON.parse($location.search().datos).nombre;
  // $scope.nit = JSON.parse($location.search().datos).nit;
  // //$scope.ips = JSON.parse($location.search().datos).ips;
  // $scope.direcion = JSON.parse($location.search().datos).direcion;
  $scope.usuario_nombre = sessionStorage.getItem('nombre');
  console.log(sessionStorage.getItem('nombre'));
  console.log($scope.nombre)

  $scope.documentoNG = $location.search().documento;
  $scope.numero = $location.search().numero;
  $scope.ubicacion = $location.search().ubicacion;

  $scope.Datos = new Array();
  $scope.total = 0;
  $scope.consecutivo = "";
  var f = new Date();
  var hours = f.getHours();
  var ampm = hours >= 12 ? 'p.m.' : 'a.m.';
  var seg = (f.getSeconds() <= 9) ? '0' + f.getSeconds() : f.getSeconds();
  var min = (f.getMinutes() <= 9) ? '0' + f.getMinutes() : f.getMinutes();
  var hora = (f.getHours() <= 9) ? '0' + f.getHours() : f.getHours();
  var dia = (f.getDate() <= 9) ? '0' + f.getDate() : f.getDate();
  var mes = ((f.getMonth() + 1) <= 9) ? '0' + (f.getMonth() + 1) : (f.getMonth() + 1);
  $scope.FechayHora = dia + '/' + mes + '/' + f.getFullYear() + '  ' + hora + ':' + min + ':' + seg + ' ' + ampm;
  var time = new Date();

  $http({
    method: 'POST',
    url: "../../../php/cuentasmedicas/notificacionglosaips.php",
    data: {
      function: 'p_certificado_notificacion_glosa',

      documento: $location.search().documento,
      numero: $location.search().numero,
      ubicacion: $location.search().ubicacion
    }
  }).then(function ({ data }) {
    $scope.datos = data.json;
    // $scope.ips = data[0].NOMBRE_IPS;
    $scope.datos2 = data.json2[0];

    // CANTIDAD_FACTURAS:        "4"
    // VALOR_FACTURAS:        "167067494"
    // VALOR_GLOSAS:        "24881481,66"

    // data.forEach(e => {
    //     $scope.Total_Factura = parseFloat(e.VALOR_FACTURA) + $scope.Total_Factura;
    //     $scope.Total_Glosa = parseFloat(e.VALOR_GLOSADO) + $scope.Total_Glosa;
    // });
  })
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
