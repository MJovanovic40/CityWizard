import { Image, Button, Row, Col } from "react-bootstrap";
import {useState} from 'react'

function Result(props) {

    const [open, setOpen] = useState(false)
    
    return (
        <div>
            <div className="containers" onClick={()=>{
                setOpen(!open)
            }}>
                <p className="resultName">{props.cityName}</p>
            </div>
            {open &&
                <div className="panel">
                    <Row>
                        <Col sm={7}> 
                            <div style ={{marginRight: "10vw"}}>
                                <p className="resultText">{props.cityDesc}</p>
                            </div>   
                        </Col>
                        <Col sm={5}>
                            <div style ={{marginLeft: "10vw"}}>
                                <h2 style={{color: "wheat", textAlign:"center"}}>Overall score:</h2>
                                <h1 style={{color: "wheat", textAlign:"center"}}>9.1</h1>
                            </div>
                        </Col>
                    </Row>
                </div>
            }
            
            
        </div>
    )
}

export default Result


