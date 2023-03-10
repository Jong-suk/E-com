import styles from '../Component.module.css'
import React, {  useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Farmer from '../components/Farmer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listFarmers } from '../actions/farmerActions'

const FarmerScreen = () => {
    const dispatch = useDispatch()

    const farmerList = useSelector((state) => state.farmerList)
    const { loading, error, farmers } = farmerList
  
    useEffect(() => {
      dispatch(listFarmers())
    }, [dispatch])
  
  
  
    return (
      <>
        <h2 className={styles.heading}>Farmers List</h2>
        {loading ? (
          <Loader> Loading.... </Loader>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
            <Row>
              {farmers &&
              farmers.map(farmer => (
                  <Col key={farmer._id} sm={12} md={6} lg={4} xl={3} >
                      <Farmer farmer={farmer} />
                  </Col>
              ))}
            </Row>
        )}
      </>
    )
}

export default FarmerScreen
