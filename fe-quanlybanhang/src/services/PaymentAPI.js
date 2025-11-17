import axios from "axios";
import { api } from "./config";

export const thanhToan = async ({ tongTien, tienShip }) => {
  try {
    const response = await axios.post(`${api}/payment/thanhToan`, {
      tongTien,
      tienShip
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

