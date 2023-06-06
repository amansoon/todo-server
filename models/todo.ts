import { Schema, model } from "mongoose";

interface ITodo {
  todoId: string,
  timestamp: Date;
  text: string;
}

const TodoSchema = new Schema<ITodo>({
  todoId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
});

const Todo = model<ITodo>("todo", TodoSchema);

export { Todo };
