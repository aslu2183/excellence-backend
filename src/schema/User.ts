const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema

// id: ID!
// name: String!
// code: String
// country Object

const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
});

export default mongoose.model('User', User);