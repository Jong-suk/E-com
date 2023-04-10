import React, {  useEffect } from 'react'
import styles from '../Component.module.css'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel';
import Recommendations from '../components/Recommendations'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const keyword = params.keyword

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])
  
  return (
    <>
      {!keyword && <ProductCarousel />}
      {!keyword && <Recommendations />}
      <h1 className={styles.heading}>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
          <Row>
            {products &&
            products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex' >
                    <Product product={product} />
                </Col>
            ))}
          </Row>
      )}
    </>
  )
}

export default ProductListScreen