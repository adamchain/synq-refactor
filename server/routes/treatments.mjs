import { Router } from "express";
import * as treatmentService from "../services/treatmentService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(treatmentService));

export default router;
