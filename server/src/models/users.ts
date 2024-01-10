import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { SkillUsers } from './skill_users';

export interface UserAttributes {
  id: number;
  role_id?: number | null;
  organization_id?: number | null;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  gender: number;
  birthday: Date;
  address: string;
  avatar: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public role_id!: number;
  public organization_id!: number | null;
  public username!: string;
  public password!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public gender!: number;
  public birthday!: Date;
  public address!: string;
  public avatar!: string;
  public status!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly skillUsers?: SkillUsers[];
  public static associations: {
    skillUsers: Association<Users, SkillUsers>;
  };
}
Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    role_id: {
      type: new DataTypes.INTEGER(),
      allowNull: true,
    },
    organization_id: {
      type: new DataTypes.INTEGER(),
      allowNull: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    password: {
      type: new DataTypes.STRING(1045),
      allowNull: true,
    },
    name: {
      type: new DataTypes.STRING(45),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    phone: {
      type: new DataTypes.STRING(45),
      allowNull: true,
    },
    gender: {
      type: new DataTypes.INTEGER(),
      allowNull: true,
    },
    birthday: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
    address: {
      type: new DataTypes.STRING(1045),
      allowNull: true,
    },
    avatar: {
      type: new DataTypes.STRING(1045),
      allowNull: true,
    },
    status: {
      type: new DataTypes.INTEGER(),
      allowNull: true,
    },
    created_at: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
    updated_at: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
export { Users };
