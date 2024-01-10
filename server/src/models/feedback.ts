import { Association, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db';
import { Users } from './users';
import { Activities } from './activities';

export interface FeedbackAttributes {
  id: number;
  user_id: number;
  activity_id: number;
  title: string;
  content: string;
  rate: number;
  created_at: Date;
  updated_at: Date;
}
interface FeedbackCreationAttributes
  extends Optional<FeedbackAttributes, 'id'> {}

class Feedback
  extends Model<FeedbackAttributes, FeedbackCreationAttributes>
  implements FeedbackAttributes
{
  public id!: number;
  public user_id!: number;
  public activity_id!: number;
  public title!: string;
  public content!: string;
  public rate!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public readonly users?: Users[];
  public readonly activities?: Activities[];
  public static associations: {
    users: Association<Feedback, Users>;
    activities: Association<Feedback, Activities>;
  };
}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Users,
        key: 'id',
      },
    },
    activity_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Activities,
        key: 'id',
      },
    },
    title: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    rate: {
      type: new DataTypes.INTEGER(),
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
    tableName: 'feedback',
    sequelize: sequelize,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
);
Feedback.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'users',
});
Feedback.belongsTo(Activities, {
  foreignKey: 'activity_id',
  as: 'activities',
});

export { Feedback };
