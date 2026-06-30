const BASE_URL = "http://localhost:3000"

export async function giveStudent(rollno:string , name : string  , email: string){

    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/student/give_student` , {
            method : "POST",
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({rollno , name , email})
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error
    }
}

export async function getStudents(){
    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/student/get_all_student` , {
            method : "GET",
            headers : {
                Authorization  : `Bearer ${token}`
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        throw error
    }
}

export async function deleteStudents(id:string){
    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/student/delete_student/${id}` , {
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${token}`
            },
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error
    }
}

export async function updateStudent(id:string , rollno:string  , name : string , email:string){
    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/student/update_student/${id}` , {
            method : "PATCH",
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({rollno , name , email })
        })
    
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        throw error
    }
}

export async function getStudent(id : string){
    try {
        const token = await localStorage.getItem("token")
        const res = await fetch(`${BASE_URL}/api/student/get_student/${id}` , {
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`,
            }
        })
    
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
    
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        throw error
    }
}
