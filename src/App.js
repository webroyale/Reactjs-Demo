
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Greeting from './Components/Greeting/Greeting';
import LoginForm from './Components/Form/LoginForm';
import RegistrationForm from './Components/Form/RegistrationFrom';
import Home from './Components/Home/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginForm/>
          </Route>
          <Route path="/registration">
            <RegistrationForm/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/">
            <Greeting/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
