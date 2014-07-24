var async = require('async'),
  http = require('http');

module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.registerTask('default', 'Check some servers', function(){
    //TODO - make options dynamic, and allow an array of host options
    //so we can check multiple servers / processes at once
    var done = this.async();
    var options = {
      host: "127.0.0.1",
      port: 8080,
      path: "/",
      method: "GET"
    };
    var start = new Date().getTime();
    var req = http.request(options, function(res) { 
      var end = new Date().getTime();
      var took = end - start;
      grunt.log.writeln("Got " + options.host + " on port " + options.port + " took " + took + "ms");
      if(took > 500) {
        //TODO took too long(make timeout configurable), send a warning email
      }
      done(); 
    });
    req.on('error', function(err) {
      //TODO - need to send an email here
      grunt.log.writeln('problem with get: ' + err.message);
    });
    req.end();
  });
};