import express from 'express'
import studentController from '../controllers/student.controller.js'

const router = express.Router()



router.post("/give_student" , studentController.giveStudent)
router.get('/get_all_student/' , studentController.getAllStudents)
router.patch('/update_student/:id' , studentController.updateStudent)
router.delete('/delete_student/:id' , studentController.deleteStudent)
router.get('/get_student/:id' , studentController.getStudent)

export default router