<!DOCTYPE html>
<html lang="en" ng-app="GenesisApp">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Genesis</title>
  <link rel="icon" href="../../assets/images/icon.ico" />
  <link rel="stylesheet" href="../../bower_components/materialize/bin/materializeformat.css" />
  <script src="../../bower_components/angular/angular.js"></script>
  <script src="../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../scripts/controllers/autorizaciones/printsolicitudautController.js"></script>
  <script src="../../bower_components/materialize/bin/materialize.js"></script>
  <script src="../../js/jQuery.print.min.js"></script>
  <style>
    p.eslogan {
      margin-top: 0px;
      margin-bottom: 0px;
      position: absolute;
      padding-left: 12px;
    }

    .nom {
      top: 5px;
      font-size: x-large;
      /* left: 174px; */
      width: 100%;
    }

    .nit {
      top: 35px;
    }

    .dir {
      top: 54px;
    }

    .tel {
      top: 73px;
    }

    .ubi {
      top: 92px;
    }

    .titulo {
      width: 622.5px;
      position: fixed;
      left: 400px;
    }

    .originalidad {
      font-size: large;
      position: fixed;
      left: 1030px;
    }

    .col1ben {
      position: fixed;
      left: 161px;
    }

    #table_datosbasicos,
    #table_datosbasicos tr th,
    #table_datosbasicos tr td {
      border: 0px solid white !important;
      border-collapse: collapse;
      /* font-size: 10px; */
      border-spacing: 0 0 !important;
      padding: 0;
      margin: 0;
      text-align: left;
      /* display: none; */
    }

    #table_datosbasicos {
      font-size: 14px;
      margin-top: -5px;
    }
  </style>
</head>

<body id="ele4" ng-controller="printsolicitudautController">
  <div class="row">
    <div id="autorizacion-x" class="col s12" style="width: 1100px;">
      <div class="row section-header" style="padding-bottom: 0px;">
        <div class="col s12 headers" id="cabe" style="position: fixed; background-color: white; z-index: 999;">
          <div class="col s12" id="cabecera">
            <div class="col s12">
              <div class="col s1">
                <img src="../../assets/images/logo_cajacopieps.png" width="160" height="60" style="left: -48px;position: relative;" alt="Logo CajacopiEPS" />
              </div>
              <div class="col s3" style="position: fixed; left: 153px;">
                <p class="eslogan nom">CAJACOPI EPS SAS</p>
                <p class="eslogan nit">{{datosAU["0"].CABEZA["0"].NIT}}</p>
                <!-- <p class="eslogan nit">901.543.211 - 6</p> -->
                <p class="eslogan dir">{{datosAU["0"].CABEZA["0"].dirc}}</p>
                <p class="eslogan tel">{{datosAU["0"].CABEZA["0"].telc}}</p>
                <p class="eslogan ubi"></p>
              </div>
              <div class="col s8 titulo">
                <div class="col s8" style="position: fixed; left: 500px; font-size: xx-large; top: -26px;">
                  <p><strong>Solicitud de Autorización</strong></p>
                </div>
              </div>
            </div>
            <div class="col s12" style="width: 422.5px; position: fixed; left: 780px; top: 34px;">
              <div class="col s12 codigo">
                <p class="left-align">Número <strong style="font-size: x-large;">{{datosAU["0"].CABEZA["0"].numc}}</strong></p>
              </div>
              <!--<div class="col s12" style="position: fixed; top: 54px; left: 644px;">
                  <p class="left-align">Tipo Autorizacion <strong style="font-size: x-large;">{{datosAU["0"].CABEZA["0"].tipoc}}</strong></p>
                </div>-->
              <div class="col s12" style="position: fixed; top: 97px; left: 647px;">
                <spam style="font-size: small;" class="left-align"><strong style="font-size: larger;">Servicio: {{datosAU["0"].CABEZA["0"].clasec}}</strong></spam>
              </div>
            </div>
          </div>
          <div class="col s12" id="beneficiario" style="padding-top: 45px;">
            <fieldset style="height: auto">
              <legend>Beneficiario</legend>

              <table id="table_datosbasicos" style="width:1000px">
                <tr>
                  <td style="width:7%"></td>
                  <td style="width:30%"></td>
                  <td style="width:10%"></td>
                  <td style="width:9%"></td>
                  <td style="width:7.5%"></td>
                  <td style="width:10.5%"></td>
                  <td style="width:5%"></td>
                  <td style="width:8%"></td>
                </tr>
                <tr>
                  <td>Nombre</td>
                  <td colspan="3"><strong>{{datosAU["0"].CABEZA["0"].nomb}}</strong></td>
                  <td>Fecha:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].fechas}}</strong></td>
                  <td>Vence:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].venceb}}</strong></td>
                </tr>
                <tr>
                  <td>Identificacion:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].idenb}}</strong></td>
                  <td>Sexo:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].sexob}}</strong></td>
                  <td>Nacimiento:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].nacb}}</strong></td>
                  <td>Diagnostico:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].diagb}}</strong></td>
                </tr>
                <tr>
                  <td>Sede Afiliado:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].sedeb}}</strong></td>
                  <td>Fecha Afiliacion:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].fecafib}}</strong></td>
                  <td>Regimen:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].regb}}</strong></td>
                  <td>Nivel:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].nivelb}}</strong></td>
                </tr>
                <tr>
                  <td>Direccion:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].dirb}}</strong></td>
                  <td>Contrato Admin:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].contrab}}</strong></td>
                  <td>Modalidad:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].modalb}}</strong></td>
                  <!-- <td>Nivel:</td> -->
                  <!-- <td><strong>{{datosAU["0"].CABEZA["0"].nivelb}}</strong></td> -->
                </tr>
                <tr>
                  <td>Telefonos:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].telb}}</strong></td>
                  <td>Correo:</td>
                  <td colspan="3"><strong>{{datosAU["0"].CABEZA["0"].mailb}}</strong></td>
                  <td>Estado AFI:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].estadob}}</strong></td>
                  <!-- <td>Diagnostico:</td> -->
                  <!-- <td><strong>{{datosAU.DatosBasico[0].diagb}}</strong></td> -->
                </tr>
                <tr>
                  <td>Origen:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].orig}}</strong></td>
                  <td>Tipo Servicio:</td>
                  <td colspan="5"><strong>{{datosAU["0"].CABEZA["0"].tiposer}}</strong></td>
                  <!-- <td>Estado AFI:</td>
                  <td><strong>{{datosAU["0"].CABEZA["0"].estadob}}</strong></td> -->
                  <!-- <td>Diagnostico:</td> -->
                  <!-- <td><strong>{{datosAU.DatosBasico[0].diagb}}</strong></td> -->
                </tr>

              </table>

              <!-- <table style="position: fixed !important; top: 215px !important; left: 53px; !important">
                  <tbody>
                    <tr>
                      <td>Origen: <spam class="col1ben"><strong>{{datosAU["0"].CABEZA["0"].orig}}</strong></spam></td>
                      <td style="position: fixed !important; left: 379px !important;">Tipo Servicio: <spam style="position: fixed; top: 210px; left: 726px;"><strong>{{datosAU["0"].CABEZA["0"].tiposer}}</strong></spam></td>
                    </tr>
                  </tbody>
                </table> -->
            </fieldset>
          </div>
        </div>
        <div class="col s12">
          <div class="col s12 page-break" id="servicios" style="position: relative; top: 250px; left: 12px;">
            <!-- <hr style="border-color: black; border-top-width: 1px;"/> -->
            <!-- <hr style="border-color: black; border-top-width: 1px; position: relative; top: 16px; z-index: 1;"/> -->
            <table class="table" style="height:100px; position: relative; top: 25px;">
              <tbody>
                <tr>
                  <td style="padding-top: 0px; padding-bottom: 0px;">
                    <table class="tableServ" style="height:100px;">
                      <thead>
                        <tr style="border-top:2px solid black;border-bottom:2px solid black;">
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 58px;">Reng</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 55px;">Codigo</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 413px;">Servicio</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Cant</th>
                          <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 63px;">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="page-break" ng-repeat="serv in datosAU['0'].DETALLE">
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.renglon}}</td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.codigo}}</td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">
                            <h6>{{serv.nombre}}</h6>
                          </td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; padding-left: 13px;">{{serv.cantidad}}</td>
                          <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.estadoA}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="col s12" style="position: relative; top: -20px; padding-right: 0px;">
                      <hr style="border-color: black; border-top-width: 1px; padding-right: 0px;" />
                    </div>
                    <table class="table" style="position: relative; top: -20px;">
                      <tbody>
                        <tr>
                          <td class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 526PX;"><strong></strong></td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- <hr style="border-color: black; border-top-width: 1px; position: relative; top: 0px;"/> -->
                    <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: 0px;;">
                      <div class="col s4 ">
                        <p>Fecha Ingreso {{datosAU["0"].CABEZA["0"].fechai}}</p>
                      </div>
                      <div class="col s3 offset-s1">
                        <p>Ubic. paciente {{datosAU["0"].CABEZA["0"].ubis}}</p>
                      </div>
                      <div class="col s2 offset-s1" style="position: relative; left: -60px;">
                        <p>Cama {{datosAU["0"].CABEZA["0"].servis}}</p>
                      </div>
                    </div>
                    <div class="col s12" style="position: relative; top: -69px; padding-left: 0px; padding-right: 0px;">
                      <div class="col s3">
                        <p><strong></strong></p>
                      </div>
                      <div class="col s9">
                        <center>
                          <p><strong></strong></p>
                        </center>
                      </div>
                    </div>
                    <div class="col s12" style="position: relative; top: -104px;">
                      <p><strong></strong></p>
                    </div>
                    <hr style="border-color: black; border-top-width: 1px; position: relative; top: -75px;" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col s12" id="footer" style="padding-left: 0px; padding-right: 0px; position: relative; top: 220px;">
            <div style="padding-left: 0px; padding-right: 0px;">
              <div class="col s6">
                <fieldset>
                  <legend>Prestador</legend>
                  <table class="table" style="height:100px;">
                    <tbody>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px; width: 108px;">Identificacion:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU["0"].CABEZA["0"].idenp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;"><strong>Nombre</strong>:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU["0"].CABEZA["0"].nomp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Direccion:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU["0"].CABEZA["0"].dirp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Telefono:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU["0"].CABEZA["0"].telp}}</td>
                      </tr>
                      <tr>
                        <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Ciudad:</td>
                        <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU["0"].CABEZA["0"].ciup}}</td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>
              </div>
            </div>
            <div class="col s12" style="padding-left: 2px;">
              <div class="col s4">
                <spam style="display:none;">Fecha de impresion: {{datosAU["0"].CABEZA["0"].sysdate}}</spam>
              </div>
              <div class="col s6">
                <spam>Solicitado por: {{datosAU["0"].CABEZA["0"].noms}}</spam>
              </div>
              <siv class="col s2" style="padding-right: 0px; padding-left: 28px;">
                <spam class="right-aling">www.cajacopieps.com</spam>
              </siv>
            </div>
            <div class="col s12" style="padding-left: 2px;">
              <div class="col s4">
                <spam>GENESIS</spam>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</body>

</html>
