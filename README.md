grunt-monitor
=============

An (eventually) easy to configure monitoring solution

#Setup

* install grunt-cli with npm install -g grunt-cli

* Copy sample-config.js into a new file named config.js and enter in the servers you want to monitor and
any email configurations you want to set up.

run with grunt

or as a background process with (grunt &)

if you're connected to a remote server over ssh use (nohup grunt &)

##TODOS

* refactor this into a standalone grunt module OR
* possibly remove grunt altogether (it's not much of a grunt task anymore - this could just be a node script)

