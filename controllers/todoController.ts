import { Request, Response } from "express";
import { Todo } from "../models/todo";

class TodoController {
  static async createNote(req: Request, res: Response) {
    console.log("create new note...")

    const { timestamp, text } = req.body;

    // check undefined
    if (!(timestamp && text)) {
      res.json({ status: "FAILED", message: "All fields are required" });
    }

    if (!timestamp) {
      res.json({ status: "FAILED", message: "time stamp is required" });
    }

    if (!text) {
      res.json({ status: "FAILED", message: "text is required" });
    }

    try {
      const todoDoc = new Todo({
        timestamp: new Date(Date.now()),
        text: text,
      });
      const todo = await todoDoc.save();
      res.json({ status: "SUCCESS", message: "New todo created successfully.", data: { todo } });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to create todo." });
      console.log(err);
    }
  }

  static async getAllNotes(req: Request, res: Response) {
    console.log("get all notes...")

    try {
      const todos = await Todo.find();
      res.json({ status: "SUCCESS", message: "fetched successfully.", data: { todos } });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to get todos" });
      console.log(err);
    }
  }

  static async getNote(req: Request, res: Response) {
    console.log("get single note...")

    const { id } = req.params;
    try {
      const todo = await Todo.findOne({ _id: id });
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

  static async deleteNote(req: Request, res: Response) {
    console.log("delete single note...")
    const { id } = req.params;
    try {
      const result = await Todo.deleteOne({ _id: id });
      res.json({ status: "SUCCESS", message: "deleted todo successfully." });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to delete todo" });
      console.log(err);
    }
  }

  static async deleteAllNotes(req: Request, res: Response) {
    console.log("delete all note...")


    try {
      const result = await Todo.deleteMany({});
      res.json({ status: "SUCCESS", message: "deleted all todos successfully." });
    } catch (err) {
      res.json({ status: "FAILED", message: "Something went wrong. Unable to delete todos" });
      console.log(err);
    }
  }

  static async updateNote(req: Request, res: Response) {
    const { id } = req.params;
    const { text } = req.body;

    console.log("update one note")

    if (!text) {
      return res.json({ status: "FAILED", message: "text is required" });
    }

    try {
      const result = await Todo.updateOne({ _id: id }, { text });
      res.json({ status: "SUCCESS", message: "updated successfully.", data: result });
    } catch (err) {
      res.json({ status: "FAILED", message: "Unable to update." });
      console.log(err);
    }
  }
}

export { TodoController };
