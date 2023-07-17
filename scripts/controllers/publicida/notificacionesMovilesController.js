'use strict';

(() => {
  const providers = ['$scope', '$http', 'notify', 'ngDialog'];
  providers.push(($scope, $http, notify, ngDialog) => {

    $scope.data = {
      titulo: '',
      descripcion: '',
      fecha_publicacion: '',
      tab: '1',
      estado: 'A',
      publicaciones: null,
      filtro: {
        activo: true
      },
      image: null,
      mostrarEstado: false,
      estado_check: true,
      headers: []
    }

    let dataTable = null

    $scope.exportarDatos = () => {
      dataTable.export({
        type: 'csv',
        download: true
      })
    }

    const mostrarTabla = (data) => {
      document.querySelector('#table-container').innerHTML = '<table id="datatable" class="striped table-bordered"></table>'
      const tempData = data.filter((item) => item.ESTADO_NOT === $scope.data.estado).map((item) => {
        return item
      })

      const headers = Object.keys(data[0]).filter((key) => key !== 'ESTADO_NOT' && key !== 'RUTA')
      console.log(headers)

      dataTable = new simpleDatatables.DataTable(document.querySelector('#datatable'), {
        data: {
          headings: headers,
          data: tempData.map((item) => {
            delete item.ESTADO_NOT
            delete item.RUTA
            return Object.values(item)
          })
        },
        perPageSelect: null,
        perPage: 15,
        labels: {
          placeholder: 'Buscar',
          perPage: '{select} registros por página',
          noRows: 'No se encontraron registros con los parametros solicitados',
          info: 'Registro {start} hasta {end} de {rows}'
        },
        layout: {
          top: ''
        }
      });
      $scope.data.exportar = true
    }

    $scope.mostrarVistaPrevia = () => {
      const imageInput = document.querySelector('#image')
      if (imageInput.files && imageInput.files.length > 0) {
        var reader = new FileReader()

        reader.onload = function (e) {
          document.querySelector('#previewImage').src = e.target.result
        }

        reader.readAsDataURL(imageInput.files[0])
      } else {
        document.querySelector('#previewImage').src = ''
      }
    }

    $scope.obtenerDatos = () => {
      $scope.data.exportar = false
      const fecha_inicio = new Date($scope.data.fecha_inicio);
      const fecha_fin = new Date($scope.data.fecha_fin);

      $http({
        url: `/php/siau/funccircular017.php?fecha_inicio=${fecha_inicio.getDate().toString().padStart(2, '0')}/${(fecha_inicio.getMonth() + 1).toString().padStart(2, '0')}/${fecha_inicio.getFullYear()}&fecha_fin=${fecha_fin.getDate().toString().padStart(2, '0')}/${(fecha_fin.getMonth() + 1).toString().padStart(2, '0')}/${fecha_fin.getFullYear()}&informe=${$scope.data.informe}`
      }).then((response) => {
        mostrarTabla(response.data)
      })
    }

    $scope.obtenerTipoReporte = async () => {
      notify.show('loading')
      const response = await $http({
        url: '/php/saludpublica/funccircular.php',
        method: 'post',
        data: {
          function: 'obtenerTipo'
        }
      })
      notify.close()
      $scope.data.tipo_reportes = Object.keys(response.data).map((key) => {
        return {
          id: key,
          value: response.data[key]
        }
      })
    }

    $scope.obtenerReporte = async () => {
      notify.show('loading')
      const fecha_inicio = new Date($scope.data.fecha_inicio);
      const fecha_fin = new Date($scope.data.fecha_fin);

      const response = await $http({
        url: '/php/saludpublica/funccircular.php',
        method: 'post',
        data: {
          function: 'obtenerLista',
          fecha_inicio: `${fecha_inicio.getDate().toString().padStart(2, '0')}/${(fecha_inicio.getMonth() + 1).toString().padStart(2, '0')}/${fecha_inicio.getFullYear()}`,
          fecha_fin: `${fecha_fin.getDate().toString().padStart(2, '0')}/${(fecha_fin.getMonth() + 1).toString().padStart(2, '0')}/${fecha_fin.getFullYear()}`,
          informe: $scope.data.informe
        }
      })
      notify.close()
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(response.data));
      element.setAttribute('download', `reporte_${$scope.data.informe}.xlsx`);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }

    $scope.verificarFecha = () => {
      $scope.data.estado_check = true;
      $scope.data.mostrarEstado = false;
      const today = new Date()
      if (today.getFullYear() === $scope.data.fecha_publicacion.getFullYear() && today.getMonth() === $scope.data.fecha_publicacion.getMonth() && today.getDate() === $scope.data.fecha_publicacion.getDate()) {
        $scope.data.mostrarEstado = true;
      }
    }

    $scope.chequearEstado = () => {
      $scope.data.estado = $scope.data.estado_check === true ? 'A' : 'I'
    }

    $scope.cambiarTab = (tab) => {
      $scope.data.tab = tab
      if (tab === '1') {
        setTimeout(() => {
          const today = new Date()
          document.querySelector('#fecha_publicacion').setAttribute('min', `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
        }, 500)
      } else {
        $scope.data.titulo = ''
        $scope.data.descripcion = '',
          $scope.data.fecha_publicacion = '',
          $scope.data.publicaciones = null,
          $scope.data.image = null

        $scope.cargarPublicaciones()
      }
    }

    $scope.cambiarTab('1')

    $scope.chequearFiltro = () => {
      $scope.data.dataFiltered = $scope.data.data.filter((item) => item.ESTADO_NOT === ($scope.data.filtro.activo === true ? 'A' : 'P'))
    }

    $scope.cargarPublicaciones = async () => {
      notify.show('loading')
      const response = await $http({
        url: '/php/publicidad/funcpublicidad.php',
        method: 'post',
        data: {
          function: 'obtenerPublicaciones'
        }
      })
      notify.close()
      if (response.data.data === null) {
        $scope.cambiarTab('1')
        notify.show('info', 'No se han creado publicaciones')
        return
      }
      $scope.data.data = response.data.data
      $scope.chequearFiltro()
    }

    $scope.editarEstadoNotificacion = async (item, estado) => {
      const notificacion = {
        id: item.ID,
        titulo: item.TITULO,
        fecha: item.FECHA_PUBLICACION,
        descripcion: item.DESCRIPCION,
        ruta: item.RUTA,
        estado: estado
      }
      notify.show('loading')
      const response = await axios({
        url: '/php/publicidad/funcpublicidad.php',
        method: 'post',
        data: {
          function: 'actualizarNotificacion', data: notificacion
        }
      })
      notify.close()

      if (response.data.codigo === '0') {
        notify.show('success', response.data.mensaje).then(() => {
          $scope.cargarPublicaciones()
        })
      } else {
        notify.show('error', response.data.mensaje).then(() => {
          $scope.cargarPublicaciones()
        })
      }
    }

    $scope.mostrarEvento = (row) => {
      return row[3] === 'ACTIVO' ? 'INACTIVAR' : 'ACTIVAR'
    }

    const setupTour = () => {
      const tour = new Shepherd.Tour({
        defaultStepOptions: {
          cancelIcon: {
            enabled: true
          },
          classes: 'class-1 class-2',
          scrollTo: { behavior: 'smooth', block: 'center' }
        }
      });

      tour.addStep({
        title: 'Bienvenido al modulo de notificaciones móviles',
        text: 'Desde acá podrá gestionar las campañas publicitarias',
        attachTo: {
          element: document.querySelector('#listado_notificaciones'),
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return this.back();
            },
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'creating'
      });

      tour.start();
    }

    const subirImagen = async (file) => {
      const formData = new FormData()
      formData.append('soporte', file)

      const path = '/cargue_ftp/Digitalizacion/Genesis/AppCajacopiEPS/Notificaciones/'

      const response = await axios({
        url: `/php/funcsoporte.php?path=${path}`,
        method: 'post',
        headers: { "Content-Type": "multipart/form-data" },
        data: formData
      })

      return response.data
    }

    $scope.editarNotificacion = (row) => {
      console.log(moment(row.FECHA_PUBLICACION, "DD/MM/YYYY").toDate())
      const dialog = ngDialog.open({
        template: '/views/publicidad/modalinformacion.html',
        className: 'ngdialog-theme-default',
        controller: ['$scope', function($scopeModal) {
          $scopeModal.data = {
            id: row.ID,
            titulo: row.TITULO,
            descripcion: row.DESCRIPCION,
            fecha_publicacion: moment(row.FECHA_PUBLICACION, "DD/MM/YYYY").toDate(),
            estado: row.ESTADO_NOT,
            ruta: row.RUTA,
            estado_check: row.ESTADO_NOT === 'A',
            image: null
          }

          $scopeModal.chequearEstado = () => {
            $scopeModal.data.estado = $scopeModal.data.estado_check === true ? 'A' : 'I'
          }

          setTimeout(() => {
            document.querySelector('#guardarNotificacionButton').addEventListener('click', async () => {
              if ($scopeModal.data.image !== null) {
                const result = await subirImagen(document.querySelector('#image_modal').files[0])
  
                if (typeof result.error !== 'undefined') {
                  notify.show('error', result.error.message)
                  return
                }
  
                $scopeModal.data.ruta = result.data
              }
              const notificacion = {
                id: $scopeModal.data.id,
                titulo: $scopeModal.data.titulo,
                fecha: `${String($scopeModal.data.fecha_publicacion.getDate()).padStart(2, '0')}/${String($scopeModal.data.fecha_publicacion.getMonth() + 1).padStart(2, '0')}/${$scopeModal.data.fecha_publicacion.getFullYear()}`,
                descripcion: $scopeModal.data.descripcion,
                ruta: $scopeModal.data.ruta,
                estado: $scopeModal.data.estado
              }
              notify.show('loading')
              const response = await axios({
                url: '/php/publicidad/funcpublicidad.php',
                method: 'post',
                data: {
                  function: 'actualizarNotificacion', data: notificacion
                }
              })
              notify.close()
        
              if (response.data.codigo === '0') {
                dialog.close()
                notify.show('success', response.data.mensaje).then(() => {
                  $scope.cargarPublicaciones()
                })
              } else {
                notify.show('error', response.data.mensaje).then(() => {
                  $scope.cargarPublicaciones()
                })
              }
            })
            setTimeout(() => {
              const today = new Date()
              document.querySelector('#fecha_publicacion_modal').setAttribute('min', `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`)
            }, 500)
          }, 500)
        }]
      });
    }

    $scope.crearNotificacion = async () => {
      if ($scope.data.titulo === undefined || $scope.data.titulo === '') {
        notify.show('error', 'Debe ingresar un título')
        return
      }

      if ($scope.data.descripcion === undefined || $scope.data.descripcion === '') {
        notify.show('error', 'Debe ingresar una descripción')
        return
      }

      if ($scope.data.fecha_publicacion === undefined || $scope.data.fecha_publicacion === '') {
        notify.show('error', 'Debe ingresar una fecha de publicación')
        return
      }

      if ($scope.data.image === undefined || $scope.data.image === null) {
        notify.show('error', 'Debe ingresar una imagen')
        return
      }

      const result = await subirImagen(document.querySelector('#image').files[0])

      if (typeof result.error !== 'undefined') {
        notify.show('error', result.error.message)
        return
      }

      const response = await $http({
        url: '/php/publicidad/funcpublicidad.php',
        method: 'post',
        data: {
          function: 'insertarNotificacion', data: {
            titulo: $scope.data.titulo,
            descripcion: $scope.data.descripcion,
            ruta: result.data,
            estado: $scope.data.estado,
            fecha: `${String($scope.data.fecha_publicacion.getDate()).padStart(2, '0')}/${String($scope.data.fecha_publicacion.getMonth() + 1).padStart(2, '0')}/${$scope.data.fecha_publicacion.getFullYear()}`
          }
        }
      })

      if (response.data.codigo === '0') {
        notify.show('success', response.data.mensaje)
        $scope.data.titulo = ''
        $scope.data.descripcion = '',
        $scope.data.fecha_publicacion = '',
        $scope.data.publicaciones = null,
        $scope.data.image = null
      } else {
        notify.show('error', response.data.mensaje)
      }
    }

    setTimeout(() => {
      // setupTour()
    }, 1000)
  });

  angular.module('GenesisApp').controller('notificacionesMovilesController', providers);
})();
