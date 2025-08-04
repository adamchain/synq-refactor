import { Router } from "express";
import { notFound } from "express-rest-error";

function invalidEndpoint() {
  return notFound("Invalid endpoint.");
}

function applyFilterParams(obj, filterParams, params) {
  Object.keys(filterParams).forEach((param) => {
    const field = filterParams[param];
    obj[field] = params[param];
  });
}

export default function restful(service, { filterParams = {} } = {}) {
  let router = new Router({ mergeParams: true });

  router.get("/", async (req, res) => {
    if (!service.find) throw invalidEndpoint();
    applyFilterParams(req.query, filterParams, req.params);
    let response = await service.find(req.user, req.query);
    res.status(200).json(response);
  });

  router.get("/:id", async (req, res) => {
    if (!service.get) throw invalidEndpoint();

    let response;

    // if (
    //   service.name === "closingStatementService" &&
    //   req.params.id === "undefined"
    // ) {
    //   response = {}; // This gets treated better at the frontend
    // } else {
    response = await service.get(req.user, req.params.id);
    // }

    res.status(200).json(response);
  });

  router.put("/:id", async (req, res) => {
    if (!service.upsert) throw invalidEndpoint();
    let response = await service.upsert(req.user, req.params.id, req.body);
    res.status(200).json(response);
  });

  router.patch("/:id", async (req, res) => {
    if (!service.update) throw invalidEndpoint();
    let response = await service.update(req.user, req.params.id, req.body);
    res.status(200).json(response);
  });

  router.post("/", async (req, res) => {
    if (!service.create) throw invalidEndpoint();
    applyFilterParams(req.body, filterParams, req.params);
    const newRecord = await service.create(req.user, req.body);
    if (!Object.keys(filterParams).length) {
      return res.status(201).json(newRecord);
    }
    applyFilterParams(req.query, filterParams, req.params);
    let response = await service.find(req.user, req.query);
    res.status(201).json(response);
  });

  router.delete("/:id", async (req, res) => {
    if (!service.del) throw invalidEndpoint();
    await service.del(req.user, req.params.id);
    res.status(204).send();
  });

  return router;
}
