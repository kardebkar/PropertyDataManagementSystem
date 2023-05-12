import express from "express";
import * as UsersController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";


const router = express.Router();

// router.get("/all",requiresAuth,UsersController.getAllUsers);
// router.get("/",requiresAuth,UsersController.getAuthenticatedUser);

router.get("/all",UsersController.getAllUsers);
router.get("/",UsersController.getAuthenticatedUser);
router.post("/signup",UsersController.createUser);
router.patch("/:userId",UsersController.updateUser);
router.delete("/:userId",UsersController.deleteUser);

router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);

export default router;