import Result from "../components/Result"
import logo from "../media/city1.jpg"
import { Image, Button, Row, Col, Accordion, Card, Alert } from "react-bootstrap"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { resultsAction } from '../actions/locationActions'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import img1 from '../media/city1.jpg';
import { BiArrowBack } from "react-icons/bi";
import '../App.css';


export default function Results({ match }) {

    const [generalWiki, setGeneralWiki] = useState("")

    const [cityWiki, setCityWiki] = useState([])

    const [cityList, setcityList] = useState([])

    const [country, setCountry] = useState("")

    const dispatch = useDispatch()

    const search = useSelector(state => state.search)
    const { results } = search

    
    const keys = []
    const cities = []
    useEffect(() => {
        setCountry(match.params.country)
        if (!results)
            dispatch(resultsAction(match.params.country));
        countryDesc(match.params.country);
        if (results) {
            for (var i in results) {
                keys.push(i)
            }
            for (var i in keys) {
                cities.push(results[i])
            }
            setcityList(cities)
        }
        cityWikis(cities)
    }, [match, results])

    async function countryDesc(country) {
        const { data } = await axios.get("http://192.168.68.101:8000/api/getwiki/?city=" + country)
        setGeneralWiki(data)
        return data
    }

    async function cityWikis(cities){
        let l = []
        console.log(cities)
        for(var i = 1; i < cities.length; i++){
            if(i>14){
                continue;
            }
            const { data } = await axios.get("http://192.168.68.101:8000/api/getwiki/?city=" + cities[i].city)
            l.push(data)
        }
        setCityWiki(l)
        //console.log(l)
    }
    return (
        <div style={{ width: "100vw", height: "100vh", }}>
            <Alert key={0} variant={"warning"}>
                Due to a lack of available data, predictions are not as accurate as we would like them to be. With more data we can improve the predictions in the future by a lot.
            </Alert>
            {/*console.log(cities)*/}
            <a href="/" className="back"><BiArrowBack style={{ position: "absolute", height: "3.5vh", width: "3.5vw", marginTop: "0.6vh", marginLeft: "-1vh" }} /></a>
            <Row style={{ textAlign: "center" }}>
                <h1>{country}</h1>
            </Row>
            <Row style={{ marginTop: "2vh" }}>
                <Col md={6}>
                    <Accordion defaultActiveKey="0">
                        {cityList.map((object, index) => {
                            //console.log(index)
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
                                            <Row>
                                                {cityWiki[index]}
                                            </Row>
                                            <div class="mapouter">
                                                    <div class="gmap_canvas">
                                                        <iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                                            <a href="https://soap2day-to.com">soap2day</a>
                                                            <br></br>
                                                            <a href="https://www.embedgooglemap.net"></a>
                                                    </div>
                                                </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            );

                        })}
                    </Accordion>

                </Col>
                <Col md={6}>
                    <Row>
                        {generalWiki}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}