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
    
    shouldComponentUpdate(nextProps: IViewProperties) {
        return this.props.model !== nextProps.model;
    }
    
    reset() {
        this.props.dispatch({ type: RESET });
    }
    
    render() {
        return this.renderCompact();
    }
    
    renderNormal() {
        const boxStyle = {float:'left', minWidth: 160};
        return (
            <table>
                <tbody>
                <tr>
                    <td>
                        <Counter 
                            path={[...this.props.path, LEFT]} 
                            globalDispatch={this.props.globalDispatch} 
                            model={this.props.model[LEFT]} 
                            dispatch={forwardAction(this.props.dispatch, LEFT)}/>
                    </td>
                    <td>
                        <Counter
                            path={[...this.props.path, RIGHT]} 
                            globalDispatch={this.props.globalDispatch}                          
                            model={this.props.model[RIGHT]} 
                            dispatch={forwardAction(this.props.dispatch, RIGHT)}/>
                    </td>
                    <td>
                        <button onClick={this.reset}>reset</button>
                    </td>                    
                </tr>
                </tbody>
            </table>
        );
    }
    
    renderCompact() {
        const boxStyle = {float:'left', minWidth: 180};
        return (
            <div style={boxStyle}>
                <Counter model={this.props.model[LEFT]} dispatch={forwardAction(this.props.dispatch, LEFT)}/>
                <Counter model={this.props.model[RIGHT]} dispatch={forwardAction(this.props.dispatch, RIGHT)}/>
                <button onClick={this.reset}>reset</button>
            </div>
        );
    }
}