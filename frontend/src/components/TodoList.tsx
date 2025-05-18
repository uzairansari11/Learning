import { Stack } from '@mantine/core';
import TodoItem from './TodoItem';

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  order: number;
}

interface TodoListProps {
  todos: Todo[];
  onToggleStatus: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
}

function TodoList({ todos, onToggleStatus, onDelete }: TodoListProps) {
  return (
    <Stack spacing="md">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}

export default TodoList; 