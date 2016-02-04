import * as React from 'react';
import { Component } from 'react';
import { View as Counter, update as updateCounter, init as initCounter } from './Counter'; 

import { 
    IAction, 
    IViewProperties, 
    IViewState,     
    DispatchHandler, 
    ReducerHandler,
    forwardAction,
    forwardUpdate,
    merge
} from './common';    

const TOP = 'TOP';
const BOTTOM = 'BOTTOM';

export const init = () => ({
    [TOP]: initCounter(),
    [BOTTOM]: initCounter() 
});

export const update = (state, action: IAction) => {
    if (action.type === TOP) {
        return forwardUpdate(state, TOP, action, updateCounter);
    }
    if (action.type === BOTTOM) {
        return forwardUpdate(state, BOTTOM, action, updateCounter);
    }
    return state;
}

export class View extends Component<IViewProperties, IViewState> {
    render() {
        return (
            <div>
                <h2>Counter1</h2>
                <Counter model={this.props.model[TOP]} dispatch={forwardAction(this.props.dispatch, TOP)}/>
                <h2>Counter2</h2>
                <Counter model={this.props.model[BOTTOM]} dispatch={forwardAction(this.props.dispatch, BOTTOM)}/>
            </div>
        );
    }
}