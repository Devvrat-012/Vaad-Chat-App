import path from 'path';
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import messageRouter from "./routes/message.router.js";
import connectToMongoDB from "./db/mongoDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res)=> {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}!`);
});
