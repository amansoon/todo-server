import { Router } from "express";
import { UserController } from "../controllers/userController";
import { auth } from "../middlewares/auth";
const router = Router();

// public routes
router.post("/create", UserController.createUser);
router.get("/login", UserController.loginUser);

// protected routes
router.get("/", auth, UserController.getUser);
router.put("/", auth, UserController.updateUser);
router.delete("/", auth, UserController.deleteUser);

export default router;
