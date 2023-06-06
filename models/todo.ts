import { Schema, model } from "mongoose";

interface ITodo {
  timestamp: Date;
  text: string;
}

const TodoSchema = new Schema<ITodo>({
  timestamp: { type: Date, required: true },
  text: { type: String, required: true },
});

const Todo = model<ITodo>("todo", TodoSchema);

export { Todo };
