import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { set_text_filter, sort_by_amount, sort_by_date, set_start_date, set_end_date } from '../actions/filters.js';

// 0. I imported set_start_date and set_end date.
// 1. I changed the component from a stateless component to a class component, since we need to track state. This was
//    done by coping the JSX and putting it in render(), within the class component. I also created a state object.
//    Last, since now we are using a class component, we had to change the reference to props, from props to this.props.
// 2. The state initializes the calendarFocused property, which tells us which calendar are we focused on. It is not 
//    false/true as we had in SingleDatePicker, but it is null, since we are choosing a calendar (or it is a string).
// 3. We setup the properties for DateRangePicker. 
//    1. Note, the startDate and endDate are retrieved from the store, since we had set these up in reducers/filters.js 
//       and then in app.js we had configured the store, and so the values of startDate and endDate were in the store. Of 
//       course, we can access the store, using props, defined in mapStateToStore.
//    2. The onDatesChange() is called by the React-dates library. It is called with an object - we could have created a
//       a variable to pull our startDate and endDate, the values we want. Or, we could simply destructure the object, as
//       below. Note, {startDate, endDate} is NOT an object, or a block. It is an object getting destructured - it says,
//       give me a variable called startDate, and a variable called endDate, and take it from an object created, when the
//       user selects startDate and endDate from the calendars. Note, here the user is selecting the object, the <DateRangePicker>
//       object. When we do destructuring with a specified object we do: { x, y } = object.
//    3. The onFocusChange() works very similarly. The user selects a new focus, and that is the parameter, focusedInput
//       into the method. And we simply set the state, such that calendarFocused property is now focusedInput.
//    4. The properties startDateId and endDateId were required. I tired to run without them, but got warnings. I looked up on 
//       the net, and folks had simply set these to a string, which is what I did.
//    5. The optional properties used were as follows. showClearDates was a property that allows one to remove both the startDate
//       and endDate. numberOfMonths, specifies that we see only one month for a startDate and one month for an endDate. 
//       isOutsideRange specifies that we can go back in time and specify a startDate and/or and endDate.

class ExpensesListFilters extends React.Component {
    state = {
        calendarFocused: null
    }
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(set_start_date(startDate));
        this.props.dispatch(set_end_date(endDate));
    }
    onFocusChange = (focusedInput) => {
        this.setState( () => ({ calendarFocused: focusedInput }) )
    }

    render() {
        return (
            <div>
                <h2>Filter Expenses</h2>
                <input 
                    type = "text" 
                    value = {this.props.filters.text} 
                    onChange = {(e) => {
                        this.props.dispatch(set_text_filter(e.target.value))
                        console.log(e.target.value)
                    }}
                />

                <select 
                    value = {this.props.filters.sortBy}
                    onChange = {(e) => {
                        e.target.value === 'date' ? this.props.dispatch(sort_by_date()) : this.props.dispatch(sort_by_amount())
                    }}
                >
                    <option value = "date">Date</option>
                    <option value = "amount">Amount</option>
                </select>

                <DateRangePicker 
                    startDate = {this.props.filters.startDate}
                    startDateId = {"startDate"}
                    endDate = {this.props.filters.endDate}
                    endDateId = {"endDate"}
                    onDatesChange = {this.onDatesChange}
                    focusedInput = {this.state.calendarFocused}
                    onFocusChange = {this.onFocusChange}
                    showClearDates = {true}
                    numberOfMonths = {1}
                    isOutsideRange = {() => false}
                />
            </div>
        )
    }
}   

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpensesListFilters);