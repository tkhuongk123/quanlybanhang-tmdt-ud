import axios from "axios";
import { api } from "./config";

export const thanhToan = async ({ tongTien }) => {
  try {
    const response = await axios.post(`${api}/payment/thanhToan`, {
      tongTien
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

