<?php
require_once('../../config/dbcon.php');
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Matriz  de generacion completa"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");

$periodo = $_GET['periodo'];

$consulta = oci_parse ($c,"SELECT x.PER_CAPITACION,  
substr( x.num_causacion,'1','2') COD_DEPARTAMENTO,  
replace(l.ubgc_nombre,'SECCIONAL','')  NOM_DEPARTAMENTO  ,
substr( x.num_causacion,'3','5') COD_MUNICIPIO ,
k.ubgc_nombre NOM_CIUDAD  ,
x.NIT_PRESTADOR, 
x.TIP_REGIMEN ,
x.NUM_CONTRATO , 
x.COD_CENTROCOSTOS,  
x.TIP_NATURALEZA  ,
x.NOM_PRESTADOR ,
x.TIP_SERVICIO  ,
x.NOM_SERVICIO  ,
x.NUM_AFILCONTRA , 
x.NUM_AFILIADOS ,
x.POR_CAPITACION , 
x.VAL_UPCAFILIADO ,
x.VAL_CAPITACIONMES ,
x.DES_ESFPROPIO ,
x.DES_RETROACTIVO, 
x.DES_HOMONIMO  ,
x.DES_INCUMPLIMIENTO  ,
x.DES_NORADICACION  ,
x.DES_RECOBROS  ,
x.DES_AJUSTE  ,
x.OTROS_PAGOS ,
x.VAL_CAPITACIONMESFINAL,  
x.OBSERVACIONES ,
nvl(o.num_dias,'0') NUM_DIAS
from oasis.capitacionmes x
left join oasis.capitacionmes_rh o on o.per_capitacion =  x.per_capitacion and
                                       o.num_contrato = x.num_contrato 
                                       
 inner join bubg_ubicacion_geografica k on k.ubgn_codigo= num_causacion
 inner join bubg_ubicacion_geografica l on l.ubgn_codigo =  substr( x.num_causacion,'1','2')
 where x.per_capitacion = :v_periodo");

oci_bind_by_name($consulta,':v_periodo',$periodo);

?>


<table cellspacing="0" cellpadding="0"  border="1" align="center">
<!--// Aqui va el encabezado del reporte, reemplazar solo los nombres de las columnas-->
    <tr>
        <th align='center'>PER_CAPITACION</th>
        <th align='center'>COD_DEPARTAMENTO</th>        
        <th align='center'>NOM_DEPARTAMENTO</th>  
        <th align='center'>COD_MUNICIPIO</th>        
        <th align='center'>NOM_CIUDAD</th>        
        <th align='center'>NIT_PRESTADOR</th>
        <th align='center'>TIP_REGIMEN</th>
        <th align='center'>NUM_CONTRATO</th>        
        <th align='center'>COD_CENTROCOSTOS</th>
        <th align='center'>TIP_NATURALEZA</th>        
        <th align='center'>NOM_PRESTADOR</th>
        <th align='center'>TIP_SERVICIO</th>
        <th align='center'>NOM_SERVICIO</th>        
        <th align='center'>NUM_AFILCONTRA</th>        
        <th align='center'>NUM_AFILIADOS</th>        
        <th align='center'>POR_CAPITACION</th>        
        <th align='center'>VAL_UPCAFILIADO</th> 
        <th align='center'>VAL_CAPITACIONMES</th>        
        <th align='center'>DES_ESFPROPIO</th>        
        <th align='center'>DES_RETROACTIVO</th>        
        <th align='center'>DES_HOMONIMO</th>        
        <th align='center'>DES_INCUMPLIMIENTO</th>        
        <th align='center'>DES_NORADICACION</th>        
        <th align='center'>DES_RECOBROS</th>        
        <th align='center'>DES_AJUSTE</th>        
        <th align='center'>OTROS_PAGOS</th>        
        <th align='center'>VAL_CAPITACIONMESFINAL</th>        
        <th align='center'>OBSERVACIONES</th>        
        <th align='center'>NUM_DIAS</th>        
    </tr>

<?php
oci_execute($consulta);
// Se recorre el array con los resultados obtenidos de la base de datos
while( $rows = oci_fetch_assoc($consulta)) {
    echo "<tr>";
            echo "<td align='center'>"; echo$rows['PER_CAPITACION']; echo "</td>";
            echo "<td align='center'>"; echo$rows['COD_DEPARTAMENTO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_DEPARTAMENTO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['COD_MUNICIPIO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_CIUDAD']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NIT_PRESTADOR']; echo "</td>";
            echo "<td align='center'>"; echo$rows['TIP_REGIMEN']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NUM_CONTRATO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['COD_CENTROCOSTOS']; echo "</td>";
            echo "<td align='center'>"; echo$rows['TIP_NATURALEZA']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_PRESTADOR']; echo "</td>";
            echo "<td align='center'>"; echo$rows['TIP_SERVICIO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NOM_SERVICIO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NUM_AFILCONTRA']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NUM_AFILIADOS']; echo "</td>";
            echo "<td align='center'>"; echo$rows['POR_CAPITACION']; echo "</td>";
            echo "<td align='center'>"; echo$rows['VAL_UPCAFILIADO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['VAL_CAPITACIONMES']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_ESFPROPIO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_RETROACTIVO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_HOMONIMO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_INCUMPLIMIENTO']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_NORADICACION']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_RECOBROS']; echo "</td>";
            echo "<td align='center'>"; echo$rows['DES_AJUSTE']; echo "</td>";
            echo "<td align='center'>"; echo$rows['OTROS_PAGOS']; echo "</td>";
            echo "<td align='center'>"; echo$rows['VAL_CAPITACIONMESFINAL']; echo "</td>";
            echo "<td align='center'>"; echo$rows['OBSERVACIONES']; echo "</td>";
            echo "<td align='center'>"; echo$rows['NUM_DIAS']; echo "</td>";

            


    echo "</tr>";
}

print_r(error_get_last());

oci_close($c);

?>
