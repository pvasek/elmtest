declare namespace __Kefir {

    interface Stream {
        scan: (fn: Function, acc: any) => Stream;
        map: (fn: Function) => Stream;
        onValue: (fn: Function) => void;
    }
    
    interface StreamFunc {
        (...args: any[]): Stream;
    }

    var stream: (callback?: Function) => Stream;
}

declare module "kefir" {
	export = __Kefir    
}
