import { Request, Response } from "express";
import { Todo } from "../models/todo";
import { CustomRequest } from "../types";

class TodoController {
  static async createNote(req: CustomRequest, res: Response) {
    const { todoId, timestamp, text } = req.body;

    // check for undefined
    if (!(todoId && timestamp && text)) {
      return res.json({ status: "FAILED", message: "All fields are required" });
    }

    if (!todoId) {
      return res.json({ status: "FAILED", message: "todoId is required" });
    }

    if (!timestamp) {
      return res.json({ status: "FAILED", message: "time stamp is required" });
    }

    if (!text) {
      return res.json({ status: "FAILED", message: "text is required" });
    }

    try {
      const todoDoc = new Todo({
        userId: req.user._id.toString(),
        todoId,
        text: text,
        timestamp: new Date(timestamp),
      });
      const todo = await todoDoc.save();
      res.json({ status: "SUCCESS", message: "New todo created successfully.", data: { todo } });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to create todo." });
      console.log(err);
    }
  }



  // find notes by userId
  static async getAllNotes(req: CustomRequest, res: Response) {
    try {
      const todos = await Todo.find({ userId: req.user._id.toString() });
      res.json({ status: "SUCCESS", message: "fetched successfully.", data: { todos } });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to get todos" });
      console.log(err);
    }
  }



  // get single note
  static async getNote(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const todo = await Todo.findOne({ todiId: id });
      if (todo) {
        res.json({ status: "SUCCESS", message: "fetched successfully.", data: todo });
      } else {
        res.json({ status: "SUCCESS", message: "todo with this id not exists." });
      }
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to get todo" });
      console.log(err);
    }
  }



  // delete note by id
  static async deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await Todo.deleteOne({ todoId: id });
      res.json({ status: "SUCCESS", message: "deleted todo successfully." });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to delete todo" });
      console.log(err);
    }
  }




  // delete all notes of a user
  static async deleteAllNotes(req: CustomRequest, res: Response) {
    try {
      const result = await Todo.deleteMany({ userId: req.user._id.toString() });
      res.json({ status: "SUCCESS", message: "all todos deleted successfully." });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to delete todos" });
      console.log(err);
    }
  }




  // update a note
  static async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.json({ status: "FAILED", message: "text is required" });
    }
    try {
      const result = await Todo.updateOne({ todoId: id }, { text });
      res.json({ status: "SUCCESS", message: "updated successfully.", data: result });
    } catch (err) {
      res.json({ status: "FAILED", message: "Unable to update." });
      console.log(err);
    }
  }
}

export { TodoController };
