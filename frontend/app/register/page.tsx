"use client"
import { registerUser } from '@/lib/auth/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import React from 'react'

const Register = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [username, setUsername] = useState("")
    const [cnic, setCnic] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e:React.FormEvent) => {
      try {
        e.preventDefault()
        setError("")
        setLoader(true)
  
        const res = await registerUser(username , cnic  , password)
        if(res.data){
          
          localStorage.setItem("token" , res.token)
          router.replace('/dashboard')
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
        <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <input
        name='username'
         type="text"
         placeholder='Enter your username'
         value={username}
         onChange={(e)=>{setUsername(e.target.value)}}
        />
        <input
        name='cnic'
         type="text"
         placeholder='Enter your CNIC'
         value={cnic}
         onChange={(e)=>{setCnic(e.target.value)}}
        />
        <input
        name='password'
         type="password"
         placeholder='Enter your password'
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
        />
        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                 {loader && <p>Loading...</p>}
        <button type='submit'>Register</button>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </form>
      </div>
    </div>
  )
}

export default Register
