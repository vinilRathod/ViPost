import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Navbar from './components/Navbar';
import Post from './Pages/Post/Post';
import Profile from './Pages/Profile/Profile';
import Logout from './Pages/Logout';
import { useEffect } from 'react';
function App() {
  return (
    <>  
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/logout" component={Logout} />
      
    </Router>
    </>
  );
}

export default App;
