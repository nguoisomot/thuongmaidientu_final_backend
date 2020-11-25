const { ObjectID, ObjectId } = require("mongodb");

Shop = mongoose => {
  var Shop = new mongoose.Schema({
    ten_shop: { type: String },
    ho_va_ten: { type: String },
    sdt: { type: String },
    email: { type: String },
    password: { type: String }
  },
    {
      collection: 'Shop'
    });
  const ShopModel = mongoose.model('Shop', Shop);

  return ShopModel;
}

SanPham = mongoose => {
  var SanPham = new mongoose.Schema({
    id_shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    ten_san_pham: { type: String },
    nganh_hang:{type: String},
    gia: { type: Number },
    so_luong: { type: Number },
    hinh_anh:{type:Array}
  }, {
    collection: 'SanPhamShop'
  });
  const SanPhamModel = mongoose.model('SanPhamShop', SanPham);
  return SanPhamModel;
}

User = mongoose => {
  var User = new mongoose.Schema({
    ho_va_ten: { type: {String} },
    sdt: { type: String },
    email: { type: String },
    password:{type:String},
    ngay_sinh: { type: String },
    dia_chi: { type: String },
  }, {
    collection: 'User'
  });
  const UserModal = mongoose.model('User', User);
  return UserModal;
}
// cart

GioHang = mongoose =>{
  var GioHang = new mongoose.Schema({
    id_user:{type:ObjectId},
    id_san_pham:{type:ObjectId},
    id_shop: { type: ObjectId },
    so_luong:{type:Number},
    gia:{type:Number},
    ten_san_pham:{type:String},
    hinh_anh:{type:String}
  },{
    collection:'GioHang'
  });
  const SanPhamModel = mongoose.model('GioHang', GioHang);
  return SanPhamModel;
}
DonHang = mongoose =>{
  var DonHang = new mongoose.Schema({
    id_user:{type:ObjectId, ref:'User'},
    id_san_pham:{type:ObjectId},
    id_shop:{type:ObjectId},
    so_luong:{type:Number},
    gia:{type:Number},
    ten_san_pham:{type:String},
    hinh_anh:{type:String}
  },{
    collection:'DonHang'
  });
  const DonHangModel = mongoose.model('DonHang', DonHang);
  return DonHangModel;
}
const Model = {
  Shop: Shop,
  SanPham: SanPham,
  User:User,
  GioHang:GioHang,
  DonHang:DonHang
}
module.exports = Model