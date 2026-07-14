import express from "express";


import {

createBlog,

getAllBlogs,

getBlog,

updateBlog,

deleteBlog,

getMyBlogs,

searchBlogs


}
from "../controllers/blog.controller.js";


import {
verifyToken
}
from "../middleware/auth.middleware.js";


const router =
express.Router();



router.get(
"/",
getAllBlogs
);



router.get(
"/search",
searchBlogs
);



router.get(
"/myblogs",
verifyToken,
getMyBlogs
);



router.get(
"/:id",
getBlog
);



router.post(
"/",
verifyToken,
createBlog
);



router.put(
"/:id",
verifyToken,
updateBlog
);



router.delete(
"/:id",
verifyToken,
deleteBlog
);



export default router;