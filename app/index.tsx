import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { View, update, init } from './CounterListGroupContainer'; 

const appElement = document.getElementById('app');

const store = createStore(update, init())

const render = () => {
    ReactDOM.render(<View model={store.getState()} dispatch={store.dispatch}/>, appElement);
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