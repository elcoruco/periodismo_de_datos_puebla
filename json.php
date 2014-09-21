<?php

$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');

$query = $mysqli->query('SELECT * FROM mexico_min WHERE clave_entidad = 21');

$response = [];
while($row = $query->fetch_assoc()){
  $response[] = $row;
}

echo json_encode($response);
// EOF