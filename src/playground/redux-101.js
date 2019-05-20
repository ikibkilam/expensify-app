import {createStore} from 'redux';

// 0. Actions describe the fact that something happened, but don't specify how the application's state changes in response.
//    This is the job of reducers, what we have outlined in the store section below. We have actually already implemented
//    a reducer. The action itself does not change the store, the reducer takes the action and changes the store.
// 1. We can actually separate the part of code that is the reducer from the call to createStore. See below. This is
//    important, because in real world applications, we might have multiple reducers.
// 2. Attributes of a reducer or rules followed by a reducer.
//    1. Reducers are pure functions: A function where the output is solely determined by the input. This means that the
//       arguments passed into the function are used to compute output. 
//       1. No variables external to scope of function are used to compute the output of the function.
//       2. And further, the output of the function is not used to change the value of a variable external to the scope of the 
//          function.
//       3. Examples of functions that are NOT reducers:
//          let a = 1;
//          const xyz = (3, a) {const result = 3 + a};
//          OR
//          let result = 2;
//          const xyz = (3, 2) {const result = 3 + 2}; 
//     2. We never change state or action directly. We never reassign them or if they are objects then we never mutate the object.
//        We simply pass in the state and action into the reducer, read off them, and then return an object that represents the
//        new state.

// Action Generators.
const incrementCount = ( { incrementBy = 1 } = {}) => ({ // Note, the second {} is the empty object and the default value of object when no object is passed
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ( { decrementBy = 1} = {}) => ({ 
    type: 'DECREMENT',
    decrementBy
});

const resetCount = ( ) => ({ // Note, no arguments are passed in to the function definition, by calling function either
    type: 'RESET'
});

const setCount = ( {count} = {}) => ({
    type: 'SET',
    count
});

// Reducer.
const countReducer = ( (state = {count: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT' :
            return ( {count: state.count + action.incrementBy} );
        case 'DECREMENT' :
            return ( {count: state.count - action.decrementBy} );
        case 'RESET' :
            return( {count: 0} );
        case 'SET' :
            return( {count: action.count});
        default: 
            return state;
    }
});

// Create Store and call reducer for every action.
const store = createStore(countReducer());


// Action Objects.
store.dispatch( incrementCount( {incrementBy: 5} ) );

store.dispatch( incrementCount() );

store.dispatch( decrementCount( {decrementBy: 3 } ) );

console.log( store.getState() );

store.dispatch( resetCount() );

console.log( store.getState() );

store.dispatch( setCount( {count: 101} ) );

console.log( store.getState() );