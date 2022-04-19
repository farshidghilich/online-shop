import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../Redux/action';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from './FormContainer';
import Loading from './Loading';
function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const { userInfo, loading, error } = useSelector((state) => state.userRegister);
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }
  useEffect(() => {
    if (userInfo) {
      Navigate(redirect);
    }
  }, [Navigate, redirect, userInfo]);
  return (<FormContainer>
    <h1>عضویت در سایت</h1>
    {loading && (<Loading />)}
    {error && (<p className='error'>{error}</p>)}
    <Form onSubmit={submitHandler}>
      <Form.Group className='mb-3' controlId='name'>
        <Form.Label>نام</Form.Label>
        <Form.Control
          type='text'
          placeholder='لطفا نام خود را وارد کنید'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className='mb-3' controlId='email'>
        <Form.Label>ادرس ایمیل</Form.Label>
        <Form.Control
          type='email'
          placeholder='ایمیل خود را وارد کنید'
          value={email}
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

      <Button type='submit' variant='success'>
        عضویت
      </Button>
    </Form>

    <Row className='py-3'>
      <Col>
        حساب کاربری دارید؟
        <Link
          style={{ textDecoration: 'none' }}
          to={redirect ? `/signin?redirect=${redirect}` : '/signin'}
        >
          ورود
        </Link>
      </Col>
    </Row>
  </FormContainer>)
}
export default Register;