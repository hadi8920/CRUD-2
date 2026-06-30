"use client"
import { getStudent, updateStudent } from '@/lib/students/student'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'

const UpdateBook = () => {
  const router = useRouter()
  const params = useParams()
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)
  const [rollno, setRollno] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const token =  localStorage.getItem("token")
    if(!token){
      router.replace("/login")
      return
    }
    //TO update the exsisting data
    const fetchStudent = async () => {
      const res = await getStudent(params.id as string)
      setRollno(res.data.rollno)
      setName(res.data.name)
      setEmail(res.data.email)
    }

    fetchStudent()
  }, [params.id, router])

  const handleSubmit =async (e:React.FormEvent) => {
      try {
        e.preventDefault()
        setError("")
        setLoader(true)
        const res = await updateStudent(params.id as string  , rollno , name  , email)
        if(res.data){
          router.replace('/students')
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error : any) {
        setError(error.message)
      }finally{
        setLoader(false)
      }
    }

    const toDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div>
          <button onClick={toDashboard} className='text-3xl'>Dshboard</button>

      <button onClick={toDashboard} className='text-3xl'>Dshboard</button>
      <h1>Update your Student</h1>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <input 
        name = "rollno"
        type="text" 
        value={rollno}
        placeholder='Enter your rollno'
        onChange={(e) => {setRollno(e.target.value)}}
        />
        <input 
        name = "name"
        type="text" 
        value={name}
        placeholder='Enter your name'
        onChange={(e) => {setName(e.target.value)}}
        />
        <input 
        name = "email"
        type="email" 
        value={email}
        placeholder='Enter your email'
        onChange={(e) => {setEmail(e.target.value)}}
        />
        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <p>Loading...</p>}
        <button type='submit'>Update Student Button</button>

      </form>
    </div>
  )
}

export default UpdateBook
