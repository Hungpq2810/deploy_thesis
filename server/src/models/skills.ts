import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { SkillUsers } from './skill_users';

export interface SkillAttributes {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

interface SkillCreationAttributes extends Optional<SkillAttributes, 'id'> {}

class Skills
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly skillUsers?: SkillUsers[];
  public static associations: {
    skillUsers: Association<Skills, SkillUsers>;
  };
}
Skills.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(1045),
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
    tableName: 'skills',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
export { Skills };
