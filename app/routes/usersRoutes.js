// app/routes/usersRoutes.js
import express from "express";
import { createUser, searchUsers } from "../controllers/usersController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/search", searchUsers);

export default router;
