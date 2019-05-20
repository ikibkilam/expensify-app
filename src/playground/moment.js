// Practice with momentjs library.

import moment from 'moment';

// Create the moment.
// Today's date
const date = moment()
console.log('date: ', date);
// A specific date
const dateString = moment('12-01-1970', 'MM-DD-YYYY');
console.log('dateString: ', dateString)
// From a timestamp (milliseconds)
const dateTimestamp = moment(13123445600000);
console.log('dateTimestamp: ', dateTimestamp);

// Get + Set.
// Set time to be 50 milliseconds from moment.
const msSet = moment().millisecond(50);
console.log('msSet:', msSet);
// Get day from moment.
const msGet = moment().day();
console.log('msGet:', msGet);

// Manipulate moment.
const manipulate = moment().add(7, 'days').subtract(1, 'months').year(2009). hours(0);
console.log('manipulate: ', manipulate);


// Display - Format the moment.
// Formatted to be MM-DD-YYYY
const dateFormatted = date.format('MM-DD-YYYY');
console.log('dateFormatted: ', dateFormatted);
// Formatted to be DD-MM-YYYY
const dateStringFormatted = dateString.format('DD-MM-YYYY');
console.log('dateStringFormatted: ', dateStringFormatted);
// Formatted to be YY-MM-DD
const dateTimestampFormatted = dateTimestamp.format('YY-MM-DD');
console.log('dateTimestampFormatted :', dateTimestampFormatted);
// Formatted to be YY-MM-DD
const msSetFormatted = msSet.format('YY-MM-DD');
console.log('msSetFormatted :', msSetFormatted);
// Note, msGet is not a moment object.
// Formatted to be YY-MM-DD
const manipulateFormatted = manipulate.format('YY-MM-DD');
console.log('manipulateFormatted :', manipulateFormatted);
// Getting the timestamp (milliseconds) for the moment (let us say for date above)
console.log('Timestamp of date: ', date.valueOf());

// Checking if I can get timestamp from a moment, I write the code as below. Yes, I can!
const startDate = moment().startOf('month');
console.log('startDate: ', startDate.valueOf());
console.log(typeof startDate.valueOf());


