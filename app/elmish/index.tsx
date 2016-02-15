import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as flyd from 'flyd';
import { Stream } from 'flyd';
import { createStore, applyMiddleware, compose } from 'redux';
import { IAction } from './../common';
import { actionWorkflowMiddleware } from './../actionCalledMiddleware';
import { actionLogMiddleware } from './../actionLogMiddleware';
import { View, update, init, effects } from './CounterList'; 

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
    //actionWorkflowMiddleware(workflows),
    actionLogMiddleware(i => null));
const createStoreWithMiddleware = compose(middlewares)(createStore);
const store = createStoreWithMiddleware(update, init());

const action$ = flyd.stream();
const state$ = flyd.stream(); 

store.subscribe(() => {
    (state$ as any)(store.getState());    
});

const htmlEffect = (effects: any, storeDispatch: Function, stateStream$: Stream) => {
    const htmlEffect = effects.html;
    const appElement = document.getElementById('app');
    const viewFunc = state =>  React.createElement(htmlEffect, { model: state, dispatch: storeDispatch}); 
    const html$ = flyd.map(viewFunc, stateStream$)
    const render = html => ReactDOM.render(html, appElement)
    flyd.on(render, html$)    
};

const httpEffect = (effects: any, storeDispatch: Function, stateStream$: Stream) => {
    const httpEffect = effects.http;
    const http$ = flyd.map(state => httpEffect(state, storeDispatch), stateStream$);
    flyd.on(http => {         
        http.forEach(i => console.log(i));
    }, http$);    
};

htmlEffect({html: View}, store.dispatch, state$);
httpEffect(effects, store.dispatch, state$);

store.dispatch({type: 'INIT'});