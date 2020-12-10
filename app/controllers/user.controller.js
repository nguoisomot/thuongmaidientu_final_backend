const { ObjectId } = require("mongodb");
const { hoaDonChiTietShop, hoaDonChiTietUser } = require("../models");
const db = require("../models");
const Shop = db.shop;
const SanPham = db.sanPham;
const GioHang = db.gioHang;
const User = db.user;
const SanPhamYeuThich = db.sanPhamYeuThich;
const SanPhamMuaSau = db.sanPhamMuaSau;
const DonHang = db.donHang;
const DonHangChiTiet = db.donHangChiTiet;


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

exports.capNhatThongTinUser = (req, res) => {
  User.findOneAndUpdate({
    _id: req.body.idUser
  }, {
    hoVaTen: req.body.hoVaTen,
    soDienThoai: req.body.soDienThoai,
    diaChi: req.body.diaChi
  }, function (err, result) {
    if (err) {
      return res.status(400).json({
        err: err
      })

    }
    return res.status(200).json({
      data: result
    })
  })
}

exports.doiMatKhau =(req,res)=>{
  User.findOneAndUpdate({_id:req.body.idUser,password:req.body.password1},{
    password: req.body.password2
  },function(err,result){
    if(result == null){
      return res.status(400).json({
        msg: "Mật khẩu cũ không đúng"
      })
    }
      return res.status(200).json({
        msg: "Đã đổi mật khẩu"
      })
  })

}

exports.chiTietSanPham = (req, res) => {

  SanPham.findOne({ _id: req.body.idSanPham }, function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    }
    else {
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
  }, function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    } else {
      return res.status(200).send({
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
      }, { '$inc': { 'items.$.soLuong': req.body.soLuongMua } }).exec(function (err1, result1) {
        if (result1.nModified == 0) {
          GioHang.update({
            'idUser': req.body.idUser,
          }, {
            '$push': {
              'items': { 'idSanPham': ObjectId(req.body.idSanPham), soLuongMua: req.body.soLuongMua }
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
      let sanPham = [{ idSanPham: req.body.idSanPham, soLuongMua: req.body.soLuongMua }]
      const gioHang = new GioHang({
        idUser: req.body.idUser,
        items: sanPham
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

exports.hienThanhSanPhamTheoNganhHang = (req, res) => {
  SanPham.find({ nganhHang: req.body.nganhHang }, function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    } else {
      return res.status(200).json({
        msg: result
      })
    }
  })
}

exports.xoaSanPhamTrongGioHang = (req, res) => {
  GioHang.update(
    { idUser: req.body.idUser },
    { $pull: { "items": { idSanPham: req.body.idSanPham } } }, function (err, result) {
      if (err) {
        return res.status(400).json({
          msg: "err"
        })
      }
      else {
        return res.status(200).json({
          msg: result
        })
      }
    }
  )
}

// exports.sanPhamTrongGioHang = async (req, res) => {
//   GioHang.find({ idUser: req.body.idUser }).populate('items.idSanPham').populate('idUser').exec(function(err,result){
//     if(result == null){
//       return res.status(400).send("Không có sản phẩm nào")
//     }
//     return res.status(200).send(result)
//   })
// }
exports.sanPhamTrongGioHang = async (req, res) => {
  GioHang.aggregate([
    
  ])
}

exports.thanhToan = (req, res) => {
  GioHang.findOne({ idUser: req.body.idUser }).populate('items.idSanPham').exec(function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    }
    else {
 
      var sanPham = [];
      var tongTien = 0
      result.items.map((value, index) => {
        console.log("tongTien: " + (value.idSanPham.gia * value.soLuongMua + tongTien));
        tongTien = value.idSanPham.gia * value.soLuongMua + tongTien;
        return sanPham.push({
          idSanPham: value.idSanPham,
          soLuong: value.soLuong,
        })
      })
      const donHang = new DonHang({
        idUser:req.body.idUser,
        tongTien:tongTien
      })
      
      donHang.save(donHang).then(
        data =>{
          const donHangChiTiet = new DonHangChiTiet({
            idHoaDon: data._id,
            idUser:req.body.idUser,
            sanPham:result.items,
            tongTien:tongTien,
            trangThai:"Đã tiếp nhận đơn hàng"
          })
          donHangChiTiet.save(donHangChiTiet).then(
            data =>{
              GioHang.deleteOne({idUser:req.body.idUser},function(err,result){
                if(result){
                  console.log(result)
                }
              })
             return res.status(200).json({
                msg:data
              })
            }
          ).catch(err=>{
            return res.status(400).json({
              msg: err
            })
          })
        }
      )

    }
  })
}

// exports.thongKeTheoNam = async (req, res) => {
//   await HoaDonChiTietShop.aggregate([
//     {
//       '$match': {
//         "idShop": ObjectId(req.body.idShop),
//         "ngayMuaHang": {
//           '$gte': new Date(req.body.year + "-01-01"),
//           '$lt': new Date(req.body.year + "-12-31")
//         }
//       }
//     },

//     {
//       $group: {
//         _id: {
//           //  "date": "$date",
//           "month": { "$month": { "$toDate": "$ngayMuaHang" } },
//           "idShop": "$idShop"
//         },
//         count: { $sum: "$tongTien" }
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

exports.findDonHang = (req, res) => {
  GioHang.aggregate([
    {
      '$match': {
        idUser: ObjectId(req.body.idUser),
      }
    },
    {
      $lookup: {
        from: "SanPham",
        localField: "items.idSanPham",
        foreignField: "_id",
        as: "san_pham",
      }
    },
    {
      $project: {
        items: "$san_pham",
      }
    },
    // {
    //   $project:{
    //     items:"$san_pham",
    //   }
    // },  
    // {
    //   $group:{
    //     _id:"$items._id"
    //   }
    // }
  ], function (err, result) {
    if (err) {
      return res.status(400).json({
        msg: err
      })
    }
    else {
      let tongTien = 0;
      result[0].items.map((value, index) => {
        tongTien = value.gia * value.soLuong + tongTien
      })
      result.push({ "tongTien": tongTien })
      return res.status(200).json(
        {
          msg: result,
        })
    }
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
