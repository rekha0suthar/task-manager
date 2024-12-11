import { Router } from 'express';
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/taskController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = Router();

router.post('/', verifyToken, addTask);
router.get('/', verifyToken, getTasks);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

export default router;
