import React, { useEffect } from 'react'
import styles from "../Component.module.css"
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from './../components/Loader'
import { getOrderDetails, payOrder} from './../actions/orderActions'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import { resetCartItems } from './../actions/cartActions';

const OrderScreen = () => {
  const dispatch = useDispatch()

  const params = useParams()
  const orderId = params.id

  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay


  useEffect(() => {
    if(!order || order._id !== orderId || successPay){
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
      dispatch(resetCartItems())
    }
  }, [dispatch, order, orderId, successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  };

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
    <Row >
        <Col md={9} >
            <ListGroup variant='flush' style={{fontSize: '1.8rem'}}>
              <h2 className={styles.heading}>Order Review</h2>
                <ListGroup.Item>
                    <h2 style={{fontSize: '2rem'}}>Shipping Address:</h2>
                    <p>
                        <strong style={{fontWeight:'bold'}}>Name: </strong> 
                        {order.user.name}
                    </p>
                    <p>
                        <strong style={{fontWeight:'bold'}}>Email: </strong> 
                        <a href={`mailto: ${order.user.email}`} style={{textTransform:'lowercase'}}>{order.user.email}</a> 
                    </p>
                    <p>
                        <strong style={{fontWeight:'bold'}}>Address: </strong>
                        <strong> 
                        {order.shippingAddress.address},{' '}
                        {order.shippingAddress.city},{' '}
                        {order.shippingAddress.pincode},{' '}
                        {order.shippingAddress.country}
                        </strong>
                    </p>
                    {order.isDelivered ? ( <Message variant='success'>Delivered on {order.deliveredAt}</Message> ) : 
                    ( <Message variant='danger'>Not Delivered</Message> )}

                </ListGroup.Item>

                <ListGroup.Item>
                    <h2 style={{fontSize: '2rem'}}>Payment Method:</h2>
                    <p>
                        <strong>Method: </strong> 
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? ( <Message variant='success'>Paid on {order.paidAt}</Message> ) : 
                    ( <Message variant='danger'>Not Paid</Message> )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2 style={{fontSize: '2rem'}}>Ordered Items:</h2>
                    {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                    <ListGroup variant='flush'>
                      <Row>
                        <Col md={1}></Col>
                        <Col md={3} style={{ textAlign: "center" }}>Item Name</Col>
                        <Col md={6}>
                          <Col style={{ textAlign: "center" }}>Quantity &ensp;  &ensp; &ensp; Price &ensp; &ensp; &ensp; &ensp; &ensp; Total</Col>
                        </Col>
                      </Row>
                      {order.orderItems.map((item, index) => {
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
                                &ensp; {item.qty} &ensp; &ensp; x &ensp; &ensp; ₹{item.price} &ensp; &ensp; = &ensp; &ensp; ₹{item.qty * item.price}
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
                <Col>₹{order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>₹{order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>₹{order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>₹{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending && <Loader />}
                  {isRejected && (
                    <Message variant="danger">"SDK load error"</Message>
                  )}
                  {isResolved && (
                    <PayPalButtons
                      amount={order.totalPrice}
                      onApprove={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

          </ListGroup>
        </Col>
      </Row>
  </>;
}

export default OrderScreen
