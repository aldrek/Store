import express, { Request, Response } from "express";
import {
  adminDeleteUser,
  adminEditUser,
  deleteUser,
  editUser,
  fetchAllUsers,
  fetchUserData,
  fetchUserInfo,
  registerUser,
  signOutUser,
} from "../controllers/userController";
const router = express.Router();

// Auth
router.post("/signin", fetchUserData);
router.post("/signup", registerUser);
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
