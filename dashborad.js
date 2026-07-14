const BLOG_API =
"http://localhost:5000/api/blogs";


// ================= LOAD MY BLOGS =================


async function loadMyBlogs(){


try{


const response =
await fetch(

`${BLOG_API}/myblogs`,

{

credentials:"include"

}

);



const result =
await response.json();



const blogs =
result.data;



const tableBody =
document.getElementById(
"blogTableBody"
);



const totalBlogs =
document.getElementById(
"totalBlogs"
);



if(totalBlogs){

totalBlogs.innerHTML =
blogs.length;

}



tableBody.innerHTML="";



blogs.forEach(blog=>{


tableBody.innerHTML +=

`

<tr>

<td>

${blog.title}

</td>


<td>

${blog.category}

</td>


<td>

${new Date(blog.createdAt)
.toDateString()}

</td>


<td>


<a 
href="edit-blog.html?id=${blog._id}"
class="edit-btn">

Edit

</a>



<button

onclick="deleteBlog('${blog._id}')"

class="delete-btn">

Delete

</button>


</td>


</tr>

`;



});


}
catch(error){

console.log(error);

}


}



// ================= DELETE BLOG =================


async function deleteBlog(id){


const confirmDelete =
confirm(
"Delete this blog?"
);



if(!confirmDelete)
return;



const response =
await fetch(

`${BLOG_API}/${id}`,

{

method:"DELETE",

credentials:"include"

}

);



const data =
await response.json();



if(data.success){


alert(
"Blog deleted"
);


loadMyBlogs();


}
else{

alert(data.message);

}



}




// Load dashboard

loadMyBlogs();