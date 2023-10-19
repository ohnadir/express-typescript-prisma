import { Request, Response } from 'express';
import prisma from "../config/index"
import { passwordHashed } from '../utils';

// controller for update users field
export const updateProfile = async (req:Request, res:Response) => {

    try {
        const { name, email, phone, address } = req.body;

        // check user of the existing user in database
        const user = await prisma.user.findUnique({ where: { id : parseInt(req.params.id) }});
        if (!user) {
            return res.status(422).send({ message: "Incorrect credential"});
        }

        // Check if the email exists
        let isEmailExist;
        if(email !== undefined){
            isEmailExist = await prisma.user.findUnique({ where: { email : email }});
        }
        if (isEmailExist) {
            return res.status(404).send({ message: "Email already taken" });
        }
  
        // Check if the phone number exists
        let isPhoneExist;
        if(phone !== undefined){
            isPhoneExist = await prisma.user.findUnique({ where: { phone : phone }});
        }
        if (isPhoneExist) {
            return res.status(404).send({ message: "Phone Number already taken" });
        }

        // Update the profile information by condition
        const update_user = await prisma.user.update({
            where: { id : parseInt(req.params.id) },
            data: { 
                name : name && user.name === name ? user.name : name,
                phone : phone &&  user.phone === phone ? user.phone : phone,
                email : email && user.email === email ? user.email : email,
                address : address && user.address === address ? user.address : address
            },
        })

        res.status(200).send({ message: "update Successfully", user : update_user });
         
    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
};

// controller for get all users
export const users = async(req:Request, res:Response)=>{
    try {

        // check user of the existing user in database
        const users = await prisma.user.findMany();
         if (!users) {
            return res.status(404).send({ message: "No User found this moment"});
        }
        res.status(200).send({ message: "Fetch All Users", users : users});

    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
}

// controller for get user
export const user = async(req:Request, res:Response)=>{
    try {

        // check user by id of the existing user in database
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id)}});
        if (!user) {
            return res.status(404).send({ message: "No User found by this ID"});
        }
        res.status(200).send({ message: "Fetch User", user:user });
    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
}

// controller for change password
export const change_password = async(req:Request, res:Response)=>{
    try {
        const { password } = req.body;

        // check user by id of the existing user in database
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id)}});
        if (!user) {
            return res.status(404).send({ message: "No User found by this id"});
        }

        // hash new password
        const hashedPassword = await passwordHashed(password);

        // updated password
        const update_user = await prisma.user.update({
            where: { id : parseInt(req.params.id) },
            data: { 
                password : hashedPassword && hashedPassword 
            },
        })
        res.status(200).send({ message: "update Successfully", user : update_user });

    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
}

// controller for get user
export const delete_user = async(req:Request, res:Response)=>{
    try {

        // check user by id of the existing user in database
        const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id)}});
        if (!user) {
            return res.status(404).send({ message: "No User found by this ID"});
        }

        await prisma.user.delete({  where: { id: parseInt(req.params.id)}})
        res.status(200).send({ message: "Delete User" });
        
    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
}