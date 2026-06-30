"use client"
import { giveStudent } from '@/lib/students/student'
import { useRouter } from 'next/navigation'
import { useState , useEffect } from 'react'
import React from 'react'

const AddStudent = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [name, setName] = useState("")
    const [rollno, setRollno] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e:React.FormEvent) =>{
        try {
            e.preventDefault()
            setError("")
            setLoader(true)
    
            const res = await giveStudent(rollno , name  , email)
            if(res.data){
                router.push("/students")
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            setError(error.message)
        }finally{
            setLoader(false)
        }
    }

    useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
        router.replace('/login')
      }
    })
    const toDashboard = () => {
    router.push("/dashboard")
  }
  return (
    <div>
      
      <h1>Enter Student Data</h1>
      <form onSubmit={handleSubmit}>
        <input
        name='rollno'
        type="text"
        placeholder='Enter your rollno'
        value={rollno}
        onChange={(e) =>setRollno(e.target.value)}
          />
        <input
        name='name'
        type="text"
        placeholder='Enter your name'
        value={name}
        onChange={(e) =>setName(e.target.value)}
          />
        <input
        name='email'
        type="email"
        placeholder='Enter your email'
        value={email}
        onChange={(e) =>setEmail(e.target.value)}
          />
          <button type="submit">Enter</button>
      </form>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <p>Loading...</p>}
    </div>
  )
}

export default AddStudent
