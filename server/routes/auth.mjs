import { Router } from "express";
import * as authService from "../services/authService.mjs"
import restful from "../lib/restful.mjs";

const router = new Router();

router.post("/authenticate", async (req, res) => {
  const result = await authService.authenticate(req.body.email, req.body.password)
  res.json(result);
});

router.post("/register", async (req, res) => {
  const result = await authService.register(req.body.email, req.body.password)
  res.json(result);
});

export default router;
