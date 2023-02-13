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
import { checkPassword } from "../middleware/validation";
const router = express.Router();

// Auth
router.post("/signin", signinUser);
router.post("/signup", checkPassword, signupUser);
router.post("/signout", signOutUser);

// Edit - delete
router.put("/edit", editUser);
router.put("/delete", deleteUser);

router.put("/admin/delete", adminEditUser);
router.put("/admin/edit", adminDeleteUser);

// User info
router.get("/all", fetchAllUsers);
router.get("/me", fetchUserInfo);

export { router as userRouter };
