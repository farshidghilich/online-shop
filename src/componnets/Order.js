import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Steps from './Steps';

import Loading from './Loading'
import { createOrder } from '../Redux/action';
function Order() {
    const { paymentmethod, cartItems } = useSelector(store => store.cart)
    const cart = useSelector(store => store.cart)
    const { loading, error, success, order } = useSelector(store => store.orderCreate)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!paymentmethod) {
            navigate('/payment')

        }
    }, [navigate])
    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
            dispatch({ type: 'CREATE_ORDER_RESET' })
        }
    }, [success, dispatch, navigate, order])
    const fixPrice = (num) => Number(num.toFixed(2));
    cart.cartItems.itemsPrice = fixPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    cart.cartItems.shippingPrice = cartItems.itemsPrice > 100 ? fixPrice(100) : fixPrice(10)
    cart.cartItems.taxPrice = fixPrice(0.01 * cartItems.itemsPrice)
    cart.cartItems.totalPrice = cartItems.itemsPrice + cartItems.shippingPrice + cartItems.taxPrice;
    const placeOrderHandler = () => {
        dispatch(createOrder({
            ...cart, orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentmethod,
            itemsPrice: cart.cartItems.itemsPrice,
            shippingPrice: cart.cartItems.shippingPrice,
            taxPrice: cart.cartItems.taxPrice,
            totalPrice: cart.cartItems.totalPrice,

        }))
    }
    return (
        <Container>
            <Row>

                <Steps step1 step2 step3 step4 />
                <Col md={8}>
                    <Card>
                        <ListGroup variant='light' bg='light'>
                            <ListGroup.Item text-align-rtl>
                                <h2>زمان و نحوه ارسال
                                </h2>
                                <p>
                                    <strong>آدرس تحویل سفارش :</strong>
                                    {cart.shippingAddress.address}
                                    <strong>شهر :{cart.shippingAddress.city}</strong>
                                </p>
                                <strong>کد پستی :{cart.shippingAddress.postalCode}
                                </strong>
                                <p>
                                    <strong>شماره تماس:</strong>
                                    {cart.shippingAddress.phone}

                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>انتخاب روش پرداخت</h2>
                                <p>
                                    <strong>انتخاب روش پرداخت: </strong>
                                    {cart.paymentmethod}
                                </p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>سفارش های شما</h2>
                                {cartItems.length === 0 ? (<p>your cart is empty</p>) :
                                    (<ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={3}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        />
                                                    </Col>
                                                    <Col>
                                                        <Link
                                                            style={{
                                                                textDecoration:
                                                                    'none',
                                                            }}
                                                            to={`/product/${item.product}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x $
                                                        {item.price} = $
                                                        {(
                                                            item.qty *
                                                            item.price
                                                        ).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>صورتحساب</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>موارد</Col>
                                    <Col>${cart.cartItems.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه ارسال</Col>
                                    <Col>${cart.cartItems.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>مالیات</Col>
                                    <Col>${cart.cartItems.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>قابل پرداخت</strong></Col>
                                    <Col><strong>${cart.cartItems.totalPrice}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <p variant='danger'>{error}</p>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item className='d-grid'>
                                <Button
                                    type='button'
                                    variant='outline-success'
                                    disabled={cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    ثبت سفارش
                                </Button>
                            </ListGroup.Item>
                            {loading && (<Loading />)}
                            {error && (<p className='error'>{error}</p>)}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Order