"use client"
import { loginUser } from '@/lib/auth/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'
import Loading from './loading'

const Login = () => {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)
    const [cnic, setCnic] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit= async (e:React.FormEvent) => {
      try {
        e.preventDefault()
        setError("")
        setLoader(true)
        const res = await loginUser(cnic , password)
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
      <button onClick={toDashboard} className='text-3xl'>Dashboard</button>
        <h1>Login</h1>
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
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
                <button disabled={loader} type='submit'>Login</button>
                {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                {loader && <Loading/>}
                <p>Dont have an account?</p>
                <Link href='/register'>Register</Link>
            </form>
        </div>
    </div>
  )
}

export default Login