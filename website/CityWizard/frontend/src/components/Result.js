import { Image, Button } from "react-bootstrap";
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
                    <p className="resultText">{props.cityDesc}</p>
                </div>
            }
            
            
        </div>
    )
}

export default Result


