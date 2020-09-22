import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { configureAppStore } from './store/configureStore'
import AppComponents from './pages/index'
function App() {
  const { store } = configureAppStore()
  return (
    <Provider store={store}>
      <AppComponents />
    </Provider>

  );
}

export default App;
