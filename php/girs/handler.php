<?php

set_error_handler('warning_handler', E_WARNING);

function warning_handler($errno, $errstr) {
	http_response_code(500);
	echo json_encode([
		'error' => [
			'message' => $errstr,
			'no' => $errno
		]
	]);
	exit();
}