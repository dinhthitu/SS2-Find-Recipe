const { sequelize, User } = require('./models');
const bcrypt = require('bcrypt');

async function createAdmin() {
  try {
    // Kết nối và đồng bộ cơ sở dữ liệu
    await sequelize.sync({ force: false });

    // Kiểm tra xem admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ where: { email: 'admin@example.com' } });
    if (existingAdmin) {
      console.log('Tài khoản admin đã tồn tại!');
      return;
    }

    // Tạo tài khoản admin
    await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      savedRecipes: 0,
    });

    console.log('Tài khoản admin đã được tạo thành công!');
    console.log('Email: admin@example.com');
    console.log('Mật khẩu: admin123');
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản admin:', error.message);
  } finally {
    await sequelize.close();
  }
}

createAdmin();
