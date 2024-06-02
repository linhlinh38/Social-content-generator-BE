import express from "express";
import contentRoute from "./content.route.js";
import accessCodeRoute from "./accessCode.route.js";

const router = express.Router();
router.use("/content", contentRoute);
router.use("/access", accessCodeRoute);

export default router;