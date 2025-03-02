import axios from "axios";
import toast from "react-hot-toast";
import { errorToastStyles, successToastStyles } from "../utils/common";

const customerUrl = "http://localhost:3002/customers";
// create customer
export const createCustomer = async(customer:any)=>{
    let result;
    try{
        result = await axios.post(customerUrl,customer);
        toast.success("Customer created successfully",{...successToastStyles});
    }catch(error){
        if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message ?? error.response?.data ?? 'Cannot connect to the server at this time...', {...errorToastStyles});
        }else{
        toast.error("An unexpected error occurred");
        }
    }
    return result;
}

// get customers
export const getCustomers = async()=>{
    let result;
    try{
        result = await axios.get(customerUrl);
    }catch(error){
        console.error(error);
    }
    return result;
}