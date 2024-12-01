import { Router } from "express";
import {
  getTodos,
  getTodosById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "./todos.service.js";

const todosRouter = Router();

todosRouter.get("/", getTodos);
todosRouter.get("/:id", getTodosById);
todosRouter.post("/", addTodo);
todosRouter.delete("/:id", deleteTodo);
todosRouter.put("/:id", updateTodo);

export default todosRouter;
