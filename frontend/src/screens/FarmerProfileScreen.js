import React, { useEffect } from 'react'
import styles from "../Component.module.css"
import { Link, useParams  } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Rating from './../components/Rating'
import { useDispatch, useSelector } from 'react-redux';
import { listFarmerDetails } from '../actions/farmerActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const FarmerProfileScreen = () => {
    const params = useParams();
  
    const dispatch = useDispatch()
  
    const farmerDetails = useSelector((state) => state.farmerDetails)
    const { loading, error, farmer } = farmerDetails
  
    useEffect(() => {
      dispatch(listFarmerDetails(params.id))
    }, [dispatch, params])
  
    return (
    <>
      <Link className={styles.btn} style={{fontSize: '1.6rem'}} to='/farmers'> Go Back </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>Error</Message> : (
        <Row className='py-5'>
        <Col md={5}>
          <Image src={farmer.image} alt={farmer.name} fluid rounded />
        </Col>
        <Col md={4} style={{textAlign: 'center'}}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{farmer.name}</h2>
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
      </Row>
      )}
    </>
    )
}

export default FarmerProfileScreen
