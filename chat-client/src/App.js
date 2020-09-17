import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route} from 'react-router-dom'
import Join from './pages/Join/Join';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join}/>
      <Route path="/chat" component={Chat}/> 
    </Router>
  );
}

export default App;
