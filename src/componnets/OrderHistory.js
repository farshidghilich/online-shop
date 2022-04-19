import React, { useEffect } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { myOrdersAction } from '../Redux/action'
import Loading from './Loading'

function OrderHistory() {
    const { orders, loading, error } = useSelector(store => store.myOrders)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(myOrdersAction())
    }, [dispatch])
    return (
        <Container>
            <h1>سفارش های من</h1>
            {loading ? (<Loading />) : error ? (<p className='error'>{error}</p>) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>شماره فیش</th>
                            <th>نحوه پرداخت</th>
                            <th>تاریخ</th>
                            <th>مبلغ پرداختی</th>
                            <th>جزئیات </th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders.map(order => {
                            return (<tr>
                                <td>{order._id}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td><Button variant='warning'
                                    onClick={() => {
                                        navigate(`/orders/${order._id}`);
                                    }}>جزئیات</Button>

                                </td>

                            </tr>)
                        })}

                    </tbody>
                </Table>
            )}

        </Container>
    )
}

export default OrderHistory