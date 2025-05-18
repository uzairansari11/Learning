import { useState } from 'react';
import { Modal, TextInput, Textarea, Button, Group } from '@mantine/core';

interface AddTodoModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
}

function AddTodoModal({ opened, onClose, onAdd }: AddTodoModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add New Todo">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Title"
          placeholder="Enter todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          mb="md"
        />
        <Textarea
          label="Description"
          placeholder="Enter todo description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          mb="xl"
        />
        <Group position="right">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Todo</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddTodoModal; 