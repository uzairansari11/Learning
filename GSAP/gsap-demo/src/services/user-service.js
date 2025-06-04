import axiosInstance from '../utils/axiosInstance'

export const fetchUsers = async () => {
  const { data } = await axiosInstance.get('/users')
  return data
}
