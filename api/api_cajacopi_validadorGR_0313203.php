<?php
    header("Content-Type: text/html;charset=utf-8");
    // header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST,  PUT, DELETE");
    header("Allow: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: *");
    header("Content-Type: text/html;charset=utf-8");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $function = $request->function;
    $function();
function validador_altocosto_Gr()
{
  global $request;
  require('config/dbcon_login.php');
  $consulta = oci_parse($c, 'begin PQ_GENESIS_GESTION_RIESGO_ERC.procedure p_Validador_ERC(:Var1,:Var2,:Var3,:Var4,:Var5,:Var6,:Var7,:Var8,:Var9,:Var10,:Var11,:Var12,:Var13,:Var14,:Var15,
  :Var16,:Var17,:Var18,:Var19,:Var19_1,:Var20,:Var21,:Var21_1,:Var22,:Var23,:Var24,:Var25,:Var26,:Var27,:Var27_1,:Var28,:Var28_1,:Var29,:Var29_1,:Var30,:Var30_1,:Var31,
  :Var31_1,:Var32,:Var32_1,:Var33,:Var33_1,:Var34,:Var35,:Var36,:Var37,:Var38,:Var39,:Var40,:Var41,:Var42,:Var43,:Var44,:Var45,:Var46,:Var47,:Var48,:Var49,:Var50,:Var51,
  :Var52,:Var53,:Var54,:Var55,:Var56,:Var57,:Var58,:Var59,:Var60,:Var61,:Var62,:Var62_1,:Var62_2,:Var62_3,:Var62_4,:Var62_5,:Var62_6,:Var62_7,:Var62_8,:Var62_9,:Var62_10,
  :Var62_11,:Var63,:Var63_1,:Var64,:Var65,:Var66,:Var67,:Var68,:Var69,:Var69_1,:Var69_2,:Var69_3,:Var69_4,:Var69,_5:Var69_6,:Var69_7,:Var70,:Var70_1,:Var70_2,:Var70_3,
  :Var70_4,:Var70_5,:Var70_6,:Var70_7,:Var70_6,:Var70_7,:Var70_8,:Var70_9,:Var71,:Var72,:Var73,:Var74,:Var75,:Var76,:Var77,:Var78,:Var79,:Var80,:Var80_1,:Var81,:Var82,:v_pjson_in,:v_pjson_out); end;');  
  oci_bind_by_name($consulta, ':Var1', $request->Var1);
  oci_bind_by_name($consulta, ':Var2', $request->Var2);
  oci_bind_by_name($consulta, ':Var3', $request->Var3);
  oci_bind_by_name($consulta, ':Var4', $request->Var4);
  oci_bind_by_name($consulta, ':Var5', $request->Var5);
  oci_bind_by_name($consulta, ':Var6', $request->Var6);
  oci_bind_by_name($consulta, ':Var7', $request->Var7);
  oci_bind_by_name($consulta, ':Var8', $request->Var8);
  oci_bind_by_name($consulta, ':Var9', $request->Var9);
  oci_bind_by_name($consulta, ':Var10', $request->Var10);
  oci_bind_by_name($consulta, ':Var11', $request->Var11);
  oci_bind_by_name($consulta, ':Var12', $request->Var12);
  oci_bind_by_name($consulta, ':Var13', $request->Var13);
  oci_bind_by_name($consulta, ':Var14', $request->Var14);
  oci_bind_by_name($consulta, ':Var15', $request->Var15);
  oci_bind_by_name($consulta, ':Var16', $request->Var16);
  oci_bind_by_name($consulta, ':Var17', $request->Var17);
  oci_bind_by_name($consulta, ':Var18', $request->Var18);
  oci_bind_by_name($consulta, ':Var19', $request->Var19);
  oci_bind_by_name($consulta, ':Var19_1', $request->Var19_1);
  oci_bind_by_name($consulta, ':Var20', $request->Var20); 
  oci_bind_by_name($consulta, ':Var21', $request->Var21);
  oci_bind_by_name($consulta, ':Var21_1', $request->Var21_1);
  oci_bind_by_name($consulta, ':Var22', $request->Var22);
  oci_bind_by_name($consulta, ':Var23', $request->Var23);
  oci_bind_by_name($consulta, ':Var24', $request->Var24);
  oci_bind_by_name($consulta, ':Var25', $request->Var25);
  oci_bind_by_name($consulta, ':Var26', $request->Var26);
  oci_bind_by_name($consulta, ':Var27', $request->Var27);
  oci_bind_by_name($consulta, ':Var27_1', $request->Var27_1);
  oci_bind_by_name($consulta, ':Var28', $request->Var28);
  oci_bind_by_name($consulta, ':Var28_1', $request->Var28_1);
  oci_bind_by_name($consulta, ':Var29', $request->Var29);
  oci_bind_by_name($consulta, ':Var29_1', $request->Var29_1);
  oci_bind_by_name($consulta, ':Var30', $request->Var30);
  oci_bind_by_name($consulta, ':Var30_1', $request->Var30_1);  
  oci_bind_by_name($consulta, ':Var31', $request->Var31);
  oci_bind_by_name($consulta, ':Var31_1', $request->Var31_1);
  oci_bind_by_name($consulta, ':Var32', $request->Var32);
  oci_bind_by_name($consulta, ':Var32_1', $request->Var32_1);
  oci_bind_by_name($consulta, ':Var33', $request->Var33);
  oci_bind_by_name($consulta, ':Var33_1', $request->Var33_1);
  oci_bind_by_name($consulta, ':Var34', $request->Var34);
  oci_bind_by_name($consulta, ':Var34_1', $request->Var34_1);
  oci_bind_by_name($consulta, ':Var35', $request->Var35);
  oci_bind_by_name($consulta, ':Var36', $request->Var36);
  oci_bind_by_name($consulta, ':Var37', $request->Var37);
  oci_bind_by_name($consulta, ':Var38', $request->Var38);
  oci_bind_by_name($consulta, ':Var39', $request->Var39);
  oci_bind_by_name($consulta, ':Var40', $request->Var40); 
  oci_bind_by_name($consulta, ':Var41', $request->Var41);
  oci_bind_by_name($consulta, ':Var42', $request->Var42);
  oci_bind_by_name($consulta, ':Var43', $request->Var43);
  oci_bind_by_name($consulta, ':Var44', $request->Var44);
  oci_bind_by_name($consulta, ':Var45', $request->Var45);
  oci_bind_by_name($consulta, ':Var46', $request->Var46);
  oci_bind_by_name($consulta, ':Var47', $request->Var47);
  oci_bind_by_name($consulta, ':Var48', $request->Var48);
  oci_bind_by_name($consulta, ':Var49', $request->Var49);
  oci_bind_by_name($consulta, ':Var50', $request->Var50); 
  oci_bind_by_name($consulta, ':Var51', $request->Var51);
  oci_bind_by_name($consulta, ':Var52', $request->Var52);
  oci_bind_by_name($consulta, ':Var53', $request->Var53);
  oci_bind_by_name($consulta, ':Var54', $request->Var54);
  oci_bind_by_name($consulta, ':Var55', $request->Var55);
  oci_bind_by_name($consulta, ':Var56', $request->Var56);
  oci_bind_by_name($consulta, ':Var57', $request->Var57);
  oci_bind_by_name($consulta, ':Var58', $request->Var58);
  oci_bind_by_name($consulta, ':Var59', $request->Var59);
  oci_bind_by_name($consulta, ':Var60', $request->Var60); 
  oci_bind_by_name($consulta, ':Var61', $request->Var61);
  oci_bind_by_name($consulta, ':Var62', $request->Var62);
  oci_bind_by_name($consulta, ':Var62_1', $request->Var62_1);
  oci_bind_by_name($consulta, ':Var62_2', $request->Var62_2);
  oci_bind_by_name($consulta, ':Var62_3', $request->Var62_3);
  oci_bind_by_name($consulta, ':Var62_4', $request->Var62_4);
  oci_bind_by_name($consulta, ':Var62_5', $request->Var62_5);
  oci_bind_by_name($consulta, ':Var62_6', $request->Var62_6);
  oci_bind_by_name($consulta, ':Var62_7', $request->Var62_7);
  oci_bind_by_name($consulta, ':Var62_8', $request->Var62_8);
  oci_bind_by_name($consulta, ':Var62_9', $request->Var62_9);
  oci_bind_by_name($consulta, ':Var62_10', $request->Var62_10);
  oci_bind_by_name($consulta, ':Var62_11', $request->Var62_11);
  oci_bind_by_name($consulta, ':Var63', $request->Var63);
  oci_bind_by_name($consulta, ':Var63_1', $request->Var63_1);
  oci_bind_by_name($consulta, ':Var64', $request->Var64);
  oci_bind_by_name($consulta, ':Var65', $request->Var65);
  oci_bind_by_name($consulta, ':Var66', $request->Var66);
  oci_bind_by_name($consulta, ':Var67', $request->Var67);
  oci_bind_by_name($consulta, ':Var68', $request->Var68);
  oci_bind_by_name($consulta, ':Var69', $request->Var69);
  oci_bind_by_name($consulta, ':Var69_1', $request->Var69_1);
  oci_bind_by_name($consulta, ':Var69_2', $request->Var69_2);
  oci_bind_by_name($consulta, ':Var69_3', $request->Var69_3);
  oci_bind_by_name($consulta, ':Var69_4', $request->Var69_4);
  oci_bind_by_name($consulta, ':Var69_5', $request->Var69_5);
  oci_bind_by_name($consulta, ':Var69_6', $request->Var69_6);
  oci_bind_by_name($consulta, ':Var69_7', $request->Var69_7);
  oci_bind_by_name($consulta, ':Var70', $request->Var70);
  oci_bind_by_name($consulta, ':Var70_1', $request->Var70_1);
  oci_bind_by_name($consulta, ':Var70_2', $request->Var70_2);
  oci_bind_by_name($consulta, ':Var70_3', $request->Var70_3);
  oci_bind_by_name($consulta, ':Var70_4', $request->Var70_4);
  oci_bind_by_name($consulta, ':Var70_5', $request->Var70_5);
  oci_bind_by_name($consulta, ':Var70_6', $request->Var70_6);
  oci_bind_by_name($consulta, ':Var70_7', $request->Var70_7);
  oci_bind_by_name($consulta, ':Var70_8', $request->Var70_8);
  oci_bind_by_name($consulta, ':Var70_9', $request->Var70_9);
  oci_bind_by_name($consulta, ':Var71', $request->Var71);
  oci_bind_by_name($consulta, ':Var72', $request->Var72);
  oci_bind_by_name($consulta, ':Var73', $request->Var73);
  oci_bind_by_name($consulta, ':Var74', $request->Var74);
  oci_bind_by_name($consulta, ':Var75', $request->Var75);
  oci_bind_by_name($consulta, ':Var76', $request->Var76);
  oci_bind_by_name($consulta, ':Var77', $request->Var77);
  oci_bind_by_name($consulta, ':Var78', $request->Var78);
  oci_bind_by_name($consulta, ':Var79', $request->Var79);
  oci_bind_by_name($consulta, ':Var80', $request->Var80);
  oci_bind_by_name($consulta, ':Var80_1', $request->Var80_1);
  oci_bind_by_name($consulta, ':Var81', $request->Var81);
  oci_bind_by_name($consulta, ':Var82', $request->Var82);
  $clob = oci_new_descriptor($c, OCI_D_LOB);
  oci_bind_by_name($consulta, ':v_pjson_in', $clob, -1, OCI_B_CLOB);
  oci_bind_by_name($consulta, ':v_pjson_out', $clob,-1,OCI_B_CLOB);
  oci_execute($consulta, OCI_DEFAULT);
  $json = $clob->read($clob->size());
  oci_close($c);
  echo $json;
  exit;
}
?>
