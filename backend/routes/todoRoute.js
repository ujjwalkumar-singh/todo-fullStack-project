 import express from 'express';
 import { authMiddleware } from '../auth/authMiddleware.js';
 import { createTodo,deleteTodo,updateTodo,getTodo} from '../controller/todo.controller.js';
 const router = express.Router();

    router.post("/create",authMiddleware,createTodo);
    router.post("/delete/:id",authMiddleware,deleteTodo);
    router.post("/update/:id",authMiddleware,updateTodo);
    router.get("/get",authMiddleware,getTodo);
 export default router;