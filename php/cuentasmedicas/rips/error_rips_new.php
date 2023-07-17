<?php
if (isset($_POST['archivo']) && isset($_POST['recibo'])) {
    $archivo = json_decode($_POST['archivo']);
    $recibo = $_POST['recibo'];
} else {
    $archivo = array();
    $recibo = "";
}
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Listado de Errores ".$recibo." (".date("d-m-Y").").xls");
header("Pragma: no-cache");
header("Expires: 0");
?>

<h3>ERRORES DE ESTRUCTURA DEL RECIBO <?php echo($recibo)." (".date("d-m-Y").")"; ?></h3>
<table cellspacing="0" cellpadding="0"   border="1" align="center">
    <tr>
        <th align='center'>ARCHIVO</th>
        <th align='center'>DATO</th>
        <th align='center'>MENSAJE</th>
        <th align='center'>FILA</th>
        <th align='center'>COLUMNA</th> 
        <th align='center'>VALOR</th>     
    </tr>
    <?php
    for ($i = 0; $i < count($archivo); ++$i){
        echo "<tr>";
            echo "<td align='center'>"; echo $archivo[$i]->archivo; echo "</td>";
            echo "<td align='left'>"; echo utf8_decode($archivo[$i]->dato); echo "</td>";
            echo "<td align='left'>"; echo utf8_decode($archivo[$i]->mensaje); echo "</td>";
            echo "<td align='center'>"; echo $archivo[$i]->fila; echo "</td>";
            echo "<td align='center'>"; echo $archivo[$i]->columna; echo "</td>";
            echo "<td align='left'>"; echo $archivo[$i]->valor; echo "</td>";
        echo "</tr>";
    }
    print_r(error_get_last());
    ?>