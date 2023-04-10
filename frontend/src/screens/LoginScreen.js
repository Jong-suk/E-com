import styles from '../Component.module.css'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import { login } from './../actions/userActions'
import FormContainer from './../components/FormContainer'

const LoginScreen = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
 
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
        navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>

      <h2 className={styles.heading}>Sign In</h2>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} style={{ fontSize: '1.8rem' }}>
        <Form.Group controlId='email'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Email Address</Form.Label>
          <Form.Control type='email' style={{ borderWidth: 2, textTransform: 'lowercase', fontSize: '1.8rem' }} placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Password</Form.Label>
          <Form.Control type='password' style={{ borderWidth: 2, fontSize: '1.8rem' }} placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>Sign In</Button>
      </Form>

      <Row className='py-3' style={{fontSize: '1.6rem'}}>
        <Col>
          New User?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default LoginScreen
