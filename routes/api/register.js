import express from "express"
const router = express.Router();
import handleNewUser from "../../controllers/register.controller.js"

router.post('/', handleNewUser);

export default router;