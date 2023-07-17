'use strict';
angular.module('GenesisApp2', []).config(function ($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}).controller('formulario_afi_re_no_sgsss_controller', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
  function validar_json(str) {
    try {
      if (typeof str !== "string") {
        return false;
      } else {
        return (typeof JSON.parse(str) === 'object');
      }
    } catch (e) {
      return false;
    }
  }
  $scope.solicitud = JSON.parse($location.search().datos);
  if ($scope.solicitud.APORTANTE != null) {
    if ($scope.solicitud.APORTANTEpos != -1){
      $scope.solicitud.APORTANTE = $scope.solicitud.APORTANTE.replace("Y","&");
    }else{
      $scope.solicitud.APORTANTE = $scope.solicitud.APORTANTE;
    }
  }
  $scope.form_data = {};
  $scope.variables = {
    pagina_1: {

    },
    pagina_2: {
      v40_1: false,
      v40_2: false,
      v40_3: false,
      v40_4: false,
      v40_5: false,
      v40_5_codigo: "",
      v40_6: false,
      v40_7: false,
      v40_8: false,
      v40_9: false,
      v40_10: false,
      v40_11: false,
      v40_12: false,
      v40_13: false,
      v40_13_a: false,
      v40_13_b: false,
      v40_14: false,
      v40_14_a: false,
      v40_14_b: false,
      v40_15: false,
      v40_16: false,
      v40_17: false,
      v40_18: false
    }
  };
  console.log($scope.solicitud);
  if ($scope.solicitud.nota_imprimir == 'S') {
    alert('El formulario debe ser impreso y firmado, deberá ser escaneado y adjuntarlo en archivo pdf en un tiempo no mayor a 48 horas en la transacción realizada con los documentos soporte de su grupo familiar, de lo contrario el registro será anulado y deberá ingresar nuevamente a la plataforma para realizar el trámite.');
  }
  swal('Importante', 'Descargando formato...','info');
  $http({
    method: 'POST',
    url: "../../../php/movilidad/afiliacion_linea.php",
    data: {
      function: 'detalle_afiliacion',
      origen: "S",
      codigo: $scope.solicitud.RADICADO,
    }
  }).then(function (response) {
    if (validar_json(angular.toJson(response.data)) && response.data.datos_basicos != null) {
      $scope.form_data = response.data;
      console.log($scope.form_data);
      var i = $scope.form_data.beneficiarios.findIndex(elemt => elemt.PARENTESCO == "CÓNYUGUE");
      if (i != -1) {
        $scope.conyugue_beneficiario = new Array();
        $scope.conyugue_beneficiario = {
          CONYUGE_PRI_APELLIDO: $scope.form_data.beneficiarios[i].BEN_PRI_APELLIDO,
          CONYUGE_SEG_APELLIDO: $scope.form_data.beneficiarios[i].BEN_SEG_APELLIDO,
          CONYUGE_PRI_NOMBRE: $scope.form_data.beneficiarios[i].BEN_PRI_NOMBRE,
          CONYUGE_SEG_NOMBRE: $scope.form_data.beneficiarios[i].BEN_SEG_NOMBRE,
          CONYUGE_TIPO_DOC: $scope.form_data.beneficiarios[i].BEN_TIPO_DOC,
          CONYUGE_DOC: $scope.form_data.beneficiarios[i].BEN_DOCUMENTO,
          CONYUGE_GENERO: $scope.form_data.beneficiarios[i].GENERO,
          CONYUGE_F_NACIMIENTO: $scope.form_data.beneficiarios[i].BEN_FECHA_NACIMIENTO,
          CONYUGE_DIRECCION: $scope.form_data.beneficiarios[i].BEN_DIRECCION,
          CONYUGE_MUNICIPIO_NOMBRE: $scope.form_data.beneficiarios[i].UBICACION,
          CONYUGE_ZONA: $scope.form_data.beneficiarios[i].BEN_ZONA,
          CONYUGE_DEPARTAMENTO_NOMBRE: $scope.form_data.beneficiarios[i].DEPARTAMENTO,
          CONYUGE_IPS_CODIGO: $scope.form_data.beneficiarios[i].BEN_COD_IPS,
          CONYUGE_TELEFONO: $scope.form_data.beneficiarios[i].TELEFONO,
          CONYUGE_CELULAR: $scope.form_data.beneficiarios[i].CELULAR,
        }
        console.log($scope.conyugue_beneficiario);
      }
      // pagina 1

      // pagina 2
      // if ($scope.form_data.datos_basicos.TIPO_SOLICITUD == 'Afiliación') {
      //   $scope.variables.pagina_2.v40_9 = true;
      //   $scope.variables.pagina_2.v40_13 = true;
      //   $scope.variables.pagina_2.v40_13_a = true;
      // } else if ($scope.form_data.datos_basicos.TIPO_SOLICITUD == 'Incusión de beneficiarios') {
      //   $scope.variables.pagina_2.v40_7 = true;
      // }
      swal.close();
      setTimeout(() => {
        window.html2canvas = html2canvas;
        window.jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();

        // Source HTMLElement or a string containing HTML.
        var elementHTML = document.querySelector("#content");
        doc.addPage();
        doc.html(elementHTML, {
          callback: function (doc) {
            // Save the PDF
             doc.save('Formato Unico de afiliacion y registro.pdf');
            //window.open(doc.output('bloburl'), '_parent');
            setTimeout(() => {
             window.close()
            }, 500);
            // doc.output('datauri');
          },
          x: 15,
          // y: 15,
          width: 100, //target width in the PDF document
          windowWidth: 460 //window width in CSS pixels
        });
        // window.print();
      }, 500);
    } else {
      // swal('Mensaje', 'No se obtuvo resultados para el detalle_afiliacion intentelo nuevamente mas tarde', 'info');
      document.write("No se obtuvo resultados para el codigo:" + $scope.solicitud.RADICADO);
    }
  });
  $scope.get_top = function (index, inicial, espacio) {
    return (index * espacio + inicial) + "em";
  }
}]);
