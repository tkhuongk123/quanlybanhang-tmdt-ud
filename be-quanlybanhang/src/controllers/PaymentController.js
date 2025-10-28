const db = require("../config/db");
const axios = require("axios");
const taoDonHang = require("../controllers/DonHangController");
const taoChiTiet = require("../controllers/ChiTietDonHangController");

class PaymentController {
    async thanhToan(req, res, next) {
        const { tongTien } = req.body;
        var accessKey = 'F8BBA842ECF85';
        var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
        var orderInfo = 'pay with MoMo';
        var partnerCode = 'MOMO';
        var redirectUrl = 'http://localhost:3000/momo/callback';
        var ipnUrl = 'http://localhost:8000/payment/momoIPN';
        var requestType = "payWithMethod";
        var amount = String(tongTien);
        var orderId = partnerCode + new Date().getTime();
        var requestId = orderId;
        const extraData = '';
        var orderGroupId = '';
        var autoCapture = true;
        var lang = 'vi';

        // tạo chữ ký
        var rawSignature =
            "accessKey=" + accessKey +
            "&amount=" + amount +
            "&extraData=" + extraData +
            "&ipnUrl=" + ipnUrl +
            "&orderId=" + orderId +
            "&orderInfo=" + orderInfo +
            "&partnerCode=" + partnerCode +
            "&redirectUrl=" + redirectUrl +
            "&requestId=" + requestId +
            "&requestType=" + requestType;

        const crypto = require('crypto');
        var signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature
        });

        // option for axios
        const options = {
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/create",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            },
            data: requestBody
        }

        
        try {
            const result = await axios(options);
            return res.status(200).json({
                message: "Sửa loại sản phẩm thành công",
                shortLink: result.data.shortLink
            })
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: "Server Error"
            })
        }
    }

    // async momoIPN(req, res, next) {
    //     try {
    //         const accessKey = 'F8BBA842ECF85';
    //         const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    //         const ipnData = req.body;

    //         const {
    //             partnerCode,
    //             orderId,
    //             requestId,
    //             amount,
    //             orderInfo,
    //             orderType,
    //             transId,
    //             resultCode,
    //             message,
    //             payType,
    //             responseTime,
    //             extraData,
    //             signature
    //         } = ipnData;

    //         // Tạo raw signature để xác thực
    //         const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&transId=${transId}`;
    //         const expectedSignature = crypto.createHmac('sha256', secretKey)
    //                                         .update(rawSignature)
    //                                         .digest('hex');

    //         if (signature !== expectedSignature) {
    //             console.log("Signature IPN không hợp lệ!");
    //             return res.status(400).json({ message: "Invalid signature" });
    //         }

    //         if (Number(resultCode) === 0) {
    //             // thanh toán thành công → tạo đơn hàng
    //             let userData = {};
    //             if (extraData) {
    //                 userData = JSON.parse(extraData); 
    //             }
    //             const donHang = await taoDonHang({
    //                 idmanguoidung: userData.idmanguoidung, 
    //                 trangthai: userData.trangthai, 
    //                 thanhtoan: userData.thanhtoan, 
    //                 tongtien: userData.tongtien, 
    //                 tongsanpham: userData.tongsanpham, 
    //                 ngay: userData.ngay, 
    //                 diachi: userData.diachi, 
    //                 ghichu: userData.ghichu
    //             });

    //             for (let x of userData.dsSanPham) {
    //                 await taoChiTiet({ iddonhang: donHang.id, idsanpham: x.id, soluong: x.soluong });
    //             }
    //             console.log("Thanh toán thành công với orderId:", orderId);

    //         } 
    //         else 
    //         {
    //             console.log("Thanh toán thất bại với orderId:", orderId);
    //             // xử lý khi thất bại
    //         }

    //         // MoMo yêu cầu trả về message "OK"
    //         return res.json({ message: "OK" });

    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: "Server error" });
    //     }
    // }
    
}

module.exports = new PaymentController()
