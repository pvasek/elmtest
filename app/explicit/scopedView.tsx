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
        
        shouldComponentUpdate(nextProps: IComponentViewProperties) {
            return this.getModel(this.props.context.model) !== this.getModel(nextProps.context.model);
        }
        
        getModel(model) {
            const key = this.props.componentKey;
            return key !== undefined ? model.get(key) : model;
        }
        
        getNewContext(): IComponentContext {
            const context = this.props.context;
            const componentKey = this.props.componentKey;
            if (componentKey !== undefined && componentKey !== null) {                    
                this.newContext = {
                    model: context.model.get(componentKey),//context.model[componentKey],
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