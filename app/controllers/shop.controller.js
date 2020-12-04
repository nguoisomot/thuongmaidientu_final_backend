const { ObjectId } = require("mongodb");
const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;
const DonHang = db.donHang;
const User = db.user;

exports.registerShop = (req, res) => {
  const shop = new Shop({
    // _id: req.body._id,
    tenCuaHang: req.body.tenCuaHang,
    hoVaTen: req.body.hoVaTen,
    email: req.body.email,
    soDienThoai: req.body.soDienThoai,
    password: req.body.password,
  });

  // Save Tutorial in the database
  shop
    .save(shop)
    .then(data => {
      res.status(200).json({
        msg: data
      });
      console.log(data)
    })
    .catch(err => {
      res.status(400).json({
        msg: "Email đăng ký đã tồn tại"
          
      });
    });
};

exports.loginShop = async (req, res) => {
  Shop.findOne({ email: req.body.email,password:req.body.password}).exec(function (err, result) {
    if (err) {
      return res.status(400).send("Email hoặc password không chính xác")
    }
    return res.status(200).send({
      message: "Đăng nhập thành công"
    });
  })
}

exports.themSanPham = (req, res) => {
  const reqFiles = [];
  //const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    //reqFiles.push(url + '/public/' + req.files[i].filename)
    reqFiles.push(req.files[i].filename)
  }
  const sanPham = new SanPham({
    emailShop: req.body.emailShop,
    tenSanPham: req.body.tenSanPham,
    nganhHang: req.body.nganhHang,
    gia: req.body.gia,
    soLuong: req.body.soLuong,
    hinh_anh: reqFiles
  });
  sanPham
    .save(sanPham)
    .then(data => {
      res.status(200).json({msg:data});
    })
    .catch(err => {
      res.status(400).json({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}

exports.capNhatSanPham = async (req, res) => {
  let idSanPham = req.body.idSanPham;
  let tenSanPham = req.body.tenSanPham;
  let nganhHang = req.body.nganhHang;
  let gia = req.body.gia;
  let soLuong = req.body.soLuong;
  // let idShop = req.body.idShop;
  const reqFilesUpdate = [];
  //const url = req.protocol + '://' + req.get('host')
  for (var i = 0; i < req.files.length; i++) {
    //reqFiles.push(url + '/public/' + req.files[i].filename)
    reqFilesUpdate.push(req.files[i].filename)
  }
 await SanPham.findByIdAndUpdate({ _id: idSanPham }, { tenSanPham: tenSanPham, nganhHang: nganhHang,  gia: gia, soLuong: soLuong, hinh_anh: reqFilesUpdate },    function (err, result) {
    if (err) {
      res.status(400).json("err")
    }
    else {
      res.status(200).json({msg:result})
    }
  })
}

exports.xoaSanPham = (req, res) => {
  let idSanPham = req.body.idSanPham
  SanPham.findOneAndDelete({ _id: idSanPham }, function (err, result) {
    if (err) {
      res.send("Err delete")
    } else {
      res.send(result)
    }
  })
}
// // get id_shop
// exports.getIdShop = async (req, res) => {
//   SanPham.findOne({ _id: req.body.id_san_pham }, function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Không tìm thấy dữ liệu"
//       })
//     }
//     else {
//       return res.status(200).send({
//         data: result.id_shop
//       })
//     }
//   })
// }
// exports.login = async (req, res) => {
//   Shop.findOne({ email: req.body.email }).exec(function (err, result) {
//     if (!result) {
//       return res.status(400).send("Email không tồn tại")

//     }
//     if (req.body.password === result.password) {
//       return res.status(200).send({ data: result });
//     }
//     return res.status(401).send({
//       message: "Mật khẩu không chính xác"
//     });
//   })
// }

// exports.add = (req, res) => {
//   const reqFiles = [];
//   //const url = req.protocol + '://' + req.get('host')
//   for (var i = 0; i < req.files.length; i++) {
//     //reqFiles.push(url + '/public/' + req.files[i].filename)
//     reqFiles.push(req.files[i].filename)
//   }
//   const sanPham = new SanPham({
//     id_shop: req.body.id_shop,
//     ten_san_pham: req.body.ten_san_pham,
//     nganh_hang: req.body.nganh_hang,
//     gia: req.body.gia,
//     so_luong: req.body.so_luong,
//     hinh_anh: reqFiles
//   });
//   sanPham
//     .save(sanPham)
//     .then(data => {
//       res.send(data);
//       console.log(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     });
// }
// // update SP
// exports.updateItem = (req, res) => {
//   let id_san_pham = req.body._id;
//   let ten_san_pham = req.body.ten_san_pham;
//   let nganh_hang = req.body.nganh_hang;
//   let gia = req.body.gia;
//   let so_luong = req.body.so_luong;
//   let id_shop = req.body.id_shop;
//   const reqFilesUpdate = [];
//   //const url = req.protocol + '://' + req.get('host')
//   for (var i = 0; i < req.files.length; i++) {
//     //reqFiles.push(url + '/public/' + req.files[i].filename)
//     reqFilesUpdate.push(req.files[i].filename)
//   }
//   SanPham.findByIdAndUpdate({ _id: id_san_pham }, { ten_san_pham: ten_san_pham, nganh_hang: nganh_hang, id_shop: id_shop, gia: gia, so_luong: so_luong, hinh_anh: reqFilesUpdate }, function (err, result) {
//     if (err) {
//       res.send("err")
//     }
//     else {
//       res.send(result)
//     }
//   })
// }

// //get all data
// exports.getAllData = (req, res) => {
//   SanPham.find({ id_shop: req.body.id_shop }, function (err, result) {
//     if (result) {
//       console.log(result)
//       return res.status(200).send({
//         data: result
//       })
//     } else {
//       return res.status(500).send({
//         err: "Server is not working"
//       })
//     }
//   })
// }

// // delete Item SP
// exports.deleteItem = (req, res) => {
//   let id_san_pham = req.body.id_san_pham
//   SanPham.findOneAndDelete({ _id: id_san_pham }, function (err, result) {
//     if (err) {
//       res.send("Err delete")
//     } else {
//       res.send(result)
//     }
//   })
// }

// // update san pham sau khi mua hang
// exports.updateSoLuongSanPhamAfterBuy = async (req, res) => {
//   // filer by _id of item 
//   console.log('okay')
//   let filter = {
//     _id: req.body.id_san_pham,
//   }
//   SanPham.findOne(filter).exec(async function (err, result) {
//     console.log('okay')

//     if (result) {
//       let new_so_luong = result.so_luong - req.body.so_luong;
//       let update = {
//         so_luong: new_so_luong
//       }

//       let doc = await SanPham.findOneAndUpdate(filter, update, {
//         new: true
//       })
//       res.send(doc)
//       return
//     }
//     if (err) {
//       res.send('Error')
//     }
//   });
//   // res.json(doc)
// };
// // add to cart
// exports.addToCart = (req, res) => {
//   const gioHang = new GioHang({
//     id_user: req.body.id_user,
//     id_san_pham: req.body.id_san_pham,
//     id_shop: req.body.id_shop,
//     so_luong: req.body.so_luong,
//     gia: req.body.gia,
//     ten_san_pham: req.body.ten_san_pham,
//     hinh_anh: req.body.hinh_anh,
//   })

//   let filterCart = {
//     id_user: req.body.id_user,
//     id_san_pham: req.body.id_san_pham
//   }

//   GioHang.findOne(filterCart).exec(async function (err, results) {
//     if (results) {
//       let new_so_luong = parseInt(results.so_luong) + parseInt(req.body.so_luong);
//       console.log(new_so_luong)
//       let update = {
//         so_luong: new_so_luong
//       };
//       console.log(results.update)
//       let doc = await GioHang.findOneAndUpdate(filterCart, update, {
//         new: true
//       });
//       res.status(200).send(doc)
//     } else {
//       gioHang.save(gioHang).then(data => {
//         res.status(200).send(data)
//       }).catch(err => {
//         res.status(500).send(err)
//       })
//     }
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// }
// // get all items order
// exports.getAllItemsOrder = async (req, res) => {
//   await DonHang.find({}).populate('id_user').exec(function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: err
//       })
//     } else {
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // thong ke

// exports.thongKeTheoNam1 = async (req, res) => {
//   await DonHang.aggregate(
//     [
//       {
//         //   $project: {
//         //      date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
//         //   }
//         // },
//         // {
//         $group: {
//           // ==== truy vấn 2 điều kiện năm và id_san_pham ====
//           _id: { year: { "$year": { "$toDate": "$date" } }, id_san_pham: "$id_san_pham" },
//           TotalAmount: { $sum: "$so_luong" },



//           // TotalPrice: { $sum:"$gia"},
//           // TotalAmount: { $sum:"$so_luong"  },

//           //==== query 2 ======
//           /* truy vẫn đếm số lượng sản phẩm bán trong ngày  */
//           // _id: { "date": "$date", "id_san_pham": "$id_san_pham" },
//           // Count: { $sum:"$so_luong"  },
//         }
//       }
//     ]
//     ,
//     function (err, result) {
//       if (err) {
//         console.log(err)
//         res.send({ err })
//       } else {
//         console.log(result)
//         return res.send({
//           data: result
//         })
//       }
//     }
//   )
// }

// exports.thongKeTheoNgay = async (req, res) => {
//   await DonHang.aggregate([
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date("" + req.body.date1),
//           '$lt': new Date("" + req.body.date2)
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           id_shop: "$id_shop"
//         },
//         count: { $sum: "$gia" }
//       }
//     }
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.status(500).send({ err })
//     } else {
//       console.log(result)
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// exports.thongKeTheoThang = async (req, res) => {
//   await DonHang.aggregate([
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.month+"-01"),
//           '$lt': new Date(req.body.month+"-31"),
//           // '$gte': new Date("2020-11-01"),
//           // '$lt': new Date("2020-11-31"),
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           "month": { "$month": { "$toDate": "$date" } },
//           "id_shop": "$id_shop"
//         },
//         count: { $sum: "$gia" }
//       }
//     }
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }
// exports.thongKeTheoNam = async (req, res) => {
//   await DonHang.aggregate([
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.year + "-01-01"),
//           '$lt': new Date(req.body.year + "-12-31")
//         }
//       }
//     },

//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           "month": { "$month": { "$toDate": "$date" } },
//           "id_shop": "$id_shop"
//         },
//         count: { $sum: "$gia" }
//       }
//     }
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// };
// // doanh thu qua các ngày trong tháng
// exports.thongKeTheoCacNgayTrongThang = async (req, res) => {
//   await DonHang.aggregate([
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date("2020-11-01"),
//           '$lt': new Date("2020-11-31")
//         }
//       }
//     },
//     {
//       $group:
//       {
//         "_id": {
//           date: "$date",
//           "day": { "$dayOfMonth": "$date" }
//         },
//         Total: { $sum: "$gia" }
//       },
//     }
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }
// // doanh thu qua các tháng 
// exports.thongKeTheoQuaCacThang = async (req, res) => {
//   await DonHang.aggregate([
//     // {
//     //   $project: {
//     //     "id_shop": ObjectId("5fbc71be3e55bf4100159089"),
//     //     "date": {
//           // '$gte': new Date("2020" + "-01-01"),
//           // '$lt': new Date("2020" + "-12-31")
//     //     }
//     //   }
//     // },
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date("2020-01-01"),
//           '$lt': new Date("2020-12-31")
//         }
//       }
//     },
//     // { $project: { _id: 0, year: { $year: "$date" }, month: { $month: "$date" },gia:"$gia" } },

//     { 
//       $group:
//        { 
//          "_id":{
//         month:{"$month": { "$toDate": "$date"} },
        
//         // year:{"$year": { "$toDate": "$date"} }
//       },
//         // months: { $push: "$month" } ,
      
//         Total: { $sum: "$gia" }
//        },
//       }

//     // { $group: { "_id": null, years: { $push: "$year" },
//     //   month: { $push: "$month" }, gia: { $push: "$gia" },count:{$sum:"$gia"}  }}

//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }
// exports.sanPhamBanChayHomNay = async (req, res) => {
//   await DonHang.aggregate([
   
//     { $sort: { so_luong: -1} },
//     //  { $limit: 200 },
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.date1),
//           '$lt': new Date(req.body.date2)
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           id_shop: "$id_shop",
//           ten_san_pham: "$ten_san_pham"
//         },
//         so_luong: { $sum: "$so_luong" }
//       }
//     }
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.status(500).send({ err })
//     } else {
//       console.log(result)
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }

// exports.sanPhamBanChayThangNay = async (req, res) => {
//   await DonHang.aggregate([
//     { $limit: 1 },
//     { $sort: { so_luong: -1} },
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
        
//         "date": {
//           '$gte': new Date(req.body.date1),
//           '$lt': new Date(req.body.date2)
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           id_shop: "$id_shop",
//           ten_san_pham: "$ten_san_pham"
//         },
//         so_luong: { $sum: "$so_luong" }
//       }
//     }
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.status(500).send({ err })
//     } else {
//       console.log(result)
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // sanPhamBanChayThangNay
// exports.sanPhamBanChayThangNay = async (req, res) => {
//   await DonHang.aggregate([
     
    
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.month + "-01"),
//           '$lt': new Date(req.body.month + "-31"),
//           // '$gte': new Date("2020-11-01"),
//           // '$lt': new Date("2020-11-31"),
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           id_shop: "$id_shop",
//           ten_san_pham: "$ten_san_pham"
//         },
//         so_luong: { $sum: "$so_luong" }
//       }
//     },
//     { $sort: { so_luong: -1} },
//      { $limit: 1 },
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }
// // sản phẩm bán chạy từ đầu năm đến nay
// exports.sanPhamBanChayTuDauNamDenNay = async (req, res) => {
//   await DonHang.aggregate([
//       // { $limit: 1 },
    
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.year + "-01-01"),
//           '$lt': new Date(req.body.year + "-12-31"),
//           // '$gte': new Date("2020-11-01"),
//           // '$lt': new Date("2020-11-31"),
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           // id_shop: "$id_shop",
//           ten_san_pham: "$ten_san_pham"
//         },
//         so_luong: { $sum: "$so_luong" }
//       }
//     },
//     { $sort: { so_luong: -1 } },
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }
// // thống kế sản phẩm bán chạy các tháng trong năm
// exports.sanPhamBanChayCacThangTrongNam = async (req, res) => {
//   await DonHang.aggregate([
//       // { $limit: 1 },
    
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.year + "-01-01"),
//           '$lt': new Date(req.body.year + "-12-31"),
//           // '$gte': new Date("2020-11-01"),
//           // '$lt': new Date("2020-11-31"),
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           // id_shop: "$id_shop",
//           // month:{$month:'$date'},
//           ten_san_pham: "$ten_san_pham"
//         },
//         so_luong: { $sum: "$so_luong" }
//       }
//     },
//     // { $sort: { so_luong: -1 } },
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }
// // thống kế sản phẩm bán chạy các ngày trong tháng
// exports.sanPhamBanChayCacNgayTrongThang = async (req, res) => {
//   await DonHang.aggregate([
//       // { $limit: 1 },
    
//     {
//       '$match': {
//         "id_shop": ObjectId(req.body.id_shop),
//         "date": {
//           '$gte': new Date(req.body.month + "-01"),
//           '$lt': new Date(req.body.month + "-31"),
//           // '$gte': new Date("2020-11-01"),
//           // '$lt': new Date("2020-11-31"),
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           // id_shop: "$id_shop",
//           // month:{$month:'$date'},
//           ten_san_pham: "$ten_san_pham"
//         },
//         so_luong: { $sum: "$so_luong" }
//       }
//     },
//     // { $sort: { so_luong: -1 } },
//   ], function (err, result) {
//     if (err) {
//       console.log(err)
//       res.send({ err })
//     } else {
//       console.log(result)
//       return res.send({
//         data: result
//       })
//     }
//   })
// }