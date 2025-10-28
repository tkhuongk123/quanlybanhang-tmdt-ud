import { useState, useEffect } from 'react';
import { Form, Button, Input, Select, Upload } from "antd";
import styles from "./Them.module.css";
import { them } from "../../../../services/SanPhamAPI";
import { api } from "../../../../services/config";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';

const { Option } = Select;

function Them(props) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const themSanPham = async (values) => {
    const uploadImage = await uploadFile(values.image.file);
    if(!uploadImage)
    {
      return;
    }
    const data = await them(values);
    if(data.message)
    {
      console.log(data.message);
    }
    
    if (data.error) 
    {
      NotifyError(data.error);
    } 
    else if (data.inputInvalid) 
    {
      form.setFields([
        {
          name: data.inputInvalid,
          errors: [data.messageInvalid],
        },
      ]);
    } 
    else 
    {
      NotifySuccess("Thêm sản phẩm thành công");
      const newDs = [...props.dsSanPham];
      values.id = data.sanPham;
      newDs.push(values);
      props.setDsSanPham(newDs);
      form.resetFields();
      props.setChucNang("");
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', "ProductImages");
    const res = await axios.post(`${api}/sanpham/uploadImage?folder=ProductImages`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if(!res.data.url)
    {
      NotifyError("Thêm ảnh thất bại");
      return false;
    }
    return true;
  }

  const handleImageUpload = async (file) => {
    try {
        
        const previewUrl = URL.createObjectURL(file);
        if(previewUrl)
        {
            setImageUrl(previewUrl);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        NotifyError("Cập nhật ảnh playlist thất bại");
    }
    return false;
  };

  return (
    <div
      className={styles.Them}
      onClick={(e) => {
        if (e.target.className === styles.Them) {
          props.setChucNang("");
        }
      }}
    >
      <div className={styles.Them_content}>
        <Form
          onFinish={(values) => {
            themSanPham(values);
          }}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="ten"
            rules={[
              { required: true, message: " Vui lòng nhập Tên sản phẩm!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Đơn giá"
            name="dongia"
            rules={[{ required: true, message: " Vui lòng nhập Đơn giá!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loại sản phẩm"
            name="idloaisanpham"
            rules={[{ required: true, message: "Vui chọn Quyền!" }]}
          >
            <Select style={{ width: "100%" }}>
              {props.dsLoaiSanPham.map((item, index) => {
                return (
                  <Option value={item.id}>
                    <p>{item.ten}</p>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              { required: true, message: " Vui lòng thêm hình ảnh!" },
            ]}
          >
            <Upload 
              className={styles.imgEdit}
              beforeUpload={handleImageUpload}
              showUploadList={false}
            >         
              {
                <img 
                    src={imageUrl || `${process.env.PUBLIC_URL}/assets/images/mb.png`}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '5px'
                    }} 
                />
              }
            </Upload>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="mota"
            rules={[
              { required: true, message: " Vui lòng nhập Mô tả!" },
            ]}
          >
            <TextArea rows={4} placeholder="Nhập nội dung tại đây..." />
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
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Them;
