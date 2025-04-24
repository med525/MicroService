const { Eureka } = require("eureka-js-client");

const eureka = new Eureka({
  instance: {
    app: "incident-service",
    instanceId: "incident-service-node",
    hostName: "localhost",
    ipAddr: "127.0.0.1",  // ✅ IPv4 for stability
    port: { $: 3004, "@enabled": true },
    vipAddress: "incident-service",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn"
    }
  },
  eureka: {
    host: "127.0.0.1",  // ✅ Use IPv4
    port: 8761,
    servicePath: "/eureka/apps/"
  }
});

function registerWithEureka() {
  eureka.start(() => {
    console.log("✅ Registered with Eureka");
  });
}

module.exports = { registerWithEureka };
