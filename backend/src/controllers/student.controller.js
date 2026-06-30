import studentModel from "../models/student.model.js";
import mongoose from "mongoose";

async function giveStudent(req, res) {
    const { rollno, name, email } = req.body;

    if (!rollno || !name || !email) {
      throw new Error("Roll number , Name and Email are required")
    }

    const foundData = await studentModel.findOne({
      $or: [{ rollno: rollno }, { email: email }],
    });
    if (foundData) {
      throw new Error("Roll number or email should be unique")
    }

    const studentData = await studentModel.create({
      rollno,
      name,
      email,
    });
    if (!studentData) {
      throw new Error("Something went wrong")
    }

    res.status(201).json({
      message: "Data taken successfully",
      data: studentData,
    });

}

async function getAllStudents(req, res) {
    const { name, sort, order } = req.query;
    const sortObj = {};
    const filter = {};
    if (sort) {
      sortObj[sort] = order === "desc" ? -1 : 1;
    }
    if (name) {
      filter.name = name;
    }
    const studentData = await studentModel.find(filter).sort(sortObj);
    if (!studentData) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
    res.status(200).json({
      message: "Data fetched successfully",
      data: studentData,
    });

}

async function updateStudent(req, res) {
    const { rollno, name, email } = req.body;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID Format")
    }

    // if(!rollno || !name || !email){
    //     return res.status(400).json({
    //         error : "Rollno , Name and Email are required"
    //     })
    // }

    const foundData = await studentModel.findOne({
      rollno: rollno,
      _id: { $ne: id },
    });
    if (foundData) {
      throw new Error("Student already exists")
    }

    const studentData = await studentModel.findOneAndUpdate(
      { _id: id },
      { rollno: rollno, name: name, email: email },
      { new: true },
    );

    if (!studentData) {
      throw new Error("Something went wrong")
    }

    res.status(200).json({
      message: "Data updated successfully",
      data: studentData,
    });
}

async function deleteStudent(req, res) {
    
    // const {rollno , name , email} = req.body

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format")
    }

    const studentData = await studentModel.findOneAndDelete({ _id: id });
    if (!studentData) {
      throw new Error("Student already deleted or does not exist")
    }

    res.status(200).json({
      message: "Student Deleted successfully",
      data: studentData,
    });
}

async function getStudent(req, res) {
    
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format")
    }

    const studentData = await studentModel.findOne({ _id: id });

    if (!studentData) {
      throw new Error("Student not found")
    }

    res.status(201).json({
      message: "Data Fetched successfully",
      data: studentData,
    });
}

export default {
  giveStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
