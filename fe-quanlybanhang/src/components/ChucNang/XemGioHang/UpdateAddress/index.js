import formatPrice from "../../../../utils/formatPrice";
import styles from "./UpdateAddress.module.css";

import { Form, Input, Button } from "antd";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import { capNhatDiaChi } from "../../../../services/TaiKhoanAPI";
import { LoginAPI } from "../../../../services/TaiKhoanAPI";



function UpdateAddress(props) {
  const [form] = Form.useForm();

  const updateAddress = async (values) => {
    const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
    const diaChi = values.diachi;
    const id = nguoidung.id;
    const handleUpdateAddress = await capNhatDiaChi(id, diaChi);
    if(handleUpdateAddress.isUpdated == true)
    {
      
      nguoidung.diachi = diaChi;
      sessionStorage.setItem('nguoidung', JSON.stringify(nguoidung));
      props.setDiaChi(diaChi);
      console.log("diachi: ", diaChi)
      NotifySuccess("Cập nhật địa chỉ thành công");
      props.setUpdateAddress("");
    }
    else
    {
      NotifyError("Cập nhật địa chỉ thất bại");
      props.setUpdateAddress("");
    }

  }

  return (
    <div
      className={styles.UpdateAddress}
      onClick={(e) => {
        if (e.target.className === styles.UpdateAddress) {
          props.setUpdateAddress("");
        }
      }}
    >
      <div className={styles.UpdateAddress_content}>
        <h2 style={{ marginBottom: '25px', textAlign: 'center'}}>Cập nhật địa chỉ</h2>
        <Form
          onFinish={(values) => {
            updateAddress(values)
          }}
          layout="vertical"
        >
          <Form.Item
            label="Địa chỉ"
            name="diachi"
            initialValue={props.diaChi}
            rules={[
              { required: true, message: " Vui lòng nhập Địa chỉ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                marginTop: "10px",
                backgroundColor: "var(--primary-color)",
              }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>

      </div>
        
    </div>
  );
}

export default UpdateAddress;
