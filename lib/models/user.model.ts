import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id:{type:String,required:true},
    username:{type:String,required:true},
    name:{type:String,requierd:true},
    image:String,
    bio:String,
    threads : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ],

    onboarding: {
        type:Boolean,
        default:false,
    },
});

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;