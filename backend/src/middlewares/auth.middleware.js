import jwt from 'jsonwebtoken'

export async function authMiddleware(req, res , next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(404).json({
            error : "Unauthorized"
        })
    }

    jwt.verify(token , process.env.JWT_SECRET , (err , decoded)=>{
        if(err){
            return res.status(403).json({
                error : "Invalid or expired token"
            })
        }
        next()
    })

}

export default authMiddleware