import Sequelize from 'sequelize';
import db from '../config/db.js';

const OrderItem = db.define('order_item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    order_id: { type: Sequelize.INTEGER, allowNull: false },
    merch_id: { type: Sequelize.INTEGER, allowNull: false },
    quantity: { type: Sequelize.INTEGER, allowNull: false },
    price_at_purchase: { type: Sequelize.DECIMAL(10, 2), allowNull: false }
}, {
    timestamps: true,
    tableName: 'order_items',
    freezeTableName: true
});

export default OrderItem;
