import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styles from '../Component.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import FormContainer from './../components/FormContainer'
import { listProductDetails, updateProduct } from './../actions/productActions'
import { PRODUCT_UPDATE_RESET } from './../constants/productConstants';

const ProductEditScreen = () => {
    const params = useParams()
    const productId = params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: lpu, error: epu, success: spu } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        else{
            if (spu) {
                dispatch({ type: PRODUCT_UPDATE_RESET })
                navigate('/farmer/productlist')
              } 
            else {
                if(!product.name || product._id !== productId){
                    dispatch(listProductDetails(productId))
                }
                else{
                    setName(product.name)
                    setImage(product.image)
                    setDescription(product.description)
                    setCategory(product.category)
                    setPrice(product.price)
                    setCountInStock(product.countInStock)
                }
            }
        } 
    }, [dispatch, userInfo, product, productId, spu, navigate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct({
              _id: productId,
              name,
              image,
              category,
              description,
              price,
              countInStock,
            })
          )
    }

  return (
    <>
        <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/farmer/productlist'> Go Back </Link>
        <FormContainer>
            <h1 className={styles.heading}>Edit Product</h1>
            {lpu && <Loader />}
            {epu && <Message variant='danger'>{epu}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Form onSubmit={submitHandler} style={{ fontSize: '1.8rem' }}>
                    <Form.Group controlId='name'>
                        <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Name</Form.Label>
                        <Form.Control 
                            type='text' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            placeholder='Enter product name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Image</Form.Label>
                        <Form.Control 
                            type='text' 
                            style={{ borderWidth: 2, fontSize: '1.8rem', textTransform: 'lowercase' }} 
                            placeholder='Enter image url' 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)}>
                        </Form.Control>
                        <Form.Control 
                            className='my-3'
                            type='file'
                            id='image-file'
                            label='Choose File'
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            custom
                            onChange={uploadFileHandler}>
                        </Form.Control>
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Description</Form.Label>
                        <Form.Control 
                            type='text' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            placeholder='Enter product description' 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Category</Form.Label>
                        <Form.Control 
                            type='text' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            placeholder='Enter product category' 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Price</Form.Label>
                        <Form.Control 
                            type='number' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            placeholder='Enter product price' 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label className='my-1' style={{ fontWeight: 'bold' }}>Stock</Form.Label>
                        <Form.Control 
                            type='number' 
                            style={{ borderWidth: 2, fontSize: '1.8rem' }} 
                            placeholder='Enter product stock available' 
                            value={countInStock} 
                            onChange={(e) => setCountInStock(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' className={styles.btn} style={{fontSize: '1.6rem'}} variant='dark'>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>
  )
}

export default ProductEditScreen
