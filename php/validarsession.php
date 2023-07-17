<?php
session_start();
if (array_key_exists('usu', $_SESSION)) {
    echo '{"codigo": "1","mensaje":"Session activa"}';
} else {
    echo '{"codigo": "0","mensaje":"Session vencida"}';
}
?>
