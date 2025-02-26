const express = require("express");
const { findMin } = require("../../util");
const app = new express();
const port = 3000;
const greeting = { message: "Hello Node" };
app.get("/", (req, res) => {
  res.json(greeting);
});
app.get("/number/min", (req, res) => {
    const num1 = parseFloat(req.query.num1)
    const num2 = parseFloat(req.query.num2);
    const result = findMin(num1,num2)
    console.log(result)
    res.json(result)
});
//   /number/avg?numbers=1,2,3,4,5,6,6.....
app.get('number/avg',(req,res)=>{})

// /number/sort?numbers=1,2,3,4,5,6.....n&type (asc|desc)
app.get('numbers/sort',(req,res)=>{})

// number/count?numbers=1,2,3,4,a,b,c,d,saman, kamal.....n&search=saman
app.get('/numbers/count',(req,res)=>{})

app.listen(port,()=>{
    console.log(`Server is runnign on port ${port}`)
})
