let services = []; // In-memory store

module.exports = {
  findAll: () => services,
  findById: (id) => services.find((s) => s.id === parseInt(id)),
  add: (service) => {
    service.id = services.length + 1;
    services.push(service);
    return service;
  },
  update: (updated) => {
    const index = services.findIndex((s) => s.id === updated.id);
    if (index > -1) services[index] = updated;
    return services[index];
  },
  deleteById: (id) => {
    const index = services.findIndex((s) => s.id === parseInt(id));
    if (index > -1) services.splice(index, 1);
  }
};
