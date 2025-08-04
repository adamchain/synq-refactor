import { Router } from "express";
import * as branchService from "../services/branchService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.post("/getByUrl", async (req, res) => {
  const result = await branchService.getByUrl(req.body.url)
  res.json(result);
});

router.use("/", restful(branchService));


export default router;
