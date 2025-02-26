const express = require("express");
const { findMin, findAvg, sortArray, findValue, findMax } = require("../../util");
const app = new express();
const port = 3000;
const greeting = { message: "Hello Node" };
app.get("/", (req, res) => {
  res.json(greeting);
});
// /number/min?num1=1&num2=2
app.get("/number/min", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const result = findMin(num1, num2);
  res.json(result);
});
//   /number/avg?numbers=1,2,3,4,5,6,6.....n
app.get("/number/avg", (req, res) => {
  const convertedParams = req.query.numbers.split(",");
  let result = findAvg(req.query.numbers.split(","));
  res.json(result);
});

// /number/sort?numbers=1,2,3,4,5,6.....n&type (asc|desc)
app.get("/number/sort", (req, res) => {
    const numbers = req.query.numbers;
    const type = req.query.type
    const result = sortArray(numbers.split(','),type)
    res.json(result)
});

// number/count?values=1,2,3,4,a,b,c,d,saman, kamal.....n&search=saman
app.get("/number/count", (req, res) => {
    const values = req.query.values;
    const search = req.query.search
    const result = findValue(values.split(','),search)
    res.json(result)
});

// /number/max?num1=1&num2=2
app.get("/number/max",(req,res)=>{
  const num1 = req.query.num1
  const num2 = req.query.num2
  const result = findMax(num1,num2);
  res.json(result)
})

app.listen(port, () => {
  console.log(`Server is runnign on port ${port}`);
});
