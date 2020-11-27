const shop = require("../controllers/shop.controller");
const uploadImage = require('../middleware/uploadImage');
const { user } = require("../models");
module.exports = app => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/register", shop.createShop);
  app.post("/login", shop.login);
  app.post("/getAllData", shop.getAllData);
  app.post("/add", uploadImage.array('hinh_anh',6), shop.add)
  app.post("/updateItem", uploadImage.array('hinh_anh',6), shop.updateItem)
  app.post("/deleteItem", uploadImage.array('hinh_anh',6), shop.deleteItem)

  // client
  app.post("/updateSoLuongSanPhamAfterBuy",  shop.updateSoLuongSanPhamAfterBuy)
  app.post("/addToCart", shop.addToCart)
  app.post("/getAllItemsOrder", shop.getAllItemsOrder)
  app.post("/getIdShop", shop.getIdShop)
  app.post("/thongKeTheoNam", shop.thongKeTheoNam)
  app.post("/thongKeTheoThang", shop.thongKeTheoThang)
  app.post("/thongKeTheoNgay", shop.thongKeTheoNgay)
  app.post("/thongKeTheoQuaCacThang", shop.thongKeTheoQuaCacThang)
  
}