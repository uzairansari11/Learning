import { Request, Response } from 'express';
import { Todo } from '../models/Todo';

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const count = await Todo.countDocuments();
    const todo = await Todo.create({
      title,
      description,
      order: count,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await Todo.find().sort({ order: 1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};

export const reorderTodos = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    const updates = items.map((item: any, index: number) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { order: index } }
      }
    }));
    await Todo.bulkWrite(updates);
    res.json({ message: 'Todos reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error reordering todos', error });
  }
}; 