import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm.js'
import { edit_expense } from '../actions/expenses.js'
import { remove_expense } from '../actions/expenses';

const EditExpensePage = (props) => {
    console.log("Props passed to EditExpense comes from mapStateToProps and EditExpensePage component defined in AppRouter:", props)
    return (
        <div>
            <ExpenseForm 
                expense = {props.expense} 
                onSubmit = {(expense) => {
                    console.log("Expense Object Returned from child ExpenseForm: ", expense)
                    console.log("Expense Item id: ", props.expense.id);
                    props.dispatch(edit_expense(props.expense.id, expense));
                    props.history.push('/');
                }} 
            />
            <button 
            onClick = {(e) => {
                props.dispatch(remove_expense( {id: props.expense.id} ) )
                props.history.push('/');
            }}
            >
                Remove
            </button>
        </div>
    )
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => {
            return expense.id === props.match.params.id;
        })
    };
};

export default connect(mapStateToProps)(EditExpensePage);