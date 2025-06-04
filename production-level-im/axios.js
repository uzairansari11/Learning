// src/api/axiosInstance.js
import axios from 'axios'

// Create instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // or your API root
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    // Example: inject token
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Logger
    console.log(
      `[🔼 REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
      config
    )

    return config
  },
  (error) => {
    console.error('[❌ REQUEST ERROR]', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`[✅ RESPONSE] ${response.config.url}`, response)
    return response
  },
  (error) => {
    const { response } = error

    // Logger
    console.error(`[❌ RESPONSE ERROR] ${response?.config?.url}`, response)

    if (response) {
      // Handle Unauthorized
      if (response.status === 401) {
        console.warn('Unauthorized — redirecting to login...')
        localStorage.clear()
        window.location.href = '/login'
      }

      // Handle global errors
      if (response.status >= 500) {
        alert('Server error. Please try again later.')
      }
    }

    return Promise.reject(error)
  }
)

/* For injecting refresh token */

// Inside response interceptor
if (response.status === 401 && !config._retry) {
  config._retry = true

  const refreshToken = localStorage.getItem('refreshToken')
  const res = await axios.post('/auth/refresh', { refreshToken })

  if (res.status === 200) {
    localStorage.setItem('accessToken', res.data.accessToken)
    axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`
    config.headers.Authorization = `Bearer ${res.data.accessToken}`
    return axiosInstance(config) // retry original request
  }
}

/* Refresh token implementation  */

/* 

Detailed Explanation of Refresh Token Logic with Axios
1. Background: Why Refresh Tokens?
Access tokens (e.g., JWT) are usually short-lived for security.

When the access token expires, your API returns 401 Unauthorized.

Instead of forcing the user to log in again, you use a refresh token (long-lived, stored securely) to get a new access token.

This flow must be transparent to the user: your client automatically requests a new access token and retries the failed request.

2. Key Challenges in Implementation
Multiple API requests can fail with 401 at the same time.

You must not send multiple refresh token requests simultaneously — only one refresh request should happen at a time.

While refreshing, other requests should wait for the new token before retrying.

If refresh fails (e.g., refresh token expired), logout the user.
*/

// Flag to indicate refresh is in progress
let isRefreshing = false

// Array to hold requests while refreshing
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

// Request interceptor to inject token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle refresh logic
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    // If error is not 401 or originalRequest._retry flag is set, reject immediately
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Mark request as retrying
    originalRequest._retry = true

    if (isRefreshing) {
      // If refresh is already happening, queue the request
      return new Promise(function (resolve, reject) {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          // Update the Authorization header and retry
          originalRequest.headers.Authorization = 'Bearer ' + token
          return axiosInstance(originalRequest)
        })
        .catch((err) => Promise.reject(err))
    }

    // Start refresh process
    isRefreshing = true

    const refreshToken = localStorage.getItem('refreshToken')

    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:3000/auth/refresh', { refreshToken })
        .then(({ data }) => {
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('refreshToken', data.refreshToken)

          axiosInstance.defaults.headers.Authorization =
            'Bearer ' + data.accessToken

          originalRequest.headers.Authorization = 'Bearer ' + data.accessToken

          processQueue(null, data.accessToken)

          resolve(axiosInstance(originalRequest))
        })
        .catch((err) => {
          processQueue(err, null)

          // Optionally logout user on refresh token failure
          localStorage.clear()
          window.location.href = '/login'

          reject(err)
        })
        .finally(() => {
          isRefreshing = false
        })
    })
  }
)

export default axiosInstance
