import express from "express"
const router = express.Router();
import handleRefreshToken from "../../controllers/refresh.token.controller.js"

router.get('/', handleRefreshToken);

export default router;