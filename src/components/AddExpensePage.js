import React from 'react';
import { connect } from 'react-redux'
import { add_expense } from '../actions/expenses.js';
import ExpenseForm from './ExpenseForm.js';

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
            onSubmit = {(expense) => {
                console.log(expense);
                props.dispatch(add_expense(expense));
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(AddExpensePage);