import express from 'express'
import { createUser, login, logout, heartbeat, getUser } from '../controllers/userController.js'
import { postOrder, editOrder, completeOrder, delOrder, getOrder } from '../controllers/orderController.js'

const router = express.Router()

router.post('/register', createUser)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/profile/:userId', getUser)

router.post('/order/:userId', postOrder)
router.patch('/order/:userId', editOrder)
router.patch('/order/:userId/complete', completeOrder)
router.delete('/order/:userId', delOrder)
router.get('/order/:userId', getOrder)

router.get('/heartbeat', heartbeat)

export default router
