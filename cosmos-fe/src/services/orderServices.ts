import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { errorToastStyles, successToastStyles } from "../utils/common";

const ordersUrl = "http://localhost:3000/orders";
export const createOrder = async (order: any) => {
  let result;
  try {
    result = await axios.post(ordersUrl, order);
    toast.success("Order created successfully", {...successToastStyles});
  } catch (error) {
    console.error(error);
    console.log(error);
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data.message ?? error.response?.data, {...errorToastStyles});
    } else {
      toast.error("An unexpected error occurred");
    }
  }
  return result;
};

export const getOrders = async () => {
  let result;
  try {
    result = await axios.get(ordersUrl);
  } catch (error) {
    console.error(error);
  }
  return result;
};
