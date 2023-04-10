import asyncHandler from 'express-async-handler'
import CartItem from './../models/cartModel.js'

// @desc    add cartItems
// @route   POST /api/cart
// @access  Private
const addCartItems = asyncHandler( async (req, res) => {

    if(req.body && req.body.length === 0){
        res.status(400)
        throw new Error('No cart items found')
    }
    else{
        const cartItems = await CartItem.findOne({ product: req.body.product })
        if(!cartItems){
            const cartItem = new CartItem({
                user: req.user._id,
                product: req.body.product,
                name: req.body.name,
                image: req.body.image,
                price: req.body.price,
                countInStock: req.body.countInStock,
                qty: req.body.qty
            })
            const createdCartItem = await cartItem.save()
            res.status(201).json(createdCartItem)
        }
    }
})

// @desc    Update cartitem
// @route   PUT /api/cart/:productid
// @access  Private
const updateCartItem = asyncHandler( async (req, res) => {
    // const { cartItems } = req.body
  
    const cartItem = await CartItem.findOne({ product: req.body.product })
  
    if(cartItem){
        const updatedCartItem = await CartItem.findOneAndUpdate(
            { product: req.body.product },
            { $set: {qty: req.body.qty} },
            { new: true }
        )
        res.json(updatedCartItem)
    }
    else{
        res.status(404)
        throw new Error('Cartitem not found')
    }  
})
  
// @desc    Deletes cartitem
// @route   DELETE /api/cart/:productid
// @access  Private
const deleteCartItem = asyncHandler( async (req, res) => {
    const cartItem = await CartItem.findOne({ product: req.params.id })

    if(cartItem) {
        await CartItem.deleteOne(cartItem)
        res.json({ message: 'Cartitem Removed' });
    } else {
        res.status(404);
        throw new Error('Cartitem not found')
    }
})

// @desc    get logged in user cartitems
// @route   GET /api/cart/mycart
// @access  Private
const getMyCart = asyncHandler(async (req, res) => {
    const cartItems = await CartItem.find({ user: req.user._id })
    res.json(cartItems)
})

export { addCartItems, updateCartItem, deleteCartItem, getMyCart }