<?php

require_once('./handler.php');
require_once('./config.php');
require_once('./routes.php');

$route = explode('?', explode('/php/girs/api.php', $_SERVER['REQUEST_URI'])[1])[0];
$method = strtolower($_SERVER['REQUEST_METHOD']);

spl_autoload_register(function ($className) {
	if (file_exists('./controllers/' . $className . '.php')) {
		require_once('./controllers/' . $className . '.php');
	}
});

if (isset($routes[$route][$method])) {
	require_once('./utils.php');
	$contentType = $_SERVER['CONTENT_TYPE'];
	if (strpos($contentType, 'application/json') !== false) {
		$instance = new $routes[$route][$method][0];
		$instance->{$routes[$route][$method][1]}([
			'get' => $_GET,
			'post' =>  json_decode(file_get_contents('php://input'), true)
		]);
	} else {
		$instance = new $routes[$route][$method][0];
		$instance->{$routes[$route][$method][1]}([
			'get' => $_GET,
			'post' =>  $_POST
		]);
	}	
} else {
	http_response_code(404);
	header('content-type: application/json');
	echo json_encode([
		'error' => [
			'message' => 'Route not found'
		]
	]);
}