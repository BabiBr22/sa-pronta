const { Sequelize } = require('sequelize');

// Substitua a string de conexão pela sua
const sequelize = new Sequelize('postgresql://barbara:ue0bEUWx6_siRJo0Sq_44g@projeto-s-a-2635.jxf.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Ajuste de segurança para permitir conexões SSL
    }
  },
  logging: true, // Desativar logging, se não precisar
});

module.exports = sequelize;
