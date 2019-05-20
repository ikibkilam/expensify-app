// Integrate Git Into Project.

// Imports 3rd party NPM packages.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js'
import { add_expense } from './actions/expenses.js';
import { set_text_filter } from './actions/filters.js';
import getVisibleExpenses from './selectors/expenses.js';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
import AppRouter from './routers/AppRouter.js';

// Create store.
const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
    console.log("The state within store.subscribe(): ", state);
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log("Visible Expenses: ", visibleExpenses);
});


// Generate Actions.
store.dispatch( add_expense( { description: 'Water bill', amount: 300, createdAt: 50 } ) );
store.dispatch( add_expense( { description: 'Gas bill', amount: 100, createdAt: 200 } ) );
store.dispatch( add_expense( { description: 'Rent bill', amount: 109500 }));
 

// Make store available to components.
const jsx = (
    <Provider store = {store}>
        <AppRouter />
    </Provider>
);


// Render the application.
ReactDOM.render(jsx, document.getElementById('app'));


