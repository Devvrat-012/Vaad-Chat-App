import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get("/", protectRoute, getUsersForSidebar)

export default userRouter;