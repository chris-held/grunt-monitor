var async = require('async'),
  _ = require('underscore')._,
  config = require('./config'),
  request = require('request'),
  nodemailer = require('nodemailer'),
  ses = require('nodemailer-ses-transport'),
  newrelic = require('newrelic'),
  http = require('http');

module.exports = function(grunt) {
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
            return cb("Received error for server " + server.name + ": " + err);
          } else if (response && response.statusCode != 200) {
            return cb("Received statusCode of " + response.statusCode + ", was expecting 200 for server " + server.name);
          } else if (took > 500) {
            return cb("Took too long - request for " + server.name + " took " + took + "ms");
          } else {
            grunt.log.writeln("Got " + server.name + " took " + took + "ms");
            cb(); 
          }          
        });
      }, function(err){
        if(err) {
          grunt.log.writeln('problem with get: ' + err);
          if(config.email) {
            var transporter = nodemailer.createTransport(ses({
              accessKeyId: config.email.SES.accessKeyId,
              secretAccessKey: config.email.SES.secretAccessKey
            }));
            console.log("trying to send email");
            transporter.sendMail({
              to: config.email.to,
              from: config.email.from,
              subject: config.email.subject,
              text: err
            });
          }
        }
      })
    }, config.waitInterval * 1000);

  });
};