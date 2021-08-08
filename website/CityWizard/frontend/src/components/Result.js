import { Image, Button, Row, Col, Accordion, Card } from "react-bootstrap";
import { useState } from 'react'

function Result(props) {

    const [open, setOpen] = useState(false)

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card className="kartica">
                    <Accordion.Toggle as={Card.Header} eventKey={props.key}>
                        Click me!
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={props.key}>
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Result


