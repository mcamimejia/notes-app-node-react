const { sequelize } = require('../models'); 
const bcrypt = require('bcrypt');

async function initDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("Initialize DB.");
    const hashPassword = await bcrypt.hash('password',10);
    await sequelize.models.User.bulkCreate([{ userName: 'myuser', password: hashPassword }]);
    await sequelize.models.Tag.bulkCreate([{ name: 'Work' },{ name: 'Study' },{ name: 'Personal' }]);

    process.exit(0);
  } catch (error) {
    console.error("Error initializing DB:", error);
    process.exit(1);
  }
}

initDatabase();
