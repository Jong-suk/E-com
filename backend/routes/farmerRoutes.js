import express from 'express'
import { getFarmers , getFarmerById, getFarmerProductsById } from '../controllers/farmerController.js'

const router = express.Router()

router.route('/').get(getFarmers)
router.route('/:id').get(getFarmerById)
router.route('/:id/products').get(getFarmerProductsById)

export default router