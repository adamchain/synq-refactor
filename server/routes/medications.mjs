import { Router } from "express";
import * as medicationService from "../services/medicationService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(medicationService));

export default router;
