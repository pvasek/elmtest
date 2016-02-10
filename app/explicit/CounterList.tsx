import * as React from 'react';
import { Component } from 'react';
import * as Immutable from 'immutable';

import { View as Counter, update as updateCounter, init as initCounter } from './CounterPair'; 

import { 
    IAction, 
    IComponentViewProperties, 
    forwardAction,
    forwardArrayUpdate,
    merge
} from './../common';    

const COUNTER = 'COUNTER';
const ADD_COUNTER = 'ADD_COUNTER';

export const init = () => {
    const result = [];
    for (var i = 0; i < 10000; i++) {
        result[i] = initCounter();
    }
    return Immutable.List(result);
};

export const update = (state: Immutable.List<any> = init(), action: IAction) => {
    if (action.type === ADD_COUNTER) {
        return state.push(initCounter());
    } 
    if (action.forwardedAction) {
        const index = action.type as number;
        return state.set(index, updateCounter(state.get(index), action.forwardedAction));
    }
    return state;
}

export class View extends Component<IComponentViewProperties, {}> {
    
    constructor() {
        super();
        this.addCounter = this.addCounter.bind(this);    
    }
    
    addCounter() {
        this.props.context.dispatch({type: ADD_COUNTER});    
    }
    
    render() {
        const items = this.props.context.model.map((item, index) => 
            (<Counter key={index} componentKey={index} context={this.props.context}/>));
            
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