import { useEffect, useState } from "react";
import "./ChonSoLuong.css";
import formatPrice from "../../../../utils/formatPrice";
import { NotifySuccess } from "../../../components/Toast";
import { Star, ThumbsUp } from "lucide-react";
import { layDsDanhGiaChoSanPham } from "../../../../services/DanhGiaAPI";
import { tongDonHangTheoSanPham } from "../../../../services/SanPhamAPI";

function ChonSoLuong(props) {
  const [soLuong, setSoLuong] = useState(1);
  const [paidProducts, setPaidProducts] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const avatarList = ["👨", "👩", "👨‍💻", "👩‍💻", "👨‍⚕️", "👨‍🎓"];
  const nguoidung = JSON.parse(sessionStorage.getItem("nguoidung"));

  useEffect(() => {
    (async () => {
      const data = await layDsDanhGiaChoSanPham({idsanpham: props.sanPham.id});
      const ds = data.danhGia;
      const dataTongDonHangTheoSanPham = await tongDonHangTheoSanPham({idsanpham: props.sanPham.id});
      setPaidProducts(dataTongDonHangTheoSanPham.sodonhang || 0);

      if (ds && ds.length > 0) {
        const grouped = Object.values(
          ds.reduce((acc, item) => {
            // tạo "key" duy nhất cho mỗi đánh giá (1 người + 1 tiêu đề + 1 nội dung)
            const key = `${item.idmanguoidung}_${item.tieude}_${item.noidung}`;

            if (!acc[key]) {
              acc[key] = {
                idmanguoidung: item.idmanguoidung,
                tennguoidung: item.tennguoidung,
                tieude: item.tieude,
                noidung: item.noidung,
                diemdanhgia: item.diemdanhgia,
                ngay: item.ngay,
                idsanpham_danhgia: item.idsanpham_danhgia,
                tensanpham_danhgia: item.tensanpham_danhgia,
                sanPhamCungDonHang: [],
              };
            }

            // nếu có sản phẩm cùng đơn hàng thì thêm vào mảng
            if (item.idsanpham_cungdonhang && item.tensanpham_cungdonhang) {
              acc[key].sanPhamCungDonHang.push({
                id: item.idsanpham_cungdonhang,
                ten: item.tensanpham_cungdonhang,
              });
            }

            return acc;
          }, {})
        );

        setReviews(grouped);
      } else {
        setReviews([]);
      }
    })();
  }, [props.sanPham]);

  function themVaoGioHang() {
    const gioHang = JSON.parse(localStorage.getItem("giohang"));
    if (!gioHang || gioHang.lenght === 0) {
      const gioHang = [
        {
          id: props.sanPham.id,
          soluong: soLuong,
        },
      ];
      localStorage.setItem("giohang", JSON.stringify(gioHang));
    } else {
      for (let x of gioHang) {
        if (x.id === props.sanPham.id) {
          x.soluong += soLuong;
          localStorage.setItem("giohang", JSON.stringify(gioHang));
          NotifySuccess(`Đã thêm "${props.sanPham.ten}" vào giỏ hàng`);
          return;
        }
      }
      gioHang.push({
        id: props.sanPham.id,
        soluong: soLuong,
      });
      localStorage.setItem("giohang", JSON.stringify(gioHang));
      props.setDisplay("none");
    }
    NotifySuccess(`Đã thêm "${props.sanPham.ten}" vào giỏ hàng`);
  }

  const rating = reviews.length > 0
                  ? parseFloat((reviews.reduce((sum, r) => sum + r.diemdanhgia, 0) / reviews.length).toFixed(1))
                  : 0;

  // Lọc theo số sao
  const filteredReviews = filterRating ? reviews.filter((r) => r.diemdanhgia === filterRating) : reviews


  // Phân bố đánh giá
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
  const count = reviews.filter((r) => r.diemdanhgia === star).length;
  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

  return { star, count, percentage };
});

  // Định dạng ngày
  const formatDate = (dateString) => {
    const datePart = dateString.split(" - ")[1];
    const date = new Date(datePart);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div
      className="ChonSoLuong"
      style={{ display: props.display }}
      onClick={(e) => {
        if (e.target.className === "ChonSoLuong") {
          props.setDisplay("none");
          setSoLuong(1);
        }
      }}
    >
      <div className="ChonSoLuong_content">
        <div className="ChonSoLuong_content-header">
          <button
            className="back-btn"
            onClick={(e) => {
              props.setDisplay("none");
              setSoLuong(1);
            }}
          >
            ← Quay lại
          </button>
        </div>
        <div className="ChonSoLuong_content-body">
          <div className="detail-img">
            <img
              className="detail-img-large"
              src={`${process.env.PUBLIC_URL}/assets/hinhSanPham/${props.sanPham.id}.jpg`}
              alt="sanpham"
            />
          </div>
          <div className="detail-info">
            <h1 className="name">
              <span>{props.sanPham.ten}</span>
            </h1>

            <div className="detail-rating">
              <div className="rating-stars">
                <div className="rating-value">{rating}</div>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(rating) ? "star-filled" : "star-empty"
                    }
                  />
                ))}
              </div>

              <p className="rating-count">({reviews.length} đánh giá)</p>
              <p className="paid-products">Đã bán: {paidProducts}</p>
            </div>
            <div className="detail-price">
              <span>{formatPrice(props.sanPham.dongia)}</span>
            </div>

            <p className="detail-description">{props.sanPham.mota}</p>

            <div className="detail-quantity-selector">
              <label for="quantity">Số lượng:</label>
              <div className="quantity-controls">
                <button
                  className="decreaseBtn"
                  onClick={() => {
                    if (soLuong > 1) {
                      setSoLuong(soLuong - 1);
                    }
                  }}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={soLuong}
                  min="1"
                  max="50"
                  readonly
                />
                <button
                  className="increaseBtn"
                  onClick={() => {
                    if (soLuong < 20) {
                      setSoLuong(soLuong + 1);
                    }
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>

            <button
              className="detail-add"
              onClick={() => {
                themVaoGioHang();
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {formatPrice(props.sanPham.dongia * soLuong)}
            </button>
          </div>
        </div>
        <div className="review-container">
          {/* Header */}
          <div className="review-header">
            <h2>Đánh Giá Khách Hàng</h2>

            <div className="review-summary">
              {/* Overall Rating */}
              <div className="overall-rating">
                <div>
                  <div className="rating-value">{rating}</div>
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(rating) ? "star-filled" : "star-empty"
                        }
                      />
                    ))}
                  </div>
                  <p className="rating-count">({reviews.length} đánh giá)</p>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="rating-distribution">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="rating-bar">
                    <div className="rating-bar-label">
                      <span>{star}</span>
                      <Star size={14} className="star-filled" />
                    </div>
                    <div className="rating-bar-track">
                      <div
                        className="rating-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="rating-bar-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="review-filters">
            <div className="filter-buttons">
              <span className="filter-label">Lọc theo:</span>
              <button
                onClick={() => setFilterRating(null)}
                className={`filter-button ${
                  filterRating === null ? "active" : ""
                }`}
              >
                Tất cả ({reviews.length})
              </button>

              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(
                  (r) => r.diemdanhgia === star
                ).length;
                if (count === 0) return null;
                return (
                  <button
                    key={star}
                    onClick={() => setFilterRating(star)}
                    className={`filter-button ${
                      filterRating === star ? "active" : ""
                    }`}
                  >
                    {star} <Star size={16} className="star-filled" />({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="review-list">
            {filteredReviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-content">
                  <div className="review-avatar">{avatarList[index]}</div>

                  <div className="review-body">
                    <div className="review-header-line">
                      <div>
                        {review.idmanguoidung === nguoidung.id ? (
                          <h4>{review.tennguoidung} (Bạn)</h4>
                        ) : (
                          <h4>{review.tennguoidung}</h4>
                        )}
                        <p>{formatDate(review.ngay)}</p>
                      </div>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < review.diemdanhgia
                                ? "star-filled"
                                : "star-empty"
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <h5>{review.tieude}</h5>

                    <p
                      className={`review-text ${
                        expandedReview === review.index ? "expanded" : ""
                      }`}
                    >
                      {review.noidung}
                    </p>

                    {review.noidung.length > 150 && (
                      <button
                        onClick={() =>
                          setExpandedReview(
                            expandedReview === review.index
                              ? null
                              : review.index
                          )
                        }
                        className="toggle-button"
                      >
                        {expandedReview === review.index
                          ? "Thu gọn"
                          : "Xem thêm"}
                      </button>
                    )}
                    {review.sanPhamCungDonHang.length > 0 && (
                      <div className="review-also-likes">
                        <span className="title">Cũng được thích: </span>
                          {review.sanPhamCungDonHang.map((item, index) => (
                            <span
                              key={item.id || index}
                              className="product-name"
                            >
                              {item.ten}
                              {index < review.sanPhamCungDonHang.length - 1 &&
                                ", "}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChonSoLuong;
