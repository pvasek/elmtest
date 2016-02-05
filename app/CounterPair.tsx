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
    forwardObjectUpdate,
    merge
} from './common';    

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

export class View extends Component<IViewProperties, IViewState> {
    
    constructor() {
        super();
        this.reset = this.reset.bind(this);
    }
    
    reset() {
        this.props.dispatch({ type: RESET });
    }
    
    render() {
        const boxStyle = {float:'left', minWidth: 160};
        return (
            <table>
                <caption>Counters</caption>
                <tr>
                    <td>
                        <Counter model={this.props.model[LEFT]} dispatch={forwardAction(this.props.dispatch, LEFT)}/>
                    </td>
                    <td>
                        <Counter model={this.props.model[RIGHT]} dispatch={forwardAction(this.props.dispatch, RIGHT)}/>
                    </td>
                    <td>
                        <button onClick={this.reset}>reset</button>
                    </td>
                    
                </tr>
            </table>
        );
    }
}