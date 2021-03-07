import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './components/forms/Login';
import Register from './components/forms/Register';
import Chat from './components/chat/Chat';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/home/Home';
import { UserContextProvider } from './contexts/userContext';
import Test from './components/Test';
import HomeMain from './home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/test" exact component={Test} />
        <Route path="/hometest" exact component={HomeMain} />
        {/* <Route path="/home" exact component={Home} /> */}
        <UserContextProvider>
          <PrivateRoute path="/home" exact component={Home} />
        </UserContextProvider>
      </Switch>
    </Router>
  );
}

export default App;


// {
//   "token": "edb9a88b-72de-4b86-885d-e8cc431549d6",
//   "user": {
//       "id": "cklus70xy369219c889t42hu4pl",
//       "username": "Ypapi",
//       "picture": null,
//       "email": null,
//       "credits": 0,
//       "createdAt": "2021-03-04T11:24:13.318Z",
//       "updatedAt": "2021-03-04T11:24:13.318Z"
//   }
// }
