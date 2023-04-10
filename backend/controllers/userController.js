import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import generateToken from './../utils/generateToken.js'
import Farmer from '../models/farmerModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isFarmer: user.isFarmer,
            searchHistory: user.searchHistory,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register new users
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email: email })

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isFarmer: user.isFarmer,
            token: generateToken(user._id),
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid UserData')
    }
})

// @desc    Get user's profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            image: user.image,
            email: user.email,
            isAdmin: user.isAdmin,
            isFarmer: user.isFarmer,
            searchHistory: user.searchHistory
        })
    }
    else{
        res.status(404)
        throw new Error('User NotFound')
    }
})

// @desc    Update user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.image = req.body.image || user.image
        if(req.body.password){
            user.password = req.body.password 
        }
        
        const updatedUser = await user.save()
        
        const users = await User.find({})
        const adminUser = users[0]._id
        const sampleFarmers = await Farmer.find({ email: user.email })

        if(updatedUser.isFarmer){
            if(sampleFarmers){
                await Farmer.findOneAndUpdate(
                    { email: user.email },
                    { $set: {name: updatedUser.name, image: updatedUser.image, email: updatedUser.email, description: req.body.description, user: adminUser} },
                    { new: true }
                )
            }
            else{
                res.status(404)
                throw new Error('Farmer NotFound')
            }
        }

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            image: updatedUser.image,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isFarmer: updatedUser.isFarmer,
            token: generateToken(updatedUser._id),
        })
    }
    else{
        res.status(404)
        throw new Error('User NotFound')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler( async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)
    
    if(user){
        if(user.isFarmer){
            await Farmer.findOneAndRemove({email: user.email})
        }
        await user.remove()
        res.json({ message: 'User removed' })
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get a user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    create a user
// @route   POST /api/users
// @access  Private/Admin
const createUser= asyncHandler( async (req, res) => {
    const { name, email, password, isAdmin, isFarmer } = req.body

    const user = new User({
        name: name,
        email: email,
        password: password,
        isAdmin: isAdmin,
        isFarmer: isFarmer
    })

    const createdUser = await user.save()
    
    const users = await User.find({})
    const adminUser = users[0]._id
    const sampleFarmers = []
    if(createdUser.isFarmer){
        sampleFarmers.push({ name: createdUser.name, email: createdUser.email, user: adminUser })
    }
    await Farmer.insertMany(sampleFarmers)

    res.status(201).json(createdUser)
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser= asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin ?? user.isAdmin
        user.isFarmer = req.body.isFarmer ?? user.isFarmer

        const updatedUser = await user.save()

        const users = await User.find({})
        const adminUser = users[0]._id
        const sampleFarmers = await Farmer.find({ email: user.email })

        if(updatedUser.isFarmer){
            if(sampleFarmers){
                await Farmer.findOneAndUpdate(
                    { email: user.email },
                    { $set: {name: updatedUser.name, image: updatedUser.image, email: updatedUser.email, description: req.body.description, user: adminUser} },
                    { new: true }
                )
            }
            else{
                res.status(404)
                throw new Error('Farmer NotFound')
            }
        }

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            isFarmer: updatedUser.isFarmer
        })
    }
    else{
        res.status(404)
        throw new Error('User NotFound')
    }
})

const recommendedProducts = asyncHandler( async (req, res) => {
    const userId = req.params.userId;
  
    // Get the user's search history
    const user = await User.findById(userId).populate('searchHistory.results.product');
    if(user){
        const searchHistory = user.searchHistory;
      
        // Create a map of product IDs to their respective scores
        const productScores = new Map();
        for (const query of searchHistory) {
          for (const result of query.results) {
            const product = result.product;
            const score = result.score;
            if (!productScores.has(product._id)) {
              productScores.set(product._id, 0);
            }
            productScores.set(product._id, productScores.get(product._id) + score);
          }
        }
        
        // Convert the map to an array and sort it by score
        const productsSortedByScore = [...productScores.entries()].sort((a, b) => b[1] - a[1]).map(entry => entry[0]);
    
        // Get the top 10 recommended products
        const topRecommendations = await Product.find({_id: {$in: productsSortedByScore.slice(0, 10)}});
    
        res.json(topRecommendations);
    }
    else{
        res.status(404)
        throw new Error('User NotFound')
    }
})

// Use the User model to interact with the database
const saveSearchHistory = asyncHandler( async (req, res) => {
    const {userId, searchHistory} = req.body
    try {
      const user = await User.findById(userId);
      if(user){
        user.searchHistory.push(searchHistory);
        const updatedUser = await user.save();
        res.json(updatedUser);
      }
      else{
        res.status(404)
        throw new Error('User NotFound')
      }
    } catch (error) {
      console.error('Error saving search history:', error);
    }
})

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, createUser, updateUser, recommendedProducts, saveSearchHistory }