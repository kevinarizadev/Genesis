'use strict';
angular.module('GenesisApp').controller('admindocumentosinstController', ['$scope', '$http', function ($scope, $http) {
  $scope.Inicio = function () {
    console.log($(window).width());
    document.querySelector("#content").style.backgroundColor = "white";
    $scope.Ajustar_Pantalla();

    $scope.Rol_Cedula = sessionStorage.getItem('cedula');
    $('.tabs').tabs();
    // $('.modal').modal();
    $scope.tabs = 1;
    $scope.SysDay = new Date();
    $scope.formLimpiar();

    $scope.obtenerListado();
    setTimeout(() => {
      $scope.$apply();
    }, 500);

    //////////////////////////////////////////////////////////
  }

  $scope.formLimpiar = function () {
    $scope.form = {
      accion: 'I',
      codigo: '',
      nombre: '',
      tipo: '',
      estado: '',
      soporteExt: '',
      soporteB64: '',
      soporteNombre: '',
    }
    if (!$scope.list)
      $scope.list = {
        filtro: '',
        listado: [],
        listadoEstados: [
          { codigo: 'A', nombre: 'Activo' },
          { codigo: 'I', nombre: 'Inactivo' },
        ],
        listadoTipos: [
          { codigo: 'P', nombre: 'Plantilla' },
          { codigo: 'M', nombre: 'Manual' },
          { codigo: 'O', nombre: 'Organigrama' },
        ]
      }
    document.querySelector('#form_soporte').value = '';
    setTimeout(() => { $scope.$apply(); }, 500);
  }


  $scope.obtenerListado = function (x) {
    // Recibe x para no mostrar swalLoading
    $scope.list.filtro = '';
    if (!x)
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
        width: 200,
        showConfirmButton: false,
        animation: false
      });
    $scope.list.listado = [];
    $http({
      method: 'POST',
      url: "php/intranet/admindocumentosinst.php",
      data: {
        function: 'p_lista_documentos_inst'
      }
    }).then(function ({ data }) {
      if (!x) swal.close();
      if (data.toString().substr(0, 3) == '<br' || data == 0) {
        swal("Error", 'Sin datos', "warning").catch(swal.noop); return
      }
      $scope.list.listado = data;
      console.log(data);
      setTimeout(() => { $scope.$apply(); }, 500);
    });
  }

  $scope.editarDocumento = function (data) {
    $scope.form.accion = 'U';
    $scope.form.codigo = data.BDOC_CODIGO;
    $scope.form.nombre = data.BDOC_NOMBRE;
    $scope.form.tipo = data.BDOC_TIPO.split('-')[0];
    $scope.form.estado = data.BDOC_ESTADO.split('-')[0];
    $scope.form.ruta = data.BDOC_RUTA;
    $scope.form.soporteExt = '';
    $scope.form.soporteB64 = '';
    $scope.form.soporteNombre = '';
    $scope.form.traza = JSON.parse(data.TRAZA);

    console.log($scope.form.historico)

    setTimeout(() => { $scope.$apply(); }, 500);
  }

  $scope.validarFormDocumento = function () {
    return new Promise((resolve) => {
      if (!$scope.form.nombre) resolve(false);
      if (!$scope.form.tipo) resolve(false);
      if (!$scope.form.estado) resolve(false);
      if ($scope.form.accion == 'I' && !$scope.form.soporteB64) resolve(false);
      resolve(true)
    });
  }

  $scope.guardarDocumento = function () {
    $scope.validarFormDocumento().then(res => {
      if (!res) { swal("¡Importante!", "Diligencia los campos", "warning").catch(swal.noop); return }
      const text = $scope.form.accion == 'I' ? '¿Desea guardar el documento?' : '¿Desea actualizar el documento?';
      swal({
        title: 'Confirmar',
        text,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result) {
          swal({
            html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Cargando...</p>',
            width: 200,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            animation: false
          });
          $scope.cargarSoporte().then((resultSoporte) => {
            if (resultSoporte != '0') {
              const datos = {
                codigo: $scope.form.codigo,
                nombre: $scope.form.nombre,
                tipo: $scope.form.tipo,
                estado: $scope.form.estado,
                ruta: $scope.form.soporteB64 ? resultSoporte : $scope.form.ruta,
                accion: $scope.form.accion,
                responsable: $scope.Rol_Cedula,
              }
              $http({
                method: 'POST',
                url: "php/intranet/admindocumentosinst.php",
                data: {
                  function: "p_ui_documentos_inst",
                  datos
                }
              }).then(function ({ data }) {
                if (data.toString().substr(0, 3) == '<br' || data == 0) {
                  swal("Error", 'Sin datos', "warning").catch(swal.noop); return
                }
                if (data.Codigo == 0) {
                  swal("Mensaje", data.Nombre, "success").catch(swal.noop);
                  $scope.formLimpiar();
                  $scope.obtenerListado(1);
                }
                if (data.Codigo == 1) {
                  swal("Mensaje", data.Nombre, "warning").catch(swal.noop);
                }
              })
            }
          })
        }
      })
    })

  }

  $scope.cargarSoporte = function () {
    return new Promise((resolve) => {
      if (!$scope.form.soporteB64) { resolve(''); return }
      swal({
        html: '<div class="loading"><div class="default-background"></div><div class="default-background"></div><div class="default-background"></div></div><p style="font-weight: bold;">Guardando Soporte...</p>',
        width: 200,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        animation: false
      });
      $http({
        method: 'POST',
        url: "php/intranet/admindocumentosinst.php",
        data: {
          function: "cargarSoporte",
          nombre: $scope.form.nombre,
          tipo: $scope.list.listadoTipos[$scope.list.listadoTipos.findIndex(e => e.codigo == $scope.form.tipo)].nombre,
          base64: $scope.form.soporteB64,
          ext: $scope.form.soporteExt,
        }
      }).then(function ({ data }) {
        if (data.toString().substr(0, 3) == '/ca') {
          resolve(data);
        } else {
          resolve('0');
        }
      })
    });
  }

  $scope.verHistorico = function () {
    $scope.form.historico = $scope.form.traza;
    setTimeout(() => { $scope.$apply(); }, 500);
  }



  document.querySelector('#form_soporte').addEventListener('change', function (e) {
    $scope.form.soporteExt = '';
    $scope.form.soporteB64 = '';
    setTimeout(() => { $scope.$apply(); }, 500);
    var files = e.target.files;
    if (files.length != 0) {
      for (let i = 0; i < files.length; i++) {
        $scope.form.soporteNombre = files[i].name;
        const x = files[i].name.split('.');
        if (x[x.length - 1].toUpperCase() == 'PDF' || x[x.length - 1].toUpperCase() == 'DOCX' || x[x.length - 1].toUpperCase() == 'XLSX' || x[x.length - 1].toUpperCase() == 'PPTX') {
          if (files[i].size < 15485760 && files[i].size > 0) {
            $scope.getBase64(files[i]).then(function (result) {
              $scope.form.soporteExt = x[x.length - 1].toLowerCase();
              $scope.form.soporteB64 = result;
              setTimeout(function () { $scope.$apply(); }, 300);
            });
          } else {
            document.querySelector('#form_soporte').value = '';
            swal('Advertencia', '¡Uno de los archivos seleccionados excede el peso máximo posible (15MB)!', 'info');
          }
        } else {
          document.querySelector('#form_soporte').value = '';
          swal('Advertencia', '¡El archivo seleccionado debe ser alguno de estos formatos (PDF, WORD, PPOINT o EXCEL)', 'info');
        }
      }
    }
  });
  $scope.getBase64 = function (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  $scope.icono = function (url) {
    if (url != undefined && url != "") {
      var ext;
      if (url != undefined && url.indexOf(".") > 0) {
        ext = url.split(".");
      } else {
        ext = 0;
      }
      if (ext.length > 0 && Array.isArray(ext)) {
        if (ext[ext.length - 1].toUpperCase() == "PDF") {
          return "icon-file-pdf red-text";
        } else if (ext[ext.length - 1].toUpperCase() == "DOC" || ext[ext.length - 1].toUpperCase() == "DOCX") {
          return "icon-file-word blue-text";
        } else if (ext[ext.length - 1].toUpperCase() == "XLS" || ext[ext.length - 1].toUpperCase() == "XLSX") {
          return "icon-file-excel green-text";
        } else if (ext[ext.length - 1].toUpperCase() == "PPT" || ext[ext.length - 1].toUpperCase() == "PPTX") {
          return "icon-file-powerpoint orange-text";
        } else {
          return "icon-attention-alt";
        }
      } else {
        return "icon-help";
      }
    }
  }

  $scope.descargaAdjunto = function (ruta) {
    $http({
      method: 'POST',
      url: "php/intranet/admindocumentosinst.php",
      data: {
        function: 'descargaAdjunto',
        ruta
      }
    }).then(function (response) {
      window.open("temp/" + response.data);
    });
  }

  $scope.openModal = function (modal) {
    $(`#${modal}`).modal('open');
  }
  $scope.closeModal = function () {
    $(".modal").modal("close");
  }

  /*
    $.getJSON("php/intranet/datos.json").done(function (data) {
      // console.log(data);
      var listado = []
      const procesos = data.procesos;
      procesos.forEach(pro => {
        // pro.titulo
        pro.opciones.forEach(mac => {
          // mac.titulo
          mac.documentos.forEach(doc => {
            // doc.titulo
            // doc.estado
            // doc.url
            // doc.url.substr(52, 60)
            // console.log(doc.url.substr(52, 8))
            listado.push({
              'MACROPROCESOS': pro.titulo,
              'PROCESOS': mac.titulo,
              'TIPO_ARCHIVO': 'DOCUMENTO',
              'ARCHIVO': doc.titulo,
              'ESTADO': doc.estado,
              'FECHA_CARGUE': doc.url.substr(52, 8),
            })
          });
          //
          mac.formatos.forEach(doc => {
            // doc.titulo
            // doc.estado
            // doc.url
            // doc.url.substr(52, 60)
            // console.log(doc.url.substr(52, 8))
            listado.push({
              'MACROPROCESOS': pro.titulo,
              'PROCESOS': mac.titulo,
              'TIPO_ARCHIVO': 'FORMATO',
              'ARCHIVO': doc.titulo,
              'ESTADO': doc.estado,
              'FECHA_CARGUE': doc.url.substr(52, 8),
            })
          });
          //
        });
        //
      });

      var ws = XLSX.utils.json_to_sheet(listado);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
      XLSX.writeFile(wb, "Reporte json.xlsx");
      const text = `Registros encontrados ${listado.length}`
      swal('¡Mensaje!', text, 'success').catch(swal.noop);
    })
  */



  $scope.setTab = function (x) {
    $scope.tabs = x;
  }

  $scope.Ajustar_Pantalla = function () {
    if ($(window).width() < 1100) {
      document.querySelector("#pantalla").style.zoom = 0.7;
    }
    if ($(window).width() > 1100) {
      document.querySelector("#pantalla").style.zoom = 0.8;
    }
  }

  $(window).on('resize', function () {
    $scope.Ajustar_Pantalla();
  });

  if (document.readyState !== 'loading') {
    $scope.Inicio();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      $scope.Inicio();
    });
  }

}]);
