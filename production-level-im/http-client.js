/* ---------------------------------------------------------------------------- */
const request = async ({
  method,
  url,
  params = {},
  data = {},
  headers = {},
  ...rest
}) => {
  const isFormData = data instanceof FormData

  return axiosInstance({
    method,
    url,
    params,
    data,
    headers: {
      ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      ...headers,
    },
    ...rest,
  })
}

/* 
example
request({ method: 'post', url: '/login', data: { user, pass } });

axiosInstance({
  method: 'post',
  url: '/login',
  data: { user, pass }
});

*/

/* ---------------------------------------------------------------------------- */

const httpClient = {
  get: (url, params = {}, config = {}) =>
    request({ method: 'get', url, params, ...config }),

  post: (url, data = {}, config = {}) =>
    request({ method: 'post', url, data, ...config }),

  put: (url, data = {}, config = {}) =>
    request({ method: 'put', url, data, ...config }),

  patch: (url, data = {}, config = {}) =>
    request({ method: 'patch', url, data, ...config }),

  delete: (url, params = {}, config = {}) =>
    request({ method: 'delete', url, params, ...config }),
}

/* 
GET
httpClient.get('/users', { page: 1, limit: 5 });
// Converts to axios: GET /users?page=1&limit=5

POST
httpClient.post('/users', { name: 'Uzair', email: 'u@example.com' });
// Converts to axios: POST /users with JSON body

DELETE
httpClient.delete('/users', { id: 5 });
// Converts to: DELETE /users?id=5

File Upload

export const uploadAvatar = (file, userId) => {
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('userId', userId); // optional: send extra metadata

  return httpClient.post('/users/upload-avatar', formData);
};

*/


