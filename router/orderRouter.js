const express = require("express");
const orderRouter = express.Router();
const {Order} = require("../models");

const {orderMiddleware} = require("../middleware")

// 주문 생성
orderRouter.post("/orders",orderMiddleware, async(req,res)=>{
  const  {userEmail, orderItems} = req.body;
  try{
    const order = await Order.create({userEmail, orderItems});
    res.json(order);
  }catch(err){
    res.status(500).json({error: '주문 생성에 실패🙅🏻‍♀️'});
  }
});

// 모든 주문 조회
orderRouter.get("/orders",orderMiddleware, async(req,res)=>{
  try{
    const orders = await Order.find({});
    res.json(orders);
  }catch(err){
    res.status(500).json({error: '주문 조회에 실패🙅🏻‍♀️'});
  }
});

// 주문 수정 
orderRouter.put("/orders/:id", orderMiddleware, async(req,res)=>{
  const {id: orderId} = req.params;
  const {userEmail, orderItems} =req.body;

  try{
    const updateOrder = await Order.findByIdAndUpdate(orderId, {userEmail,orderItems},{new:true});
    res.json(updateOrder);
  }catch(err){
    res.status(500).json({error:'주문 수정 오류😔'});
  }  
});

// 주문 삭제
orderRouter.delete("/orders/:id", orderMiddleware, async(req,res)=>{
  const {id: orderId} = req.params;
  try{
    const order = await Order.findByIdAndDelete(orderId);
    
    // 미들웨어로 나중에 뺼 것
    if(order) {
      res.json({message: '주문이 삭제되었습니다.🫶🏻'});
    }else{
      res.status(404).json({error:'해당 Id의 주문을 찾을 수 없습니다.🥲'})
    }

  }catch(err){
    res.status(500).json({error:'주문 삭제에 실패🥲'})
  }
});



module.exports = orderRouter;