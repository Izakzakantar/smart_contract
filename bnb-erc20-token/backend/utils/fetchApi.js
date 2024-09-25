const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyN2NjNTAwOS1lMmNiLTRhZmYtYTc5OC0xYWJjYThiM2RjY2UiLCJpYXQiOjE3MjcxMTIyOTIsImV4cCI6MTcyNzExNTg5Mn0.HuXrDUitSt_sORF18qh0IPCwlKsSsHK-5R3Ke1217xs";

fetch('http://localhost:3000/api/v1/donations/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`  // Add token in Authorization header
  },
  body: JSON.stringify({
    firstName: "issshak",
    donorAddress: "cristoriphone14estpasbienpringles",
    amount: 12.3,
    remark: "free palestine"
  }),
  credentials: 'include' // To include cookies in the request if needed
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
