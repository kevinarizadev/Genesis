<!doctype html>
<html ng-app="GenesisApp" lang="es">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Acta</title>
	<style type="text/css"></style>

	<style type="text/css" href="../../../style/cuentasmedicas/acta.css"></style>
	<script src="../../../bower_components/jquery/dist/jquery.js"></script>
	<!-- <script type="text/javascript" src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script> -->
	<script src="../../../bower_components/angular/angular.js"></script>
	<script src="../../../scripts/controllers/cuentasmedicas/formatos/printActaRipsController.js"></script>
	<!--<script type="text/javascript" src="//cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script> -->
	<script type="text/javascript" src="../../../assets/js/qrcode.min.js"></script>
	<style type="text/css">
		#qrcode img{
			display: inline-block !important;
		}
		#notemarquee{
	       	display: block;
	       	height: 22px;
    		color: white;
	       }
	    #note{
	   		display: none
	    }
	    #tableMarquee{
			border-collapse: separate !important;
			border-radius: 2px;
			background-color: #1A2E63;"
	    }
	    #bodyTable {
	    	height: calc(100vh - 20px);
	    	max-width: 800px;
	    }
		@media print {
	       #notemarquee{
	       	display: none;
	       }
		   #note{
		   	display: block
		   }
		   #tableMarquee{
				background-color: white;
	     	}
			@page {
		      size: letter;
		      margin:0;
		    }
		    #bodyTable {
		    	padding-right: 20px;
		    }
	    }
	</style>
</head>

<body ng-controller="printActaRipsController">
	<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
			<tr>
				<td align="center" valign="top" id="bodyCell">
					<table border="0" cellpadding="0" cellspacing="0" width="100%" style="height: 100%;">
						<tr>
							<td align="center" valign="top" id="templateHeader" data-template-container>
								<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
									<tr>
										<td valign="top" class="headerContainer">
											<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
												<tbody class="mcnImageBlockOuter">
													<tr>
														<td valign="top" style="padding:9px" class="mcnImageBlockInner">
															<table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer"
																style="min-width:100%;">
																<tbody>
																	<tr>
																		<td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
																			<img align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="max-width: 196px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border-radius: 0%;"
																			class="mcnImage">
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
												<tbody class="mcnTextBlockOuter">
													<tr>
														<td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
															<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;"
															width="100%" class="mcnTextContentContainer">
																<tbody>
																	<tr>
																		<td valign="top" class="mcnTextContent">
																			<div class="cuadrito" style="padding: 68px;position: absolute;background: #13499354;top: 0;height: 63px;">
																			</div>
																			<div class="triangulito" style="width: 0;top: 197px;height: 0;border-right: 75px solid #00000000;border-left: 62px solid #00000000;border-top: 36px solid #b1c3db;position: absolute;">
																			</div>
																			<img align="center" alt="" src="https://gallery.mailchimp.com/35a643898f3a71efd2a24b704/images/061ccdac-f399-4b24-b3f1-1d9cb77a1337.png" width="300" style="position: relative; max-width: 140px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage" />
																		</td>
																		<td valign="top" class="mcnTextContent">
																			<table style="width:100%;text-align: right;">
																				<tbody>
																					<tr>
																						<th style="text-align: right;">
																							<h2 style="text-align: right;">
																								<font style="vertical-align: inherit;">
																									<font style="vertical-align: inherit;text-align: right;">{{infoacta.Tipo_acta}}</font>
																								</font>
																							</h2>
																						</th>
																					</tr>
																					<tr>			  
																						<td>
																							<font style="vertical-align: inherit;">
																								<font style="vertical-align: inherit;">
																									<strong>Fecha</strong>  {{infoacta.Fecha}}
																								</font>
																							</font>
																						</td>
																					</tr>
																					<tr>
																						<th colspan="2"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{{infoacta.Ubicacion}}</font></font>
																						</th>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td ng-hide="acta_check" align="center" valign="top" id="templateBody" data-template-container>
								<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
									<tr>
										<td valign="top" class="bodyContainer">
											<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
												<tbody class="mcnImageBlockOuter">
													<tr>
														<td valign="top" style="padding:9px" class="mcnImageBlockInner">
															<table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
																<tbody>
																	<tr>
																		<td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
																			<div id="qrcode"></div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
												<tbody class="mcnTextBlockOuter">
													<tr>
														<td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
															<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
																<tbody>
																	<tr>
																		<td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
																			<h3>{{infoacta.Ips}}</h3>
																			<h5 style="margin: -13px 0 15px 0;">NIT: {{infoacta.nit}}</h5>
																				<p>{{infoacta.Texto}}</p>
																				<p>{{(infoacta.Estado=='V')?'Validadas':'Radicadas'}}:</p>
																				<div>
																					<p><b>{{infoacta.Facturas}} Facturas .................................................................................................................. Por Valor {{infoacta.Valor}}</b></p>
																				</div>
																				<p ng-hide="infoacta.Estado == 'V'">Devueltas:</p>
																				<div ng-hide="infoacta.Estado == 'V'">
																					<p><b>{{infoacta.Facturas2}} Facturas .................................................................................................................. Por Valor {{infoacta.Valor2}}</b></p>
																				</div>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
												<tbody class="mcnButtonBlockOuter">
													<tr>
														<td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
															<table id="tableMarquee" border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer">
																<tbody>
																	<tr>
																		<td align="center" valign="middle" class="mcnButtonContent" style="font-family: Helvetica; font-size: 18px; padding: 18px;">
																			<center>
																				<marquee id="notemarquee" width="100%" height="60"> Debe acercarse a las oficinas de cajacopi eps con este codigo QR para radicar las facturas fisicas </marquee>
																				<p id="note">Debe acercarse a las oficinas de cajacopi eps con este codigo QR para radicar las facturas fisicas </p>
																			</center>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
											<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnBoxedTextBlock" style="min-width:100%;">
												<tbody class="mcnBoxedTextBlockOuter">
													<tr>
														<td valign="top" class="mcnBoxedTextBlockInner">
															<table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnBoxedTextContentContainer">
																<tbody>
																	<tr>
																		<td style="padding-top:9px; padding-left:18px; padding-bottom:9px; padding-right:18px;">
																			<table border="0" cellspacing="0" class="mcnTextContentContainer" width="100%" style="min-width: 100% !important;background-color: #FFFFFF;">
																				<tbody>
																					<tr>
																						<td valign="top" class="mcnTextContent" style="padding: 18px;color: #222222;font-family: Helvetica;font-size: 14px;font-weight: normal;text-align: center;">
																							<div style="text-align: left;">
																								<img align="center" alt="" src="https://as01.epimg.net/tikitakas/imagenes/2016/11/28/portada/1480310263_316159_1480310537_sumario_normal.jpg" width="300" style="max-width: 123px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
																							</div>
																							<div style="text-align: left;">
																								<hr style="width: 60%; margin-left: 0px;">
																							</div>
																							<div style="text-align: left;"><strong>{{infoacta.Coordinador}}</strong></div>
																							<div style="text-align: left;">COORDINADOR NACIONAL DE CUENTAS MEDICAS</div>
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
										</td>
									</tr>
								</table>
							<td ng-hide="!acta_check">
								<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;">
									<tbody class="mcnButtonBlockOuter">
										<tr>
											<td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
												<table id="tableMarquee" border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer">
													<tbody>
														<tr>
															<td align="center" valign="middle" class="mcnButtonContent" style="font-family: Helvetica; font-size: 18px; padding: 18px;">
																<center>
																	<marquee id="notemarquee" width="100%" height="60"> Esta Acta no es oficial ya que fue alterada y no sera admisible para cajacopi EPS </marquee>
																	<p id="note">Esta Acta no es oficial ya que fue alterada y no sera admisible para cajacopi EPS</p>
																</center>
															</td>
														</tr>
														<tr>
															<center>
																<img width="200" src="../../../images/advertencia.jpg" alt="">
															</center>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style="position: relative;">
					<div style="height: 35px;background: black;position: relative;width: 100%;position: absolute;bottom: 0;">
						<img align="right" alt="" src="../../../assets/images/mara.png" width="300" style="max-width: 123px; margin-right: 24px; margin-top: 7px;" class="mcnImage">
					</div>
				</td>
			</tr>
	</table>
</body>
</html>