import express from 'express'
import { createProduct, editProduct, deleteProduct, CreateClassification, EditCategory, CreateHotSale, RemoveHotSale } from '../controllers/adminController.js'
import { getUserOrder, editStatus } from '../controllers/orderController.js'
import { postQuestionReply, editComment } from '../controllers/productController.js'

const router = express.Router()

router.post('/product', createProduct)
router.patch('/product/:productId', editProduct)
router.delete('/product/:productId', deleteProduct)

router.post('/classification', CreateClassification)
router.patch('/classification/:classificationId', EditCategory)

router.get('/order/all', getUserOrder)
router.patch('/order/:userId', editStatus)

router.post('/mainpage/hotsale', CreateHotSale)
router.delete('/mainpage/hotsale/:id', RemoveHotSale)

router.post('/:productId/question/reply', postQuestionReply)

router.patch('/product/:productId/comment', editComment)
export default router
