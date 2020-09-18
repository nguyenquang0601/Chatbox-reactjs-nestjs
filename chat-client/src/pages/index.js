import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Join from './Join/Join';
import Chat from './Chat/Chat';
import { useInjectReducer } from 'redux-injectors';
import { sliceKey as KeyMess, reducer as MessReducer } from '../store/slice/messages';
// import { sliceKey, reducer as socketReducer } from '../store/slice/socket';

function AppComponents() {
  useInjectReducer({ key: KeyMess, reducer: MessReducer })
  // useInjectReducer({ key: sliceKey, reducer: socketReducer })
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}

export default AppComponents
