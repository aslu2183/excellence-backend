const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PanelSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    color : {
        type: String
    }

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
    slug : {
        type: String,
        required : true
    },
    color : {
        type: String
    },
    panels : [PanelSchema]
},{ timestamps: true });

export default mongoose.model('Board', Board);