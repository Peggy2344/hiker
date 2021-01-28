import express from 'express'
import { getUserOrder } from '../controllers/orderController.js'

const router = express.Router()

router.get('/', getUserOrder)

export default router
