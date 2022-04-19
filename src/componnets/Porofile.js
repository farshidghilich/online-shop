import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileAction, userdetailsAction } from '../Redux/action'
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Loading from './Loading';
function Porofile() {
    const { userInfo } = useSelector(store => store.userSignin)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, error, user } = useSelector(store => store.userdetails)
    const { loading: loadingUpdate, error: errorUpdate, success } = useSelector(store => store.updateProfile)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            dispatch({ type: 'UPDATE_PROFILE_RESET' })

        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }, [dispatch, userInfo._id, user])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProfileAction(name, email, password))
    }

    return (<FormContainer>
        {success && <p className='success'>تغیرات اعمال شد</p>}
        {errorUpdate && (<p className='error'>{errorUpdate}</p>)}
        <h1>صفحه شخصی</h1>
        {loading ? (<Loading />) : error ? (<p className='error'>{error}</p>) :
            (<Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='name'>
                    <Form.Label>نام</Form.Label>
                    <p>{userInfo.name}</p>
                    <Form.Control
                        type='text'
                        placeholder='لطفا نام خود را وارد کنید'

                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>ادرس ایمیل</Form.Label>
                    <p>{userInfo.email}</p>
                    <Form.Control
                        type='email'
                        placeholder='ایمیل خود را وارد کنید'
                        value={userInfo.email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>گذرواژه</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='گذرواژه را وارد کنید'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {loadingUpdate && (<Loading />)}

                <Button type='submit' variant='success'>
                    اعمال تغیرات
                </Button>
            </Form>)}


    </FormContainer>)

}

export default Porofile