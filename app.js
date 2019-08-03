//1:引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
//2:配置第三方模块
 //2.1:配置连接池
var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    port:3306,
    database:"edog",
    connectionLimit:15
})
//2.2:跨域
var server = express();
    server.use(cors({
    origin:["http://127.0.0.1:5501",
    "http://localhost:8080"],
    credentials:true
}))
//2.3:session
server.use(session({
    secret:"128位字符串",
    resave:true,
    saveUninitialized:true
}))
//2.4:指定静态目录
server.use(express.static("../epetdog"))
server.use(bodyParser.urlencoded({extended:false}))
server.listen(3000);
server.get("/index",(req,res)=>{
    pool.query("select * from edog_index_product",(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
server.get("/product",(req,res)=>{
    var pid=req.query.pid
    pool.query("select * from edog_index_product where pid=?",[pid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
server.get("/product_pic",(req,res)=>{
    var pid=req.query.pid
    pool.query("select * from edog_pic where pid=?",[pid],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
server.get("/login",(req,res)=>{
    var uname=req.query.uname
    var upwd=req.query.upwd
    var sql=`SELECT * FROM edog_user where uname=? and upwd=?`;
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length<=0){
            res.send({code:-1,msg:"用户名或密码错误"});
        }else{
            var uid=result[0].uid
        res.send({code:1,msg:"登陆成功",uid});
        }
    })
})
// 购物车--插入数据
server.get("/add-cart",(req,res)=>{
    var uid=req.query.uid
    var pid=req.query.pid
    var product_image=req.query.pic
    var title=req.query.title
    var price1=req.query.price1
    var counts=req.query.counts
    var obj={uid,pid,product_image,title,price1,counts}
    console.log(obj)
    pool.query("insert into edog_cart SET ?",[obj],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"插入成功"})
        }else{
            res.send({code:-1,msg:"插入失败"}) 
        }
    })
})
// 查询数据库--购物车
server.get("/select-cart",(req,res)=>{
    var uid=req.query.uid
    var pid=req.query.pid
    
    pool.query("select * from edog_cart where pid=? and uid=?",[pid,uid],(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

server.get("/select-mycart",(req,res)=>{
    var uid=req.query.uid
    // var pid=req.query.pid
    
    pool.query("select * from edog_cart where uid=?",[uid],(err,result)=>{
        console.log(result)
        res.send(result)
    })
})

//修改数据库
server.get("/update-cart",(req,res)=>{
    var pid=req.query.pid
    var uid=req.query.uid
    var counts=req.query.cartCounts
    console.log(counts,"xiugaishuliang")
    pool.query("update edog_cart set counts=? where uid=? and pid=?",[counts,uid,pid],(err,result)=>{
        console.log(result,"xiuagai")
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"修改成功"})
        }else{
            res.send({code:-1,msg:"修改失败"}) 
        }

    })
})
// 登录接口
// server.post("/login",(req,res)=>{
//     var uname=req.body.uname
//     var upwd=req.body.upwd
//     // console.log(uname)
//     var sql=`SELECT * FROM sipin_user where uname=? and upwd=?`;
//     pool.query(sql,[uname,upwd],(err,result)=>{
//         // console.log(result)
//         if(err) throw err;
//         if(result.length<=0){
//             res.send({code:-1,msg:"用户名或密码错误"});
//         }else{
//             // req.session.uid=result[0].uid
//             var uid=result[0].uid
//             // console.log(req.session.uid)
//         res.send({code:1,msg:"登陆成功",uid});
//         }
//     })
// })
// server.get("/leave",(req,res)=>{
//     req.session.uid=null;
//     console.log("qingchu")
//     res.send("清除成功")
// })
// server.post("/reg",(req,res)=>{
//     var uname=req.body.uname
//     var upwd=req.body.upwd 
//     var obj=req.body
//     var sql="select uname from sipin_user where uname=?"
//     pool.query(sql,[uname],(err,result)=>{
//         if(err) throw err;
//         // console.log(result)
//         if(result.length>0){
//             // console.log(result)
//             res.send({code:1,msg:"此用户名存在11"})
//         }else{
//             pool.query("insert into sipin_user SET ?",[obj],(err,result)=>{
//                 if(err) throw err;
//                 res.send({code:2,msg:"插入成功"})
//             })
//         }
//     })
// })


// server.get("/pci",(req,res)=>{
//     var sipin_id=req.query.pid
//      var sql = "SELECT * FROM  sipin_pic where sipin_id=?";
//     pool.query(sql,[sipin_id],(err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// })


// server.get("/product",(req,res)=>{
//     var pid=req.query.pid
//      var sql = "SELECT * FROM  sipin_index_product where pid=?";
//     pool.query(sql,[pid],(err,result)=>{
//         if(err) throw err;
//         res.send(result);
//     })
// })

//  //先登录操作成功后再查询购物车
// //查询指定用户购物车列表
// server.get("/cart",(req,res)=>{
//   //1:参数(无参数)app.js
//     console.log(req.session.uid);
//     var uid = req.session.uid;
//     if(!uid){
//         res.send({code:-1,msg:"请登录"});
//         return;
//     }
//     //2:sql
//     var sql = "SELECT id,img_url,title,price,count FROM xz_cart WHERE uid = ?";
//     pool.query(sql,[uid],(err,result)=>{
//     if(err)throw err;
//     res.send({code:1,data:result})
//     })
// })

// // 购物车--插入数据
// server.get("/add-cart",(req,res)=>{
//     var uid=req.query.uid
//     var pid=req.query.pid
//     var product_image=req.query.product_image
//     var title=req.query.title
//     var details=req.query.details
//     var price1=req.query.price1
//     var is_sale=req.query.is_sale
//     var counts=req.query.counts
//     var obj={uid,pid,product_image,title,details,is_sale,price1,counts}
//     // console.log(obj)
//     pool.query("insert into sipin_cart SET ?",[obj],(err,result)=>{
//         if(err) throw err;
//         if(result.affectedRows>0){
//             res.send({code:1,msg:"插入成功"})
//         }else{
//             res.send({code:-1,msg:"插入失败"}) 
//         }
//     })
// })

// // 查询数据库--购物车
// server.get("/select-cart",(req,res)=>{
//     var uid=req.query.uid
//     var pid=req.query.pid
    
//     pool.query("select * from sipin_cart where uid=?",[uid],(err,result)=>{
//         // console.log(result)
//         res.send(result)
//     })
// })

// //修改数据库
// server.get("/update-cart",(req,res)=>{
//     var pid=req.query.pid
//     var uid=req.query.uid
//     console.log(uid,"uid")
//     console.log(pid,"pid")
//     var counts=req.query.counts
//     pool.query("update sipin_cart set counts=? where uid=? and pid=?",[counts,uid,pid],(err,result)=>{
//         console.log(result,"xiuagai")
//     })
// })