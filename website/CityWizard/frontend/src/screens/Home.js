import { translate } from 'ol/transform';
import { Button, Container, Row } from 'react-bootstrap';
import Search from '../components/Search';
import vid from '../media/background.mp4';

export default function Home() {
    return (
        <div>
            <Row className="vh-100" style={{ overflow: "hidden", overflowY: "hidden" }}>
                <video autoPlay loop muted style={{ position: "absolute", zIndex: "-2", height: "100%", width: "100%", }}>
                    <source src={vid} type="video/mp4"></source>
                </video>
                <div id="login">
                    <a href="" id="loginText">Login </a>
                    <a href="" id="loginText">or Register</a>
                </div>
                <div id="main">
                    <h1>Welcome to CityWizard</h1>
                    <p id="motto">Placeholder</p>
                    <Search></Search>
                    <Button id="luck" size="lg" variant="outline-primary">I'm feeling lucky</Button>{' '}
                </div>
            </Row>
        </div>
    );
}
