// PINCHES PLACAS APP
// date     : 20/9/2014
// @package : placas
// @file    : main.js
// @version : 1.0
// @author  : Gobierno Fácil
// @url     : http://gobiernofacil.com
// @twitter : @gobiernofacil

require.config({
  baseUlr : '/js/apps/placas',
  paths : {
    jquery     : "../../bower_components/jquery/dist/jquery",
    backbone   : "../../bower_components/backbone/backbone",
    underscore : "../../bower_components/underscore/underscore",
    text       : "../../bower_components/text/text",
    bootstrap  : '../../bower_components/bootstrap/dist/js/bootstrap'
  },
  shim : {
    underscore :{
      exports : "_"
    },
    backbone : {
      deps    : ["jquery", "underscore"],
      exports : "Backbone"
    },
    bootstrap : {
      deps    : ["jquery"]
    }
  }
});

var app;

require(['controller'], function(Controller){
  app = new Controller();
});