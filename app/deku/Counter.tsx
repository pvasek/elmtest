import * as Deku from 'deku';
import { element } from 'deku';
Deku.createElement = (...any) => element(...any);

import { IAction, IViewProperties, IViewState, merge, action } from './../common';

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

export const View = (arg) => {
    const counterStyle = {display: 'inline-block', padding: '2 20'};
    console.log(arg);
    const { props, children, dispatch } = arg;
    return (
        <div style={counterStyle}>
            <input type="text" onChange={(e: any) => dispatch(action(SET))} value={props.model.value}/>
            {/*<span>{this.props.model.value}</span>*/}                
            <button onClick={() => dispatch(action(INCREMENT))}>+</button>
            <button onClick={() => dispatch(action(DECREMENT))}>-</button>
        </div>
    );        
}      

