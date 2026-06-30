import express from 'express'
// import cookieParser from 'cookie-parser'
import cors from 'cors'
import studentRouter from "../src/routes/student.routes.js"
import authRouter from './routes/auth.routes.js'
import abcd from "./middlewares/error.middleware.js";


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin : "*",
    methods : ["GET" , "POST" , "PATCH" , "DELETE"],
    credentials : true
}

app.use(cors(corsOptions))
// app.use(cookieParser())

app.use('/api/student' , studentRouter)
app.use('/api/auth' , authRouter)
app.use(abcd.errorHandler)



export default app