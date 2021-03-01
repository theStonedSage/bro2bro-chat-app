import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import Chat from './components/chat/Chat';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/home/Home';
import { UserContextProvider } from './contexts/userContext';
import Test from './components/Test';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/test" exact component={Test} />
        {/* <Route path="/home" exact component={Home} /> */}
        <UserContextProvider>
          <PrivateRoute path="/home" exact component={Home} />
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
