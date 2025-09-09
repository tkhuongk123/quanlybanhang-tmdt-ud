-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 28, 2024 lúc 07:56 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `quanlybanhang`;
USE `quanlybanhang`;

--
-- Cơ sở dữ liệu: `quanlybanhang`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhgia`
--

CREATE TABLE `danhgia` (
  `idmanguoidung` int(11) NOT NULL,
  `noidung` varchar(100) NOT NULL,
  `diemdanhgia` int(11) NOT NULL,
  `ngay` varchar(100) NOT NULL,
  `iddonhang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

CREATE TABLE `donhang` (
  `id` int(11) NOT NULL,
  `idmanguoidung` int(11) NOT NULL,
  `trangthai` varchar(2) NOT NULL,
  `thanhtoan` int(11) NOT NULL,
  `tongtien` int(11) NOT NULL,
  `tongsanpham` int(11) NOT NULL,
  `ngay` varchar(100) NOT NULL,
  `ghichu` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `donhang`
--

INSERT INTO `donhang` (`id`, `idmanguoidung`, `trangthai`, `thanhtoan`, `tongtien`, `tongsanpham`, `ngay`, `ghichu`) VALUES
(6, 1, '11', 1, 483000, 2, '00:06:01 - 07/11/2024', ''),
(7, 1, '30', 1, 1139000, 5, '00:11:39 - 08/11/2024', ''),
(8, 1, '30', 1, 414000, 2, '00:12:11 - 08/11/2024', ''),
(9, 5, '30', 1, 227000, 3, '00:20:39 - 08/11/2024', ''),
(10, 6, '30', 1, 514000, 5, '00:21:01 - 08/11/2024', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `id` int(11) NOT NULL,
  `ten` varchar(100) NOT NULL,
  `mota` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`id`, `ten`, `mota`) VALUES
(1, 'Khai vị', ''),
(2, 'Món chính', ''),
(3, 'Cơm - Mì - Cháo', ''),
(4, 'Đồ uống', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quyen`
--

CREATE TABLE `quyen` (
  `id` int(11) NOT NULL,
  `ten` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `quyen`
--

INSERT INTO `quyen` (`id`, `ten`) VALUES
(0, 'Nhân viên'),
(1, 'Quản lý'),
(2, 'Bếp'),
(3, 'Khách hàng');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `idloaisanpham` int(11) NOT NULL,
  `ten` varchar(100) NOT NULL,
  `dongia` int(11) NOT NULL,
  `mota` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`id`, `idloaisanpham`, `ten`, `dongia`, `mota`) VALUES
(1, 1, 'Salad rau mùa sốt cam', 69000, 'Xà lách carol, xà lách frise, xà lách lô lô tím, xà lách mỡ, xà lách radicchio tím, táo đỏ, táo xanh, cà chua bi, củ cải đường, rau mầm, cà rốt baby, trái olive đen, trái olive xanh.'),
(2, 1, 'Salad rau mùa sốt mác mác', 69000, NULL),
(3, 1, 'Phở cuốn', 89000, 'Nạc vai bò Úc, bánh ướt, húng lủi, húng quế, ngò gai, giá sống, cà chua, hành phi, đậu phộng, nước mắm, đường cát Biên Hòa, giấm nuôi, tỏi lột, mè trắng, bột thịt gà, tiêu đen.'),
(4, 1, 'Salad bò Nam Bộ', 127000, 'Thăn bò, húng quế, ngò gai, rau càng cua, lá cóc, lá quế vị, xà lách lô lô xanh, tắc, khế, cà pháo, hành tím, sả, ớt sừng, mè trắng, lá chanh thái.'),
(5, 1, 'Sụn gà xóc muối Tây Ninh', 137000, 'Sụn gà, muối Tây Ninh, trứng gà, sả, nghệ, lá chanh, ớt sừng, hành phi, tỏi phi, tôm khô, chà bông heo, bột chiên xù.'),
(6, 1, 'Nem lụi nướng mía', 160000, 'Mỡ gáy, thịt nạc mông, giò sống heo, mía cây, màu thực phẩm, chất tạo độ dai thực phẩm, bột nở, bột bắp, tiêu đen, tiêu sọ trắng, sả cây, hành tím, tỏi, mật ong, mắm khô, bột ngũ vị hương, bột ngọt, đường cát.'),
(7, 2, 'Gà cuốn lá dứa', 170000, 'Đùi gà, lá dứa, xà lách lô lô xanh, xà lách lô lô tím, cà chua bi, hành tây tím, đường cát, tiêu sọ trắng, bột bắp, bột chiên giòn, bột năng, dầu mè, tỏi xay, ngò rí, nước tương, dầu ăn.'),
(8, 2, 'Ba rọi chiên mắm ngò', 147000, 'Thịt ba rọi rút sườn Ba Lan, bột chiên giòn, gạo thái, ngò rí, tỏi củ, sả cây, tắc, ớt sừng, dưa leo, ngò rí, ớt hiểm, thơm gọt, húng quế, húng lủi, lô lô xanh, lô lô tím, dầu ăn, đường cát, tương ớt, nước mắm, giấm gạo.'),
(9, 3, 'Cơm chả cua hoàng kim', 76000, 'Mai cua, thịt heo xay, chả cua, thịt cua, trứng gà, trứng vịt muối, gạo ST25, hành tím, bún tàu, nấm mèo, củ sắn, ngò rí, dầu ăn, hành lá, sả, tiêu đen xay, dầu màu điều.'),
(10, 3, 'Cơm đùi gà chiên giòn', 59000, 'Đùi gà góc 4, muối thái, đường cát, bột thịt gà, hạt nêm heo, bột ngọt, hạt điều, dầu ăn, hành tím, hành lá, gừng củ, gạo tài nguyên, mỡ gà, nghệ củ, trứng gà, ngò gai, nghệ củ.'),
(11, 3, 'Cơm sườn nướng', 66000, 'Sườn cốt lết, gạo ST25, sữa tươi (Ướp sườn), baking soda, dầu hào, nước tương, tiêu đen, bột ngọt, hạt nêm, bột ngũ vị hương, tương ớt, đường cát, mật ong, nước màu gạch tôm, rượu vodka, hành tím, tỏi, hành lá, sả.'),
(12, 3, 'Hủ tiếu áp chảo bò', 110000, 'Thăn bò, hủ tiếu mềm, nước hầm xương gà, cà rốt, cải thìa, nấm đông cô, giá sống, hẹ lá, hành lá, dầu ăn, tỏi củ, hành tím, bột năng, dầu hào, nước tương, mạch nha, đường phèn.'),
(13, 3, 'Cơm sườn nướng chả cua hoàng kim', 100000, 'Sườn cốt lết, mai cua, thịt heo xay, chả cua, thịt cua, trứng gà, trứng vịt muối, gạo ST25, sữa tươi (Ướp sườn), baking soda, dầu hào, nước tương, tiêu đen, bột ngọt, hạt nêm, bột ngũ vị hương, tương ớt, đường cát, mật ong, nước màu gạch tôm, rượu vodka, hành tím, bún tàu, nấm mèo, củ sắn, ngò rí, dầu ăn, hành lá, sả, tiêu đen xay, dầu màu điều.'),
(14, 3, 'Mì spaghetti sốt bò bằm', 100000, 'Mì spaghetti, thịt bò xay, ớt hiểm đỏ, hành tây, ngò tây, quế tây, sốt cà chua, lá nguyệt quế, muối, tiêu đen, đường, phô mai parmesan, dầu ô-liu extra virgin, bơ lạt Anchor, tỏi.'),
(15, 3, 'Cơm chiên thịt cua lá cẩm', 90000, 'Gạo Basmati, trứng gà (vỏ trứng cuộn), thịt cua, thanh cua, trứng cá chuồn, giá sống, hành lá, gừng, bắp mỹ, lá cẩm, hạt nêm heo, muối, đường cát, dầu ăn, bột mì, trứng gà, ớt chuông đỏ, ớt sừng xanh, ngò rí.'),
(16, 3, 'Cơm chiên hải sản', 90000, 'Gạo basmati, Trứng gà, tôm, thanh cua, trứng cá chuồn, bắp hạt, cà rốt, đậu Hà Lan, hành lá, ớt sừng, tỏi, nghệ, mỡ gà, bột gạo, dầu hào\r\n\r\n'),
(17, 4, 'Trà lài nhãn', 49000, 'Trà lài luôn là khởi đầu dễ chịu để sáng tạo nên những thức uống thanh nhiệt thú vị. Khi kết hợp cùng long nhãn, trà lài được cân bằng độ chát nhẹ bằng vị ngọt dịu thanh nhã, tạo nên một thức uống giải nhiệt, an thần hiệu quả.'),
(18, 4, 'Trà lài kiwi nha đam', 49000, 'Đúng như tên gọi là một món nước hoàn hảo dành cho phái đẹp giúp đẹp da, giữ dáng và chống lão hóa. Từ các nguyên liệu chọn lọc như: tuyết yến, nhựa đào, long nhãn, nấm đông trùng hạ thảo, táo đỏ, kỷ tử, hạt sen, hạt chia,...được nấu tỉ mỉ cùng đường cỏ ngọt, một loại đường tốt cho sức khỏe công dụng hỗ trợ giảm cân, mang đến vị ngọt thanh mát dễ dàng chinh phục từng thực khách khó tính nhất.'),
(19, 4, 'Trà sữa Oolong', 46000, 'Trà sữa Oolong TASTY là sự hòa quyện của tinh túy giữa trà oolong vùng Bảo Lộc trứ danh và bột sữa thơm béo. Với tỷ lệ trà, sữa và đường phù hợp, mỗi ly trà sữa oolong có vị ngọt thanh dịu nhẹ, dễ dàng làm xiêu lòng mọi tín đồ trà sữa. TASTY Kitchen hy vọng, mỗi ly trà sữa oloong sẽ giúp quý khách tận hưởng vị ngon lan tỏa đến từng giác quan và tiếp thêm năng lượng cho ngày tươi mới.'),
(20, 4, 'Trà sữa masala', 46000, 'Trà sữa Masala là sự kết hợp đầy tinh tế của trà đen có nguồn gốc từ vùng trà nổi tiếng Lâm Hà, Lâm Đồng cùng bột sữa cao cấp và syrup spicy tự nấu từ các loại thảo mộc gia vị. Được dày công nghiên cứu bởi những đội ngũ đầu bếp TASTY Kitchen, Trà sữa Masala được xem như bản giao hưởng mượt mà của vị trà sữa thơm bùi, ngọt dịu lại đậm đà hương thơm thảo mộc thiên nhiên. Hãy chọn trà sữa Masala để có được những trải nghiệm sảng khoái và tươi mới nhất cho hè này. '),
(21, 4, 'Cà phê sữa đá', 35000, 'Cà phê sữa TASTY là sự lựa chọn hoàn hảo cho những ai yêu thích cà phê nhưng lại không thích vị đắng nguyên bản của cà phê đen truyền thống. Hương vị cà phê mang dấu ấn sáng tạo rất Việt Nam. Cái khéo trong sự kết hợp giữa các nguyên liệu cao cấp: cà phê phin, sữa béo và sữa đặc cho ra đời một thức uống tròn vị đắng, ngọt, bùi. Vị ngọt thấm vào đầu lưỡi, vị đắng lắng đọng nơi cuống họng vừa đủ để người thưởng thức tỉnh táo suốt cả ngày dài.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `id` int(11) NOT NULL,
  `tendangnhap` varchar(100) NOT NULL,
  `tennguoidung` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `matkhau` varchar(100) NOT NULL,
  `sodienthoai` varchar(100) NOT NULL,
  `idquyen` int(11) NOT NULL,
  `diemtichluy` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`id`, `tendangnhap`, `tennguoidung`, `email`, `matkhau`, `sodienthoai`, `idquyen`, `diemtichluy`) VALUES
(1, 'nguoidung1', 'Nguyễn Văn A', 'nguyenvana@gmail.com', '123456', '0123456780', 3, 0),
(2, 'nhanvien1', 'Trần Thị B', 'btrna@gmail.com', '123456', '0123456789', 0, 0),
(3, 'quanly1', 'Hồ Bích', 'bich@gmail.com', '123456', '0123456789', 1, 0),
(4, 'bep1', 'Trần Vũ', 'vu@gmail.com', '123456', '0123456789', 2, 0),
(5, 'huynhhieu', 'Huỳnh Công Hiếu', 'nguyenthong244466666@gmail.com', '123456', '0909009009', 3, 0),
(6, 'phatth', 'Trần Hữu Phát', 'phattran@gmail.com', '123456', '09912312123', 3, 0);

--
-- Chỉ mục cho các bảng đã đổ
--


--
-- Chỉ mục cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD KEY `donhang` (`iddonhang`),
  ADD KEY `sanphamdat` (`idsanpham`);

--
-- Chỉ mục cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD KEY `khachhangdanhgia` (`idmanguoidung`),
  ADD KEY `donhangdanhgia` (`iddonhang`);

--
-- Chỉ mục cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `khachhangdat` (`idmanguoidung`);

--
-- Chỉ mục cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `quyen`
--
ALTER TABLE `quyen`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loai` (`idloaisanpham`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `quyen` (`idquyen`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--



--
-- AUTO_INCREMENT cho bảng `donhang`
--
ALTER TABLE `donhang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `quyen`
--
ALTER TABLE `quyen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--


--
-- Các ràng buộc cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `donhang` FOREIGN KEY (`iddonhang`) REFERENCES `donhang` (`id`),
  ADD CONSTRAINT `sanphamdat` FOREIGN KEY (`idsanpham`) REFERENCES `sanpham` (`id`);

--
-- Các ràng buộc cho bảng `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `donhangdanhgia` FOREIGN KEY (`iddonhang`) REFERENCES `donhang` (`id`),
  ADD CONSTRAINT `khachhangdanhgia` FOREIGN KEY (`idmanguoidung`) REFERENCES `taikhoan` (`id`);

--
-- Các ràng buộc cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `khachhangdat` FOREIGN KEY (`idmanguoidung`) REFERENCES `taikhoan` (`id`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `loai` FOREIGN KEY (`idloaisanpham`) REFERENCES `loaisanpham` (`id`);

--
-- Các ràng buộc cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD CONSTRAINT `quyen` FOREIGN KEY (`idquyen`) REFERENCES `quyen` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
