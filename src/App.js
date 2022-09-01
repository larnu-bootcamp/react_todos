import './App.css';
import { useState } from 'react';
import Home from './compoments/Home';
import Login from './compoments/Login';
import LoginService from './services/loginService';

function App() {

  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState('');

  function login(values) {
    new LoginService().login(values).then(res => {
      console.log(res);
      setEmail(values.email);
      setLogged(true);
    })
  }
  return (
    <>
    {logged ? <Home email={email} />: <Login onLogin={login} /> }
    </>
  );
}

export default App;
