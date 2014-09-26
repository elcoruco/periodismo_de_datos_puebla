<?php
$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');
$mysqli->set_charset("utf8");
$query = $mysqli->query('SELECT * FROM placas_puebla_municipios');

$response = [];
while($row = $query->fetch_assoc()){
  /*
id               | int(11)      | NO   | PRI | NULL    | auto_increment |
| clave_entidad    | int(11)      | NO   |     | NULL    |                |
| nombre_entidad   | varchar(64)  | NO   |     | NULL    |                |
| clave_municipio  | int(11)      | NO   |     | NULL    |                |
| nombre_municipio | varchar(64)  | NO   |     | NULL    |                |
| clave_inegi      | varchar(5)   | NO   |     | NULL    |                |
| nombre_inegi     | varchar(128) | NO   |     | NULL    |                |
| minx             | float        | NO   |     | NULL    |                |
| miny             | float        | NO   |     | NULL    |                |
| maxx             | float        | NO   |     | NULL    |                |
| maxy             | float        | NO   |     | NULL    |                |
| lat              | double       | NO   |     | NULL    |                |
| lng              | double       | NO   |     | NULL    |                |
| poblacion        | bigint(20)   | NO   |     | NULL    |                |
| autos_2013
  */
  $r = [
    'id'               => (int)$row['id'],
    'clave_entidad'    => (int)$row['clave_entidad'],
    'nombre_entidad'   => $row['nombre_entidad'],
    'clave_municipio'  => (int)$row['clave_municipio'],
    'nombre_municipio' => $row['nombre_municipio'],
    'clave_inegi'      => $row['clave_inegi'],
    'lat'              => (float)$row['lat'],
    'lng'              => (float)$row['lng'],
    'poblacion'        => (int)$row['poblacion'],
    'autos_2013'       => (int)$row['autos_2013'],
  ];
  $response[] = $r;
}
header('Content-type: application/json');
echo json_encode($response);
//EOF