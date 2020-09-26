import Sequelize from 'sequelize'
const sequelize = new Sequelize(process.env.DB_URL) //connects sequelize to database

const Organization = sequelize.define(
  'organizations',
  {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
)

export { Organization }
