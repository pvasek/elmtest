import * as React from 'react';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { View as Counter, update as counterUpdate, init as counterInit } from './CounterList'; 

const appElement = document.getElementById('app');

const store = createStore(counterUpdate, counterInit())

const render = () => {
    ReactDOM.render(<Counter model={store.getState()} dispatch={store.dispatch}/>, appElement);
}

render();
store.subscribe(render);