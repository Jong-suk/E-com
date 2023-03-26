import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    cartItems: [
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
        },
    },
    ]
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

export default CartItem
