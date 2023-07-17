<!DOCTYPE html>
<html lang="en" ng-app="GenesisApp">

<head>
	<!-- <meta charset="UTF-8"> -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Genesis</title>
	<link rel="icon" href="../../assets/images/icon.ico" />
	<link rel="stylesheet" href="../../bower_components/materialize/bin/materializeformat.css" />
	<link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
	<script src="../../bower_components/angular/angular.js"></script>
	<script src="../../bower_components/jquery/dist/jquery.js"></script>
	<script type="text/javascript" src="../../js/qrcode.min.js"></script>
	<script src="../../scripts/controllers/autorizaciones/formatautorizacionQrController.js"></script>
	<script src="../../bower_components/materialize/bin/materialize.js"></script>
	<script src="../../js/jQuery.print.min.js"></script>
	<style>
		p.eslogan {
			margin-top: 0px;
			margin-bottom: 0px;
			position: fixed;
		}

		.nom {
			top: 5px;
			font-size: x-large;
			left: 178px;
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
		body.anticipo:before {
			content: "ANTICIPO"; 
			font-size: 7em;  
			color: rgba(195, 195, 195, 0.2);
			z-index: 9999;			
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: -500px;
			right: -100px;
			bottom: 0;
			left: 0;
			-webkit-pointer-events: none;
			-moz-pointer-events: none;
			-ms-pointer-events: none;
			-o-pointer-events: none;
			pointer-events: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
			-ms-transform: rotate(-45deg); /* IE 9 */
			-webkit-transform: rotate(-45deg); /* Safari 3-8 */
			transform: rotate(-45deg);
		}
		body.prioridad:after {
			content: "PRIORIDAD"; 
			font-size: 7em;  
			color: rgba(195, 195, 195, 0.2);
			z-index: 9999;			
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: -800px;
			right: 50px;
			bottom: 0;
			left: 0;
			-webkit-pointer-events: none;
			-moz-pointer-events: none;
			-ms-pointer-events: none;
			-o-pointer-events: none;
			pointer-events: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
			-ms-transform: rotate(-45deg); /* IE 9 */
			-webkit-transform: rotate(-45deg); /* Safari 3-8 */
			transform: rotate(-45deg);
		}
		body.prioridadnormal:after {
			content: "SERVICIO EXENTO DE COPAGO Y CUOTA MODERADORA";
			font-size: 4em;
			color: rgba(195, 195, 195, 0.2);
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
			position: fixed;
			top: -950px;			
			bottom: 0;
			left: 0;
			-webkit-pointer-events: none;
			-moz-pointer-events: none;
			-ms-pointer-events: none;
			-o-pointer-events: none;
			pointer-events: none;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
			-ms-transform: rotate(-30deg);
			-webkit-transform: rotate(-30deg);
			transform: rotate(-30deg);
		}
	</style>
</head>

<body id="ele4"  ng-controller="formatautorizacionController" ng-class="{'prioridad': datosAU.DatosBasico[0].prioridad=='S' && datosAU.DatosBasico[0].clasificacion=='1001', 'prioridadnormal': datosAU.DatosBasico[0].altocosto=='S' && datosAU.DatosBasico[0].clasificacion!='1001',  'anticipo': datosAU.DatosBasico[0].anticipo=='S'}"> 
	<div class="row">
		<div id="autorizacion-x" class="col s12" style="width: 1100px;">
			<div class="row section-header" style="padding-bottom: 0px;">
				<div class="col s12 headers" id="cabe" style="position: fixed; background-color: white; z-index: 999;">
					<div class="col s12" id="cabecera">
						<div class="col s12">
							<div class="col s1" style="padding-top: 25px;">
								<img src="../../assets/images/logo_cajacopieps.png" width="120" height="70" alt="Logo CajacopiEPS" />
							</div>
							<div class="col s2" style="position: fixed; left: 153px;">
								<p class="eslogan nom">CAJACOPI EPS SAS</p>
								<p class="eslogan nit">{{datosAU.DatosBasico[0].Nit}}</p>
								<p class="eslogan dir">{{datosAU.DatosBasico[0].dirc}}</p>
								<p class="eslogan tel">{{datosAU.DatosBasico[0].telc}}</p>
								<p class="eslogan ubi">{{datosAU.DatosBasico[0].ubic}}</p>
							</div>
							<div class="col s8 titulo">
								<div class="col s8" style="position: fixed; left: 647px; font-size: xx-large; top: -35px;">
									<p><strong>Autorización de Servicios</strong></p>
								</div>
							</div>					
						</div>
						<div class="col s12" style="width: 422.5px; position: fixed;left: 636px; top: 20px;">
							<div class="col s12 codigo">
								<p class="left-align">Número <strong style="font-size: x-large;">{{datosAU.DatosBasico[0].numc}}</strong></p>
							</div>
							<div class="col s12" style="position: fixed; top: 50px; left: 644px;">
								<p class="left-align" ng-if="datosAU.DatosBasico[0].tipoc || datosAU.DatosBasico[0].altacosto=='S'">Tipo Autorizacion:
									<strong style="font-size: x-large;" ng-if="datosAU.DatosBasico[0].tipoc"> {{datosAU.DatosBasico[0].tipoc}} </strong> 
									<strong  ng-if="datosAU.DatosBasico[0].altacosto=='S'"> {{(datosAU.DatosBasico[0].tipoc &&  datosAU.DatosBasico[0].altacosto=='S')? '-':''}} {{ datosAU.DatosBasico[0].altacosto=='S'? 'EXENTO DE COPAGO':''}}</strong>
								</p>

							</div>
							<div class="col s12" style="position: fixed; top: 90px; left: 647px;">
								<span style="font-size: small;" class="left-align"><strong style="font-size: larger;">{{datosAU.DatosBasico[0].clasec}}</strong></span>
							</div>
							<!-- <div class="col s12" style="position: fixed; top: 97px; left: 647px;" ng-show="datosAU.DatosBasico[0].anticipo=='S'">
								<span style="font-size: small;" class="left-align"><strong style="font-size: larger;">ANTICIPO</strong></span>
							</div> -->
						</div>
					</div>
					<div class="col s12" id="beneficiario" style="padding-top: 20px;">
						<fieldset style="height: 138.5px;">
							<legend><strong>Beneficiario</strong></legend>
							<table style="position: fixed !important; top: 115px !important; left: 53px; !important">
								<tbody>
									<tr>
										<td>Nombre: <span class="col1ben"><strong>{{datosAU.DatosBasico[0].nomb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 629px !important;">Fecha: <span style="position: fixed; top: 130px; left: 726px;"><strong>{{datosAU.DatosBasico[0].fecha_aut}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 859px !important;">Vence: <span style="position: fixed; top: 130px; left: 954px;"><strong>{{datosAU.DatosBasico[0].venceb}}</strong></span>
										</td>
									</tr>
								</tbody>
							</table>
							<table style="position: fixed !important; top: 135px !important; left: 53px; !important">
								<tbody>
									<tr>
										<td>Identificacion: <span class="col1ben"><strong>{{datosAU.DatosBasico[0].idenb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 379px !important;">Sexo: <span style="position: fixed; top: 150px

                        ; left: 505px;"><strong>{{datosAU.DatosBasico[0].sexob}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 629px !important;">Nacimiento: <span style="position: fixed; top: 150px; left: 726px;"><strong>{{datosAU.DatosBasico[0].nacb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 859px !important;">Diagnostico: <span style="position: fixed; top: 150px; left: 954px;"><strong>{{datosAU.DatosBasico[0].diagb}}</strong></span>
										</td>
									</tr>
								</tbody>
							</table>
							<table style="position: fixed !important; top: 155px !important; left: 53px; !important">
								<tbody>
									<tr>
										<td>Sede Afiliado: <span class="col1ben"><strong>{{datosAU.DatosBasico[0].sedeb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 379px !important;">Fecha Afiliacion: <span style="position: fixed; top: 170px; left: 504px;"><strong>{{datosAU.DatosBasico[0].fecafib}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 629px !important;">Regimen: <span style="position: fixed; top: 170px; left: 726px;"><strong>{{datosAU.DatosBasico[0].regb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 859px !important;">Nivel: <span style="position: fixed; top: 170px; left: 954px;"><strong>
													{{datosAU.DatosBasico[0].nivelb}}</strong></span>
										</td>
									</tr>
								</tbody>
							</table>
							<table style="position: fixed !important; top: 175px !important; left: 53px; !important">
								<tbody>
									<tr>
										<td>Direccion: <span class="col1ben"><strong>{{datosAU.DatosBasico[0].dirb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 379px !important;">Contrato Admin: <span style="position: fixed; top: 190px; left: 505px;"><strong>{{datosAU.DatosBasico[0].contrab}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 629px !important;">Modalidad: <span style="position: fixed; top: 190px; left: 726px;"><strong>{{datosAU.DatosBasico[0].modalb}}</strong></span>
										</td>
									</tr>
								</tbody>
							</table>
							<table style="position: fixed !important; top: 195px !important; left: 53px; !important">
								<tbody>
									<tr>
										<td>Telefonos: <span class="col1ben"><strong>{{datosAU.DatosBasico[0].telb}}</strong></span>
										</td>
										<td style="position: fixed !important; left: 379px !important;">Correo: <span style="position: fixed; top: 210px; left: 440px;"><strong>{{datosAU.DatosBasico[0].mailb}}</strong></span>
										</td>
										<!-- <td style="position: fixed !important; left: 629px !important;">Regimen: <span><strong>{{datosAU.DatosBasico[0].regb}}</strong></span></td> -->
										<td style="position: fixed !important; left: 859px !important;">Estado AFI: <span style="position: fixed; top: 210px; left: 954px;"><strong>{{datosAU.DatosBasico[0].estadob}}</strong></span>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</div>
				</div>
				<div class="col s12">
					<div class="col s12 page-break" id="servicios" style="position: relative; top: 250px; left: 3px;">
						<hr style="border-color: black; border-top-width: 1px;" />
						<hr style="border-color: black; border-top-width: 1px; position: relative; top: 16px; z-index: 1;" />
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
													<th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Cantidad</th>
													<!-- <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 63px;">Valor</th> -->
													<th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;" ng-if=" (datosAU.Total[0].copagot + '').replace('$', '')>'0'">Copago</th>
													<th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 70px;" ng-if=" (datosAU.Total[0].cuota_moderadorat + '').replace('$', '')>'0'">C. Moderadora</th>
													<!-- <th class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 60px;">Total</th> -->
												</tr>
											</thead>
											<tbody>
												<tr class="page-break" ng-repeat="serv in datosAU.Servicios">
													<td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.reng}}</td>
													<td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.producto}}</td>
													<td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">
														<h6>{{serv.servicio}}</h6>
													</td>
													<td class="left-align" style="padding-top: 0px; padding-bottom: 15px; padding-left: 13px;">{{serv.cant}}</td>
													<!-- <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.valor}}</td> -->
													<td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;" ng-if="(serv.copago + '').replace('$', '')>'0'">{{serv.copago}}</td>
													<td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;" ng-if="(serv.cuota_moderadora + '').replace('$', '')>'0'">{{serv.cuota_moderadora}}</td>
													<!-- <td class="left-align" style="padding-top: 0px; padding-bottom: 15px; position: relative;">{{serv.total}}</td> -->
												</tr>
											</tbody>
										</table>
										<!-- <div class="col s4 offset-s8" style="position: relative; top: -20px; padding-right: 0px;">
											<hr style="border-color: black; border-top-width: 1px; padding-right: 0px;" />
										</div>
										<table class="table" style="position: relative; top: -20px;">
											<tbody>
												<tr>
													<td class="left-align" style="padding-right: 3px;padding-bottom: 0px;padding-top: 0px; width: 526PX;">{{datosAU.DatosBasico[0].obss}}</td>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 84px;">
														</th>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 63px; position: relative; left: 27px;">{{datosAU.Total[0].valort}}</td>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px; position: relative; left: 15px;">{{datosAU.Total[0].copagot}}</td>
													<td class="left-align" style="padding-bottom: 0px;padding-top: 0px; width: 60px; position: relative; left: 12px;">{{datosAU.Total[0].totalt}}</td>
												</tr>
											</tbody>
										</table> -->
										<div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -18px;">
										<div class="col s4">
												<p><strong>Medico Tratante:</strong> {{datosAU.DatosBasico[0].nombre_medico}}</p>
											<p ng-hide="hideObservacion"><strong>Observacion:</strong> {{datosAU.DatosBasico[0].observacion}} <strong ng-if="datosAU.DatosBasico[0].tipoc=='TUTELA'"> {{datosAU.DatosBasico[0].observacion ? '-':''}}  AUTORIZAR DE INMEDIATO</strong> 
													<!-- <strong ng-if="datosAU.DatosBasico[0].altocosto=='S'"> {{datosAU.DatosBasico[0].observacion ? '-':''}} SERVICIO EXENTO DE COPAGO Y CUOTA MODERADORA</strong> -->
												</p>

											</div>
											<!-- <div class="col s2 offset-s9" style="position: absolute; left: 24px;">
												<p><strong>Solicitud:</strong></p>
											</div> -->
										</div>
										<hr style="border-color: black; border-top-width: 1px; position: relative; top: 0px;" />
										<div class="col s12" style="padding-left: 0px; padding-right: 0px; position: relative; top: -48px;;">
											<div class="col s1">
												<p>Numero {{datosAU.DatosBasico[0].nums}}</p>
											</div>
											<div class="col s3 offset-s1">
												<p>Fecha {{datosAU.DatosBasico[0].fechas}}</p>
											</div>
											<div class="col s3 offset-s1">
												<p>Ubic. paciente {{datosAU.DatosBasico[0].ubis}}</p>
											</div>
											<div class="col s2 offset-s1" style="position: relative; left: -60px;">
												<p>Servicio/cama {{datosAU.DatosBasico[0].servis}}</p>
											</div>
										</div>
										<div class="col s12" style="position: relative; top: -69px; padding-left: 0px; padding-right: 0px;">
											<div class="col s3">
												<p ng-if="datosAU.DatosBasico[0].tipoc!='TUTELA'"><strong>Imputable a:
												{{datosAU.DatosBasico[0].entec}}
												</strong></p>
											
											
											</div>
											<div class="col s9">
												<center>
													<p><strong>ESTE VALOR DE AUTORIZACION ESTA SUJETO A AUDITORIA MEDICA</strong></p>
												</center>
											</div>
										</div>
										<div class="col s12" style="position: relative; top: -104px;">
											<p ng-if="datosAU.DatosBasico[0].tipoc!='TUTELA'"><strong>{{datosAU.DatosBasico[0].desente}}</strong></p>
											<p ><strong>MIPRES: {{datosAU.DatosBasico[0].mipres}}</strong></p>										
										</div>
										<hr style="border-color: black; border-top-width: 1px; position: relative; top: -99px;" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col s12" id="footer" style="padding-left: 0px; padding-right: 0px; position: relative; top: 130px;">
						<div style="padding-left: 0px; padding-right: 0px;">
							<div class="col s6">
								<fieldset>
									<legend><strong>Prestador</strong></legend>
									<table class="table" style="height:100px;">
										<tbody>
											<tr>
												<td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px; width: 108px;">Identificacion:</td>
												<td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].idenp}}</td>
											</tr>
											<tr>
												<td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Nombre:</td>
												<td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].nomp}}</td>
											</tr>
											<tr>
												<td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Direccion:</td>
												<td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].dirp}}</td>
											</tr>
											<tr>
												<td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Telefono:</td>
												<td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].telp}}</td>
											</tr>
											<tr>
												<td class="left-align" style="padding-right: 3px; padding-bottom: 0px;padding-top: 0px;">Ciudad:</td>
												<td class="left-align" style="padding-left: 0px; padding-bottom: 0px;padding-top: 0px;">{{datosAU.DatosBasico[0].ciup}}</td>
											</tr>
										</tbody>
									</table>
								</fieldset>
							</div>			
							<div class="col s4" style="height: 133px">
								<fieldset style="height: 161px;">
									<legend><strong>Recibo a Satisfacción</strong></legend>
									<div style="padding-top: 80px;">
										<div class="col s12" style="position: relative; top: 12px;">
											<hr style="border-color: black; border-top-width: 1px;" />
										</div>
										<div class="col s12" style="position: relative; top: 5px;">
											<center>
												<span>Firma del Usuario</span>
											</center>
										</div>
									</div>
								</fieldset>
              </div>
              <div class="col s2">
                <div id="qrcode" style="float:right"></div>
							</div>
						</div>
						<div class="col s12" style="padding-left: 2px;">
							<div class="col s4">
								<span>Fecha de impresion: {{datosAU.DatosBasico[0].sysdate}}</span>
							</div>
							<div class="col s6">
								<span>Autorizado por: {{datosAU.DatosBasico[0].autpor}}</span>
							</div>
							<siv class="col s2" style="padding-right: 0px; padding-left: 24px;">
								<span class="right-aling">www.cajacopieps.com</span>
							</siv>
						</div>
						<div class="col s12" style="padding-left: 2px;">
							<div class="col s4">
								<span>GENESIS</span>
							</div>
							<div class="col s6">
								<span>{{datosAU.DatosBasico[0].cargo}}</span>
							</div>
            </div> 
          </div>		
				</div>
			</div>
		</div>
</body>
</html>