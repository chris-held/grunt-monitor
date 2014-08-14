grunt-monitor
=============

An (eventually) easy to configure monitoring solution

#Setup

* Copy sample-config.js into a new file named config.js and enter in the servers you want to monitor and
any email / new relic configurations you want to set up.

* If you're using newrelic, copy sample-newrelic.js into a new file names newrelic.js and fill out your newrelic specific stuff

run with grunt

or as a background process with (grunt &)

##TODOS

debug emailing and figure out why nothing's getting sent out
refactor this into a standalone task
possibly remove grunt altogether (it's not much of a grunt task anymore)

