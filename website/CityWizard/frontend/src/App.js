import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./screens/Home.js"
import Login from "./screens/Login.js"
import Register from "./screens/Register"
import Results from "./screens/Results";
import Logout from "./screens/Logout"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/results/:country/" component={Results}>
        </Route>
        <Route path="/login" component={Login}>
        </Route>
        <Route path="/register" component={Register}>
        </Route>
        <Route path="/logout" component={Logout}>
        </Route>
        <Route path="/" component={Home}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
