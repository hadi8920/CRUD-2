import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        unique: true,
        required : true
    },
    cnic :{
        type : String , 
        unique : true,
        required : true,
        match: [/^\d{13}$/, "CNIC must be exactly 13 digits"]
    },
    password : {
        type : String,
        required :true,
    }
})

const userModel = mongoose.model("users", userSchema)

export default userModel