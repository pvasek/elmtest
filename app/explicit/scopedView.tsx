import { Component, createElement } from 'react';
import * as React from 'react';
import { 
    IComponentViewProperties, 
    IComponentContext,
    forwardAction 
} from './../common';

export const scopedUpdate = () => {
    return (...args) => {
        
    }; 
};

export const scopedView = View => {
    
    class ComponentScope extends Component<IComponentViewProperties,{}> {
        
        private newContext: IComponentContext;
        
        // shouldComponentUpdate(nextProps: IComponentViewProperties) {
        //     return this.props.context.model !== nextProps.context.model;
        // }
        
        getNewContext(): IComponentContext {
            const context = this.props.context;
            const componentKey = this.props.componentKey;
            if (componentKey) {                    
                this.newContext = {
                    model: context.model[componentKey],
                    dispatch: forwardAction(context.dispatch, componentKey),
                    globalDispatch: context.globalDispatch,
                    path: [...context.path, componentKey]
                };
            } else {
                this.newContext = {
                    model: context.model,
                    dispatch: context.dispatch,
                    globalDispatch: context.globalDispatch,
                    path: context.path || []
                };                    
            }
            return this.newContext;
        }
        
        render() {
            const ctx = this.getNewContext();
            return createElement(View, { context: ctx, key: this.props.componentKey });
        }    
    }    
    return ComponentScope;
}