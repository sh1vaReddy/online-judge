import { Schema } from 'mongoose';
import AutoIncrement from 'mongoose-sequence';
import mongoose from 'mongoose';
import pkg from 'bcryptjs';
const { hash } = pkg;



const AutoIncrementFactory = AutoIncrement(mongoose);

 const UserSchema = new Schema({
    user_id: {
        type: Number,
        unique: true, 
    },
    username: {
        type: String,
        required: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], 
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
    },
    role: {
        type: String,
        default: 'user', 
        enum: ['user', 'admin'], 
    },
    join_date: {
        type: Date,
        default: Date.now,
    },
});


UserSchema.plugin(AutoIncrementFactory, { inc_field: 'user_id' });

UserSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return next();
    try{
        this.password=await hash(this.password,10);
        next();
    }
    catch(error)
    {
        next(error);
    }
})


export const UserModel = mongoose.model('User', UserSchema);
