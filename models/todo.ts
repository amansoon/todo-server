import { Schema, model } from "mongoose";

interface ITodo {
  userId: string,
  todoId: string,
  timestamp: Date;
  text: string;
}

const TodoSchema = new Schema<ITodo>({
  userId: { type: String, required: true },
  todoId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
});

const Todo = model<ITodo>("todo", TodoSchema);

export { Todo };
