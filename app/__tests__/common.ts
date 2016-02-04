import * as test from 'tape';
import { forwardArrayUpdate } from '../common';

//forwardArrayUpdate = (state: any, index: number, action: IAction, updateFunc: ReducerHandler): any => {
test('forwardArrayUpdate - should update array correctly', t => {
    
    const reducer = (state, action) => {
        t.equal(action.type, 'A');
        return { A: 1 };
    };
    
    const action = {
        type: '',
        forwardedAction: {
            type: 'A'
        }
    }
    
    const result1 = forwardArrayUpdate([{}, {}, {}], 0, action, reducer)    
    t.deepEqual(result1, [{ A: 1 }, {}, {}]);

    const result2 = forwardArrayUpdate([{}, {}, {}], 1, action, reducer)    
    t.deepEqual(result2, [{}, { A: 1 }, {}]);

    const result3 = forwardArrayUpdate([{}, {}, {}], 2, action, reducer)    
    t.deepEqual(result3, [{}, {}, { A: 1 }]);
    
    t.end(); 
});

