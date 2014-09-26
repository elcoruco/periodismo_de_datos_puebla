<?php

// THE VERIFICATION CENTERS
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

// CREATE THE RESPONSE
$mysqli = new mysqli('localhost', 'root', 'root', 'inegi_facil');
$query = $mysqli->query('SELECT * FROM placas_puebla_municipios LIMIT 5');

$response = [];
$endpoint = 'https://maps.googleapis.com/maps/api/distancematrix/json';

while($row = $query->fetch_assoc()){
  // CREATE THE URL 
  // the city geolocation
  $origins = $row['lat'] . ',' . $row['lng'];
  // the offices location
  $destinations = [];
  foreach($centros AS $centro){
    $destinations[] = $centro['lat'] . ',' . $centro['lng']; 
  }

  $data = ['key' =>'AIzaSyDZXX_dqYAZ9oLxA28sN5ztg3qNBArk80I', 'origins' => $origins, 'destinations' => implode('|', $destinations)];
  $settings = http_build_query($data);
  $url = $endpoint . '?' . $settings;
  $response[] = file_get_contents($url);
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
<?php
  var_dump($response);
?>
</body>
</html>