import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider  } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import configureStore from './consfigstore/index';

 

const initialState = {};
const store = configureStore(initialState);//ggg compose(window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)(pReducer)
ReactDOM.render(<Provider store={store} >
    <div>
    <ToastContainer />
    </div>
                    <App />
                </Provider>,
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
