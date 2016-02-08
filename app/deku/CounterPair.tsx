import * as Deku from 'deku';
import { element } from 'deku';
Deku.createElement = (...any) => element(...any);

import { View as Counter, update as updateCounter, init as initCounter } from './Counter'; 

import { 
    IAction, 
    IViewProperties, 
    IViewState,     
    DispatchHandler, 
    ReducerHandler,
    forwardAction,
    forwardObjectUpdate,
    merge,
    action
} from './../common';    

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

export const View = ({props, dispatch}) => {
    const boxStyle = {float:'left', minWidth: 180};
    return (
        <div style={boxStyle}>
            <Counter model={props.model[LEFT]} dispatch={forwardAction(dispatch, LEFT)}/>
            <Counter model={props.model[RIGHT]} dispatch={forwardAction(dispatch, RIGHT)}/>
            <button onClick={() => dispatch(action(RESET))}>reset</button>
        </div>
    );
}
