import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { throttle } from 'lodash';

import rootReducer from '../reducers'
import { loadState, saveState } from '../services/localStorage';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(initialState = {}, history) {
    const persistedState = loadState();
    const store = createStore(
        rootReducer,
        persistedState,
        composeEnhancer(applyMiddleware(thunk, logger)),
    )
    store.subscribe(
        throttle(() => {
            saveState(store.getState());
        }, 1000),
    );
    return store;
}

