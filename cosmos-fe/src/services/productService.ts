import axios from "axios";
import toast from "react-hot-toast";
import { successToastStyles } from "../utils/common";

const productUrl = "http://localhost:3002/customers";

export const createProduct = async(product:any) => {
    try {
        const response = await axios.post(productUrl,product);
        // if(response.status === 200){
        //     return response.data;
        // }
        toast.success("Product created successfully"),{...successToastStyles};
    } catch (error) {
        
    }
}