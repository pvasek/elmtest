import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { IAction } from './../common';
import { actionWorkflowMiddleware } from './../actionCalledMiddleware';
import { actionLogMiddleware } from './../actionLogMiddleware';
import { View, update, init, effects } from './Counter'; 

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

// const middlewares = applyMiddleware(    
//     actionWorkflowMiddleware(workflows),
//     actionLogMiddleware);
const createStoreWithMiddleware = createStore; //compose(middlewares)(createStore);
const store = createStoreWithMiddleware(update, init());


const appElement = document.getElementById('app');

const render = (view, el) => {
    ReactDOM.render(React.createElement(view, { model: store.getState(), dispatch: store.dispatch}), el);
}

const services = {
    html: func => {
        render(func, appElement);
    }
}


const applyEffects = () => {
        
};

store.subscribe(applyEffects);
