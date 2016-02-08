import * as React from 'react';
import { Component } from 'react';
import { View as Counter, update as updateCounter, init as initCounter } from './CounterPair'; 

import { 
    IAction, 
    IViewProperties, 
    IViewState,     
    DispatchHandler, 
    ReducerHandler,
    forwardAction,
    forwardArrayUpdate,
    merge
} from './common';    

const COUNTER = 'COUNTER';
const ADD_COUNTER = 'ADD_COUNTER';

export const init = () => {
    const result = [];
    for (var i = 0; i < 100; i++) {
        result[i] = initCounter();
    }
    return result;
};

export const update = (state = init(), action: IAction) => {
    if (action.type === COUNTER) {
        return forwardArrayUpdate(state, action.payload, action, updateCounter);
    }
    if (action.type === ADD_COUNTER) {
        return [...state, initCounter()];   
    }
    return state;    
}

export class View extends Component<IViewProperties, IViewState> {
    
    constructor() {
        super();
        this.addCounter = this.addCounter.bind(this);    
    }
    
    shouldComponentUpdate(nextProps: IViewProperties) {
        return this.props.model !== nextProps.model;
    }
    
    addCounter() {
        this.props.dispatch({type: ADD_COUNTER});    
    }
    
    render() {
        const items = this.props.model.map((item, index) => 
            (<Counter key={index} model={item} dispatch={forwardAction(this.props.dispatch, COUNTER, index)}/>));
            
        return (
            <div>
                <h2>List</h2>
                <div>
                    {items}                    
                </div>
                <div>
                    <button onClick={this.addCounter}>Add counter</button>
                </div>
            </div>
        );
    }
}