const BLOG_API =
"http://localhost:5000/api/blogs";


const blogContainer =
document.getElementById(
"blogContainer"
);



async function loadBlogs(){


const response =
await fetch(BLOG_API);



const result =
await response.json();



const blogs =
result.data;



blogContainer.innerHTML="";



blogs.forEach(blog=>{


blogContainer.innerHTML +=

`

<div class="blog-card">


<img src="${blog.image}">


<div class="blog-content">


<span class="category">

${blog.category}

</span>



<h3>

${blog.title}

</h3>



<p>

${blog.description}

</p>



<a href="blog-details.html?id=${blog._id}">

Read More →

</a>


</div>


</div>

`;



});


}



if(blogContainer){

loadBlogs();

}