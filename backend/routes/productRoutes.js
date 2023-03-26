import express from 'express'
import { 
        getProducts, 
        getProductById, 
        deleteProduct, 
        createProduct, 
        updateProduct, 
        createProductReview, 
        getTopProducts, 
        updateProductReview, 
        deleteProductReview 
} from '../controllers/productController.js'
import { admin, farmer, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
        .get(getProducts)
        .post(protect, farmer, createProduct)
        .put(protect, admin, createProduct)

router.route('/:id')
        .get(getProductById)
        .put(protect, farmer, updateProduct)
        .patch(protect, admin, updateProduct)
        .delete(protect, admin, deleteProduct)

router.route('/:id/reviews').post(protect, createProductReview).put(protect, updateProductReview).delete(protect, deleteProductReview)

router.get('/top', getTopProducts)

export default router