<?php
header('Content-type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=Informe Contraloria Covid - " . "_" . date("d_m_Y") . ".xls");
header("Pragma: no-cache");
header("Expires: 0");


// $cod_area = $_GET['cod_area'];
$ubicacion = $_GET['ubicacion'];
$fecha = $_GET['fecha'];
$poblacion_total = $_GET['poblacion_total'];

$poblacion_0_9 = $_GET['poblacion_0_9'];
$poblacion_10_59 = $_GET['poblacion_10_59'];
$poblacion_60 = $_GET['poblacion_60'];
$recurso_contencion = $_GET['recurso_contencion'];
$valor_contencion = $_GET['valor_contencion'];
$recurso_ejecutado = $_GET['recurso_ejecutado'];
$numero_equipos = $_GET['numero_equipos'];
$visitas_domiciliaria = $_GET['visitas_domiciliaria'];
$operadores_atencion = $_GET['operadores_atencion'];
$llamadas_atendidas = $_GET['llamadas_atendidas'];
$llamadas_abandonadas = $_GET['llamadas_abandonadas'];
$muestras_tomadas = $_GET['muestras_tomadas'];
$muestras_positivas = $_GET['muestras_positivas'];
$llamadas_seguimiento = $_GET['llamadas_seguimiento'];
$casos_positivos = $_GET['casos_positivos'];
$casos_sospechosos = $_GET['casos_sospechosos'];
$pacientes_hospitalizados = $_GET['pacientes_hospitalizados'];
$pacientes_fallecidos = $_GET['pacientes_fallecidos'];
$preguntas_no_diligenciadas = $_GET['preguntas_no_diligenciadas'];
$preguntas_no_aplica = $_GET['preguntas_no_aplica'];

// $nombre = $_GET['nombre'];
// $periodo = $_GET['periodo'];
// $imagen = $_GET['imagen'];
?>

<table cellspacing="0" cellpadding="0" border="1" align="center">
    <tr>
        <th style="background-color:yellow !important;">
        <?php echo $ubicacion ?>
        </th>
        <th style="background-color:yellow !important;">CAJA DE COMPENSACION FAMILIAR CAJACOPI </th>
    </tr>
    <?php
    // --
        echo "<tr>";
        echo "<td>";
        echo "CON BASE EN LINEAMIENTO DE MINSALUD REGISTRE LA FECHA DE ACTUALIZACION DEL PLAN DE CONTINGENCIA COVID-19";
        echo "</td>";
        echo "<td>";
        echo $fecha;
        echo "</td>";
        echo "</tr>";




        // --
        echo "<tr>";
        echo "<td>";
        echo "POBLACION TOTAL AFILIADA DE LA EPS";
        echo "</td>";
        echo "<td>";
        echo $poblacion_total;
        echo "</td>";
        echo "</tr>";




    // --
    echo "<tr>";
    echo "<td>";
    echo "POBLACION AFILIADA  DE 0 A 9 ANOS";
    echo "</td>";
    echo "<td>";
    echo $poblacion_0_9;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "POBLACION AFILIADA  DE 10 A 59 ANOS";
    echo "</td>";
    echo "<td>";
    echo $poblacion_10_59;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "POBLACION AFILIADA  MAYOR DE 60 ANOS";
    echo "</td>";
    echo "<td>";
    echo $poblacion_60;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "HA DISPUESTO RECURSO PARA LA CONTENCION DE LA EMERGENCIA  COVID-19";
    echo "</td>";
    echo "<td>";
    echo $recurso_contencion;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "VALOR DISPUESTO PARA LA CONTENCION";
    echo "</td>";
    echo "<td>";
    echo $valor_contencion;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "CUANTO RECURSO HA EJECUTADO DE ESE VALOR";
    echo "</td>";
    echo "<td>";
    echo $recurso_ejecutado;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE EQUIPOS DE ATENCION DOMICILIARIA PROPIOS PARA ATENDER COVID-19";
    echo "</td>";
    echo "<td>";
    echo $numero_equipos;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE VISITAS ATENCION DOMICILIARIA PARA ATENCION COVID-19  DESDE EL 6/MARZO/2020";
    echo "</td>";
    echo "<td>";
    echo $visitas_domiciliaria;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE OPERADORES PARA ATENCION TELEFONICA EN LA EMERGENCIA COVID-19";
    echo "</td>";
    echo "<td>";
    echo $operadores_atencion;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "TOTAL DE LLAMADAS ATENDIDAS EN 24 HORAS";
    echo "</td>";
    echo "<td>";
    echo $llamadas_atendidas;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "TOTAL DE LLAMADAS ABANDONADAS  EN 24 HORAS";
    echo "</td>";
    echo "<td>";
    echo $llamadas_abandonadas;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE MUESTRAS COVID-19 TOMADAS A USUARIOS";
    echo "</td>";
    echo "<td>";
    echo $muestras_tomadas;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE MUESTRAS REPORTADAS COMO POSITIVAS";
    echo "</td>";
    echo "<td>";
    echo $muestras_positivas;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "REALIZA LLAMADAS DE SEGUIMIENTO A PACIENTES COVID-19";
    echo "</td>";
    echo "<td>";
    echo $llamadas_seguimiento;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE CASOS POSITIVOS";
    echo "</td>";
    echo "<td>";
    echo $casos_positivos;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "NUMERO DE CASOS SOSPECHOSOS";
    echo "</td>";
    echo "<td>";
    echo $casos_sospechosos;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "TOTAL DE PACIENTES HOSPITALIZADOS POR COVID -19 DESDE 06/MARZO/2020";
    echo "</td>";
    echo "<td>";
    echo $pacientes_hospitalizados;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "TOTAL DE PACIENTES FALLECIDOS POR COVID -19 DESDE 06/MARZO/2020";
    echo "</td>";
    echo "<td>";
    echo $pacientes_fallecidos;
    echo "</td>";
    echo "</tr>";


    // --
    echo "<tr>";
    echo "<td>";
    echo "CUALES DE LAS ANTERIORES PREGUNTAS NO PUDO DILIGENCIAR PORQUE LA ENTIDAD NO ENTREGO LA INFORMACION ?";
    echo "</td>";
    echo "<td>";
    echo $preguntas_no_diligenciadas;
    echo "</td>";
    echo "</tr>";

    // --
    echo "<tr>";
    echo "<td>";
    echo "CUALES DE LAS ANTERIORES PREGUNTAS NO APLICA ";
    echo "</td>";
    echo "<td>";
    echo $preguntas_no_aplica;
    echo "</td>";
    echo "</tr>";





    



    ?>