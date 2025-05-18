import { Router } from 'express';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  reorderTodos,
} from '../controllers/todoController';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.post('/reorder', reorderTodos);

export default router; 