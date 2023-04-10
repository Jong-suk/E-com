import express from 'express'
import { addCartItems, deleteCartItem, getMyCart, updateCartItem } from '../controllers/cartController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addCartItems).get(protect, getMyCart).put(protect, updateCartItem)
router.route('/:id').delete(protect, deleteCartItem)

export default router