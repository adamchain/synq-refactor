import { Router } from "express";
import * as staffService from "../services/staffService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(staffService));

export default router;
