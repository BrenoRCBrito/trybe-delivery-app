const port = process.env.PORT || 3301;
const app = require('./app');
const models = require("../database/models");

const sequelizeQueryResult = async () => {
  try {
    const [...dataValues] = await models.User.findAll();
    return dataValues.map(({ dataValues }) => dataValues);
  } catch (error) {
    console.log(error);
  }
};

app.listen(port, async () => {
  console.log(port);
  console.log(await sequelizeQueryResult());
});
