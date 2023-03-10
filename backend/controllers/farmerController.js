import asyncHandler from 'express-async-handler'
import Farmer from './../models/farmerModel.js'

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
    const farmer = await Farmer.findById(req.params.id);

    if(farmer) {
        res.json(farmer);
    } else {
        res.status(404);
        throw new Error('Farmer not found')
    }
})

export { getFarmers, getFarmerById}