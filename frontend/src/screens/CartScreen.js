import React, { useEffect } from 'react'
import styles from "../Component.module.css"
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

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () =>{
        navigate('/login?redirect=/shipping')
    }

  return (
    <>
    {userInfo ? 
        <>
            <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/products'> Go Back </Link>
            <Row>
            <Col md={8}>
                <h2 className={styles.heading}>Your Shopping Cart</h2>
                {cartItems.length === 0 ? <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush' style={{fontSize: '1.8rem'}}>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row style={{ alignItems: 'center' }}>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>₹ {item.price}/Kg</Col>
                                    <Col md={4}>
                                        <Form.Control as='select' className='form-select' style={{ borderWidth: '.1rem', borderColor: 'black', fontSize: '1.8rem' }} value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={1} className='px-2'>
                                        <Button type='button' className={styles.btn2} style={{fontSize: '1.8rem'}} variant='light' onClick={() => removeFromCartHandler(item.product)}>
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
                <Card  style={{fontSize: '1.6rem'}}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item style={{ textAlign: 'center' }}>
                            <h2 className={styles.heading} style={{fontSize: '2.6rem', color: 'var(--black)'}}>SubTotal ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)}) items</h2>
                        <hr />
                        <Row>     
                            {cartItems && cartItems.length > 0 && (
                            <div>
                                {cartItems.map((item, index) => (
                                <div key={index}>
                                <p style={{fontSize: '2rem'}}>
                                Item-{index+1}: {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                </p>
                                </div>
                                ))}
                            </div>
                            )}
                        </Row>
                        <hr />
                        <Row>
                            <p style={{fontSize: '2rem'}}>Total: ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-grid gap-2'>
                            <Button className={styles.btn} style={{fontSize: '1.6rem'}} type='button' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                                Proceed to checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            </Row>
        </>
        : (
            navigate('/login')
        )
    }
   
    </>
  )
}

export default CartScreen
