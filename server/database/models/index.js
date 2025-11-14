const User = require('./User');
const Product = require('./Product');
const Favorite = require('./Favorite');

User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

Product.hasMany(Favorite, { foreignKey: 'product_id', as: 'favorites' });
Favorite.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {User,Product,Favorite,};