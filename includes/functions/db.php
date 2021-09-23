<?php 

// Crear las credenciales para la conexión a la base de datos
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('DB_NAME', 'schedule-app');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

?>