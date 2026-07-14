import Blog from "../models/blog.model.js";

import ApiResponse from "../utils/ApiResponse.js";

import ApiError from "../utils/ApiError.js";



// CREATE BLOG


export const createBlog =
async(req,res,next)=>{


try{


const blog =
await Blog.create({

...req.body,

author:req.user

});



res.status(201)
.json(

new ApiResponse(
201,
blog,
"Blog created successfully"
)

);



}
catch(error){

next(error);

}


};





// GET ALL BLOGS


export const getAllBlogs =
async(req,res,next)=>{


try{


const blogs =
await Blog.find()

.populate(
"author",
"username"
)

.sort(
{
createdAt:-1
}
);



res.status(200)
.json(

new ApiResponse(
200,
blogs,
"Blogs fetched"
)

);



}
catch(error){

next(error);

}


};





// SINGLE BLOG


export const getBlog =
async(req,res,next)=>{


try{


const blog =
await Blog.findById(
req.params.id
)
.populate(
"author",
"username"
);



if(!blog){

throw new ApiError(
404,
"Blog not found"
);

}



blog.views++;

await blog.save();



res.status(200)
.json(

new ApiResponse(
200,
blog,
"Blog details"
)

);



}
catch(error){

next(error);

}


};





// UPDATE BLOG


export const updateBlog =
async(req,res,next)=>{


try{


const blog =
await Blog.findById(
req.params.id
);



if(!blog){

throw new ApiError(
404,
"Blog not found"
);

}



if(
blog.author.toString()
!==req.user.toString()
){

throw new ApiError(
403,
"Not authorized"
);

}



Object.assign(
blog,
req.body
);



await blog.save();



res.status(200)
.json(

new ApiResponse(
200,
blog,
"Blog updated"
)

);



}
catch(error){

next(error);

}


};





// DELETE BLOG


export const deleteBlog =
async(req,res,next)=>{


try{


const blog =
await Blog.findById(
req.params.id
);



if(!blog){

throw new ApiError(
404,
"Blog not found"
);

}



if(
blog.author.toString()
!==req.user.toString()
){

throw new ApiError(
403,
"Not authorized"
);

}



await blog.deleteOne();



res.status(200)
.json({

success:true,

message:"Blog deleted"

});



}
catch(error){

next(error);

}


};





// USER BLOGS


export const getMyBlogs =
async(req,res,next)=>{


try{


const blogs =
await Blog.find({

author:req.user

});



res.status(200)
.json(

new ApiResponse(
200,
blogs,
"My blogs"
)

);



}
catch(error){

next(error);

}


};





// SEARCH BLOGS


export const searchBlogs =
async(req,res)=>{


const keyword =
req.query.keyword;



const blogs =
await Blog.find({

$or:[

{
title:{
$regex:keyword,
$options:"i"
}
},

{
category:{
$regex:keyword,
$options:"i"
}
}

]

});



res.json(blogs);


};