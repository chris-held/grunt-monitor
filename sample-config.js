module.exports = {
  waitInterval: 15,  //time in seconds to wait before pinging servers,
  servers: [{
    host: "127.0.0.1",
    port: 8080,
    path: "/",
    method: "GET"
  },{
    host: "127.0.0.1",
    port: 8180,
    path: "/",
    method: "GET"
  }],
  email: {

  },
  newRelic: {
    
  }
};