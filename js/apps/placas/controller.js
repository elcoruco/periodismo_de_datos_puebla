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
      Collection = require('collections/municipios'),
      Big_cities = require('views/big_cities'),
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
      this.collection = new Collection(Municipios.puebla);
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
      this.big_cities_view = new Big_cities({cities : this.collection.toJSON()});

      // render the google map
      // this.render_google_map();
    },

    //
    //
    //
    intento : function(){
      data = [];
      this.collection.each(function(city){
        data.push({
          'gente'     : city.get('poblacion'), 
          'autos'     : city.get('autos_2013'), 
          'IDH'       : city.get('idh'), 
          'distancia' : city.get('ciudad_distance_num')
        });
      }, this);

      data = data.slice(0, 10);

      // console.table(data);
      // THE SVG THING
      var m = [30,10,10,10],
          w = 600 - m[1] - m[3],
          h = 500 - m[0] - m[2];

      var domain = dimensions = ['gente', 'autos', 'IDH', 'distancia'];

      var x = d3.scale.ordinal().domain(domain).rangePoints([0,w], .5),
          y = {};

      var line = d3.svg.line(),
          axis = d3.svg.axis().orient('left'),
          backbround,
          foreground;

      var svg = d3.select('#intento').append('svg')
        .attr('width', w + m[1] + m[3])
        .attr('height', h + m[0] + m[2])
        .append('g')
          .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')');

        _.each(domain, function(el, index){
          y[el] = d3.scale.linear()
            .domain(d3.extent(data, function(d){ return d[el]}))
            .range([h,0]);
        }, this);

        
        background = svg.append('g')
            .attr('class', 'blackground')
          .selectAll('path')
            .data(data)
          .enter().append('path')
            .attr('d', path);
      
        function path(d){
          var m = line(dimensions.map(function(p){
            return [x(p), y[p](d[p])];
          }));
          //console.table(m);
          return m;
        }

    },

    //
    //
    //
    render_big_cities : function(){
      /*
      _.each(this.big_cities, function(city){
        var c = this.collection.findWhere({clave_municipio : city.clave_municipio});
        this.$('#top-ten ol').append('<li><span style="background:' + Colores.color[c.get('level')] +'; display:inline-block; height:1em; width:1em;"></span><em>' + c.get('nombre_municipio') + '</em>: ' + c.get('poblacion') + '</li>');
      }, this);
*/
    },

    //
    // R E N D E R   T H E   C O M P L E T E   C I T Y   L I S T
    //
    render_full_list : function(){
      _.each(this.cities, function(city){
        var c = this.collection.findWhere({clave_municipio : city.clave_municipio});
        this.$('#just-all ol').append('<li style="background:' + Colores.color[c.get('level')] +';">' + c.get('nombre_municipio') + '</li>');
      }, this);
    },

    //
    // R E N D E R   T H E   G O O G L E   M A P
    //
    render_google_map : function(){
      // set the map
      var mapOptions = {
        center      : { lat: 19.015416145324707, lng: -98.15610885620117}, // puebla
        zoom        : 8,
        scrollwheel : false
      };
      var map = new google.maps.Map(document.getElementById('centers-and-big-cities'), mapOptions);

      // put the markers on the offices
      var centers = [];
      var cities  = [];
      var center_color = "ffffff";//"3292e6";

      // RENDER THE OFFICE MARKERS
      this.offices.each(function(center){
        // get a marker with the marker color
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + center_color,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));

        // create the marker
        centers.push(new google.maps.Marker({
          position: new google.maps.LatLng(center.get('lat'),center.get('lng')), 
          map: map,
          icon: pinImage
        }));
      }, this);

      // RENDER THE CITY MARKERS
      _.each(this.big_cities, function(city){
        var c = this.collection.findWhere({clave_municipio : city.clave_municipio});
        var city_color = Colores.colorhex[c.get('level')];
        // get a marker with the marker color
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + city_color,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));

        // create the marker
        cities.push(new google.maps.Marker({
          position: new google.maps.LatLng(c.get('lat'),c.get('lng')), 
          map: map,
          icon: pinImage
        }));
      }, this);
    },

    //
    // P R E P A R E   T H E   D A T A
    // 
    map_data : function(){
      this.collection.each(function(city){
        // create a new collection with the basic data
        this.cities.push(city.pick('clave_municipio', 'nombre_municipio', 'distance'));
        if(city.get('poblacion') > 50000) this.big_cities.push(city.pick('clave_municipio', 'nombre_municipio', 'distance', 'poblacion'));
      }, this);

      // sort
      this.cities.sort(function(a,b){return  a.distance-b.distance});

      // sort by cities
      this.big_cities.sort(function(a,b){return  b.poblacion-a.poblacion});

      this.collection.sort();
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
              fill = Colores.color[item.get('level')];
            }
            catch(err){
              // the metropolitan zones doesn't have a valid ID
            }
            return 'fill: ' + fill + '; cursor: pointer';  
        })
    }
  });

  return controller;
});