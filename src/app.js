import express from 'express'
import cookieParser from 'cookie-parser'
import studentRouter from "../src/routes/student.routes.js"
import authRouter from './routes/auth.routes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/student' , studentRouter)
app.use('/api/auth' , authRouter)



export default app