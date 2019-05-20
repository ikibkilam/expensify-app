import React from 'react';
import { connect } from 'react-redux';
import ExpensesListItem from './ExpensesListItem';
import selectExpenses  from '../selectors/expenses.js';
import ExpenseForm from './ExpenseForm.js';

// Actual component.
const ExpensesList = (props) => (
    <div>
        <h2>Expense List</h2>
        {props.expenses.map((expense, index) => {
            return (
            <ExpensesListItem 
                key = {index}
                expense = {expense}
            />
            )
            })
        }
    </div>
);

// Function that returns an object that contains the data the actual component needs.
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
};

// Using connect to connect component to store. We are exporting the connected component and not the regular component.
export default connect(mapStateToProps)(ExpensesList);
