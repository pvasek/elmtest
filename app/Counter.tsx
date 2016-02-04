import * as React from 'react';
import { Component } from 'react';
import { IAction, IViewProperties, IViewState, merge } from './common';

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

export const init = () => ({ value: 0 });

export const update = (state: any, action: IAction): any => {
    if (action.type === INCREMENT) {
        return merge(state, {value: state.value + 1 });
    }
    if (action.type === DECREMENT) {
        return merge(state, {value: state.value - 1 });
    }
    return state;
}

export class View extends Component<IViewProperties,IViewState> {
  
    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.descrement = this.descrement.bind(this);
    }
    
    increment() {        
        this.props.dispatch({type: INCREMENT});
    }
    
    descrement() {
        this.props.dispatch({type: DECREMENT});
    }
    
    render() {
        return (
            <div>
                <h1>App {this.props.model.value}</h1>
                <button onClick={this.increment}>+</button>
                <button onClick={this.descrement}>-</button>
            </div>
        );        
    }      
}
