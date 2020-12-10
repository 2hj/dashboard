import React, {useState} from 'react';
import { Route, Link } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import fire from './fire';

import './App.css';
import Auth from './components/Auth';// eslint-disable-line no-unused-vars

function App() {
  const [user, setUser] = useState('');

  const authListener = () => {// eslint-disable-line no-unused-vars
    fire.auth().onAuthStateChanged(user => {
      if(user){
          setUser(user);
          console.log('App.js의 authListner');
      } else {
          setUser("");
      }
    })
  }

  function refreshPage() { // eslint-disable-line no-unused-vars
    window.location.reload();
  }

  return (
    <div>
      <Auth user={user}/>
    </div>
  );
}

export default App;
