declare namespace __Deku {

    interface Element {
        (elementName: any, attrs?: any, children?: Array<any>): any
        (...args: any[]): any
    }
    
    interface RenderFunc {
        (element: any, context?: any): void
    }
    
    var createApp: (htmlElement: any, dispatch: any) => RenderFunc;
    var element: Element;
    
    interface CreateElementFunc {
        (...args: any[]): any;
    }

    var createElement: CreateElementFunc;
}

declare module "deku" {
	export = __Deku    
}
