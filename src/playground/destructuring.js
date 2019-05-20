// We shall study destructuring - the ability to destructure arrays such that we can pull out array elements and assign
// the value of the element to variables, that can then be used in the code. This allows for easy scaling of
// code and more readable code.

// We define an array.
const address = ['9407', 'SE 33rd St.', 'Mercer Island', 'WA']

// 1. This is traditional usage of how we might use the data above. However, the problem is that we have to now read
//    this code and interpret what address[0] means, by looking at the array, and if the array was defined elsewhere,
//    then we get unreadable code.
console.log(`I live at ${address[0]} ${address[1]} in ${address[2]}`);

// 2. We could of course do this. But this does not scale very well, since we have to define variables for every property.
const num = address[0];
const st = address[1];
const town = address[2];
console.log(`I live at ${num} ${st} in ${town}`);

// 3. With array destructuring, we avoid the above problems. 
//    1. The syntax is very similar to object destructuring, except we use [] instead of {}. 
//    2. Note, the matching of the variable name to the array element, is based on position. 
//    3. We can leave any element out. For the last element to be left out, we simply do not include a variable name. For the 
//       first element to be left out, we simply use a comma, as below.
//    4. Since, the matching of variable name to element in array, is based on position, there is no renaming in array
//       destructuring.
//    5. Default values are written exactly as we did for object destructuring.

const [, street = 'Unknown', city ] = address;
console.log(`I live at ${st} in ${town}`);

// 4. Exercise.
const item = ['Coffee (hot)', '$2.00', '$2.50', '$3.00'];

const [coffee, , dollars] = item;

console.log(`A medium ${coffee} costs ${dollars}`);