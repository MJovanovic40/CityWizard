import { translate } from 'ol/transform';
import { Button, Col, Container, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import Search from '../components/Search';
import vid from '../media/background-15.mp4';
import img1 from '../media/city1.jpg';
import { useDispatch, useSelector } from 'react-redux'

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
                        <a href="login" id="loginText">Login</a>
                        <p></p>
                        <a href="register" id="loginText">Register</a>
                    </div>
                    :
                    <DropdownButton id="dropdown-basic-button" title={userInfo.email} style={{ backgroundColor: "transparent", float: "right" }}>
                        <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                    </DropdownButton>
                }
                <div id="main">
                    <h1>Welcome to CityWizard</h1>
                    <p id="motto">Placeholder</p>
                    <Search></Search>
                    <Button id="luck" size="lg" variant="outline-primary">I'm feeling lucky</Button>{' '}
                </div>
            </Row>
            <Row>
                <Col md={7}>
                    <div style={{ position: "relative", left: "55%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <h3 style={{ textAlign: "center" }}>What is CityWizard?</h3>
                        <p style={{ textAlign: 'justify' }}>This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                        </p>
                    </div>
                </Col>
                <Col md={5}>
                    <img src={img1} style={{ objectFit: 'scale-down', height: "40vh", float: "right", textShadow: 10 }}></img>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "rgb(248,249,250)" }}>
                <Col md={5}>
                    <img src={img1} style={{ objectFit: 'scale-down', height: "40vh", float: "left" }}></img>
                </Col>
                <Col md={7}>
                    <div style={{ position: "relative", left: "40%", top: "50%", transform: "translate(-50%, -50%)" }}>
                        <h3 style={{ textAlign: "center" }}>What is CityWizard?</h3>
                        <p style={{ textAlign: 'justify' }}>This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                            This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough.
                        </p>
                    </div>
                </Col>

            </Row>
        </div >
    );
}
