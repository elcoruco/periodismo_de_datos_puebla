({
  baseUrl: "./",
  name : "main",
  out : "./main-build.js",
  paths : {
     jquery        : "./../../bower_components/jquery/dist/jquery",
    backbone       : "./../../bower_components/backbone/backbone",
    d3             : "./../../bower_components/d3/d3",
    underscore     : "./../../bower_components/underscore/underscore",
    text           : "./../../bower_components/requirejs-text/text",
    async          : './../../bower_components/requirejs-plugins/src/async',
    goog           : './../../bower_components/requirejs-plugins/src/goog',
    propertyParser : './../../bower_components/requirejs-plugins/src/propertyParser',
    bootstrap      : './../../bower_components/bootstrap/dist/js/bootstrap',
    requireLib     : './../../bower_components/requirejs/require'
  },
  shim : {
    underscore :{
      exports : "_"
    },
    backbone : {
      deps    : ["jquery", "underscore"],
      exports : "Backbone"
    }
  },
  include : 'requireLib'
})