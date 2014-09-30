// PINCHES PLACAS APP
// @package  : placas
// @location : /js/apps/placas/views
// @file     : svg_map.js
// @author   : Gobierno fácil
// @url      : http://gobiernofacil.com

define(function(require){
  //
  // L O A D   T H E   A S S E T S   A N D   L I B R A R I E S
  //
  var Backbone   = require('backbone'),
      d3         = require('d3'),
      Colores    = require('data/colores'),
      Display    = require('text!templates/svg-map-description.html');

  //
  // I N I T I A L I Z E   T H E   B A C K B O N E   V I E W
  //
  var svg_map = Backbone.View.extend({

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
    el : '#main.placas #base-map',


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
            var id   = Number(this.getAttribute('id'));
            var fill = '#000';

            try{
              var item = that.collection.findWhere({clave_municipio : id});
              fill     = Colores.color[item.get('level')];
            }
            catch(err){
              // the metropolitan zones doesn't have a valid ID
            }
            return 'fill: ' + fill + '; cursor: pointer';  
          })
       
       // SHOW THE STATE LABEL ON MOUSEOVER
        .on('mouseover', function(){
          var bb = this.getBBox(),
              id = Number(this.getAttribute('id')),
              d  = that.collection.findWhere({clave_municipio : id}),
              y  = bb.y + (bb.height/2)
              x  = bb.x + (bb.width/2);


         // remove the previous labels
          d3.selectAll('#PUEBLA text').remove();
          d3.selectAll('#PUEBLA rect').remove();
		  
          
          // esto es solo para calcular ancho
		  d3.select('#PUEBLA') 
            .append("text")
            	.attr('id','el_hover')
				.text(d.get("nombre_municipio"))
				.attr("x", (x +5))
                .attr("y", (y +15))
				.append("tspan")
					.attr("x", (x+5))
              		.attr("y", (y+10))
			  		.text('Distancia: ' + d.get("ciudad_distance_text"))
			  	
			  	.append("tspan")
              		.attr("x", (x+5))
              		.attr("y", (y+40))
			  		.attr('dy', '1.5em')
			  		.text('Tiempo: ' + d.get("ciudad_duration_text"))
			  	.append("tspan")
              		.attr("x", (x+5))
              		.attr("y", (y+40))
			  		.attr('dy', '1.5em')
			  		.text('Autos: ' + d.get("autos_2013"))

          
          var widthS = document.getElementById('el_hover').offsetWidth;
		  //elimina text trazado solo para calcular
		  d3.selectAll('#PUEBLA text').remove();
          
          
          //agrega rectángulo    		
          d3.select('#PUEBLA')
          	.append("rect")
          		.attr("width", widthS + 10)
                .attr("height", 110)
             	.attr("x", (x))
                .attr("y", y)
                .attr('fill', '#282827')
                .attr('fill-opacity', 0.8);
                
           //agrega texto sobre rectángulo 
           d3.select('#PUEBLA') 
            .append("text")
				.text(d.get("nombre_municipio"))
				.attr("x", (x +5))
                .attr("y", (y +25))
				.append("tspan")
              		.attr("x", (x+5))
              		.attr("y", (y+20))
			  		.attr('dy', '1.5em')
			  		.text('Distancia: ' + d.get("ciudad_distance_text"))
			  	.append("tspan")
              		.attr("x", (x+5))
              		.attr("y", (y+45))
			  		.attr('dy', '1.5em')
			  		.text('Tiempo: ' + d.get("ciudad_duration_text"))
			  	.append("tspan")
              		.attr("x", (x+5))
              		.attr("y", (y+70))
			  		.attr('dy', '1.5em')
			  		.text('Autos: ' + d.get("autos_2013"))

        });


    }
  });
  return svg_map;
});