const BLOG_API =
"http://localhost:5000/api/blogs";



// ================= CREATE BLOG =================


const blogForm =
document.getElementById(
"blogForm"
);



if(blogForm){


blogForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const blog={


title:
title.value,


category:
category.value,


image:
image.value,


description:
description.value,


content:
content.value


};



const response =
await fetch(

BLOG_API,

{

method:"POST",

credentials:"include",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(blog)

}

);



const data =
await response.json();



if(data.success){


alert(
"Blog Published"
);


window.location.href =
"dashboard.html";


}
else{

alert(data.message);

}



});


}


const blogTitle =
document.getElementById(
"blogTitle"
);



if(blogTitle){


const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");



async function getBlog(){


const response =
await fetch(

`${BLOG_API}/${id}`

);



const result =
await response.json();



const blog =
result.data;



document.getElementById(
"blogTitle"
).innerHTML =
blog.title;



document.getElementById(
"blogImage"
).src =
blog.image;



document.getElementById(
"blogCategory"
).innerHTML =
blog.category;



document.getElementById(
"blogAuthor"
).innerHTML =
blog.author.username;



document.getElementById(
"blogDate"
).innerHTML =
new Date(
blog.createdAt
)
.toDateString();



document.getElementById(
"blogDescription"
).innerHTML =
blog.description;



document.getElementById(
"blogText"
).innerHTML =
blog.content;


}



getBlog();


}
