import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Getallproducts } from '../Redux/action';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { Card, Col, Container, Row } from 'react-bootstrap';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector((state) => state.products);


    useEffect(() => {
        dispatch(Getallproducts());
    }, [dispatch]);
    return (
        <Container>
            {loading ? (
                <Loading />
            ) : error ? (<p>{error}</p>) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={4} lg={3} xl={3}>
                            <Card bg='light' className='my-3 p-3 rounded'>
                                <Link className='text-decoration-none' to={`/product/${product._id}`}>
                                    <Card.Img className='image' src={product.image} variant='top' />
                                </Link>

                                <Card.Body>
                                    <Link className='text-decoration-none' to={`/product/${product._id}`}>
                                        <Card.Title className='name' as='div'>
                                            <strong>{product.name}</strong>
                                        </Card.Title>
                                    </Link>

                                    <Card.Text as='div'>
                                        <Rating product={product} numReviews={product} />
                                    </Card.Text>

                                    <Card.Text className='price' as='h3'> دلار امریکا${product.price}</Card.Text>
                                </Card.Body>
                                <Link className='btn btn-outline-primary my-3' to={`/product/${product._id}`}>
                                    جزیات
                                </Link>
                            </Card>

                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}
    // <Link to={`/product/${product._id}`}>