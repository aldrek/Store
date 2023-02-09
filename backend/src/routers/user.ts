import express, { Request, Response } from "express";
import { fetchUserData } from "../controllers/userController";

const router = express.Router();

router.get("/user", fetchUserData);

export { router as userRouter };
