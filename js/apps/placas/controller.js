// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas
// @file     : controller.js
// @author   : Gobierno fácil
// @url      : http://gobiernofacil.com
// @twitter  : @gobiernofacil


define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  //
  var Backbone   = require('backbone'),
      G          = require('goog!maps,3.17,other_params:sensor=false&region=MX'),
      Municipios = require('data/puebla'),
      Centros    = require('data/centros');

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  //
  var controller = Backbone.View.extend({

    //
    // D E F I N E   T H E   E V E N T S
    // 
    events : {
      
    },

    //
    // D E F I N E   T H E   T E M P L A T E S
    // 

    //
    // S E T   T H E   C O N T A I N E R
    //
    el : "#main.placas",


    //
    // T H E   I N I T I A L I Z E   F U N C T I O N
    //
    initialize : function(){
      // city collection
      this.collection = new Backbone.Collection(Municipios.puebla);
      // offices collection
      this.offices = new Backbone.Collection(Centros.centros);

      // exectute the calc
      this.map_data();

      // sort the collection
      var cities = [];
      // map the values
      this.collection.each(function(c){
        cities.push(c.pick('nombre_municipio', 'distance'));
      }, this);
      // sort
      cities.sort(function(a,b){return  a.distance-b.distance});
    },

    map_data : function(){
      this.collection.each(function(city){
        city.set({
          distance : this.get_office(city)
        });
      }, this);
    },

    get_office : function(city){
      var offices = [];
      var lat1 = Number(city.get('lat'));
      var lng1 = Number(city.get('lng'));

      this.offices.each(function(office){
        var lat2 = office.get('lat');
        var lng2 = office.get('lng');

        offices.push(this._getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2));
      }, this);

      offices.sort(function(a, b){return a-b});

      return offices[0];
    },

    //
    // H E L P E R   F U N C T I O N S
    // http://goo.gl/6jq8AJ
    _getDistanceFromLatLonInKm : function(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = this._deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this._deg2rad(lon2-lon1); 
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    },

    _deg2rad : function(deg){
      return deg * (Math.PI/180)
    }
  });

  return controller;
});