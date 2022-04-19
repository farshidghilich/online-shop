import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { signIn } from '../Redux/action'
import { useSelector } from 'react-redux'
import Loading from './Loading';
import FormContainer from './FormContainer';
export default function Signin() {
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { userInfo, loading, error } = useSelector(store => store.userSignin)

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    useEffect(() => {
        if (userInfo) {
            Navigate(redirect);

        }
    }, [Navigate, redirect, userInfo,]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn(email, password))

    }
    return (
        <FormContainer>
            <h1>ورود</h1>
            {error && (<p className='error'>{error}</p>)}
            {loading && (<Loading />)}
            <Form onSubmit={submitHandler}>

                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>ادرس ایمیل</Form.Label>
                    <Form.Control
                        autoFocus
                        type='email'
                        placeholder='ایمیل را وارد کنید...'
                        value={email}

                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>

                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>گذرواژه</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='گذرواژه را وارد کنید...'
                        value={password}
                        autoFocus
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>

                </Form.Group>

                <Button type='submit' variant='success'>
                    ورود
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    جهت عضویت {' '}
                    <Link
                        style={{ textDecoration: 'none' }}
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    >
                        کلیک کنید
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
