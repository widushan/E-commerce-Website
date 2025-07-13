import express from 'express'
import { placeOrder,
    placeOrderVisamaster,
    allOrders,
    userOrders,
    updateStatus,
    verifyVisamaster } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/visamaster', authUser, placeOrderVisamaster)

// Verify Payment
orderRouter.post('/verifyVisamaster', authUser, verifyVisamaster)

// User Feature
orderRouter.post('/userorders', authUser, userOrders)

export default orderRouter
