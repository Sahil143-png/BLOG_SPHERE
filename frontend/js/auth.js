const API = "http://localhost:5000/api/auth";


// ================= REGISTER =================

const registerForm =
document.getElementById("registerForm");


if(registerForm){

registerForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();


const username =
document.getElementById("username").value;


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;


const confirmPassword =
document.getElementById("confirmPassword").value;



if(password !== confirmPassword){

alert("Password does not match");
return;

}



const response =
await fetch(

`${API}/register`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

username,
email,
password

})

}

);



const data =
await response.json();



if(data.success){

alert(
"Account created successfully"
);


window.location.href =
"login.html";


}
else{

alert(data.message);

}


});

}



// ================= LOGIN =================


const loginForm =
document.getElementById("loginForm");


if(loginForm){


loginForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const response =
await fetch(

`${API}/login`,

{

method:"POST",

credentials:"include",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

email,
password

})

}


);



const data =
await response.json();



if(data.success){


localStorage.setItem(
"user",
JSON.stringify(data.data)
);



alert(
"Login successful"
);



window.location.href =
"dashboard.html";


}
else{

alert(data.message);

}


});

}


// ================= LOGOUT =================


async function logout(){


await fetch(

`${API}/logout`,

{

method:"POST",

credentials:"include"

}

);



localStorage.removeItem(
"user"
);



window.location.href =
"login.html";


}




// ================= CHECK LOGIN =================


function checkLogin(){


const user =
localStorage.getItem("user");



if(!user){

window.location.href =
"login.html";

}


}