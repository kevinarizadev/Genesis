<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=REPORTE_VIH_AUTORIZACIONES"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");



$fecha = $_GET['fecha'];
$tipo = $_GET['tipo'];
$dpto = $_GET['dpto'];
//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,
  "SELECT g.v1,
  g.v2,
  g.v3,
  g.v4,
  g.v5,
  g.v6,
  g.v7,
  g.v8,
  g.v9,
  g.v10,
  g.v11,
  g.v12,
  g.v13,
  g.v14,
  g.v15,
  g.v16,
  g.v17,
  g.v18,
  g.v19,
  g.v20,
  g.v21,
  g.v22,
  g.v23,
  g.v24,
  g.v241,
  g.v242,
  g.v243,
  g.v244,
  g.v245,
  g.v246,
  g.v247,
  g.v248,
  g.v249,
  g.v25,
  g.v251,
  g.v252,
  g.v26,
  g.v27,
  g.v28,
  g.v281,
  g.v29,
  g.v291,
  g.v30,
  g.v301,
  g.v31,
  g.v32,
  g.v33,
  g.v34,
  g.v35,
  g.v36,
  g.v361,
  g.v362,
  g.v37,
  g.v38,
  g.v39,
  g.v40,
  g.v401,
  g.v41,
  g.v411,
  g.v42,
  g.v421,
  g.v422,
  g.v423,
  g.v424,
  g.v425,
  g.v43,
  g.v431,
  g.v44,
  g.v441,
  g.v45,
  g.v46,
  g.v47,
  g.v48,
  g.v49,
  g.v50,
  g.v51,
  g.v511,
  g.v512,
  g.v513,
  g.v514,
  g.v515,
  g.v516,
  g.v517,
  g.v518,
  g.v521,
  g.v522,
  g.v523,
  g.v524,
  g.v525,
  g.v526,
  g.v527,
  g.v528,
  g.v529,
  g.v5210,
  g.v5211,
  g.v5212,
  g.v5213,
  g.v5214,
  g.v5215,
  g.v5216,
  g.v5217,
  g.v5218,
  g.v5219,
  g.v5220,
  g.v5221,
  g.v5222,
  g.v53,
  g.v531,
  g.v532,
  g.v533,
  g.v534,
  g.v54,
  g.v55,
  g.v56,
  g.v561,
  g.v57,
  g.v571,
  g.v58,
  g.v581,
  g.v59,
  g.v591,
  g.v60,
  g.v601,
  g.v61,
  g.v611,
  g.v62,
  g.v621,
  g.v63,
  g.v64,
  g.v65,
  g.v66,
  g.v67,
  g.v68,
  g.v681,
  g.v682,
  g.v683,
  g.v684,
  g.v685,
  g.v686,
  g.v687,
  g.v688,
  g.v689,
  g.v6810,
  g.v6811,
  g.v6812,
  g.v6813,
  g.v6814,
  g.v69,
  g.v70,
  g.v71,
  g.v72,
  g.v73,
  g.v74,
  g.v75,
  g.v751,
  g.v76,
  g.v761,
  g.v77,
  g.v771,
  g.v772,
  g.v773,
  g.v774,
  g.v775,
  g.v776,
  g.v777,
  g.v778,
  g.v78,
  g.v79,
  g.v80,
  g.v81,
  g.v82,
  g.v83,
  g.v84,
  g.v85,
  g.v86,
  g.v861,
  g.v87,
  g.v88,
  g.v89,
  g.v90,
  g.v91,
  g.v92,
  g.v93,
  g.v94,
  g.v95,
  g.v96,
  g.v97,
  g.v971,
  g.v972,
  g.v973,
  g.v974,
  g.v98,
  g.v99,  
  g.responsable,
  b.terc_nombre,
  Bc.Ubgc_Nombre
  FROM eres_resolucion_vih g 
  inner join bter_tercero b on b.terv_codigo = g.responsable
  inner join BUBG_UBICACION_GEOGRAFICA uc
  on (b.tern_ubicacion_geografica = uc.UBGN_CODIGO)
  inner join BUBG_UBICACION_GEOGRAFICA Bc
  on (to_char(uc.UBGN_PAIS) || '000' = Bc.UBGN_CODIGO)
  WHERE g.clase_arc = :tipo
  AND to_date(g.fecha_registro) <= to_date(:fecha)
  AND g.ultima_actualizacion = (select max(k.ultima_actualizacion) from eres_resolucion_vih k where k.ultima_actualizacion is not null and k.v4 =  g.v4 )
  AND Bc.Ubgc_Nombre like :dpto||'%'");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio
oci_bind_by_name($consulta,':tipo',$tipo);
oci_bind_by_name($consulta,':fecha',$fecha);
oci_bind_by_name($consulta,':dpto',$dpto);

?>

<h1>Reporte VIH <?php echo $dpto?></h1>
<h3>Parametros Del Reporte: Fecha consultada: <?php echo $fecha?> - Area: Autorizaciones</h3>

<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
<tr>

  <th> V1</th>
  <th> V2</th>
  <th> V3</th>
  <th> V4</th>
  <th> V5</th>
  <th> V6</th>
  <th> V7</th>
  <th> V8</th>
  <th> V9</th>
  <th> V10</th>

  <th> V11</th>
  <th> V12</th>
  <th> V13</th>
  <th> V14</th>
  <th> V15</th>
  <th> V16</th>
  <th> V17</th>
  <th> V18</th>
  <th> V19</th>
  <th> V20</th>

  <th> V21</th>
  <th> V22</th>
  <th> V23</th>
  <th> V24</th>
  <th> V241</th>
  <th> V242</th>
  <th> V243</th>
  <th> V244</th>
  <th> V245</th>
  <th> V246</th>
  <th> V247</th>
  <th> V248</th>
  <th> V249</th>
  <th> V25</th>
  <th> V251</th>
  <th> V252</th>
  <th> V26</th>
  <th> V27</th>
  <th> V28</th>
  <th> V281</th>
  <th> V29</th>
  <th> V291</th>

  <th> V30</th>
  <th> V301</th>
  <th> V31</th>
  <th> V32</th>
  <th> V33</th>
  <th> V34</th>
  <th> V35</th>
  <th> V36</th>
  <th> V361</th>
  <th> V362</th>
  <th> V37</th>
  <th> V38</th>
  <th> V39</th>
  
  <th> V40</th>
  <th> V401</th>
  <th> V41</th>
  <th> V411</th>
  <th> V42</th>
  <th> V421</th>
  <th> V422</th>
  <th> V423</th>
  <th> V424</th>
  <th> V425</th>
  <th> V43</th>
  <th> V431</th>
  <th> V44</th>
  <th> V441</th>
  <th> V45</th>
  <th> V46</th>
  <th> V47</th>
  <th> V48</th>
  <th> V49</th>
  
  <th> V50</th>
  <th> V51</th>
  <th> V511</th>
  <th> V512</th>
  <th> V513</th>
  <th> V514</th>
  <th> V515</th>
  <th> V516</th>
  <th> V517</th>
  <th> V518</th>
  <th> V521</th>
  <th> V522</th>
  <th> V523</th>
  <th> V524</th>
  <th> V525</th>
  <th> V526</th>
  <th> V527</th>
  <th> V528</th>
  <th> V529</th>
  <th> V5210</th>
  <th> V5211</th>
  <th> V5212</th>
  <th> V5213</th>
  <th> V5214</th>
  <th> V5215</th>
  <th> V5216</th>
  <th> V5217</th>
  <th> V5218</th>
  <th> V5219</th>
  <th> V5220</th>
  <th> V5221</th>
  <th> V5222</th>
  <th> V53</th>
  <th> V531</th>
  <th> V532</th>
  <th> V533</th>
  <th> V534</th>
  <th> V54</th>
  <th> V55</th>
  <th> V56</th>
  <th> V561</th>
  <th> V57</th>
  <th> V571</th>
  <th> V58</th>
  <th> V581</th>
  <th> V59</th>
  <th> V591</th>

  <th> V60</th>
  <th> V601</th>
  <th> V61</th>
  <th> V611</th>
  <th> V62</th>
  <th> V621</th>
  <th> V63</th>
  <th> V64</th>
  <th> V65</th>
  <th> V66</th>
  <th> V67</th>
  <th> V68</th>
  <th> V681</th>
  <th> V682</th>
  <th> V683</th>
  <th> V684</th>
  <th> V685</th>
  <th> V686</th>
  <th> V687</th>
  <th> V688</th>
  <th> V689</th>
  <th> V6810</th>
  <th> V6811</th>
  <th> V6812</th>
  <th> V6813</th>
  <th> V6814</th>
  <th> V69</th>

  <th> V70</th>
  <th> V71</th>
  <th> V72</th>
  <th> V73</th>
  <th> V74</th>
  <th> V75</th>
  <th> V751</th>
  <th> V76</th>
  <th> V761</th>
  <th> V77</th>
  <th> V771</th>
  <th> V772</th>
  <th> V773</th>
  <th> V774</th>
  <th> V775</th>
  <th> V776</th>
  <th> V777</th>
  <th> V778</th>
  <th> V78</th>
  <th> V79</th>

  <th> V80</th>
  <th> V81</th>
  <th> V82</th>
  <th> V83</th>
  <th> V84</th>
  <th> V85</th>
  <th> V86</th>
  <th> V861</th>
  <th> V87</th>
  <th> V88</th>
  <th> V89</th>

  <th> V90</th>
  <th> V91</th>
  <th> V92</th>
  <th> V93</th>
  <th> V94</th>
  <th> V95</th>
  <th> V96</th>
  <th> V97</th>
  <th> V971</th>
  <th> V972</th>
  <th> V973</th>
  <th> V974</th>
  <th> V98</th>
  <th> V99</th>
  
  <th> CEDULA DE FUNCIONARIO</th>
  <th> FUNCIONARIO</th>
  <th> UBICACION</th>
</tr>



<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta))
{
	        echo "<tr>";

          echo "<td>"; echo$rows['V1']; echo "</td>";
          echo "<td>"; echo$rows['V2']; echo "</td>";
          echo "<td>"; echo$rows['V3']; echo "</td>";
          echo "<td>"; echo$rows['V4']; echo "</td>";
          echo "<td>"; echo$rows['V5']; echo "</td>";
          echo "<td>"; echo$rows['V6']; echo "</td>";
          echo "<td>"; echo$rows['V7']; echo "</td>";
          echo "<td>"; echo$rows['V8']; echo "</td>";
          echo "<td>"; echo$rows['V9']; echo "</td>";
          echo "<td>"; echo$rows['V10']; echo "</td>";
          echo "<td>"; echo$rows['V11']; echo "</td>";
          echo "<td>"; echo$rows['V12']; echo "</td>";
          echo "<td>"; echo$rows['V13']; echo "</td>";
          echo "<td>"; echo$rows['V14']; echo "</td>";
          echo "<td>"; echo$rows['V15']; echo "</td>";
          echo "<td>"; echo$rows['V16']; echo "</td>";
          echo "<td>"; echo$rows['V17']; echo "</td>";
          echo "<td>"; echo$rows['V18']; echo "</td>";
          echo "<td>"; echo$rows['V19']; echo "</td>";
          echo "<td>"; echo$rows['V20']; echo "</td>";
          echo "<td>"; echo$rows['V21']; echo "</td>";
          echo "<td>"; echo$rows['V22']; echo "</td>";
          echo "<td>"; echo$rows['V23']; echo "</td>";
          echo "<td>"; echo$rows['V24']; echo "</td>";
          echo "<td>"; echo$rows['V241']; echo "</td>";
          echo "<td>"; echo$rows['V242']; echo "</td>";
          echo "<td>"; echo$rows['V243']; echo "</td>";
          echo "<td>"; echo$rows['V244']; echo "</td>";
          echo "<td>"; echo$rows['V245']; echo "</td>";
          echo "<td>"; echo$rows['V246']; echo "</td>";
          echo "<td>"; echo$rows['V247']; echo "</td>";
          echo "<td>"; echo$rows['V248']; echo "</td>";
          echo "<td>"; echo$rows['V249']; echo "</td>";
          echo "<td>"; echo$rows['V25']; echo "</td>";
          echo "<td>"; echo$rows['V251']; echo "</td>";
          echo "<td>"; echo$rows['V252']; echo "</td>";
          echo "<td>"; echo$rows['V26']; echo "</td>";
          echo "<td>"; echo$rows['V27']; echo "</td>";
          echo "<td>"; echo$rows['V28']; echo "</td>";
          echo "<td>"; echo$rows['V281']; echo "</td>";
          echo "<td>"; echo$rows['V29']; echo "</td>";
          echo "<td>"; echo$rows['V291']; echo "</td>";
          echo "<td>"; echo$rows['V30']; echo "</td>";
          echo "<td>"; echo$rows['V301']; echo "</td>";
          echo "<td>"; echo$rows['V31']; echo "</td>";
          echo "<td>"; echo$rows['V32']; echo "</td>";
          echo "<td>"; echo$rows['V33']; echo "</td>";
          echo "<td>"; echo$rows['V34']; echo "</td>";
          echo "<td>"; echo$rows['V35']; echo "</td>";
          echo "<td>"; echo$rows['V36']; echo "</td>";
          echo "<td>"; echo$rows['V361']; echo "</td>";
          echo "<td>"; echo$rows['V362']; echo "</td>";
          echo "<td>"; echo$rows['V37']; echo "</td>";
          echo "<td>"; echo$rows['V38']; echo "</td>";
          echo "<td>"; echo$rows['V39']; echo "</td>";
          echo "<td>"; echo$rows['V40']; echo "</td>";
          echo "<td>"; echo$rows['V401']; echo "</td>";
          echo "<td>"; echo$rows['V41']; echo "</td>";
          echo "<td>"; echo$rows['V411']; echo "</td>";
          echo "<td>"; echo$rows['V42']; echo "</td>";
          echo "<td>"; echo$rows['V421']; echo "</td>";
          echo "<td>"; echo$rows['V422']; echo "</td>";
          echo "<td>"; echo$rows['V423']; echo "</td>";
          echo "<td>"; echo$rows['V424']; echo "</td>";
          echo "<td>"; echo$rows['V425']; echo "</td>";
          echo "<td>"; echo$rows['V43']; echo "</td>";
          echo "<td>"; echo$rows['V431']; echo "</td>";
          echo "<td>"; echo$rows['V44']; echo "</td>";
          echo "<td>"; echo$rows['V441']; echo "</td>";
          echo "<td>"; echo$rows['V45']; echo "</td>";
          echo "<td>"; echo$rows['V46']; echo "</td>";
          echo "<td>"; echo$rows['V47']; echo "</td>";
          echo "<td>"; echo$rows['V48']; echo "</td>";
          echo "<td>"; echo$rows['V49']; echo "</td>";
          echo "<td>"; echo$rows['V50']; echo "</td>";
          echo "<td>"; echo$rows['V51']; echo "</td>";
          echo "<td>"; echo$rows['V511']; echo "</td>";
          echo "<td>"; echo$rows['V512']; echo "</td>";
          echo "<td>"; echo$rows['V513']; echo "</td>";
          echo "<td>"; echo$rows['V514']; echo "</td>";
          echo "<td>"; echo$rows['V515']; echo "</td>";
          echo "<td>"; echo$rows['V516']; echo "</td>";
          echo "<td>"; echo$rows['V517']; echo "</td>";
          echo "<td>"; echo$rows['V518']; echo "</td>";
          echo "<td>"; echo$rows['V521']; echo "</td>";
          echo "<td>"; echo$rows['V522']; echo "</td>";
          echo "<td>"; echo$rows['V523']; echo "</td>";
          echo "<td>"; echo$rows['V524']; echo "</td>";
          echo "<td>"; echo$rows['V525']; echo "</td>";
          echo "<td>"; echo$rows['V526']; echo "</td>";
          echo "<td>"; echo$rows['V527']; echo "</td>";
          echo "<td>"; echo$rows['V528']; echo "</td>";
          echo "<td>"; echo$rows['V529']; echo "</td>";
          echo "<td>"; echo$rows['V5210']; echo "</td>";
          echo "<td>"; echo$rows['V5211']; echo "</td>";
          echo "<td>"; echo$rows['V5212']; echo "</td>";
          echo "<td>"; echo$rows['V5213']; echo "</td>";
          echo "<td>"; echo$rows['V5214']; echo "</td>";
          echo "<td>"; echo$rows['V5215']; echo "</td>";
          echo "<td>"; echo$rows['V5216']; echo "</td>";
          echo "<td>"; echo$rows['V5217']; echo "</td>";
          echo "<td>"; echo$rows['V5218']; echo "</td>";
          echo "<td>"; echo$rows['V5219']; echo "</td>";
          echo "<td>"; echo$rows['V5220']; echo "</td>";
          echo "<td>"; echo$rows['V5221']; echo "</td>";
          echo "<td>"; echo$rows['V5222']; echo "</td>";
          echo "<td>"; echo$rows['V53']; echo "</td>";
          echo "<td>"; echo$rows['V531']; echo "</td>";
          echo "<td>"; echo$rows['V532']; echo "</td>";
          echo "<td>"; echo$rows['V533']; echo "</td>";
          echo "<td>"; echo$rows['V534']; echo "</td>";
          echo "<td>"; echo$rows['V54']; echo "</td>";
          echo "<td>"; echo$rows['V55']; echo "</td>";
          echo "<td>"; echo$rows['V56']; echo "</td>";
          echo "<td>"; echo$rows['V561']; echo "</td>";
          echo "<td>"; echo$rows['V57']; echo "</td>";
          echo "<td>"; echo$rows['V571']; echo "</td>";
          echo "<td>"; echo$rows['V58']; echo "</td>";
          echo "<td>"; echo$rows['V581']; echo "</td>";
          echo "<td>"; echo$rows['V59']; echo "</td>";
          echo "<td>"; echo$rows['V591']; echo "</td>";
          echo "<td>"; echo$rows['V60']; echo "</td>";
          echo "<td>"; echo$rows['V601']; echo "</td>";
          echo "<td>"; echo$rows['V61']; echo "</td>";
          echo "<td>"; echo$rows['V611']; echo "</td>";
          echo "<td>"; echo$rows['V62']; echo "</td>";
          echo "<td>"; echo$rows['V621']; echo "</td>";
          echo "<td>"; echo$rows['V63']; echo "</td>";
          echo "<td>"; echo$rows['V64']; echo "</td>";
          echo "<td>"; echo$rows['V65']; echo "</td>";
          echo "<td>"; echo$rows['V66']; echo "</td>";
          echo "<td>"; echo$rows['V67']; echo "</td>";
          echo "<td>"; echo$rows['V68']; echo "</td>";
          echo "<td>"; echo$rows['V681']; echo "</td>";
          echo "<td>"; echo$rows['V682']; echo "</td>";
          echo "<td>"; echo$rows['V683']; echo "</td>";
          echo "<td>"; echo$rows['V684']; echo "</td>";
          echo "<td>"; echo$rows['V685']; echo "</td>";
          echo "<td>"; echo$rows['V686']; echo "</td>";
          echo "<td>"; echo$rows['V687']; echo "</td>";
          echo "<td>"; echo$rows['V688']; echo "</td>";
          echo "<td>"; echo$rows['V689']; echo "</td>";
          echo "<td>"; echo$rows['V6810']; echo "</td>";
          echo "<td>"; echo$rows['V6811']; echo "</td>";
          echo "<td>"; echo$rows['V6812']; echo "</td>";
          echo "<td>"; echo$rows['V6813']; echo "</td>";
          echo "<td>"; echo$rows['V6814']; echo "</td>";
          echo "<td>"; echo$rows['V69']; echo "</td>";
          echo "<td>"; echo$rows['V70']; echo "</td>";
          echo "<td>"; echo$rows['V71']; echo "</td>";
          echo "<td>"; echo$rows['V72']; echo "</td>";
          echo "<td>"; echo$rows['V73']; echo "</td>";
          echo "<td>"; echo$rows['V74']; echo "</td>";
          echo "<td>"; echo$rows['V75']; echo "</td>";
          echo "<td>"; echo$rows['V751']; echo "</td>";
          echo "<td>"; echo$rows['V76']; echo "</td>";
          echo "<td>"; echo$rows['V761']; echo "</td>";
          echo "<td>"; echo$rows['V77']; echo "</td>";
          echo "<td>"; echo$rows['V771']; echo "</td>";
          echo "<td>"; echo$rows['V772']; echo "</td>";
          echo "<td>"; echo$rows['V773']; echo "</td>";
          echo "<td>"; echo$rows['V774']; echo "</td>";
          echo "<td>"; echo$rows['V775']; echo "</td>";
          echo "<td>"; echo$rows['V776']; echo "</td>";
          echo "<td>"; echo$rows['V777']; echo "</td>";
          echo "<td>"; echo$rows['V778']; echo "</td>";
          echo "<td>"; echo$rows['V78']; echo "</td>";
          echo "<td>"; echo$rows['V79']; echo "</td>";
          echo "<td>"; echo$rows['V80']; echo "</td>";
          echo "<td>"; echo$rows['V81']; echo "</td>";
          echo "<td>"; echo$rows['V82']; echo "</td>";
          echo "<td>"; echo$rows['V83']; echo "</td>";
          echo "<td>"; echo$rows['V84']; echo "</td>";
          echo "<td>"; echo$rows['V85']; echo "</td>";
          echo "<td>"; echo$rows['V86']; echo "</td>";
          echo "<td>"; echo$rows['V861']; echo "</td>";
          echo "<td>"; echo$rows['V87']; echo "</td>";
          echo "<td>"; echo$rows['V88']; echo "</td>";
          echo "<td>"; echo$rows['V89']; echo "</td>";
          echo "<td>"; echo$rows['V90']; echo "</td>";
          echo "<td>"; echo$rows['V91']; echo "</td>";
          echo "<td>"; echo$rows['V92']; echo "</td>";
          echo "<td>"; echo$rows['V93']; echo "</td>";
          echo "<td>"; echo$rows['V94']; echo "</td>";
          echo "<td>"; echo$rows['V95']; echo "</td>";
          echo "<td>"; echo$rows['V96']; echo "</td>";
          echo "<td>"; echo$rows['V97']; echo "</td>";
          echo "<td>"; echo$rows['V971']; echo "</td>";
          echo "<td>"; echo$rows['V972']; echo "</td>";
          echo "<td>"; echo$rows['V973']; echo "</td>";
          echo "<td>"; echo$rows['V974']; echo "</td>";
          echo "<td>"; echo$rows['V98']; echo "</td>";
          echo "<td>"; echo$rows['V99']; echo "</td>";

          echo "<td>"; echo$rows['RESPONSABLE']; echo "</td>";
          echo "<td>"; echo$rows['TERC_NOMBRE']; echo "</td>";
          echo "<td>"; echo$rows['UBGC_NOMBRE']; echo "</td>";


        echo "</tr>";
 }
 // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
