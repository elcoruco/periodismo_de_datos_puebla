<?php
$mysqli   = new mysqli('localhost', 'root', 'root', 'inegi_facil');
$mysqli->set_charset("utf8");
$query    = $mysqli->query('SELECT * FROM placas_puebla WHERE clave_municipio = ' . $_GET['clave_municipio'] . ' AND clave_localidad = 1 LIMIT 1');
$response = mysqli_fetch_array($query);
header('Content-type: application/json');
echo json_encode($response);
//EOF