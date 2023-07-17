<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html lang="en" ng-app="GenesisApp">

<head>


	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Genesis</title>
	<link rel="icon" href="../../../assets/images/icon.ico" />
	<link rel="stylesheet" href="../../../bower_components/materialize/bin/materializeformat.css" />
	<link href="https://fonts.googleapis.com/css?family=Monoton" rel="stylesheet">
	<script src="../../../bower_components/angular/angular.js"></script>
	<script src="../../../bower_components/jquery/dist/jquery.js"></script>
	<script src="../../../scripts/controllers/siau/pqr/formatoCorrespondenciaController.js"></script>
	<script src="../../../scripts/services/http/siau/pqrHttp.js"></script>
	<script src="../../../js/jQuery.print.min.js"></script>
	<script src="../../../bower_components/materialize/bin/materialize.js"></script>
	<script src="../../../bower_components/sweetalert/js/sweetalert2.min.js"></script>
	<link rel="stylesheet" type="text/css" href="../../../bower_components/sweetalert/css/sweetalert2.css">
	<style type="text/css">
		body,
		div,
		table,
		thead,
		tbody,
		tfoot,
		tr,
		th,
		td,
		p {
			font-family: "Calibri";
			font-size: x-small
		}

		/* a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  } 
		a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  } 
		comment { display:none;  }  */

		td,
		th {
			text-align: center;
		}

		@media print {
			td.background_enc {
				background-color: #002060 !important;
				-webkit-print-color-adjust: exact;
			}

			td.enc1 {
				background: #F8CBAD !important;
				-webkit-print-color-adjust: exact;
			}

			td.enc2 {
				background: #FFE699 !important;
				-webkit-print-color-adjust: exact;
			}

			td.enc3 {
				background: #C5E0B4 !important;
				-webkit-print-color-adjust: exact;
			}
		}

		@media print {
			table {
				page-break-after: auto
			}

			tr {
				page-break-inside: avoid;
				page-break-after: auto
			}

			td {
				page-break-inside: avoid;
				page-break-after: auto
			}

			thead {
				display: table-header-group
			}

			tfoot {
				display: table-footer-group
			}
		}
	</style>

</head>

<body ng-controller="formatoCorrespondenciaController">
	<table cellspacing="0" cellpadding="0" border="0">
		<!-- <colgroup width="66"></colgroup>
	<colgroup width="89"></colgroup>
	<colgroup width="164"></colgroup>
	<colgroup width="116"></colgroup>
	<colgroup width="150"></colgroup>
	<colgroup span="2" width="116"></colgroup>
	<colgroup width="234"></colgroup>
	<colgroup span="2" width="152"></colgroup>
	<colgroup width="71"></colgroup> -->
		<tr>
			<td style="border-top: 1px solid #000000; border-left: 1px solid #000000;" colspan=2 rowspan=3 height="76" align="center" valign=middle><b>
					<font face="Arial" size=3 color="#000000"><br>
						<img src="../../../assets/images/logo_cajacopieps.png" hspace=107 vspace=7 alt="Logo Cajacopi EPS SAS" />
					</font>
				</b></td>
			<td style="border-top: 1px solid #000000;  border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=7 align="center" valign=middle><b>
					<font face="Arial" size=3 color="#000000">MATRIZ DE CONTROL DE CORRESPONDENCIA</font>
				</b></td>
			<td style="border-top: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="left" valign=middle><b>
					<font face="Arial" size=3 color="#000000">C&oacute;digo: GD-MZ-01</font>
				</b></td>
		</tr>
		<tr>
			<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=7 rowspan=2 align="center" valign=middle><b>
					<font face="Arial" size=3 color="#000000">PROCEDIMIENTO DE RECIBO Y ENV&Iacute;O DE CORRESPONDENCIA</font>
				</b></td>
			<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000;border-right: 1px solid #000000" colspan=2 align="left" valign=middle><b>
					<font face="Arial" size=3 color="#000000">Versi&oacute;n: 01</font>
				</b></td>
		</tr>
		<tr>
			<td style="border-right: 1px solid #000000" colspan=2 align="left" valign=middle><b>
					<font face="Arial" size=3 color="#000000">Fecha: mayo 2019</font>
				</b></td>
		</tr>
		<tr>
			<td class="background_enc" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" colspan=7 height="21" align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">REMITENTE</font>
				</b></td>
			<td class="background_enc" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=4 align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">RECIBE</font>
				</b></td>
		</tr>
		<tr>
			<td class="background_enc" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" colspan=2 height="21" align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">ORIGEN</font>
				</b></td>
			<td class="background_enc" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; " colspan=2 align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">REMITENTE</font>
				</b></td>
			<td class="background_enc" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" colspan=2 align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">DIRECCI&Oacute;N</font>
				</b></td>
			<td class="background_enc" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">TEL&Eacute;FONO</font>
				</b></td>
			<td class="background_enc" style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">FECHA</font>
				</b></td>
			<td class="background_enc" style="border-bottom: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#002060"><b>
					<font face="Arial" color="#FFFFFF">FIRMA</font>
				</b></td>
		</tr>
		<tr>
			<td style="border-left: 1px solid #000000;" colspan=2 height="53" align="center" valign=middle><b>
					<font face="Arial" color="#000000">{{matriz.DatosBasico.oficina}}</font>
				</b></td>
			<td style="border-left: 1px solid #000000;" colspan=2 align="center" valign=middle><b>
					<font face="Arial" color="#000000">{{matriz.DatosBasico.eps}}</font>
				</b></td>
			<td style="border-left: 1px solid #000000;" colspan=2 align="center" valign=middle><b>
					<font face="Arial" color="#000000">{{matriz.DatosBasico.direccion}}</font>
				</b></td>
			<td style="border-left: 1px solid #000000" align="center" valign=middle><b>
					<font face="Arial" color="#000000">{{matriz.DatosBasico.telefono}}</font>
				</b></td>
			<td style="border-left: 1px solid #000000;" align="left" valign=middle><b>
					<font face="Arial" color="#FFFFFF"><br></font>
				</b></td>
			<td style="border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle><b>
					<font face="Arial" color="#FFFFFF"><br></font>
				</b></td>
		</tr>
		<tr>
			<td class="enc1" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" rowspan=2 height="42" align="center" valign=middle bgcolor="#F8CBAD"><b>
					<font face="Arial" color="#000000">Registros</font>
				</b></td>
			<td class="enc1" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" rowspan=2 align="center" valign=middle bgcolor="#F8CBAD"><b>
					<font face="Arial" color="#000000">No. RADICADO</font>
				</b></td>
			<td class="enc2" style="border-top: 1px solid #000000;border-left: 1px solid #000000;" colspan=5 align="center" valign=middle bgcolor="#FFE699"><b>
					<font face="Arial" color="#000000">DESTINATARIO</font>
				</b></td>
			<td class="enc3" style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=4 align="center" valign=middle bgcolor="#C5E0B4"><b>
					<font face="Arial" color="#000000">REPORTE DE ENV&Iacute;O</font>
				</b></td>
		</tr>
		<tr>
			<td class="enc2" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE699"><b>
					<font face="Arial" color="#000000">DESTINATARIO/EMPRESA</font>
				</b></td>
			<td class="enc2" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE699"><b>
					<font face="Arial" color="#000000">DIRECCI&Oacute;N</font>
				</b></td>
			<td class="enc2" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE699"><b>
					<font face="Arial" color="#000000">BARRIO</font>
				</b></td>
			<td class="enc2" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE699"><b>
					<font face="Arial" color="#000000">CIUDAD</font>
				</b></td>
			<td class="enc2" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE699"><b>
					<font face="Arial" color="#000000">TEL&Eacute;FONO</font>
				</b></td>
			<td class="enc3" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle bgcolor="#C5E0B4"><b>
					<font face="Arial" color="#000000">REMITENTE</font>
				</b></td>
			<td class="enc3" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000;" colspan=2 align="center" valign=middle bgcolor="#C5E0B4"><b>
					<font face="Arial" color="#000000">DESTINATARIO </font>
				</b></td>
			<td class="enc3" style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#C5E0B4"><b>
					<font face="Arial" color="#000000" valign="center">OK</font>
				</b></td>
		</tr>
		<tr ng-repeat="item in matriz.Items" style="border:0px">
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" height="123" align="center" valign=middle sdval="1" sdnum="1033;"><b>
					<font face="Arial" color="#000000">{{$index+1}}</font>
				</b></td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle>
				<font face="Arial" color="#000000">{{item.consecutivo_correspondencia}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle>
				<font face="Arial" color="#000000">{{item.senor}} {{item.senor? '-':''}} {{item.nombre_destinatario}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle>
				<font face="Arial" color="#000000">{{item.dir_destinatario}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle>
				<font face="Arial" color="#000000">{{item.barrio_destinatario}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle>
				<font face="Arial" color="#000000">{{item.ciudad_destinatario}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="center" valign=middle>
				<font face="Arial" color="#000000">{{item.tel_destinatario}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" align="left" valign=middle>
				<font face="Arial" color="#000000">No.RADICADO: {{item.consecutivo_correspondencia}}<br>
					CIUDAD:{{matriz.DatosBasico.oficina}}<br>
					DIRECCIÓN:{{matriz.DatosBasico.direccion}}<br>
					TELEFONO:{{matriz.DatosBasico.telefono}}
				</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000;" colspan=2 align="center" valign=middle>
				<font face="Arial" color="#000000">SEÑORES: {{item.senor}} {{item.senor? '-':''}} {{item.nombre_destinatario}} <br>
					DIRECCIÓN: {{item.dir_destinatario}} <br>
					CIUDAD: {{item.ciudad_destinatario}}<br>
					TELEFONO: {{item.tel_destinatario}}</font>
			</td>
			<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle>
				<font size=3 color="#000000"><br></font>
			</td>
		</tr>

	</table>
</body>

</html>