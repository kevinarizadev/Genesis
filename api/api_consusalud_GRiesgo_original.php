<?php

if (!isset($_SESSION)) {
  session_start();
}
function consultarDatos()
{
  $url = 'http://api.consusalud.co/request/requestConsusalud.php';
  $data = array(
    'departamento' => 'T',
    'municipio' => 'T',
    'fecha_inicio'  => '10/02/2022',
    'fecha_fin'  => '12/02/2022'
  );
  $options = array(
    'http' => array(
      'method'  => 'POST',
      'header'  => "Content-Type: application/json\r\n" . "Authorization:_n52JK3&_h/_eyzpx*3Tkf#?5Z-AigXFcg68nN8EWy%BauJZRnwpeS",
      'content' => json_encode($data)
    )
  );
  $context  = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  // echo($result);
  consultar($result);
  if ($result === FALSE) {
    echo (json_encode(array('Codigo' => '1', 'Nombre' => 'Error, por favor intente nuevamente')));
  }
}

consultarDatos();

function insertarBD($json)
{
  // echo $json;
  require('../php/config/dbcon_login.php');
	$consulta = oci_parse($c, 'begin oasis.PQ_SERVICIO_CONSU.gestion_riesgo_api(:v_json_in_api,:v_json_out_api); end;');
	oci_bind_by_name($consulta,':v_json_in_api',$json);
	$clob = oci_new_descriptor($c, OCI_D_LOB);
	oci_bind_by_name($consulta, ':v_json_out_api', $clob, -1, OCI_B_CLOB);
	oci_execute($consulta, OCI_DEFAULT);
	// if (isset($clob)) {
	// 	$json = $clob->read($clob->size());
	// 	echo $json;
	// } else {
	// 	echo 0;
	// }
	oci_close($c);
}


function consultar($array)
{
  // var_dump(json_decode($array, true));
  // var_dump(json_encode($array, true));
  // echo count($array);
  // var_dump($array);
  // print_r(substr($array, 1));
  // $datos = substr($array,3);
  // $ar = json_decode($datos);
  $ar = json_decode(substr($array,3));
  $cont = 0;
  foreach ($ar as $key) {
    $cont++;
    // var_dump($key);
    // print_r($ar);
    //echo $key->Id_seguimiento;
    $formtFecha = [];
    $formtFecha[] = $key->Fecha_encuesta;
    $dt = new DateTime($formtFecha[0]->date);
    $informa = date_format($dt,"d/m/Y");
    // print_r($informa );
    $data = array(
      'id_seguimiento' => $key->Id_seguimiento,
      'fuente' => $key->FUENTE,
      'fecha_encuesta' => $informa,
      'seccional' => $key->Seccional,
      'municipio' => $key->Municipio,
      'tipo' => $key->{'Tipo doc'},
      'documento' => $key->Documento,
      'nombres_apellidos' => $key->{'Nombres y Apellidos'},
      'genero' => $key->Genero,
      'edad' => $key->Edad,
      'edad_dias' => $key->{'Edad en dias'},
      'nombre_curso' => $key->Nombre_curso,
      'telefono' => $key->Telefono,
      'direccion' => $key->direccion,
      'barrio' => $key->barrio,
      'fecha_nacimiento' => $key->Fecha_nacimiento,
      'email' => $key->Email,
      'ocupacion' => $key->Ocupacion,
      'escolaridad' => $key->Escolaridad,
      'grupo_etnico' => $key->Grupo_Etnico,
      'grupo_poblacional' => $key->Grupo_Poblacional,
      'id_curso' => $key->Id_curso,
      'id_seccional' => $key->Id_seccional,
      'puntaje' => $key->Puntaje,
      'escala_frinsdisc' => $key->Escala_frinsdisc,
      'imc' => $key->IMC,
      'peso' => $key->Peso,
      'altura' => $key->Altura,
      //     
      'viv_1' => $key->{'VIV_Tipo de vivienda'},
      'viv_2' => $key->{'VIV_Vivienda'},
      'viv_3' => $key->{'VIV_Cuantas personas viven en casa'},
      'viv_4' => $key->{'VIV_Cuantas familias viven en casa'},
      'viv_5' => $key->{'VIV_El alumbrado es con'},
      'viv_6' => $key->{'VIV_De donde se toma el agua para el consumo humano'},
      'viv_7' => $key->{'VIV_Disposicion final de basuras'},
      'viv_8' => $key->{'VIV_Duermen mas de 3 personas en una habitacion'},
      'viv_9' => $key->{'VIV_Humo dentro de la vivienda'},
      'viv_10' => $key->{'VIV_El servicio sanitario que utilizan es'},
      'viv_11' => $key->{'VIV_Cuantos animales hay en la vivienda'},
      'viv_12' => $key->{'VIV_Cuantos animales estan vacunados ultimo año'},
      'viv_13' => $key->{'VIV_El agua que utiliza es'},
      'viv_14' => $key->{'VIV_Hay actividad productiva en la vivienda'},
      'viv_15' => $key->{'VIV_Alrededor de la vivienda hay'},
      'viv_16' => $key->{'VIV_Observe en la vivienda si hay'},
      'viv_17' => $key->{'VIV_El material predominante en el piso es'},
      'viv_18' => $key->{'VIV_El material predominante en el techo es'},
      'viv_19' => $key->{'VIV_El material predominante de las paredes es'},
      'viv_20' => $key->{'VIV_Cuales animales'},
      'viv_21' => $key->{'VIV_Cual actividad productiva'},
      //
      'pre_1' => $key->{'PRE_El menor asiste a consulta de Crecimiento y Desarrollo'},
      'pre_2' => $key->{'PRE_Presenta carnet de C y D'},
      'pre_3' => $key->{'PRE_ultimo peso en kilos'},
      'pre_4' => $key->{'PRE_Talla (cm)'},
      'pre_5' => $key->{'PRE_Perimetro Abdominal'},
      'pre_6' => $key->{'PRE_Realiza con regularidad (3 veces por semana) actividad fisica'},
      'pre_7' => $key->{'PRE_Vacunas que presentes en el afiliado'},
      'pre_8' => $key->{'PRE_El afiliado esta al dia con sus vacunas'},
      'pre_9' => $key->{'PRE_Presenta problemas de lenguaje'},
      'pre_10' => $key->{'PRE_Presenta problemas visuales'},
      'pre_11' => $key->{'PRE_Presenta problemas auditivos'},
      'pre_12' => $key->{'PRE_Presenta problemas motores'},
      'pre_13' => $key->{'PRE_Presenta problemas de conducta'},
      'pre_14' => $key->{'PRE_Asistio a valoracion de Agudeza Visual en el ultimo año'},
      'pre_15' => $key->{'PRE_Consulta odontologica (ultimos 6 meses)'},
      'pre_16' => $key->{'PRE_Aplicacion de Barniz de Fluor Ultimos 6 meses'},
      'pre_17' => $key->{'PRE_Aplicacion de Sellantes'},
      // 'pre_17' => $key->{'PRE_Aplicacion de Sellantes'},
      'pre_18' => $key->{'PRE_Control Placa'},
      'pre_19' => $key->{'PRE_Detartraje'},
      'pre_20' => $key->{'PRE_Ha recibido maltrato de alguna persona'},
      'pre_21' => $key->{'PRE_Cual maltrato'},
      'pre_22' => $key->{'PRE_Sintomatico de Piel'},
      'pre_23' => $key->{'PRE_Asiste usted a consulta preconcepcional'},
      'pre_24' => $key->{'PRE_Se encuentra en estado de Embarazo'},
      'pre_25' => $key->{'PRE_Cuantas semanas de gestacion'},
      'pre_26' => $key->{'PRE_Asiste a control prenatal a IPS Nivel'},
      'pre_27' => $key->{'PRE_Cual IPS'},
      'pre_28' => $key->{'PRE_Fecha de Ultima Menstruacion'},
      'pre_29' => $key->{'PRE_Fecha Probable de Parto'},
      'pre_30' => $key->{'PRE_Asiste al  Programa Regalo de Vida'},
      'pre_31' => $key->{'PRE_Edad Gestacional al ingreso del Control Prenatal (semanas)'},
      'pre_32' => $key->{'PRE_Consume usted micronutrientes'},
      'pre_33' => $key->{'PRE_Es usted una gestante de bajo o alto riesgo obstetrico'},
      'pre_34' => $key->{'PRE_Ha presentado alguno de estos sintomas'},
      'pre_35' => $key->{'PRE_Ha sido diagnosticado con Hipertension'},
      'pre_36' => $key->{'PRE_Ha sido diagnosticado con diabetes'},
      'pre_37' => $key->{'PRE_Con que frecuencia consume frutas hortalizas y verduras'},
      'pre_38' => $key->{'PRE_Le han detectado niveles de glucosa( Azucar) en la sangre'},
      'pre_39' => $key->{'PRE_A algun miembro de su familia le han diagnosticado diabetes'},
      'pre_40' => $key->{'PRE_Ha sido diagnosticado con Trigliceridos elevados'},
      'pre_41' => $key->{'PRE_Ha sido diagnosticado con Colesterol elevado'},
      'pre_42' => $key->{'PRE_Ha sido diagnosticado con CANCER'},
      'pre_43' => $key->{'PRE_Ha sido diagnosticado con ERC'},
      'pre_44' => $key->{'PRE_Ha sido usted diagnosticado con EPOC'},
      'pre_45' => $key->{'PRE_Ha sido usted diagnosticado con Asma'},
      'pre_46' => $key->{'PRE_Ha sido diagnosticado con algun tipo de ITS VIH'},
      'pre_47' => $key->{'PRE_Ha sido diagnosticado con Artitis'},
      'pre_48' => $key->{'PRE_Alguna enfermedad autoinmune'},
      'pre_49' => $key->{'PRE_Ha sido diagnosticado conTuberculosis'},
      'pre_50' => $key->{'PRE_Ha sido diagnosticado con Hepatitis'},
      'pre_51' => $key->{'PRE_Ha sido diagnosticado con Hemofilia'},
      'pre_52' => $key->{'PRE_En la actualidad usted esta planificando'},
      'pre_53' => $key->{'PRE_Asiste a controles de Planificacion Familiar'},
      'pre_54' => $key->{'PRE_Se realizo la citologia cervicovaginal el ultimo año'},
      'pre_55' => $key->{'PRE_Fecha de ultima mamografia realizada'},
      'pre_56' => $key->{'PRE_Se realizo autoexamen de seno el ultimo mes'},
      'pre_57' => $key->{'PRE_Asiste usted a algun control de patologia cronica'},
      'pre_58' => $key->{'PRE_En la actualidad usted esta tomando medicamentos'},
      'pre_59' => $key->{'PRE_Toma los medicamentos ordenados por el medico en sus controles como fueron indicados'},
      'pre_60' => $key->{'PRE_Cuando es su proximo control'},
      'pre_61' => $key->{'PRE_Vacunas pendientes en el afiliado'},
      'pre_62' => $key->{'PRE_Sintomatico Respiratorio'},
      'pre_63' => $key->{'PRE_Se ha realizado usted la mamografia'},
      'pre_64' => $key->{'PRE_Peso al nacer (g)'},
      'pre_65' => $key->{'PRE_Perimetro de Cadera'},
      'pre_66' => $key->{'PRE_Tiene carnet de Vacunacion'},
      'pre_67' => $key->{'PRE_Desparasitado en el ultimo año (No Veces)'},
      'pre_68' => $key->{'PRE_Como corrige al menor'},
      'pre_69' => $key->{'PRE_Usted Fuma'},
      'pre_70' => $key->{'PRE_A que edad empezo'},
      'pre_71' => $key->{'PRE_Usted Consume alcohol'},
      'pre_72' => $key->{'PRE_Valor Presion Arterial Sistolica'},
      'pre_73' => $key->{'PRE_Valor Presion Arterial Diastolica'},
      'pre_74' => $key->{'PRE_Motivos para no planificar'},
      'pre_75' => $key->{'PRE_Cuantas veces se cepilla al dia'},
      'pre_76' => $key->{'PRE_Uso de seda Dental'},
      'pre_77' => $key->{'PRE_Usted es fumador pasivo'},
      'pre_78' => $key->{'PRE_Vive con alguien que fuma'},
      'pre_79' => $key->{'PRE_Se ha realizado el examen de prostata'},
      'pre_80' => $key->{'PRE_Se ha realizado el examen de sangre oculta en heces'},
      'pre_81' => $key->{'PRE_Metodos de planificacion'},
      'pre_82' => $key->{'PRE_Como califica usted la encuesta realizada'},
      //
      'dem_1' => $key->{'DEM_Agudeza visual'},
      'dem_2' => $key->{'DEM_Atencion Preconcepcional'},
      'dem_3' => $key->{'DEM_Tamizaje Cancer de Mama'},
      'dem_4' => $key->{'DEM_Cancer de Mama ( Mamografia) Hasta 69 años'},
      'dem_5' => $key->{'DEM_Citologia'},
      'dem_6' => $key->{'DEM_Consulta  Adulto Joven'},
      'dem_7' => $key->{'DEM_Consulta adulto mayor'},
      'dem_8' => $key->{'DEM_Consulta de Posparto'},
      'dem_9' => $key->{'DEM_Consulta del Recien Nacido'},
      'dem_10' => $key->{'DEM_Consulta Integral  Adultez'},
      'dem_11' => $key->{'DEM_Consulta Integral  Infancia'},
      'dem_12' => $key->{'DEM_Consulta Integral Adolescencia'},
      'dem_13' => $key->{'DEM_Consulta Integral Juventud'},
      'dem_14' => $key->{'DEM_Consulta Integral Primera Infancia'},
      'dem_15' => $key->{'DEM_Consulta Integral Vejez'},
      'dem_16' => $key->{'DEM_Control Prenatal'},
      'dem_17' => $key->{'DEM_Crecimiento y Desarrollo'},
      'dem_18' => $key->{'DEM_Examen de Prostata'},
      'dem_19' => $key->{'DEM_Mamografia'},
      'dem_20' => $key->{'DEM_Orientacion a la afiliacion'},
      'dem_21' => $key->{'DEM_Planificacion familiar'},
      'dem_22' => $key->{'DEM_Planificacion familiar Metodo definitivo'},
      'dem_23' => $key->{'DEM_Salud Mental'},
      'dem_24' => $key->{'DEM_Salud Oral'},
      'dem_25' => $key->{'DEM_Salud Oral Valoracion Integral'},
      'dem_26' => $key->{'DEM_Tamizaje para Anemia Hematocrito Hemoglobina'},
      'dem_27' => $key->{'DEM_Tamizaje para Sifilis VIH y Hepatitis'},
      'dem_28' => $key->{'DEM_Tamizaje Riesgo Cardiovascular'},
      'dem_29' => $key->{'DEM_Vacunacion'},
      'dem_30' => $key->{'DEM_Vacunacion contra el Virus del Papiloma Humano'},
      'dem_31' => $key->{'DEM_Vacunacion contra Influenza'},
      'dem_32' => $key->{'DEM_Vacunacion de Mujeres en edad fertil'},
      'dem_33' => $key->{'DEM_Vacunacion segun esquema PAI'},
    );

    // insertarBD(json_encode($data));
    // print_r($informacion);

    // break;

  }
  echo 'proceso terminado - ';
  echo $cont;
}
// consultar();
// print_r($ar);
// $array = 'PRE_Perimetro de\r\n Cadera';
// // $array = str_replace("\r\n","--",$array);
// $arr = str_replace('\r\n', '', $array);
// echo $arr;