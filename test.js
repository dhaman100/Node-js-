let d = console.log(fetch("http://localhost:3000/users/66cd99c56ba5a0e424200424"))

console.log(typeof(d))

let e=d.json()

displayOutput(e)

//console.log(d.json())