import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';

interface SkillAttributes {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
}

interface SkillCreationAttributes extends Optional<SkillAttributes, 'id'> {}

class Roles
  extends Model<SkillAttributes, SkillCreationAttributes>
  implements SkillAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public created_at!: Date;
  public updated_at!: Date;
}
Roles.init(
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
    slug: {
      type: new DataTypes.STRING(45),
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
    tableName: 'roles',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
export { Roles };
