import React, { useState, useEffect } from 'react'
import styles from '../Component.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from './../components/FormContainer'
import { createUser } from './../actions/userActions'
import { USER_CREATE_RESET } from '../constants/userConstants'

const UserCreateScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isFarmer, setIsFarmer] = useState(false)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userCreate = useSelector((state) => state.userCreate)
    const { loading: luc, error: euc, success: suc } = userCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleOnChangeAdmin = () =>{
        if(isAdmin === false){
            setIsAdmin(!isAdmin)
            setIsFarmer(false)
        }
        if(isAdmin === true){
            setIsAdmin(!isAdmin)
            setIsFarmer(false)
        }
    }
    const handleOnChangeFarmer = () => {
        if(isFarmer === false){
            setIsFarmer(!isFarmer)
            setIsAdmin(false)
        }
        if(isFarmer === true){
            setIsFarmer(!isFarmer)
            setIsAdmin(false)
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else{
            if(suc){
                dispatch({ type: USER_CREATE_RESET })
                navigate('/admin/userlist')
            }
        }
    }, [dispatch, userInfo, user, navigate, suc])

    const submitHandler = (e) => {
        e.preventDefault()
        setMessage(null);
        if(password !== confirmPassword){
            setMessage('Password do not match')
        } 
        else{
            dispatch(createUser({ name, email, password, isAdmin, isFarmer }))
        }
    }

  return (
    <>
        <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/admin/userlist'> Go Back </Link>
        <FormContainer>
            <h1 className={styles.heading}>Create User</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {luc && <Loader />}
            {euc && <Message variant='danger'>{euc}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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
                        <Form.Control type='password' style={{ borderWidth: 2, fontSize: '1.8rem' }} placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label className='my-3' style={{ fontWeight: 'bold' }}>Confirm Password</Form.Label>
                        <Form.Control type='password' style={{ borderWidth: 2, fontSize: '1.8rem' }} placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='isadmin'>
                        <Form.Check 
                            className='my-3'
                            type='checkbox' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            label='isadmin' 
                            checked={isAdmin}
                            onChange={() => {handleOnChangeAdmin()}}>
                        </Form.Check>
                    </Form.Group>

                    <Form.Group controlId='isfarmer'>
                        <Form.Check 
                            className='my-3'
                            type='checkbox' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            label='isfarmer' 
                            checked={isFarmer}
                            onChange={() => {handleOnChangeFarmer()}}>
                        </Form.Check>
                    </Form.Group>

                    <Button type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default UserCreateScreen