// src/components/UserList.jsx
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser, fetchUsers, updateUser } from '../api/users'
import CreateUser from '../section/users/create-user'

export const Users = () => {
  const queryClient = useQueryClient()
  const [editingUserId, setEditingUserId] = useState(null)
  const [editValues, setEditValues] = useState({ name: '', email: '' })

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      setEditingUserId(null)
    },
  })

  const handleEdit = (user) => {
    setEditingUserId(user.id)
    setEditValues({ name: user.name, email: user.email })
  }
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })
  const handleSave = () => {
    mutation.mutate({ id: editingUserId, ...editValues })
  }
  const handleDelete = (id) => {
    deleteMutation.mutate(id)
    // const confirmed = window.confirm(
    //   'Are you sure you want to delete this user?'
    // )
    // if (confirmed) {
    //   deleteMutation.mutate(id)
    // }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: '1rem' }}>
            {editingUserId === user.id ? (
              <>
                <input
                  type="text"
                  value={editValues.name}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  value={editValues.email}
                  onChange={(e) =>
                    setEditValues({ ...editValues, email: e.target.value })
                  }
                />
                <button onClick={handleSave} disabled={mutation.isPending}>
                  {mutation.isPending ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setEditingUserId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{user.name}</strong> ({user.email})
                <button
                  onClick={() => handleEdit(user)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={deleteMutation.isPending}
                  style={{ marginLeft: '10px', color: 'red' }}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <CreateUser />
    </>
  )
}
