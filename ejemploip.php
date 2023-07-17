<!DOCTYPE html>
<html>
<head>
	<title>UserInfo Demo</title>
	<style>
table {
	margin-top: 20px;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
h2{font-family: sans-serif,'Helvetica';}
</style>

</head>
<body>
<center><h2>UserInfo demo</h2></center>


	
<?php 
	
	$text = shell_exec('ipconfig');

	echo $text;

	//$dato = explode(". . . . . . . . . . . . . . :", $text);

	//$datos1 = $dato[1];

	//$dato2 = explode(" M", $datos1);
			
	// var_dump ($dato2);
	//echo $dato2[0];
		
?>
	

</body>
</html>