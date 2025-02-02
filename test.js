// fetch("http://localhost:3001/api/auth/login", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         username: "testuser",
//         password: "testpassword"
//     })
// }).then(res => res.json()).then(console.log).catch(console.error);

fetch("http://localhost:3001/api/transaction", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwidXNlcklkIjoiNjc5ZjRlYTVlZTBlNmZmNGY0NGYzMTc0IiwiaWF0IjoxNzM4NDk3MDQzfQ.g4gYPVWVlaMY44e5B1CbsQMHLt7usPKVzeJaGkFUy4c"
    }
})
.then(res => res.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));