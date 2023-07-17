"use strict";
angular.module("GenesisApp").controller("entregaController", ["$scope", "$http", "mipresHTTP", "notification", "$timeout", "$rootScope", "$window", "ngDialog", "Popeye", "FileProcessor",
  function ($scope, $http, mipresHTTP, notification, $timeout, $rootScope, $window, ngDialog, Popeye, FileProcessor) {

    //variables de control


    $(document).ready(function () {
      var dat = { prov: 'navb' }
      $.getJSON("php/obtenersession.php", dat)
        .done(function (respuesta) {
          $scope.sesdata = respuesta;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log("navbar error obteniendo variables");
        });
    });

    $scope.tabI = true;
    $scope.tabII = false;
    $scope.tabIII = false;
    $scope.tabIV = false;
    $scope.activeI = "active final white-text";
    $scope.activeII = "none";
    $scope.activeIII = "none";
    $scope.activeIV = "none";
    $scope.activeIcolor = "foot4";
    $scope.activeIIcolor = "";
    $scope.activeIIIcolor = "";
    $scope.activeIVcolor = "";

    $scope.ver_dir = true;
    $scope.vw_dir = false;
    $scope.vw_jp = false;
    $scope.regimen = "";
    $scope.vertutelas = true;
    $scope.verjp = true;
    $scope.verentregas = true;
    $scope.verDirxNO = true;

    $scope.hide_serchdir = function () {
      $scope.vw_dir = !$scope.vw_dir;
      $scope.vertutelas = true;
      // return vw_dir;
    }

    $scope.hide_serchjp = function () {
      $scope.vw_jp = !$scope.vw_jp;
      $scope.verjp = true;
      $scope.verentregas = true;
      // return vw_dir;
    }

    $scope.init = function () {
      $scope.direccionar_disabler = true;
      $scope.tabI = true;
      $scope.tabII = false;
      $scope.tabIII = false;
      $scope.tabIV = false;
      $scope.activeI = "active final";
      $scope.activeII = "none";
      $scope.activeIII = "none";
      $scope.activeIV = "none";
      $scope.activeIcolor = "";
      $scope.activeIIcolor = "";
      $scope.activeIIIcolor = "";
      $scope.activeIVcolor = "";
      $scope.ver_historico = true;
    };

  
    $scope.search_tutela = function () {
      swal({
        title: 'Espere un momento',
        text: 'Consultando plataforma MIPRES',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          swal.showLoading()
        }
      });
      
      if ($scope.vw_dir==false) {
        $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'rango__fecha',
            'fecha_i': formatDate($scope.fecha_i),
            'fecha_f': formatDate($scope.fecha_f),
            'regimen': $scope.regimen,
            'tipo': 'T'
          }
        }).then(function (response) {    
          if (response.data.length == 0) {
            swal('Error', 'No se encontraron Registros', 'warning')
          } else {
            if (response.data == "1") {
              swal('Error', 'Ha ocurrido un error, favor reintentar nuevamente mas tarde', 'warning')
            } else {

              
              if (response !== 0) {
                        

                swal.close();
             
                $scope.vertutelas = false;
                // $scope.listaPRES = response;
                $scope.listaPRESxls = response;

                let consolidado = [];

                const datosFiltrados = response.data.filter(dia => dia.length > 0)

                datosFiltrados.forEach(dia => {
                    dia.forEach(pr => {
                        const textMap = {
                            // CodPerDurTrat
                            CodPerDurTrat: {
                                '1': 'Minutos',
                                '2': 'Horas',
                                '3': 'Dias',
                                '4': 'Semanas',
                                '5': 'Meses',
                                '6': 'Años'
                            },
                            CodFreUso: {
                                '1': 'Minutos',
                                '2': 'Horas',
                                '3': 'Dias',
                                '4': 'Semanas',
                                '5': 'Meses',
                                '6': 'Años'
                            },
                            CodFreAdmon: {

                                '1': 'Minutos',
                                '2': 'Horas',
                                '3': 'Dias'
                            },
                            DurTrat: {

                                '1': 'Minutos',
                                '2': 'Horas',
                                '3': 'Dias',
                                '4': 'Semanas',
                                '5': 'Meses',
                                '6': 'Años'
                            },
                            TipoMed: {

                                '1': ' Medicamento',
                                '2': ' Vital No Disponible',
                                '3': ' Preparación Magistral',
                                '7': ' UNIRS6',
                                '9': ' Urgencia Médica '
                            },
                            TipoPrest: {

                                '1': ' Unica',
                                '2': ' Sucesiva'
                            },
                            IndEsp: {

                                '1': 'Admon Gotas Unicas',
                                '2': 'Admon Inmediata',
                                '3': 'Admon en Bolo',
                                '4': 'Admon Goteo',
                                '5': 'Inf. Continua',
                                '6': 'Inf. Intermitente',
                                '7': 'Inf. Intermitente',
                                '8': 'Microgoteo',
                                '9': 'Perfusion',
                                '10': 'Sin indicacion'
                            },

                            EstJM: {

                                '1': 'No requiere JP',
                                '2': 'Requiere JP',
                                '3': 'Aprobada',
                                '4': 'Rechazada'
                            }
                        }
                      
                        const newMedicamentos = pr.medicamentos.map(item => {
                            const newItem = {};
                            Object.keys(item).forEach(key => {
                                if (textMap[key]) {
                                    if (item[key] === null) {
                                        newItem[key] = 'No Aplica'
                                    } else {
                                        newItem[key] = textMap[key][item[key]]
                                    }
                                } else {
                                    newItem[key] = item[key]
                                }
                            });

                            return newItem;
                        })

                        const newProcedimientos = pr.procedimientos.map(item => {
                            const newItem = {};
                            Object.keys(item).forEach(key => {
                                if (textMap[key]) {
                                    if (item[key] === null) {
                                        newItem[key] = 'No Aplica'
                                    } else {
                                        newItem[key] = textMap[key][item[key]]
                                    }
                                } else {
                                    newItem[key] = item[key]
                                }
                            });

                            return newItem;
                        })
                       
                        const newserviciosComplementarios = pr.serviciosComplementarios.map(item => {
                          const newItem = {};
                          Object.keys(item).forEach(key => {
                              if (textMap[key]) {
                                  if (item[key] === null) {
                                      newItem[key] = 'No Aplica'
                                  } else {
                                      newItem[key] = textMap[key][item[key]]
                                  }
                              } else {
                                  newItem[key] = item[key]
                              }
                          });

                          return newItem;
                      })

                        const newproductosnutricionales = pr.productosnutricionales.map(item => {
                        const newItem = {};
                        Object.keys(item).forEach(key => {
                            if (textMap[key]) {
                                if (item[key] === null) {
                                    newItem[key] = 'No Aplica'
                                } else {
                                    newItem[key] = textMap[key][item[key]]
                                }
                            } else {
                                newItem[key] = item[key]
                            }
                        });

                        return newItem;
                      })

                 
                        // console.log(newMedicamentos);
                        pr.medicamentos = newMedicamentos;
                        pr.procedimientos = newProcedimientos;
                        pr.serviciosComplementarios = newserviciosComplementarios;
                        pr.productosnutricionales = newproductosnutricionales;

                        pr.tutela.EstTut = pr.tutela.EstTut === 4 ? 'Activo' : 'No Activo';
                        pr.tutela.FTutela = formatDate(pr.tutela.FTutela);
                        const object = pr.tutela;
                        object.dispositivos = pr.dispositivos;
                        object.actdispositivos = pr.dispositivos.length === 0 ? true : false;
                        object.medicamentos = pr.medicamentos;
                        object.actmedicamentos = pr.medicamentos.length === 0 ? true : false;
                        object.procedimientos = pr.procedimientos;
                        object.actprocedimientos = pr.procedimientos.length === 0 ? true : false;
                        object.productosnutricionales = pr.productosnutricionales;
                        object.actproductosnutricionales = pr.productosnutricionales.length === 0 ? true : false;
                        object.serviciosComplementarios = pr.serviciosComplementarios;
                        object.actserviciosComplementarios = pr.serviciosComplementarios.length === 0 ? true : false;

                        if (pr.medicamentos != null) {
                            object.medicamentos.forEach(medicament => {
                                medicament.tipo_tec = 'M';
                                medicament.NoPrescripcion = object.NoPrescripcion;
                                medicament.TipoIDPaciente = object.TipoIDPaciente;
                                medicament.NroIDPaciente = object.NroIDPaciente;

                            })
                        }
                        if (pr.procedimientos != null) {
                            object.procedimientos.forEach(procedimient => {
                                procedimient.tipo_tec = 'P';
                                procedimient.NoPrescripcion = object.NoPrescripcion;
                                procedimient.TipoIDPaciente = object.TipoIDPaciente;
                                procedimient.NroIDPaciente = object.NroIDPaciente;

                            })
                        }
                        if (pr.productosnutricionales != null) {
                            object.productosnutricionales.forEach(productosnutricional => {
                                productosnutricional.tipo_tec = 'N';
                                productosnutricional.NoPrescripcion = object.NoPrescripcion;
                                productosnutricional.TipoIDPaciente = object.TipoIDPaciente;
                                productosnutricional.NroIDPaciente = object.NroIDPaciente;

                            })
                        }
                        if (pr.serviciosComplementarios != null) {
                            object.serviciosComplementarios.forEach(serviciosComplementari => {
                                serviciosComplementari.tipo_tec = 'S';
                                serviciosComplementari.NoPrescripcion = object.NoPrescripcion;
                                serviciosComplementari.TipoIDPaciente = object.TipoIDPaciente;
                                serviciosComplementari.NroIDPaciente = object.NroIDPaciente;

                            })
                        }

                        consolidado.push(object)
                    })

                })

             

                $scope.newarray = consolidado;

                $scope.tutelas = consolidado;
                $scope.tutelasTemp = consolidado;

                $scope.currentPage = 0;
                $scope.pageSize = 10;
                $scope.valmaxpag = 50;
                $scope.pages = [];
                $scope.configPages();

               
                setTimeout(function () { document.getElementById("table_tutela").scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 300);
           
                } else {
                    swal('Advertencia', 'Ha ocurrido un error favor reintentar nuevamente mas tarde', 'warning');
                }                                    
              }
          }
        });   
      }else{
        $http({
          method: 'POST',
          url: "php/recobro/mipres.php",
          data: {
            function: 'get_tutelas_no',
            'dato':    $scope.no_pres,
            'regimen': $scope.regimen
          }
        }).then(function (response) {
 
  
          if (response.data.length == 0) {
            swal('Error', 'No se encontraron Registros', 'warning')
          } else {
            if (response.data == "1") {
              swal('Error', 'Ha ocurrido un error, favor reintentar nuevamente mas tarde', 'warning')
            } else {
              $scope.vertutelas = false;
              // $scope.tutelas = response;
              $scope.newarray = response.data.map(pr => {
                const textMap = {
                  // CodPerDurTrat
                  CodPerDurTrat: {
                    '1': 'Minutos',
                    '2': 'Horas',
                    '3': 'Dias',
                    '4': 'Semanas',
                    '5': 'Meses',
                    '6': 'Años'
                  },
                  CodFreUso: {
                    '1': 'Minutos',
                    '2': 'Horas',
                    '3': 'Dias',
                    '4': 'Semanas',
                    '5': 'Meses',
                    '6': 'Años'
                  },
                  CodFreAdmon: {
  
                    '1': 'Minutos',
                    '2': 'Horas',
                    '3': 'Dias'
                  },
                  DurTrat: {
  
                    '1': 'Minutos',
                    '2': 'Horas',
                    '3': 'Dias',
                    '4': 'Semanas',
                    '5': 'Meses',
                    '6': 'Años'
                  },
                  TipoMed: {
  
                    '1': ' Medicamento',
                    '2': ' Vital No Disponible',
                    '3': ' Preparación Magistral',
                    '7': ' UNIRS6',
                    '9': ' Urgencia Médica '
                  },
                  TipoPrest: {
  
                    '1': ' Unica',
                    '2': ' Sucesiva'
                  },
                  IndEsp: {
  
                    '1': 'Admon Gotas Unicas',
                    '2': 'Admon Inmediata',
                    '3': 'Admon en Bolo',
                    '4': 'Admon Goteo',
                    '5': 'Inf. Continua',
                    '6': 'Inf. Intermitente',
                    '7': 'Inf. Intermitente',
                    '8': 'Microgoteo',
                    '9': 'Perfusion',
                    '10': 'Sin indicacion'
                  },
  
                  EstJM: {
  
                    '1': 'No requiere JP',
                    '2': 'Requiere JP',
                    '3': 'Aprobada',
                    '4': 'Rechazada'
                  }
                }
                const newMedicamentos = pr.medicamentos.map(item => {
                  const newItem = {};
                  Object.keys(item).forEach(key => {
                    if (textMap[key]) {
                      if (item[key] === null) {
                        newItem[key] = 'No Aplica'
                      } else {
                        newItem[key] = textMap[key][item[key]]
                      }
                    } else {
                      newItem[key] = item[key]
                    }
                  });
  
                  return newItem;
                })
                const newProcedimientos = pr.procedimientos.map(item => {
                  const newItem = {};
                  Object.keys(item).forEach(key => {
                    if (textMap[key]) {
                      if (item[key] === null) {
                        newItem[key] = 'No Aplica'
                      } else {
                        newItem[key] = textMap[key][item[key]]
                      }
                    } else {
                      newItem[key] = item[key]
                    }
                  });
  
                  return newItem;
                })

                pr.medicamentos = newMedicamentos;
                pr.procedimientos = newProcedimientos;
  
                pr.tutela.FTutela = formatDate(pr.tutela.FTutela);
                const object = pr.tutela;
                object.dispositivos = pr.dispositivos;
                object.actdispositivos = pr.dispositivos.length === 0 ? true : false;
                object.medicamentos = pr.medicamentos;
                object.actmedicamentos = pr.medicamentos.length === 0 ? true : false;
                object.procedimientos = pr.procedimientos;
                object.actprocedimientos = pr.procedimientos.length === 0 ? true : false;
                object.productosnutricionales = pr.productosnutricionales;
                object.actproductosnutricionales = pr.productosnutricionales.length === 0 ? true : false;
                object.serviciosComplementarios = pr.serviciosComplementarios;
                object.actserviciosComplementarios = pr.serviciosComplementarios.length === 0 ? true : false;
  
                if (pr.medicamentos != null) {
                  object.medicamentos.forEach(medicament => {
                    medicament.tipo_tec = 'M';
                    medicament.NoPrescripcion = object.NoPrescripcion;
                    medicament.TipoIDPaciente = object.TipoIDPaciente;
                    medicament.NroIDPaciente = object.NroIDPaciente;
  
                  })
                }
                if (pr.procedimientos != null) {
                  object.procedimientos.forEach(procedimient => {
                    procedimient.tipo_tec = 'P';
                    procedimient.NoPrescripcion = object.NoPrescripcion;
                    procedimient.TipoIDPaciente = object.TipoIDPaciente;
                    procedimient.NroIDPaciente = object.NroIDPaciente;
  
                  })
                }
                if (pr.productosnutricionales != null) {
                  object.productosnutricionales.forEach(productosnutricional => {
                    productosnutricional.tipo_tec = 'N';
                    productosnutricional.NoPrescripcion = object.NoPrescripcion;
                    productosnutricional.TipoIDPaciente = object.TipoIDPaciente;
                    productosnutricional.NroIDPaciente = object.NroIDPaciente;
  
                  })
                }
                if (pr.serviciosComplementarios != null) {
                  object.serviciosComplementarios.forEach(serviciosComplementari => {
                    serviciosComplementari.tipo_tec = 'S';
                    serviciosComplementari.NoPrescripcion = object.NoPrescripcion;
                    serviciosComplementari.TipoIDPaciente = object.TipoIDPaciente;
                    serviciosComplementari.NroIDPaciente = object.NroIDPaciente;
  
                  })
                }
  
                return object
              })
              $scope.tutelas = $scope.newarray;
              $scope.tutelasTemp = $scope.tutelas;
              $scope.currentPage = 0;
              $scope.pageSize = 10;
              $scope.valmaxpag = 10;
              $scope.pages = [];
              $scope.configPages();
  
              setTimeout(function () { document.getElementById("table_tutela").scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 300);
              swal.close();
  
            }
          }
  
  
        });
      
      }
  }

    $scope.search_entrega = function(){
      swal({
        title: 'Espere un momento',
        text: 'Consultando plataforma MIPRES',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          swal.showLoading()
        }
      });
      $http({
        method: 'POST',
        url: "php/recobro/mipres.php",
        // url: "json/recobro/entregas.json",
        data: {
          function: 'rango__fecha',
          'fecha_i': formatDate($scope.fecha_i),
          'fecha_f': formatDate($scope.fecha_f),
          'regimen': $scope.regimen,
          'tipo':'E'
        }
      }).then(function (response) { 
        if (response.data !== "1") {
          $scope.verentregas = false;
          swal.close();
          let consolidado = [];
          const datosFiltrados = response.data.filter(dia => dia.length > 0)
          datosFiltrados.forEach(dia => {
              dia.forEach(pr => {         
               var object = pr;
                  object.FecEntrega	 = formatDate(pr.FecEntrega);
                  object.FecRepEntrega = formatDate(pr.FecRepEntrega);
                  object.ValorEntregado = currency(pr.ValorEntregado);
                  consolidado.push(object);
              })
          })
          $scope.entregas = consolidado;
          // console.log($scope.entregas);
          $scope.newarray = consolidado;

          // $scope.tutelas = consolidado;
          $scope.entregasTemp = consolidado;

          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.valmaxpag = 50;
          $scope.pages = [];
          $scope.configPages_entrega();
        } else {
          swal('Advertencia', 'Ha ocurrido un error favor reintentar nuevamente mas tarde', 'warning');
        }
      });
    }

    $scope.search_entregano = function () {
      
      swal({
        title: 'Espere un momento',
        text: 'Consultando plataforma MIPRES',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          swal.showLoading()
        }
      });
      $http({
        method: 'POST',
        //ENTREGASAQUI
        url: "php/recobro/mipres.php",
        // json\entregas.json
        // url: "json/entregas.json",
        data: {
          function: 'get_entrega_no',
          'no_entrega': $scope.no_entrega,
          'regimen': $scope.regimen
        }
      }).then(function (response) { 
        if (response.data.length != 0) {
          $scope.verentregas = false;
          swal.close();

          
          // console.log($scope.entregas);
          $scope.newarray = response.data;

          // $scope.tutelas = consolidado;
          $scope.entregas = response.data;
          $scope.entregasTemp = response.data;

          $scope.entregas.ValorEntregado = currency(response.data.ValorEntregado);
          $scope.entregasTemp.ValorEntregado = currency(response.data.ValorEntregado);

          $scope.currentPage = 0;
          $scope.pageSize = 10;
          $scope.valmaxpag = 50;
          $scope.pages = [];
          $scope.configPages_entrega();
        } else {
          swal('Advertencia', 'No se encontraron registros', 'warning');
        }
      });
    }

    $scope.consolidado = function(){
              
               $http({
                method: 'POST',
                url: "php/recobro/excel_entregas.php",
                data: {
                    function: 'crear_excel',
                    datos: $scope.newarray 
                    //datos: $scope.listaPRESxls
                }
            }).then(function (r) {

                var link = document.createElement("a");
                link.download = name;
                link.href = 'php/recobro/consolidado_pres2.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
            });
        }
    var i = 0;


    $scope.open_modal = function (modal, datos_dir) {
      $scope.info = datos_dir;
      $scope.hide_direccionar = true;
      switch (modal) {
        
        case 'S':
          $scope.info;
          $scope.regimen;
          ngDialog.open({
            template: 'views/recobro/modal/modalSuministros.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalSuministrosctrl',
            scope: $scope
          });
          break;

        case 'det':
          $scope.info.tutela;
          ngDialog.open({
            template: 'views/recobro/modal/modalDetTutela.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalDetTutelactrl',
            scope: $scope
          });
          break;


        case 'med':
          const newScope = $scope.$new(true);
          newScope.info = datos_dir;
          newScope.hide_direccionar = true;
          ngDialog.open({
            template: 'views/recobro/modal/modalMedicamentos.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalMedicamentoctrl',
            scope: newScope
          });
          break;

        case 'proc':
          $scope.info;
          $scope.hide_direccionar = true;
          ngDialog.open({
            template: 'views/recobro/modal/modalProcedimientos.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalProcedimientoctrl',
            scope: $scope
          });
          break;
        case 'dis':
          $scope.info;
          $scope.hide_direccionar = true;
          ngDialog.open({
            template: 'views/recobro/modal/modalDispositivos.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalMedicamentoctrl',
            scope: $scope
          });
          break;
        case 'prod':
          $scope.info;
          $scope.hide_direccionar = true;
          ngDialog.open({
            template: 'views/recobro/modal/modalProdNut.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalMedicamentoctrl',
            scope: $scope
          });
          break;
        case 'ser':
          $scope.info;
          $scope.hide_direccionar = true;
          ngDialog.open({
            template: 'views/recobro/modal/modalServComp.html',
            className: 'ngdialog-theme-plain',
            controller: 'modalMedicamentoctrl',
            scope: $scope
          });
          break;

        default:
          break;
      }
    }
    
    $scope.setTab = function (opcion) {
      $scope.ver_dir = true;
      $scope.init();
      switch (opcion) {
        case 1:
          $scope.tabI = true;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = "active final white-text";
          $scope.activeII = "none";
          $scope.activeIII = "none";
          $scope.activeIV = "none";
          $scope.activeIcolor = "foot4";
          $scope.nametab = "Autorización";
          $scope.tipoaut = "1";
          break;
        case 2:
          $scope.tabI = false;
          $scope.tabII = true;
          $scope.tabIII = false;
          $scope.tabIV = false;
          $scope.activeI = "none";
          $scope.activeII = "active final white-text";
          $scope.activeIII = "none";
          $scope.activeIV = "none";
          $scope.activeIIcolor = "foot4";
          $scope.nametab = "Autorización Programada";
          $scope.titletabII = "Solicitud";
          $scope.tipoaut = "2";
          break;
        case 3:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = true;
          $scope.tabIV = false;
          $scope.activeI = "none";
          $scope.activeII = "none";
          $scope.activeIII = "active final white-text";
          $scope.activeIV = "none";
          $scope.activeIIIcolor = "foot4";
          $scope.nametab = "Productos";
          break;
        case 4:
          $scope.tabI = false;
          $scope.tabII = false;
          $scope.tabIII = false;
          $scope.tabIV = true;
          $scope.activeI = "none";
          $scope.activeII = "none";
          $scope.activeIII = "none";
          $scope.activeIVcolor = "foot4";
          $scope.activeIV = "active final white-text";
          $scope.nametab = "Consulta de Autorización";
          $scope.tipoaut = "4";
          break;
        default:
      }
    };
    $scope.setTab(3);

    $scope.buscar_no = function (numero_presc, regimen_no) {
      swal({
        title: 'Espere un momento',
        text: 'Consultando plataforma MIPRES',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          swal.showLoading()
        }
      });
      mipresHTTP.obtener_tutelapornumero(regimen_no, numero_presc).then(data => {
        swal.close();
        $scope.verMipres = false;
        $scope.tutelas = data;
      });
    };

    $scope.search = function () {
      swal({
        title: 'Espere un momento',
        text: 'Consultando plataforma MIPRES',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
          swal.showLoading()
        }
      });
      const fecha = formatDate($scope.fecha_inicio);
      mipresHTTP.obtener_porfecha($scope.regimen, fecha).then(data => {
        swal.close();
        $scope.verMipres = false;
        $scope.direccionamientos = data;
      });
      // mipresHTTP.obtenerToken($scope.regimen).then(function (response) {
      //     $scope.token_generado = response.data.replace(/"/,'');
      //     mipresHTTP.obtener_porfecha(formatDate($scope.fecha_inicio),$scope.token_generado).then(function (r) {
      //         swal.close();
      //         $scope.verMipres = false;
      //         $scope.direccionamientos = r.data;
      //     })

      //     mipresHTTP.obtenerPorFecha(regimen, fecha).then(datos=>{

      //     })
      // })
    };

    $scope.detaildir = function (id_dir) {
      // swal('Yay',id_dir, 'success')
      mipresHTTP.s_detaildir($scope.regimen, id_dir).then(function (r) {
        swal.close();
        $scope.verMipres = false;
        $scope.direccionamientos = r;
        console.log(r);
      });
    };

    $scope.configPages = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.tutelasTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.tutelasTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.tutelasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.tutelasTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.tutelasTemp.length / $scope.pageSize);
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
    }

    $scope.configPages_entrega = function () {
      $scope.pages.length = 0;
      var ini = $scope.currentPage - 4;
      var fin = $scope.currentPage + 5;
      if (ini < 1) {
        ini = 1;
        if (Math.ceil($scope.entregasTemp.length / $scope.pageSize) > $scope.valmaxpag)
          fin = 10;
        else
          fin = Math.ceil($scope.entregasTemp.length / $scope.pageSize);
      } else {
        if (ini >= Math.ceil($scope.entregasTemp.length / $scope.pageSize) - $scope.valmaxpag) {
          ini = Math.ceil($scope.entregasTemp.length / $scope.pageSize) - $scope.valmaxpag;
          fin = Math.ceil($scope.entregasTemp.length / $scope.pageSize);
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
    }

    $scope.setPage = function (index) {
      $scope.currentPage = index - 1;
      // console.log($scope.tutelas.length / $scope.pageSize - 1)
    }

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }

    
function currency(nStr)
{
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

    $scope.filter = function (val) {
      $scope.tutelasTemp = $filter('filter')($scope.tutelas, val);
      if ($scope.tutelasTemp.length > 0) {
        $scope.setPage(1);
      }
      $scope.configPages();
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
