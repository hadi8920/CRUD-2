import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    rollno:{
        type:Number,
        unique:[true , "Student Roll number should be unique"],
        required : true
    },
    name : {
        type:String,
        required : true 
    },
    email:{
        type :String,
        unique:true,
        required : true 
    }
})

const studentModel = mongoose.model("student" , studentSchema)

export default studentModel