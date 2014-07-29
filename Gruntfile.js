var async = require('async'),
  _ = require('underscore')._,
  config = require('./config'),
  http = require('http');

module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.registerTask('default', 'Check some servers', function(){
    var me = this;

    var done = me.async();
    setInterval(function(){
      async.each(config.servers, function(server, cb){
        var start = new Date().getTime();
        var req = http.request(server, function(res) { 
          var end = new Date().getTime();
          var took = end - start;
          grunt.log.writeln("Got " + server.host + " on port " + server.port + " took " + took + "ms");
          if(took > 500) {
            //TODO took too long(make ttl configurable), send a warning email
          }
          cb(); 
        });
        req.on('error', function(err) {
          cb(err);
        });
        req.end();
      }, function(err){
        if(err) {
          grunt.log.writeln('problem with get: ' + err.message);
          //TODO - send email
        }
        //done();
      });
    }, config.waitInterval * 1000);
  });
};