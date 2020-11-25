const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const model = require("./model");
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.shop = model.Shop(mongoose);
db.sanPham = model.SanPham(mongoose);
db.user = model.User(mongoose);
db.gioHang = model.GioHang(mongoose);
db.donHang = model.DonHang(mongoose);

module.exports = db;
