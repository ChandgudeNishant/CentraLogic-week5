import { DataTypes, Model } from 'sequelize';
import sequelize from './index';
import Employee from './Employee';
import Shift from './Shift';

class Timesheet extends Model {
    public id!: string;
    public employeeId!: string;
    public shiftId!: string;
    public projectName!: string;
    public taskName!: string;
    public fromDate!: Date;
    public toDate!: Date;
}

Timesheet.init({
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
    shiftId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Shift,
            key: 'id',
        },
    },
    projectName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taskName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fromDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    toDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Timesheet',
    tableName: 'timesheets',
});

Timesheet.belongsTo(Employee, { foreignKey: 'employeeId' });
Timesheet.belongsTo(Shift, { foreignKey: 'shiftId' });

export default Timesheet;
