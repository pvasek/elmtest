import * as Deku from 'deku';
import { createApp, element } from 'deku';
Deku.createElement = (...any) => element(...any);

import { createStore } from 'redux';
import { View, update, init } from './Counter'; 

const appElement = document.getElementById('app');

const store = createStore(update, init());

const render = createApp(appElement, store.dispatch);
 
const main = () => {
 render(<View model={store.getState()}/>);   
}
 
store.subscribe(() => {
    main();
});

main();