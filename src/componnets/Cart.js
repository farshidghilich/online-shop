import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom'
import { cartAction, removeAction } from '../Redux/action';
import { Row, Col, Image, ListGroup, Form, Button, Card, Container } from 'react-bootstrap';
function Cart() {
    const { search } = useLocation()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const { id } = useParams()
    const qty = qtyInUrl ? Number(qtyInUrl) : 1;
    useEffect(() => {
        if (id) {

            dispatch(cartAction(id, qty))
        }
    }, [dispatch, id, qty])
    const Navigate = useNavigate()
    const removeFromCartHandler = (id) => {
        dispatch(removeAction(id))
    }
    const checkoutHandler = () => {
        Navigate('/signin?redirect=/shipping')
    }
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1>صفحه پرداخت</h1>
                    {cartItems.length === 0 ? (
                        <p>
                            <h3 className='text-dark'>سبد شما خالی است</h3>
                            <Link className='btn btn-primary my-3' to='/'>
                                بازگشت
                            </Link>
                        </p>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item variant='flush' key={item.product}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col className='name' md={3}>
                                            <Link
                                                to={`/product/${item.product}`}
                                                style={{ textDecoration: 'none', color: 'black' }}
                                            >
                                                جزئیات {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) =>
                                                    dispatch(
                                                        cartAction(item.product, Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={() => removeFromCartHandler(item.product)}
                                            >
                                                <i className='fa fa-trash' />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    جمع کل ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                    محصول
                                </h2>
                                $
                                {cartItems
                                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                                    .toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item className='d-grid'>
                                <Button
                                    type='button'
                                    className='btn-success'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    ثبت سفارشات
                                </Button>

                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart