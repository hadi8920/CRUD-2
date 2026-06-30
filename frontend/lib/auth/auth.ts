const BASE_URL = "http://localhost:3000"

export async function registerUser(username : string , cnic : string , password : string) {
    try {
        const res = await fetch(`${BASE_URL}/api/auth/register` , {
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({username , cnic , password})
        })
    
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
        throw e
    }
}

export async function loginUser(cnic : string , password : string){
                console.log("--------------------------")

    try {
        const res = await fetch(`${BASE_URL}/api/auth/login` ,{
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({cnic , password})
        })
                    console.log("--------------------------mid")
                    console.log("res: ", res)

        const data = await res.json()
        // console.log("res: ", res)
        console.log("data ", data)
        if(!res.ok){
            console.log("--------------------------")
            throw new Error(data.message)
        }
    
        return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw error
    }
}