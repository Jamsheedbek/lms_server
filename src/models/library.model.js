module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define('library', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Library;
};
