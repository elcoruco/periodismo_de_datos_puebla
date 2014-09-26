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
        office           : false
      };
    }
  });

  return municipio;
});