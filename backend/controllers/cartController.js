import asyncHandler from 'express-async-handler'
import CartItem from './../models/cartModel.js'

// @desc    Saves cartItems
// @route   POST /api/cart
// @access  Private
const addCartItems = asyncHandler( async (req, res) => {
    const { cartItems } = req.body
  
    if(cartItems && cartItems.length === 0){
        res.status(400)
        throw new Error('No cart items found')
    }
    else{
        const cartItem = new CartItem({cartItems})
  
        const createdCartItem = await cartItem.save()
  
        res.status(201).json(createdCartItem)
    }
})

// @desc    get logged in user orders
// @route   GET /api/cart/mycart
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
    const orders = await CartItem.find({ user: req.user._id })
    res.json(orders)
})

export { addCartItems, getMyCart }