import React, {  useEffect } from 'react'
import styles from '../Component.module.css'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const ProductListScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])



  return (
    <>
      <h2 className={styles.heading}>Latest Products</h2>
      {loading ? (
        <Loader> Loading.... </Loader>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <Row>
            {products &&
            products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <Product product={product} />
                </Col>
            ))}
          </Row>
      )}
    </>
  )
}

export default ProductListScreen
