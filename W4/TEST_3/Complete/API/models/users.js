/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		secondName: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(256),
			allowNull: true
		}
	}, {
		tableName: 'users',
		timestamps: false
	});
};
