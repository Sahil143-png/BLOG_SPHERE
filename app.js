import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.routes.js";

import blogRoutes from "./routes/blog.routes.js";


import {
errorHandler
}
from "./middleware/error.middleware.js";



const app =
express();



app.use(

cors({

origin:
process.env.CORS_ORIGIN,

credentials:true

})

);



app.use(
express.json()
);



app.use(
cookieParser()
);



app.use(
"/api/auth",
authRoutes
);



app.use(
"/api/blogs",
blogRoutes
);



app.use(
errorHandler
);



export default app;