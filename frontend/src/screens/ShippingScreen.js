import React, { useState } from 'react'
import styles from "../Component.module.css"
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from './../components/FormContainer'
import { saveShippingAddress } from './../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './../components/CheckoutSteps'

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart 

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [pincode, setPincode] = useState(shippingAddress.pincode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, pincode, country }))
        navigate('/payment')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2 className={styles.heading}>Shipping</h2>
      <Form onSubmit={submitHandler} style={{ fontSize: '1.8rem' }}>
        <Form.Group controlId='address'>
          <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Address</Form.Label>
          <Form.Control
            type='text' 
            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
            placeholder='Enter your address' 
            value={address} 
            required
            onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>City</Form.Label>
          <Form.Control
            type='text' 
            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
            placeholder='Enter your city' 
            value={city} 
            required
            onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='pincode'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Pincode</Form.Label>
          <Form.Control
            type='text' 
            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
            placeholder='Enter your pincode' 
            value={pincode} 
            required
            onChange={(e) => setPincode(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Country</Form.Label>
          <Form.Control
            type='text' 
            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
            placeholder='Enter your country' 
            value={country} 
            required
            onChange={(e) => setCountry(e.target.value)}>
          </Form.Control>
        </Form.Group>

        <Button type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
