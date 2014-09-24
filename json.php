<?php

include_once('inegi/INEGI_library.php');

$inegi = new INEGI_library();

$index = "1011000057";
$localtion = "21000";
$endpoint = 1;
// $response = $inegi->index($index, $localtion, $endpoint);

/*
$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');

$query = $mysqli->query('SELECT * FROM mexico_min WHERE clave_entidad = 21');

$response = [];
while($row = $query->fetch_assoc()){
  $response[] = $row;
}
*/

$centros = [
  [
    'loc' => 'Puebla 1',
    'lat' => 19.032403,
    'lng' => -98.227408
  ],
  [
    'loc' => 'Puebla 2',
    'lat' => 19.0335321,
    'lng' => -98.1868916
  ],
    [
      'loc' => 'Puebla 3',
      'lat' => 19.1021823,
      'lng' => -98.2230604
    ],
    [
      'loc' => 'Puebla 4',
      'lat' => 18.9581052,
      'lng' => -98.2713659
    ],
    [
      'loc' => 'Puebla 5',
      'lat' => 19.071735,
      'lng' => -98.161597
    ],
    [
      'loc' => 'Puebla 6',
      'lat' => 19.0651249,
      'lng' => -98.2124764
    ],
    [
      'loc' => 'Atlixco',
      'lat' => 18.9088721,
      'lng' => -98.4328641
    ],
    [
      'loc' => 'Tehuacán',
      'lat' => 18.4613871,
      'lng' => -97.4191649
    ],
    [
      'loc' => 'Tepeaca',
      'lat' => 18.9631903,
      'lng' => -97.9020527
    ],
    [
      'loc' => 'Izúcar',
      'lat' => 18.603046,
      'lng' => -98.46727
    ],
    [
      'loc' => 'Teziutlán',
      'lat' => 19.8179911,
      'lng' => -97.3612153
    ],
    [
      'loc' => 'Zacatlán',
      'lat' => 19.922872,
      'lng' => -97.962522
    ]
  ];

/*
_get_office : function(city){
      var offices = [];
      var lat1 = Number(city.get('lat'));
      var lng1 = Number(city.get('lng'));

      this.offices.each(function(office){
        var lat2 = office.get('lat');
        var lng2 = office.get('lng');

        offices.push(this._getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2));
      }, this);

      offices.sort(function(a, b){return a-b});

      return offices[0];
    },
*/

$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');
$query  = $mysqli->query('SELECT * FROM placas_puebla');
while($row = $query->fetch_assoc()){
  $distances = [];
  foreach($centros as $centro){
    $lat1 = $centro['lat'];
    $lat2 = $row['lat'];
    $lng1 = $centro['lng'];
    $lng2 = $row['lng'];

    $distances[] = get_distance($lat1,$lon1,$lat2,$lon2);
  }

  $q = $mysqli->query('UPDATE placas_puebla SET distancia_mas_corta =' . min($distances) . 'WHERE id = ' . $row['id']);
}



function get_distance($lat1,$lon1,$lat2,$lon2){
  $R    = 6371;
  $dLat = deg2rad($lat2-$lat1);
  $dLon = deg2rad($lon2-$lon1); 
  $a    = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon/2) * sin($dLon/2); 
  $c    = 2 * atan2(sqrt($a), sqrt(1-$a)); 
  $d    = $R * $c;
  return $d;
}

// echo json_encode($response);
//var_dump($response['indices'][0]['OBS_VALUE']);
echo "<pre>";
var_dump("hello");
echo "</pre>";
// EOF