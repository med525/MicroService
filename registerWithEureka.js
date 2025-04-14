const { Eureka } = require("eureka-js-client");

function registerWithEureka(appName, PORT) {
  const client = new Eureka({
    instance: {
      app: appName.toUpperCase(),
      hostName: "localhost",
      ipAddr: "127.0.0.1",
      statusPageUrl: `http://localhost:${PORT}/service/health`,
      port: {
        "$": PORT,
        "@enabled": true
      },
      vipAddress: appName,
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn"
      }
    },
    eureka: {
      host: "localhost",
      port: 8761,
      servicePath: "/eureka/apps/"
    }
  });

  client.logger.level("debug");
  client.start((error) => {
    if (error) {
      console.error("Eureka registration failed:", error);
    } else {
      console.log("Eureka registration complete");
    }
  });
}

module.exports = registerWithEureka;
