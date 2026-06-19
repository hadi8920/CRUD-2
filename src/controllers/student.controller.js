import studentModel from "../models/student.model.js";
import mongoose from 'mongoose'

async function giveStudent(req, res){
    try {
        const {rollno , name , email} = req.body
    
        if(!rollno || ! name || ! email){
            return res.status(400).json({
                error : "Roll number , Name and Email are required"
            })
        }
        
        const foundData = await studentModel.findOne({$or:[{rollno : rollno} ,{ email : email}]})
        if(foundData){
            return res.status(409).json({
                error: "Roll number or email should be unique"
            })
        }

    
        const studentData = await studentModel.create({
            rollno,
            name,
            email
    
        })
        if(!studentData){
            return res.status(400).json({
                error : "Something went wrong"
            })
        }
    
        res.status(201).json({
            message : "Data taken successfully",
            Data : studentData
        })
    } catch (err) {
        return res.status(500).json({
            error : err.message
        })
    }

}

async function getAllStudents(req, res){
    try {
        const name = req.query.name
        const sort = req.query.sort
        const order = req.query.order
        const sortObj = {}
        const filter = {}
        if(sort){
            sortObj[sort] = order === 'desc' ? -1 : 1
        }
        if(name){
            filter.name = name
        }
        const studentData = await studentModel.find(filter).sort(sortObj)
        if(!studentData){
            return res.status(400).json({
                error : "Something went wrong"
            })
        }
        res.status(200).json({
            message : "Data fetched successfully",
            Data : studentData
        })
    } catch (err) {
        return res.status(500).json({
            error : err.message
        })
        
    }
}

async function updateStudent(req , res){
    try {
        const {rollno , name , email} = req.body
        const id = req.params.id
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(500).json({
                error : "Invalid ID Format"
            })
        }
    
        // if(!rollno || !name || !email){
        //     return res.status(400).json({
        //         error : "Rollno , Name and Email are required"
        //     })
        // }
    
        const foundData = await studentModel.findOne({rollno : rollno , _id:{$ne:id}})
        if(foundData){
            return res.status(400).json({
                error : "Student already exists"
            })
        }
    
        const studentData = await studentModel.findOneAndUpdate(
            {_id : id},
            {rollno : rollno, name : name , email :email},
            {new: true}
        )
    
        if(!studentData){
            return res.status(400).json({
                error : "Something went wrong"
            })
        }
    
        res.status(200).json({
            message : "Data updated successfully",
            Data : studentData
        })
    } catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

async function deleteStudent(req , res){

    try {
        // const {rollno , name , email} = req.body
    
        const id = req.params.id
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                error :"Invalid ID format"
            })
        }
    
        const studentData = await studentModel.findOneAndDelete({_id:id})
        if(!studentData){
            return res.status(500).json({
                error : "Student already deleted or does not exist"
            })
        }
    
        res.status(200).json({
            message:"Student Deleted successfully",
            Data : studentData
        })
    } catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

async function getStudent(req , res){

    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(500).json({
                error : "Invalid ID format"
            })
        }
    
        const studentData = await studentModel.findOne({_id:id})
    
        if(!studentData){
            return res.status(500).json({
                error : "Student not found"
            })
        }
    
        res.status(201).json({
            message : "Data Fetched successfully",
            Data : studentData
        })
    } catch (err) {
        res.status(500).json({
            error : err.message
        })
    }

}


export default {
    giveStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudents
}