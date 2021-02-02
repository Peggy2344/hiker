import api from './apiInstance'

export const postProduct = (params) => {
  return api.post('/admin/product', params)
}
export const editProduct = ({ productId }, params) => {
  return api.patch(`/admin/product/${productId}`, params)
}
export const deleteProduct = ({ productId }) => {
  return api.delete(`/admin/product/${productId}`)
}
export const postClassification = (params) => {
  return api.post('/admin/classification', params)
}
export const editClassification = ({ classificationId }, params) => {
  return api.patch(`/admin/classification/${classificationId}`, params)
}
export const postHotsale = (params) => {
  return api.post('/admin/mainpage/hotsale', params)
}
export const removeHotSale = ({ id }) => {
  return api.delete(`/admin/mainpage/hotsale/${id}`)
}
export const getUserOrder = () => {
  return api.get('/admin/order/all')
}
export const getComments = () => {
  return api.get('/products/all/comments')
}
export const getQuestions = () => {
  return api.get('/products/all/questions')
}
export const postQuestionReply = ({ productId, questionId }, params) => {
  return api.post(`/admin/${productId}/question/reply?questionId=${questionId}`, params)
}
export const editStatus = ({ userId, orderId }, params) => {
  return api.patch(`/admin/order/${userId}?orderId=${orderId}`, params)
}
export const editComment = ({ productId, commentId }, params) => {
  return api.patch(`/admin/product/${productId}/comment?commentId=${commentId}`, params)
}
