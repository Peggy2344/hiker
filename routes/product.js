import express from 'express'
import { getProducts, getFile, searchByProductId, GetClassification, GetHotSale, postComment, getComment, getQuestion, postQuestion } from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/:productId', searchByProductId)
router.get('/file/:file', getFile)

router.get('/classification/all', GetClassification)
router.get('/mainpage/hotsale', GetHotSale)

router.post('/:productId/comment', postComment)
router.get('/:productId/comment', getComment)
router.get('/all/comments', getComment)
router.get('/:productId/question', getQuestion)
router.get('/all/questions', getQuestion)
router.post('/:productId/question', postQuestion)

export default router
