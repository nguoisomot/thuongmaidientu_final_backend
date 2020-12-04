const { ObjectId } = require("mongodb");
const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;
const User = db.user;
const SanPhamYeuThich = db.sanPhamYeuThich;
const SanPhamMuaSau = db.sanPhamMuaSau;
const DonHang = db.donHang;
const HoaDonUser = db.hoaDonUser;
const HoaDonChiTietUser = db.hoaDonChiTietUser;

exports.registerUser = (req, res) => {
  const user = new User({
    // _id: req.body._id,
    hoVaTen: req.body.hoVaTen,
    email: req.body.email,
    soDienThoai: req.body.soDienThoai,
    password: req.body.password,
    diaChi: req.body.diaChi
  });

  user
    .save(user)
    .then(data => {
      res.status(200).json({
        msg: data
      });
      console.log(data)
    })
    .catch(err => {
      res.status(400).json({
        msg: "Email đã tồn tại"
      });
    });
}

exports.loginUser = async (req, res) => {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }).exec(function (err, result) {
    if (err) {
      return res.status(400).json({
        data: "Email hoặc mật khẩu không chính xác"
      })
    }

    return res.status(200).json({ msg: result });
  })
}

exports.capNhatThongTinUser = (req,res)=>{
  
}

exports.chiTietSanPham = (req,res)=>{

  SanPham.findOne({_id:req.body.idSanPham},function(err,result){
    if(err){
      return res.status(400).json({
        msg:err
      })
    }
    else{
      return res.status(200).json({
        sanPham: result
      })
    }
  })

}

exports.sanPhamYeuThich = async (req, res) => {
  SanPhamYeuThich.findOne({
    idUser: req.body.idUser,
    idSanPham: req.body.idSanPham
  }, function (err, result) {
    if (result) {
      return res.status(200).json({
        msg: "Sản phẩm đã tồn tại trong danh sách"
      })
    }
    else {
      const sanPhamYeuThich = new SanPhamYeuThich({
        idUser: req.body.idUser,
        idSanPham: req.body.idSanPham
      })
      sanPhamYeuThich.save(sanPhamYeuThich).then(data => {
        return res.status(200).json({
          msg: data
        })
      }).catch(err => {
        return res.status(400).json({
          msg: err
        })
      })
    }
  })
}
exports.deleteSanPhamYeuThich = (req, res) => {
  SanPhamYeuThich.deleteOne({
    idUser: req.body.idUser,
    idSanPham: req.body.idSanPham
  }, function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    } else {
      return res.status(200).json({
        msg: "Đã xóa"
      })
    }
  })
}
exports.sanPhamMuaSau = async (req, res) => {
  SanPhamMuaSau.findOne({
    idUser: req.body.idUser,
    idSanPham: req.body.idSanPham,
  }, function (err, result) {
    if (result) {
      return res.status(200).json({
        msg: "Sản phẩm đã tồn tại trong danh sách"
      })
    }
    else {
      const sanPhamMuaSau = new SanPhamMuaSau({
        idUser: req.body.idUser,
        idSanPham: req.body.idSanPham
      })
      sanPhamMuaSau.save(sanPhamMuaSau).then(data => {
        return res.status(200).json({
          msg: data
        })
      }).catch(err => {
        return res.status(400).json({
          msg: err
        })
      })
    }
  })
}

exports.deleteSanPhamMuaSau = (req, res) => {
  SanPhamMuaSau.deleteOne({
    idUser: req.body.idUser,
    idSanPham: req.body.idSanPham
  },function(err,result){
    if(err){
      return res.status(400).json({
        msg:err
      })
    }else{
      return res.status(200).json({
        msg: result
      })
    }
  })
}

exports.themSanPhamVaoGioHang = async (req, res) => {
  GioHang.findOne({
    idUser: req.body.idUser
  }).exec(function (err, result) {
    if (result) {
      GioHang.updateOne({
        'idUser': req.body.idUser,
        'items.idSanPham': ObjectId(req.body.idSanPham)
      }, { '$inc': { 'sanPham.$.soLuong': req.body.soLuong } }).exec(function (err1, result1) {
        if (result1.nModified == 0) {
          GioHang.update({
            'idUser': req.body.idUser,
          }, {
            '$push': {
              'sanPham': { 'idSanPham': ObjectId(req.body.idSanPham), soLuong: 90 }
            }
          }, function (err2, result2) {
            if (result2) {
              return res.status(200).json({
                msg: result2
              })
            }
            return
          })
          // return res.send(err);
        } else {
          return res.json({ result1: "oke" });
        }
      })

    }
    else {
      let sanPham = [{ idSanPham: req.body.idSanPham, soLuong: req.body.soLuong }]
      const gioHang = new GioHang({
        idUser: req.body.idUser,
        sanPham: sanPham
      });
      gioHang.save(gioHang).then(
        data => {
          return res.status(200).json({ msg: data });
        }).catch(err => {
          return res.status(400).json({
            msg: "Server đang gặp sự cố"

          });
        })
    }
  })
}

exports.xoaSanPhamTrongGioHang =(req,res)=>{
  GioHang.update(
    { idUser: req.body.idUser},
    {$pull:{"items": {idSanPham:req.body.idSanPham}}},function(err,result){
      if(err){
        return res.status(400).json({
          msg:"err"
        })
      }
      else{
        return res.status(200).json({
          msg: result
        })
      }
    }
  )
}

exports.sanPhamTrongGioHang = (req, res) => {
  GioHang.find({ idUser:req.body.idUser},(function (err, result) {
    if (err){
      return res.status(400).json({
        msg:err
      })
    }
    return res.status(200).json({
      items: result
    });
  }));
}

exports.thanhToan = (req, res) => {
  GioHang.findOne({ idUser: req.body.idUser }, function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    }
    else {
      console.log("HoaDonUser")
      const hoaDonUser = new HoaDonUser({
      })
      var sanPham = [];
      result.sanPham.map((value, index) => {
        return sanPham.push({ idSanPham: value.idSanPham, soLuong: value.soLuong })
      })
      console.log(sanPham)
      hoaDonUser.save(hoaDonUser).then(data => {
        console.log("hoa don user save...")
        const hoaDonChiTietUser = new HoaDonChiTietUser({
          idHoaDon: result._id,
          idUser: result.idUser,
          sanPham: sanPham,
          trangThai: "Đã tiếp nhận đơn hàng",
        })
        hoaDonChiTietUser.save(hoaDonChiTietUser).then(data => {
          console.log("hoa don chi tiet save")
          return res.status(200).json({
            msg: data
          })
        }).catch(err => {
          return res.status(400).json({
            msg: "that bai ! save hoa don chi tiet "
          })
        })
        //  return res.status(200).json({
        //    msg: data
        //  })
      }).catch(err => {
        return res.status(400).json({
          msg: err
        })
      })
    }
  })
}
exports.findDonHang = (req, res) => {
  GioHang.findOne({ idUser: req.body.idUser }).populate('items.idSanPham').populate('items.idSanPham.idShop').then(data=>{
    return res.status(200).json({
      msg:data
    })
  })
}

exports.lienKet = (req, res) => {
  SanPhamYeuThich.find({}).populate('idUser').exec(function (err, result) {
    if (err) return handleError(err);
    return res.status(200).json({
      msg: result
    });
  });
}
// exports.registerUser = (req, res) => {

//   const user = new User({
//     // _id: req.body._id,
//     ho_va_ten: req.body.ho_va_ten,
//     email: req.body.email,
//     sdt: req.body.sdt,
//     password: req.body.password,
//     ngay_sinh: req.body.ngay_sinh,
//     dia_chi: req.body.dia_chi
//   });

//   user
//     .save(user)
//     .then(data => {
//       res.status(200).send({
//         data: data
//       });
//       console.log(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     });
// }

// exports.login = async (req, res) => {
//   User.findOne({
//     email: req.body.email, password: req.body.password
//   }).exec(function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Email hoặc mật khẩu không chính xác"
//       })
//     }
//     else if (result) {
//       return res.status(200).send({ data: result });
//     }
//     else {
//       return res.status(400).send({
//         data: "Email hoặc mật khẩu không chính xác"
//       })
//     }
//   })
// }
// // get data items theo nganh_hang
// exports.getItemsNganhHang = async (req, res) => {
//   SanPham.find({ nganh_hang: req.body.nganh_hang }).exec(function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Không tải được dữ liệu"
//       })
//     }
//     if (result) {
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // get item chi tiet
// exports.getItemChiTiet = async (req, res) => {
//   SanPham.findOne({ _id: req.body.idSanPham }).exec(function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Không tìm thấy trang"
//       })
//     }
//     else {
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // get items in cart

// exports.getItemCart = async (req, res) => {
//   await GioHang.find({ id_user: req.body.id_user }).exec(function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Lỗi tải dữ liệu"
//       })
//     } else {
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // thanh toan, delete items gio hang
// exports.thanhToan = async (req, res) => {
//   await GioHang.find({ id_user: req.body.id_user }, function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Không tìm thấy sản phẩm"
//       })
//     } else {
//       result.map((item, index) => {
//         const donHang = new DonHang({
//           id_user: item.id_user,
//           id_san_pham: item.id_san_pham,
//           id_shop: item.id_shop,
//           so_luong: item.so_luong,
//           gia: item.gia,
//           ten_san_pham: item.ten_san_pham,
//           hinh_anh: item.hinh_anh,
//         });
//         donHang.save(donHang
//         ).then(data => {
//           //  res.send(data);
//           console.log(data)
//         })
//           .catch(err => {
//             //  res.status(500).send({
//             //    message:
//             //      err.message || "Some error occurred while creating the Tutorial."
//             //  });
//           });
//       })

//       // return res.status(200).send({
//       //   data: result
//       // })
//     }
//   })
//   await GioHang.deleteMany({ id_user: req.body.id_user }, function (err, result) {
//     if (err) {
//       return res.status(400).send({
//         data: "Không tìm thấy sản phẩm"
//       })
//     } else {
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // thanh toan, save items dat mua

// //get info user
// exports.getInfoUser = async (req, res) => {
//   await User.findOne({ _id: req.body.id_user }, function (err, result) {
//     if (err) {
//       return res.status(400).send("Lỗi")
//     } else {
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }
// // getAllDonHang
// exports.getAllDonHang = async (req,res)=>{
//   await DonHang.find({id_user:req.body.id_user}).populate('id_user').exec(function(err,result){
//     if(err){
//       return res.status(400).send({
//         data: err
//       })
//     }else{
//       return res.status(200).send({
//         data: result
//       })
//     }
//   })
// }