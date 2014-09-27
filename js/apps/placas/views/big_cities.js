// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas/views
// @file     : big_cities.js
// @author   : Gobierno fácil
// @url      : http://gobiernofacil.com

define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  //
  var Backbone   = require('backbone'),
      d3         = require('d3'),
      G          = require('goog!maps,3.17,other_params:sensor=false&region=MX'),
      Municipios = require('data/puebla'),
      Collection = require('collections/municipios'),
      Big_city   = require('text!templates/big-city.html'),
      Colores    = require('data/colores');

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  //
  var big_cities = Backbone.View.extend({

    //
    // D E F I N E   T H E   E V E N T S
    // 
    events : {
   
    },

    //
    // D E F I N E   T H E   T E M P L A T E S
    // 
    big_city : _.template(Big_city),

    //
    // S E T   T H E   C O N T A I N E R
    //
    el : '#main.placas #top-ten',


    //
    // T H E   I N I T I A L I Z E   F U N C T I O N
    //
    initialize : function(settings){
      // create the city collection
      this.collection            = new Collection();
      this.collection.comparator = function(c){
        return -c.get('poblacion');
      };
      this.collection.add(settings.cities);

      // add the color attribute
      this.collection.each(function(city){
        city.set({
          color : Colores.color[city.get('level')]
        });
      }, this);

      // keep only the biggest
      this.collection.reset(this.collection.slice(0,20));

      // dev
      this.matrix = new google.maps.DistanceMatrixService();
    },

    //
    // R E N D E R
    //
    render : function(){
      this.collection.each(function(city){
        this.$('ol').append(this.big_city(city.attributes));
      }, this);
      return this;
    },

    //
    //
    //
    get_distance : function(id){
      var city        = this.collection.at(id);
      var office      = city.get('office');
      var origin      = new google.maps.LatLng(city.get('lat'), city.get('lng'));
      var destination = new google.maps.LatLng(office.lat, office.lng);
      this.matrix.getDistanceMatrix({
        origins : [origin],
        destinations : [destination],
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status){
        console.log(response.rows[0].elements[0].distance);
        console.log(response.rows[0].elements[0].duration);
      });
    }

  });

  return big_cities;
});