<?php
// Se abre la conexion a la base de datos
//'dbcon_prod.php'
require_once('../config/dbcon_prod.php');

header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=poblacion_total"."_".date("dmY").".xls");
header("Pragma: no-cache");
header("Expires: 0");


$nit = $_GET["nit"];
 $consulta = oci_parse($c,"      SELECT    f.afic_tipo_documento TIPO_DOCUMENTO,
                                           f.afic_documento DOCUMENTO,
                                           f.afic_nombre NOMBRE,
                                           f.afic_telefono CONTACTO
                                 FROM view_eafp c 
                                           inner join  eafi_afiliado f on f.afic_tipo_documento = c.acpc_tipo_doc_afiliado and 
                                           f.afic_documento = c.acpc_afiliado and 
                                           trim ( floor(months_between(sysdate,f.afif_nacimiento)/12)) >= 10 and 
                                           f.afic_estado_afiliado not in ('RE','IN','SU')  
                                 WHERE c.cntv_tercero = :nit and 
                                       c.acpc_clase = 'C'"
				);

           oci_bind_by_name($consulta,':nit',$nit);     


                ?>

                <h1>Reporte de Poblacion total </h1>
                <h3>Nit No : <?php echo $nit?>  </h3>
                
                <table cellspacing="0" cellpadding="0"  border="1" align="center">
               
                <tr>
                
                <th> TIPO_DOCUMENTO</th>
                <th> DOCUMENTO</th>
                <th> NOMBRE</th>
                <th> CONTACTO</th>
          
                
                </tr>
                
                
                
                <?php
                
                oci_execute($consulta);
                
                
                // Se recorre el array con los resultados obtenidos de la base de datos
                while( $rows = oci_fetch_assoc($consulta))
                {
                            echo "<tr>";
                
                                    echo "<td>"; echo$rows['TIPO_DOCUMENTO']; echo "</td>";
                                    echo "<td>"; echo$rows['DOCUMENTO']; echo "</td>";
                                    echo "<td>"; echo$rows['NOMBRE']; echo "</td>";
                                    echo "<td>"; echo$rows['CONTACTO']; echo "</td>";
                               
                
                
                
                
                
                        echo "</tr>";
                 }
                 // Se cierra la conexion a la base de datos para evitar bloqueos
                oci_close($c);
                
                ?>