<?php 
$path = $_GET['ruta'];
$nombre = substr($path, 41);
if (is_file($path)) {
	header("Content-disposition: attachment; filename=$nombre");
	header("Content-type: MIME");
	readfile($path);
}else{
	header("location:../404.html");
}
?>