import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import { register, userRegisterErrorClearingActionCreator } from './../actions/userActions'
import FormContainer from './../components/FormContainer'

const RegisterScreen = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
 
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    console.log(redirect)
    if (userInfo) {
        navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    setMessage(null);
    dispatch(userRegisterErrorClearingActionCreator());
    if(password !== confirmPassword){
        setMessage('Password do not match')
    } 
    else{
        dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1 style={{color: '#27ae60', fontWeight: 'bolder', fontSize: '38px'}}>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label className='my-1' style={{ fontWeight: 'bold'}}>Name</Form.Label>
          <Form.Control type='text' style={{ borderWidth: 2 }} placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold'}}>Email Address</Form.Label>
          <Form.Control type='email' style={{ borderWidth: 2 }} placeholder='Enter your email address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold'}}>Password</Form.Label>
          <Form.Control type='password' style={{ borderWidth: 2 }} placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold'}}>Confirm Password</Form.Label>
          <Form.Control type='password' style={{ borderWidth: 2 }} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' className='my-3' style={{background: '#27ae60'}} variant='dark'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen
