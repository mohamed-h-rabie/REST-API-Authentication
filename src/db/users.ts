//user schema && user modal
import mongoose from "mongoose";

//creating schema
const userSchema = new mongoose.Schema({
    username :{type: "string", required: true},
    email:{type: "string", required: true},
    authentication:{
        password:{type: "string", required: true , select:false},
        salt:{type: "string", select:false},
        sessionToken:{type: "string", select:false}
    }
})

//create modal to make user in db
export const userModal =  mongoose.model('user',userSchema)


//getusers byemail bytoken by id create user delete and update byid

export const getUsers = ()=> userModal.find() ;
export const getUserByEmail = (email:string)=>userModal.findOne({email})
export const getUserByToken = (sessionToken:string)=>userModal.findOne({
    'authentication.sessionToken': sessionToken
})

export const getUserById = (id:string)=>userModal.findById({id})

export const createUser = (values:Record<string,any>)=> new userModal(values).save().then(user=>user.toObject)
export const deleteUserById =(id:string)=>userModal.findOneAndDelete({_id:id});
export const updateUserByid =(id:string , values:Record<string,any>)=>userModal.findByIdAndUpdate(id,values)