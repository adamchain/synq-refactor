import { Router } from "express";
import * as patientService from "../services/patientService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(patientService));

export default router;
