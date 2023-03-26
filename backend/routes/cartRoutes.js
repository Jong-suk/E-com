import express from 'express'
import { addCartItems, getMyCart } from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addCartItems)
router.route('/mycart').get(protect, getMyCart)

export default router