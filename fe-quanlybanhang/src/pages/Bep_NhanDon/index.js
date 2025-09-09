import NhanDon from "../../components/ChucNang/NhanDon"

function Bep_NhanDon() {
    const nguoidung = JSON.parse(sessionStorage.getItem('nguoidung'))

    return (
        <main className="Bep_NhanDon">
            <NhanDon nguoidung={nguoidung} option='20'/>
        </main>
    )
}

export default Bep_NhanDon
