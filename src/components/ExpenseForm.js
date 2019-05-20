import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            note: props.expense ? props.expense.note : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };
    }
    
    // Handlers.
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ( {description} ));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ( {amount} ));
        } else {

        }
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ( {note} ))
    };
    onDateChange = (date) => {
        if (date) {
            this.setState(() => ( {createdAt: date} ));
        } 
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ( {calendarFocused: focused} ));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(() => ( {error: 'Please provide a description and an amount'} ))
        } else {
            this.setState(() => ( {error: ''} ));
            console.log("New or Edited Expense Item within ExpenseForm: ", this.state);
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }   
    };

    // Render.
    render() {
        return (
            <div>
                {this.state.error && <h4>{this.state.error}</h4>}

                <form onSubmit = {this.onSubmit}>
                    <input 
                        type = 'text'
                        placeholder = 'Enter expense description'
                        autoFocus
                        value = {this.state.description}
                        onChange = {this.onDescriptionChange}
                    />

                    <input 
                        type = 'text'
                        placeholder = 'Enter expense amount'
                        value = {this.state.amount}
                        onChange = {this.onAmountChange}
                    />

                    <SingleDatePicker 
                        date = {this.state.createdAt}
                        onDateChange = {this.onDateChange}
                        focused = {this.state.calendarFocused}
                        onFocusChange = {this.onFocusChange} 
                        numberOfMonths = {1}
                        isOutsideRange = {() => (false)}
                    />

                    <textarea 
                        placeholder = 'Enter a note about the expense item (optional)'
                        value = {this.state.note}
                        onChange = {this.onNoteChange}
                    />

                    <button> Add Expense</button>
                </form>
            </div>
        )
    };
};