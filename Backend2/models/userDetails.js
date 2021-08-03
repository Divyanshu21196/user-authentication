/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	const userDetails = sequelize.define('userDetails', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'userId',
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'name',
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'image',
		},
		phone: {
			type: DataTypes.BIGINT(20),
			allowNull: false,
			field: 'phone',
		},
		mobile: {
			type: DataTypes.BIGINT(20),
			allowNull: true,
			field: 'mobile',
		},
		zipcode: {
			type: DataTypes.BIGINT(11),
			allowNull: true,
			field: 'zipcode',
		},
		lat: {
			type: DataTypes.FLOAT(11),
			allowNull: true,
			field: 'lat',
		},
		lng: {
			type: DataTypes.FLOAT(11),
			allowNull: true,
			field: 'lng',
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'createdAt'
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'updatedAt'
		}
	}, {
		tableName: 'user_details',
	});
	return userDetails;
};
