import express from 'express'
import { getFarmers , getFarmerById } from '../controllers/farmerController.js'

const router = express.Router()

router.route('/').get(getFarmers)

router.route('/:id').get(getFarmerById)

export default router