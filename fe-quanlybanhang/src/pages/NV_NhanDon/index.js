import NhanDon from "../../components/ChucNang/NhanDon"

function NV_NhanDon() {
    const nguoidung = JSON.parse(sessionStorage.getItem('nguoidung'))

    return (
        <main className="NV_NhanDon">
            <NhanDon nguoidung={nguoidung} option='10'/>
        </main>
    )
}

export default NV_NhanDon
