
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productAction } from '../Redux/action';
import Loading from './Loading';
import Rating from './Rating';
import { Row, Col, Image, ListGroup, Form, Card, Button, Container } from 'react-bootstrap';
export default function ProductScreen() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, product } = useSelector((state) => state.oneproduct);
    const [qty, setQty] = useState(1);
    const Navigate = useNavigate()
    const handleAddToCart = () => {
        Navigate(`/cart/${id}?qty=${qty}`);
    }
    useEffect(() => {
        dispatch(productAction(id));
    }, [dispatch, id]);

    return (
        <Container>
            <Link className='btn btn-warning my-3' to='/'>
                بازگشت
            </Link>
            {loading ? (
                <Loading />
            ) : (
                <Container>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating product={product} numReviews={product} />
                                </ListGroup.Item>
                                <ListGroup.Item>قیمت: ${product.price}</ListGroup.Item>
                                <ListGroup.Item>توضیحات: {product.description}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>قیمت:</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>وضعیت:</Col>
                                            <Col>{product.countInStock > 0 ? (<div>{product.countInStock}موجود در انبار</div>) : 'ناموجود'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>تعداد محصولات:</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item className='d-grid'>
                                        <Button
                                            onClick={handleAddToCart}

                                            disabled={product.countInStock === 0}
                                        >
                                            افزودن به سبد خرید
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Container>
            )}
        </Container>
    );
}