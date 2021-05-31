import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./feature/home"

import TextEditor from "./feature/document/TextEditor"
import AuthForm from "./feature/auth/auth-form"
import Navbar from "./components/navbar"
import ProtectedRoute from "./components/protected-route"

function App() {
  return (
    <Router>
      <Navbar />
      <Switch> 
      <Route path="/" exact>
        <Redirect to='/home'/>
      </Route>
      <Route path="/home" component={Home}/>
      <Route path="/auth" component={AuthForm}/>
      <ProtectedRoute path="/documents/:id" component={TextEditor}/>
      </Switch>
    </Router>
  );
}

export default App;
