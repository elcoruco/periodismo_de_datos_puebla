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
        duration_num     : false
      };
    },

    //
    //
    //
    get_distance : function(){
      var city        = this;_
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
    }
  });

  return municipio;
});