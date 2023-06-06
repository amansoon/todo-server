import express from "express";
import { config } from "dotenv";
import cors from "cors";
import todoRoute from "./routes/todoRoute";
import userRoute from "./routes/userRoute";
import { connectDB } from "./configs/db";

config();
const app = express();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL as string;

// mongodb connection
connectDB(DB_URL);

// setup middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/todo/", todoRoute);
app.use("/api/user/", userRoute);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

