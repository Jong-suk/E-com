import styles from '../Component.module.css'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from './../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from './../actions/cartActions';

const ProductScreen = () => {
  const params = useParams();

  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty))
    navigate('/cart')
  }

  return (
  <>
    <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/'> Go Back </Link>
    {loading ? <Loader /> : error ? <Message variant='danger'>Error</Message> : (
      <Row className='py-5'>
      <Col md={5} >
        <Image src={product.image} alt={product.name} style={{alignContent: 'center'}} fluid rounded />
      </Col>
      <Col md={4} style={{fontSize: '1.8rem'}}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>{product.name}</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              value={product.rating}
              text={` ${product.numReviews} reviews`}
            />
          </ListGroup.Item>
          <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
          <ListGroup.Item>
            Description: {product.description}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3} style={{fontSize: '1.8rem'}}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>₹{product.price}</strong>
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
                <Row>
                  <Col>Qty:</Col>
                  <Col md={8}>
                    <Form.Control as='select' className='form-select' style={{fontSize: '1.6rem'}} value={qty} onChange={(e) =>setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item className='d-grid gap-2'>
              <Button className={styles.btn} style={{fontSize: '1.6rem'}} type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    )}
  </>
  )
}

export default ProductScreen
 