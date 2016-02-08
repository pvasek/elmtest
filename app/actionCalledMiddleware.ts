import { IAction } from './common';

const findFinalAction = (action: IAction, path: Array<any> = []) => {
    if (action.forwardedAction) {
        path.push(action.payload || action.type);
        return findFinalAction(action.forwardedAction, path);
    }
    return { action, path };
}

export const actionCalledMiddleware = store => next => (action: IAction) => {
    const result = next(action);
    const finalAction = findFinalAction(action);
    next({type: 'ACTION_CALLED', payload: finalAction});                
    return result;  
};


export const actionWorkflowMiddleware = (workflows) => store => next => (action: IAction) => {
    const run = (actionToRun: IAction) => {
        const result = next(actionToRun);
        const finalAction = findFinalAction(actionToRun);
        
        const workflow = workflows[finalAction.action.type];
        if (workflow && typeof workflow === 'function') {
            workflow(run, finalAction, () => store.getState());
        }
        return result;
    }
    return run(action);    
};
