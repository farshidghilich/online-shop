import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

import { signoutAction } from '../Redux/action';

const Header = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(store => store.cart)
    const userLogin = useSelector((state) => state.userSignin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(signoutAction());
    };

    return (
        <header>
            <Navbar bg="light" variant="light" expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='Home'>امازون ایران</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle
                        aria-controls='basic-navbar-nav'
                        className='text-primary'
                    >
                        منو
                    </Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <i className='fa fa-shopping-cart' />  {cartItems.length > 0 && (
                                        <span className='counter'>({cartItems.length})</span>
                                    )}سبد خرید
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={<i className='fa fa-user' >{userInfo.name}</i>}
                                    id='username'
                                >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            پروفایل
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/orders'>
                                        <NavDropdown.Item>
                                            سفارش های من
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        خروج
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/signin'>
                                    <Nav.Link>
                                        <i className='fa fa-user' /> ورود
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (<NavDropdown
                                title={<i className='fa-caret-down' ></i>}
                                id='username'
                            >
                                <LinkContainer to='#admin'>
                                    <NavDropdown.Item>
                                        ادمین
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/dashboard'>
                                    <NavDropdown.Item>
                                        داشبورد
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item >
                                    خروج
                                </NavDropdown.Item>

                            </NavDropdown>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;