import { useState, useEffect } from 'react';
import { Form, Button, Input, Select, Upload } from "antd";
import styles from "./Sua.module.css";
import { sua } from "../../../../services/SanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';
import { api } from '../../../../services/config';

const { Option } = Select;

function Sua(props) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(props.sanPham.image || null);



  const SuaSanPham = async (values) => {
    if(values.image.file)
    {
      const uploadImage = await uploadFile(values.image.file);
      console.log("Like");
      if(!uploadImage)
      {
        return;
      }
    }
    else
    {
      values.image = props.sanPham.image;
    }
    values.id = props.sanPham.id;
    const data = await sua(values);
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
      NotifySuccess("Sửa sản phẩm thành công");
      const newDs = [...props.dsSanPham]
      newDs[props.index].idloaisanpham = values.idloaisanpham;
      newDs[props.index].ten = values.ten;
      newDs[props.index].dongia = values.dongia;
      newDs[props.index].mota = values.mota;
      props.setDsSanPham(newDs);
      props.setChucNang('');
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
      className={styles.Sua}
      onClick={(e) => {
        if (e.target.className === styles.Sua) {
          props.setChucNang("");
        }
      }}
    >
      <div className={styles.Sua_content}>
        <Form
          onFinish={(values) => {
            SuaSanPham(values);
          }}
          layout="vertical"
          initialValues={{
            ten: props.sanPham.ten,
            dongia: props.sanPham.dongia,
            idloaisanpham: props.sanPham.idloaisanpham,
            mota: props.sanPham.mota
          }}
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
            label="Hình ảnh"
            name="image"
          >
            <Upload 
              className={styles.imgEdit}
              beforeUpload={handleImageUpload}
              showUploadList={false}
            >         
              {
                <img 
                    src={
                          imageUrl?.startsWith("blob:")
                          ? imageUrl 
                          : imageUrl
                            ? `${api}/public/uploads/ProductImages/${imageUrl}`
                            : `${process.env.PUBLIC_URL}/assets/images/mb.png`
                        }
                    // src={imageUrl || `${process.env.PUBLIC_URL}/assets/images/mb.png`}
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
            label="Loại sản phẩm"
            name="idloaisanpham"
            rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}
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
            label="Mô tả"
            name="mota"
          >
            <TextArea rows={4} placeholder="Nhập nội dung tại đây..." />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", marginTop: "10px", backgroundColor: "var(--primary-color)" }}
            >
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Sua;
