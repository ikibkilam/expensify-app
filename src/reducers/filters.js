import moment from 'moment';

// REDUCER FOR FILTERS.

// 0. I changed the default values of startDate to be the begining of the month, and endDate to be the end of the month.
//    Earlier we had undefined for both. We used the moment library and methods startOf() and endOf().
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT_FILTER' : 
            return ( {...state, text: action.text} ); 
        case 'SORT_BY_AMOUNT':
            return ( {...state, sortBy: 'amount'} );
        case 'SORT_BY_DATE' :
            return ( {...state, sortBy: 'date'} );
        case 'SET_START_DATE' :
            return ( {...state, startDate: action.startDate} )
        case 'SET_END_DATE' :
            return ( {...state, endDate: action.endDate} )
        default : 
            return state;
    }
};

export default filtersReducer;