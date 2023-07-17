
angular.module('GenesisApp')

  .controller('gestiondeprestacionController', ['$scope', '$http', '$location', 'ngDialog', '$filter',
    function ($scope, $http, $location, ngDialog, $filter) {
      $(document).ready(function () {
        $scope.sysdate = new Date();
        $('.tooltipped').tooltip({ delay: 50 });
        $('#modaldetalle').modal();
        $('#modaleditardetalle').modal();
        $('#modalfechaprestacion').modal();

      });


      $scope.nitIps = sessionStorage.getItem('nit')
      $scope.searchaut = '';

      $scope.filterOptions = '1';
      $scope.verAutorizaciones = true;
      $scope.tempnummanual = '';
      $scope.temptipodoc = '';
      $scope.tempdocumento = '';
      $scope.maxDate = null;
      $scope.minDate = null;


      //Se valida fecha actual

    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1; //hoy es 0!
    var yyyy = hoy.getFullYear();

    $scope.fechactual = hoy;

    if (dd < 10) {
      dd = '0' + dd
    }



    if (mm < 10) {
      mm = '0' + mm
    }



    $scope.maxDate = yyyy + '-' + mm + '-' + dd;

    $scope.Obtener_Tipos_Documentos = function () {
        $http({
          method: 'POST',
          url: "php/genesis/funcgenesis.php",
          data: {
            function: 'Obtener_Tipos_Documentos',
            Tipo: 'S'
          }
        }).then(function (response) {
          if (response.data && response.data.toString().substr(0, 3) != '<br') {
            $scope.Tipos_Documentos = response.data;
          } else {
            swal({
              title: "¡Ocurrio un error!",
              text: response.data,
              type: "warning"
            }).catch(swal.noop);
          }
        });
      }
$scope.Obtener_Tipos_Documentos();

      $scope.obtenerAutorizaciones = function () {
        $scope.nameaut = 'Autorizaciones';

        swal({
          html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
          width: 200,
          allowOutsideClick: false,
          allowEscapeKey: false,
          showConfirmButton: false,
          animation: false
        });
        var tipodocumento = '';
        var documento = 0;
        var numeroautmanual = 0;
        if ($scope.check_option == false) {
          if (($scope.tempnummanual == '' || $scope.tempnummanual == null)) {
            $scope.required_fiels = true;
            $scope.text_fiels = 'Datos de la Autorización Incompletos';
          } else {
            tipodocumento = '';
            documento = 0;
            numeroautmanual = $scope.tempnummanual;

            $scope.required_fiels = false;
          }



        }
        if ($scope.check_option == true) {
          if (($scope.temptipodoc == '' || $scope.temptipodoc == null) || ($scope.tempdocumento == '' || $scope.tempdocumento == null)) {
            $scope.required_fiels = true;
            $scope.text_fiels = 'Datos del Afiliado Incompletos';
          } else {
            numeroautmanual = 0;
            tipodocumento = $scope.temptipodoc;
            documento = $scope.tempdocumento;
            $scope.required_fiels = false;
          }
        }

        if ($scope.required_fiels == false) {


          $scope.json = {
            numautmanual: numeroautmanual,
            nitavanzado: sessionStorage.getItem('nit'),
            tipodocumentoavanzado: tipodocumento,
            documentoavanzado: documento,
            opcion: $scope.filterOptions

          }

          console.log(JSON.stringify($scope.json));
          $http({
            method: 'POST',
            url: "php/autorizaciones/gprestacion/gprestacion.php",
            data: { function: 'p_consulta_autorizaciones_avanzado_eps_ips', autorizacion: JSON.stringify($scope.json) }
          }).then(function (response) {
            console.log(response);
            if (response.data.CODIGO == '0') {
              $scope.infoafiliadoautedit = "";
              $scope.listarAutorizaciones = [];
              // $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
              $scope.initPaginacion($scope.listarAutorizaciones);
              $scope.verAutorizaciones = true;
              swal('Info', response.data.NOMBRE, 'info').catch(swal.noop);
            } else {
              $scope.infoafiliadoautedit = response.data.info;
              $scope.listarAutorizaciones = response.data.aut;
              $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
              $scope.initPaginacion($scope.listarAutorizaciones);
              $scope.verAutorizaciones = false;
              $scope.afirownumIV = 1;
              swal.close();
            }


            // if ($scope.infoafiliadoautedit.SINIESTRO == 'true') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }

            // if ($scope.infoafiliadoautedit.TUTELA == 'true') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }

            // if ($scope.infoafiliadoautedit.PORTABILIDAD == 'S') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }
            // if ($scope.infoafiliadoautedit.ERROR_50 == 'true') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }

            // if ($scope.infoafiliadoautedit.AFIC_T045 == 'S') {

            //   $scope.afirownumIV = $scope.afirownumIV + 1;

            // }


          })
        } else {

          swal('Info', $scope.text_fiels, 'warning').catch(swal.noop);
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

      function formatDate(date) {
        var dd = ('0' + date.getDate()).slice(-2);
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var mi = date.getMinutes();
        return dd + '/' + mm + '/' + yyyy; //+' '+hh+':'+mi+':00';
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

      $scope.limpiar = function () {
        $scope.verAutorizaciones = true;
        $scope.infoafiliadoautedit = "";
        $scope.listarAutorizaciones = [];
        $scope.listarAutorizacionesTemp = [];
      }

      $scope.initPaginacion = function (info) {
        $scope.listarAutorizacionesTemp = info;
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.valmaxpag = 10;
        $scope.pages = [];
        $scope.configPages();
      }
      $scope.configPages = function () {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) > $scope.valmaxpag)
            fin = 10;
          else
            fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag) {
            ini = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize) - $scope.valmaxpag;
            fin = Math.ceil($scope.listarAutorizacionesTemp.length / $scope.pageSize);
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
        if ($scope.currentPage < 0) { $scope.currentPage = 0; }
      }
      $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
        if ($scope.pages.length % 2 == 0) {
          var resul = $scope.pages.length / 2;
        } else {
          var resul = ($scope.pages.length + 1) / 2;
        }
        var i = index - resul;
        if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
          var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
        } else {
          var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
        }
        var fin = ($scope.pages.length + i) - 1;
        if (fin > tamanomax) {
          fin = tamanomax;
          i = tamanomax - 9;
        }
        if (index > resul) {
          $scope.calcular(i, fin);
        }
      }
      $scope.paso = function (tipo) {
        if (tipo == 'next') {
          var i = $scope.pages[0].no + 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no + 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage + 1;
          if ($scope.listarAutorizacionesTemp.length % $scope.pageSize == 0) {
            var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize);
          } else {
            var tamanomax = parseInt($scope.listarAutorizacionesTemp.length / $scope.pageSize) + 1;
          }
          if (fin > tamanomax) {
            fin = tamanomax;
            i = tamanomax - 9;
          }
        } else {
          var i = $scope.pages[0].no - 1;
          if ($scope.pages.length > 9) {
            var fin = $scope.pages[9].no - 1;
          } else {
            var fin = $scope.pages.length;
          }

          $scope.currentPage = $scope.currentPage - 1;
          if (i <= 1) {
            i = 1;
            fin = $scope.pages.length;
          }
        }
        $scope.calcular(i, fin);
      }
      $scope.calcular = function (i, fin) {
        if (fin > 9) {
          i = fin - 9;
        } else {
          i = 1;
        }
        $scope.pages = [];
        for (i; i <= fin; i++) {
          $scope.pages.push({
            no: i
          });
        }
      }

      $scope.filter = function (val) {
        $scope.listarAutorizacionesTemp = $filter('filter')($scope.listarAutorizaciones, val);
        if ($scope.listarAutorizacionesTemp.length > 0) {
          $scope.setPage(1);
        }
        $scope.configPages();
      }


      $scope.printAut = function (numero, ubicacion) {
        window.open('views/autorizaciones/formatoautorizacionPrint.php?numero=' + numero + '&ubicacion=' + ubicacion, '_blank');

      }

      $scope.JSONToCSVConvertor = function (ReportTitle, ShowLabel) {

        var json = $scope.listarAutorizacionesTemp;
        var tempjson = [];
        for (let index = 0; index < json.length; index++) {
          const element = json[index];
          for (let index = 0; index < element.DETALLES.length; index++) {
            const detalle = element.DETALLES[index];
            tempjson.push({
              NUMERO: element.AUT_MANUAL,
              // MIPRES: element.MIPRES,
              TIPO_DOCUMENTO: element.TIPO_DOC,
              DOCUMENTO: element.DOCUMENTO,
              NOMBRE_AFILIADO: element.NOMBRE_AFI,
              SERVICIO: element.SERVICIO,
              RENGLON: detalle.renglon,
              CODIGO_PRODUCTO: detalle.cod_producto,
              NOMBRE_PRODUCTO: detalle.nombre_producto,
              CANTIDAD: detalle.cantidad,
              OBSERVACION: element.OBSERVACION
            });
          }

        }
        // console.log(JSON.stringify(tempjson));
        tempjson = JSON.stringify(tempjson);
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof tempjson != 'object' ? JSON.parse(tempjson) : tempjson;

        var CSV = '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
          var row = "";

          //This loop will extract the label from 1st index of on array
          for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
          }

          row = row.slice(0, -1);

          //append Label row with line break
          CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
          var row = "";

          //2nd loop will extract each column and convert it in string comma-seprated
          for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
          }

          row.slice(0, row.length - 1);

          //add a line break after each row
          CSV += row + '\r\n';
        }

        if (CSV == '') {
          alert("Invalid data");
          return;
        }

        //Generate a file name
        var fileName = "";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      $scope.infoafiliadoautedit = "";
      $scope.ultimomes = function () {
        var opcion = "";

        if ($scope.filterOptions == '2') {
          opcion = '5';
        }
        if ($scope.filterOptions == '3') {
          opcion = '6';
        }
        if ($scope.filterOptions == '4') {
          opcion = '7';
        }

        // sessionStorage.getItem('nit')
        $scope.json = {
          numautmanual: "",
          nitavanzado: sessionStorage.getItem('nit'),
          tipodocumentoavanzado: "",
          documentoavanzado: "",
          opcion: opcion

        }

        console.log(JSON.stringify($scope.json));
        $http({
          method: 'POST',
          url: "php/autorizaciones/gprestacion/gprestacion.php",
          data: { function: 'p_consulta_autorizaciones_avanzado_eps_ips', autorizacion: JSON.stringify($scope.json) }
        }).then(function (response) {
          console.log(response);
          if (response.data.CODIGO == '0') {
            $scope.infoafiliadoautedit = "";
            $scope.listarAutorizaciones = [];
            // $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
            $scope.initPaginacion($scope.listarAutorizaciones);
            $scope.verAutorizaciones = true;
            swal('Info', response.data.NOMBRE, 'info').catch(swal.noop);
          } else {
            $scope.infoafiliadoautedit = "";
            $scope.listarAutorizaciones = response.data.aut;
            // $scope.calcularEdad($scope.infoafiliadoautedit.FechaNacimiento);
            $scope.initPaginacion($scope.listarAutorizaciones);
            $scope.verAutorizaciones = false;
            $scope.afirownumIV = 1;
            swal.close();
            console.log($scope.infoafiliadoautedit);
          }

        })
      }


      $scope.openmodals = function (tipo, opcion) {
        console.log(tipo);
        console.log(opcion);
        switch (tipo) {

          case 'modalfechaprestacion':
            $scope.minDate = opcion.FECHA.split("/").reverse().join("-");          
            console.log($scope.minDate);  
            $scope.datetemp.autn_numero = opcion.NUMERO;
            $scope.datetemp.autn_ubicacion = opcion.UBICACION;
            $("#modalfechaprestacion").modal("open");
            break;


        }
      }

      $scope.closemodals = function (tipo) {
        switch (tipo) {

          case 'modalfechaprestacion':
            $("#modalfechaprestacion").modal("close");
            break;

        }
      }
      $scope.fechaprestacion= null;
      $scope.datetemp = {
        nit: sessionStorage.getItem('nit'),
        autn_numero: '',
        autn_ubicacion: '',
        responsable: sessionStorage.getItem('cedula'),
        fecha_prestacion: '',
      }
      $scope.gestionaraut = function () {

        if ($scope.fechaprestacion) {
          $scope.datetemp.fecha_prestacion = formatDate($scope.fechaprestacion);
          console.log(JSON.stringify($scope.datetemp));

          $http({
            method: 'POST',
            url: "php/autorizaciones/gprestacion/gprestacion.php",
            data: { function: 'p_u_actualiza_fecha_prestacion_eps_ips', autorizacion: JSON.stringify($scope.datetemp) }
          }).then(function (response) {

             swal('Gestión de prestación de servicios', response.data.Nombre, response.data.Codigo=='0' ? 'success':'error').catch(swal.noop);
             if (response.data.Codigo=='0') {
              setTimeout(() => {
                $scope.closemodals('modalfechaprestacion');
                $scope.obtenerAutorizaciones();
               }, 5000);
             }
        
         
          })
        }else{
          swal('Info', "Debe seleccionar una fecha de prestación", 'info').catch(swal.noop);
        }
     
      }
      $scope.DatosCantidadautprestacion = function () {
          $http({
            method: 'POST',
            url: "php/autorizaciones/gprestacion/gprestacion.php",
            data: { function: 'GestionIps', nitips: $scope.nitIps }
          }).then(function (response) {
              $scope.DatosCantidadaut = response.data[0];
          })
      }
      $scope.DatosCantidadautprestacion();


      $scope.BuscardatosAutIps = function (nitips,fechaini,fechafin) {
        if(nitips == undefined || nitips == '' || nitips == null || fechaini == undefined || fechaini == '' || fechaini == null || fechafin == undefined || fechafin == '' || fechafin == null){

      swal('Info', 'Debe diligenciar todos los campos', 'info').catch(swal.noop);
        }else{
           swal({ title: 'Procesando...' });
              swal.showLoading();
        $scope.nitipsexcel = nitips;
        $scope.fechainicioexcel = fechaini;
        $scope.fechafinexcel = fechafin;
        $http({
          method: 'POST',
          url: "php/autorizaciones/gprestacion/gprestacion.php",
          data: { function: 'GestionPrestacionIps', 
                  nitips: nitips,
                  fechainicio: formatDate(fechaini),
                  fechafin:  formatDate(fechafin) 
                }
        }).then(function (response) {
          
          if(response.data){
            swal.close();
          if(!response.data[0].IPS){
            swal('Info', 'Datos no encontrados', 'info').catch(swal.noop);
          }else{
             $scope.verAutorizaciones = false;
            $scope.datosipsGeneradas_Gestionadas = response.data[0];
          }
        }else{
          swal('Info', 'Datos no encontrados', 'info').catch(swal.noop);
         }
        })
          
        }
       
    }
    //   $scope.DescargarExcelListarAutPss = function () {
    //     $http({
    //       method: 'POST',
    //       url: "php/autorizaciones/gprestacion/gprestacion.php",
    //       data: { function: 'ListarAutPss', 
    //               nitips: $scope.nitipsexcel,
    //               fechainicio: formatDate($scope.fechainicioexcel),
    //               fechafin:  formatDate($scope.fechafinexcel) 
    //             }
    //     }).then(function (response) {
    //      console.log(response);
    //     })
    // }

    $scope.DescargarExcelListarAutPss = function () {
      window.open(
        "php/autorizaciones/gprestacion/datosautpss.php?nitips="+$scope.nitipsexcel+"&fechainicio="+formatDate( $scope.fechainicioexcel)+"&fechafin="+formatDate( $scope.fechafinexcel));
  }

    }])
