<?php
/* Archivo PHP para enviar correos electr車nicos 
- Configuraci車n de envio con formato recomendado para servidores de correo.
- Previene algunos filtros de spam
- Se recomienda cambiar el Contenido Editable solamente
*/
header('Access-Control-Allow-Origin: http://200.30.93.12:9000');
header('Content-Type: text/html; charset=utf-8');
//************ CONTENIDO EDITABLE ****************//
$destinoCorreo   = $_GET['destinocorreo'];
$destinoNombre  = $_GET['destinonombre'];

$origenCorreo    = "registrogenesis@cajacopieps.com";
$origenNombre  = "Acceso Genesis";

$responderACorreo = 'jachele1@hotmail.com';
$responderANombre = 'Mesa de Ayuda';
$cantidad = "1";
$asunto  = 'Datos acceso Portal Genesis - Cajacopi EPS'; //No debe tener tildes o estar escrito todo en Mayusculas
//Contenido del mensaje en formato HTML:
$mensajeHTML = '<h1>MENSAJE DE PRUEBA</h1>';


//Contenido del mismo mensaje en formato de Texto:
$mensajeTexto = "Prueba";
//************ FIN DE CONTENIDO EDITABLE *********//

//********NO EDITAR *********//
$identificador = md5(uniqid(time()));
$servidorMensaje = $_SERVER['SERVER_NAME'];
$salto="\n";

$encabezados  = "Date :".date('D, j M Y H:i:s O').$salto;
$encabezados .= "From: ".$origenNombre." <".$origenCorreo.">".$salto;
$encabezados .= "Reply-To: ".$responderANombre." <".$responderACorreo.">".$salto;
$encabezados .= "Message-ID: <".$identificador."@".$servidorMensaje.">".$salto;
$encabezados .= "X-Mailer: Aplicacion PHP".$salto;
$encabezados .= "MIME-Version: 1.0".$salto;
$encabezados .= "Content-Type:multipart/alternative;".$salto;
$encabezados .= "\tboundary=\"b1_". $identificador."\"".$salto;
$encabezados .= "Content-Transfer-Encoding: 8bit".$salto;

$mensajeReal = "This is a multi-part message in MIME format.".$salto.$salto;
$mensajeReal.= "--b1_".$identificador.$salto;
$mensajeReal.= "Content-Type: text/plain; charset=utf-8".$salto.$salto;
$mensajeReal.= $mensajeTexto.$salto.$salto;
$mensajeReal.= "--b1_".$identificador.$salto;
$mensajeReal.= "Content-Type: text/html; charset=utf-8".$salto.$salto;
$mensajeReal.= $mensajeHTML.$salto.$salto;
$mensajeReal.= "--b1_".$identificador."--";

$destino=$destinoCorreo;
if($destinoNombre){
        $destino = $destinoNombre." <".$destinoCorreo.">";
}

$enviar = mail($destinoCorreo, $asunto, $mensajeReal, $encabezados);

//************ CONTENIDO EDITABLE ****************//
if($enviar){
    echo "El mensaje fue enviado.";
}else{
    echo $destinocorreo;
    echo "Error al enviar mensaje.";
}
//************ FIN DE CONTENIDO EDITABLE *********//
?>