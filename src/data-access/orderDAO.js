const { Order } = require('./models');

class orderDAO {
  // 주문 추가
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // 전체 주문목록 조회
  async findAll() {
    return await Order.find();
  }

  // 유저 아이디로 주문 아이디 찾기
  async findOrderId(userId) {
    const findOrderId = await Order.findOne({ userId: userId }, '_id');

    const orderId = findOrderId._id;
    console.log('=======orderId.types===========');
    console.log(orderId.types);
    return orderId;
  }

  async findByUserId(userId) {
    return await Order.find({ userId: userId });
  }
  async findByOrderId(orderId) {
    return await Order.findOne({ _id: orderId });
  }
  // 주문 수정
  async update(orderId, update) {
    console.log('===========update start =================');
    console.log('===========orderId=================');
    console.log(orderId);
    console.log('===========update=================');
    console.log(update);
    const option = { returnOriginal: false };
    // new: true >> 적용된 문서를 반환
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      update,
      option
    );
    if (!updatedOrder) {
      throw new Error(`주문 ${orderId}를 찾을 수 없습니다.`);
    }
    return updatedOrder;
  }

  // 주문 삭제
  async delete(orderId) {
    const deleteCount = await Order.deleteOne({ _id: orderId });
    return { result: '성공' };
  }

  async findById(orderItemId) {
    return await OrderItem.findOne({ _id: orderItemId });
  }
}

module.exports = new orderDAO();
