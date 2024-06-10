import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('week5', 'postgres', 'Nishant@123', {
    host: 'localhost',
    dialect: 'postgres'
});

export default sequelize;
