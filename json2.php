<?php

include_once('inegi/INEGI_library.php');
$inegi = new INEGI_library();

$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');
$query = $mysqli->query('SELECT * FROM placas_puebla_municipios');

while($row = $query->fetch_assoc()){
  $index     = "1011000057"; // automóviles registrados en circulación
  $localtion = "21" . str_pad($row['clave_municipio'], 3, "0", STR_PAD_LEFT); // todos los municipios de puebla
  $endpoint  = 1; // solo el último valor
  $response  = $inegi->index($index, $localtion, $endpoint);
  $autos     = $response['indices'][0]['OBS_VALUE'];
  $update    = $mysqli->query('UPDATE placas_puebla_municipios SET autos_2013 =' . $autos . ' WHERE id = ' . $row['id']);
}
// EOF