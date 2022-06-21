const { connectionString } = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const db = {};

const sequelize = new Sequelize(connectionString);

db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.users = require('./user.model')(sequelize, DataTypes);
db.courses = require('./course.model')(sequelize, DataTypes);
db.lessons = require('./lessons.model')(sequelize, DataTypes);
db.library = require('./library.model')(sequelize, DataTypes);
db.books = require('./books.model')(sequelize, DataTypes);
db.role = require('./role.model')(sequelize, DataTypes);

db.users.belongsToMany(db.courses, { through: 'user_courses' });
db.courses.belongsToMany(db.users, { through: 'user_courses' });

db.users.belongsToMany(db.library, { through: 'user_library' });
db.library.belongsToMany(db.users, { through: 'user_library' });

db.courses.hasMany(db.lessons, { onDelete: 'cascade' });
db.lessons.belongsTo(db.courses);

db.library.hasMany(db.books, { onDelete: 'cascade' });
db.books.belongsTo(db.library);

module.exports = db;
