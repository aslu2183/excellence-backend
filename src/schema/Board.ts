const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema

// id: ID!
// name: String!
// code: String
// country Object
const PanelSchema = new Schema({
    name : {
        type: String,
        required: true
    },

},{ timestamps: true });

const Board = new Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false,    
    },
    panels : [PanelSchema]
},{ timestamps: true });

export default mongoose.model('Board', Board);