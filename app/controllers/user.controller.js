const { donHang } = require("../models");
const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;
const User = db.user;
const DonHang = db.donHang;

exports.registerUser = (req, res) => {

  const user = new User({
    // _id: req.body._id,
    ho_va_ten: req.body.ho_va_ten,
    email: req.body.email,
    sdt: req.body.sdt,
    password: req.body.password,
    ngay_sinh: req.body.ngay_sinh,
    dia_chi: req.body.dia_chi
  });

  user
    .save(user)
    .then(data => {
      res.status(200).send({
        data: data
      });
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}

exports.login = async (req, res) => {
  User.findOne({
    email: req.body.email, password: req.body.password
  }).exec(function (err, result) {
    if (err) {
      return res.status(400).send({
        data: "Email hoặc mật khẩu không chính xác"
      })
    }
    else if (result) {
      return res.status(200).send({ data: result });
    }
    else {
      return res.status(400).send({
        data: "Email hoặc mật khẩu không chính xác"
      })
    }
  })
}
// get data items theo nganh_hang
exports.getItemsNganhHang = async (req, res) => {
  SanPham.find({ nganh_hang: req.body.nganh_hang }).exec(function (err, result) {
    if (err) {
      return res.status(400).send({
        data: "Không tải được dữ liệu"
      })
    }
    if (result) {
      return res.status(200).send({
        data: result
      })
    }
  })
}
// get item chi tiet
exports.getItemChiTiet = async (req, res) => {
  SanPham.findOne({ _id: req.body.idSanPham }).exec(function (err, result) {
    if (err) {
      return res.status(400).send({
        data: "Không tìm thấy trang"
      })
    }
    else {
      return res.status(200).send({
        data: result
      })
    }
  })
}
// get items in cart

exports.getItemCart = async (req, res) => {
  await GioHang.find({ id_user: req.body.id_user }).exec(function (err, result) {
    if (err) {
      return res.status(400).send({
        data: "Lỗi tải dữ liệu"
      })
    } else {
      return res.status(200).send({
        data: result
      })
    }
  })
}
// thanh toan, delete items gio hang
exports.thanhToan = async (req, res) => {
  await GioHang.find({ id_user: req.body.id_user }, function (err, result) {
    if (err) {
      return res.status(400).send({
        data: "Không tìm thấy sản phẩm"
      })
    } else {
      result.map((item, index) => {
        const donHang = new DonHang({
          id_user: item.id_user,
          id_san_pham: item.id_san_pham,
          id_shop: item.id_shop,
          so_luong: item.so_luong,
          gia: item.gia,
          ten_san_pham: item.ten_san_pham,
          hinh_anh: item.hinh_anh,
        });
        donHang.save(donHang
        ).then(data => {
          //  res.send(data);
          console.log(data)
        })
          .catch(err => {
            //  res.status(500).send({
            //    message:
            //      err.message || "Some error occurred while creating the Tutorial."
            //  });
          });
      })

      // return res.status(200).send({
      //   data: result
      // })
    }
  })
  await GioHang.deleteMany({ id_user: req.body.id_user }, function (err, result) {
    if (err) {
      return res.status(400).send({
        data: "Không tìm thấy sản phẩm"
      })
    } else {
      return res.status(200).send({
        data: result
      })
    }
  })
}
// thanh toan, save items dat mua

//get info user
exports.getInfoUser = async (req, res) => {
  await User.findOne({ _id: req.body.id_user }, function (err, result) {
    if (err) {
      return res.status(400).send("Lỗi")
    } else {
      return res.status(200).send({
        data: result
      })
    }
  })
}
// getAllDonHang
exports.getAllDonHang = async (req,res)=>{
  await DonHang.find({id_user:req.body.id_user}).populate('id_user').exec(function(err,result){
    if(err){
      return res.status(400).send({
        data: err
      })
    }else{
      return res.status(200).send({
        data: result
      })
    }
  })
}