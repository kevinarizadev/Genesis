<?php
Session_Start();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$function = $request->function;
$function();

function obtenercodigo()
{
	require_once('../config/dbcon_prod.php');
	global $request;

	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_UBICACION(:v_cod,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_cod', $_SESSION['codmunicipio']);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenerconsec()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$TIPO = $request->TIPO;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_CONSECUTIVO(:v_tipo,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_tipo', $TIPO);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function obtenerconceptos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_CONCEPTOS(:v_json_row); end;');
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
/////////////////
function obtenercedula()
{
	echo $_SESSION['cedula'];
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////Buscar Producto//////////////////////////////////////////////
function BuscarProducto()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$cantidad = $request->cantidad;
	$proveedor = $request->proveedor;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_PRODUCTOS(:v_prod,:v_cant,:v_prov,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_prod', $codigo);
	oci_bind_by_name($consulta, ':v_cant', $cantidad);
	oci_bind_by_name($consulta, ':v_prov', $proveedor);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function BuscarProductoAcas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$concepto = $request->concepto;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_PRODUCTOS_ACAS(:v_conc,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_conc', $concepto);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

//////////////////////////LISTAR OREQS///////////////////////
function listar_oreqs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_OREQS(:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////////////LISTAR GRAFICO OREQS///////////////////////
function ver_grafico_oreqs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$mes = $request->mes;
	$anio = $request->anio;
	$ubi = $request->ubi;
	$plat = $request->plat;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_OREQS_GRAFICO(:v_ubi,:v_mes,:v_anio,:v_plat,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $ubi);
	oci_bind_by_name($consulta, ':v_mes', $mes);
	oci_bind_by_name($consulta, ':v_anio', $anio);
	oci_bind_by_name($consulta, ':v_plat', $plat);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function ver_grafico_top10_oreqs()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$mes = $request->mes;
	$anio = $request->anio;
	$ubi = $request->ubi;
	$plat = $request->plat;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_OREQS_GRAFICO_TOP10(:v_ubi,:v_mes,:v_anio,:v_plat,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $ubi);
	oci_bind_by_name($consulta, ':v_mes', $mes);
	oci_bind_by_name($consulta, ':v_anio', $anio);
	oci_bind_by_name($consulta, ':v_plat', $plat);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////////////OBTENER///////////////////////
function obtenersolicitante()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_SOLICITANTE(:v_cod,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_cod', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

//////////////////OBTENER PROVEEDOR///////////////////////
function obtenerproveedor()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_PROVEEDOR(:v_cod,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_cod', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////Buscar oreq en oord///////////////////////
function buscaroreqenoord()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_OREQ_EN_OORD(:v_num,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////////////BUSCAR OREQ///////////////////////
function buscaroreq()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_OREQS(:v_num,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

//////////////////////////INSERTAR OREQ///////////////////////
function insertaroreq()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$UBICACION = $request->UBICACION;
	$CONCEPTO = $request->CONCEPTO;
	$ESTADO = $request->ESTADO;
	$SOLICITANTE = $request->SOLICITANTE;
	$OBSERVACIONDES = $request->OBSERVACIONDES;
	$CANTIDADPROD = $request->CANTIDADPROD;
	$PRODUCTOS = $request->PRODUCTOS;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_INSERTA_OREQ(:v_pconcepto,:v_pestado,:v_pobservaciondes,
								:v_psolicitante,:v_pubicacion,:v_cantidadproduc,:v_productos,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pconcepto', $CONCEPTO);
	oci_bind_by_name($consulta, ':v_pestado', $ESTADO);
	oci_bind_by_name($consulta, ':v_pobservaciondes', $OBSERVACIONDES);
	oci_bind_by_name($consulta, ':v_psolicitante', $SOLICITANTE);
	oci_bind_by_name($consulta, ':v_pubicacion', $UBICACION);
	oci_bind_by_name($consulta, ':v_cantidadproduc', $CANTIDADPROD);
	oci_bind_by_name($consulta, ':v_productos', $PRODUCTOS);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);

	// echo  $JSON;
}

//////////////////////////INSERTAR OREQ///////////////////////
function actualizaroreq()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$NUMERO = $request->NUMERO;
	$UBICACION = $request->UBICACION;
	$CONCEPTO = $request->CONCEPTO;
	$ESTADO = $request->ESTADO;
	$OBSERVACIONDES = $request->OBSERVACIONDES;
	$CANTIDADPROD = $request->CANTIDADPROD;
	$PRODUCTOS = $request->PRODUCTOS;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_ACTUALIZA_OREQ(:v_pnumero,:v_pconcepto,:v_pestado,:v_pobservaciondes,
							:v_pubicacion,:v_cantidadproduc,:v_productos,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pnumero', $NUMERO);
	oci_bind_by_name($consulta, ':v_pconcepto', $CONCEPTO);
	oci_bind_by_name($consulta, ':v_pestado', $ESTADO);
	oci_bind_by_name($consulta, ':v_pobservaciondes', $OBSERVACIONDES);
	oci_bind_by_name($consulta, ':v_pubicacion', $UBICACION);
	oci_bind_by_name($consulta, ':v_cantidadproduc', $CANTIDADPROD);
	oci_bind_by_name($consulta, ':v_productos', $PRODUCTOS);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);

	// echo  $JSON;
}

//////////////////////////LISTAR OORDS///////////////////////
function listar_oords()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_OORDS(:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////////////LISTAR GRAFICO OREQS///////////////////////
function ver_grafico_oords()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$mes = $request->mes;
	$anio = $request->anio;
	$plat = $request->plat;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_OORDS_GRAFICO(:v_mes,:v_anio,:v_plat,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_mes', $mes);
	oci_bind_by_name($consulta, ':v_anio', $anio);
	oci_bind_by_name($consulta, ':v_plat', $plat);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
function ver_grafico_top10_oords()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$mes = $request->mes;
	$anio = $request->anio;
	$ubi = $request->ubi;
	$plat = $request->plat;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_OORDS_GRAFICO_TOP10(:v_ubi,:v_mes,:v_anio,:v_plat,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $ubi);
	oci_bind_by_name($consulta, ':v_mes', $mes);
	oci_bind_by_name($consulta, ':v_anio', $anio);
	oci_bind_by_name($consulta, ':v_plat', $plat);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////////////BUSCAR OORD///////////////////////
function buscaroord()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	// $codigo = '7940';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_OORDS(:v_num,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function insertaroord()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$FECHA = $request->FECHA;
	$UBICACION = $request->UBICACION;
	$PROVEEDOR = $request->PROVEEDOR;
	$CONDICION_PAGO = $request->CONDICION_PAGO;
	$DESCUENTO = $request->DESCUENTO;
	$ESTADO = $request->ESTADO;
	$OREQ_NUM = $request->OREQ_NUM;
	$OREQ_DOC = $request->OREQ_DOC;
	$OREQ_UBI = $request->OREQ_UBI;
	$OBSERVACIONDES = $request->OBSERVACIONDES;
	$EMPLEADO = $request->EMPLEADO;
	$BRUTO = $request->BRUTO;
	$DESCUENTOCOMPRA = $request->DESCUENTOCOMPRA;
	$SUBTOTAL = $request->SUBTOTAL;
	$DESCUENTOITEM = $request->DESCUENTOITEM;
	$SUBTOTAL1_2 = $request->SUBTOTAL1_2;
	$IMPUESTO = $request->IMPUESTO;
	$TOTAL = $request->TOTAL;
	$CANTIDADPROD = $request->CANTIDADPROD;
	$PRODUCTOS = $request->PRODUCTOS;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_INSERTA_OORD(:v_pfecha,:v_pubicacion,:v_pproveedor,:v_pcondicion,:v_pdescuento,:v_pestado,:v_poreqnum,
		:v_poreqdoc,:v_porequb,:v_pobservaciondes,:v_pempleado,:v_pbruto,:v_pdescuentocompra,:v_psubtotal,
		:v_pdescuentoitem,:v_psubtotal1_2,:v_pimpuesto,:v_ptotal,:v_cantidadproduc,:v_productos,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha', $FECHA);
	oci_bind_by_name($consulta, ':v_pubicacion', $UBICACION);
	oci_bind_by_name($consulta, ':v_pproveedor', $PROVEEDOR);
	oci_bind_by_name($consulta, ':v_pcondicion', $CONDICION_PAGO);
	oci_bind_by_name($consulta, ':v_pdescuento', $DESCUENTO);
	oci_bind_by_name($consulta, ':v_pestado', $ESTADO);
	oci_bind_by_name($consulta, ':v_poreqnum', $OREQ_NUM);
	oci_bind_by_name($consulta, ':v_poreqdoc', $OREQ_DOC);
	oci_bind_by_name($consulta, ':v_porequb', $OREQ_UBI);
	oci_bind_by_name($consulta, ':v_pobservaciondes', $OBSERVACIONDES);
	oci_bind_by_name($consulta, ':v_pempleado', $EMPLEADO);
	oci_bind_by_name($consulta, ':v_pbruto', $BRUTO);
	oci_bind_by_name($consulta, ':v_pdescuentocompra', $DESCUENTOCOMPRA);
	oci_bind_by_name($consulta, ':v_psubtotal', $SUBTOTAL);
	oci_bind_by_name($consulta, ':v_pdescuentoitem', $DESCUENTOITEM);
	oci_bind_by_name($consulta, ':v_psubtotal1_2', $SUBTOTAL1_2);
	oci_bind_by_name($consulta, ':v_pimpuesto', $IMPUESTO);
	oci_bind_by_name($consulta, ':v_ptotal', $TOTAL);
	oci_bind_by_name($consulta, ':v_cantidadproduc', $CANTIDADPROD);
	oci_bind_by_name($consulta, ':v_productos', $PRODUCTOS);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function actualizaroord()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$FECHA = $request->FECHA;
	$NUMERO = $request->NUMERO;
	$UBICACION = $request->UBICACION;
	$PROVEEDOR = $request->PROVEEDOR;
	$CONDICION_PAGO = $request->CONDICION_PAGO;
	$DESCUENTO = $request->DESCUENTO;
	$ESTADO = $request->ESTADO;
	$OREQ_NUM = $request->OREQ_NUM;
	$OREQ_DOC = $request->OREQ_DOC;
	$OREQ_UBI = $request->OREQ_UBI;
	$OBSERVACIONDES = $request->OBSERVACIONDES;
	$EMPLEADO = $request->EMPLEADO;
	$BRUTO = $request->BRUTO;
	$DESCUENTOCOMPRA = $request->DESCUENTOCOMPRA;
	$SUBTOTAL = $request->SUBTOTAL;
	$DESCUENTOITEM = $request->DESCUENTOITEM;
	$SUBTOTAL1_2 = $request->SUBTOTAL1_2;
	$IMPUESTO = $request->IMPUESTO;
	$TOTAL = $request->TOTAL;
	$CANTIDADPROD = $request->CANTIDADPROD;
	$PRODUCTOS = $request->PRODUCTOS;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_ACTUALIZA_OORD(:v_pfecha,:v_pnumero,:v_pubicacion,:v_pproveedor,:v_pcondicion,:v_pdescuento,:v_pestado,:v_poreqnum,
		:v_poreqdoc,:v_porequb,:v_pobservaciondes,:v_pempleado,:v_pbruto,:v_pdescuentocompra,:v_psubtotal,
		:v_pdescuentoitem,:v_psubtotal1_2,:v_pimpuesto,:v_ptotal,:v_cantidadproduc,:v_productos,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_pfecha', $FECHA);
	oci_bind_by_name($consulta, ':v_pnumero', $NUMERO);
	oci_bind_by_name($consulta, ':v_pubicacion', $UBICACION);
	oci_bind_by_name($consulta, ':v_pproveedor', $PROVEEDOR);
	oci_bind_by_name($consulta, ':v_pcondicion', $CONDICION_PAGO);
	oci_bind_by_name($consulta, ':v_pdescuento', $DESCUENTO);
	oci_bind_by_name($consulta, ':v_pestado', $ESTADO);
	oci_bind_by_name($consulta, ':v_poreqnum', $OREQ_NUM);
	oci_bind_by_name($consulta, ':v_poreqdoc', $OREQ_DOC);
	oci_bind_by_name($consulta, ':v_porequb', $OREQ_UBI);
	oci_bind_by_name($consulta, ':v_pobservaciondes', $OBSERVACIONDES);
	oci_bind_by_name($consulta, ':v_pempleado', $EMPLEADO);
	oci_bind_by_name($consulta, ':v_pbruto', $BRUTO);
	oci_bind_by_name($consulta, ':v_pdescuentocompra', $DESCUENTOCOMPRA);
	oci_bind_by_name($consulta, ':v_psubtotal', $SUBTOTAL);
	oci_bind_by_name($consulta, ':v_pdescuentoitem', $DESCUENTOITEM);
	oci_bind_by_name($consulta, ':v_psubtotal1_2', $SUBTOTAL1_2);
	oci_bind_by_name($consulta, ':v_pimpuesto', $IMPUESTO);
	oci_bind_by_name($consulta, ':v_ptotal', $TOTAL);
	oci_bind_by_name($consulta, ':v_cantidadproduc', $CANTIDADPROD);
	oci_bind_by_name($consulta, ':v_productos', $PRODUCTOS);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

///////////////////////////////////////////////////////
function desprocesaroord()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$NUMERO = $request->num;
	$UBICACION = $request->ubi;
	$CEDULA = $request->ced;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_DESPROCESA_OORD(:v_num,:v_ubi,:v_ced,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $NUMERO);
	oci_bind_by_name($consulta, ':v_ubi', $UBICACION);
	oci_bind_by_name($consulta, ':v_ced', $CEDULA);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

///////////////////////////////////////////////////////

function Obtener_Inf_Oreq()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$NUMERO = $request->num;
	$ced = $request->ced;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_OREQS_IMPRIMIR(:v_num,:v_ced,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $NUMERO);
	oci_bind_by_name($consulta, ':v_ced', $ced);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obtener_Inf_Oord()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$NUMERO = $request->num;
	$ced = $request->ced;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_OORDS_IMPRIMIR(:v_num,:ced,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $NUMERO);
	oci_bind_by_name($consulta, ':ced', $ced);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Obtener_Lista_Gestiones()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$UBICACION = $request->UBICACION;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_LISTA_GESTIONES(:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $UBICACION);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obtener_Lista_Gestiones_Detalle()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$bodega = $request->bodega;
	$oord = $request->oord;
	$oreq = $request->oreq;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_LISTA_GESTIONES_DETALLE(:v_bodega,:v_oreq,:v_oord,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_bodega', $bodega);
	oci_bind_by_name($consulta, ':v_oord', $oord);
	oci_bind_by_name($consulta, ':v_oreq', $oreq);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Confirmar_productos_gestion()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$json = $request->json;
	$cantidad = $request->cantidad;
	$responsable = $request->responsable;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_CONFIRMAR_LISTA_GESTIONES_DETALLE(:v_productos,:v_cantidadproduc,:v_responsable,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_productos', $json);
	oci_bind_by_name($consulta, ':v_cantidadproduc', $cantidad);
	oci_bind_by_name($consulta, ':v_responsable', $responsable);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Ver_Bodegas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_BODEGAS(:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Ver_Bodegas_Conceptos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_BODEGAS_CONCEPTOS(:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Ver_Bodegas_Conceptos_Productos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$concepto = $request->concepto;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_OBTENER_BODEGAS_CONCEPTOS_PRODUCTO(:v_ubi,:v_concepto,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $codigo);
	oci_bind_by_name($consulta, ':v_concepto', $concepto);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BuscarProductoEntrega()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$ubi = $request->ubi;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_PRODUCTOS_ENTREGA(:v_prod,:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_prod', $codigo);
	oci_bind_by_name($consulta, ':v_ubi', $ubi);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function BuscarAcasEntrega()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$ubi = $request->ubi;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_BUSCAR_ACAS_ENTREGA(:v_num,:v_ubi,:v_usuario,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_num', $codigo);
	oci_bind_by_name($consulta, ':v_ubi', $ubi);
	oci_bind_by_name($consulta, ':v_usuario', $request->cedula);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function RegistrarEntrega()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$cedula_soli = $request->cedula_soli;
	$ubicacion = $request->ubicacion;
	$cedula_ent = $request->cedula_ent;
	$acas = $request->acas;
	$bodega = $request->bodega;
	$cantidad = $request->cantidad;
	$productos = $request->PRODUCTOS;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_REGISTRAR_ENTREGA(:v_cedula_soli,:v_ubicacion,:v_cedula_ent,:v_acas,:v_bodega,
		:v_cantidadprod,:v_productos,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_cedula_soli', $cedula_soli);
	oci_bind_by_name($consulta, ':v_ubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_cedula_ent', $cedula_ent);
	oci_bind_by_name($consulta, ':v_acas', $acas);
	oci_bind_by_name($consulta, ':v_bodega', $bodega);
	oci_bind_by_name($consulta, ':v_cantidadprod', $cantidad);
	oci_bind_by_name($consulta, ':v_productos', $productos);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

function Obtener_Inf_Entrega()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$NUMERO = $request->acas;
	$ced_sol = $request->ced_sol;
	$ubi_sol = $request->ubi_sol;
	$bod = $request->bod;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_IMPRIMIR_ENTREGA(:v_acas,:ced_sol,:ubi_sol,:bod,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_acas', $NUMERO);
	oci_bind_by_name($consulta, ':ced_sol', $ced_sol);
	oci_bind_by_name($consulta, ':ubi_sol', $ubi_sol);
	oci_bind_by_name($consulta, ':bod', $bod);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

//////////////////////////LISTAR ENTREGAS///////////////////////
function listar_entregas()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$codigo = $request->codigo;
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_INVENTARIO_ADM.P_LISTAR_ENTREGAS(:v_ubi,:v_json_row); end;');
	oci_bind_by_name($consulta, ':v_ubi', $codigo);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_row', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}

//////////////////////////CREAR PRODUCTO///////////////////////
function Creacion_Productos()
{
	require_once('../config/dbcon_prod.php');
	global $request;
	$documento = 'RE';
	$ubicacion = '1';
	$concepto = 'C5';
	$motivo = 1;
	$adjunto = '';
	$prioridad = 'A';
	$barrio = '0';
	$asunto = 'CREACION DE PRODUCTOS';
	$consulta = oci_parse($c, 'BEGIN PQ_GENESIS_ACAS.P_INSERT_ACAS(:v_pdocumento,:v_pubicacion,:v_pconcepto,:v_pmotivo,:v_padjunto,:v_pobservacion,
		:v_pemisor,:v_pasunto,:v_pprioridad,:v_pbarrio,:v_prespuesta); end;');
	oci_bind_by_name($consulta, ':v_pdocumento', $documento);
	oci_bind_by_name($consulta, ':v_pubicacion', $ubicacion);
	oci_bind_by_name($consulta, ':v_pconcepto', $concepto);
	oci_bind_by_name($consulta, ':v_pmotivo', $motivo);
	oci_bind_by_name($consulta, ':v_padjunto', $adjunto);
	oci_bind_by_name($consulta, ':v_pobservacion', $request->observacion);
	oci_bind_by_name($consulta, ':v_pemisor', $request->emisor);
	oci_bind_by_name($consulta, ':v_pasunto', $asunto);
	oci_bind_by_name($consulta, ':v_pprioridad', $prioridad);
	oci_bind_by_name($consulta, ':v_pbarrio', $barrio);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_prespuesta', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	if (isset($clob)) {
		$json = $clob->read($clob->size());
		echo $json;
	} else {
		echo 0;
	}
	oci_close($c);
}
