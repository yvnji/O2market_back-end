const express = require('express');
const { orderService, productService} = require('../service');
const { userMiddleware } = require('../middleware');
const { orderMiddleware } = require('../middleware');

const orderRouter = express.Router();
/*
//배송 상태 데이터베이스에 저장
const updateDeliveryState = (req, res, next) => {
  const { _id: orderId } = req.params;
  const { deliveryState } = req.body;

  // 0(배송전) , 1(배송중), 2(배송완료)
  if (deliveryState !== 0 && deliveryState !== 1 && deliveryState !== 2) {
    return next(
      new AppError(
        commonErrors.requestValidationError,
        500,
        '잘못된 배송 상태입니다.😵‍💫'
      )
    );
  }

  Order.findOneAndUpdate(
    { _id: orderId },
    { deliveryState },
    { new: true }, //
    (err, updatedOrder) => {
      if (err) {
        return next(err);
      }
      req.updatedOrder = updatedOrder;
      next();
    }
  );
};

// 주문 삭제
const deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { deleteFlag } = req.body;

  try {
    let deletedOrder;

    if (deleteFlag === 'soft') {
      // soft delete
      deletedOrder = await Order.findByIdAndUpdate(
        orderId,
        { deleted: true },
        { new: true }
      );
      res.json({ message: '주문을 삭제했습니다.' });
    } else if (deleteFlag === 'hard') {
      // hard delete
      deletedOrder = await Order.findByIdAndDelete(orderId);
      res.json({ message: '주문을 완전히 삭제했습니다.' });
    } else {
      // invalid delete option
      res
        .status(400)
        .json({ error: '삭제 옵션을 선택해주세요. (soft or hard)' });
      return;
    }

    if (!deletedOrder) {
      res.status(404).json({ error: '삭제할 주문이 없습니다.' });
      return;
    }
    next();
  } catch (err) {
    res.status(500).json({ error: '주문 삭제 오류😔' });
  }
};

//주문 정보 데이터베이스에 저장
const orderSaver = (req, res, next) => {
  const { orderId, userEmail, orderItems, orderAddr } = req.body;
  const order = new Order({
    orderId,
    userEmail,
    orderItems,
    orderAddr,
  });
  order.save((err) => {
    if (err) {
      return res.status(500).json({ error: '내부 서버 에러' });
    }
    req.order = order;
    next();
  });
};
*/
// 주문 추가 api
orderRouter.post(
  '/:userId',
  userMiddleware.loginRequired,
  orderMiddleware.orderValidator,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { orderAddr, deliveryState, deleteFlag } = req.body;



      const orderItems = req.body.orderItems; // orderItems를 배열로 변경하지 않음
      const dbProductId = await productService.getProductById(orderItems[0].productId)


    if (orderItems[0].productId.toString() !== dbProductId._id.toString() && orderItems[0].price !== dbProductId.price ) {
        return res
            .status(400)
            .json({ error: '일치하는 상품이 존재하지 않습니다.' });
    }

      const orderInfo = {
        ...(userId && { userId }),
        ...(orderItems && { orderItems }),
        ...(orderAddr && { orderAddr }),
        ...(deliveryState !== undefined && { deliveryState }), // undefined 체크
        ...(deleteFlag !== undefined && { deleteFlag }), // undefined 체크
      };

      const newOrder = await orderService.createOrder(orderInfo);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

// 특정 유저의 주문 조회
orderRouter.get(
  '/:userId',
  userMiddleware.loginRequired,
  orderMiddleware.createOrderValidator,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const userInfoRequired = { userId };

      const orders = await orderService.getOrdersByUser(userInfoRequired);

      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

// 주문 수정
orderRouter.put(
  '/:userId',
  userMiddleware.loginRequired,
  orderMiddleware.updateOrderValidator,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const orderItems = req.body.orderItems;
      const { orderAddr, deliveryState } = req.body;

      const userInfoRequired = { userId };

      if (deliveryState !== 0) {
        return res
          .status(400)
          .json({ error: '이미 배송된 주문은 수정할 수 없습니다.' });
      }
      // 배송 시작 전일 경우
      const toUpdate = {
        ...(orderItems && { orderItems }),
        ...(orderAddr && { orderAddr }),
        ...(deliveryState !== undefined && { deliveryState }),
      };


      const updateOrderInfo = await orderService.updateOrder(
        userInfoRequired,
        toUpdate
      );
        res.status(200).json(updateOrderInfo);
    } catch (error) {
      next(error);
    }
  }
);

// 주문 삭제
orderRouter.delete(
  '/:userId/:orderId',
  userMiddleware.loginRequired,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const orderId = req.params.orderId;
      const userInfoRequired = { userId };
      // const orderInfo = { orderId };
      const orders = await orderService.getOrdersByUser(userInfoRequired);

      if (!orders) {
        return res.status(400).json({ error: '주문 내역이 없습니다!' });
      }
      //삭제 시도
      const deleteResult = await orderService.deleteOrder(orders);
      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

// 주문 배송 상태 업데이트 라우터
orderRouter.put(
  '/orders/:email',
  // orderMiddleware.updateDeliveryState,
  (req, res) => {
    res.status(200).json({ updatedOrder: req.updatedOrder });
  }
);

module.exports = orderRouter;
