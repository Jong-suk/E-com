import axios from 'axios'
import styles from '../Component.module.css'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  
  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()

  const fetchData = async() => {
    const results = [];
    products.forEach((product) => {
      const { name } = product;
      const score = calculateScore(`${name} `, keyword);
      if (score > 0) {
        results.push({ product, score });
      }
    });
    const searchHistory = {
      query: keyword,
      results: results
    };
    
    try {
         await axios.post('/api/users/search', {
        searchHistory: searchHistory, userId: userInfo._id
      });
    } catch (error) {
      console.error(error);
    }
  }

  const calculateScore = (document, query) => {
    const documentTerms = document.toLowerCase().split(/\W+/);
    const queryTerms = query.toLowerCase().split(/\W+/);
    let count = 0;
    queryTerms.forEach((term) => {
      documentTerms.forEach((docTerm) => {
        if (term === docTerm) {
          count++;
        }
      });
    });
    return count / queryTerms.length;
  };

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      fetchData()
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className={styles.searchboxcontainer}>
      <Form.Control
        type='text'
        name='q'
        style={{ fontSize: '1.8rem' }}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' className={styles.btn0} style={{ fontSize: '1.3rem' }}>
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  )
}

export default SearchBox