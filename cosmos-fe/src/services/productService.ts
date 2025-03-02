import axios from "axios";
import toast from "react-hot-toast";
import { errorToastStyles, successToastStyles } from "../utils/common";

const productUrl = "http://localhost:3001/inventory";

export const createProduct = async(product:any) => {
    try {
        const response = await axios.post(productUrl,product);
        // if(response.status === 200){
        //     return response.data;
        // }
        toast.success("Product created successfully"),{...successToastStyles};
    } catch (error) {
        if(axios.isAxiosError(error)){
            toast.error(error.response?.data.message ?? error.response?.data ?? 'Cannot connect to the server at this time...',{...errorToastStyles});
        }else{

            toast.error(error.message),{...errorToastStyles};
        }
    }
}