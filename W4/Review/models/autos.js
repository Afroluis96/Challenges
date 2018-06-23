/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('autos', {
		id_auto: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true
		},
		id_marca: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'marcas',
				key: 'id_marca'
			}
		}
	}, {
		tableName: 'autos',
		timestamps: false
	});
};
