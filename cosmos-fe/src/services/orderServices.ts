import axios from "axios";

const customerUrl = "http://localhost:3000/orders";
export const createOrder = async (order: any) => {
  let result;
  try {
    result = await axios.post(customerUrl, order);
  } catch (error) {
    console.error(error);
  }
  return result;
};

export const getOrders = async () => {
  let result;
  try {
    result = await axios.get(customerUrl);
  } catch (error) {
    console.error(error);
  }
  return result;
};
