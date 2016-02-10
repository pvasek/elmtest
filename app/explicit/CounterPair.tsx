import * as React from 'react';
import { Component } from 'react';
import * as Immutable from 'immutable';
import { View as Counter, update as updateCounter, init as initCounter } from './Counter'; 

import { 
    IAction, 
    IComponentViewProperties, 
    forwardAction,
    forwardObjectUpdate,    
    merge
} from './../common';   

import {scopedView } from './scopedView'; 

const LEFT = '@coutnerPair/LEFT';
const RIGHT = '@coutnerPair/RIGHT';
const RESET = '@coutnerPair/RESET';

const init = () => (Immutable.Map({
    [LEFT]: initCounter(),
    [RIGHT]: initCounter() 
}));

const update = (state: Immutable.Map<any, any> = init(), action: IAction) => {
    switch (action.type) {
        case LEFT: 
            return merge(state, { [LEFT]: updateCounter(state[LEFT], action.forwardedAction)});
        case RIGHT: 
            return merge(state, { [RIGHT]: updateCounter(state[RIGHT], action.forwardedAction)});
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
        console.log('counter pair render');
        const boxStyle = {float:'left', minWidth: 180};
        return (
            <div style={boxStyle}>
                <Counter componentKey={LEFT} context={this.props.context}/>
                <Counter componentKey={RIGHT} context={this.props.context}/>
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