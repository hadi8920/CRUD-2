"use client"
import { getStudent } from '@/lib/students/student'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect , useState } from 'react'
import React from 'react'

const GetStudent = () => {
  const router = useRouter()
  const params = useParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [student, setStudent] = useState<any>(null)
  useEffect(() => {
    const token =  localStorage.getItem("token")
    if(!token){
      router.replace("/login")
      return
    }

    const fetchBook = async () => {
      const res = await getStudent(params.id as string)
      setStudent(res.data)
    }
    fetchBook()
  })
  const toDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div>
          <button onClick={toDashboard} className='text-3xl'>Dshboard</button>

      <div className='flex flex-col gap-2'></div>
        <h1>Student Data</h1>
        <p>{student?.rollno}</p>
        <p>{student?.name}</p>
        <p>{student?.email}</p>
    </div>
  )
}

export default GetStudent
