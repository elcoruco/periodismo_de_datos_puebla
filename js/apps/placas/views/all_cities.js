// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas/views
// @file     : all_cities.js
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
      City       = require('text!templates/big-city.html'),
      Colores    = require('data/colores');

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  //
  var all_cities = Backbone.View.extend({

    //
    // D E F I N E   T H E   E V E N T S
    // 
    events : {
   
    },

    //
    // D E F I N E   T H E   T E M P L A T E S
    // 
    any_city : _.template(City),

    //
    // S E T   T H E   C O N T A I N E R
    //
    el : '#main.placas #just-all',


    //
    // T H E   I N I T I A L I Z E   F U N C T I O N
    //
    initialize : function(){
      this.collection = this.collection.clone();
      this.collection.comparator = 'ciudad_distance_num';
      this.collection.sort();
    },

    //
    // R E N D E R
    //
    render : function(){
      this.collection.each(function(city){
        var comma = d3.format(',');
        city.set({
          poblacion  : comma(city.get('poblacion')),
          autos_2013 : comma(city.get('autos_2013'))
        });
        this.$('thead').append(this.any_city(city.attributes));
      }, this);
      return this;
    }
  });

  return all_cities;
});