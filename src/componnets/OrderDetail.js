import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap';
import Loading from './Loading';
import { detailsOrder } from '../Redux/action';
function OrderDetail() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error, success } = useSelector((state) => state.orderDetails);



    useEffect(() => {
        dispatch(detailsOrder(id))
    }, [dispatch, id])
    return (<>{loading ? (
        <Loading />
    ) : success ? (
        <Container>
            <Row>
                <h2>سفارش شماره #{order._id}</h2>

                <Col md={8}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>ادرس گیرنده</h2>
                                <p>
                                    <strong>نام: </strong>
                                    {order.user.name}
                                </p>
                                <p>
                                    <strong>ایمیل: </strong>
                                    {order.user.email}
                                </p>
                                <p>
                                    <strong>آدرس </strong>
                                    {order.shippingAddress.address},{' '}
                                    {order.shippingAddress.city},{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>نحوه پرداخت</h2>
                                <p>
                                    <strong>نحوه پرداخت: </strong>
                                    {order.paymentMethod}
                                </p>

                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>تعداد</h2>
                                {order.orderItems.length === 0 ? (
                                    <p className='error'>سبد شما خالی است</p>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
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
                                                        {item.qty} x ₹
                                                        {item.price} = ₹
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
                                <h2>صورت حساب</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>موارد</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه ارسال</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>جمع کل</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    ) : (
        <p className='error'>{error}</p>
    )}
    </>)
};


export default OrderDetail