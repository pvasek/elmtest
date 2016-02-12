import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { IAction } from './common';
import { actionWorkflowMiddleware } from './actionCalledMiddleware';
import { actionLogMiddleware } from './actionLogMiddleware';
import { View, update, init } from './CounterList'; 

const updateHandler = (dispatch, actionInfo, getState) => {
    //console.log('SET called', actionInfo);
    //dispatch({type: 'UPDATE_INFO'});
};

const workflows = {
    'SET': updateHandler,
    'INCREMENT': updateHandler,
    'DECREMENT': updateHandler,
    'UPDATE_INFO': (dispatch, actionInfo, getState) => {
        console.log('UPDATE_INFO called', actionInfo);
    }
};

const middlewares = applyMiddleware(    
    actionWorkflowMiddleware(workflows),
    actionLogMiddleware);
const createStoreWithMiddleware = compose(middlewares)(createStore);
const store = createStoreWithMiddleware(update, init());

const appElement = document.getElementById('app');

const render = () => {
    ReactDOM.render(<View model={store.getState()} dispatch={store.dispatch} globalDispatch={store.dispatch} path={[]}/>, appElement);
}

render();
store.subscribe(render);