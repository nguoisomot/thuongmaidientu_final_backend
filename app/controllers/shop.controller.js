const e = require("express");
const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;

exports.createShop = (req, res) => {
  // Validate request
  // if (!req.body.ten_shop) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Tutorial
  const shop = new Shop({
    // _id: req.body._id,
    ten_shop: req.body.ten_shop,
    ho_va_ten: req.body.ho_va_ten,
    email: req.body.email,
    sdt: req.body.sdt,
    password: req.body.password,
  });

  // Save Tutorial in the database
  shop
    .save(shop)
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
};
exports.login = async (req, res) => {
  Shop.findOne({ email: req.body.email }).exec(function (err, result) {
    if (!result) {
      return res.status(400).send("Email không tồn tại")

    }
    if (req.body.password === result.password) {
      return res.status(200).send({ data: result });
    }
    return res.status(401).send({
      message: "Mật khẩu không chính xác"
    });
  })
}

exports.add = (req, res) => {
  const reqFiles = [];
  //const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    //reqFiles.push(url + '/public/' + req.files[i].filename)
    reqFiles.push(req.files[i].filename)
  }
  const sanPham = new SanPham({
    id_shop: req.body.id_shop,
    ten_san_pham: req.body.ten_san_pham,
    nganh_hang: req.body.nganh_hang,
    gia: req.body.gia,
    so_luong: req.body.so_luong,
    hinh_anh: reqFiles
  });
  sanPham
    .save(sanPham)
    .then(data => {
      res.send(data);
      console.log(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}
// update SP
exports.updateItem = (req, res) => {
  let id_san_pham = req.body._id;
  let ten_san_pham = req.body.ten_san_pham;
  let nganh_hang = req.body.nganh_hang;
  let gia = req.body.gia;
  let so_luong = req.body.so_luong;
  let id_shop = req.body.id_shop;
  const reqFilesUpdate = [];
  //const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    //reqFiles.push(url + '/public/' + req.files[i].filename)
    reqFilesUpdate.push(req.files[i].filename)
  }
  SanPham.findByIdAndUpdate({ _id:id_san_pham }, { ten_san_pham: ten_san_pham, nganh_hang: nganh_hang,id_shop:id_shop, gia: gia, so_luong: so_luong, hinh_anh: reqFilesUpdate},function(err,result){
    if(err){
      res.send("err")  
    }
    else{
      res.send(result)
    }
  })
}

//get all data
exports.getAllData = (req, res) => {
  SanPham.find({ id_shop: req.body.id_shop }, function (err, result) {
    if (result) {
      console.log(result)
      return res.status(200).send({
        data: result
      })
    } else {
      return res.status(500).send({
        err: "Server is not working"
      })
    }
  })
}

// delete Item SP
exports.deleteItem = (req,res)=>{
  let id_san_pham = req.body.id_san_pham
  SanPham.findOneAndDelete({_id:id_san_pham}, function(err,result){
    if(err){
      res.send("Err delete")
    }else{
      res.send(result)
    }
  })
}