import React, { useEffect } from 'react'
import styles from "../Component.module.css"
import { Link, useParams  } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
// import Product from '../components/Product'
import Rating from './../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { listFarmerDetails, listFarmerProducts } from '../actions/farmerActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const FarmerProfileScreen = () => {
    const params = useParams();
  
    const dispatch = useDispatch()
  
    const farmerDetails = useSelector((state) => state.farmerDetails)
    const { loading, error, farmer } = farmerDetails

    // const farmerProductList = useSelector((state) => state.farmerProductList)
    // const { loading: fpl, error: fpe, products } = farmerProductList

  
    useEffect(() => {
      dispatch(listFarmerDetails(params.id))
      dispatch(listFarmerProducts(params.id))
    }, [dispatch, params])
  
    return (
    <>
      <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/farmers'> Go Back </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row className='py-5'>
        <Col md={5}>
          <Image src={farmer.image} alt={farmer.name} style={{alignContent: 'center'}} fluid rounded />
        </Col>
        <Col md={4} style={{fontSize: '1.8rem'}} className='px-5'>
          <ListGroup variant='flush'>
            <ListGroup.Item style={{ textAlign: 'center' }}>
              <h2 style={{fontSize: '2.2rem'}}>{farmer.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 style={{textTransform:'lowercase'}}>{farmer.email}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={farmer.rating}
                text={`${farmer.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {farmer.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {/* <Col md={3}>
          <h2 className={styles.heading}>Products Produced</h2>
          {fpl ? (
            <Loader> Loading.... </Loader>
          ) : fpe ? (
            <Message variant='danger'>{fpe}</Message>
          ) : (
              <Row>
                {products &&
                products.map(product => (
                  product.user._id === farmer._id && (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                  )
                ))}
              </Row>
          )}
        </Col> */}
      </Row>
      )}
    </>
    )
}

export default FarmerProfileScreen
