import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js'
import { admin, farmer, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/myorders').get(protect, getMyOrders).get(protect, farmer, getOrders)
router.route('/:id').get(protect, getOrderById)

export default router