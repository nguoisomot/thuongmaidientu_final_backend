const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const model = require("./shop.model");
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.shop = require("./shop.model")(mongoose);
db.shop = model.Shop(mongoose);
db.sanPham = model.SanPham(mongoose);

module.exports = db;
