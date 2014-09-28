// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas/views
// @file     : worst_cities.js
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
      Worst_city = require('text!templates/big-city.html'),
      Colores    = require('data/colores');

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  //
  var worst_cities = Backbone.View.extend({

    //
    // D E F I N E   T H E   E V E N T S
    // 
    events : {
   
    },

    //
    // D E F I N E   T H E   T E M P L A T E S
    // 
    worst_city : _.template(Worst_city),

    //
    // S E T   T H E   C O N T A I N E R
    //
    el : '#main.placas #worst-ten',


    //
    // T H E   I N I T I A L I Z E   F U N C T I O N
    //
    initialize : function(){
      this.collection = this.collection.clone();
      this.collection.comparator = 'idh';
      this.collection.sort();
    },

    //
    // R E N D E R
    //
    render : function(){
      var items = this.collection.slice(6, 20);
      _.each(items, function(city){
        var comma = d3.format(',');
        city.set({
          poblacion  : comma(city.get('poblacion')),
          autos_2013 : comma(city.get('autos_2013'))
        });
        this.$('thead').append(this.worst_city(city.attributes));
      }, this);
      return this;
    }
  });

  return worst_cities;
});