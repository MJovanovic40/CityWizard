import { Button, Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { login } from '../actions/userActions'

export default function Login({ location, history }) {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, error } = userLogin
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div>
      <a href="home" className="back"><BiArrowBack style={{ position: "absolute", height: "3.5vh", width: "3.5vw", marginTop: "0.6vh", marginLeft: "-1vh" }} /></a>
      <div id="loginForm">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {error}
        {/*<Row className='py-3'>
          <Col>
            New user? <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
  </Row>*/}
      </div>
    </div>
  );
}
