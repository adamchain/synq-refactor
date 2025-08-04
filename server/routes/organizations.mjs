import { Router } from "express";
import * as organizationService from "../services/organizationService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(organizationService));

export default router;
