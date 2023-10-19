import jwt from "jsonwebtoken";
import prisma from "../config/index"


export async function jwtToken(res:any, user:any, message:string){
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_TIME });
    return res.status(200).send({ message: message, user:user, token:token });
}

export function verifyToken(res:any, token:any){
    jwt.verify(token, process.env.JWT_SECRET as string, async function (err:any, decoded:any){

        // if token is invalid or empty execute this condition
        if(err) {
          return res.status(403).send({ message: 'Invalid Token' })
        }

        const user = await prisma.user.findFirst({ where: { id : decoded?.id }});
        // if id is invalid or empty execute this condition
        if (!user) {
            return res.status(404).send({ message: "Invalid User"});
        }
        return res.status(200).send({ message: "Load User Successfully", user: user });
    })
}