import { IAction, merge } from './../common';
import { INCREMENT, DECREMENT, SET } from './actionTypes';

export const reducer = (state: any = {value: 0}, action: IAction): any => {
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
