"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const token =  localStorage.getItem("token")
    if(!token){
      router.replace('/login')
    }
  })

  const toStudent = () => {
    router.push("/students")
  }
  const createStudent = () => {
    router.push("/students/add")
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace('/login')
  }
  return (
    <div className='flex flex-col gap-2'>
      Dashboard

      <button onClick={handleLogout}>Logout</button>
      <button onClick={toStudent}>All Students Data</button>
      <button onClick={createStudent}>Create Student</button>

    </div>
  )
}

export default Dashboard
