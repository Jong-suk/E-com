import asyncHandler from 'express-async-handler'
import Farmer from './../models/farmerModel.js'
import Product from './../models/productModel.js'

// @desc    Fetches all farmers
// @route   GET /api/farmers
// @access  Public
const getFarmers = asyncHandler( async (req, res) => {
    const farmers = await Farmer.find({})

    res.json(farmers)
})

// @desc    Fetches single farmer
// @route   GET /api/farmers/:id
// @access  Public
const getFarmerById = asyncHandler( async (req, res) => {
    const farmer = await Farmer.findById(req.params.id)
    //.populate('product', 'name image rating numReviews price');

    if(farmer) {
        res.json(farmer);
    } else {
        res.status(404);
        throw new Error('Farmer not found')
    }
})

// @desc    Fetches single farmer's product
// @route   GET /api/farmers/:id/products
// @access  Public
const getFarmerProductsById = asyncHandler(async (req, res) => {
    const farmer = await Farmer.findById(req.params.id).populate('products');
  
    if (!farmer) {
      res.status(404);
      throw new Error('Farmer not found');
    }
  
    res.json(farmer.products);
  });
  

export { getFarmers, getFarmerById, getFarmerProductsById }