import React, { useEffect } from 'react'
import styles from '../Component.module.css'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './../components/Message'
import Loader from './../components/Loader'
import { deleteUser, listUsers } from '../actions/userActions'
import { useNavigate } from 'react-router-dom';

const UserListScreen = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate() 

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        else{
        navigate('/login')

        }
    }, [dispatch, navigate, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete')){
            dispatch(deleteUser(id))
        }
    }

  return (
    <>
        <Row style={{textAlign: 'center'}}>
            <Col><h1 className={styles.heading}>Users</h1></Col>
            <Col className='text-right'>
                <LinkContainer to={`/admin/user/create`} style={{fontSize: '1.6rem'}}>
                    <Button className={styles.btn} type='button'>
                    <i className='fas fa-plus'></i> Create User
                    </Button>
                </LinkContainer>
            </Col>
        </Row>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm' style={{fontSize: '1.5rem', textAlign: 'center'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>FARMER</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`} style={{textTransform:'lowercase'}}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td>
                                {user.isFarmer ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button className={styles.btn3}>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <>     </>
                                <Button className={styles.btn2} onClick={() => deleteHandler(user._id)}>
                                    <i className='fas fa-trash'></i> 
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default UserListScreen
