import styles from '../Component.module.css'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
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