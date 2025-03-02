import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const customerUrl = "http://localhost:3000/orders";
export const createOrder = async (order: any) => {
  let result;
  try {
    result = await axios.post(customerUrl, order);
    toast.success("Order created successfully");
  } catch (error) {
    console.error(error);
    console.log(error)
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message);
    } else {
      toast.error("An unexpected error occurred");
    }
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
