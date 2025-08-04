import { Router } from "express";
import * as userService from "../services/userService.mjs";
import restful from "../lib/restful.mjs";

const router = new Router();

router.use("/", restful(userService));

export default router;
