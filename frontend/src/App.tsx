import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Container, Title, Group, Button } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';

const API_URL = 'http://localhost:5000/api';

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  order: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update the order on the server
        axios.post(`${API_URL}/todos/reorder`, { items: newItems })
          .catch((error) => console.error('Error reordering todos:', error));

        return newItems;
      });
    }
  };

  const addTodo = async (title: string, description: string) => {
    try {
      const response = await axios.post(`${API_URL}/todos`, {
        title,
        description,
      });
      setTodos([...todos, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodoStatus = async (id: string, status: 'pending' | 'completed') => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, {
        status: status === 'pending' ? 'completed' : 'pending',
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <>
      <Notifications position="top-right" />
      <Container size="sm" py="xl">
        <Group position="apart" mb="xl">
          <Title order={1}>Todo List</Title>
          <Button onClick={() => setIsModalOpen(true)}>Add Todo</Button>
        </Group>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todos.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <TodoList
              todos={todos}
              onToggleStatus={toggleTodoStatus}
              onDelete={deleteTodo}
            />
          </SortableContext>
        </DndContext>

        <AddTodoModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addTodo}
        />
      </Container>
    </>
  );
}

export default App; 