import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import messageRouter from "./routes/message.router.js";
import connectToMongoDB from "./db/mongoDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}!`);
});
