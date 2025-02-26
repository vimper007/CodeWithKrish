## Getting Started

  

1. Clone the repository: **git clone https://github.com/vimper007/CodeWithKrish.git**

2. Navigate to the project directory: **cd CodeWithKrish\node-js-practical\api-server**

3. Install the required dependencies: **npm install**

4. Start the server: **node index.js**

5. The server will be running on `http://localhost:3000`.

## Utility Functions

The `util.js` file exports the following functions:

-  **findMin(num1, num2)**: Returns the minimum of two numbers.

-  **findMax(num1, num2)**: Returns the maximum of two numbers.

-  **findAvg(numbers)**: Calculates and returns the average of an array of numbers.

-  **sortArray(numbers, type)**: Sorts an array of numbers in ascending or descending order based on the specified type.

-  **findValue(values, search)**: Counts the occurrences of a specific value in an array.

  

## API Endpoints

  

The `api-server/index.js` file sets up the following routes:

  

**GET /**: Returns a greeting message.

  

**GET /number/min**: Returns the minimum of two numbers.

Query parameters: `num1`, `num2`

> Ex: /number/min?num1=1&num2=2

  

**GET /number/max**: Returns the maximum of two numbers.

Query parameters: `num1`, `num2`

> Ex: /number/max?num1=1&num2=2

**GET /number/avg**: Returns the average of a list of numbers.

Query parameter: `numbers` (comma-separated list)

> Ex: /number/avg?numbers=1,2,3,4,5,6,6.....n

**GET /number/sort**: Sorts a list of numbers.

Query parameters: `numbers` (comma-separated list), `type` (asc|desc)

> Ex: /number/sort?numbers=1,2,3,4,5,6.....n&type=asc
> 
> Ex: /number/sort?numbers=1,2,3,4,5,6.....n&type=dsc

**GET /number/count**: Counts occurrences of a specific value in a list.

Query parameters: `values` (comma-separated list), `search` (value to search for)

> Ex: /number/count?values=1,2,3,4,a,b,c,d,saman,
> kamal.....n&search=saman


  

## License
This project is licensed under the ISC License.


## 💖Like my work?

Additional Information This README file was generated using [StackEdit]([https://stackedit.io/app#](https://stackedit.io/app#)) and [README Generator]([https://readme-gen.vercel.app/app](https://readme-gen.vercel.app/app)).
