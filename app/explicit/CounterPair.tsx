import * as React from 'react';
import { Component } from 'react';
import * as Immutable from 'immutable';
import { View as Counter, update as updateCounter, init as initCounter } from './Counter'; 

import { 
    IAction, 
    IComponentViewProperties, 
    forwardObjectUpdate,    
    merge
} from './../common';   

import {scopedView } from './scopedView'; 

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const RESET = 'RESET';

const init = () => (Immutable.Map({
    [LEFT]: initCounter(),
    [RIGHT]: initCounter() 
}));

const update = (state: Immutable.Map<any, any> = init(), action: IAction) => {
    switch (action.type) {
        case LEFT: 
            return state.set(LEFT, updateCounter(state.get(LEFT), action.forwardedAction));
        case RIGHT: 
            return state.set(RIGHT, updateCounter(state.get(RIGHT), action.forwardedAction));
        case RESET:
            return init();
    }
    return state;
}

class View extends Component<IComponentViewProperties, {}> {
    
    constructor() {
        super();
        this.reset = this.reset.bind(this);
    }   
    
    reset() {
        this.props.context.dispatch({ type: RESET });
    }
    
    render() {
        const boxStyle = {float:'left', minWidth: 180};
        return (
            <div style={boxStyle}>
                <Counter path={LEFT} context={this.props.context}/>
                <Counter path={RIGHT} context={this.props.context}/>
                <button onClick={this.reset}>reset</button>
            </div>
        );
    }
}

const v = scopedView(View);
export {
    init,
    update,        
    v as View,    
};