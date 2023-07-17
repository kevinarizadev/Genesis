<?php
require_once('../../../php/config/dbcon_prod.php');
header('Content-type: application/vnd.ms-excel;');
header("Content-Disposition: attachment; filename=SEGUIMIENTO TELEFONICO DE GESTANTE - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");

$fecha_i = $_GET['fecha_i'];
$fecha_f = $_GET['fecha_f'];

?>

<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
    <th colspan="12">Datos basicos</th>
    <th colspan="7">Seguimiento de gestante</th>
    <th colspan="10">Patologias</th>
    <th colspan="13">Demanda inducida</th>
    <!-- <th colspan="13">Demanda inducida de NO gestante</th> -->
    <th colspan="2">Factores de riesgo</th>



    </tr>
    <tr>
        <th>Consecutivo</th>
        <th>Nombre</th>
        <th>Tipo de documento</th>
        <th># Documento</th>
        <th>Renglon</th>
        <th>Departamento</th>
        <th>Municipio</th>
        <th>Direccion</th>
        <th>Barrio</th>
        <th># Telefono</th>        
        <th># Celular </th>
        <th># Celular 2</th>


        <th>Fecha de seguimiento</th>
        <th>Embarazada</th>
        <th>Trimestre del embarazo</th>
        <th>Asiste a control prenatal</th>
        <th>Ips</th>
        <th>Perdida de embarazo</th>
        <th>Registro de nacimiento</th>
        

        <th>Artritis</th>
        <th>Consumo de SP</th>
        <th>Diabetes</th>
        <th>EPOC/asma</th>
        <th>hipertension</th>
        <th>Salud mental</th>
        <th>Tuberculosis</th>
        <th>VIH</th>
        <th>Ninguna</th>
        <th>Otro</th>


        <th>Vacunacion segun esquema PAI</th>
        <th>Adulto joven</th>
        <th>Citologia cervicovaginal</th>
        <th>Consulta externa</th>
        <th>Orientacion de afiliacion</th>
        <th>Consulta puerperio</th>
        <th>Control Prenatal</th>
        <th>Crecimiento y Desarrollo</th>
        <th>Programa de Gestion de Riesgo</th>
        <th>Medicion de agudeza visual</th>
        <th>Planificacion familiar</th>
        <th>Salud oral</th>
        <th>Tamizaje cardiovascular</th>
        <th>Tamizaje de cancer de Mama</th>


        <!-- <th>Vacunacion segun esquema PAI</th>
        <th>Adulto joven</th>
        <th>Citologia cervicovaginal</th>
        <th>Consulta puerperio</th>
        <th>Crecimiento y Desarrollo</th>
        <th>Medicion de agudeza visual</th>
        <th>Planificacion familiar</th>
        <th>Salud oral</th>
        <th>Tamizaje cardiovascular</th>
        <th>Tamizaje de cancer de Mama</th>
        <th>Tamizaje Hepatitis</th>
        <th>Tamizaje para Sífilis </th>
        <th>Tamizaje VIH</th> -->


        <th>Factores de riesgo</th>
        <th>Observacion</th>
        <th>Responsable</th>


    </tr>
    <?php
   

    $consulta = oci_parse($c, 'BEGIN PQ_GENESIS_PRUEBAS.P_DESCARGA_GESTANTE(:v_pfecha1,:v_pfecha2,:v_pjson_row_out); end;');
    oci_bind_by_name($consulta, ':v_pfecha1', $fecha_i);
    oci_bind_by_name($consulta, ':v_pfecha2', $fecha_f);
    $clob = oci_new_descriptor($c, OCI_D_LOB);
    oci_bind_by_name($consulta, ':v_pjson_row_out', $clob, -1, OCI_B_CLOB);
    oci_execute($consulta, OCI_DEFAULT);
    

    $datos=json_decode($clob->read($clob->size()));
    
    foreach ($datos as $dato) {
        echo "<tr>";
        ////////////
        echo "<td>";
        echo $dato->consecutivo;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->nombres;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->tipoDoc;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->documento;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->Renglon;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->departamento;
        echo "</td>";
        ////////////departamento
        ////////////celular
        echo "<td>";
        echo $dato->Ubicacion;
        echo "</td>";
       
          ////////////
        echo "<td>";
        echo $dato->direccion;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->barrio;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->telefono;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->celular;
        echo "</td>";
        ////////////
        echo "<td>";
        echo $dato->celular2;
        echo "</td>";
        ////////////


        ///////////////////////////////////////////////////////////////////////////////////
        echo "<td>";
        echo $dato->fecha_registro;
        echo "</td>";
        ////////////
        echo "<td>";
        echo ($dato->esta_embarazo =='N' || $dato->esta_embarazo =='') ? 'NO': 'SI';
        echo "</td>";
        ////////////
        echo "<td>";
        echo ($dato->trimestre =='1' || $dato->trimestre =='2' || $dato->trimestre =='3') ? $dato->trimestre: 'No aplica';
        echo "</td>";
        ////////////
        echo "<td>";
        echo ($dato->asiste_cp =='2' || $dato->asiste_cp =='') ? 'NO': 'SI';
        echo "</td>";
        ////////////
        echo "<td>";
        echo ($dato->ips =='' ) ? 'NO APLICA': $dato->ips;
        echo "</td>";
        ////////////
        echo "<td>";
        echo ($dato->p_embarazo =='N' || $dato->p_embarazo =='') ? 'NO': 'SI';
        echo "</td>";
        ////////////
        echo "<td>";
        echo ($dato->nacimiento_exitoso =='2' || $dato->nacimiento_exitoso =='') ? 'NO': 'SI';
        echo "</td>";
      


         ///////////////////////////////////////////////////////////////
        echo "<td>";
        echo ($dato->p_artritis_otras_autoinmunes =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_consumo_de_spa =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_diabetes =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_epoc_asma =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_hipertension =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_patologia_salud_mental =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_tuberculosis_hepatitis_c =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_vih_otras_inmunodeficiencias =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_ninguna =='N') ? 'NO': 'SI';
        echo "</td>";
         ////////////
        echo "<td>";
        echo ($dato->p_otro =='N') ? 'NO': 'SI';
        echo "</td>";



        //////////////////////////////////////////////////////////////////////
        echo "<td>";
        echo ($dato->n_checkbox_vacunacion =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_adultojoven =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_citologia =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_consultaexterna =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_consultapuerperioNG =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_consultapuerperio =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_control =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_crecimiento =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_gestionriesgo =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_medicion =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_planificacion =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_saludoral =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_tcardiovascular =='N') ? 'NO': 'SI';
        echo "</td>";////////////
        echo "<td>";
        echo ($dato->n_checkbox_tdemama =='N') ? 'NO': 'SI';
        echo "</td>";



        //////////////////////////////////////////////////////////////////////


        ////////////
        echo "<td>";
        echo $dato->observacion;
        echo "</td>";////////////
        echo "<td>";
        echo $dato->observacion2;
        echo "</td>";
        echo "<td>";
        echo $dato->responsable;
        echo "</td>";
        
        ////////////777777777777777777777777777777777777777777
        echo "</tr>";
    }

    oci_close($c);
    ?>
</table>