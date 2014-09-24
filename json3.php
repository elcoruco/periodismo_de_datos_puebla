<?php



$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');
$query = $mysqli->query('SELECT * FROM placas_puebla_municipios');

/*
while($row = $query->fetch_assoc()){
}
*/
$content = file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?origins=19.032403,-98.227408&destinations=19.26763916015625,-98.42388916015625&key=AIzaSyDZXX_dqYAZ9oLxA28sN5ztg3qNBArk80I");
var_dump($content);
// EOF