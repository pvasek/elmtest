import * as React from 'react';
import { Component } from 'react';
import { View as CounterGroup, update as updateCounterGroup, init as initCounterGroup } from './CounterListGroup'; 

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

export const init = () => {
    const result = [];
    for (var i = 0; i < 10; i++) {
        result[i] = initCounterGroup();
    }
    return result;
};

export const update = (state = init(), action: IAction) => {
    if (action.type === COUNTER) {
        return forwardArrayUpdate(state, action.payload, action, updateCounterGroup);
    }
    return state;    
}

export class View extends Component<IViewProperties, IViewState> {
    
    constructor() {
        super();
   }
    
    shouldComponentUpdate(nextProps: IViewProperties) {
        return this.props.model !== nextProps.model;
    }
    
    render() {
        const items = this.props.model.map((item, index) => 
            (<CounterGroup key={index} model={item} dispatch={forwardAction(this.props.dispatch, COUNTER, index)}/>));
            
        return (
            <div>
                <h2>List</h2>
                <div>
                    {items}                    
                </div>               
            </div>
        );
    }
}