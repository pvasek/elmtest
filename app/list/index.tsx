import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
// import { take, put } from 'redux-saga';
// import saga from 'redux-saga';
import { View, update, init } from './List'; 
import { IAction } from './common';
import { actionWorkflowMiddleware } from './actionCalledMiddleware';

const appElement = document.getElementById('app');

const workflows = {
    'SET': (dispatch, actionInfo, getState) => {
        console.log('SET called', actionInfo, getState());
        dispatch({type: 'UPDATE_INFO'});
    },
    'UPDATE_INFO': (dispatch, actionInfo, getState) => {
        console.log('UPDATE_INFO called', actionInfo, getState());
    }
};

const createStoreWithMiddleware = compose(applyMiddleware(actionWorkflowMiddleware(workflows)))(createStore);
const store = createStoreWithMiddleware(update, init());

const render = () => {
    ReactDOM.render(<View model={store.getState()} dispatch={store.dispatch}/>, appElement);
}

render();
store.subscribe(render);