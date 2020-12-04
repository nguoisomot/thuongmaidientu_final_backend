const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const model = require("./model");
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// phần user
db.user = model.User(mongoose);
db.sanPhamMuaSau = model.SanPhamMuaSau(mongoose);
db.sanPhamYeuThich = model.SanPhamYeuThich(mongoose);
db.gioHang = model.GioHang(mongoose);
db.hoaDonUser = model.HoaDonUser(mongoose);
db.hoaDonChiTietUser = model.HoaDonChiTietUser(mongoose);
// phần shop
db.shop = model.Shop(mongoose);
db.sanPham = model.SanPham(mongoose);
db.donHang = model.DonHang(mongoose);
db.hoaDonShop = model.HoaDonShop(mongoose);
db.hoaDonChiTietShop = model.HoaDonChiTietShop(mongoose);

module.exports = db;
