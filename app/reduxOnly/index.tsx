import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { reducer } from './reducer';
import { Counter } from './Counter';
import { action } from './../common';
import { INCREMENT, DECREMENT, SET } from './actionTypes';

const appElement = document.getElementById('app');

const store = createStore(reducer, {value: 0})

const dispatch = store.dispatch;

const render = () => {
    ReactDOM.render(
        (<Counter 
            model={store.getState()} 
            onPlus={() => dispatch(action(INCREMENT))} 
            onMinus={() => dispatch(action(DECREMENT))} 
            onSet={() => dispatch(action(SET))}/>
        ), appElement);
}

render();
store.subscribe(render);