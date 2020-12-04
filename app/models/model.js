const { ObjectID, ObjectId } = require("mongodb");
// Phần model của User
User = mongoose => {
  var User = new mongoose.Schema({
    email: { type: String,unique:true },
    hoVaTen: { type: String },
    soDienThoai: { type: String },
    password: { type: String },
    diaChi: { type: String }
  }, {
    collection: 'User'
  });
  const UserModal = mongoose.model('User', User);
  return UserModal;
}


SanPhamMuaSau = mongoose => {
  var SanPhamMuaSau = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }  ,
    soLuong:{type:Number, default:1}
  }, {
    collection: 'SanPhamMuaSau'
  });
  const SanPhamMuaSauModel = mongoose.model('SanPhamMuaSau', SanPhamMuaSau);
  return SanPhamMuaSauModel;
}

SanPhamYeuThich = mongoose => {
  var SanPhamYeuThich = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham',require:true }
  }, {
    collection: 'SanPhamYeuThich'
  });
  const SanPhamYeuThichModel = mongoose.model('SanPhamYeuThich', SanPhamYeuThich);
  return SanPhamYeuThichModel;
}
GioHang = mongoose => {
  var GioHang = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' } , soLuong: { type: Number } }],
  }, {
    collection: 'GioHang'
  });
  const GioHangModel = mongoose.model('GioHang', GioHang);
  return GioHangModel;
}

HoaDonUser = mongoose => {
  var HoaDonUser = new mongoose.Schema({
    ngayMuaHang: { type: Date, default: Date.now }
  }, {
    collection: 'HoaDonUser'
  });
  const HoaDonUserModel = mongoose.model('HoaDonUser', HoaDonUser);
  return HoaDonUserModel;
}
HoaDonChiTietUser = mongoose => {
  var HoaDonChiTietUser = new mongoose.Schema({
    idHoaDon: { type: mongoose.Schema.Types.ObjectId, ref: 'HoaDonUser' },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sanPham: [{ idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham', soLuong: { type: Number } } }],
    trangThai:{type:String},
  }, {
    collection: 'HoaDonChiTietUser'
  });
  const HoaDonChiTietUserModel = mongoose.model('HoaDonChiTietUser', HoaDonChiTietUser);
  return HoaDonChiTietUserModel;
}

// Phần model của Shop
Shop = mongoose => {
  var Shop = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hoVaTen: { type: String, required: true },
    soDienThoai: { type: String, required: true },
    tenCuaHang: { type: String, required: true }
  },
    {
      collection: 'Shop'
    });
  const ShopModel = mongoose.model('Shop', Shop);

  return ShopModel;
}

SanPham = mongoose => {
  var SanPham = new mongoose.Schema({
    idShop: { type: mongoose.Schema.Types.ObjectId,  ref: 'Shop' },
    tenSanPham: { type: String },
    nganhHang: { type: String },
    gia: { type: Number },
    soLuong: { type: Number },
    hinh_anh: { type: Array }
  }, {
    collection: 'SanPham'
  });
  const SanPhamModel = mongoose.model('SanPham', SanPham);
  return SanPhamModel;
}

DonHang = mongoose => {
  var DonHang = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPhamShop' },
    soLuong: { type: Number },
    ngayMuaHang: { type: Date, default: Date.now }
  }, {
    collection: 'DonHang'
  });
  const DonHangModel = mongoose.model('DonHang', DonHang);
  return DonHangModel;
}
HoaDonShop = mongoose => {
  var HoaDonShop = new mongoose.Schema({
    ngayMuaHang: { type: Date, default: Date.now }
  }, {
    collection: 'HoaDonShop'
  });
  const HoaDonShopModel = mongoose.model('HoaDonShop', HoaDonShop);
  return HoaDonShopModel;
}
HoaDonChiTietShop = mongoose => {
  var HoaDonChiTietShop = new mongoose.Schema({
    idHoaDon: { type: mongoose.Schema.Types.ObjectId, ref: 'HoaDonShop' },
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'HoaDonChiTietShop' },
    soLuong: { type: Number },
    ngayMuaHang: { type: Date, default: Date.now }
  }, {
    collection: 'HoaDonChiTietShop'
  });
  const HoaDonChiTietShopModel = mongoose.model('HoaDonChiTietShop', HoaDonChiTietShop);
  return HoaDonChiTietShopModel;
}

const Model = {
  // Shop: Shop,
  // SanPham: SanPham,
  // User: User,
  // GioHang: GioHang,
  // DonHang: DonHang
  // user
  User:User,
  SanPhamMuaSau: SanPhamMuaSau,
  SanPhamYeuThich: SanPhamYeuThich,
  GioHang: GioHang,
  HoaDonUser: HoaDonUser,
  HoaDonChiTietUser: HoaDonChiTietUser,
  // shop
  Shop : Shop,
  SanPham: SanPham,
  DonHang: DonHang,
  HoaDonShop: HoaDonShop,
  HoaDonChiTietShop: HoaDonChiTietShop,
}
module.exports = Model