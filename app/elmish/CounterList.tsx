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
    merge,
    purify
} from './../common';    

const COUNTER = 'COUNTER';
const ADD_COUNTER = 'ADD_COUNTER';

export const init = () => {
    const result = [];
    for (var i = 0; i < 5000; i++) {
        result[i] = initCounter();
    }
    return result;
};

export const update = (state = init(), action: IAction) => {
    if (action.type === COUNTER) {
        return forwardArrayUpdate(state, action.forwardedAction.type, action.forwardedAction, updateCounter);
    }
    if (action.type === ADD_COUNTER) {
        return [...state, initCounter()];   
    }
    return state;    
}

const View = props => {

    const addCounter = () => props.dispatch({type: ADD_COUNTER});;
        
    const items = props.model.map((item, index) => 
        (<Counter key={index} 
            model={item} 
            dispatch={forwardAction(props.dispatch, COUNTER, index)}
        />)
        );
        
    return (
        <div>
            <h2>List</h2>
            <div>
                {items}                    
            </div>
            <div>
                <button onClick={addCounter}>Add counter</button>
            </div>
        </div>
    );
}

const pureView = purify(View);
export {
    pureView as View
}