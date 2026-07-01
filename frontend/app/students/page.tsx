"use client"
import { deleteStudents, getStudents } from '@/lib/students/student'
import { useRouter } from 'next/navigation'
import React, { useEffect , useState } from 'react'

const Student = () => {
    const router = useRouter()
    const [students, setStudents] = useState([])

    useEffect( () => {
      const token =  localStorage.getItem("token")
      if(!token){
        router.replace('/login')
        return
      }

      async function fetchStudent(){
        const res = await getStudents()
        setStudents(res.data)
      }

      fetchStudent()
    } , [])

    const toDashboard = () => {
    router.push("/dashboard")
  }

  const toUpdate = (id:string) => {
    router.push(`/students/edit/${id}`)
  }
  return (
   <div className='flex flex-col gap-2'>
    <button onClick={toDashboard} className='text-3xl'>Dashboard</button>
    <h1>Students</h1>
     <div className='flex flex-col gap-2' >
      {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      students.map((student : any) => (
        <div className='flex flex-col gap-2 my-5 items-start' key={student._id}>
            <h1>{student.rollno}</h1>
            <p>{student.name}</p>
            <p>{student.email}</p>
            <button onClick={() => {
              toUpdate(student._id)
            }}>Update Student</button>
            <button className= 'text-black' onClick={async()=>{
              await deleteStudents(student._id)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setStudents(students.filter((s:any)=> s._id !== student._id))
            }}>Delete Student</button>
        </div>
      ))
      }
    </div>
   </div>
  )
}

export default Student
