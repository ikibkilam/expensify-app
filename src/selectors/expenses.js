// FILTERING & SORTING EXPENSES.

// This code will filter and sort the expenses, based on user selection.
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