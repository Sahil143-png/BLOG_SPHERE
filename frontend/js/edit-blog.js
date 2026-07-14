const BLOG_API =
"http://localhost:5000/api/blogs";



const params =
new URLSearchParams(
window.location.search
);



const id =
params.get("id");



// ================= LOAD BLOG =================


async function loadBlog(){


const response =
await fetch(

`${BLOG_API}/${id}`

);



const result =
await response.json();



const blog =
result.data;



title.value =
blog.title;


category.value =
blog.category;


image.value =
blog.image;


description.value =
blog.description;


content.value =
blog.content;


}


loadBlog();





// ================= UPDATE BLOG =================


const editForm =
document.getElementById(
"editBlogForm"
);



editForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const updatedBlog={


title:title.value,


category:category.value,


image:image.value,


description:description.value,


content:content.value


};



const response =
await fetch(

`${BLOG_API}/${id}`,

{

method:"PUT",

credentials:"include",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(updatedBlog)


}

);



const data =
await response.json();



if(data.success){


alert(
"Blog Updated"
);



window.location.href =
"dashboard.html";


}


});