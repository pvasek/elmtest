import { IAction } from './common';

export const actionLogMiddleware = convertState => store => next => (action: IAction) => {
    const before = store.getState();    
    const result = next(action);
    const after = store.getState();
    console.log('ACTION: ' + action.type, action, 'before:', convertState(before), 'after:', convertState(after));
    return result;  
};