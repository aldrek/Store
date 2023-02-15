import express, { Request, Response } from "express";
import {
  adminDeleteUser,
  adminEditUser,
  deleteUser,
  editUser,
  fetchAllUsers,
  signinUser,
  fetchUserInfo,
  signOutUser,
  signupUser,
} from "../controllers/userController";
import { apiAuth } from "../middleware/apiAuth..middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkPassword } from "../middleware/validation.middleware";
const router = express.Router();

// Auth
router.post("/signin", apiAuth, signinUser);
router.post("/signup", apiAuth, checkPassword, signupUser);
router.post("/signout", authMiddleware, signOutUser);

// Edit - delete
router.put("/edit", editUser);
router.delete("/delete", apiAuth, authMiddleware, deleteUser);

router.put("/admin/delete", adminEditUser);
router.put("/admin/edit", adminDeleteUser);

// User info
router.get("/all", fetchAllUsers);
router.get("/me", authMiddleware, fetchUserInfo);

export { router as userRouter };
