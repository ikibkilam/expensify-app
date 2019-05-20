import React from 'react';
import { Link } from 'react-router-dom';

// Actual component.
const ExpensesListItem = (props) => (
    <div>
        <Link to = {`/edit/${props.expense.id}`} >
            <p>Description: {props.expense.description} </p>
        </Link>
        <p>Amount: {props.expense.amount} </p>
        <p>Created At: {props.expense.createdAt} </p>
    </div>
);

export default ExpensesListItem;