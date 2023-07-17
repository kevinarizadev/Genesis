'use strict';
angular.module('GenesisApp')
    .controller('listadoinstructivosctrl', ['$scope', '$sce',
        function ($scope, $sce) {
            $scope.url = $sce.trustAsResourceUrl('');
            $scope.viewPDF = function (link) {
                $scope.url = $sce.trustAsResourceUrl(link);
            }
            $scope.accordion = {
                current: null,
                current2: null,
                current3: null
            };
            $scope.listado = [
                {
                    "macro": "Macroproceso Estratégico",
                    "data":[
                        {
                            "area": "Gestión estratégica",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Indicadores Alto Costo",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/Gestion Estrategica/Instructivos/GTIC-015-FR -  Instructivo  Indicadores Alto Costo.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Normatividad",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/Gestion Estrategica/Instructivos/GTIC-015-FR -  Instructivo  Normatividad Portal Genesis.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Sistema de Gestión de Calidad (SGC)",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/Gestion Estrategica/Instructivos/GTIC-015-FR -  Instructivo  SGC.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Modulo Colmena",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/Gestion Estrategica/Instructivos/GTIC-015-FR -  Instructivo  Modulo Colmena.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "area": "TIC",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  - Agendamiento Videoconferencia",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/TIC/Instructivos/GTIC-015-FR -  Instructivo  - Agendamiento Videoconferencia.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Mesa de Ayuda",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/TIC/Instructivos/GTIC-015-FR -  Instructivo  Mesa de Ayuda.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo Portal Office - OneDrive",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/TIC/Instructivos/GTIC-015-FR -  Instructivo Portal Office - OneDrive.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo Qlik Sense",
                                            "url": "docs/listado_instructivos/Macroproceso Estratégico/TIC/Instructivos/GTIC-015-FR -  Instructivo Qlik Sense.pdf"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "macro": "Macroproceso Misional",
                    "data": [
                        // {
                        //     "area":"ABDA",
                        //     "data":[

                        //     ]
                        // },
                        {
                            "area": "Afiliacion Registro y Mercadeo",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Consulta Afiliado - Pagos (Opcion IPS)",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo  Consulta Afiliado - Pagos (Opcion IPS).pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Consulta Afiliado (Opcion Afiliado)",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo  Consulta Afiliado (Opcion Afiliado).pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Consulta Afiliado",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo - Consulta Afiliado.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Novedades Genesis",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo  Novedades Genesis.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Nacimientos",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo  Nacimientos.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo Confirmacion de Afiliacion de Nacimientos",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo Confirmacion de Afiliacion de Nacimientos.pdf"
                                        },
                                        {
                                            "nombre": "Instructivos/GTIC-015-FR -  Instructivo  Mesa de Control",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Instructivos/GTIC-015-FR -  Instructivo  Mesa de Control.pdf"
                                        }
                                    ]
                                },
                                {
                                    "carpeta": "Manuales",
                                    "data": [
                                        {
                                            "nombre": "Manual - Afiliacion en Linea",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Manual/Manual - Afiliacion en Linea.pdf"
                                        },
                                        {
                                            "nombre": "Manual - Proceso de Digitalizacion",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Afiliacion Registro y Mercadeo/Manual/Manual - Proceso de Digitalizacion.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        // {
                        //     "area":"Auditoria Medica",
                        //     "data":[

                        //     ]
                        // },
                        {
                            "area": "Autorizaciones",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo -  Impresion Autorizaciones  Web Municipios",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Autorizaciones/Instructivos/GTIC-015-FR -  Instructivo -  Impresion Autorizaciones  Web Municipios.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Autorizaciones Web",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Autorizaciones/Instructivos/GTIC-015-FR -  Instructivo - Autorizaciones Web.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Solicitud de Contrato",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Autorizaciones/Instructivos/GTIC-015-FR -  Instructivo - Solicitud de Contrato.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - ESOA Interno",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Autorizaciones/Instructivos/GTIC-015-FR -  Instructivo - ESOA Interno.pdf"
                                        }
                                        ,
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Autorizaciones Web-(ESOA Externo)",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Autorizaciones/Instructivos/GTIC-015-FR -  Instructivo - Autorizaciones Web-(ESOA Externo).pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        // {
                        //     "area":"Call Center",
                        //     "data":[

                        //     ]
                        // },
                        {
                            "area": "Contratacion",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  formato de Instructivo Suficiencia UPC",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Contratacion/Instructivos/GTIC-015-FR -  formato de Instructivo Suficiencia UPC.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "area": "Movilidad Regimen Contributivo",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Actualización de Datos (Opcion Empresa)",
                                            "url": "docs/instructivos_empresa/GTIC-015-FR -  Instructivo - ACTUALIZACION DE DATOS DE LA EMPRESA (NOVEDADES).pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Novedades y Registro de afiliados (Opcion Empresa)",
                                            "url": "docs/instructivos_empresa/GTIC-015-FR -  Instructivo - EMPRESAS - NOVEDADES & REGISTRO DE AFILIADOS.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Registro e Ingreso a Genesis (Opcion Empresa)",
                                            "url": "docs/instructivos_empresa/GTIC-015-FR -  Instructivo - Registro e Ingreso a Genesis (Opcion Empresa).pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "area": "Recobro",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Prescripcion",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Recobro/Instructivos/GTIC-015-FR -  Instructivo - Prescripcion.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "area":"Salud",
                            "data":[
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo Suficiencia UPC",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Salud/Instructivos/GTIC-015-FR -  Instructivo Suficiencia UPC.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "area": "Siau",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  - Censo Hospitalario",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Siau/Instructivos/GTIC-015-FR -  Instructivo  - Censo Hospitalario.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Codigo de Urgencia",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Siau/Instructivos/GTIC-015-FR -  Instructivo  Codigo de Urgencia.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  PQR Fase I",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Siau/Instructivos/GTIC-015-FR -  Instructivo  - PQR Fase I.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  PQR Fase II Salud",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Siau/Instructivos/GTIC-015-FR -  Instructivo  - PQR Fase II -  Opcion Salud.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  PQR Fase II Aseguramiento",
                                            "url": "docs/listado_instructivos/Macroproceso Misional/Siau/Instructivos/GTIC-015-FR -  Instructivo  - PQR Fase II -  Opcion Aseguramiento.pdf"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "macro": "Macroproceso Apoyo",
                    "data": [
                        {
                            "area": "Administrativa",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  - Administracion de Transporte",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Administrativa/Instructivos/GTIC-015-FR -  Instructivo  - Administracion de Transporte.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Gestor Documental - Administrativa",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Administrativa/Instructivos/GTIC-015-FR -  Instructivo  Gestor Documental - Administrativa.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Centro de Monitoreo - Administrativo",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Administrativa/Instructivos/GTIC-015-FR -  Instructivo  - Centro de Monitoreo - Administrativo.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  - Modulo Adquisicion de Bienes",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Administrativa/Instructivos/GTIC-015-FR -  Instructivo  - Modulo Adquisicion de Bienes.pdf"
                                        }                                       
                                    ]
                                }
                            ]
                        },
                        // {
                        //     "area":"Auditoria de Cuentas Medicas",
                        //     "data":[

                        //     ]
                        // },
                        // {
                        //     "area":"Cartera",
                        //     "data":[

                        //     ]
                        // },
                        {
                            "area": "Contabilidad",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Confirmacion programacion contable",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Contabilidad/Instructivos/GTIC-015-FR -  Instructivo - Confirmacion programacion contable.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo  Reportes Red de Prestadores de Servicios de Salud",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Contabilidad/Instructivos/GTIC-015-FR -  Instructivo  Reportes Red de Prestadores de Servicios de Salud.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        // {
                        //     "area":"Cuentas por Cobrar",
                        //     "data":[

                        //     ]
                        // },
                        // {
                        //     "area":"Documentos y Archivo",
                        //     "data":[

                        //     ]
                        // },
                        // {
                        //     "area":"Infraestructura",
                        //     "data":[

                        //     ]
                        // },
                        {
                            "area": "Juridica",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Modulo Tutelas",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Juridica/Instructivos/GTIC-015-FR -  Instructivo - Modulo Tutelas.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo - Modulo Gestion Demanda",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Juridica/Instructivos/GTIC-015-FR -  Instructivo - Modulo Gestion Demanda.pdf"
                                        }
                                    ]
                                }
                            ]
                        },
                        // {
                        //     "area":"Pagaduria",
                        //     "data":[

                        //     ]
                        // },
                        {
                            "area": "Talento Humano",
                            "data": [
                                {
                                    "carpeta": "Instructivos",
                                    "data": [
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo Datos Basicos -  (Admin Datos Basicos -  Consultar Informacion)",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Talento Humano/Instructivos/GTIC-015-FR -  Instructivo Datos Basicos -  (Admin Datos Basicos -  Consultar Informacion).pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  Instructivo Datos Basicos - Mi Hoja de Vida",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Talento Humano/Instructivos/GTIC-015-FR -  Instructivo Datos Basicos - Mi Hoja de Vida.pdf"
                                        },
                                        {
                                            "nombre": "GTIC-015-FR -  InstructivoAusentismo Fase II",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Talento Humano/Instructivos/GTIC-015-FR -  InstructivoAusentismo Fase II.pdf"
                                        }
                                    ]
                                },
                                {
                                    "carpeta": "Manuales",
                                    "data": [
                                        {
                                            "nombre": "Manual - Ausentismo",
                                            "url": "docs/listado_instructivos/Macroproceso Apoyo/Talento Humano/Manual/Manual - Ausentismo.pdf"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
        }]);