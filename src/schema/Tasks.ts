const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkListSchema = new Schema({
    description : {
        type: String,
        required: true
    },
    is_completed : {
        type: Boolean
    }
});


const Task = new Schema({
    boardId: {
        type: Schema.Types.ObjectId,
        ref: 'Board'
    },
    panelId : {
        type: Schema.Types.ObjectId,
    },
    description : {
        type: String,
        required: true
    },
    longDescription : {
        type: String
    },
    colors : {
        header : {
            type : String
        },
        content : {
            type : String
        }
    },
    position : {
        type: Number
    },
    checklist : [checkListSchema]
},{ timestamps: true });

export default mongoose.model('Task', Task);