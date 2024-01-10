import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Users } from './users';
import { Activities } from './activities';
import { Organization } from './organization';

export interface ActivityApplyAttributes {
  id: number;
  user_id: number;
  activity_id: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}
interface ActivityApplyCreationAttributes
  extends Optional<ActivityApplyAttributes, 'id'> {}

class ActivityApply
  extends Model<ActivityApplyAttributes, ActivityApplyCreationAttributes>
  implements ActivityApplyAttributes
{
  public id!: number;
  public user_id!: number;
  public activity_id!: number;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly users?: Users[];
  public readonly activities?: Activities[];
  public static associations: {
    users: Association<ActivityApply, Users>;
    organizations: Association<ActivityApply, Organization>;
  };
}

ActivityApply.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    activity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: 'activity_apply',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
ActivityApply.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'users',
});
ActivityApply.belongsTo(Activities, {
  foreignKey: 'activity_id',
  as: 'activities',
});

export { ActivityApply };
