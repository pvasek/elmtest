import { Component, createElement } from 'react';
import * as React from 'react';
import { 
    IComponentViewProperties, 
    IComponentContext,
    forwardActionPath 
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
            const key = this.props.path;
            if (key instanceof Array) {
                return key.reduce((acc, item) => {
                    return acc.get(item);
                }, model);
            } else {
                return key !== undefined ? model.get(key) : model;
            }
        }
        
        getNewContext(): IComponentContext {
            const context = this.props.context;
            const path = this.props.path;
            if (path !== undefined && path !== null) {
                const keyPath = path instanceof Array ? path : [path];                    
                this.newContext = {
                    model: this.getModel(context.model),
                    dispatch: forwardActionPath(context.dispatch, keyPath),
                    globalDispatch: context.globalDispatch,
                    path: [...context.path, path]
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
            return createElement(View, { context: ctx, key: this.props.path, children: (this.props as any).children });
        }    
    }    
    return ComponentScope;
}