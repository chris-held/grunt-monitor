var async = require('async'),
  _ = require('underscore')._,
  http = require('http');

module.exports = function(grunt) {
  // Do grunt-related things in here
  grunt.registerTask('default', 'Check some servers', function(){
    //TODO - make options dynamic through config
    var me = this;
    var config = {
      waitInterval: 15,  //time in seconds to wait before pinging servers,
      serverOptions: [{
        host: "127.0.0.1",
        port: 8080,
        path: "/",
        method: "GET"
      },{
        host: "127.0.0.1",
        port: 8180,
        path: "/",
        method: "GET"
      }]
    };

    var done = me.async();
    async.each(config.serverOptions, function(server, cb){
      var start = new Date().getTime();
      var req = http.request(server, function(res) { 
        var end = new Date().getTime();
        var took = end - start;
        grunt.log.writeln("Got " + server.host + " on port " + server.port + " took " + took + "ms");
        if(took > 500) {
          //TODO took too long(make timeout configurable), send a warning email
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
      done();
    });
  });
};