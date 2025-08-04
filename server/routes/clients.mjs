import { Router } from "express";
import * as clientService from "../services/clientService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(clientService));

export default router;
