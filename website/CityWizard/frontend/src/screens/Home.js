import { Button } from 'react-bootstrap';
import Search from '../components/Search'

export default function Home() {
    return (
        <div>
        <div id="login">
            <a href="" id = "loginText">Login </a>
            <a href="" id = "loginText">or Register</a>
        </div>
        <div id="main">
            <h1>Welcome to CityWizard</h1>
            <p id= "motto">Placeholder</p>
            <Search></Search>
            <Button id = "luck" size = "lg" variant = "outline-primary">I'm feeling lucky</Button>{' '}
        </div>
        </div>
    );
}
