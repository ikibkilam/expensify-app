// REDUCERS FOR EXPENSES.

export default (state = [], action) => {
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
                    console.log("Non edited expenses in reducer: ", expense);
                    return expense;
                }
            }))
        default : 
            return state;
    }
};