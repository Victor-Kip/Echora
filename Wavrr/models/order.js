import Sequelize from 'sequelize';
import db from '../config/db.js';

const Order = db.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: { type: Sequelize.INTEGER, allowNull: false },
    total_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    status: { 
        type: Sequelize.ENUM('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'), 
        defaultValue: 'PENDING' 
    },
    shipping_address: Sequelize.TEXT
}, {
    timestamps: true,
    tableName: 'orders',
    freezeTableName: true
});

export default Order;
