<!DOCTYPE html>
<html lang="en" ng-app="GenesisApp">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Genesis</title>
  <link rel="icon" href="../../assets/images/icon.ico"/>
  <link rel="stylesheet" href="../../bower_components/materialize/bin/materializeformat.css" />
  <link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
  <script src="../../bower_components/angular/angular.js"></script>
  <script src="../../bower_components/jquery/dist/jquery.js"></script>
  <script src="../../scripts/controllers/autorizaciones/formatautorizacionController.js"></script>
  <script src="../../bower_components/materialize/bin/materialize.js"></script>
  <script src="../../js/jQuery.print.min.js"></script>
  <style>
    /*p.eslogan{
      margin-top: 0px;
      margin-bottom: 0px;
      position: fixed;
    }
    .nom{top: -4px;
         font-size: x-large;
         left: 164px;}
    .nit{top: 23px;}
    .dir{top: 40px;}
    .tel{top: 57px;}
    .ubi{top: 74px;}
    .titulo{width: 622.5px;
            position: fixed;
            left: 400px;
          }
    .originalidad{
      font-size: large;
      position: fixed;
      left: 1030px;
    }*/
    li {page-break-before: always;
    padding-top: 10%}

    /*.div2head{
      width: 422.5px;
      position: fixed;
      left: 700px;
      top: 55px;
    }*/

    .codigo{
      position: fixed;
      top: 52px;
    }
  </style>
</head>
<body id="ele4" ng-controller="formatautorizacionController">
  <div class="row">
    <ul>
      <li ng-repeat="x in varios">
        <div id="autorizacion-x" class="col s12" style="width: 1100px;">
          <div class="row section-header" style="padding-bottom: 0px;">
            <div class="col s12 headers" id="cabe">
               <div class="col s12" id="cabecera">
                  <div class="col s12">
                    <div class="col s1">
                      <img src="../../assets/images/cajacopi.png" width="100" height="60" alt="Logo CajacopiEPS"/>
                    </div>
                    <div class="col s2">
                      <p class="eslogan nom">CAJACOPI EPS-S</p>
                      <p class="eslogan nit">{{datosAU.DatosBasico["0"].Nit}}</p>
                      <p class="eslogan dir">{{datosAU.DatosBasico["0"].dirc}}</p>
                      <p class="eslogan tel">{{datosAU.DatosBasico["0"].telc}}</p>
                      <p class="eslogan ubi">{{datosAU.DatosBasico["0"].ubic}}</p>
                    </div>
                    <div class="col s9 titulo">
                      <div class="col s8">
                        <p><strong>Autorización de Servicios</strong></p>
                      </div>
                    </div>
                  </div>
                  <div class="col s12">
                    <div class="col s12">
                      <p class="left-align">Número <strong style="font-size: x-large;">{{datosAU.DatosBasico["0"].numc}}</strong></p>
                    </div>
                    <!--<div class="col s12">
                      <p class="left-align">Tipo Autorizacion <strong style="font-size: x-large;">{{datosAU.DatosBasico["0"].tipoc}}</strong></p>
                    </div-->
                    <div class="col s12">
                      <spam style="font-size: small;" class="left-align"><strong style="font-size: larger;">{{datosAU.DatosBasico["0"].clasec}}</strong></spam>
                    </div>
                  </div>
               </div>
               <!-- <div class="col s12" id="beneficiario" style="padding-top: 80px;">
                  <fieldset style="height: 138.5px;">
                    <legend>Beneficiario</legend>
                    <table style="position: fixed !important; top: 153px !important; left: 53px; !important">
                      <tbody>
                        <tr>
                          <td>Nombre: <spam><strong>{{datosAU.DatosBasico["0"].nomb}}</strong></spam></td>
                          <td style="position: fixed !important; left: 629px !important;">Fecha: <spam><strong>{{datosAU.DatosBasico["0"].fechab}}</strong></spam></td>
                          <td style="position: fixed !important; left: 859px !important;">Vence: <spam><strong>{{datosAU.DatosBasico["0"].venceb}}</strong></spam></td>
                        </tr>
                      </tbody>
                    </table>
                    <table style="position: fixed !important; top: 173px !important; left: 53px; !important">
                      <tbody>
                        <tr>
                          <td>Identificacion: <spam><strong>{{datosAU.DatosBasico["0"].idenb}}</strong></spam></td>
                          <td style="position: fixed !important; left: 379px !important;">Sexo: <spam style="position: relative !important;left: 81px; !important"><strong>{{datosAU.DatosBasico["0"].sexob}}</strong></spam></td>
                          <td style="position: fixed !important; left: 629px !important;">Nacimiento: <spam><strong>{{datosAU.DatosBasico["0"].nacb}}</strong></spam></td>
                          <td style="position: fixed !important; left: 859px !important;">Diagnostico: <spam><strong>{{datosAU.DatosBasico["0"].diagb}}</strong></spam></td>
                        </tr>
                      </tbody>
                    </table>
                    <table style="position: fixed !important; top: 193px !important; left: 53px; !important">
                      <tbody>
                        <tr>
                          <td>Sede Afiliado: <spam><strong>{{datosAU.DatosBasico["0"].sedeb}}</strong></spam></td>
                          <td style="position: fixed !important; left: 379px !important;">Fecha Afiliacion: <spam style="position: relative !important;left: 0px; !important"><strong>{{datosAU.DatosBasico["0"].fecafib}}</strong></spam></td>
                          <td style="position: fixed !important; left: 629px !important;">Regimen: <spam><strong>{{datosAU.DatosBasico["0"].regb}}</strong></spam></td>
                          <td style="position: fixed !important; left: 859px !important;">Nivel: <spam><strong>{{datosAU.DatosBasico["0"].nivelb}}</strong></spam></td>
                        </tr>
                      </tbody>
                    </table>
                    <table style="position: fixed !important; top: 213px !important; left: 53px; !important">
                      <tbody>
                        <tr>
                          <td>Direccion: <spam><strong>{{datosAU.DatosBasico["0"].dirb}}</strong></spam></td>
                          <td style="position: fixed !important; left: 379px !important;">Contrato: <spam style="position: relative !important;left: 0px; !important"><strong>{{datosAU.DatosBasico["0"].contrab}}</strong></spam></td>
                          <td style="position: fixed !important; left: 629px !important;">Modalidad: <spam><strong>{{datosAU.DatosBasico["0"].modalb}}</strong></spam></td>

                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
               </div> -->
            </div>
            <div class="col s12 page-break" id="servicios" style="position: relative; top: 10px;">
              <hr style="border-color: black; border-top-width: 1px;"/>
              <hr style="border-color: black; border-top-width: 1px; position: relative; top: 16px; z-index: 1;"/>
              <table class="table" style="height:100px; position: relative; top: -17px;">
                <tbody>
                  <tr>
                    <td style="padding-top: 0px; padding-bottom: 0px;">
                      <table class="tableServ" style="height:100px;">
                        <thead>
                          <tr>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 58px;">Reng</th>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 55px;">Codigo</th>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 413px;">Servicio</th>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Cant</th>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 63px;">Valor</th>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Copago</th>
                            <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="page-break" ng-repeat="serv in datosAU.Servicios | limitTo : quantity : datosAU.Servicios ">
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.reng}}</td>
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.producto}}</td>
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;"><h6>{{serv.servicio}}</h6></td>
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; padding-left: 13px;">{{serv.cant}}</td>
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.valor}}</td>
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.copago}}</td>
                            <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.total}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- <div class="col s4 offset-s8" style="position: relative; top: -20px; padding-right: 0px;">
                        <hr style="border-color: black; border-top-width: 1px; padding-right: 0px;"/>
                      </div>
                      <table class="table" style="position: relative; top: -20px;">
                        <tbody>
                          <tr>
                            <td class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 526PX;">{{datosAU.DatosBasico["0"].obss}}</td>
                            <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 84px;"></th>
                              <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 63px;">{{datosAU.Total["0"].valort}}</td>
                              <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px;">{{datosAU.Total["0"].copagot}}</td>
                              <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px;">{{datosAU.Total["0"].totalt}}</td>
                            </tr>
                          </tbody>
                        </table> -->
                        <!-- <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -18px;">
                          <div class="col s2 offset-s6">
                            <p><strong>Solicitud:</strong></p>
                          </div>
                        </div>
                        <hr style="border-color: black; border-top-width: 1px; position: relative; top: 0px;"/>
                        <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -48px;;">
                          <div class="col s1">
                            <p>Numero {{datosAU.DatosBasico["0"].nums}}</p>
                          </div>
                          <div class="col s3 offset-s1">
                            <p>Fecha {{datosAU.DatosBasico["0"].fechas}}</p>
                          </div>
                          <div class="col s3 offset-s1">
                            <p>Ubic. paciente {{datosAU.DatosBasico["0"].ubis}}</p>
                          </div>
                          <div class="col s2 offset-s1" style="position: relative; left: -60px;">
                            <p>Servicio/cama {{datosAU.DatosBasico["0"].servis}}</p>
                          </div>
                        </div>
                        <div class="col s12" style="position: relative; top: -69px; padding-left: 0px; padding-right: 0px;">
                          <div class="col s3">
                            <p><strong>Imputable a: {{datosAU.DatosBasico["0"].entec}}</strong></p>
                          </div>
                          <div class="col s9">
                            <center><p><strong>ESTE VALOR DE AUTORIZACION ESTA SUJETO A AUDITORIA MEDICA</strong></p></center>
                          </div>
                        </div>
                        <div class="col s12" style="position: relative; top: -104px;">
                          <p><strong>{{datosAU.DatosBasico["0"].desente}}</strong></p>
                        </div>
                        <hr style="border-color: black; border-top-width: 1px; position: relative; top: -99px;"/> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="col s4 offset-s8" style="position: relative; top: -20px; padding-right: 0px;">
      <hr style="border-color: black; border-top-width: 1px; padding-right: 0px;"/>
    </div>
    <table class="table" style="position: relative; top: -20px;">
      <tbody>
        <tr>
          <td class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 526PX;">{{datosAU.DatosBasico["0"].obss}}</td>
          <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 84px;"></th>
            <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 63px;">{{datosAU.Total["0"].valort}}</td>
            <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px;">{{datosAU.Total["0"].copagot}}</td>
            <td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px;">{{datosAU.Total["0"].totalt}}</td>
          </tr>
        </tbody>
      </table>
    <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -18px;">
      <div class="col s2 offset-s6">
        <p><strong>Solicitud:</strong></p>
      </div>
    </div>
    <hr style="border-color: black; border-top-width: 1px; position: relative; top: 0px;"/>
    <div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -48px;;">
      <div class="col s1">
        <p>Numero {{datosAU.DatosBasico["0"].nums}}</p>
      </div>
      <div class="col s3 offset-s1">
        <p>Fecha {{datosAU.DatosBasico["0"].fechas}}</p>
      </div>
      <div class="col s3 offset-s1">
        <p>Ubic. paciente {{datosAU.DatosBasico["0"].ubis}}</p>
      </div>
      <div class="col s2 offset-s1" style="position: relative; left: -60px;">
        <p>Servicio/cama {{datosAU.DatosBasico["0"].servis}}</p>
      </div>
    </div>
    <div class="col s12" style="position: relative; top: -69px; padding-left: 0px; padding-right: 0px;">
      <div class="col s3">
        <p><strong>Imputable a: {{datosAU.DatosBasico["0"].entec}}</strong></p>
      </div>
      <div class="col s9">
        <center><p><strong>ESTE VALOR DE AUTORIZACION ESTA SUJETO A AUDITORIA MEDICA</strong></p></center>
      </div>
    </div>
    <div class="col s12" style="position: relative; top: -104px;">
      <p><strong>{{datosAU.DatosBasico["0"].desente}}</strong></p>
    </div>
    <hr style="border-color: black; border-top-width: 1px; position: relative; top: -99px;"/>
    <div class="col s12" id="footer" style="padding-left: 0px; padding-right: 0px; position: relative; top: 161px;">
      <div style="padding-left: 0px; padding-right: 0px;">
        <div class="col s6">
          <fieldset>
            <legend>Prestador</legend>
            <table class="table" style="height:100px;">
              <tbody>
                <tr>
                  <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px; width: 108px;">Identificacion:</td>
                  <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].idenp}}</td>
                </tr>
                <tr>
                  <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;"><strong>Nombre</strong>:</td>
                  <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].nomp}}</td>
                </tr>
                <tr>
                  <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Direccion:</td>
                  <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].dirp}}</td>
                </tr>
                <tr>
                  <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Telefono:</td>
                  <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].telp}}</td>
                </tr>
                <tr>
                  <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Ciudad:</td>
                  <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].ciup}}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
        <div class="col s3" >
          <fieldset style="height: 148px">
            <legend>Funcionario Responsable</legend>
          </fieldset>
        </div>
        <div class="col s3" style="height: 133px">
          <fieldset style="height: 148px">
            <legend>Recibo a Satisfacción</legend>
            <div style="padding-top: 80px;">
              <div class="col s12" style="position: relative; top: 5px;">
                <hr style="border-color: black; border-top-width: 1px;"/>
              </div>
              <div class="col s12"  style="position: relative; top: -3px;">
                <center><spam>Firma del Usuario</spam></center>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="col s12" style="padding-left: 2px;">
        <div class="col s4">
          <spam>Fecha de impresion: {{datosAU.DatosBasico["0"].sysdate}}</spam>
        </div>
        <div class="col s6">
          <spam>Autorizado por: {{datosAU.DatosBasico["0"].autpor}}</spam>
        </div>
        <siv class="col s2" style="padding-right: 0px; padding-left: 28px;">
          <spam class="right-aling">www.cajacopieps.com</spam>
        </siv>
      </div>
      <div class="col s12" style="padding-left: 2px;">
        <div class="col s4">
          <spam>GENESIS</spam>
        </div>
        <div class="col s6">
          <spam>{{datosAU.DatosBasico["0"].cargo}}</spam>
        </div>
      </div>
    </div>
   <!--  <div style="position: fixed !important; left: 135px; top: 308px; transform: rotate(-45deg); width: 650px; z-index: -10 !important;">
      <h3 style="color: rgba(128, 128, 128, 0.3);font-family: 'Monoton', cursive;"><strong>{{datosAU.DatosBasico["0"].pos}}</strong></h3>
    </div> -->
</body>
</html>


<!-- <table style="position: relative !important;top: -16px !important;">
  <tbody>
    <tr>
      <td>Nombre: <spam style="position: relative !important;left: 40px !important;"><strong>{{datosAU.DatosBasico["0"].nomb}}</strong></spam></td>
      <td style="position: fixed; left: 629px;">Fecha: <spam style="position: relative !important;left: 39px !important;"><strong>{{datosAU.DatosBasico["0"].fechab}}</strong></spam></td>
      <td style="position: fixed !important; left: 858px !important;">Vence: <spam style="position: relative !important;left: 41px !important;"><strong>{{datosAU.DatosBasico["0"].venceb}}</strong></spam></td>
    </tr>
  </tbody>
</table>
<table style="position: relative !important;top: -48px !important;">
  <tbody>
    <tr>
      <td>Identificacion: <spam><strong>{{datosAU.DatosBasico["0"].idenb}}</strong></spam></td>
      <td style="position: fixed !important; left: 379px !important;">Sexo: <spam style="position: relative !important;left: 81px; !important"><strong>{{datosAU.DatosBasico["0"].sexob}}</strong></spam></td>
      <td style="position: fixed !important; left: 629px !important;">Nacimiento: <spam><strong>{{datosAU.DatosBasico["0"].nacb}}</strong></spam></td>
      <td style="position: fixed !important; left: 859px !important;">Diagnostico: <spam><strong>{{datosAU.DatosBasico["0"].diagb}}</strong></spam></td>
    </tr>
  </tbody>
</table>
<table style="position: relative !important;top: -80px !important;">
  <tbody>
    <tr>
      <td>Sede Afiliado: <spam style="position: relative !important;left: 5px !important;"><strong>{{datosAU.DatosBasico["0"].sedeb}}</strong></spam></td>
      <td style="position: fixed !important;left: 379px !important;">Fecha Afiliacion: <spam><strong>{{datosAU.DatosBasico["0"].fecafib}}</strong></spam></td>
      <td style="position: fixed !important;left: 629px !important;">Regimen: <spam style="position: relative !important; left: 22px !important;"><strong>{{datosAU.DatosBasico["0"].regb}}</strong></spam></td>
      <td style="position: fixed !important;left: 859px !important;">Nivel: <spam style="position: relative !important; left: 51px !important;"><strong>{{datosAU.DatosBasico["0"].nivelb}}</strong></spam></td>
    </tr>
  </tbody>
</table>
<table style="position: relative !important;top: -112px !important;">
  <tbody>
    <tr>
      <td>Direccion: <spam style="position: relative !important;left: 30px !important;"><strong>{{datosAU.DatosBasico["0"].dirb}}</strong></spam></td>
      <td style="position: fixed !important; left: 379px !important;">Contrato: <spam style="position: relative !important; left: 54px !important;"><strong>{{datosAU.DatosBasico["0"].contrab}}</strong></spam></td>
      <td style="position: fixed !important; left: 629px !important;">Modalidad: <spam style="position: relative !important;left: 10px !important;"><strong>{{datosAU.DatosBasico["0"].modalb}}</strong></spam></td>
    </tr>
    <tr>
    </tr></tbody>
  </table>
  <table style="position: relative !important;top: -144px !important;">
    <tbody>
      <tr>
        <td>Telefonos: <spam style="position: relative !important; left: 26px !important;"><strong>{{datosAU.DatosBasico["0"].telb}}</strong></spam></td>
        <td style="position: fixed !important; left: 380px !important;">Correo: <spam><strong>{{datosAU.DatosBasico["0"].mailb}}</strong></spam></td>
        <td style="position: fixed !important; left: 860px !important;">Estado Af.: <spam style="position: relative !important;left: 15px !important;"><strong>{{datosAU.DatosBasico["0"].estadob}}</strong></spam></td>
      </tr>
    </tbody>
  </table> -->

<!-- <div class="col s12" id="footer" style="padding-left: 0px; padding-right: 0px; position: relative; top: 161px;">
  <div style="padding-left: 0px; padding-right: 0px;">
    <div class="col s6">
      <fieldset>
        <legend>Prestador</legend>
        <table class="table" style="height:100px;">
          <tbody>
            <tr>
              <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px; width: 108px;">Identificacion:</td>
              <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].idenp}}</td>
            </tr>
            <tr>
              <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;"><strong>Nombre</strong>:</td>
              <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].nomp}}</td>
            </tr>
            <tr>
              <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Direccion:</td>
              <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].dirp}}</td>
            </tr>
            <tr>
              <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Telefono:</td>
              <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].telp}}</td>
            </tr>
            <tr>
              <td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Ciudad:</td>
              <td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico["0"].ciup}}</td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
    <div class="col s3" >
      <fieldset style="height: 148px">
        <legend>Funcionario Responsable</legend>
      </fieldset>
    </div>
    <div class="col s3" style="height: 133px">
      <fieldset style="height: 148px">
        <legend>Recibo a Satisfacción</legend>
        <div style="padding-top: 80px;">
          <div class="col s12" style="position: relative; top: 5px;">
            <hr style="border-color: black; border-top-width: 1px;"/>
          </div>
          <div class="col s12"  style="position: relative; top: -3px;">
            <center><spam>Firma del Usuario</spam></center>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
  <div class="col s12" style="padding-left: 2px;">
    <div class="col s4">
      <spam>Fecha de impresion: {{datosAU.DatosBasico["0"].sysdate}}</spam>
    </div>
    <div class="col s6">
      <spam>Autorizado por: {{datosAU.DatosBasico["0"].autpor}}</spam>
    </div>
    <siv class="col s2" style="padding-right: 0px; padding-left: 28px;">
      <spam class="right-aling">www.cajacopieps.com</spam>
    </siv>
  </div>
  <div class="col s12" style="padding-left: 2px;">
    <div class="col s4">
      <spam>GENESIS</spam>
    </div>
    <div class="col s6">
      <spam>{{datosAU.DatosBasico["0"].cargo}}</spam>
    </div>
  </div>
</div>
<div style="position: fixed !important; left: 135px; top: 308px; transform: rotate(-45deg); width: 650px; z-index: -10 !important;">
  <h3 style="color: rgba(128, 128, 128, 0.3);font-family: 'Monoton', cursive;"><strong>{{datosAU.DatosBasico["0"].pos}}</strong></h3>
</div> -->
