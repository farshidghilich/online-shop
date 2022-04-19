import React, { useEffect, useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paymentAction } from '../Redux/action';
import FormContainer from './FormContainer';
import Steps from './Steps';
function PaymentMethod() {
    const { shippingAddress } = useSelector(store => store.cart)

    const [paymentmethod, setPaymentMethod] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = () => {
        dispatch(paymentAction(paymentmethod))
        navigate('/order')
    }
    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [navigate])

    return (
        <FormContainer>
            <Steps step1 step2 step3 />
            <h1>صفحه پرداخت</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Label as='legend'>نحوه پرداخت</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label="پرداخت انلاین"
                            id='paypal'
                            name='paymentMethod'
                            value='پرداخت اینترنتی'
                            checked
                            onClick={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                        <Form.Check
                            type='radio'
                            label='پرداخت درب منزل'
                            id='paypal'
                            name='paymentMethod'
                            value="پرداخت درب منزل"
                            checked
                            onClick={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='success'>
                    ادامه
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentMethod