import React, { useEffect } from 'react'
import styles from "../Component.module.css"
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from './../components/CheckoutSteps'
import { createOrder } from './../actions/orderActions'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if(success){
      navigate(`/order/${order._id}`)
    }
    
  }, [navigate, success, order])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice, 
      shippingPrice: cart.shippingPrice, 
      totalPrice: cart.totalPrice
    }))
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row >
        <Col md={9}>
            <ListGroup variant='flush' style={{fontSize: '1.8rem'}}>
              <h2 className={styles.heading}>Order Review</h2>
                <ListGroup.Item>
                    <h2 style={{fontSize: '2rem'}}>Shipping Address:</h2>
                    <p>
                        <strong> 
                        {cart.shippingAddress.address},{' '}
                        {cart.shippingAddress.city},{' '}
                        {cart.shippingAddress.pincode},{' '}
                        {cart.shippingAddress.country}
                        </strong>
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 style={{fontSize: '2rem'}}>Payment Method:</h2>
                  <strong>{cart.paymentMethod}</strong>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2 style={{fontSize: '2rem'}}>Ordered Items:</h2>
                  {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                    <ListGroup variant='flush'>
                      <Row>
                        <Col md={1}></Col>
                        <Col md={3} style={{ textAlign: "center" }}>Item Name</Col>
                        <Col md={6}>
                          <Col style={{ textAlign: "center" }}>
                            <Row>
                              <Col>Quantity</Col>
                              <Col></Col>
                              <Col>Price</Col>
                              <Col></Col>
                              <Col>Total</Col>
                            </Row>
                          </Col>
                        </Col>
                      </Row>
                      {cart.cartItems.map((item, index) => {
                        return (
                          <ListGroup.Item key={index}>
                            
                            <Row>
                              <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded/>
                              </Col>
                              <Col md={3} style={{ textAlign: "center" }}>
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>
                              </Col>
                              <Col md={6} style={{ textAlign: "center" }}>
                                <Row>
                                  <Col>{item.qty}</Col>
                                  <Col>x</Col>
                                  <Col>₹{item.price}</Col>
                                  <Col>=</Col>
                                  <Col>₹{item.qty * item.price}</Col>
                                </Row>
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        )
                      })}
                    </ListGroup>
                  )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3} style={{ textAlign: 'center' }}>
          <ListGroup variant='flush' style={{fontSize: '1.8rem'}}>
            <ListGroup.Item>
              <h2 className={styles.heading} style={{color: 'var(--black)'}}>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>₹{cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>₹{cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>₹{cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>₹{cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className='d-grid gap-2'>
            {error && <Message variant='danger'>{error}</Message>}

                    <Button className={styles.btn} style={{fontSize: '1.6rem'}} type='button' disabled={cart.cartItems.countInStock === 0} onClick={placeOrderHandler}>
                        Place Order
                    </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
