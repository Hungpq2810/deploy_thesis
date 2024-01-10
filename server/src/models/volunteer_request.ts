import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Users } from './users';
import { Organization } from './organization';

export interface VolunteerRequestAttributes {
  id: number;
  user_id: number;
  organization_id: number;
  status: number;
  created_at: Date;
  updated_at: Date;
}
interface VolunteerRequestCreationAttributes
  extends Optional<VolunteerRequestAttributes, 'id'> {}

class VolunteerRequest
  extends Model<VolunteerRequestAttributes, VolunteerRequestCreationAttributes>
  implements VolunteerRequestAttributes
{
  public id!: number;
  public user_id!: number;
  public organization_id!: number;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly users?: Users[];
  public readonly organizations?: Organization[];
  public static associations: {
    users: Association<VolunteerRequest, Users>;
    organizations: Association<VolunteerRequest, Organization>;
  };
}

VolunteerRequest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    organization_id: {
      type: DataTypes.INTEGER,
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
    tableName: 'volunteer_request',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
VolunteerRequest.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'users',
});
VolunteerRequest.belongsTo(Organization, {
  foreignKey: 'organization_id',
  as: 'organizations',
});

export { VolunteerRequest };
