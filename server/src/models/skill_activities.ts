import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Skills } from './skills';
import { Activities } from './activities';

interface SkillActivitiesAttributes {
  id: number;
  skill_id: number;
  activity_id: number;
  created_at: Date;
  updated_at: Date;
}

interface SkillCreationAttributes
  extends Optional<SkillActivitiesAttributes, 'id'> {}

class SkillActivities
  extends Model<SkillActivitiesAttributes, SkillCreationAttributes>
  implements SkillActivitiesAttributes
{
  public id!: number;
  public skill_id!: number;
  public activity_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly activities?: Activities[];
  public readonly skills?: Skills[];
  public static associations: {
    activities: Association<SkillActivities, Activities>;
    skills: Association<SkillActivities, Skills>;
  };
}
SkillActivities.init(
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
    activity_id: {
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
    tableName: 'skill_activities',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
export { SkillActivities };
