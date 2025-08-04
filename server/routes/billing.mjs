import { Router } from "express";
import * as billingService from "../services/billingService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(billingService));

export default router;
