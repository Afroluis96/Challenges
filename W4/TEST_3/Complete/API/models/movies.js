/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('movies', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		rated: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		genre: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		directedBy: {
			type: DataTypes.STRING(250),
			allowNull: true
		},
		runtime: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		enable: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		favs: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'movies',
		timestamps: false
	});
};
