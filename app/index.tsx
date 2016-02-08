import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
// import { take, put } from 'redux-saga';
// import saga from 'redux-saga';
import { View as Counter, update as counterUpdate, init as counterInit } from './CounterList'; 
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
const store = createStoreWithMiddleware(counterUpdate, counterInit());

const render = () => {
    ReactDOM.render(<Counter model={store.getState()} dispatch={store.dispatch}/>, appElement);
}

// export const reducer = (state: any = {value: 0}, action: any): any => {
//     if (action.type === INCREMENT) {
//         return merge(state, {value: state.value + 1 });
//     }
//     if (action.type === DECREMENT) {
//         return merge(state, {value: state.value - 1 });
//     }
//     return state;
// }
// const store = createStore(reducer, {value: 0})
// 
// 
// const render = () => {
//     ReactDOM.render(<Counter model={store.getState()} onPlus={() => store.dispatch({type: INCREMENT})} onMinus={() => store.dispatch({ type: DEREMENT})/>, appElement);
// }

render();
store.subscribe(render);