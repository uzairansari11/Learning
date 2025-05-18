import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Paper, Group, Text, ActionIcon, Checkbox } from '@mantine/core';
import { IconTrash, IconGripVertical } from '@tabler/icons-react';

interface Todo {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  order: number;
}

interface TodoItemProps {
  todo: Todo;
  onToggleStatus: (id: string, status: 'pending' | 'completed') => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggleStatus, onDelete }: TodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      shadow="xs"
      p="md"
      withBorder
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        opacity: todo.status === 'completed' ? 0.7 : 1,
      })}
    >
      <Group position="apart">
        <Group>
          <ActionIcon {...attributes} {...listeners}>
            <IconGripVertical size={18} />
          </ActionIcon>
          <Checkbox
            checked={todo.status === 'completed'}
            onChange={() => onToggleStatus(todo._id, todo.status)}
            label={todo.title}
          />
        </Group>
        <Group spacing="xs">
          <ActionIcon color="red" onClick={() => onDelete(todo._id)}>
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Group>
      <Text
        size="sm"
        color="dimmed"
        ml={42}
        sx={{
          textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
        }}
      >
        {todo.description}
      </Text>
    </Paper>
  );
}

export default TodoItem; 