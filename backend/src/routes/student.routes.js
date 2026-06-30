import express from 'express'
import studentController from '../controllers/student.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router()



router.post("/give_student" , authMiddleware , studentController.giveStudent)
router.get('/get_all_student', authMiddleware , studentController.getAllStudents)
router.patch('/update_student/:id', authMiddleware , studentController.updateStudent)
router.delete('/delete_student/:id', authMiddleware , studentController.deleteStudent)
router.get('/get_student/:id', authMiddleware , studentController.getStudent)

export default router