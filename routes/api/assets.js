import express from "express";
const router = express.Router();
import assetsController from "../../controllers/assets.controller.js";
const { getAllAssets, getSingleUserAssets, handleTransformImage } = assetsController;
import roles from "../../config/rolesList.js";
import verifyRoles from "../../middleware/verifyRoles.js";

router.route("/").get(getAllAssets);

router.route("/:id").get(getSingleUserAssets);

router.route("/transform").put(verifyRoles(roles.Admin, roles.User), handleTransformImage);

export default router;
