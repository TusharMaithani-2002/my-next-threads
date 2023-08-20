import mongoose from 'mongoose';

const threadSchema = mongoose.Schema({

    text:{type:String,required:true},
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },

    commmunity:{type:mongoose.Schema.Types.ObjectId,ref:'Community'},
    createdAt: {
        type:Date,
        default:Date.now(),
    },
    parentId: {
        type:String,
    },
    cildren:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread' // self -> recursion
        }
    ]

});


const Thread =  mongoose.models.Thread || mongoose.model('Thread',threadSchema);

export default Thread;