import api from './apiInstance'

export const register = (params) => {
  return api.post('/users/register', params)
}
export const login = (params) => {
  return api.post('/users/login', params, { withCredentials: true })
}
export const logout = () => {
  return api.delete('/users/logout')
}
export const heartbeat = () => {
  return api.get('/users/heartbeat', { withCredentials: true })
}
export const getUser = ({ userId }) => {
  return api.get(`/users/profile/${userId}`)
}
export const getCart = ({ userId }) => {
  return api.get(`/users/order/${userId}`)
}
export const getOrder = ({ userId, orderId }) => {
  return api.get(`/users/order/${userId}?orderId=${orderId}`)
}
export const getOrderStatus = ({ userId, orderStatus }) => {
  return api.get(`/users/order/${userId}?orderStatus=${orderStatus}`)
}
export const postOrder = ({ userId }, order) => {
  return api.post(`/users/order/${userId}`, order)
}
export const pushOrder = ({ userId, orderId }, order) => {
  return api.post(`/users/order/${userId}/?orderId=${orderId}`, order)
}
export const editOrder = ({ userId, orderId }, order) => {
  return api.patch(`/users/order/${userId}/?orderId=${orderId}`, order)
}
export const delOrder = ({ userId, orderId, pId }) => {
  return api.delete(`/users/order/${userId}/?orderId=${orderId}&pId=${pId}`)
}
export const completeOrder = ({ userId, orderId }, payment) => {
  return api.patch(`/users/order/${userId}/complete?orderId=${orderId}`, payment)
}
