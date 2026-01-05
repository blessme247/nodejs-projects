import express from "express";
const router = express.Router();
import assetsController from "../../controllers/assets.controller.js";
const { getAllAssets, getSingleUserAssets } = assetsController;
// import roles from "../../config/rolesList.js";
// import verifyRoles from "../../middleware/verifyRoles.js";

router.route("/").get(getAllAssets);

router.route("/:id").get(getSingleUserAssets);

export default router;
