/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('marcas', {
		id_marca: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true
		},
		nombre: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'marcas',
		timestamps: false
	});
};
