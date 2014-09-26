// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas/collections/
// @file     : municipios.js
// @author   : Gobierno fácil
// @url      : http://gobiernofacil.com
// @twitter  : @gobiernofacil


define(function(require){
  //
  //  L O A D   T H E   A S S E T S
  //
  var Backbone = require("backbone"),
      Municipio = require("models/municipio");
  
  var municipios = Backbone.Collection.extend({
    
    //
    //  D E F I N E   T H E   M O D E L   T Y P E
    //
    model : Municipio,

    //
    //  D E F I N E   T H E   M O D E L   O R D E R
    //
    comparator : 'distance',

    //
    //  T H E   I N I T I A L I Z E   F U N C T I O N
    //
    initialize : function(settings){
   
    },

    //
    //  T H E   U R L   F U N C T I O N
    //
    url : function(){
      return "/distance_matrix";
    },

    //
    //  P A R S E   T H E   R E S P O N S E
    /*
    parse : function(response, options){
      // return response.data;
    }
    */
  });

  return municipios;
});