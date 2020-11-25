const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;
const DonHang = db.donHang;
const User = db.user;

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
// get id_shop
exports.getIdShop = async (req,res)=>{
  SanPham.findOne({_id:req.body.id_san_pham},function(err,result){
    if(err){
      return res.status(400).send({
        data: "Không tìm thấy dữ liệu"
      })
    }
    else{
      return res.status(200).send({
        data:result.id_shop
      })
    }
  })
}
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

// update san pham sau khi mua hang
exports.updateSoLuongSanPhamAfterBuy = async (req, res) => {
  // filer by _id of item 
  console.log('okay')
  let filter = {
    _id: req.body.id_san_pham,
  }
  SanPham.findOne(filter).exec(async function (err, result) {
    console.log('okay')

    if (result) {
      let new_so_luong = result.so_luong - req.body.so_luong;
      let update = {
        so_luong: new_so_luong
      }

      let doc = await SanPham.findOneAndUpdate(filter, update, {
        new: true
      })
      res.send(doc)
      return
    }
    if (err) {
      res.send('Error')
    }
  });
  // res.json(doc)
};
// add to cart
exports.addToCart = (req, res) => {
  const gioHang = new GioHang({
    id_user: req.body.id_user,
    id_san_pham: req.body.id_san_pham,
    id_shop:req.body.id_shop,
    so_luong: req.body.so_luong,
    gia:req.body.gia,
    ten_san_pham:req.body.ten_san_pham,
    hinh_anh:req.body.hinh_anh,
  })

  let filterCart = {
    id_user: req.body.id_user,
    id_san_pham: req.body.id_san_pham
  }

  GioHang.findOne(filterCart).exec(async function (err, results) {
    if (results) {
      let new_so_luong = parseInt(results.so_luong) + parseInt(req.body.so_luong);
      console.log(new_so_luong)
      let update = {
        so_luong: new_so_luong
      };
      console.log(results.update)
      let doc = await GioHang.findOneAndUpdate(filterCart, update, {
        new: true
      });
      res.status(200).send(doc)
    } else {
      gioHang.save(gioHang).then(data => {
        res.status(200).send(data)
      }).catch(err => {
        res.status(500).send(err)
      })
    }
    if (err) {
      res.status(500).send(err)
    }
  })
}
// get all items order
exports.getAllItemsOrder = async (req, res) => {
  await DonHang.find({}).populate('id_user').exec(function (err, result) {
    if (err) {
      return res.status(400).send({
        data: err
      })
    } else {
      return res.status(200).send({
        data: result
      })
    }
  })
}