/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('favorites', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true,
			primaryKey: true
		},
		id_user: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		id_movie: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			references: {
				model: 'movies',
				key: 'id'
			}
		},
		state: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'favorites',
		timestamps: false
	});
};
