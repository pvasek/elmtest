export interface IAction {
    type: string|number,
    payload?: any,
    forwardedAction?: IAction
}

export interface ReducerHandler {
    (state: any, action: IAction): any;    
}

export interface DispatchHandler {
    (action: IAction): void;
}

export interface IComponentContext {
    model: any,
    dispatch: DispatchHandler,
    globalDispatch: DispatchHandler,
    path: Array<any>
}

export interface IComponentViewProperties {
    componentKey?: any,
    context?: IComponentContext    
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

export const action = (type: string, payload?: any): IAction => {
    return {
        type,
        payload
    };     
};

const buildActionTree = (types: Array<any>, finalAction: IAction): IAction => {
    {
        const result = action(types[0]);
        
        result.forwardedAction = types.length > 1 ? 
            buildActionTree(types.slice(1), finalAction)
            : finalAction;
            
        return result;
    }
};

export const forwardAction = (dispatch: DispatchHandler, ...types: Array<any>): DispatchHandler => {
    return (action: IAction) => {
        const result = buildActionTree(types, action);
        return dispatch(result);
    };
};

export const forwardObjectUpdate = (state: any, action: IAction, updateFunc: ReducerHandler): any => {
    if (!action.forwardedAction) {
        throw 'Only actions dispatched with forwardTo which have forwardedAction attribute can be forwarded';
    }

    return merge(state, { [action.type]: updateFunc(state[action.type], action.forwardedAction) });
};

export const forwardArrayUpdate = (state: any, index: number|string, action: IAction, updateFunc: ReducerHandler): any => {
    if (!action.forwardedAction) {
        throw 'Only actions dispatched with forwardTo which have forwardedAction attribute can be forwarded';
    }

    const intIndex = typeof index === 'string' ? parseInt(index, 10) : index;
        
    return [
        ...state.slice(0, index), 
        updateFunc(state[index], action.forwardedAction), 
        ...state.slice(intIndex + 1, state.length)];
};