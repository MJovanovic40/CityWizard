import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { SocialIcon, } from 'react-social-icons';

function Footer() {
    return (
        <div className="footer" style={{backgroundColor: "rgb(30, 28, 34)", width: "100%", height: "20vh"}}>
            <Row>
                <h2 style={{color: "white", textAlign: "center", marginTop: "2vh"}}>CityWizard</h2>
            </Row>
            <Row>
                <Col style={{color: "white", marginLeft: "3vw"}}>
                    <h4 style={{marginLeft: "3vh"}}>Contact us :</h4>
                    <ul>
                        <li class="bullets">office@city-wizard.com</li>
                        <li class="bullets"><a href="https://github.com/MimiKing01/CityWizard" style={{color: "white"}}>GitHub</a></li>
                    </ul>
                </Col>
                <Col style={{color: "white", marginLeft: "-1vw", marginTop: "3vh"}}>
                    <a href="https://www.facebook.com/"><SocialIcon network="facebook"></SocialIcon></a>
                    <a href="https://github.com/MimiKing01/CityWizard"><SocialIcon network="github" fgColor="white"></SocialIcon></a>
                    <a href="https://twitter.com/?lang=en"><SocialIcon network="twitter"></SocialIcon></a>
                    <a href="https://rs.linkedin.com/"><SocialIcon network="linkedin"></SocialIcon></a>
                    <a href="https://discord.com/"><SocialIcon network="discord"></SocialIcon></a>
                    
                </Col>
                <Col style={{color: "white", marginRight: "-25vw"}}>
                    <h4 style={{marginLeft: "1.5vw"}}>External Links :</h4>
                    <ul>
                        <li class="bullets"><a href="https://www.kaggle.com/camnugent/california-housing-prices" style={{color: "white"}}>House pricing dataset</a></li>
                        <li class="bullets"><a href="https://www.kaggle.com/sobhanmoosavi/us-weather-events" style={{color: "white"}}>US Weather Events dataset</a></li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

export default Footer
