import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    } 
}, {
    timestamps: true
})

const farmerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isFarmer: {
        type: Boolean,
        required: true,
        default: true
    },
    description: {
        type: String,
        required: false
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        }
    ],
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: false,
        default: 0
    },
    numReviews: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
})

const Farmer = mongoose.model('Farmer', farmerSchema)

export default Farmer