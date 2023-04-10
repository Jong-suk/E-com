import express from 'express'
import { 
    authUser, 
    registerUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers, 
    deleteUser, 
    getUserById,
    updateUser,
    recommendedProducts,
    saveSearchHistory,
    createUser
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/search').post(saveSearchHistory)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/create-user', protect, admin, createUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/recommended-products/:userId').get(protect, recommendedProducts)
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router