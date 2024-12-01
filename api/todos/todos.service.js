import { isValidObjectId } from "mongoose";
import todosModel from "../../models/todos.js";
export const getTodos = async (req, res) => {
  try {
    let { page = 1, take = 20 } = req.query;

    take = Math.min(Math.max(parseInt(take, 10), 1), 20);
    page = Math.max(parseInt(page, 10), 1);

    const totalTodos = await todosModel.countDocuments();
    const totalPage = Math.ceil(totalTodos / take) || 1;

    page = Math.min(page, totalPage);

    const todos = await todosModel
      .find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * take)
      .limit(take);

    res.status(200).render("pages/todos.ejs", {
      todos: todos || [],
      currentPage: page,
      totalPage,
      totalTodos
    });
  } catch (error) {
    console.error("Error in getTodos:", error.message, error.stack);
    res.status(500).json({ message: "Error retrieving data", data: null });
  }
};

export const getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid todo id", data: null });
    }
    const todo = await todosModel.findById(id);
    if (!todo) {
      res.status(404).json({ message: "todo not found", data: null });
    }
    res.status(200).json({ message: "Retrieved successfully", data: todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving data", data: null });
  }
};
export const addTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "All the fields are required" });
    }
    const todo = await todosModel.create(req.body);
    res.status(201).json({ message: "Todo created successfully", data: todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating todo", data: null });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid todo id", data: null });
    }
    const deletedTodo = await todosModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting todo", data: null });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid todo id", data: null });
    }
    const updatedTodo = await todosModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Todo updated successfully", data: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating todo", data: null });
  }
};
