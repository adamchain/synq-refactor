import { Router } from "express";
import * as labService from "../services/labService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(labService));

export default router;
