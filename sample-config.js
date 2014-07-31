module.exports = {
  waitInterval: 1,  //time in seconds to wait before pinging servers,
  servers: [{
    uri: "http://127.0.0.1:8080/",
    method: "GET"
  },{
    uri: "http://127.0.0.1:8180/",
    method: "GET"
  }],
  email: {
    SES: {
      accessKeyID: "an aws access key",
      secretAccessKey: "an aws secret key"
    },
    from: "do_not_reply@yourmailserver.com",
    to: "devopsguys@yourmailserver.com",
    subject: "grunt-monitor has detected a problem with one of your servers!"
  },
  newRelic: {

  }
};