const store = require("../models/serviceModel");

exports.getAll = (req, res) => res.json(store.findAll());

exports.getById = (req, res) => {
  const service = store.findById(req.params.id);
  service ? res.json(service) : res.status(404).send("Not found");
};

exports.add = (req, res) => res.status(201).json(store.add(req.body));

exports.update = (req, res) => res.json(store.update(req.body));

exports.remove = (req, res) => {
  store.deleteById(req.params.id);
  res.status(204).end();
};

exports.healthCheck = (req, res) => res.send("Service is healthy");
