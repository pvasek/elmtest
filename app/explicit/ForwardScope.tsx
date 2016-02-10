import * as React from 'react';
import { Component, cloneElement } from 'react';
import { IComponentViewProperties } from './../common';   
import { scopedView } from './scopedView';

class ForwardScope extends Component<IComponentViewProperties,{}> {
    render() {
        const children = (this.props as any).children;
        console.log('ForwardScope', children);
        return React.Children.only(children);
    }    
}

const view = scopedView(ForwardScope);

export {
    view as ForwardScope
}