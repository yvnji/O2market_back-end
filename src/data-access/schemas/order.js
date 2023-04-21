const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId:{
    type:Number,
    required:true,
  },

  /* 추가기능으로 뺌
  *  orderedBy:{
  *  type:mongoose.Schema.Types.ObjectId,
  *  ref:"User",
  *  required:true,
    },
  */ 
  userEmail:{
    type:String,
    required:true,
  },
  orderItems:{
    type:{
      productId: Number,
      quantity: Number,
      price: Number,
    },
    required:true,

  }, 
  orderAddr:{
    type:String,
    required:true,
  },
  deliveryState:{
    type:Number,
    required:true,
  },
  deleteFlag: {
    type: Boolean,
    default: false
  },
});
module.exports = orderSchema;