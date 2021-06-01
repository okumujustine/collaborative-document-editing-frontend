import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./feature/home"

import TextEditor from "./feature/document/TextEditor"
import MyDocuments from "./feature/document/MyDocuments"
import AuthForm from "./feature/auth/auth-form"
import Navbar from "./components/navbar"
import ProtectedRoute from "./components/protected-route"

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/home' />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/auth" component={AuthForm} />
          <ProtectedRoute exact path="/documents" component={MyDocuments} />
          <ProtectedRoute exact path="/documents/:id" component={TextEditor} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
