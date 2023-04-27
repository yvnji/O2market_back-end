const { User } = require('./models');
class userDAO {
  // 특정 email로 사용자 document 객체를 찾아오는 메소드
  async findByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
  }
  async findById(userId) {
    const user = await User.findOne({ _id: userId }).lean();
    return user;
  }
  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async updateById ({ userId, update }) {
    const filter = { _id: userId };
    const option = { new: true };

    const updatedUser = await User.findOneAndUpdate(filter, update, option).lean();
    return updatedUser;
  }

  async deleteById(userId) {
    const deletedUser = await User.findOneAndDelete({ _id: userId }).lean();

    return deletedUser;
  }
}

module.exports = new userDAO();
