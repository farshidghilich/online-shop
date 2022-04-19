import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { shippingAction } from '../Redux/action'
import Steps from './Steps';
import { useNavigate } from 'react-router-dom';
function Shipping() {
    const navigate = useNavigate()
    const { userInfo } = useSelector(usersignin => usersignin.userSignin)
    const { shippingAddress } = useSelector(cart => cart.cart)
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [navigate])


    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    const [fullname, setFullname] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalcode] = useState('')
    const [phone, setPhone] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(shippingAction({ address, city, postalCode, phone }));
        navigate('/payment')
    }
    return (
        <FormContainer>
            <Steps step1 step2 />
            <h1>ثبت آدرس</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>نام کامل  </Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='نام کامل خود خود را وارد کنید'
                        value={fullname}
                        required
                        onChange={(e) => { setFullname(e.target.value) }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='address'>
                    <Form.Label>ادرس</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='ادرس خودرا وارد کنید'
                        value={address}
                        required
                        onChange={(e) => { setAddress(e.target.value) }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='city'>
                    <Form.Label>شهر</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='نام شهر خود را وارد کنید'
                        value={city}
                        onChange={(e) => { setCity(e.target.value) }}
                        required

                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='postalCode'>
                    <Form.Label>کد پستی</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='کد پستی خود را وارد کنید'
                        value={postalCode}
                        required
                        onChange={(e) => { setPostalcode(e.target.value) }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='country'>
                    <Form.Label>تلفن همراه</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder='شماره تلفن خود را وارد کنید'
                        value={phone}
                        required
                        onChange={(e) => { setPhone(e.target.value) }}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='success'>
                    ادامه
                </Button>
            </Form>
        </FormContainer>
    )
}

export default Shipping