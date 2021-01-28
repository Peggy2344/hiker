import api from './apiInstance'

export const getProducts = () => {
  return api.get('/products')
}
export const getNavigationProducts = ({ navigation }) => {
  return api.get(`/products/?navigation=${navigation}`)
}
export const getCategoryProducts = ({ navigation, category }) => {
  return api.get(`/products/?navigation=${navigation}&category=${category}`)
}
export const getBrandProducts = ({ brand }) => {
  return api.get(`/products/?brand=${brand}`)
}
export const getProduct = ({ productId }) => {
  return api.get(`/products/${productId}`)
}
export const getImgFile = ({ file }) => {
  return api.get(`/products/file/${file}`)
}
export const getClassification = () => {
  return api.get('/products/classification/all')
}
export const getHotsale = () => {
  return api.get('/products/mainpage/hotsale')
}
export const postComment = ({ productId }, comment) => {
  return api.post(`/products/${productId}/comment`, comment)
}
export const getComments = ({ productId }) => {
  return api.get(`/products/${productId}/comment`)
}
export const getComment = ({ productId, commentId }) => {
  return api.get(`/products/${productId}/comment/?commentId=${commentId}`)
}
export const getQuestions = ({ productId }) => {
  return api.get(`/products/${productId}/question`)
}
export const getQuestion = ({ productId, questionId }) => {
  return api.get(`/products/${productId}/question/?questionId=${questionId}`)
}
export const postQuestion = ({ productId }, question) => {
  return api.post(`/products/${productId}/question`, question)
}
