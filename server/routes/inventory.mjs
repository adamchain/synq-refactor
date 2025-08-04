import { Router } from "express";
import * as inventoryService from "../services/inventoryService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(inventoryService));

export default router;
