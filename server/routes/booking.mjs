import { Router } from "express";
import * as bookingService from "../services/bookingService.mjs";

import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(bookingService));

export default router;
