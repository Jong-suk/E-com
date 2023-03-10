import styles from '../Component.module.css'
import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import styled  from 'styled-components'

const NavLink = styled.div`
    display: flex;
    margin-left: 20px;
    font-size: 2rem;
    border-radius: .5rem;
    color: #2c2c54;
    
    &:hover {
        background:#27ae60;
        color: #fff;
    }
`;

const NavLin = styled.div`
    font-size: 1.6rem;
    margin-left: 20px;
    display: flex;
    align-items: center;
    border-radius: .5rem;
    color: #2c2c54;
    
    &:hover {
        background:#27ae60;
        color:#fff;
    }
`;


const SubHeader = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin )
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar className={styles.header2}>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink>
                        <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link> 
                        </LinkContainer>
                    </NavLink>
                    <NavLink>
                        <LinkContainer to='/farmers'>
                            <Nav.Link>Farmer List</Nav.Link>
                        </LinkContainer>
                    </NavLink>
                    <NavLink>
                        <LinkContainer to='/bid'>
                            <Nav.Link>Bid</Nav.Link>
                        </LinkContainer>
                    </NavLink>
                    <NavLink>
                        <LinkContainer to='/contact'>
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer> 
                    </NavLink>    
                </Nav>
                
                <Nav className="ms-auto">
                    <NavLink>
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                        </LinkContainer>
                    </NavLink>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} className={styles.user} id='username'>
                                <NavLin>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                </NavLin>
                                <NavLin><NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item></NavLin>
                            </NavDropdown>
                        
                        ) : <NavLink>
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>
                            </NavLink>
                        }
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </header>
  )
}

export default SubHeader
