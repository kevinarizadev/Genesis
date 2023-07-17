<!-- <?php 
  session_start();
  if (!isset($_SESSION['nombre'])) {
      header("Location: ../../../index.html");
  }
?> -->
<!DOCTYPE html>
<html ng-app="GenesisApp" lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="utf-8" />
    <title>Información de Demanda</title>
    <script src="../../../../bower_components/angular/angular.js"></script>
    <script src="../../../../bower_components/jquery/dist/jquery.js"></script>
    <script src="../../../../scripts/controllers/juridica/demandas/infodemandactrl.js"></script>
    <link rel="icon" href="../../../assets/images/icon.ico" />
    <style type="text/css">
        table,th,td {
            border: 1px solid black;
            border-collapse: collapse;
            font-family: 'Open Sans', sans-serif;
            font-size: 12px;
            text-align: center;
        }

        /* td {
            padding: 2px;
            height: 9px;
            font-weight: 600;
        } */

        .subtitulos{
            text-align: center;
            padding-left: 10px;
            font-size: 15px;
        }

        .subtitulos:before{
            content: '-- ';
        }

        .subtitulos:after{
            content: ' --';
        }

        ol{
            padding: 0px;
            list-style: none;
        }
    </style>
</head>

<body ng-controller="infodemandactrl" style="text-transform: uppercase;">
    <!-- <img src="1/img/header.png" style="margin-bottom:15px;"> -->
    <table width="100%">
        <thead>
            <tr>
                <th rowspan="4" style="width: 15%"><img src="https://genesis.cajacopieps.com//assets/images/cajacopi.png " width=100px;></th>
                <th rowspan="2"><h1>Datos del Proceso</h1></th>
                <th style="width: 15%"></th>
            </tr>
        </thead>
    </table>
    &nbsp;
    <table width="100%">
        <thead>
            <tr>
                <th>
                    <h3 class="subtitulos">Información de Radicación del Proceso</h3>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Despacho</th>
                            <th>Juzgado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tr_contenido">
                            <td>
                                <div>
                                    <span>007 CONTENCIOSO ADMINISTRATIVO - Administrativo</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{registro.juzgado +' - '+ registro.juzc_nombre}}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tr>
        </tbody>
    </table>
    &nbsp;
    <table width="100%">
        <thead>
            <tr>
                <th>
                    <h3 class="subtitulos">Clasificación del Proceso</h3>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <table width="100%" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Clase</th>
                            <th>Cuantía</th>
                            <th>Ubicación del Expediente</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <span>{{registro.tipojurisdiccion_nombre}}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{registro.tipoproceso_nombre}}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{+'$ '+registro.tempcuantia}}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{registro.ubicmunicipio + " - " + registro.nombre_ubicacion}}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tr>
        </tbody>
    </table>
    &nbsp;
    <table width="100%">
        <thead>
            <tr>
                <th>
                    <h3 class="subtitulos">DESCRIPCIÓN</h3>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div>
                        <span>{{registro.descripcion}}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    &nbsp;
    <table width="100%">
        <thead>
            <tr>
                <th colspan="2">
                    <h3 class="subtitulos">Sujetos Procesales</h3>
                </th>
            </tr>
            <tr>
                <th>Demandante(s)</th>
                <th>Demandado(s)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div ng-repeat="regDemtes in registro.demandantes | orderBy:'nombre'" >
                        <ol>
                            <li style="">{{regDemtes.nombre}}</li>
                        </ol>
                    </div>
                </td>
                <td>
                    <div ng-repeat="regDemdos in registro.demandados | orderBy:'nombre'" >
                        <ol>
                            <li>{{regDemdos.nombre}}</li>
                        </ol>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    &nbsp;
    <table width="100%">
        <tbody>
            <tr>
                <td>
                    <h1>Actuaciones del Proceso</h1>
                </td>
            </tr>
            <tr>
                <table cellpadding="0" cellspacing="0" class="ActuacionesDetalle" width="100%">
                    <thead>
                        <tr>
                            <th width="10%">Fecha de Actuación</th>
                            <th width="10%">Actuación</th>
                            <th width="50%">Anotación</th>
                            <th width="10%">Fecha de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="act in Actuaciones">
                            <td>
                                <div>
                                    <span>{{act.fecha_actuacion}}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{act.nombre}}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{act.descripcion}}</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span>{{act.fecha_registro}}</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </tr>
        </tbody>
    </table>
</body>
</html>