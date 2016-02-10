import * as React from 'react';
import { Component } from 'react';
import * as Immutable from 'immutable';
import { IAction, IComponentViewProperties, merge } from './../common';
import { scopedView } from './scopedView';

const INCREMENT = '@counter/INCREMENT';
const DECREMENT = '@counter/DECREMENT';
const SET = '@counter/SET';

const init = () => Immutable.Map({ value: 0 });

const update = (state: Immutable.Map<string, any> = init(), action: IAction): Immutable.Map<string, any> => {
    switch (action.type) {
        case INCREMENT:
            const result = state.set('value', state.get('value') + 1 );
            return result;
        case DECREMENT:
            return state.set('value', state.get('value') - 1 );
        case SET: 
            return state.set('value', parseInt(action.payload, 10));
    }
    
    return state;
}

class View extends Component<IComponentViewProperties, {}> {
  
    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.descrement = this.descrement.bind(this);
        this.set = this.set.bind(this);
    }   
    
    increment() {                
        this.props.context.dispatch({type: INCREMENT});
    }
    
    descrement() {
        this.props.context.dispatch({type: DECREMENT});
    }
    
    set(e: any) {
        this.props.context.dispatch({type: SET, payload: e.target.value});
    }
    
    render() {
        const counterStyle = {display: 'inline-block', padding: '2 20'};
        return (
            <div style={counterStyle}>
                <input type="text" onChange={this.set} value={this.props.context.model.get('value')}/>
                <button onClick={this.increment}>+</button>
                <button onClick={this.descrement}>-</button>
            </div>
        );        
    }      
};

const v = scopedView(View); 

export {
    init,
    update, 
    v as View 
};
