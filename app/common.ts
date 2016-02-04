export interface IAction {
    type: string,
    payload?: any,
    forwardedAction?: IAction
}

export interface ReducerHandler {
    (state: any, action: IAction): any;    
}

export interface DispatchHandler {
    (action: IAction): void;
}

export interface IViewProperties {
    model: any,
    dispatch: DispatchHandler
}

export interface IViewState {}

export const merge = (...sources: any[]): any => {

    var output = {};
    sources
        .filter(i => i !== undefined && i !== null)
        .forEach(i => {        
            for (var nextKey in i) {
                if (i.hasOwnProperty(nextKey)) {
                    output[nextKey] = i[nextKey];
                }
            }            
        });
    
    return output;
}

export const forwardAction = (dispatch: DispatchHandler, type: string, payload?: any): DispatchHandler => {
    return (action: IAction) => {
        console.log(`forwarding action to: ${type}, action:`, action);
        return dispatch({
            type: type,
            payload: payload,
            forwardedAction: action
        });
    };
}

export const forwardObjectUpdate = (state: any, path: any, action: IAction, updateFunc: ReducerHandler): any => {
    if (!action.forwardedAction) {
        throw 'Only actions dispatched with forwardTo which have forwardedAction attribute can be forwarded';
    }

    return merge(state, { [path]: updateFunc(state[path], action.forwardedAction) });
}

export const forwardArrayUpdate = (state: any, index: number, action: IAction, updateFunc: ReducerHandler): any => {
    if (!action.forwardedAction) {
        throw 'Only actions dispatched with forwardTo which have forwardedAction attribute can be forwarded';
    }

    return [
        ...state.slice(0, index), 
        updateFunc(state[index], action.forwardedAction), 
        ...state.slice(index + 1, state.length)];
}