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
const Model = {
  Shop: Shop,
  SanPham: SanPham
}
module.exports = Model