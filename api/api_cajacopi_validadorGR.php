<?php
// Api que recibe
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header ("Access-Control-Allow-Headers: Content-Type, Authorization, Accept, Accept-Language,X-Authorization,Apikey");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}
$postdata = file_get_contents("php://input");
$request = $postdata;
$header = getallheaders();
$Apikey =$header['Apikey'];
// echo $postdata;
if ($request) {
  // if($Apikey == 'Xvrewrvd#dvdgvy252yg53h"545¡¡7543cbvxncbn.,-.ñlhkgjbn') {
    if($Apikey != '' && $Apikey != null) {
      echo 'pruebas';
      require_once('../php/config/dbcon_login.php');
      // require_once('../php/config/dbcon_qa.php');
      $consulta = oci_parse($c, 'begin OASIS.PQ_GENESIS_GESTION_RIESGO_ERC.p_Validador_ERC(:v_pjson_in,:v_pjson_out);end;');
      oci_bind_by_name($consulta, ':v_pjson_in',$request);
      $clob = oci_new_descriptor($c, OCI_D_LOB);
      oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
      oci_execute($consulta, OCI_DEFAULT);
      if (isset($clob)) {
        $request = $clob->read($clob->size());
        echo $request;
      } else {
        echo 0;
      }
      oci_close($c);
    }else{
      echo 'No estas autorizado';
    }
} else {
    header("Location: https://www.google.com");
}
// $pruebas = array(
//   "Var1" => "VICTORINO",
//   "Var2" => "NONE",
//   "Var3" => "MARTINEZ",
//   "Var4" => "RODRIGUEZ",
//   "Var5" => "CC",
//   "Var6" => 12510162,
//   "Var7" => "1935-01-03",
//   "Var8" => "M",
//   "Var9" => "S",
//   "Var10" => "CCF055",
//   "Var11" => 6,
//   "Var12" => 61,
//   "Var13" => 47245,
//   "Var14" => 3135089313,
//   "Var15" => "2003-04-04",
//   "Var16" => 4700101060,
//   "Var17" => "2019-09-25",
//   "Var18" => 1,
//   "Var19" => "2003-04-04",
//   "Var19_1" => "",
//   "Var20" => 2,
//   "Var21" => "1845-01-01",
//   "Var21_1" => 98,
//   "Var22" => 5,
//   "Var23" => 57,
//   "Var24" => 172,
//   "Var25" => 120,
//   "Var26" => 90,
//   "Var27" => 1,02,
//   "Var27_1" => "2019-09-13",
//   "Var28" => 98,
//   "Var28_1" => "1845-01-01",
//   "Var29" => 22,3,
//   "Var29_1" => "2019-09-13",
//   "Var30" => 98,
//   "Var30_1" => "2019-09-13",
//   "Var31" => 160,18,
//   "Var31_1" => "2019-09-13",
//   "Var32" => 44,93,
//   "Var32_1" => "2019-09-13",
//   "Var33" => 136,1,
//   "Var33_1" => "2019-09-13",
//   "Var34" => 9999,
//   "Var34_1" => "1800-01-01",
//   "Var35" => 43,5,
//   "Var36" => 2,
//   "Var37" => 2,
//   "Var38" => 1,
//   "Var39" => 3,
//   "Var40" => "1845-01-01",
//   "Var41" => 2,
//   "Var42" => 98,
//   "Var43" => 97,
//   "Var44" => "1845-01-01",
//   "Var45" => "1845-01-01",
//   "Var46" => 98,
//   "Var47" => 98,
//   "Var48" => 98,
//   "Var49" => 98,
//   "Var50" => 98,
//   "Var51" => 98,
//   "Var52" => 98,
//   "Var53" => 98,
//   "Var54" => 99,
//   "Var55" => "1800-01-01",
//   "Var56" => "1800-01-01",
//   "Var57" => 1,
//   "Var58" => 98,
//   "Var59" => 98,
//   "Var60" => 98,
//   "Var61" => 98,
//   "Var62" => 97,
//   "Var62_1" => 97,
//   "Var62_2" => 2,
//   "Var62_3" => 97,
//   "Var62_4" => 97,
//   "Var62_5" => 97,
//   "Var62_6" => 97,
//   "Var62_7" => 97,
//   "Var62_8" => 97,
//   "Var62_9" => 97,
//   "Var62_10" => 97,
//   "Var62_11" => 97,
//   "Var63" => "1845-01-01",
//   "Var63_1" => 98,
//   "Var64" => 5,
//   "Var65" => 98,
//   "Var66" => 98,
//   "Var67" => 98,
//   "Var68" => 98,
//   "Var69" => 98,
//   "Var69_1" => "1845-01-01",
//   "Var69_2" => "1845-01-01",
//   "Var69_3" => "1845-01-01",
//   "Var69_4" => "1845-01-01",
//   "Var69_5" => "1845-01-01",
//   "Var69_6" => "1845-01-01",
//   "Var69_7" => "1845-01-01",
//   "Var70" => 98,
//   "Var70_1" => 98,
//   "Var70_2" => 98,
//   "Var70_3" => 98,
//   "Var70_4" => 98,
//   "Var70_5" => 98,
//   "Var70_6" => 98,
//   "Var70_7" => 98,
//   "Var70_8" => 98,
//   "Var70_9" => 98,
//   "Var71" => 98,
//   "Var72" => "1845-01-01",
//   "Var73" => "1845-01-01",
//   "Var74" => 98,
//   "Var75" => 98,
//   "Var76" => 1,
//   "Var77" => 98,
//   "Var78" => 99,
//   "Var79" => 98,
//   "Var80" => 98,
//   "Var80_1" => "1845-01-01",
//   "Var81" => 72298,
//   "Var82" => "2022-06-30"
// );
// $datos = json_encode($pruebas);
// print_r('['.$datos.']');
// $pruebas = '['.$datos.']';
// insertar_validador_altocosto_Gr($pruebas);
// function insertar_validador_altocosto_Gr($json)
// {
//   // echo $json;
  // require('../php/config/dbcon_qa.php');
  // $consulta = oci_parse($c, 'begin OASIS.PQ_GENESIS_GESTION_RIESGO_ERC.p_Validador_ERC(:v_pjson_in,:v_pjson_out);end;');
  // oci_bind_by_name($consulta, ':v_pjson_in', $json);
  // $clob = oci_new_descriptor($c, OCI_D_LOB);
  // oci_bind_by_name($consulta, ':v_pjson_out', $clob, -1, OCI_B_CLOB);
  // oci_execute($consulta, OCI_DEFAULT);
  // if (isset($clob)) {
  // 	$json = $clob->read($clob->size());
  // 	echo $json;
  // } else {
  // 	echo 0;
  // }
  // oci_close($c);
// }
?>