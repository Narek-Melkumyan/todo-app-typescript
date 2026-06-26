import { Router } from "express";
import {getTodos, getTodoById, createTodo, deleteTodo, searchTodos, updateTodoStatus} from "../controllers/todoController.js";

const router = Router();

router.get("/", getTodos);
router.get("/search", searchTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.patch("/:id/status", updateTodoStatus);
router.delete("/:id", deleteTodo);

export default router;