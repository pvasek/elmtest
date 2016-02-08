import * as React from 'react';
import { Component } from 'react';
import { IAction, merge } from './../common';
import { INCREMENT, DECREMENT, SET } from './actionTypes';

export interface ICounterViewProperties  {
    model: any;
    onPlus: () => void;    
    onMinus: () => void;
    onSet: (value: string) => void;
}

export class Counter extends Component<ICounterViewProperties, {}> {
  
    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.descrement = this.descrement.bind(this);
        this.set = this.set.bind(this);
    }
    
    shouldComponentUpdate(nextProps: ICounterViewProperties) {
        return this.props.model !== nextProps.model;
    }
    
    increment() {                
        this.props.onPlus();
    }
    
    descrement() {
        this.props.onMinus();
    }
    
    set(e: any) {
        this.props.onSet(e.target.value);
    }
    
    render() {
        const counterStyle = {display: 'inline-block', padding: '2 20'};
        return (
            <div style={counterStyle}>
                <input type="text" onChange={this.set} value={this.props.model.value}/>
                {/*<span>{this.props.model.value}</span>*/}                
                <button onClick={this.increment}>+</button>
                <button onClick={this.descrement}>-</button>
            </div>
        );        
    }      
}
