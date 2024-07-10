'use strict';
angular.module('GenesisApp')
  .controller('cambioclaveepscontroller', ['$http', '$scope',
    function ($http, $scope) {

      $scope.inputType = {
        new: "password",
        verify: "password"
      };

      $scope.alerts = { n1: false, n2: false, n3: false, mensaje: "La nueva contraseña debe tener como mínimo 6 caracteres e incluir por lo menos 1 letra en mayúscula, 1 número y 1 carácter especial (~!$%^&*_=+.@/-)" };


      $scope.configureProfile = {
        passwordNew: "Kevin2024.",
        passwordVerify: "",
        img: "",
        ext: ""
      };

      $scope.saveChanges = function () {

        if ($scope.configureProfile.passwordNew == "" || $scope.configureProfile.passwordVerify == "") {
          swal('Mensaje', 'Debe digitar la nueva contraseña', 'warning');
          return
        }
        if ($scope.configureProfile.passwordNew != $scope.configureProfile.passwordVerify) {
          swal('Mensaje', 'Las contraseñas no coinciden', 'warning');
          return
        }

        // let regex = "/cajacopi/gmi";
        var regex = /(caja|copi|cajacopi|genesis|eps)/gmi;
        if (regex.test($scope.configureProfile.passwordNew)) {
          $scope.alerts.n2 = true;
          $scope.alerts.n3 = true;
          $scope.alerts.mensaje = "Contraseña no permitida";
          // swal('Mensaje', 'Contraseña no permitida', 'warning');
          return
        }

        var json = JSON.stringify($scope.configureProfile);
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Actualizando...</p>',
          width: 200,
          // allowOutsideClick: false,
          // allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'configurarCuenta',
            data: json
          }
        }).then(function ({ data }) {
          console.log(data);
          if (data.codigo == 0) {
            swal({
              text: 'Contraseña actualizada correctamente. Cerrando sesion...',
              timer: 5000,
              onOpen: () => {
                swal.showLoading()
              }
            });
            setTimeout(() => {
              window.location.href = 'php/cerrarsession.php';
            }, 5000);

          } else if (data.codigo.toString() == "1") {
            swal.close();
            $scope.alerts.mensaje = data.mensaje;
            switch (data.cod_err) {
              default:
                alert("Nada");
                break;
              case "1":
                $scope.alerts.n2 = true;
                break;
              case "2":
                $scope.alerts.n3 = true;
                break;
              case "3":
                $scope.alerts.n1 = true;
                break;
              case "4":
                $scope.alerts.n2 = true;
                break;
              case "5":
                $scope.alerts.n3 = true;
                break;
              case "6":
                $scope.alerts.n2 = true;
                break;
              case "7":
                $scope.alerts.n2 = true;
                break;
              case "8":
                $scope.alerts.n2 = true;
                break;
            }
          };
        });
      }



    }
  ]);
