import User from "../models/user.model.js";

import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";

import ApiResponse from "../utils/ApiResponse.js";

import ApiError from "../utils/ApiError.js";



// ================= REGISTER =================


export const register = async(req,res,next)=>{


try{


const {
username,
email,
password
}
=
req.body;



const existingUser =
await User.findOne({
email
});



if(existingUser){

throw new ApiError(
400,
"User already exists"
);

}



const hashedPassword =
await bcrypt.hash(
password,
10
);



const user =
await User.create({

username,

email,

password:hashedPassword

});



return res.status(201)
.json(

new ApiResponse(
201,
user,
"Registration successful"
)

);



}
catch(error){

next(error);

}


};





// ================= LOGIN =================


export const login = async(req,res,next)=>{


try{


const {
email,
password
}
=
req.body;



const user =
await User.findOne({
email
});



if(!user){

throw new ApiError(
404,
"User not found"
);

}



const isPasswordCorrect =
await bcrypt.compare(

password,

user.password

);



if(!isPasswordCorrect){

throw new ApiError(
401,
"Invalid password"
);

}



const token =
generateToken(
user._id
);



res.cookie(
"token",
token,
{

httpOnly:true,

secure:false,

sameSite:"strict"

}

);



return res.status(200)
.json(

new ApiResponse(

200,

{

id:user._id,

username:user.username,

email:user.email

},

"Login successful"

)

);



}
catch(error){

next(error);

}


};





// ================= LOGOUT =================


export const logout =
async(req,res)=>{


res.clearCookie(
"token"
);



res.status(200)
.json({

success:true,

message:"Logout successful"

});


};





// ================= CURRENT USER =================


export const getCurrentUser =
async(req,res,next)=>{


try{


const user =
await User.findById(
req.user
)
.select(
"-password"
);



res.status(200)
.json(

new ApiResponse(
200,
user,
"Current user"
)

);



}
catch(error){

next(error);

}


};