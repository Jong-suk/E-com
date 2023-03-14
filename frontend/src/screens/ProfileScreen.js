import React, { useState, useEffect } from 'react'
import styles from '../Component.module.css'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import { getUserDetails, updateUserProfile } from './../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
 
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderMyList = useSelector((state) => state.orderMyList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

  useEffect(() => {
    if (!userInfo) {
        navigate('/login')
    }
    else{
        if(!user || !user.name || success){
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(getUserDetails('profile'))
            dispatch(listMyOrders())
        }
        else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [dispatch, navigate, user, userInfo, success])

  const submitHandler = (e) => {
    e.preventDefault()
    setMessage(null);
    if(password !== confirmPassword){
        setMessage('Password do not match')
    } 
    else{
        dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
        <Col md={4}>
            <h2 className={styles.heading}>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Successfully Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} style={{ fontSize: '1.8rem' }}>
                <Form.Group controlId='name'>
                <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Name</Form.Label>
                <Form.Control type='text' style={{ borderWidth: 2, fontSize: '1.8rem' }} placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Email Address</Form.Label>
                <Form.Control type='email' style={{ borderWidth: 2, textTransform: 'lowercase', fontSize: '1.8rem' }} placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Password</Form.Label>
                <Form.Control type='password' style={{ borderWidth: 2, fontSize: '1.8rem' }} placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Confirm Password</Form.Label>
                <Form.Control type='password' style={{ borderWidth: 2, fontSize: '1.8rem' }} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>Update</Button>
            </Form>
        </Col>
        <Col md={8} style={{ textAlign: 'center' }}>
            <h2 className={styles.heading}>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                <Table striped bordered hover responsive className='table-sm' style={{fontSize: '1.5rem', textAlign: 'center'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} style={{fontSize: '1.5rem'}}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className={styles.btn1} type='button'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen
