const { Order } = require('./models');

class orderDAO {
  // 주문 추가
  async create(orderInfo) {
    const createdNewOrder = await Order.create(orderInfo);
    return createdNewOrder;
  }

  // 전체 주문목록 조회
  async findAll() {
    return await Order.find().lean();
  }

  // 유저 아이디로 주문 아이디 찾기
  async findOrderId(userId) {
    const findOrderId = await Order.findOne({ userId: userId }, '_id').lean();
    const orderId = findOrderId._id;
    return;
  }

  async findByUserId(userId) {
    return await Order.find({ userId: userId }).lean();
  }
  async findByOrderId(orderId) {
    return await Order.findOne({ _id: orderId }).lean();
  }
  // 주문 수정
  async update({ orderId, update }) {
    const option = { new: true }; // new: true >> 적용된 문서를 반환

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      update,
      option
    ).lean();
    if (!updatedOrder) {
      throw new Error(`주문 ${orderId}를 찾을 수 없습니다.`);
    }
    return updatedOrder;
  }

  // 주문 삭제
  async delete(userId) {
    const deleteCount = await Order.deleteMany({ userId: userId });
    return { result: '성공' };
  }
  async deleteOrder(orderId) {
    const deletedOrder = await Order.findOneAndDelete({ _id: orderId }).lean();
    return deletedOrder;
  }
}

module.exports = new orderDAO();
