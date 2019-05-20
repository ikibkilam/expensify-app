import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// 0.We simply refactor the code herein. I have kept this code intact, for reference.

// ACTION GENERATORS.
// add_expense.
const add_expense = ( {description = '', note = '', amount = 0, createdAt = 0} = { } ) => ({
    type:'ADD_EXPENSE',
    expense : {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// remove_expense.
const remove_expense = ( { id } = { } ) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }   
});

// edit_expense.
const edit_expense = ( id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// set_text_filter.
const set_text_filter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// sort_by_amount.
const sort_by_amount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// sort_by_date.
const sort_by_date = () => ({
    type: 'SORT_BY_DATE',
});

// set_start_date.
const set_start_date = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// set_end_date.
const set_end_date = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});


// REDUCERS
const expensesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_EXPENSE' :
            return [...state, action.expense]; // This adds the expense object to state
        case 'REMOVE_EXPENSE' :
            return (state.filter((item) => {
                return item.id !== action.expense.id;
            }));
        case 'EDIT_EXPENSE' :
            return (state.map((expense) => {
                if ( expense.id === action.id) {
                    return ( {...expense, ...action.updates} ); // This overwrites the contents of expense with updates
                } else {
                    expense;
                }
            }))
        default : 
            return state;
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER' : 
            return ( {...state, text: action.text} ); 
        case 'SORT_BY_AMOUNT':
            return ( {...state, sortBy: 'amount'} );
        case 'SORT_BY_DATE' :
            return ( {...state, sortBy: 'date'} );
        case 'SET_START_DATE' :
            return ( {...state, startDate: action.startDate} )
        case 'SET_END_DATE' :
            return ( {...state, endDate: action.endDate} )
        default : 
            return state;
    }
};


// FILTERING

const getVisibleExpenses =  (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes( text.toLowerCase() );
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

        console.log('Temp: ', text, startDate, endDate);
        console.log('Temp: ', textMatch, startDateMatch, endDateMatch);
        return textMatch && startDateMatch && endDateMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1: -1;
        }
    });
}




// CREATE STORE.
const store = createStore (
    combineReducers( {
        expenses: expensesReducer,
        filters: filtersReducer
        }
    )
); 

store.subscribe(() => {
    const state = store.getState();
    console.log('State: ', state);
    const visibileExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log("Visible Expenses: ", visibileExpenses);
});


// ACTION OBJECTS.
// 0. I gave values to createdAt for add_expense. I also commented out the second add_expense statement.
const rentExpense = store.dispatch(add_expense( {description: 'Rent', amount: 100, createdAt: 1000} ) );
const coffeeExpense = store.dispatch(add_expense( {description: 'Coffee', amount: 300, createdAt: -1000} ) );
// store.dispatch(add_expense());

// store.dispatch(remove_expense( {id: rentExpense.expense.id} ) );

// store.dispatch(edit_expense( coffeeExpense.expense.id, { amount: 500 } ) );

// store.dispatch(set_text_filter('rent'));

// I commented out this statement, to study sort by amount.
store.dispatch(sort_by_amount());

// I commented out this statement, to study sort by date.
store.dispatch(sort_by_date());

// store.dispatch(set_start_date(125));
// store.dispatch(set_start_date());
// store.dispatch(set_end_date(1200));

// State Definition.
const demoState = {
    expenses: [
        {
            id: 'sdsdsdss',
            description: 'Rent',
            note: 'This is the final payment for the address',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'date', // date or amount
        startDate: undefined,
        endDate: undefined
    }
};