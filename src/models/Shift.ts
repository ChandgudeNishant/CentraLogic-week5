import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import Employee from './Employee';

class Shift extends Model {
    public id!: string;
    public employeeId!: string;
    public startTime!: Date;
    public endTime?: Date;
    public actualHours!: number;
}

Shift.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
        },
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    actualHours: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Shift',
    tableName: 'shifts',
});

Shift.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Shift;
