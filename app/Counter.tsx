import * as React from 'react';
import { Component } from 'react';
import { IAction, IViewProperties, IViewState, merge } from './common';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const SET = 'SET';

export const init = () => ({ value: 0 });

export const update = (state: any = init(), action: IAction): any => {
    switch (action.type) {
        case INCREMENT:
            return merge(state, {value: state.value + 1 });
        case DECREMENT:
            return merge(state, {value: state.value - 1 });
        case SET: 
            return merge(state, {value: parseInt(action.payload, 10)});
    }
    
    return state;
}

export class View extends Component<IViewProperties,IViewState> {
  
    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.descrement = this.descrement.bind(this);
        this.set = this.set.bind(this);
    }
    
    shouldComponentUpdate(nextProps: IViewProperties) {
        return this.props.model !== nextProps.model;
    }
    
    increment() {                
        this.props.dispatch({type: INCREMENT});
    }
    
    descrement() {
        this.props.dispatch({type: DECREMENT});
    }
    
    set(e: any) {
        this.props.dispatch({type: SET, payload: e.target.value});
    }
    
    render() {
        const counterStyle = {display: 'inline-block', padding: '2 20'};
        return (
            <div style={counterStyle}>
                {/*<input type="text" onChange={this.set} value={this.props.model.value}/>*/}
                <span>{this.props.model.value}</span>                
                <button onClick={this.increment}>+</button>
                <button onClick={this.descrement}>-</button>
            </div>
        );        
    }      
}
