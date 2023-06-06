import { Router } from "express";
import { TodoController } from "../controllers/todoController";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, TodoController.getAllNotes);
router.get("/:id", auth, TodoController.getNote);

router.post("/", auth, TodoController.createNote);
router.put("/:id", auth, TodoController.updateNote);

router.delete("/", auth, TodoController.deleteAllNotes);
router.delete("/:id", auth, TodoController.deleteNote);

export default router;
