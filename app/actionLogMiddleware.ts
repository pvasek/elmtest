import { IAction } from './common';

export const actionLogMiddleware = store => next => (action: IAction) => {
    const before = store.getState();    
    const result = next(action);
    const after = store.getState();
    console.log('ACTION: ' + action.type, action, 'before:', before, 'after:', after);
    return result;  
};