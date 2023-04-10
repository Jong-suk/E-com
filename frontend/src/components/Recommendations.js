import React, { useState, useEffect } from 'react';
import styles from '../Component.module.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { Col, Row } from 'react-bootstrap';
import Product from './Product';

const Recommendations = () => {
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [products, setProducts] = useState([]);

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(false);

        const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }
      }

        // Fetch recommended products from the backend API
        const response = await axios.get(`/api/users/recommended-products/${userInfo._id}`, config);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userInfo]);

  return (
    <>
      <h2 className={styles.heading}>Recommended Products</h2>
      {loading ? <Loader /> : products.length === 0 ? <Message>No Recommendations Found</Message> : (
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
  );
};

export default Recommendations;