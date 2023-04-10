import styles from '../Component.module.css'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from './../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview, deleteProductReview, updateProductReview } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createCartItem } from './../actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_UPDATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = () => {
  const params = useParams();

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [showEditForm, setShowEditForm] = useState(false);

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: spr, loading: lpr, error: epr } = productReviewCreate

  const productReviewUpdate = useSelector((state) => state.productReviewUpdate)
  const { success: spu, loading: lpu, error: epu } = productReviewUpdate

  const productReviewDelete = useSelector((state) => state.productReviewDelete)
  const { success: spd, loading: lpd, error: epd } = productReviewDelete

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
    else{
      if (spr) {
        setRating(0)
        setComment('')
        dispatch(listProductDetails(params.id))
      }
      if(spu){
        setRating(0)
        setComment('')
        dispatch(listProductDetails(params.id))
      }
      if(spd){
        setRating(0)
        setComment('')
        dispatch(listProductDetails(params.id))
      }
      if(!product || product._id !== params.id){
        dispatch(listProductDetails(params.id))
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        dispatch({ type: PRODUCT_UPDATE_REVIEW_RESET })
      }
    }
  }, [dispatch, params, userInfo, product, spr, spu, spd, navigate])

  const addToCartHandler = () => {
    dispatch(createCartItem({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty
    }))
    navigate(`/cart`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(params.id, { rating, comment }))
    dispatch(listProductDetails(params.id))
    // window.location.reload()
  }

  const handleEditReview = () => {
    setShowEditForm(true);
  };

  const editReviewHandler = (e) => {
    e.preventDefault()
    dispatch(updateProductReview(params.id, { rating, comment }))
    dispatch(listProductDetails(params.id))
    // window.location.reload()
  }

  const removeReviewHandler = () => {
    if(window.confirm('Are you sure you want to delete')){
        dispatch(deleteProductReview(params.id))
        dispatch(listProductDetails(params.id))
        // window.location.reload()
      }
}

  return (
  <>
    <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/products'> Go Back </Link>
    {lpr && <Loader />}
    {lpd && <Loader />}
    {epd && <Message variant='danger'>{epd}</Message>}
    {lpu && <Loader />}
    {loading ? <Loader /> : error ? <Message variant='danger'>Error</Message> : (
    <>
      <Row className='py-5'>
      <Col md={4} >
        <Image src={product.image} alt={product.name} style={{alignContent: 'center'}} fluid rounded />
      </Col>
      <Col md={5} style={{fontSize: '1.8rem'}} className='px-5'>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2 style={{fontSize: '2.2rem', textAlign: 'center'}}>{product.name}</h2>
            {
              product.user && product.user.isAdmin && (
                <strong style={{fontWeight:'bold'}}>Seller: {product.user.name}</strong>
              )
            }{
              product.user && product.user.isFarmer && (
                <strong style={{fontWeight:'bold'}}>Seller: <Link to={`/farmer/${product.user._id}`}>{product.user.name}</Link> </strong>
              )
            }
            <br/>
            <strong style={{fontWeight:'bold'}}>Category: {product.category}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              value={product.rating}
              text={` ${product.numReviews} reviews`}
            />
          </ListGroup.Item>
          <ListGroup.Item>Price: ₹{product.price}/Kg</ListGroup.Item>
          <ListGroup.Item>
            Description: {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3} style={{fontSize: '1.8rem', textAlign: 'justify' }}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>₹{product.price}/Kg</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>

            {product.countInStock > 0  && (
              <ListGroup.Item>
                <Row style={{ alignItems: 'center' }}>
                  <Col>Qty:</Col>
                  <Col md={8}>
                    <Form.Control as='select' className='form-select' style={{ borderWidth: '.1rem', borderColor: 'black', fontSize: '1.8rem' }} value={qty} onChange={(e) =>setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} style={{ textAlign:'center' }}>
                          {x + 1} Kg
                        </option>
                      ))}
                    </Form.Control> 
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item className='d-grid gap-2'>
              <Button className={styles.btn} style={{fontSize: '1.6rem'}} type='button' disabled={product.countInStock === 0} 
              onClick={() => addToCartHandler()}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <h2 className={styles.heading}>Reviews</h2>
        {lpd && <Loader />}
        {product.reviews.length === 0 && <Message>No Reviews</Message>}
        <ListGroup variant='flush' style={{fontSize: '1.8rem'}}>
          {product.reviews && (
            product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <Col md={8}>
                <Rating value={review.rating} />
                <p>{review.comment}</p>
                <p style={{ fontWeight: 'bold' }}>{review.name}</p>
                <p>{review.createdAt.substring(0, 10)}</p>
              </Col>
              {userInfo && review.user === userInfo._id && (  
              <> 
              <Col>
                <Button className={styles.btn3} onClick={() => handleEditReview()}>
                  <i className='fas fa-edit'></i>
                </Button>
                <> </>
                <Button className={styles.btn2} onClick={() => removeReviewHandler()}>
                    <i className='fas fa-trash'></i> 
                </Button>
              </Col>
              
              {showEditForm &&
                <Row>
                  {lpu && <Loader />}
                  {spu && (<Message variant='success'>Review updated successfully</Message>)}
                  {epu && (<Message variant='danger'>{epu}</Message>)}
                  <h2 className={styles.heading}>Update Review</h2>
                  <Form onSubmit={editReviewHandler} style={{ fontSize: '1.8rem' }}>
                  <Form.Group controlId='rating'>
                    <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Rating</Form.Label>
                    <Form.Control 
                      as="select" 
                      style={{ borderWidth: 2, fontSize: '1.8rem' }}
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)}>
                      
                      <option value=''>Select...</option>
                      <option value='1'>1- poor</option>
                      <option value='2'>2- Fair</option>
                      <option value='3'>3- Good</option>
                      <option value='4'>4- Very Good</option>
                      <option value='5'>5- Excellent</option>
                    </Form.Control>
                  </Form.Group>
                
                  <Form.Group controlId='comment'>
                    <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Comment</Form.Label>
                    <Form.Control 
                      as="textarea"
                      style={{ borderWidth: 2, fontSize: '1.8rem' }}
                      row='3' 
                      value={comment} 
                      onChange={(e) => setComment(e.target.value)}>
                    </Form.Control>
                  </Form.Group>

                  <Button disabled={lpr} type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>
                    Update     
                  </Button>
                  </Form>
                </Row>
                }
              </>
              )}
            </ListGroup.Item>
          )))}
          <ListGroup.Item>
          {spr && (<Message variant='success'>Review submitted successfully</Message>)}
          {lpr && <Loader />}
          {epr && (<Message variant='danger'>{epr}</Message>)}
          {!product.reviews.some((rev) => rev.user === userInfo._id) && (
            <>
              <h2 className={styles.heading}>Write a Customer Review</h2>
              {userInfo ? (
                <Form onSubmit={submitHandler} style={{ fontSize: '1.8rem' }}>
                  <Form.Group controlId='rating'>
                    <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Rating</Form.Label>
                    <Form.Control
                      as='select'
                      style={{ borderWidth: 2, fontSize: '1.8rem' }}
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Comment</Form.Label>
                    <Form.Control
                      as='textarea'
                      style={{ borderWidth: 2, fontSize: '1.8rem' }}
                      row='3'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={lpr}
                    type='submit'
                    className={styles.btn} 
                    style={{fontSize: '1.6rem'}} 
                    variant='dark'
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to='/login'>Sign in</Link> to write a review{' '}
                </Message>
              )}
            </>
          )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
    </>
    )}
  </>
  )
}

export default ProductScreen
 