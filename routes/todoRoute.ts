import { Router } from "express";
import { TodoController } from "../controllers/todoController";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/get", auth, TodoController.getAllNotes);
router.get("/get/:id", TodoController.getNote);

router.post("/create", TodoController.createNote);
router.put("/update/:id", TodoController.updateNote);

router.delete("/delete", TodoController.deleteAllNotes);
router.delete("/delete/:id", TodoController.deleteNote);

export default router;
