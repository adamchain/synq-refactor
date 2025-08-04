import { Router } from "express";
import * as appointmentService from "../services/appointmentService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(appointmentService));

export default router;
