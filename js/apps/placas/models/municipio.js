// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas/models/
// @file     : municipio.js
// @author   : Gobierno fácil
// @url      : http://gobiernofacil.com
// @twitter  : @gobiernofacil

define(function(require){

  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  //
  var Backbone = require('backbone');

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   M O D E L
  //
  var municipio = Backbone.Model.extend({
    

    initialize : function(){

    },

    defaults : function(){
      return {
        // DATOS DEL MUNICIPIO
        autos_2013       : false,
        clave_entidad    : false,
        clave_inegi      : false,
        clave_municipio  : false,
        distance         : false,
        id               : false,
        lat              : false,
        level            : false,
        lng              : false,
        nombre_entidad   : false,
        nombre_municipio : false,
        poblacion        : false,
        office           : false,
        distance_text    : false,
        distance_num     : false,
        duration_text    : false,
        duration_num     : false,

        // DATOS DE LA CIUDAD
        ciudad_altitud   : false,
        ciudad_ambito    : false, 
        ciudad_lat       : false,
        ciudad_lng       : false,
        ciudad_hombres   : false,
        ciudad_mujeres   : false,
        ciudad_poblacion : false,
        ciudad_viviendas : false,
        ciudad_distance_text : false,
        ciudad_distance_num  : false,
        ciudad_duration_text : false,
        ciudad_duration_num  : false,
      };
    },

    //
    //
    //
    get_distance : function(){
      var city        = this;
      var office      = this.get('office');
      var origin      = new google.maps.LatLng(city.get('lat'), city.get('lng'));
      var destination = new google.maps.LatLng(office.lat, office.lng);
      var matrix      = new google.maps.DistanceMatrixService();
      matrix.getDistanceMatrix({
        origins : [origin],
        destinations : [destination],
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status){
        city.set({
          distance_text : response.rows[0].elements[0].distance.text,
          distance_num  : response.rows[0].elements[0].distance.value,
          duration_text : response.rows[0].elements[0].duration.text,
          duration_num  : response.rows[0].elements[0].duration.value
        });
      });
    },

    //
    //
    //
    get_city_distance : function(){
      var city        = this;
      var office      = this.get('office');
      var origin      = new google.maps.LatLng(city.get('ciudad_lat'), city.get('ciudad_lng'));
      var destination = new google.maps.LatLng(office.lat, office.lng);
      var matrix      = new google.maps.DistanceMatrixService();
      matrix.getDistanceMatrix({
        origins : [origin],
        destinations : [destination],
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status){
        try{
            city.set({
            ciudad_distance_text : response.rows[0].elements[0].distance.text,
            ciudad_distance_num  : response.rows[0].elements[0].distance.value,
            ciudad_duration_text : response.rows[0].elements[0].duration.text,
            ciudad_duration_num  : response.rows[0].elements[0].duration.value
          });
        }
        catch(e){
          console.log(e, city.get('nombre_municipio'));
        }
        

      });
    },

    //
    //
    //
    get_idh : function(){
      var base = "/municipio.php";
      var that = this;
      $.get(base, {id : that.get('id')}, function(data){
        try{
          that.set({idh : Number(data.idh)});
        }
        catch(e){
          console.log(e);
        }
        
      }, 'json');
    },

    //
    //
    //
    get_main_city : function(){
      var base = "/municipio2.php";
      var that = this;
      $.get(base, {clave_municipio : that.get('clave_municipio')}, function(data){
        try{
          that.set({
            ciudad_altitud   : Number(data.altitud),
            ciudad_ambito    : data.ambito, 
            ciudad_lat       : Number(data.lat),
            ciudad_lng       : Number(data.lng),
            ciudad_hombres   : Number(data.poblacion_masculina),
            ciudad_mujeres   : Number(data.poblacion_femenina),
            ciudad_poblacion : Number(data.poblacion_total),
            ciudad_viviendas : Number(data.viviendas_habitadas)
          });
        }
        catch(e){
          console.log(e);
        }
        
      }, 'json');
    }
  });

  return municipio;
});