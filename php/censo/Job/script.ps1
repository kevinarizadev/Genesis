$url = "https://genesis.cajacopieps.com//php/censo/estancia_pro.php"
$request = [System.Net.WebRequest]::Create("$url")
$request.ContentType='application/json; charset=utf-8'
$request.GetResponse()