//Understanding the object separator

const user1 = {
    name: 'Biki',
    age: 56,
    gender: 'male',
    address: {
        city: 'MI',
        state: 'WA'
    }
}

const user2 = {
    name: 'Monica',
    age: 53
}

console.log({...user1.address});

console.log({...user1, ...user2});