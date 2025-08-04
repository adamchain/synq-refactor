import { Router } from "express";
import * as anesthesiaService from "../services/anesthesiaService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(anesthesiaService));

export default router;
