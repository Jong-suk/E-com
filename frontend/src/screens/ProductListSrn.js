import React, { useEffect } from 'react'
import styles from '../Component.module.css'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import { listProducts } from '../actions/productActions'
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListSrn = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate() 

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productCreate = useSelector(state => state.productCreate)
    const { loading: lpc, error: epc, success: spc, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo){
            navigate('/login')
        }
        else{
            dispatch({ type: PRODUCT_CREATE_RESET })

            if(!userInfo.isFarmer){
                navigate('/login')
            }

            if(spc){
                navigate(`/farmer/product/${createdProduct._id}/edit`)
            }
            else{
                dispatch(listProducts())
            }
        }
    }, [dispatch, navigate, userInfo, spc, createdProduct])

  return (
    <>
        <Row style={{textAlign: 'center'}}>
            <Col><h1 className={styles.heading}>Products</h1></Col>
            <Col className='text-right'>
                <LinkContainer to={`/farmer/product/create`} style={{fontSize: '1.6rem'}}>
                    <Button className={styles.btn} type='button'>
                    <i className='fas fa-plus'></i> Create Product
                    </Button>
                </LinkContainer>
            </Col>
        </Row>
        {lpc && <Loader />}
        {epc && <Message variant='danger'>{epc}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm' style={{fontSize: '1.5rem', textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>SELLER</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>(
                        product.user._id === userInfo._id && (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>₹{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.user.name}</td>
                                <td>
                                    <LinkContainer to={`/farmer/product/${product._id}/edit`}>
                                        <Button className={styles.btn3}>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ProductListSrn
