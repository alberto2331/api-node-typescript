import {Sequelize} from 'sequelize';

const db = new Sequelize('curso_node', 'root', 'root' , {
    host: 'localhost',
    dialect: 'mysql',
    // logging: 
});

export default db;