//ACTION GENERATORS FOR FILTERS.

// edit_expense.
export const edit_expense = ( id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

// set_text_filter.
export const set_text_filter = (text) => ({
    type: 'SET_TEXT_FILTER',
    text
});

// sort_by_amount.
export const sort_by_amount = () => ({
    type: 'SORT_BY_AMOUNT',
});

// sort_by_date.
export const sort_by_date = () => ({
    type: 'SORT_BY_DATE',
});

// set_start_date.
export const set_start_date = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// set_end_date.
export const set_end_date = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});