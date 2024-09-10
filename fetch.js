let master=fetch("https://localhost:3000/users/")

console.log(master)

let slave =master.json()

console.log(slave)

//.then((res)=>{console.log(res)})