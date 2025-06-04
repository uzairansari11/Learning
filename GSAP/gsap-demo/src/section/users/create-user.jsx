// src/components/CreateUser.jsx
import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../../api/users'

const CreateUser = () => {
  const queryClient = useQueryClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']) // Refetch users
      setName('')
      setEmail('')
    },
  })

  // Auto reset mutation state after 3 seconds
  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const timer = setTimeout(() => {
        mutation.reset()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [mutation.isSuccess, mutation.isError, mutation])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email) return

    mutation.mutate({ name, email })
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Add User'}
        </button>
      </form>

      {mutation.isSuccess && (
        <p style={{ color: 'green' }}>✅ User added successfully!</p>
      )}
      {mutation.isError && (
        <p style={{ color: 'red' }}>
          ❌ Failed to add user: {mutation.error.message}
        </p>
      )}
    </div>
  )
}

export default CreateUser
