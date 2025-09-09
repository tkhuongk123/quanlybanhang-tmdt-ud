import { xoa } from "../../../../services/SanPhamAPI";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import "./Xoa.css";

function Xoa(props) {

    function handleCancel() {
        props.setChucNang('')
    }

    const handleOk = async() => {
        const data = await xoa({id: props.sanPham.id});
        if(data.error) {
            NotifyError('Xóa sản phẩm không thành công')
        } else {
            const newDs = [...props.dsSanPham];
            newDs.splice(props.index, 1);
            props.setDsSanPham(newDs)
            NotifySuccess(`Xóa sản phẩm thành công`)
            props.setChucNang('')
        }
        
    }

  return (
    <div className="Xoa" onClick={(e) => {
        if(e.target.className === "Xoa") {
            props.setChucNang('')
        }
    }}>
      <div className="Xoa_content">
        <h2>Thông báo</h2>
        <p>Bạn có chắc chắn muốn xóa '{props.sanPham.ten}'</p>
        <div>
        <button className="Xoa_content-cancel" onClick={handleCancel}>Hủy</button>
        <button className="Xoa_content-ok" onClick={handleOk}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
}

export default Xoa;
