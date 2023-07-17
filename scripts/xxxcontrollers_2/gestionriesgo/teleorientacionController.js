'use strict';

angular.module('GenesisApp')

  .controller('teleorientacionController', ['$scope', '$http', 'ngDialog','$filter', function ($scope, $http, ngDialog,$filter) {



    $scope.tiposeguimiento = [{ 'CODIGO': '1', 'NOMBRE': 'DEMANDA ESPONTANEA' }, { 'CODIGO': '2', 'NOMBRE': 'PACIENTE POSITIVO COVID-19' },
    { 'CODIGO': '3', 'NOMBRE': 'PACIENTE SOSPECHA COVID-19' }, { 'CODIGO': '4', 'NOMBRE': 'USUARIO CON FAMILAR FALLECIDO POR COVID-19' },
    { 'CODIGO': '5', 'NOMBRE': 'OTRO' }];

    $scope.discapacidad = [{ 'CODIGO': 'N', 'NOMBRE': 'NO' }, { 'CODIGO': 'S', 'NOMBRE': 'SI' }];
    $scope.embarazo = [{ 'CODIGO': 'N', 'NOMBRE': 'NO' }, { 'CODIGO': 'S', 'NOMBRE': 'SI' }];

    $scope.trimestre = [{ 'CODIGO': '1', 'NOMBRE': 'I TRIMESTRE' }, { 'CODIGO': '2', 'NOMBRE': 'II TRIMESTRE' },
    { 'CODIGO': '3', 'NOMBRE': 'III TRIMESTRE' }, { 'CODIGO': '4', 'NOMBRE': 'NO APLICA' }];

    $scope.patologias = [
      {
        "CODIGO": "1",
        "NOMBRE": "HIPERTENSION ARTERIAL",
        "CHECK": false
      },
      {
        "CODIGO": "2",
        "NOMBRE": "DIABETES MELLITUS",
        "CHECK": false
      },
      {
        "CODIGO": "3",
        "NOMBRE": "EPOC / ASMA",
        "CHECK": false
      },
      {
        "CODIGO": "4",
        "NOMBRE": "ARTRITIS Y OTRAS AUTOINMUNES",
        "CHECK": false
      },
      {
        "CODIGO": "5",
        "NOMBRE": "VIH Y OTRAS INMUNODEFICIENCIAS",
        "CHECK": false
      },
      {
        "CODIGO": "6",
        "NOMBRE": "TUBERCULOSIS O HEPATITIS C",
        "CHECK": false
      },
      {
        "CODIGO": "7",
        "NOMBRE": "CONSUMO DE SPA",
        "CHECK": false
      },
      {
        "CODIGO": "8",
        "NOMBRE": "PATOLOGIA DE SALUD MENTAL",
        "CHECK": false
      },
      {
        "CODIGO": "9",
        "NOMBRE": "OTRO",
        "CHECK": false
      }
    ];

    $scope.infobasica = {
      correo: null,
      direccion: null,
      telefono: null,
      celular: null,
      barrio: null
    }

    $scope.teleorientacion = {
      fecha: null,
      fecha_input: null,
      tipo_seguimiento: null,
      discapacidad: null,
      embarazo: null,
      trimestre: null,
      p_hipertension: 'N',
      p_diabetes: 'N',
      p_epoc_asma: 'N',
      p_artritis_otras_autoinmunes: 'N',
      p_vih_otras_inmunodeficiencias: 'N',
      p_tuberculosis_hepatitis_c: 'N',
      p_consumo_de_spa: 'N',
      p_patologia_salud_mental: 'N',
      p_otro: 'N',
      factores_riesgo: null,
      factores_protectores: null,
      conducta_remision: null,
      p_sexo: null
    }

    $scope.evolucion = {
      codigo: null,
      fecha: null,
      fecha_input: null,
      observacion: null
    }

    $scope.tituloview = '';
    $scope.iconview = '';
    $scope.tipoDoc = "0";
    $scope.documento = "";
    $scope.vtab = 'I';
    $scope.vtabh = 'H';
    $scope.inactive2 = true;
    $scope.teleorientaciones = [];
    $scope.hidenbuttonfloating = true;
    $scope.tempteleorientacion = null;
    $scope.inactivembarazo = false;
    $scope.selectembarazo = '';
    $scope.selectrimestre = '';
    $scope.tempatologias = [];


    $scope.buscarAfiliado = function () {
      $scope.accionview('I');
      $scope.inactive2 = true;
      $scope.Data = [];
      if ($scope.tipoDoc != "0" && $scope.documento != "" && $scope.tipoDoc != null && $scope.documento != undefined && $scope.tipoDoc != undefined && $scope.documento != null) {
        $scope.inactive2 = false;
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/gestionriesgo/gestionriesgo.php",
          data: { function: 'p_obtener_datos_afiliado', tipodocumento: $scope.tipoDoc, documento: $scope.documento }
        }).then(function (response) {
          swal.close();
          if (response.data != "0" && response.data.DOCUMENTO != "") {
            $scope.inactive2 = true;
            $scope.accionview('R');
            $scope.Data = response.data;
            $scope.infoafiliadotele = response.data;
            $scope.changeEmbarazo($scope.infoafiliadotele.SexoCodigo);
            $scope.calcularEdad($scope.infoafiliadotele.FechaNacimiento);

          } else {
            swal('Genesis', 'Afiliado no registra en nuestra base de datos!', 'info');

            setTimeout(function () {
              $scope.inactive2 = true;
            }, 200);
          }
        });
      }
      else {
        swal('Genesis', 'Datos del afiliado incompletos', 'warning');
      }
    }

    $scope.changeEmbarazo = function (params) {
      console.log(params);
      if (params == 'M') {
        $scope.inactivembarazo = false;
        $scope.selectembarazo = 'N';
        $scope.teleorientacion.embarazo = 'N';
        $scope.selectrimestre = 'NO APLICA';
        $scope.teleorientacion.trimestre = 'NO APLICA';
      }
      if (params == 'N') {
        $scope.inactivembarazo = false;
        $scope.selectembarazo = 'N';
        $scope.teleorientacion.embarazo = 'N';
        $scope.selectrimestre = 'NO APLICA';
        $scope.teleorientacion.trimestre = 'NO APLICA';
      }
      if (params == 'F' || params == 'S') {
        $scope.inactivembarazo = false;
        $scope.selectembarazo = '';
        $scope.selectrimestre = '';
      }
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

    $scope.calcularEdad = function (date) {
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


        if (edad > 0) {

          $scope.cantidadanosautpro = 'años'

          if (edad == 1) {

            $scope.cantidadanosautpro = 'años'

          }

          $scope.edadautpro = edad;

        } else {

          if (meses > 0) {

            $scope.cantidadanosautpro = 'meses'

            if (meses == 1) {

              $scope.cantidadanosautpro = 'mes'

            }

            $scope.edadautpro = meses;

          } else {

            if (dias > 0) {

              $scope.cantidadanosautpro = 'dias'

              if (dias == 1) {

                $scope.cantidadanosautpro = 'dia'

              }

              $scope.edadautpro = dias;

            }

          }

        }





      }

    }

    function formatDate(date) {
      var d = new Date(date);
      var dd = ('0' + d.getDate()).slice(-2);
      var mm = ('0' + (d.getMonth() + 1)).slice(-2);
      var yyyy = d.getFullYear();
      var hh = d.getHours();
      var mi = d.getMinutes();
      return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
    }

    $scope.accionview = function (params, item) {
      if (params == 'U') {
        $scope.vtab = 'U';
        $scope.tituloview = 'Editar Información';
        $scope.iconview = 'icon-edit';
        $scope.infobasica.correo = $scope.infoafiliadotele.email;
        $scope.infobasica.direccion = $scope.infoafiliadotele.DIRECCION;
        $scope.infobasica.telefono = $scope.infoafiliadotele.AFIC_TELEFONO;
        $scope.infobasica.celular = $scope.infoafiliadotele.AFIC_CELULAR;



      }
      if (params == 'A') {
        $scope.vtab = 'A';
        $scope.tituloview = 'Crear Teleorientacion';
        $scope.iconview = 'icon-person';
        for (let index = 0; index < $scope.patologias.length; index++) {
          $scope.patologias[index].CHECK = false;
        }
                
        var f = new Date();      
        $scope.teleorientacion.fecha_input = new Date($filter('date')((f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()), "yyyy-MM-dd"));

      }
      if (params == 'E') {
        $scope.vtab = 'E';
        $scope.tituloview = 'Crear Evolucion';
        $scope.iconview = 'icon-person';        
         var f = new Date();
        $scope.evolucion.fecha_input = new Date($filter('date')((f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()), "yyyy-MM-dd"));
        $scope.tempteleorientacion = item;        

      }
      if (params == 'C') {
        $scope.vtab = 'C';
        $scope.tituloview = 'Ver TeleOrientaciones';
        $scope.iconview = 'icon-eye';

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/gestionriesgo/gestionriesgo.php",
          data: { function: 'p_obtener_teleorientacion', tipodocumento: $scope.tipoDoc, documento: $scope.documento }
        }).then(function (response) {
          swal.close();
          $scope.teleorientaciones = response.data;

        });
      }
      if (params == 'V') {
        $scope.tempteleorientacion = item;
        $scope.tituloview = 'Ver Evoluciones';
        $scope.iconview = 'icon-eye';
        $scope.vtab = 'V';
        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        $http({
          method: 'POST',
          url: "php/gestionriesgo/gestionriesgo.php",
          data: { function: 'p_obtener_evolucion', numero: item.codigo }
        }).then(function (response) {
          swal.close();
          $scope.evoluciones = response.data;
        });
      }
      if (params == 'R') {
        $scope.vtab = 'R';
        $scope.tituloview = '';
      }
      if (params == 'I') {
        $scope.vtab = 'I';
        $scope.tituloview = '';
        $scope.iconview = '';
      }
    }

    $scope.select_item_patologia = function (index, checked, name) {
      console.log(index, checked);

      if (checked == false) {
        var tempIndex = $scope.getPosition($scope.tempatologias, $scope.patologias[index]);
        $scope.tempatologias[tempIndex] = null;


      } else if (checked == true) {
        $scope.tempatologias.push($scope.patologias[index]);
      }
      $scope.removePositionNull($scope.tempatologias);
    }
    $scope.removePositionNull = function (array) {
      var filtered = array.filter(function (el) {
        return el != null;
      });
      return filtered;
    }

    $scope.getjsonfiels = function (params) {
      params.forEach(element => {
        if (element.NOMBRE) {
          if (element.NOMBRE == "HIPERTENSION ARTERIAL") {
            $scope.teleorientacion.p_hipertension = 'S';
          } else if (element.NOMBRE == "DIABETES MELLITUS") {
            $scope.teleorientacion.p_diabetes = 'S';
          } else if (element.NOMBRE == "EPOC / ASMA") {
            $scope.teleorientacion.p_epoc_asma = 'S';
          } else if (element.NOMBRE == "ARTRITIS Y OTRAS AUTOINMUNES") {
            $scope.teleorientacion.p_artritis_otras_autoinmunes = 'S';
          } else if (element.NOMBRE == "VIH Y OTRAS INMUNODEFICIENCIAS") {
            $scope.teleorientacion.p_vih_otras_inmunodeficiencias = 'S';
          } else if (element.NOMBRE == "TUBERCULOSIS O HEPATITIS C") {
            $scope.teleorientacion.p_tuberculosis_hepatitis_c = 'S';
          } else if (element.NOMBRE == "CONSUMO DE SPA") {
            $scope.teleorientacion.p_consumo_de_spa = 'S';
          } else if (element.NOMBRE == "PATOLOGIA DE SALUD MENTAL") {
            $scope.teleorientacion.p_patologia_salud_mental = 'S';
          } else if (element.NOMBRE == "OTRO") {
            $scope.teleorientacion.p_otro = 'S';
          }
        }

      });
      // for (let index = 0; index < params.length; index++) {
      //   const element = params[index];
      //   console.log(element);
      //   console.log(element.NOMBRE); 


      // }
    }

    $scope.showPatologias = function (item) {
      var tempatolias = "";
      if (item.p_hipertension == 'S') {
        tempatolias = tempatolias + 'HIPERTENSION ARTERIAL <br>';
      }
      if (item.p_diabetes == 'S') {
        tempatolias = tempatolias + 'DIABETES MELLITUS <br>';
      }

      if (item.p_epoc_asma == 'S') {
        tempatolias = tempatolias + 'EPOC / ASMA <br>';
      }

      if (item.p_artritis_otras_autoinmunes == 'S') {
        tempatolias = tempatolias + 'ARTRITIS Y OTRAS AUTOINMUNES <br>';
      }
      if (item.p_tuberculosis_hepatitis_c == 'S') {
        tempatolias = tempatolias + 'TUBERCULOSIS O HEPATITIS C <br>';
      }
      if (item.p_vih_otras_inmunodeficiencias == 'S') {
        tempatolias = tempatolias + 'VIH Y OTRAS INMUNODEFICIENCIAS <br>';
      }

      if (item.p_patologia_salud_mental == 'S') {
        tempatolias = tempatolias + 'PATOLOGIA DE SALUD MENTAL <br>';
      }
      if (item.p_consumo_de_spa == 'S') {
        tempatolias = tempatolias + 'CONSUMO DE SPA <br>';
      }
      if (item.p_otro == 'S') {
        tempatolias = tempatolias + 'OTRO <br>';
      }

      return tempatolias.length == 0 ? "SIN PATOLOGIAS" : tempatolias;
    }

    $scope.getPosition = function (array, param) {
      for (let index = 0; index < array.length; index++) {
        if (array[index] == param) {
          return index;
        }
      }
    }

    $scope.abrirModalDireccion = function () {
      $scope.dialogDiagreg = ngDialog.open({
        template: 'views/consultaAfiliados/nucleofamiliar/modal/modalDireccion.html',
        className: 'ngdialog-theme-plain',
        controller: 'actualizarinformacion',
        closeByDocument: false,
        closeByEscape: false,
        scope: $scope
      });
      $scope.dialogDiagreg.closePromise.then(function (data) {
        if ($scope.infobasica.direccion) {
          if (data.value != '$closeButton') {
            $scope.infobasica.direccion = data.value + " " + $('#barrio').val();
            $scope.infobasica.barrio = $('#barrio').val();
          }
        } else {
          $scope.infobasica.direccion = data.value + " " + $('#barrio').val();
          $scope.infobasica.barrio = $('#barrio').val();
        }

      });
    }

    $scope.accionsave = function () {
      if ($scope.vtab == 'A') {
        if (($scope.teleorientacion.tipo_seguimiento == null || $scope.teleorientacion.tipo_seguimiento == "") ||
          ($scope.teleorientacion.trimestre == null || $scope.teleorientacion.trimestre == "") ||
          ($scope.teleorientacion.embarazo == null || $scope.teleorientacion.embarazo == "") ||
          ($scope.teleorientacion.discapacidad == null || $scope.teleorientacion.discapacidad == "")) {
          swal({ title: "No Completado", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
        } else {
          $scope.teleorientacion.tipo_documento = $scope.infoafiliadotele.TipoDocumento
          $scope.teleorientacion.documento = $scope.infoafiliadotele.Documento;
          $scope.teleorientacion.p_sexo = $scope.infoafiliadotele.SexoCodigo;

          $scope.teleorientacion.fecha = formatDate($scope.teleorientacion.fecha_input);
          $scope.removePositionNull($scope.tempatologias);
          $scope.getjsonfiels($scope.tempatologias);
          setTimeout(() => {
            console.log(JSON.stringify($scope.teleorientacion));
          }, 100);

          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $http({
            method: 'POST',
            url: "php/gestionriesgo/gestionriesgo.php",
            data: { function: 'p_ui_teleorientacion', datos: JSON.stringify($scope.teleorientacion) }
          }).then(function (response) {
            swal.close();

            if (response.data.Codigo == '0') {
              swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {

                $scope.teleorientacion = {
                  fecha: null,
                  tipo_seguimiento: null,
                  discapacidad: null,
                  embarazo: null,
                  trimestre: null,
                  p_hipertension: 'N',
                  p_diabetes: 'N',
                  p_epoc_asma: 'N',
                  p_artritis_otras_autoinmunes: 'N',
                  p_vih_otras_inmunodeficiencias: 'N',
                  p_tuberculosis_hepatitis_c: 'N',
                  p_consumo_de_spa: 'N',
                  p_patologia_salud_mental: 'N',
                  p_otro: 'N',
                  factores_riesgo: null,
                  factores_protectores: null,
                  conducta_remision: null,
                  p_sexo: null
                }

                $scope.accionview('C');
              })


            } else {
              // console.log(response.data.Nombre);
              swal('Genesis', response.data.Nombre, 'error');
            }


          });
        }
      }

      if ($scope.vtab == 'E') {

        if ($scope.evolucion.observacion == null || $scope.evolucion.observacion == "") {
          swal({ title: "No Completado", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
        } else {
          if ($scope.evolucion.observacion.length < 30) {
            swal({ title: "No Completado", text: "La cantidad minima de caracteres es 30!", showConfirmButton: true, type: "info" });
          } else {
            //console.log("crea la evolucion");
            //console.log($scope.evolucion);
            // $scope.accionview('V', $scope.tempteleorientacion);
            $scope.evolucion.fecha = formatDate($scope.evolucion.fecha_input);
            console.log($scope.evolucion);
            $http({
              method: 'POST',
              url: "php/gestionriesgo/gestionriesgo.php",
              data: {
                function: 'p_ui_evolucion', numero: $scope.tempteleorientacion.codigo,
                fecha: $scope.evolucion.fecha, observacion: $scope.evolucion.observacion
              }
            }).then(function (response) {

              if (response.data.Codigo == '0') {
                console.log(response.data.Nombre);
                swal({ title: "Completado", text: response.data.Nombre, showConfirmButton: true, type: "success" }).then(() => {
                  $scope.evolucion = {
                    codigo: null,
                    fecha: null,
                    observacion: null
                  }

                  $scope.accionview('V', $scope.tempteleorientacion);
                })


              } else {
                console.log(response.data.Nombre);
                swal('Genesis', response.data.Nombre, 'error');
              }
              console.log(response.data);


            });
          }
        }
      }

      if ($scope.vtab == 'U') {
        if (($scope.infobasica.direccion == null || $scope.infobasica.direccion == null) ||
          ($scope.infobasica.telefono == null || $scope.infobasica.telefono == "")) {
          swal({ title: "No Completado", text: "No pueden haber campos vacios!", showConfirmButton: true, type: "info" });
        } else {
          $http({
            method: 'POST',
            url: "php/gestionriesgo/gestionriesgo.php",
            data: {
              function: 'p_gen_nov', tipo_documento: $scope.infoafiliadotele.TipoDocumento,
              documento: $scope.infoafiliadotele.Documento,
              direccion: $scope.infobasica.direccion,
              telefono: $scope.infobasica.telefono,
              celular: $scope.infobasica.cedular,
              correo: $scope.infobasica.correo
            }
          }).then(function (response) {
            console.log(response.data);
            if (response.data.codigo == '0') {
              console.log(response.data.mensaje);
              swal({ title: "Completado", text: response.data.mensaje, showConfirmButton: true, type: "success" }).then(() => {
                $scope.infobasica = {
                  correo: null,
                  direccion: null,
                  telefono: null,
                  celular: null,
                  barrio: null
                }

                $scope.accionview('R');
                $scope.buscarAfiliado();
              })


            } else {
              console.log(response.data.mensaje);
              swal('Genesis', response.data.mensaje, 'error');
            }
            console.log(response.data);


          });




        }


      }
    }

    $scope.busquedaDetalles = function () {
      $scope.busquedaXdetalles = ngDialog.open({
        template: 'views/consultaAfiliados/modalBusquedaDetalles.html',
        className: 'ngdialog-theme-plain',
        controller: 'modalBusquedaxnombres',
        closeByEscape: false,
        closeByDocument: false
      });
      $scope.busquedaXdetalles.closePromise.then(function (response) {
        if (response.value === undefined) { return; }
        if (response.value != "$closeButton") {
          $scope.type = response.value.tipo;
          $scope.id = response.value.documento;
          console.log($scope.type);
          console.log($scope.id);

          if ($scope.type && $scope.id) {
            $scope.tipoDoc = $scope.type;
            $scope.documento = $scope.id;
            $scope.buscarAfiliado();
          }
        }
      });
    }

    $scope.accionviewhome = function (params) {
      $scope.vtabh = params;


      if (params == 'E') {

      }
      if (params == 'T') {
        $scope.listar_Teleorientaciones();
      }
      console.log(params);
    }

    $scope.lista_teleorientaciones = null;
    $scope.listar_Teleorientaciones = function () {
      if ($scope.tableteleorientacion != undefined) {
        $scope.tableteleorientacion.destroy();
        $scope.tableteleorientacion = undefined;
      }
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      // $http({
      //   method: 'POST',
      //   url: "php/gestionriesgo/gestionriesgo.php",
      //   data: {
      //     function: 'p_listar_teleorientaciones'
      //   }
      // }).then(function (response) {
              $http({
        method: 'POST',
        url: "php/gestionriesgo/gestionriesgo.php",
        data: {
          function: 'p_listar_teleorientaciones',
          ubicacion: sessionStorage.getItem('municipio') ? sessionStorage.getItem('municipio'): sessionStorage.getItem('ubicacion'),
          nit: sessionStorage.getItem('nit')
        }
      }).then(function (response) {
        console.log(response.data);
        $scope.lista_teleorientaciones = response.data;
        setTimeout(function () {
          $scope.tableteleorientacion = $('#table-teleorientaciones').DataTable({
            dom: 'Bfrtip',
            buttons: [
              'copy', 'csv', 'excel'
            ],
            language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
            lengthMenu: [[20, 50, -1], [20, 50, 'Todas']],
            order: [[0, "asc"]],
            responsive: true

          });
          $scope.tableteleorientacion.draw();

          document.getElementById('table-teleorientaciones').scrollIntoView({ block: 'start', behavior: 'smooth' });
          swal.close();
        }, 100);
      })
    }

     $scope.print_teleorientacion = function (param) {      
      window.open('views/gestionriesgo/formato_teleorientacion.php?numero=' + param.codigo, '_blank');
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