import Result from "../components/Result"
import logo from "../media/city1.jpg"
import { Image, Button, Row, Col, Accordion, Card } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { resultsAction } from '../actions/locationActions'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import img1 from '../media/city1.jpg';


export default function Results({ match }) {

    const [generalWiki, setGeneralWiki] = useState("")

    const [cityList, setcityList] = useState([])

    const [country, setCountry] = useState("")

    const dispatch = useDispatch()

    const search = useSelector(state => state.search)
    const { results } = search

    const countryDesc = async (country) => {
        const { data } = await axios.get("http://192.168.68.101:8000/api/getwiki/?city=" + country)
        return data
    }
    const keys = []
    const cities = []
    useEffect(() => {
        setCountry(match.params.country)
        if (!results)
            dispatch(resultsAction(match.params.country));
        setGeneralWiki(countryDesc(match.params.country))
        if (results) {
            for (var i in results) {
                keys.push(i)
            }
            for (var i in keys) {
                cities.push(results[i])
            }
            setcityList(cities)
        }
    }, [match, results])
    return (
        <div style={{ width: "100vw", height: "100vh", }}>
            {/*console.log(cities)*/}
            <Row style={{ textAlign: "center" }}>
                <h1>United States of America</h1>
            </Row>
            <Row style={{ marginTop: "2vh" }}>
                <Col md={6}>
                    <Accordion defaultActiveKey="0">
                        {cityList.map((object, index) => {
                            console.log(index)
                            if (index == 0 || index > 14) {
                                return
                            }
                            return (
                                <Card className="kartica">
                                    <Accordion.Toggle as={Card.Header} eventKey={index.toString()} style={{ height: "5vh", }}>
                                        <p style={{ fontSize: "0.8vw", marginTop: "0.6vh" }}>{object.city}</p>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <Card.Body>
                                            <Row>
                                                <Col md={6}>
                                                    <div style={{ height: "10%", width: "30%", position: "relative", left: "50%", transform: "translateX(-50%)" }}>
                                                        <CircularProgressbar value={object.rating} text={`${object.rating}%`} />
                                                    </div>
                                                </Col>
                                                <Col md={6}>
                                                    <img style={{ width: "50%", objectFit: "scale-down", position: "relative", left: "50%", transform: "translateX(-50%)" }} src={img1}></img>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            );

                        })}
                    </Accordion>

                </Col>
                <Col md={6}>
                    <Row>
                        {/*generalWiki*/}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}