const { sequelize } = require('../models'); 

async function resetDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("DB Empty.");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing DB:", error);
    process.exit(1);
  }
}
resetDatabase();
