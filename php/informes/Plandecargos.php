<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');
// Propiedades del documentos para que la tabla sea descargadad
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Plan de Cargo"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


//header("Content-Type: text/plain");

//header('Content-Disposition: attachment; filename="REPORTE_INCAPACIDADES.txt"');
//Parametros recibidos por la url: ejemplo: http://localhost/reportes_salud/suf16.php?fecha_inicio=01/01/2017&fecha_final=01/08/2017&Prestador=900719048

//Aqui va la consulta y/o procedimiento a ser ejecutado en la base de datos. Los parametros van con :nombreparametro
 $consulta = oci_parse($c,"SELECT C.*, ''otros_auxilios,
       CASE WHEN C.tipo_contrato = 'MISION' THEN ((C.IBC+C.aux_transporte+C.cesantias+C.int_cesantias+C.primas+C.vacaciones+C.seguridad_social+C.parafiscales)*8/100)
            ELSE 0 END administración,
       round(((C.IBC+C.aux_transporte+C.cesantias+C.int_cesantias+C.primas+C.vacaciones+C.seguridad_social+C.parafiscales))+
            (((C.IBC+C.aux_transporte+C.cesantias+C.int_cesantias+C.primas+C.vacaciones+C.seguridad_social+C.parafiscales)*8/100))) valor_total_proyectado
       FROM VIEW_R_PLAN_DE_CARGOS C ");
// // Se pasan las variables asignadas arriba :nombreparametro con la variable asignada al comienzo $fecha_inicio

?>

<h1>PLAN DE CARGOS </h1>
<h3>Periodo:  </h3>


<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->

      <tr>

            <th> TIPO_DOCUMENTO</th>
            <th> DOCUMENTO</th>
            <th> TERC_NOMBRE</th>
            <th> FUENTE</th>
            <th> SEXO</th>
            <th> FECHA_NACIMIENTO</th>
            <th> TIPO_CONTRATO</th>
            <th> EMPLEADOR</th>
            <th> CARGO</th>
            <th> SECCIONAL</th>
            <th> OFICINA</th>
            <th> UNIDAD_ESTRATEGICA</th>
            <th> UNIDAD_FUNCIONAL</th>
            <th> CARGO_A</th>
            <th> FECHA_INGRESO</th>
            <th> FECHA_RETIRO</th>
            <th> MOTIVO_NOVEDAD</th>
            <th> DIAS_LAB</th>
            <th> CARGO_A_REGIMEN</th>
            <th> TIPO_SALARIO</th>
            <th> RANGO_SALARIAL</th>
            <th> SALARIO</th>
            <th> AUX_TRANSPORTE</th>
            <th> IBC</th>
            <th> CESANTIAS</th>
            <th> INT_CESANTIAS</th>
            <th> PRIMAS</th>
            <th> VACACIONES</th>
            <th> SEGURIDAD_SOCIAL</th>
            <th> PARAFISCALES</th>
            <th> ESTADO_EMPLEADO</th>
            <th> OTROS_AUXILIOS</th>
            <th> ADMINISTRACIÓN</th>
            <th> VALOR_TOTAL_PROYECTADO</th>

      </tr>

<?php

oci_execute($consulta);


// Se recorre el array con los resultados obtenidos de la base de datos
 while( $rows = oci_fetch_assoc($consulta))
 {
	        echo "<tr>";

                      echo "<td>"; echo$rows['TIPO_DOCUMENTO']; echo "</td>";
                      echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
                      echo "<td>"; echo$rows['TERC_NOMBRE']; echo "</td>";
                      echo "<td>"; echo$rows['FUENTE']; echo "</td>";
                      echo "<td>"; echo$rows['SEXO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_NACIMIENTO']; echo "</td>";
                      echo "<td>"; echo$rows['TIPO_CONTRATO']; echo "</td>";
                      echo "<td>"; echo$rows['EMPLEADOR']; echo "</td>";
                      echo "<td>"; echo$rows['CARGO']; echo "</td>";
                      echo "<td>"; echo$rows['SECCIONAL']; echo "</td>";
                      echo "<td>"; echo$rows['OFICINA']; echo "</td>";
                      echo "<td>"; echo$rows['UNIDAD_ESTRATEGICA']; echo "</td>";
                      echo "<td>"; echo$rows['UNIDAD_FUNCIONAL']; echo "</td>";
                      echo "<td>"; echo$rows['CARGO_A']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_INGRESO']; echo "</td>";
                      echo "<td>"; echo$rows['FECHA_RETIRO']; echo "</td>";
                      echo "<td>"; echo$rows['MOTIVO_NOVEDAD']; echo "</td>";
                      echo "<td>"; echo$rows['DIAS_LAB']; echo "</td>";
                      echo "<td>"; echo$rows['CARGO_A_REGIMEN']; echo "</td>";
                      echo "<td>"; echo$rows['TIPO_SALARIO']; echo "</td>";
                      echo "<td>"; echo$rows['RANGO_SALARIAL']; echo "</td>";
                      echo "<td>"; echo$rows['SALARIO']; echo "</td>";
                      echo "<td>"; echo$rows['AUX_TRANSPORTE']; echo "</td>";
                      echo "<td>"; echo$rows['IBC']; echo "</td>";
                      echo "<td>"; echo$rows['CESANTIAS']; echo "</td>";
                      echo "<td>"; echo$rows['INT_CESANTIAS']; echo "</td>";
                      echo "<td>"; echo$rows['PRIMAS']; echo "</td>";
                      echo "<td>"; echo$rows['VACACIONES']; echo "</td>";
                      echo "<td>"; echo$rows['SEGURIDAD_SOCIAL']; echo "</td>";
                      echo "<td>"; echo$rows['PARAFISCALES']; echo "</td>";
                      echo "<td>"; echo$rows['ESTADO_EMPLEADO']; echo "</td>";
                      echo "<td>"; echo$rows['OTROS_AUXILIOS']; echo "</td>";
                      echo "<td>"; echo$rows['ADMINISTRACIÓN']; echo "</td>";
                      echo "<td>"; echo$rows['VALOR_TOTAL_PROYECTADO']; echo "</td>";



        echo "</tr>";
 }
//  // Se cierra la conexion a la base de datos para evitar bloqueos
oci_close($c);

?>
