import { translate } from 'ol/transform';
import { Button, Col, Container, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import Search from '../components/Search';
import vid from '../media/background-15.mp4';
import img1 from '../media/city1.jpg';
import { useDispatch, useSelector } from 'react-redux'
import Footer from "../components/Footer"

export default function Home() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div>
            <Row className="vh-100" style={{ margin: 0 }}>
                <video autoPlay loop muted style={{ position: "absolute", zIndex: "-2", height: "100%", width: "100%", objectFit: "cover", padding: 0, opacity: 0.9 }}>
                    <source src={vid} type="video/mp4"></source>
                </video>
                {!userInfo ?
                    <div id="login">
                        <a href="login" id="loginText" style={{color: "white"}}>Login </a>
                        <a href="register" id="loginText" style={{color: "white"}}>Register</a>
                    </div>
                    :
                    <DropdownButton id="dropdown-basic-button" title={userInfo.email} style={{ backgroundColor: "transparent", position: "absolute", marginLeft: "85vw", marginTop:"3vh" }}>
                        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                    </DropdownButton>
                }
                <div id="main">
                    <h1>Welcome to CityWizard</h1>
                    <p id="motto">Leading you to a better future</p>
                    <Search></Search>
                    <Button id="luck" size="lg" variant="outline-primary" href="results">I'm feeling lucky</Button>{' '}
                </div>
            </Row>
            <Row>
                <Col md={7}>
                    <div style={{ position: "relative", left: "55%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <h3 style={{ textAlign: "center" }}>What is CityWizard?</h3>
                        <p style={{ textAlign: 'center' }}>City Wizard is an intuitive assistant for all things 
                        moving and living related. Our platform offers information and predictions on cities around the world. 
                        If you are intending on moving or living in a certain area, check City Wizard first.
                        There, you can find a lot of useful information about the places that you can go and where you could be going.
                        </p>
                    </div>
                </Col>
                <Col md={5}>
                    <img src={img1} style={{ objectFit: 'scale-down', height: "40vh", float: "right", textShadow: 10 }}></img>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "rgb(248,249,250)" }}>
                <Col md={5}>
                    <img src={img1} style={{ objectFit: 'scale-down', height: "40vh", float: "left"}}></img>
                </Col>
                <Col md={7}>
                    <div style={{ position: "relative", left: "40%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <h3 style={{ textAlign: "center" }}>What is CityWizard?</h3>
                        <p style={{ textAlign: 'center' }}>Using Ridge Machine Learning Algorithm, we are able to predict a 
                        lot of future data about a town, such as housing prices and average household incomes. This data is 
                        then compiled using complex grading algorithms to form a list of best places for you. You are also 
                        presented with summaries about all the places and areas, which are derived from thousands of 
                        Wikipedia articles using a custom built Tf-Idf algorithm. The best part is, City Wizard is always 
                        striving for improvements, with the possibility for great expansion. Users would be able to track 
                        environmental factors, find the best school districts and be able to look up all sorts of local shops. 
                        Filters and preferences would be implemented to ensure that the results are as personalized to your 
                        liking as they can be. Nothing is out of reach.
                        </p>
                    </div>
                </Col>

            </Row>
            <Row>
                <Footer />
            </Row>
        </div >
    );
}
