import { Button, Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { register } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Register({ location, history }) {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password == confirmPassword && checked && email !== "" && password !== "") {
      dispatch(register(email, password))
      history.push("/login")
    }
    else if (email !== "" && password !== "") {
      setError("Email or password cannot be empty.")
    }
    else if (password === confirmPassword && password !== "") {
      setError("You have to agree to our Terms of service to register.")
    } else if (checked) {
      setError("Passwords do not match.")
    }
    else {
      setError("Email or password cannot be empty.")
    }
  }


  return (
    <div>
      <a href="home" className="back"><BiArrowBack style={{ position: "absolute", height: "3.5vh", width: "3.5vw", marginTop: "0.6vh", marginLeft: "-1vh" }} /></a>
      <div id="registerForm">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="I agree to the terms of service" onChange={(e) => {
              setChecked(e.target.value)
            }} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {error}
      </div>
    </div>
  );
}
