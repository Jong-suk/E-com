import React, { useState, useEffect } from 'react'
import styles from '../Component.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from './../components/FormContainer'
import { getUserDetails, updateUser } from './../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
    const params = useParams()
    const userId = params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isFarmer, setIsFarmer] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

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
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        }
        else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                setIsFarmer(user.isFarmer)
            }
        }
    }, [dispatch, user, userId, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id : userId, name, email, isAdmin, isFarmer }))
    }

  return (
    <>
        <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/admin/userlist'> Go Back </Link>
        <FormContainer>
            <h1 className={styles.heading}>Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

export default UserEditScreen
