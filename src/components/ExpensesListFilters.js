import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { set_text_filter, sort_by_amount, sort_by_date, set_start_date, set_end_date } from '../actions/filters.js';

// Actual component.
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

// Function that returns an object that contains the data the actual component needs.
const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

// Using connect to connect component to store. We are exporting the connected component and not the regular component.
export default connect(mapStateToProps)(ExpensesListFilters);