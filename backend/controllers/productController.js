import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetches all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler( async (req, res) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}
  const products = await Product.find({ ...keyword }).populate('user', 'name')

  res.json(products)
})

// @desc    Fetches single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id).populate('user', 'name email isAdmin isFarmer')

  if(product) {
      res.json(product);
  } else {
      res.status(404);
      throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer|Admin
const createProduct = asyncHandler( async (req, res) => {
  const { name, image, description, category, price, countInStock } = req.body

  const product = new Product({
      name: name,
      image: image,
      user: req.user._id,
      description: description,
      category: category,
      price: price,
      countInStock: countInStock,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Farmer|Admin
const updateProduct = asyncHandler( async (req, res) => {
  const { name, image, description, category, price, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if(product){
      product.name = name
      product.image = image
      product.description = description
      product.category = category
      product.price = price
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
  }
  else{
      res.status(404)
      throw new Error('Product not found')
  }  
})

// @desc    Deletes single product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id)

  if(product) {
      await product.remove()
      res.json({ message: 'Product Removed' });
  } else {
      res.status(404);
      throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// update review
// put api/products/:id/reviews
//private
const updateProductReview = asyncHandler(async(req,res) =>{
  const {comment , rating:ratings} =req.body
  const product = await Product.findById(req.params.id);
  
  if(product)
  {
      const targetReview = product.reviews.find((review) =>  review.user.toString() === req.user.id.toString())
      
          targetReview.comment = comment,
          targetReview.rating = ratings,
          targetReview.user = req.user._id,
          targetReview.name = req.user.name
      
      const rating = product.reviews.reduce((acc,item) => item.rating +acc,0) / product.reviews.length//update the rating
  
      const numReviews = product.reviews.length
      await product.save()
      res.status(201).json({message:'Review Updated'})
  }
  else{
     
      res.status(401)
      throw new Error('No Product found')
  }
  
})

// delete review
// delete api/products/:id/reviews
//private
const deleteProductReview = asyncHandler(async(req,res) =>{
 
  const product = await Product.findById(req.params.id);
   
  if(product)
  {
      const reviews = product.reviews.filter(review => review.user.toString() !== req.user.id.toString());
   
      const rating = product.reviews.reduce((acc,item) => item.rating +acc,0) / product.reviews.length//update the rating
      
      const numReviews = product.reviews.length//update num
      
      await Product.findByIdAndUpdate(req.params.id,{
          reviews,
          rating,
          numReviews
      })
      res.status(201).json({message:'Review Deleted'})
  }
  else{
      res.status(401)
      throw new Error('No Product found')
  }
   
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
  })

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview, updateProductReview, deleteProductReview, getTopProducts }