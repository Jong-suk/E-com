import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';    
import { addToCart, removeFromCart } from './../actions/cartActions';

const CartScreen = () => {
    const params = useParams();
    const productId = params.id

    const [searchParams] = useSearchParams();
    const qty = Number(searchParams.get("qty"));

    const dispatch = useDispatch()

    const navigate = useNavigate() 

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () =>{
        navigate('/login?redirect=shipping')
    }

  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message> : (
            <ListGroup variant='flush'>
                {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>₹ {item.price}</Col>
                            <Col md={4}>
                                <Form.Control as='select' className='form-select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>
                            <Col md={1}>
                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    ₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item className='d-grid gap-2'>
                    <Button type='button' disabled={cartItems.countInStock === 0} onClick={checkOutHandler}>
                        Proceed to checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
