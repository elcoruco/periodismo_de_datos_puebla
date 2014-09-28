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
      Big_city   = require('text!templates/svg-map-description.html'),

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
    initialize : function(){
   
    },

    //
    // R E N D E R
    //
    render : function(){
      // SET THE COLORS ON THE MAP
      var that = this; // cheap trick again
      var states = d3.select('#PUEBLA')
        .selectAll('path')
          .attr('style', function(){
            var id       = Number(this.getAttribute('id'));
            var fill     = '#000';

            try{
              var item     = that.collection.findWhere({clave_municipio : id});
              fill = Colores.color[item.get('level')];
            }
            catch(err){
              // the metropolitan zones doesn't have a valid ID
            }
            return 'fill: ' + fill + '; cursor: pointer';  
          })
        }
      }
    });
  return big_cities;
});