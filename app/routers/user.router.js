const user = require("../controllers/user.controller");
module.exports = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post("/registerUser", user.registerUser);
  // app.post("/loginUser", user.login);
  // // app.post("/getItemsNganhHang", user.getItemsNganhHang);
  // // app.post("/getItemChiTiet", user.getItemChiTiet);
  // // app.post("/getItemCart", user.getItemCart)
  // // app.post("/thanhToan", user.thanhToan)
  // // app.post("/getInfoUser", user.getInfoUser)
  // // app.post("/getAllDonHang", user.getAllDonHang)
  app.post("/registerUser", user.registerUser)
  app.post("/loginUser", user.loginUser)
  app.post("/themSanPhamVaoGioHang", user.themSanPhamVaoGioHang)
  app.post("/sanPhamYeuThich", user.sanPhamYeuThich)
  app.post("/sanPhamMuaSau", user.sanPhamMuaSau)
  app.post("/thanhToan", user.thanhToan)
  app.post("/sanPhamTrongGioHang", user.sanPhamTrongGioHang)
  app.post("/xoaSanPhamTrongGioHang", user.xoaSanPhamTrongGioHang)
  app.post("/chiTietSanPham", user.chiTietSanPham)
  app.post("/findDonHang", user.findDonHang)
  app.post("/lienKet", user.lienKet)

}