import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./screens/Home.js"
import Login from "./screens/Login.js"
import Register from "./screens/Register"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
