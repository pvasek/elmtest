import * as React from 'react';
import { Component } from 'react';
import { purify } from '../common';
import { View as Counter, update as updateCounter, init as initCounter } from './Counter'; 

import { 
    IAction, 
    IViewProperties, 
    IViewState,     
    DispatchHandler, 
    ReducerHandler,
    forwardAction,
    forwardObjectUpdate,
    merge
} from './../common';    

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const RESET = 'RESET';

export const init = () => ({
    [LEFT]: initCounter(),
    [RIGHT]: initCounter() 
});

export const update = (state = init(), action: IAction) => {
    if (action.forwardedAction) {
        return forwardObjectUpdate(state, action, updateCounter);
    }
    if (action.type === RESET) {
        return init();
    }
    return state;
}

const View = props => {
    const reset = () => props.dispatch({ type: RESET });

    const boxStyle = {float:'left', minWidth: 180};
    return (
        <div style={boxStyle}>
            <Counter model={props.model[LEFT]} dispatch={forwardAction(props.dispatch, LEFT)}/>
            <Counter model={props.model[RIGHT]} dispatch={forwardAction(props.dispatch, RIGHT)}/>
            <button onClick={reset}>reset</button>
        </div>
    );    
}

const pureView = purify(View);
export {
    pureView as View
}