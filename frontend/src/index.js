import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css'; // Tailwind CSS entry
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { Web3Provider } from './context/Web3Context';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import './App.css'; // Custom styles
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
