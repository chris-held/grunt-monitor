var async = require('async'),
  _ = require('underscore')._,
  config = require('./config'),
  http = require('http');

module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.registerTask('default', 'Check some servers', function(){
    //this is telling grunt that this is an async task, not to be confused with
    //the async module
    var done = this.async();

    async.forever(
      function(next){
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
              next(err);
              //TODO - send email
            }
            next();
          });
        }, config.waitInterval * 1000);
      },
      function(err){
        done();
      }
    );

  });
};