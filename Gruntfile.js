var async = require('async'),
  _ = require('underscore')._,
  config = require('./config'),
  request = require('request'),
  http = require('http');

module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.registerTask('default', 'Check some servers', function(){
    //this is telling grunt that this is an async task, not to be confused with
    //the async module
    var done = this.async();

    setInterval(function(){
      async.each(config.servers, function(server, cb){
        var start = new Date().getTime();
        request(server, function(err, response, body){
          var end = new Date().getTime();
          var took = end - start;
          if(err) {
            return cb(err);
          } else if (response && response.statusCode != 200) {
            return cb("Received statusCode of " + response.statusCode + ", was expecting 200");
          } else if (took > 500) {
            return cb("Took too long - request for " + server.uri + " took " + took + "ms");
          } else {
            grunt.log.writeln("Got " + server.uri + " took " + took + "ms");
            cb(); 
          }          
        });
      }, function(err){
        if(err) {
          grunt.log.writeln('problem with get: ' + err.message);
          //TODO - send email, alert newrelic, etc.
        }
      })
    }, config.waitInterval * 1000);

  });
};