module.exports = (sequelize, DataTypes) => {
    const Lessons = sequelize.define('lessons', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Lessons;
};
