import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

import styles from "./UpdateAddress.module.css";
import { NotifyError, NotifySuccess } from "../../../components/Toast";
import { capNhatDiaChi } from "../../../../services/TaiKhoanAPI";

// Hàm tính khoảng cách Haversine
function tinhKhoangCachKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Thành phần tìm kiếm địa chỉ (chỉ trong TP.HCM)
function SearchControl({ setPosition, setAddress }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        viewbox: [106.34, 10.35, 107.05, 11.05],
        bounded: 1,
        countrycodes: "VN",
      },
    });

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      marker: { icon: new L.Icon.Default(), draggable: false },
      popupFormat: ({ result }) => result.label,
      maxMarkers: 1,
      retainZoomLevel: false,
      searchBounds: L.latLngBounds(
        L.latLng(10.35, 106.34),
        L.latLng(11.05, 107.05)
      ),
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (e) => {
      const { location } = e;
      setPosition([location.y, location.x]);
      setAddress(location.label);
    });

    return () => map.removeControl(searchControl);
  }, [map, setPosition, setAddress]);

  return null;
}

// Cho phép click trực tiếp trên bản đồ để chọn địa điểm
function MapClickHandler({ setPosition, setAddress }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      // Lấy địa chỉ ngược (reverse geocode)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.display_name) {
            setAddress(data.display_name);
          }
        });
    },
  });
  return null;
}

function UpdateAddress(props) {
  const [form] = Form.useForm();
  const [position, setPosition] = useState([10.762622, 106.660172]); // trung tâm TP.HCM
  const [address, setAddress] = useState(props.diaChi || "");
  const [distance, setDistance] = useState(null);

  // Tọa độ địa chỉ mặc định (273 An Dương Vương, Q5)
  const defaultLat = 10.762622;
  const defaultLon = 106.68224;

  useEffect(() => {
    if (position) {
      const dist = tinhKhoangCachKm(
        defaultLat,
        defaultLon,
        position[0],
        position[1]
      );
      const distRounded = dist.toFixed(2);
      setDistance(distRounded);
    }
  }, [position]);

  const updateAddress = async (values) => {
    const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));
    const diaChiMoi = address || values.diachi;
    const id = nguoidung.id;

    const handleUpdateAddress = await capNhatDiaChi(id, diaChiMoi);
    if (handleUpdateAddress.isUpdated === true) {
      nguoidung.diachi = diaChiMoi;
      sessionStorage.setItem("nguoidung", JSON.stringify(nguoidung));
      sessionStorage.setItem("khoangcach", distance);
      props.setDiaChi(diaChiMoi);
      NotifySuccess("Cập nhật địa chỉ thành công");
      props.setUpdateAddress("");
    } else {
      NotifyError("Cập nhật địa chỉ thất bại");
      props.setUpdateAddress("");
    }
  };

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
        <h2 style={{ marginBottom: "25px", textAlign: "center" }}>
          Cập nhật địa chỉ
        </h2>

        <Form
          form={form}
          onFinish={updateAddress}
          layout="vertical"
          initialValues={{ diachi: props.diaChi }}
        >
          <Form.Item
            label="Địa chỉ"
            name="diachi"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập hoặc chọn địa chỉ trên bản đồ"
            />
          </Form.Item>

          <div style={{ marginBottom: "15px" }}>
            <MapContainer
              center={[10.762622, 106.660172]}
              zoom={13}
              style={{ height: "300px", width: "100%", borderRadius: "8px" }}
              maxBounds={[
                [10.35, 106.34],
                [11.05, 107.05],
              ]}
              maxBoundsViscosity={1.0}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              />
              <SearchControl setPosition={setPosition} setAddress={setAddress} />
              <MapClickHandler setPosition={setPosition} setAddress={setAddress} />
              <Marker position={position}></Marker>
            </MapContainer>
          </div>

          {distance && (
            <p style={{ textAlign: "center", marginBottom: "15px" }}>
              📍 Khoảng cách đến <b>273 An Dương Vương</b>:{" "}
              <span style={{ color: "var(--primary-color)" }}>
                {distance} km
              </span>
            </p>
          )}

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
