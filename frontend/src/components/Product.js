import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({product}) => {
  return (
    <Container className='px-4'>
      <Card className='my-3 p-3 rounded' style={{width:'320px', height:'415px', alignItems:'center'}}> 
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' style={{ height:'250px', width:'250px'}}/> 
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
              <Card.Title as='div'><strong>{product.name}</strong></Card.Title> 
          </Link>
          <Card.Text as='div'>
              <Rating 
                  value={product.rating} 
                  text={`${product.numReviews} reviews`}
                  />
          </Card.Text>
          <Card.Text as='h3'>
                  ₹{product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product
