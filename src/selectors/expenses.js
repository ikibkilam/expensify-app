// FILTERING & SORTING EXPENSES.

// 0. I had to change the startDateMatch and endDateMatch definition statements, because we needed to compare
//    numbers. I used the fact that startDate and endDate parameters passed into the function, were moments.
//    And moment().valueOf() is an integer timestamp (starting at zero on Jan 01, 1970). Since, createdAt is
//    also a number, I could not compare numbers. This works well. Though I used how the instructor did it, since
//    I like the elegance of using the query operator of moments (where we compare moment instances). Also, valueOf() 
//    gives an error, when we clear both dates in DateRangePicker object in ExpensesListFilters.js. This is because 
//    then startDate and endDate have values 'null', and valueOf() makes no sense. It is hence best to use the instructor
//    method. I have however retained this commented code for my way for reference in the future.
// 1. Note, I had to use the ternary operator, since if we clear out the startDate and endDate, since we allowed
//    the user to do this, within DateRangePicker, we will not be filtering anything out. And hence we return
//    true if this is the case.
// 2. Note, no expense results show up, since we had initialized three expenses in app.js, and their timestamps
//    were very close to 1970.
// 3. If we create a new expense item and the time stamp is this month, then when we filter with dates before and
//    after this timestamp, it will show up. Or it will not show up, if I pick some date range that has nothing
//    to do with the actual date. I checked it works! Also, note, the hardcoded expenses in app.js do appear, when
//    we deselect both startDate and endDate within DateRangePicker, as expected, since we are not filtering for
//    anything.

// My way.
// export default (expenses, { text, sortBy, startDate, endDate }) => {
//     return expenses.filter((expense) => {
//         const textMatch = expense.description.toLowerCase().includes( text.toLowerCase() );
//         console.log('Checking endDate: ', endDate, endDate.valueOf(), typeof endDate.valueOf()); // This statement only works if we do NOT clear both dates, within DateRangePicker.
//         const startDateMatch = startDate ? expense.createdAt >= startDate.valueOf() : true;
//         const endDateMatch = endDate ? expense.createdAt <= endDate.valueOf() :  true;
//         return textMatch && startDateMatch && endDateMatch;
//     }).sort((a, b) => {
//         if (sortBy === 'date') {
//             return a.createdAt < b.createdAt ? 1 : -1;
//         } else if (sortBy === 'amount') {
//             return a.amount < b.amount ? 1: -1;
//         }
//     });
// }

//Instructor Way.
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const textMatch = expense.description.toLowerCase().includes( text.toLowerCase() );
        console.log('Checking endDate: ', endDate);
        const startDateMatch = startDate ? startDate.isSameOrBefore(expense.createdAt): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(expense.createdAt) : true;
        return textMatch && startDateMatch && endDateMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1: -1;
        }
    });
}