import { Router } from "express";
import * as reportService from "../services/reportService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(reportService));

export default router;
