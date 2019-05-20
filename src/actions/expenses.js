// ACTION GENERATORS FOR EXPENSES.

import uuid from 'uuid';

// add_expense.
export const add_expense = ( {description = '', note = '', amount = 0, createdAt = 0} = { } ) => ({
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
export const remove_expense = ( { id } = { } ) => ({
    type: 'REMOVE_EXPENSE',
    expense: {
        id
    }   
});

// edit_expense.
export const edit_expense = ( id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
