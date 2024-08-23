fetch("http://localhost:3000/users/6684eba2535129ce0bb732fe").then((res) => console.log(res.json()))

// POST Request

document.getElementById('create-user-form').addEventListener('submit',async function(event){
    event.preventDefault();
    const name =document.getElementById('create-name').value;
    const age =document.getElementById('create-age').value;

    try{
        const response= await fetch(`http://localhost:3000/users`,{
        method:'POST',
        headers:{'Content-Type':'application.json'},
        body:JSON.stringify({name,age})
        });
        const data = await response.json();
        displayOutput(data); 
    }catch(error){
        displayOutput({error:'Failed to Create User'})
    }
});

// GET Request Form 

document.getElementById('get-user-form').addEventListener('submit',async function(event){
    event.preventDefault();
    const id =document.getElementById('get-id').value;
   // const age =document.getElementById('create-age').value;

    try{
        const response= fetch(`http://localhost:3000/users/${id}`);
        const data = await response.json();
        displayOutput(data); 
    }catch(error){
        displayOutput({error:'Failed to Get User'})
    }
});


// Update user

document.getElementById('update-user-form').addEventListener('submit',async function(event){
    event.preventDefault();
    const id=document.getElementById('update-id').value;
    const name =document.getElementById('update-name').value;
    const age =document.getElementById('update-age').value;

    try{
        const response= await fetch(`http://localhost:3000/users/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application.json'},
        body:JSON.stringify({name,age})
        });
        const data = await response.json();
        displayOutput(data); 
    }catch(error){
        displayOutput({error:'Failed to Update User'})
    }
});


// PATCH User

document.getElementById('patch-user-form').addEventListener('submit',async function(event){
    event.preventDefault();
    const id=document.getElementById('patch-id').value;
    const name =document.getElementById('patch-name').value;
    const age =document.getElementById('patch-age').value;

    const body={};
    if(name) body.name =name;
    if(age) body.age= age;


    try{
        const response= await fetch(`http://localhost:3000/users/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application.json'},
        body:JSON.stringify({name,age})
        });
        const data = await response.json();
        displayOutput(data); 
    }catch(error){
        displayOutput({error:'Failed to Update User'})
    }
});


// Delete User 


document.getElementById('delete-user-form').addEventListener('submit',async function(event){
    event.preventDefault();
    const id=document.getElementById('delete-id').value;

    try{
        const response= await fetch(`http://localhost:3000/users/${id}`,{
        method:'DELETE'});
        const data = await response.json();
        displayOutput(data); 
    }catch(error){
        displayOutput({error:'Failed to DELETE User'})
    }
});


function displayOutput(data){
    const output = document.getElementById('output');
    output.innerHTML=JSON.stringify(data,null,2);
}