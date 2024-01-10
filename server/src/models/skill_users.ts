import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Users } from './users';
import { Skills } from './skills';

interface SkillAttributes {
  id: number;
  skill_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

interface SkillCreationAttributes extends Optional<SkillAttributes, 'id'> {}

class SkillUsers
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: number;
  public skill_id!: number;
  public user_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly users?: Users[];
  public readonly skills?: Skills[];
  public static associations: {
    users: Association<SkillUsers, Users>;
    skills: Association<SkillUsers, Skills>;
  };
}
SkillUsers.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    skill_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    created_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updated_at: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: 'skill_users',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
export { SkillUsers };
