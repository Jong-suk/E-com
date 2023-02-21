import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar style={{background: '#27ae60'}} variant='dark' expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer style={{ fontSize: '37px'}} to='/'>
                <Navbar.Brand>Seed The Rise</Navbar.Brand>
              </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <LinkContainer to='/cart'>
                    <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                  </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
