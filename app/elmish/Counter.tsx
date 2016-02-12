import * as React from 'react';
import { Component } from 'react';
import { IAction, IViewProperties, IViewState, merge, purify } from './../common';

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

const View = (props) => {

    const increment = () => {
        console.log('increment dispatch')
        props.dispatch({type: INCREMENT});
    };
    
    const descrement = () => props.dispatch({type: DECREMENT});
    const set = e => props.dispatch({type: SET, payload: e.target.value});
  
    const counterStyle = {display: 'inline-block', padding: '2 20'};
    return (
        <div style={counterStyle}>
            <input type="text" onChange={e => set(e)} value={props.model.value}/>
            {/*<span>{props.model.value}</span>*/}                
            <button onClick={() => increment()}>+</button>
            <button onClick={() => descrement()}>-</button>
        </div>
    );        
};


const pureView = purify(View);

const effects = {
    html: pureView    
}

export {
    pureView as View,
    effects
}