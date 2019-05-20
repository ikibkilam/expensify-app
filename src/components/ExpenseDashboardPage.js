import React from 'react';
import ExpensesList from './ExpensesList.js';
import ExpensesListFilters from './ExpensesListFilters.js';

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesListFilters />
        <ExpensesList />
    </div>
);

export default ExpenseDashboardPage;