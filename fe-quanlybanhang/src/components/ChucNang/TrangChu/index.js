import "./TrangChu.css";

function TrangChu() {
  return (
    <div className="TrangChu">
      <div className="TrangChu_content">
        <div className="TrangChu_header">
          PURETASTE KITCHEN KÍNH CHÀO QUÝ KHÁCH
        </div>

        <div className="TrangChu_body">
          {/* --- WHY CHOOSE US --- */}
          <section className="why-choose-us">
            <div className="why-header">
              <h2>Tại sao chọn chúng tôi</h2>
              <p>Cam kết mang đến dịch vụ tốt nhất cho khách hàng</p>
            </div>

            <div className="why-cards">
              {/* Card 1 */}
              <div className="why-card">
                <div className="icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.021 6.188h6.508c.969 0 
                      1.371 1.24.588 1.81l-5.267 3.83 2.02 6.188c.3.922-.755 
                      1.688-1.54 1.118L12 17.75l-5.282 3.311c-.785.57-1.84-.196-
                      1.54-1.118l2.02-6.188-5.267-3.83c-.783-.57-.38-1.81.
                      588-1.81h6.508l2.022-6.188z"
                    />
                  </svg>
                </div>
                <h3>Chất lượng cao</h3>
                <p>
                  Sản phẩm được tuyển chọn kỹ lưỡng, đảm bảo chất lượng tốt
                  nhất
                </p>
              </div>

              {/* Card 2 */}
              <div className="why-card">
                <div className="icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    />
                  </svg>
                </div>
                <h3>Bảo hành uy tín</h3>
                <p>Chính sách bảo hành rõ ràng, hỗ trợ khách hàng tận tâm</p>
              </div>

              {/* Card 3 */}
              <div className="why-card">
                <div className="icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17a2 2 0 100 4 2 2 0 000-4zm6 
                      0a2 2 0 100 4 2 2 0 000-4zm1-9h2l3 
                      5v6a2 2 0 01-2 2h-1m-14 
                      0a2 2 0 01-2-2V6a2 2 0 
                      012-2h11v12H6z"
                    />
                  </svg>
                </div>
                <h3>Giao hàng nhanh</h3>
                <p>Vận chuyển toàn quốc, giao hàng nhanh chóng và an toàn</p>
              </div>
            </div>
          </section>

          {/* --- ABOUT US --- */}
          <section className="about-us">
            <div className="about-container">
              <div className="about-text">
                <h2>Về thương hiệu PureTaste Kitchen</h2>
                <p>
                  Chúng tôi tự hào là đơn vị cung cấp các sản phẩm chất lượng
                  cao, được tuyển chọn kỹ lưỡng từ các nhà sản xuất uy tín. Với
                  phương châm "Chất lượng là danh dự", chúng tôi cam kết mang
                  đến cho khách hàng những trải nghiệm ăn uống tuyệt vời nhất.
                </p>
                <p>
                  Đội ngũ của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ khách
                  hàng 24/7, đảm bảo bạn có được sản phẩm phù hợp nhất với nhu
                  cầu của mình.
                </p>
                <a href="/chonmon" className="btn-discover">
                  Khám phá ngay
                </a>
              </div>

              <div className="about-image">
                <img
                  src="https://i.postimg.cc/tCM0jr4r/ramadan-celebration-with-delicious-food.jpg"
                  alt="About us"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TrangChu;
