module.exports = {
  waitInterval: 1,  //time in seconds to wait before pinging servers,
  servers: [{
    uri: "http://127.0.0.1:8080/",
    name: "main web process",
    method: "GET"
  },{
    uri: "http://127.0.0.1:8180/",
    name: "some other process we need to know about"
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
  }
};