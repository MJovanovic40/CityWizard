import { Button, Form } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

export default function Login() {
  return (
    <div>
      <a href="home" className="back"><BiArrowBack style={{ position: "absolute", height: "3vh", width: "3vw", marginLeft: -10 }} /></a>
      <div id="loginForm">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
