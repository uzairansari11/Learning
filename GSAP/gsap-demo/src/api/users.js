// src/api/users.js
import axiosInstance from '../utils/axiosInstance'

export const fetchUsers = async () => {
  const response = await axiosInstance.get('/users')
  return response.data
}

export const createUser = async (userData) => {
  const response = await axiosInstance.post('/users', userData)
  return response.data
}

export const updateUser = async ({ id, ...userData }) => {
  if (!id) throw new Error('User ID is required for update')

  const response = await axiosInstance.put(`/users/${id}`, userData)
  return response.data
}

// src/api/users.js
export const deleteUser = async (id) => {
  if (!id) throw new Error('User ID is required to delete')

  const response = await axiosInstance.delete(`users/${id}`)
  return response.data
}
