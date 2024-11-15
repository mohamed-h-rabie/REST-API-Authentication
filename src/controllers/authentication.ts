import * as express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';


export const register =async(res:express.Response , req:express.Request)=>{
   const{username , email , password} = req.body
    try {
        if(!username || !email || !password){
            return res.status(400).json({message: 'Please provide all required fields'})
        }
        const exsistingUser = await getUserByEmail(email)
        if(exsistingUser){
            return res.sendStatus(400).json({message:"User already exists"})
        }
        const salt = random()
        const user = await createUser({username, email, authentication:{
            salt ,
            password:authentication(salt , password )
        }})
        res.status(200).json({message: 'User registered successfully', user}).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }


}