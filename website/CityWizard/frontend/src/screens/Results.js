import Result from "../components/Result"
import logo from "../media/city1.jpg"


export default function Results() {
    return(
        <div style ={{width: "100vw", height: "100vh",backgroundColor: "#F9DEC9"}}>
            <Result cityName = "Pancevo" cityImg={logo} cityDesc="This is a sample block of text that shows how this text will look on the website. I am writing jibberish in order to get as many words as I can into this block of text. I hope this is enough." />
        </div>

    );
}