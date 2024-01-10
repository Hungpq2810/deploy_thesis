import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Users } from './users';

export interface ActivityAttributes {
  id: number;
  creator: number;
  name: string;
  description: string;
  image?: string;
  location: string;
  num_of_accepted: number;
  max_of_volunteers: number;
  register_from: Date;
  register_to: Date;
  start_date: Date;
  end_date: Date;
  status: number;
  created_at: Date;
  updated_at: Date;
}
interface ActivityCreationAttributes
  extends Optional<ActivityAttributes, 'id'> {}

class Activities
  extends Model<ActivityAttributes, ActivityCreationAttributes>
  implements ActivityAttributes
{
  public id!: number;
  public creator!: number;
  public name!: string;
  public description!: string;
  public image: string|undefined;
  public location!: string;
  public num_of_accepted!: number;
  public max_of_volunteers!: number;
  public register_from!: Date;
  public register_to!: Date;
  public start_date!: Date;
  public end_date!: Date;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly user?: Users;
}

Activities.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    creator: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    name: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(1250),
      allowNull: true,
    },
    location: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    num_of_accepted: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max_of_volunteers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    register_from: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    register_to: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE(),
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
    tableName: 'activities',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
Activities.belongsTo(Users, { foreignKey: 'creator', as: 'user' });
export { Activities };
