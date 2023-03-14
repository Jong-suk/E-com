import React, { useState } from 'react'
import styles from '../Component.module.css'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from './../components/FormContainer'
import { savePaymentMethod } from './../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from './../components/CheckoutSteps'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart 

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    if(!shippingAddress){
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2 className={styles.heading}>Payment</h2>
      <Form onSubmit={submitHandler} style={{fontSize: '1.8rem'}}>
        <Form.Group>
            <Form.Label as='h3'>Select Method</Form.Label>
            <Col>
                <Form.Check 
                    type='radio' 
                    label='PayPal or Credit Card' 
                    id='PayPal'
                    name='paymentMethod' 
                    value='PayPal' 
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </Form.Check>

                {/* <Form.Check 
                    type='radio' 
                    label='GPay' 
                    id='GPay'
                    name='paymentMethod' 
                    value='GPay' 
                    checked={paymentMethod === "GPay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                </Form.Check> */}
            </Col>
        </Form.Group>

        <Button type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
