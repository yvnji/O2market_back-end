// OrderDAO 모듈을 불러옵니다.
const { orderDAO } = require('../data-access');

class orderService {
  // 주문 추가
  async createOrder(orderInfo) {
    const { userId, orderItems, orderAddr, deliveryState, deleteFlag } =
      orderInfo;

    const newOrderInfo = {
      userId,
      orderItems,
      orderAddr,
      deliveryState,
      deleteFlag,
    };
    return await orderDAO.create(newOrderInfo);
  }

  //전체 주문목록 조회(관리자용)
  async getOrders() {
    return await orderDAO.findAll();
  }

  //특정 사용자의 주문조회
  async getOrdersByUser(userInfoRequired) {
    const { userId } = userInfoRequired;
    return await orderDAO.findByUserId(userId);
  }

  // 주문번호로 주문하나 조회
  async OrdersByUser(userInfoRequired) {
    const { orderId } = userInfoRequired;
    return await orderDAO.findByOrderId(orderId);
  }

  //주문수정
  async updateOrder(userInfoRequired, toUpdate) {
    const { userId } = userInfoRequired;

    let order = await orderDAO.findByUserId(userId);
    const orderId = await orderDAO.findOrderId(userId);

    if (!order) {
      throw new Error('등록된 주문이 없습니다. 다시 확인해 주세요');
    }

    // const orderId = order._id;
    order = await orderDAO.update({
      orderId,
      update: toUpdate,
    });

    return order;
  }

  //주문 전체 삭제
  async deleteOrderAll(orderId) {
    return await orderDAO.delete(orderId);

  }
//주문 한개 삭제
  async deleteOrderOne(orderId) {
    return await orderDAO.deleteOrder(orderId);
  }
}


// 모듈에 구현한 기능을 추가합니다.
module.exports = new orderService();
