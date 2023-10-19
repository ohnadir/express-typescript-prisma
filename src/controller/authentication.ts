import { Request, Response } from 'express';
import prisma from "../config/index"
import { v4 as uuid } from 'uuid';
import uuidToNumber from '../utils/convertNumber';
import { passwordHashed, comparePassword } from '../utils/passwordHashed';
import { jwtToken, verifyToken } from '../utils/jwtToken';


export const registration = async (req:Request, res:Response) => {

    try {
        const { email, phone, name, password, address } = req.body;

        // Check if the email exists
        const isEmailExist = await prisma.user.findFirst({ where: { email: email }});
        if (isEmailExist) {
            return res.status(404).send({ message: "Email already taken" });
        }
  
        // Check if the phone number exists
        const isPhoneExist = await prisma.user.findFirst({ where: { phone: phone }});
        if (isPhoneExist) {
            return res.status(404).send({ message: "Phone Number already taken" });
        }
        
        const hashedPassword = await passwordHashed(password)
        
        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                id: Number(uuidToNumber(uuid())),
                email,
                phone,
                name,
                password : hashedPassword,
                address
            }
        });
        
        // create jwt token for user authentication
        jwtToken(res, newUser, "Registration Successfully");
         
    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
};

export const login = async (req:Request, res:Response) => {
  
    try {
        const { email, password } = req.body;

        // Find the user by their email
        const user = await prisma.user.findFirst({ where: { email : email }});
        if (!user) {
           return res.status(404).send({ message: "Invalid User"});
        }

        // check the password is match or not
        const validPass =  await comparePassword(password , user.password);
        if (!validPass) {
            return res.status(404).send({ message: "Incorrect Credential"}); 
        }

        // create jwt token for user authentication
        jwtToken(res, user, "Login Successfully");

    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
};

export const loadUser = async (req:Request, res:Response) => {

    try {
        const { token } = req.params;

        if (!token) {
            return res.status(401).send({ message: "Your token is expired. Please login again"});
        }
        verifyToken(res, token);
        
        
    } catch (error) {
        return res.status(500).send({ message: "Server Error. Try again"});
    }
};