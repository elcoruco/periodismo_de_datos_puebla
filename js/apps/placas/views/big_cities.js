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

      this.collection.reset(this.collection.slice(0,20));
    },

    //
    // R E N D E R
    //
    render : function(){
      this.collection.each(function(city){
        this.$('ol').append(this.big_city(city.attributes));
      }, this);
      return this;
    }

  });

  return big_cities;
});