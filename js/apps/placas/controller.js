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
      d3         = require('d3'),
      G          = require('goog!maps,3.17,other_params:sensor=false&region=MX'),
      Municipios = require('data/puebla'),
      Centros    = require('data/centros'),
      Colores    = require('data/colores');

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
      // the data array
      this.cities = [];

      // the bigger cities
      this.big_cities = [];

      // exectute the calc
      this.map_data();

      // colorize :D & assign color values
      this.colorize_svg();

      // create the full list
      this.render_full_list();

      // render the big cities
      this.render_big_cities();
    },

    //
    //
    //
    render_big_cities : function(){
      _.each(this.big_cities, function(city){
        var c = this.collection.findWhere({clave_municipio : city.clave_municipio});
        this.$('#top-ten ol').append('<li><span style="background:' + Colores.color[c.get('level')] +'; display:inline-block; height:1em; width:1em;"></span><em>' + c.get('nombre_municipio') + '</em>: ' + c.get('poblacion') + '</li>');
      }, this);
    },

    //
    //
    //
    render_full_list : function(){
      _.each(this.cities, function(city){
        var c = this.collection.findWhere({clave_municipio : city.clave_municipio});
        this.$('#just-all ol').append('<li style="background:' + Colores.color[c.get('level')] +';">' + c.get('nombre_municipio') + '</li>');
      }, this);
    },

    //
    // P R E P A R E   T H E   D A T A
    // 
    map_data : function(){
      this.collection.each(function(city){
        // get the distance for the nearest office
        city.set({
          distance        : this._get_office(city),
          clave_municipio : Number(city.get('clave_municipio')),
          poblacion       : Number(city.get('poblacion'))
        });
        // create a new collection with the basic data
        this.cities.push(city.pick('clave_municipio', 'nombre_municipio', 'distance'));
        if(city.get('poblacion') > 50000) this.big_cities.push(city.pick('clave_municipio', 'nombre_municipio', 'distance', 'poblacion'));
      }, this);

      // sort
      this.cities.sort(function(a,b){return  a.distance-b.distance});

      // sort bi cities
      this.big_cities.sort(function(a,b){return  b.poblacion-a.poblacion});
    },

    //
    // C O L O R I Z E   T H E   S V G
    //
    colorize_svg : function(){
      // SET THE COLORS ON THE MAP
      var that = this; // cheap trick again
      var states = d3.select('#PUEBLA')
        .selectAll('path')
          .attr('style', function(){
            var id       = Number(this.getAttribute('id'));
            var fill     = '#000';

            try{
              var item     = that.collection.findWhere({clave_municipio : id});
              var distance = item.get('distance');
            
              if(distance < 5){
               fill = Colores.color[9];
               item.set({level : 9});
              }
              else if(distance < 10){
                fill = Colores.color[8];
                item.set({level : 8});
              }

              else if(distance < 20){
                fill = Colores.color[7];
                item.set({level : 7});
              }

              else if(distance < 30){
                fill = Colores.color[6];
                item.set({level : 6});
              }

              else if(distance < 40){
                fill = Colores.color[5];
                item.set({level : 5});
              }

              else if(distance < 50){
                fill = Colores.color[4];
                item.set({level : 4});
              }

              else if(distance < 60){
                fill = Colores.color[3];
                item.set({level : 3});
              }

              else if(distance < 70){
                fill = Colores.color[2];
                item.set({level : 2});
              }

              else if(distance < 80){
                fill = Colores.color[1];
                item.set({level : 1});
              }

              else{
                fill = Colores.color[0];
                item.set({level : 0});
              }
            }
            catch(err){
              // the metropolitan zones doesn't have a valid ID
            }
            return 'fill: ' + fill + '; cursor: pointer';  
        })
    },



    //
    // H E L P E R   F U N C T I O N S
    //
    _get_office : function(city){
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
    //
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

    //
    //
    //
    _deg2rad : function(deg){
      return deg * (Math.PI/180)
    }
  });

  return controller;
});